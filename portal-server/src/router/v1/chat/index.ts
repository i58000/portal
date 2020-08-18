import * as KoaRouter from "koa-router";
import group from "./group";

const router = new KoaRouter();

router.use("/group", group);

export default router.routes();
