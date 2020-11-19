/**
 * CounterUI组件
 */
import React, { Component } from "react";

export default class App extends Component {
  increment = () => {
    // 从选择框中拿到选的值
    let value = this.select.value * 1;

    // 从props中拿到increment
    this.props.increment(value);
  };

  decrement = () => {
    let value = this.select.value * 1;
    this.props.decrement(value);
  };

  incrementIfOdd = () => {
    let { count } = this.props;
    let value = this.select.value * 1;
    if (count % 2 == 1) {
      this.props.increment(value);
    }
  };

  incrementAsync = () => {
    let value = this.select.value * 1;
    setTimeout(() => {
      this.props.increment(value);
    }, 1000);
  };

  render() {
    let { count } = this.props;
    console.log(count);
    return (
      <div>
        <h2>累加和为{count}</h2>
        <select ref={select => (this.select = select)}>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
        </select>
        <button onClick={this.increment}>increment</button>
        <button onClick={this.decrement}>decrement</button>
        <button onClick={this.incrementIfOdd}>incrementv if odd</button>
        <button onClick={this.incrementAsync}>increment async</button>
      </div>
    );
  }
}
