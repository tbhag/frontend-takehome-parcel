import React from "react";
import queryString from "query-string";
import "babel-polyfill";
import SearchBar from "../components/SearchBar";
import StickyBar from "../components/StickyBar";
import Loader from "../components/Loader";
import List from "../components/List";
import { Redirect, Link } from "react-router-dom";

const addGem = function(e) {
  const { storage } = this.props;
  const { data } = this.state;
  const item = data[e.target.dataset.index];
  const { name } = item;
  const { gemStore } = this.state;
  if (!gemStore.hasOwnProperty(name)) {
    const cleanItem = Object.assign({}, item);
    delete cleanItem.name;
    gemStore[name] = cleanItem;
    this.setState({ gemStore });
    localStorage.setItem(storage, JSON.stringify(gemStore));
  }
};
export const removeGem = function(e) {
  const { storage } = this.props;
  const name = e.target.dataset.name;
  const { gemStore } = this.state;
  delete gemStore[name];
  this.setState({ gemStore });
  localStorage.setItem(storage, JSON.stringify(gemStore));
};

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.addGem = addGem.bind(this);
    this.removeGem = removeGem.bind(this);
    this.state = {
      searchParam: this.getSearchTerm(props),
      data: [],
      loading: false,
      gemStore: JSON.parse(localStorage.getItem(props.storage)) || {}
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
    } catch (error) {
      throw Error(error);
    }
  }
  render() {
    const { history } = this.props;
    const { searchParam, data, loading, gemStore } = this.state;
    const gemStoreSize = Object.keys(gemStore).length;
    if (!searchParam) return <Redirect to="/" />;
    const listItems = data.map((item, index) => {
      const { name } = item;
      const saved = gemStore.hasOwnProperty(name);
      const buttonText = !saved ? "Save" : "Unsave";
      const buttonEvent = !saved ? this.addGem : this.removeGem;
      return (
        <li key={`gem-${index}`} data-index={index}>
          <section className="text">{name}</section>
          <section className="buttons">
            <button
              className={buttonText.toLowerCase()}
              data-name={name}
              data-index={index}
              onClick={buttonEvent}
            >
              {buttonText}
            </button>
          </section>
        </li>
      );
    });
    return (
      <React.Fragment>
        <StickyBar>
          <div className="grouping">
            <SearchBar
              history={history}
              search={searchParam}
              disabled={loading}
            />
            {!loading && `${listItems.length} Results`}
          </div>
          <Link to="/gems">
            <button>{`${gemStoreSize} Saved Gems`}</button>
          </Link>
        </StickyBar>
        {loading && <Loader />}
        {!!listItems.length && !loading && <List>{listItems}</List>}
      </React.Fragment>
    );
  }
}

export default Search;
