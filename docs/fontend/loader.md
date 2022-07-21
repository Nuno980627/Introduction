# Loader
 很久没有写笔记了,最近脑子不太正常，很多十分基础的硬知识都忘记了,又花时间来巩固一下，不料却有了许多新的理解  
 先记一下关于loader的相关，我自己手上很多项目已经转战Vite，是真的香，但是webpack这个老骨头也还是得啃啊

 ## What is Loader
 webpack 理念中 万物皆模块化，everything can import ,但是坑的是,webpack这货只能编译JS和json,其他格式一律不认识啊,
 当然这种说法现在也是过时了，webpack 5 之后，webpack 本身也可以处理一下资源文件，这个后续再详细写,但在处理一些特殊的格式包括 
 .vue .sass .less等等资源时还是需要loader将资源转换成 适用于 JS 标准的syntax。  
 比如说，将图片资源返回成url，将特殊的格式，转换成json 或者object 供js 使用,也可以返回字符串，或者字符串构成的函数去调用  
 （万物皆是字符串嘛）  
 最终生成浏览器标准认识的html js css 静态资源等等
 ## When to work
 Loader 编译过程中 单纯的文件进行转化，不参与打包的输出过程，仅参与编译过程

 ## difference with Plugin
loader，它是一个转换器，将A文件进行编译成B文件，比如：将A.less转换为A.css，单纯的文件转换过程。

plugin是一个扩展器，它丰富了webpack本身，针对是loader结束后，webpack打包的整个过程，它并不直接操作文件，而是基于事件机制工作，会监听webpack打包过程中的某些节点，执行广泛的任务

## asset （after webpack5）

在 webpack 5 之前，通常使用：

raw-loader 将文件导入为字符串
url-loader 将文件作为 data URI 内联到 bundle 中
file-loader 将文件发送到输出目录
资源模块类型(asset module type)，通过添加 4 种新的模块类型，来替换所有这些 loader：

asset/resource 发送一个单独的文件并导出 URL。之前通过使用 file-loader 实现。
asset/inline 导出一个资源的 data URI。之前通过使用 url-loader 实现。
asset/source 导出资源的源代码。之前通过使用 raw-loader 实现。
asset 在导出一个 data URI 和发送一个单独的文件之间自动选择。之前通过使用 url-loader，并且配置资源体积限制实现。
（引用自官方文档）
## loader demo
```javascript
//webpack.config.js 配置相关loader
module.exports = {
  module: {
    rules: [
      {
        test: /\.tpl/,
        use: [
          {
            loader: 'tpl-loader',
          },
        ],
      },
    ],
  }
}

//main.js中
加入 import tpl from 'xxx.tpl'

module.exports = function (source) {  
    // source 给的是源文件的字符串
    console.log('normal excution');   
    return source;
}
//如果需要再业务中使用tpl 为一个函数
tpl({
    a:1
})
//可以转换成一个 字符串函数
module.exports = function (source) {  
    // source 给的是源文件的字符串
    return ` module.exports= function (){ 
        //自定义操作
    }`;
}

```

## file-url demo
可自动讲.png|.jpg|.svg等等指定的静态资源转换成路径，在项目中可直接import XXX from 'xxx.jpg' 使用
```javascript
var loaderUtils = require('loader-utils')

module.exports = function (content) {

  // 获取options，就是 webpack 中对 file-loader 的配置，比如这里我们配置的是 `name=[name]_[hash].[ext]`
  // 获取到的就是这样一个k-v 对象 { name: "[name]_[hash].[ext]" }
  const options = loaderUtils.getOptions(this) || {};

  // 这是 loaderUtils 的一个方法，可以根据 name 配置和 content 内容 生成一个文件名。为什么需要 文件内容呢？这是为了保证当文件内容没有发生变化的时候，名字中的 [hash] 字段也不会变。可以理解为用文件的内容作了一个hash
  let url = loaderUtils.interpolateName(this, options.name, {
    content
  })

  this.emitFile(url, content) // 告诉webpack，我要创建一个文件，文件名和内容，这样webpack就会帮你在 dist 目录下创建一个对应的文件

  // 这里要用到一个变量，就是 __webpack_public_path__ ，这是一个由webpack提供的全局变量，是public的根路径
  // 参见：https://webpack.js.org/guides/public-path/#on-the-fly
  // 这里要注意一点：这个返回的字符串是一段JS，显然，他是在浏览器中运行的
  // 举个栗子：
  // css源码这样写： background-image: url('a.png')
  // 编译后变成: background-image: require('xxxxxx.png')
  // 这里的 require 语句返回的结果，就是下面的 exports 的字符串，也就是图片的路径
  return 'module.exports = __webpack_public_path__ + '+ JSON.stringify(url)
}

// 一定别忘了这个，因为默认情况下 webpack 会把文件内容当做UTF8字符串处理，而我们的文件是二进制的，当做UTF8会导致图片格式错误。
// 因此我们需要指定webpack用 raw-loader 来加载文件的内容，而不是当做 UTF8 字符串传给我们
// 参见： https://webpack.github.io/docs/loaders.html#raw-loader
module.exports.raw = true
```