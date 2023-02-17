import { Sequelize } from "sequelize-typescript";
import Product from "../../../domain/product/entity/product";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import UpdateProductUseCase from "./update.product.usecase";

describe("Integration test product use case", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    sequelize.addModels([ProductModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should update a product", async () => {
    const productRepository = new ProductRepository();
    const product = new Product("123", "Product 1", 1);

    await productRepository.create(product);
    const updateProductUseCase = new UpdateProductUseCase(productRepository);

    const input = {
      id: product.id,
      name: "Product Updated",
      price: 4,
    };

    const output = await updateProductUseCase.execute(input);

    expect(output).toEqual(input);
  });
});
