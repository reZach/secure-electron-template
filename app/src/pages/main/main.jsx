import React from "react";
import { connect } from "react-redux";
import { changeMessage } from "Redux/components/home/homeSlice";
import { writeConfigRequest } from "secure-electron-store";
import Detail from "Components/detail/detail";

class Main extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      message: props.home.message
    };

    this.onChangeMessage = this.onChangeMessage.bind(this);
    this.onSubmitMessage = this.onSubmitMessage.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    Object.entries(this.props).forEach(
      ([key, val]) =>
        prevProps[key] !== val && console.log(`Prop '${key}' changed`)
    );
    if (this.state) {
      Object.entries(this.state).forEach(
        ([key, val]) =>
          prevState[key] !== val && console.log(`State '${key}' changed`)
      );
    }
  }

  onChangeMessage(event) {
    const { value } = event.target;
    this.setState(state => ({
      message: value
    }));
  }

  onSubmitMessage(event) {
    event.preventDefault();
    this.props.changeMessage(this.state.message);
    window.api.store.send(writeConfigRequest, "motd", this.state.message);
  }

  render() {
    return (
      <div>
        Message of the day: {this.props.home.message}
        <br />
        <form onSubmit={this.onSubmitMessage}>
          <input
            value={this.state.message}
            onChange={this.onChangeMessage}
          ></input>
          <input type="submit"></input>
        </form>
        <Detail></Detail>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => ({
  home: state.home
});
const mapDispatch = { changeMessage };

export default connect(mapStateToProps, mapDispatch)(Main);
