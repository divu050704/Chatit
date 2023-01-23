export default function NewMessage(props){
    return (
        <div className="search--navbar">
            <box-icon name='arrow-back' color='#d2d2d2' style={{ cursor: "pointer" }} onClick={props.handleNewMessageOpen} ></box-icon>
            <div className="search--navbar-inputBox" >
                <input type="text" className="search--navbar-inputBox-input" value={props.searchValue} onChange={props.handleSearchValueChange} autoFocus/>
                <span className="search--navbar-inputBox-cross" onClick={props.clearSearchValue}>
                    <box-icon name='x' color='#d2d2d2' ></box-icon>
                </span>
            </div>

        </div>
    )
}