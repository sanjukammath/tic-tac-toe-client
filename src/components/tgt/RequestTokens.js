import React, { Component } from "react";
import { Form, Button, Message } from "semantic-ui-react";
import web3 from "../../web3";

class RequestTokens extends Component {
  state = {
    request: "",
    requestError: "",
    requestLoading: false
  };

  requestTokens = async event => {
    event.preventDefault();

    this.setState({ requestLoading: true, request: "", requestError: "" });
    try {
      const accounts = await web3.eth.getAccounts();
      await this.props.token.requestTokens({ from: accounts[0] });
      this.setState({ request: "You have received 5 Tokens" });
    } catch (err) {
      this.setState({ requestError: err.message });
    }
    this.setState({ requestLoading: false });
  };

  handleDismiss = () => {
    this.setState({ requestError: "", request: "" });
  };

  render() {
    return (
      <Form
        onSubmit={this.requestTokens}
        error={!!this.state.requestError}
        success={!!this.state.request}
      >
        <Button color="yellow" loading={this.state.requestLoading}>
          Request Tokens
        </Button>
        <Message
          success
          header="Success!"
          content={this.state.request}
          onDismiss={this.handleDismiss}
        />
        <Message
          error
          header="Oops!"
          content={this.state.requestError}
          onDismiss={this.handleDismiss}
        />
      </Form>
    );
  }
}

export default RequestTokens;
