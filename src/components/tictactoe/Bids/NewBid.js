import React, { Component } from "react";
import { List, Divider } from "semantic-ui-react";

import Layout from "../../Layout";
import CheckAllowance from "../../tgt/CheckAllowance";
import ApproveContract from "../../tgt/ApproveContract";
import BidForm from "./BidForm";

class NewBid extends Component {
  render() {
    const { token, game } = this.props;
    return (
      <Layout>
        <h3>New Bid</h3>
        <p>
          Stake TicTacToe Game Tokens on an open challenge to a game. Winner
          takes all. You can specify the bid timeout and the stake.
        </p>
        <Divider />
        <List>
          <List.Item>
            <p>
              You have to allow the contract to spend at least the amount of
              tokens you wish to stake on the game.
            </p>
            <ApproveContract token={token} game={game} />
          </List.Item>
          <List.Item>
            <p>Not sure about how much allowance is remaining? Check here.</p>
            <CheckAllowance token={token} game={game} />
          </List.Item>
          <Divider />
          <h4>Enter bid details</h4>
          <List.Item>
            <BidForm token={token} game={game} />
          </List.Item>
        </List>
      </Layout>
    );
  }
}

export default NewBid;
