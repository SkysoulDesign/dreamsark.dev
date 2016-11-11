/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var Plugins_1 = __webpack_require__(1);
	window['dreamsark'].exposes({
	    Chart: __webpack_require__(68)
	});
	var Chart = (function (_super) {
	    __extends(Chart, _super);
	    function Chart() {
	        _super.call(this);
	    }
	    return Chart;
	}(Plugins_1.Plugins));
	exports.Chart = Chart;
	/**
	 * Auto install itself
	 */
	window['dreamsark'].install({
	    Chart: Chart
	});
	//# sourceMappingURL=Chart.js.map

/***/ },

/***/ 1:
/***/ function(module, exports) {

	"use strict";
	var Plugins = (function () {
	    function Plugins() {
	        this.exposes = {};
	    }
	    Plugins.prototype.install = function () {
	    };
	    return Plugins;
	}());
	exports.Plugins = Plugins;
	//# sourceMappingURL=Plugins.js.map

/***/ },

/***/ 68:
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/**!
	 * easy-pie-chart
	 * Lightweight plugin to render simple, animated and retina optimized pie charts
	 *
	 * @license 
	 * @author Robert Fleischmann <rendro87@gmail.com> (http://robert-fleischmann.de)
	 * @version 2.1.7
	 **/
	
	(function (root, factory) {
	  if (true) {
	    // AMD. Register as an anonymous module unless amdModuleId is set
	    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function () {
	      return (root['EasyPieChart'] = factory());
	    }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  } else if (typeof exports === 'object') {
	    // Node. Does not work with strict CommonJS, but
	    // only CommonJS-like environments that support module.exports,
	    // like Node.
	    module.exports = factory();
	  } else {
	    root['EasyPieChart'] = factory();
	  }
	}(this, function () {
	
	/**
	 * Renderer to render the chart on a canvas object
	 * @param {DOMElement} el      DOM element to host the canvas (root of the plugin)
	 * @param {object}     options options object of the plugin
	 */
	var CanvasRenderer = function(el, options) {
		var cachedBackground;
		var canvas = document.createElement('canvas');
	
		el.appendChild(canvas);
	
		if (typeof(G_vmlCanvasManager) === 'object') {
			G_vmlCanvasManager.initElement(canvas);
		}
	
		var ctx = canvas.getContext('2d');
	
		canvas.width = canvas.height = options.size;
	
		// canvas on retina devices
		var scaleBy = 1;
		if (window.devicePixelRatio > 1) {
			scaleBy = window.devicePixelRatio;
			canvas.style.width = canvas.style.height = [options.size, 'px'].join('');
			canvas.width = canvas.height = options.size * scaleBy;
			ctx.scale(scaleBy, scaleBy);
		}
	
		// move 0,0 coordinates to the center
		ctx.translate(options.size / 2, options.size / 2);
	
		// rotate canvas -90deg
		ctx.rotate((-1 / 2 + options.rotate / 180) * Math.PI);
	
		var radius = (options.size - options.lineWidth) / 2;
		if (options.scaleColor && options.scaleLength) {
			radius -= options.scaleLength + 2; // 2 is the distance between scale and bar
		}
	
		// IE polyfill for Date
		Date.now = Date.now || function() {
			return +(new Date());
		};
	
		/**
		 * Draw a circle around the center of the canvas
		 * @param {strong} color     Valid CSS color string
		 * @param {number} lineWidth Width of the line in px
		 * @param {number} percent   Percentage to draw (float between -1 and 1)
		 */
		var drawCircle = function(color, lineWidth, percent) {
			percent = Math.min(Math.max(-1, percent || 0), 1);
			var isNegative = percent <= 0 ? true : false;
	
			ctx.beginPath();
			ctx.arc(0, 0, radius, 0, Math.PI * 2 * percent, isNegative);
	
			ctx.strokeStyle = color;
			ctx.lineWidth = lineWidth;
	
			ctx.stroke();
		};
	
		/**
		 * Draw the scale of the chart
		 */
		var drawScale = function() {
			var offset;
			var length;
	
			ctx.lineWidth = 1;
			ctx.fillStyle = options.scaleColor;
	
			ctx.save();
			for (var i = 24; i > 0; --i) {
				if (i % 6 === 0) {
					length = options.scaleLength;
					offset = 0;
				} else {
					length = options.scaleLength * 0.6;
					offset = options.scaleLength - length;
				}
				ctx.fillRect(-options.size/2 + offset, 0, length, 1);
				ctx.rotate(Math.PI / 12);
			}
			ctx.restore();
		};
	
		/**
		 * Request animation frame wrapper with polyfill
		 * @return {function} Request animation frame method or timeout fallback
		 */
		var reqAnimationFrame = (function() {
			return  window.requestAnimationFrame ||
					window.webkitRequestAnimationFrame ||
					window.mozRequestAnimationFrame ||
					function(callback) {
						window.setTimeout(callback, 1000 / 60);
					};
		}());
	
		/**
		 * Draw the background of the plugin including the scale and the track
		 */
		var drawBackground = function() {
			if(options.scaleColor) drawScale();
			if(options.trackColor) drawCircle(options.trackColor, options.trackWidth || options.lineWidth, 1);
		};
	
	  /**
	    * Canvas accessor
	   */
	  this.getCanvas = function() {
	    return canvas;
	  };
	
	  /**
	    * Canvas 2D context 'ctx' accessor
	   */
	  this.getCtx = function() {
	    return ctx;
	  };
	
		/**
		 * Clear the complete canvas
		 */
		this.clear = function() {
			ctx.clearRect(options.size / -2, options.size / -2, options.size, options.size);
		};
	
		/**
		 * Draw the complete chart
		 * @param {number} percent Percent shown by the chart between -100 and 100
		 */
		this.draw = function(percent) {
			// do we need to render a background
			if (!!options.scaleColor || !!options.trackColor) {
				// getImageData and putImageData are supported
				if (ctx.getImageData && ctx.putImageData) {
					if (!cachedBackground) {
						drawBackground();
						cachedBackground = ctx.getImageData(0, 0, options.size * scaleBy, options.size * scaleBy);
					} else {
						ctx.putImageData(cachedBackground, 0, 0);
					}
				} else {
					this.clear();
					drawBackground();
				}
			} else {
				this.clear();
			}
	
			ctx.lineCap = options.lineCap;
	
			// if barcolor is a function execute it and pass the percent as a value
			var color;
			if (typeof(options.barColor) === 'function') {
				color = options.barColor(percent);
			} else {
				color = options.barColor;
			}
	
			// draw bar
			drawCircle(color, options.lineWidth, percent / 100);
		}.bind(this);
	
		/**
		 * Animate from some percent to some other percentage
		 * @param {number} from Starting percentage
		 * @param {number} to   Final percentage
		 */
		this.animate = function(from, to) {
			var startTime = Date.now();
			options.onStart(from, to);
			var animation = function() {
				var process = Math.min(Date.now() - startTime, options.animate.duration);
				var currentValue = options.easing(this, process, from, to - from, options.animate.duration);
				this.draw(currentValue);
				options.onStep(from, to, currentValue);
				if (process >= options.animate.duration) {
					options.onStop(from, to);
				} else {
					reqAnimationFrame(animation);
				}
			}.bind(this);
	
			reqAnimationFrame(animation);
		}.bind(this);
	};
	
	var EasyPieChart = function(el, opts) {
		var defaultOptions = {
			barColor: '#ef1e25',
			trackColor: '#f9f9f9',
			scaleColor: '#dfe0e0',
			scaleLength: 5,
			lineCap: 'round',
			lineWidth: 3,
			trackWidth: undefined,
			size: 110,
			rotate: 0,
			animate: {
				duration: 1000,
				enabled: true
			},
			easing: function (x, t, b, c, d) { // more can be found here: http://gsgd.co.uk/sandbox/jquery/easing/
				t = t / (d/2);
				if (t < 1) {
					return c / 2 * t * t + b;
				}
				return -c/2 * ((--t)*(t-2) - 1) + b;
			},
			onStart: function(from, to) {
				return;
			},
			onStep: function(from, to, currentValue) {
				return;
			},
			onStop: function(from, to) {
				return;
			}
		};
	
		// detect present renderer
		if (typeof(CanvasRenderer) !== 'undefined') {
			defaultOptions.renderer = CanvasRenderer;
		} else if (typeof(SVGRenderer) !== 'undefined') {
			defaultOptions.renderer = SVGRenderer;
		} else {
			throw new Error('Please load either the SVG- or the CanvasRenderer');
		}
	
		var options = {};
		var currentValue = 0;
	
		/**
		 * Initialize the plugin by creating the options object and initialize rendering
		 */
		var init = function() {
			this.el = el;
			this.options = options;
	
			// merge user options into default options
			for (var i in defaultOptions) {
				if (defaultOptions.hasOwnProperty(i)) {
					options[i] = opts && typeof(opts[i]) !== 'undefined' ? opts[i] : defaultOptions[i];
					if (typeof(options[i]) === 'function') {
						options[i] = options[i].bind(this);
					}
				}
			}
	
			// check for jQuery easing
			if (typeof(options.easing) === 'string' && typeof(jQuery) !== 'undefined' && jQuery.isFunction(jQuery.easing[options.easing])) {
				options.easing = jQuery.easing[options.easing];
			} else {
				options.easing = defaultOptions.easing;
			}
	
			// process earlier animate option to avoid bc breaks
			if (typeof(options.animate) === 'number') {
				options.animate = {
					duration: options.animate,
					enabled: true
				};
			}
	
			if (typeof(options.animate) === 'boolean' && !options.animate) {
				options.animate = {
					duration: 1000,
					enabled: options.animate
				};
			}
	
			// create renderer
			this.renderer = new options.renderer(el, options);
	
			// initial draw
			this.renderer.draw(currentValue);
	
			// initial update
			if (el.dataset && el.dataset.percent) {
				this.update(parseFloat(el.dataset.percent));
			} else if (el.getAttribute && el.getAttribute('data-percent')) {
				this.update(parseFloat(el.getAttribute('data-percent')));
			}
		}.bind(this);
	
		/**
		 * Update the value of the chart
		 * @param  {number} newValue Number between 0 and 100
		 * @return {object}          Instance of the plugin for method chaining
		 */
		this.update = function(newValue) {
			newValue = parseFloat(newValue);
			if (options.animate.enabled) {
				this.renderer.animate(currentValue, newValue);
			} else {
				this.renderer.draw(newValue);
			}
			currentValue = newValue;
			return this;
		}.bind(this);
	
		/**
		 * Disable animation
		 * @return {object} Instance of the plugin for method chaining
		 */
		this.disableAnimation = function() {
			options.animate.enabled = false;
			return this;
		};
	
		/**
		 * Enable animation
		 * @return {object} Instance of the plugin for method chaining
		 */
		this.enableAnimation = function() {
			options.animate.enabled = true;
			return this;
		};
	
		init();
	};
	
	return EasyPieChart;
	
	}));


