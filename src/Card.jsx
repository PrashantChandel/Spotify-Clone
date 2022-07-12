import { useState } from 'react'
import './index.css'
import axios from 'axios'
import { useNavigate } from "react-router-dom";

function Card(props) {
    const [currAlbum, setCurrAlbum] = useState("")
    const [tracks, setTracks] = useState([])
    let navigate = useNavigate();

    let token = window.localStorage.getItem("token")

    // const setfavalbum = async (e, idd, name, image, fav) => {
    //     if (!window.localStorage.getItem('user')) {
    //         alert("Select user First")
    //     }
    //     else {
    //         if (fav) {
    //             console.log("clearing")
    //             axios.get('http://localhost:3005/sequelize/removefavalbums', {
    //                 params: {
    //                     user_id: window.localStorage.getItem('user'),
    //                     album_idd: idd,
    //                 }
    //             })
    //                 .then((res) => {
    //                     console.log("Removed")
    //                 })
    //                 .catch((err) => {
    //                     console.log(err);
    //                 })
    //         }
    //         else {
    //             axios.get('http://localhost:3005/sequelize/setfavalbums', {
    //                 params: {
    //                     user_id: window.localStorage.getItem('user'),
    //                     album_idd: idd,
    //                     album_name: name,
    //                     album_image: image
    //                 }
    //             })
    //                 .then((res) => {
    //                     console.log("Fav set")
    //                 })
    //                 .catch((err) => {
    //                     console.log(err);
    //                 })

    //         }

    //     }
    // }
    const searchTracks = async (e, idd, Albumname, image, fav) => {

        if (e.target.className === 'xx') {
            if (!window.localStorage.getItem('user')) {
                alert("Select user First")
            }
            else {
                if (fav) {
                    console.log("clearing")
                    axios.get('http://localhost:3005/sequelize/removefavalbums', {
                        params: {
                            user_id: window.localStorage.getItem('user'),
                            album_idd: idd,
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
                    axios.get('http://localhost:3005/sequelize/setfavalbums', {
                        params: {
                            user_id: window.localStorage.getItem('user'),
                            album_idd: idd,
                            album_name: Albumname,
                            album_image: image
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
            setCurrAlbum(Albumname)
            console.log("Searching Tracks")
            e.preventDefault()
            try {

                //https://api.spotify.com/v1/albums/${idd}/tracks
                const { data } = await axios.get(`http://localhost:3001/tracks`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    },
                    params: {
                        type: "artist",
                        id: idd
                    }
                })
                setTracks(data.items)
                console.log(tracks)
                if (tracks.length > 0) {
                    navigate('/albums/tracks', { state: { tracks: { tracks }, album_name: { currAlbum } } })
                }

            }
            catch (error) {
                let errormsg = error.response.data.error.message;
                console.log(errormsg)
            }
        }

    }
    return (
        <>
            <div className="Cards" onClick={(e) => { searchTracks(e, props.Id, props.name, props.img_src, props.fav) }}>
                {/* <Link to="/tracks"> */}
                <div className="Card" >
                    <img src={props.img_src}
                        alt="Artist Profile"
                        className="imgClass"
                    />
                    <p className="Artist Name">{props.name}</p>
                    <button className='xx' >Fav</button>
                </div>
                {/* </Link> */}
            </div>
        </>
    )
}

// onClick={(e) => { setfavalbum(e, props.Id, props.name, props.img_src, props.fav) }}

export default Card;