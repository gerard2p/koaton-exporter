async function async1 (ctx, next) {
    await next ();
}
function noasync (dat1, dat2) {
  console.log(dat1);
}
export default async1;