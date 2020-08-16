import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
      meta: {
        label: "首页"
      }
    },
    {
      path: "/note",
      name: "note",
      component: () =>
        import(/* webpackChunkName: "note" */ "./views/About.vue"),
      meta: {
        label: "笔记"
      }
    },
    {
      path: "/chat",
      name: "chat",
      component: () =>
        import(/* webpackChunkName: "chat" */ "./views/chat/index.vue"),
      meta: {
        label: "聊天"
      }
    },
    {
      path: "/lab",
      name: "lab",
      component: () =>
        import(/* webpackChunkName: "lab" */ "./views/About.vue"),
      meta: {
        label: "实验室"
      },
      children: [
        {
          path: "vue-treecharts",
          component: () =>
            import(/* webpackChunkName: "lab" */ "./views/About.vue"),
          meta: {
            label: "vue-treecharts"
          }
        },
        {
          path: "vue-v-contextmenu",
          component: () =>
            import(/* webpackChunkName: "lab" */ "./views/About.vue"),
          meta: {
            label: "vue-v-contextmenu"
          }
        }
      ]
    },
    {
      path: "/about",
      name: "about",
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/About.vue"),
      meta: {
        label: "关于"
      }
    }
  ]
});
