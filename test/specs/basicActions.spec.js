require('dotenv').config();
const chai = require('chai');
const BoardPage = require('../pageobjects/board.page');
const ProfilePage = require('../pageobjects/profile.page');
const NavigationBarPage = require('../pageobjects/navigationBar.page');
const WorkspaceSettingsPage = require('../pageobjects/workspaceSettings.page');
const LoginWorkflow = require('../workflows/login.workflow');
const BoardWorkflow = require('../workflows/board.workflow');
const DashboardWorkflow = require('../workflows/dashboard.workflow');
const ProfileWorkflow = require('../workflows/profile.workflow');
const BoardModalWorkflow = require('../workflows/modals/board.workspace');
const NavigationBarWorkflow = require('../workflows/navigationBar.workflow');
const WorkspaceSettingsWorkflow = require('../workflows/workspaceSettings.workflow');

const expect = chai.expect;
const assert = chai.assert;
chai.should(); // Enables "should" style

const {
  addMinutesToCurrentTime,
  addDaysToGivenDate,
  formatDateToMDY,
} = require('../utils/timeUtils');
const waitUtils = require('../utils/waitUtils');

const currentTimeMils = Date.now();
const BOARD_TITLE = `Board ${currentTimeMils}`;
const LIST_NAME = 'My first list';
const CARDS = ['First Card', 'Second Card'];
const NEW_WORKSPACE_NAME = `Super Duper Workspace ${currentTimeMils}`;

describe('Assert Trello basic Actions', () => {
  it('should successful Sign-In', async () => {
    await LoginWorkflow.loginUser(
      process.env.TRELLO_EMAIL,
      process.env.TRELLO_PASSWORD
    );

    await waitUtils.waitForElementDisplayed(NavigationBarPage.inputSearch);

    const isDisplayed = await NavigationBarPage.btnCreateMenu.isDisplayed();
    assert.isTrue(isDisplayed, 'Create button should be displayed after login');
  });

  it('should edit user profile', async () => {
    let newUsername = `username${currentTimeMils}`;

    await NavigationBarWorkflow.goToProfile();
    await ProfileWorkflow.typeUsername(newUsername);
    await ProfileWorkflow.typeBio(`New Bio info ${currentTimeMils}`, true);

    await waitUtils.waitForElementDisplayed(ProfilePage.spanSavedFlag);

    const currentUrl = await browser.getUrl();
    assert.include(currentUrl, newUsername);
  });

  it('should create new board from dashboard', async () => {
    await NavigationBarPage.btnCreateMenu.click();
    await BoardModalWorkflow.createBoard(BOARD_TITLE);

    await waitUtils.waitForElementDisplayed(BoardPage.boardNameDisplay);

    const boardNameText = await BoardPage.boardNameDisplay.getText();
    assert.strictEqual(boardNameText, BOARD_TITLE);

    const pageTitle = await browser.getTitle();
    assert.include(pageTitle, BOARD_TITLE);
  });

  it('should search for existing board', async () => {
    await NavigationBarWorkflow.typeInSearch(BOARD_TITLE);
    await waitUtils.waitForListsHasElements(
      () => NavigationBarPage.listBoardsFound
    );

    const listBoardsFound = await NavigationBarPage.listBoardsFound;
    const boardFound = await NavigationBarWorkflow.searchBoardFound(
      BOARD_TITLE
    );

    listBoardsFound.should.have.lengthOf(1);
    const exists = await boardFound.isExisting();
    exists.should.be.true;
  });

  it(`should create new list from board ${BOARD_TITLE}`, async () => {
    await browser.keys('Escape');
    await BoardWorkflow.createList(LIST_NAME);

    const listNameFound = BoardPage.searchListName(LIST_NAME);
    const listNameExists = await listNameFound.isExisting();
    listNameExists.should.be.true;
  });

  it('should create a new card', async () => {
    await BoardWorkflow.createCardInList(LIST_NAME, CARDS[0]);

    const lintToCardFound = BoardPage.linkCard(CARDS[0]);
    const lintToCardExists = await lintToCardFound.isExisting();
    expect(lintToCardExists).to.be.true;
  });

  it('should filter cards by due date', async () => {
    await BoardWorkflow.createCardInList(LIST_NAME, CARDS[1]);

    await BoardPage.linkCard(CARDS[0]).click();
    await BoardWorkflow.setDateDueDate(formatDateToMDY(new Date()), false);
    await BoardWorkflow.setTimeDueDate(addMinutesToCurrentTime(1));
    await BoardPage.linkCard(CARDS[1]).click();
    await BoardWorkflow.setDateDueDate(addDaysToGivenDate(3, new Date()));

    await BoardWorkflow.selectFilterDueDate('Due in the next day');
    const headerSubtitleInList = BoardPage.headerSubtitleInList(LIST_NAME);
    await headerSubtitleInList.waitForDisplayed();

    const headerSubtitleText = await headerSubtitleInList.getText();
    expect(headerSubtitleText).to.equal('1 card matches filters');
  });

  it('should edit workspace name', async () => {
    await DashboardWorkflow.goToSettings();
    await WorkspaceSettingsPage.btnEditName.click();

    await WorkspaceSettingsWorkflow.typeWorkspaceName(NEW_WORKSPACE_NAME);
    await DashboardWorkflow.goToSettings();

    const workspaceTitle =
      WorkspaceSettingsPage.workspaceTitle(NEW_WORKSPACE_NAME);

    await waitUtils.waitForElementDisplayed(workspaceTitle);

    const workspaceTitleExists = await workspaceTitle.isExisting();
    expect(workspaceTitleExists).to.be.true;
  });

  after(async () => {
    try {
      await DashboardWorkflow.closeBoard(BOARD_TITLE);
    } catch (error) {
      console.warn(`Cannot delete board created: ${BOARD_TITLE}`);
    }
  });
});
