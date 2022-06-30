import React from "react";
import { connect } from "react-redux";
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

  inc(_event) {
    this.props.increment();
  }

  dec(_event) {
    this.props.decrement();
  }

  add(_event) {
    this.props.add();
  }

  remove(_event) {
    this.props.remove();
  }

  undo(_event) {
    this.props.UNDO();
  }

  redo(_event) {
    this.props.REDO();
  }

  undo2(_event) {
    this.props.UNDO(2);
  }

  redo2(_event) {
    this.props.REDO(2);
  }

  clear(_event) {
    this.props.CLEAR();
  }

  groupbegin(_event) {
    this.props.GROUPBEGIN();
  }

  groupend(_event) {
    this.props.GROUPEND();
  }

  render() {
    return (
      <React.Fragment>
        <section className="section">
          <div className="container has-text-centered">
            <h1 className="title is-1">Undo/Redo</h1>
            <div className="subtitle">
              Try out modifying, and then undo/redoing the redux history below!
            </div>
          </div>
        </section>
        <section className="section">
          <div className="container">
            <div className="columns">
              <div className="column">
                <div className="field is-horizontal">
                  <div className="field-label is-normal">
                    <label className="label">Counter</label>
                  </div>
                  <div className="field-body">
                    <div className="field is-horizontal">
                      <div className="control">
                        <input
                          className="input"
                          value={this.props.counter.value}
                          disabled={true}
                        />
                      </div>
                      <button className="button is-primary" onClick={this.dec}>
                        Decrement
                      </button>
                      <button className="button is-primary ml-2" onClick={this.inc}>
                        Increment
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="column">
                <div className="field is-horizontal">
                  <div className="field-label is-normal">
                    <label className="label">Complex</label>
                  </div>
                  <div className="field-body">
                    <div className="field is-horizontal">
                      <div className="control">
                        <input
                          className="input"
                          value={this.props.complex.length}
                          disabled={true}
                        />
                      </div>
                      <button className="button is-primary" onClick={this.add}>
                        Add
                      </button>
                      <button
                        className="button is-primary ml-2"
                        onClick={this.remove}>
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="columns">
              <div className="column">
                <label className="label">Controls</label>
              </div>
            </div>
            <div className="columns">
              <div className="column">
                <div className="buttons">
                  <button className="button is-info" onClick={this.undo}>
                    Undo
                  </button>
                  <button className="button is-info" onClick={this.redo}>
                    Redo
                  </button>
                  <button className="button is-info" onClick={this.undo2}>
                    Undo 2
                  </button>
                  <button className="button is-info" onClick={this.redo2}>
                    Redo 2
                  </button>
                  <button className="button is-info" onClick={this.clear}>
                    Clear
                  </button>
                  <button
                    className="button is-info"
                    onClick={this.groupbegin}>
                    Group begin
                  </button>
                  <button className="button is-info" onClick={this.groupend}>
                    Group end
                  </button>
                </div>
              </div>
            </div>
            <div>
              <div>
                <pre className="undo-container">
                  {JSON.stringify(this.props.present, null, 2)}
                </pre>
              </div>
              <strong>Undo/Redo state information</strong><br/>
              <span>Past length: {this.props.past.length}</span>
              <br />
              <span>Future length: {this.props.future.length}</span>
            </div>            
          </div>
        </section>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state, _props) => ({
  counter: state.undoable.present.counter,
  complex: state.undoable.present.complex,
  past: state.undoable.past,
  present: state.undoable.present,
  future: state.undoable.future,
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
  GROUPEND,
};

export default connect(mapStateToProps, mapDispatch)(UndoRedo);
