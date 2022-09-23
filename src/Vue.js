/**
 * VUE
 */
import Observer from './Observer'
import Compiler from './Compiler'

class Vue {
  constructor (options) {
  const {data, el} = options || {}
   this.$options = options || {};
   this.$data = data;
   this.$el = typeof el === 'string' ? document.querySelector(el) : el;
   this._proxyData(this.$data);
   new Observer(this.$data)
   new Compiler(this)
  }
  _proxyData (data) {
   Object.keys(data).forEach(key => {
     Object.defineProperty(this, key, {
       enumerableL: true, // 是否可枚举
       configurable: true, // 是否可遍历
       get() {
         return data[key]
       },
       set (val) {
         if (val === data[key]) {
           return
         }
         data[key] = val
       },
     })
   });
  }
}

export default Vue;