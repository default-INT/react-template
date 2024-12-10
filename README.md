# React App Template
[![Node.js Version](https://img.shields.io/badge/Node.js-v20.10.0-green.svg)](https://nodejs.org/)

## How to run

- `npm i`
- `npm start`
- Go to `localhost:3000`
- ✨Magic ✨
- P.S. For receive api server url, you could run with `npm start -- --env=proxy=https://some.api.com`

## How to lint

`npm run tsc` - run ts check

`npm run lint` - run eslint check

`npm run lint:fix` - run eslint and fix errors

## How to build

`npm run build`

`npm run build:dev` - Build app for dev build

## About project

This initial config for fast project start. 

In this fast setup we use:

- Prepared `webpack.config.js`, which setup:
    - Essential loaders (e.g., `babel-loader`, `style-loader`, `css-loader`).
    - Plugins for optimization and bundling (e.g., `HtmlWebpackPlugin`).
    - Configuration for development (`webpack-dev-server`) and production builds.
    - Svgr loader for SVG imports in DOM-tree
    - Root alias
- Prepared `tsconfig.js`, with init configuration
- Configuration for linting:
  - Recommended `eslint` config, which extended from `airbnb` and synced with ts rules
  - Recommended `stylelint` config
