const { $ } = require('@wdio/globals');
const Page = require('./page');

class WorkspaceSettingsPage extends Page {
  get btnEditName() {
    return $('//h2/button');
  }

  get inputDisplayName() {
    return $('input[id="displayName"]');
  }

  workspaceTitle(title) {
    return $(`//h2[text()='${title}']`);
  }
}

module.exports = new WorkspaceSettingsPage();
