import { Router } from 'express';
import ProductsRoutes from '@modules/products/routes/products.routes';

const routes = Router();

routes.use('/products', ProductsRoutes);

export default routes;
