import React, { Component } from "react";
import { Table, Button } from "semantic-ui-react";
import ReactPlayer from "react-player";

class Player extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.urlArr = ["https://jaystarymlmodels.s3.amazonaws.com/ttsMP3.com_VoiceText_2019-7-29_21_5_33.mp3",
      "https://jaystarymlmodels.s3.amazonaws.com/ttsMP3.com_VoiceText_2019-7-29_21_5_40.mp3"];
  }

  state = {
    url: null,
    playing: true,
    volume: 0.8,
    muted: false,
    played: 0,
    loaded: 0,
    playbackRate: 2.0,
    urlArrIndex: 0
  };

  componentDidMount() {
    this.load(this.urlArr[0])
  }

  load = url => {
    this.setState({
      url,
      played: 0,
      loaded: 0,
      pip: false
    });
  };

  onEnded = () => {
    console.log("Finished");
    this.urlArrIndex = this.urlArr.indexOf(this.state.url);
    this.state.url = this.urlArr[this.urlArrIndex + 1];
    console.log(this.state.url)
    this.state.playing = true;
    //Fetch current track
    //Get track +1
    //Play track +1
    //this.setState({ playing: true });
  };

  onProgress = state => {
    //console.log("onProgress", state);
    // We only want to update time slider if we are not currently seeking
    if (!this.state.seeking) {
      this.setState(state);
    }
  };

  render() {

    const {
      url,
      playing,
      volume,
      muted,
      played,
      loaded,
      playbackRate
    } = this.state;
    return (
      <div>
        <ReactPlayer url={this.state.url} playing={this.state.playing}
          className="react-player"
          controls
          width="100%"
          height="100%"
          playbackRate={playbackRate}
          volume={volume}
          muted={muted}
          onPlay={this.onPlay}
          onPause={this.onPause}
          onProgress={this.onProgress}
          onEnded={this.onEnded}
          marginLeft="20px"
          width="800px"
          height="50px"
        />
        <br />
        <div className="playerStyle" style={{ textAlign: "left" }}>

          <Button
            style={SpeedBtn}
            onClick={this.setPlaybackRate}
            value={1}
          >
            1x
                  </Button>{" "}
          <Button
            style={SpeedBtn}
            onClick={this.setPlaybackRate}
            value={1.5}
          >
            1.5x
                  </Button>{" "}
          <Button
            style={SpeedBtn}
            onClick={this.setPlaybackRate}
            value={2}
          >
            2x
                  </Button>{" "}
        </div>
      </div>
    );
  }
}

const SpeedBtn = {
  width: "45px",
  textAlign: "center",
  padding: "10px",
  color: "#204969"
};
export default Player;

