<<<<<<< HEAD
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'

@Entity('sextouImages')
export default class SextouImages {
=======
import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from 'typeorm'

@Entity('sextouImages')
export default class SextouImages extends BaseEntity {
>>>>>>> 3ccd9f8eccbe8deea3c64a47efd413987f461c13
  @PrimaryGeneratedColumn('increment')
  id: number

  @Column()
  image: string
}
