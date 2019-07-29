import Home from "../components/shared/home";
import CreateTicket from "../components/ticket/CreateTicket";

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
    }
  ]
};

export default NAVCONSTANTS;
