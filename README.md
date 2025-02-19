# Jammming

Jammming is a React web application that allows users to search the Spotify library, create custom playlists, and save them directly to their Spotify account. The app demonstrates the use of React components, state management, API integration, responsive design, and user authentication with Spotify.

## Table of Contents
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [Future Improvements](#future-improvements)

## Features
- **Search for Songs:** Users can search the Spotify catalog by song title, artist, or album.
- **Custom Playlist Creation:** Add songs from search results to a custom playlist.
- **Remove Tracks:** Remove tracks from the playlist easily.
- **Save Playlist:** Save the custom playlist to the user's Spotify account. The app then opens Spotify (or a web view) to display your new playlist.
- **Track Previews:** Listen to a short preview clip of each song (if available). If a preview is not available, a fallback music note icon is shown.
- **Responsive Design:** On mobile devices, the app displays a tabbed interface (with a persistent search bar) to switch between Search Results and Playlist views. On larger screens, the layout is side by side.
- **User Authentication:** The app integrates with Spotify’s authorization flow. Users must load their Spotify profile, which also greets them by their display name.

## Technologies Used
- **React** – For building the user interface.
- **Vite** – For project scaffolding and fast development.
- **JavaScript (ES6+)** – For application logic.
- **CSS** – For styling and responsive design (with media queries).
- **Spotify Web API** – For accessing track data, user profiles, and saving playlists.
- **Font Awesome** – For icons.

## Installation
1. Clone the repository: `git clone https://github.com/yourusername/jammming.git`
2. Navigate to the project directory: `cd jammming`
3. Install dependencies: `npm install`
4. Start the development server: `npm run dev`
5. Open your browser and navigate to `http://localhost:5173/`

## Usage
1. **Load Profile:** If you are not authenticated, a full-page overlay will prompt you to "Load Profile". Clicking this button initiates the Spotify login process and loads your user data.
2. **Search:** Use the search bar (always visible) to search for tracks by title, artist, or album.
3. **Add/Remove Tracks:** Click the "+" button next to a song in the search results to add it to your playlist, and click the "-" button in your playlist to remove it.
4. **Preview Tracks:** Click the preview button to listen to a short sample of a track. If a preview is unavailable, the button displays a music note icon and is disabled.
5. **Save Playlist:** Once you’re satisfied with your playlist, click "Save to Spotify" to save it to your account. The app will then open Spotify (or a web view) to display your new playlist.
6. **Mobile vs. Desktop Layout:** On mobile devices, the search results and playlist views are displayed as tabs beneath the always-visible search bar. On desktop, they are displayed side by side.

## Future Improvements
- Enhanced error handling and user notifications.
- UI/UX enhancements with more polished styling and animations.
- Additional search filters (e.g., by genre, mood, or artist recommendations).
- Implementation of unit and integration tests.
- Improved token handling (e.g., token refresh).
