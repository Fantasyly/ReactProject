import { createStore, applyMiddleware } from "redux";
import reducer from "./reducer";
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
/**
 * 暴露出去一个store对象
 */
export default createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));
