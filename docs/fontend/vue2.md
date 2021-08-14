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
MyPlugin.install = function(Vue, options) {}
export default MyPlugin
```

在 main.js 中使用 Vue.js 注册组件时,Vue 会自动执行一遍 install 方法内的操作,并且 Vue 或默认传入一个参数`Vue构造器`,后面的 options 为自定义函数。
官方建议 Vue.use()在 new vue 之前使用,如果你需要在组件内，做一些生命周期的混入，或者对各种 options 的读取/方法，如果在 new vue()之后 use,当 new vue 实例创建的时候，组件还没被引入，无法挂载到 vue 实例中
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

## nexttick

重所周知 vue 的 dom 渲染是虚拟 DOM(Virtual Dom)
虚拟 DOM 有很多的好处，但是 vue 的 dom 渲染还有一个特点。
当对 dom 进行操作时，为了避免多次的 dom 渲染，造成不必要的性能消耗，vue 的 dom 会进行周期性的渲染。
这也会有一定的副作用，当 js 操作 dom 时，可能该组件还没有被页面渲染，导致无法获取最新的 dom 树

所以 vue 官方也给了一个 api，Vue.nexttick。  
`官方定义`：在下次 DOM 更新循环结束之后执行延迟回调。在修改数据之后立即使用这个方法，获取更新后的 DOM。

```javascript
<ul ref="list">
<li v-for="item in list">{{item}}</li>
<ul/>
<button @click="addDOM"></button>


<script>
data(){
    return{
        list:[1,2,3]
    }
}
addDOM(){
    this.list.push(4)
    this.list.push(5)
    this.list.push(6)
    console.log(this.$refs.list.length)
    //此处按理来说，往list数组中添加了3个元素,通过v-for渲染，页面上也会出现新的3个li
    //所以理应this.$refs.list.length=6,但事实上，此时只会输出3
    //因为vue的dom渲染为周期化渲染，当执行console.log时，页面的dom渲染还没有完成。

    所以此时该用到this.$nexttick api
    会将回调函数，延迟到DOM渲染完后去执行
    this.$nexttick(()=>{
      console.log(this.$refs.list.length)
    })

    此时，console.log()会输出正确答案6



}
</script>
```

## Vue.extend

动态注册组件

### 通过 Vue.extend 实现用 js API 的方式调用组件

像 this.$toast this.$message 这样，通过 vue 实例上的全局方法，调用 vue 的组件，这时，我们就可以用上 vue.extend
来动态注册实例

以 toast 组件为例

```javascript
import Vue from 'vue' //导入vue
import toast from './toast.vue' //导入.vue文件

const instance = Vue.extend(toast) //使用vue.extend生成组件构造器，可以向new vue一样，new一个

function newToast(text, duration) {
    //生成实例
  const newDom = new instance({
    el: document.createElement('div'), //也可以不要el属性，用$mount()挂载
    data() {
      return {
        text: text,
        show: true,
      }
    },
  })
  //插入到body的最后面
  document.body.appendChild(newDom.$el)
  settimeout(() => {
    newDom.show = false
  }, 2000)
}

function insertVue(){
    vue.prototype.$toast=newToast()
}
//因为使用vue.use,可用文档之前讲过的vue.install来代替该方案
export default insertVue

最后在vue的main.js中引入该文件，使用Vue.use初始化
```

## Vue 自定义指令

例如 v-loading

### 注册指令

```javascript
import loading from './loading.js'
Vue.directive('loading', loading)
```

### 指令实例

```javascript
import vue from 'vue'
import loading from './loading.vue'
//这里应该是一个对象
const customDirective = {
  inserted: function(el, binding) {
      //inserted生命周期,binding内容可搜索vue自定义指令
      const newLoading=Vue.extend(loading)
      const instance=newLoading().$mount() //得到$el dom内容
      //在el中保存我们的loading的dom方便使用,也可以存个全局变量
      el.instance=instance.$el
      //可以通过binding获得绑定的value，binding。value
    
  },
  update(el, binding){
//update生命周期，当值改变时调用
   binding.value?append(el):remove(el)
  }
  function append(el){
      el.appendChild( el.instance)
  }
  function remove(el){
      el.removeChild( el.instance)
  }
}
export default customDirective
```
自定义指令完成