import React, { Component } from "react";
import { Divider } from "semantic-ui-react";

import Board from "./NewBoard";

class NewGame extends Component {
  render() {
    const { game, id, callback } = this.props;
    return (
      <div>
        <h3>New Game</h3>
        <Divider />
        <Board game={game} id={id} callback={callback} />
      </div>
    );
  }
}

export default NewGame;
