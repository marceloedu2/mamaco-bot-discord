import { createConnection } from 'typeorm'

<<<<<<< HEAD
createConnection().then()
=======
createConnection()
  .then(() => {
    console.log('Connected to database')
  })
  .catch(error => console.log(error))
>>>>>>> 3ccd9f8eccbe8deea3c64a47efd413987f461c13
