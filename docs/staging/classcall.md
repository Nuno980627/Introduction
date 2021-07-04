## class 
class作为ES6的function 语法糖，默认带有一个constructor() 构造函数

class student{
    //没有的话会自动默认生成 constructor(){}
    constructor(name,age){
        this.name=name
        this.age=age
    }
    introduce(){
        renturn `name is ${this.name},age is ${this.age}`
    }
}
//new一下class
const instance=new student('nuno',24)
console.log(instance) 
//student{
 name:'nuno',
 age:24   
}
console.log(instance.introduce())
//name is nuno,age is 24
## 关于class的继承
class people extends student{

//子项也需要有constuctor函数，且需在构造函数内调用super(),来调用继承的
//父项中的constructor函数

        constroctor(name,age,hobby){
            super(name,age)
            this.hobby=hobby
        }
}

const action=new prople('nuno',24,'football')
console.log(action)
//输出
people{
    name:'nuno',
    age:24,
    hobby:'football'
}
console.log(action.introduce())
//name is nuno,age is 24

## 关于call、apply的调用方法

使用call、apply改变原函数内部的this指向

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

### 用来继承

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

## bind的区别
都是改变this指向，bind的返回仍是一个函数，不会立即执行该函数。
this.$functionName()=fn.bind(this,1,2)
也可以 fn.bind(this,1,2)()来调用,
而apply和call是立即执行函数。