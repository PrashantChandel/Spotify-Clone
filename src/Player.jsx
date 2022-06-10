import SpotifyPlayer from 'react-spotify-web-playback';



function Player() {

    let token = window.localStorage.getItem("token")



    return (
        <SpotifyPlayer
            token={token}
            uris={['spotify:artist:6HQYnRM4OzToCYPpVBInuU']}
        />

    )
}

export default Player;