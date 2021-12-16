import { getCustomRepository } from 'typeorm';
import { ProductsRepository } from '@modules/products/typeorm/repositories/ProductsRepository';
import AppError from '@shared/errors/AppError';
import Product from '@modules/products/typeorm/entities/Product';
import ProductInterface from '@modules/products/interfaces/ProductInterface';

class CreateProductService {
  public async execute({
    name,
    price,
    quantity,
  }: ProductInterface): Promise<Product> {
    const productsRepository = getCustomRepository(ProductsRepository);
    const productExists = await productsRepository.findByName(name);

    if (productExists) {
      throw new AppError(`Product with name ${name} already exists`);
    }

    const product = productsRepository.create({
      name,
      price,
      quantity,
    });

    await productsRepository.save(product);

    return product;
  }
}

export default CreateProductService;
