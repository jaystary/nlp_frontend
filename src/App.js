import React, { Component } from "react";
import "./App.css";
import MessageWindow from "./components/MessageWindow";
import { socket, Header } from "./components/Header";


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sentence: "",
      id: "",
      messages: [],
    };

    this.messagewindowElement = React.createRef();
  }


  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  setSocketListeners() {
    console.log("arrives here")
    /*socket.on("message", data => {
      console.log("Logging incomcing Message")
      console.log(data.message);
    });
    */
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
    //this.setSocketListeners();
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
        < Header />
        <MessageWindow ref={this.messagewindowElement} />
      </div>
    );
  }
}

export default App;
