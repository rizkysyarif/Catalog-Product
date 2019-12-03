import Index from "views/Index.jsx";
import Manage from "views/Manage.jsx";

var routes = [
  
  {
    path: "/index",
    name: "Dashboard",
    icon: "ni ni-tv-2 text-primary",
    component: Index,
    layout: "/admin"
  },
  {
    path: "/manage",
    name: "Manage Product",
    icon: "ni ni-bullet-list-67 text-red",
    component: Manage,
    layout: "/admin"
  }
];


export default routes;
