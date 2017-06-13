import * as assert from 'assert';
import transpile from '../src';
import * as fs from 'fs-extra';

function read (src) {
	return fs.readFileSync(src, 'utf-8').replace(/\r/igm, '');
}
describe('Koaton Unit Testing v1', function () {
	beforeEach(function () {
		this.timeout(1000 * 60 * 100);
	});
	after(function (done) {
		process.argv = ['./src/**/*.js', './lib', '-t', 'v1', '-r', 'src/'];
		transpile(done.bind(null, null, true));
	});
	it('Compiles a single file', function (done) {
		process.argv = ['./test/example/single.js', './output_test'];
		transpile(() => {
			assert.equal(read('./output_test/test/example/single.js'), read('./test/backedv1/single.js'));
			done(null, true);
		});
	});
	it('Compiles changes extension of a file', function (done) {
		process.argv = ['./test/example/example.esnext', './output_test', '-e', 'js'];
		transpile((a) => {
			assert.equal(read('./output_test/test/example/example.js'), read('./test/backedv1/example.js'));
			done(null, true);
		});
	});
	it('Compiles multiple files', function (done) {
		process.argv = ['./test/example/*.js', './test/example/**/*.js', './output_test', '-t', 'v1', '-r', 'test/'];
		transpile(() => {
			assert.equal(read('./output_test/example/multiple/imports.js'), read('./test/backedv1/multiple/imports.js'));
			assert.equal(read('./output_test/example/multiple/async.js'), read('./test/backedv1/multiple/async.js'));
			assert.equal(read('./output_test/example/multiple/exports.js'), read('./test/backedv1/multiple/exports.js'));
			done(null, true);
		});
	});
});

describe('Koaton Unit Testing v2', function () {
	beforeEach(function () {
		this.timeout(1000 * 60 * 100);
	});
	it('Compiles a single file', function (done) {
		process.argv = ['./test/example/single.js', './output_test', '-t', 'v2'];
		transpile(() => {
			assert.equal(read('./output_test/test/example/single.js'), read('./test/backedv2/single.js'));
			done(null, true);
		});
	});
	it('Compiles changes extension of a file', function (done) {
		process.argv = ['./test/example/example.esnext', './output_test', '-e', 'js', '-t', 'v2'];
		transpile((a) => {
			assert.equal(read('./output_test/test/example/example.js'), read('./test/backedv2/example.js'));
			done(null, true);
		});
	});
	it('Compiles multiple files', function (done) {
		process.argv = ['./test/example/*.js', './test/example/**/*.js', './output_test', '-t', 'v2', '-r', 'test/'];
		transpile(() => {
			assert.equal(read('./output_test/example/multiple/imports.js'), read('./test/backedv2/multiple/imports.js'));
			assert.equal(read('./output_test/example/multiple/async.js'), read('./test/backedv2/multiple/async.js'));
			assert.equal(read('./output_test/example/multiple/exports.js'), read('./test/backedv2/multiple/exports.js'));
			done(null, true);
		});
	});
});
