import {
  BaseEntity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  JoinColumn,
  OneToOne,
  ManyToOne,
} from "typeorm";
import { UserEntity } from "./user.entity";

@Entity("user_address")
export class UserAddressEntity extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  public id!: string;

  @Column({ type: "varchar", length: 255, select: true })
  public name!: string;

  @Column({ type: "varchar" })
  public city!: string;

  @Column({ type: "varchar", default: null })
  public lat!: string;

  @Column({ type: "varchar", default: null })
  public long!: string;

  @Column({ type: "varchar" })
  public street!: string;

  @Column({ type: "varchar", length: 255, default: null })
  public pincode!: string;

  @Column({ type: "varchar", length: 255, default: null })
  public country!: string;

  @Column({ type: "varchar", length: 255, default: null })
  public state!: string;

  @ManyToOne(() => UserEntity, (event) => event.addresses)
  @JoinColumn({ name: "user_id", referencedColumnName: "id" })
  user: UserEntity;

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
}
