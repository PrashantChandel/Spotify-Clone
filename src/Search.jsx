import { useEffect, useState } from "react";
import axios from "axios";
import useDebounced from "./Debounce";
import AutocompleteItems from "./AutocompleteItems";
import { useNavigate } from "react-router-dom";
function Search() {

    const [search, setSearch] = useState([])
    const [albums, setAlbums] = useState([])
    const [info, setInfo] = useState([])
    const [total, setTotal] = useState(1);


    const [token, setToken] = useState();
    const temp = window.localStorage.getItem('token')

    useEffect(() => {
        setToken(temp)
    }, [temp])

    // const [value, setValue] = useState("")

    // let token = window.localStorage.getItem("token");
    let navigate = useNavigate();

    const handleChange = async (value) => {
        const searchValue = value;
        if (searchValue !== "") {
            console.log("here")
            try {
                const { data } = await axios.get("http://localhost:3001/artists", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    params: {
                        q: searchValue,
                        type: "artist"
                    }
                })
                setSearch(data.artists.items)
                console.log(data)
            }
            catch (error) {
                console.log(error)
            }
        }
        else {
            setSearch([])
            setAlbums([])
        }
    }
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
                navigate('albums', { state: { albums: { albums }, searchTracks: {}, artist_image: { artist_image }, artist_name: { artist_name }, info: { info }, idd: { idd }, total: { total } } })
            }

        }




    }
    // useEffect(() => {
    //     if (albums.length > 0 && info) {
    //         navigate('albums', { state: { albums: { albums }, searchTracks: {}, artist_image: { artist_image }, artist_name: { artist_name }, info: { info }, idd: { idd }, total: { total } } })
    //     }

    // }, [info, albums])

    const DebouncedSearch = useDebounced(handleChange)

    //(value)=> handleChange(value

    // const DebouncedSearch = useCallback(
    //     useDebounced((value) => handleChange(value)),
    //     []
    // );





    return (
        <>
            {token ? <input type={'text'} name={'search'} placeholder={'Search Artists...'} className={'search'} onChange={(e) => DebouncedSearch(e.target.value)}>
            </input> : <br></br>
            }
            {search?.length > 0 && token &&
                <div className='autocomplete'>
                    {search.map((element, index) =>
                        <div key={index} className='autocompleteItems'>
                            <AutocompleteItems Name={element.name}
                                Id={element.id}
                                Imgsource={element.images.length > 0 ? element.images[0].url : "https://i.scdn.co/image/ab6761610000e5eb609177b911352232113b7fcc"}
                                searchFun={searchAlbums}
                            />
                        </div>
                    )}
                    <br />
                </div>
            }

        </>
    )

}

export default Search;