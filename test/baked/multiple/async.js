'use strict';

const koa = require('koa').default;

const declar = function* declar(next) {
	yield next;
};

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
	yield next;
	const ms = new Date() - start;
	console.log(`${ this.method } ${ this.url } - ${ ms }ms`);
});

function* innerAsyncs(next) {
	this.fn = function* (a, b) {
		return a;
	};
	yield next;
}