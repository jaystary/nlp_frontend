import React, { Component } from "react";
import { connect } from "react-redux";
import socketIOClient from "socket.io-client";
import MessageWindow from "./containers/MessageWindow";
import Header from "./components/Header/Header.js";
import { 
  setSocket,
  setTableData,
  setPlayerData,
  setPlayerURLs,
  appendMessage,
} from "./redux/actions";

import "./App.css";

var socket = null;
var endpoint = "http://0.0.0.0:2999/";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sentence: "",
      id: "",
      messages: [],
    };

    this.messagewindowElement = React.createRef();
    socket = socketIOClient(endpoint);
    this.props.setSocket(socket);
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  setSocketListeners() {
    const { setTableData, setPlayerData, setPlayerURLs, appendMessage } = this.props;
    console.log("arrives here")
    socket.on("table", (payload) => {
      console.log("Logging incomcing Table Message", payload.data);
      if ( Array.isArray(payload.data) ) {
        setTableData(payload.data);
      } else {
        setTableData([payload.data]);
      }
    });
    socket.on("player", (payload) => {
      // const { data } = payload;
      let data = [
        {
          "id": "1",
          "downloadURL": "asdf1",
          "sentence": "senetence1",
          "duration": "1:60",
          "audio_id": "1234",
          "job_id": "https://jaystarymlmodels.s3.amazonaws.com/ttsMP3.com_VoiceText_2019-7-29_21_5_33.mp3",
        }, 
        {
          "id": "2",
          "downloadURL": "asdf2",
          "sentence": "senetence2",
          "duration": "2:60",
          "audio_id": "12345",
          job_id: "https://jaystarymlmodels.s3.amazonaws.com/ttsMP3.com_VoiceText_2019-7-29_21_5_40.mp3",
        },
      ];
      const message = [], playerData = [], playerURLs = [];
      console.log("Logging incoming Player Message", data);
      if ( Array.isArray(data) ) {
        data.forEach((item) => {
          const { id, downloadURL, sentence, duration, audio_id, job_id} = item;
          message.push({ id, downloadURL, sentence });
          playerData.push({ duration, audio_id, job_id });
          playerURLs.push(job_id);
        });
      } else {
        const { id, downloadURL, sentence, duration, audio_id, job_id} = data;
        message.push({ id, downloadURL, sentence });
        playerData.push({ duration, audio_id, job_id });
        playerURLs.push(job_id);
      }

      appendMessage(message);
      setPlayerData(playerData);
      setPlayerURLs(playerURLs);
    })
    
    let data = [
      {
        "id": "1",
        "downloadURL": "asdf1",
        "sentence": "senetence1",
        "duration": "1:60",
        "audio_id": "1234",
        "job_id": "https://jaystarymlmodels.s3.amazonaws.com/ttsMP3.com_VoiceText_2019-7-29_21_5_33.mp3",
      }, 
      {
        "id": "2",
        "downloadURL": "asdf2",
        "sentence": "senetence2",
        "duration": "2:60",
        "audio_id": "12345",
        job_id: "https://jaystarymlmodels.s3.amazonaws.com/ttsMP3.com_VoiceText_2019-7-29_21_5_40.mp3",
      },
    ];
    const message = [], playerData = [], playerURLs = [];
    console.log("Logging incoming Player Message", data);
    if ( Array.isArray(data) ) {
      data.forEach((item) => {
        const { id, downloadURL, sentence, duration, audio_id, job_id} = item;
        message.push({ id, downloadURL, sentence });
        playerData.push({ duration, audio_id, job_id });
        playerURLs.push(job_id);
      });
    } else {
      const { id, downloadURL, sentence, duration, audio_id, job_id} = data;
      message.push({ id, downloadURL, sentence });
      playerData.push({ duration, audio_id, job_id });
      playerURLs.push(job_id);
    }

    appendMessage(message);
    setPlayerData(playerData);
    setPlayerURLs(playerURLs);
    //socket.on("message", data => this.setState({ response: data }));
  }

  getData = resp => {
    console.log(resp);
    //this.setState({ food_data: foodItems });
  };

  echoResponse = resp => {
    console.log(resp)
  };

  componentDidMount() {
    //this.loadMessages();
    this.setSocketListeners();
    //this.messagewindowElement.current.submitMessage("Hello")

    //socket.on("getdata", this.getData);
    //socket.on("echo", this.echoResponse);
    //socket.emit("echo");
  }

  componentWillUnmount() {
    //socket.off("getdata");
    //socket.off("echo");
  }

  render() {
    return (
      <div className="App">
        <Header/>
        <MessageWindow ref={this.messagewindowElement} />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({

});

const mapDispatchToProps = { 
  setSocket,
  setTableData,
  setPlayerData,
  setPlayerURLs,
  appendMessage,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
