import React, { Component } from "react";
import { Card, Button, Message } from "semantic-ui-react";
import { Link } from "react-router-dom";
import web3 from "../../../web3";

import Layout from "../../Layout";
import NewGame from "../Games/NewGame";

class InspectBid extends Component {
  state = {
    game: {},
    bid: {},
    accepting: false,
    requesting: false,
    errorMessage: "",
    successMessage: "",
    showGame: false
  };
  async componentDidMount() {
    const game = this.props.game;
    if (game.bids) {
      this.setState({ game });
      this.getBid(game);
    }
  }

  async componentWillReceiveProps(nextProps) {
    const { game } = nextProps;
    if (game) {
      this.setState({ game });
      this.getBid(game);
    }
  }

  getBid = async game => {
    const { id } = this.props.match.params;
    const bid = await game.bids(id);
    this.setState({ bid });
  };

  accept = async () => {
    const { id } = this.props.match.params;
    const { game } = this.state;
    const accounts = await web3.eth.getAccounts();
    this.setState({ accepting: true, successMessage: "", errorMessage: "" });
    try {
      await game.accept(id, { from: accounts[0] });
      this.setState({ successMessage: "The bid has been accepted" });
      this.getBid(game);
    } catch (err) {
      this.setState({ errorMessage: err.message });
    }
    this.setState({ accepting: false });
  };

  request = async () => {
    const { id } = this.props.match.params;
    const { game } = this.state;
    const accounts = await web3.eth.getAccounts();
    this.setState({ requesting: true, successMessage: "", errorMessage: "" });
    try {
      await game.timeOut(id, { from: accounts[0] });
      this.setState({ successMessage: "The bid has been cancelled" });
      this.getBid(game);
    } catch (err) {
      this.setState({ errorMessage: err.message });
    }
    this.setState({ requesting: false });
  };

  handleDismiss = () => {
    this.setState({ errorMessage: "", successMessage: "" });
  };

  handleNewGame = async () => {
    this.setState({ showGame: true });
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
    const {
      requesting,
      accepting,
      errorMessage,
      successMessage,
      showGame,
      game
    } = this.state;
    const date = new Date(startDate * 1000);
    return (
      <Layout>
        {this.state.bid.id ? (
          parseInt(bidder) ? (
            <Card fluid>
              <Card.Content>
                <Card.Header>Bid ID: {parseInt(id)}</Card.Header>
                <Card.Meta>
                  <span className="date">
                    Bid Created on {date.toLocaleString()}
                  </span>
                </Card.Meta>
                <br />
                Bidder : {bidder}
                <br />
                {parseInt(acceptor) ? (
                  `Acceptor : ${acceptor}`
                ) : (
                  <i>This bid is not accepted yet</i>
                )}
                <br />
                Stake: {value + " TGT"}
                <br />
                TimeOut: {bidTimeOut + " seconds"}
              </Card.Content>

              {parseInt(state) === 0 ? (
                <Card.Content extra>
                  <div className="ui two buttons">
                    <Button
                      basic
                      color="green"
                      onClick={this.accept}
                      loading={accepting}
                    >
                      Accept
                    </Button>
                    <Button
                      basic
                      color="red"
                      loading={requesting}
                      onClick={this.request}
                    >
                      Time Out
                    </Button>
                  </div>
                  {successMessage ? (
                    <Message
                      success
                      header="Success"
                      content={successMessage}
                      onDismiss={this.handleDismiss}
                    />
                  ) : errorMessage ? (
                    <Message
                      error
                      header="Oops!"
                      content={errorMessage}
                      onDismiss={this.handleDismiss}
                    />
                  ) : (
                    <br />
                  )}
                </Card.Content>
              ) : parseInt(state) === 1 ? (
                <Card.Content extra>
                  <div className="ui two buttons">
                    <Button basic color="green">
                      <Link style={{ color: "green" }} to={`/games/${id}`}>
                        Go to Game
                      </Link>
                    </Button>

                    <Button
                      basic
                      color="red"
                      loading={requesting}
                      onClick={this.handleNewGame}
                    >
                      Create Game
                    </Button>
                  </div>
                  {successMessage ? (
                    <Message
                      success
                      header="Success"
                      content={successMessage}
                      onDismiss={this.handleDismiss}
                    />
                  ) : errorMessage ? (
                    <Message
                      error
                      header="Oops!"
                      content={errorMessage}
                      onDismiss={this.handleDismiss}
                    />
                  ) : (
                    <br />
                  )}
                </Card.Content>
              ) : (
                <Card.Content extra>
                  This bid has been closed and disbursed. To claim any tokens go
                  to payout page.
                </Card.Content>
              )}
            </Card>
          ) : (
            <div>This bid does not exist yet</div>
          )
        ) : (
          <div>loading...</div>
        )}
        {showGame ? (
          <NewGame game={game} id={id} callback={this.getBid} />
        ) : (
          <div />
        )}
      </Layout>
    );
  }
}

export default InspectBid;
