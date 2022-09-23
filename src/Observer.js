
import Dep from './Dep'

class Observer {
  constructor (data) {
    this.walk(data)
  }
  walk (data) {
    if (!data || typeof data !== 'object') {
      return
    }
    Object.keys(data).forEach(key => {
      this.defineReactive(data, key, data[key]);
    })
  }
  defineReactive (obj, key, val) {
    const that = this;
    const dep = new Dep()
    this.walk(val);
    Object.defineProperty(obj, key, {
      enumerable: true,
      configurable: true,
      get () {
        console.log('Dep.targe', Dep.target, dep, Dep);
        Dep.target && dep.addSub(Dep.target)
        return val
      },
      set (newValue) {
        if (newValue === val) {
          return
        }
        val = newValue
        that.walk(newValue);
        dep.notify()
      }
    })
  }
}
export default Observer