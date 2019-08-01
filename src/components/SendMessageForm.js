import React, { Component } from "react";
import { Button, Form, TextArea, Grid, Input, GridColumn } from "semantic-ui-react";
import { socket, Header } from "./Header";

const optionItems = ['Stream', 'Batch Processing']

class SendMessageForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            message: "",
            text: "",
            selectItem: optionItems[0],
            user: "jay",
            data: ""
        };

        this.handleClick = this.handleClick.bind(this)
        //  this.handleInputChange = this.handleInputChange.bind(this);
        // this.handleSubmit = this.handleSubmit.bind(this);
    }



    handleClick = (e) => {
        e.preventDefault();
        console.log("click")
        socket.emit(
            'send_message',
            {
                route: "test",
                id: 0,
                body: JSON.stringify(this.state),
                timeStamp: Date.now()
            }
        )
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


    // handleSubmit(event) {
    //     event.preventDefault();
    // }

    render() {

        return (
            <div>
                <Form
                    action="."
                    onSubmit={e => {
                        e.preventDefault();
                        this.props.onSubmitMessage(this.state.message);
                        this.setState({ message: "" });
                    }}
                >
                    <Form.Field>
                        <TextArea
                            rows="20"
                            placeholder={"Enter your sentences..."}
                            value={this.state.message}
                            onChange={e => this.setState({ message: e.target.value })}
                        />
                    </Form.Field>
                    <Grid >
                        <Grid.Row>
                            <Grid.Column>
                                <Input style={{ width: "45px" }} placeholder="3"
                                    value={this.state.text}
                                    onChange={e => this.setState({ text: e.target.value })}
                                />
                            </Grid.Column>
                            <Grid.Column style={{ width: "auto" }}>
                                <select
                                    value={this.state.selectItem}
                                    onChange={e =>
                                        this.setState({ selectItem: e.target.value })
                                    }
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
                                <Button onClick={this.handleClick} color="primary" type="submit" value={"Send"}>Send</Button>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Form>
                <p>{this.state.value}</p>
            </div>
        );
    }
}

export default SendMessageForm;