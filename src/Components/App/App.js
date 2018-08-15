import React, { Component } from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = 
    {searchResults: [{name: 'Michael', artist: 'Michael Scanza', album: 'Trumpet Heroes', id: 12345},{name: 'Michael', artist: 'Michael Scanza', album: 'Trumpet Heroes', id: 12345},{name: 'Michael', artist: 'Michael Scanza', album: 'Trumpet Heroes', id: 12345}],
  playlistName: 'My new playlist',
playlistTracks: [{name: 'Michael', artist: 'Michael Scanza', album: 'Trumpet Heroes', id: 12345}]};
this.addTrack = this.addTrack.bind(this);
  
}

addTrack(track) {
 if (this.state.playlistTracks.find(savedTrack => savedTrack.id === track.id)) {
   return
 } else {
   var newArray = this.state.playlistTracks.slice();
   newArray.push(track);
   this.setState({playlistTracks: newArray});
 }
}
  

  render() {
    return (
      <div>
  <h1>Ja<span className="highlight">mmm</span>ing</h1>
  <div className="App">
    <SearchBar />
    <div className="App-playlist">
      <SearchResults onAdd={this.addTrack} searchResults={this.state.searchResults} />
      <Playlist playlistName={this.state.playlistName} playlistTracks={this.state.playlistTracks} />
    </div>
  </div>
</div>
    );
  }
}

export default App;
