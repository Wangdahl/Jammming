import { useState, useEffect } from 'react';
import SearchBar from './components/SearchBar/SearchBar';
import SearchResults from './components/SearchResults/SearchResults';
import Playlist from './components/Playlist/Playlist';
import Spotify from './utils/Spotify';
import BackgroundPattern from './components/backgroundPattern/backgroundPattern';
import LoadProfileOverlay from './components/LoadProfileOverlay.jsx/LoadProfileOverlay';
import './styles/App.css';

const App = () => {

  const[searchResults, setSearchResults] = useState([]);
  const[playlistName, setPlaylistName] = useState('Your playlist name..');
  const[playlistTracks, setPlaylistTracks] = useState([]);
  const[isProfileLoaded, setIsProfileLoaded] = useState(false);
  const[token, setToken] = useState(null);

  //Check for token
  useEffect(() => {
    const t = Spotify.getAccessToken();
    if(t) {
      setToken(t);
      setIsProfileLoaded(true);
    }
  }, []);

  //Function for loading in profile manually 
  const loadProfile = () => {
    const t = Spotify.getAccessToken();
    if (t) {
      setToken(t);
      setIsProfileLoaded(true);
    } else {
      window.location = Spotify.getAuthUrl();
    }
  };

  //Function for adding tracks to playlist
  const handleAddTrack = (track) => {
    //check if track is already in playlist
    if(playlistTracks.find(savedTrack => savedTrack.id === track.id)) {
       // MIGHT WANT TO ADD A WARNING OR SOMETHING? CHECK IF WANT TO ADD SONG AGAIN? EXTRA FUNC LATER MBY
      return;
    };
    setPlaylistTracks(prevTracks => [...prevTracks, track]);
  };
  //Function for removing track from playlist
  const handleRemoveTrack = (track) => {
    setPlaylistTracks(prevTracks => prevTracks.filter(savedTrack => savedTrack.id !== track.id));
  };
  //Function for changing playlist name
  const handleNameChange = (newName) => {
    setPlaylistName(newName);
  }

  //function for saving playlists to spotify
  const handleSavePlaylist = async () => {
    try {
      //Getting URI from each track in playlist
      const trackURIs = playlistTracks.map(track => track.uri);
      await Spotify.savePlaylist(playlistName, trackURIs);
    } catch (error) {
      console.error('Error in handleSavePlaylist: ', error)
    }
  };
  const clearPlaylist = () => {
    setPlaylistTracks([]);
    setPlaylistName('New playlist..')
  };

  //function that handles search request
  const handleSearch = async (term) => {
    try {
      const results = await Spotify.search(term);
      setSearchResults(results);
    } catch (error) {
      console.error('Error in handleSearch: ', error);
    }

  };


  return (
    <div className='mainAppDiv'>
      {/* Render overlay only if profile is not loaded */}
      {!isProfileLoaded && <LoadProfileOverlay onLoadProfile={loadProfile} />}
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
            onClear={clearPlaylist}
          />
        </section>
        <BackgroundPattern />
      </main>
    </div>
  )
}

export default App;
