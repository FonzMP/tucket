import Home from "../components/shared/home";
import CreateTicket from "../components/ticket/createTicket";
import GetTickets from "../components/ticket/getTickets";

const NAVCONSTANTS = {
  NAV: [
    {
      display: "Home",
      href: "/",
      component: Home
    },
    {
      display: "Create",
      href: "/ticket/new",
      component: CreateTicket
    },
    {
      display: "Tickets",
      href: "/tickets",
      component: GetTickets
    }
  ]
};

export default NAVCONSTANTS;
