import { useLocation } from 'react-router-dom';
import Player from './Player';

function Tracks(props) {

    const data = useLocation();
    const tracks = data.state.tracks.tracks;
    const album_name = data.state.album_name.currAlbum;
    console.log(data.state)
    // const trackuri = data.state.trackuri;

    const trackHandler = async (e,uri) => {
        window.open(
            `${uri}`,
            "_self"
          );
    }
    return (
        <>
            <h4 className='album_name'>{album_name}</h4>
            <div className='title'>Tracks</div>
            <div className='track_container'>
                {tracks.map((elem, idx) =>
                    <div key={idx} className='track' onClick={(e) => { trackHandler(e, elem.uri) }}>
                        <span >{elem.name}</span>
                    </div>
                )}
            </div>
            <Player />
        </>
    )

}


export default Tracks;

