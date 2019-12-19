import Home from "../components/shared/home";
import ProjectRouting from "../components/project/ProjectRouting";

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
      component: ProjectRouting,
      key: "ProjectHomeLink"
    }
  ]
};

export default NAVCONSTANTS;
