import React from "react";
import SearchBar from "../components/SearchBar";
import Banner from "../components/Banner";

class Home extends React.Component {
  render() {
    const { history } = this.props;
    return (
      <React.Fragment>
        <Banner title="RubyFindr" dek="Find and Save Ruby Gems">
          <SearchBar history={history} />
        </Banner>
      </React.Fragment>
    );
  }
}

export default Home;
