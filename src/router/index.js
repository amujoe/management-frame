import Layout from "@/views/Layout";
import Login from "@/views/Login";
import NoPage from "@/views/default/NoPage.vue";
import Common from "./modules/Common";
import Home from "./modules/Home";
import Mall from "./modules/Mall";
import Setting from "./modules/Setting";

let routes = [
  {
    path: "/common",
    component: Layout,
    children: [...Common, ...Home, ...Mall, ...Setting]
  },
  {
    path: "/login",
    name: "login",
    component: Login
  },
  {
    path: "/error",
    name: "error",
    component: NoPage
  },
  {
    path: "/",
    redirect: {
      name: "login"
    }
  },
  {
    path: "*",
    redirect: {
      name: "error"
    }
  }
];
export default routes;
