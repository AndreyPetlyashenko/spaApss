import Card from "./Card"
import { useContext } from "react"
import { UserContext } from "./UserContext"


const List = ({ selectedUsersIsShown, filterOptions }) => {
    const [users, setUsers] = useContext(UserContext)

    let storedUsers;

    const addInfoToLocalStorage = () => {
        // localStorage.clear();
        storedUsers = JSON.parse(localStorage.getItem("selectedUsers"));
        if (localStorage.getItem("selectedUsers") == undefined) {
            localStorage.setItem("selectedUsers", JSON.stringify([]))
        }
        users.selectedUsers.map((user) => !storedUsers?.includes(user) && storedUsers?.push(user))
        localStorage.setItem("selectedUsers", JSON.stringify(storedUsers))
    }
    addInfoToLocalStorage()

    const clearHandler = () => {
        localStorage.setItem("selectedUsers", JSON.stringify([]))
        setUsers(() => ({ ...users, selectedUsers: [] }))
    }

    const filteredUsers = (users) => {
        return users.filter((i) => {
            if (filterOptions.id && filterOptions.login) {
                return filterOptions.id == i.id && i.login?.includes(filterOptions.login)
            }
            if (filterOptions.id) {
                return filterOptions.id == i.id
            }
            if (filterOptions.login) {
                return i.login?.includes(filterOptions.login)
            }
            return i
        })
    }

    return (
        < div className="box content" >
            {
                selectedUsersIsShown ?
                    <div className="listContainer selectedListContainer" >
                        {filteredUsers(users.data).filter((i) => storedUsers?.includes(i.id)).
                            map(user => <Card user={user} key={user.id} selected={true} />)}

                        {storedUsers?[0] && <button onClick={clearHandler}>Clear the list</button>}
                    </div>
                    :
                    <div className="listContainer">
                        {filteredUsers(users.data).map(user => <Card user={user} key={user.id} />)}
                    </div>
            }
        </div >
    )
}
export default List