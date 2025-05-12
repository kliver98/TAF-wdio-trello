require('dotenv').config();
const { expect } = require('@wdio/globals');
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
const {
  addMinutesToCurrentTime,
  addDaysToGivenDate,
  formatDateToMDY,
} = require('../utils/timeUtils');

const currentTimeMils = Date.now();
const BOARD_TITLE = `Board ${currentTimeMils}`;
const LIST_NAME = 'My first list';
const CARDS = ['First Card', 'Second Card'];
const NEW_WORKSPACE_NAME = `Super Duper Workspace ${currentTimeMils}`;

describe('Trello automation', () => {
  it('should successful Sign-In', async () => {
    await LoginWorkflow.loginUser(
      process.env.TRELLO_EMAIL,
      process.env.TRELLO_PASSWORD
    );

    await expect(NavigationBarPage.btnCreateMenu).toBeDisplayed();
  });

  it('should edit user profile', async () => {
    let newUsername = `username${currentTimeMils}`;

    await NavigationBarWorkflow.goToProfile();
    await ProfileWorkflow.typeUsername(newUsername);
    await ProfileWorkflow.typeBio(`New Bio info ${currentTimeMils}`, true);

    await expect(ProfilePage.spanSavedFlag).toBeDisplayed();
    expect(await browser.getUrl()).toContain(newUsername);
  });

  it('should create new board from dashboard', async () => {
    await NavigationBarPage.btnCreateMenu.click();
    await BoardModalWorkflow.createBoard(BOARD_TITLE);

    await expect(BoardPage.boardNameDisplay).toHaveText(BOARD_TITLE);
    expect(await browser.getTitle()).toHaveText(BOARD_TITLE);
  });

  it('should search for existing board', async () => {
    await NavigationBarWorkflow.typeInSearch(BOARD_TITLE);
    await browser.waitUntil(
      async () => (await NavigationBarPage.listBoardsFound).length > 0,
      {
        timeout: 1000,
        timeoutMsg:
          'Expected at least one board to be found, but none appeared',
      }
    );
    const found = await NavigationBarPage.listBoardsFound;
    const boardFound = await NavigationBarWorkflow.searchBoardFound(
      BOARD_TITLE
    );

    await expect(found).toHaveLength(1);
    await expect(boardFound).toBeExisting();
  });

  it(`should create new list from board ${BOARD_TITLE}`, async () => {
    await browser.keys('Escape');
    await BoardWorkflow.createList(LIST_NAME);

    await expect(BoardPage.searchListName(LIST_NAME)).toBeExisting();
  });

  it('should create a new card', async () => {
    await browser.pause(500);
    await BoardWorkflow.createCardInList(LIST_NAME, CARDS[0]);

    await expect(BoardPage.linkCard(CARDS[0])).toBeExisting();
  });

  it('should filter cards by due date', async () => {
    await BoardWorkflow.createCardInList(LIST_NAME, CARDS[1]);

    await BoardPage.linkCard(CARDS[0]).click();
    await BoardWorkflow.setDateDueDate(formatDateToMDY(new Date()), false);
    await BoardWorkflow.setTimeDueDate(addMinutesToCurrentTime(1));
    await BoardPage.linkCard(CARDS[1]).click();
    await BoardWorkflow.setDateDueDate(addDaysToGivenDate(3, new Date()));

    await BoardWorkflow.selectFilterDueDate('Due in the next day');
    await BoardPage.headerSubtitleInList(LIST_NAME).waitForDisplayed();

    await expect(BoardPage.headerSubtitleInList(LIST_NAME)).toHaveText(
      '1 card matches filters'
    );
  });

  it('should edit workspace name', async () => {
    await DashboardWorkflow.goToSettings();
    await WorkspaceSettingsPage.btnEditName.click();

    await WorkspaceSettingsWorkflow.typeWorkspaceName(NEW_WORKSPACE_NAME);
    await DashboardWorkflow.goToSettings();

    await expect(
      WorkspaceSettingsPage.workspaceTitle(NEW_WORKSPACE_NAME)
    ).toBeExisting();
  });

  after(async () => {
    try {
      await DashboardWorkflow.closeBoard(BOARD_TITLE);
    } catch (error) {
      console.warn(`Cannot delete board created: ${BOARD_TITLE}`);
    }
  });
});
