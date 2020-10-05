export const initialState = { 
    hours:[
        //0 - Sunday - 6:00 a.m. to 5:00 p.m. EST
        {
            open:"06:00",
            close:"17:00"
        },
        //1 - Monday - 7 a.m - 8 p.m. EST
        {
            open:"07:00",
            close:"20:00"
        },       
        //2 - Tuesday - 7 a.m - 8 p.m. EST
        {
            open:"07:00",
            close:"20:00"
        },        
        //3 - Wednesday - 7 a.m - 8 p.m. EST
        {
            open:"07:00",
            close:"20:00"
        } ,       
        //4 - Thursday - 7 a.m - 8 p.m. EST
        {
            open:"07:00",
            close:"20:00"
        },       
        //5 - Friday - 24/7
        {
            open:"00:00",
        },
        //6 - Saturday - 24/7
        {
            close:"23:59"
        }
    ]
 }

export function hoursReducer(state = initialState, action) {
    console.log("reduceer")
  // Check to see if the reducer cares about this action
  if (action.type === 'counter/increment') {
    // If so, make a copy of `state`
    return {
      ...state,
      // and update the copy with the new value
      value: state.value + 1
    }
  }
  // otherwise return the existing state unchanged
  return state
}

