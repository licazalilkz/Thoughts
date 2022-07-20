const User = require("../models/User");

//password encrypt library
const bcrypt = require("bcryptjs");
module.exports = class AuthController {
  static login(_req, ress) {
    ress.render("auth/login");
  }
  static register(_req, ress) {
    ress.render("auth/register");
  }
  static async registerPost(req, res) {
    const { name, email, password, confirmpassword } = req.body;
    //password match validation
    if (password != confirmpassword) {
      //message
      req.flash("message", "A senha nao confere, tente novamente !");
      res.render("auth/register");
      return;
    }
    //check if user exist
    const checkIfUserExists = await User.findOne({ where: { email: email } });
    if (checkIfUserExists) {
      //message
      req.flash("message", "O email ja esta em uso, tente outro.");
      res.render("auth/register");
      return;
    }
    //create a password
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    const user = {
      name,
      email,
      password: hashedPassword,
    };

    try {
      const createdUser = await User.create(user);
      //initialize session
      req.session.userid = createdUser.id;

      req.flash("message", "Cadastro realizado com sucesso !");

      req.session.save(() => {
        res.redirect("/thoughts");
      });

      res.redirect("/");
    } catch (err) {
      console.log(err);
    }
  }
};
