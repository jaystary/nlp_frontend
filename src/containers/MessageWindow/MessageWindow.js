import React, { Component } from "react";
import { Container, Grid } from "semantic-ui-react";
import { connect } from "react-redux";
import { makeMessages } from "../../redux/selectors";

import SendMessageForm from "../../components/SendMessageForm";
import Message from "../../components/Message";
import Player from "../../components/Player";
import TableComponent from "../../components/TableComponent";

import {
  Element,
  Events,
  animateScroll as scroll,
  scrollSpy
} from "react-scroll";

class MessageWindow extends Component {
  constructor(props) {
    super(props);

    this.state = {
      messages: [],
      message: "",
      dataSendMessage: "",
    };
  }

  componentDidMount() {
    Events.scrollEvent.register("begin", function (to, element) {
      console.log("begin", arguments);
    });

    Events.scrollEvent.register("end", function (to, element) {
      console.log("end", arguments);
    });

    scrollSpy.update();
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }

  componentWillUnmount() {
    // socket.off("get_data");
  }

  scrollToBottom = () => {
    scroll.scrollToBottom({
      containerId: "TextElement",
      duration: 1, // control speed of load text
      smooth: "linear"
    });
  };

  getData = (response) => {
    console.log(response);
    //const message = { name: this.state.name, message: messageString };
    //this.setState(state => ({ messages: [...state.messages, message] }));
   
  };

  submitMessage = (messageString) => {
    //socket.emit("get_data", messageString);
  };

  render() {
    const { messages } = this.props;

    return (
      <Container style={ContainerStyle}>
        <Grid>
          <Grid.Row style={InptutStyle}>
            <Grid.Column>
              <SendMessageForm/>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column style={TextMessageStyle}>
              <Element
                name="TextElement"
                className="element"
                id="TextElement"
                style={ElementStyle}
              >
                <Message message={this.state.message} />
        
                {messages && messages.map((message, index) => {
                  console.log(message);
                  return <Message key={index} message={message} />
                })}
              </Element>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Player />
          </Grid.Row>
          <Grid.Row>
            <TableComponent />
          </Grid.Row>
        </Grid>
      </Container>
    );
   
  }
}

const ContainerStyle = { minHeight: "100vh", width: "800px", };
const InptutStyle = { marginTop: 40, };
const TextMessageStyle = {
  background: "#93b5b3",
  borderRadius: "4px",
  marginLeft: "10px",
  marginRight: "10px",
};
const ElementStyle = {
  position: "relative",
  height: "350px",
  overflow: "auto",
};

const mapStateToProps = (state) => ({
  messages: makeMessages(state),
});

const mapDispatchToProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(MessageWindow);
