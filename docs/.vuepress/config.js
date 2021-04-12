module.exports = {
  base: "/Introduction/",
  title: "Nuno Documents",
  themeConfig: {
    sidebar: {
     
      "/fontend/": [
        {
          title: "FontEnd",
          collapsable: false,
          children: [{ title: "Mock", path: "/fontend/mock" }],
        },
      ],
    },
  },
};
