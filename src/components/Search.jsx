import React, { PureComponent } from "react";
import { func, string } from "prop-types";

class Search extends PureComponent {
  static propTypes = {
    searchField: string.isRequired,
    search: func.isRequired
  };

  state = { value: "" };

  onChange = e => {
    this.setState({ value: e.target.value });
    this.props.search(this.props.searchField, e.target.value);
  };

  render() {
    return (
      <div className='search'>
        <span className='search-title'  >Search by {this.props.searchField}:</span>
        <input className='input-header input-search' type="text" value={this.state.value} onChange={this.onChange} />
      </div>
      
    );
  }
}

export default Search;
