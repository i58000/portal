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
      component: Home
    },
    {
      path: "/blog",
      component: () =>
        import(/* webpackChunkName: "blog" */ "./views/blog/index.vue"),
      meta: {
        label: "博客"
      },
      children: [
        {
          name: "blogList",
          path: "",
          component: () =>
            import(/* webpackChunkName: "blog" */ "./views/blog/BlogList.vue"),
          meta: {
            visibleCarousel: true
          }
        },
        {
          name: "blogArticle",
          path: "article/:id",
          props: true,
          component: () =>
            import(
              /* webpackChunkName: "blog" */ "./views/blog/BlogArticle.vue"
            ),
          meta: {}
        }
      ]
    },
    // {
    //   path: "/note",
    //   name: "note",
    //   component: () =>
    //     import(/* webpackChunkName: "note" */ "./views/About.vue"),
    //   meta: {
    //     label: "笔记"
    //   }
    // },
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
      // component: () =>
      //   import(/* webpackChunkName: "lab" */ "./views/lab/index.vue"),
      meta: {
        label: "Lab"
      },
      children: [
        {
          path: "opensource-components",
          meta: {
            label: "开源组件",
            href: "/opensource-components.html"
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
