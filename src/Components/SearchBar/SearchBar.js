import React from 'react';
import './SearchBar.css';

class SearchBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {term: ''};
        this.search = this.search.bind(this);
        this.handleTermChange = this.handleTermChange.bind(this);
        this.handleKeyUp = this.handleKeyUp.bind(this);
    }

    handleTermChange(e) {
        this.setState({term: e.target.value});
    }


    search() {
        this.props.onSearch(this.state.term);
    }

    handleKeyUp(e) {
        if (e.keyCode === 13) {
            return this.search();
        }
    }
 

    render() {
        return (
            <div className="SearchBar">
            <input onChange={this.handleTermChange} onKeyUp={this.handleKeyUp} placeholder="Enter A Song, Album, or Artist" />
            <a onClick={this.search}>SEARCH</a>
          </div>
        );
    }
}

export default SearchBar;