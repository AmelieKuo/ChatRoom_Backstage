import { createRouter, createWebHistory } from "vue-router";
import permission from "./permission";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "defaultLayout",
      component: () => import("@/layout/default.vue"),
      children: [
        {
          path: "",
          name: "index",
          component: () => import("@/views/index.vue"),
        },
        {
          path: "user",
          name: "user",
          component: () => import("@/views/user.vue"),
        },
        {
          path: "permission",
          name: "permission",
          children: [
            {
              path: "page",
              name: "permission-page",
              component: () => import("@/views/permission/page.vue"),
            },
            {
              path: "element",
              name: "permission-element",
              component: () => import("@/views/permission/element.vue"),
            },
          ],
        },
        {
          path: "news",
          name: "news",
          component: () => import("@/views/news.vue"),
          // meta: { requiresAuth: true },
        },
        {
          path: "settings",
          name: "settings",
          component: () => import("@/views/user.vue"),
        },
      ],
    },
    {
      path: "/login",
      name: "login",
      component: () => import("@/views/login.vue"),
    },
    /**
     * 當 url path 不符合 router 表的時候，預設轉址到
     * 順序一定要最後面
     * 拔掉 demo 頁
     */
    {
      path: "/404",
      name: "NotFound",
      component: () => import("@/views/notFound.vue"),
    },
    {
      path: "/:catchAll(.*)",
      redirect: "/404",
    },
  ],
  scrollBehavior() {
    return { top: 0 };
  },
});

permission(router);

export default router;
