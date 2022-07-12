import './index.css'
import './App.css'

function AutocompleteItems(props) {

    return (
        <>
            <div className='autoItemsName' onClick={(e) => { props.searchFun(e, props.Id, props.Imgsource, props.Name,props.fav) }}>
                <div className='autoItemsName-box'>
                    <img className="Thumbnail" src={props.Imgsource} alt="Artist" />
                    <span >{props.Name}</span>
                </div>
                <button className='Setfavartist'>Fav</button>

            </div>
        </>
    )

}
export default AutocompleteItems;