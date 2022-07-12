
import axios from 'axios'
import { useEffect } from 'react';
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';

import './index.css'


function Navbar(props) {


    // const temp = [{
    //     "album_group": "album",
    //     "album_type": "album",
    //     "artists": [
    //         {
    //             "external_urls": {
    //                 "spotify": "https://open.spotify.com/artist/4Z8W4fKeB5YxbusRsdQVPb"
    //             },
    //             "href": "https://api.spotify.com/v1/artists/4Z8W4fKeB5YxbusRsdQVPb",
    //             "id": "4Z8W4fKeB5YxbusRsdQVPb",
    //             "name": "Radiohead",
    //             "type": "artist",
    //             "uri": "spotify:artist:4Z8W4fKeB5YxbusRsdQVPb"
    //         }
    //     ],
    //     "available_markets": [
    //         "AD",
    //         "AE",
    //         "AG",
    //         "AL",
    //         "AM",
    //         "AO",
    //         "AR",
    //         "AT",
    //         "AU",
    //         "AZ",
    //         "BA",
    //         "BB",
    //         "BD",
    //         "BE",
    //         "BF",
    //         "BG",
    //         "BH",
    //         "BI",
    //         "BJ",
    //         "BN",
    //         "BO",
    //         "BR",
    //         "BS",
    //         "BT",
    //         "BW",
    //         "BY",
    //         "BZ",
    //         "CA",
    //         "CD",
    //         "CG",
    //         "CH",
    //         "CI",
    //         "CL",
    //         "CM",
    //         "CO",
    //         "CR",
    //         "CV",
    //         "CW",
    //         "CY",
    //         "CZ",
    //         "DE",
    //         "DJ",
    //         "DK",
    //         "DM",
    //         "DO",
    //         "DZ",
    //         "EC",
    //         "EE",
    //         "EG",
    //         "ES",
    //         "FI",
    //         "FJ",
    //         "FM",
    //         "FR",
    //         "GA",
    //         "GB",
    //         "GD",
    //         "GE",
    //         "GH",
    //         "GM",
    //         "GN",
    //         "GQ",
    //         "GR",
    //         "GT",
    //         "GW",
    //         "GY",
    //         "HK",
    //         "HN",
    //         "HR",
    //         "HT",
    //         "HU",
    //         "ID",
    //         "IE",
    //         "IL",
    //         "IN",
    //         "IQ",
    //         "IS",
    //         "IT",
    //         "JM",
    //         "JO",
    //         "JP",
    //         "KE",
    //         "KG",
    //         "KH",
    //         "KI",
    //         "KM",
    //         "KN",
    //         "KR",
    //         "KW",
    //         "KZ",
    //         "LA",
    //         "LB",
    //         "LC",
    //         "LI",
    //         "LK",
    //         "LR",
    //         "LS",
    //         "LT",
    //         "LU",
    //         "LV",
    //         "LY",
    //         "MA",
    //         "MC",
    //         "MD",
    //         "ME",
    //         "MG",
    //         "MH",
    //         "MK",
    //         "ML",
    //         "MN",
    //         "MO",
    //         "MR",
    //         "MT",
    //         "MU",
    //         "MV",
    //         "MW",
    //         "MX",
    //         "MY",
    //         "MZ",
    //         "NA",
    //         "NE",
    //         "NG",
    //         "NI",
    //         "NL",
    //         "NO",
    //         "NP",
    //         "NR",
    //         "NZ",
    //         "OM",
    //         "PA",
    //         "PE",
    //         "PG",
    //         "PH",
    //         "PK",
    //         "PL",
    //         "PS",
    //         "PT",
    //         "PW",
    //         "PY",
    //         "QA",
    //         "RO",
    //         "RS",
    //         "RW",
    //         "SA",
    //         "SB",
    //         "SC",
    //         "SE",
    //         "SG",
    //         "SI",
    //         "SK",
    //         "SL",
    //         "SM",
    //         "SN",
    //         "SR",
    //         "ST",
    //         "SV",
    //         "SZ",
    //         "TD",
    //         "TG",
    //         "TH",
    //         "TJ",
    //         "TL",
    //         "TN",
    //         "TO",
    //         "TR",
    //         "TT",
    //         "TV",
    //         "TW",
    //         "TZ",
    //         "UA",
    //         "UG",
    //         "US",
    //         "UY",
    //         "UZ",
    //         "VC",
    //         "VE",
    //         "VN",
    //         "VU",
    //         "WS",
    //         "XK",
    //         "ZA",
    //         "ZM",
    //         "ZW"
    //     ],
    //     "external_urls": {
    //         "spotify": "https://open.spotify.com/album/6ofEQubaL265rIW6WnCU8y"
    //     },
    //     "href": "https://api.spotify.com/v1/albums/6ofEQubaL265rIW6WnCU8y",
    //     "id": "6ofEQubaL265rIW6WnCU8y",
    //     "images": [
    //         {
    //             "height": 640,
    //             "url": "https://i.scdn.co/image/ab67616d0000b273bbaaa8bf9aedb07135d2c6d3",
    //             "width": 640
    //         },
    //         {
    //             "height": 300,
    //             "url": "https://i.scdn.co/image/ab67616d00001e02bbaaa8bf9aedb07135d2c6d3",
    //             "width": 300
    //         },
    //         {
    //             "height": 64,
    //             "url": "https://i.scdn.co/image/ab67616d00004851bbaaa8bf9aedb07135d2c6d3",
    //             "width": 64
    //         }
    //     ],
    //     "name": "KID A MNESIA",
    //     "release_date": "2021-11-05",
    //     "release_date_precision": "day",
    //     "total_tracks": 34,
    //     "type": "album",
    //     "uri": "spotify:album:6ofEQubaL265rIW6WnCU8y"
    // }]
    // const tempart = [{
    //     "external_urls": {
    //         "spotify": "https://open.spotify.com/artist/77mJc3M7ZT5oOVM7gNdXim"
    //     },
    //     "followers": {
    //         "href": null,
    //         "total": 568796
    //     },
    //     "genres": [
    //         "indie pop",
    //         "liverpool indie"
    //     ],
    //     "href": "https://api.spotify.com/v1/artists/77mJc3M7ZT5oOVM7gNdXim",
    //     "id": "77mJc3M7ZT5oOVM7gNdXim",
    //     "images": [
    //         {
    //             "height": 640,
    //             "url": "https://i.scdn.co/image/ab6761610000e5eb6e339cf31f00e472b1ddd1c5",
    //             "width": 640
    //         },
    //         {
    //             "height": 320,
    //             "url": "https://i.scdn.co/image/ab676161000051746e339cf31f00e472b1ddd1c5",
    //             "width": 320
    //         },
    //         {
    //             "height": 160,
    //             "url": "https://i.scdn.co/image/ab6761610000f1786e339cf31f00e472b1ddd1c5",
    //             "width": 160
    //         }
    //     ],
    //     "name": "Her's",
    //     "popularity": 63,
    //     "type": "artist",
    //     "uri": "spotify:artist:77mJc3M7ZT5oOVM7gNdXim"
    // }]

    let navigate = useNavigate();
    const [tracks, setTracks] = useState(-1);
    const [albums, setAlbums] = useState(-1);
    const [artist, setArtist] = useState(-1);
    const getFavourites = async () => {
        await axios.get('http://localhost:3005/sequelize/showfav', {
            params: {
                user_id: window.localStorage.getItem('user')
            }
        })
            .then((res) => {
                // console.log(res);
                setTracks(res.data);
            })
            .catch((err) => {
                console.log(err);
            })
        await axios.get('http://localhost:3005/sequelize/showfavalbums', {
            params: {
                user_id: window.localStorage.getItem('user')
            }
        })
            .then((res) => {
                // console.log("Here are albums", res.data);
                //setAlbums(res.data);
                setAlbums(res.data)
            })
            .catch((err) => {
                console.log(err);
            })
        await axios.get('http://localhost:3005/sequelize/showfavartist', {
            params: {
                user_id: window.localStorage.getItem('user')
            }
        })
            .then((res) => {
                console.log("Here are artist", res.data);
                //setAlbums(res.data);
                setArtist(res.data)
            })
            .catch((err) => {
                console.log(err);
            })
    }
    const userpath = async () => {
        navigate('/users')
    }
    const homepath = async () => {
        navigate('/')
    }
    useEffect(() => {
        if (tracks !== -1 && albums !== -1 && artist !== -1) {
            navigate('/Favourites', { state: { tracks: { tracks }, albums: { albums }, artist: { artist } } })
        }
        // else {
        //     navigate('/nofav')
        // }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [tracks, albums, artist])

    return (
        <>
            <nav className="navbar">
                <div className="container-fluid">
                    <span className="navbar-brand" onClick={(e) => { homepath() }}>Spotify Search</span>
                    <div className="collapse ">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <span className="nav-link" onClick={(e) => { getFavourites() }}>Favourites</span>
                            </li>
                            <li className="nav-item">
                                <span className="nav-link" onClick={(e) => { userpath() }}>Users</span>
                            </li>
                        </ul>

                    </div>
                </div>
            </nav>
        </>
    )

}

export default Navbar;