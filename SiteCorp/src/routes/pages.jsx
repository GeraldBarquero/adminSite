import LoginPage from '../views/Pages/LoginPage.jsx';
import RegisterPage from '../views/Pages/RegisterPage.jsx';
import Dashboard from "../layouts/Dashboard/Dashboard.jsx";
import LockScreenPage from 'views/Pages/LockScreenPage.jsx';

var pagesRoutes = [
    { path: "/", name: "Login Page", mini: "LP", component: LoginPage },
    { path: "/login", name: "Login Page", mini: "LP", component: LoginPage },
    { path: "/register", name: "Register", mini: "RP", component: RegisterPage },
    { path: "/dashboard", name: "Dashboard", icon: "pe-7s-graph", component: Dashboard },
    { path: "/lock", name: "Lock", icon: "pe-7s-graph", component: LockScreenPage }
];

export default pagesRoutes;
