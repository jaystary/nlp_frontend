import React, { Component } from "react";
import { Button } from "semantic-ui-react";

class SpeedButton extends Component {
  render() {
    const { speedRate, setPlaybackRate } = this.props;

    return (
      <Button
        style={SpeedBtn}
        onClick={setPlaybackRate}
        value={speedRate}
      >
        {speedRate}
      </Button>
    )
  }
}

const SpeedBtn = {
  width: "45px",
  color: "#204969",
  marginLeft: "20px",
  padding: "10px",
  textAlign: "center",
};

export default SpeedButton;