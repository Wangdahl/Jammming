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
            <p className='test-login'>Try authenticating with:</p>
            <p className='test-login'>Mail - test.jamming@gmail.com</p>
            <p className='test-login'>Password - test-jamming!</p>
            </div>
        </div>
    </div>
    );
};

LoadProfileOverlay.propTypes = {
    onLoadProfile: PropTypes.func.isRequired,
};

export default LoadProfileOverlay;
