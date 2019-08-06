import React, { Component } from "react";
import ReactPlayer from "react-player";
import { connect } from "react-redux";
import { makeMessages, makePlayerURLs, makePlayerIndex } from "../../redux/selectors";
import SpeedButton from './SpeedButton';

class Player extends Component {
  constructor(props) {
    super(props);

    this.state = {
      url: [],
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
    if( prevProps.startIndex !== this.props.startIndex ) {
      console.log('Updated startIndex');
      this.load(this.props.playerURLs[this.props.startIndex]);
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

  onPlay = () => {
    const { playerURLs } = this.props;
    const { url } = this.state;
    const playerURLsIndex = playerURLs.indexOf(url);
    const { addMessage, messages } = this.props;
    
    if( url) {
      addMessage(messages[playerURLsIndex]);
    }
  }

  onEnded = () => {
    const { playerURLs } = this.props;
    const playerURLsIndex = playerURLs.indexOf(this.state.url);

    // this.state.playing = true;
    this.setState({
      url: playerURLs[playerURLsIndex + 1],
      playing: true,
    })

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
          controls={true}
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
  messages: makeMessages(state),
  playerURLs: makePlayerURLs(state),
  startIndex: makePlayerIndex(state),
});

const mapDispatchToProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(Player);

