/*
 * @Author: amujoe
 * @Date: 2020-03-13 17:26:28
 * @Description: file content
 */
import NoPage from "@/views/base/default/NoPage.vue";

export default [
  {
    path: "/error",
    name: "error",
    component: NoPage
  },
  {
    path: "/",
    redirect: { name: "login" }
  }
];
