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
        route: "test",
        id: 0,
        body: data,
        timeStamp: timeStampVal
      }
    );
    /*
    fetch('/audioy', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(this.state)
    }).then(response => response.json())
        .then(data => this.setState({ data }));
    console.log(this.state);
    */
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
            placeholder={"Enter your sentences..."}
            rows="20"
            onChange={this.handleChange}
          />
        </Form.Field>
        <Grid >
          <Grid.Row>
            <Grid.Column>
              <Input  
                name="text"
                placeholder="3"
                value={text}
                style={{ width: "45px" }}
                onChange={this.handleChange}
              />
            </Grid.Column>
            <Grid.Column style={{ width: "auto" }}>
              <select
                name="selectItem"
                value={selectItem}
                onChange={this.handleChange}
              >
                {optionItems.map(optionItem => {
                  return (
                    <option value={optionItem} key={optionItem}>
                      {optionItem}
                    </option>
                  );
                })}
              </select>
            </Grid.Column>
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