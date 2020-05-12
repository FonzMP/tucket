import React, { useState, useEffect } from "react";
import UserService from "../../services/user.service";

function InviteMember({ match }) {
  const [userSearch, setUserSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [errorDisplay, setErrorDisplay] = useState("");
  let interval;
  useEffect(() => {
    const timer = setTimeout(() => search(), 500);
    return () => clearTimeout(timer);
  }, [userSearch]);

  function search() {
    setErrorDisplay("");
    if (userSearch.length === 0) {
      setSearchResults([]);
      return;
    }
    setSearchResults([]);
    UserService.searchUsers(userSearch.toLowerCase())
      .then(resp => resp.json())
      .then(resp => {
        if (resp.users.length === 0) {
          setErrorDisplay("No users found");
        }
        setSearchResults(resp.users);
        clearInterval(interval);
      })
      .catch(err => {
        console.log("error getting user with that name", err);
        clearInterval(interval);
      });
  }

  function renderResults() {
    return searchResults.map(user => {
      return (
        <div key={user._id} className="project-item-wrap">
          <span className="projectButtonWrap">
            <span>{user.username}</span>
            <button onClick={() => addUser(user._id)}>Add</button>
          </span>
        </div>
      );
    });
  }

  function addUser(userId) {
    let projectId = match.params.projectId;
    UserService.inviteUserToProject(projectId, userId)
      .then(resp => resp.json())
      .then(response =>
        console.log("successfully added user to the project ", response)
      )
      .catch(err =>
        console.log(
          "error adding user to project " + projectId + "with id " + userId
        )
      );
  }
  return (
    <div>
      <h1>Invite Member</h1>
      <label htmlFor="username">Username</label>
      <input
        type="text"
        onChange={e => {
          setUserSearch(e.target.value);
        }}
      />
      {/* <div>
        <button onChange={() => searchMembers()}>Search Users</button>
      </div> */}
      {searchResults.length > 0 ? (
        <div className="invite-results-block">{renderResults()}</div>
      ) : null}
      {errorDisplay ? <div>{errorDisplay}</div> : null}
    </div>
  );
}

export default InviteMember;
