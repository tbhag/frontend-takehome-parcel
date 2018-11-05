import React from "react";
import "./style.scss";

class List extends React.Component {
  render() {
    const { children } = this.props;
    return <ul className="list">{children}</ul>;
  }
}

export default List;
