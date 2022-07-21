# 函数式组件

像 element 一样 通过`this.$message()` 来调用组件

## vue2 
vue2的版本就直接引用 element的源码来演示  

index.vue
```vue
<template>
  <transition name="el-message-fade" @after-leave="handleAfterLeave">
    <div
      v-show="visible"
      :class="[
        'el-message',
        type && !iconClass ? `el-message--${ type }` : '',
        center ? 'is-center' : '',
        showClose ? 'is-closable' : '',
        customClass
      ]"
      role="alert"
      @mouseenter="clearTimer"
      @mouseleave="startTimer"
    >
      <!--自定义图标存在时显示-->
      <i v-if="iconClass" :class="iconClass" />
      <!--自定义图标不存在时根据type显示图标-->
      <i v-else :class="typeClass" />
      <slot>
        <!--用户设置的message的参数为字符串时，显示字符串-->
        <p v-if="!dangerouslyUseHTMLString" class="el-message__content">{{ message }}</p>
        <!--用户设置的message的参数为VNode时，在此处显示-->
        <p v-else class="el-message__content" v-html="message" />
      </slot>
      <!--当用户设置的关闭按钮显示为true时，显示关闭图标-->
      <i v-if="showClose" class="el-message__closeBtn el-icon-close" @click="close" />
    </div>
  </transition>
</template>

<script type="text/babel">
const typeMap = {
  success: 'success',
  info: 'info',
  warning: 'warning',
  error: 'error'
}

export default {
  data() {
    return {
      visible: false,
      // 消息文字
      message: '',
      // 显示时间, 毫秒。设为 0 则不会自动关闭
      duration: 3000,
      type: 'info',
      iconClass: '',
      customClass: '',
      // 关闭时的回调函数, 参数为被关闭的 message 实例
      onClose: null,
      // 是否显示关闭按钮
      showClose: false,
      closed: false,
      timer: null,
      // 是否将 message 属性作为 HTML 片段处理
      dangerouslyUseHTMLString: false,
      // 文字是否居中
      center: false
    }
  },

  computed: {
    // 自定义图标的类名，会覆盖 type
    typeClass() {
      return this.type && !this.iconClass
        ? `el-message__icon el-icon-${typeMap[this.type]}`
        : ''
    }
  },

  watch: {
    // message是否关闭着的
    closed(newVal) {
      if (newVal) {
        this.visible = false
      }
    }
  },
  mounted() {
    this.startTimer()
    // 添加键盘监听
    document.addEventListener('keydown', this.keydown)
  },
  beforeDestroy() {
    // 移除监听
    document.removeEventListener('keydown', this.keydown)
  },

  methods: {
    // 离开后
    handleAfterLeave() {
      this.$destroy(true)
      this.$el.parentNode.removeChild(this.$el)
    },
    // 关闭当前的 Message
    close() {
      this.closed = true
      if (typeof this.onClose === 'function') {
        this.onClose(this)
      }
    },
    // 清除定时器
    clearTimer() {
      clearTimeout(this.timer)
    },
    // 开启定时器
    startTimer() {
      if (this.duration > 0) {
        this.timer = setTimeout(() => {
          if (!this.closed) {
            this.close()
          }
        }, this.duration)
      }
    },
    keydown(e) {
      if (e.keyCode === 27) { // esc关闭消息
        if (!this.closed) {
          this.close()
        }
      }
    }
  }
}
</script>


```
index.js    
```javascript
import Vue from 'vue'
import Main from './main.vue'
import { PopupManager } from 'element-ui/src/utils/popup'
import { isVNode } from 'element-ui/src/utils/vdom'
const MessageConstructor = Vue.extend(Main)

let instance
// 存放当前未close的message
const instances = []
let seed = 1

const Message = function(options) {
  if (Vue.prototype.$isServer) return
  options = options || {}
  if (typeof options === 'string') {
    options = {
      message: options
    }
  }
  // userOnClose用来存放用户设置关闭时的回调函数, 参数为被关闭的 message 实例
  const userOnClose = options.onClose
  const id = 'message_' + seed++
  // 重写options.onClose
  options.onClose = function() {
    Message.close(id, userOnClose)
  }
  // 创建message实例,此时数据还没有挂载呢，$el 属性目前不可见，无法访问到数据和真实的dom
  instance = new MessageConstructor({
    data: options
  })
  instance.id = id
  // 判断instance.message是不是虚拟节点
  if (isVNode(instance.message)) {
    instance.$slots.default = [instance.message]
    instance.message = null
  }
  // 手动地挂载一个未挂载的实例。$mount(param)中param不存在时，模板将被渲染为文档之外的的元素，并且你必须使用原生 DOM API 把它插入文档中。
  instance.vm = instance.$mount()
  // 用原生DOM API把它插入body中
  document.body.appendChild(instance.vm.$el)
  instance.vm.visible = true
  instance.dom = instance.vm.$el
  // css z-index层级叠加，覆盖之前已出现但还未close的message
  instance.dom.style.zIndex = PopupManager.nextZIndex()
  instances.push(instance)
  return instance.vm
};
// 给Message增加四个直接调用的方法
// 支持this.$message.success('xxx')方式调用，等同于this.$message({type: 'success',message: 'xxx'})
['success', 'warning', 'info', 'error'].forEach(type => {
  Message[type] = options => {
    if (typeof options === 'string') {
      options = {
        message: options
      }
    }
    options.type = type
    return Message(options)
  }
})
// 组件的close方法中调用onClose再调该方法
Message.close = function(id, userOnClose) {
  for (let i = 0, len = instances.length; i < len; i++) {
    if (id === instances[i].id) {
      if (typeof userOnClose === 'function') {
        userOnClose(instances[i])
      }
      // 移除message实例
      instances.splice(i, 1)
      break
    }
  }
}
// 关闭所有的消息提示弹窗
Message.closeAll = function() {
  for (let i = instances.length - 1; i >= 0; i--) {
    instances[i].close()
  }
}

export default Message

```

## vue3
dialog.vue
```vue
<template>
  <el-dialog
    :title="title"
    v-model="dialogVisible"
    width="30%"
    @close="close">
    <span>{{content}}</span>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="close">取 消</el-button>
        <el-button type="primary" @click="close">确 定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  props: {
    close: {
      type: Function
    },
    content: {
      type: String,
      default: '暂无权限'
    },
    title: {
      type: String,
      default: '提示'
    }
  },
  setup () {
    return {
      dialogVisible: true
    }
  }
})
</script>

```
index.js
```javascript
import { createApp } from 'vue'
import dialog from './dialog.vue'
import ElementPlus from 'element-plus'
import 'element-plus/lib/theme-chalk/index.css'

interface Option{
  title?: string;
  content?: string;
}

function mountContent (option = {} as Option) {
  const dom = document.createElement('div')
  document.body.appendChild(dom)
  const app = createApp(dialog, {
    close: () => { app.unmount(dom); document.body.removeChild(dom) },
    ...option
  })
  app.use(ElementPlus).mount(dom)
}
export default mountContent

```