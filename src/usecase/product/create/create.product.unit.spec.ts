import CreateProductUseCase from "./create.product.usecase";

const input = {
  name: "Product 1",
  price: 1,
};

const MockRepository = () => {
  return {
    create: jest.fn(),
    find: jest.fn(),
    update: jest.fn(),
    findAll: jest.fn(),
  };
};

describe("Unit test create product use case", () => {
  it("should create a product", async () => {
    const productRepository = MockRepository();
    const createProductUseCase = new CreateProductUseCase(productRepository);

    const output = await createProductUseCase.execute(input);

    expect(output).toEqual({
      id: expect.any(String),
      name: input.name,
      price: input.price,
    });
  });

  it("shoul throw an erro when name is missing", async () => {
    const productRepository = MockRepository();
    const createProductUseCase = new CreateProductUseCase(productRepository);

    input.name = "";

    expect(createProductUseCase.execute(input)).rejects.toThrow(
      "Name is required"
    );
  });

  it("shoul throw an erro when price less than 0", async () => {
    const productRepository = MockRepository();
    const createProductUseCase = new CreateProductUseCase(productRepository);

    input.name = "John Doe";
    input.price = -1;

    expect(createProductUseCase.execute(input)).rejects.toThrow(
      "product: price must be greater than 0"
    );
  });
});
