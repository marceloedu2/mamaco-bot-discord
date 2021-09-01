## Install & Dependencies
Install Node.js and Yarn.

Clone repository and install package dependencies.
```
git clone https://github.com/marceloedu2/mamaco-bot-discord.git
cd mamaco-bot-discord
yarn
```
Create new ENV file for bot config with the following contents in the directory specified below:

**For Development:** `.env`

```
NODE_ENV=development

#Discord token
TOKEN=

#githy token
GIPHY_KEY=

#Database
DATABASE_URL=postgres://database:mamaco123@localhost:5432/mamaco_db
POSTGRES_USER=database
POSTGRES_PASSWORD=mamaco123
POSTGRES_DB=mamaco_db 
```

Start the project.
```
yarn dev
```
