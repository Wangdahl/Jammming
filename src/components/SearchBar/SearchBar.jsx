import {useState} from 'react';
import './SearchBar.css';
import PropTypes from 'prop-types';


const SearchBar = ({onSearch}) => {
    const [term, setTerm] = useState('');

    const handleChange = (e) => {
        setTerm(e.target.value);
    }

    return (
        <div className='searchBar'>
            <div className='searchField'>
                <input 
                className='searchInput' 
                value={term}
                onChange={handleChange}
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        onSearch(term);
                    }
                }}
                type="text" 
                placeholder='Song, album or artist'/>
            </div>
            <div>
                <button 
                onClick={() => onSearch(term)} 
                className='searchBtn'>
                    <i className="fa-solid fa-magnifying-glass"></i>
                </button>
            </div>
        </div>
    )
}

SearchBar.propTypes = {
    onSearch: PropTypes.func.isRequired,
};

export default SearchBar;