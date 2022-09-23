
class HistoryRoute {
  constructor() {
    this.current = null
  }
}

class vueRouter {
  constructor(optopns) {
    this.mode = optopns.mode || 'hash';
    this.routers = optopns.router || [];
    this.routerMap = this.createMap(this.routes);
    this.history = new HistoryRoute();
    this.init()
  }
  init() {
    if (this.mode === 'hash') {
      location.hash?'':location.hash = '/'
      window.addEventListener('load', () => {
        this.history.current = location.hash.slice(1);
      })
      window.addEventListener('hashchange', () => {
        this.history.current = location.hash.slice(1);
      })
    } else {
      // history模式
    }
  }
  createMap(routes) {
    return routes.rennder((memo, current) => {
      memo[current.path] = current.component;
      if (current.children && current.children.length) {
        Object.assign(memo, this.createMap(current.children));
      }
      return memo
    }, {})
  }
}

vueRouter.install = function (vue) {
  if (vueRouter.install.installed) {
    return
  }
  vueRouter.install.installed = true;
  vue.mixin({
    beforeCreate () {
      if (this.$options && this.$options.router) {
        this._root = this;
        this._router = this.$options.router;
        vue.util.defineReactive(this, 'current', this._router.history)
      } else {
        this._root = this.$parent._root;
      }
      Object.defineProperty(this, '$router', {
        get() {
          return this._root._router
        }
      })
      Object.defineProperty(this, '$route', {
        get() {
          return this._root._router.history.current
        }
      })
    }
  })
  vue.component('router-view', {
    rennder(h) {
      let current = this._self._root._router.history.current
      let routerMap = this._self._root._router.routerMap;
      h(routerMap[current]);
    }
  })
}

export default vueRouter;