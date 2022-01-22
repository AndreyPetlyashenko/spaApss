import "./App.css";
import Footer from "./components/Footer";
import Header from "./components/Header";
import SideBar from "./components/SideBar";
import { useEffect, useState } from "react";
import { UserContext } from "./components/ListOfUSers/UserContext";
import List from "./components/ListOfUSers/List";

function App() {
  const [users, setUsers] = useState({ data: [], selectedUsers: [] });

  const [selectedUsersIsShown, setSelectedUsersIsShown] = useState(false);

  const [filterOptions, setFilterOptions] = useState({ id: ``, login: `` });

  useEffect(() => {
    const getUsers = async (url) => {
      const response = await fetch(url);
      const data = await response.json();
      const usersArr = await data;
      setUsers({ data: usersArr, selectedUsers: [] });
    };

    getUsers("https://api.github.com/users");
  }, []);

  return (
    <div className="wrapper">
      <UserContext.Provider value={[users, setUsers]}>
        <Header
          filterOptions={filterOptions}
          setFilterOptions={setFilterOptions}
        />
        <SideBar
          selectedUsersIsShown={selectedUsersIsShown}
          setSelectedUsersIsShown={setSelectedUsersIsShown}
        />
        <List
          selectedUsersIsShown={selectedUsersIsShown}
          filterOptions={filterOptions}
        />
        <Footer />
      </UserContext.Provider>
    </div>
  );
}

export default App;
