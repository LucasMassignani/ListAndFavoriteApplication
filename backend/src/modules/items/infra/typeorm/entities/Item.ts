import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import Filter from '../../../../filters/infra/typeorm/entities/Filter';
import Favorite from '../../../../favorites/infra/typeorm/entities/Favorite';

@Entity('items')
class Item {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  api_type: string;

  @Column()
  original_id: string;

  @Column()
  title: string;

  @Column()
  image_url: string;

  @Column()
  image_preview?: string;

  @OneToMany(() => Favorite, favorite => favorite.item)
  favorites: Favorite[];

  @OneToMany(() => Filter, filter => filter.item)
  filters: Filter[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Item;
