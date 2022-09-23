const { intersects } = require('semver');

function interceptorsManner() {
  this.handler = [];
}
interceptorsManner.prototype.use = function(fullied, rejected) {
  this.handler.push({
    fullied,
    rejected
  })
}

function request() {
  const chain = [dispatchRequest, undefined];
  const promise = promise.resolve();
  this.interceptors.request.handler.forEach((interceptor) => {
    chain.unshift(interceptor.fullied, interceptor.rejected)
  });
  this.interceptors.response.handler.forEach((interceptor) => {
    chain.push(interceptor.fullied, interceptor.rejected);
  })
  while (chain.length) {
    promise.then(chain.shift(), chain.shift())
  }
  return promise
}

function axios() {
  this.interceptors = {
    request: new interceptorsManner(),
    response: new interceptorsManner(),
  }
}

axios.interceptor.request.use(function () {
  console.log(1);
})

axios.interceptor.response.use(function () {
  console.log(1);
})

axios();