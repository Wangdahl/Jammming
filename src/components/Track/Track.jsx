import PropTypes from 'prop-types';
import './Track.css'

const Track = ({ track, onAdd, onRemove, isRemoval}) => {
    //onAdd: function to add track to playlist
    //onRemove: function to remove track from playlist
    //isRemoval: boolean that will help determine which of the onAdd or onRemove buttons to show

    // Function for clicking add or remove button
    const handleClick = () => {
        isRemoval ? onRemove(track) : onAdd(track);
    };

    return (        
        <div className='Track'>
            {/* Need to do check in how to get the pre-play / test listen thing here */}
            <button><i className="fa-solid fa-play"></i></button>
            <div className='trackInfo'>
                <h3>{track.name}</h3>
                <p>{track.artist} | {track.album} </p>
                {/* Adding button, either add or remove based on isRemoval */}
                <button onClick={handleClick}>
                    {isRemoval ? <i className="fa-solid fa-minus"></i> : <i className="fa-solid fa-plus"></i> }
                </button>
            </div>
        </div>
    )
}

Track.propTypes = {
    track: PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        artist: PropTypes.string.isRequired,
        album: PropTypes.string.isRequired,
        uri: PropTypes.string.isRequired,
    }).isRequired,
    onAdd: PropTypes.func,
    onRemove: PropTypes.func,
    isRemoval: PropTypes.bool.isRequired,
};

export default Track;