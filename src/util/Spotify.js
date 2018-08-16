let accessToken;
let expiresIn;
const authEndpoint = 'https://accounts.spotify.com/authorize';
const clientId = '7e76f7a3ab7a4f0fb93dcff59d4bd40d';
const redirectUri = 'http://localhost:3000/';

const Spotify = {




    getAccessToken() {
        if (accessToken) {
            return accessToken;
        } else {
            const urlAccessToken = window.location.href.match(/access_token=([^&]*)/);
            const urlExpiresIn = window.location.href.match(/expires_in=([^&]*)/);

            if (urlAccessToken && urlExpiresIn) {
                accessToken = urlAccessToken[1];
                expiresIn = urlExpiresIn[1];

                window.setTimeout(() => accessToken = '', expiresIn * 1000);
                window.history.pushState('Access Token', null, '/');
            } else {
                window.location = `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=token`; 
            }
        }
    },

    // getAccessToken() {
    //     const hash = window.location.hash
    //     .substring(1)
    //     .split('&')
    //     .reduce(function (initial, item) {
    //       if (item) {
    //         var parts = item.split('=');
    //         initial[parts[0]] = decodeURIComponent(parts[1]);
    //       }
    //       return initial;
    //     }, {});
    //     window.location.hash = '';
        
    //     // Set token
    //     token = hash.access_token;
    //     const authEndpoint = 'https://accounts.spotify.com/authorize';
        
    //     // Replace with your app's client ID, redirect URI and desired scopes
    //     const clientId = '71d6de46c1f44b0d97cb92a5aaf4cb95';
    //     const redirectUri = 'http://localhost:3000/';
        
    //     // If there is no token, redirect to Spotify authorization
    //     if (!token) {
    //       window.location = `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=token`;
    //     }
    // },
    

    search(term) {
        accessToken = this.getAccessToken();
        return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {headers: {Authorization: `Bearer ${accessToken}`}})
        .then(response => {return response.json();}).then(jsonResponse => {
            if (!jsonResponse.tracks) {
                return [];
            } else {
                return jsonResponse.tracks.items.map(track => ({
                    id: track.id,
                    name: track.name,
                    artist: track.artists[0].name,
                    album: track.album.name,
                    URI: track.uri
                }))
            }
        });
    },


    savePlaylist() {

    }
};


export default Spotify;