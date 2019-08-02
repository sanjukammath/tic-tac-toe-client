import React, { Component } from "react";
import { Table, Button } from "semantic-ui-react";
import { Link } from "react-router-dom";

class Game extends Component {
  render() {
    const states = ["Started", "Closed", "Drew", "Won"];
    const { game } = this.props;
    //console.log(game);
    const { Row, Cell } = Table;
    const { bidId, X, state } = game;

    return (
      <Row>
        <Cell>{bidId + ""}</Cell>
        <Cell>{X}</Cell>
        <Cell>{states(state)}</Cell>
        <Cell>
          <Link to={`/games/${bidId}`}>
            <Button primary>Details</Button>
          </Link>
        </Cell>
      </Row>
    );
  }
}

export default Game;
