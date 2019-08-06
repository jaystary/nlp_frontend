import React, { Component } from "react";
import { Container, Grid } from "semantic-ui-react";
import { connect } from "react-redux";
import { makePlayerURLs } from "../../redux/selectors";

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

  };

  addMessage = (message) => {
    const { messages } = this.state;

    messages.push(message);
    this.setState({ messages });
  };

  clearMessage = () => {
    this.setState({ messages: [] });
  };

  render() {
    const { playerURLs } = this.props;
    const { messages } = this.state;

    console.log('Messages', messages);

    return (
      <Container style={ContainerStyle}>
        <Grid>
          <Grid.Row columns={2} style={InptutStyle}>
            <Grid.Column>
              <SendMessageForm clearMessage={this.clearMessage} />
            </Grid.Column>

            <Grid.Column style={TextMessageStyle}>
              <Element
                name="TextElement"
                className="element"
                id="TextElement"
                style={ElementStyle}
              >
                {messages && messages.map((message, index) => {
                  return <Message
                    key={index}
                    message={message}
                    playerURL={playerURLs[index]}
                    index={index}
                  />
                })}
              </Element>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Player addMessage={this.addMessage} />
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
};
const ElementStyle = {
  position: "relative",
  height: "350px",
  overflow: "auto",
};

const mapStateToProps = (state) => ({
  playerURLs: makePlayerURLs(state),
});

const mapDispatchToProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(MessageWindow);
