import React, { useState } from "react";
import UserService from "../../services/user.service";

function InviteMember({ match }) {
  const [userSearch, setUserSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  function searchMembers() {
    UserService.searchUsers(userSearch.toLowerCase())
      .then(resp => resp.json())
      .then(resp => {
        setSearchResults(resp.users);
      })
      .catch(err => {
        console.log("error getting user with that name", err);
      });
  }

  function renderResults() {
    return searchResults.map(user => {
      return (
        <div key={user._id}>
          <span>{user.username}</span>
          <button onClick={() => addUser(user._id)}>Add</button>
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
      <input type="text" onChange={e => setUserSearch(e.target.value)} />
      <div>
        <button onClick={() => searchMembers()}>Search Users</button>
      </div>
      {searchResults.length > 0 ? renderResults() : null}
    </div>
  );
}

export default InviteMember;
