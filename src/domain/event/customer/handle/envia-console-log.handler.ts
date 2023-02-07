import EventHandlerInterface from "../../@shared/event-handler.interface";
import AddressChangedEvent from "../address-changed.event";

export default class EnviaConsoleLogHandler
  implements EventHandlerInterface<AddressChangedEvent>
{
  handle(event: AddressChangedEvent): void {
    console.log(
      `Endereço do cliente: ${event.eventData.id}, ${event.eventData.name} alterado para: 
        Rua: ${event.eventData.address.street},
        Numero: ${event.eventData.address.number},
        Cep: ${event.eventData.address.zip},
        Cidade: ${event.eventData.address.city},
      `
    );
  }
}
