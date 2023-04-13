import {
  BaseEntity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
} from "typeorm";
import { UserAddressEntity } from "./user.address.entity";

@Entity("users")
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  public id!: string;

  @Column({ type: "varchar", length: 255, select: true, unique: true })
  public email!: string;

  @Column({ type: "varchar", length: 500 })
  public password!: string;

  @Column({ type: "varchar", length: 500, nullable: true })
  public last_name!: string;

  @Column({ type: "varchar", length: 500, nullable: true })
  public first_name!: string;

  @Column({ type: "varchar", length: 500, nullable: true })
  public name!: string;

  @Column({ type: "varchar", nullable: true, select: false })
  public refresh_token!: string;

  @Column({ type: "varchar", length: 500, nullable: true })
  public picture_url!: string;

  @Column({ type: "varchar", nullable: true })
  public permissions!: string;

  @Column({ type: "jsonb", default: null })
  public passwordReset!: any;

  @OneToMany(() => UserAddressEntity, (event) => event.user)
  public addresses!: UserAddressEntity[];

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
