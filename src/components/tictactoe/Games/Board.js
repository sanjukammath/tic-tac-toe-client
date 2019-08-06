import React, { Component } from "react";
import { Grid, Segment, Icon, Button, Message } from "semantic-ui-react";

import web3 from "../../../web3";

class NewGame extends Component {
  state = {
    game: {},
    board: [],
    map: [],
    details: {},
    selectRow: 0,
    selectCol: 0,
    id: 0,
    gameState: 0,
    loading: false,
    errorMessage: "",
    successMessage: ""
  };

  makeBoard = board => {
    const map = board.map((element, index) => {
      if (parseInt(element) === 1) {
        return "x";
      }
      if (parseInt(element) === -1) {
        return "circle outline";
      }
      return "";
    });

    return map;
  };

  getCurrentBoard = map => {
    const board = map.map((element, index) => {
      if (element === "x") {
        return 1;
      }
      if (element === "circle outline") {
        return -1;
      }
      return 0;
    });
    return board;
  };

  async componentDidMount() {
    const { game, id } = this.props;
    if (game.bids) {
      const board = await game.getBoard(id);
      const map = this.makeBoard(board);
      const details = await game.getGameDetails(id);
      const gameState = parseInt(details[2]);
      this.setState({ game, board, map, id, gameState, details });
    }
  }

  handle = (selectRow, selectCol) => () => {
    const index = selectRow * 3 + selectCol;
    const map = this.makeBoard(this.state.board);
    const { details } = this.state;
    const X = details[0];
    const O = details[1];
    const L = details[5];

    if (L === X) {
      map[index] = "circle outline";
    } else if (L === O) {
      map[index] = "x";
    }

    this.setState({ map, selectRow, selectCol });
  };

  onSubmit = async () => {
    const { game, id, selectRow, selectCol } = this.state;
    this.setState({ loading: true, errorMessage: "", successMessage: "" });
    try {
      const accounts = await web3.eth.getAccounts();
      await game.play(id, selectRow, selectCol, { from: accounts[0] });
      const board = await game.getBoard(id);
      const map = this.makeBoard(board);
      const details = await game.getGameDetails(id);
      const gameState = parseInt(details[2]);
      this.setState({ game, board, map, id, gameState, details });
      const L = details[5];
      const W = details[4];
      if (gameState > 3) {
        if (L === W) {
          this.setState({
            successMessage:
              "You have won! You can claim your winnings or refunds in the payout page",
            loading: false
          });
        } else {
          this.setState({
            successMessage:
              "The game has drawn. You can claim your winnings or refunds in the payout page",
            loading: false
          });
        }
      } else {
        this.setState({
          successMessage: "Your play has been recorded on chain",
          loading: false
        });
      }
    } catch (err) {
      this.setState({ errorMessage: err.message, loading: false });
    }
  };

  handleDismiss = () => {
    this.setState({ errorMessage: "", successMessage: "" });
  };

  render() {
    const {
      map,
      gameState,
      errorMessage,
      successMessage,
      loading,
      details
    } = this.state;
    const lastTurn = details[5];
    return gameState === 0 ? (
      <div>
        This game has not been started. Go to bid details to create the game.
      </div>
    ) : (
      <div className="ui container">
        <h3>Board</h3>
        <p>Last Turn: {lastTurn}</p>
        <Segment>
          <Grid columns={3} celled="internally">
            <Grid.Row textAlign="center">
              <Grid.Column onClick={this.handle(0, 0)}>
                <Icon name={map[0]} size="large" />
              </Grid.Column>
              <Grid.Column onClick={this.handle(0, 1)}>
                <Icon name={map[1]} size="large" />
              </Grid.Column>
              <Grid.Column onClick={this.handle(0, 2)}>
                <Icon name={map[2]} size="large" />
              </Grid.Column>
            </Grid.Row>
            <Grid.Row textAlign="center">
              <Grid.Column onClick={this.handle(1, 0)}>
                <Icon name={map[3]} size="large" />
              </Grid.Column>
              <Grid.Column onClick={this.handle(1, 1)}>
                <Icon name={map[4]} size="large" />
              </Grid.Column>
              <Grid.Column onClick={this.handle(1, 2)}>
                <Icon name={map[5]} size="large" />
              </Grid.Column>
            </Grid.Row>
            <Grid.Row textAlign="center">
              <Grid.Column onClick={this.handle(2, 0)}>
                <Icon name={map[6]} size="large" />
              </Grid.Column>
              <Grid.Column onClick={this.handle(2, 1)}>
                <Icon name={map[7]} size="large" />
              </Grid.Column>
              <Grid.Column onClick={this.handle(2, 2)}>
                <Icon name={map[8]} size="large" />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
        {gameState < 3 ? (
          <Button primary onClick={this.onSubmit} loading={loading}>
            Submit
          </Button>
        ) : gameState === 5 ? (
          <p>This game was won by {lastTurn} </p>
        ) : gameState === 4 ? (
          <p>This game resulted in a draw </p>
        ) : (
          <p>The game was withdrawn</p>
        )}
        {errorMessage ? (
          <Message
            error
            header="Oops!"
            content={errorMessage}
            onDismiss={this.handleDismiss}
          />
        ) : successMessage ? (
          <Message
            success
            header="Success"
            content={successMessage}
            onDismiss={this.handleDismiss}
          />
        ) : (
          <div />
        )}
      </div>
    );
  }
}

export default NewGame;
