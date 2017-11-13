import React, { Component } from 'react';
import './App.css';
import BusinessList from './components/BusinessList/BusinessList';
import SearchBar from './components/SearchBar/SearchBar';
import Yelp from './util/Yelp';

// eslint-disable-next-line
let business = {};
// eslint-disable-next-line
let businesses = [];

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      businesses: []
    }
    this.searchYelp = this.searchYelp.bind(this);
    //Apparently could just say this.searchYelp.bind(this); by itself above
  }
  searchYelp (term, location, sortBy) {
    Yelp.search(term, location, sortBy).then(
      businesses => {
        this.setState(
        {
          businesses: businesses
        }
      )
    })
  }

  render() {
    return (
      <div className="App">
         <h1>ravenous</h1>
         < SearchBar searchYelp={this.searchYelp}/>
         < BusinessList businesses={this.state.businesses}/>
      </div>
      /*Got rid of businesses={businesses} above*/
    );
  }
}

export default App;
