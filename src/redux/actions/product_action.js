/**
 * 为product有关的封装一个action
 */
import { SAVE_PROD } from "../action_types";

// 保存商品详情
export const saveProdsAction = value => {
  return {
    type: SAVE_PROD,
    data: value,
  };
};
