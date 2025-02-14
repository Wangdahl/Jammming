import { useState } from 'react';
import SearchBar from './components/SearchBar/SearchBar';
import SearchResults from './components/SearchResults/SearchResults';
import Playlist from './components/Playlist/Playlist';
import Spotify from './utils/Spotify';
import './styles/App.css';
import BackgroundPattern from './components/backgroundPattern/backgroundPattern';

const App = () => {

  const[searchResults, setSearchResults] = useState([]);
  const[playlistName, setPlaylistName] = useState('Your playlist name..');
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
    Spotify.savePlaylist(playlistName, trackURIs);
    // Can clear playlist with setPlaylistTracks([]); MAYBE GET SEPERATE BUTTON FOR THIS? Extra functionality NEW PLAYLIST
  };

  //function that handles search request
  const handleSearch = async (term) => {
    const results = await Spotify.search(term);
    setSearchResults(results);
  }


  return (
    <div className='mainAppDiv'>
      <header>
        <h1>JA<span>MMM</span>ING</h1>
      </header>
      <main>
        <SearchBar onSearch={handleSearch}/>
          <section className='App-playlist'>
          <SearchResults searchResults={searchResults} onAdd={handleAddTrack} />
          <Playlist 
            playlistName={playlistName}
            playlistTracks={playlistTracks}
            onRemove={handleRemoveTrack}
            onSave={handleSavePlaylist}
            onNameChange={handleNameChange}
          />
        </section>
        <BackgroundPattern />
      </main>
    </div>
  )
}

export default App;
