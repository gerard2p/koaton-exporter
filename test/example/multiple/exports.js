const a = 1;
const b = 2;
async function test (ctx, next) {
    await next;
}
export default test;
export { a };
export {b as c};