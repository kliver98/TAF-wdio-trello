const { $ } = require('@wdio/globals')
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

    async getCard(boardTitle, cardTitle) {
        const listBoards = await this.listBoards;
        for (const listBoard of listBoards) {
            const elementFound = await listBoard.$(`//h2[text()='${boardTitle}']`);
            if (elementFound.isExisting()) {
                return listBoard.$(`//a[text()="${cardTitle}"]`);
            }
        }
    }

    async typeAndAddCard(textToAdd) {
        let element = $('textarea[data-testid="list-card-composer-textarea"]');
        await element.setValue(textToAdd);
        await super.btnSubmit.click();
    }

    async clickAddCardInList(listTitle) {
        const listBoards = await this.listBoards;
        for (const listBoard of listBoards) {
            const elementFound = await listBoard.$(`//h2[text()='${listTitle}']`);
            if (elementFound.isExisting()) {
                await listBoard.$('//button[@data-testid="list-add-card-button"]').click();
            }
        }
    }
}

module.exports = new BoardPage();
