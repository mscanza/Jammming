import React from 'react';
import './TrackList.css';
import Track from '../Track/Track';

class TrackList extends React.Component {
    render() {
        return (
            <div className="TrackList">
               {this.props.tracks.map(track => {
                   return <Track onAdd={this.props.onAdd} key={track.id} track={track} />
               })}
            </div>
        );
    }
}

export default TrackList;