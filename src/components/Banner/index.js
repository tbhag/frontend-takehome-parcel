import React from "react";
import "./style.scss";

class Banner extends React.Component {
  render() {
    const { children, title, dek } = this.props;
    return (
      <article className="banner">
        {title && <h1>{title}</h1>}
        {dek && <h3>{dek}</h3>}
        {children}
      </article>
    );
  }
}

export default Banner;
