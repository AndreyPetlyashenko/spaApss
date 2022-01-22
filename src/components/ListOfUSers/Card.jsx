import { useState, useContext} from "react"
import { UserContext } from "./UserContext"


const Card = ({ user, selected }) => {

    const [userDetails, setUserDetails] = useState({ isDetailsShown: false, dataDetails: [] })
    
    const [users, setUsers] = useContext(UserContext)

    const onClick = (e) => {

        e.preventDefault()
        const getAdditionalInfo = async (url) => {
            const response = await fetch(url)
            const data = await response.json()
            return data
        }

        getAdditionalInfo(`https://api.github.com/users/${user.login}`).then(Data => { 
            setUserDetails(() => ({ dataDetails: Data, isDetailsShown: !userDetails.isDetailsShown }))
        });
    }

    const pickUserHandler = (e) => {
        e.stopPropagation()
        e.target.style.border='5px solid black'
        !users.selectedUsers?.includes(user.id) &&
            setUsers(() => ({ ...users, selectedUsers: users.selectedUsers.concat([user.id]) }))
    }
    const removeUserHandler = () => {
        let storedUsers = JSON.parse(localStorage.getItem("selectedUsers")).filter(storedID => storedID != user.id);
        localStorage.setItem("selectedUsers", JSON.stringify(storedUsers))
        setUsers(() => ({ ...users, selectedUsers: storedUsers }))
    }
    return (
        <div className="cardContainer" onClick={onClick}>
            <div className="imgContainer">
                <img src={user.avatar_url} alt="user`s Avatar" />
            </div>
            <p>{user.login}</p>

            {selected ?
                <button onClick={removeUserHandler}>Remove the user</button>
                :
                <button onClick={pickUserHandler}>Pick the user</button>
            }

            {userDetails.isDetailsShown &&
                <div className="detailsUserContainer">
                    <p>Name: {userDetails.dataDetails.name}</p>
                    <p>Location: {userDetails.dataDetails.location}</p>
                    <p>Company: {userDetails.dataDetails.company}</p>
                </div>
            }
        </div>
    )
}
export default Card