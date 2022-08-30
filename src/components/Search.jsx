import React, {useState} from "react";

function Search(props) {
  const {searchMovies = Function.prototype} = props
  const [state, setState] = useState(
    {
      search: "",
      type: "all",
    }
  )

  const handleKey = (event) => {
    const { search, type } = state;
    if (event.key === "Enter") {
      searchMovies(type === "all" ? "" : type, search);
    }
  };

  const handleFilter = (event) => {
    const { search, type } = state;
    setState(()=>({...state, type: event.target.dataset.type }), ()=>{
        searchMovies(type === "all" ? "" : type, search)
    });
  };

    const { search, type } = state;
    return (
      <div className="row">
        <div className="input-field">
          <input
            className="validate"
            placeholder="search"
            id="search"
            type="search"
            value={search}
            onChange={(e) => setState({...state, search: e.target.value })}
            onKeyDown={handleKey}
          />
          <button
            className="btn search-btn"
            onClick={() =>
              searchMovies(type === "all" ? "" : type, search)
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
                onChange={handleFilter}
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
                onChange={handleFilter}
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
                onChange={handleFilter}
                checked={type === "series"}
              />
              <span>Series only</span>
            </label>
          </div>
        </div>
      </div>
    );
  }

export { Search };
