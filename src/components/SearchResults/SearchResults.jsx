import './SearchResults.css';
import {useState} from 'react';
import Tracklist from '../TrackList/Tracklist';
import PropTypes from 'prop-types';

const SearchResults = ({searchResults, onAdd}) => {
    // searchResults = array of track objects
    // onAdd = function to add track to playlist

    return (
        <div className='SearchResults'>
            <h2>Results</h2>
            <Tracklist 
                tracks={searchResults} 
                onAdd={onAdd} 
                isRemoval={false}
            />
        </div>
    )
}

SearchResults.propTypes = {
    searchResults: PropTypes.array.isRequired,
    onAdd: PropTypes.func.isRequired,
}

export default SearchResults;