import React, { Component } from "react";
import { Grid, Segment, Icon } from "semantic-ui-react";

class NewGame extends Component {
  state = {
    game: {},
    board: [],
    map: [],
    id: 0
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

  async componentDidMount() {
    const { game, id } = this.props;
    if (game.numberOfGames) {
      const board = await game.getBoard(id);
      const map = this.makeBoard(board);
      this.setState({ game, board, map, id });
    }
  }

  handle = (row, col) => () => {
    // const { board } = this.state;
    const index = row * 3 + col;
    console.log(index);
  };

  render() {
    const { map } = this.state;
    return (
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
      </div>
    );
  }
}

export default NewGame;
