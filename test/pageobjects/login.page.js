const { $ } = require('@wdio/globals')
const Page = require('./page');

class LoginPage extends Page {
    get inputUsername() {
        return $('#username');
    }

    get inputPassword() {
        return $('#password');
    }

    async login(username, password) {
        await this.inputUsername.setValue(username);
        await super.btnSubmit.click();
        await this.inputPassword.setValue(password);
        await super.btnSubmit.click();
    }

    open() {
        return super.open('login');
    }
}

module.exports = new LoginPage();
