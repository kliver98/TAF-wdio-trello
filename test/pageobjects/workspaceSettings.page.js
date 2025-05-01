const { $ } = require('@wdio/globals')
const Page = require('./page');

class WorkspaceSettingsPage extends Page {
    get btnEditName() {
        return $('//h2/button');
    }

    async workspaceTitle(title) {
        return $(`//h2[text()='${title}']`);
    }

    async typeWorkspaceName(newName) {
        await $('input[id="displayName"]').setValue(newName);
    }
}

module.exports = new WorkspaceSettingsPage();
