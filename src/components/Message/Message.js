import React from "react";
import { connect } from "react-redux";
import { setStartIndex } from "../../redux/actions";

class Message extends React.Component {
  handleClick = (e, index) => {
    e.preventDefault();
    const { setStartIndex } = this.props;

    setStartIndex(index);
  }
  render() {
    const { message, playerURL, index } = this.props;

    return (
      <div style={messageStyle}>
        <a href={playerURL} onClick={(e) => this.handleClick(e, index)}>
          {message && message.sentence}
        </a>
      </div>
    );
  }
}

const messageStyle = {
  margin: "10px",
  fontWeight: "bold",
  textAlign: "left",
};

const mapStateToProps = (state) => ({

});

const mapDispatchToProps = {
  setStartIndex,
};

export default connect(mapStateToProps, mapDispatchToProps)(Message);

