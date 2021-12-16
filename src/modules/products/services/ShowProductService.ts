import { getCustomRepository } from 'typeorm';
import { ProductsRepository } from '@modules/products/typeorm/repositories/ProductsRepository';
import Product from '@modules/products/typeorm/entities/Product';
import AppError from '@shared/errors/AppError';
import ProductInterface from '@modules/products/interfaces/ProductInterface';

class ShowProductService {
  public async execute({ id }: ProductInterface): Promise<Product | undefined> {
    const productsRepository = getCustomRepository(ProductsRepository);

    const product = productsRepository.findOne(id);

    if (!product) {
      throw new AppError('Product not found');
    }

    return product;
  }
}

export default ShowProductService;
