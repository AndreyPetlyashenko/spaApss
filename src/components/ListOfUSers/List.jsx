import Card from "./Card";
import { useContext } from "react";
import { UserContext } from "./UserContext";

const List = ({ selectedUsersIsShown, filterOptions }) => {
  const [users, setUsers] = useContext(UserContext);

  let storedUsers;
  const safeUsersInLocalStorage = () => {
    // localStorage.clear();

    if (!localStorage.getItem("selectedUsers")) {
      localStorage.setItem("selectedUsers", JSON.stringify([]));
    }

    storedUsers = JSON.parse(localStorage.getItem("selectedUsers"));

    users.selectedUsers.map(
      (user) => !storedUsers.includes(user) && storedUsers.push(user)
    );

    localStorage.setItem("selectedUsers", JSON.stringify(storedUsers));
  };
  safeUsersInLocalStorage();

  const removeUserHandler = (id) => {

    const updatedUsers = storedUsers.filter((storedID) => storedID != id);
    localStorage.setItem("selectedUsers", JSON.stringify(updatedUsers));
  
    setUsers(() => ({ ...users, selectedUsers: updatedUsers }));
  };

  const filteredUsers = (users) => {
    return users.filter((i) => {
      if (filterOptions.id && filterOptions.login) {
        return (
          Number(filterOptions.id) === i.id &&
          i.login.toLowerCase().includes(filterOptions.login.toLowerCase())
        );
      }
      if (filterOptions.id) {
        return Number(filterOptions.id) === i.id;
      }
      if (filterOptions.login) {
        return i.login
          .toLowerCase()
          .includes(filterOptions.login.toLowerCase());
      }
      return i;
    });
  };

  return (
    <div className="box content">
      {selectedUsersIsShown ? (
        <div className="listContainer selectedListContainer">
          {filteredUsers(users.data)
            .filter((i) => storedUsers.includes(i.id))
            .map((user) => (
              <Card
                user={user}
                key={user.id}
                selected={true}
                removeUserHandler={removeUserHandler}
              />
            ))}
        </div>
      ) : (
        <div className="listContainer">
          {filteredUsers(users.data).map((user) => (
            <Card
              user={user}
              key={user.id}
              removeUserHandler={removeUserHandler}
            />
          ))}
        </div>
      )}
    </div>
  );
};
export default List;
