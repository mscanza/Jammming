let token ='';

const Spotify = {

    getAccessToken() {
        const hash = window.location.hash
        .substring(1)
        .split('&')
        .reduce(function (initial, item) {
          if (item) {
            var parts = item.split('=');
            initial[parts[0]] = decodeURIComponent(parts[1]);
          }
          return initial;
        }, {});
        window.location.hash = '';
        
        // Set token
        let _token = hash.access_token;
        token = _token;
        const authEndpoint = 'https://accounts.spotify.com/authorize';
        
        // Replace with your app's client ID, redirect URI and desired scopes
        const clientId = '71d6de46c1f44b0d97cb92a5aaf4cb95';
        const redirectUri = 'http://localhost:3000/';
        const scopes = [
          'user-read-birthdate',
          'user-read-email',
          'user-read-private'
        ];
        
        // If there is no token, redirect to Spotify authorization
        if (!_token) {
          window.location = `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join('%20')}&response_type=token`;
        }
    },
    

    search(term) {
        return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {headers: {Authorization: `Bearer ${token}`}})
        .then(response => {return response.json();}).then(jsonResponse => {
            if (!jsonResponse.tracks) {
                return [];
            } else {
                return jsonResponse.tracks.map(track => ({
                    id: track.id,
                    name: track.name,
                    artist: track.artists[0].name,
                    album: track.album.name,
                    URI: track.uri
                }))
            }
        });
    }
};


export default Spotify;