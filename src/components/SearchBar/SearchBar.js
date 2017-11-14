import React from 'react';
import './SearchBar.css';

let sortByOptions = {
  'Best Match': "best_match",
  'Highest Rated': "rating",
  'Most Reviewed': "review_count"
};

class SearchBar extends React.Component {
  constructor (props) {
  super(props);
  this.state = {
    term : ' ',
    location: ' ',
    sortBy: 'best_match'
  };
this.handleSortByChange = this.handleSortByChange.bind(this);
  this.handleTermChange = this.handleTermChange.bind(this);
  this.handleLocationChange = this.handleLocationChange.bind(this);
  this.handleSearch = this.handleSearch.bind(this);
  }

  renderSortByOptions () {
    return Object.keys(sortByOptions).map(
      sortByOption => {
        let sortByOptionValue = sortByOptions[sortByOption];
        return <li className={this.getSortByClass(sortByOptionValue)}
          key={sortByOptionValue}
          onClick = {this.handleSortByChange.bind(this, sortByOptionValue)}
/*Originally I forgot to add the this to the start of the above value*/
          >
          {sortByOption}
          </li>;
      });
    }

    getSortByClass (sortByOption) {
      return (this.state.sortBy === sortByOption) ? 'active' : ' ';
      /*if (this.state.sortBy === this.sortByOption){
        return 'active'
      } else { return ' '}*/
    };

    handleSortByChange (sortByOption) {
      this.setState({
        sortBy : sortByOption
        //let sortBy = {this.sortByOption}; This was wrong
      });
    };

    handleTermChange (event) {
      this.setState({
        term: event.target.value
      })
    }

    handleLocationChange (event) {
      this.setState({
        location: event.target.value
      })
    }

    handleSearch(event) {
      this.props.searchYelp(this.state.term, this.state.location, this.state.sortBy);
      event.preventDefault();
    }

   render () {
    return (
      <div className="SearchBar">
         <div className="SearchBar-sort-options">
           <ul>
              {this.renderSortByOptions()}
           </ul>
       </div>
       <div className="SearchBar-fields">
          <input placeholder="Search Businesses" onChange = {this.handleTermChange}/>
          <input placeholder="Where?" onChange = {this.handleLocationChange}/>
       </div>
       <div className ="SearchBar-submit" onClick={this.handleSearch}>
         <a>Lets Go</a>
       </div>
       </div>
      )
  }
}

export default SearchBar;
