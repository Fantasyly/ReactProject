/**
 * 分类信息有关的reducer
 */
import { SAVE_CATEGORY } from "../action_types";

// 初始状态
let initState = [];
export default function saveCatesReducer(preState = initState, action) {
  let { type, data } = action;
  let newState = [];
  switch (type) {
    case SAVE_CATEGORY:
      newState = [...data];
      return newState;
    default:
      return preState;
  }
}
