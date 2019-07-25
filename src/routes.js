import ShowBids from "./components/tictactoe/Bids/ShowBids";
import ShowGames from "./components/tictactoe/Games/ShowGames";
import Explore from "./components/tgt/Explore";
import My404 from "./components/404";
import NewBid from "./components/tictactoe/Bids/NewBid";
import InspectBid from "./components/tictactoe/Bids/InspectBid";
import InspectGame from "./components/tictactoe/Games/InspectGame";

const routes = [
  {
    path: "/tokens/explore",
    Component: Explore
  },
  {
    path: "/",
    Component: ShowBids
  },
  {
    path: "/bids",
    Component: ShowBids
  },
  {
    path: "/bids/new",
    Component: NewBid
  },
  {
    path: "/bids/:id",
    Component: InspectBid
  },
  {
    path: "/games",
    Component: ShowGames
  },
  {
    path: "/games/:id",
    Component: InspectGame
  },
  {
    path: "*",
    Component: My404
  }
];

export default routes;
