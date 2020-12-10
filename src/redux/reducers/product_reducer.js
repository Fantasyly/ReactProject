/**
 * 商品信息有关的reducer
 */
import { SAVE_PROD } from "../action_types";

// 初始状态
let initState = [];
export default function saveProdsReducer(preState = initState, action) {
  let { type, data } = action;
  let newState = [];
  switch (type) {
    case SAVE_PROD:
      newState = [...data];
      return newState;
    default:
      return preState;
  }
}
