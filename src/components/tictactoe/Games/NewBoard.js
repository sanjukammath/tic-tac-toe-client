import React, { Component } from "react";
import { Grid, Segment, Icon, Button, Message } from "semantic-ui-react";
import { Redirect } from "react-router-dom";

import web3 from "../../../web3";

class NewGame extends Component {
  state = {
    game: {},
    board: [],
    map: [],
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
      if (element === 1) {
        return "x";
      }
      if (element === 2) {
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
        return 2;
      }
      return 0;
    });
    return board;
  };

  async componentDidMount() {
    const { game, id } = this.props;
    if (game.numberOfGames) {
      const board = await game.getBoard(parseInt(id));
      const map = this.makeBoard(board);
      const details = await game.getGameDetails(parseInt(id));
      const gameState = parseInt(details[2]);
      this.setState({ game, board, map, id, gameState });
    }
  }

  handle = (selectRow, selectCol) => () => {
    const index = selectRow * 3 + selectCol;
    const map = this.makeBoard(this.state.board);

    map[index] = "x";
    this.setState({ map, selectRow, selectCol });
  };

  onSubmit = async () => {
    const { game, id, selectRow, selectCol } = this.state;
    const { callback } = this.props;
    this.setState({ loading: true, errorMessage: "", successMessage: "" });
    try {
      const accounts = await web3.eth.getAccounts();
      await game.start(parseInt(id), selectRow, selectCol, {
        from: accounts[0]
      });
      this.setState({
        successMessage:
          "Game has started. Click on Go to Game to see the Game Progress",
        loading: false
      });
      callback(game);
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
      id
    } = this.state;

    if (gameState > 0) {
      return <Redirect to={`/games/${id}`} />;
    }

    return gameState === 0 ? (
      <div className="ui container">
        <h3>Board</h3>
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
        <Button primary onClick={this.onSubmit} loading={loading}>
          Submit
        </Button>
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
    ) : (
      <div>
        This game has already been started. To see current progress Click on Go
        to Game.
      </div>
    );
  }
}

export default NewGame;
