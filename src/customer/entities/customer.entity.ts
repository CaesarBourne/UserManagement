import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'customer' })
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
