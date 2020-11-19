import React,{Component} from 'react'
import CounterContainer from './container/counter_container'

/**
 * App组件是所有组件的壳 
 */
export default class App extends Component{
  render(){
    return (
      // 这里不再直接渲染Counter组件  而是渲染其容器 
      <CounterContainer/>
    )
  }
}