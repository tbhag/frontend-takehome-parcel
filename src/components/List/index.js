import React from "react";
import "./style.scss";

class List extends React.Component {
  render() {
    const { small, children } = this.props;
    const smallSetting = small ? " small" : "";
    return <ul className={`list ${smallSetting}`}>{children}</ul>;
  }
}

export default List;
