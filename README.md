# TAF-wdio-trello

Test Automation Framework for Trello Website in WebDriverIO

## How to run tests

> Note: Please install the browser you will run the tests, also be sure to have the driver updated

First install dependencies

```
npm install
```

Second you need to create a Trello account and setup to be ready to work. (The tests will create and try to close the new boards).

Third you need to create `.env` file in root with information of account

```
TRELLO_EMAIL="example@email.com"
TRELLO_PASSWORD="your_password"
```

Then type

```
npx wdio run wdio.conf.js
```
