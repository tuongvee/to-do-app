import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import HomeView from "../views/HomeView.vue";
import SigninView from "../views/SigninView.vue";
import SignupView from "../views/SignupView.vue";
import UserView from "../views/UserView.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: HomeView,
    meta: { title: "Dashboard - Todo List" },
  },
  {
    path: "/signin",
    name: "signin",
    component: SigninView,
    meta: { title: "Sign In - Todo List" },
  },
  {
    path: "/signup",
    name: "signup",
    component: SignupView,
    meta: { title: "Sign Up - Todo List" },
  },
  {
    path: "/user",
    name: "user",
    component: UserView,
    meta: { title: "User - Todo List" },
  },
  // {
  //   path: "/about",
  //   name: "about",
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () =>
  //     import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  // },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title}`;
  const publicPages = ["/signin", "/signup"];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem("accessToken");
  if (authRequired && !loggedIn) {
    return next("/signin");
  }
  next();
});
export default router;
