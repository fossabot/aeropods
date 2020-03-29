import {Entity, PrimaryGeneratedColumn, Column, Index} from "typeorm";

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    firstName!: string;

    @Column()
    lastName!: string;

    @Column()
    @Index({ unique: true })
    username!: string;

    @Column()
    @Index({ unique: true })
    email!: string;

    @Column()
    role!: string;

}