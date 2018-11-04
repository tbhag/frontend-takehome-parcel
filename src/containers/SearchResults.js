import React from "react";

class SearchResults extends React.Component {
  constructor(props) {
    super(props);
    const { storage } = this.props;
    this.addGem = this.addGem.bind(this);
    this.removeGem = this.removeGem.bind(this);
    this.state = {
      gemStore: JSON.parse(localStorage.getItem(storage)) || {}
    };
  }
  addGem(e) {
    const { storage, data } = this.props;
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
    console.log(this.state);
  }

  removeGem(e) {
    const { storage } = this.props;
    const name = e.target.dataset.name;
    const { gemStore } = this.state;
    delete gemStore[name];
    this.setState({ gemStore });
    localStorage.setItem(storage, JSON.stringify(gemStore));
  }

  render() {
    const { data } = this.props;
    const listItems = data.map((item, index) => (
      <li key={`gem-${index}`} data-index={index} onClick={this.addGem}>
        {item.name}
      </li>
    ));
    const storagelistItems = Object.keys(this.state.gemStore).map(
      (key, index) => (
        <li
          key={`stored-gem-${index}`}
          data-name={key}
          onClick={this.removeGem}
        >
          {key}
        </li>
      )
    );
    if (!listItems.length) {
      return "Nothing";
    }
    return (
      <React.Fragment>
        <ul>{listItems}</ul>
        {!!storagelistItems.length && <ul>{storagelistItems}</ul>}
      </React.Fragment>
    );
  }
}

export default SearchResults;
