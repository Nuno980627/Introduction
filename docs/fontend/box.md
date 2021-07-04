# 盒子
写一些盒子模型遇到的问题

- padding不会撑开盒子的原因

当块状元素，没有指定高或者宽时，padding不会撑开盒子的尺寸

- 边框会使盒子尺寸撑开

-box的嵌套塌陷问题

当盒子父盒子套嵌子盒子时，内外盒子都有浮动属性，父盒子有margin-top属性，子盒子也有。
但是子盒子的margin-top失去效果。
这是盒子塌陷。
解决：
1.添加边框
2.添加padding
3.给父盒子添加overflow属性。
## css3盒子模型
box-sizing:border-box;
可避免padding border撑开盒子

