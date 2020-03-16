/*
 * @Author: amujoe
 * @Date: 2020-03-13 17:26:28
 * @Description: file content
 */
import Layout from "@/views/Layout";
import Login from "@/views/base/login/Login";
import NoPage from "@/views/base/default/NoPage.vue";
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
