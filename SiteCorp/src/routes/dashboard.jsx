import Dashboard from "../views/Dashboard/Dashboard";
import UserProfile from "../views/UserProfile/UserProfile";
import Security from "../views/Security/security";
import Calendar from "../views/Calendar/Calendar";
import Loading from "../components/Loaders/loaderDog";
// import TableList from "views/TableList/TableList";
// import Typography from "views/Typography/Typography";
// import Icons from "views/Icons/Icons";
// import Maps from "views/Maps/Maps";
// import Notifications from "views/Notifications/Notifications";

const dashboardRoutes = [
  { path: "/dashboard", name: "Dashboard", icon: "far fa-chart-bar", component: Dashboard, code:"DASH" },
  { path: "/config", name: "configuración", icon: "fas fa-cogs", component: Loading, code:"CONFIG"  },
  { path: "/security", name: "Seguridad", icon: "fas fa-lock", component: Security, code:"SECUR"  },
  { path: "/user", name: "Perfil de Usuario", icon: "far fa-user-circle", component: UserProfile, code:"PROFI" },
  { path: "/calendar", name: "Calendario", icon: "far fa-calendar-alt", component: Calendar, code:"CALEND" },
  // { path: "/table", name: "Table List", icon: "pe-7s-note2", component: TableList },
  // { path: "/typography", name: "Typography", icon: "pe-7s-news-paper", component: Typography },
  // { path: "/icons", name: "Icons", icon: "pe-7s-science", component: Icons },
  // { path: "/maps", name: "Maps", icon: "pe-7s-map-marker", component: Maps },
  // { path: "/notifications", name: "Notifications", icon: "pe-7s-bell", component: Notifications },
  
  { redirect: true, path: "/", to: "/dashboard", name: "Dashboard" }
  

];

export default dashboardRoutes;
