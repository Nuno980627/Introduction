# animation
CSS3动画

## @keyframes 规则
```javascript
@keyframes example {
  from {background-color: red;}
  to {background-color: yellow;}
}

@keyframes example {
  0% {background-color: red;}
  100% {background-color: yellow;}
}

from和to等价与0% 100%，百分比可使用更多进度的关键帧

//样式的使用
div {
  width: 100px;
  height: 100px;
  background-color: red;
  animation-name: example;
  animation-duration: 4s;
}


```

## 简写规则

```javascript
animation: name duration timing-function delay iteration-count direction;
//同事使用多个动画
//使用逗号间隔
animation: name duration timing-function delay iteration-count direction,name duration ;
```