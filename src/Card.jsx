import { useState } from 'react'
import './index.css'
import axios from 'axios'
import { Navigate, useNavigate } from "react-router-dom";

function Card(props) {

    const [currAlbum, setCurrAlbum] = useState("")
    const [tracks, setTracks] = useState([])
    let navigate = useNavigate();

    let token = window.localStorage.getItem("token")

    const searchTracks = async (e, idd, Albumname) => {
        setCurrAlbum(Albumname)
        console.log("Searching Tracks")
        e.preventDefault()
        try {
            const { data } = await axios.get(`https://api.spotify.com/v1/albums/${idd}/tracks`, {
                headers: {
                    Authorization: `Bearer ${token}`
                },
                params: {
                    type: "artist"
                }
            })
            setTracks(data.items)
            console.log(tracks)
            if (tracks.length > 0) {
                navigate('tracks', { state: { tracks: { tracks }, album_name:{currAlbum} } })
            }

        }
        catch (error) {
            let errormsg = error.response.data.error.message;
            console.log(errormsg)
        }
    }




    return (
        <>
            <div className="Cards" onClick={(e) => { searchTracks(e, props.Id,props.name) }}>
                {/* <Link to="/tracks"> */}
                <div className="Card" >
                    <img src={props.img_src}
                        alt="Artist Profile"
                        className="imgClass"
                    />
                    <p className="Artist Name">{props.name}</p>
                </div>
                {/* </Link> */}
            </div>
        </>
    )

}

export default Card;