(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

var App = function () {
    function App() {}
    // let ripple = new Ripple();
    // console.log(Vue);

    /**
     * Document Ready
     * @returns {Promise<T>|Promise}
     */
    App.prototype.ready = function () {
        var _this = this;
        return new Promise(function (resolve) {
            return document.addEventListener('DOMContentLoaded', function () {
                return resolve(_this);
            });
        });
    };
    return App;
}();
exports.App = App;
var app = new App();
app.ready().then(function (application) {
    // new Vue({
    //     el:'#app-root',
    //     template: require('./templates/segment.html'),
    //     data: {
    //         test: 'as world'
    //     },
    //
    // });
});


},{}]},{},[1]);

//# sourceMappingURL=App.js.map
