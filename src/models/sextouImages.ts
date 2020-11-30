
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'

@Entity('sextouImages')
export default class SextouImages {
  @PrimaryGeneratedColumn('increment')
  id: number

  @Column()
  image: string
}
