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
    return $('//textarea[following-sibling::div/button[@type="submit"]]');
  }

  get btnCreateList() {
    return $('button[data-testid="list-composer-add-list-button"]');
  }

  get listBoards() {
    return $$('//ol[@id="board"]/li/div');
  }

  get btnDates() {
    return $('//button[text()="Dates"]');
  }

  get inputTime() {
    return $('input[placeholder="Add time"]');
  }

  get inputDate() {
    return $('input[data-testid="due-date-field"]');
  }

  get btnCloseCardComposer() {
    return $('button[data-testid="list-card-composer-cancel-button"]');
  }

  get btnCloseDialog() {
    return $('button[aria-label="Close dialog"]');
  }

  get btnFilter() {
    return $('button[data-testid="filter-popover-button"]');
  }

  get btnPopoverClose() {
    return $('button[aria-label="Close popover"]');
  }

  get textareaListCard() {
    return $('textarea[data-testid="list-card-composer-textarea"]');
  }

  listBoardWithText(listBoard, listTitle) {
    return listBoard.$(`//h2[text()="${listTitle}"]`);
  }

  btnAddCardFromList(listElement) {
    return listElement.$('//button[@data-testid="list-add-card-button"]');
  }

  headerSubtitleInList(listTitle) {
    return $(`//h2[text()="${listTitle}"]/ancestor::div/following-sibling::p`);
  }

  searchListName(listName) {
    return $(`//h2[@data-testid="list-name"][text()="${listName}"]`);
  }

  containerDueDate(text) {
    return $(`//div[text()="${text}"]`);
  }

  linkCard(cardTitle) {
    return $(`//a[@data-testid="card-name"][text()="${cardTitle}"]`);
  }

  listTitle(listTitle) {
    return $(`//ol[@id="board"]/li/div//h2[text()="${listTitle}"]`);
  }
}

module.exports = new BoardPage();
