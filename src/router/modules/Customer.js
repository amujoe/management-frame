import CustomerList from "@/views/customer/CustomerList.vue";

export default [
  {
    path: "/customerList",
    name: "customerList",
    component: CustomerList
  },
  {
    path: "/",
    redirect: {
      name: "customerList"
    }
  }
];
