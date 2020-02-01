import React from "react";
import { connect } from "react-redux";
import { increment, decrement } from "Redux/components/counter/counterSlice";

class Counter extends React.Component {
  render() {    
    return (
      <div>
        {this.props.counter.value}
      </div>      
    );
  }
}

const mapStateToProps = (state, props) => ({
  counter: state.counter.present
});
const mapDispatch = { increment, decrement };

export default connect(mapStateToProps, mapDispatch)(Counter);