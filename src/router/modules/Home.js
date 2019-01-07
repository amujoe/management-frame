import Home from "@/views/home/Home.vue";

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
