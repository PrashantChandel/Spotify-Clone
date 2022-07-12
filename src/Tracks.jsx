import axios from 'axios';
import { useLocation } from 'react-router-dom';
import Player from './Player';

function Tracks(props) {

    const data = useLocation();
    const tracks = data.state.tracks.tracks;
    const album_name = data.state.album_name.currAlbum;
    console.log(data.state)

    const trackHandler = async (e, uri, name) => {
        console.log(`clicked ${e.target.className} div`);
        if (e.target.className === 'track') {
            window.open(
                `${uri}`,
                "_self"
            );
        }
        if (e.target.className === 'butt') {
            if (!window.localStorage.getItem('user')) {
                alert("Select user First")
            }
            else {
                axios.get('http://localhost:3005/sequelize/setfav', {
                    params: {
                        user_id: window.localStorage.getItem('user'),
                        song_id: uri,
                        name: name
                    }
                })
                .then((res) => {
                    console.log("Fav set")
                })
                .catch((err) => {
                    console.log(err);
                })
            }
        }
    }
    return (
        <>
            <h4 className='album_name'>{album_name}</h4>
            <div className='title'>Tracks</div>
            <div className='track_container'>
                {tracks.map((elem, idx) => (
                    <div key={idx} className='track' onClick={(e) => { trackHandler(e, elem.uri, elem.name) }}>
                        <div >{elem.name}</div>
                        <div ><button className='butt'>Set Fav</button></div>
                    </div>
                )
                )}
            </div>
            <Player />
        </>
    )

}


export default Tracks;

