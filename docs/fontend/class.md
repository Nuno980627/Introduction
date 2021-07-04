# js 中的 class 
## 基础用法
class作为ES6的function 语法糖，默认带有一个constructor() 构造函数
```javascript

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
```
## class的继承
```javascript
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
```
