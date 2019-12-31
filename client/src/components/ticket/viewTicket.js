import React, { useState, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import ProjectServices from "../../services/project.service";
import AlertModal from "../shared/alertModal";

function ViewTicket({ match }) {
  const [ticket, setTicket] = useState({ title: "", description: "" });
  const [confirm, setConfirm] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [redirect, setRedirect] = useState(false);
  useEffect(() => {
    console.log("match url ", match.url);
    ProjectServices.getTicket(match.params.projectId, match.params.ticketId)
      .then(resp => resp.json())
      .then(response => setTicket(response.ticket))
      .catch(err => console.log("error getting ticket ", err));
  }, []);

  function deleteTicket() {
    if (confirm) {
      ProjectServices.deleteTicket(match.params.projectId, ticket._id)
        .then(resp => resp.json())
        .then(response => setRedirect(true))
        .catch(err => console.log("error deleting ticket"));
    } else {
      setShowModal(true);
      setConfirm(true);
    }
  }

  function cancelAndReset() {
    setShowModal(false);
    setConfirm(false);
  }

  return (
    <div>
      {showModal ? (
        <AlertModal
          message={"Delete this ticket?"}
          confirm={() => deleteTicket()}
          cancelAlert={() => cancelAndReset()}
        />
      ) : null}
      {redirect ? (
        <Redirect to={`/projects/${match.params.projectId}`} />
      ) : null}
      <div className="projectButtonWrap">
        <span>Ticket: {ticket.title}</span>
        <span>
          <Link className="mock-button" to={`${match.url}/edit`}>
            Edit
          </Link>
          <span className="mock-button" onClick={() => deleteTicket()}>
            Delete
          </span>
        </span>
      </div>

      <p>Description: </p>
      <p>{ticket.description}</p>
    </div>
  );
}

export default ViewTicket;
