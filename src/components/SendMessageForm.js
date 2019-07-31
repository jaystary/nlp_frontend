import React, { Component } from "react";
import { Button, Form, TextArea, Grid, Input, Select, GridColumn } from "semantic-ui-react";

const optionItems = ['Stream', 'Batch Processing']

class SendMessageForm extends Component {
    state = {
        message: "",
        text: "",
        selectItem: optionItems[0],
        user: "jay",
        data: ""
    };

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
                    <Form.Field>
                        <Grid divided='vertically'>
                            <Grid.Row columns={3}>
                                <Grid.Column>
                                    <Input placeholder="3" style={{ width: "45px", textalign: "left" }}
                                        value={this.state.text}
                                        onChange={e => this.setState({ text: e.target.value })}
                                    />
                                </Grid.Column>
                                <Grid.Column>
                                    <select value={this.state.selectItem} onChange={e => this.setState({ selectItem: e.target.value })}  >
                                        {optionItems.map(optionItem => {
                                            return <option value={optionItem} key={optionItem} >{optionItem}</option>
                                        })}
                                    </select>
                                </Grid.Column>
                                <Grid.Column>
                                    <Button onClick={this.handleClick} color="primary" type="submit" value={"Send"}>Send</Button>
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                    </Form.Field>
                </Form>
            </div>
        );
    }
}

export default SendMessageForm;