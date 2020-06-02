import { AuthServices } from "./auth.service";

const TicketServices = {
  createTicket,
  getTicket,
  getTickets,
  updateTicket,
  deleteTicket,
};

function getTickets() {
  const token = AuthServices.getToken();
  return fetch("http://localhost:4000/tickets", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  });
}
function createTicket(project, ticket) {
  const token = AuthServices.getToken();
  return fetch(`http://localhost:4000/projects/${project._id}/tickets/new`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify({ ticket }),
  });
}
function getTicket(id) {
  const token = AuthServices.getToken();
  return fetch(`http://localhost:4000/tickets/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  });
}
function updateTicket() {
  const token = AuthServices.getToken();
}
function deleteTicket() {
  const token = AuthServices.getToken();
}

export default TicketServices;
