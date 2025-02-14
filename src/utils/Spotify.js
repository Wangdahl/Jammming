

const clientID = '';
const redirectURI = 'http://localhost:5173/'; //Change if deploying live
let accessToken;

// Function to extract access token from the URL
const getAccessToken = () => {
    if(accessToken) {
        return accessToken;
    }

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
        //If no token is found, redirect to spotify authorization
        const accessUrl = `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`;
        window.location = accessUrl;
    }
}

//Function to search through spotify api
const search = async (term) => {
    const accessToken = getAccessToken();
    //Spotify search endpoint
    const endpoint = `https://api.spotify.com/v1/search?type=track&q=${encodeURIComponent(term)}`;
    const response = await fetch(endpoint, {
        headers: { Authorization: `Bearer ${accessToken}` }
    });
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
}

export default {getAccessToken, search};