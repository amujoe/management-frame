/*
 * @Author: amujoe
 * @Date: 2020-03-13 17:26:28
 * @Description: file content
 */
import Home from "@/views/app/home/Home.vue";

export default [
  {
    path: "/home",
    name: "home",
    component: Home
  },
  {
    path: "/",
    redirect: { name: "home" }
  }
];
