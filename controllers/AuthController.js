module.exports = class AuthController {
  static login(_req, ress) {
    ress.render("auth/login");
  }
  static register(_req, ress) {
    ress.render("auth/register");
  }
};
