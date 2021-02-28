import {createRouter, createWebHashHistory} from 'vue-router';
import Layout from "layouts/index.vue";

export const routes = [
    {
      path: "/",
      redirect: "/home",
      component: Layout,
      meta: { title: "导航", icon: "el-icon-s-home" },
      children: [
        {
          path: "home",
          component: () => import("views/home.vue"),
          name: "Home",
          meta: { title: "首页", icon: "el-icon-s-home" },
          children: [
            {
              path: ":id",
              component: () => import("views/detail.vue"),
              name: "Detail",
              hidden: true,
              meta: {
                title: "详情",
                icon: "el-icon-s-home",
                activeMenu: "/home",
              },
            },
          ],
        },
      ],
    },
  
    {
      path: "/users",
      component: Layout,
      meta: {
        title: "用户管理",
        icon: "el-icon-user-solid",
      },
      redirect: '/users/list',
      children: [
        {
          path: "list",
          component: () => import("views/users/list.vue"),
          meta: {
            title: "用户列表",
            icon: "el-icon-document",
          },
        }
      ],
    },
  ];
  
  const router = createRouter({
    history: createWebHashHistory(),
    routes,
  });
  
  export default router;