import {DECREMENT, INCREMENT} from './actionTypes'
/**
 * reducer什么时候调用?
 *  1. 初始化的时候  
 *  2. 需要更新数据的时候
 */
const initState = 0; // 指定初始值
export default function operateState(preState = initState, action) {
    //规则：在reducer中不可以修改传递过来的参数  不可以动之前的状态 因此要返回一个新的状态
    console.log('------reducer调用了--------',action)
    //根据action中的type和data，决定应该怎么操作状态
    const {type, data} = action
    let newState
    switch (type) {
        case INCREMENT:
            newState = preState + data
            return newState
        case DECREMENT:
            newState = preState - data
            return newState
        default:
            return preState
    }

}
