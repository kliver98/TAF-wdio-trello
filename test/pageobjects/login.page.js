const { $ } = require('@wdio/globals');
const Page = require('./page');

class LoginPage extends Page {
  get inputUsername() {
    return $('#username');
  }

  get inputPassword() {
    return $('#password');
  }

  open() {
    return super.open('login');
  }
}

module.exports = new LoginPage();
