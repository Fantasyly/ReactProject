import { INCREMENT, DECREMENT } from "./actionTypes";
/**
 * 
 * 根据业务需求创建不同的action
 */
export const createIncrementAction = value => ({ type: INCREMENT, data: value });
export const createDecrementAction = value => ({ type: DECREMENT, data: value });
