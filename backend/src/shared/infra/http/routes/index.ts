import { Router } from 'express';
import debtsRouter from '../../../../modules/debts/infra/http/routes/debts.routes';

const routes = Router();

routes.use('/debts', debtsRouter);

export default routes;
