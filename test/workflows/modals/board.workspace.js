const BoardModalPage = require('../../pageobjects/modals/board.page');

class BoardModalWorkflow {
  async createBoard(boardName = 'Empty') {
    await BoardModalPage.btnCreateBoard.click();
    await BoardModalPage.inputBoardTitle.setValue(boardName);
    await BoardModalPage.btnSubmit.waitForClickable();
    await BoardModalPage.btnSubmit.click();
  }
}

module.exports = new BoardModalWorkflow();
