import React from "react";
import "./style.scss";

class Header extends React.Component {
  render() {
    const { children } = this.props;
    return (
      <header className="header">
        <span className="logo">RubyFindr</span>
        {children}
      </header>
    );
  }
}

export default Header;
