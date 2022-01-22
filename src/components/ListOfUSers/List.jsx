import Card from "./Card"
import { useContext } from "react"
import { UserContext } from "./UserContext"


const List = ({ selectedUsersIsShown, filterOptions }) => {
    const [users, setUsers] = useContext(UserContext)

    // localStorage.clear(); 
  
    
    if (!localStorage.getItem("selectedUsers")) {
        localStorage.setItem("selectedUsers", JSON.stringify([]))
    }

    let  storedUsers = JSON.parse(localStorage.getItem("selectedUsers"));

    console.log(storedUsers, 'storedUSERS')

    users.selectedUsers.map((user) => !storedUsers.includes(user) && storedUsers.push(user))
    
    localStorage.setItem("selectedUsers", JSON.stringify(storedUsers))
    
   
    const clearHandler = () => {
        localStorage.setItem("selectedUsers", JSON.stringify([]))
        setUsers(() => ({ ...users, selectedUsers: [] }))
    }

    const filteredUsers = (users) => {
        return users.filter((i) => {
            if (filterOptions.id && filterOptions.login) {
                return filterOptions.id == i.id && i.login.includes(filterOptions.login)
            }
            if (filterOptions.id) {
                return filterOptions.id == i.id
            }
            if (filterOptions.login) {
                return i.login.includes(filterOptions.login)
            }
            return i
        })
    }

    return (
        < div className="box content" >
            {
                selectedUsersIsShown ?
                    <div className="listContainer selectedListContainer" >
                        {filteredUsers(users.data).filter((i) => storedUsers.includes(i.id)).
                            map(user => <Card user={user} key={user.id} selected={true} />)}

                        {storedUsers[0] && <button onClick={clearHandler}>Clear the list</button>}
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