import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import ShowBids from "./tictactoe/Bids/ShowBids";
import Explore from "./tgt/Explore";
import My404 from "./404";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <div>
          <Switch>
            <Route path="/tokens/explore" exact component={Explore} />
            <Route path="/" exact component={ShowBids} />
            <Route path="*" exact component={My404} />
          </Switch>
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;
