import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import contract from "truffle-contract";

import TGToken from "../contracts/TGToken.json";
import Game from "../contracts/TicTacToe.json";
import routes from "../routes";

class App extends Component {
  state = {
    token: {},
    game: {}
  };
  async componentDidMount() {
    const TokenContract = contract(TGToken);
    const GameContract = contract(Game);
    TokenContract.setProvider(window.web3.currentProvider);
    GameContract.setProvider(window.web3.currentProvider);
    const token = await TokenContract.deployed();
    const game = await GameContract.deployed();
    this.setState({ token, game });
  }
  render() {
    const { token, game } = this.state;
    return (
      <div>
        <BrowserRouter>
          <div>
            <Switch>
              {routes.map(({ path, Component }) => (
                <Route
                  key={path}
                  path={path}
                  render={props => (
                    <Component {...props} token={token} game={game} />
                  )}
                  exact
                />
              ))}
            </Switch>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
