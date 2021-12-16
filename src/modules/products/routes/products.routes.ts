import { Router } from 'express';
import ProductsController from '@modules/products/controllers/ProductsController';

const productsRouter = Router();
const productsController = new ProductsController();

productsRouter.get('/', productsController.index);
productsRouter.get('/:id', productsController.get);
productsRouter.post('/', productsController.post);
productsRouter.put('/:id', productsController.put);
productsRouter.delete('/:id', productsController.delete);

export default productsRouter;
