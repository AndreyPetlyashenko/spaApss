import { useState, useContext } from "react";
import { UserContext } from "./UserContext";

const Card = ({ user, selected, removeUserHandler }) => {
  const [userDetails, setUserDetails] = useState({
    isDetailsShown: false,
    dataDetails: [],
  });

  const [isClicked, setIsCliked] = useState(false);

  const [users, setUsers] = useContext(UserContext);

  const onClick = () => {
    const getAdditionalInfo = async (url) => {
      const response = await fetch(url);
      const data = await response.json();
      return data;
    };

    getAdditionalInfo(`https://api.github.com/users/${user.login}`).then(
      (Data) => {
        setUserDetails(() => ({
          dataDetails: Data,
          isDetailsShown: !userDetails.isDetailsShown,
        }));
      }
    );
  };

  const pickUserHandler = (e) => {
    e.stopPropagation();
    setIsCliked(!isClicked);
    !users.selectedUsers?.includes(user.id) &&
      setUsers(() => ({
        ...users,
        selectedUsers: users.selectedUsers.concat([user.id]),
      }));
  };

  return (
    <div className="cardContainer" onClick={onClick}>
      <div className="imgContainer">
        <img src={user.avatar_url} alt="user`s Avatar" />
      </div>
      <p>{user.login}</p>

      {selected ? (
        <button onClick={(e)=>{
            e.preventDefault()
            removeUserHandler(user.id)
        }}>Remove the user</button>
      ) : (
        <button
          onClick={pickUserHandler}
          className={isClicked ? "selectedUser" : ""}
        >
          Pick the user
        </button>
      )}

      {userDetails.isDetailsShown && (
        <div className="detailsUserContainer">
          <p>Name: {userDetails.dataDetails.name}</p>
          <p>Location: {userDetails.dataDetails.location}</p>
          <p>Company: {userDetails.dataDetails.company}</p>
        </div>
      )}
    </div>
  );
};
export default Card;
