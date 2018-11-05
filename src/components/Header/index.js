import React from "react";
import { Link } from "react-router-dom";
import "./style.scss";

class Header extends React.Component {
  render() {
    const { children } = this.props;
    return (
      <header className="header">
        <Link className="logo" to="/">
          RubyFindr
        </Link>
        {children}
      </header>
    );
  }
}

export default Header;
