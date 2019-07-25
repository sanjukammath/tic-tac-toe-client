import React from "react";
import { Menu } from "semantic-ui-react";
import { Link } from "react-router-dom";

export default () => {
  return (
    <Menu style={{ marginTop: "10px" }}>
      <Link className="item" to="/">
        Bids
      </Link>

      <Link className="item" to="/games">
        Games
      </Link>

      <Menu.Menu position="right">
        <Link className="item" to="/tokens/explore">
          Tokens
        </Link>

        <Link className="item" to="/bids/new">
          +
        </Link>
      </Menu.Menu>
    </Menu>
  );
};
