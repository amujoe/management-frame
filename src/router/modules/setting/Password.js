import Password from "@/views/app/setting/password/Password.vue";

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
