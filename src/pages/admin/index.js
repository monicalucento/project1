import React from "react"
import moment from "moment"
import { Link, graphql } from "gatsby"
import {useSelector, useDispatch} from 'react-redux'
import TimeKeeper from 'react-timekeeper';

const AdminPortal = ({ data, location }) => {


    const hours = useSelector(state => state.hours)

    return (
        <TimeKeeper
          onChange={()=>true} />
      );
  
   
  }
  
  export default AdminPortal