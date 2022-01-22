const Header = ({filterOptions, setFilterOptions}) => {

const inputHandler = (e)=>{
   setFilterOptions({...filterOptions,[e.target.id]:e.target.value})
}
    return (
        <div className="box header">
            <h1>HEADER</h1>
            <div className="SearchWrapper">
                <input type="text"  id="id" placeholder="Search by ID" onChange={inputHandler}/>
                <input type="text" id="login" placeholder="Search by LOGIN" onChange={inputHandler}/>
            </div>

        </div>
    )
}
export default Header