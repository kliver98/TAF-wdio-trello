const ProfilePage = require('../pageobjects/profile.page');

class ProfileWorkflow {
  async typeUsername(username = '', submit = false) {
    await ProfilePage.inputUsername.waitForClickable();
    await ProfilePage.inputUsername.setValue(username);
    if (submit) await ProfilePage.btnSubmit.click();
  }

  async typeBio(bioText, submit = false) {
    await ProfilePage.textareaBio.setValue(bioText);
    if (submit) await ProfilePage.btnSubmit.click();
  }
}

module.exports = new ProfileWorkflow();
