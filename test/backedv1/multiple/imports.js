'use strict';

const path = require('upath');

const exec = require('child-process').exec;

const glob = require('glob').sync;

const fake = require('fs-extra').default;