import { Sequelize } from "sequelize-typescript";
import Customer from "../../../domain/customer/entity/customer";
import Address from "../../../domain/customer/value-object/address";
import CustomerModel from "../../../infrastructure/customer/repository/sequelize/customer.model";
import CustomerRepository from "../../../infrastructure/customer/repository/sequelize/customer.repository";
import { InputFindCustomerDto, OutputFindCustomerDto } from "./find.customer.dto";

describe("Test find customer use case", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    sequelize.addModels([CustomerModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should find a customer", async () => {
    const customerRepository = new CustomerRepository();
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

    const result = useCase.execute(input);

    expect(result).toEqual(output);
  });
});
