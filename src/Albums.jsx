import { Fragment } from 'react';
import { useLocation } from 'react-router-dom';
import Card from './Card';
import './App.css'
import './index.css'
function Albums(props) {
    const data = useLocation();
    const albums = data.state.albums.albums;
    const artist_name = data.state.artist_name;
    const artist_image = data.state.artist_image;
    console.log(artist_name,artist_image)
    // const searchTracks() = data.state
    const info = data.state.info.info
    console.log("info",info)


    console.log(albums)

    return (
        <>
            <div className='artist_info'>
            <img  className='artist_img'  src={artist_image.artist_image} alt="Artist" />
            <div className='artist_name'>{artist_name.artist_name}</div>

            <div>Followers: {info.followers.total}</div>

            <div>Genres: {info.genres.map((el,id) => 
            <span key={id}>{el} | </span>
            )}</div>
            </div>
            
            <div className='title'>Albums</div>

            <div className='container'>
                {albums?.length > 0 &&
                    albums.map((element, index) =>
                        <Fragment key={index}>
                            <Card
                                Id={element.id}
                                searchFun={props.searchTracks}
                                img_src={element.images[0].url}
                                name={element.name}
                            />
                        </Fragment>
                    )
                }
            </div>
        </>
    )
}
export default Albums;