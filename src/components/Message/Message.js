import React from "react";


class Message extends React.Component {

  render() {
    const { message } = this.props;

    return (
      <div style={messageStyle}><a href="asdf.html">{message.sentence }</a></div>
    );
  }
}

const messageStyle = {
  margin: "10px",
  fontWeight: "bold",
  textAlign: "left",
};


export default Message;

