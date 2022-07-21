# Function
关于function 函数的一些内容

## function 普通执行和new的区别
一直以为在function方法这个关键字new不new都无所谓，一般在class的时候必须new ,function普通 执行和new执行没什么区别,
最近写原型的方法才得知区别。
### this指向的区别

```javascript

function test(){
    this.name=1
    this.set=function(){
        console.log(123)
    }
}
const test1=test() //此时this的指向是window属性
所以此时执行
console.log(window.name) =>1
windos.set() => 123

//当 new 时
const test2=new test() //此时this指向test返回的内部构造对象

相当于
test.prototype={
    a:1
}
function test(){
    //影式操作
    const this={
        __proto__:test.prototyp
    }
    this.name=1
    this.set=function(){
        console.log(123)
    }
    //影式返回
    return this
}
想要调用内部属性
需要  

test2.name
test2.set()  

此时再去调用window中的name或者set会undefined

```

### return 返回的区别
```javascript
同样的方法
function test(){
    var student='tom'
    this.name=1
    this.set=function(){
        console.log(123)
    }
    function ppp(){

    }
    return student
}
当 const test1=test() 时

方法的return写什么，就返回什么，上方代码就会返回 => 'tom'
当不写return的时候 就会返回undefined 
当然在没有return的情况下,方法外部也无法访问到方法内部属性,如ppp(),其他的this的属性可以在window上上文，ppp（需使用闭包访问）


当 const test2=new test() 时

return的属性为原始值时，比如上方代码返回的是1,number属于原始值  
函数默认会返回this，也就是函数自动生成的构造对象

当return的属性是引用值时，object，array，function。
return中写什么，函数最终就会返回什么
如: 
function test(){
    var student='tom'
    this.name=1
    this.set=function(){
        console.log(123)
    }
    function ppp(){

    }
    return {teacher:"tommy"}
}
最终就会返回  {teacher:"tommy"}

```