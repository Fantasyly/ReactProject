/**
 * 为分类信息有关的封装一个action
 */
import { SAVE_CATEGORY } from "../action_types";

// 保存商品详情
export const saveCategoryAction = value => {
  return {
    type: SAVE_CATEGORY,
    data: value,
  };
};
