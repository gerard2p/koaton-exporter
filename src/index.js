import { sync as glob } from 'glob';
import * as path from 'upath';
import * as fs from 'fs-extra';
import * as babel from 'babel-core';
import * as Promise from 'bluebird';

const transform = Promise.promisify(babel.transformFile, {
		context: babel
	}),
	writeFile = function (file, data, options) {
		return new Promise(function (resolve, reject) {
			fs.writeFile(file, data, options, function (err) {
				/* istanbul ignore if */
				if (err) {
					reject(err);
				} else {
					resolve(file);
				}
			});
		});
	};
const config = {
	v1: {
		babelrc: false,
		plugins: [
			'babel-plugin-transform-koaton-es6-modules',
			'babel-plugin-transform-koa2-async-to-generator'
		]
	},
	v2: {
		babelrc: false,
		"presets": [
			["env", {
				"targets": {
					"node": "current"
				},
				"exclude": ["transform-async-to-generator", "es6.set"]
			}]
		],
		plugins: [
			'babel-plugin-transform-koaton-es6-modules'
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
	let extension = getIndex('-e') || null;
	let nodeVersion = parseFloat(process.versions.node);
	let sources = [];
	let output = process.argv.pop();

	/* istanbul ignore next*/
	if (nodeVersion < 7.6 && version === 'v2') {
		console.error(`Minimun node version is 7.6 for koa ${version}`);
		return Promise.resolve(1);
	}
	for (const files of process.argv) {
		sources = sources.concat(glob(files));
	}
	sources = sources.filter(function (item, pos, self) {
		return self.indexOf(item) === pos;
	});
	/* istanbul ignore else*/
	if (sources.length > 0) {
		fs.ensureDirSync(output);
	}
	for (const source of sources) {
		let target = path.resolve(output, source).replace(replace, '');
		if (extension) {
			target = path.changeExt(target, `.${extension}`);
		}
		fs.ensureDirSync(path.dirname(target));
		converting.push(transform(source, config[version]).then(content => {
			return writeFile(target, content.code, {}).then((file) => {
				return file.replace(path.resolve('./'), '');
			});
		}));
	}
	Promise.all(converting).then(cb).catch(console.log);
}
export default transpile;
