import Home from "../components/shared/home";
import TicketHome from '../components/ticket/ticketHome'
import CreateTicket from "../components/ticket/createTicket";
import GetTickets from "../components/ticket/getTickets";

const NAVCONSTANTS = {
  NAV: [
    {
      display: "Home",
      href: "/",
      component: Home,
      key: "HomeLinks"
    },
    {
      display: "Tickets",
      href: "/tickets",
      component: TicketHome,
      key: "TicketLinks",
    },
    {
      display: "Create",
      href: "/tickets/new",
      component: CreateTicket,
      key: "CreateTicketLink"
    },
    {
      display: "All Tickets",
      href: "/tickets/all",
      component: GetTickets,
      key: "GetTicketLink"
    }
  ]
};

export default NAVCONSTANTS;
