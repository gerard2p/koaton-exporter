import { sync as glob } from 'glob';
import * as path from 'upath';
import * as fs from 'fs-extra';
import * as babel from 'babel-core';
import * as Promise from 'bluebird';

const transform = Promise.promisify(babel.transformFile, {
		context: babel
	}),
	writeFile = Promise.promisify(fs.writeFile);
const config = {
	v1: {
		babelrc: false,
		plugins: [
			'babel-plugin-transform-koaton-es6-modules',
			'babel-plugin-transform-koa2-async-to-generator'
		]
	}
};

/**
 * getIndex - description
 *
 * @param  {type} param description
 * @return {type}       description
 */
function getIndex (param) {
	let index = process.argv.indexOf(param);
	let val;
	if (index > 0) {
		val = process.argv[index + 1];
		process.argv.splice(index, 2);
	}
	return val;
}

function transpile (/* istanbul ignore next*/ cb = () => {}) {
	let converting = [];
	let version = getIndex('-t') || 'v1';
	let replace = getIndex('-r') || '';
	let sources = [];
	let output = process.argv.pop();
	for (const files of process.argv) {
		sources = sources.concat(glob(files));
	}
	fs.emptyDirSync(output);
	for (const source of sources) {
		let target = path.resolve(output, source).replace(replace, '');
		fs.ensureDirSync(path.dirname(target));
		converting.push(transform(source, config[version]).then(content => {
			return writeFile(target, content.code, {});
		}));
	}
	Promise.all(converting).then(cb).catch(console.log);
}
export default transpile;
