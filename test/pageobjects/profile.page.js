const { $ } = require('@wdio/globals');
const Page = require('./page');

class ProfilePage extends Page {
  get inputUsername() {
    return $('input[id="username"]');
  }

  get textareaBio() {
    return $('textarea[id="bio"]');
  }

  get btnSubmit() {
    return super.btnSubmit;
  }

  get spanSavedFlag() {
    return $('//div[@id="FlagGroup"]//span[text()="Saved"]');
  }

  open() {
    return super.open('login');
  }
}

module.exports = new ProfilePage();
