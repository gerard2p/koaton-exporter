"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
function* async1(next) {
  yield next;
}
function noasync(dat1, dat2) {
  console.log(dat1);
}
exports.default = async1;