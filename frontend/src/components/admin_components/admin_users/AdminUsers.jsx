import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import Profile from "@pages/Profile";
import Users from "./Users";
// import UsersInformations from "./UsersInformations";
import ToggleIsAdmin from "./ToggleIsAdmin";

function AdminUsers({ id }) {
  const [users, setUsers] = useState(null);
  const [user, setUser] = useState(null);
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState("all");
  const [userId, setUserId] = useState(null);
  const [refresh, setRefresh] = useState(false);

  const filteredUsers = users?.filter((item) => {
    if (selected === "users")
      return (
        item.email.toLowerCase().includes(query.toLowerCase()) &&
        item.is_admin === 0
      );
    if (selected === "admins")
      return (
        item.email.toLowerCase().includes(query.toLowerCase()) &&
        item.is_admin === 1
      );
    return item.email.toLowerCase().includes(query.toLowerCase());
  });

  function getUsers() {
    axios
      .get(`${import.meta.env.VITE_PORT_BACKEND}/users`)
      .then(async (res) => {
        await setUsers(res.data);
      })
      .catch((err) => console.error(err));
  }

  function getUserById(uId) {
    axios
      .get(`${import.meta.env.VITE_PORT_BACKEND}/users/${uId}`)
      .then(async (res) => {
        await setUser(res.data);
      })
      .catch((err) => console.error(err));
  }

  useEffect(() => {
    getUsers();
  }, [selected, userId]);

  function handleChange(e) {
    setSelected(e.target.value);
  }

  return (
    <div className="admin-users-container">
      <div className="users-admins-choice-container">
        <label className="label-users-admins">
          <input
            className="input"
            type="radio"
            name="choice"
            value="users"
            onChange={(e) => handleChange(e)}
            checked={selected === "users"}
          />
          Users
        </label>
        <label className="label-users-admins">
          <input
            className="input"
            type="radio"
            name="choice"
            value="admins"
            onChange={(e) => handleChange(e)}
            checked={selected === "admins"}
          />
          Admins
        </label>
        <label className="label-users-admins">
          <input
            className="input"
            type="radio"
            name="choice"
            value="all"
            onChange={(e) => handleChange(e)}
            checked={selected === "all"}
          />
          All
        </label>
      </div>
      <input
        className="input-search"
        value={query}
        type="search"
        placeholder="Search useb by Email"
        onChange={(e) => setQuery(e.target.value)}
      />
      <p>User ID : {id}</p>
      <div className="users-table-container">
        <div className="headers">Emails</div>
        <div className="users-table">
          {users &&
            filteredUsers.map((us) => {
              return (
                <Users
                  key={us.id}
                  selected={selected}
                  id={us.id}
                  email={us.email}
                  setUserId={setUserId}
                  refresh={refresh}
                  setRefresh={setRefresh}
                  getUserById={(uid) => getUserById(uid)}
                />
              );
            })}
        </div>
      </div>
      {user && userId && (
        <div className="user-block">
          <ToggleIsAdmin
            id={Number(userId)}
            // isAdmin={user.is_admin}
            refresh={refresh}
            setRefresh={setRefresh}
          />
          <Profile id={Number(userId)} />
          {/* <UsersInformations id={Number(userId)} /> */}
        </div>
      )}
    </div>
  );
}

export default AdminUsers;

AdminUsers.propTypes = {
  id: PropTypes.number.isRequired,
};
