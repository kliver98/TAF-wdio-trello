# TAF-wdio-trello

Test Automation Framework for Trello Website in WebDriverIO

## How to run tests

> Note: Please install the browser you will run the tests, also be sure to have the driver updated

First install dependencies

```
npm install
```

Second you need to create a Trello account (please create and do not use an old one) and setup to be ready to work with default workspace and Board (The tests will create and close the new boards).

Third you need to create `.env` file in root with information of recently created account

```
TRELLO_USERNAME="example@email.com"
TRELLO_PASSWORD="your_password"
TRELLO_USERNAME="usernameWithout@"
```

Then type

```
HEADLESS=true BROWSER=chrome npx wdio run wdio.conf.js
```

You can set HEADLESS to [true or false] and BROWSER to [safari, chrome or firefox]
