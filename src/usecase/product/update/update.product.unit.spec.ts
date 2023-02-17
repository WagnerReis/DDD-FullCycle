import Product from "../../../domain/product/entity/product";
import UpdateProductUseCase from "./update.product.usecase";

const product = new Product("123", "Product 1", 1);

const input = {
  id: product.id,
  name: "Product Updated",
  price: 4,
};

const MockRepository = () => {
  return {
    create: jest.fn(),
    find: jest.fn().mockReturnValue(Promise.resolve(product)),
    update: jest.fn(),
    findAll: jest.fn(),
  };
};

describe("Unit test update product use case", () => {
  it("should update an product", async () => {
    const productRepository = MockRepository();
    const updateProductUseCase = new UpdateProductUseCase(productRepository);

    const output = await updateProductUseCase.execute(input);

    expect(output).toEqual(input);
  });

  it("should not product found", async () => {
    const productRepository = MockRepository();

    productRepository.find.mockImplementation(() => {
      throw new Error("Product not found");
    });

    const updateProductUseCase = new UpdateProductUseCase(productRepository);

    const input = {
      id: "456",
      name: "Product 2",
      price: 2,
    };

    expect(async () => {
      await updateProductUseCase.execute(input);
    }).rejects.toThrow("Product not found");
  });
});
