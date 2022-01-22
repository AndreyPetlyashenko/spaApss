import { useContext } from "react";
import { UserContext } from "./ListOfUSers/UserContext";

const SideBar = ({ selectedUsersIsShown, setSelectedUsersIsShown }) => {
  const checkBoxSelectedHandler = () =>
    setSelectedUsersIsShown(!selectedUsersIsShown);
  const [users, setUsers] = useContext(UserContext);

  const clearHandler = () => {
    localStorage.setItem("selectedUsers", JSON.stringify([]));
    setUsers(() => ({ ...users, selectedUsers: [] }));
  };

  return (
    <div className="box sidebar">
      <div className="usersSettings">
        <input
          type="checkbox"
          checked={!selectedUsersIsShown}
          onChange={checkBoxSelectedHandler}
          id="users"
        />
        <label htmlFor="users">users</label>
      </div>
      <div className="selectedUsersSettings">
        <input
          type="checkbox"
          checked={selectedUsersIsShown}
          onChange={checkBoxSelectedHandler}
          id="selectedUsers"
        />
        <label htmlFor="SelectedUsers">selected users</label>
      </div>
      <button onClick={clearHandler}>Clear selected list</button>
    </div>
  );
};
export default SideBar;
