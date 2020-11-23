/**
 * store.js  redux的核心管理者
 */
//从redux中引入createStore，用于创建最核心的store对象
import {applyMiddleware, createStore} from 'redux'
// 引入reducer
import reducers from './reducers'
// 引入redux-thunk 异步中间件
import thunk from 'redux-thunk'
// 引入支持redux开发者调试工具的插件
import {composeWithDevTools} from 'redux-devtools-extension'

export default createStore(reducers, composeWithDevTools(applyMiddleware(thunk)));
