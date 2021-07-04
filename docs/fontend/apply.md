# apply() 和call()
昨天在阅读vue.use源码时,对apply()和call()产生了疑问,学习一下，并结合vue.use源码理解。

## 解释
`apply()`和`call()`,都是为了改变方法内部this指向，那差在哪呢,

```javascript
apply(function,[param1,param2])

call(function,param1,param2)
```
比较直观的可以看出，apple和call的差别就在于参数,apply可以传入一个数组，apply内部会帮你拆分数组，传入参数,
call的参数需要拆分开来一一对应传入。

## 示例

前面说到apply和call都是为了改变方法this指向,说起来比较抽象。
写两个方法示例，会好理解一些。

```javascript
function add(a,b){
    return this.a+this.b
}

function sub(a,b){
    return this.a-this.b
}

add.apply(sub,[8,4]) //得12 add替换了sub内部方法指向

sub.apply(add,[8,4]) //得12
```

## vue.use源码

```javascript

// 这里的plugin参数就是，就是我们通过Vue.use(uView)引入的"uView"
Vue.use = function (plugin: Function | Object) {
    
	// ......

	const args = toArray(arguments, 1)	// arguments为参数
	// 把this实例放入args的参数第一位
	args.unshift(this)
     //判断是plugin是obj还是function
    if (typeof plugin.install === 'function') {
    //plugin.install的方法替换plugin指向(实则直接调用plugin.install)，传入参数args
      plugin.install.apply(plugin, args)
    } else if (typeof plugin === 'function') {
        //如果是函数，直接调用
      plugin.apply(null, args)
    }
	
	// ......
}
```
## 用来调用方法

使用call、apply调用方法，并改变原函数内部的this指向
```javascript
const obj={
    name:'nuno',
    age:24
}

function student (a,b){
    console.log(this)
    console.log(a+b)
}
student.call(obj,1,2)
console=> {
   name:'nuno',
    age:24
} , 3
//call方法将student的内部this指向obj，student函数内部的this即为obj对象
```
## 用来继承
call、apply用来调用方法并实现继承
```javascript
function father(a,b,c){
    this.a=a
    this.b=b
    this.c=c
}
function son(){
    father.call(this,1,2,3)
}
console.log(new son())=> son{
     a=1,
     b:2,
     c:3
 }
 ```
 ## bind的区别
都是改变this指向，bind的返回仍是一个函数，不会立即执行该函数。
```javascript
this.$functionName()=fn.bind(this,1,2)
也可以 fn.bind(this,1,2)()来调用,
```
而apply和call是立即执行函数。