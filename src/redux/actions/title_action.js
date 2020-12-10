/**
 * 为title封装action
 */
import { SAVE_TITLE } from "../action_types";

// 保存title信息
export const createSaveTitleAction = value => {
  return {
    type: SAVE_TITLE,
    data: value,
  };
};
