import Customer from "../../../domain/customer/entity/customer";
import Address from "../../../domain/customer/value-object/address";
import CustomerRepository from "../../../infrastructure/customer/repository/sequelize/customer.repository";
import {
  InputFindCustomerDto,
  OutputFindCustomerDto,
} from "./find.customer.dto";
import FindCustomerUseCase from "./find.customer.usecase";

const customer = new Customer("123", "Jhon");
const address = new Address("Street 1", 1, "ZipCode", "City 1");
customer.changeAddress(address);

const MockRepository = () => {
  return {
    find: jest.fn().mockReturnValue(Promise.resolve(customer)),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  };
};

describe("Unit Test find customer use case", () => {
  it("should find a customer", async () => {
    const customerRepository = MockRepository();
    const useCase = new FindCustomerUseCase(customerRepository);

    const customer = new Customer("123", "Jhon");
    const address = new Address("Street 1", 1, "ZipCode", "City 1");
    customer.changeAddress(address);

    await customerRepository.create(customer);

    const input: InputFindCustomerDto = {
      id: "123",
    };

    const output: OutputFindCustomerDto = {
      id: "123",
      name: "Jhon",
      address: {
        street: "Street 1",
        city: "City 1",
        number: 1,
        zip: "ZipCode",
      },
    };

    const result = await useCase.execute(input);

    expect(result).toEqual(output);
  });

  it("should not find a customer", async () => {
    const customerRepository = MockRepository();
    customerRepository.find.mockImplementation(() => {
      throw Error("Customer not found");
    });

    const useCase = new FindCustomerUseCase(customerRepository);

    await customerRepository.create(customer);

    const input: InputFindCustomerDto = {
      id: "123",
    };

    expect(() => {
      return useCase.execute(input);
    }).rejects.toThrow("Customer not found");
  });
});
