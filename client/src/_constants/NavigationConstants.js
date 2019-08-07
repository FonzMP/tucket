import Home from "../components/shared/home";
// import TicketHome from '../components/ticket/ticketHome'
import ProjectHome from "../components/project/projectHome";
import GetTickets from '../components/ticket/getTickets'

const NAVCONSTANTS = {
  NAV: [
    {
      display: "Home",
      href: "/",
      component: Home,
      key: "HomeLinks"
    },
    {
      display: "Projects",
      href: "/projects",
      component: ProjectHome,
      key: "ProjectHomeLink"
    }
  ]
};

export default NAVCONSTANTS;
