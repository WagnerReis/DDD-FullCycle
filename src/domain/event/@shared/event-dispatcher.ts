import EventDispatcherInterface from "./event-dispatcher.interface";
import EventHandlerInterface from "./event-handler.interface";
import EventInterface from "./event.interfacec";

export default class EventDispatcher implements EventDispatcherInterface {
  register(eventName: string, eventHandler: EventHandlerInterface): void {}
  
  unregister(eventName: string, eventHandler: EventHandlerInterface): void {}
  
  notify(event: EventInterface): void {}
  
  unregisterAll(): void {}
}