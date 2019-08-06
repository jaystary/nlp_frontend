import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, Form, TextArea, Grid, Input } from "semantic-ui-react";
import { makeSocket } from "../../redux/selectors";

const optionItems = ['Stream', 'Batch Processing']

class SendMessageForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      message: "",
      text: "",
      selectItem: optionItems[0],
      user: "jay",
      data: "",
    };
  }

  componentDidMount() {
    const { socket } = this.props;

    socket.on("message", data => this.setState({ response: data }));
  }

  componentDidUpdate() {
    console.log("Response coming", this.state.response);
  }

  handleClick = (e) => {
    e.preventDefault();
    console.log(this.state);
    const data = JSON.stringify(this.state);
    const timeStampVal = Date.now();
    const { socket } = this.props;

    socket.emit(
      'send_message',
      {
        route: "empty",
        id: 0,
        body: data,
        timeStamp: timeStampVal
      }
    );
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  render() {
    const {
      text,
      selectItem,
    } = this.state;

    return (
      <Form
        action="."
      >
        <Form.Field>
          <TextArea
            name="message"
            placeholder={"Enter your text..."}
            rows="20"
            onChange={this.handleChange}
          />
        </Form.Field>
        <Grid >
          <Grid.Row>
            
            <Grid.Column floated='right' width={5}>
              <Button 
                type="submit"
                color="blue" 
                onClick={this.handleClick}
              >
                Send
              </Button>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Form>
    );
  }
}

const mapStateToProps = (state) => ({
  socket: makeSocket(state),
});

const mapDispatchToProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(SendMessageForm);