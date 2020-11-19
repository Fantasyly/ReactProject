import { createStore } from "redux";
import reducer from "./reducer";
/**
 * 暴露出去一个store对象
 */
export default createStore(reducer);
