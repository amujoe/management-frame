import PersonList from "@/views/personnel/person/PersonList.vue";

export default [
  {
    path: "/personnel/personList",
    name: "personList",
    component: PersonList
  },
  {
    path: "/",
    redirect: { name: "personList" }
  }
];
