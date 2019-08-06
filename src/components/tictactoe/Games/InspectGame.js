import React, { Component } from "react";

import Layout from "../../Layout";
import Board from "./Board";

class InspectGame extends Component {
  state = {
    game: {},
    id: 0,
    currentGame: {},
    playing: false,
    errorMessage: "",
    successMessage: ""
  };

  async componentDidMount() {
    const game = this.props.game;
    const { id } = this.props.match.params;
    if (game.bids) {
      this.setState({ game });
      // this.getCurrentGame(game);
    }
    this.setState({ id });
  }

  async componentWillReceiveProps(nextProps) {
    const { game } = nextProps;
    if (game) {
      this.setState({ game });
      // this.getCurrentGame(game);
    }
  }

  // getCurrentGame = async game => {
  //   const { id } = this.state;
  //   const currentGame = await game.games(id);
  //   this.setState({ currentGame });
  // };

  render() {
    const { game, id } = this.state;
    return (
      <Layout>
        {game.bids ? <Board game={game} id={id} /> : <div>loading...</div>}
      </Layout>
    );
  }
}

export default InspectGame;
