import React from "react";
import queryString from "query-string";
import "babel-polyfill";
import SearchBar from "../components/SearchBar";
import Header from "../components/Header";
import SearchResults from "./SearchResults";
import Loader from "../components/Loader";

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchParam: this.getSearchTerm(props),
      data: [],
      loading: false
    };
  }
  static getDerivedStateFromProps(nextProps, prevState) {
    const {
      location: { search }
    } = nextProps;
    const searchTerm = queryString.parse(search).query;
    if (searchTerm === prevState.searchParam) return null;
    return { searchParam: searchTerm };
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.state.searchParam === prevState.searchParam) return null;
    this.getData(this.state.searchParam);
  }
  componentDidMount() {
    this.getData(this.state.searchParam);
  }
  getSearchTerm(props) {
    const {
      location: { search }
    } = props;
    return queryString.parse(search).query;
  }
  async getData(searchTerm) {
    this.setState({ loading: true });
    try {
      const response = await fetch(
        `http://localhost:3000/api/v1/search.json?query=${searchTerm}`
      );
      if (!response.ok) {
        throw Error(response.statusText);
      }
      const json = await response.json();
      this.setState({ data: json, loading: false });
      console.log(this.state);
    } catch (error) {
      throw Error(error);
    }
  }
  render() {
    const { history } = this.props;
    const { searchParam, data, loading } = this.state;
    return (
      <React.Fragment>
        <Header>
          <SearchBar
            history={history}
            search={searchParam}
            small={true}
            disabled={loading}
          />
        </Header>
        {loading && <Loader />}
        {!loading && <SearchResults storage="gemStorage4" data={data} />}
      </React.Fragment>
    );
  }
}

export default Search;
