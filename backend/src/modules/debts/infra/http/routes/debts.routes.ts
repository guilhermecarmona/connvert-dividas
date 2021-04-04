import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';
import DebtsController from '../controllers/DebtsController';

const debtsRouter = Router();
const debtsController = new DebtsController();

debtsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      customer_id: Joi.number().integer().required(),
      amount: Joi.number().positive().greater(0).required(),
      reason: Joi.string().required(),
      when: Joi.date().required(),
    },
  }),
  debtsController.create
);

debtsRouter.get('/', debtsController.index);

debtsRouter.get('/:customer_id', debtsController.filter);

debtsRouter.put(
  '/:id',
  celebrate({
    [Segments.BODY]: {
      customer_id: Joi.number().integer().required(),
      amount: Joi.number().positive().greater(0).required(),
      reason: Joi.string().required(),
      when: Joi.date().required(),
    },
  }),
  debtsController.update
);

debtsRouter.delete('/:id', debtsController.delete);

export default debtsRouter;
