import { IsEmail } from "class-validator";
import { Reminder } from "src/reminders/entities/reminder.entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Person {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true})
  @IsEmail()
  email: string;

  @Column({length: 255})
  passwordHash: string;

  @Column({length: 100})
  name: string;

  @CreateDateColumn()
  createdAt?: Date;

  @UpdateDateColumn()
  updatedAt?: Date;  

  @OneToMany(() => Reminder, reminder => reminder.from)
  remindersFrom: Reminder[];

  @OneToMany(() => Reminder, reminder => reminder.to)
  remindersTo: Reminder[];

}
