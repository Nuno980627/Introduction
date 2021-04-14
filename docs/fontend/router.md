# Vue Router

## component
路由表父级路由只想用来分组，且没有套嵌，实际显示children中的页面
这时候父级的component需要有一个 指向
```javascript
 component: {render: (e) => e("router-view")},
示例
 {
    path: '/home',
    component: {render: (e) => e("router-view")},
    children: [
      {
        path: '',
        name: 'home',
        component: () => import('../views/home/home.vue'),
      },
      {
        path: 'sub',
        name: 'homeSub',
        component: () => import('../views/home/subpage.vue')
      }
    ]
  },
  ```