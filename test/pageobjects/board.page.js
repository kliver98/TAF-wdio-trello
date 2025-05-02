const { $ } = require('@wdio/globals');
const Page = require('./page');

class BoardPage extends Page {
  get boardNameDisplay() {
    return $('h1[data-testid="board-name-display"]');
  }

  get btnAddList() {
    return $('button[data-testid="list-composer-button"]');
  }

  get textareaListName() {
    return $('textarea[data-testid="list-name-textarea"]');
  }

  get btnCreateList() {
    return $('button[data-testid="list-composer-add-list-button"]');
  }

  get listName() {
    return $('h2[data-testid="list-name"]');
  }

  get listBoards() {
    return $$('//ol[@id="board"]/li/div');
  }

  get btnDates() {
    return $('button[data-testid="card-back-due-date-button"]');
  }

  get inputTime() {
    return $('input[placeholder="Add time"]');
  }

  get btnAddCard() {
    return $('//button[@data-testid="list-add-card-button"]');
  }

  get btnCloseDialog() {
    return $('button[aria-label="Close dialog"]');
  }

  linkCard(cardTitle) {
    return $(`//a[@data-testid="card-name"][text()="${cardTitle}"]`);
  }

  listTitle(listTitle) {
    return $(`//ol[@id="board"]/li/div//h2[text()="${listTitle}"]`);
  }

  async setDueDate(newTime = '', closeDialog = true) {
    await this.btnDates.click();
    await this.inputTime.setValue(newTime);
    await super.btnSubmit.click();
    if (closeDialog) await this.btnCloseDialog.click();
  }

  async typeAndAddCard(textToAdd) {
    let element = $('textarea[data-testid="list-card-composer-textarea"]');
    await element.setValue(textToAdd);
    await super.btnSubmit.click();
  }

  async createCardInList(listTitle, textToAdd) {
    const listBoards = await this.listBoards;

    for (const listBoard of listBoards) {
      const elementFound = await listBoard.$(`//h2[text()="${listTitle}"]`);
      if (await elementFound.isExisting()) {
        const addButton = await listBoard.$(
          '//button[@data-testid="list-add-card-button"]'
        );
        await addButton.click();
        await this.typeAndAddCard(textToAdd);
        return;
      }
    }

    throw new Error(`List "${listTitle}" not found.`);
  }
}

module.exports = new BoardPage();
