# TS 相关

汇总TS相关笔记

## ! 非空断言符
在interface 定义时,可能某些变量会被定义为?类型或者，直接定义 NULL undefined ,在链式调用表达式时，在遇到可能为 NULL undefined值时，会报错，所以需要用到 ！非空断言符，来忽略  NULL undefined 的存在  
但是注意，不要滥用！

```javascript
function myFunc(maybeString: string | undefined | null) {
  // Type 'string | null | undefined' is not assignable to type 'string'.
  // Type 'undefined' is not assignable to type 'string'. 
  const onlyString: string = maybeString; // Error
  const ignoreUndefinedAndNull: string = maybeString!; // Ok
}

```

## ？表达式
当使用 A对象时 ，我们通常会通过A.B的方式来取值，但是当A为null时，那么就会报错，如果使用A?.B,来做短路处理，当A遇到null或者 undefined时，直接不在进行后续操作，且不会报错

```javascript
interface IDemo {
    x: number
}

let y:number

const demo = (parma?: IDemo) => {
    y = parma?.x!
    console.log(parma?.x)   // 只是单纯调用属性时就无需!    
    return y
}
```
