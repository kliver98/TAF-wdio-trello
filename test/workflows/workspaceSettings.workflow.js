const WorkspaceSettingsPage = require('../pageobjects/workspaceSettings.page');

class WorkspaceSettingsWorkflow {
  async typeWorkspaceName(newWorkspaceName = 'New name', submit = true) {
    await WorkspaceSettingsPage.inputDisplayName.setValue(newWorkspaceName);
    if (submit) await WorkspaceSettingsPage.btnSubmit.click();
  }
}

module.exports = new WorkspaceSettingsWorkflow();
