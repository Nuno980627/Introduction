module.exports = {
  base: "/Introduction/",
  title: "Nuno Documents",
  themeConfig: {
    sidebar: {
      "/fontend/": [
        {
          title: "FontEnd",
          collapsable: false,
          children: [
            { title: "vue2", path: "/fontend/vue2" },
            { title: "Mock", path: "/fontend/mock" },
            { title: "vue-router", path: "/fontend/router" },
            { title: "apply-call", path: "/fontend/apply" },
            { title: "file-saver", path: "/fontend/file" },
            { title: "vue-i18n", path: "/fontend/i18n" },
          ],
        },
        {
          title: "git",
          collapsable: false,
          children: [
            { title: "git报错系列", path: "/fontend/error" },
            { title: "ssh_key", path: "/fontend/sshkey" }
          ],
        },
      ]
    },
  },
};
