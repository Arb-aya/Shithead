import { createRouter, createWebHistory } from "vue-router";
import ShitheadLogin from "@/components/auth/Login";
import ShitheadSignup from "@/components/auth/Signup";

const routes = [
  {
    path: "/login",
    name: "login",
    component: ShitheadLogin,
  },
  {
    path: "/signup",
    name: "signup",
    component: ShitheadSignup,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
