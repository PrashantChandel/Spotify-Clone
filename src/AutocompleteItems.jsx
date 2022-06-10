import './index.css'
import './App.css'

function AutocompleteItems(props) {

    return (
        <>
            <div className='autoItemsName' onClick={ (e) => {props.searchFun(e,props.Id,props.Imgsource,props.Name)} }>
            <img className="Thumbnail" src={props.Imgsource} alt="Artist" />
            <span >{props.Name}</span>
            </div>
        </>
    )

}
export default AutocompleteItems;