import { Fragment, useState } from 'react';
import { useLocation } from 'react-router-dom';
import ReactPaginate from 'react-paginate';

import Card from './Card';
import './App.css'
import './index.css'
import axios from 'axios';
function Albums(props) {
    const data = useLocation();
    const albums = data.state.albums.albums;
    const artist_name = data.state.artist_name;
    const artist_image = data.state.artist_image;
    let token = window.localStorage.getItem("token");
    const idd = data.state.idd.idd
    const pageCount = Math.ceil(data.state.total.total / 4);
    // console.log("pagecount", pageCount)
    // console.log(data.state)

    // console.log("idd: ",idd)
    console.log(artist_name, artist_image)
    // const searchTracks() = data.state
    const info = data.state.info.info
    // console.log("info", info)
    const [limablums, setLimablums] = useState([]);

    // console.log(albums)
    // console.log(idd)
    const handlePageClick = async (e, idd, artist_image, artist_name) => {

        axios.get(`https://api.spotify.com/v1/artists/${idd}/albums`, {
            headers: {
                Authorization: `Bearer ${token}`
            },
            params: {
                type: "artist",
                limit: 4,
                offset: e.selected * 4
            }
        })
            .then((res) => {
                const data = res.data;
                setLimablums(data.items)
            })
            .catch((err) => {
                console.log(err)
            })
    };

    return (
        <>
            <div className='artist_info'>
                <img className='artist_img' src={artist_image.artist_image} alt="Artist" />
                <div className='artist_name'>{artist_name.artist_name}</div>

                <div>Followers: {info.followers.total}</div>

                <div>Genres: {info.genres.map((el, id) =>
                    <span key={id}>{el} | </span>
                )}</div>
            </div>

            <div className='title'>Albums</div>

            <div className='container'>
                {albums?.length > 0 && !limablums?.length > 0 &&
                    albums.map((element, index) =>
                        <Fragment key={index}>
                            <Card
                                Id={element.id}

                                img_src={element.images[0].url}
                                name={element.name}
                            />
                        </Fragment>
                    )
                }
                {limablums?.length > 0 &&
                    limablums.map((element, index) =>
                        <Fragment key={index}>
                            <Card
                                Id={element.id}

                                img_src={element.images[0].url}
                                name={element.name}
                            />
                        </Fragment>
                    )
                }
            </div>
            <ReactPaginate
                nextLabel=" >"
                onPageChange={(e) => { handlePageClick(e, idd, artist_image, artist_name) }}
                pageRangeDisplayed={3}
                marginPagesDisplayed={1}
                pageCount={pageCount}
                previousLabel="< "
                pageClassName="page-item"
                pageLinkClassName="page-link"
                previousClassName="page-item"
                previousLinkClassName="page-link"
                nextClassName="page-item"
                nextLinkClassName="page-link"
                breakLabel="..."
                breakClassName="page-item"
                breakLinkClassName="page-link"
                containerClassName="pagination"
                activeClassName="active"
                renderOnZeroPageCount={null}
            />
        </>
    )
}
export default Albums;