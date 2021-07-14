# 闭包

读取 ,其他`作用域`内的变量，通过闭包

## demo

写两个 demo 简单理解下闭包的应用

```javascript
function test() {
  var a = 1
  return function() {
    console.log('a:' + a)
  }
}
var doTest=test()
// 此时的doTest其实就是test内返回的这个匿名函数
var a=2
doTest()

console=> a:1
输出为 1,输出内容不会收到外部这个全局变量a=2的影响
```

```javascript
function test() {
  var a = 0
  return function() {
    console.log(a++)
  }
}
var doTest=test()
// 此时的doTest其实就是test内返回的这个匿名函数
var a=3
doTest() console=> 1
doTest() console=> 2

```

```javascript
function test(fn) {
  var a = 0
  fn()
}
// 此时的doTest其实就是test内返回的这个匿名函数
var a=3
function fn(){
    console.log(a)
}
doTest() console=> 3

最终输出3，作用域在定义的时候已经确定，定义fn方法使，能取到作用域的a=3
```
