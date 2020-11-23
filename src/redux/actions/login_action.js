/**
 * 为login封装action
 */
import { SAVE_USER_INFO } from "../action_types";

export const createSaveUserInfoAction = value => {
  return {
    type: SAVE_USER_INFO,
    data: value,
  };
};
