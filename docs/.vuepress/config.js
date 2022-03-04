module.exports = {
  base: "/Introduction/",
  title: "Nuno Documents",
  themeConfig: {
    sidebar: {
      "/fontend/": [
        {
          title: "JS",
          collapsable: false,
          children: [
            { title: "vue2", path: "/fontend/vue2" },
            { title: "Mock", path: "/fontend/mock" },
            { title: "vue-router", path: "/fontend/router" },
            { title: "apply-call", path: "/fontend/apply" },
            { title: "file-saver", path: "/fontend/file" },
            { title: "vue-i18n", path: "/fontend/i18n" },
            { title: "Class", path: "/fontend/class" },
            { title: "闭包", path: "/fontend/closure" },
            { title: "&& || 运算符", path: "/fontend/operator" },
            { title: "TS", path: "/fontend/ts" },
            { title: "函数式组件", path: "/fontend/funcComponent" },
            { title: "预编译", path: "/fontend/precompiled" },
            { title: "Function", path: "/fontend/function" },
          ],
        },
        {
          title: "Git",
          collapsable: false,
          children: [
            { title: "git报错系列", path: "/fontend/error" },
            { title: "ssh_key", path: "/fontend/sshkey" }
          ],
        },
        {
          title: "CSS",
          collapsable: false,
          children: [
            { title: "float", path: "/fontend/float" },
            { title: "box", path: "/fontend/box" },
            { title: "position", path: "/fontend/position" },
            { title: "transition", path: "/fontend/transition" },
            { title: "transform", path: "/fontend/transform" },
            { title: "animation", path: "/fontend/animation" }
          ],
        }
      ]
    },
  },
};
