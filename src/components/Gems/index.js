import React from "react";

class SearchResults extends React.Component {
  constructor(props) {
    super(props);
    const { storage } = this.props;
    this.addGem = this.addGem.bind(this);
    this.state = {
      gemStore: JSON.parse(localStorage.getItem(storage)) || {}
    };
  }
  removeGem(e) {
    const { storage, gemStore } = this.props;
    const item = data[e.target.dataset.index];
    if (!gemStore.hasOwnProperty(name)) {
      const cleanItem = Object.assign({}, item);
      delete cleanItem.name;
      gemStore[name] = cleanItem;
      this.setState({ gemStore });
      localStorage.setItem(storage, JSON.stringify(gemStore));
    }
  }
  render() {
    const { data } = this.props;
    const listItems = data.map((item, index) => (
      <li key={`gem-${index}`} data-index={index} onClick={this.addGem}>
        {item.name}
      </li>
    ));
    if (!listItems.length) {
      return "Nothing";
    }
    return (
      <React.Fragment>
        <ul>{listItems}</ul>
      </React.Fragment>
    );
  }
}

export default SearchResults;
