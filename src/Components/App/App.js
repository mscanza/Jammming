import React, { Component } from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import Spotify from '../../util/Spotify';
import SimpleStorage from "react-simple-storage";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
    searchResults: [],
    playlistName: 'New playlist',
    playlistTracks: []
  };

    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
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

removeTrack(track) {
  let newArray = this.state.playlistTracks.slice();
  let filtered = newArray.filter(savedTrack => savedTrack.id !== track.id);
  this.setState({playlistTracks: filtered});
}

updatePlaylistName(name) {
  this.setState({playlistName: name});
}
  
savePlaylist() {
  let trackURIs = this.state.playlistTracks.map(playlistTrack => playlistTrack.uri)
  Spotify.savePlaylist(this.state.playlistName, trackURIs).then(() => {
    this.setState({playlistName: 'New Playlist',playlistTracks: []})
  })
}


search(term) {
  Spotify.search(term).then(results => this.setState({searchResults: results}));
}

  render() {
    return (
      <div>
        <SimpleStorage parent={this} />
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar onSearch={this.search}/>
          <div className="App-playlist">
            <SearchResults onAdd={this.addTrack} searchResults={this.state.searchResults} />
            <Playlist onSave={this.savePlaylist} onNameChange={this.updatePlaylistName} onRemove={this.removeTrack} playlistName={this.state.playlistName} playlistTracks={this.state.playlistTracks} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
