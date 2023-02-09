import Address from "../value-object/address";
import CustomerFactory from "./customer.factory";

describe("Customer factory unit tests", () => {
  it("should create a customer", () => {
     const customer = CustomerFactory.create("Jhon");

    expect(customer.id).toBeDefined();
    expect(customer.name).toBe("Jhon");
    expect(customer.Address).toBeUndefined();
  });

  it("should create a customer with an address", () => {
    const address = new Address("Street 1", 1, "zipcode 1", "City 1");

    let customer = CustomerFactory.createWithAddress("Jhon", address);

    expect(customer.id).toBeDefined();
    expect(customer.name).toBe("Jhon");
    expect(customer.Address).toBe(address);
  });
});