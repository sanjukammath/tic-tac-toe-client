import React, { Component } from "react";
import { Button, Input } from "semantic-ui-react";
import { Link } from "react-router-dom";

import Layout from "../../Layout";
import Game from "./Game";

class ShowGames extends Component {
  state = {
    game: {},
    games: [],
    id: 0
  };

  async componentWillReceiveProps(nextProps) {
    const { game } = nextProps;
    if (game) {
      this.getGames(game);
    }
  }
  async componentDidMount() {
    const { game } = this.props;
    if (game.getBidsCount) {
      this.getGames(game);
    }
  }

  getGames = async game => {
    const bidCount = await game.numberOfGames();
    const games = await Promise.all(
      Array(parseInt(bidCount))
        .fill()
        .map((element, index) => {
          return game.games(index);
        })
    );

    this.setState({ games });
  };

  renderRows = () => {
    return this.state.games.map((game, index) => {
      return <Game game={game} key={index + 1} index={index} />;
    });
  };

  render() {
    const { id } = this.state;
    return (
      <Layout>
        <h4>Looking for specific game? Search by ID</h4>
        <Input
          value={id}
          onChange={event => this.setState({ id: event.target.value })}
        />
        <br />
        <br />
        <Link to={`/games/${id}`}>
          <Button primary>Get Details</Button>
        </Link>
      </Layout>
    );
  }
}

export default ShowGames;
