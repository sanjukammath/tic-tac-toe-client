import React, { Component } from "react";
import contract from "truffle-contract";
import { List } from "semantic-ui-react";

import Layout from "../../Layout";
import TGToken from "../../../contracts/TGToken.json";
import Game from "../../../contracts/TicTacToe.json";

class ShowBids extends Component {
  render() {
    return (
      <Layout>
        <h3>TicTacToe</h3>
        <p>
          This Game uses Tic Tac Toe Game tokens deployed at
          {" " + this.props.token.address}. The contract is deployed at
          {" " + this.props.game.address}.
        </p>
        <List>
          <List.Item>Bid1</List.Item>
        </List>
      </Layout>
    );
  }
}

export default ShowBids;
