import React from "react";
import { connect } from "react-redux";
import ROUTES from "Constants/routes";
import { Link } from "react-router-dom";
import { UNDO, REDO, CLEAR, GROUPBEGIN, GROUPEND } from "easy-redux-undo";
import { increment, decrement } from "Redux/components/counter/counterSlice";
import { add, remove } from "Redux/components/complex/complexSlice";
import "./undoredo.css";

class UndoRedo extends React.Component {
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
    this.undo2 = this.undo2.bind(this);
    this.redo2 = this.redo2.bind(this);
    this.clear = this.clear.bind(this);
    this.groupbegin = this.groupbegin.bind(this);
    this.groupend = this.groupend.bind(this);
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

  undo2(event) {
    this.props.UNDO(2);
  }

  redo2(event) {
    this.props.REDO(2);
  }

  clear(event) {
    this.props.CLEAR();
  }

  groupbegin(event) {
    this.props.GROUPBEGIN();
  }

  groupend(event) {
    this.props.GROUPEND();
  }

  render() {
    return (
      <div id="undoredo">
        <Link to={ROUTES.WELCOME} className="left">
          Go back
        </Link>
        <div className="undoredo">Undo/Redo</div>
        <div>
          <span>
            Try out modifying, and then undo/redoing the redux history below!
          </span>
          <div>
            <h3>State</h3>
            <div>
              <div>
                <pre className="container">
                  {JSON.stringify(this.props.present, null, 2)}
                </pre>
              </div>
              <span>Past length: [{this.props.past.length}]</span>
              <br />
              <span>Future length: [{this.props.future.length}]</span>
            </div>
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
            <h3>Controls</h3>
            <div>
              <div>
                <button onClick={this.undo}>undo</button>
                <button onClick={this.redo}>redo</button>
              </div>
              <div>
                <button onClick={this.undo2}>undo 2</button>
                <button onClick={this.redo2}>redo 2</button>
              </div>
              <div>
                <button onClick={this.clear}>clear</button>
              </div>
              <div>
                <button onClick={this.groupbegin}>group begin</button>
                <button onClick={this.groupend}>group end</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => ({
  counter: state.undoable.present.counter,
  complex: state.undoable.present.complex,
  past: state.undoable.past,
  present: state.undoable.present,
  future: state.undoable.future
});
const mapDispatch = {
  increment,
  decrement,
  add,
  remove,
  UNDO,
  REDO,
  CLEAR,
  GROUPBEGIN,
  GROUPEND
};

export default connect(mapStateToProps, mapDispatch)(UndoRedo);
