import { BelongsTo, Column, ForeignKey, Model, PrimaryKey, Table } from "sequelize-typescript";
import OrderModel from "./order.model";
import ProductModel from "./product.model";

@Table({
  tableName: "order_items",
  timestamps: false,
})
export default class OrderItemModel extends Model {
  @PrimaryKey
  @Column
  declare id: string;

  //recuperar id do cliente
  @ForeignKey(() => ProductModel)
  @Column({ allowNull: false })
  declare product_id: string;

  //recuperar dados do cliente
  @BelongsTo(() => ProductModel)
  declare product: ProductModel;

  //recuperar id do cliente
  @ForeignKey(() => OrderModel)
  @Column({ allowNull: false })
  declare order_id: string;

  //recuperar dados do cliente
  @BelongsTo(() => OrderModel)
  declare order: OrderModel;

  @Column({ allowNull: false })
  declare quantity: number;

  @Column({ allowNull: false })
  declare name: string;

  @Column({ allowNull: false })
  declare price: number;
}