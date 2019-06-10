import React, { Component } from "react";

class Search extends Component {
  state = {
    search: ''
  };

  handleChange = (e) => {
    this.setState({search: e.target.value})
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.onSubmit(this.state.search);
    this.setState({search: ''})
  }

  render() {
    const { search } = this.state;
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="form-field">
          <div className={`control ${this.props.isFetching && 'is-loading'}`}>
            <input className="input" type="text" value={search} onChange={this.handleChange} />
          </div>
        </div>

      </form>
    );
  }
}

export default Search;
