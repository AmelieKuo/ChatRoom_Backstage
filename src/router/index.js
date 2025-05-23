import { createRouter, createWebHistory } from "vue-router";
import permission from "./permission";

const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_BASE_URL),
  routes: [
    {
      path: "/",
      name: "defaultLayout",
      component: () => import("@/layout/default.vue"),
      children: [
        {
          path: "",
          name: "index",
          meta: {
            title: "首頁"
          },
          component: () => import("@/views/index.vue"),
        },
        {
          path: "user",
          name: "user",
          meta: {
            title: "會員管理"
          },
          component: () => import("@/views/user.vue"),
        },
        {
          path: "permission",
          name: "permission",
          meta: {
            title: "權限管理"
          },
          children: [
            {
              path: "page",
              name: "permission-page",
              meta: {
                title: "頁面管理"
              },
              component: () => import("@/views/permission/page.vue"),
            },
            {
              path: "element",
              name: "permission-element",
              meta: {
                title: "元件管理"
              },
              component: () => import("@/views/permission/element.vue"),
            },
            {
              path: "role",
              name: "permission-role",
              meta: {
                title: "角色權限"
              },
              component: () => import("@/views/permission/role.vue"),
            },
          ],
        },
        {
          path: "news",
          name: "news",
          meta: {
            title: "最新消息管理"
          },
          component: () => import("@/views/news.vue"),
        },
        {
          path: "setting",
          name: "setting",
          meta: {
            title: "設定"
          },
          component: () => import("@/views/setting.vue"),
        },
      ],
    },
    {
      path: "/login",
      name: "login",
      meta: {
        title: "登入"
      },
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
