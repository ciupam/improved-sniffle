import {
  Entity,
  PrimaryGeneratedColumn,
  //Column,
  BaseEntity,
  ManyToOne,
} from "typeorm";
import User from "./User";

@Entity()
export default class Expense extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne((_) => User, (user) => user.expenses)
  user: User;
}
