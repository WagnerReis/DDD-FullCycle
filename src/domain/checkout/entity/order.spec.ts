import Order from "./order";
import OrderItem from "./order_item";

describe("Order unit tests", () => {

  it("should throw erro when id is empty", () => {
    expect(() => {
      new Order("", "123", [])
    }).toThrowError("Id is required");
  });

  it("should throw customerId when id is empty", () => {
    expect(() => {
      new Order("123", "", [])
    }).toThrowError("CustomerId is required");
  });

  it("should throw item when item is empty", () => {
    expect(() => {
      new Order("123", "123", [])
    }).toThrowError("Items are required");
  });

  it("should calculate total", () => {
    const item = new OrderItem("i1", "Item 1", 100, "p1", 2);
    const item2 = new OrderItem("i2", "Item 2", 200, "p2", 2);
    const order = new Order("o1", "c1", [item]);

    let total = order.total();

    expect(total).toBe(200);

    const order2 = new Order("o1", "c1", [item, item2])

    total = order2.total();

    expect(total).toBe(600)
  });

  it("should throw error if the item qte is less or equal 0", () => {
    expect(() => {
      const item = new OrderItem("i1", "Item 1", 100, "p1", 0);
      const order = new Order("o1", "c1", [item]);
      
    }).toThrowError("Quantity must be greater than 0");
  });
});