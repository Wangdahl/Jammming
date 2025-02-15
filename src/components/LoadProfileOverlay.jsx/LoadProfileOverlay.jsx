import PropTypes from 'prop-types';
import './LoadProfileOverlay.css';

const LoadProfileOverlay = ({ onLoadProfile }) => {
    return (
    <div className="overlay">
        <div className='login-container'>
            <div className="overlay-content">
            <h2>Welcome to Jammming</h2>
            <p>Load your Spotify profile to get started!</p>
            <button onClick={onLoadProfile}>Load Profile</button>
            </div>
        </div>
    </div>
    );
};

LoadProfileOverlay.propTypes = {
    onLoadProfile: PropTypes.func.isRequired,
};

export default LoadProfileOverlay;
