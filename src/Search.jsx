import { useCallback, useState } from "react";
import axios from "axios";
import useDebounced from "./Debounce";
import AutocompleteItems from "./AutocompleteItems";
import { useNavigate } from "react-router-dom";
function Search() {

    const [search, setSearch] = useState([])
    const [albums, setAlbums] = useState([])
    let token = window.localStorage.getItem("token");
    let navigate = useNavigate();

    const handleChange = async (e) => {
        e.preventDefault();
        // console.log(token)
        const searchValue = e.target.value;
        console.log(searchValue)
        if (searchValue !== "") {
            console.log("here")
            try {
                const { data } = await axios.get("https://api.spotify.com/v1/search", {
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
    const searchAlbums = async (e, idd, artist_image, artist_name) => {

        e.preventDefault()
        console.log(idd);
        try {

            const final_artist_info = await axios.get(`https://api.spotify.com/v1/artists/${idd}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            const { data } = await axios.get(`https://api.spotify.com/v1/artists/${idd}/albums`, {
                headers: {
                    Authorization: `Bearer ${token}`
                },
                params: {
                    type: "artist"
                }
            })
            // console.log(data)
            console.log("start")
            console.log(final_artist_info.data)
            console.log("end")
            setAlbums(data.items)
            console.log(albums);
            const info = final_artist_info.data;

            if (albums.length > 0 && final_artist_info.data) {
                navigate('albums', { state: { albums: { albums }, searchTracks: {}, artist_image: { artist_image }, artist_name: { artist_name }, info: {info} } })
            }
            // navigate('albums', { state: { albums: { albums }, searchTracks: {} } })
        }
        catch (error) {
            let errormsg = error.response.data.error.message;
            console.log(errormsg)
        }

    }
    const DebouncedSearch = useCallback(useDebounced(handleChange), [])
    return (
        <>
            {token ? <input type={'text'} name={'search'} placeholder={'Search Artists...'} className={'search'} onChange={DebouncedSearch}>
            </input> : <br></br>
            }
            {search?.length > 0 &&
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