import React from "react";
import { connect } from "react-redux";
import { changeMessage } from "Redux/components/home/homeSlice";
import {
  writeConfigRequest,
  useConfigInMainRequest,
} from "secure-electron-store";

class Motd extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      message: "",
    };

    this.onChangeMessage = this.onChangeMessage.bind(this);
    this.onSubmitMessage = this.onSubmitMessage.bind(this);
  }

  componentDidMount() {
    // Request so that the main process can use the store
    window.api.store.send(useConfigInMainRequest);
  }

  onChangeMessage(event) {
    const { value } = event.target;
    this.setState((_state) => ({
      message: value,
    }));
  }

  onSubmitMessage(event) {
    event.preventDefault(); // prevent navigation
    this.props.changeMessage(this.state.message); // update redux store
    window.api.store.send(writeConfigRequest, "motd", this.state.message); // save message to store (persist)

    // reset
    this.setState((_state) => ({
      message: "",
    }));
  }

  render() {
    return (
      <React.Fragment>
        <section className="section">
          <div className="container has-text-centered">
            <h1 className="title is-1">{this.props.home.message}</h1>
            <div className="subtitle">
              Your message of the day will persist
              <br /> if you close and re-open the app.
            </div>
          </div>
        </section>
        <section className="section">
          <div className="container">
            <form className="mb-4" onSubmit={this.onSubmitMessage}>
              <div className="field is-horizontal">
                <input
                  placeholder="New message of the day"
                  className="input"
                  value={this.state.message}
                  onChange={this.onChangeMessage}></input>
                <input
                  className="button is-primary"
                  type="submit"
                  value="Save"></input>
              </div>
            </form>
          </div>
        </section>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state, _props) => ({
  home: state.home,
});
const mapDispatch = { changeMessage };

export default connect(mapStateToProps, mapDispatch)(Motd);
