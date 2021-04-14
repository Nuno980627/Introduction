module.exports = {
  base: "/Introduction/",
  title: "Nuno Documents",
  themeConfig: {
    sidebar: {
      "/fontend/": [
        {
          title: "FontEnd",
          collapsable: false,
          children: [{ title: "vue2", path: "/fontend/vue2" },{ title: "Mock", path: "/fontend/mock" },{ title: "vue-router", path: "/fontend/router" }],
        },
        {
          title: "git",
          collapsable: false,
          children: [{ title: "git报错系列", path: "/fontend/error" }],
        },
      ]
    },
  },
};
