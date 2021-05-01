
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity('sextouImages')
export default class SextouImages {
  @PrimaryGeneratedColumn('increment')
  id: number

  @Column()
  image: string
}
