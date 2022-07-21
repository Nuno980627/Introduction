# && || 运算符
通常 ` $$ 和 || ` 在条件判断的时候作为条件运算符使用，除此之外 && || 在变量赋值的时候，可以作为表达式来使用。
那么就演示一下具体用法

## && 与运算

`&& 与运算` 通常可为表达式做断言处理  
     左表达式 && 右表达式  
当左表达式为 `(真值 true)` 时 ,会执行右边的表达式,并且会直接返回 ` 右 `表达式  
当左表达式为 `(假值 false)` 时 ,不会执行右边表达式,会直接返回 ` 左 `表达式,

```javascript
const test={
    a:1
}

 test && test.a  //return -> 1
 test && test.b  //return -> undefined

 false && test.a //return -> false
 0 && test.a //return -> 0

 0&&1 //return -> 0
 1&&2 //return -> 2

```

## || 或表达式

`|| 或表达式` 也可作为条件判断选择式使用，当前表达式为假值为变量赋默认值，与&& 表达式相反  
当 左表达式 为 `真(true)` 时 ,返回左表达式
当 左表达式 为 `假(false)` 时 ,返回右表达式


```javascript
const test={
    a:1
}

 test || {}  //return -> {a:1}
 test2 || {}  //return -> {}

 false || test.a //return -> 1
 0 || test.a //return -> 1

 0||1 //return -> 1
 1||2 //return -> 1

```

