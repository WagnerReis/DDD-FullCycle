import Product from "../../../domain/product/entity/product";
import FindProductUseCase from "./find.product.usecase";

const product = new Product("123", "Product 1", 1);

const MockRepository = () => {
  return {
    create: jest.fn(),
    find: jest.fn().mockReturnValue(Promise.resolve(product)),
    update: jest.fn(),
    findAll: jest.fn(),
  };
};

describe("Unit test find an product", () => {
  it("should return an product", async () => {
    const productRepository = MockRepository();
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

  it("shoul not find a product", async () => {
    const productRepository = MockRepository();
    const findProductUseCase = new FindProductUseCase(productRepository);

    productRepository.find.mockImplementation(() => {
      throw new Error("No product found");
    });

    const input = {
      id: "123",
    };

    expect(async () => {
      await findProductUseCase.execute(input);
    }).rejects.toThrow("No product found");
  });
});
