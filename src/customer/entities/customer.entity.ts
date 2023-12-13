import { BaseEntity, Column, PrimaryGeneratedColumn } from 'typeorm';

export class Customer extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 500 })
  username: string;

  @Column('text')
  description: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({})
  complaint: string;

  @Column()
  status: boolean;
}
