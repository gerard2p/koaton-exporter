async function async1 (ctx, next) {
    await next ();
}

export default async1;