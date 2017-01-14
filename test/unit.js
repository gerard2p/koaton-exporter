import * as assert from 'assert';
import transpile from '../src';
import * as fs from 'fs-extra';

function read (src) {
	return fs.readFileSync(src, 'utf-8').replace(/\r/igm, '');
}
describe('Koaton Unit Testing', function () {
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
			assert.equal(read('./output_test/test/example/single.js'), read('./test/baked/single.js'));
			done(null, true);
		});
	});
	it('Compiles multiple files', function (done) {
		process.argv = ['./test/example/**/*.js', './output_test', '-t', 'v1', '-r', 'test/'];
		transpile(() => {
			assert.equal(read('./output_test/example/multiple/imports.js'), read('./test/baked/multiple/imports.js'));
			assert.equal(read('./output_test/example/multiple/async.js'), read('./test/baked/multiple/async.js'));
			assert.equal(read('./output_test/example/multiple/exports.js'), read('./test/baked/multiple/exports.js'));
			done(null, true);
		});
	});
});
