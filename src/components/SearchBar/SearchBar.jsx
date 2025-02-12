import {useState} from 'react';
import './SearchBar.css'
import PropTypes from 'prop-types';


const SearchBar = ({onSearch}) => {


    return (
        <div className='searchBar'>
            <div className='searchField'>
                <input className='searchInput' type="text" placeholder='Song, album or artist'/>
            </div>
            <div>
                <button onClick={onSearch} className='searchBtn'>Search</button>
            </div>
        </div>
    )
}

SearchBar.propTypes = {
    onSearch: PropTypes.func.isRequired,
};

export default SearchBar;