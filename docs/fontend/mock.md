# MockData
关于Mock,模拟数据,之前从事全栈开发时,基本上不会涉及的一个概念,因为API都是自己完成。   
从事前端开发后,为了保证前端开发不受后端进度影响   
中间件MockData显得尤为的重要,目前选择的方案为**Mock.js**   
## Install
简单的操作不多说,有关Install 和相关语法,配置项 more and more   
官方文档 [Mock.js](https://github.com/nuysoft/Mock/tree/refactoring)

## 解决方案
结合手头项目和开源项目总结两个用法。开源项目参考的是基于[vue-element-admin](https://github.com/PanJiaChen/vue-element-admin)  
vue2.0版本,个人经手的后台项目,基本上选择的都是vue-element-admin，基于vue2.0，element,   
文档也不错,可以供参考。

#### 初级用法
```javascript
 //方案一:由main.js引入相关模块
if (process.env.NODE_ENV === 'development') {
    //可参考相关环境变量，构建不同的版本
  const { mockXHR } = require('../mock')
  mockXHR()
}
//然后由根目录下/mock/index.js 定义相关拦截接口
// for example
Mock.mock(/Path/, 'get', function(options) {
    return options.type
})
```
初级用法入门门槛低，快速上手,对于小项目来说,接口请求结构简单,   
数量又少,可以快速使用。mock.js注册在main.js, 又可通过环检变量选择,方便生产环境与线上环境切换。

#### 进阶用法
参考的是[vue-element-admin](https://github.com/PanJiaChen/vue-element-admin) [Mock部分](https://github.com/PanJiaChen/vue-element-admin/tree/master/mock)
相比较于初级用法,进阶用法原作者重写了一个mock-server的服务层,将mock.js进化成了一个真服务,   
并且可以在浏览器network中查看请求相关内容，方便调试。具体相关源码看一下上方链接。
   
    
实现方法通过了vue-cli中的devServer,devServer基于webpack-dev-server,在基于dev环检开发模式下，每一次启动项目，都会自动启动mock-server,又因为request.js中baseUrl可通过环境变量来设定。该方案也可完美的在本地mock数据，和线上正式api之前切换。   
```javascript
//vue cli 中 vue.config.js
//devServer所有 webpack-dev-server 的选项都支持
  devServer: {
    before: require('./mock/mock-server.js')
  }

 
```
  作者也重写了一些相关XMLHttpRequest方法,在mock的使用中更方便,也可以更便捷的做一些代码抽离
  ```javascript
  function mockXHR() {
  // mock patch
  // https://github.com/nuysoft/Mock/issues/300
  Mock.XHR.prototype.proxy_send = Mock.XHR.prototype.send
  Mock.XHR.prototype.send = function() {
    if (this.custom.xhr) {
      this.custom.xhr.withCredentials = this.withCredentials || false

      if (this.responseType) {
        this.custom.xhr.responseType = this.responseType
      }
    }
    this.proxy_send(...arguments)
  }

  function XHR2ExpressReqWrap(respond) {
    return function(options) {
      let result = null
      if (respond instanceof Function) {
        const { body, type, url } = options
        // https://expressjs.com/en/4x/api.html#req
        result = respond({
          method: type,
          body: JSON.parse(body),
          query: param2Obj(url)
        })
      } else {
        result = respond
      }
      return Mock.mock(result)
    }
  }

  for (const i of mocks) {
    Mock.mock(new RegExp(i.url), i.type || 'get', XHR2ExpressReqWrap(i.response))
  }
}
  ```
  数据用法实例

  ```javascript
  module.exports = [  {
    url: '/vue-element-admin/user/logout',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  },
  {
    url: '/vue-element-admin/article/detail',
    type: 'get',
    response: config => {
      const { id } = config.query
      for (const article of List) {
        if (article.id === +id) {
          return {
            code: 20000,
            data: article
          }
        }
      }
    }
  }]
  ```


[相关源码](https://github.com/PanJiaChen/vue-element-admin/tree/master/mock)

