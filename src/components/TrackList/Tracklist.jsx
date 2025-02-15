import './Tracklist.css';
import Track from '../Track/Track'
import PropTypes from 'prop-types';



const Tracklist = ({ tracks, onAdd, onRemove, isRemoval}) => {
    //Tracks: array of track objects
    // onAdd and onRemove functions to handle removing / adding to lists
    
    return (
        <div className='tracklistContainer'>
            {tracks.map(track => (
                <Track
                    key={track.id}
                    track={track}
                    onAdd={onAdd}
                    onRemove={onRemove}
                    isRemoval={isRemoval}
                />
            ))}
        </div>
    )
}

Tracklist.propTypes = {
    tracks: PropTypes.array.isRequired,
    onAdd: PropTypes.func.isRequired,
    onRemove: PropTypes.func.isRequired,
    isRemoval: PropTypes.bool.isRequired,
}


export default Tracklist;