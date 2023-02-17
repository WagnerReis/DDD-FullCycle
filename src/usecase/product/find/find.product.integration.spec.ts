import { Sequelize } from "sequelize-typescript";
import Product from "../../../domain/product/entity/product";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import FindProductUseCase from "./find.product.usecase";

describe("Integration test find product use case", () => {
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
    await sequelize.truncate({ cascade: true });
    await sequelize.close();
  });

  it("should return a product", async () => {
    const productRepository = new ProductRepository();

    const product = new Product("123", "Product 1", 1);
    await productRepository.create(product);

    const findProductUseCase = new FindProductUseCase(productRepository);

    const input = {
      id: "123",
    };

    const output = {
      id: "123",
      name: "Product 1",
      price: 1,
    };

    const result = await findProductUseCase.execute(input);

    expect(result).toEqual(output);
  });

  it("should no product found", async () => {
    const productRepository = new ProductRepository();

    const findProductUseCase = new FindProductUseCase(productRepository);

    const input = {
      id: "123",
    };

    expect(async () => {
      await findProductUseCase.execute(input);
    }).rejects.toThrow("No product found");
  });
});
