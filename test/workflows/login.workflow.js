const LoginPage = require('../pageobjects/login.page');

class LoginWorkflow {
  async loginUser(username, password) {
    await LoginPage.open();

    await LoginPage.inputUsername.waitForExist();
    await LoginPage.inputUsername.waitForDisplayed();

    await LoginPage.inputUsername.setValue(username);
    await LoginPage.btnSubmit.click();

    await LoginPage.inputPassword.waitForExist();
    await LoginPage.inputPassword.waitForDisplayed();

    await LoginPage.inputPassword.setValue(password);
    await LoginPage.btnSubmit.click();

    await LoginPage.inputUsername.waitForExist({ reverse: true });
  }
}

module.exports = new LoginWorkflow();
