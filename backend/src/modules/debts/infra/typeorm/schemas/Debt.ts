import {
  ObjectID,
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ObjectIdColumn,
} from 'typeorm';

@Entity('debts')
class Debt {
  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  customer_id: number;

  @Column()
  reason: string;

  @Column()
  when: Date;

  @Column()
  amount: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Debt;
