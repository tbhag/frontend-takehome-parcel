import React from "react";
import List from "../components/List";
import { removeGem } from "./Search";
import StickyBar from "../components/StickyBar";

class SavedGems extends React.Component {
  constructor(props) {
    super(props);
    const { storage } = props;
    this.removeGem = removeGem.bind(this);
    this.state = {
      gemStore: JSON.parse(localStorage.getItem(storage)) || {}
    };
  }
  render() {
    const { gemStore } = this.state;
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
        <StickyBar>
          <div className="grouping">
            <button onClick={this.props.history.goBack}>❮ Back</button>
            {`${storagelistItems.length} Gems`}
          </div>
        </StickyBar>
        {!!storagelistItems.length && <List>{storagelistItems}</List>}
      </React.Fragment>
    );
  }
}

export default SavedGems;
