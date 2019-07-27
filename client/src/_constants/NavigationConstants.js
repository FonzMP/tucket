import Home from "../shared/home";
import CreateTicket from "../ticket/CreateTicket";

const NAVCONSTANTS = {
  NAV: [
    {
      display: "Home",
      href: "/",
      component: Home
    },
    {
      display: "Create",
      href: "/createTicket",
      component: CreateTicket
    }
  ]
};

export default NAVCONSTANTS;
