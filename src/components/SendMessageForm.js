import React, { Component } from "react";
import { Button, Form, TextArea, Grid, Input } from "semantic-ui-react";

const optionItems = ['Stream', 'Batch Processing']

class SendMessageForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            message: "",
            text: "",
            selectItem: optionItems[0],
            user: "jay",
            data: "hello"
        };

        this.handleClick = this.handleClick.bind(this)
        //  this.handleInputChange = this.handleInputChange.bind(this);
        // this.handleSubmit = this.handleSubmit.bind(this);
    }



    handleClick = (e) => {
        e.preventDefault();

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
    }


    // handleInputChange(event) {
    //     const target = event.target;
    //     const value = target.type === 'checkbox' ? target.checked : target.value;
    //     const name = target.name;

    //     this.setState({
    //         [name]: value
    //     })

    // }

    // handleSubmit(event) {
    //     event.preventDefault();
    // }

    render() {

        return (
            <div>
                <Form onSubmit={this.handleSubmit}
                // action="."
                // onSubmit={e => {
                //     e.preventDefault();
                //     this.props.onSubmitMessage(this.state.message);
                //     this.setState({ message: "" });
                // }}
                >
                    <Form.Field>
                        <TextArea
                            rows="20"
                            placeholder={"Enter your sentences..."}
                            name="message"
                            type="message"
                            value={this.state.message}
                            onChange={this.handleInputChange}
                        />
                    </Form.Field>
                    <Grid >
                        <Grid.Row >
                            <Grid.Column   >
                                <Input style={{ width: "45px" }} placeholder="3"
                                    name="text"
                                    type="text"
                                    value={this.state.text}
                                    onChange={this.handleInputChange}
                                />
                            </Grid.Column>
                            <Grid.Column style={{ width: "auto" }}>
                                <select
                                    name="selectItem"
                                    type="selectItem"
                                    value={this.state.option}
                                    onChange={this.handleInputChange}  >
                                    {optionItems.map(optionItem => {
                                        return <option value={optionItem} key={optionItem} >{optionItem}</option>
                                    })}
                                </select>
                            </Grid.Column>
                            <Grid.Column floated='right' width={5} >
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