import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'users' })
export class User {
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

  @Column()
  status: boolean;

  @Column()
  role: string;
}
