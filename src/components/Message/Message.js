import React from "react";
// import propTypes from "prop-types";

class Message extends React.Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     message: ""
  //   };
  // }

  render() {
    return (
      <div style={messageStyle}>{ this.props.message }</div>
    );
  }
}

const messageStyle = {
  margin: "10px",
  fontWeight: "bold",
  textAlign: "left",
};

export default Message;

