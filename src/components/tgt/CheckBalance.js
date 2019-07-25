import React, { Component } from "react";
import { Form, Button, Message } from "semantic-ui-react";
import web3 from "../../web3";

class CheckBalance extends Component {
  state = {
    balance: "",
    balanceError: "",
    balanceLoading: false
  };

  checkBalance = async event => {
    event.preventDefault();

    this.setState({
      balanceLoading: true,
      balance: "",
      balanceError: ""
    });
    try {
      const accounts = await web3.eth.getAccounts();
      const balance = await this.props.token.balanceOf(accounts[0]);
      this.setState({ balance: `Your balance is ${balance}` });
    } catch (err) {
      this.setState({ balanceError: err.message });
    }
    this.setState({ balanceLoading: false });
  };

  handleDismiss = () => {
    this.setState({ balanceError: "", balance: "" });
  };

  render() {
    return (
      <Form
        onSubmit={this.checkBalance}
        error={!!this.state.balanceError}
        success={!!this.state.balance}
      >
        <Button color="orange" loading={this.state.balanceLoading}>
          Check Balance
        </Button>
        <Message
          success
          header="Token Balance"
          content={this.state.balance}
          onDismiss={this.handleDismiss}
        />
        <Message
          error
          header="Oops!"
          content={this.state.balanceError}
          onDismiss={this.handleDismiss}
        />
      </Form>
    );
  }
}

export default CheckBalance;
