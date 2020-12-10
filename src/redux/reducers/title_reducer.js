/**
 * 处理title信息得reducer
 */
import { SAVE_TITLE } from "../action_types";

// 初始状态
let initState = "";
export default function loginReducer(preState = initState, action) {
  let { type, data } = action;
  let newState = "";
  switch (type) {
    case SAVE_TITLE:
      newState = data;
      return newState;
    default:
      return preState;
  }
}
