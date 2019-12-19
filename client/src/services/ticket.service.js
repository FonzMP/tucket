const TicketServices = {
  createTicket,
  getTicket,
  getTickets,
  updateTicket,
  deleteTicket
};

function getTickets() {
  return fetch("http://localhost:4000/tickets");
}
function createTicket(project, ticket) {
  return fetch("http://localhost:4000/tickets/new", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ project, ticket })
  });
}
function getTicket(id) {
  return fetch(`http://localhost:4000/tickets/${id}`);
}
function updateTicket() {}
function deleteTicket() {}

export default TicketServices;
