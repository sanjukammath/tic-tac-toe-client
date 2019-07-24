import React, { Component } from "react";
import contract from "truffle-contract";
import { Divider, Button, List, Message, Form, Input } from "semantic-ui-react";
import web3 from "../../web3";

import TGToken from "../../contracts/TGToken.json";
import Game from "../../contracts/TicTacToe.json";
import Layout from "../Layout";

class Explore extends Component {
  state = {
    token: {},
    game: {},
    owner: "",
    balance: "",
    request: "",
    approve: "",
    toApprove: "",
    allowance: "",
    balanceError: "",
    requestError: "",
    approveError: "",
    allowanceError: "",
    balanceLoading: false,
    requestLoading: false,
    approveLoading: false,
    allowanceLoading: false
  };
  async componentDidMount() {
    const TokenContract = contract(TGToken);
    const GameContract = contract(Game);
    TokenContract.setProvider(window.web3.currentProvider);
    GameContract.setProvider(window.web3.currentProvider);
    const token = await TokenContract.deployed();
    const game = await GameContract.deployed();
    const owner = await token.contractOwner();

    this.setState({ token, owner, game });
  }
  checkBalance = async event => {
    event.preventDefault();

    this.cleanState();
    this.setState({ balanceLoading: true });
    try {
      const accounts = await web3.eth.getAccounts();
      const balance = await this.state.token.balanceOf(accounts[0]);
      this.setState({ balance: `Your balance is ${balance}` });
    } catch (err) {
      this.setState({ balanceError: err.message });
    }
    this.setState({ balanceLoading: false });
  };

  requestTokens = async event => {
    event.preventDefault();

    this.cleanState();
    this.setState({ requestLoading: true });
    try {
      const accounts = await web3.eth.getAccounts();
      await this.state.token.requestTokens({ from: accounts[0] });
      this.setState({ request: "You have received 5 Tokens" });
    } catch (err) {
      this.setState({ requestError: err.message });
    }
    this.setState({ requestLoading: false });
  };

  approveContract = async event => {
    event.preventDefault();

    this.cleanState();
    this.setState({ approveLoading: true });
    try {
      const accounts = await web3.eth.getAccounts();
      const { toApprove, game, token } = this.state;
      await token.approve(game.address, toApprove, {
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

  checkAllowance = async event => {
    event.preventDefault();

    this.cleanState();
    this.setState({ allowanceLoading: true });

    try {
      const accounts = await web3.eth.getAccounts();
      const { game, token } = this.state;
      const allowance = await token.allowance(accounts[0], game.address);
      this.setState({
        allowance: `You have approved Game Contract to spend ${allowance} tokens.`
      });
    } catch (err) {
      this.setState({ allowanceError: err.message });
    }
    this.setState({ allowanceLoading: false });
  };

  cleanState = async => {
    this.setState({
      balance: "",
      request: "",
      approve: "",
      allowance: "",
      balanceError: "",
      requestError: "",
      approveError: "",
      allowanceError: "",
      balanceLoading: false,
      requestLoading: false,
      approveLoading: false,
      allowanceLoading: false
    });
  };
  render() {
    return (
      <Layout>
        <h3>TicTacToe Game Token</h3>
        <p>This token is owned by {this.state.contractOwner}.</p>
        <Divider />
        <List>
          <List.Item>
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
              />
              <Message error header="Oops!" content={this.state.balanceError} />
            </Form>
          </List.Item>
          <Divider />
          <List.Item>
            <Form
              onSubmit={this.requestTokens}
              error={!!this.state.requestError}
              success={!!this.state.request}
            >
              <Button color="yellow" loading={this.state.requestLoading}>
                Request Tokens
              </Button>
              <Message success header="Success!" content={this.state.request} />
              <Message error header="Oops!" content={this.state.requestError} />
            </Form>
          </List.Item>
          <Divider />
          <List.Item>
            <Form
              onSubmit={this.approveContract}
              error={!!this.state.approveError}
              success={!!this.state.approve}
            >
              <Input
                value={this.state.toApprove}
                onChange={event =>
                  this.setState({ toApprove: event.target.value })
                }
              />
              <br />
              <br />
              <Button color="green" loading={this.state.approveLoading}>
                Approve Tokens
              </Button>
              <Message success header="Success!" content={this.state.approve} />
              <Message error header="Oops!" content={this.state.approveError} />
            </Form>
          </List.Item>
          <Divider />
          <List.Item>
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
              />
              <Message
                error
                header="Oops!"
                content={this.state.allowanceError}
              />
            </Form>
          </List.Item>
        </List>
      </Layout>
    );
  }
}

export default Explore;
