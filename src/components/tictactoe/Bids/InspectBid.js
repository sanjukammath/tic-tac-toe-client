import React, { Component } from "react";
import { Card, Button } from "semantic-ui-react";

import Layout from "../../Layout";

class InspectBid extends Component {
  state = {
    bid: {}
  };
  async componentDidMount() {
    const game = this.props.game;
    if (game.bids) {
      this.getBid(game);
    }
  }

  async componentWillReceiveProps(nextProps) {
    const { game } = nextProps;
    if (game) {
      this.getBid(game);
    }
  }

  getBid = async game => {
    const { id } = this.props.match.params;
    const bid = await game.bids(id);
    this.setState({ bid });
  };

  render() {
    const {
      id,
      bidder,
      acceptor,
      bidTimeOut,
      startDate,
      value,
      state
    } = this.state.bid;
    const date = new Date(startDate * 1000);
    return (
      <Layout>
        {this.state.bid.id ? (
          <Card fluid>
            <Card.Content>
              <Card.Header>Bid ID: {parseInt(id)}</Card.Header>
              <Card.Meta>
                <span className="date">
                  Bid Created on {date.toLocaleString()}
                </span>
              </Card.Meta>
              <br />X : {bidder}
              <br />
              {parseInt(acceptor)
                ? `O : ${acceptor}`
                : "This bid is not accepted yet"}
              <br />
              Stake: {value + " TGT"}
              <br />
              TimeOut: {bidTimeOut + " seconds"}
            </Card.Content>
            {parseInt(state) === 0 ? (
              <Card.Content extra>
                <div className="ui two buttons">
                  <Button basic color="green">
                    Accept
                  </Button>
                  <Button basic color="red">
                    Time Out
                  </Button>
                </div>
              </Card.Content>
            ) : (
              <br />
            )}
          </Card>
        ) : (
          <div>loading...</div>
        )}
      </Layout>
    );
  }
}

export default InspectBid;
