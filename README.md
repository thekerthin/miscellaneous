# `@kerthin/miscellaneous`

Kerthin as a Software project has many helpers which are distributed on mini packages within this monorepo managed by [lerna](https://lerna.js.org/).

## Dependencies

Install [lerna](https://lerna.js.org/) globally on you local machine.

```sh
$ npm i lerna -g
```

On the other hand you can use [npx](https://github.com/npm/npx#readme)

```sh
$ npx lerna <commands>
```

## Setup

```sh
$ yarn
$ lerna bootstrap
$ lerna run build
$ lerna exec yarn link
```

## Internal commands

```sh
$ lerna run lint
$ lerna run test
$ lerna run build
```

## `packages`

- [@kerthin/microservice](https://github.com/thekerthin/miscellaneous/tree/master/packages/microservice)
- [@kerthin/security](https://github.com/thekerthin/miscellaneous/tree/master/packages/security)
- [@kerthin/utils](https://github.com/thekerthin/miscellaneous/tree/master/packages/utils)