/***/ }

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgYzYwOGYzOGU4MjJkMzNkZTNlZmU/OWZlZCIsIndlYnBhY2s6Ly8vLi9yZXNvdXJjZXMvYXNzZXRzL3R5cGVzY3JpcHQvUGx1Z2lucy9DaGFydC5qcyIsIndlYnBhY2s6Ly8vLi9yZXNvdXJjZXMvYXNzZXRzL3R5cGVzY3JpcHQvQWJzdHJhY3QvUGx1Z2lucy5qcz8zNTIxIiwid2VicGFjazovLy8uL34vZWFzeS1waWUtY2hhcnQvZGlzdC9lYXN5cGllY2hhcnQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHVCQUFlO0FBQ2Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7O0FDdENBO0FBQ0E7QUFDQTtBQUNBLG9CQUFtQixzQkFBc0I7QUFDekM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBQztBQUNELGtDOzs7Ozs7O0FDeEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFDO0FBQ0Q7QUFDQSxvQzs7Ozs7OztBQ1ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTCxJQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFHO0FBQ0g7QUFDQTtBQUNBLEVBQUM7O0FBRUQ7QUFDQTtBQUNBLFlBQVcsV0FBVztBQUN0QixZQUFXLE9BQU87QUFDbEI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxxQ0FBb0M7QUFDcEM7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGFBQVksT0FBTztBQUNuQixhQUFZLE9BQU87QUFDbkIsYUFBWSxPQUFPO0FBQ25CO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsbUJBQWtCLE9BQU87QUFDekI7QUFDQTtBQUNBO0FBQ0EsS0FBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGNBQWEsU0FBUztBQUN0QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRTs7QUFFRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsYUFBWSxPQUFPO0FBQ25CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0EsS0FBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBLElBQUc7QUFDSDtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBRztBQUNIO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEdBQUU7O0FBRUY7QUFDQTtBQUNBLGFBQVksT0FBTztBQUNuQixhQUFZLE9BQU87QUFDbkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUk7QUFDSjtBQUNBO0FBQ0EsSUFBRzs7QUFFSDtBQUNBLEdBQUU7QUFDRjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBRztBQUNILHFDQUFvQztBQUNwQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBRztBQUNIO0FBQ0E7QUFDQSxJQUFHO0FBQ0g7QUFDQTtBQUNBLElBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFFO0FBQ0Y7QUFDQSxHQUFFO0FBQ0Y7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsSUFBRztBQUNIO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxJQUFHO0FBQ0g7QUFDQTtBQUNBLEdBQUU7O0FBRUY7QUFDQTtBQUNBLGNBQWEsT0FBTztBQUNwQixjQUFhLE9BQU87QUFDcEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUU7O0FBRUY7QUFDQTtBQUNBLGNBQWEsT0FBTztBQUNwQjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxjQUFhLE9BQU87QUFDcEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBLEVBQUMiLCJmaWxlIjoiY2hhcnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0ZXhwb3J0czoge30sXG4gXHRcdFx0aWQ6IG1vZHVsZUlkLFxuIFx0XHRcdGxvYWRlZDogZmFsc2VcbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHdlYnBhY2svYm9vdHN0cmFwIGM2MDhmMzhlODIyZDMzZGUzZWZlXG4gKiovIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19leHRlbmRzID0gKHRoaXMgJiYgdGhpcy5fX2V4dGVuZHMpIHx8IGZ1bmN0aW9uIChkLCBiKSB7XG4gICAgZm9yICh2YXIgcCBpbiBiKSBpZiAoYi5oYXNPd25Qcm9wZXJ0eShwKSkgZFtwXSA9IGJbcF07XG4gICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XG4gICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xufTtcbnZhciBQbHVnaW5zXzEgPSByZXF1aXJlKFwiLi4vQWJzdHJhY3QvUGx1Z2luc1wiKTtcbndpbmRvd1snZHJlYW1zYXJrJ10uZXhwb3Nlcyh7XG4gICAgQ2hhcnQ6IHJlcXVpcmUoXCJlYXN5LXBpZS1jaGFydFwiKVxufSk7XG52YXIgQ2hhcnQgPSAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyhDaGFydCwgX3N1cGVyKTtcbiAgICBmdW5jdGlvbiBDaGFydCgpIHtcbiAgICAgICAgX3N1cGVyLmNhbGwodGhpcyk7XG4gICAgfVxuICAgIHJldHVybiBDaGFydDtcbn0oUGx1Z2luc18xLlBsdWdpbnMpKTtcbmV4cG9ydHMuQ2hhcnQgPSBDaGFydDtcbi8qKlxuICogQXV0byBpbnN0YWxsIGl0c2VsZlxuICovXG53aW5kb3dbJ2RyZWFtc2FyayddLmluc3RhbGwoe1xuICAgIENoYXJ0OiBDaGFydFxufSk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1DaGFydC5qcy5tYXBcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vcmVzb3VyY2VzL2Fzc2V0cy90eXBlc2NyaXB0L1BsdWdpbnMvQ2hhcnQuanNcbiAqKiBtb2R1bGUgaWQgPSAwXG4gKiogbW9kdWxlIGNodW5rcyA9IDFcbiAqKi8iLCJcInVzZSBzdHJpY3RcIjtcbnZhciBQbHVnaW5zID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBQbHVnaW5zKCkge1xuICAgICAgICB0aGlzLmV4cG9zZXMgPSB7fTtcbiAgICB9XG4gICAgUGx1Z2lucy5wcm90b3R5cGUuaW5zdGFsbCA9IGZ1bmN0aW9uICgpIHtcbiAgICB9O1xuICAgIHJldHVybiBQbHVnaW5zO1xufSgpKTtcbmV4cG9ydHMuUGx1Z2lucyA9IFBsdWdpbnM7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1QbHVnaW5zLmpzLm1hcFxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9yZXNvdXJjZXMvYXNzZXRzL3R5cGVzY3JpcHQvQWJzdHJhY3QvUGx1Z2lucy5qc1xuICoqIG1vZHVsZSBpZCA9IDFcbiAqKiBtb2R1bGUgY2h1bmtzID0gMCAxIDIgM1xuICoqLyIsIi8qKiFcbiAqIGVhc3ktcGllLWNoYXJ0XG4gKiBMaWdodHdlaWdodCBwbHVnaW4gdG8gcmVuZGVyIHNpbXBsZSwgYW5pbWF0ZWQgYW5kIHJldGluYSBvcHRpbWl6ZWQgcGllIGNoYXJ0c1xuICpcbiAqIEBsaWNlbnNlIFxuICogQGF1dGhvciBSb2JlcnQgRmxlaXNjaG1hbm4gPHJlbmRybzg3QGdtYWlsLmNvbT4gKGh0dHA6Ly9yb2JlcnQtZmxlaXNjaG1hbm4uZGUpXG4gKiBAdmVyc2lvbiAyLjEuN1xuICoqL1xuXG4oZnVuY3Rpb24gKHJvb3QsIGZhY3RvcnkpIHtcbiAgaWYgKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCkge1xuICAgIC8vIEFNRC4gUmVnaXN0ZXIgYXMgYW4gYW5vbnltb3VzIG1vZHVsZSB1bmxlc3MgYW1kTW9kdWxlSWQgaXMgc2V0XG4gICAgZGVmaW5lKFtdLCBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gKHJvb3RbJ0Vhc3lQaWVDaGFydCddID0gZmFjdG9yeSgpKTtcbiAgICB9KTtcbiAgfSBlbHNlIGlmICh0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcpIHtcbiAgICAvLyBOb2RlLiBEb2VzIG5vdCB3b3JrIHdpdGggc3RyaWN0IENvbW1vbkpTLCBidXRcbiAgICAvLyBvbmx5IENvbW1vbkpTLWxpa2UgZW52aXJvbm1lbnRzIHRoYXQgc3VwcG9ydCBtb2R1bGUuZXhwb3J0cyxcbiAgICAvLyBsaWtlIE5vZGUuXG4gICAgbW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KCk7XG4gIH0gZWxzZSB7XG4gICAgcm9vdFsnRWFzeVBpZUNoYXJ0J10gPSBmYWN0b3J5KCk7XG4gIH1cbn0odGhpcywgZnVuY3Rpb24gKCkge1xuXG4vKipcbiAqIFJlbmRlcmVyIHRvIHJlbmRlciB0aGUgY2hhcnQgb24gYSBjYW52YXMgb2JqZWN0XG4gKiBAcGFyYW0ge0RPTUVsZW1lbnR9IGVsICAgICAgRE9NIGVsZW1lbnQgdG8gaG9zdCB0aGUgY2FudmFzIChyb290IG9mIHRoZSBwbHVnaW4pXG4gKiBAcGFyYW0ge29iamVjdH0gICAgIG9wdGlvbnMgb3B0aW9ucyBvYmplY3Qgb2YgdGhlIHBsdWdpblxuICovXG52YXIgQ2FudmFzUmVuZGVyZXIgPSBmdW5jdGlvbihlbCwgb3B0aW9ucykge1xuXHR2YXIgY2FjaGVkQmFja2dyb3VuZDtcblx0dmFyIGNhbnZhcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2NhbnZhcycpO1xuXG5cdGVsLmFwcGVuZENoaWxkKGNhbnZhcyk7XG5cblx0aWYgKHR5cGVvZihHX3ZtbENhbnZhc01hbmFnZXIpID09PSAnb2JqZWN0Jykge1xuXHRcdEdfdm1sQ2FudmFzTWFuYWdlci5pbml0RWxlbWVudChjYW52YXMpO1xuXHR9XG5cblx0dmFyIGN0eCA9IGNhbnZhcy5nZXRDb250ZXh0KCcyZCcpO1xuXG5cdGNhbnZhcy53aWR0aCA9IGNhbnZhcy5oZWlnaHQgPSBvcHRpb25zLnNpemU7XG5cblx0Ly8gY2FudmFzIG9uIHJldGluYSBkZXZpY2VzXG5cdHZhciBzY2FsZUJ5ID0gMTtcblx0aWYgKHdpbmRvdy5kZXZpY2VQaXhlbFJhdGlvID4gMSkge1xuXHRcdHNjYWxlQnkgPSB3aW5kb3cuZGV2aWNlUGl4ZWxSYXRpbztcblx0XHRjYW52YXMuc3R5bGUud2lkdGggPSBjYW52YXMuc3R5bGUuaGVpZ2h0ID0gW29wdGlvbnMuc2l6ZSwgJ3B4J10uam9pbignJyk7XG5cdFx0Y2FudmFzLndpZHRoID0gY2FudmFzLmhlaWdodCA9IG9wdGlvbnMuc2l6ZSAqIHNjYWxlQnk7XG5cdFx0Y3R4LnNjYWxlKHNjYWxlQnksIHNjYWxlQnkpO1xuXHR9XG5cblx0Ly8gbW92ZSAwLDAgY29vcmRpbmF0ZXMgdG8gdGhlIGNlbnRlclxuXHRjdHgudHJhbnNsYXRlKG9wdGlvbnMuc2l6ZSAvIDIsIG9wdGlvbnMuc2l6ZSAvIDIpO1xuXG5cdC8vIHJvdGF0ZSBjYW52YXMgLTkwZGVnXG5cdGN0eC5yb3RhdGUoKC0xIC8gMiArIG9wdGlvbnMucm90YXRlIC8gMTgwKSAqIE1hdGguUEkpO1xuXG5cdHZhciByYWRpdXMgPSAob3B0aW9ucy5zaXplIC0gb3B0aW9ucy5saW5lV2lkdGgpIC8gMjtcblx0aWYgKG9wdGlvbnMuc2NhbGVDb2xvciAmJiBvcHRpb25zLnNjYWxlTGVuZ3RoKSB7XG5cdFx0cmFkaXVzIC09IG9wdGlvbnMuc2NhbGVMZW5ndGggKyAyOyAvLyAyIGlzIHRoZSBkaXN0YW5jZSBiZXR3ZWVuIHNjYWxlIGFuZCBiYXJcblx0fVxuXG5cdC8vIElFIHBvbHlmaWxsIGZvciBEYXRlXG5cdERhdGUubm93ID0gRGF0ZS5ub3cgfHwgZnVuY3Rpb24oKSB7XG5cdFx0cmV0dXJuICsobmV3IERhdGUoKSk7XG5cdH07XG5cblx0LyoqXG5cdCAqIERyYXcgYSBjaXJjbGUgYXJvdW5kIHRoZSBjZW50ZXIgb2YgdGhlIGNhbnZhc1xuXHQgKiBAcGFyYW0ge3N0cm9uZ30gY29sb3IgICAgIFZhbGlkIENTUyBjb2xvciBzdHJpbmdcblx0ICogQHBhcmFtIHtudW1iZXJ9IGxpbmVXaWR0aCBXaWR0aCBvZiB0aGUgbGluZSBpbiBweFxuXHQgKiBAcGFyYW0ge251bWJlcn0gcGVyY2VudCAgIFBlcmNlbnRhZ2UgdG8gZHJhdyAoZmxvYXQgYmV0d2VlbiAtMSBhbmQgMSlcblx0ICovXG5cdHZhciBkcmF3Q2lyY2xlID0gZnVuY3Rpb24oY29sb3IsIGxpbmVXaWR0aCwgcGVyY2VudCkge1xuXHRcdHBlcmNlbnQgPSBNYXRoLm1pbihNYXRoLm1heCgtMSwgcGVyY2VudCB8fCAwKSwgMSk7XG5cdFx0dmFyIGlzTmVnYXRpdmUgPSBwZXJjZW50IDw9IDAgPyB0cnVlIDogZmFsc2U7XG5cblx0XHRjdHguYmVnaW5QYXRoKCk7XG5cdFx0Y3R4LmFyYygwLCAwLCByYWRpdXMsIDAsIE1hdGguUEkgKiAyICogcGVyY2VudCwgaXNOZWdhdGl2ZSk7XG5cblx0XHRjdHguc3Ryb2tlU3R5bGUgPSBjb2xvcjtcblx0XHRjdHgubGluZVdpZHRoID0gbGluZVdpZHRoO1xuXG5cdFx0Y3R4LnN0cm9rZSgpO1xuXHR9O1xuXG5cdC8qKlxuXHQgKiBEcmF3IHRoZSBzY2FsZSBvZiB0aGUgY2hhcnRcblx0ICovXG5cdHZhciBkcmF3U2NhbGUgPSBmdW5jdGlvbigpIHtcblx0XHR2YXIgb2Zmc2V0O1xuXHRcdHZhciBsZW5ndGg7XG5cblx0XHRjdHgubGluZVdpZHRoID0gMTtcblx0XHRjdHguZmlsbFN0eWxlID0gb3B0aW9ucy5zY2FsZUNvbG9yO1xuXG5cdFx0Y3R4LnNhdmUoKTtcblx0XHRmb3IgKHZhciBpID0gMjQ7IGkgPiAwOyAtLWkpIHtcblx0XHRcdGlmIChpICUgNiA9PT0gMCkge1xuXHRcdFx0XHRsZW5ndGggPSBvcHRpb25zLnNjYWxlTGVuZ3RoO1xuXHRcdFx0XHRvZmZzZXQgPSAwO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0bGVuZ3RoID0gb3B0aW9ucy5zY2FsZUxlbmd0aCAqIDAuNjtcblx0XHRcdFx0b2Zmc2V0ID0gb3B0aW9ucy5zY2FsZUxlbmd0aCAtIGxlbmd0aDtcblx0XHRcdH1cblx0XHRcdGN0eC5maWxsUmVjdCgtb3B0aW9ucy5zaXplLzIgKyBvZmZzZXQsIDAsIGxlbmd0aCwgMSk7XG5cdFx0XHRjdHgucm90YXRlKE1hdGguUEkgLyAxMik7XG5cdFx0fVxuXHRcdGN0eC5yZXN0b3JlKCk7XG5cdH07XG5cblx0LyoqXG5cdCAqIFJlcXVlc3QgYW5pbWF0aW9uIGZyYW1lIHdyYXBwZXIgd2l0aCBwb2x5ZmlsbFxuXHQgKiBAcmV0dXJuIHtmdW5jdGlvbn0gUmVxdWVzdCBhbmltYXRpb24gZnJhbWUgbWV0aG9kIG9yIHRpbWVvdXQgZmFsbGJhY2tcblx0ICovXG5cdHZhciByZXFBbmltYXRpb25GcmFtZSA9IChmdW5jdGlvbigpIHtcblx0XHRyZXR1cm4gIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUgfHxcblx0XHRcdFx0d2luZG93LndlYmtpdFJlcXVlc3RBbmltYXRpb25GcmFtZSB8fFxuXHRcdFx0XHR3aW5kb3cubW96UmVxdWVzdEFuaW1hdGlvbkZyYW1lIHx8XG5cdFx0XHRcdGZ1bmN0aW9uKGNhbGxiYWNrKSB7XG5cdFx0XHRcdFx0d2luZG93LnNldFRpbWVvdXQoY2FsbGJhY2ssIDEwMDAgLyA2MCk7XG5cdFx0XHRcdH07XG5cdH0oKSk7XG5cblx0LyoqXG5cdCAqIERyYXcgdGhlIGJhY2tncm91bmQgb2YgdGhlIHBsdWdpbiBpbmNsdWRpbmcgdGhlIHNjYWxlIGFuZCB0aGUgdHJhY2tcblx0ICovXG5cdHZhciBkcmF3QmFja2dyb3VuZCA9IGZ1bmN0aW9uKCkge1xuXHRcdGlmKG9wdGlvbnMuc2NhbGVDb2xvcikgZHJhd1NjYWxlKCk7XG5cdFx0aWYob3B0aW9ucy50cmFja0NvbG9yKSBkcmF3Q2lyY2xlKG9wdGlvbnMudHJhY2tDb2xvciwgb3B0aW9ucy50cmFja1dpZHRoIHx8IG9wdGlvbnMubGluZVdpZHRoLCAxKTtcblx0fTtcblxuICAvKipcbiAgICAqIENhbnZhcyBhY2Nlc3NvclxuICAgKi9cbiAgdGhpcy5nZXRDYW52YXMgPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gY2FudmFzO1xuICB9O1xuXG4gIC8qKlxuICAgICogQ2FudmFzIDJEIGNvbnRleHQgJ2N0eCcgYWNjZXNzb3JcbiAgICovXG4gIHRoaXMuZ2V0Q3R4ID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIGN0eDtcbiAgfTtcblxuXHQvKipcblx0ICogQ2xlYXIgdGhlIGNvbXBsZXRlIGNhbnZhc1xuXHQgKi9cblx0dGhpcy5jbGVhciA9IGZ1bmN0aW9uKCkge1xuXHRcdGN0eC5jbGVhclJlY3Qob3B0aW9ucy5zaXplIC8gLTIsIG9wdGlvbnMuc2l6ZSAvIC0yLCBvcHRpb25zLnNpemUsIG9wdGlvbnMuc2l6ZSk7XG5cdH07XG5cblx0LyoqXG5cdCAqIERyYXcgdGhlIGNvbXBsZXRlIGNoYXJ0XG5cdCAqIEBwYXJhbSB7bnVtYmVyfSBwZXJjZW50IFBlcmNlbnQgc2hvd24gYnkgdGhlIGNoYXJ0IGJldHdlZW4gLTEwMCBhbmQgMTAwXG5cdCAqL1xuXHR0aGlzLmRyYXcgPSBmdW5jdGlvbihwZXJjZW50KSB7XG5cdFx0Ly8gZG8gd2UgbmVlZCB0byByZW5kZXIgYSBiYWNrZ3JvdW5kXG5cdFx0aWYgKCEhb3B0aW9ucy5zY2FsZUNvbG9yIHx8ICEhb3B0aW9ucy50cmFja0NvbG9yKSB7XG5cdFx0XHQvLyBnZXRJbWFnZURhdGEgYW5kIHB1dEltYWdlRGF0YSBhcmUgc3VwcG9ydGVkXG5cdFx0XHRpZiAoY3R4LmdldEltYWdlRGF0YSAmJiBjdHgucHV0SW1hZ2VEYXRhKSB7XG5cdFx0XHRcdGlmICghY2FjaGVkQmFja2dyb3VuZCkge1xuXHRcdFx0XHRcdGRyYXdCYWNrZ3JvdW5kKCk7XG5cdFx0XHRcdFx0Y2FjaGVkQmFja2dyb3VuZCA9IGN0eC5nZXRJbWFnZURhdGEoMCwgMCwgb3B0aW9ucy5zaXplICogc2NhbGVCeSwgb3B0aW9ucy5zaXplICogc2NhbGVCeSk7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0Y3R4LnB1dEltYWdlRGF0YShjYWNoZWRCYWNrZ3JvdW5kLCAwLCAwKTtcblx0XHRcdFx0fVxuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0dGhpcy5jbGVhcigpO1xuXHRcdFx0XHRkcmF3QmFja2dyb3VuZCgpO1xuXHRcdFx0fVxuXHRcdH0gZWxzZSB7XG5cdFx0XHR0aGlzLmNsZWFyKCk7XG5cdFx0fVxuXG5cdFx0Y3R4LmxpbmVDYXAgPSBvcHRpb25zLmxpbmVDYXA7XG5cblx0XHQvLyBpZiBiYXJjb2xvciBpcyBhIGZ1bmN0aW9uIGV4ZWN1dGUgaXQgYW5kIHBhc3MgdGhlIHBlcmNlbnQgYXMgYSB2YWx1ZVxuXHRcdHZhciBjb2xvcjtcblx0XHRpZiAodHlwZW9mKG9wdGlvbnMuYmFyQ29sb3IpID09PSAnZnVuY3Rpb24nKSB7XG5cdFx0XHRjb2xvciA9IG9wdGlvbnMuYmFyQ29sb3IocGVyY2VudCk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdGNvbG9yID0gb3B0aW9ucy5iYXJDb2xvcjtcblx0XHR9XG5cblx0XHQvLyBkcmF3IGJhclxuXHRcdGRyYXdDaXJjbGUoY29sb3IsIG9wdGlvbnMubGluZVdpZHRoLCBwZXJjZW50IC8gMTAwKTtcblx0fS5iaW5kKHRoaXMpO1xuXG5cdC8qKlxuXHQgKiBBbmltYXRlIGZyb20gc29tZSBwZXJjZW50IHRvIHNvbWUgb3RoZXIgcGVyY2VudGFnZVxuXHQgKiBAcGFyYW0ge251bWJlcn0gZnJvbSBTdGFydGluZyBwZXJjZW50YWdlXG5cdCAqIEBwYXJhbSB7bnVtYmVyfSB0byAgIEZpbmFsIHBlcmNlbnRhZ2Vcblx0ICovXG5cdHRoaXMuYW5pbWF0ZSA9IGZ1bmN0aW9uKGZyb20sIHRvKSB7XG5cdFx0dmFyIHN0YXJ0VGltZSA9IERhdGUubm93KCk7XG5cdFx0b3B0aW9ucy5vblN0YXJ0KGZyb20sIHRvKTtcblx0XHR2YXIgYW5pbWF0aW9uID0gZnVuY3Rpb24oKSB7XG5cdFx0XHR2YXIgcHJvY2VzcyA9IE1hdGgubWluKERhdGUubm93KCkgLSBzdGFydFRpbWUsIG9wdGlvbnMuYW5pbWF0ZS5kdXJhdGlvbik7XG5cdFx0XHR2YXIgY3VycmVudFZhbHVlID0gb3B0aW9ucy5lYXNpbmcodGhpcywgcHJvY2VzcywgZnJvbSwgdG8gLSBmcm9tLCBvcHRpb25zLmFuaW1hdGUuZHVyYXRpb24pO1xuXHRcdFx0dGhpcy5kcmF3KGN1cnJlbnRWYWx1ZSk7XG5cdFx0XHRvcHRpb25zLm9uU3RlcChmcm9tLCB0bywgY3VycmVudFZhbHVlKTtcblx0XHRcdGlmIChwcm9jZXNzID49IG9wdGlvbnMuYW5pbWF0ZS5kdXJhdGlvbikge1xuXHRcdFx0XHRvcHRpb25zLm9uU3RvcChmcm9tLCB0byk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRyZXFBbmltYXRpb25GcmFtZShhbmltYXRpb24pO1xuXHRcdFx0fVxuXHRcdH0uYmluZCh0aGlzKTtcblxuXHRcdHJlcUFuaW1hdGlvbkZyYW1lKGFuaW1hdGlvbik7XG5cdH0uYmluZCh0aGlzKTtcbn07XG5cbnZhciBFYXN5UGllQ2hhcnQgPSBmdW5jdGlvbihlbCwgb3B0cykge1xuXHR2YXIgZGVmYXVsdE9wdGlvbnMgPSB7XG5cdFx0YmFyQ29sb3I6ICcjZWYxZTI1Jyxcblx0XHR0cmFja0NvbG9yOiAnI2Y5ZjlmOScsXG5cdFx0c2NhbGVDb2xvcjogJyNkZmUwZTAnLFxuXHRcdHNjYWxlTGVuZ3RoOiA1LFxuXHRcdGxpbmVDYXA6ICdyb3VuZCcsXG5cdFx0bGluZVdpZHRoOiAzLFxuXHRcdHRyYWNrV2lkdGg6IHVuZGVmaW5lZCxcblx0XHRzaXplOiAxMTAsXG5cdFx0cm90YXRlOiAwLFxuXHRcdGFuaW1hdGU6IHtcblx0XHRcdGR1cmF0aW9uOiAxMDAwLFxuXHRcdFx0ZW5hYmxlZDogdHJ1ZVxuXHRcdH0sXG5cdFx0ZWFzaW5nOiBmdW5jdGlvbiAoeCwgdCwgYiwgYywgZCkgeyAvLyBtb3JlIGNhbiBiZSBmb3VuZCBoZXJlOiBodHRwOi8vZ3NnZC5jby51ay9zYW5kYm94L2pxdWVyeS9lYXNpbmcvXG5cdFx0XHR0ID0gdCAvIChkLzIpO1xuXHRcdFx0aWYgKHQgPCAxKSB7XG5cdFx0XHRcdHJldHVybiBjIC8gMiAqIHQgKiB0ICsgYjtcblx0XHRcdH1cblx0XHRcdHJldHVybiAtYy8yICogKCgtLXQpKih0LTIpIC0gMSkgKyBiO1xuXHRcdH0sXG5cdFx0b25TdGFydDogZnVuY3Rpb24oZnJvbSwgdG8pIHtcblx0XHRcdHJldHVybjtcblx0XHR9LFxuXHRcdG9uU3RlcDogZnVuY3Rpb24oZnJvbSwgdG8sIGN1cnJlbnRWYWx1ZSkge1xuXHRcdFx0cmV0dXJuO1xuXHRcdH0sXG5cdFx0b25TdG9wOiBmdW5jdGlvbihmcm9tLCB0bykge1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblx0fTtcblxuXHQvLyBkZXRlY3QgcHJlc2VudCByZW5kZXJlclxuXHRpZiAodHlwZW9mKENhbnZhc1JlbmRlcmVyKSAhPT0gJ3VuZGVmaW5lZCcpIHtcblx0XHRkZWZhdWx0T3B0aW9ucy5yZW5kZXJlciA9IENhbnZhc1JlbmRlcmVyO1xuXHR9IGVsc2UgaWYgKHR5cGVvZihTVkdSZW5kZXJlcikgIT09ICd1bmRlZmluZWQnKSB7XG5cdFx0ZGVmYXVsdE9wdGlvbnMucmVuZGVyZXIgPSBTVkdSZW5kZXJlcjtcblx0fSBlbHNlIHtcblx0XHR0aHJvdyBuZXcgRXJyb3IoJ1BsZWFzZSBsb2FkIGVpdGhlciB0aGUgU1ZHLSBvciB0aGUgQ2FudmFzUmVuZGVyZXInKTtcblx0fVxuXG5cdHZhciBvcHRpb25zID0ge307XG5cdHZhciBjdXJyZW50VmFsdWUgPSAwO1xuXG5cdC8qKlxuXHQgKiBJbml0aWFsaXplIHRoZSBwbHVnaW4gYnkgY3JlYXRpbmcgdGhlIG9wdGlvbnMgb2JqZWN0IGFuZCBpbml0aWFsaXplIHJlbmRlcmluZ1xuXHQgKi9cblx0dmFyIGluaXQgPSBmdW5jdGlvbigpIHtcblx0XHR0aGlzLmVsID0gZWw7XG5cdFx0dGhpcy5vcHRpb25zID0gb3B0aW9ucztcblxuXHRcdC8vIG1lcmdlIHVzZXIgb3B0aW9ucyBpbnRvIGRlZmF1bHQgb3B0aW9uc1xuXHRcdGZvciAodmFyIGkgaW4gZGVmYXVsdE9wdGlvbnMpIHtcblx0XHRcdGlmIChkZWZhdWx0T3B0aW9ucy5oYXNPd25Qcm9wZXJ0eShpKSkge1xuXHRcdFx0XHRvcHRpb25zW2ldID0gb3B0cyAmJiB0eXBlb2Yob3B0c1tpXSkgIT09ICd1bmRlZmluZWQnID8gb3B0c1tpXSA6IGRlZmF1bHRPcHRpb25zW2ldO1xuXHRcdFx0XHRpZiAodHlwZW9mKG9wdGlvbnNbaV0pID09PSAnZnVuY3Rpb24nKSB7XG5cdFx0XHRcdFx0b3B0aW9uc1tpXSA9IG9wdGlvbnNbaV0uYmluZCh0aGlzKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblxuXHRcdC8vIGNoZWNrIGZvciBqUXVlcnkgZWFzaW5nXG5cdFx0aWYgKHR5cGVvZihvcHRpb25zLmVhc2luZykgPT09ICdzdHJpbmcnICYmIHR5cGVvZihqUXVlcnkpICE9PSAndW5kZWZpbmVkJyAmJiBqUXVlcnkuaXNGdW5jdGlvbihqUXVlcnkuZWFzaW5nW29wdGlvbnMuZWFzaW5nXSkpIHtcblx0XHRcdG9wdGlvbnMuZWFzaW5nID0galF1ZXJ5LmVhc2luZ1tvcHRpb25zLmVhc2luZ107XG5cdFx0fSBlbHNlIHtcblx0XHRcdG9wdGlvbnMuZWFzaW5nID0gZGVmYXVsdE9wdGlvbnMuZWFzaW5nO1xuXHRcdH1cblxuXHRcdC8vIHByb2Nlc3MgZWFybGllciBhbmltYXRlIG9wdGlvbiB0byBhdm9pZCBiYyBicmVha3Ncblx0XHRpZiAodHlwZW9mKG9wdGlvbnMuYW5pbWF0ZSkgPT09ICdudW1iZXInKSB7XG5cdFx0XHRvcHRpb25zLmFuaW1hdGUgPSB7XG5cdFx0XHRcdGR1cmF0aW9uOiBvcHRpb25zLmFuaW1hdGUsXG5cdFx0XHRcdGVuYWJsZWQ6IHRydWVcblx0XHRcdH07XG5cdFx0fVxuXG5cdFx0aWYgKHR5cGVvZihvcHRpb25zLmFuaW1hdGUpID09PSAnYm9vbGVhbicgJiYgIW9wdGlvbnMuYW5pbWF0ZSkge1xuXHRcdFx0b3B0aW9ucy5hbmltYXRlID0ge1xuXHRcdFx0XHRkdXJhdGlvbjogMTAwMCxcblx0XHRcdFx0ZW5hYmxlZDogb3B0aW9ucy5hbmltYXRlXG5cdFx0XHR9O1xuXHRcdH1cblxuXHRcdC8vIGNyZWF0ZSByZW5kZXJlclxuXHRcdHRoaXMucmVuZGVyZXIgPSBuZXcgb3B0aW9ucy5yZW5kZXJlcihlbCwgb3B0aW9ucyk7XG5cblx0XHQvLyBpbml0aWFsIGRyYXdcblx0XHR0aGlzLnJlbmRlcmVyLmRyYXcoY3VycmVudFZhbHVlKTtcblxuXHRcdC8vIGluaXRpYWwgdXBkYXRlXG5cdFx0aWYgKGVsLmRhdGFzZXQgJiYgZWwuZGF0YXNldC5wZXJjZW50KSB7XG5cdFx0XHR0aGlzLnVwZGF0ZShwYXJzZUZsb2F0KGVsLmRhdGFzZXQucGVyY2VudCkpO1xuXHRcdH0gZWxzZSBpZiAoZWwuZ2V0QXR0cmlidXRlICYmIGVsLmdldEF0dHJpYnV0ZSgnZGF0YS1wZXJjZW50JykpIHtcblx0XHRcdHRoaXMudXBkYXRlKHBhcnNlRmxvYXQoZWwuZ2V0QXR0cmlidXRlKCdkYXRhLXBlcmNlbnQnKSkpO1xuXHRcdH1cblx0fS5iaW5kKHRoaXMpO1xuXG5cdC8qKlxuXHQgKiBVcGRhdGUgdGhlIHZhbHVlIG9mIHRoZSBjaGFydFxuXHQgKiBAcGFyYW0gIHtudW1iZXJ9IG5ld1ZhbHVlIE51bWJlciBiZXR3ZWVuIDAgYW5kIDEwMFxuXHQgKiBAcmV0dXJuIHtvYmplY3R9ICAgICAgICAgIEluc3RhbmNlIG9mIHRoZSBwbHVnaW4gZm9yIG1ldGhvZCBjaGFpbmluZ1xuXHQgKi9cblx0dGhpcy51cGRhdGUgPSBmdW5jdGlvbihuZXdWYWx1ZSkge1xuXHRcdG5ld1ZhbHVlID0gcGFyc2VGbG9hdChuZXdWYWx1ZSk7XG5cdFx0aWYgKG9wdGlvbnMuYW5pbWF0ZS5lbmFibGVkKSB7XG5cdFx0XHR0aGlzLnJlbmRlcmVyLmFuaW1hdGUoY3VycmVudFZhbHVlLCBuZXdWYWx1ZSk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHRoaXMucmVuZGVyZXIuZHJhdyhuZXdWYWx1ZSk7XG5cdFx0fVxuXHRcdGN1cnJlbnRWYWx1ZSA9IG5ld1ZhbHVlO1xuXHRcdHJldHVybiB0aGlzO1xuXHR9LmJpbmQodGhpcyk7XG5cblx0LyoqXG5cdCAqIERpc2FibGUgYW5pbWF0aW9uXG5cdCAqIEByZXR1cm4ge29iamVjdH0gSW5zdGFuY2Ugb2YgdGhlIHBsdWdpbiBmb3IgbWV0aG9kIGNoYWluaW5nXG5cdCAqL1xuXHR0aGlzLmRpc2FibGVBbmltYXRpb24gPSBmdW5jdGlvbigpIHtcblx0XHRvcHRpb25zLmFuaW1hdGUuZW5hYmxlZCA9IGZhbHNlO1xuXHRcdHJldHVybiB0aGlzO1xuXHR9O1xuXG5cdC8qKlxuXHQgKiBFbmFibGUgYW5pbWF0aW9uXG5cdCAqIEByZXR1cm4ge29iamVjdH0gSW5zdGFuY2Ugb2YgdGhlIHBsdWdpbiBmb3IgbWV0aG9kIGNoYWluaW5nXG5cdCAqL1xuXHR0aGlzLmVuYWJsZUFuaW1hdGlvbiA9IGZ1bmN0aW9uKCkge1xuXHRcdG9wdGlvbnMuYW5pbWF0ZS5lbmFibGVkID0gdHJ1ZTtcblx0XHRyZXR1cm4gdGhpcztcblx0fTtcblxuXHRpbml0KCk7XG59O1xuXG5yZXR1cm4gRWFzeVBpZUNoYXJ0O1xuXG59KSk7XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9lYXN5LXBpZS1jaGFydC9kaXN0L2Vhc3lwaWVjaGFydC5qc1xuICoqIG1vZHVsZSBpZCA9IDY4XG4gKiogbW9kdWxlIGNodW5rcyA9IDFcbiAqKi8iXSwic291cmNlUm9vdCI6IiJ9