(() => {
  const target = {
    name: 't',
    age: 2,
    nav: [{label: 'home', value: 1}, {label: 'info', value: 2}],
    list: [1,2,3]
  }
  
  const myproxy = new Proxy(target, {
    get: (target, k) => {
      console.log(`访问了${k}`);
      return target[k]
    },
    set: (target, k, val) => {
      console.log(`设置了${k}`);
      target[k] = val
    }
  })
  
  myproxy.name = 'r';
  myproxy.nav.push({label: 'detail', value: 3});
  myproxy.list = [1,2,3,4]
  console.log(myproxy.nav);
})()
