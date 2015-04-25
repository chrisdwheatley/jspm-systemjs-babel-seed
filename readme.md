# [JSPM](http://jspm.io/), [SystemJS](https://github.com/systemjs/systemjs), [Babel](http://babeljs.io/) Seed

A JSPM initialised repository with sane defaults.

### Features

* Babel for transpilation
* Simplified Web Starter Kit index page
* Main module ready for ES6 imports

### TODO

* [Hot module replacement](https://github.com/geelen/jspm-server)
* [Standard](https://github.com/feross/standard)(?)
* Production workflow
* Tests workflow

### Getting Started

Clone the repository (into a renamed directory if desired):

`git clone git@github.com:swirlycheetah/jspm-systemjs-babel-seed.git your-project-name`

Change to the new directory:

`cd your-project-name`

Install the project dependencies:

`npm install && jspm install`

Start the server:

`./node_modules/.bin/live-server --open=src`

Navigate to `http://127.0.0.1:8080/src/` if `live-server` did not do so for you.

### License

Released under the MIT license: [opensource.org/licenses/MIT](http://opensource.org/licenses/MIT)
