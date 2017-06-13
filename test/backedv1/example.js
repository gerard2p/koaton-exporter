"use strict";

exports.__esModule = true;
function* async1(next) {
  yield next;
}
function noasync(dat1, dat2) {
  console.log(dat1);
}
exports.default = async1;