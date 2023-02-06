import Address from "../../entity/address";
import Customer from "../../entity/customer";
import EventDispatcher from "../@shared/event-dispatcher";
import CustomerCreatedEvent from "./customer-created.event";
import EnviaConsoleLogHandler from "./handle/envia-console-log.handler";
import EnviaConsoleLog1Handler from "./handle/envia-console-log1.handler";
import EnviaConsoleLog2Handler from "./handle/envia-console-log2.handler";

describe("Customer event handle tests", () => {
  it("should call handles to create customer", () => {
    const eventDispatcher = new EventDispatcher();

    const customer = new Customer("123", "Jhon");
    const eventHandler1 = new EnviaConsoleLog1Handler()
    const eventHandler2 = new EnviaConsoleLog2Handler()

    const spyEventHandler1 = jest.spyOn(eventHandler1, "handle");
    const spyEventHandler2 = jest.spyOn(eventHandler2, "handle");

    eventDispatcher.register("CustomerCreatedEvent", eventHandler1);
    eventDispatcher.register("CustomerCreatedEvent", eventHandler2);

    expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"][0]).toMatchObject(eventHandler1);
    expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"][1]).toMatchObject(eventHandler2);

    const customerCreatedEvent = new CustomerCreatedEvent({
      name: customer.name
    });

    eventDispatcher.notify(customerCreatedEvent);

    expect(spyEventHandler1).toHaveBeenCalled();
    expect(spyEventHandler2).toHaveBeenCalled();
  });

  it("should call handles to change address of customer", () => {
    const eventDispatcher = new EventDispatcher();

    const customer = new Customer("123", "Jhon");
    const address = new Address("Street 2", 2, "zipcode 2", "city 2");
    customer.changeAddress(address);

    const eventHandler1 = new EnviaConsoleLogHandler()

    const spyEventHandler = jest.spyOn(eventHandler1, "handle");

    eventDispatcher.register("CustomerCreatedEvent", eventHandler1);

    expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"][0]).toMatchObject(eventHandler1);

    const customerCreatedEvent = new CustomerCreatedEvent({
      id: customer.id,
      name: customer.name,
      address: {
        street: address.street,
        number: address.number,
        zip: address.zip,
        city: address.city,
      }
    });

    eventDispatcher.notify(customerCreatedEvent);

    expect(spyEventHandler).toHaveBeenCalled();
  });
});