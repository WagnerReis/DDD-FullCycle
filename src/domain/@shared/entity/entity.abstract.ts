import Notification from "../notification/notification";

export default abstract class Entity {
  public id: string;
  protected notification: Notification;

  constructor() {
    this.notification = new Notification();
  }
}