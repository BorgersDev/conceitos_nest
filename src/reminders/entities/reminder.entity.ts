import { Person } from "src/people/entities/person.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Reminder {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({type: 'varchar', length: 255})
  text: string;

  @Column({type: 'boolean'})
  read: boolean;

  @CreateDateColumn()
  createdAt?: Date;

  @UpdateDateColumn()
  updatedAt?: Date;

  @ManyToOne(() => Person)
  @JoinColumn({name: 'from'})
  from: Person;

  @ManyToOne(() => Person)
  @JoinColumn({name: 'to'})
  to: Person                                                                                                                           ;   
}