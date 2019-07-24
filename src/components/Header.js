import React from "react";
import { Menu } from "semantic-ui-react";
import { Link } from "react-router-dom";

export default () => {
  return (
    <Menu style={{ marginTop: "10px" }}>
      <Link className="item" to="/">
        Tic Tac Toe
      </Link>

      <Menu.Menu position="right">
        <Link className="item" to="/tokens/explore">
          Tokens
        </Link>

        <Link className="item" to="/tictactoe/bid/new">
          +
        </Link>
      </Menu.Menu>
    </Menu>
  );
};
