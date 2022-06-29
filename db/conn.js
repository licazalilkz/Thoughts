const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("thoughts", "root", "admin", {
  host: "localhost",
  dialect: "mysql",
});

try {
  sequelize.authenticate();
  console.log("conectado ! ");
} catch (err) {
  console.log(`Nao foi possivel conectar, error : ${err}`);
}

module.exports = sequelize;
