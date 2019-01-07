import OrganizeList from "@/views/personnel/organize/OrganizeList.vue";

export default [
  {
    path: "/personnel/organizeList",
    name: "organizeList",
    component: OrganizeList
  },
  {
    path: "/",
    redirect: { name: "organizeList" }
  }
];
