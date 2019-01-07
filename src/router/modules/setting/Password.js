import Password from "@/views/setting/password/Password.vue";

export default [
  {
    path: "/setting/password",
    name: "password",
    component: Password
  },
  {
    path: "/",
    redirect: { name: "password" }
  }
];
