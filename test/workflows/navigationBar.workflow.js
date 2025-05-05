const NavigationBarPage = require('../pageobjects/navigationBar.page');

class NavigationBarWorkflow {
  async goToProfile() {
    await NavigationBarPage.btnOpenMemberMenu.click();
    await NavigationBarPage.linkMenuProfile.click();
  }

  async typeInSearch(textToSearch) {
    await NavigationBarPage.inputSearch.click();
    await NavigationBarPage.inputSearch.setValue(textToSearch);
  }

  async searchBoardFound(boardTitle) {
    const boardsFound = await NavigationBarPage.listBoardsFound;
    for (const board of boardsFound) {
      const elementFound = await board.$(`.//span[text()='${boardTitle}']`);
      if (elementFound.isExisting()) return elementFound;
    }
  }
}

module.exports = new NavigationBarWorkflow();
