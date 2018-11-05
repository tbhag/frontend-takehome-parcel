import React from "react";
import List from "../components/List";

class SearchResults extends React.Component {
  constructor(props) {
    super(props);
    const { storage } = props;
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
    const { gemStore } = this.state;
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
    const storagelistItems = Object.keys(gemStore).map((key, index) => (
      <li key={`stored-gem-${index}`}>
        <section className="text">{key}</section>
        <section className="buttons">
          <button className="unsave" data-name={key} onClick={this.removeGem}>
            Unsave
          </button>
        </section>
      </li>
    ));
    return (
      <React.Fragment>
        {`${listItems.length} Results`}
        {!!listItems.length && <List>{listItems}</List>}
        {!!storagelistItems.length && (
          <List small={true}>{storagelistItems}</List>
        )}
      </React.Fragment>
    );
  }
}

export default SearchResults;
