import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from 'typeorm'

@Entity('sextouImages')
export default class SextouImages extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number

  @Column()
  image: string
}
