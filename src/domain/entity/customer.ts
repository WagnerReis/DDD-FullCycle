import EventDispatcher from "../event/@shared/event-dispatcher";
import EventHandlerInterface from "../event/@shared/event-handler.interface";
import EventInterface from "../event/@shared/event.interface";
import CustomerCreatedEvent from "../event/customer/customer-created.event";
import EnviaConsoleLogHandler from "../event/customer/handle/envia-console-log.handler";
import EnviaConsoleLog1Handler from "../event/customer/handle/envia-console-log1.handler";
import EnviaConsoleLog2Handler from "../event/customer/handle/envia-console-log2.handler";
import Address from "./address";

export default class Customer {

  private _id: string;
  private _name: string;
  private _address!: Address;
  private _active: boolean = false;
  private _rewardPoints = 0;

  constructor(id: string, name: string) {
    const eventHandler1 = new EnviaConsoleLog1Handler();
    const eventHandler2 = new EnviaConsoleLog2Handler();
    
    const eventDispatcher = new EventDispatcher();
    eventDispatcher.register("CustomerCreatedEvent", eventHandler1);
    eventDispatcher.register("CustomerCreatedEvent", eventHandler2);

    const customerCreatedEvent = new CustomerCreatedEvent({
      name: this._name,
    });

    eventDispatcher.notify(customerCreatedEvent);

    this._id = id;
    this._name = name;
    this.validate();
  }

  get id(): string {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  get active(): boolean {
    return this._active;
  }

  get rewardPoints(): number {
    return this._rewardPoints;
  }

  get Address(): Address {
    return this._address;
  }

  validate() {
    if (this._id.length === 0) {
      throw new Error("Id is required");
    }
    if (this._name.length === 0) {
      throw new Error("Name is required");
    }
  }

  changeName(name: string) {
    this._name = name;
    this.validate();
  }

  changeAddress(address: Address) {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new EnviaConsoleLogHandler();

    eventDispatcher.register("CustomerCreatedEvent", eventHandler);
    
    const customerCreatedEvent = new CustomerCreatedEvent({
      id: this._id,
      name: this._name,
      address: {
        street: address.street,
        number: address.number,
        zip: address.zip,
        city: address.city,
      }
    });
    
    eventDispatcher.notify(customerCreatedEvent);

    this._address = address;
  }

  isActive(): boolean {
    return this._active;
  }

  activate() {
    if(this._address === undefined) {
      throw new Error("Address is mandatory to activate a customer");
    }
    this._active = true;
  }

  deactivate() {
    this._active = false;
  }

  addRewardPoints(points: number) {
    this._rewardPoints += points;
  }

  set Address(address: Address) {
    this._address = address;
  }
}

