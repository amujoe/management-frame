/*
 * @Author: amujoe
 * @Date: 2020-03-13 17:26:28
 * @Description: file content
 */
import Layout from "@/views/Layout";
import Login from "@/views/base/login/Login";
import NoPage from "@/views/base/default/NoPage.vue";
import Collect from "./Collect.js"

let routes = [
  {
    path: "/myapp",
    component: Layout,
    children: [...Collect]
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

console.log("main-routes", routes)

export default routes;
