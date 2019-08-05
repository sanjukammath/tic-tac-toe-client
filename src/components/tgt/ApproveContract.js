import React, { Component } from "react";
import { Form, Button, Message, Input } from "semantic-ui-react";
import web3 from "../../web3";

class ApproveContract extends Component {
  state = {
    approve: "",
    approveError: "",
    toApprove: 0,
    approveLoading: false
  };

  approveContract = async event => {
    event.preventDefault();

    this.setState({ approveLoading: true, approve: "", approveError: "" });
    try {
      const accounts = await web3.eth.getAccounts();
      const { game, token } = this.props;
      await token.approve(game.address, this.state.toApprove, {
        from: accounts[0]
      });
      this.setState({
        approve: `You have approved Game Contract to spend ${
          this.state.toApprove
        } tokens.`
      });
    } catch (err) {
      this.setState({ approveError: err.message });
    }
    this.setState({ approveLoading: false });
  };

  handleDismiss = () => {
    this.setState({ approveError: "", approve: "" });
  };

  render() {
    return (
      <Form
        onSubmit={this.approveContract}
        error={!!this.state.approveError}
        success={!!this.state.approve}
      >
        <Input
          value={this.state.toApprove}
          onChange={event => this.setState({ toApprove: event.target.value })}
        />
        <br />
        <br />
        <Button color="green" loading={this.state.approveLoading}>
          Approve Tokens
        </Button>
        <Message
          success
          header="Success!"
          content={this.state.approve}
          onDismiss={this.handleDismiss}
        />
        <Message
          error
          header="Oops!"
          content={this.state.approveError}
          onDismiss={this.handleDismiss}
        />
      </Form>
    );
  }
}

export default ApproveContract;
