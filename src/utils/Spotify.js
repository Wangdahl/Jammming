

const clientID = '';
const redirectURI = 'http://localhost:5173/'; //Change if deploying live
let accessToken;

// Function to extract access token from the URL
const getAccessToken = () => {
    if(accessToken) {
        return accessToken;
    }
    try {
        //Check for token in URL parameters
        const tokenMatch = window.location.href.match(/access_token=([^&]*)/);
        const expiresMatch = window.location.href.match(/expires_in=([^&]*)/);

        if(tokenMatch && expiresMatch) {
            accessToken = tokenMatch[1];
            const expiresIn = Number(expiresMatch[1]);

            //Clearing token after expiration date
            window.setTimeout(() => accessToken = '', expiresIn * 1000);
            //Removing token from URL to avoid reuse
            window.history.pushState({}, 'Access Token', '/');
            return accessToken;
        } else {
            return null;
        }
    } catch(error) {
        console.error('Error getting user token: ', error);
        return null;
    }
};

// Function for returning authorization url.
const getAuthUrl = () => {
    return `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${encodeURIComponent(redirectURI)}`;
};

//Function to search through spotify api
const search = async (term) => {
    try {
        const accessToken = getAccessToken();
        //Spotify search endpoint
        const endpoint = `https://api.spotify.com/v1/search?type=track&q=${encodeURIComponent(term)}`;
        const response = await fetch(endpoint, {
            headers: { Authorization: `Bearer ${accessToken}` }
        });
        if(!response.ok) {
            throw new Error('Error fetching song URI´s')
        }
        const jsonResponse = await response.json();
        //If no match, return empty array
        if(!jsonResponse.tracks) {
            return[];
        }
        // Map through tracks to format
        return jsonResponse.tracks.items.map(track => ({
            id: track.id,
            name: track.name,
            artist: track.artists[0].name,
            album: track.album.name,
            uri: track.uri
        }));
    } catch (error) {
        console.error('Error searching through spotify api: ', error);
        return [];
    }
};

//Function for saving the playlist to spotify
const savePlaylist = async (playlistName, trackURIs) => {
    if(!playlistName || !trackURIs.length) {
        return;
    }
    try {
        const accessToken = getAccessToken();
        const headers = {Authorization: `Bearer ${accessToken}`, 'Content-Type': 'application/json'};
        
        //Get users ID
        const response = await fetch('https://api.spotify.com/v1/me', {headers});
        if (!response.ok) {
            throw new Error('Failed to fetch user data.');
        }
        const userData = await response.json();
        const userId = userData.id;

        //Create the new playlist
        const createPlaylistResponse = await fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {headers, 
            method: 'POST',
            body: JSON.stringify({name: playlistName, public: true})
        });
        if(!createPlaylistResponse.ok) {
            throw new Error('Failed to create playlist');
        }
        const playlistData = await createPlaylistResponse.json();
        const playlistId = playlistData.id;

        // Add the tracks to new list
        const addTrackResponse = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
            headers,
            method: 'POST',
            body: JSON.stringify({uris: trackURIs})
        });
        if(!addTrackResponse.ok) {
            throw new ErrorEvent('Failed to add tracks to playlist.');
        }
        return playlistId;
    } catch (error) {
        console.error('Error saving playlist: ', error);
        return null;
    }
}

export default {getAccessToken, search, savePlaylist, getAuthUrl};