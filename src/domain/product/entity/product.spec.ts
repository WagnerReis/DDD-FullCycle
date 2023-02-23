import Product from "./product";

describe("Product unit tests", () => {
  it("should throw erro when id is empty", () => {
    expect(() => {
      new Product("", "Product 1", 100);
    }).toThrowError("product: Id is required");
  });

  it("should throw erro when name is empty", () => {
    expect(() => {
      new Product("123", "", 100);
    }).toThrowError("product: Name is required");
  });

  it("should throw erro when name and are empty", () => {
    expect(() => {
      new Product("", "", 1);
    }).toThrowError("product: Id is required,product: Name is required");
  });

  it("should throw erro when price less than 0", () => {
    expect(() => {
      new Product("123", "Product 1", -1);
    }).toThrowError("product: Price must be greater than zero");
  });

  it("should change name", () => {
    const product = new Product("123", "Product 1", 100);
    product.changeName("Product 2");
    expect(product.name).toBe("Product 2");
  });

  it("should change price", () => {
    const product = new Product("123", "Product 1", 100);
    product.changePrice(150);
    expect(product.price).toBe(150);
  });
});
