import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Reminder {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({type: 'varchar', length: 255})
  text: string;

  @Column({type: 'varchar', length: 255})
  from: string;

  @Column({type: 'varchar', length: 255})
  to: string;   

  @Column({type: 'boolean'})
  read: boolean;

  @CreateDateColumn()
  createdAt?: Date;

  @UpdateDateColumn()
  updatedAt?: Date;
}