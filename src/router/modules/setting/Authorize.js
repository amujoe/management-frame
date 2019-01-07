import Authorize from "@/views/setting/authorize/Authorize.vue";

export default [
  {
    path: "/setting/authorize",
    name: "authorize",
    component: Authorize
  },
  {
    path: "/",
    redirect: { name: "authorize" }
  }
];
