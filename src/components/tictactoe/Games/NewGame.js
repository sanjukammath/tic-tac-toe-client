import React, { Component } from "react";
import { Divider } from "semantic-ui-react";

import Board from "./Board";

class NewGame extends Component {
  render() {
    const { game, id } = this.props;
    return (
      <div>
        <h3>New Game</h3>
        <Divider />
        <Board game={game} id={id} />
      </div>
    );
  }
}

export default NewGame;
