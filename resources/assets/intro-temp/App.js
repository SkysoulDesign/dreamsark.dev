/**
 * Caption
 *
 * a = {}.active
 * e = Engine
 * E = Engine.elements
 * c = Configs
 */

/**
 * Set External Dependencies
 */
global.THREE = require('THREE');

/**
 * Get Engine
 */
global.Engine = require('./Engine')().init();

//var trigger = document.querySelector('#trigger');
//    trigger.addEventListener('click', Engine.start);