import React, { Component } from "react";
import ReactPlayer from "react-player";
import { connect } from "react-redux";
import { makePlayerURLs } from "../../redux/selectors";
import SpeedButton from './SpeedButton';

class Player extends Component {
  constructor(props) {
    super(props);

    this.state = {
      url: null,
      playing: false,
      volume: 0.8,
      muted: false,
      played: 0,
      loaded: 0,
      playbackRate: 1.0,
    };

  }

  componentDidMount() {
    this.load(this.props.playerURLs[0]);
  }

  componentDidUpdate(prevProps) {
    if( prevProps.playerURLs.length !== this.props.playerURLs.length ) {
      this.load(this.props.playerURLs[0]);
    }
    
    return true;
  }

  load = (url) => {
    this.setState({
      url,
      played: 0,
      loaded: 0,
      pip: false,
    });
  };

  onEnded = () => {
    const { playerURLs } = this.props;
    const playerURLsIndex = playerURLs.indexOf(this.state.url);

    console.log("Finished");
    // this.state.url = urlArr[this.urlArrIndex + 1];
    // console.log(this.state.url)
    // this.state.playing = true;
    this.setState({
      url: playerURLs[playerURLsIndex + 1],
      playing: true,
    })
    //Fetch current track
    //Get track +1
    //Play track +1
    //this.setState({ playing: true });
  };

  onProgress = (state) => {
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
      // played,
      // loaded,
      playbackRate
    } = this.state;
    const speedRates = ["1.0x", "1.5x", "2.0x"];

    return (
      <div>
        <ReactPlayer url={url} playing={playing}
          className="react-player"
          controls
          // width="100%"
          // height="100%"
          playbackRate={playbackRate}
          volume={volume}
          muted={muted}
          onPlay={this.onPlay}
          onPause={this.onPause}
          onProgress={this.onProgress}
          onEnded={this.onEnded}
          style={{"marginLeft": "20px"}}
          width="800px"
          height="50px"
        />
        <br />
        <div className="playerStyle" style={{ textAlign: "left" }}>
          {
            speedRates.map((item) => (
              <SpeedButton speedRate={item} setPlaybackRate={this.setPlaybackRate} key={item}/>
            ))
          }
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) =>({
  playerURLs: makePlayerURLs(state),
});

const mapDispatchToProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(Player);

