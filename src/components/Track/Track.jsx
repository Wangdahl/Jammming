import {useState, useRef} from 'react';
import PropTypes from 'prop-types';
import './Track.css'

const Track = ({ track, onAdd, onRemove, isRemoval}) => {
    //onAdd: function to add track to playlist
    //onRemove: function to remove track from playlist
    //isRemoval: boolean that will help determine which of the onAdd or onRemove buttons to show

    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef(null);

    //Function for previewing track
    const handlePreview = () => {
        if(!track.preview_url) {
            console.error('No preview available');
            return;
        }
        //Create audio object
        if(!audioRef.current) {
            audioRef.current = new Audio(track.preview_url);
            audioRef.current.addEventListener('ended', () => setIsPlaying(false));
        }

        //Toggle play / pause
        if (isPlaying) {
            audioRef.current.pause();
            setIsPlaying(false);
        } else {
            audioRef.current.play();
            setIsPlaying(true);
        }
    }
    // Function for clicking add or remove button
    const handleClick = () => {
        isRemoval ? onRemove(track) : onAdd(track);
    };

    return (        
        <div className='Track'>
            <button className='prePlayBtn' 
                style={
                    !track.preview_url ? {
                        cursor: "default",
                        transform: "none",
                        transition: "none",
                        pointerEvents: "none",
                        }
                    : {}
                }
                onClick={track.preview_url ? handlePreview : undefined}>
                    <i className={`fa-solid ${track.preview_url ? (isPlaying ? 'fa-pause' : 'fa-play') : 'fa-music'}`}></i>
                </button>
            <div className='trackInfo'>
                <div className='innerTrackInfo'>
                    <h3>{track.name}</h3>
                    <p>{track.artist} | {track.album} </p>
                </div>
                {/* Adding button, either add or remove based on isRemoval */}
                <button onClick={handleClick} className='plusBtn'>
                    {isRemoval ? <i className="fa-solid fa-minus"></i> : <i className="fa-solid fa-plus"></i> }
                </button>
            </div>
        </div>
    )
}

Track.propTypes = {
    track: PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
        artist: PropTypes.string,
        album: PropTypes.string,
        uri: PropTypes.string,
        preview_url: PropTypes.string
    }).isRequired,
    onAdd: PropTypes.func,
    onRemove: PropTypes.func,
    isRemoval: PropTypes.bool.isRequired,
};

export default Track;