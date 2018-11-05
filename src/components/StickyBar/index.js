import React from "react";
import "./style.scss";

class StickBar extends React.Component {
  render() {
    const { children } = this.props;
    return <aside className="aside">{children}</aside>;
  }
}

export default StickBar;
