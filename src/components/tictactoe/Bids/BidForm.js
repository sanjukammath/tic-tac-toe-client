import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
  Form,
  Button,
  Message,
  Input,
  Label,
  Divider
} from "semantic-ui-react";
import web3 from "../../../web3";

class BidForm extends Component {
  state = {
    stake: 0,
    timeOut: 0,
    loading: false,
    errorMessage: ""
  };

  onSubmit = async event => {
    event.preventDefault();

    this.setState({ loading: true, errorMessage: "" });
    const { stake, timeOut } = this.state;
    const { game } = this.props;
    try {
      const accounts = await web3.eth.getAccounts();
      await game.bid(stake, timeOut, { from: accounts[0] });
    } catch (err) {
      this.setState({ errorMessage: err.message });
    }

    this.setState({ loading: false });
  };
  render() {
    return (
      <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
        <Input
          value={this.state.stake}
          onChange={event => this.setState({ stake: event.target.value })}
          labelPosition="right"
        >
          <Label color="black">Stake</Label>
          <input />
          <Label>TGT</Label>
        </Input>
        <br />
        <br />
        <Input
          value={this.state.timeOut}
          onChange={event => this.setState({ timeOut: event.target.value })}
          labelPosition="right"
        >
          <Label color="black">Time Out</Label>
          <input />
          <Label>seconds</Label>
        </Input>
        <Divider />
        <Message error header="Oops!" content={this.state.errorMessage} />
        <Button primary loading={this.state.loading}>
          Create
        </Button>
        <Link to={`/bids`}>
          <Button secondary>Back</Button>
        </Link>
      </Form>
    );
  }
}

export default BidForm;
