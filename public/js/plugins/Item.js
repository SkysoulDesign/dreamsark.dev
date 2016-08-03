/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.l = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// identity function for calling harmory imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };

/******/ 	// define getter function for harmory exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		Object.defineProperty(exports, name, {
/******/ 			configurable: false,
/******/ 			enumerable: true,
/******/ 			get: getter
/******/ 		});
/******/ 	};

/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};

/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */,
/* 1 */
/***/ function(module, exports) {

eval("throw new Error(\"Module build failed: SyntaxError: 'return' outside of function (258:8)\\n    at Parser.pp$4.raise (/Users/Milewski/Documents/Rafael/Code/dreamsark.dev/node_modules/buble/node_modules/acorn/dist/acorn.js:2221:15)\\n    at Parser.pp$1.parseReturnStatement (/Users/Milewski/Documents/Rafael/Code/dreamsark.dev/node_modules/buble/node_modules/acorn/dist/acorn.js:831:12)\\n    at Parser.pp$1.parseStatement (/Users/Milewski/Documents/Rafael/Code/dreamsark.dev/node_modules/buble/node_modules/acorn/dist/acorn.js:699:34)\\n    at Parser.pp$1.parseBlock (/Users/Milewski/Documents/Rafael/Code/dreamsark.dev/node_modules/buble/node_modules/acorn/dist/acorn.js:981:25)\\n    at Parser.pp$1.parseStatement (/Users/Milewski/Documents/Rafael/Code/dreamsark.dev/node_modules/buble/node_modules/acorn/dist/acorn.js:709:33)\\n    at Parser.pp$1.parseIfStatement (/Users/Milewski/Documents/Rafael/Code/dreamsark.dev/node_modules/buble/node_modules/acorn/dist/acorn.js:824:28)\\n    at Parser.pp$1.parseStatement (/Users/Milewski/Documents/Rafael/Code/dreamsark.dev/node_modules/buble/node_modules/acorn/dist/acorn.js:698:30)\\n    at Parser.pp$1.parseBlock (/Users/Milewski/Documents/Rafael/Code/dreamsark.dev/node_modules/buble/node_modules/acorn/dist/acorn.js:981:25)\\n    at Parser.pp$1.parseStatement (/Users/Milewski/Documents/Rafael/Code/dreamsark.dev/node_modules/buble/node_modules/acorn/dist/acorn.js:709:33)\\n    at Parser.pp$1.parseTopLevel (/Users/Milewski/Documents/Rafael/Code/dreamsark.dev/node_modules/buble/node_modules/acorn/dist/acorn.js:638:25)\");//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiMS5qcyIsInNvdXJjZXMiOltdLCJtYXBwaW5ncyI6IiIsInNvdXJjZVJvb3QiOiIifQ==");

/***/ }
/******/ ]);