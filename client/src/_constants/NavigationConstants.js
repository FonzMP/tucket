import Home from "../components/shared/home";
// import TicketHome from '../components/ticket/ticketHome'
import CreateTicket from "../components/ticket/createTicket";
import GetTicket from "../components/ticket/getTicket";
import GetTickets from "../components/ticket/getTickets";
import CreateProject from "../components/project/createProject";
import GetProjects from "../components/project/getProjects";
import ProjectHome from "../components/project/projectHome";

const NAVCONSTANTS = {
  NAV: [
    {
      display: "Home",
      href: "/",
      component: Home,
      key: "HomeLinks"
    },
    // {
    //   display: "Tickets",
    //   href: "/tickets",
    //   component: TicketHome,
    //   key: "TicketLinks",
    // },
    {
      display: "Projects",
      href: "/projects/home",
      component: ProjectHome,
      key: "ProjectHomeLink"
    },
    // {
    //   display: "Create Project",
    //   href: "/projects/new",
    //   component: CreateProject,
    //   key: "CreateProjectLink"
    // },
    // {
    //   display: "Get Projects",
    //   href: "/projects/all",
    //   component: GetProjects,
    //   key: "GetProjectsLink"
    // },
    {
      display: "Tickets",
      href: "/tickets",
      component: GetTickets,
      key: "GetTicketsLink"
    }
    // {
    //   display: "Create",
    //   href: "/tickets/new",
    //   component: CreateTicket,
    //   key: "CreateTicketLink"
    // },
    // {
    //   display: null,
    //   href: "/tickets/:id",
    //   component: GetTicket,
    //   key: "GetTicketLink"
    // }
  ]
};

export default NAVCONSTANTS;
