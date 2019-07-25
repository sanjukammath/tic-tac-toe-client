import React, { Component } from "react";
import { Divider, List } from "semantic-ui-react";

import Layout from "../Layout";
import CheckBalance from "./CheckBalance";
import RequestTokens from "./RequestTokens";
import CheckAllowance from "./CheckAllowance";
import ApproveContract from "./ApproveContract";

class Explore extends Component {
  render() {
    return (
      <Layout>
        <h3>TicTacToe Game Token</h3>
        <p>This token is defined at {this.props.game.address}.</p>
        <Divider />
        <List>
          <List.Item>
            <CheckBalance token={this.props.token} />
          </List.Item>
          <Divider />
          <List.Item>
            <RequestTokens token={this.props.token} />
          </List.Item>
          <Divider />
          <List.Item>
            <ApproveContract token={this.props.token} game={this.props.game} />
          </List.Item>
          <Divider />
          <List.Item>
            <CheckAllowance token={this.props.token} game={this.props.game} />
          </List.Item>
        </List>
      </Layout>
    );
  }
}

export default Explore;
