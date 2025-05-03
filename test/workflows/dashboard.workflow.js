const DashboardPage = require('../pageobjects/dashboard.page');
const BoardModalPage = require('../pageobjects/modals/board.page');

class DashboardWorkflow {
  async goToSettings() {
    await DashboardPage.open();
    await DashboardPage.linkToSettings.click();
  }

  async closeBoard(boardTitle = 'Board title') {
    await DashboardPage.linkToBoardCard(boardTitle).moveTo();
    await DashboardPage.btnBoardActionMenu(boardTitle).click();
    await BoardModalPage.btnCloseBoard.click();
    await BoardModalPage.btnCloseConfirm.click();
  }
}

module.exports = new DashboardWorkflow();
