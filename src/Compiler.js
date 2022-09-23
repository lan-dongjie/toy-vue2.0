import Watcher from './Watcher'

class Compiler {
  constructor (vm) {
    this.el = vm.$el;
    this.vm = vm;
    this.compile(this.el)
  }
  // 编译模板，处理文本元素节点
  compile(el) {
    const childNodes = el.childNodes
    Array.from(childNodes).forEach(node => {
      if (this.isTextNode(node)) {
        this.compileText(node)
      } else if (this.isElementNode(node)) {
        this.compileElement(node)
      }
      if (node.childNodes && node.childNodes.length) {
        this.compile(node)
      }
    })
  }
  // 编译元素节点，处理指令
  compileElement(node) {
    Array.from(node.attributes).forEach(attr => {
      let attrName = attr.name;
      if (this.isDirective(attrName)) {
        attrName = attrName.substr(2)
        const key = attr.value
        this.update(node, key, attrName)
      }
    })
  }
  update (node, key, attrName) {
    const updateFn = this[`${attrName}Updater`];
    updateFn && updateFn.call(this, node, this.vm[key], key)
  }
  textUpdater (node, value, key) {
    node.textContent = value
    new Watcher(this.vm, key, (newValue) => {
      node.textContent = newValue
    })
  }
  modelUpdater (node, value, key) {
    console.dir(node);
    node.value = value
    new Watcher(this.vm, key, (newValue) => {
      node.value = newValue
    })
    node.addEventListener('input', (a) => {
      console.log('----------',node.value);
      this.vm[key] = node.value
    })
  }
  // 编译文本节点，处理差值表达式
  compileText(node) {
    // .：匹配任意字符,()：提取内容
    const reg = /\{\{(.+?)\}\}/g;
    const value = node.textContent
    if (reg.test(value)) {
      const key = RegExp.$1.trim()
      node.textContent = value.replace(reg, this.vm[key])
      new Watcher(this.vm, key, (newValue) => {
        node.textContent = newValue
      })
    }
  }
  // 判断元素属性是否为指令
  isDirective(attrName) {
    return attrName.startsWith('v-')
  }
  // 判断元素节点是否为文本接单
  isTextNode(node) {
    return node.nodeType === 3
  }
  // 判断元素节点是否为元素节点
  isElementNode(node) {
    return node.nodeType === 1
  }
}
export default Compiler
