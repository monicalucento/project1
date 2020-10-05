import { createStore as reduxCreateStore } from "redux"
import {hoursReducer, initialState} from './../reducer';

const createStore = () => reduxCreateStore(hoursReducer, initialState)
export default createStore