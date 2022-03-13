const Sequelize = require('sequelize');
require('dotenv').config();

let sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        dialect:'mysql',
        dialectOptions:{
            ssl: {
                require: true,
                rejectUnauthorized: false
              } 
        }
    }
);
sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });
module.exports = sequelize;


