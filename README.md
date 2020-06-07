# Meteor+Vue SSR and `vue-meta`

> reproducing the 500 error bug with `vue-meta@2.3.4`, see: https://github.com/nuxt/vue-meta/pull/569

## Prerequisites


* [Git](https://git-scm.com/);
* [Meteor](https://www.meteor.com/).

## Installation

Clone project with Git submodules:

```
git clone --recurse-submodules https://github.com/mrauhu/meteor-ssr-vue-meta
```

```
cd meteor-ssr-vue-meta
```

## Select the tag

### `vue-meta@2.3.3` — works

```sh
git checkout vue-meta@2.3.3
meteor npm install
```

### `vue-meta@2.3.4` — broken

```sh
git checkout vue-meta@2.3.4
meteor npm install
```

On the first server reload (after change any `*.js` or `*.vue` file) get the 500 error with message:
`document is not defined`

## Usage

```
meteor
```

