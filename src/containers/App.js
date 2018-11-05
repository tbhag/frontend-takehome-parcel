import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from "./Home";
import Search from "./Search";
import SavedGems from "./SavedGems";
import Header from "../components/Header";

const storage = "gemStore1";

const App = () => (
  <React.Fragment>
    <Header />
    <main>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route
          path="/search"
          render={props => <Search {...props} storage={storage} />}
        />
        <Route
          path="/gems"
          render={props => <SavedGems {...props} storage={storage} />}
        />
      </Switch>
    </main>
  </React.Fragment>
);

export default App;
