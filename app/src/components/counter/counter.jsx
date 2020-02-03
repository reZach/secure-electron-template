import React from "react";
import { connect } from "react-redux";
import { UNDO, REDO } from "easy-redux-undo";
import { increment, decrement, rando } from "Redux/components/counter/counterSlice";

class Counter extends React.Component {

  constructor(){
    super();

    this.inc = this.inc.bind(this);
    this.dec = this.dec.bind(this);
    this.undo = this.undo.bind(this);
    this.redo = this.redo.bind(this);
    this.rando = this.rando.bind(this);
  }

  inc(event){
    this.props.increment();
  }

  dec(event) {
    this.props.decrement();
  }

  undo(event){
    this.props.UNDO();
  }

  redo(event){
    this.props.REDO();
  }

  rando(event){
    this.props.rando();
  }

  render() {    
    return (
      <div>
        <button onClick={this.rando}>rando</button>
        <button onClick={this.undo}>undo</button>
        <button onClick={this.dec}>dec</button>
        {this.props.counter.value}
        <button onClick={this.inc}>inc</button>
        <button onClick={this.redo}>redo</button>
      </div>      
    );
  }
}

const mapStateToProps = (state, props) => ({
  counter: state.counter.present
});
const mapDispatch = { increment, decrement, rando, UNDO, REDO };

export default connect(mapStateToProps, mapDispatch)(Counter);