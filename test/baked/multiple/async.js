'use strict';

const koa = require('koa').default;

function* koaStyle(next) {
  yield next;
}
function* koaStyle2() {
  yield global.next();
}
const koaStyle3 = function* (next) {
  yield next;
};

koa.use(function* () {
  this.body = 'Hello Koa';
});
koa.use(function* (next) {
  const start = new Date();
  yield next;

  const ms = new Date() - start;
  console.log(`${ this.method } ${ this.url } - ${ ms }ms`);
});

koa.use(function* (next) {
  const start = new Date();
  yield next;0;
  const ms = new Date() - start;
  console.log(`${ this.method } ${ this.url } - ${ ms }ms`);
});