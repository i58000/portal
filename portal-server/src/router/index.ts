import * as KoaRouter from 'koa-router';

import v1 from './v1'
// import v2 from './v2';

const router = new KoaRouter();

router.use('/api/v1', v1);
// router.use('/api/v2/', v2);

export default router