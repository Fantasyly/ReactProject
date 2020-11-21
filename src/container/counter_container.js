/**
 * CounterUI组件的容器
 */
import {
  createDecrementAction,
  createIncrementAction,
  createIncrementAsyncAction,
} from "../redux/action_creators";
import { connect } from "react-redux";
import Counter from "../components/counter";

// 把状态映射到子UI组件的props中   在Counter组件中通过props就能拿到count
let mapStateToProps = state => ({ count: state });

// 把dispatch映射到UI组件的Props中  在Counter组件中通过props就能实现向store分发action
let mapDispatchToProps = dispatch => {
  return {
    increment: value => {
      dispatch(createIncrementAction(value));
    },
    decrement: value => {
      dispatch(createDecrementAction(value));
    },
    incrementAsync: (value, delay) => {
      dispatch(createIncrementAsyncAction(value, delay));
    },
  };
};

//connect把redux和UI组件Counter连接起来, 并返回一个组件
export default connect(mapStateToProps, mapDispatchToProps)(Counter);
