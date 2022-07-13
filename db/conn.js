// importando sequelize e fazendo a conexao em seguida
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
// exportando a conexao pro index
module.exports = sequelize;
