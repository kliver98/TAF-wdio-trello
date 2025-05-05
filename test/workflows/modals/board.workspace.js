const BoardModalPage = require('../../pageobjects/modals/board.page');
const waitUtils = require('../../utils/waitUtils');

class BoardModalWorkflow {
  async createBoard(boardName = 'Empty') {
    await waitUtils.waitForElementDisplayed(BoardModalPage.btnCreateBoard);
    await BoardModalPage.btnCreateBoard.click();
    await BoardModalPage.inputBoardTitle.setValue(boardName);
    await BoardModalPage.btnSubmit.waitForClickable();
    await BoardModalPage.btnSubmit.click();
  }
}

module.exports = new BoardModalWorkflow();
