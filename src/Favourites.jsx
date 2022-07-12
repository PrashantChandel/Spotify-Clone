import axios from 'axios';
import { Fragment, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Card from './Card';
import AutocompleteItems from './AutocompleteItems';

function Favourites(props) {

    const data = useLocation();
    
    // const tracks = data.state.tracks.tracks;
    // const album_name = data.state.album_name.currAlbum;
    // const [tracks,useTracks] = useState(data.state.tracks.tracks)
    const tracks = data.state.tracks.tracks
    const favalbums = data.state.albums.albums
    const artist = data.state.artist.artist
    // console.log(artist)
    const [albums, setAlbums] = useState([])
    const [info, setInfo] = useState([])
    const [total, setTotal] = useState(1);


    const [token, setToken] = useState();
    const temp = window.localStorage.getItem('token')

    useEffect(() => {
        setToken(temp)
    }, [temp])

    useEffect(()=>{
        console.log("rendering")
    },)
    const currentuser = window.localStorage.getItem('user')
    let navigate = useNavigate();
    const searchAlbums = async (e, idd, artist_image, artist_name, fav) => {

        if (e.target.className === 'Setfavartist') {
            if (!window.localStorage.getItem('user')) {
                alert("Select user First")
            }
            else {
                if (fav) {
                    console.log("clearing")
                    axios.get('http://localhost:3005/sequelize/removefavartist', {
                        params: {
                            user_id: window.localStorage.getItem('user'),
                            artist_idd: idd,
                        }
                    })
                        .then((res) => {
                            console.log("Removed")
                        })
                        .catch((err) => {
                            console.log(err);
                        })
                }
                else {
                    axios.get('http://localhost:3005/sequelize/setfavartist', {
                        params: {
                            user_id: window.localStorage.getItem('user'),
                            artist_idd: idd,
                            artist_name: artist_name,
                            artist_image: artist_image
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
        else {
            e.preventDefault()
            console.log(idd);

            axios.get(`https://api.spotify.com/v1/artists/${idd}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then((res) => {
                    console.log("1st", res.data)
                    setInfo(res.data)
                })
                .catch((err) => {
                    console.log(err);
                })
            axios.get(`https://api.spotify.com/v1/artists/${idd}/albums`, {
                headers: {
                    Authorization: `Bearer ${token}`
                },
                params: {
                    type: "artist",
                    limit: 4,
                    offset: 0
                }
            })
                .then((res) => {
                    console.log("2nd", res.data)
                    const data = res.data;
                    setAlbums(data.items)
                    setTotal((data.total))
                })
                .catch((err) => {
                    console.log(err)
                })


            if (albums.length > 0 && info) {
                navigate('/albums', { state: { albums: { albums }, searchTracks: {}, artist_image: { artist_image }, artist_name: { artist_name }, info: { info }, idd: { idd }, total: { total } } })
            }

        }




    }

    const trackHandler = async (e, uri, name) => {
        // console.log(uri, name)
        console.log(`clicked ${e.target.className} div`);
        if (e.target.className === 'track' || e.target.className === 'x') {
            console.log("playing", name)

            window.open(
                `${uri}`,
                "_self"
            );
        }
        if (e.target.className === 'butt') {

            axios.get('http://localhost:3005/sequelize/removefav', {
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
    return (
        <>
            <h4 className='album_name'>Favourite Songs</h4>
            <div className='title'>Tracks</div>
            <div className='track_container' >
                {currentuser ?
                    tracks.length > 0 ? tracks.map((elem, idx) =>
                        <div key={idx} className='track' onClick={(e) => { trackHandler(e, elem.uri, elem.song_name) }} >
                            <div className='x'>{elem.song_name}</div>
                            <div ><button className='butt' >Remove Fav</button></div>
                        </div>)
                        : "Add favourites first" : "select user first"}
            </div>
            {/********************************************* */}

            <div className='title'>Albums</div>
            <div className='container'>
                {favalbums?.length > 0 &&
                    favalbums.map((element, index) =>
                        <Fragment key={index}>
                            <Card
                                Id={element.idd}
                                fav={true}
                                img_src={element.img_src}
                                name={element.album_name}
                            />
                        </Fragment>
                    )
                }
            </div>
            {/********************************************* */}
            <div className='title'>Artists</div>
            <div className='fav_artist_div'>
                {artist?.length > 0 &&
                    <div className='autocomplete'>
                        {artist.map((element, index) =>
                            <div key={index} className='autocompleteItems'>
                                <AutocompleteItems Name={element.artist_name}
                                    Id={element.idd}
                                    Imgsource={element.img_src}
                                    searchFun={searchAlbums}
                                    fav={true}
                                />
                            </div>
                        )}
                        <br />
                    </div>
                }
            </div>
        </>
    )
}
export default Favourites;

