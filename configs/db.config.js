module.exports = {
    HOST: "localhost",
    USER: "root",
    PASSWORD: "3612", // update the db password here
    DB: "m3", //add database name here
    dialect: "mysql",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };