const BoardPage = require('../pageobjects/board.page');

class BoardWorkflow {
  async createList(listName = 'Empty') {
    await BoardPage.btnAddList.click();
    await BoardPage.textareaListName.waitForEnabled();
    await BoardPage.textareaListName.setValue(listName);
    await BoardPage.btnCreateList.click();
  }

  async selectFilterDueDate(textOption = 'No dates') {
    await BoardPage.btnFilter.click();
    await BoardPage.containerDueDate(textOption).click();
    await BoardPage.btnPopoverClose.click();
  }

  async setTimeDueDate(newTime = '', closeDialog = true) {
    await BoardPage.btnDates.click();
    await BoardPage.inputTime.setValue(newTime);
    await BoardPage.btnSubmit.click();
    if (closeDialog) await BoardPage.btnCloseDialog.click();
  }

  async setDateDueDate(newDate = '', closeDialog = true) {
    await BoardPage.btnDates.click();
    await BoardPage.inputDate.setValue(newDate);
    await BoardPage.btnSubmit.click();
    if (closeDialog) await BoardPage.btnCloseDialog.click();
  }

  async typeAndAddCard(textToAdd) {
    await BoardPage.textareaListCard.setValue(textToAdd);
    await BoardPage.btnSubmit.waitForClickable();
    await BoardPage.btnSubmit.click();
  }

  async createCardInList(listTitle, textToAdd) {
    const listBoards = await BoardPage.listBoards;

    for (const listBoard of listBoards) {
      const elementFound = await listBoard.$(`//h2[text()="${listTitle}"]`);
      if (await elementFound.isExisting()) {
        const addButton = await listBoard.$(
          '//button[@data-testid="list-add-card-button"]'
        );
        try {
          await addButton.click();
        } catch (error) {
          console.info(`Already opened: ${error}`);
        }
        await this.typeAndAddCard(textToAdd);
        return;
      }
    }

    throw new Error(`List "${listTitle}" not found.`);
  }
}

module.exports = new BoardWorkflow();
