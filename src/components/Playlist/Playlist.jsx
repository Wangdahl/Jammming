import './Playlist.css';
import Tracklist from '../TrackList/Tracklist';
import PropTypes from 'prop-types';

const Playlist = ({playlistName, playlistTracks, onRemove, onNameChange, onSave}) => {
    //PlaylistName = string for current playlist name
    //PlaylistTracks = array of tracks for playlist
    //onRemove = function to remove songs
    //onNameChange = function to change the name
    //onSave = function to save playlist to spotify

    //Function for handling changing playlist name
    const handleNameChange = (e) => {
        onNameChange(e.target.value);
    };

    return(
        <div className='Playlist'>
            <input className='playlistInput' value={playlistName} onChange={handleNameChange} />
            
            <Tracklist tracks={playlistTracks} onRemove={onRemove} isRemoval={true}/>

            <button className='Playlist-save' onClick={onSave}>Save to Spotify</button>
        </div>
    )
}

Playlist.propTypes = {
    playlistName: PropTypes.string.isRequired,
    playlistTracks: PropTypes.array.isRequired,
    onRemove: PropTypes.func.isRequired,
    onNameChange: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
}

export default Playlist;