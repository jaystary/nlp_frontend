import React, { Component } from "react";
import { connect } from "react-redux";
import socketIOClient from "socket.io-client";
import MessageWindow from "./containers/MessageWindow";
import Header from "./components/Header/Header.js";
import Logo from "./img/Logo_Small.png";
import { Container, Grid, Image } from "semantic-ui-react";


import {
  setSocket,
  setTableData,
  setPlayerData,
  setPlayerURLs,
  appendMessage
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
      user: "jay"
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
    socket.on("table", (payload) => {
      console.log(payload)
      const { data } = payload;
      let table = [];
      console.log("Logging incomcing Table Message", data);
      console.log(":", typeof data);
      if (Array.isArray(data)) {
        console.log('Table update:', data);
        table = data;
      } else {
        table.push(data);
      }
      
      setTableData(data);
    });
    socket.on("player", (payload) => {
      const { data } = payload;
      const message = [], playerData = [], playerURLs = [];
      console.log("Logging incoming Player Message", data);
      if (Array.isArray(data)) {
        data.forEach((item) => {
          const { id, downloadURL, sentence, duration, audio_id, job_id } = item;
          message.push({ id, downloadURL, sentence });
          playerData.push({ duration, audio_id, job_id });
          playerURLs.push(job_id);
        });
      } else {
        const { id, downloadURL, sentence, duration, audio_id, job_id } = data;
        message.push({ id, downloadURL, sentence });
        playerData.push({ duration, audio_id, job_id });
        playerURLs.push(job_id);
      }

      appendMessage(message);
      setPlayerURLs(playerURLs);
      setPlayerData(playerData);
    })

  }

  getData = resp => {
    console.log(resp);
  };

  echoResponse = resp => {
    console.log(resp)
  };

  componentDidMount() {
    this.setSocketListeners();
    socket.emit(
      'get_table',
      {
        user: this.state.user,
        uid: "",
      }
    );

  }

  componentWillUnmount() {
  }

  render() {
    return (
      <div className="App">
        <Container style={ContainerStyle}>
          <Header />
          <Grid >
            <Grid.Column floated='left' width={5}>
              <Image src={Logo} alt="logo" minHeight="45%" width="45%" />
            </Grid.Column>
            <Grid.Column floated='right' width={5} verticalAlign='bottom'>
              <b>Logged in as: </b>{this.state.user}
            </Grid.Column>
          </Grid>
          <MessageWindow ref={this.messagewindowElement} />
        </Container>
      </div>
    );
  }
}

const ContainerStyle = { minHeight: "100vh", width: "800px" };

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
