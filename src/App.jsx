import { useState, useEffect } from 'react';
import SearchBar from './components/SearchBar/SearchBar';
import SearchResults from './components/SearchResults/SearchResults';
import Playlist from './components/Playlist/Playlist';
import Spotify from './utils/Spotify';
import BackgroundPattern from './components/backgroundPattern/backgroundPattern';
import LoadProfileOverlay from './components/LoadProfileOverlay/LoadProfileOverlay';
import useWindowWidth from './components/useWindowWidth/useWindowWidth';
import './styles/App.css';

const App = () => {

  const[searchResults, setSearchResults] = useState([]);
  const[playlistName, setPlaylistName] = useState(`Your jammm..`);
  const[playlistTracks, setPlaylistTracks] = useState([]);
  const[isProfileLoaded, setIsProfileLoaded] = useState(false);
  const[token, setToken] = useState(null);
  const[displayName, setDisplayName] = useState('');
  const[activeTab, setActiveTab] = useState('search');

  const windowWidth = useWindowWidth();


  //Check for token
  useEffect(() => {
    const t = Spotify.getAccessToken();
    if(t) {
      setToken(t);
      
      fetch('https://api.spotify.com/v1/me', {
        headers: { Authorization: `Bearer ${t}` }
      }).then(response => {
        if(!response.ok) {
          throw new Error('Faled to fetch user data')
        } 
        return response.json();
      }).then(userData => {
        setDisplayName(userData.display_name);
      }).catch(error => 
        console.error('Error fetching data: ', error)
      );
      setIsProfileLoaded(true)
    }
  }, []);
  //Personal playlist name
  useEffect(() => {
    if(displayName) {
      const capitalizedName = displayName.charAt(0).toUpperCase() + displayName.slice(1);
      setPlaylistName(`${capitalizedName}'s jammm..`);
    }
  }, [displayName]);

  //Function for loading in profile manually 
  const loadProfile = async () => {
    const t = Spotify.getAccessToken();
    if (t) {
      setToken(t);
      try {
        const response = await fetch('https://api.spotify.com/v1/me', {
          headers: { Authorization: `Bearer ${t}`}
        });
        if(response.ok) {
          const userData = await response.json();
          setDisplayName(userData.display_name);
        } else {
          console.error('Failed to fetch user data');
        }
      } catch (error) {
        console.error('Error fetching user data', error);
      }
      setIsProfileLoaded(true);
    } else {
      window.location = Spotify.getAuthUrl();
    }
  };

  //Function for adding tracks to playlist
  const handleAddTrack = (track) => {
    //check if track is already in playlist
    if(playlistTracks.find(savedTrack => savedTrack.id === track.id)) {
      return;
    };
    setPlaylistTracks(prevTracks => [...prevTracks, track]);
    setSearchResults(prevResults => prevResults.filter(t => t.id !== track.id));
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
      const playlistId = await Spotify.savePlaylist(playlistName, trackURIs);

      if(playlistId) {
        window.location.href = `spotify:playlist:${playlistId}`;
      }
    } catch (error) {
      console.error('Error in handleSavePlaylist: ', error)
    }
  };
  const clearPlaylist = () => {
    setPlaylistTracks([]);
    const capitalizedName = displayName.charAt(0).toUpperCase() + displayName.slice(1);
    setPlaylistName(`${capitalizedName}'s jamm..`)
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

  //Mobile layour: renders tabs for results / playlist
  const renderMobileContent = () => (
    <>
      <SearchBar onSearch={handleSearch} />
      <section className='App-playlist'>
        <div className='tab-header'>
          <button 
            id='resultTabBtn'
            className={activeTab === 'search' ? 'active' : ''}
            onClick={() => setActiveTab('search')}
            >Search results
          </button>
          <button
            id='playlistTabBtn'
            className={activeTab === 'playlist' ? 'active' : ''}
            onClick={() => setActiveTab('playlist')}
            >Playlist
          </button>
        </div>
        {activeTab === 'search' ? (
          <>
          <SearchResults searchResults={searchResults} onAdd={handleAddTrack} />
          </>
        ) : (
          <Playlist
            playlistName={playlistName}
            playlistTracks={playlistTracks}
            onRemove={handleRemoveTrack}
            onSave={handleSavePlaylist}
            onNameChange={handleNameChange}
            onClear={clearPlaylist}
        />
        )}
      </section>
      <BackgroundPattern />
    </>
  );

  //Desktop layout: renders results and playlist side-by-side
  const renderDesktopContent = () => (
    <>
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
    </>
  );
  
  return (
    <div className='mainAppDiv'>
      {/* Render overlay only if profile is not loaded */}
      {!isProfileLoaded && <LoadProfileOverlay onLoadProfile={loadProfile} />}
      <header>
        <h1>JA<span>MMM</span>ING</h1>
      </header>
      <main>
        {windowWidth < 1025 ? renderMobileContent() : renderDesktopContent()}
      </main>
      <footer>
      <p>Powered by</p>
      <img src="/src/assets/spotify-logo.png" alt="Spotify logo" />
      </footer>
    </div>
  )
}

export default App;
