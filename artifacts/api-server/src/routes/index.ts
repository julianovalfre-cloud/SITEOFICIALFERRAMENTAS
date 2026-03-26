import { Router, type IRouter } from "express";
import healthRouter from "./health";
import productsRouter from "./products";
import categoriesRouter from "./categories";
import cartRouter from "./cart";
import checkoutRouter from "./checkout";
import ordersRouter from "./orders";
import webhooksRouter from "./webhooks";
import erpRouter from "./erp";
import integrationRouter from "./integration";
import siteIntegracaoRoutes from "./integracoes/site";
import integracoesHealthRouter from "./integracoes/health";

const router: IRouter = Router();

router.use(healthRouter);
router.use(erpRouter);
router.use(integrationRouter);
router.use("/integracoes/site", siteIntegracaoRoutes);
router.use("/integracoes/health", integracoesHealthRouter);
router.use(productsRouter);
router.use(categoriesRouter);
router.use(cartRouter);
router.use(checkoutRouter);
router.use(ordersRouter);
router.use(webhooksRouter);

export default router;
