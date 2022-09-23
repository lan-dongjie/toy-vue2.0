import Vue from './Vue'

 const vm = new Vue({
   el: '#app',
   data: {
     msg: 'msg1111111111111',
     test: 'text',
     count: 0,
     num: 3,
   }
 })


 setTimeout(() => {
  vm.msg = 'xxx'
 }, 2000)
