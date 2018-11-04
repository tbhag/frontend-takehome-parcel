import React from "react";
import SearchBar from "../components/SearchBar";

class Home extends React.Component {
  render() {
    const { history } = this.props;
    return (
      <div className="container">
        <SearchBar history={history} />
      </div>
    );
  }
}

export default Home;
