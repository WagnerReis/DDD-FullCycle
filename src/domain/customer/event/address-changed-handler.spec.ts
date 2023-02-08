import EventDispatcher from "../../@shared/event/event-dispatcher";
import Address from "../../customer/value-object/address";
import Customer from "../entity/customer";
import CustomerCreatedEvent from "./customer-created.event";
import EnviaConsoleLogHandler from "./handle/envia-console-log.handler";

describe("Address event handle tests", () => {
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