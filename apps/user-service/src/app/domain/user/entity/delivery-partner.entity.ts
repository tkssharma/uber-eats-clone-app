import {
  BaseEntity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  OneToMany,
  JoinColumn,
} from "typeorm";
import { UserEntity } from "./user.entity";

@Entity("delivery_partner")
export class DeliveryPartnerEntity extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  public id!: string;

  @Column({ type: "varchar", length: 500, nullable: true })
  public mobno!: string;

  @Column({ type: "boolean", default: false })
  public availability!: boolean;

  @Column({ type: "varchar", nullable: true })
  public location!: string;

  @Column({ type: "varchar", nullable: true })
  public ratings!: string;

  @CreateDateColumn({
    type: "timestamptz",
    default: () => "CURRENT_TIMESTAMP",
    select: true,
  })
  public created_at!: Date;

  @OneToOne(() => UserEntity)
  @JoinColumn()
  user: UserEntity;

  @UpdateDateColumn({
    type: "timestamptz",
    default: () => "CURRENT_TIMESTAMP",
    select: true,
  })
  public updated_at!: Date;
}
