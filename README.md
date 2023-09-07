# playwright-test-software
Project to explore Playwright.dev in e2e tests and some plugins such as allure-playwright, faker, etc. All tests were built to run against a simple web application in the teste-software repository. 


## Requeriments 
- [NodeJS](https://nodejs.org/) v20.3.1
- [Yarn](https://yarnpkg.com/getting-started) 1.22.19+
- NPM 9.6.7+
- [PlayWright](https://playwright.dev/) 1.3.7


## Environment
The environment is defined in the `.env` file, currently we are supporing __test__ and __prod__ environments.
So, before you run, you must define the target environment and setup the data int the `config.json` file.


## Run
Beyond the web app running you can run the command:
> `npm run test`

### Clean generated files
`npm` run clean

### Compile
> Yarn: `yarn` build
> NPM: `npm` run build

### Allure Reports
> #### Generate
`npm` run allure:generate

> ### Open report
`npm` run allure:open

> ### All in one
>If you want to run just one command you can use
`npm` run allure 