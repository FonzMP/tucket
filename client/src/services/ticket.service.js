export const ticketServices = {
  createTicket,
  getTicket,
  getTickets,
  updateTicket,
  deleteTicket
};

function getTickets() {
  return fetch("http://localhost:4000/tickets")
    .then(response => response.json())
    .then(response => response)
    .catch(err => console.log("error on getTickets"));
}
function createTicket() {}
function getTicket() {}
function updateTicket() {}
function deleteTicket() {}