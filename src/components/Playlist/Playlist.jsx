
import Tracklist from '../TrackList/Tracklist';
import PropTypes from 'prop-types';

import './Playlist.css';


const Playlist = ({playlistName, playlistTracks, onRemove, onNameChange, onSave, onClear}) => {
    //PlaylistName = string for current playlist name
    //PlaylistTracks = array of tracks for playlist
    //onRemove = function to remove songs
    //onNameChange = function to change the name
    //onSave = function to save playlist to spotify
    //onClear = function to clear playlist
    

    //Function for handling changing playlist name
    const handleNameChange = (e) => {
        onNameChange(e.target.value);
    };

    return(
        <div className='Playlist'>

            <input id='playlistInput' 
                name='playlistInput'
                className='playlistInput' 
                value={playlistName} 
                onChange={handleNameChange} />
            <Tracklist 
                tracks={playlistTracks} 
                onRemove={onRemove} 
                isRemoval={true}/>
            <div className='playlistBtns'>
                <button 
                    className='Playlist-save' 
                    onClick={onSave}>Save to Spotify
                </button>
                <button 
                    className='clearBtn'
                    onClick={onClear}>New playlist
                </button>
            </div>
        </div>
    )
}

Playlist.propTypes = {
    playlistName: PropTypes.string.isRequired,
    playlistTracks: PropTypes.array.isRequired,
    onRemove: PropTypes.func.isRequired,
    onNameChange: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
    onClear: PropTypes.func.isRequired,
}

export default Playlist;