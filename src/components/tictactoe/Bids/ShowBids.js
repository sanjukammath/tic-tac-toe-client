import React, { Component } from "react";
import { Table, Divider, Button, Input } from "semantic-ui-react";
import { Link } from "react-router-dom";

import Layout from "../../Layout";
import Bid from "./Bid";

class ShowBids extends Component {
  state = {
    game: {},
    bids: [],
    id: 0
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
    const promises = bidIndex.map(async (element, index) => {
      const response = await game.bids(parseInt(element));
      return response;
    });

    const bids = await Promise.all(promises);
    this.setState({ bids });
  };

  render() {
    const { Header, Row, HeaderCell, Body } = Table;
    const { token, game } = this.props;
    const { id } = this.state;
    return (
      <Layout>
        <h3>TicTacToe</h3>
        <p>
          This Game uses Tic Tac Toe Game tokens deployed at
          {" " + token.address}. The contract is deployed at
          {" " + game.address}.
        </p>
        <Divider />
        <h4>Available Bids</h4>
        <Table>
          <Header>
            <Row>
              <HeaderCell>ID</HeaderCell>
              <HeaderCell>Bidder</HeaderCell>
              <HeaderCell>Stake</HeaderCell>
              <HeaderCell />
            </Row>
          </Header>
          <Body>{this.renderRows()}</Body>
        </Table>
        <Divider />
        <h4>Looking for specific bid? Search by ID</h4>
        <Input
          value={id}
          onChange={event => this.setState({ id: event.target.value })}
        />
        <br />
        <br />
        <Link to={`/bids/${id}`}>
          <Button primary>Get Details</Button>
        </Link>
      </Layout>
    );
  }
}

export default ShowBids;
