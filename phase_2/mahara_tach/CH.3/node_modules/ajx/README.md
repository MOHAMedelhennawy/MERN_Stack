# ajx

[![npm version](https://img.shields.io/npm/v/ajx.svg)](https://www.npmjs.com/package/ajx)
[![Downloads/month](https://img.shields.io/npm/dm/ajx.svg)](http://www.npmtrends.com/ajx)
[![Build Status](https://travis-ci.org/mysticatea/ajx.svg?branch=master)](https://travis-ci.org/mysticatea/ajx)
[![Dependency Status](https://david-dm.org/mysticatea/ajx.svg)](https://david-dm.org/mysticatea/ajx)

Simple fetch library for me.

## 💿 Installation

Use npm.

    $ npm install --save ajx

## 📖 Usage

API reference is [/docs](https://mysticatea.github.io/ajx/).

```js
const ajx = require("ajx")

async showExampleCom() {
    // Send a HTTP GET request.
    const html = await ajx.get("http://example.com/")
    console.log(html)
}

showExampleCom()
```

The requests are cancellable.

```js
const ajx = require("ajx")

async showExampleCom(cancelToken) {
    const html = await ajx.get("http://example.com/", {cancelToken})
    console.log(html)
}

const ct = ajx.CancelToken.new()
showExampleCom(ct).catch(error => {
    if (ajx.isCancel(error)) {
        console.log("canceled:", error.message)
    } else {
        console.error("some errors:", error.message)
    }
})
ct.cancel("some reason")
```

## 📰 Changelog

- [GitHub Releases](https://github.com/mysticatea/ajx/releases)

## 💪 Contributing

Welcome contributing!

Please use GitHub's Issues/PRs.

### Development Tools

- `npm test` runs tests.
- `npm run docs` opens the current documents by your default browser.
- `npm run update-docs` generates documents from the current source code.
- `npm run watch` runs tests and measures coverage when source code are changed.
