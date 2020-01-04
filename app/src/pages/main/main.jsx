import React from "react";
import { connect } from "react-redux";
import { changeMessage } from "Redux/components/home/homeSlice";
import Detail from "Components/detail/detail";

class Main extends React.Component {

    render() {
        return <div>
            Message of the day: {this.props.home.message}<br />
            <Detail></Detail>
        </div>;
    }
}

const mapStateToProps = (state, props) => ({
    home: state.home
});
const mapDispatch = { changeMessage };

export default connect(mapStateToProps, mapDispatch)(Main);