/* eslint-disable no-unused-vars */
import { Entity, ObjectID, ObjectIdColumn, Column } from 'typeorm';
import { IsNotEmpty } from 'class-validator';
import bcrypt from 'bcrypt';

@Entity()
export class UserModel {
  @ObjectIdColumn()
  id!: ObjectID;

  @Column()
  firstName!: string;

  @Column()
  lastName!: string;

  @Column()
  username!: string;

  @Column()
  password!: string;

  @Column()
  @IsNotEmpty()
  role!: string;

  hashPassword() {
    this.password = bcrypt.hashSync(this.password, 8)
  }

  checkPassword(unencryptedPassword: string) {
    return bcrypt.compareSync(unencryptedPassword, this.password)
  }
}
