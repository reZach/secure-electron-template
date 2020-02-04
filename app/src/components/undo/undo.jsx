import React from "react";
import { connect } from "react-redux";
import { UNDO, REDO } from "easy-redux-undo";
import { increment, decrement } from "Redux/components/counter/counterSlice";
import { add, remove } from "Redux/components/complex/complexSlice";

class Undo extends React.Component {
  constructor() {
    super();

    // Counter-specific
    this.inc = this.inc.bind(this);
    this.dec = this.dec.bind(this);

    // Complex-specific
    this.add = this.add.bind(this);
    this.remove = this.remove.bind(this);

    // Undo-specific
    this.undo = this.undo.bind(this);
    this.redo = this.redo.bind(this);
  }

  inc(event) {
    this.props.increment();
  }

  dec(event) {
    this.props.decrement();
  }

  add(event) {
    this.props.add();
  }

  remove(event) {
    this.props.remove();
  }

  undo(event) {
    this.props.UNDO();
  }

  redo(event) {
    this.props.REDO();
  }

  render() {
    return (
      <div>
        <h4>Undo/Redo</h4>
        <span>
          Try out modifying, and then undo/redoing the redux history below!
        </span>
        <div>
          <h3>Counter</h3>
          {this.props.counter.value}
          <div>
            <button onClick={this.dec}>dec</button>
            <button onClick={this.inc}>inc</button>
          </div>
          <h3>Complex</h3>
          {this.props.complex.length}
          <div>
            <button onClick={this.add}>add</button>
            <button onClick={this.remove}>remove</button>
          </div>
        </div>
        <button onClick={this.undo}>undo</button>
        <button onClick={this.redo}>redo</button>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => ({
  counter: state.undoable.present.counter,
  complex: state.undoable.present.complex
});
const mapDispatch = { increment, decrement, add, remove, UNDO, REDO };

export default connect(mapStateToProps, mapDispatch)(Undo);
