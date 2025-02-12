import { useState } from 'react';
import SearchBar from './components/SearchBar/SearchBar';
import SearchResults from './components/SearchResults/SearchResults';
import Playlist from './components/Playlist/Playlist';
import Spotify from './utils/Spotify';
import './styles/App.css';

const App = () => {

  // Array for creating a mock
  const mockSearchResults = [
    { id: 1, name: "Song One", artist: "Artist A", album: "Album X", uri: "spotify:track:1" },
    { id: 2, name: "Song Two", artist: "Blur", album: "Album Y", uri: "spotify:track:2" },
    { id: 3, name: "Song Three", artist: "Artist C", album: "Album Z", uri: "spotify:track:3" }
  ];

  const[searchResults, setSearchResults] = useState(mockSearchResults);
  const[playlistName, setPlaylistName] = useState('My Playlist');
  const[playlistTracks, setPlaylistTracks] = useState([]);

  //Function for adding tracks to playlist
  const handleAddTrack = (track) => {
    //check if track is already in playlist
    if(playlistTracks.find(savedTrack => savedTrack.id === track.id)) {
       // MIGHT WANT TO ADD A WARNING OR SOMETHING? CHECK IF WANT TO ADD SONG AGAIN? EXTRA FUNC LATER MBY
      return;
    }
    setPlaylistTracks(prevTracks => [...prevTracks, track]);
  };
  //Function for removing track from playlist
  const handleRemoveTrack = (track) => {
    setPlaylistTracks(prevTracks => prevTracks.filter(savedTrack => savedTrack.id !== track.id));
  };
  //Function for changing playlist name
  const handleNameChange = (newName) => {
    setPlaylistName(newName);
;  }

  //function for saving playlists to spotify
  const handleSavePlaylist = () => {
    //Getting URI from each track in playlist
    const trackURIs = playlistTracks.map(track => track.uri);
    
    //Fixing full functionality later with API
    console.log("Track URIs to save:", trackURIs);

    // Can clear playlist with setPlaylistTracks([]); MAYBE GET SEPERATE BUTTON FOR THIS? Extra functionality NEW PLAYLIST
  };

  //function that handles search request
  const handleSearch = async () => {
    const term = prompt('Enter a search term:');
    const results = await Spotify.search(term);
    setSearchResults(results);
  }


  return (
    <div className='mainAppDiv'>
        <h1>Ja<span>mmm</span>ing</h1>
        <SearchBar onSearch={handleSearch}/>

        <div className='App-playlist'>
          <SearchResults searchResults={searchResults} onAdd={handleAddTrack} />
          <Playlist 
            playlistName={playlistName}
            playlistTracks={playlistTracks}
            onRemove={handleRemoveTrack}
            onSave={handleSavePlaylist}
            onNameChange={handleNameChange}
          />
        </div>
    </div>
  )
}

export default App;
