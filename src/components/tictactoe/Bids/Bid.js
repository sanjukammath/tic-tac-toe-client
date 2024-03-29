import React, { Component } from "react";
import { Table, Button } from "semantic-ui-react";
import { Link } from "react-router-dom";

class Bid extends Component {
  render() {
    const { bid } = this.props;
    //console.log(bid);
    const { Row, Cell } = Table;
    const { id, bidder, value } = bid;
    const parsed = parseInt(id);
    //const d = new Date(startDate * 1000);
    return (
      <Row>
        <Cell>{parsed + ""}</Cell>
        <Cell>{bidder}</Cell>
        <Cell>{parseInt(value)}</Cell>
        <Cell>
          <Link to={`/bids/${parsed}`}>
            <Button primary>Details</Button>
          </Link>
        </Cell>
      </Row>
    );
  }
}

export default Bid;
