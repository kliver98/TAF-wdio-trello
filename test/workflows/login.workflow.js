const LoginPage = require('../pageobjects/login.page');

class LoginWorkflow {
  async loginUser(username, password) {
    await LoginPage.open();
    await LoginPage.inputUsername.setValue(username);
    await LoginPage.btnSubmit.click();
    await LoginPage.inputPassword.setValue(password);
    await LoginPage.btnSubmit.click();
  }
}

module.exports = new LoginWorkflow();
