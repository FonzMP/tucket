import Home from "../components/shared/home";
// import TicketHome from '../components/ticket/ticketHome'
import ProjectHome from "../components/project/projectHome";

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
