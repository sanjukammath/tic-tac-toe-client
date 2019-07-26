import React, { Component } from "react";
import { Table, Divider } from "semantic-ui-react";

import Layout from "../../Layout";
import Bid from "./Bid";

class ShowBids extends Component {
  state = {
    game: {},
    bids: []
  };
  renderRows = () => {
    return this.state.bids.map((bid, index) => {
      return <Bid bid={bid} key={index + 1} index={index} />;
    });
  };
  async componentWillReceiveProps(nextProps) {
    const { game } = nextProps;
    if (game) {
      this.getBids(game);
    }
  }
  async componentDidMount() {
    const { game } = this.props;
    if (game.getBidsCount) {
      this.getBids(game);
    }
  }

  getBids = async game => {
    const bidCount = await game.getBidsCount();
    const bidIndex = await Promise.all(
      Array(parseInt(bidCount))
        .fill()
        .map((element, index) => {
          return game.openBids(index);
        })
    );
    const promises = bidIndex.map(async index => {
      const response = await game.bids(index);
      return response;
    });

    const bids = await Promise.all(promises);
    this.setState({ bids });
  };

  render() {
    const { Header, Row, HeaderCell, Body } = Table;
    const { token, game } = this.props;
    return (
      <Layout>
        <h3>TicTacToe</h3>
        <p>
          This Game uses Tic Tac Toe Game tokens deployed at
          {" " + token.address}. The contract is deployed at
          {" " + game.address}.
        </p>
        <Divider />
        <Table>
          <Header>
            <Row>
              <HeaderCell>ID</HeaderCell>
              <HeaderCell>Bidder</HeaderCell>
              <HeaderCell>Stake</HeaderCell>
              <HeaderCell>Bid Time Out</HeaderCell>
            </Row>
          </Header>
          <Body>{this.renderRows()}</Body>
        </Table>
      </Layout>
    );
  }
}

export default ShowBids;
