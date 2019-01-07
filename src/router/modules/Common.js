import NoPage from "@/views/default/NoPage.vue";

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
