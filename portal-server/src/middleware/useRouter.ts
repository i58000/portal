import router from '../router';

export default app => {
    app.use(router.routes())
        .use(router.allowedMethods())
}