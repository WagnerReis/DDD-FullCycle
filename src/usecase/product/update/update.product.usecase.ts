import Product from "../../../domain/product/entity/product";
import ProductRepositoryInterface from "../../../domain/product/repository/porduct-repository.interface";
import { InputUpdateProductUseCase, OutputUpdateProductUseCase } from "./update.product.dto";

export default class UpdateProductUseCase {
  private productRepository: ProductRepositoryInterface;

  constructor(productRepository: ProductRepositoryInterface) {
    this.productRepository = productRepository;
  }

  async execute(input: InputUpdateProductUseCase): Promise<OutputUpdateProductUseCase> {
    const product = await this.productRepository.find(input.id);
    product.changeName(input.name);
    product.changePrice(input.price);
    
    await this.productRepository.update(product);

    return {
      id: product.id,
      name: product.name,
      price: product.price
    }
  }
}