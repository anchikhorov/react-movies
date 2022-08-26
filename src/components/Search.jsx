import React from "react";

class Search extends React.Component {
  state = {
    search: "",
    type: "all",
  };

  handleKey = (event) => {
    const { search, type } = this.state;
    if (event.key === "Enter") {
      this.props.searchMovies(type === "all" ? "" : type, search);
    }
  };

  handleFilter = (event) => {
    const { search, type } = this.state;
    this.setState(()=>({ type: event.target.dataset.type }), ()=>{
        this.props.searchMovies(type === "all" ? "" : type, search)
    });
  };

  render() {
    const { search, type } = this.state;
    return (
      <div className="row">
        <div className="input-field">
          <input
            className="validate"
            placeholder="search"
            id="search"
            type="search"
            value={search}
            onChange={(e) => this.setState({ search: e.target.value })}
            onKeyDown={this.handleKey}
          />
          <button
            className="btn search-btn"
            onClick={() =>
              this.props.searchMovies(type === "all" ? "" : type, search)
            }
          >
            Search
          </button>
          <div className="radio">
            <label className="item1">
              <input
                className="with-gap"
                name="type"
                type="radio"
                data-type="all"
                onChange={this.handleFilter}
                checked={type === "all"}
              />
              <span>All</span>
            </label>
            <label className="item2">
              <input
                className="with-gap"
                name="type"
                type="radio"
                data-type="movie"
                onChange={this.handleFilter}
                checked={type === "movie"}
              />
              <span>Movies only</span>
            </label>
            <label className="item3">
              <input
                className="with-gap"
                name="type"
                type="radio"
                data-type="series"
                onChange={this.handleFilter}
                checked={type === "series"}
              />
              <span>Series only</span>
            </label>
          </div>
        </div>
      </div>
    );
  }
}

export { Search };
