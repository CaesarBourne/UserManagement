import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 500 })
  name: string;

  @Column('text')
  description: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({})
  order: object;

  @Column()
  isPublished: boolean;
}
