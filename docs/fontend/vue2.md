# vue2 相关文档

vue2 开始过程中遇到的一些问题解决，以及一些学习思考，包括 vue 全家桶

## Vue.use 和 Vue.Prototype

近期开发中，有了一个疑问，同样是在`main.js`中注册的全局变量/方法,`Vue.use`和`Vue.prototype`有什么区别

#### Vue.prototype

```javascript
 //基础用法
 //定义全局变量
 Vue.prototype.$customConst='XXX'

 使用 console.log(this.$customConst)
 //定义全局方法
 import moment from 'moment'
 Vue.prototype.$moment = moment

 使用 this.$moment().format()
```

vue.prototype 在 main.js 往 vue 实例中定义变量,或将`普通第三方插件/方法`,(不是为 vue 专门所定制的组件方法)，挂载到 vue 实例中,方便全局调用。

#### Vue.use

同样时挂载全局组件/方法,和 Vue.prototype 不同的是,vue 官方提供的 Vue.use()方法,用来引用专门为`Vue定制`的组件。
那么,问题来了,什么是专门为 Vue 定制的组件,根据 Vue 官方文档解释,Vue 为专属定制组件，提供了一个 install 方法

```javascript
MyPlugin.install = function(Vue, options) {};
export default MyPlugin;
```

在 main.js 中使用 Vue.js 注册组件时,Vue 会自动执行一遍 install 方法内的操作,并且 Vue 或默认传入一个参数`Vue构造器`,后面的 options 为自定义函数。
官方建议 Vue.use()在 new vue 之前使用,如果你需要在组件内，做一些生命周期的混入，或者对各种 options 的读取/方法，如果在 new vue()之后 use,当 new vue 实例创建的时候，组件还没被引入，无法发在到 vue 实例中
详细可参考后方 install 组件的文档。

## Vue install 创建组件

在网上看别的有些懵 B，看到一个文档用 vue-router 做示例，好理解一些
[原文档](https://segmentfault.com/a/1190000022802059)
看看 vue-router 再 use 的时候做了什么

```javascript
//定义方法
class Router {
   constructor(options) {
       ...
   }
}
//使用vue的install函数
Router.install = function(Vue) {
//参数1，Vue传入的Vue构造器(实例)
//vue实例中混入神明周期
   Vue.mixin({
       beforeCreate() {
           if (this.$options.router) {
               Vue.prototype.$router = this.$options.router
           }
       }
   })
//也可在内定义全局变量/方法

Vue.prototype.$customConst=''
//或者引入其他组件
}

export default Router;
```

举一反三。。this.\$options.router 是什么玩意儿，

之前我的文档也说到，要在 new Vue 之前使用 use，这里可以做一个更好的理解

Vue-Router 被 use 的时候`beforeCreate()`被混入了 Vue 全局的生命周期函数

```javascript
new Vue({
   router,
   ...
}).$mount('#app');
```

在 new vue 的时候，又传入了整个 router，也有说法是启动 Vue-router，不太好理解启动的含义。然后再 new vue 启动时，调用生命周期函数时，$router已经被初始化到vue实例上了，this.$options.router 自然而然拿到了。
直呼工整，妙啊

## 组件动态切换

```javascript
<component v-bind:is="currentView"></component>

components:{
  //组测相对应组件
  componentA
}
data(){
  return{
      currentView:componentA
  }
}
```
