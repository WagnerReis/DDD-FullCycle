import EventInterface from "./event.interfacec";

export default interface  EventHandlerInterface<T extends EventInterface=EventInterface> {
  handle(event: T): void;
}