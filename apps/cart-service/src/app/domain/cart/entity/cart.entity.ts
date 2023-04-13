import { MenuItem } from "@eats/types";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
} from "typeorm";
import { MenuItemBodyDto } from "../dto/cart.dto";

@Entity("cart")
export class CartEntity extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  public id!: string;

  @Column({ type: "uuid", select: true })
  public user_id!: string;

  @Column({ type: "uuid", select: true })
  public restaurant_id!: string;

  @Column({ type: "jsonb", default: null })
  public menu_items!: MenuItemBodyDto[];

  @Column({ type: "int", default: null })
  public count!: number;

  @CreateDateColumn({
    type: "timestamptz",
    default: () => "CURRENT_TIMESTAMP",
    select: true,
  })
  public created_at!: Date;

  @UpdateDateColumn({
    type: "timestamptz",
    default: () => "CURRENT_TIMESTAMP",
    select: true,
  })
  public updated_at!: Date;

  @UpdateDateColumn({
    type: "timestamptz",
    default: () => "CURRENT_TIMESTAMP",
    select: true,
  })
  public deleted_at!: Date;
}
