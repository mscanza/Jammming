let accessToken;
let expiresIn;
const authEndpoint = 'https://accounts.spotify.com/authorize';
const clientId = '7e76f7a3ab7a4f0fb93dcff59d4bd40d';
const redirectUri = 'http://mscanza-jammming-final.surge.sh/';
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
                return accessToken;
            } else {
                window.location = `${authEndpoint}?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`; 
            }
        }
    },

    

    search(term) {
         this.getAccessToken();
        return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {headers: {Authorization: `Bearer ${accessToken}`}})
        .then(response => {return response.json();}).then(jsonResponse => {
            if (!jsonResponse.tracks) {
                return [];
            } else {
                return jsonResponse.tracks.items.map(track => {
                    return {
                    id: track.id,
                    name: track.name,
                    artist: track.artists[0].name,
                    album: track.album.name,
                    uri: track.uri,
                    popularity: track.popularity
                    }
                })
            }
        });
    },


    savePlaylist(playlist, URIs) {

        if (!playlist || !URIs.length) {
            return;
        } else {
            accessToken = this.getAccessToken();
            const userAuth = {Authorization: `Bearer ${accessToken}`};
            let userId;
            let playlistID;

            return fetch('https://api.spotify.com/v1/me', {headers: userAuth})
            .then(response => response.json()
        ).then(jsonResponse => {
            userId = jsonResponse.id;
        return fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, 
        {headers: userAuth, method: 'POST', body: JSON.stringify({name: playlist})
        }).then(response => response.json()).then(jsonResponse => {playlistID = jsonResponse.id;
        return fetch(`https://api.spotify.com/v1/users/${userId}/playlists/${playlistID}/tracks`,
    {headers: userAuth, method: 'POST', body: JSON.stringify({uris: URIs})});
        });
        
        });
        
    
    }
    }
}
export default Spotify;