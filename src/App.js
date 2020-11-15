import React,{Component} from 'react'
import {Button} from 'antd'
import 'antd/dist/antd.css'

export default class App extends Component{
  render(){
    return (
      <div>
        <Button type='primary'>antd按钮</Button>
      </div>
    )
  }
}