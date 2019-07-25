import React, { Component } from "react";
import { Form, Button, Message } from "semantic-ui-react";
import web3 from "../../web3";

class CheckAllowance extends Component {
  state = {
    allowance: "",
    allowanceError: "",
    allowanceLoading: false
  };

  checkAllowance = async event => {
    event.preventDefault();

    this.setState({
      allowanceLoading: true,
      allowance: "",
      allowanceError: ""
    });

    try {
      const accounts = await web3.eth.getAccounts();
      const { game, token } = this.props;
      const allowance = await token.allowance(accounts[0], game.address);
      this.setState({
        allowance: `You have approved Game Contract to spend ${allowance} tokens.`
      });
    } catch (err) {
      this.setState({ allowanceError: err.message });
    }
    this.setState({ allowanceLoading: false });
  };

  handleDismiss = () => {
    this.setState({ allowanceError: "", allowance: "" });
  };

  render() {
    return (
      <Form
        onSubmit={this.checkAllowance}
        error={!!this.state.allowanceError}
        success={!!this.state.allowance}
      >
        <Button color="orange" loading={this.state.allowanceLoading}>
          Check Allowance
        </Button>
        <Message
          success
          header="Token Balance"
          content={this.state.allowance}
          onDismiss={this.handleDismiss}
        />
        <Message
          error
          header="Oops!"
          content={this.state.allowanceError}
          onDismiss={this.handleDismiss}
        />
      </Form>
    );
  }
}

export default CheckAllowance;
