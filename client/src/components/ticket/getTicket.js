import React, { useState } from "react";
import { Link } from "react-router-dom";

function GetTicket({ project, ticket, updateProject }) {
  const [viewTicket] = useState(ticket);

  return ticket !== undefined ? (
    <Link to={"/projects/" + project._id + "/tickets/" + ticket._id}>
      <div className="project-item-wrap">
        <h1>{viewTicket.title}</h1>
        <p>{viewTicket.description}</p>
      </div>
    </Link>
  ) : (
    <div>Loading....</div>
  );
}

export default GetTicket;
