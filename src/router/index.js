import { createRouter, createWebHistory } from "vue-router";
import ShitheadLogin from "@/components/auth/Login";
import ShitheadSignup from "@/components/auth/Signup";
import ShitheadHome from "@/components/content/Home"

const routes = [
  {
    path: "/",
    name: "home",
    component: ShitheadHome
  },
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
