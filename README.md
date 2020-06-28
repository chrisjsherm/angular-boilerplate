# Angular Boilerplate

A boilerplate template for Angular projects.

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 9.1.4.

## Development

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Tests

Test files sit in the same directory as their corresponding source files. The
test filename should match the source filename with the addition of `.spec` e.g.
`app.ts` would have an `app.spec.ts` test file. This project uses the
[Jasmine test framework](https://jasmine.github.io/) and the
[Karma test runner](https://karma-runner.github.io/latest/index.html).
Configuration for Jasmine and Karma exists in the `karma.conf.js` file.

To execute tests, run `npm test`. To execute tests in watch mode, run
`npm test`.

To execute tests in a headless environment, run `npm test:cli`.

## Linting

We utilize [TSLint](https://palantir.github.io/tslint/) to find problems
and enforce rules. We use TSLint instead of ESLint because, as of Angular 9,
the Angular CLI still uses TSLint. Eventually Angular will migrate to
[ESLint](https://eslint.org/). We use the [Prettier](https://prettier.io/) ESLint plugin to format code. Both tools
fix problems automatically when possible.

Configuration for TSLint exists in the `tslint.json` file. The configuration
includes plugins to support linting TypeScript and JSDoc comments, as well as
integration with Prettier. These plugins are NPM packages.
Configuration for Prettier exists in the `.prettierrc.js` file.

To execute the linter, run `npm run lint`.

For VS Code users, install the `dbaeumer.vscode-eslint` and
`esbenp.prettier-vscode` VS Code extensions to lint as you code.

## Git hooks

To enhance code quality, the [Husky Git hook library](https://github.com/typicode/husky)
runs linting and test scripts upon the execution of certain Git commands.
Configuration for Husky exists in the `.huskyrc.js` file.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
