import * as assert from 'assert';
import transpile from '../src';
import * as fs from 'fs-extra';
import { sync as glob } from 'glob';

describe('Koaton Unit Testing', function () {
	beforeEach(function () {
		this.timeout(1000 * 60 * 100);
	});
	after(function (done) {
        process.argv = ['./src/**/*.js','./lib','-t','v1', '-r', 'src/']
        transpile(done.bind(null, null, true));
	});
	it('Compiles a single file', function (done) {
        process.argv = ['./test/example/single.js','./output_test']
        transpile(() => {
            assert.equal(fs.readFileSync('./output_test/test/example/single.js','utf-8'), fs.readFileSync('./test/baked/single.js','utf-8'));
            done(null, true);
        });
    });
    it('Compiles multiple files', function (done) {
        process.argv = ['./test/example/multiple/*.js','./output_test','-t','v1', '-r', 'test/']
        transpile(() => {
            assert.equal(fs.readFileSync('./output_test/example/multiple/imports.js','utf-8'), fs.readFileSync('./test/baked/multiple/imports.js','utf-8'));
			assert.equal(fs.readFileSync('./output_test/example/multiple/async.js','utf-8'), fs.readFileSync('./test/baked/multiple/async.js','utf-8'));
            assert.equal(fs.readFileSync('./output_test/example/multiple/exports.js','utf-8'), fs.readFileSync('./test/baked/multiple/exports.js','utf-8'));
            done(null, true);
        });
    });
});
