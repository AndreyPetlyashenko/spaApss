const SideBar = ({selectedUsersIsShown, setSelectedUsersIsShown}) => {

    const checkBoxSelectedHandler=()=>setSelectedUsersIsShown(!selectedUsersIsShown)
    
    return (
        <div className="box sidebar">
            <div className="usersSettings">
                 <input type="checkbox"  checked = {!selectedUsersIsShown}   onChange={checkBoxSelectedHandler} id='users'/>
            <label htmlFor="users"> USERS</label>
            </div>
            <div className="selectedUsersSettings">
                 <input type="checkbox" checked = {selectedUsersIsShown} onChange={checkBoxSelectedHandler} id='selectedUsers'/>
            <label htmlFor="SelectedUsers"> SELECTED USERS</label>
            </div>
        </div>
    )
}
export default SideBar