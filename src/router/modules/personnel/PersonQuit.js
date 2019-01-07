import PersonQuitList from "@/views/personnel/personQuit/PersonQuitList.vue";

export default [
  {
    path: "/personnel/personQuitList",
    name: "personQuitList",
    component: PersonQuitList
  },
  {
    path: "/",
    redirect: { name: "personQuitList" }
  }
];
