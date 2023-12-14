import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'customer' })
export class Customer extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ length: 500 })
  username: string;

  @Column('text')
  description: string;

  @Column()
  customerID: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({})
  complaint: string;

  @Column()
  status: string;
}
