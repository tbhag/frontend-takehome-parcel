import React from "react";

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.submitForm = this.submitForm.bind(this);
  }
  isEmptyOrSpaces(str) {
    return str === null || str.match(/^ *$/) !== null;
  }
  submitForm(e) {
    e.preventDefault();
    const value = e.target.search.value;
    if (this.isEmptyOrSpaces(value)) return;
    this.props.history.push({
      pathname: "/search",
      search: `?query=${value}`
    });
  }
  render() {
    const { disabled, search } = this.props;
    return (
      <form onSubmit={this.submitForm}>
        <input
          key={search}
          type="text"
          name="search"
          placeholder="Search Gems"
          defaultValue={search}
          disabled={disabled}
        />
        <button type="submit">Submit</button>
      </form>
    );
  }
}

export default SearchBar;
