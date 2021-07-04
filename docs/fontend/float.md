# 浮动

some basic knowledge about box and float

## float 特性

- float 会脱标而行内块状元素不会脱标
- float 可以更灵活的控制浮动位置（靠左还是靠右）
- float 可以避免行内块状元素之间的空隙 （去空格化）
- 使用脱标的元素，不会遮挡文字（可参考 float 的初衷）
- 一个浮动元素会紧跟上一个浮动元素（相同 left or right）
- 浮动元素会影响下方的标准流上升

## 清除浮动

为了更好的布局，浮动元素一般会有父容器，由于浮动会使元素脱离标准流，况且往往无法确认浮动元素的内容多少，所以，父容器无法给予一个固定的 height,会使下方标准流上升，所以需要用到清除浮动。

- 额外元素法（w3c 推荐，但写法累赘）:
  在浮动元素后使用一个空元素 ,并在元素中添加 class{clear: both;}

- 使用 CSS 的 overflow 属性
  给浮动元素的容器添加 overflow:hidden;或 overflow:auto;可以清除浮动，另外在 IE6 中还需要触发 hasLayout ，例如为父元素设置容器宽高或设置 zoom:1。

在添加 overflow 属性后，浮动元素又回到了容器层，把容器高度撑起，达到了清理浮动的效果。

- 使用 CSS 的:after 伪元素
  子不教，父之过。
  给复容器的 class，添加伪元素。通过伪元素，在内容的最后插入一个带有 clear: both;的盒子，已达到清除浮动。

```javascript
.clearfix:after{
  content: "020";
  display: block;
  height: 0;
  clear: both;
  visibility: hidden;
  }
```

- 升级版 双伪元素
  前后 before 和 after 都加上伪元素，达到闭合的清除效果（推荐 ）

```javascript

//清除浮动的几种写法

伪元素清楚浮动
父标签
   .clearfloat:after{
      content: '';
      display: block;  //必须是一个块状元素才能清除浮动
      width: 0px;
      height: 0px;
      clear: left;
      visibility:hidden; //隐藏
    }

双伪元素清除浮动

    .clearfix:before,.clearfix:after {
        content:
        display:table;
    }
    .clearfix:after {
        clear: both;
    }

```
