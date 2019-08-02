import React, { Component } from "react";

import Layout from "../../Layout";

class InspectGame extends Component {
  state = {
    game: {},
    currentGame: {},
    playing: false,
    errorMessage: "",
    successMessage: ""
  };

  async componentDidMount() {
    const game = this.props.game;
    if (game.bids) {
      this.setState({ game });
      this.getCurrentGame(game);
    }
  }

  async componentWillReceiveProps(nextProps) {
    const { game } = nextProps;
    if (game) {
      this.setState({ game });
      this.getCurrentGame(game);
    }
  }

  getCurrentGame = async game => {
    const { id } = this.props.match.params;
    const currentGame = await game.games(id);
    this.setState({ currentGame });
  };

  render() {
    console.log(this.state.currentGame);
    return (
      <Layout>
        <div>InspectGame</div>
      </Layout>
    );
  }
}

export default InspectGame;
