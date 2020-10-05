import React from "react"
import moment from "moment"
import { Link, graphql } from "gatsby"
import {useSelector, useDispatch} from 'react-redux'
import Layout from './../components/layout';
var momentWithTimeZone = require('moment-timezone');

const BlogIndex = (props) => {
  const hours = useSelector(state => state.hours)

  const clinicHoursWithTz = momentWithTimeZone.tz("America/New_York");

  const todaysHours = hours[clinicHoursWithTz.day()];
  const tomorrow = clinicHoursWithTz.add(1, 'd')

  const nextOpenCloseDate = (dt) => {
    let newOpenCloseDate = {...dt, ...hours[dt.day]};
    if(!newOpenCloseDate.close) {     
      return nextOpenCloseDate({open: newOpenCloseDate.open, day: ++dt.day});
    }
    if(!newOpenCloseDate.open) {
      return nextOpenCloseDate({close: newOpenCloseDate.close, day: --dt.day});
    }
    return {...newOpenCloseDate, day: tomorrow.day(), closeDay:dt.day};

  }


  let open = momentWithTimeZone.tz(todaysHours.open,"hh:mm","America/New_York"); 
  let close = momentWithTimeZone.tz(todaysHours.close, "hh:mm", "America/New_York"); 

  const todayInHostTz = momentWithTimeZone.tz(moment(), "America/New_York");

  const isOpen = todayInHostTz.isBetween(open, close)
  
  if(!isOpen){
    let nextOpenHours = nextOpenCloseDate({day:tomorrow.day()});

    open = momentWithTimeZone.tz(`${nextOpenHours.day} ${nextOpenHours.open}`,"e hh:mm","America/New_York"); 
    close = momentWithTimeZone.tz(`${nextOpenHours.closeDay} ${nextOpenHours.close}`,"e hh:mm","America/New_York"); 
  }


  const adjustTime = (toDate)=>  moment(moment.utc(toDate, "MM/DD/YYYY hh:mm").toDate())

  
  return <Layout>HELLO
      <p>Hello, the clinic {isOpen ? "is OPEN" : "is CLOSED"}</p>
      <p>{moment().format("dddd, MMMM Do YYYY, h:mm:ss a")}</p>
       {isOpen && <p>the clinic's hours today are: {adjustTime(open).format("ddd, hA z")} - {adjustTime(close).format("ddd, hA z")}</p>}
       {!isOpen && <p>the clinic's next open hours are: {adjustTime(open).format("ddd, hA z")} - {adjustTime(close).format("ddd, hA z")}</p>}
    </Layout>;
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      nodes {
        excerpt
        fields {
          slug
        }
        frontmatter {
          date(formatString: "MMMM DD, YYYY")
          title
          description
        }
      }
    }
  }
`
