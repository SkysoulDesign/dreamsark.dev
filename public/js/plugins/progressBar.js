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
	    ProgressBar: __webpack_require__(72)
	});
	var ProgressBar = (function (_super) {
	    __extends(ProgressBar, _super);
	    function ProgressBar() {
	        _super.call(this);
	    }
	    return ProgressBar;
	}(Plugins_1.Plugins));
	exports.ProgressBar = ProgressBar;
	/**
	 * Auto install itself
	 */
	window['dreamsark'].install({
	    ProgressBar: ProgressBar
	});
	//# sourceMappingURL=ProgressBar.js.map

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

/***/ 72:
/***/ function(module, exports, __webpack_require__) {

	module.exports = {
	    // Higher level API, different shaped progress bars
	    Line: __webpack_require__(73),
	    Circle: __webpack_require__(78),
	    SemiCircle: __webpack_require__(79),
	
	    // Lower level API to use any SVG path
	    Path: __webpack_require__(75),
	
	    // Base-class for creating new custom shapes
	    // to be in line with the API of built-in shapes
	    // Undocumented.
	    Shape: __webpack_require__(74),
	
	    // Internal utils, undocumented.
	    utils: __webpack_require__(77)
	};


/***/ },

/***/ 73:
/***/ function(module, exports, __webpack_require__) {

	// Line shaped progress bar
	
	var Shape = __webpack_require__(74);
	var utils = __webpack_require__(77);
	
	var Line = function Line(container, options) {
	    this._pathTemplate = 'M 0,{center} L 100,{center}';
	    Shape.apply(this, arguments);
	};
	
	Line.prototype = new Shape();
	Line.prototype.constructor = Line;
	
	Line.prototype._initializeSvg = function _initializeSvg(svg, opts) {
	    svg.setAttribute('viewBox', '0 0 100 ' + opts.strokeWidth);
	    svg.setAttribute('preserveAspectRatio', 'none');
	};
	
	Line.prototype._pathString = function _pathString(opts) {
	    return utils.render(this._pathTemplate, {
	        center: opts.strokeWidth / 2
	    });
	};
	
	Line.prototype._trailString = function _trailString(opts) {
	    return this._pathString(opts);
	};
	
	module.exports = Line;


/***/ },

/***/ 74:
/***/ function(module, exports, __webpack_require__) {

	// Base object for different progress bar shapes
	
	var Path = __webpack_require__(75);
	var utils = __webpack_require__(77);
	
	var DESTROYED_ERROR = 'Object is destroyed';
	
	var Shape = function Shape(container, opts) {
	    // Throw a better error if progress bars are not initialized with `new`
	    // keyword
	    if (!(this instanceof Shape)) {
	        throw new Error('Constructor was called without new keyword');
	    }
	
	    // Prevent calling constructor without parameters so inheritance
	    // works correctly. To understand, this is how Shape is inherited:
	    //
	    //   Line.prototype = new Shape();
	    //
	    // We just want to set the prototype for Line.
	    if (arguments.length === 0) {
	        return;
	    }
	
	    // Default parameters for progress bar creation
	    this._opts = utils.extend({
	        color: '#555',
	        strokeWidth: 1.0,
	        trailColor: null,
	        trailWidth: null,
	        fill: null,
	        text: {
	            style: {
	                color: null,
	                position: 'absolute',
	                left: '50%',
	                top: '50%',
	                padding: 0,
	                margin: 0,
	                transform: {
	                    prefix: true,
	                    value: 'translate(-50%, -50%)'
	                }
	            },
	            autoStyleContainer: true,
	            alignToBottom: true,
	            value: null,
	            className: 'progressbar-text'
	        },
	        svgStyle: {
	            display: 'block',
	            width: '100%'
	        },
	        warnings: false
	    }, opts, true);  // Use recursive extend
	
	    // If user specifies e.g. svgStyle or text style, the whole object
	    // should replace the defaults to make working with styles easier
	    if (utils.isObject(opts) && opts.svgStyle !== undefined) {
	        this._opts.svgStyle = opts.svgStyle;
	    }
	    if (utils.isObject(opts) && utils.isObject(opts.text) && opts.text.style !== undefined) {
	        this._opts.text.style = opts.text.style;
	    }
	
	    var svgView = this._createSvgView(this._opts);
	
	    var element;
	    if (utils.isString(container)) {
	        element = document.querySelector(container);
	    } else {
	        element = container;
	    }
	
	    if (!element) {
	        throw new Error('Container does not exist: ' + container);
	    }
	
	    this._container = element;
	    this._container.appendChild(svgView.svg);
	    if (this._opts.warnings) {
	        this._warnContainerAspectRatio(this._container);
	    }
	
	    if (this._opts.svgStyle) {
	        utils.setStyles(svgView.svg, this._opts.svgStyle);
	    }
	
	    // Expose public attributes before Path initialization
	    this.svg = svgView.svg;
	    this.path = svgView.path;
	    this.trail = svgView.trail;
	    this.text = null;
	
	    var newOpts = utils.extend({
	        attachment: undefined,
	        shape: this
	    }, this._opts);
	    this._progressPath = new Path(svgView.path, newOpts);
	
	    if (utils.isObject(this._opts.text) && this._opts.text.value !== null) {
	        this.setText(this._opts.text.value);
	    }
	};
	
	Shape.prototype.animate = function animate(progress, opts, cb) {
	    if (this._progressPath === null) {
	        throw new Error(DESTROYED_ERROR);
	    }
	
	    this._progressPath.animate(progress, opts, cb);
	};
	
	Shape.prototype.stop = function stop() {
	    if (this._progressPath === null) {
	        throw new Error(DESTROYED_ERROR);
	    }
	
	    // Don't crash if stop is called inside step function
	    if (this._progressPath === undefined) {
	        return;
	    }
	
	    this._progressPath.stop();
	};
	
	Shape.prototype.destroy = function destroy() {
	    if (this._progressPath === null) {
	        throw new Error(DESTROYED_ERROR);
	    }
	
	    this.stop();
	    this.svg.parentNode.removeChild(this.svg);
	    this.svg = null;
	    this.path = null;
	    this.trail = null;
	    this._progressPath = null;
	
	    if (this.text !== null) {
	        this.text.parentNode.removeChild(this.text);
	        this.text = null;
	    }
	};
	
	Shape.prototype.set = function set(progress) {
	    if (this._progressPath === null) {
	        throw new Error(DESTROYED_ERROR);
	    }
	
	    this._progressPath.set(progress);
	};
	
	Shape.prototype.value = function value() {
	    if (this._progressPath === null) {
	        throw new Error(DESTROYED_ERROR);
	    }
	
	    if (this._progressPath === undefined) {
	        return 0;
	    }
	
	    return this._progressPath.value();
	};
	
	Shape.prototype.setText = function setText(newText) {
	    if (this._progressPath === null) {
	        throw new Error(DESTROYED_ERROR);
	    }
	
	    if (this.text === null) {
	        // Create new text node
	        this.text = this._createTextContainer(this._opts, this._container);
	        this._container.appendChild(this.text);
	    }
	
	    // Remove previous text and add new
	    if (utils.isObject(newText)) {
	        utils.removeChildren(this.text);
	        this.text.appendChild(newText);
	    } else {
	        this.text.innerHTML = newText;
	    }
	};
	
	Shape.prototype._createSvgView = function _createSvgView(opts) {
	    var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
	    this._initializeSvg(svg, opts);
	
	    var trailPath = null;
	    // Each option listed in the if condition are 'triggers' for creating
	    // the trail path
	    if (opts.trailColor || opts.trailWidth) {
	        trailPath = this._createTrail(opts);
	        svg.appendChild(trailPath);
	    }
	
	    var path = this._createPath(opts);
	    svg.appendChild(path);
	
	    return {
	        svg: svg,
	        path: path,
	        trail: trailPath
	    };
	};
	
	Shape.prototype._initializeSvg = function _initializeSvg(svg, opts) {
	    svg.setAttribute('viewBox', '0 0 100 100');
	};
	
	Shape.prototype._createPath = function _createPath(opts) {
	    var pathString = this._pathString(opts);
	    return this._createPathElement(pathString, opts);
	};
	
	Shape.prototype._createTrail = function _createTrail(opts) {
	    // Create path string with original passed options
	    var pathString = this._trailString(opts);
	
	    // Prevent modifying original
	    var newOpts = utils.extend({}, opts);
	
	    // Defaults for parameters which modify trail path
	    if (!newOpts.trailColor) {
	        newOpts.trailColor = '#eee';
	    }
	    if (!newOpts.trailWidth) {
	        newOpts.trailWidth = newOpts.strokeWidth;
	    }
	
	    newOpts.color = newOpts.trailColor;
	    newOpts.strokeWidth = newOpts.trailWidth;
	
	    // When trail path is set, fill must be set for it instead of the
	    // actual path to prevent trail stroke from clipping
	    newOpts.fill = null;
	
	    return this._createPathElement(pathString, newOpts);
	};
	
	Shape.prototype._createPathElement = function _createPathElement(pathString, opts) {
	    var path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
	    path.setAttribute('d', pathString);
	    path.setAttribute('stroke', opts.color);
	    path.setAttribute('stroke-width', opts.strokeWidth);
	
	    if (opts.fill) {
	        path.setAttribute('fill', opts.fill);
	    } else {
	        path.setAttribute('fill-opacity', '0');
	    }
	
	    return path;
	};
	
	Shape.prototype._createTextContainer = function _createTextContainer(opts, container) {
	    var textContainer = document.createElement('div');
	    textContainer.className = opts.text.className;
	
	    var textStyle = opts.text.style;
	    if (textStyle) {
	        if (opts.text.autoStyleContainer) {
	            container.style.position = 'relative';
	        }
	
	        utils.setStyles(textContainer, textStyle);
	        // Default text color to progress bar's color
	        if (!textStyle.color) {
	            textContainer.style.color = opts.color;
	        }
	    }
	
	    this._initializeTextContainer(opts, container, textContainer);
	    return textContainer;
	};
	
	// Give custom shapes possibility to modify text element
	Shape.prototype._initializeTextContainer = function(opts, container, element) {
	    // By default, no-op
	    // Custom shapes should respect API options, such as text.style
	};
	
	Shape.prototype._pathString = function _pathString(opts) {
	    throw new Error('Override this function for each progress bar');
	};
	
	Shape.prototype._trailString = function _trailString(opts) {
	    throw new Error('Override this function for each progress bar');
	};
	
	Shape.prototype._warnContainerAspectRatio = function _warnContainerAspectRatio(container) {
	    if (!this.containerAspectRatio) {
	        return;
	    }
	
	    var computedStyle = window.getComputedStyle(container, null);
	    var width = parseFloat(computedStyle.getPropertyValue('width'), 10);
	    var height = parseFloat(computedStyle.getPropertyValue('height'), 10);
	    if (!utils.floatEquals(this.containerAspectRatio, width / height)) {
	        console.warn(
	            'Incorrect aspect ratio of container',
	            '#' + container.id,
	            'detected:',
	            computedStyle.getPropertyValue('width') + '(width)',
	            '/',
	            computedStyle.getPropertyValue('height') + '(height)',
	            '=',
	            width / height
	        );
	
	        console.warn(
	            'Aspect ratio of should be',
	            this.containerAspectRatio
	        );
	    }
	};
	
	module.exports = Shape;


/***/ },

/***/ 75:
/***/ function(module, exports, __webpack_require__) {

	// Lower level API to animate any kind of svg path
	
	var Tweenable = __webpack_require__(76);
	var utils = __webpack_require__(77);
	
	var EASING_ALIASES = {
	    easeIn: 'easeInCubic',
	    easeOut: 'easeOutCubic',
	    easeInOut: 'easeInOutCubic'
	};
	
	var Path = function Path(path, opts) {
	    // Throw a better error if not initialized with `new` keyword
	    if (!(this instanceof Path)) {
	        throw new Error('Constructor was called without new keyword');
	    }
	
	    // Default parameters for animation
	    opts = utils.extend({
	        duration: 800,
	        easing: 'linear',
	        from: {},
	        to: {},
	        step: function() {}
	    }, opts);
	
	    var element;
	    if (utils.isString(path)) {
	        element = document.querySelector(path);
	    } else {
	        element = path;
	    }
	
	    // Reveal .path as public attribute
	    this.path = element;
	    this._opts = opts;
	    this._tweenable = null;
	
	    // Set up the starting positions
	    var length = this.path.getTotalLength();
	    this.path.style.strokeDasharray = length + ' ' + length;
	    this.set(0);
	};
	
	Path.prototype.value = function value() {
	    var offset = this._getComputedDashOffset();
	    var length = this.path.getTotalLength();
	
	    var progress = 1 - offset / length;
	    // Round number to prevent returning very small number like 1e-30, which
	    // is practically 0
	    return parseFloat(progress.toFixed(6), 10);
	};
	
	Path.prototype.set = function set(progress) {
	    this.stop();
	
	    this.path.style.strokeDashoffset = this._progressToOffset(progress);
	
	    var step = this._opts.step;
	    if (utils.isFunction(step)) {
	        var easing = this._easing(this._opts.easing);
	        var values = this._calculateTo(progress, easing);
	        var reference = this._opts.shape || this;
	        step(values, reference, this._opts.attachment);
	    }
	};
	
	Path.prototype.stop = function stop() {
	    this._stopTween();
	    this.path.style.strokeDashoffset = this._getComputedDashOffset();
	};
	
	// Method introduced here:
	// http://jakearchibald.com/2013/animated-line-drawing-svg/
	Path.prototype.animate = function animate(progress, opts, cb) {
	    opts = opts || {};
	
	    if (utils.isFunction(opts)) {
	        cb = opts;
	        opts = {};
	    }
	
	    var passedOpts = utils.extend({}, opts);
	
	    // Copy default opts to new object so defaults are not modified
	    var defaultOpts = utils.extend({}, this._opts);
	    opts = utils.extend(defaultOpts, opts);
	
	    var shiftyEasing = this._easing(opts.easing);
	    var values = this._resolveFromAndTo(progress, shiftyEasing, passedOpts);
	
	    this.stop();
	
	    // Trigger a layout so styles are calculated & the browser
	    // picks up the starting position before animating
	    this.path.getBoundingClientRect();
	
	    var offset = this._getComputedDashOffset();
	    var newOffset = this._progressToOffset(progress);
	
	    var self = this;
	    this._tweenable = new Tweenable();
	    this._tweenable.tween({
	        from: utils.extend({ offset: offset }, values.from),
	        to: utils.extend({ offset: newOffset }, values.to),
	        duration: opts.duration,
	        easing: shiftyEasing,
	        step: function(state) {
	            self.path.style.strokeDashoffset = state.offset;
	            var reference = opts.shape || self;
	            opts.step(state, reference, opts.attachment);
	        },
	        finish: function(state) {
	            if (utils.isFunction(cb)) {
	                cb();
	            }
	        }
	    });
	};
	
	Path.prototype._getComputedDashOffset = function _getComputedDashOffset() {
	    var computedStyle = window.getComputedStyle(this.path, null);
	    return parseFloat(computedStyle.getPropertyValue('stroke-dashoffset'), 10);
	};
	
	Path.prototype._progressToOffset = function _progressToOffset(progress) {
	    var length = this.path.getTotalLength();
	    return length - progress * length;
	};
	
	// Resolves from and to values for animation.
	Path.prototype._resolveFromAndTo = function _resolveFromAndTo(progress, easing, opts) {
	    if (opts.from && opts.to) {
	        return {
	            from: opts.from,
	            to: opts.to
	        };
	    }
	
	    return {
	        from: this._calculateFrom(easing),
	        to: this._calculateTo(progress, easing)
	    };
	};
	
	// Calculate `from` values from options passed at initialization
	Path.prototype._calculateFrom = function _calculateFrom(easing) {
	    return Tweenable.interpolate(this._opts.from, this._opts.to, this.value(), easing);
	};
	
	// Calculate `to` values from options passed at initialization
	Path.prototype._calculateTo = function _calculateTo(progress, easing) {
	    return Tweenable.interpolate(this._opts.from, this._opts.to, progress, easing);
	};
	
	Path.prototype._stopTween = function _stopTween() {
	    if (this._tweenable !== null) {
	        this._tweenable.stop();
	        this._tweenable = null;
	    }
	};
	
	Path.prototype._easing = function _easing(easing) {
	    if (EASING_ALIASES.hasOwnProperty(easing)) {
	        return EASING_ALIASES[easing];
	    }
	
	    return easing;
	};
	
	module.exports = Path;


/***/ },

/***/ 76:
/***/ function(module, exports, __webpack_require__) {

	/* shifty - v1.5.2 - 2016-02-10 - http://jeremyckahn.github.io/shifty */
	;(function () {
	  var root = this || Function('return this')();
	
	/**
	 * Shifty Core
	 * By Jeremy Kahn - jeremyckahn@gmail.com
	 */
	
	var Tweenable = (function () {
	
	  'use strict';
	
	  // Aliases that get defined later in this function
	  var formula;
	
	  // CONSTANTS
	  var DEFAULT_SCHEDULE_FUNCTION;
	  var DEFAULT_EASING = 'linear';
	  var DEFAULT_DURATION = 500;
	  var UPDATE_TIME = 1000 / 60;
	
	  var _now = Date.now
	       ? Date.now
	       : function () {return +new Date();};
	
	  var now = typeof SHIFTY_DEBUG_NOW !== 'undefined' ? SHIFTY_DEBUG_NOW : _now;
	
	  if (typeof window !== 'undefined') {
	    // requestAnimationFrame() shim by Paul Irish (modified for Shifty)
	    // http://paulirish.com/2011/requestanimationframe-for-smart-animating/
	    DEFAULT_SCHEDULE_FUNCTION = window.requestAnimationFrame
	       || window.webkitRequestAnimationFrame
	       || window.oRequestAnimationFrame
	       || window.msRequestAnimationFrame
	       || (window.mozCancelRequestAnimationFrame
	       && window.mozRequestAnimationFrame)
	       || setTimeout;
	  } else {
	    DEFAULT_SCHEDULE_FUNCTION = setTimeout;
	  }
	
	  function noop () {
	    // NOOP!
	  }
	
	  /**
	   * Handy shortcut for doing a for-in loop. This is not a "normal" each
	   * function, it is optimized for Shifty.  The iterator function only receives
	   * the property name, not the value.
	   * @param {Object} obj
	   * @param {Function(string)} fn
	   * @private
	   */
	  function each (obj, fn) {
	    var key;
	    for (key in obj) {
	      if (Object.hasOwnProperty.call(obj, key)) {
	        fn(key);
	      }
	    }
	  }
	
	  /**
	   * Perform a shallow copy of Object properties.
	   * @param {Object} targetObject The object to copy into
	   * @param {Object} srcObject The object to copy from
	   * @return {Object} A reference to the augmented `targetObj` Object
	   * @private
	   */
	  function shallowCopy (targetObj, srcObj) {
	    each(srcObj, function (prop) {
	      targetObj[prop] = srcObj[prop];
	    });
	
	    return targetObj;
	  }
	
	  /**
	   * Copies each property from src onto target, but only if the property to
	   * copy to target is undefined.
	   * @param {Object} target Missing properties in this Object are filled in
	   * @param {Object} src
	   * @private
	   */
	  function defaults (target, src) {
	    each(src, function (prop) {
	      if (typeof target[prop] === 'undefined') {
	        target[prop] = src[prop];
	      }
	    });
	  }
	
	  /**
	   * Calculates the interpolated tween values of an Object for a given
	   * timestamp.
	   * @param {Number} forPosition The position to compute the state for.
	   * @param {Object} currentState Current state properties.
	   * @param {Object} originalState: The original state properties the Object is
	   * tweening from.
	   * @param {Object} targetState: The destination state properties the Object
	   * is tweening to.
	   * @param {number} duration: The length of the tween in milliseconds.
	   * @param {number} timestamp: The UNIX epoch time at which the tween began.
	   * @param {Object} easing: This Object's keys must correspond to the keys in
	   * targetState.
	   * @private
	   */
	  function tweenProps (forPosition, currentState, originalState, targetState,
	    duration, timestamp, easing) {
	    var normalizedPosition =
	        forPosition < timestamp ? 0 : (forPosition - timestamp) / duration;
	
	
	    var prop;
	    var easingObjectProp;
	    var easingFn;
	    for (prop in currentState) {
	      if (currentState.hasOwnProperty(prop)) {
	        easingObjectProp = easing[prop];
	        easingFn = typeof easingObjectProp === 'function'
	          ? easingObjectProp
	          : formula[easingObjectProp];
	
	        currentState[prop] = tweenProp(
	          originalState[prop],
	          targetState[prop],
	          easingFn,
	          normalizedPosition
	        );
	      }
	    }
	
	    return currentState;
	  }
	
	  /**
	   * Tweens a single property.
	   * @param {number} start The value that the tween started from.
	   * @param {number} end The value that the tween should end at.
	   * @param {Function} easingFunc The easing curve to apply to the tween.
	   * @param {number} position The normalized position (between 0.0 and 1.0) to
	   * calculate the midpoint of 'start' and 'end' against.
	   * @return {number} The tweened value.
	   * @private
	   */
	  function tweenProp (start, end, easingFunc, position) {
	    return start + (end - start) * easingFunc(position);
	  }
	
	  /**
	   * Applies a filter to Tweenable instance.
	   * @param {Tweenable} tweenable The `Tweenable` instance to call the filter
	   * upon.
	   * @param {String} filterName The name of the filter to apply.
	   * @private
	   */
	  function applyFilter (tweenable, filterName) {
	    var filters = Tweenable.prototype.filter;
	    var args = tweenable._filterArgs;
	
	    each(filters, function (name) {
	      if (typeof filters[name][filterName] !== 'undefined') {
	        filters[name][filterName].apply(tweenable, args);
	      }
	    });
	  }
	
	  var timeoutHandler_endTime;
	  var timeoutHandler_currentTime;
	  var timeoutHandler_isEnded;
	  var timeoutHandler_offset;
	  /**
	   * Handles the update logic for one step of a tween.
	   * @param {Tweenable} tweenable
	   * @param {number} timestamp
	   * @param {number} delay
	   * @param {number} duration
	   * @param {Object} currentState
	   * @param {Object} originalState
	   * @param {Object} targetState
	   * @param {Object} easing
	   * @param {Function(Object, *, number)} step
	   * @param {Function(Function,number)}} schedule
	   * @param {number=} opt_currentTimeOverride Needed for accurate timestamp in
	   * Tweenable#seek.
	   * @private
	   */
	  function timeoutHandler (tweenable, timestamp, delay, duration, currentState,
	    originalState, targetState, easing, step, schedule,
	    opt_currentTimeOverride) {
	
	    timeoutHandler_endTime = timestamp + delay + duration;
	
	    timeoutHandler_currentTime =
	    Math.min(opt_currentTimeOverride || now(), timeoutHandler_endTime);
	
	    timeoutHandler_isEnded =
	      timeoutHandler_currentTime >= timeoutHandler_endTime;
	
	    timeoutHandler_offset = duration - (
	      timeoutHandler_endTime - timeoutHandler_currentTime);
	
	    if (tweenable.isPlaying()) {
	      if (timeoutHandler_isEnded) {
	        step(targetState, tweenable._attachment, timeoutHandler_offset);
	        tweenable.stop(true);
	      } else {
	        tweenable._scheduleId =
	          schedule(tweenable._timeoutHandler, UPDATE_TIME);
	
	        applyFilter(tweenable, 'beforeTween');
	
	        // If the animation has not yet reached the start point (e.g., there was
	        // delay that has not yet completed), just interpolate the starting
	        // position of the tween.
	        if (timeoutHandler_currentTime < (timestamp + delay)) {
	          tweenProps(1, currentState, originalState, targetState, 1, 1, easing);
	        } else {
	          tweenProps(timeoutHandler_currentTime, currentState, originalState,
	            targetState, duration, timestamp + delay, easing);
	        }
	
	        applyFilter(tweenable, 'afterTween');
	
	        step(currentState, tweenable._attachment, timeoutHandler_offset);
	      }
	    }
	  }
	
	
	  /**
	   * Creates a usable easing Object from a string, a function or another easing
	   * Object.  If `easing` is an Object, then this function clones it and fills
	   * in the missing properties with `"linear"`.
	   * @param {Object.<string|Function>} fromTweenParams
	   * @param {Object|string|Function} easing
	   * @return {Object.<string|Function>}
	   * @private
	   */
	  function composeEasingObject (fromTweenParams, easing) {
	    var composedEasing = {};
	    var typeofEasing = typeof easing;
	
	    if (typeofEasing === 'string' || typeofEasing === 'function') {
	      each(fromTweenParams, function (prop) {
	        composedEasing[prop] = easing;
	      });
	    } else {
	      each(fromTweenParams, function (prop) {
	        if (!composedEasing[prop]) {
	          composedEasing[prop] = easing[prop] || DEFAULT_EASING;
	        }
	      });
	    }
	
	    return composedEasing;
	  }
	
	  /**
	   * Tweenable constructor.
	   * @class Tweenable
	   * @param {Object=} opt_initialState The values that the initial tween should
	   * start at if a `from` object is not provided to `{{#crossLink
	   * "Tweenable/tween:method"}}{{/crossLink}}` or `{{#crossLink
	   * "Tweenable/setConfig:method"}}{{/crossLink}}`.
	   * @param {Object=} opt_config Configuration object to be passed to
	   * `{{#crossLink "Tweenable/setConfig:method"}}{{/crossLink}}`.
	   * @module Tweenable
	   * @constructor
	   */
	  function Tweenable (opt_initialState, opt_config) {
	    this._currentState = opt_initialState || {};
	    this._configured = false;
	    this._scheduleFunction = DEFAULT_SCHEDULE_FUNCTION;
	
	    // To prevent unnecessary calls to setConfig do not set default
	    // configuration here.  Only set default configuration immediately before
	    // tweening if none has been set.
	    if (typeof opt_config !== 'undefined') {
	      this.setConfig(opt_config);
	    }
	  }
	
	  /**
	   * Configure and start a tween.
	   * @method tween
	   * @param {Object=} opt_config Configuration object to be passed to
	   * `{{#crossLink "Tweenable/setConfig:method"}}{{/crossLink}}`.
	   * @chainable
	   */
	  Tweenable.prototype.tween = function (opt_config) {
	    if (this._isTweening) {
	      return this;
	    }
	
	    // Only set default config if no configuration has been set previously and
	    // none is provided now.
	    if (opt_config !== undefined || !this._configured) {
	      this.setConfig(opt_config);
	    }
	
	    this._timestamp = now();
	    this._start(this.get(), this._attachment);
	    return this.resume();
	  };
	
	  /**
	   * Configure a tween that will start at some point in the future.
	   *
	   * @method setConfig
	   * @param {Object} config The following values are valid:
	   * - __from__ (_Object=_): Starting position.  If omitted, `{{#crossLink
	   *   "Tweenable/get:method"}}get(){{/crossLink}}` is used.
	   * - __to__ (_Object=_): Ending position.
	   * - __duration__ (_number=_): How many milliseconds to animate for.
	   * - __delay__ (_delay=_): How many milliseconds to wait before starting the
	   *   tween.
	   * - __start__ (_Function(Object, *)_): Function to execute when the tween
	   *   begins.  Receives the state of the tween as the first parameter and
	   *   `attachment` as the second parameter.
	   * - __step__ (_Function(Object, *, number)_): Function to execute on every
	   *   tick.  Receives `{{#crossLink
	   *   "Tweenable/get:method"}}get(){{/crossLink}}` as the first parameter,
	   *   `attachment` as the second parameter, and the time elapsed since the
	   *   start of the tween as the third. This function is not called on the
	   *   final step of the animation, but `finish` is.
	   * - __finish__ (_Function(Object, *)_): Function to execute upon tween
	   *   completion.  Receives the state of the tween as the first parameter and
	   *   `attachment` as the second parameter.
	   * - __easing__ (_Object.<string|Function>|string|Function=_): Easing curve
	   *   name(s) or function(s) to use for the tween.
	   * - __attachment__ (_*_): Cached value that is passed to the
	   *   `step`/`start`/`finish` methods.
	   * @chainable
	   */
	  Tweenable.prototype.setConfig = function (config) {
	    config = config || {};
	    this._configured = true;
	
	    // Attach something to this Tweenable instance (e.g.: a DOM element, an
	    // object, a string, etc.);
	    this._attachment = config.attachment;
	
	    // Init the internal state
	    this._pausedAtTime = null;
	    this._scheduleId = null;
	    this._delay = config.delay || 0;
	    this._start = config.start || noop;
	    this._step = config.step || noop;
	    this._finish = config.finish || noop;
	    this._duration = config.duration || DEFAULT_DURATION;
	    this._currentState = shallowCopy({}, config.from) || this.get();
	    this._originalState = this.get();
	    this._targetState = shallowCopy({}, config.to) || this.get();
	
	    var self = this;
	    this._timeoutHandler = function () {
	      timeoutHandler(self,
	        self._timestamp,
	        self._delay,
	        self._duration,
	        self._currentState,
	        self._originalState,
	        self._targetState,
	        self._easing,
	        self._step,
	        self._scheduleFunction
	      );
	    };
	
	    // Aliases used below
	    var currentState = this._currentState;
	    var targetState = this._targetState;
	
	    // Ensure that there is always something to tween to.
	    defaults(targetState, currentState);
	
	    this._easing = composeEasingObject(
	      currentState, config.easing || DEFAULT_EASING);
	
	    this._filterArgs =
	      [currentState, this._originalState, targetState, this._easing];
	
	    applyFilter(this, 'tweenCreated');
	    return this;
	  };
	
	  /**
	   * @method get
	   * @return {Object} The current state.
	   */
	  Tweenable.prototype.get = function () {
	    return shallowCopy({}, this._currentState);
	  };
	
	  /**
	   * @method set
	   * @param {Object} state The current state.
	   */
	  Tweenable.prototype.set = function (state) {
	    this._currentState = state;
	  };
	
	  /**
	   * Pause a tween.  Paused tweens can be resumed from the point at which they
	   * were paused.  This is different from `{{#crossLink
	   * "Tweenable/stop:method"}}{{/crossLink}}`, as that method
	   * causes a tween to start over when it is resumed.
	   * @method pause
	   * @chainable
	   */
	  Tweenable.prototype.pause = function () {
	    this._pausedAtTime = now();
	    this._isPaused = true;
	    return this;
	  };
	
	  /**
	   * Resume a paused tween.
	   * @method resume
	   * @chainable
	   */
	  Tweenable.prototype.resume = function () {
	    if (this._isPaused) {
	      this._timestamp += now() - this._pausedAtTime;
	    }
	
	    this._isPaused = false;
	    this._isTweening = true;
	
	    this._timeoutHandler();
	
	    return this;
	  };
	
	  /**
	   * Move the state of the animation to a specific point in the tween's
	   * timeline.  If the animation is not running, this will cause the `step`
	   * handlers to be called.
	   * @method seek
	   * @param {millisecond} millisecond The millisecond of the animation to seek
	   * to.  This must not be less than `0`.
	   * @chainable
	   */
	  Tweenable.prototype.seek = function (millisecond) {
	    millisecond = Math.max(millisecond, 0);
	    var currentTime = now();
	
	    if ((this._timestamp + millisecond) === 0) {
	      return this;
	    }
	
	    this._timestamp = currentTime - millisecond;
	
	    if (!this.isPlaying()) {
	      this._isTweening = true;
	      this._isPaused = false;
	
	      // If the animation is not running, call timeoutHandler to make sure that
	      // any step handlers are run.
	      timeoutHandler(this,
	        this._timestamp,
	        this._delay,
	        this._duration,
	        this._currentState,
	        this._originalState,
	        this._targetState,
	        this._easing,
	        this._step,
	        this._scheduleFunction,
	        currentTime
	      );
	
	      this.pause();
	    }
	
	    return this;
	  };
	
	  /**
	   * Stops and cancels a tween.
	   * @param {boolean=} gotoEnd If `false` or omitted, the tween just stops at
	   * its current state, and the `finish` handler is not invoked.  If `true`,
	   * the tweened object's values are instantly set to the target values, and
	   * `finish` is invoked.
	   * @method stop
	   * @chainable
	   */
	  Tweenable.prototype.stop = function (gotoEnd) {
	    this._isTweening = false;
	    this._isPaused = false;
	    this._timeoutHandler = noop;
	
	    (root.cancelAnimationFrame            ||
	    root.webkitCancelAnimationFrame     ||
	    root.oCancelAnimationFrame          ||
	    root.msCancelAnimationFrame         ||
	    root.mozCancelRequestAnimationFrame ||
	    root.clearTimeout)(this._scheduleId);
	
	    if (gotoEnd) {
	      applyFilter(this, 'beforeTween');
	      tweenProps(
	        1,
	        this._currentState,
	        this._originalState,
	        this._targetState,
	        1,
	        0,
	        this._easing
	      );
	      applyFilter(this, 'afterTween');
	      applyFilter(this, 'afterTweenEnd');
	      this._finish.call(this, this._currentState, this._attachment);
	    }
	
	    return this;
	  };
	
	  /**
	   * @method isPlaying
	   * @return {boolean} Whether or not a tween is running.
	   */
	  Tweenable.prototype.isPlaying = function () {
	    return this._isTweening && !this._isPaused;
	  };
	
	  /**
	   * Set a custom schedule function.
	   *
	   * If a custom function is not set,
	   * [`requestAnimationFrame`](https://developer.mozilla.org/en-US/docs/Web/API/window.requestAnimationFrame)
	   * is used if available, otherwise
	   * [`setTimeout`](https://developer.mozilla.org/en-US/docs/Web/API/Window.setTimeout)
	   * is used.
	   * @method setScheduleFunction
	   * @param {Function(Function,number)} scheduleFunction The function to be
	   * used to schedule the next frame to be rendered.
	   */
	  Tweenable.prototype.setScheduleFunction = function (scheduleFunction) {
	    this._scheduleFunction = scheduleFunction;
	  };
	
	  /**
	   * `delete` all "own" properties.  Call this when the `Tweenable` instance
	   * is no longer needed to free memory.
	   * @method dispose
	   */
	  Tweenable.prototype.dispose = function () {
	    var prop;
	    for (prop in this) {
	      if (this.hasOwnProperty(prop)) {
	        delete this[prop];
	      }
	    }
	  };
	
	  /**
	   * Filters are used for transforming the properties of a tween at various
	   * points in a Tweenable's life cycle.  See the README for more info on this.
	   * @private
	   */
	  Tweenable.prototype.filter = {};
	
	  /**
	   * This object contains all of the tweens available to Shifty.  It is
	   * extensible - simply attach properties to the `Tweenable.prototype.formula`
	   * Object following the same format as `linear`.
	   *
	   * `pos` should be a normalized `number` (between 0 and 1).
	   * @property formula
	   * @type {Object(function)}
	   */
	  Tweenable.prototype.formula = {
	    linear: function (pos) {
	      return pos;
	    }
	  };
	
	  formula = Tweenable.prototype.formula;
	
	  shallowCopy(Tweenable, {
	    'now': now
	    ,'each': each
	    ,'tweenProps': tweenProps
	    ,'tweenProp': tweenProp
	    ,'applyFilter': applyFilter
	    ,'shallowCopy': shallowCopy
	    ,'defaults': defaults
	    ,'composeEasingObject': composeEasingObject
	  });
	
	  // `root` is provided in the intro/outro files.
	
	  // A hook used for unit testing.
	  if (typeof SHIFTY_DEBUG_NOW === 'function') {
	    root.timeoutHandler = timeoutHandler;
	  }
	
	  // Bootstrap Tweenable appropriately for the environment.
	  if (true) {
	    // CommonJS
	    module.exports = Tweenable;
	  } else if (typeof define === 'function' && define.amd) {
	    // AMD
	    define(function () {return Tweenable;});
	  } else if (typeof root.Tweenable === 'undefined') {
	    // Browser: Make `Tweenable` globally accessible.
	    root.Tweenable = Tweenable;
	  }
	
	  return Tweenable;
	
	} ());
	
	/*!
	 * All equations are adapted from Thomas Fuchs'
	 * [Scripty2](https://github.com/madrobby/scripty2/blob/master/src/effects/transitions/penner.js).
	 *
	 * Based on Easing Equations (c) 2003 [Robert
	 * Penner](http://www.robertpenner.com/), all rights reserved. This work is
	 * [subject to terms](http://www.robertpenner.com/easing_terms_of_use.html).
	 */
	
	/*!
	 *  TERMS OF USE - EASING EQUATIONS
	 *  Open source under the BSD License.
	 *  Easing Equations (c) 2003 Robert Penner, all rights reserved.
	 */
	
	;(function () {
	
	  Tweenable.shallowCopy(Tweenable.prototype.formula, {
	    easeInQuad: function (pos) {
	      return Math.pow(pos, 2);
	    },
	
	    easeOutQuad: function (pos) {
	      return -(Math.pow((pos - 1), 2) - 1);
	    },
	
	    easeInOutQuad: function (pos) {
	      if ((pos /= 0.5) < 1) {return 0.5 * Math.pow(pos,2);}
	      return -0.5 * ((pos -= 2) * pos - 2);
	    },
	
	    easeInCubic: function (pos) {
	      return Math.pow(pos, 3);
	    },
	
	    easeOutCubic: function (pos) {
	      return (Math.pow((pos - 1), 3) + 1);
	    },
	
	    easeInOutCubic: function (pos) {
	      if ((pos /= 0.5) < 1) {return 0.5 * Math.pow(pos,3);}
	      return 0.5 * (Math.pow((pos - 2),3) + 2);
	    },
	
	    easeInQuart: function (pos) {
	      return Math.pow(pos, 4);
	    },
	
	    easeOutQuart: function (pos) {
	      return -(Math.pow((pos - 1), 4) - 1);
	    },
	
	    easeInOutQuart: function (pos) {
	      if ((pos /= 0.5) < 1) {return 0.5 * Math.pow(pos,4);}
	      return -0.5 * ((pos -= 2) * Math.pow(pos,3) - 2);
	    },
	
	    easeInQuint: function (pos) {
	      return Math.pow(pos, 5);
	    },
	
	    easeOutQuint: function (pos) {
	      return (Math.pow((pos - 1), 5) + 1);
	    },
	
	    easeInOutQuint: function (pos) {
	      if ((pos /= 0.5) < 1) {return 0.5 * Math.pow(pos,5);}
	      return 0.5 * (Math.pow((pos - 2),5) + 2);
	    },
	
	    easeInSine: function (pos) {
	      return -Math.cos(pos * (Math.PI / 2)) + 1;
	    },
	
	    easeOutSine: function (pos) {
	      return Math.sin(pos * (Math.PI / 2));
	    },
	
	    easeInOutSine: function (pos) {
	      return (-0.5 * (Math.cos(Math.PI * pos) - 1));
	    },
	
	    easeInExpo: function (pos) {
	      return (pos === 0) ? 0 : Math.pow(2, 10 * (pos - 1));
	    },
	
	    easeOutExpo: function (pos) {
	      return (pos === 1) ? 1 : -Math.pow(2, -10 * pos) + 1;
	    },
	
	    easeInOutExpo: function (pos) {
	      if (pos === 0) {return 0;}
	      if (pos === 1) {return 1;}
	      if ((pos /= 0.5) < 1) {return 0.5 * Math.pow(2,10 * (pos - 1));}
	      return 0.5 * (-Math.pow(2, -10 * --pos) + 2);
	    },
	
	    easeInCirc: function (pos) {
	      return -(Math.sqrt(1 - (pos * pos)) - 1);
	    },
	
	    easeOutCirc: function (pos) {
	      return Math.sqrt(1 - Math.pow((pos - 1), 2));
	    },
	
	    easeInOutCirc: function (pos) {
	      if ((pos /= 0.5) < 1) {return -0.5 * (Math.sqrt(1 - pos * pos) - 1);}
	      return 0.5 * (Math.sqrt(1 - (pos -= 2) * pos) + 1);
	    },
	
	    easeOutBounce: function (pos) {
	      if ((pos) < (1 / 2.75)) {
	        return (7.5625 * pos * pos);
	      } else if (pos < (2 / 2.75)) {
	        return (7.5625 * (pos -= (1.5 / 2.75)) * pos + 0.75);
	      } else if (pos < (2.5 / 2.75)) {
	        return (7.5625 * (pos -= (2.25 / 2.75)) * pos + 0.9375);
	      } else {
	        return (7.5625 * (pos -= (2.625 / 2.75)) * pos + 0.984375);
	      }
	    },
	
	    easeInBack: function (pos) {
	      var s = 1.70158;
	      return (pos) * pos * ((s + 1) * pos - s);
	    },
	
	    easeOutBack: function (pos) {
	      var s = 1.70158;
	      return (pos = pos - 1) * pos * ((s + 1) * pos + s) + 1;
	    },
	
	    easeInOutBack: function (pos) {
	      var s = 1.70158;
	      if ((pos /= 0.5) < 1) {
	        return 0.5 * (pos * pos * (((s *= (1.525)) + 1) * pos - s));
	      }
	      return 0.5 * ((pos -= 2) * pos * (((s *= (1.525)) + 1) * pos + s) + 2);
	    },
	
	    elastic: function (pos) {
	      // jshint maxlen:90
	      return -1 * Math.pow(4,-8 * pos) * Math.sin((pos * 6 - 1) * (2 * Math.PI) / 2) + 1;
	    },
	
	    swingFromTo: function (pos) {
	      var s = 1.70158;
	      return ((pos /= 0.5) < 1) ?
	          0.5 * (pos * pos * (((s *= (1.525)) + 1) * pos - s)) :
	          0.5 * ((pos -= 2) * pos * (((s *= (1.525)) + 1) * pos + s) + 2);
	    },
	
	    swingFrom: function (pos) {
	      var s = 1.70158;
	      return pos * pos * ((s + 1) * pos - s);
	    },
	
	    swingTo: function (pos) {
	      var s = 1.70158;
	      return (pos -= 1) * pos * ((s + 1) * pos + s) + 1;
	    },
	
	    bounce: function (pos) {
	      if (pos < (1 / 2.75)) {
	        return (7.5625 * pos * pos);
	      } else if (pos < (2 / 2.75)) {
	        return (7.5625 * (pos -= (1.5 / 2.75)) * pos + 0.75);
	      } else if (pos < (2.5 / 2.75)) {
	        return (7.5625 * (pos -= (2.25 / 2.75)) * pos + 0.9375);
	      } else {
	        return (7.5625 * (pos -= (2.625 / 2.75)) * pos + 0.984375);
	      }
	    },
	
	    bouncePast: function (pos) {
	      if (pos < (1 / 2.75)) {
	        return (7.5625 * pos * pos);
	      } else if (pos < (2 / 2.75)) {
	        return 2 - (7.5625 * (pos -= (1.5 / 2.75)) * pos + 0.75);
	      } else if (pos < (2.5 / 2.75)) {
	        return 2 - (7.5625 * (pos -= (2.25 / 2.75)) * pos + 0.9375);
	      } else {
	        return 2 - (7.5625 * (pos -= (2.625 / 2.75)) * pos + 0.984375);
	      }
	    },
	
	    easeFromTo: function (pos) {
	      if ((pos /= 0.5) < 1) {return 0.5 * Math.pow(pos,4);}
	      return -0.5 * ((pos -= 2) * Math.pow(pos,3) - 2);
	    },
	
	    easeFrom: function (pos) {
	      return Math.pow(pos,4);
	    },
	
	    easeTo: function (pos) {
	      return Math.pow(pos,0.25);
	    }
	  });
	
	}());
	
	// jshint maxlen:100
	/**
	 * The Bezier magic in this file is adapted/copied almost wholesale from
	 * [Scripty2](https://github.com/madrobby/scripty2/blob/master/src/effects/transitions/cubic-bezier.js),
	 * which was adapted from Apple code (which probably came from
	 * [here](http://opensource.apple.com/source/WebCore/WebCore-955.66/platform/graphics/UnitBezier.h)).
	 * Special thanks to Apple and Thomas Fuchs for much of this code.
	 */
	
	/**
	 *  Copyright (c) 2006 Apple Computer, Inc. All rights reserved.
	 *
	 *  Redistribution and use in source and binary forms, with or without
	 *  modification, are permitted provided that the following conditions are met:
	 *
	 *  1. Redistributions of source code must retain the above copyright notice,
	 *  this list of conditions and the following disclaimer.
	 *
	 *  2. Redistributions in binary form must reproduce the above copyright notice,
	 *  this list of conditions and the following disclaimer in the documentation
	 *  and/or other materials provided with the distribution.
	 *
	 *  3. Neither the name of the copyright holder(s) nor the names of any
	 *  contributors may be used to endorse or promote products derived from
	 *  this software without specific prior written permission.
	 *
	 *  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
	 *  AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
	 *  IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
	 *  ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE
	 *  LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
	 *  CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
	 *  SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
	 *  INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
	 *  CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
	 *  ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
	 *  POSSIBILITY OF SUCH DAMAGE.
	 */
	;(function () {
	  // port of webkit cubic bezier handling by http://www.netzgesta.de/dev/
	  function cubicBezierAtTime(t,p1x,p1y,p2x,p2y,duration) {
	    var ax = 0,bx = 0,cx = 0,ay = 0,by = 0,cy = 0;
	    function sampleCurveX(t) {
	      return ((ax * t + bx) * t + cx) * t;
	    }
	    function sampleCurveY(t) {
	      return ((ay * t + by) * t + cy) * t;
	    }
	    function sampleCurveDerivativeX(t) {
	      return (3.0 * ax * t + 2.0 * bx) * t + cx;
	    }
	    function solveEpsilon(duration) {
	      return 1.0 / (200.0 * duration);
	    }
	    function solve(x,epsilon) {
	      return sampleCurveY(solveCurveX(x, epsilon));
	    }
	    function fabs(n) {
	      if (n >= 0) {
	        return n;
	      } else {
	        return 0 - n;
	      }
	    }
	    function solveCurveX(x, epsilon) {
	      var t0,t1,t2,x2,d2,i;
	      for (t2 = x, i = 0; i < 8; i++) {
	        x2 = sampleCurveX(t2) - x;
	        if (fabs(x2) < epsilon) {
	          return t2;
	        }
	        d2 = sampleCurveDerivativeX(t2);
	        if (fabs(d2) < 1e-6) {
	          break;
	        }
	        t2 = t2 - x2 / d2;
	      }
	      t0 = 0.0;
	      t1 = 1.0;
	      t2 = x;
	      if (t2 < t0) {
	        return t0;
	      }
	      if (t2 > t1) {
	        return t1;
	      }
	      while (t0 < t1) {
	        x2 = sampleCurveX(t2);
	        if (fabs(x2 - x) < epsilon) {
	          return t2;
	        }
	        if (x > x2) {
	          t0 = t2;
	        }else {
	          t1 = t2;
	        }
	        t2 = (t1 - t0) * 0.5 + t0;
	      }
	      return t2; // Failure.
	    }
	    cx = 3.0 * p1x;
	    bx = 3.0 * (p2x - p1x) - cx;
	    ax = 1.0 - cx - bx;
	    cy = 3.0 * p1y;
	    by = 3.0 * (p2y - p1y) - cy;
	    ay = 1.0 - cy - by;
	    return solve(t, solveEpsilon(duration));
	  }
	  /**
	   *  getCubicBezierTransition(x1, y1, x2, y2) -> Function
	   *
	   *  Generates a transition easing function that is compatible
	   *  with WebKit's CSS transitions `-webkit-transition-timing-function`
	   *  CSS property.
	   *
	   *  The W3C has more information about CSS3 transition timing functions:
	   *  http://www.w3.org/TR/css3-transitions/#transition-timing-function_tag
	   *
	   *  @param {number} x1
	   *  @param {number} y1
	   *  @param {number} x2
	   *  @param {number} y2
	   *  @return {function}
	   *  @private
	   */
	  function getCubicBezierTransition (x1, y1, x2, y2) {
	    return function (pos) {
	      return cubicBezierAtTime(pos,x1,y1,x2,y2,1);
	    };
	  }
	  // End ported code
	
	  /**
	   * Create a Bezier easing function and attach it to `{{#crossLink
	   * "Tweenable/formula:property"}}Tweenable#formula{{/crossLink}}`.  This
	   * function gives you total control over the easing curve.  Matthew Lein's
	   * [Ceaser](http://matthewlein.com/ceaser/) is a useful tool for visualizing
	   * the curves you can make with this function.
	   * @method setBezierFunction
	   * @param {string} name The name of the easing curve.  Overwrites the old
	   * easing function on `{{#crossLink
	   * "Tweenable/formula:property"}}Tweenable#formula{{/crossLink}}` if it
	   * exists.
	   * @param {number} x1
	   * @param {number} y1
	   * @param {number} x2
	   * @param {number} y2
	   * @return {function} The easing function that was attached to
	   * Tweenable.prototype.formula.
	   */
	  Tweenable.setBezierFunction = function (name, x1, y1, x2, y2) {
	    var cubicBezierTransition = getCubicBezierTransition(x1, y1, x2, y2);
	    cubicBezierTransition.displayName = name;
	    cubicBezierTransition.x1 = x1;
	    cubicBezierTransition.y1 = y1;
	    cubicBezierTransition.x2 = x2;
	    cubicBezierTransition.y2 = y2;
	
	    return Tweenable.prototype.formula[name] = cubicBezierTransition;
	  };
	
	
	  /**
	   * `delete` an easing function from `{{#crossLink
	   * "Tweenable/formula:property"}}Tweenable#formula{{/crossLink}}`.  Be
	   * careful with this method, as it `delete`s whatever easing formula matches
	   * `name` (which means you can delete standard Shifty easing functions).
	   * @method unsetBezierFunction
	   * @param {string} name The name of the easing function to delete.
	   * @return {function}
	   */
	  Tweenable.unsetBezierFunction = function (name) {
	    delete Tweenable.prototype.formula[name];
	  };
	
	})();
	
	;(function () {
	
	  function getInterpolatedValues (
	    from, current, targetState, position, easing, delay) {
	    return Tweenable.tweenProps(
	      position, current, from, targetState, 1, delay, easing);
	  }
	
	  // Fake a Tweenable and patch some internals.  This approach allows us to
	  // skip uneccessary processing and object recreation, cutting down on garbage
	  // collection pauses.
	  var mockTweenable = new Tweenable();
	  mockTweenable._filterArgs = [];
	
	  /**
	   * Compute the midpoint of two Objects.  This method effectively calculates a
	   * specific frame of animation that `{{#crossLink
	   * "Tweenable/tween:method"}}{{/crossLink}}` does many times over the course
	   * of a full tween.
	   *
	   *     var interpolatedValues = Tweenable.interpolate({
	   *       width: '100px',
	   *       opacity: 0,
	   *       color: '#fff'
	   *     }, {
	   *       width: '200px',
	   *       opacity: 1,
	   *       color: '#000'
	   *     }, 0.5);
	   *
	   *     console.log(interpolatedValues);
	   *     // {opacity: 0.5, width: "150px", color: "rgb(127,127,127)"}
	   *
	   * @static
	   * @method interpolate
	   * @param {Object} from The starting values to tween from.
	   * @param {Object} targetState The ending values to tween to.
	   * @param {number} position The normalized position value (between `0.0` and
	   * `1.0`) to interpolate the values between `from` and `to` for.  `from`
	   * represents `0` and `to` represents `1`.
	   * @param {Object.<string|Function>|string|Function} easing The easing
	   * curve(s) to calculate the midpoint against.  You can reference any easing
	   * function attached to `Tweenable.prototype.formula`, or provide the easing
	   * function(s) directly.  If omitted, this defaults to "linear".
	   * @param {number=} opt_delay Optional delay to pad the beginning of the
	   * interpolated tween with.  This increases the range of `position` from (`0`
	   * through `1`) to (`0` through `1 + opt_delay`).  So, a delay of `0.5` would
	   * increase all valid values of `position` to numbers between `0` and `1.5`.
	   * @return {Object}
	   */
	  Tweenable.interpolate = function (
	    from, targetState, position, easing, opt_delay) {
	
	    var current = Tweenable.shallowCopy({}, from);
	    var delay = opt_delay || 0;
	    var easingObject = Tweenable.composeEasingObject(
	      from, easing || 'linear');
	
	    mockTweenable.set({});
	
	    // Alias and reuse the _filterArgs array instead of recreating it.
	    var filterArgs = mockTweenable._filterArgs;
	    filterArgs.length = 0;
	    filterArgs[0] = current;
	    filterArgs[1] = from;
	    filterArgs[2] = targetState;
	    filterArgs[3] = easingObject;
	
	    // Any defined value transformation must be applied
	    Tweenable.applyFilter(mockTweenable, 'tweenCreated');
	    Tweenable.applyFilter(mockTweenable, 'beforeTween');
	
	    var interpolatedValues = getInterpolatedValues(
	      from, current, targetState, position, easingObject, delay);
	
	    // Transform values back into their original format
	    Tweenable.applyFilter(mockTweenable, 'afterTween');
	
	    return interpolatedValues;
	  };
	
	}());
	
	/**
	 * This module adds string interpolation support to Shifty.
	 *
	 * The Token extension allows Shifty to tween numbers inside of strings.  Among
	 * other things, this allows you to animate CSS properties.  For example, you
	 * can do this:
	 *
	 *     var tweenable = new Tweenable();
	 *     tweenable.tween({
	 *       from: { transform: 'translateX(45px)' },
	 *       to: { transform: 'translateX(90xp)' }
	 *     });
	 *
	 * `translateX(45)` will be tweened to `translateX(90)`.  To demonstrate:
	 *
	 *     var tweenable = new Tweenable();
	 *     tweenable.tween({
	 *       from: { transform: 'translateX(45px)' },
	 *       to: { transform: 'translateX(90px)' },
	 *       step: function (state) {
	 *         console.log(state.transform);
	 *       }
	 *     });
	 *
	 * The above snippet will log something like this in the console:
	 *
	 *     translateX(60.3px)
	 *     ...
	 *     translateX(76.05px)
	 *     ...
	 *     translateX(90px)
	 *
	 * Another use for this is animating colors:
	 *
	 *     var tweenable = new Tweenable();
	 *     tweenable.tween({
	 *       from: { color: 'rgb(0,255,0)' },
	 *       to: { color: 'rgb(255,0,255)' },
	 *       step: function (state) {
	 *         console.log(state.color);
	 *       }
	 *     });
	 *
	 * The above snippet will log something like this:
	 *
	 *     rgb(84,170,84)
	 *     ...
	 *     rgb(170,84,170)
	 *     ...
	 *     rgb(255,0,255)
	 *
	 * This extension also supports hexadecimal colors, in both long (`#ff00ff`)
	 * and short (`#f0f`) forms.  Be aware that hexadecimal input values will be
	 * converted into the equivalent RGB output values.  This is done to optimize
	 * for performance.
	 *
	 *     var tweenable = new Tweenable();
	 *     tweenable.tween({
	 *       from: { color: '#0f0' },
	 *       to: { color: '#f0f' },
	 *       step: function (state) {
	 *         console.log(state.color);
	 *       }
	 *     });
	 *
	 * This snippet will generate the same output as the one before it because
	 * equivalent values were supplied (just in hexadecimal form rather than RGB):
	 *
	 *     rgb(84,170,84)
	 *     ...
	 *     rgb(170,84,170)
	 *     ...
	 *     rgb(255,0,255)
	 *
	 * ## Easing support
	 *
	 * Easing works somewhat differently in the Token extension.  This is because
	 * some CSS properties have multiple values in them, and you might need to
	 * tween each value along its own easing curve.  A basic example:
	 *
	 *     var tweenable = new Tweenable();
	 *     tweenable.tween({
	 *       from: { transform: 'translateX(0px) translateY(0px)' },
	 *       to: { transform:   'translateX(100px) translateY(100px)' },
	 *       easing: { transform: 'easeInQuad' },
	 *       step: function (state) {
	 *         console.log(state.transform);
	 *       }
	 *     });
	 *
	 * The above snippet will create values like this:
	 *
	 *     translateX(11.56px) translateY(11.56px)
	 *     ...
	 *     translateX(46.24px) translateY(46.24px)
	 *     ...
	 *     translateX(100px) translateY(100px)
	 *
	 * In this case, the values for `translateX` and `translateY` are always the
	 * same for each step of the tween, because they have the same start and end
	 * points and both use the same easing curve.  We can also tween `translateX`
	 * and `translateY` along independent curves:
	 *
	 *     var tweenable = new Tweenable();
	 *     tweenable.tween({
	 *       from: { transform: 'translateX(0px) translateY(0px)' },
	 *       to: { transform:   'translateX(100px) translateY(100px)' },
	 *       easing: { transform: 'easeInQuad bounce' },
	 *       step: function (state) {
	 *         console.log(state.transform);
	 *       }
	 *     });
	 *
	 * The above snippet will create values like this:
	 *
	 *     translateX(10.89px) translateY(82.35px)
	 *     ...
	 *     translateX(44.89px) translateY(86.73px)
	 *     ...
	 *     translateX(100px) translateY(100px)
	 *
	 * `translateX` and `translateY` are not in sync anymore, because `easeInQuad`
	 * was specified for `translateX` and `bounce` for `translateY`.  Mixing and
	 * matching easing curves can make for some interesting motion in your
	 * animations.
	 *
	 * The order of the space-separated easing curves correspond the token values
	 * they apply to.  If there are more token values than easing curves listed,
	 * the last easing curve listed is used.
	 * @submodule Tweenable.token
	 */
	
	// token function is defined above only so that dox-foundation sees it as
	// documentation and renders it.  It is never used, and is optimized away at
	// build time.
	
	;(function (Tweenable) {
	
	  /**
	   * @typedef {{
	   *   formatString: string
	   *   chunkNames: Array.<string>
	   * }}
	   * @private
	   */
	  var formatManifest;
	
	  // CONSTANTS
	
	  var R_NUMBER_COMPONENT = /(\d|\-|\.)/;
	  var R_FORMAT_CHUNKS = /([^\-0-9\.]+)/g;
	  var R_UNFORMATTED_VALUES = /[0-9.\-]+/g;
	  var R_RGB = new RegExp(
	    'rgb\\(' + R_UNFORMATTED_VALUES.source +
	    (/,\s*/.source) + R_UNFORMATTED_VALUES.source +
	    (/,\s*/.source) + R_UNFORMATTED_VALUES.source + '\\)', 'g');
	  var R_RGB_PREFIX = /^.*\(/;
	  var R_HEX = /#([0-9]|[a-f]){3,6}/gi;
	  var VALUE_PLACEHOLDER = 'VAL';
	
	  // HELPERS
	
	  /**
	   * @param {Array.number} rawValues
	   * @param {string} prefix
	   *
	   * @return {Array.<string>}
	   * @private
	   */
	  function getFormatChunksFrom (rawValues, prefix) {
	    var accumulator = [];
	
	    var rawValuesLength = rawValues.length;
	    var i;
	
	    for (i = 0; i < rawValuesLength; i++) {
	      accumulator.push('_' + prefix + '_' + i);
	    }
	
	    return accumulator;
	  }
	
	  /**
	   * @param {string} formattedString
	   *
	   * @return {string}
	   * @private
	   */
	  function getFormatStringFrom (formattedString) {
	    var chunks = formattedString.match(R_FORMAT_CHUNKS);
	
	    if (!chunks) {
	      // chunks will be null if there were no tokens to parse in
	      // formattedString (for example, if formattedString is '2').  Coerce
	      // chunks to be useful here.
	      chunks = ['', ''];
	
	      // If there is only one chunk, assume that the string is a number
	      // followed by a token...
	      // NOTE: This may be an unwise assumption.
	    } else if (chunks.length === 1 ||
	      // ...or if the string starts with a number component (".", "-", or a
	      // digit)...
	    formattedString[0].match(R_NUMBER_COMPONENT)) {
	      // ...prepend an empty string here to make sure that the formatted number
	      // is properly replaced by VALUE_PLACEHOLDER
	      chunks.unshift('');
	    }
	
	    return chunks.join(VALUE_PLACEHOLDER);
	  }
	
	  /**
	   * Convert all hex color values within a string to an rgb string.
	   *
	   * @param {Object} stateObject
	   *
	   * @return {Object} The modified obj
	   * @private
	   */
	  function sanitizeObjectForHexProps (stateObject) {
	    Tweenable.each(stateObject, function (prop) {
	      var currentProp = stateObject[prop];
	
	      if (typeof currentProp === 'string' && currentProp.match(R_HEX)) {
	        stateObject[prop] = sanitizeHexChunksToRGB(currentProp);
	      }
	    });
	  }
	
	  /**
	   * @param {string} str
	   *
	   * @return {string}
	   * @private
	   */
	  function  sanitizeHexChunksToRGB (str) {
	    return filterStringChunks(R_HEX, str, convertHexToRGB);
	  }
	
	  /**
	   * @param {string} hexString
	   *
	   * @return {string}
	   * @private
	   */
	  function convertHexToRGB (hexString) {
	    var rgbArr = hexToRGBArray(hexString);
	    return 'rgb(' + rgbArr[0] + ',' + rgbArr[1] + ',' + rgbArr[2] + ')';
	  }
	
	  var hexToRGBArray_returnArray = [];
	  /**
	   * Convert a hexadecimal string to an array with three items, one each for
	   * the red, blue, and green decimal values.
	   *
	   * @param {string} hex A hexadecimal string.
	   *
	   * @returns {Array.<number>} The converted Array of RGB values if `hex` is a
	   * valid string, or an Array of three 0's.
	   * @private
	   */
	  function hexToRGBArray (hex) {
	
	    hex = hex.replace(/#/, '');
	
	    // If the string is a shorthand three digit hex notation, normalize it to
	    // the standard six digit notation
	    if (hex.length === 3) {
	      hex = hex.split('');
	      hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
	    }
	
	    hexToRGBArray_returnArray[0] = hexToDec(hex.substr(0, 2));
	    hexToRGBArray_returnArray[1] = hexToDec(hex.substr(2, 2));
	    hexToRGBArray_returnArray[2] = hexToDec(hex.substr(4, 2));
	
	    return hexToRGBArray_returnArray;
	  }
	
	  /**
	   * Convert a base-16 number to base-10.
	   *
	   * @param {Number|String} hex The value to convert
	   *
	   * @returns {Number} The base-10 equivalent of `hex`.
	   * @private
	   */
	  function hexToDec (hex) {
	    return parseInt(hex, 16);
	  }
	
	  /**
	   * Runs a filter operation on all chunks of a string that match a RegExp
	   *
	   * @param {RegExp} pattern
	   * @param {string} unfilteredString
	   * @param {function(string)} filter
	   *
	   * @return {string}
	   * @private
	   */
	  function filterStringChunks (pattern, unfilteredString, filter) {
	    var pattenMatches = unfilteredString.match(pattern);
	    var filteredString = unfilteredString.replace(pattern, VALUE_PLACEHOLDER);
	
	    if (pattenMatches) {
	      var pattenMatchesLength = pattenMatches.length;
	      var currentChunk;
	
	      for (var i = 0; i < pattenMatchesLength; i++) {
	        currentChunk = pattenMatches.shift();
	        filteredString = filteredString.replace(
	          VALUE_PLACEHOLDER, filter(currentChunk));
	      }
	    }
	
	    return filteredString;
	  }
	
	  /**
	   * Check for floating point values within rgb strings and rounds them.
	   *
	   * @param {string} formattedString
	   *
	   * @return {string}
	   * @private
	   */
	  function sanitizeRGBChunks (formattedString) {
	    return filterStringChunks(R_RGB, formattedString, sanitizeRGBChunk);
	  }
	
	  /**
	   * @param {string} rgbChunk
	   *
	   * @return {string}
	   * @private
	   */
	  function sanitizeRGBChunk (rgbChunk) {
	    var numbers = rgbChunk.match(R_UNFORMATTED_VALUES);
	    var numbersLength = numbers.length;
	    var sanitizedString = rgbChunk.match(R_RGB_PREFIX)[0];
	
	    for (var i = 0; i < numbersLength; i++) {
	      sanitizedString += parseInt(numbers[i], 10) + ',';
	    }
	
	    sanitizedString = sanitizedString.slice(0, -1) + ')';
	
	    return sanitizedString;
	  }
	
	  /**
	   * @param {Object} stateObject
	   *
	   * @return {Object} An Object of formatManifests that correspond to
	   * the string properties of stateObject
	   * @private
	   */
	  function getFormatManifests (stateObject) {
	    var manifestAccumulator = {};
	
	    Tweenable.each(stateObject, function (prop) {
	      var currentProp = stateObject[prop];
	
	      if (typeof currentProp === 'string') {
	        var rawValues = getValuesFrom(currentProp);
	
	        manifestAccumulator[prop] = {
	          'formatString': getFormatStringFrom(currentProp)
	          ,'chunkNames': getFormatChunksFrom(rawValues, prop)
	        };
	      }
	    });
	
	    return manifestAccumulator;
	  }
	
	  /**
	   * @param {Object} stateObject
	   * @param {Object} formatManifests
	   * @private
	   */
	  function expandFormattedProperties (stateObject, formatManifests) {
	    Tweenable.each(formatManifests, function (prop) {
	      var currentProp = stateObject[prop];
	      var rawValues = getValuesFrom(currentProp);
	      var rawValuesLength = rawValues.length;
	
	      for (var i = 0; i < rawValuesLength; i++) {
	        stateObject[formatManifests[prop].chunkNames[i]] = +rawValues[i];
	      }
	
	      delete stateObject[prop];
	    });
	  }
	
	  /**
	   * @param {Object} stateObject
	   * @param {Object} formatManifests
	   * @private
	   */
	  function collapseFormattedProperties (stateObject, formatManifests) {
	    Tweenable.each(formatManifests, function (prop) {
	      var currentProp = stateObject[prop];
	      var formatChunks = extractPropertyChunks(
	        stateObject, formatManifests[prop].chunkNames);
	      var valuesList = getValuesList(
	        formatChunks, formatManifests[prop].chunkNames);
	      currentProp = getFormattedValues(
	        formatManifests[prop].formatString, valuesList);
	      stateObject[prop] = sanitizeRGBChunks(currentProp);
	    });
	  }
	
	  /**
	   * @param {Object} stateObject
	   * @param {Array.<string>} chunkNames
	   *
	   * @return {Object} The extracted value chunks.
	   * @private
	   */
	  function extractPropertyChunks (stateObject, chunkNames) {
	    var extractedValues = {};
	    var currentChunkName, chunkNamesLength = chunkNames.length;
	
	    for (var i = 0; i < chunkNamesLength; i++) {
	      currentChunkName = chunkNames[i];
	      extractedValues[currentChunkName] = stateObject[currentChunkName];
	      delete stateObject[currentChunkName];
	    }
	
	    return extractedValues;
	  }
	
	  var getValuesList_accumulator = [];
	  /**
	   * @param {Object} stateObject
	   * @param {Array.<string>} chunkNames
	   *
	   * @return {Array.<number>}
	   * @private
	   */
	  function getValuesList (stateObject, chunkNames) {
	    getValuesList_accumulator.length = 0;
	    var chunkNamesLength = chunkNames.length;
	
	    for (var i = 0; i < chunkNamesLength; i++) {
	      getValuesList_accumulator.push(stateObject[chunkNames[i]]);
	    }
	
	    return getValuesList_accumulator;
	  }
	
	  /**
	   * @param {string} formatString
	   * @param {Array.<number>} rawValues
	   *
	   * @return {string}
	   * @private
	   */
	  function getFormattedValues (formatString, rawValues) {
	    var formattedValueString = formatString;
	    var rawValuesLength = rawValues.length;
	
	    for (var i = 0; i < rawValuesLength; i++) {
	      formattedValueString = formattedValueString.replace(
	        VALUE_PLACEHOLDER, +rawValues[i].toFixed(4));
	    }
	
	    return formattedValueString;
	  }
	
	  /**
	   * Note: It's the duty of the caller to convert the Array elements of the
	   * return value into numbers.  This is a performance optimization.
	   *
	   * @param {string} formattedString
	   *
	   * @return {Array.<string>|null}
	   * @private
	   */
	  function getValuesFrom (formattedString) {
	    return formattedString.match(R_UNFORMATTED_VALUES);
	  }
	
	  /**
	   * @param {Object} easingObject
	   * @param {Object} tokenData
	   * @private
	   */
	  function expandEasingObject (easingObject, tokenData) {
	    Tweenable.each(tokenData, function (prop) {
	      var currentProp = tokenData[prop];
	      var chunkNames = currentProp.chunkNames;
	      var chunkLength = chunkNames.length;
	
	      var easing = easingObject[prop];
	      var i;
	
	      if (typeof easing === 'string') {
	        var easingChunks = easing.split(' ');
	        var lastEasingChunk = easingChunks[easingChunks.length - 1];
	
	        for (i = 0; i < chunkLength; i++) {
	          easingObject[chunkNames[i]] = easingChunks[i] || lastEasingChunk;
	        }
	
	      } else {
	        for (i = 0; i < chunkLength; i++) {
	          easingObject[chunkNames[i]] = easing;
	        }
	      }
	
	      delete easingObject[prop];
	    });
	  }
	
	  /**
	   * @param {Object} easingObject
	   * @param {Object} tokenData
	   * @private
	   */
	  function collapseEasingObject (easingObject, tokenData) {
	    Tweenable.each(tokenData, function (prop) {
	      var currentProp = tokenData[prop];
	      var chunkNames = currentProp.chunkNames;
	      var chunkLength = chunkNames.length;
	
	      var firstEasing = easingObject[chunkNames[0]];
	      var typeofEasings = typeof firstEasing;
	
	      if (typeofEasings === 'string') {
	        var composedEasingString = '';
	
	        for (var i = 0; i < chunkLength; i++) {
	          composedEasingString += ' ' + easingObject[chunkNames[i]];
	          delete easingObject[chunkNames[i]];
	        }
	
	        easingObject[prop] = composedEasingString.substr(1);
	      } else {
	        easingObject[prop] = firstEasing;
	      }
	    });
	  }
	
	  Tweenable.prototype.filter.token = {
	    'tweenCreated': function (currentState, fromState, toState, easingObject) {
	      sanitizeObjectForHexProps(currentState);
	      sanitizeObjectForHexProps(fromState);
	      sanitizeObjectForHexProps(toState);
	      this._tokenData = getFormatManifests(currentState);
	    },
	
	    'beforeTween': function (currentState, fromState, toState, easingObject) {
	      expandEasingObject(easingObject, this._tokenData);
	      expandFormattedProperties(currentState, this._tokenData);
	      expandFormattedProperties(fromState, this._tokenData);
	      expandFormattedProperties(toState, this._tokenData);
	    },
	
	    'afterTween': function (currentState, fromState, toState, easingObject) {
	      collapseFormattedProperties(currentState, this._tokenData);
	      collapseFormattedProperties(fromState, this._tokenData);
	      collapseFormattedProperties(toState, this._tokenData);
	      collapseEasingObject(easingObject, this._tokenData);
	    }
	  };
	
	} (Tweenable));
	
	}).call(null);


/***/ },

/***/ 77:
/***/ function(module, exports) {

	// Utility functions
	
	var PREFIXES = 'Webkit Moz O ms'.split(' ');
	var FLOAT_COMPARISON_EPSILON = 0.001;
	
	// Copy all attributes from source object to destination object.
	// destination object is mutated.
	function extend(destination, source, recursive) {
	    destination = destination || {};
	    source = source || {};
	    recursive = recursive || false;
	
	    for (var attrName in source) {
	        if (source.hasOwnProperty(attrName)) {
	            var destVal = destination[attrName];
	            var sourceVal = source[attrName];
	            if (recursive && isObject(destVal) && isObject(sourceVal)) {
	                destination[attrName] = extend(destVal, sourceVal, recursive);
	            } else {
	                destination[attrName] = sourceVal;
	            }
	        }
	    }
	
	    return destination;
	}
	
	// Renders templates with given variables. Variables must be surrounded with
	// braces without any spaces, e.g. {variable}
	// All instances of variable placeholders will be replaced with given content
	// Example:
	// render('Hello, {message}!', {message: 'world'})
	function render(template, vars) {
	    var rendered = template;
	
	    for (var key in vars) {
	        if (vars.hasOwnProperty(key)) {
	            var val = vars[key];
	            var regExpString = '\\{' + key + '\\}';
	            var regExp = new RegExp(regExpString, 'g');
	
	            rendered = rendered.replace(regExp, val);
	        }
	    }
	
	    return rendered;
	}
	
	function setStyle(element, style, value) {
	    var elStyle = element.style;  // cache for performance
	
	    for (var i = 0; i < PREFIXES.length; ++i) {
	        var prefix = PREFIXES[i];
	        elStyle[prefix + capitalize(style)] = value;
	    }
	
	    elStyle[style] = value;
	}
	
	function setStyles(element, styles) {
	    forEachObject(styles, function(styleValue, styleName) {
	        // Allow disabling some individual styles by setting them
	        // to null or undefined
	        if (styleValue === null || styleValue === undefined) {
	            return;
	        }
	
	        // If style's value is {prefix: true, value: '50%'},
	        // Set also browser prefixed styles
	        if (isObject(styleValue) && styleValue.prefix === true) {
	            setStyle(element, styleName, styleValue.value);
	        } else {
	            element.style[styleName] = styleValue;
	        }
	    });
	}
	
	function capitalize(text) {
	    return text.charAt(0).toUpperCase() + text.slice(1);
	}
	
	function isString(obj) {
	    return typeof obj === 'string' || obj instanceof String;
	}
	
	function isFunction(obj) {
	    return typeof obj === 'function';
	}
	
	function isArray(obj) {
	    return Object.prototype.toString.call(obj) === '[object Array]';
	}
	
	// Returns true if `obj` is object as in {a: 1, b: 2}, not if it's function or
	// array
	function isObject(obj) {
	    if (isArray(obj)) {
	        return false;
	    }
	
	    var type = typeof obj;
	    return type === 'object' && !!obj;
	}
	
	function forEachObject(object, callback) {
	    for (var key in object) {
	        if (object.hasOwnProperty(key)) {
	            var val = object[key];
	            callback(val, key);
	        }
	    }
	}
	
	function floatEquals(a, b) {
	    return Math.abs(a - b) < FLOAT_COMPARISON_EPSILON;
	}
	
	// https://coderwall.com/p/nygghw/don-t-use-innerhtml-to-empty-dom-elements
	function removeChildren(el) {
	    while (el.firstChild) {
	        el.removeChild(el.firstChild);
	    }
	}
	
	module.exports = {
	    extend: extend,
	    render: render,
	    setStyle: setStyle,
	    setStyles: setStyles,
	    capitalize: capitalize,
	    isString: isString,
	    isFunction: isFunction,
	    isObject: isObject,
	    forEachObject: forEachObject,
	    floatEquals: floatEquals,
	    removeChildren: removeChildren
	};


/***/ },

/***/ 78:
/***/ function(module, exports, __webpack_require__) {

	// Circle shaped progress bar
	
	var Shape = __webpack_require__(74);
	var utils = __webpack_require__(77);
	
	var Circle = function Circle(container, options) {
	    // Use two arcs to form a circle
	    // See this answer http://stackoverflow.com/a/10477334/1446092
	    this._pathTemplate =
	        'M 50,50 m 0,-{radius}' +
	        ' a {radius},{radius} 0 1 1 0,{2radius}' +
	        ' a {radius},{radius} 0 1 1 0,-{2radius}';
	
	    this.containerAspectRatio = 1;
	
	    Shape.apply(this, arguments);
	};
	
	Circle.prototype = new Shape();
	Circle.prototype.constructor = Circle;
	
	Circle.prototype._pathString = function _pathString(opts) {
	    var widthOfWider = opts.strokeWidth;
	    if (opts.trailWidth && opts.trailWidth > opts.strokeWidth) {
	        widthOfWider = opts.trailWidth;
	    }
	
	    var r = 50 - widthOfWider / 2;
	
	    return utils.render(this._pathTemplate, {
	        radius: r,
	        '2radius': r * 2
	    });
	};
	
	Circle.prototype._trailString = function _trailString(opts) {
	    return this._pathString(opts);
	};
	
	module.exports = Circle;


/***/ },

/***/ 79:
/***/ function(module, exports, __webpack_require__) {

	// Semi-SemiCircle shaped progress bar
	
	var Shape = __webpack_require__(74);
	var Circle = __webpack_require__(78);
	var utils = __webpack_require__(77);
	
	var SemiCircle = function SemiCircle(container, options) {
	    // Use one arc to form a SemiCircle
	    // See this answer http://stackoverflow.com/a/10477334/1446092
	    this._pathTemplate =
	        'M 50,50 m -{radius},0' +
	        ' a {radius},{radius} 0 1 1 {2radius},0';
	
	    this.containerAspectRatio = 2;
	
	    Shape.apply(this, arguments);
	};
	
	SemiCircle.prototype = new Shape();
	SemiCircle.prototype.constructor = SemiCircle;
	
	SemiCircle.prototype._initializeSvg = function _initializeSvg(svg, opts) {
	    svg.setAttribute('viewBox', '0 0 100 50');
	};
	
	SemiCircle.prototype._initializeTextContainer = function _initializeTextContainer(
	    opts,
	    container,
	    textContainer
	) {
	    if (opts.text.style) {
	        // Reset top style
	        textContainer.style.top = 'auto';
	        textContainer.style.bottom = '0';
	
	        if (opts.text.alignToBottom) {
	            utils.setStyle(textContainer, 'transform', 'translate(-50%, 0)');
	        } else {
	            utils.setStyle(textContainer, 'transform', 'translate(-50%, 50%)');
	        }
	    }
	};
	
	// Share functionality with Circle, just have different path
	SemiCircle.prototype._pathString = Circle.prototype._pathString;
	SemiCircle.prototype._trailString = Circle.prototype._trailString;
	
	module.exports = SemiCircle;


/***/ }

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgYzYwOGYzOGU4MjJkMzNkZTNlZmU/OWZlZCoqIiwid2VicGFjazovLy8uL3Jlc291cmNlcy9hc3NldHMvdHlwZXNjcmlwdC9QbHVnaW5zL1Byb2dyZXNzQmFyLmpzIiwid2VicGFjazovLy8uL3Jlc291cmNlcy9hc3NldHMvdHlwZXNjcmlwdC9BYnN0cmFjdC9QbHVnaW5zLmpzPzM1MjEqKiIsIndlYnBhY2s6Ly8vLi9+L3Byb2dyZXNzYmFyLmpzL3NyYy9tYWluLmpzIiwid2VicGFjazovLy8uL34vcHJvZ3Jlc3NiYXIuanMvc3JjL2xpbmUuanMiLCJ3ZWJwYWNrOi8vLy4vfi9wcm9ncmVzc2Jhci5qcy9zcmMvc2hhcGUuanMiLCJ3ZWJwYWNrOi8vLy4vfi9wcm9ncmVzc2Jhci5qcy9zcmMvcGF0aC5qcyIsIndlYnBhY2s6Ly8vLi9+L3NoaWZ0eS9kaXN0L3NoaWZ0eS5qcyIsIndlYnBhY2s6Ly8vLi9+L3Byb2dyZXNzYmFyLmpzL3NyYy91dGlscy5qcyIsIndlYnBhY2s6Ly8vLi9+L3Byb2dyZXNzYmFyLmpzL3NyYy9jaXJjbGUuanMiLCJ3ZWJwYWNrOi8vLy4vfi9wcm9ncmVzc2Jhci5qcy9zcmMvc2VtaWNpcmNsZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsdUJBQWU7QUFDZjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7QUN0Q0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW1CLHNCQUFzQjtBQUN6QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFDO0FBQ0Qsd0M7Ozs7Ozs7QUN4QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUM7QUFDRDtBQUNBLG9DOzs7Ozs7O0FDVkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7Ozs7Ozs7QUNoQkE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLGdDQUErQixPQUFPLFFBQVEsT0FBTztBQUNyRDtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7Ozs7Ozs7QUM1QkE7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBLE1BQUssY0FBYzs7QUFFbkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxrQ0FBaUM7O0FBRWpDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7Ozs7Ozs7QUM3VEE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtB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QTtBQUNBLE1BQUs7O0FBRUw7QUFDQSw4QkFBNkI7QUFDN0I7QUFDQSxNQUFLOztBQUVMO0FBQ0E7QUFDQSxNQUFLOztBQUVMO0FBQ0E7QUFDQSxNQUFLOztBQUVMO0FBQ0EsOEJBQTZCO0FBQzdCO0FBQ0EsTUFBSzs7QUFFTDtBQUNBO0FBQ0EsTUFBSzs7QUFFTDtBQUNBO0FBQ0EsTUFBSzs7QUFFTDtBQUNBLDhCQUE2QjtBQUM3QjtBQUNBLE1BQUs7O0FBRUw7QUFDQTtBQUNBLE1BQUs7O0FBRUw7QUFDQTtBQUNBLE1BQUs7O0FBRUw7QUFDQTtBQUNBLE1BQUs7O0FBRUw7QUFDQTtBQUNBLE1BQUs7O0FBRUw7QUFDQTtBQUNBLE1BQUs7O0FBRUw7QUFDQSx1QkFBc0I7QUFDdEIsdUJBQXNCO0FBQ3RCLDhCQUE2QjtBQUM3QjtBQUNBLE1BQUs7O0FBRUw7QUFDQTtBQUNBLE1BQUs7O0FBRUw7QUFDQTtBQUNBLE1BQUs7O0FBRUw7QUFDQSw4QkFBNkI7QUFDN0I7QUFDQSxNQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBLFFBQU87QUFDUDtBQUNBLFFBQU87QUFDUDtBQUNBLFFBQU87QUFDUDtBQUNBO0FBQ0EsTUFBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQSxNQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBLE1BQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQSxNQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBLE1BQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0EsTUFBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQSxRQUFPO0FBQ1A7QUFDQSxRQUFPO0FBQ1A7QUFDQSxRQUFPO0FBQ1A7QUFDQTtBQUNBLE1BQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0EsUUFBTztBQUNQO0FBQ0EsUUFBTztBQUNQO0FBQ0EsUUFBTztBQUNQO0FBQ0E7QUFDQSxNQUFLOztBQUVMO0FBQ0EsOEJBQTZCO0FBQzdCO0FB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O0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBIiwiZmlsZSI6InByb2dyZXNzQmFyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGV4cG9ydHM6IHt9LFxuIFx0XHRcdGlkOiBtb2R1bGVJZCxcbiBcdFx0XHRsb2FkZWQ6IGZhbHNlXG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiB3ZWJwYWNrL2Jvb3RzdHJhcCBjNjA4ZjM4ZTgyMmQzM2RlM2VmZVxuICoqLyIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9fZXh0ZW5kcyA9ICh0aGlzICYmIHRoaXMuX19leHRlbmRzKSB8fCBmdW5jdGlvbiAoZCwgYikge1xuICAgIGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdO1xuICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxuICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcbn07XG52YXIgUGx1Z2luc18xID0gcmVxdWlyZShcIi4uL0Fic3RyYWN0L1BsdWdpbnNcIik7XG53aW5kb3dbJ2RyZWFtc2FyayddLmV4cG9zZXMoe1xuICAgIFByb2dyZXNzQmFyOiByZXF1aXJlKFwicHJvZ3Jlc3NiYXIuanNcIilcbn0pO1xudmFyIFByb2dyZXNzQmFyID0gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoUHJvZ3Jlc3NCYXIsIF9zdXBlcik7XG4gICAgZnVuY3Rpb24gUHJvZ3Jlc3NCYXIoKSB7XG4gICAgICAgIF9zdXBlci5jYWxsKHRoaXMpO1xuICAgIH1cbiAgICByZXR1cm4gUHJvZ3Jlc3NCYXI7XG59KFBsdWdpbnNfMS5QbHVnaW5zKSk7XG5leHBvcnRzLlByb2dyZXNzQmFyID0gUHJvZ3Jlc3NCYXI7XG4vKipcbiAqIEF1dG8gaW5zdGFsbCBpdHNlbGZcbiAqL1xud2luZG93WydkcmVhbXNhcmsnXS5pbnN0YWxsKHtcbiAgICBQcm9ncmVzc0JhcjogUHJvZ3Jlc3NCYXJcbn0pO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9UHJvZ3Jlc3NCYXIuanMubWFwXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3Jlc291cmNlcy9hc3NldHMvdHlwZXNjcmlwdC9QbHVnaW5zL1Byb2dyZXNzQmFyLmpzXG4gKiogbW9kdWxlIGlkID0gMFxuICoqIG1vZHVsZSBjaHVua3MgPSAzXG4gKiovIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgUGx1Z2lucyA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gUGx1Z2lucygpIHtcbiAgICAgICAgdGhpcy5leHBvc2VzID0ge307XG4gICAgfVxuICAgIFBsdWdpbnMucHJvdG90eXBlLmluc3RhbGwgPSBmdW5jdGlvbiAoKSB7XG4gICAgfTtcbiAgICByZXR1cm4gUGx1Z2lucztcbn0oKSk7XG5leHBvcnRzLlBsdWdpbnMgPSBQbHVnaW5zO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9UGx1Z2lucy5qcy5tYXBcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vcmVzb3VyY2VzL2Fzc2V0cy90eXBlc2NyaXB0L0Fic3RyYWN0L1BsdWdpbnMuanNcbiAqKiBtb2R1bGUgaWQgPSAxXG4gKiogbW9kdWxlIGNodW5rcyA9IDAgMSAyIDNcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IHtcbiAgICAvLyBIaWdoZXIgbGV2ZWwgQVBJLCBkaWZmZXJlbnQgc2hhcGVkIHByb2dyZXNzIGJhcnNcbiAgICBMaW5lOiByZXF1aXJlKCcuL2xpbmUnKSxcbiAgICBDaXJjbGU6IHJlcXVpcmUoJy4vY2lyY2xlJyksXG4gICAgU2VtaUNpcmNsZTogcmVxdWlyZSgnLi9zZW1pY2lyY2xlJyksXG5cbiAgICAvLyBMb3dlciBsZXZlbCBBUEkgdG8gdXNlIGFueSBTVkcgcGF0aFxuICAgIFBhdGg6IHJlcXVpcmUoJy4vcGF0aCcpLFxuXG4gICAgLy8gQmFzZS1jbGFzcyBmb3IgY3JlYXRpbmcgbmV3IGN1c3RvbSBzaGFwZXNcbiAgICAvLyB0byBiZSBpbiBsaW5lIHdpdGggdGhlIEFQSSBvZiBidWlsdC1pbiBzaGFwZXNcbiAgICAvLyBVbmRvY3VtZW50ZWQuXG4gICAgU2hhcGU6IHJlcXVpcmUoJy4vc2hhcGUnKSxcblxuICAgIC8vIEludGVybmFsIHV0aWxzLCB1bmRvY3VtZW50ZWQuXG4gICAgdXRpbHM6IHJlcXVpcmUoJy4vdXRpbHMnKVxufTtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L3Byb2dyZXNzYmFyLmpzL3NyYy9tYWluLmpzXG4gKiogbW9kdWxlIGlkID0gNzJcbiAqKiBtb2R1bGUgY2h1bmtzID0gM1xuICoqLyIsIi8vIExpbmUgc2hhcGVkIHByb2dyZXNzIGJhclxuXG52YXIgU2hhcGUgPSByZXF1aXJlKCcuL3NoYXBlJyk7XG52YXIgdXRpbHMgPSByZXF1aXJlKCcuL3V0aWxzJyk7XG5cbnZhciBMaW5lID0gZnVuY3Rpb24gTGluZShjb250YWluZXIsIG9wdGlvbnMpIHtcbiAgICB0aGlzLl9wYXRoVGVtcGxhdGUgPSAnTSAwLHtjZW50ZXJ9IEwgMTAwLHtjZW50ZXJ9JztcbiAgICBTaGFwZS5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xufTtcblxuTGluZS5wcm90b3R5cGUgPSBuZXcgU2hhcGUoKTtcbkxpbmUucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gTGluZTtcblxuTGluZS5wcm90b3R5cGUuX2luaXRpYWxpemVTdmcgPSBmdW5jdGlvbiBfaW5pdGlhbGl6ZVN2ZyhzdmcsIG9wdHMpIHtcbiAgICBzdmcuc2V0QXR0cmlidXRlKCd2aWV3Qm94JywgJzAgMCAxMDAgJyArIG9wdHMuc3Ryb2tlV2lkdGgpO1xuICAgIHN2Zy5zZXRBdHRyaWJ1dGUoJ3ByZXNlcnZlQXNwZWN0UmF0aW8nLCAnbm9uZScpO1xufTtcblxuTGluZS5wcm90b3R5cGUuX3BhdGhTdHJpbmcgPSBmdW5jdGlvbiBfcGF0aFN0cmluZyhvcHRzKSB7XG4gICAgcmV0dXJuIHV0aWxzLnJlbmRlcih0aGlzLl9wYXRoVGVtcGxhdGUsIHtcbiAgICAgICAgY2VudGVyOiBvcHRzLnN0cm9rZVdpZHRoIC8gMlxuICAgIH0pO1xufTtcblxuTGluZS5wcm90b3R5cGUuX3RyYWlsU3RyaW5nID0gZnVuY3Rpb24gX3RyYWlsU3RyaW5nKG9wdHMpIHtcbiAgICByZXR1cm4gdGhpcy5fcGF0aFN0cmluZyhvcHRzKTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gTGluZTtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L3Byb2dyZXNzYmFyLmpzL3NyYy9saW5lLmpzXG4gKiogbW9kdWxlIGlkID0gNzNcbiAqKiBtb2R1bGUgY2h1bmtzID0gM1xuICoqLyIsIi8vIEJhc2Ugb2JqZWN0IGZvciBkaWZmZXJlbnQgcHJvZ3Jlc3MgYmFyIHNoYXBlc1xuXG52YXIgUGF0aCA9IHJlcXVpcmUoJy4vcGF0aCcpO1xudmFyIHV0aWxzID0gcmVxdWlyZSgnLi91dGlscycpO1xuXG52YXIgREVTVFJPWUVEX0VSUk9SID0gJ09iamVjdCBpcyBkZXN0cm95ZWQnO1xuXG52YXIgU2hhcGUgPSBmdW5jdGlvbiBTaGFwZShjb250YWluZXIsIG9wdHMpIHtcbiAgICAvLyBUaHJvdyBhIGJldHRlciBlcnJvciBpZiBwcm9ncmVzcyBiYXJzIGFyZSBub3QgaW5pdGlhbGl6ZWQgd2l0aCBgbmV3YFxuICAgIC8vIGtleXdvcmRcbiAgICBpZiAoISh0aGlzIGluc3RhbmNlb2YgU2hhcGUpKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignQ29uc3RydWN0b3Igd2FzIGNhbGxlZCB3aXRob3V0IG5ldyBrZXl3b3JkJyk7XG4gICAgfVxuXG4gICAgLy8gUHJldmVudCBjYWxsaW5nIGNvbnN0cnVjdG9yIHdpdGhvdXQgcGFyYW1ldGVycyBzbyBpbmhlcml0YW5jZVxuICAgIC8vIHdvcmtzIGNvcnJlY3RseS4gVG8gdW5kZXJzdGFuZCwgdGhpcyBpcyBob3cgU2hhcGUgaXMgaW5oZXJpdGVkOlxuICAgIC8vXG4gICAgLy8gICBMaW5lLnByb3RvdHlwZSA9IG5ldyBTaGFwZSgpO1xuICAgIC8vXG4gICAgLy8gV2UganVzdCB3YW50IHRvIHNldCB0aGUgcHJvdG90eXBlIGZvciBMaW5lLlxuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICAvLyBEZWZhdWx0IHBhcmFtZXRlcnMgZm9yIHByb2dyZXNzIGJhciBjcmVhdGlvblxuICAgIHRoaXMuX29wdHMgPSB1dGlscy5leHRlbmQoe1xuICAgICAgICBjb2xvcjogJyM1NTUnLFxuICAgICAgICBzdHJva2VXaWR0aDogMS4wLFxuICAgICAgICB0cmFpbENvbG9yOiBudWxsLFxuICAgICAgICB0cmFpbFdpZHRoOiBudWxsLFxuICAgICAgICBmaWxsOiBudWxsLFxuICAgICAgICB0ZXh0OiB7XG4gICAgICAgICAgICBzdHlsZToge1xuICAgICAgICAgICAgICAgIGNvbG9yOiBudWxsLFxuICAgICAgICAgICAgICAgIHBvc2l0aW9uOiAnYWJzb2x1dGUnLFxuICAgICAgICAgICAgICAgIGxlZnQ6ICc1MCUnLFxuICAgICAgICAgICAgICAgIHRvcDogJzUwJScsXG4gICAgICAgICAgICAgICAgcGFkZGluZzogMCxcbiAgICAgICAgICAgICAgICBtYXJnaW46IDAsXG4gICAgICAgICAgICAgICAgdHJhbnNmb3JtOiB7XG4gICAgICAgICAgICAgICAgICAgIHByZWZpeDogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6ICd0cmFuc2xhdGUoLTUwJSwgLTUwJSknXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGF1dG9TdHlsZUNvbnRhaW5lcjogdHJ1ZSxcbiAgICAgICAgICAgIGFsaWduVG9Cb3R0b206IHRydWUsXG4gICAgICAgICAgICB2YWx1ZTogbnVsbCxcbiAgICAgICAgICAgIGNsYXNzTmFtZTogJ3Byb2dyZXNzYmFyLXRleHQnXG4gICAgICAgIH0sXG4gICAgICAgIHN2Z1N0eWxlOiB7XG4gICAgICAgICAgICBkaXNwbGF5OiAnYmxvY2snLFxuICAgICAgICAgICAgd2lkdGg6ICcxMDAlJ1xuICAgICAgICB9LFxuICAgICAgICB3YXJuaW5nczogZmFsc2VcbiAgICB9LCBvcHRzLCB0cnVlKTsgIC8vIFVzZSByZWN1cnNpdmUgZXh0ZW5kXG5cbiAgICAvLyBJZiB1c2VyIHNwZWNpZmllcyBlLmcuIHN2Z1N0eWxlIG9yIHRleHQgc3R5bGUsIHRoZSB3aG9sZSBvYmplY3RcbiAgICAvLyBzaG91bGQgcmVwbGFjZSB0aGUgZGVmYXVsdHMgdG8gbWFrZSB3b3JraW5nIHdpdGggc3R5bGVzIGVhc2llclxuICAgIGlmICh1dGlscy5pc09iamVjdChvcHRzKSAmJiBvcHRzLnN2Z1N0eWxlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgdGhpcy5fb3B0cy5zdmdTdHlsZSA9IG9wdHMuc3ZnU3R5bGU7XG4gICAgfVxuICAgIGlmICh1dGlscy5pc09iamVjdChvcHRzKSAmJiB1dGlscy5pc09iamVjdChvcHRzLnRleHQpICYmIG9wdHMudGV4dC5zdHlsZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHRoaXMuX29wdHMudGV4dC5zdHlsZSA9IG9wdHMudGV4dC5zdHlsZTtcbiAgICB9XG5cbiAgICB2YXIgc3ZnVmlldyA9IHRoaXMuX2NyZWF0ZVN2Z1ZpZXcodGhpcy5fb3B0cyk7XG5cbiAgICB2YXIgZWxlbWVudDtcbiAgICBpZiAodXRpbHMuaXNTdHJpbmcoY29udGFpbmVyKSkge1xuICAgICAgICBlbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcihjb250YWluZXIpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIGVsZW1lbnQgPSBjb250YWluZXI7XG4gICAgfVxuXG4gICAgaWYgKCFlbGVtZW50KSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignQ29udGFpbmVyIGRvZXMgbm90IGV4aXN0OiAnICsgY29udGFpbmVyKTtcbiAgICB9XG5cbiAgICB0aGlzLl9jb250YWluZXIgPSBlbGVtZW50O1xuICAgIHRoaXMuX2NvbnRhaW5lci5hcHBlbmRDaGlsZChzdmdWaWV3LnN2Zyk7XG4gICAgaWYgKHRoaXMuX29wdHMud2FybmluZ3MpIHtcbiAgICAgICAgdGhpcy5fd2FybkNvbnRhaW5lckFzcGVjdFJhdGlvKHRoaXMuX2NvbnRhaW5lcik7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuX29wdHMuc3ZnU3R5bGUpIHtcbiAgICAgICAgdXRpbHMuc2V0U3R5bGVzKHN2Z1ZpZXcuc3ZnLCB0aGlzLl9vcHRzLnN2Z1N0eWxlKTtcbiAgICB9XG5cbiAgICAvLyBFeHBvc2UgcHVibGljIGF0dHJpYnV0ZXMgYmVmb3JlIFBhdGggaW5pdGlhbGl6YXRpb25cbiAgICB0aGlzLnN2ZyA9IHN2Z1ZpZXcuc3ZnO1xuICAgIHRoaXMucGF0aCA9IHN2Z1ZpZXcucGF0aDtcbiAgICB0aGlzLnRyYWlsID0gc3ZnVmlldy50cmFpbDtcbiAgICB0aGlzLnRleHQgPSBudWxsO1xuXG4gICAgdmFyIG5ld09wdHMgPSB1dGlscy5leHRlbmQoe1xuICAgICAgICBhdHRhY2htZW50OiB1bmRlZmluZWQsXG4gICAgICAgIHNoYXBlOiB0aGlzXG4gICAgfSwgdGhpcy5fb3B0cyk7XG4gICAgdGhpcy5fcHJvZ3Jlc3NQYXRoID0gbmV3IFBhdGgoc3ZnVmlldy5wYXRoLCBuZXdPcHRzKTtcblxuICAgIGlmICh1dGlscy5pc09iamVjdCh0aGlzLl9vcHRzLnRleHQpICYmIHRoaXMuX29wdHMudGV4dC52YWx1ZSAhPT0gbnVsbCkge1xuICAgICAgICB0aGlzLnNldFRleHQodGhpcy5fb3B0cy50ZXh0LnZhbHVlKTtcbiAgICB9XG59O1xuXG5TaGFwZS5wcm90b3R5cGUuYW5pbWF0ZSA9IGZ1bmN0aW9uIGFuaW1hdGUocHJvZ3Jlc3MsIG9wdHMsIGNiKSB7XG4gICAgaWYgKHRoaXMuX3Byb2dyZXNzUGF0aCA9PT0gbnVsbCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoREVTVFJPWUVEX0VSUk9SKTtcbiAgICB9XG5cbiAgICB0aGlzLl9wcm9ncmVzc1BhdGguYW5pbWF0ZShwcm9ncmVzcywgb3B0cywgY2IpO1xufTtcblxuU2hhcGUucHJvdG90eXBlLnN0b3AgPSBmdW5jdGlvbiBzdG9wKCkge1xuICAgIGlmICh0aGlzLl9wcm9ncmVzc1BhdGggPT09IG51bGwpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKERFU1RST1lFRF9FUlJPUik7XG4gICAgfVxuXG4gICAgLy8gRG9uJ3QgY3Jhc2ggaWYgc3RvcCBpcyBjYWxsZWQgaW5zaWRlIHN0ZXAgZnVuY3Rpb25cbiAgICBpZiAodGhpcy5fcHJvZ3Jlc3NQYXRoID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMuX3Byb2dyZXNzUGF0aC5zdG9wKCk7XG59O1xuXG5TaGFwZS5wcm90b3R5cGUuZGVzdHJveSA9IGZ1bmN0aW9uIGRlc3Ryb3koKSB7XG4gICAgaWYgKHRoaXMuX3Byb2dyZXNzUGF0aCA9PT0gbnVsbCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoREVTVFJPWUVEX0VSUk9SKTtcbiAgICB9XG5cbiAgICB0aGlzLnN0b3AoKTtcbiAgICB0aGlzLnN2Zy5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHRoaXMuc3ZnKTtcbiAgICB0aGlzLnN2ZyA9IG51bGw7XG4gICAgdGhpcy5wYXRoID0gbnVsbDtcbiAgICB0aGlzLnRyYWlsID0gbnVsbDtcbiAgICB0aGlzLl9wcm9ncmVzc1BhdGggPSBudWxsO1xuXG4gICAgaWYgKHRoaXMudGV4dCAhPT0gbnVsbCkge1xuICAgICAgICB0aGlzLnRleHQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZCh0aGlzLnRleHQpO1xuICAgICAgICB0aGlzLnRleHQgPSBudWxsO1xuICAgIH1cbn07XG5cblNoYXBlLnByb3RvdHlwZS5zZXQgPSBmdW5jdGlvbiBzZXQocHJvZ3Jlc3MpIHtcbiAgICBpZiAodGhpcy5fcHJvZ3Jlc3NQYXRoID09PSBudWxsKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihERVNUUk9ZRURfRVJST1IpO1xuICAgIH1cblxuICAgIHRoaXMuX3Byb2dyZXNzUGF0aC5zZXQocHJvZ3Jlc3MpO1xufTtcblxuU2hhcGUucHJvdG90eXBlLnZhbHVlID0gZnVuY3Rpb24gdmFsdWUoKSB7XG4gICAgaWYgKHRoaXMuX3Byb2dyZXNzUGF0aCA9PT0gbnVsbCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoREVTVFJPWUVEX0VSUk9SKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5fcHJvZ3Jlc3NQYXRoID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgcmV0dXJuIDA7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMuX3Byb2dyZXNzUGF0aC52YWx1ZSgpO1xufTtcblxuU2hhcGUucHJvdG90eXBlLnNldFRleHQgPSBmdW5jdGlvbiBzZXRUZXh0KG5ld1RleHQpIHtcbiAgICBpZiAodGhpcy5fcHJvZ3Jlc3NQYXRoID09PSBudWxsKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihERVNUUk9ZRURfRVJST1IpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLnRleHQgPT09IG51bGwpIHtcbiAgICAgICAgLy8gQ3JlYXRlIG5ldyB0ZXh0IG5vZGVcbiAgICAgICAgdGhpcy50ZXh0ID0gdGhpcy5fY3JlYXRlVGV4dENvbnRhaW5lcih0aGlzLl9vcHRzLCB0aGlzLl9jb250YWluZXIpO1xuICAgICAgICB0aGlzLl9jb250YWluZXIuYXBwZW5kQ2hpbGQodGhpcy50ZXh0KTtcbiAgICB9XG5cbiAgICAvLyBSZW1vdmUgcHJldmlvdXMgdGV4dCBhbmQgYWRkIG5ld1xuICAgIGlmICh1dGlscy5pc09iamVjdChuZXdUZXh0KSkge1xuICAgICAgICB1dGlscy5yZW1vdmVDaGlsZHJlbih0aGlzLnRleHQpO1xuICAgICAgICB0aGlzLnRleHQuYXBwZW5kQ2hpbGQobmV3VGV4dCk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy50ZXh0LmlubmVySFRNTCA9IG5ld1RleHQ7XG4gICAgfVxufTtcblxuU2hhcGUucHJvdG90eXBlLl9jcmVhdGVTdmdWaWV3ID0gZnVuY3Rpb24gX2NyZWF0ZVN2Z1ZpZXcob3B0cykge1xuICAgIHZhciBzdmcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMoJ2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJywgJ3N2ZycpO1xuICAgIHRoaXMuX2luaXRpYWxpemVTdmcoc3ZnLCBvcHRzKTtcblxuICAgIHZhciB0cmFpbFBhdGggPSBudWxsO1xuICAgIC8vIEVhY2ggb3B0aW9uIGxpc3RlZCBpbiB0aGUgaWYgY29uZGl0aW9uIGFyZSAndHJpZ2dlcnMnIGZvciBjcmVhdGluZ1xuICAgIC8vIHRoZSB0cmFpbCBwYXRoXG4gICAgaWYgKG9wdHMudHJhaWxDb2xvciB8fCBvcHRzLnRyYWlsV2lkdGgpIHtcbiAgICAgICAgdHJhaWxQYXRoID0gdGhpcy5fY3JlYXRlVHJhaWwob3B0cyk7XG4gICAgICAgIHN2Zy5hcHBlbmRDaGlsZCh0cmFpbFBhdGgpO1xuICAgIH1cblxuICAgIHZhciBwYXRoID0gdGhpcy5fY3JlYXRlUGF0aChvcHRzKTtcbiAgICBzdmcuYXBwZW5kQ2hpbGQocGF0aCk7XG5cbiAgICByZXR1cm4ge1xuICAgICAgICBzdmc6IHN2ZyxcbiAgICAgICAgcGF0aDogcGF0aCxcbiAgICAgICAgdHJhaWw6IHRyYWlsUGF0aFxuICAgIH07XG59O1xuXG5TaGFwZS5wcm90b3R5cGUuX2luaXRpYWxpemVTdmcgPSBmdW5jdGlvbiBfaW5pdGlhbGl6ZVN2ZyhzdmcsIG9wdHMpIHtcbiAgICBzdmcuc2V0QXR0cmlidXRlKCd2aWV3Qm94JywgJzAgMCAxMDAgMTAwJyk7XG59O1xuXG5TaGFwZS5wcm90b3R5cGUuX2NyZWF0ZVBhdGggPSBmdW5jdGlvbiBfY3JlYXRlUGF0aChvcHRzKSB7XG4gICAgdmFyIHBhdGhTdHJpbmcgPSB0aGlzLl9wYXRoU3RyaW5nKG9wdHMpO1xuICAgIHJldHVybiB0aGlzLl9jcmVhdGVQYXRoRWxlbWVudChwYXRoU3RyaW5nLCBvcHRzKTtcbn07XG5cblNoYXBlLnByb3RvdHlwZS5fY3JlYXRlVHJhaWwgPSBmdW5jdGlvbiBfY3JlYXRlVHJhaWwob3B0cykge1xuICAgIC8vIENyZWF0ZSBwYXRoIHN0cmluZyB3aXRoIG9yaWdpbmFsIHBhc3NlZCBvcHRpb25zXG4gICAgdmFyIHBhdGhTdHJpbmcgPSB0aGlzLl90cmFpbFN0cmluZyhvcHRzKTtcblxuICAgIC8vIFByZXZlbnQgbW9kaWZ5aW5nIG9yaWdpbmFsXG4gICAgdmFyIG5ld09wdHMgPSB1dGlscy5leHRlbmQoe30sIG9wdHMpO1xuXG4gICAgLy8gRGVmYXVsdHMgZm9yIHBhcmFtZXRlcnMgd2hpY2ggbW9kaWZ5IHRyYWlsIHBhdGhcbiAgICBpZiAoIW5ld09wdHMudHJhaWxDb2xvcikge1xuICAgICAgICBuZXdPcHRzLnRyYWlsQ29sb3IgPSAnI2VlZSc7XG4gICAgfVxuICAgIGlmICghbmV3T3B0cy50cmFpbFdpZHRoKSB7XG4gICAgICAgIG5ld09wdHMudHJhaWxXaWR0aCA9IG5ld09wdHMuc3Ryb2tlV2lkdGg7XG4gICAgfVxuXG4gICAgbmV3T3B0cy5jb2xvciA9IG5ld09wdHMudHJhaWxDb2xvcjtcbiAgICBuZXdPcHRzLnN0cm9rZVdpZHRoID0gbmV3T3B0cy50cmFpbFdpZHRoO1xuXG4gICAgLy8gV2hlbiB0cmFpbCBwYXRoIGlzIHNldCwgZmlsbCBtdXN0IGJlIHNldCBmb3IgaXQgaW5zdGVhZCBvZiB0aGVcbiAgICAvLyBhY3R1YWwgcGF0aCB0byBwcmV2ZW50IHRyYWlsIHN0cm9rZSBmcm9tIGNsaXBwaW5nXG4gICAgbmV3T3B0cy5maWxsID0gbnVsbDtcblxuICAgIHJldHVybiB0aGlzLl9jcmVhdGVQYXRoRWxlbWVudChwYXRoU3RyaW5nLCBuZXdPcHRzKTtcbn07XG5cblNoYXBlLnByb3RvdHlwZS5fY3JlYXRlUGF0aEVsZW1lbnQgPSBmdW5jdGlvbiBfY3JlYXRlUGF0aEVsZW1lbnQocGF0aFN0cmluZywgb3B0cykge1xuICAgIHZhciBwYXRoID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKCdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZycsICdwYXRoJyk7XG4gICAgcGF0aC5zZXRBdHRyaWJ1dGUoJ2QnLCBwYXRoU3RyaW5nKTtcbiAgICBwYXRoLnNldEF0dHJpYnV0ZSgnc3Ryb2tlJywgb3B0cy5jb2xvcik7XG4gICAgcGF0aC5zZXRBdHRyaWJ1dGUoJ3N0cm9rZS13aWR0aCcsIG9wdHMuc3Ryb2tlV2lkdGgpO1xuXG4gICAgaWYgKG9wdHMuZmlsbCkge1xuICAgICAgICBwYXRoLnNldEF0dHJpYnV0ZSgnZmlsbCcsIG9wdHMuZmlsbCk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcGF0aC5zZXRBdHRyaWJ1dGUoJ2ZpbGwtb3BhY2l0eScsICcwJyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHBhdGg7XG59O1xuXG5TaGFwZS5wcm90b3R5cGUuX2NyZWF0ZVRleHRDb250YWluZXIgPSBmdW5jdGlvbiBfY3JlYXRlVGV4dENvbnRhaW5lcihvcHRzLCBjb250YWluZXIpIHtcbiAgICB2YXIgdGV4dENvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIHRleHRDb250YWluZXIuY2xhc3NOYW1lID0gb3B0cy50ZXh0LmNsYXNzTmFtZTtcblxuICAgIHZhciB0ZXh0U3R5bGUgPSBvcHRzLnRleHQuc3R5bGU7XG4gICAgaWYgKHRleHRTdHlsZSkge1xuICAgICAgICBpZiAob3B0cy50ZXh0LmF1dG9TdHlsZUNvbnRhaW5lcikge1xuICAgICAgICAgICAgY29udGFpbmVyLnN0eWxlLnBvc2l0aW9uID0gJ3JlbGF0aXZlJztcbiAgICAgICAgfVxuXG4gICAgICAgIHV0aWxzLnNldFN0eWxlcyh0ZXh0Q29udGFpbmVyLCB0ZXh0U3R5bGUpO1xuICAgICAgICAvLyBEZWZhdWx0IHRleHQgY29sb3IgdG8gcHJvZ3Jlc3MgYmFyJ3MgY29sb3JcbiAgICAgICAgaWYgKCF0ZXh0U3R5bGUuY29sb3IpIHtcbiAgICAgICAgICAgIHRleHRDb250YWluZXIuc3R5bGUuY29sb3IgPSBvcHRzLmNvbG9yO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgdGhpcy5faW5pdGlhbGl6ZVRleHRDb250YWluZXIob3B0cywgY29udGFpbmVyLCB0ZXh0Q29udGFpbmVyKTtcbiAgICByZXR1cm4gdGV4dENvbnRhaW5lcjtcbn07XG5cbi8vIEdpdmUgY3VzdG9tIHNoYXBlcyBwb3NzaWJpbGl0eSB0byBtb2RpZnkgdGV4dCBlbGVtZW50XG5TaGFwZS5wcm90b3R5cGUuX2luaXRpYWxpemVUZXh0Q29udGFpbmVyID0gZnVuY3Rpb24ob3B0cywgY29udGFpbmVyLCBlbGVtZW50KSB7XG4gICAgLy8gQnkgZGVmYXVsdCwgbm8tb3BcbiAgICAvLyBDdXN0b20gc2hhcGVzIHNob3VsZCByZXNwZWN0IEFQSSBvcHRpb25zLCBzdWNoIGFzIHRleHQuc3R5bGVcbn07XG5cblNoYXBlLnByb3RvdHlwZS5fcGF0aFN0cmluZyA9IGZ1bmN0aW9uIF9wYXRoU3RyaW5nKG9wdHMpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ092ZXJyaWRlIHRoaXMgZnVuY3Rpb24gZm9yIGVhY2ggcHJvZ3Jlc3MgYmFyJyk7XG59O1xuXG5TaGFwZS5wcm90b3R5cGUuX3RyYWlsU3RyaW5nID0gZnVuY3Rpb24gX3RyYWlsU3RyaW5nKG9wdHMpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ092ZXJyaWRlIHRoaXMgZnVuY3Rpb24gZm9yIGVhY2ggcHJvZ3Jlc3MgYmFyJyk7XG59O1xuXG5TaGFwZS5wcm90b3R5cGUuX3dhcm5Db250YWluZXJBc3BlY3RSYXRpbyA9IGZ1bmN0aW9uIF93YXJuQ29udGFpbmVyQXNwZWN0UmF0aW8oY29udGFpbmVyKSB7XG4gICAgaWYgKCF0aGlzLmNvbnRhaW5lckFzcGVjdFJhdGlvKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB2YXIgY29tcHV0ZWRTdHlsZSA9IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKGNvbnRhaW5lciwgbnVsbCk7XG4gICAgdmFyIHdpZHRoID0gcGFyc2VGbG9hdChjb21wdXRlZFN0eWxlLmdldFByb3BlcnR5VmFsdWUoJ3dpZHRoJyksIDEwKTtcbiAgICB2YXIgaGVpZ2h0ID0gcGFyc2VGbG9hdChjb21wdXRlZFN0eWxlLmdldFByb3BlcnR5VmFsdWUoJ2hlaWdodCcpLCAxMCk7XG4gICAgaWYgKCF1dGlscy5mbG9hdEVxdWFscyh0aGlzLmNvbnRhaW5lckFzcGVjdFJhdGlvLCB3aWR0aCAvIGhlaWdodCkpIHtcbiAgICAgICAgY29uc29sZS53YXJuKFxuICAgICAgICAgICAgJ0luY29ycmVjdCBhc3BlY3QgcmF0aW8gb2YgY29udGFpbmVyJyxcbiAgICAgICAgICAgICcjJyArIGNvbnRhaW5lci5pZCxcbiAgICAgICAgICAgICdkZXRlY3RlZDonLFxuICAgICAgICAgICAgY29tcHV0ZWRTdHlsZS5nZXRQcm9wZXJ0eVZhbHVlKCd3aWR0aCcpICsgJyh3aWR0aCknLFxuICAgICAgICAgICAgJy8nLFxuICAgICAgICAgICAgY29tcHV0ZWRTdHlsZS5nZXRQcm9wZXJ0eVZhbHVlKCdoZWlnaHQnKSArICcoaGVpZ2h0KScsXG4gICAgICAgICAgICAnPScsXG4gICAgICAgICAgICB3aWR0aCAvIGhlaWdodFxuICAgICAgICApO1xuXG4gICAgICAgIGNvbnNvbGUud2FybihcbiAgICAgICAgICAgICdBc3BlY3QgcmF0aW8gb2Ygc2hvdWxkIGJlJyxcbiAgICAgICAgICAgIHRoaXMuY29udGFpbmVyQXNwZWN0UmF0aW9cbiAgICAgICAgKTtcbiAgICB9XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IFNoYXBlO1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vcHJvZ3Jlc3NiYXIuanMvc3JjL3NoYXBlLmpzXG4gKiogbW9kdWxlIGlkID0gNzRcbiAqKiBtb2R1bGUgY2h1bmtzID0gM1xuICoqLyIsIi8vIExvd2VyIGxldmVsIEFQSSB0byBhbmltYXRlIGFueSBraW5kIG9mIHN2ZyBwYXRoXG5cbnZhciBUd2VlbmFibGUgPSByZXF1aXJlKCdzaGlmdHknKTtcbnZhciB1dGlscyA9IHJlcXVpcmUoJy4vdXRpbHMnKTtcblxudmFyIEVBU0lOR19BTElBU0VTID0ge1xuICAgIGVhc2VJbjogJ2Vhc2VJbkN1YmljJyxcbiAgICBlYXNlT3V0OiAnZWFzZU91dEN1YmljJyxcbiAgICBlYXNlSW5PdXQ6ICdlYXNlSW5PdXRDdWJpYydcbn07XG5cbnZhciBQYXRoID0gZnVuY3Rpb24gUGF0aChwYXRoLCBvcHRzKSB7XG4gICAgLy8gVGhyb3cgYSBiZXR0ZXIgZXJyb3IgaWYgbm90IGluaXRpYWxpemVkIHdpdGggYG5ld2Aga2V5d29yZFxuICAgIGlmICghKHRoaXMgaW5zdGFuY2VvZiBQYXRoKSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0NvbnN0cnVjdG9yIHdhcyBjYWxsZWQgd2l0aG91dCBuZXcga2V5d29yZCcpO1xuICAgIH1cblxuICAgIC8vIERlZmF1bHQgcGFyYW1ldGVycyBmb3IgYW5pbWF0aW9uXG4gICAgb3B0cyA9IHV0aWxzLmV4dGVuZCh7XG4gICAgICAgIGR1cmF0aW9uOiA4MDAsXG4gICAgICAgIGVhc2luZzogJ2xpbmVhcicsXG4gICAgICAgIGZyb206IHt9LFxuICAgICAgICB0bzoge30sXG4gICAgICAgIHN0ZXA6IGZ1bmN0aW9uKCkge31cbiAgICB9LCBvcHRzKTtcblxuICAgIHZhciBlbGVtZW50O1xuICAgIGlmICh1dGlscy5pc1N0cmluZyhwYXRoKSkge1xuICAgICAgICBlbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihwYXRoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBlbGVtZW50ID0gcGF0aDtcbiAgICB9XG5cbiAgICAvLyBSZXZlYWwgLnBhdGggYXMgcHVibGljIGF0dHJpYnV0ZVxuICAgIHRoaXMucGF0aCA9IGVsZW1lbnQ7XG4gICAgdGhpcy5fb3B0cyA9IG9wdHM7XG4gICAgdGhpcy5fdHdlZW5hYmxlID0gbnVsbDtcblxuICAgIC8vIFNldCB1cCB0aGUgc3RhcnRpbmcgcG9zaXRpb25zXG4gICAgdmFyIGxlbmd0aCA9IHRoaXMucGF0aC5nZXRUb3RhbExlbmd0aCgpO1xuICAgIHRoaXMucGF0aC5zdHlsZS5zdHJva2VEYXNoYXJyYXkgPSBsZW5ndGggKyAnICcgKyBsZW5ndGg7XG4gICAgdGhpcy5zZXQoMCk7XG59O1xuXG5QYXRoLnByb3RvdHlwZS52YWx1ZSA9IGZ1bmN0aW9uIHZhbHVlKCkge1xuICAgIHZhciBvZmZzZXQgPSB0aGlzLl9nZXRDb21wdXRlZERhc2hPZmZzZXQoKTtcbiAgICB2YXIgbGVuZ3RoID0gdGhpcy5wYXRoLmdldFRvdGFsTGVuZ3RoKCk7XG5cbiAgICB2YXIgcHJvZ3Jlc3MgPSAxIC0gb2Zmc2V0IC8gbGVuZ3RoO1xuICAgIC8vIFJvdW5kIG51bWJlciB0byBwcmV2ZW50IHJldHVybmluZyB2ZXJ5IHNtYWxsIG51bWJlciBsaWtlIDFlLTMwLCB3aGljaFxuICAgIC8vIGlzIHByYWN0aWNhbGx5IDBcbiAgICByZXR1cm4gcGFyc2VGbG9hdChwcm9ncmVzcy50b0ZpeGVkKDYpLCAxMCk7XG59O1xuXG5QYXRoLnByb3RvdHlwZS5zZXQgPSBmdW5jdGlvbiBzZXQocHJvZ3Jlc3MpIHtcbiAgICB0aGlzLnN0b3AoKTtcblxuICAgIHRoaXMucGF0aC5zdHlsZS5zdHJva2VEYXNob2Zmc2V0ID0gdGhpcy5fcHJvZ3Jlc3NUb09mZnNldChwcm9ncmVzcyk7XG5cbiAgICB2YXIgc3RlcCA9IHRoaXMuX29wdHMuc3RlcDtcbiAgICBpZiAodXRpbHMuaXNGdW5jdGlvbihzdGVwKSkge1xuICAgICAgICB2YXIgZWFzaW5nID0gdGhpcy5fZWFzaW5nKHRoaXMuX29wdHMuZWFzaW5nKTtcbiAgICAgICAgdmFyIHZhbHVlcyA9IHRoaXMuX2NhbGN1bGF0ZVRvKHByb2dyZXNzLCBlYXNpbmcpO1xuICAgICAgICB2YXIgcmVmZXJlbmNlID0gdGhpcy5fb3B0cy5zaGFwZSB8fCB0aGlzO1xuICAgICAgICBzdGVwKHZhbHVlcywgcmVmZXJlbmNlLCB0aGlzLl9vcHRzLmF0dGFjaG1lbnQpO1xuICAgIH1cbn07XG5cblBhdGgucHJvdG90eXBlLnN0b3AgPSBmdW5jdGlvbiBzdG9wKCkge1xuICAgIHRoaXMuX3N0b3BUd2VlbigpO1xuICAgIHRoaXMucGF0aC5zdHlsZS5zdHJva2VEYXNob2Zmc2V0ID0gdGhpcy5fZ2V0Q29tcHV0ZWREYXNoT2Zmc2V0KCk7XG59O1xuXG4vLyBNZXRob2QgaW50cm9kdWNlZCBoZXJlOlxuLy8gaHR0cDovL2pha2VhcmNoaWJhbGQuY29tLzIwMTMvYW5pbWF0ZWQtbGluZS1kcmF3aW5nLXN2Zy9cblBhdGgucHJvdG90eXBlLmFuaW1hdGUgPSBmdW5jdGlvbiBhbmltYXRlKHByb2dyZXNzLCBvcHRzLCBjYikge1xuICAgIG9wdHMgPSBvcHRzIHx8IHt9O1xuXG4gICAgaWYgKHV0aWxzLmlzRnVuY3Rpb24ob3B0cykpIHtcbiAgICAgICAgY2IgPSBvcHRzO1xuICAgICAgICBvcHRzID0ge307XG4gICAgfVxuXG4gICAgdmFyIHBhc3NlZE9wdHMgPSB1dGlscy5leHRlbmQoe30sIG9wdHMpO1xuXG4gICAgLy8gQ29weSBkZWZhdWx0IG9wdHMgdG8gbmV3IG9iamVjdCBzbyBkZWZhdWx0cyBhcmUgbm90IG1vZGlmaWVkXG4gICAgdmFyIGRlZmF1bHRPcHRzID0gdXRpbHMuZXh0ZW5kKHt9LCB0aGlzLl9vcHRzKTtcbiAgICBvcHRzID0gdXRpbHMuZXh0ZW5kKGRlZmF1bHRPcHRzLCBvcHRzKTtcblxuICAgIHZhciBzaGlmdHlFYXNpbmcgPSB0aGlzLl9lYXNpbmcob3B0cy5lYXNpbmcpO1xuICAgIHZhciB2YWx1ZXMgPSB0aGlzLl9yZXNvbHZlRnJvbUFuZFRvKHByb2dyZXNzLCBzaGlmdHlFYXNpbmcsIHBhc3NlZE9wdHMpO1xuXG4gICAgdGhpcy5zdG9wKCk7XG5cbiAgICAvLyBUcmlnZ2VyIGEgbGF5b3V0IHNvIHN0eWxlcyBhcmUgY2FsY3VsYXRlZCAmIHRoZSBicm93c2VyXG4gICAgLy8gcGlja3MgdXAgdGhlIHN0YXJ0aW5nIHBvc2l0aW9uIGJlZm9yZSBhbmltYXRpbmdcbiAgICB0aGlzLnBhdGguZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG5cbiAgICB2YXIgb2Zmc2V0ID0gdGhpcy5fZ2V0Q29tcHV0ZWREYXNoT2Zmc2V0KCk7XG4gICAgdmFyIG5ld09mZnNldCA9IHRoaXMuX3Byb2dyZXNzVG9PZmZzZXQocHJvZ3Jlc3MpO1xuXG4gICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgIHRoaXMuX3R3ZWVuYWJsZSA9IG5ldyBUd2VlbmFibGUoKTtcbiAgICB0aGlzLl90d2VlbmFibGUudHdlZW4oe1xuICAgICAgICBmcm9tOiB1dGlscy5leHRlbmQoeyBvZmZzZXQ6IG9mZnNldCB9LCB2YWx1ZXMuZnJvbSksXG4gICAgICAgIHRvOiB1dGlscy5leHRlbmQoeyBvZmZzZXQ6IG5ld09mZnNldCB9LCB2YWx1ZXMudG8pLFxuICAgICAgICBkdXJhdGlvbjogb3B0cy5kdXJhdGlvbixcbiAgICAgICAgZWFzaW5nOiBzaGlmdHlFYXNpbmcsXG4gICAgICAgIHN0ZXA6IGZ1bmN0aW9uKHN0YXRlKSB7XG4gICAgICAgICAgICBzZWxmLnBhdGguc3R5bGUuc3Ryb2tlRGFzaG9mZnNldCA9IHN0YXRlLm9mZnNldDtcbiAgICAgICAgICAgIHZhciByZWZlcmVuY2UgPSBvcHRzLnNoYXBlIHx8IHNlbGY7XG4gICAgICAgICAgICBvcHRzLnN0ZXAoc3RhdGUsIHJlZmVyZW5jZSwgb3B0cy5hdHRhY2htZW50KTtcbiAgICAgICAgfSxcbiAgICAgICAgZmluaXNoOiBmdW5jdGlvbihzdGF0ZSkge1xuICAgICAgICAgICAgaWYgKHV0aWxzLmlzRnVuY3Rpb24oY2IpKSB7XG4gICAgICAgICAgICAgICAgY2IoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0pO1xufTtcblxuUGF0aC5wcm90b3R5cGUuX2dldENvbXB1dGVkRGFzaE9mZnNldCA9IGZ1bmN0aW9uIF9nZXRDb21wdXRlZERhc2hPZmZzZXQoKSB7XG4gICAgdmFyIGNvbXB1dGVkU3R5bGUgPSB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZSh0aGlzLnBhdGgsIG51bGwpO1xuICAgIHJldHVybiBwYXJzZUZsb2F0KGNvbXB1dGVkU3R5bGUuZ2V0UHJvcGVydHlWYWx1ZSgnc3Ryb2tlLWRhc2hvZmZzZXQnKSwgMTApO1xufTtcblxuUGF0aC5wcm90b3R5cGUuX3Byb2dyZXNzVG9PZmZzZXQgPSBmdW5jdGlvbiBfcHJvZ3Jlc3NUb09mZnNldChwcm9ncmVzcykge1xuICAgIHZhciBsZW5ndGggPSB0aGlzLnBhdGguZ2V0VG90YWxMZW5ndGgoKTtcbiAgICByZXR1cm4gbGVuZ3RoIC0gcHJvZ3Jlc3MgKiBsZW5ndGg7XG59O1xuXG4vLyBSZXNvbHZlcyBmcm9tIGFuZCB0byB2YWx1ZXMgZm9yIGFuaW1hdGlvbi5cblBhdGgucHJvdG90eXBlLl9yZXNvbHZlRnJvbUFuZFRvID0gZnVuY3Rpb24gX3Jlc29sdmVGcm9tQW5kVG8ocHJvZ3Jlc3MsIGVhc2luZywgb3B0cykge1xuICAgIGlmIChvcHRzLmZyb20gJiYgb3B0cy50bykge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgZnJvbTogb3B0cy5mcm9tLFxuICAgICAgICAgICAgdG86IG9wdHMudG9cbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICByZXR1cm4ge1xuICAgICAgICBmcm9tOiB0aGlzLl9jYWxjdWxhdGVGcm9tKGVhc2luZyksXG4gICAgICAgIHRvOiB0aGlzLl9jYWxjdWxhdGVUbyhwcm9ncmVzcywgZWFzaW5nKVxuICAgIH07XG59O1xuXG4vLyBDYWxjdWxhdGUgYGZyb21gIHZhbHVlcyBmcm9tIG9wdGlvbnMgcGFzc2VkIGF0IGluaXRpYWxpemF0aW9uXG5QYXRoLnByb3RvdHlwZS5fY2FsY3VsYXRlRnJvbSA9IGZ1bmN0aW9uIF9jYWxjdWxhdGVGcm9tKGVhc2luZykge1xuICAgIHJldHVybiBUd2VlbmFibGUuaW50ZXJwb2xhdGUodGhpcy5fb3B0cy5mcm9tLCB0aGlzLl9vcHRzLnRvLCB0aGlzLnZhbHVlKCksIGVhc2luZyk7XG59O1xuXG4vLyBDYWxjdWxhdGUgYHRvYCB2YWx1ZXMgZnJvbSBvcHRpb25zIHBhc3NlZCBhdCBpbml0aWFsaXphdGlvblxuUGF0aC5wcm90b3R5cGUuX2NhbGN1bGF0ZVRvID0gZnVuY3Rpb24gX2NhbGN1bGF0ZVRvKHByb2dyZXNzLCBlYXNpbmcpIHtcbiAgICByZXR1cm4gVHdlZW5hYmxlLmludGVycG9sYXRlKHRoaXMuX29wdHMuZnJvbSwgdGhpcy5fb3B0cy50bywgcHJvZ3Jlc3MsIGVhc2luZyk7XG59O1xuXG5QYXRoLnByb3RvdHlwZS5fc3RvcFR3ZWVuID0gZnVuY3Rpb24gX3N0b3BUd2VlbigpIHtcbiAgICBpZiAodGhpcy5fdHdlZW5hYmxlICE9PSBudWxsKSB7XG4gICAgICAgIHRoaXMuX3R3ZWVuYWJsZS5zdG9wKCk7XG4gICAgICAgIHRoaXMuX3R3ZWVuYWJsZSA9IG51bGw7XG4gICAgfVxufTtcblxuUGF0aC5wcm90b3R5cGUuX2Vhc2luZyA9IGZ1bmN0aW9uIF9lYXNpbmcoZWFzaW5nKSB7XG4gICAgaWYgKEVBU0lOR19BTElBU0VTLmhhc093blByb3BlcnR5KGVhc2luZykpIHtcbiAgICAgICAgcmV0dXJuIEVBU0lOR19BTElBU0VTW2Vhc2luZ107XG4gICAgfVxuXG4gICAgcmV0dXJuIGVhc2luZztcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gUGF0aDtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L3Byb2dyZXNzYmFyLmpzL3NyYy9wYXRoLmpzXG4gKiogbW9kdWxlIGlkID0gNzVcbiAqKiBtb2R1bGUgY2h1bmtzID0gM1xuICoqLyIsIi8qIHNoaWZ0eSAtIHYxLjUuMiAtIDIwMTYtMDItMTAgLSBodHRwOi8vamVyZW15Y2thaG4uZ2l0aHViLmlvL3NoaWZ0eSAqL1xuOyhmdW5jdGlvbiAoKSB7XG4gIHZhciByb290ID0gdGhpcyB8fCBGdW5jdGlvbigncmV0dXJuIHRoaXMnKSgpO1xuXG4vKipcbiAqIFNoaWZ0eSBDb3JlXG4gKiBCeSBKZXJlbXkgS2FobiAtIGplcmVteWNrYWhuQGdtYWlsLmNvbVxuICovXG5cbnZhciBUd2VlbmFibGUgPSAoZnVuY3Rpb24gKCkge1xuXG4gICd1c2Ugc3RyaWN0JztcblxuICAvLyBBbGlhc2VzIHRoYXQgZ2V0IGRlZmluZWQgbGF0ZXIgaW4gdGhpcyBmdW5jdGlvblxuICB2YXIgZm9ybXVsYTtcblxuICAvLyBDT05TVEFOVFNcbiAgdmFyIERFRkFVTFRfU0NIRURVTEVfRlVOQ1RJT047XG4gIHZhciBERUZBVUxUX0VBU0lORyA9ICdsaW5lYXInO1xuICB2YXIgREVGQVVMVF9EVVJBVElPTiA9IDUwMDtcbiAgdmFyIFVQREFURV9USU1FID0gMTAwMCAvIDYwO1xuXG4gIHZhciBfbm93ID0gRGF0ZS5ub3dcbiAgICAgICA/IERhdGUubm93XG4gICAgICAgOiBmdW5jdGlvbiAoKSB7cmV0dXJuICtuZXcgRGF0ZSgpO307XG5cbiAgdmFyIG5vdyA9IHR5cGVvZiBTSElGVFlfREVCVUdfTk9XICE9PSAndW5kZWZpbmVkJyA/IFNISUZUWV9ERUJVR19OT1cgOiBfbm93O1xuXG4gIGlmICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJykge1xuICAgIC8vIHJlcXVlc3RBbmltYXRpb25GcmFtZSgpIHNoaW0gYnkgUGF1bCBJcmlzaCAobW9kaWZpZWQgZm9yIFNoaWZ0eSlcbiAgICAvLyBodHRwOi8vcGF1bGlyaXNoLmNvbS8yMDExL3JlcXVlc3RhbmltYXRpb25mcmFtZS1mb3Itc21hcnQtYW5pbWF0aW5nL1xuICAgIERFRkFVTFRfU0NIRURVTEVfRlVOQ1RJT04gPSB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lXG4gICAgICAgfHwgd2luZG93LndlYmtpdFJlcXVlc3RBbmltYXRpb25GcmFtZVxuICAgICAgIHx8IHdpbmRvdy5vUmVxdWVzdEFuaW1hdGlvbkZyYW1lXG4gICAgICAgfHwgd2luZG93Lm1zUmVxdWVzdEFuaW1hdGlvbkZyYW1lXG4gICAgICAgfHwgKHdpbmRvdy5tb3pDYW5jZWxSZXF1ZXN0QW5pbWF0aW9uRnJhbWVcbiAgICAgICAmJiB3aW5kb3cubW96UmVxdWVzdEFuaW1hdGlvbkZyYW1lKVxuICAgICAgIHx8IHNldFRpbWVvdXQ7XG4gIH0gZWxzZSB7XG4gICAgREVGQVVMVF9TQ0hFRFVMRV9GVU5DVElPTiA9IHNldFRpbWVvdXQ7XG4gIH1cblxuICBmdW5jdGlvbiBub29wICgpIHtcbiAgICAvLyBOT09QIVxuICB9XG5cbiAgLyoqXG4gICAqIEhhbmR5IHNob3J0Y3V0IGZvciBkb2luZyBhIGZvci1pbiBsb29wLiBUaGlzIGlzIG5vdCBhIFwibm9ybWFsXCIgZWFjaFxuICAgKiBmdW5jdGlvbiwgaXQgaXMgb3B0aW1pemVkIGZvciBTaGlmdHkuICBUaGUgaXRlcmF0b3IgZnVuY3Rpb24gb25seSByZWNlaXZlc1xuICAgKiB0aGUgcHJvcGVydHkgbmFtZSwgbm90IHRoZSB2YWx1ZS5cbiAgICogQHBhcmFtIHtPYmplY3R9IG9ialxuICAgKiBAcGFyYW0ge0Z1bmN0aW9uKHN0cmluZyl9IGZuXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBmdW5jdGlvbiBlYWNoIChvYmosIGZuKSB7XG4gICAgdmFyIGtleTtcbiAgICBmb3IgKGtleSBpbiBvYmopIHtcbiAgICAgIGlmIChPYmplY3QuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIGtleSkpIHtcbiAgICAgICAgZm4oa2V5KTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogUGVyZm9ybSBhIHNoYWxsb3cgY29weSBvZiBPYmplY3QgcHJvcGVydGllcy5cbiAgICogQHBhcmFtIHtPYmplY3R9IHRhcmdldE9iamVjdCBUaGUgb2JqZWN0IHRvIGNvcHkgaW50b1xuICAgKiBAcGFyYW0ge09iamVjdH0gc3JjT2JqZWN0IFRoZSBvYmplY3QgdG8gY29weSBmcm9tXG4gICAqIEByZXR1cm4ge09iamVjdH0gQSByZWZlcmVuY2UgdG8gdGhlIGF1Z21lbnRlZCBgdGFyZ2V0T2JqYCBPYmplY3RcbiAgICogQHByaXZhdGVcbiAgICovXG4gIGZ1bmN0aW9uIHNoYWxsb3dDb3B5ICh0YXJnZXRPYmosIHNyY09iaikge1xuICAgIGVhY2goc3JjT2JqLCBmdW5jdGlvbiAocHJvcCkge1xuICAgICAgdGFyZ2V0T2JqW3Byb3BdID0gc3JjT2JqW3Byb3BdO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIHRhcmdldE9iajtcbiAgfVxuXG4gIC8qKlxuICAgKiBDb3BpZXMgZWFjaCBwcm9wZXJ0eSBmcm9tIHNyYyBvbnRvIHRhcmdldCwgYnV0IG9ubHkgaWYgdGhlIHByb3BlcnR5IHRvXG4gICAqIGNvcHkgdG8gdGFyZ2V0IGlzIHVuZGVmaW5lZC5cbiAgICogQHBhcmFtIHtPYmplY3R9IHRhcmdldCBNaXNzaW5nIHByb3BlcnRpZXMgaW4gdGhpcyBPYmplY3QgYXJlIGZpbGxlZCBpblxuICAgKiBAcGFyYW0ge09iamVjdH0gc3JjXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBmdW5jdGlvbiBkZWZhdWx0cyAodGFyZ2V0LCBzcmMpIHtcbiAgICBlYWNoKHNyYywgZnVuY3Rpb24gKHByb3ApIHtcbiAgICAgIGlmICh0eXBlb2YgdGFyZ2V0W3Byb3BdID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICB0YXJnZXRbcHJvcF0gPSBzcmNbcHJvcF07XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogQ2FsY3VsYXRlcyB0aGUgaW50ZXJwb2xhdGVkIHR3ZWVuIHZhbHVlcyBvZiBhbiBPYmplY3QgZm9yIGEgZ2l2ZW5cbiAgICogdGltZXN0YW1wLlxuICAgKiBAcGFyYW0ge051bWJlcn0gZm9yUG9zaXRpb24gVGhlIHBvc2l0aW9uIHRvIGNvbXB1dGUgdGhlIHN0YXRlIGZvci5cbiAgICogQHBhcmFtIHtPYmplY3R9IGN1cnJlbnRTdGF0ZSBDdXJyZW50IHN0YXRlIHByb3BlcnRpZXMuXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvcmlnaW5hbFN0YXRlOiBUaGUgb3JpZ2luYWwgc3RhdGUgcHJvcGVydGllcyB0aGUgT2JqZWN0IGlzXG4gICAqIHR3ZWVuaW5nIGZyb20uXG4gICAqIEBwYXJhbSB7T2JqZWN0fSB0YXJnZXRTdGF0ZTogVGhlIGRlc3RpbmF0aW9uIHN0YXRlIHByb3BlcnRpZXMgdGhlIE9iamVjdFxuICAgKiBpcyB0d2VlbmluZyB0by5cbiAgICogQHBhcmFtIHtudW1iZXJ9IGR1cmF0aW9uOiBUaGUgbGVuZ3RoIG9mIHRoZSB0d2VlbiBpbiBtaWxsaXNlY29uZHMuXG4gICAqIEBwYXJhbSB7bnVtYmVyfSB0aW1lc3RhbXA6IFRoZSBVTklYIGVwb2NoIHRpbWUgYXQgd2hpY2ggdGhlIHR3ZWVuIGJlZ2FuLlxuICAgKiBAcGFyYW0ge09iamVjdH0gZWFzaW5nOiBUaGlzIE9iamVjdCdzIGtleXMgbXVzdCBjb3JyZXNwb25kIHRvIHRoZSBrZXlzIGluXG4gICAqIHRhcmdldFN0YXRlLlxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgZnVuY3Rpb24gdHdlZW5Qcm9wcyAoZm9yUG9zaXRpb24sIGN1cnJlbnRTdGF0ZSwgb3JpZ2luYWxTdGF0ZSwgdGFyZ2V0U3RhdGUsXG4gICAgZHVyYXRpb24sIHRpbWVzdGFtcCwgZWFzaW5nKSB7XG4gICAgdmFyIG5vcm1hbGl6ZWRQb3NpdGlvbiA9XG4gICAgICAgIGZvclBvc2l0aW9uIDwgdGltZXN0YW1wID8gMCA6IChmb3JQb3NpdGlvbiAtIHRpbWVzdGFtcCkgLyBkdXJhdGlvbjtcblxuXG4gICAgdmFyIHByb3A7XG4gICAgdmFyIGVhc2luZ09iamVjdFByb3A7XG4gICAgdmFyIGVhc2luZ0ZuO1xuICAgIGZvciAocHJvcCBpbiBjdXJyZW50U3RhdGUpIHtcbiAgICAgIGlmIChjdXJyZW50U3RhdGUuaGFzT3duUHJvcGVydHkocHJvcCkpIHtcbiAgICAgICAgZWFzaW5nT2JqZWN0UHJvcCA9IGVhc2luZ1twcm9wXTtcbiAgICAgICAgZWFzaW5nRm4gPSB0eXBlb2YgZWFzaW5nT2JqZWN0UHJvcCA9PT0gJ2Z1bmN0aW9uJ1xuICAgICAgICAgID8gZWFzaW5nT2JqZWN0UHJvcFxuICAgICAgICAgIDogZm9ybXVsYVtlYXNpbmdPYmplY3RQcm9wXTtcblxuICAgICAgICBjdXJyZW50U3RhdGVbcHJvcF0gPSB0d2VlblByb3AoXG4gICAgICAgICAgb3JpZ2luYWxTdGF0ZVtwcm9wXSxcbiAgICAgICAgICB0YXJnZXRTdGF0ZVtwcm9wXSxcbiAgICAgICAgICBlYXNpbmdGbixcbiAgICAgICAgICBub3JtYWxpemVkUG9zaXRpb25cbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gY3VycmVudFN0YXRlO1xuICB9XG5cbiAgLyoqXG4gICAqIFR3ZWVucyBhIHNpbmdsZSBwcm9wZXJ0eS5cbiAgICogQHBhcmFtIHtudW1iZXJ9IHN0YXJ0IFRoZSB2YWx1ZSB0aGF0IHRoZSB0d2VlbiBzdGFydGVkIGZyb20uXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBlbmQgVGhlIHZhbHVlIHRoYXQgdGhlIHR3ZWVuIHNob3VsZCBlbmQgYXQuXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IGVhc2luZ0Z1bmMgVGhlIGVhc2luZyBjdXJ2ZSB0byBhcHBseSB0byB0aGUgdHdlZW4uXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBwb3NpdGlvbiBUaGUgbm9ybWFsaXplZCBwb3NpdGlvbiAoYmV0d2VlbiAwLjAgYW5kIDEuMCkgdG9cbiAgICogY2FsY3VsYXRlIHRoZSBtaWRwb2ludCBvZiAnc3RhcnQnIGFuZCAnZW5kJyBhZ2FpbnN0LlxuICAgKiBAcmV0dXJuIHtudW1iZXJ9IFRoZSB0d2VlbmVkIHZhbHVlLlxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgZnVuY3Rpb24gdHdlZW5Qcm9wIChzdGFydCwgZW5kLCBlYXNpbmdGdW5jLCBwb3NpdGlvbikge1xuICAgIHJldHVybiBzdGFydCArIChlbmQgLSBzdGFydCkgKiBlYXNpbmdGdW5jKHBvc2l0aW9uKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBcHBsaWVzIGEgZmlsdGVyIHRvIFR3ZWVuYWJsZSBpbnN0YW5jZS5cbiAgICogQHBhcmFtIHtUd2VlbmFibGV9IHR3ZWVuYWJsZSBUaGUgYFR3ZWVuYWJsZWAgaW5zdGFuY2UgdG8gY2FsbCB0aGUgZmlsdGVyXG4gICAqIHVwb24uXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBmaWx0ZXJOYW1lIFRoZSBuYW1lIG9mIHRoZSBmaWx0ZXIgdG8gYXBwbHkuXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBmdW5jdGlvbiBhcHBseUZpbHRlciAodHdlZW5hYmxlLCBmaWx0ZXJOYW1lKSB7XG4gICAgdmFyIGZpbHRlcnMgPSBUd2VlbmFibGUucHJvdG90eXBlLmZpbHRlcjtcbiAgICB2YXIgYXJncyA9IHR3ZWVuYWJsZS5fZmlsdGVyQXJncztcblxuICAgIGVhY2goZmlsdGVycywgZnVuY3Rpb24gKG5hbWUpIHtcbiAgICAgIGlmICh0eXBlb2YgZmlsdGVyc1tuYW1lXVtmaWx0ZXJOYW1lXSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgZmlsdGVyc1tuYW1lXVtmaWx0ZXJOYW1lXS5hcHBseSh0d2VlbmFibGUsIGFyZ3MpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgdmFyIHRpbWVvdXRIYW5kbGVyX2VuZFRpbWU7XG4gIHZhciB0aW1lb3V0SGFuZGxlcl9jdXJyZW50VGltZTtcbiAgdmFyIHRpbWVvdXRIYW5kbGVyX2lzRW5kZWQ7XG4gIHZhciB0aW1lb3V0SGFuZGxlcl9vZmZzZXQ7XG4gIC8qKlxuICAgKiBIYW5kbGVzIHRoZSB1cGRhdGUgbG9naWMgZm9yIG9uZSBzdGVwIG9mIGEgdHdlZW4uXG4gICAqIEBwYXJhbSB7VHdlZW5hYmxlfSB0d2VlbmFibGVcbiAgICogQHBhcmFtIHtudW1iZXJ9IHRpbWVzdGFtcFxuICAgKiBAcGFyYW0ge251bWJlcn0gZGVsYXlcbiAgICogQHBhcmFtIHtudW1iZXJ9IGR1cmF0aW9uXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBjdXJyZW50U3RhdGVcbiAgICogQHBhcmFtIHtPYmplY3R9IG9yaWdpbmFsU3RhdGVcbiAgICogQHBhcmFtIHtPYmplY3R9IHRhcmdldFN0YXRlXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBlYXNpbmdcbiAgICogQHBhcmFtIHtGdW5jdGlvbihPYmplY3QsICosIG51bWJlcil9IHN0ZXBcbiAgICogQHBhcmFtIHtGdW5jdGlvbihGdW5jdGlvbixudW1iZXIpfX0gc2NoZWR1bGVcbiAgICogQHBhcmFtIHtudW1iZXI9fSBvcHRfY3VycmVudFRpbWVPdmVycmlkZSBOZWVkZWQgZm9yIGFjY3VyYXRlIHRpbWVzdGFtcCBpblxuICAgKiBUd2VlbmFibGUjc2Vlay5cbiAgICogQHByaXZhdGVcbiAgICovXG4gIGZ1bmN0aW9uIHRpbWVvdXRIYW5kbGVyICh0d2VlbmFibGUsIHRpbWVzdGFtcCwgZGVsYXksIGR1cmF0aW9uLCBjdXJyZW50U3RhdGUsXG4gICAgb3JpZ2luYWxTdGF0ZSwgdGFyZ2V0U3RhdGUsIGVhc2luZywgc3RlcCwgc2NoZWR1bGUsXG4gICAgb3B0X2N1cnJlbnRUaW1lT3ZlcnJpZGUpIHtcblxuICAgIHRpbWVvdXRIYW5kbGVyX2VuZFRpbWUgPSB0aW1lc3RhbXAgKyBkZWxheSArIGR1cmF0aW9uO1xuXG4gICAgdGltZW91dEhhbmRsZXJfY3VycmVudFRpbWUgPVxuICAgIE1hdGgubWluKG9wdF9jdXJyZW50VGltZU92ZXJyaWRlIHx8IG5vdygpLCB0aW1lb3V0SGFuZGxlcl9lbmRUaW1lKTtcblxuICAgIHRpbWVvdXRIYW5kbGVyX2lzRW5kZWQgPVxuICAgICAgdGltZW91dEhhbmRsZXJfY3VycmVudFRpbWUgPj0gdGltZW91dEhhbmRsZXJfZW5kVGltZTtcblxuICAgIHRpbWVvdXRIYW5kbGVyX29mZnNldCA9IGR1cmF0aW9uIC0gKFxuICAgICAgdGltZW91dEhhbmRsZXJfZW5kVGltZSAtIHRpbWVvdXRIYW5kbGVyX2N1cnJlbnRUaW1lKTtcblxuICAgIGlmICh0d2VlbmFibGUuaXNQbGF5aW5nKCkpIHtcbiAgICAgIGlmICh0aW1lb3V0SGFuZGxlcl9pc0VuZGVkKSB7XG4gICAgICAgIHN0ZXAodGFyZ2V0U3RhdGUsIHR3ZWVuYWJsZS5fYXR0YWNobWVudCwgdGltZW91dEhhbmRsZXJfb2Zmc2V0KTtcbiAgICAgICAgdHdlZW5hYmxlLnN0b3AodHJ1ZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0d2VlbmFibGUuX3NjaGVkdWxlSWQgPVxuICAgICAgICAgIHNjaGVkdWxlKHR3ZWVuYWJsZS5fdGltZW91dEhhbmRsZXIsIFVQREFURV9USU1FKTtcblxuICAgICAgICBhcHBseUZpbHRlcih0d2VlbmFibGUsICdiZWZvcmVUd2VlbicpO1xuXG4gICAgICAgIC8vIElmIHRoZSBhbmltYXRpb24gaGFzIG5vdCB5ZXQgcmVhY2hlZCB0aGUgc3RhcnQgcG9pbnQgKGUuZy4sIHRoZXJlIHdhc1xuICAgICAgICAvLyBkZWxheSB0aGF0IGhhcyBub3QgeWV0IGNvbXBsZXRlZCksIGp1c3QgaW50ZXJwb2xhdGUgdGhlIHN0YXJ0aW5nXG4gICAgICAgIC8vIHBvc2l0aW9uIG9mIHRoZSB0d2Vlbi5cbiAgICAgICAgaWYgKHRpbWVvdXRIYW5kbGVyX2N1cnJlbnRUaW1lIDwgKHRpbWVzdGFtcCArIGRlbGF5KSkge1xuICAgICAgICAgIHR3ZWVuUHJvcHMoMSwgY3VycmVudFN0YXRlLCBvcmlnaW5hbFN0YXRlLCB0YXJnZXRTdGF0ZSwgMSwgMSwgZWFzaW5nKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0d2VlblByb3BzKHRpbWVvdXRIYW5kbGVyX2N1cnJlbnRUaW1lLCBjdXJyZW50U3RhdGUsIG9yaWdpbmFsU3RhdGUsXG4gICAgICAgICAgICB0YXJnZXRTdGF0ZSwgZHVyYXRpb24sIHRpbWVzdGFtcCArIGRlbGF5LCBlYXNpbmcpO1xuICAgICAgICB9XG5cbiAgICAgICAgYXBwbHlGaWx0ZXIodHdlZW5hYmxlLCAnYWZ0ZXJUd2VlbicpO1xuXG4gICAgICAgIHN0ZXAoY3VycmVudFN0YXRlLCB0d2VlbmFibGUuX2F0dGFjaG1lbnQsIHRpbWVvdXRIYW5kbGVyX29mZnNldCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cblxuICAvKipcbiAgICogQ3JlYXRlcyBhIHVzYWJsZSBlYXNpbmcgT2JqZWN0IGZyb20gYSBzdHJpbmcsIGEgZnVuY3Rpb24gb3IgYW5vdGhlciBlYXNpbmdcbiAgICogT2JqZWN0LiAgSWYgYGVhc2luZ2AgaXMgYW4gT2JqZWN0LCB0aGVuIHRoaXMgZnVuY3Rpb24gY2xvbmVzIGl0IGFuZCBmaWxsc1xuICAgKiBpbiB0aGUgbWlzc2luZyBwcm9wZXJ0aWVzIHdpdGggYFwibGluZWFyXCJgLlxuICAgKiBAcGFyYW0ge09iamVjdC48c3RyaW5nfEZ1bmN0aW9uPn0gZnJvbVR3ZWVuUGFyYW1zXG4gICAqIEBwYXJhbSB7T2JqZWN0fHN0cmluZ3xGdW5jdGlvbn0gZWFzaW5nXG4gICAqIEByZXR1cm4ge09iamVjdC48c3RyaW5nfEZ1bmN0aW9uPn1cbiAgICogQHByaXZhdGVcbiAgICovXG4gIGZ1bmN0aW9uIGNvbXBvc2VFYXNpbmdPYmplY3QgKGZyb21Ud2VlblBhcmFtcywgZWFzaW5nKSB7XG4gICAgdmFyIGNvbXBvc2VkRWFzaW5nID0ge307XG4gICAgdmFyIHR5cGVvZkVhc2luZyA9IHR5cGVvZiBlYXNpbmc7XG5cbiAgICBpZiAodHlwZW9mRWFzaW5nID09PSAnc3RyaW5nJyB8fCB0eXBlb2ZFYXNpbmcgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIGVhY2goZnJvbVR3ZWVuUGFyYW1zLCBmdW5jdGlvbiAocHJvcCkge1xuICAgICAgICBjb21wb3NlZEVhc2luZ1twcm9wXSA9IGVhc2luZztcbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICBlYWNoKGZyb21Ud2VlblBhcmFtcywgZnVuY3Rpb24gKHByb3ApIHtcbiAgICAgICAgaWYgKCFjb21wb3NlZEVhc2luZ1twcm9wXSkge1xuICAgICAgICAgIGNvbXBvc2VkRWFzaW5nW3Byb3BdID0gZWFzaW5nW3Byb3BdIHx8IERFRkFVTFRfRUFTSU5HO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICByZXR1cm4gY29tcG9zZWRFYXNpbmc7XG4gIH1cblxuICAvKipcbiAgICogVHdlZW5hYmxlIGNvbnN0cnVjdG9yLlxuICAgKiBAY2xhc3MgVHdlZW5hYmxlXG4gICAqIEBwYXJhbSB7T2JqZWN0PX0gb3B0X2luaXRpYWxTdGF0ZSBUaGUgdmFsdWVzIHRoYXQgdGhlIGluaXRpYWwgdHdlZW4gc2hvdWxkXG4gICAqIHN0YXJ0IGF0IGlmIGEgYGZyb21gIG9iamVjdCBpcyBub3QgcHJvdmlkZWQgdG8gYHt7I2Nyb3NzTGlua1xuICAgKiBcIlR3ZWVuYWJsZS90d2VlbjptZXRob2RcIn19e3svY3Jvc3NMaW5rfX1gIG9yIGB7eyNjcm9zc0xpbmtcbiAgICogXCJUd2VlbmFibGUvc2V0Q29uZmlnOm1ldGhvZFwifX17ey9jcm9zc0xpbmt9fWAuXG4gICAqIEBwYXJhbSB7T2JqZWN0PX0gb3B0X2NvbmZpZyBDb25maWd1cmF0aW9uIG9iamVjdCB0byBiZSBwYXNzZWQgdG9cbiAgICogYHt7I2Nyb3NzTGluayBcIlR3ZWVuYWJsZS9zZXRDb25maWc6bWV0aG9kXCJ9fXt7L2Nyb3NzTGlua319YC5cbiAgICogQG1vZHVsZSBUd2VlbmFibGVcbiAgICogQGNvbnN0cnVjdG9yXG4gICAqL1xuICBmdW5jdGlvbiBUd2VlbmFibGUgKG9wdF9pbml0aWFsU3RhdGUsIG9wdF9jb25maWcpIHtcbiAgICB0aGlzLl9jdXJyZW50U3RhdGUgPSBvcHRfaW5pdGlhbFN0YXRlIHx8IHt9O1xuICAgIHRoaXMuX2NvbmZpZ3VyZWQgPSBmYWxzZTtcbiAgICB0aGlzLl9zY2hlZHVsZUZ1bmN0aW9uID0gREVGQVVMVF9TQ0hFRFVMRV9GVU5DVElPTjtcblxuICAgIC8vIFRvIHByZXZlbnQgdW5uZWNlc3NhcnkgY2FsbHMgdG8gc2V0Q29uZmlnIGRvIG5vdCBzZXQgZGVmYXVsdFxuICAgIC8vIGNvbmZpZ3VyYXRpb24gaGVyZS4gIE9ubHkgc2V0IGRlZmF1bHQgY29uZmlndXJhdGlvbiBpbW1lZGlhdGVseSBiZWZvcmVcbiAgICAvLyB0d2VlbmluZyBpZiBub25lIGhhcyBiZWVuIHNldC5cbiAgICBpZiAodHlwZW9mIG9wdF9jb25maWcgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICB0aGlzLnNldENvbmZpZyhvcHRfY29uZmlnKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQ29uZmlndXJlIGFuZCBzdGFydCBhIHR3ZWVuLlxuICAgKiBAbWV0aG9kIHR3ZWVuXG4gICAqIEBwYXJhbSB7T2JqZWN0PX0gb3B0X2NvbmZpZyBDb25maWd1cmF0aW9uIG9iamVjdCB0byBiZSBwYXNzZWQgdG9cbiAgICogYHt7I2Nyb3NzTGluayBcIlR3ZWVuYWJsZS9zZXRDb25maWc6bWV0aG9kXCJ9fXt7L2Nyb3NzTGlua319YC5cbiAgICogQGNoYWluYWJsZVxuICAgKi9cbiAgVHdlZW5hYmxlLnByb3RvdHlwZS50d2VlbiA9IGZ1bmN0aW9uIChvcHRfY29uZmlnKSB7XG4gICAgaWYgKHRoaXMuX2lzVHdlZW5pbmcpIHtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIC8vIE9ubHkgc2V0IGRlZmF1bHQgY29uZmlnIGlmIG5vIGNvbmZpZ3VyYXRpb24gaGFzIGJlZW4gc2V0IHByZXZpb3VzbHkgYW5kXG4gICAgLy8gbm9uZSBpcyBwcm92aWRlZCBub3cuXG4gICAgaWYgKG9wdF9jb25maWcgIT09IHVuZGVmaW5lZCB8fCAhdGhpcy5fY29uZmlndXJlZCkge1xuICAgICAgdGhpcy5zZXRDb25maWcob3B0X2NvbmZpZyk7XG4gICAgfVxuXG4gICAgdGhpcy5fdGltZXN0YW1wID0gbm93KCk7XG4gICAgdGhpcy5fc3RhcnQodGhpcy5nZXQoKSwgdGhpcy5fYXR0YWNobWVudCk7XG4gICAgcmV0dXJuIHRoaXMucmVzdW1lKCk7XG4gIH07XG5cbiAgLyoqXG4gICAqIENvbmZpZ3VyZSBhIHR3ZWVuIHRoYXQgd2lsbCBzdGFydCBhdCBzb21lIHBvaW50IGluIHRoZSBmdXR1cmUuXG4gICAqXG4gICAqIEBtZXRob2Qgc2V0Q29uZmlnXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWcgVGhlIGZvbGxvd2luZyB2YWx1ZXMgYXJlIHZhbGlkOlxuICAgKiAtIF9fZnJvbV9fIChfT2JqZWN0PV8pOiBTdGFydGluZyBwb3NpdGlvbi4gIElmIG9taXR0ZWQsIGB7eyNjcm9zc0xpbmtcbiAgICogICBcIlR3ZWVuYWJsZS9nZXQ6bWV0aG9kXCJ9fWdldCgpe3svY3Jvc3NMaW5rfX1gIGlzIHVzZWQuXG4gICAqIC0gX190b19fIChfT2JqZWN0PV8pOiBFbmRpbmcgcG9zaXRpb24uXG4gICAqIC0gX19kdXJhdGlvbl9fIChfbnVtYmVyPV8pOiBIb3cgbWFueSBtaWxsaXNlY29uZHMgdG8gYW5pbWF0ZSBmb3IuXG4gICAqIC0gX19kZWxheV9fIChfZGVsYXk9Xyk6IEhvdyBtYW55IG1pbGxpc2Vjb25kcyB0byB3YWl0IGJlZm9yZSBzdGFydGluZyB0aGVcbiAgICogICB0d2Vlbi5cbiAgICogLSBfX3N0YXJ0X18gKF9GdW5jdGlvbihPYmplY3QsICopXyk6IEZ1bmN0aW9uIHRvIGV4ZWN1dGUgd2hlbiB0aGUgdHdlZW5cbiAgICogICBiZWdpbnMuICBSZWNlaXZlcyB0aGUgc3RhdGUgb2YgdGhlIHR3ZWVuIGFzIHRoZSBmaXJzdCBwYXJhbWV0ZXIgYW5kXG4gICAqICAgYGF0dGFjaG1lbnRgIGFzIHRoZSBzZWNvbmQgcGFyYW1ldGVyLlxuICAgKiAtIF9fc3RlcF9fIChfRnVuY3Rpb24oT2JqZWN0LCAqLCBudW1iZXIpXyk6IEZ1bmN0aW9uIHRvIGV4ZWN1dGUgb24gZXZlcnlcbiAgICogICB0aWNrLiAgUmVjZWl2ZXMgYHt7I2Nyb3NzTGlua1xuICAgKiAgIFwiVHdlZW5hYmxlL2dldDptZXRob2RcIn19Z2V0KCl7ey9jcm9zc0xpbmt9fWAgYXMgdGhlIGZpcnN0IHBhcmFtZXRlcixcbiAgICogICBgYXR0YWNobWVudGAgYXMgdGhlIHNlY29uZCBwYXJhbWV0ZXIsIGFuZCB0aGUgdGltZSBlbGFwc2VkIHNpbmNlIHRoZVxuICAgKiAgIHN0YXJ0IG9mIHRoZSB0d2VlbiBhcyB0aGUgdGhpcmQuIFRoaXMgZnVuY3Rpb24gaXMgbm90IGNhbGxlZCBvbiB0aGVcbiAgICogICBmaW5hbCBzdGVwIG9mIHRoZSBhbmltYXRpb24sIGJ1dCBgZmluaXNoYCBpcy5cbiAgICogLSBfX2ZpbmlzaF9fIChfRnVuY3Rpb24oT2JqZWN0LCAqKV8pOiBGdW5jdGlvbiB0byBleGVjdXRlIHVwb24gdHdlZW5cbiAgICogICBjb21wbGV0aW9uLiAgUmVjZWl2ZXMgdGhlIHN0YXRlIG9mIHRoZSB0d2VlbiBhcyB0aGUgZmlyc3QgcGFyYW1ldGVyIGFuZFxuICAgKiAgIGBhdHRhY2htZW50YCBhcyB0aGUgc2Vjb25kIHBhcmFtZXRlci5cbiAgICogLSBfX2Vhc2luZ19fIChfT2JqZWN0LjxzdHJpbmd8RnVuY3Rpb24+fHN0cmluZ3xGdW5jdGlvbj1fKTogRWFzaW5nIGN1cnZlXG4gICAqICAgbmFtZShzKSBvciBmdW5jdGlvbihzKSB0byB1c2UgZm9yIHRoZSB0d2Vlbi5cbiAgICogLSBfX2F0dGFjaG1lbnRfXyAoXypfKTogQ2FjaGVkIHZhbHVlIHRoYXQgaXMgcGFzc2VkIHRvIHRoZVxuICAgKiAgIGBzdGVwYC9gc3RhcnRgL2BmaW5pc2hgIG1ldGhvZHMuXG4gICAqIEBjaGFpbmFibGVcbiAgICovXG4gIFR3ZWVuYWJsZS5wcm90b3R5cGUuc2V0Q29uZmlnID0gZnVuY3Rpb24gKGNvbmZpZykge1xuICAgIGNvbmZpZyA9IGNvbmZpZyB8fCB7fTtcbiAgICB0aGlzLl9jb25maWd1cmVkID0gdHJ1ZTtcblxuICAgIC8vIEF0dGFjaCBzb21ldGhpbmcgdG8gdGhpcyBUd2VlbmFibGUgaW5zdGFuY2UgKGUuZy46IGEgRE9NIGVsZW1lbnQsIGFuXG4gICAgLy8gb2JqZWN0LCBhIHN0cmluZywgZXRjLik7XG4gICAgdGhpcy5fYXR0YWNobWVudCA9IGNvbmZpZy5hdHRhY2htZW50O1xuXG4gICAgLy8gSW5pdCB0aGUgaW50ZXJuYWwgc3RhdGVcbiAgICB0aGlzLl9wYXVzZWRBdFRpbWUgPSBudWxsO1xuICAgIHRoaXMuX3NjaGVkdWxlSWQgPSBudWxsO1xuICAgIHRoaXMuX2RlbGF5ID0gY29uZmlnLmRlbGF5IHx8IDA7XG4gICAgdGhpcy5fc3RhcnQgPSBjb25maWcuc3RhcnQgfHwgbm9vcDtcbiAgICB0aGlzLl9zdGVwID0gY29uZmlnLnN0ZXAgfHwgbm9vcDtcbiAgICB0aGlzLl9maW5pc2ggPSBjb25maWcuZmluaXNoIHx8IG5vb3A7XG4gICAgdGhpcy5fZHVyYXRpb24gPSBjb25maWcuZHVyYXRpb24gfHwgREVGQVVMVF9EVVJBVElPTjtcbiAgICB0aGlzLl9jdXJyZW50U3RhdGUgPSBzaGFsbG93Q29weSh7fSwgY29uZmlnLmZyb20pIHx8IHRoaXMuZ2V0KCk7XG4gICAgdGhpcy5fb3JpZ2luYWxTdGF0ZSA9IHRoaXMuZ2V0KCk7XG4gICAgdGhpcy5fdGFyZ2V0U3RhdGUgPSBzaGFsbG93Q29weSh7fSwgY29uZmlnLnRvKSB8fCB0aGlzLmdldCgpO1xuXG4gICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgIHRoaXMuX3RpbWVvdXRIYW5kbGVyID0gZnVuY3Rpb24gKCkge1xuICAgICAgdGltZW91dEhhbmRsZXIoc2VsZixcbiAgICAgICAgc2VsZi5fdGltZXN0YW1wLFxuICAgICAgICBzZWxmLl9kZWxheSxcbiAgICAgICAgc2VsZi5fZHVyYXRpb24sXG4gICAgICAgIHNlbGYuX2N1cnJlbnRTdGF0ZSxcbiAgICAgICAgc2VsZi5fb3JpZ2luYWxTdGF0ZSxcbiAgICAgICAgc2VsZi5fdGFyZ2V0U3RhdGUsXG4gICAgICAgIHNlbGYuX2Vhc2luZyxcbiAgICAgICAgc2VsZi5fc3RlcCxcbiAgICAgICAgc2VsZi5fc2NoZWR1bGVGdW5jdGlvblxuICAgICAgKTtcbiAgICB9O1xuXG4gICAgLy8gQWxpYXNlcyB1c2VkIGJlbG93XG4gICAgdmFyIGN1cnJlbnRTdGF0ZSA9IHRoaXMuX2N1cnJlbnRTdGF0ZTtcbiAgICB2YXIgdGFyZ2V0U3RhdGUgPSB0aGlzLl90YXJnZXRTdGF0ZTtcblxuICAgIC8vIEVuc3VyZSB0aGF0IHRoZXJlIGlzIGFsd2F5cyBzb21ldGhpbmcgdG8gdHdlZW4gdG8uXG4gICAgZGVmYXVsdHModGFyZ2V0U3RhdGUsIGN1cnJlbnRTdGF0ZSk7XG5cbiAgICB0aGlzLl9lYXNpbmcgPSBjb21wb3NlRWFzaW5nT2JqZWN0KFxuICAgICAgY3VycmVudFN0YXRlLCBjb25maWcuZWFzaW5nIHx8IERFRkFVTFRfRUFTSU5HKTtcblxuICAgIHRoaXMuX2ZpbHRlckFyZ3MgPVxuICAgICAgW2N1cnJlbnRTdGF0ZSwgdGhpcy5fb3JpZ2luYWxTdGF0ZSwgdGFyZ2V0U3RhdGUsIHRoaXMuX2Vhc2luZ107XG5cbiAgICBhcHBseUZpbHRlcih0aGlzLCAndHdlZW5DcmVhdGVkJyk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgLyoqXG4gICAqIEBtZXRob2QgZ2V0XG4gICAqIEByZXR1cm4ge09iamVjdH0gVGhlIGN1cnJlbnQgc3RhdGUuXG4gICAqL1xuICBUd2VlbmFibGUucHJvdG90eXBlLmdldCA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gc2hhbGxvd0NvcHkoe30sIHRoaXMuX2N1cnJlbnRTdGF0ZSk7XG4gIH07XG5cbiAgLyoqXG4gICAqIEBtZXRob2Qgc2V0XG4gICAqIEBwYXJhbSB7T2JqZWN0fSBzdGF0ZSBUaGUgY3VycmVudCBzdGF0ZS5cbiAgICovXG4gIFR3ZWVuYWJsZS5wcm90b3R5cGUuc2V0ID0gZnVuY3Rpb24gKHN0YXRlKSB7XG4gICAgdGhpcy5fY3VycmVudFN0YXRlID0gc3RhdGU7XG4gIH07XG5cbiAgLyoqXG4gICAqIFBhdXNlIGEgdHdlZW4uICBQYXVzZWQgdHdlZW5zIGNhbiBiZSByZXN1bWVkIGZyb20gdGhlIHBvaW50IGF0IHdoaWNoIHRoZXlcbiAgICogd2VyZSBwYXVzZWQuICBUaGlzIGlzIGRpZmZlcmVudCBmcm9tIGB7eyNjcm9zc0xpbmtcbiAgICogXCJUd2VlbmFibGUvc3RvcDptZXRob2RcIn19e3svY3Jvc3NMaW5rfX1gLCBhcyB0aGF0IG1ldGhvZFxuICAgKiBjYXVzZXMgYSB0d2VlbiB0byBzdGFydCBvdmVyIHdoZW4gaXQgaXMgcmVzdW1lZC5cbiAgICogQG1ldGhvZCBwYXVzZVxuICAgKiBAY2hhaW5hYmxlXG4gICAqL1xuICBUd2VlbmFibGUucHJvdG90eXBlLnBhdXNlID0gZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuX3BhdXNlZEF0VGltZSA9IG5vdygpO1xuICAgIHRoaXMuX2lzUGF1c2VkID0gdHJ1ZTtcbiAgICByZXR1cm4gdGhpcztcbiAgfTtcblxuICAvKipcbiAgICogUmVzdW1lIGEgcGF1c2VkIHR3ZWVuLlxuICAgKiBAbWV0aG9kIHJlc3VtZVxuICAgKiBAY2hhaW5hYmxlXG4gICAqL1xuICBUd2VlbmFibGUucHJvdG90eXBlLnJlc3VtZSA9IGZ1bmN0aW9uICgpIHtcbiAgICBpZiAodGhpcy5faXNQYXVzZWQpIHtcbiAgICAgIHRoaXMuX3RpbWVzdGFtcCArPSBub3coKSAtIHRoaXMuX3BhdXNlZEF0VGltZTtcbiAgICB9XG5cbiAgICB0aGlzLl9pc1BhdXNlZCA9IGZhbHNlO1xuICAgIHRoaXMuX2lzVHdlZW5pbmcgPSB0cnVlO1xuXG4gICAgdGhpcy5fdGltZW91dEhhbmRsZXIoKTtcblxuICAgIHJldHVybiB0aGlzO1xuICB9O1xuXG4gIC8qKlxuICAgKiBNb3ZlIHRoZSBzdGF0ZSBvZiB0aGUgYW5pbWF0aW9uIHRvIGEgc3BlY2lmaWMgcG9pbnQgaW4gdGhlIHR3ZWVuJ3NcbiAgICogdGltZWxpbmUuICBJZiB0aGUgYW5pbWF0aW9uIGlzIG5vdCBydW5uaW5nLCB0aGlzIHdpbGwgY2F1c2UgdGhlIGBzdGVwYFxuICAgKiBoYW5kbGVycyB0byBiZSBjYWxsZWQuXG4gICAqIEBtZXRob2Qgc2Vla1xuICAgKiBAcGFyYW0ge21pbGxpc2Vjb25kfSBtaWxsaXNlY29uZCBUaGUgbWlsbGlzZWNvbmQgb2YgdGhlIGFuaW1hdGlvbiB0byBzZWVrXG4gICAqIHRvLiAgVGhpcyBtdXN0IG5vdCBiZSBsZXNzIHRoYW4gYDBgLlxuICAgKiBAY2hhaW5hYmxlXG4gICAqL1xuICBUd2VlbmFibGUucHJvdG90eXBlLnNlZWsgPSBmdW5jdGlvbiAobWlsbGlzZWNvbmQpIHtcbiAgICBtaWxsaXNlY29uZCA9IE1hdGgubWF4KG1pbGxpc2Vjb25kLCAwKTtcbiAgICB2YXIgY3VycmVudFRpbWUgPSBub3coKTtcblxuICAgIGlmICgodGhpcy5fdGltZXN0YW1wICsgbWlsbGlzZWNvbmQpID09PSAwKSB7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICB0aGlzLl90aW1lc3RhbXAgPSBjdXJyZW50VGltZSAtIG1pbGxpc2Vjb25kO1xuXG4gICAgaWYgKCF0aGlzLmlzUGxheWluZygpKSB7XG4gICAgICB0aGlzLl9pc1R3ZWVuaW5nID0gdHJ1ZTtcbiAgICAgIHRoaXMuX2lzUGF1c2VkID0gZmFsc2U7XG5cbiAgICAgIC8vIElmIHRoZSBhbmltYXRpb24gaXMgbm90IHJ1bm5pbmcsIGNhbGwgdGltZW91dEhhbmRsZXIgdG8gbWFrZSBzdXJlIHRoYXRcbiAgICAgIC8vIGFueSBzdGVwIGhhbmRsZXJzIGFyZSBydW4uXG4gICAgICB0aW1lb3V0SGFuZGxlcih0aGlzLFxuICAgICAgICB0aGlzLl90aW1lc3RhbXAsXG4gICAgICAgIHRoaXMuX2RlbGF5LFxuICAgICAgICB0aGlzLl9kdXJhdGlvbixcbiAgICAgICAgdGhpcy5fY3VycmVudFN0YXRlLFxuICAgICAgICB0aGlzLl9vcmlnaW5hbFN0YXRlLFxuICAgICAgICB0aGlzLl90YXJnZXRTdGF0ZSxcbiAgICAgICAgdGhpcy5fZWFzaW5nLFxuICAgICAgICB0aGlzLl9zdGVwLFxuICAgICAgICB0aGlzLl9zY2hlZHVsZUZ1bmN0aW9uLFxuICAgICAgICBjdXJyZW50VGltZVxuICAgICAgKTtcblxuICAgICAgdGhpcy5wYXVzZSgpO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzO1xuICB9O1xuXG4gIC8qKlxuICAgKiBTdG9wcyBhbmQgY2FuY2VscyBhIHR3ZWVuLlxuICAgKiBAcGFyYW0ge2Jvb2xlYW49fSBnb3RvRW5kIElmIGBmYWxzZWAgb3Igb21pdHRlZCwgdGhlIHR3ZWVuIGp1c3Qgc3RvcHMgYXRcbiAgICogaXRzIGN1cnJlbnQgc3RhdGUsIGFuZCB0aGUgYGZpbmlzaGAgaGFuZGxlciBpcyBub3QgaW52b2tlZC4gIElmIGB0cnVlYCxcbiAgICogdGhlIHR3ZWVuZWQgb2JqZWN0J3MgdmFsdWVzIGFyZSBpbnN0YW50bHkgc2V0IHRvIHRoZSB0YXJnZXQgdmFsdWVzLCBhbmRcbiAgICogYGZpbmlzaGAgaXMgaW52b2tlZC5cbiAgICogQG1ldGhvZCBzdG9wXG4gICAqIEBjaGFpbmFibGVcbiAgICovXG4gIFR3ZWVuYWJsZS5wcm90b3R5cGUuc3RvcCA9IGZ1bmN0aW9uIChnb3RvRW5kKSB7XG4gICAgdGhpcy5faXNUd2VlbmluZyA9IGZhbHNlO1xuICAgIHRoaXMuX2lzUGF1c2VkID0gZmFsc2U7XG4gICAgdGhpcy5fdGltZW91dEhhbmRsZXIgPSBub29wO1xuXG4gICAgKHJvb3QuY2FuY2VsQW5pbWF0aW9uRnJhbWUgICAgICAgICAgICB8fFxuICAgIHJvb3Qud2Via2l0Q2FuY2VsQW5pbWF0aW9uRnJhbWUgICAgIHx8XG4gICAgcm9vdC5vQ2FuY2VsQW5pbWF0aW9uRnJhbWUgICAgICAgICAgfHxcbiAgICByb290Lm1zQ2FuY2VsQW5pbWF0aW9uRnJhbWUgICAgICAgICB8fFxuICAgIHJvb3QubW96Q2FuY2VsUmVxdWVzdEFuaW1hdGlvbkZyYW1lIHx8XG4gICAgcm9vdC5jbGVhclRpbWVvdXQpKHRoaXMuX3NjaGVkdWxlSWQpO1xuXG4gICAgaWYgKGdvdG9FbmQpIHtcbiAgICAgIGFwcGx5RmlsdGVyKHRoaXMsICdiZWZvcmVUd2VlbicpO1xuICAgICAgdHdlZW5Qcm9wcyhcbiAgICAgICAgMSxcbiAgICAgICAgdGhpcy5fY3VycmVudFN0YXRlLFxuICAgICAgICB0aGlzLl9vcmlnaW5hbFN0YXRlLFxuICAgICAgICB0aGlzLl90YXJnZXRTdGF0ZSxcbiAgICAgICAgMSxcbiAgICAgICAgMCxcbiAgICAgICAgdGhpcy5fZWFzaW5nXG4gICAgICApO1xuICAgICAgYXBwbHlGaWx0ZXIodGhpcywgJ2FmdGVyVHdlZW4nKTtcbiAgICAgIGFwcGx5RmlsdGVyKHRoaXMsICdhZnRlclR3ZWVuRW5kJyk7XG4gICAgICB0aGlzLl9maW5pc2guY2FsbCh0aGlzLCB0aGlzLl9jdXJyZW50U3RhdGUsIHRoaXMuX2F0dGFjaG1lbnQpO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzO1xuICB9O1xuXG4gIC8qKlxuICAgKiBAbWV0aG9kIGlzUGxheWluZ1xuICAgKiBAcmV0dXJuIHtib29sZWFufSBXaGV0aGVyIG9yIG5vdCBhIHR3ZWVuIGlzIHJ1bm5pbmcuXG4gICAqL1xuICBUd2VlbmFibGUucHJvdG90eXBlLmlzUGxheWluZyA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcy5faXNUd2VlbmluZyAmJiAhdGhpcy5faXNQYXVzZWQ7XG4gIH07XG5cbiAgLyoqXG4gICAqIFNldCBhIGN1c3RvbSBzY2hlZHVsZSBmdW5jdGlvbi5cbiAgICpcbiAgICogSWYgYSBjdXN0b20gZnVuY3Rpb24gaXMgbm90IHNldCxcbiAgICogW2ByZXF1ZXN0QW5pbWF0aW9uRnJhbWVgXShodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9BUEkvd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSlcbiAgICogaXMgdXNlZCBpZiBhdmFpbGFibGUsIG90aGVyd2lzZVxuICAgKiBbYHNldFRpbWVvdXRgXShodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9BUEkvV2luZG93LnNldFRpbWVvdXQpXG4gICAqIGlzIHVzZWQuXG4gICAqIEBtZXRob2Qgc2V0U2NoZWR1bGVGdW5jdGlvblxuICAgKiBAcGFyYW0ge0Z1bmN0aW9uKEZ1bmN0aW9uLG51bWJlcil9IHNjaGVkdWxlRnVuY3Rpb24gVGhlIGZ1bmN0aW9uIHRvIGJlXG4gICAqIHVzZWQgdG8gc2NoZWR1bGUgdGhlIG5leHQgZnJhbWUgdG8gYmUgcmVuZGVyZWQuXG4gICAqL1xuICBUd2VlbmFibGUucHJvdG90eXBlLnNldFNjaGVkdWxlRnVuY3Rpb24gPSBmdW5jdGlvbiAoc2NoZWR1bGVGdW5jdGlvbikge1xuICAgIHRoaXMuX3NjaGVkdWxlRnVuY3Rpb24gPSBzY2hlZHVsZUZ1bmN0aW9uO1xuICB9O1xuXG4gIC8qKlxuICAgKiBgZGVsZXRlYCBhbGwgXCJvd25cIiBwcm9wZXJ0aWVzLiAgQ2FsbCB0aGlzIHdoZW4gdGhlIGBUd2VlbmFibGVgIGluc3RhbmNlXG4gICAqIGlzIG5vIGxvbmdlciBuZWVkZWQgdG8gZnJlZSBtZW1vcnkuXG4gICAqIEBtZXRob2QgZGlzcG9zZVxuICAgKi9cbiAgVHdlZW5hYmxlLnByb3RvdHlwZS5kaXNwb3NlID0gZnVuY3Rpb24gKCkge1xuICAgIHZhciBwcm9wO1xuICAgIGZvciAocHJvcCBpbiB0aGlzKSB7XG4gICAgICBpZiAodGhpcy5oYXNPd25Qcm9wZXJ0eShwcm9wKSkge1xuICAgICAgICBkZWxldGUgdGhpc1twcm9wXTtcbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgLyoqXG4gICAqIEZpbHRlcnMgYXJlIHVzZWQgZm9yIHRyYW5zZm9ybWluZyB0aGUgcHJvcGVydGllcyBvZiBhIHR3ZWVuIGF0IHZhcmlvdXNcbiAgICogcG9pbnRzIGluIGEgVHdlZW5hYmxlJ3MgbGlmZSBjeWNsZS4gIFNlZSB0aGUgUkVBRE1FIGZvciBtb3JlIGluZm8gb24gdGhpcy5cbiAgICogQHByaXZhdGVcbiAgICovXG4gIFR3ZWVuYWJsZS5wcm90b3R5cGUuZmlsdGVyID0ge307XG5cbiAgLyoqXG4gICAqIFRoaXMgb2JqZWN0IGNvbnRhaW5zIGFsbCBvZiB0aGUgdHdlZW5zIGF2YWlsYWJsZSB0byBTaGlmdHkuICBJdCBpc1xuICAgKiBleHRlbnNpYmxlIC0gc2ltcGx5IGF0dGFjaCBwcm9wZXJ0aWVzIHRvIHRoZSBgVHdlZW5hYmxlLnByb3RvdHlwZS5mb3JtdWxhYFxuICAgKiBPYmplY3QgZm9sbG93aW5nIHRoZSBzYW1lIGZvcm1hdCBhcyBgbGluZWFyYC5cbiAgICpcbiAgICogYHBvc2Agc2hvdWxkIGJlIGEgbm9ybWFsaXplZCBgbnVtYmVyYCAoYmV0d2VlbiAwIGFuZCAxKS5cbiAgICogQHByb3BlcnR5IGZvcm11bGFcbiAgICogQHR5cGUge09iamVjdChmdW5jdGlvbil9XG4gICAqL1xuICBUd2VlbmFibGUucHJvdG90eXBlLmZvcm11bGEgPSB7XG4gICAgbGluZWFyOiBmdW5jdGlvbiAocG9zKSB7XG4gICAgICByZXR1cm4gcG9zO1xuICAgIH1cbiAgfTtcblxuICBmb3JtdWxhID0gVHdlZW5hYmxlLnByb3RvdHlwZS5mb3JtdWxhO1xuXG4gIHNoYWxsb3dDb3B5KFR3ZWVuYWJsZSwge1xuICAgICdub3cnOiBub3dcbiAgICAsJ2VhY2gnOiBlYWNoXG4gICAgLCd0d2VlblByb3BzJzogdHdlZW5Qcm9wc1xuICAgICwndHdlZW5Qcm9wJzogdHdlZW5Qcm9wXG4gICAgLCdhcHBseUZpbHRlcic6IGFwcGx5RmlsdGVyXG4gICAgLCdzaGFsbG93Q29weSc6IHNoYWxsb3dDb3B5XG4gICAgLCdkZWZhdWx0cyc6IGRlZmF1bHRzXG4gICAgLCdjb21wb3NlRWFzaW5nT2JqZWN0JzogY29tcG9zZUVhc2luZ09iamVjdFxuICB9KTtcblxuICAvLyBgcm9vdGAgaXMgcHJvdmlkZWQgaW4gdGhlIGludHJvL291dHJvIGZpbGVzLlxuXG4gIC8vIEEgaG9vayB1c2VkIGZvciB1bml0IHRlc3RpbmcuXG4gIGlmICh0eXBlb2YgU0hJRlRZX0RFQlVHX05PVyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIHJvb3QudGltZW91dEhhbmRsZXIgPSB0aW1lb3V0SGFuZGxlcjtcbiAgfVxuXG4gIC8vIEJvb3RzdHJhcCBUd2VlbmFibGUgYXBwcm9wcmlhdGVseSBmb3IgdGhlIGVudmlyb25tZW50LlxuICBpZiAodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnKSB7XG4gICAgLy8gQ29tbW9uSlNcbiAgICBtb2R1bGUuZXhwb3J0cyA9IFR3ZWVuYWJsZTtcbiAgfSBlbHNlIGlmICh0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpIHtcbiAgICAvLyBBTURcbiAgICBkZWZpbmUoZnVuY3Rpb24gKCkge3JldHVybiBUd2VlbmFibGU7fSk7XG4gIH0gZWxzZSBpZiAodHlwZW9mIHJvb3QuVHdlZW5hYmxlID09PSAndW5kZWZpbmVkJykge1xuICAgIC8vIEJyb3dzZXI6IE1ha2UgYFR3ZWVuYWJsZWAgZ2xvYmFsbHkgYWNjZXNzaWJsZS5cbiAgICByb290LlR3ZWVuYWJsZSA9IFR3ZWVuYWJsZTtcbiAgfVxuXG4gIHJldHVybiBUd2VlbmFibGU7XG5cbn0gKCkpO1xuXG4vKiFcbiAqIEFsbCBlcXVhdGlvbnMgYXJlIGFkYXB0ZWQgZnJvbSBUaG9tYXMgRnVjaHMnXG4gKiBbU2NyaXB0eTJdKGh0dHBzOi8vZ2l0aHViLmNvbS9tYWRyb2JieS9zY3JpcHR5Mi9ibG9iL21hc3Rlci9zcmMvZWZmZWN0cy90cmFuc2l0aW9ucy9wZW5uZXIuanMpLlxuICpcbiAqIEJhc2VkIG9uIEVhc2luZyBFcXVhdGlvbnMgKGMpIDIwMDMgW1JvYmVydFxuICogUGVubmVyXShodHRwOi8vd3d3LnJvYmVydHBlbm5lci5jb20vKSwgYWxsIHJpZ2h0cyByZXNlcnZlZC4gVGhpcyB3b3JrIGlzXG4gKiBbc3ViamVjdCB0byB0ZXJtc10oaHR0cDovL3d3dy5yb2JlcnRwZW5uZXIuY29tL2Vhc2luZ190ZXJtc19vZl91c2UuaHRtbCkuXG4gKi9cblxuLyohXG4gKiAgVEVSTVMgT0YgVVNFIC0gRUFTSU5HIEVRVUFUSU9OU1xuICogIE9wZW4gc291cmNlIHVuZGVyIHRoZSBCU0QgTGljZW5zZS5cbiAqICBFYXNpbmcgRXF1YXRpb25zIChjKSAyMDAzIFJvYmVydCBQZW5uZXIsIGFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKi9cblxuOyhmdW5jdGlvbiAoKSB7XG5cbiAgVHdlZW5hYmxlLnNoYWxsb3dDb3B5KFR3ZWVuYWJsZS5wcm90b3R5cGUuZm9ybXVsYSwge1xuICAgIGVhc2VJblF1YWQ6IGZ1bmN0aW9uIChwb3MpIHtcbiAgICAgIHJldHVybiBNYXRoLnBvdyhwb3MsIDIpO1xuICAgIH0sXG5cbiAgICBlYXNlT3V0UXVhZDogZnVuY3Rpb24gKHBvcykge1xuICAgICAgcmV0dXJuIC0oTWF0aC5wb3coKHBvcyAtIDEpLCAyKSAtIDEpO1xuICAgIH0sXG5cbiAgICBlYXNlSW5PdXRRdWFkOiBmdW5jdGlvbiAocG9zKSB7XG4gICAgICBpZiAoKHBvcyAvPSAwLjUpIDwgMSkge3JldHVybiAwLjUgKiBNYXRoLnBvdyhwb3MsMik7fVxuICAgICAgcmV0dXJuIC0wLjUgKiAoKHBvcyAtPSAyKSAqIHBvcyAtIDIpO1xuICAgIH0sXG5cbiAgICBlYXNlSW5DdWJpYzogZnVuY3Rpb24gKHBvcykge1xuICAgICAgcmV0dXJuIE1hdGgucG93KHBvcywgMyk7XG4gICAgfSxcblxuICAgIGVhc2VPdXRDdWJpYzogZnVuY3Rpb24gKHBvcykge1xuICAgICAgcmV0dXJuIChNYXRoLnBvdygocG9zIC0gMSksIDMpICsgMSk7XG4gICAgfSxcblxuICAgIGVhc2VJbk91dEN1YmljOiBmdW5jdGlvbiAocG9zKSB7XG4gICAgICBpZiAoKHBvcyAvPSAwLjUpIDwgMSkge3JldHVybiAwLjUgKiBNYXRoLnBvdyhwb3MsMyk7fVxuICAgICAgcmV0dXJuIDAuNSAqIChNYXRoLnBvdygocG9zIC0gMiksMykgKyAyKTtcbiAgICB9LFxuXG4gICAgZWFzZUluUXVhcnQ6IGZ1bmN0aW9uIChwb3MpIHtcbiAgICAgIHJldHVybiBNYXRoLnBvdyhwb3MsIDQpO1xuICAgIH0sXG5cbiAgICBlYXNlT3V0UXVhcnQ6IGZ1bmN0aW9uIChwb3MpIHtcbiAgICAgIHJldHVybiAtKE1hdGgucG93KChwb3MgLSAxKSwgNCkgLSAxKTtcbiAgICB9LFxuXG4gICAgZWFzZUluT3V0UXVhcnQ6IGZ1bmN0aW9uIChwb3MpIHtcbiAgICAgIGlmICgocG9zIC89IDAuNSkgPCAxKSB7cmV0dXJuIDAuNSAqIE1hdGgucG93KHBvcyw0KTt9XG4gICAgICByZXR1cm4gLTAuNSAqICgocG9zIC09IDIpICogTWF0aC5wb3cocG9zLDMpIC0gMik7XG4gICAgfSxcblxuICAgIGVhc2VJblF1aW50OiBmdW5jdGlvbiAocG9zKSB7XG4gICAgICByZXR1cm4gTWF0aC5wb3cocG9zLCA1KTtcbiAgICB9LFxuXG4gICAgZWFzZU91dFF1aW50OiBmdW5jdGlvbiAocG9zKSB7XG4gICAgICByZXR1cm4gKE1hdGgucG93KChwb3MgLSAxKSwgNSkgKyAxKTtcbiAgICB9LFxuXG4gICAgZWFzZUluT3V0UXVpbnQ6IGZ1bmN0aW9uIChwb3MpIHtcbiAgICAgIGlmICgocG9zIC89IDAuNSkgPCAxKSB7cmV0dXJuIDAuNSAqIE1hdGgucG93KHBvcyw1KTt9XG4gICAgICByZXR1cm4gMC41ICogKE1hdGgucG93KChwb3MgLSAyKSw1KSArIDIpO1xuICAgIH0sXG5cbiAgICBlYXNlSW5TaW5lOiBmdW5jdGlvbiAocG9zKSB7XG4gICAgICByZXR1cm4gLU1hdGguY29zKHBvcyAqIChNYXRoLlBJIC8gMikpICsgMTtcbiAgICB9LFxuXG4gICAgZWFzZU91dFNpbmU6IGZ1bmN0aW9uIChwb3MpIHtcbiAgICAgIHJldHVybiBNYXRoLnNpbihwb3MgKiAoTWF0aC5QSSAvIDIpKTtcbiAgICB9LFxuXG4gICAgZWFzZUluT3V0U2luZTogZnVuY3Rpb24gKHBvcykge1xuICAgICAgcmV0dXJuICgtMC41ICogKE1hdGguY29zKE1hdGguUEkgKiBwb3MpIC0gMSkpO1xuICAgIH0sXG5cbiAgICBlYXNlSW5FeHBvOiBmdW5jdGlvbiAocG9zKSB7XG4gICAgICByZXR1cm4gKHBvcyA9PT0gMCkgPyAwIDogTWF0aC5wb3coMiwgMTAgKiAocG9zIC0gMSkpO1xuICAgIH0sXG5cbiAgICBlYXNlT3V0RXhwbzogZnVuY3Rpb24gKHBvcykge1xuICAgICAgcmV0dXJuIChwb3MgPT09IDEpID8gMSA6IC1NYXRoLnBvdygyLCAtMTAgKiBwb3MpICsgMTtcbiAgICB9LFxuXG4gICAgZWFzZUluT3V0RXhwbzogZnVuY3Rpb24gKHBvcykge1xuICAgICAgaWYgKHBvcyA9PT0gMCkge3JldHVybiAwO31cbiAgICAgIGlmIChwb3MgPT09IDEpIHtyZXR1cm4gMTt9XG4gICAgICBpZiAoKHBvcyAvPSAwLjUpIDwgMSkge3JldHVybiAwLjUgKiBNYXRoLnBvdygyLDEwICogKHBvcyAtIDEpKTt9XG4gICAgICByZXR1cm4gMC41ICogKC1NYXRoLnBvdygyLCAtMTAgKiAtLXBvcykgKyAyKTtcbiAgICB9LFxuXG4gICAgZWFzZUluQ2lyYzogZnVuY3Rpb24gKHBvcykge1xuICAgICAgcmV0dXJuIC0oTWF0aC5zcXJ0KDEgLSAocG9zICogcG9zKSkgLSAxKTtcbiAgICB9LFxuXG4gICAgZWFzZU91dENpcmM6IGZ1bmN0aW9uIChwb3MpIHtcbiAgICAgIHJldHVybiBNYXRoLnNxcnQoMSAtIE1hdGgucG93KChwb3MgLSAxKSwgMikpO1xuICAgIH0sXG5cbiAgICBlYXNlSW5PdXRDaXJjOiBmdW5jdGlvbiAocG9zKSB7XG4gICAgICBpZiAoKHBvcyAvPSAwLjUpIDwgMSkge3JldHVybiAtMC41ICogKE1hdGguc3FydCgxIC0gcG9zICogcG9zKSAtIDEpO31cbiAgICAgIHJldHVybiAwLjUgKiAoTWF0aC5zcXJ0KDEgLSAocG9zIC09IDIpICogcG9zKSArIDEpO1xuICAgIH0sXG5cbiAgICBlYXNlT3V0Qm91bmNlOiBmdW5jdGlvbiAocG9zKSB7XG4gICAgICBpZiAoKHBvcykgPCAoMSAvIDIuNzUpKSB7XG4gICAgICAgIHJldHVybiAoNy41NjI1ICogcG9zICogcG9zKTtcbiAgICAgIH0gZWxzZSBpZiAocG9zIDwgKDIgLyAyLjc1KSkge1xuICAgICAgICByZXR1cm4gKDcuNTYyNSAqIChwb3MgLT0gKDEuNSAvIDIuNzUpKSAqIHBvcyArIDAuNzUpO1xuICAgICAgfSBlbHNlIGlmIChwb3MgPCAoMi41IC8gMi43NSkpIHtcbiAgICAgICAgcmV0dXJuICg3LjU2MjUgKiAocG9zIC09ICgyLjI1IC8gMi43NSkpICogcG9zICsgMC45Mzc1KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiAoNy41NjI1ICogKHBvcyAtPSAoMi42MjUgLyAyLjc1KSkgKiBwb3MgKyAwLjk4NDM3NSk7XG4gICAgICB9XG4gICAgfSxcblxuICAgIGVhc2VJbkJhY2s6IGZ1bmN0aW9uIChwb3MpIHtcbiAgICAgIHZhciBzID0gMS43MDE1ODtcbiAgICAgIHJldHVybiAocG9zKSAqIHBvcyAqICgocyArIDEpICogcG9zIC0gcyk7XG4gICAgfSxcblxuICAgIGVhc2VPdXRCYWNrOiBmdW5jdGlvbiAocG9zKSB7XG4gICAgICB2YXIgcyA9IDEuNzAxNTg7XG4gICAgICByZXR1cm4gKHBvcyA9IHBvcyAtIDEpICogcG9zICogKChzICsgMSkgKiBwb3MgKyBzKSArIDE7XG4gICAgfSxcblxuICAgIGVhc2VJbk91dEJhY2s6IGZ1bmN0aW9uIChwb3MpIHtcbiAgICAgIHZhciBzID0gMS43MDE1ODtcbiAgICAgIGlmICgocG9zIC89IDAuNSkgPCAxKSB7XG4gICAgICAgIHJldHVybiAwLjUgKiAocG9zICogcG9zICogKCgocyAqPSAoMS41MjUpKSArIDEpICogcG9zIC0gcykpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIDAuNSAqICgocG9zIC09IDIpICogcG9zICogKCgocyAqPSAoMS41MjUpKSArIDEpICogcG9zICsgcykgKyAyKTtcbiAgICB9LFxuXG4gICAgZWxhc3RpYzogZnVuY3Rpb24gKHBvcykge1xuICAgICAgLy8ganNoaW50IG1heGxlbjo5MFxuICAgICAgcmV0dXJuIC0xICogTWF0aC5wb3coNCwtOCAqIHBvcykgKiBNYXRoLnNpbigocG9zICogNiAtIDEpICogKDIgKiBNYXRoLlBJKSAvIDIpICsgMTtcbiAgICB9LFxuXG4gICAgc3dpbmdGcm9tVG86IGZ1bmN0aW9uIChwb3MpIHtcbiAgICAgIHZhciBzID0gMS43MDE1ODtcbiAgICAgIHJldHVybiAoKHBvcyAvPSAwLjUpIDwgMSkgP1xuICAgICAgICAgIDAuNSAqIChwb3MgKiBwb3MgKiAoKChzICo9ICgxLjUyNSkpICsgMSkgKiBwb3MgLSBzKSkgOlxuICAgICAgICAgIDAuNSAqICgocG9zIC09IDIpICogcG9zICogKCgocyAqPSAoMS41MjUpKSArIDEpICogcG9zICsgcykgKyAyKTtcbiAgICB9LFxuXG4gICAgc3dpbmdGcm9tOiBmdW5jdGlvbiAocG9zKSB7XG4gICAgICB2YXIgcyA9IDEuNzAxNTg7XG4gICAgICByZXR1cm4gcG9zICogcG9zICogKChzICsgMSkgKiBwb3MgLSBzKTtcbiAgICB9LFxuXG4gICAgc3dpbmdUbzogZnVuY3Rpb24gKHBvcykge1xuICAgICAgdmFyIHMgPSAxLjcwMTU4O1xuICAgICAgcmV0dXJuIChwb3MgLT0gMSkgKiBwb3MgKiAoKHMgKyAxKSAqIHBvcyArIHMpICsgMTtcbiAgICB9LFxuXG4gICAgYm91bmNlOiBmdW5jdGlvbiAocG9zKSB7XG4gICAgICBpZiAocG9zIDwgKDEgLyAyLjc1KSkge1xuICAgICAgICByZXR1cm4gKDcuNTYyNSAqIHBvcyAqIHBvcyk7XG4gICAgICB9IGVsc2UgaWYgKHBvcyA8ICgyIC8gMi43NSkpIHtcbiAgICAgICAgcmV0dXJuICg3LjU2MjUgKiAocG9zIC09ICgxLjUgLyAyLjc1KSkgKiBwb3MgKyAwLjc1KTtcbiAgICAgIH0gZWxzZSBpZiAocG9zIDwgKDIuNSAvIDIuNzUpKSB7XG4gICAgICAgIHJldHVybiAoNy41NjI1ICogKHBvcyAtPSAoMi4yNSAvIDIuNzUpKSAqIHBvcyArIDAuOTM3NSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gKDcuNTYyNSAqIChwb3MgLT0gKDIuNjI1IC8gMi43NSkpICogcG9zICsgMC45ODQzNzUpO1xuICAgICAgfVxuICAgIH0sXG5cbiAgICBib3VuY2VQYXN0OiBmdW5jdGlvbiAocG9zKSB7XG4gICAgICBpZiAocG9zIDwgKDEgLyAyLjc1KSkge1xuICAgICAgICByZXR1cm4gKDcuNTYyNSAqIHBvcyAqIHBvcyk7XG4gICAgICB9IGVsc2UgaWYgKHBvcyA8ICgyIC8gMi43NSkpIHtcbiAgICAgICAgcmV0dXJuIDIgLSAoNy41NjI1ICogKHBvcyAtPSAoMS41IC8gMi43NSkpICogcG9zICsgMC43NSk7XG4gICAgICB9IGVsc2UgaWYgKHBvcyA8ICgyLjUgLyAyLjc1KSkge1xuICAgICAgICByZXR1cm4gMiAtICg3LjU2MjUgKiAocG9zIC09ICgyLjI1IC8gMi43NSkpICogcG9zICsgMC45Mzc1KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiAyIC0gKDcuNTYyNSAqIChwb3MgLT0gKDIuNjI1IC8gMi43NSkpICogcG9zICsgMC45ODQzNzUpO1xuICAgICAgfVxuICAgIH0sXG5cbiAgICBlYXNlRnJvbVRvOiBmdW5jdGlvbiAocG9zKSB7XG4gICAgICBpZiAoKHBvcyAvPSAwLjUpIDwgMSkge3JldHVybiAwLjUgKiBNYXRoLnBvdyhwb3MsNCk7fVxuICAgICAgcmV0dXJuIC0wLjUgKiAoKHBvcyAtPSAyKSAqIE1hdGgucG93KHBvcywzKSAtIDIpO1xuICAgIH0sXG5cbiAgICBlYXNlRnJvbTogZnVuY3Rpb24gKHBvcykge1xuICAgICAgcmV0dXJuIE1hdGgucG93KHBvcyw0KTtcbiAgICB9LFxuXG4gICAgZWFzZVRvOiBmdW5jdGlvbiAocG9zKSB7XG4gICAgICByZXR1cm4gTWF0aC5wb3cocG9zLDAuMjUpO1xuICAgIH1cbiAgfSk7XG5cbn0oKSk7XG5cbi8vIGpzaGludCBtYXhsZW46MTAwXG4vKipcbiAqIFRoZSBCZXppZXIgbWFnaWMgaW4gdGhpcyBmaWxlIGlzIGFkYXB0ZWQvY29waWVkIGFsbW9zdCB3aG9sZXNhbGUgZnJvbVxuICogW1NjcmlwdHkyXShodHRwczovL2dpdGh1Yi5jb20vbWFkcm9iYnkvc2NyaXB0eTIvYmxvYi9tYXN0ZXIvc3JjL2VmZmVjdHMvdHJhbnNpdGlvbnMvY3ViaWMtYmV6aWVyLmpzKSxcbiAqIHdoaWNoIHdhcyBhZGFwdGVkIGZyb20gQXBwbGUgY29kZSAod2hpY2ggcHJvYmFibHkgY2FtZSBmcm9tXG4gKiBbaGVyZV0oaHR0cDovL29wZW5zb3VyY2UuYXBwbGUuY29tL3NvdXJjZS9XZWJDb3JlL1dlYkNvcmUtOTU1LjY2L3BsYXRmb3JtL2dyYXBoaWNzL1VuaXRCZXppZXIuaCkpLlxuICogU3BlY2lhbCB0aGFua3MgdG8gQXBwbGUgYW5kIFRob21hcyBGdWNocyBmb3IgbXVjaCBvZiB0aGlzIGNvZGUuXG4gKi9cblxuLyoqXG4gKiAgQ29weXJpZ2h0IChjKSAyMDA2IEFwcGxlIENvbXB1dGVyLCBJbmMuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogIFJlZGlzdHJpYnV0aW9uIGFuZCB1c2UgaW4gc291cmNlIGFuZCBiaW5hcnkgZm9ybXMsIHdpdGggb3Igd2l0aG91dFxuICogIG1vZGlmaWNhdGlvbiwgYXJlIHBlcm1pdHRlZCBwcm92aWRlZCB0aGF0IHRoZSBmb2xsb3dpbmcgY29uZGl0aW9ucyBhcmUgbWV0OlxuICpcbiAqICAxLiBSZWRpc3RyaWJ1dGlvbnMgb2Ygc291cmNlIGNvZGUgbXVzdCByZXRhaW4gdGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UsXG4gKiAgdGhpcyBsaXN0IG9mIGNvbmRpdGlvbnMgYW5kIHRoZSBmb2xsb3dpbmcgZGlzY2xhaW1lci5cbiAqXG4gKiAgMi4gUmVkaXN0cmlidXRpb25zIGluIGJpbmFyeSBmb3JtIG11c3QgcmVwcm9kdWNlIHRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlLFxuICogIHRoaXMgbGlzdCBvZiBjb25kaXRpb25zIGFuZCB0aGUgZm9sbG93aW5nIGRpc2NsYWltZXIgaW4gdGhlIGRvY3VtZW50YXRpb25cbiAqICBhbmQvb3Igb3RoZXIgbWF0ZXJpYWxzIHByb3ZpZGVkIHdpdGggdGhlIGRpc3RyaWJ1dGlvbi5cbiAqXG4gKiAgMy4gTmVpdGhlciB0aGUgbmFtZSBvZiB0aGUgY29weXJpZ2h0IGhvbGRlcihzKSBub3IgdGhlIG5hbWVzIG9mIGFueVxuICogIGNvbnRyaWJ1dG9ycyBtYXkgYmUgdXNlZCB0byBlbmRvcnNlIG9yIHByb21vdGUgcHJvZHVjdHMgZGVyaXZlZCBmcm9tXG4gKiAgdGhpcyBzb2Z0d2FyZSB3aXRob3V0IHNwZWNpZmljIHByaW9yIHdyaXR0ZW4gcGVybWlzc2lvbi5cbiAqXG4gKiAgVEhJUyBTT0ZUV0FSRSBJUyBQUk9WSURFRCBCWSBUSEUgQ09QWVJJR0hUIEhPTERFUlMgQU5EIENPTlRSSUJVVE9SUyBcIkFTIElTXCJcbiAqICBBTkQgQU5ZIEVYUFJFU1MgT1IgSU1QTElFRCBXQVJSQU5USUVTLCBJTkNMVURJTkcsIEJVVCBOT1QgTElNSVRFRCBUTywgVEhFXG4gKiAgSU1QTElFRCBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSBBTkQgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0VcbiAqICBBUkUgRElTQ0xBSU1FRC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFIENPUFlSSUdIVCBPV05FUiBPUiBDT05UUklCVVRPUlMgQkVcbiAqICBMSUFCTEUgRk9SIEFOWSBESVJFQ1QsIElORElSRUNULCBJTkNJREVOVEFMLCBTUEVDSUFMLCBFWEVNUExBUlksIE9SXG4gKiAgQ09OU0VRVUVOVElBTCBEQU1BR0VTIChJTkNMVURJTkcsIEJVVCBOT1QgTElNSVRFRCBUTywgUFJPQ1VSRU1FTlQgT0ZcbiAqICBTVUJTVElUVVRFIEdPT0RTIE9SIFNFUlZJQ0VTOyBMT1NTIE9GIFVTRSwgREFUQSwgT1IgUFJPRklUUzsgT1IgQlVTSU5FU1NcbiAqICBJTlRFUlJVUFRJT04pIEhPV0VWRVIgQ0FVU0VEIEFORCBPTiBBTlkgVEhFT1JZIE9GIExJQUJJTElUWSwgV0hFVEhFUiBJTlxuICogIENPTlRSQUNULCBTVFJJQ1QgTElBQklMSVRZLCBPUiBUT1JUIChJTkNMVURJTkcgTkVHTElHRU5DRSBPUiBPVEhFUldJU0UpXG4gKiAgQVJJU0lORyBJTiBBTlkgV0FZIE9VVCBPRiBUSEUgVVNFIE9GIFRISVMgU09GVFdBUkUsIEVWRU4gSUYgQURWSVNFRCBPRiBUSEVcbiAqICBQT1NTSUJJTElUWSBPRiBTVUNIIERBTUFHRS5cbiAqL1xuOyhmdW5jdGlvbiAoKSB7XG4gIC8vIHBvcnQgb2Ygd2Via2l0IGN1YmljIGJlemllciBoYW5kbGluZyBieSBodHRwOi8vd3d3Lm5ldHpnZXN0YS5kZS9kZXYvXG4gIGZ1bmN0aW9uIGN1YmljQmV6aWVyQXRUaW1lKHQscDF4LHAxeSxwMngscDJ5LGR1cmF0aW9uKSB7XG4gICAgdmFyIGF4ID0gMCxieCA9IDAsY3ggPSAwLGF5ID0gMCxieSA9IDAsY3kgPSAwO1xuICAgIGZ1bmN0aW9uIHNhbXBsZUN1cnZlWCh0KSB7XG4gICAgICByZXR1cm4gKChheCAqIHQgKyBieCkgKiB0ICsgY3gpICogdDtcbiAgICB9XG4gICAgZnVuY3Rpb24gc2FtcGxlQ3VydmVZKHQpIHtcbiAgICAgIHJldHVybiAoKGF5ICogdCArIGJ5KSAqIHQgKyBjeSkgKiB0O1xuICAgIH1cbiAgICBmdW5jdGlvbiBzYW1wbGVDdXJ2ZURlcml2YXRpdmVYKHQpIHtcbiAgICAgIHJldHVybiAoMy4wICogYXggKiB0ICsgMi4wICogYngpICogdCArIGN4O1xuICAgIH1cbiAgICBmdW5jdGlvbiBzb2x2ZUVwc2lsb24oZHVyYXRpb24pIHtcbiAgICAgIHJldHVybiAxLjAgLyAoMjAwLjAgKiBkdXJhdGlvbik7XG4gICAgfVxuICAgIGZ1bmN0aW9uIHNvbHZlKHgsZXBzaWxvbikge1xuICAgICAgcmV0dXJuIHNhbXBsZUN1cnZlWShzb2x2ZUN1cnZlWCh4LCBlcHNpbG9uKSk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGZhYnMobikge1xuICAgICAgaWYgKG4gPj0gMCkge1xuICAgICAgICByZXR1cm4gbjtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiAwIC0gbjtcbiAgICAgIH1cbiAgICB9XG4gICAgZnVuY3Rpb24gc29sdmVDdXJ2ZVgoeCwgZXBzaWxvbikge1xuICAgICAgdmFyIHQwLHQxLHQyLHgyLGQyLGk7XG4gICAgICBmb3IgKHQyID0geCwgaSA9IDA7IGkgPCA4OyBpKyspIHtcbiAgICAgICAgeDIgPSBzYW1wbGVDdXJ2ZVgodDIpIC0geDtcbiAgICAgICAgaWYgKGZhYnMoeDIpIDwgZXBzaWxvbikge1xuICAgICAgICAgIHJldHVybiB0MjtcbiAgICAgICAgfVxuICAgICAgICBkMiA9IHNhbXBsZUN1cnZlRGVyaXZhdGl2ZVgodDIpO1xuICAgICAgICBpZiAoZmFicyhkMikgPCAxZS02KSB7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgdDIgPSB0MiAtIHgyIC8gZDI7XG4gICAgICB9XG4gICAgICB0MCA9IDAuMDtcbiAgICAgIHQxID0gMS4wO1xuICAgICAgdDIgPSB4O1xuICAgICAgaWYgKHQyIDwgdDApIHtcbiAgICAgICAgcmV0dXJuIHQwO1xuICAgICAgfVxuICAgICAgaWYgKHQyID4gdDEpIHtcbiAgICAgICAgcmV0dXJuIHQxO1xuICAgICAgfVxuICAgICAgd2hpbGUgKHQwIDwgdDEpIHtcbiAgICAgICAgeDIgPSBzYW1wbGVDdXJ2ZVgodDIpO1xuICAgICAgICBpZiAoZmFicyh4MiAtIHgpIDwgZXBzaWxvbikge1xuICAgICAgICAgIHJldHVybiB0MjtcbiAgICAgICAgfVxuICAgICAgICBpZiAoeCA+IHgyKSB7XG4gICAgICAgICAgdDAgPSB0MjtcbiAgICAgICAgfWVsc2Uge1xuICAgICAgICAgIHQxID0gdDI7XG4gICAgICAgIH1cbiAgICAgICAgdDIgPSAodDEgLSB0MCkgKiAwLjUgKyB0MDtcbiAgICAgIH1cbiAgICAgIHJldHVybiB0MjsgLy8gRmFpbHVyZS5cbiAgICB9XG4gICAgY3ggPSAzLjAgKiBwMXg7XG4gICAgYnggPSAzLjAgKiAocDJ4IC0gcDF4KSAtIGN4O1xuICAgIGF4ID0gMS4wIC0gY3ggLSBieDtcbiAgICBjeSA9IDMuMCAqIHAxeTtcbiAgICBieSA9IDMuMCAqIChwMnkgLSBwMXkpIC0gY3k7XG4gICAgYXkgPSAxLjAgLSBjeSAtIGJ5O1xuICAgIHJldHVybiBzb2x2ZSh0LCBzb2x2ZUVwc2lsb24oZHVyYXRpb24pKTtcbiAgfVxuICAvKipcbiAgICogIGdldEN1YmljQmV6aWVyVHJhbnNpdGlvbih4MSwgeTEsIHgyLCB5MikgLT4gRnVuY3Rpb25cbiAgICpcbiAgICogIEdlbmVyYXRlcyBhIHRyYW5zaXRpb24gZWFzaW5nIGZ1bmN0aW9uIHRoYXQgaXMgY29tcGF0aWJsZVxuICAgKiAgd2l0aCBXZWJLaXQncyBDU1MgdHJhbnNpdGlvbnMgYC13ZWJraXQtdHJhbnNpdGlvbi10aW1pbmctZnVuY3Rpb25gXG4gICAqICBDU1MgcHJvcGVydHkuXG4gICAqXG4gICAqICBUaGUgVzNDIGhhcyBtb3JlIGluZm9ybWF0aW9uIGFib3V0IENTUzMgdHJhbnNpdGlvbiB0aW1pbmcgZnVuY3Rpb25zOlxuICAgKiAgaHR0cDovL3d3dy53My5vcmcvVFIvY3NzMy10cmFuc2l0aW9ucy8jdHJhbnNpdGlvbi10aW1pbmctZnVuY3Rpb25fdGFnXG4gICAqXG4gICAqICBAcGFyYW0ge251bWJlcn0geDFcbiAgICogIEBwYXJhbSB7bnVtYmVyfSB5MVxuICAgKiAgQHBhcmFtIHtudW1iZXJ9IHgyXG4gICAqICBAcGFyYW0ge251bWJlcn0geTJcbiAgICogIEByZXR1cm4ge2Z1bmN0aW9ufVxuICAgKiAgQHByaXZhdGVcbiAgICovXG4gIGZ1bmN0aW9uIGdldEN1YmljQmV6aWVyVHJhbnNpdGlvbiAoeDEsIHkxLCB4MiwgeTIpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24gKHBvcykge1xuICAgICAgcmV0dXJuIGN1YmljQmV6aWVyQXRUaW1lKHBvcyx4MSx5MSx4Mix5MiwxKTtcbiAgICB9O1xuICB9XG4gIC8vIEVuZCBwb3J0ZWQgY29kZVxuXG4gIC8qKlxuICAgKiBDcmVhdGUgYSBCZXppZXIgZWFzaW5nIGZ1bmN0aW9uIGFuZCBhdHRhY2ggaXQgdG8gYHt7I2Nyb3NzTGlua1xuICAgKiBcIlR3ZWVuYWJsZS9mb3JtdWxhOnByb3BlcnR5XCJ9fVR3ZWVuYWJsZSNmb3JtdWxhe3svY3Jvc3NMaW5rfX1gLiAgVGhpc1xuICAgKiBmdW5jdGlvbiBnaXZlcyB5b3UgdG90YWwgY29udHJvbCBvdmVyIHRoZSBlYXNpbmcgY3VydmUuICBNYXR0aGV3IExlaW4nc1xuICAgKiBbQ2Vhc2VyXShodHRwOi8vbWF0dGhld2xlaW4uY29tL2NlYXNlci8pIGlzIGEgdXNlZnVsIHRvb2wgZm9yIHZpc3VhbGl6aW5nXG4gICAqIHRoZSBjdXJ2ZXMgeW91IGNhbiBtYWtlIHdpdGggdGhpcyBmdW5jdGlvbi5cbiAgICogQG1ldGhvZCBzZXRCZXppZXJGdW5jdGlvblxuICAgKiBAcGFyYW0ge3N0cmluZ30gbmFtZSBUaGUgbmFtZSBvZiB0aGUgZWFzaW5nIGN1cnZlLiAgT3ZlcndyaXRlcyB0aGUgb2xkXG4gICAqIGVhc2luZyBmdW5jdGlvbiBvbiBge3sjY3Jvc3NMaW5rXG4gICAqIFwiVHdlZW5hYmxlL2Zvcm11bGE6cHJvcGVydHlcIn19VHdlZW5hYmxlI2Zvcm11bGF7ey9jcm9zc0xpbmt9fWAgaWYgaXRcbiAgICogZXhpc3RzLlxuICAgKiBAcGFyYW0ge251bWJlcn0geDFcbiAgICogQHBhcmFtIHtudW1iZXJ9IHkxXG4gICAqIEBwYXJhbSB7bnVtYmVyfSB4MlxuICAgKiBAcGFyYW0ge251bWJlcn0geTJcbiAgICogQHJldHVybiB7ZnVuY3Rpb259IFRoZSBlYXNpbmcgZnVuY3Rpb24gdGhhdCB3YXMgYXR0YWNoZWQgdG9cbiAgICogVHdlZW5hYmxlLnByb3RvdHlwZS5mb3JtdWxhLlxuICAgKi9cbiAgVHdlZW5hYmxlLnNldEJlemllckZ1bmN0aW9uID0gZnVuY3Rpb24gKG5hbWUsIHgxLCB5MSwgeDIsIHkyKSB7XG4gICAgdmFyIGN1YmljQmV6aWVyVHJhbnNpdGlvbiA9IGdldEN1YmljQmV6aWVyVHJhbnNpdGlvbih4MSwgeTEsIHgyLCB5Mik7XG4gICAgY3ViaWNCZXppZXJUcmFuc2l0aW9uLmRpc3BsYXlOYW1lID0gbmFtZTtcbiAgICBjdWJpY0JlemllclRyYW5zaXRpb24ueDEgPSB4MTtcbiAgICBjdWJpY0JlemllclRyYW5zaXRpb24ueTEgPSB5MTtcbiAgICBjdWJpY0JlemllclRyYW5zaXRpb24ueDIgPSB4MjtcbiAgICBjdWJpY0JlemllclRyYW5zaXRpb24ueTIgPSB5MjtcblxuICAgIHJldHVybiBUd2VlbmFibGUucHJvdG90eXBlLmZvcm11bGFbbmFtZV0gPSBjdWJpY0JlemllclRyYW5zaXRpb247XG4gIH07XG5cblxuICAvKipcbiAgICogYGRlbGV0ZWAgYW4gZWFzaW5nIGZ1bmN0aW9uIGZyb20gYHt7I2Nyb3NzTGlua1xuICAgKiBcIlR3ZWVuYWJsZS9mb3JtdWxhOnByb3BlcnR5XCJ9fVR3ZWVuYWJsZSNmb3JtdWxhe3svY3Jvc3NMaW5rfX1gLiAgQmVcbiAgICogY2FyZWZ1bCB3aXRoIHRoaXMgbWV0aG9kLCBhcyBpdCBgZGVsZXRlYHMgd2hhdGV2ZXIgZWFzaW5nIGZvcm11bGEgbWF0Y2hlc1xuICAgKiBgbmFtZWAgKHdoaWNoIG1lYW5zIHlvdSBjYW4gZGVsZXRlIHN0YW5kYXJkIFNoaWZ0eSBlYXNpbmcgZnVuY3Rpb25zKS5cbiAgICogQG1ldGhvZCB1bnNldEJlemllckZ1bmN0aW9uXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lIFRoZSBuYW1lIG9mIHRoZSBlYXNpbmcgZnVuY3Rpb24gdG8gZGVsZXRlLlxuICAgKiBAcmV0dXJuIHtmdW5jdGlvbn1cbiAgICovXG4gIFR3ZWVuYWJsZS51bnNldEJlemllckZ1bmN0aW9uID0gZnVuY3Rpb24gKG5hbWUpIHtcbiAgICBkZWxldGUgVHdlZW5hYmxlLnByb3RvdHlwZS5mb3JtdWxhW25hbWVdO1xuICB9O1xuXG59KSgpO1xuXG47KGZ1bmN0aW9uICgpIHtcblxuICBmdW5jdGlvbiBnZXRJbnRlcnBvbGF0ZWRWYWx1ZXMgKFxuICAgIGZyb20sIGN1cnJlbnQsIHRhcmdldFN0YXRlLCBwb3NpdGlvbiwgZWFzaW5nLCBkZWxheSkge1xuICAgIHJldHVybiBUd2VlbmFibGUudHdlZW5Qcm9wcyhcbiAgICAgIHBvc2l0aW9uLCBjdXJyZW50LCBmcm9tLCB0YXJnZXRTdGF0ZSwgMSwgZGVsYXksIGVhc2luZyk7XG4gIH1cblxuICAvLyBGYWtlIGEgVHdlZW5hYmxlIGFuZCBwYXRjaCBzb21lIGludGVybmFscy4gIFRoaXMgYXBwcm9hY2ggYWxsb3dzIHVzIHRvXG4gIC8vIHNraXAgdW5lY2Nlc3NhcnkgcHJvY2Vzc2luZyBhbmQgb2JqZWN0IHJlY3JlYXRpb24sIGN1dHRpbmcgZG93biBvbiBnYXJiYWdlXG4gIC8vIGNvbGxlY3Rpb24gcGF1c2VzLlxuICB2YXIgbW9ja1R3ZWVuYWJsZSA9IG5ldyBUd2VlbmFibGUoKTtcbiAgbW9ja1R3ZWVuYWJsZS5fZmlsdGVyQXJncyA9IFtdO1xuXG4gIC8qKlxuICAgKiBDb21wdXRlIHRoZSBtaWRwb2ludCBvZiB0d28gT2JqZWN0cy4gIFRoaXMgbWV0aG9kIGVmZmVjdGl2ZWx5IGNhbGN1bGF0ZXMgYVxuICAgKiBzcGVjaWZpYyBmcmFtZSBvZiBhbmltYXRpb24gdGhhdCBge3sjY3Jvc3NMaW5rXG4gICAqIFwiVHdlZW5hYmxlL3R3ZWVuOm1ldGhvZFwifX17ey9jcm9zc0xpbmt9fWAgZG9lcyBtYW55IHRpbWVzIG92ZXIgdGhlIGNvdXJzZVxuICAgKiBvZiBhIGZ1bGwgdHdlZW4uXG4gICAqXG4gICAqICAgICB2YXIgaW50ZXJwb2xhdGVkVmFsdWVzID0gVHdlZW5hYmxlLmludGVycG9sYXRlKHtcbiAgICogICAgICAgd2lkdGg6ICcxMDBweCcsXG4gICAqICAgICAgIG9wYWNpdHk6IDAsXG4gICAqICAgICAgIGNvbG9yOiAnI2ZmZidcbiAgICogICAgIH0sIHtcbiAgICogICAgICAgd2lkdGg6ICcyMDBweCcsXG4gICAqICAgICAgIG9wYWNpdHk6IDEsXG4gICAqICAgICAgIGNvbG9yOiAnIzAwMCdcbiAgICogICAgIH0sIDAuNSk7XG4gICAqXG4gICAqICAgICBjb25zb2xlLmxvZyhpbnRlcnBvbGF0ZWRWYWx1ZXMpO1xuICAgKiAgICAgLy8ge29wYWNpdHk6IDAuNSwgd2lkdGg6IFwiMTUwcHhcIiwgY29sb3I6IFwicmdiKDEyNywxMjcsMTI3KVwifVxuICAgKlxuICAgKiBAc3RhdGljXG4gICAqIEBtZXRob2QgaW50ZXJwb2xhdGVcbiAgICogQHBhcmFtIHtPYmplY3R9IGZyb20gVGhlIHN0YXJ0aW5nIHZhbHVlcyB0byB0d2VlbiBmcm9tLlxuICAgKiBAcGFyYW0ge09iamVjdH0gdGFyZ2V0U3RhdGUgVGhlIGVuZGluZyB2YWx1ZXMgdG8gdHdlZW4gdG8uXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBwb3NpdGlvbiBUaGUgbm9ybWFsaXplZCBwb3NpdGlvbiB2YWx1ZSAoYmV0d2VlbiBgMC4wYCBhbmRcbiAgICogYDEuMGApIHRvIGludGVycG9sYXRlIHRoZSB2YWx1ZXMgYmV0d2VlbiBgZnJvbWAgYW5kIGB0b2AgZm9yLiAgYGZyb21gXG4gICAqIHJlcHJlc2VudHMgYDBgIGFuZCBgdG9gIHJlcHJlc2VudHMgYDFgLlxuICAgKiBAcGFyYW0ge09iamVjdC48c3RyaW5nfEZ1bmN0aW9uPnxzdHJpbmd8RnVuY3Rpb259IGVhc2luZyBUaGUgZWFzaW5nXG4gICAqIGN1cnZlKHMpIHRvIGNhbGN1bGF0ZSB0aGUgbWlkcG9pbnQgYWdhaW5zdC4gIFlvdSBjYW4gcmVmZXJlbmNlIGFueSBlYXNpbmdcbiAgICogZnVuY3Rpb24gYXR0YWNoZWQgdG8gYFR3ZWVuYWJsZS5wcm90b3R5cGUuZm9ybXVsYWAsIG9yIHByb3ZpZGUgdGhlIGVhc2luZ1xuICAgKiBmdW5jdGlvbihzKSBkaXJlY3RseS4gIElmIG9taXR0ZWQsIHRoaXMgZGVmYXVsdHMgdG8gXCJsaW5lYXJcIi5cbiAgICogQHBhcmFtIHtudW1iZXI9fSBvcHRfZGVsYXkgT3B0aW9uYWwgZGVsYXkgdG8gcGFkIHRoZSBiZWdpbm5pbmcgb2YgdGhlXG4gICAqIGludGVycG9sYXRlZCB0d2VlbiB3aXRoLiAgVGhpcyBpbmNyZWFzZXMgdGhlIHJhbmdlIG9mIGBwb3NpdGlvbmAgZnJvbSAoYDBgXG4gICAqIHRocm91Z2ggYDFgKSB0byAoYDBgIHRocm91Z2ggYDEgKyBvcHRfZGVsYXlgKS4gIFNvLCBhIGRlbGF5IG9mIGAwLjVgIHdvdWxkXG4gICAqIGluY3JlYXNlIGFsbCB2YWxpZCB2YWx1ZXMgb2YgYHBvc2l0aW9uYCB0byBudW1iZXJzIGJldHdlZW4gYDBgIGFuZCBgMS41YC5cbiAgICogQHJldHVybiB7T2JqZWN0fVxuICAgKi9cbiAgVHdlZW5hYmxlLmludGVycG9sYXRlID0gZnVuY3Rpb24gKFxuICAgIGZyb20sIHRhcmdldFN0YXRlLCBwb3NpdGlvbiwgZWFzaW5nLCBvcHRfZGVsYXkpIHtcblxuICAgIHZhciBjdXJyZW50ID0gVHdlZW5hYmxlLnNoYWxsb3dDb3B5KHt9LCBmcm9tKTtcbiAgICB2YXIgZGVsYXkgPSBvcHRfZGVsYXkgfHwgMDtcbiAgICB2YXIgZWFzaW5nT2JqZWN0ID0gVHdlZW5hYmxlLmNvbXBvc2VFYXNpbmdPYmplY3QoXG4gICAgICBmcm9tLCBlYXNpbmcgfHwgJ2xpbmVhcicpO1xuXG4gICAgbW9ja1R3ZWVuYWJsZS5zZXQoe30pO1xuXG4gICAgLy8gQWxpYXMgYW5kIHJldXNlIHRoZSBfZmlsdGVyQXJncyBhcnJheSBpbnN0ZWFkIG9mIHJlY3JlYXRpbmcgaXQuXG4gICAgdmFyIGZpbHRlckFyZ3MgPSBtb2NrVHdlZW5hYmxlLl9maWx0ZXJBcmdzO1xuICAgIGZpbHRlckFyZ3MubGVuZ3RoID0gMDtcbiAgICBmaWx0ZXJBcmdzWzBdID0gY3VycmVudDtcbiAgICBmaWx0ZXJBcmdzWzFdID0gZnJvbTtcbiAgICBmaWx0ZXJBcmdzWzJdID0gdGFyZ2V0U3RhdGU7XG4gICAgZmlsdGVyQXJnc1szXSA9IGVhc2luZ09iamVjdDtcblxuICAgIC8vIEFueSBkZWZpbmVkIHZhbHVlIHRyYW5zZm9ybWF0aW9uIG11c3QgYmUgYXBwbGllZFxuICAgIFR3ZWVuYWJsZS5hcHBseUZpbHRlcihtb2NrVHdlZW5hYmxlLCAndHdlZW5DcmVhdGVkJyk7XG4gICAgVHdlZW5hYmxlLmFwcGx5RmlsdGVyKG1vY2tUd2VlbmFibGUsICdiZWZvcmVUd2VlbicpO1xuXG4gICAgdmFyIGludGVycG9sYXRlZFZhbHVlcyA9IGdldEludGVycG9sYXRlZFZhbHVlcyhcbiAgICAgIGZyb20sIGN1cnJlbnQsIHRhcmdldFN0YXRlLCBwb3NpdGlvbiwgZWFzaW5nT2JqZWN0LCBkZWxheSk7XG5cbiAgICAvLyBUcmFuc2Zvcm0gdmFsdWVzIGJhY2sgaW50byB0aGVpciBvcmlnaW5hbCBmb3JtYXRcbiAgICBUd2VlbmFibGUuYXBwbHlGaWx0ZXIobW9ja1R3ZWVuYWJsZSwgJ2FmdGVyVHdlZW4nKTtcblxuICAgIHJldHVybiBpbnRlcnBvbGF0ZWRWYWx1ZXM7XG4gIH07XG5cbn0oKSk7XG5cbi8qKlxuICogVGhpcyBtb2R1bGUgYWRkcyBzdHJpbmcgaW50ZXJwb2xhdGlvbiBzdXBwb3J0IHRvIFNoaWZ0eS5cbiAqXG4gKiBUaGUgVG9rZW4gZXh0ZW5zaW9uIGFsbG93cyBTaGlmdHkgdG8gdHdlZW4gbnVtYmVycyBpbnNpZGUgb2Ygc3RyaW5ncy4gIEFtb25nXG4gKiBvdGhlciB0aGluZ3MsIHRoaXMgYWxsb3dzIHlvdSB0byBhbmltYXRlIENTUyBwcm9wZXJ0aWVzLiAgRm9yIGV4YW1wbGUsIHlvdVxuICogY2FuIGRvIHRoaXM6XG4gKlxuICogICAgIHZhciB0d2VlbmFibGUgPSBuZXcgVHdlZW5hYmxlKCk7XG4gKiAgICAgdHdlZW5hYmxlLnR3ZWVuKHtcbiAqICAgICAgIGZyb206IHsgdHJhbnNmb3JtOiAndHJhbnNsYXRlWCg0NXB4KScgfSxcbiAqICAgICAgIHRvOiB7IHRyYW5zZm9ybTogJ3RyYW5zbGF0ZVgoOTB4cCknIH1cbiAqICAgICB9KTtcbiAqXG4gKiBgdHJhbnNsYXRlWCg0NSlgIHdpbGwgYmUgdHdlZW5lZCB0byBgdHJhbnNsYXRlWCg5MClgLiAgVG8gZGVtb25zdHJhdGU6XG4gKlxuICogICAgIHZhciB0d2VlbmFibGUgPSBuZXcgVHdlZW5hYmxlKCk7XG4gKiAgICAgdHdlZW5hYmxlLnR3ZWVuKHtcbiAqICAgICAgIGZyb206IHsgdHJhbnNmb3JtOiAndHJhbnNsYXRlWCg0NXB4KScgfSxcbiAqICAgICAgIHRvOiB7IHRyYW5zZm9ybTogJ3RyYW5zbGF0ZVgoOTBweCknIH0sXG4gKiAgICAgICBzdGVwOiBmdW5jdGlvbiAoc3RhdGUpIHtcbiAqICAgICAgICAgY29uc29sZS5sb2coc3RhdGUudHJhbnNmb3JtKTtcbiAqICAgICAgIH1cbiAqICAgICB9KTtcbiAqXG4gKiBUaGUgYWJvdmUgc25pcHBldCB3aWxsIGxvZyBzb21ldGhpbmcgbGlrZSB0aGlzIGluIHRoZSBjb25zb2xlOlxuICpcbiAqICAgICB0cmFuc2xhdGVYKDYwLjNweClcbiAqICAgICAuLi5cbiAqICAgICB0cmFuc2xhdGVYKDc2LjA1cHgpXG4gKiAgICAgLi4uXG4gKiAgICAgdHJhbnNsYXRlWCg5MHB4KVxuICpcbiAqIEFub3RoZXIgdXNlIGZvciB0aGlzIGlzIGFuaW1hdGluZyBjb2xvcnM6XG4gKlxuICogICAgIHZhciB0d2VlbmFibGUgPSBuZXcgVHdlZW5hYmxlKCk7XG4gKiAgICAgdHdlZW5hYmxlLnR3ZWVuKHtcbiAqICAgICAgIGZyb206IHsgY29sb3I6ICdyZ2IoMCwyNTUsMCknIH0sXG4gKiAgICAgICB0bzogeyBjb2xvcjogJ3JnYigyNTUsMCwyNTUpJyB9LFxuICogICAgICAgc3RlcDogZnVuY3Rpb24gKHN0YXRlKSB7XG4gKiAgICAgICAgIGNvbnNvbGUubG9nKHN0YXRlLmNvbG9yKTtcbiAqICAgICAgIH1cbiAqICAgICB9KTtcbiAqXG4gKiBUaGUgYWJvdmUgc25pcHBldCB3aWxsIGxvZyBzb21ldGhpbmcgbGlrZSB0aGlzOlxuICpcbiAqICAgICByZ2IoODQsMTcwLDg0KVxuICogICAgIC4uLlxuICogICAgIHJnYigxNzAsODQsMTcwKVxuICogICAgIC4uLlxuICogICAgIHJnYigyNTUsMCwyNTUpXG4gKlxuICogVGhpcyBleHRlbnNpb24gYWxzbyBzdXBwb3J0cyBoZXhhZGVjaW1hbCBjb2xvcnMsIGluIGJvdGggbG9uZyAoYCNmZjAwZmZgKVxuICogYW5kIHNob3J0IChgI2YwZmApIGZvcm1zLiAgQmUgYXdhcmUgdGhhdCBoZXhhZGVjaW1hbCBpbnB1dCB2YWx1ZXMgd2lsbCBiZVxuICogY29udmVydGVkIGludG8gdGhlIGVxdWl2YWxlbnQgUkdCIG91dHB1dCB2YWx1ZXMuICBUaGlzIGlzIGRvbmUgdG8gb3B0aW1pemVcbiAqIGZvciBwZXJmb3JtYW5jZS5cbiAqXG4gKiAgICAgdmFyIHR3ZWVuYWJsZSA9IG5ldyBUd2VlbmFibGUoKTtcbiAqICAgICB0d2VlbmFibGUudHdlZW4oe1xuICogICAgICAgZnJvbTogeyBjb2xvcjogJyMwZjAnIH0sXG4gKiAgICAgICB0bzogeyBjb2xvcjogJyNmMGYnIH0sXG4gKiAgICAgICBzdGVwOiBmdW5jdGlvbiAoc3RhdGUpIHtcbiAqICAgICAgICAgY29uc29sZS5sb2coc3RhdGUuY29sb3IpO1xuICogICAgICAgfVxuICogICAgIH0pO1xuICpcbiAqIFRoaXMgc25pcHBldCB3aWxsIGdlbmVyYXRlIHRoZSBzYW1lIG91dHB1dCBhcyB0aGUgb25lIGJlZm9yZSBpdCBiZWNhdXNlXG4gKiBlcXVpdmFsZW50IHZhbHVlcyB3ZXJlIHN1cHBsaWVkIChqdXN0IGluIGhleGFkZWNpbWFsIGZvcm0gcmF0aGVyIHRoYW4gUkdCKTpcbiAqXG4gKiAgICAgcmdiKDg0LDE3MCw4NClcbiAqICAgICAuLi5cbiAqICAgICByZ2IoMTcwLDg0LDE3MClcbiAqICAgICAuLi5cbiAqICAgICByZ2IoMjU1LDAsMjU1KVxuICpcbiAqICMjIEVhc2luZyBzdXBwb3J0XG4gKlxuICogRWFzaW5nIHdvcmtzIHNvbWV3aGF0IGRpZmZlcmVudGx5IGluIHRoZSBUb2tlbiBleHRlbnNpb24uICBUaGlzIGlzIGJlY2F1c2VcbiAqIHNvbWUgQ1NTIHByb3BlcnRpZXMgaGF2ZSBtdWx0aXBsZSB2YWx1ZXMgaW4gdGhlbSwgYW5kIHlvdSBtaWdodCBuZWVkIHRvXG4gKiB0d2VlbiBlYWNoIHZhbHVlIGFsb25nIGl0cyBvd24gZWFzaW5nIGN1cnZlLiAgQSBiYXNpYyBleGFtcGxlOlxuICpcbiAqICAgICB2YXIgdHdlZW5hYmxlID0gbmV3IFR3ZWVuYWJsZSgpO1xuICogICAgIHR3ZWVuYWJsZS50d2Vlbih7XG4gKiAgICAgICBmcm9tOiB7IHRyYW5zZm9ybTogJ3RyYW5zbGF0ZVgoMHB4KSB0cmFuc2xhdGVZKDBweCknIH0sXG4gKiAgICAgICB0bzogeyB0cmFuc2Zvcm06ICAgJ3RyYW5zbGF0ZVgoMTAwcHgpIHRyYW5zbGF0ZVkoMTAwcHgpJyB9LFxuICogICAgICAgZWFzaW5nOiB7IHRyYW5zZm9ybTogJ2Vhc2VJblF1YWQnIH0sXG4gKiAgICAgICBzdGVwOiBmdW5jdGlvbiAoc3RhdGUpIHtcbiAqICAgICAgICAgY29uc29sZS5sb2coc3RhdGUudHJhbnNmb3JtKTtcbiAqICAgICAgIH1cbiAqICAgICB9KTtcbiAqXG4gKiBUaGUgYWJvdmUgc25pcHBldCB3aWxsIGNyZWF0ZSB2YWx1ZXMgbGlrZSB0aGlzOlxuICpcbiAqICAgICB0cmFuc2xhdGVYKDExLjU2cHgpIHRyYW5zbGF0ZVkoMTEuNTZweClcbiAqICAgICAuLi5cbiAqICAgICB0cmFuc2xhdGVYKDQ2LjI0cHgpIHRyYW5zbGF0ZVkoNDYuMjRweClcbiAqICAgICAuLi5cbiAqICAgICB0cmFuc2xhdGVYKDEwMHB4KSB0cmFuc2xhdGVZKDEwMHB4KVxuICpcbiAqIEluIHRoaXMgY2FzZSwgdGhlIHZhbHVlcyBmb3IgYHRyYW5zbGF0ZVhgIGFuZCBgdHJhbnNsYXRlWWAgYXJlIGFsd2F5cyB0aGVcbiAqIHNhbWUgZm9yIGVhY2ggc3RlcCBvZiB0aGUgdHdlZW4sIGJlY2F1c2UgdGhleSBoYXZlIHRoZSBzYW1lIHN0YXJ0IGFuZCBlbmRcbiAqIHBvaW50cyBhbmQgYm90aCB1c2UgdGhlIHNhbWUgZWFzaW5nIGN1cnZlLiAgV2UgY2FuIGFsc28gdHdlZW4gYHRyYW5zbGF0ZVhgXG4gKiBhbmQgYHRyYW5zbGF0ZVlgIGFsb25nIGluZGVwZW5kZW50IGN1cnZlczpcbiAqXG4gKiAgICAgdmFyIHR3ZWVuYWJsZSA9IG5ldyBUd2VlbmFibGUoKTtcbiAqICAgICB0d2VlbmFibGUudHdlZW4oe1xuICogICAgICAgZnJvbTogeyB0cmFuc2Zvcm06ICd0cmFuc2xhdGVYKDBweCkgdHJhbnNsYXRlWSgwcHgpJyB9LFxuICogICAgICAgdG86IHsgdHJhbnNmb3JtOiAgICd0cmFuc2xhdGVYKDEwMHB4KSB0cmFuc2xhdGVZKDEwMHB4KScgfSxcbiAqICAgICAgIGVhc2luZzogeyB0cmFuc2Zvcm06ICdlYXNlSW5RdWFkIGJvdW5jZScgfSxcbiAqICAgICAgIHN0ZXA6IGZ1bmN0aW9uIChzdGF0ZSkge1xuICogICAgICAgICBjb25zb2xlLmxvZyhzdGF0ZS50cmFuc2Zvcm0pO1xuICogICAgICAgfVxuICogICAgIH0pO1xuICpcbiAqIFRoZSBhYm92ZSBzbmlwcGV0IHdpbGwgY3JlYXRlIHZhbHVlcyBsaWtlIHRoaXM6XG4gKlxuICogICAgIHRyYW5zbGF0ZVgoMTAuODlweCkgdHJhbnNsYXRlWSg4Mi4zNXB4KVxuICogICAgIC4uLlxuICogICAgIHRyYW5zbGF0ZVgoNDQuODlweCkgdHJhbnNsYXRlWSg4Ni43M3B4KVxuICogICAgIC4uLlxuICogICAgIHRyYW5zbGF0ZVgoMTAwcHgpIHRyYW5zbGF0ZVkoMTAwcHgpXG4gKlxuICogYHRyYW5zbGF0ZVhgIGFuZCBgdHJhbnNsYXRlWWAgYXJlIG5vdCBpbiBzeW5jIGFueW1vcmUsIGJlY2F1c2UgYGVhc2VJblF1YWRgXG4gKiB3YXMgc3BlY2lmaWVkIGZvciBgdHJhbnNsYXRlWGAgYW5kIGBib3VuY2VgIGZvciBgdHJhbnNsYXRlWWAuICBNaXhpbmcgYW5kXG4gKiBtYXRjaGluZyBlYXNpbmcgY3VydmVzIGNhbiBtYWtlIGZvciBzb21lIGludGVyZXN0aW5nIG1vdGlvbiBpbiB5b3VyXG4gKiBhbmltYXRpb25zLlxuICpcbiAqIFRoZSBvcmRlciBvZiB0aGUgc3BhY2Utc2VwYXJhdGVkIGVhc2luZyBjdXJ2ZXMgY29ycmVzcG9uZCB0aGUgdG9rZW4gdmFsdWVzXG4gKiB0aGV5IGFwcGx5IHRvLiAgSWYgdGhlcmUgYXJlIG1vcmUgdG9rZW4gdmFsdWVzIHRoYW4gZWFzaW5nIGN1cnZlcyBsaXN0ZWQsXG4gKiB0aGUgbGFzdCBlYXNpbmcgY3VydmUgbGlzdGVkIGlzIHVzZWQuXG4gKiBAc3VibW9kdWxlIFR3ZWVuYWJsZS50b2tlblxuICovXG5cbi8vIHRva2VuIGZ1bmN0aW9uIGlzIGRlZmluZWQgYWJvdmUgb25seSBzbyB0aGF0IGRveC1mb3VuZGF0aW9uIHNlZXMgaXQgYXNcbi8vIGRvY3VtZW50YXRpb24gYW5kIHJlbmRlcnMgaXQuICBJdCBpcyBuZXZlciB1c2VkLCBhbmQgaXMgb3B0aW1pemVkIGF3YXkgYXRcbi8vIGJ1aWxkIHRpbWUuXG5cbjsoZnVuY3Rpb24gKFR3ZWVuYWJsZSkge1xuXG4gIC8qKlxuICAgKiBAdHlwZWRlZiB7e1xuICAgKiAgIGZvcm1hdFN0cmluZzogc3RyaW5nXG4gICAqICAgY2h1bmtOYW1lczogQXJyYXkuPHN0cmluZz5cbiAgICogfX1cbiAgICogQHByaXZhdGVcbiAgICovXG4gIHZhciBmb3JtYXRNYW5pZmVzdDtcblxuICAvLyBDT05TVEFOVFNcblxuICB2YXIgUl9OVU1CRVJfQ09NUE9ORU5UID0gLyhcXGR8XFwtfFxcLikvO1xuICB2YXIgUl9GT1JNQVRfQ0hVTktTID0gLyhbXlxcLTAtOVxcLl0rKS9nO1xuICB2YXIgUl9VTkZPUk1BVFRFRF9WQUxVRVMgPSAvWzAtOS5cXC1dKy9nO1xuICB2YXIgUl9SR0IgPSBuZXcgUmVnRXhwKFxuICAgICdyZ2JcXFxcKCcgKyBSX1VORk9STUFUVEVEX1ZBTFVFUy5zb3VyY2UgK1xuICAgICgvLFxccyovLnNvdXJjZSkgKyBSX1VORk9STUFUVEVEX1ZBTFVFUy5zb3VyY2UgK1xuICAgICgvLFxccyovLnNvdXJjZSkgKyBSX1VORk9STUFUVEVEX1ZBTFVFUy5zb3VyY2UgKyAnXFxcXCknLCAnZycpO1xuICB2YXIgUl9SR0JfUFJFRklYID0gL14uKlxcKC87XG4gIHZhciBSX0hFWCA9IC8jKFswLTldfFthLWZdKXszLDZ9L2dpO1xuICB2YXIgVkFMVUVfUExBQ0VIT0xERVIgPSAnVkFMJztcblxuICAvLyBIRUxQRVJTXG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7QXJyYXkubnVtYmVyfSByYXdWYWx1ZXNcbiAgICogQHBhcmFtIHtzdHJpbmd9IHByZWZpeFxuICAgKlxuICAgKiBAcmV0dXJuIHtBcnJheS48c3RyaW5nPn1cbiAgICogQHByaXZhdGVcbiAgICovXG4gIGZ1bmN0aW9uIGdldEZvcm1hdENodW5rc0Zyb20gKHJhd1ZhbHVlcywgcHJlZml4KSB7XG4gICAgdmFyIGFjY3VtdWxhdG9yID0gW107XG5cbiAgICB2YXIgcmF3VmFsdWVzTGVuZ3RoID0gcmF3VmFsdWVzLmxlbmd0aDtcbiAgICB2YXIgaTtcblxuICAgIGZvciAoaSA9IDA7IGkgPCByYXdWYWx1ZXNMZW5ndGg7IGkrKykge1xuICAgICAgYWNjdW11bGF0b3IucHVzaCgnXycgKyBwcmVmaXggKyAnXycgKyBpKTtcbiAgICB9XG5cbiAgICByZXR1cm4gYWNjdW11bGF0b3I7XG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIHtzdHJpbmd9IGZvcm1hdHRlZFN0cmluZ1xuICAgKlxuICAgKiBAcmV0dXJuIHtzdHJpbmd9XG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBmdW5jdGlvbiBnZXRGb3JtYXRTdHJpbmdGcm9tIChmb3JtYXR0ZWRTdHJpbmcpIHtcbiAgICB2YXIgY2h1bmtzID0gZm9ybWF0dGVkU3RyaW5nLm1hdGNoKFJfRk9STUFUX0NIVU5LUyk7XG5cbiAgICBpZiAoIWNodW5rcykge1xuICAgICAgLy8gY2h1bmtzIHdpbGwgYmUgbnVsbCBpZiB0aGVyZSB3ZXJlIG5vIHRva2VucyB0byBwYXJzZSBpblxuICAgICAgLy8gZm9ybWF0dGVkU3RyaW5nIChmb3IgZXhhbXBsZSwgaWYgZm9ybWF0dGVkU3RyaW5nIGlzICcyJykuICBDb2VyY2VcbiAgICAgIC8vIGNodW5rcyB0byBiZSB1c2VmdWwgaGVyZS5cbiAgICAgIGNodW5rcyA9IFsnJywgJyddO1xuXG4gICAgICAvLyBJZiB0aGVyZSBpcyBvbmx5IG9uZSBjaHVuaywgYXNzdW1lIHRoYXQgdGhlIHN0cmluZyBpcyBhIG51bWJlclxuICAgICAgLy8gZm9sbG93ZWQgYnkgYSB0b2tlbi4uLlxuICAgICAgLy8gTk9URTogVGhpcyBtYXkgYmUgYW4gdW53aXNlIGFzc3VtcHRpb24uXG4gICAgfSBlbHNlIGlmIChjaHVua3MubGVuZ3RoID09PSAxIHx8XG4gICAgICAvLyAuLi5vciBpZiB0aGUgc3RyaW5nIHN0YXJ0cyB3aXRoIGEgbnVtYmVyIGNvbXBvbmVudCAoXCIuXCIsIFwiLVwiLCBvciBhXG4gICAgICAvLyBkaWdpdCkuLi5cbiAgICBmb3JtYXR0ZWRTdHJpbmdbMF0ubWF0Y2goUl9OVU1CRVJfQ09NUE9ORU5UKSkge1xuICAgICAgLy8gLi4ucHJlcGVuZCBhbiBlbXB0eSBzdHJpbmcgaGVyZSB0byBtYWtlIHN1cmUgdGhhdCB0aGUgZm9ybWF0dGVkIG51bWJlclxuICAgICAgLy8gaXMgcHJvcGVybHkgcmVwbGFjZWQgYnkgVkFMVUVfUExBQ0VIT0xERVJcbiAgICAgIGNodW5rcy51bnNoaWZ0KCcnKTtcbiAgICB9XG5cbiAgICByZXR1cm4gY2h1bmtzLmpvaW4oVkFMVUVfUExBQ0VIT0xERVIpO1xuICB9XG5cbiAgLyoqXG4gICAqIENvbnZlcnQgYWxsIGhleCBjb2xvciB2YWx1ZXMgd2l0aGluIGEgc3RyaW5nIHRvIGFuIHJnYiBzdHJpbmcuXG4gICAqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBzdGF0ZU9iamVjdFxuICAgKlxuICAgKiBAcmV0dXJuIHtPYmplY3R9IFRoZSBtb2RpZmllZCBvYmpcbiAgICogQHByaXZhdGVcbiAgICovXG4gIGZ1bmN0aW9uIHNhbml0aXplT2JqZWN0Rm9ySGV4UHJvcHMgKHN0YXRlT2JqZWN0KSB7XG4gICAgVHdlZW5hYmxlLmVhY2goc3RhdGVPYmplY3QsIGZ1bmN0aW9uIChwcm9wKSB7XG4gICAgICB2YXIgY3VycmVudFByb3AgPSBzdGF0ZU9iamVjdFtwcm9wXTtcblxuICAgICAgaWYgKHR5cGVvZiBjdXJyZW50UHJvcCA9PT0gJ3N0cmluZycgJiYgY3VycmVudFByb3AubWF0Y2goUl9IRVgpKSB7XG4gICAgICAgIHN0YXRlT2JqZWN0W3Byb3BdID0gc2FuaXRpemVIZXhDaHVua3NUb1JHQihjdXJyZW50UHJvcCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIHtzdHJpbmd9IHN0clxuICAgKlxuICAgKiBAcmV0dXJuIHtzdHJpbmd9XG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBmdW5jdGlvbiAgc2FuaXRpemVIZXhDaHVua3NUb1JHQiAoc3RyKSB7XG4gICAgcmV0dXJuIGZpbHRlclN0cmluZ0NodW5rcyhSX0hFWCwgc3RyLCBjb252ZXJ0SGV4VG9SR0IpO1xuICB9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBoZXhTdHJpbmdcbiAgICpcbiAgICogQHJldHVybiB7c3RyaW5nfVxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgZnVuY3Rpb24gY29udmVydEhleFRvUkdCIChoZXhTdHJpbmcpIHtcbiAgICB2YXIgcmdiQXJyID0gaGV4VG9SR0JBcnJheShoZXhTdHJpbmcpO1xuICAgIHJldHVybiAncmdiKCcgKyByZ2JBcnJbMF0gKyAnLCcgKyByZ2JBcnJbMV0gKyAnLCcgKyByZ2JBcnJbMl0gKyAnKSc7XG4gIH1cblxuICB2YXIgaGV4VG9SR0JBcnJheV9yZXR1cm5BcnJheSA9IFtdO1xuICAvKipcbiAgICogQ29udmVydCBhIGhleGFkZWNpbWFsIHN0cmluZyB0byBhbiBhcnJheSB3aXRoIHRocmVlIGl0ZW1zLCBvbmUgZWFjaCBmb3JcbiAgICogdGhlIHJlZCwgYmx1ZSwgYW5kIGdyZWVuIGRlY2ltYWwgdmFsdWVzLlxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gaGV4IEEgaGV4YWRlY2ltYWwgc3RyaW5nLlxuICAgKlxuICAgKiBAcmV0dXJucyB7QXJyYXkuPG51bWJlcj59IFRoZSBjb252ZXJ0ZWQgQXJyYXkgb2YgUkdCIHZhbHVlcyBpZiBgaGV4YCBpcyBhXG4gICAqIHZhbGlkIHN0cmluZywgb3IgYW4gQXJyYXkgb2YgdGhyZWUgMCdzLlxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgZnVuY3Rpb24gaGV4VG9SR0JBcnJheSAoaGV4KSB7XG5cbiAgICBoZXggPSBoZXgucmVwbGFjZSgvIy8sICcnKTtcblxuICAgIC8vIElmIHRoZSBzdHJpbmcgaXMgYSBzaG9ydGhhbmQgdGhyZWUgZGlnaXQgaGV4IG5vdGF0aW9uLCBub3JtYWxpemUgaXQgdG9cbiAgICAvLyB0aGUgc3RhbmRhcmQgc2l4IGRpZ2l0IG5vdGF0aW9uXG4gICAgaWYgKGhleC5sZW5ndGggPT09IDMpIHtcbiAgICAgIGhleCA9IGhleC5zcGxpdCgnJyk7XG4gICAgICBoZXggPSBoZXhbMF0gKyBoZXhbMF0gKyBoZXhbMV0gKyBoZXhbMV0gKyBoZXhbMl0gKyBoZXhbMl07XG4gICAgfVxuXG4gICAgaGV4VG9SR0JBcnJheV9yZXR1cm5BcnJheVswXSA9IGhleFRvRGVjKGhleC5zdWJzdHIoMCwgMikpO1xuICAgIGhleFRvUkdCQXJyYXlfcmV0dXJuQXJyYXlbMV0gPSBoZXhUb0RlYyhoZXguc3Vic3RyKDIsIDIpKTtcbiAgICBoZXhUb1JHQkFycmF5X3JldHVybkFycmF5WzJdID0gaGV4VG9EZWMoaGV4LnN1YnN0cig0LCAyKSk7XG5cbiAgICByZXR1cm4gaGV4VG9SR0JBcnJheV9yZXR1cm5BcnJheTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDb252ZXJ0IGEgYmFzZS0xNiBudW1iZXIgdG8gYmFzZS0xMC5cbiAgICpcbiAgICogQHBhcmFtIHtOdW1iZXJ8U3RyaW5nfSBoZXggVGhlIHZhbHVlIHRvIGNvbnZlcnRcbiAgICpcbiAgICogQHJldHVybnMge051bWJlcn0gVGhlIGJhc2UtMTAgZXF1aXZhbGVudCBvZiBgaGV4YC5cbiAgICogQHByaXZhdGVcbiAgICovXG4gIGZ1bmN0aW9uIGhleFRvRGVjIChoZXgpIHtcbiAgICByZXR1cm4gcGFyc2VJbnQoaGV4LCAxNik7XG4gIH1cblxuICAvKipcbiAgICogUnVucyBhIGZpbHRlciBvcGVyYXRpb24gb24gYWxsIGNodW5rcyBvZiBhIHN0cmluZyB0aGF0IG1hdGNoIGEgUmVnRXhwXG4gICAqXG4gICAqIEBwYXJhbSB7UmVnRXhwfSBwYXR0ZXJuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSB1bmZpbHRlcmVkU3RyaW5nXG4gICAqIEBwYXJhbSB7ZnVuY3Rpb24oc3RyaW5nKX0gZmlsdGVyXG4gICAqXG4gICAqIEByZXR1cm4ge3N0cmluZ31cbiAgICogQHByaXZhdGVcbiAgICovXG4gIGZ1bmN0aW9uIGZpbHRlclN0cmluZ0NodW5rcyAocGF0dGVybiwgdW5maWx0ZXJlZFN0cmluZywgZmlsdGVyKSB7XG4gICAgdmFyIHBhdHRlbk1hdGNoZXMgPSB1bmZpbHRlcmVkU3RyaW5nLm1hdGNoKHBhdHRlcm4pO1xuICAgIHZhciBmaWx0ZXJlZFN0cmluZyA9IHVuZmlsdGVyZWRTdHJpbmcucmVwbGFjZShwYXR0ZXJuLCBWQUxVRV9QTEFDRUhPTERFUik7XG5cbiAgICBpZiAocGF0dGVuTWF0Y2hlcykge1xuICAgICAgdmFyIHBhdHRlbk1hdGNoZXNMZW5ndGggPSBwYXR0ZW5NYXRjaGVzLmxlbmd0aDtcbiAgICAgIHZhciBjdXJyZW50Q2h1bms7XG5cbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcGF0dGVuTWF0Y2hlc0xlbmd0aDsgaSsrKSB7XG4gICAgICAgIGN1cnJlbnRDaHVuayA9IHBhdHRlbk1hdGNoZXMuc2hpZnQoKTtcbiAgICAgICAgZmlsdGVyZWRTdHJpbmcgPSBmaWx0ZXJlZFN0cmluZy5yZXBsYWNlKFxuICAgICAgICAgIFZBTFVFX1BMQUNFSE9MREVSLCBmaWx0ZXIoY3VycmVudENodW5rKSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGZpbHRlcmVkU3RyaW5nO1xuICB9XG5cbiAgLyoqXG4gICAqIENoZWNrIGZvciBmbG9hdGluZyBwb2ludCB2YWx1ZXMgd2l0aGluIHJnYiBzdHJpbmdzIGFuZCByb3VuZHMgdGhlbS5cbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmd9IGZvcm1hdHRlZFN0cmluZ1xuICAgKlxuICAgKiBAcmV0dXJuIHtzdHJpbmd9XG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBmdW5jdGlvbiBzYW5pdGl6ZVJHQkNodW5rcyAoZm9ybWF0dGVkU3RyaW5nKSB7XG4gICAgcmV0dXJuIGZpbHRlclN0cmluZ0NodW5rcyhSX1JHQiwgZm9ybWF0dGVkU3RyaW5nLCBzYW5pdGl6ZVJHQkNodW5rKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gcmdiQ2h1bmtcbiAgICpcbiAgICogQHJldHVybiB7c3RyaW5nfVxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgZnVuY3Rpb24gc2FuaXRpemVSR0JDaHVuayAocmdiQ2h1bmspIHtcbiAgICB2YXIgbnVtYmVycyA9IHJnYkNodW5rLm1hdGNoKFJfVU5GT1JNQVRURURfVkFMVUVTKTtcbiAgICB2YXIgbnVtYmVyc0xlbmd0aCA9IG51bWJlcnMubGVuZ3RoO1xuICAgIHZhciBzYW5pdGl6ZWRTdHJpbmcgPSByZ2JDaHVuay5tYXRjaChSX1JHQl9QUkVGSVgpWzBdO1xuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBudW1iZXJzTGVuZ3RoOyBpKyspIHtcbiAgICAgIHNhbml0aXplZFN0cmluZyArPSBwYXJzZUludChudW1iZXJzW2ldLCAxMCkgKyAnLCc7XG4gICAgfVxuXG4gICAgc2FuaXRpemVkU3RyaW5nID0gc2FuaXRpemVkU3RyaW5nLnNsaWNlKDAsIC0xKSArICcpJztcblxuICAgIHJldHVybiBzYW5pdGl6ZWRTdHJpbmc7XG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIHtPYmplY3R9IHN0YXRlT2JqZWN0XG4gICAqXG4gICAqIEByZXR1cm4ge09iamVjdH0gQW4gT2JqZWN0IG9mIGZvcm1hdE1hbmlmZXN0cyB0aGF0IGNvcnJlc3BvbmQgdG9cbiAgICogdGhlIHN0cmluZyBwcm9wZXJ0aWVzIG9mIHN0YXRlT2JqZWN0XG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBmdW5jdGlvbiBnZXRGb3JtYXRNYW5pZmVzdHMgKHN0YXRlT2JqZWN0KSB7XG4gICAgdmFyIG1hbmlmZXN0QWNjdW11bGF0b3IgPSB7fTtcblxuICAgIFR3ZWVuYWJsZS5lYWNoKHN0YXRlT2JqZWN0LCBmdW5jdGlvbiAocHJvcCkge1xuICAgICAgdmFyIGN1cnJlbnRQcm9wID0gc3RhdGVPYmplY3RbcHJvcF07XG5cbiAgICAgIGlmICh0eXBlb2YgY3VycmVudFByb3AgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgIHZhciByYXdWYWx1ZXMgPSBnZXRWYWx1ZXNGcm9tKGN1cnJlbnRQcm9wKTtcblxuICAgICAgICBtYW5pZmVzdEFjY3VtdWxhdG9yW3Byb3BdID0ge1xuICAgICAgICAgICdmb3JtYXRTdHJpbmcnOiBnZXRGb3JtYXRTdHJpbmdGcm9tKGN1cnJlbnRQcm9wKVxuICAgICAgICAgICwnY2h1bmtOYW1lcyc6IGdldEZvcm1hdENodW5rc0Zyb20ocmF3VmFsdWVzLCBwcm9wKVxuICAgICAgICB9O1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgcmV0dXJuIG1hbmlmZXN0QWNjdW11bGF0b3I7XG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIHtPYmplY3R9IHN0YXRlT2JqZWN0XG4gICAqIEBwYXJhbSB7T2JqZWN0fSBmb3JtYXRNYW5pZmVzdHNcbiAgICogQHByaXZhdGVcbiAgICovXG4gIGZ1bmN0aW9uIGV4cGFuZEZvcm1hdHRlZFByb3BlcnRpZXMgKHN0YXRlT2JqZWN0LCBmb3JtYXRNYW5pZmVzdHMpIHtcbiAgICBUd2VlbmFibGUuZWFjaChmb3JtYXRNYW5pZmVzdHMsIGZ1bmN0aW9uIChwcm9wKSB7XG4gICAgICB2YXIgY3VycmVudFByb3AgPSBzdGF0ZU9iamVjdFtwcm9wXTtcbiAgICAgIHZhciByYXdWYWx1ZXMgPSBnZXRWYWx1ZXNGcm9tKGN1cnJlbnRQcm9wKTtcbiAgICAgIHZhciByYXdWYWx1ZXNMZW5ndGggPSByYXdWYWx1ZXMubGVuZ3RoO1xuXG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHJhd1ZhbHVlc0xlbmd0aDsgaSsrKSB7XG4gICAgICAgIHN0YXRlT2JqZWN0W2Zvcm1hdE1hbmlmZXN0c1twcm9wXS5jaHVua05hbWVzW2ldXSA9ICtyYXdWYWx1ZXNbaV07XG4gICAgICB9XG5cbiAgICAgIGRlbGV0ZSBzdGF0ZU9iamVjdFtwcm9wXTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAcGFyYW0ge09iamVjdH0gc3RhdGVPYmplY3RcbiAgICogQHBhcmFtIHtPYmplY3R9IGZvcm1hdE1hbmlmZXN0c1xuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgZnVuY3Rpb24gY29sbGFwc2VGb3JtYXR0ZWRQcm9wZXJ0aWVzIChzdGF0ZU9iamVjdCwgZm9ybWF0TWFuaWZlc3RzKSB7XG4gICAgVHdlZW5hYmxlLmVhY2goZm9ybWF0TWFuaWZlc3RzLCBmdW5jdGlvbiAocHJvcCkge1xuICAgICAgdmFyIGN1cnJlbnRQcm9wID0gc3RhdGVPYmplY3RbcHJvcF07XG4gICAgICB2YXIgZm9ybWF0Q2h1bmtzID0gZXh0cmFjdFByb3BlcnR5Q2h1bmtzKFxuICAgICAgICBzdGF0ZU9iamVjdCwgZm9ybWF0TWFuaWZlc3RzW3Byb3BdLmNodW5rTmFtZXMpO1xuICAgICAgdmFyIHZhbHVlc0xpc3QgPSBnZXRWYWx1ZXNMaXN0KFxuICAgICAgICBmb3JtYXRDaHVua3MsIGZvcm1hdE1hbmlmZXN0c1twcm9wXS5jaHVua05hbWVzKTtcbiAgICAgIGN1cnJlbnRQcm9wID0gZ2V0Rm9ybWF0dGVkVmFsdWVzKFxuICAgICAgICBmb3JtYXRNYW5pZmVzdHNbcHJvcF0uZm9ybWF0U3RyaW5nLCB2YWx1ZXNMaXN0KTtcbiAgICAgIHN0YXRlT2JqZWN0W3Byb3BdID0gc2FuaXRpemVSR0JDaHVua3MoY3VycmVudFByb3ApO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBzdGF0ZU9iamVjdFxuICAgKiBAcGFyYW0ge0FycmF5LjxzdHJpbmc+fSBjaHVua05hbWVzXG4gICAqXG4gICAqIEByZXR1cm4ge09iamVjdH0gVGhlIGV4dHJhY3RlZCB2YWx1ZSBjaHVua3MuXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBmdW5jdGlvbiBleHRyYWN0UHJvcGVydHlDaHVua3MgKHN0YXRlT2JqZWN0LCBjaHVua05hbWVzKSB7XG4gICAgdmFyIGV4dHJhY3RlZFZhbHVlcyA9IHt9O1xuICAgIHZhciBjdXJyZW50Q2h1bmtOYW1lLCBjaHVua05hbWVzTGVuZ3RoID0gY2h1bmtOYW1lcy5sZW5ndGg7XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNodW5rTmFtZXNMZW5ndGg7IGkrKykge1xuICAgICAgY3VycmVudENodW5rTmFtZSA9IGNodW5rTmFtZXNbaV07XG4gICAgICBleHRyYWN0ZWRWYWx1ZXNbY3VycmVudENodW5rTmFtZV0gPSBzdGF0ZU9iamVjdFtjdXJyZW50Q2h1bmtOYW1lXTtcbiAgICAgIGRlbGV0ZSBzdGF0ZU9iamVjdFtjdXJyZW50Q2h1bmtOYW1lXTtcbiAgICB9XG5cbiAgICByZXR1cm4gZXh0cmFjdGVkVmFsdWVzO1xuICB9XG5cbiAgdmFyIGdldFZhbHVlc0xpc3RfYWNjdW11bGF0b3IgPSBbXTtcbiAgLyoqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBzdGF0ZU9iamVjdFxuICAgKiBAcGFyYW0ge0FycmF5LjxzdHJpbmc+fSBjaHVua05hbWVzXG4gICAqXG4gICAqIEByZXR1cm4ge0FycmF5LjxudW1iZXI+fVxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgZnVuY3Rpb24gZ2V0VmFsdWVzTGlzdCAoc3RhdGVPYmplY3QsIGNodW5rTmFtZXMpIHtcbiAgICBnZXRWYWx1ZXNMaXN0X2FjY3VtdWxhdG9yLmxlbmd0aCA9IDA7XG4gICAgdmFyIGNodW5rTmFtZXNMZW5ndGggPSBjaHVua05hbWVzLmxlbmd0aDtcblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY2h1bmtOYW1lc0xlbmd0aDsgaSsrKSB7XG4gICAgICBnZXRWYWx1ZXNMaXN0X2FjY3VtdWxhdG9yLnB1c2goc3RhdGVPYmplY3RbY2h1bmtOYW1lc1tpXV0pO1xuICAgIH1cblxuICAgIHJldHVybiBnZXRWYWx1ZXNMaXN0X2FjY3VtdWxhdG9yO1xuICB9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBmb3JtYXRTdHJpbmdcbiAgICogQHBhcmFtIHtBcnJheS48bnVtYmVyPn0gcmF3VmFsdWVzXG4gICAqXG4gICAqIEByZXR1cm4ge3N0cmluZ31cbiAgICogQHByaXZhdGVcbiAgICovXG4gIGZ1bmN0aW9uIGdldEZvcm1hdHRlZFZhbHVlcyAoZm9ybWF0U3RyaW5nLCByYXdWYWx1ZXMpIHtcbiAgICB2YXIgZm9ybWF0dGVkVmFsdWVTdHJpbmcgPSBmb3JtYXRTdHJpbmc7XG4gICAgdmFyIHJhd1ZhbHVlc0xlbmd0aCA9IHJhd1ZhbHVlcy5sZW5ndGg7XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHJhd1ZhbHVlc0xlbmd0aDsgaSsrKSB7XG4gICAgICBmb3JtYXR0ZWRWYWx1ZVN0cmluZyA9IGZvcm1hdHRlZFZhbHVlU3RyaW5nLnJlcGxhY2UoXG4gICAgICAgIFZBTFVFX1BMQUNFSE9MREVSLCArcmF3VmFsdWVzW2ldLnRvRml4ZWQoNCkpO1xuICAgIH1cblxuICAgIHJldHVybiBmb3JtYXR0ZWRWYWx1ZVN0cmluZztcbiAgfVxuXG4gIC8qKlxuICAgKiBOb3RlOiBJdCdzIHRoZSBkdXR5IG9mIHRoZSBjYWxsZXIgdG8gY29udmVydCB0aGUgQXJyYXkgZWxlbWVudHMgb2YgdGhlXG4gICAqIHJldHVybiB2YWx1ZSBpbnRvIG51bWJlcnMuICBUaGlzIGlzIGEgcGVyZm9ybWFuY2Ugb3B0aW1pemF0aW9uLlxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gZm9ybWF0dGVkU3RyaW5nXG4gICAqXG4gICAqIEByZXR1cm4ge0FycmF5LjxzdHJpbmc+fG51bGx9XG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBmdW5jdGlvbiBnZXRWYWx1ZXNGcm9tIChmb3JtYXR0ZWRTdHJpbmcpIHtcbiAgICByZXR1cm4gZm9ybWF0dGVkU3RyaW5nLm1hdGNoKFJfVU5GT1JNQVRURURfVkFMVUVTKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAcGFyYW0ge09iamVjdH0gZWFzaW5nT2JqZWN0XG4gICAqIEBwYXJhbSB7T2JqZWN0fSB0b2tlbkRhdGFcbiAgICogQHByaXZhdGVcbiAgICovXG4gIGZ1bmN0aW9uIGV4cGFuZEVhc2luZ09iamVjdCAoZWFzaW5nT2JqZWN0LCB0b2tlbkRhdGEpIHtcbiAgICBUd2VlbmFibGUuZWFjaCh0b2tlbkRhdGEsIGZ1bmN0aW9uIChwcm9wKSB7XG4gICAgICB2YXIgY3VycmVudFByb3AgPSB0b2tlbkRhdGFbcHJvcF07XG4gICAgICB2YXIgY2h1bmtOYW1lcyA9IGN1cnJlbnRQcm9wLmNodW5rTmFtZXM7XG4gICAgICB2YXIgY2h1bmtMZW5ndGggPSBjaHVua05hbWVzLmxlbmd0aDtcblxuICAgICAgdmFyIGVhc2luZyA9IGVhc2luZ09iamVjdFtwcm9wXTtcbiAgICAgIHZhciBpO1xuXG4gICAgICBpZiAodHlwZW9mIGVhc2luZyA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgdmFyIGVhc2luZ0NodW5rcyA9IGVhc2luZy5zcGxpdCgnICcpO1xuICAgICAgICB2YXIgbGFzdEVhc2luZ0NodW5rID0gZWFzaW5nQ2h1bmtzW2Vhc2luZ0NodW5rcy5sZW5ndGggLSAxXTtcblxuICAgICAgICBmb3IgKGkgPSAwOyBpIDwgY2h1bmtMZW5ndGg7IGkrKykge1xuICAgICAgICAgIGVhc2luZ09iamVjdFtjaHVua05hbWVzW2ldXSA9IGVhc2luZ0NodW5rc1tpXSB8fCBsYXN0RWFzaW5nQ2h1bms7XG4gICAgICAgIH1cblxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZm9yIChpID0gMDsgaSA8IGNodW5rTGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICBlYXNpbmdPYmplY3RbY2h1bmtOYW1lc1tpXV0gPSBlYXNpbmc7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgZGVsZXRlIGVhc2luZ09iamVjdFtwcm9wXTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAcGFyYW0ge09iamVjdH0gZWFzaW5nT2JqZWN0XG4gICAqIEBwYXJhbSB7T2JqZWN0fSB0b2tlbkRhdGFcbiAgICogQHByaXZhdGVcbiAgICovXG4gIGZ1bmN0aW9uIGNvbGxhcHNlRWFzaW5nT2JqZWN0IChlYXNpbmdPYmplY3QsIHRva2VuRGF0YSkge1xuICAgIFR3ZWVuYWJsZS5lYWNoKHRva2VuRGF0YSwgZnVuY3Rpb24gKHByb3ApIHtcbiAgICAgIHZhciBjdXJyZW50UHJvcCA9IHRva2VuRGF0YVtwcm9wXTtcbiAgICAgIHZhciBjaHVua05hbWVzID0gY3VycmVudFByb3AuY2h1bmtOYW1lcztcbiAgICAgIHZhciBjaHVua0xlbmd0aCA9IGNodW5rTmFtZXMubGVuZ3RoO1xuXG4gICAgICB2YXIgZmlyc3RFYXNpbmcgPSBlYXNpbmdPYmplY3RbY2h1bmtOYW1lc1swXV07XG4gICAgICB2YXIgdHlwZW9mRWFzaW5ncyA9IHR5cGVvZiBmaXJzdEVhc2luZztcblxuICAgICAgaWYgKHR5cGVvZkVhc2luZ3MgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgIHZhciBjb21wb3NlZEVhc2luZ1N0cmluZyA9ICcnO1xuXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY2h1bmtMZW5ndGg7IGkrKykge1xuICAgICAgICAgIGNvbXBvc2VkRWFzaW5nU3RyaW5nICs9ICcgJyArIGVhc2luZ09iamVjdFtjaHVua05hbWVzW2ldXTtcbiAgICAgICAgICBkZWxldGUgZWFzaW5nT2JqZWN0W2NodW5rTmFtZXNbaV1dO1xuICAgICAgICB9XG5cbiAgICAgICAgZWFzaW5nT2JqZWN0W3Byb3BdID0gY29tcG9zZWRFYXNpbmdTdHJpbmcuc3Vic3RyKDEpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZWFzaW5nT2JqZWN0W3Byb3BdID0gZmlyc3RFYXNpbmc7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBUd2VlbmFibGUucHJvdG90eXBlLmZpbHRlci50b2tlbiA9IHtcbiAgICAndHdlZW5DcmVhdGVkJzogZnVuY3Rpb24gKGN1cnJlbnRTdGF0ZSwgZnJvbVN0YXRlLCB0b1N0YXRlLCBlYXNpbmdPYmplY3QpIHtcbiAgICAgIHNhbml0aXplT2JqZWN0Rm9ySGV4UHJvcHMoY3VycmVudFN0YXRlKTtcbiAgICAgIHNhbml0aXplT2JqZWN0Rm9ySGV4UHJvcHMoZnJvbVN0YXRlKTtcbiAgICAgIHNhbml0aXplT2JqZWN0Rm9ySGV4UHJvcHModG9TdGF0ZSk7XG4gICAgICB0aGlzLl90b2tlbkRhdGEgPSBnZXRGb3JtYXRNYW5pZmVzdHMoY3VycmVudFN0YXRlKTtcbiAgICB9LFxuXG4gICAgJ2JlZm9yZVR3ZWVuJzogZnVuY3Rpb24gKGN1cnJlbnRTdGF0ZSwgZnJvbVN0YXRlLCB0b1N0YXRlLCBlYXNpbmdPYmplY3QpIHtcbiAgICAgIGV4cGFuZEVhc2luZ09iamVjdChlYXNpbmdPYmplY3QsIHRoaXMuX3Rva2VuRGF0YSk7XG4gICAgICBleHBhbmRGb3JtYXR0ZWRQcm9wZXJ0aWVzKGN1cnJlbnRTdGF0ZSwgdGhpcy5fdG9rZW5EYXRhKTtcbiAgICAgIGV4cGFuZEZvcm1hdHRlZFByb3BlcnRpZXMoZnJvbVN0YXRlLCB0aGlzLl90b2tlbkRhdGEpO1xuICAgICAgZXhwYW5kRm9ybWF0dGVkUHJvcGVydGllcyh0b1N0YXRlLCB0aGlzLl90b2tlbkRhdGEpO1xuICAgIH0sXG5cbiAgICAnYWZ0ZXJUd2Vlbic6IGZ1bmN0aW9uIChjdXJyZW50U3RhdGUsIGZyb21TdGF0ZSwgdG9TdGF0ZSwgZWFzaW5nT2JqZWN0KSB7XG4gICAgICBjb2xsYXBzZUZvcm1hdHRlZFByb3BlcnRpZXMoY3VycmVudFN0YXRlLCB0aGlzLl90b2tlbkRhdGEpO1xuICAgICAgY29sbGFwc2VGb3JtYXR0ZWRQcm9wZXJ0aWVzKGZyb21TdGF0ZSwgdGhpcy5fdG9rZW5EYXRhKTtcbiAgICAgIGNvbGxhcHNlRm9ybWF0dGVkUHJvcGVydGllcyh0b1N0YXRlLCB0aGlzLl90b2tlbkRhdGEpO1xuICAgICAgY29sbGFwc2VFYXNpbmdPYmplY3QoZWFzaW5nT2JqZWN0LCB0aGlzLl90b2tlbkRhdGEpO1xuICAgIH1cbiAgfTtcblxufSAoVHdlZW5hYmxlKSk7XG5cbn0pLmNhbGwobnVsbCk7XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9zaGlmdHkvZGlzdC9zaGlmdHkuanNcbiAqKiBtb2R1bGUgaWQgPSA3NlxuICoqIG1vZHVsZSBjaHVua3MgPSAzXG4gKiovIiwiLy8gVXRpbGl0eSBmdW5jdGlvbnNcblxudmFyIFBSRUZJWEVTID0gJ1dlYmtpdCBNb3ogTyBtcycuc3BsaXQoJyAnKTtcbnZhciBGTE9BVF9DT01QQVJJU09OX0VQU0lMT04gPSAwLjAwMTtcblxuLy8gQ29weSBhbGwgYXR0cmlidXRlcyBmcm9tIHNvdXJjZSBvYmplY3QgdG8gZGVzdGluYXRpb24gb2JqZWN0LlxuLy8gZGVzdGluYXRpb24gb2JqZWN0IGlzIG11dGF0ZWQuXG5mdW5jdGlvbiBleHRlbmQoZGVzdGluYXRpb24sIHNvdXJjZSwgcmVjdXJzaXZlKSB7XG4gICAgZGVzdGluYXRpb24gPSBkZXN0aW5hdGlvbiB8fCB7fTtcbiAgICBzb3VyY2UgPSBzb3VyY2UgfHwge307XG4gICAgcmVjdXJzaXZlID0gcmVjdXJzaXZlIHx8IGZhbHNlO1xuXG4gICAgZm9yICh2YXIgYXR0ck5hbWUgaW4gc291cmNlKSB7XG4gICAgICAgIGlmIChzb3VyY2UuaGFzT3duUHJvcGVydHkoYXR0ck5hbWUpKSB7XG4gICAgICAgICAgICB2YXIgZGVzdFZhbCA9IGRlc3RpbmF0aW9uW2F0dHJOYW1lXTtcbiAgICAgICAgICAgIHZhciBzb3VyY2VWYWwgPSBzb3VyY2VbYXR0ck5hbWVdO1xuICAgICAgICAgICAgaWYgKHJlY3Vyc2l2ZSAmJiBpc09iamVjdChkZXN0VmFsKSAmJiBpc09iamVjdChzb3VyY2VWYWwpKSB7XG4gICAgICAgICAgICAgICAgZGVzdGluYXRpb25bYXR0ck5hbWVdID0gZXh0ZW5kKGRlc3RWYWwsIHNvdXJjZVZhbCwgcmVjdXJzaXZlKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgZGVzdGluYXRpb25bYXR0ck5hbWVdID0gc291cmNlVmFsO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGRlc3RpbmF0aW9uO1xufVxuXG4vLyBSZW5kZXJzIHRlbXBsYXRlcyB3aXRoIGdpdmVuIHZhcmlhYmxlcy4gVmFyaWFibGVzIG11c3QgYmUgc3Vycm91bmRlZCB3aXRoXG4vLyBicmFjZXMgd2l0aG91dCBhbnkgc3BhY2VzLCBlLmcuIHt2YXJpYWJsZX1cbi8vIEFsbCBpbnN0YW5jZXMgb2YgdmFyaWFibGUgcGxhY2Vob2xkZXJzIHdpbGwgYmUgcmVwbGFjZWQgd2l0aCBnaXZlbiBjb250ZW50XG4vLyBFeGFtcGxlOlxuLy8gcmVuZGVyKCdIZWxsbywge21lc3NhZ2V9IScsIHttZXNzYWdlOiAnd29ybGQnfSlcbmZ1bmN0aW9uIHJlbmRlcih0ZW1wbGF0ZSwgdmFycykge1xuICAgIHZhciByZW5kZXJlZCA9IHRlbXBsYXRlO1xuXG4gICAgZm9yICh2YXIga2V5IGluIHZhcnMpIHtcbiAgICAgICAgaWYgKHZhcnMuaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgICAgICAgdmFyIHZhbCA9IHZhcnNba2V5XTtcbiAgICAgICAgICAgIHZhciByZWdFeHBTdHJpbmcgPSAnXFxcXHsnICsga2V5ICsgJ1xcXFx9JztcbiAgICAgICAgICAgIHZhciByZWdFeHAgPSBuZXcgUmVnRXhwKHJlZ0V4cFN0cmluZywgJ2cnKTtcblxuICAgICAgICAgICAgcmVuZGVyZWQgPSByZW5kZXJlZC5yZXBsYWNlKHJlZ0V4cCwgdmFsKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiByZW5kZXJlZDtcbn1cblxuZnVuY3Rpb24gc2V0U3R5bGUoZWxlbWVudCwgc3R5bGUsIHZhbHVlKSB7XG4gICAgdmFyIGVsU3R5bGUgPSBlbGVtZW50LnN0eWxlOyAgLy8gY2FjaGUgZm9yIHBlcmZvcm1hbmNlXG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IFBSRUZJWEVTLmxlbmd0aDsgKytpKSB7XG4gICAgICAgIHZhciBwcmVmaXggPSBQUkVGSVhFU1tpXTtcbiAgICAgICAgZWxTdHlsZVtwcmVmaXggKyBjYXBpdGFsaXplKHN0eWxlKV0gPSB2YWx1ZTtcbiAgICB9XG5cbiAgICBlbFN0eWxlW3N0eWxlXSA9IHZhbHVlO1xufVxuXG5mdW5jdGlvbiBzZXRTdHlsZXMoZWxlbWVudCwgc3R5bGVzKSB7XG4gICAgZm9yRWFjaE9iamVjdChzdHlsZXMsIGZ1bmN0aW9uKHN0eWxlVmFsdWUsIHN0eWxlTmFtZSkge1xuICAgICAgICAvLyBBbGxvdyBkaXNhYmxpbmcgc29tZSBpbmRpdmlkdWFsIHN0eWxlcyBieSBzZXR0aW5nIHRoZW1cbiAgICAgICAgLy8gdG8gbnVsbCBvciB1bmRlZmluZWRcbiAgICAgICAgaWYgKHN0eWxlVmFsdWUgPT09IG51bGwgfHwgc3R5bGVWYWx1ZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICAvLyBJZiBzdHlsZSdzIHZhbHVlIGlzIHtwcmVmaXg6IHRydWUsIHZhbHVlOiAnNTAlJ30sXG4gICAgICAgIC8vIFNldCBhbHNvIGJyb3dzZXIgcHJlZml4ZWQgc3R5bGVzXG4gICAgICAgIGlmIChpc09iamVjdChzdHlsZVZhbHVlKSAmJiBzdHlsZVZhbHVlLnByZWZpeCA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgc2V0U3R5bGUoZWxlbWVudCwgc3R5bGVOYW1lLCBzdHlsZVZhbHVlLnZhbHVlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGVsZW1lbnQuc3R5bGVbc3R5bGVOYW1lXSA9IHN0eWxlVmFsdWU7XG4gICAgICAgIH1cbiAgICB9KTtcbn1cblxuZnVuY3Rpb24gY2FwaXRhbGl6ZSh0ZXh0KSB7XG4gICAgcmV0dXJuIHRleHQuY2hhckF0KDApLnRvVXBwZXJDYXNlKCkgKyB0ZXh0LnNsaWNlKDEpO1xufVxuXG5mdW5jdGlvbiBpc1N0cmluZyhvYmopIHtcbiAgICByZXR1cm4gdHlwZW9mIG9iaiA9PT0gJ3N0cmluZycgfHwgb2JqIGluc3RhbmNlb2YgU3RyaW5nO1xufVxuXG5mdW5jdGlvbiBpc0Z1bmN0aW9uKG9iaikge1xuICAgIHJldHVybiB0eXBlb2Ygb2JqID09PSAnZnVuY3Rpb24nO1xufVxuXG5mdW5jdGlvbiBpc0FycmF5KG9iaikge1xuICAgIHJldHVybiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwob2JqKSA9PT0gJ1tvYmplY3QgQXJyYXldJztcbn1cblxuLy8gUmV0dXJucyB0cnVlIGlmIGBvYmpgIGlzIG9iamVjdCBhcyBpbiB7YTogMSwgYjogMn0sIG5vdCBpZiBpdCdzIGZ1bmN0aW9uIG9yXG4vLyBhcnJheVxuZnVuY3Rpb24gaXNPYmplY3Qob2JqKSB7XG4gICAgaWYgKGlzQXJyYXkob2JqKSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgdmFyIHR5cGUgPSB0eXBlb2Ygb2JqO1xuICAgIHJldHVybiB0eXBlID09PSAnb2JqZWN0JyAmJiAhIW9iajtcbn1cblxuZnVuY3Rpb24gZm9yRWFjaE9iamVjdChvYmplY3QsIGNhbGxiYWNrKSB7XG4gICAgZm9yICh2YXIga2V5IGluIG9iamVjdCkge1xuICAgICAgICBpZiAob2JqZWN0Lmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgICAgICAgIHZhciB2YWwgPSBvYmplY3Rba2V5XTtcbiAgICAgICAgICAgIGNhbGxiYWNrKHZhbCwga2V5KTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuZnVuY3Rpb24gZmxvYXRFcXVhbHMoYSwgYikge1xuICAgIHJldHVybiBNYXRoLmFicyhhIC0gYikgPCBGTE9BVF9DT01QQVJJU09OX0VQU0lMT047XG59XG5cbi8vIGh0dHBzOi8vY29kZXJ3YWxsLmNvbS9wL255Z2dody9kb24tdC11c2UtaW5uZXJodG1sLXRvLWVtcHR5LWRvbS1lbGVtZW50c1xuZnVuY3Rpb24gcmVtb3ZlQ2hpbGRyZW4oZWwpIHtcbiAgICB3aGlsZSAoZWwuZmlyc3RDaGlsZCkge1xuICAgICAgICBlbC5yZW1vdmVDaGlsZChlbC5maXJzdENoaWxkKTtcbiAgICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIGV4dGVuZDogZXh0ZW5kLFxuICAgIHJlbmRlcjogcmVuZGVyLFxuICAgIHNldFN0eWxlOiBzZXRTdHlsZSxcbiAgICBzZXRTdHlsZXM6IHNldFN0eWxlcyxcbiAgICBjYXBpdGFsaXplOiBjYXBpdGFsaXplLFxuICAgIGlzU3RyaW5nOiBpc1N0cmluZyxcbiAgICBpc0Z1bmN0aW9uOiBpc0Z1bmN0aW9uLFxuICAgIGlzT2JqZWN0OiBpc09iamVjdCxcbiAgICBmb3JFYWNoT2JqZWN0OiBmb3JFYWNoT2JqZWN0LFxuICAgIGZsb2F0RXF1YWxzOiBmbG9hdEVxdWFscyxcbiAgICByZW1vdmVDaGlsZHJlbjogcmVtb3ZlQ2hpbGRyZW5cbn07XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9wcm9ncmVzc2Jhci5qcy9zcmMvdXRpbHMuanNcbiAqKiBtb2R1bGUgaWQgPSA3N1xuICoqIG1vZHVsZSBjaHVua3MgPSAzXG4gKiovIiwiLy8gQ2lyY2xlIHNoYXBlZCBwcm9ncmVzcyBiYXJcblxudmFyIFNoYXBlID0gcmVxdWlyZSgnLi9zaGFwZScpO1xudmFyIHV0aWxzID0gcmVxdWlyZSgnLi91dGlscycpO1xuXG52YXIgQ2lyY2xlID0gZnVuY3Rpb24gQ2lyY2xlKGNvbnRhaW5lciwgb3B0aW9ucykge1xuICAgIC8vIFVzZSB0d28gYXJjcyB0byBmb3JtIGEgY2lyY2xlXG4gICAgLy8gU2VlIHRoaXMgYW5zd2VyIGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9hLzEwNDc3MzM0LzE0NDYwOTJcbiAgICB0aGlzLl9wYXRoVGVtcGxhdGUgPVxuICAgICAgICAnTSA1MCw1MCBtIDAsLXtyYWRpdXN9JyArXG4gICAgICAgICcgYSB7cmFkaXVzfSx7cmFkaXVzfSAwIDEgMSAwLHsycmFkaXVzfScgK1xuICAgICAgICAnIGEge3JhZGl1c30se3JhZGl1c30gMCAxIDEgMCwtezJyYWRpdXN9JztcblxuICAgIHRoaXMuY29udGFpbmVyQXNwZWN0UmF0aW8gPSAxO1xuXG4gICAgU2hhcGUuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbn07XG5cbkNpcmNsZS5wcm90b3R5cGUgPSBuZXcgU2hhcGUoKTtcbkNpcmNsZS5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBDaXJjbGU7XG5cbkNpcmNsZS5wcm90b3R5cGUuX3BhdGhTdHJpbmcgPSBmdW5jdGlvbiBfcGF0aFN0cmluZyhvcHRzKSB7XG4gICAgdmFyIHdpZHRoT2ZXaWRlciA9IG9wdHMuc3Ryb2tlV2lkdGg7XG4gICAgaWYgKG9wdHMudHJhaWxXaWR0aCAmJiBvcHRzLnRyYWlsV2lkdGggPiBvcHRzLnN0cm9rZVdpZHRoKSB7XG4gICAgICAgIHdpZHRoT2ZXaWRlciA9IG9wdHMudHJhaWxXaWR0aDtcbiAgICB9XG5cbiAgICB2YXIgciA9IDUwIC0gd2lkdGhPZldpZGVyIC8gMjtcblxuICAgIHJldHVybiB1dGlscy5yZW5kZXIodGhpcy5fcGF0aFRlbXBsYXRlLCB7XG4gICAgICAgIHJhZGl1czogcixcbiAgICAgICAgJzJyYWRpdXMnOiByICogMlxuICAgIH0pO1xufTtcblxuQ2lyY2xlLnByb3RvdHlwZS5fdHJhaWxTdHJpbmcgPSBmdW5jdGlvbiBfdHJhaWxTdHJpbmcob3B0cykge1xuICAgIHJldHVybiB0aGlzLl9wYXRoU3RyaW5nKG9wdHMpO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBDaXJjbGU7XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9wcm9ncmVzc2Jhci5qcy9zcmMvY2lyY2xlLmpzXG4gKiogbW9kdWxlIGlkID0gNzhcbiAqKiBtb2R1bGUgY2h1bmtzID0gM1xuICoqLyIsIi8vIFNlbWktU2VtaUNpcmNsZSBzaGFwZWQgcHJvZ3Jlc3MgYmFyXG5cbnZhciBTaGFwZSA9IHJlcXVpcmUoJy4vc2hhcGUnKTtcbnZhciBDaXJjbGUgPSByZXF1aXJlKCcuL2NpcmNsZScpO1xudmFyIHV0aWxzID0gcmVxdWlyZSgnLi91dGlscycpO1xuXG52YXIgU2VtaUNpcmNsZSA9IGZ1bmN0aW9uIFNlbWlDaXJjbGUoY29udGFpbmVyLCBvcHRpb25zKSB7XG4gICAgLy8gVXNlIG9uZSBhcmMgdG8gZm9ybSBhIFNlbWlDaXJjbGVcbiAgICAvLyBTZWUgdGhpcyBhbnN3ZXIgaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL2EvMTA0NzczMzQvMTQ0NjA5MlxuICAgIHRoaXMuX3BhdGhUZW1wbGF0ZSA9XG4gICAgICAgICdNIDUwLDUwIG0gLXtyYWRpdXN9LDAnICtcbiAgICAgICAgJyBhIHtyYWRpdXN9LHtyYWRpdXN9IDAgMSAxIHsycmFkaXVzfSwwJztcblxuICAgIHRoaXMuY29udGFpbmVyQXNwZWN0UmF0aW8gPSAyO1xuXG4gICAgU2hhcGUuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbn07XG5cblNlbWlDaXJjbGUucHJvdG90eXBlID0gbmV3IFNoYXBlKCk7XG5TZW1pQ2lyY2xlLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IFNlbWlDaXJjbGU7XG5cblNlbWlDaXJjbGUucHJvdG90eXBlLl9pbml0aWFsaXplU3ZnID0gZnVuY3Rpb24gX2luaXRpYWxpemVTdmcoc3ZnLCBvcHRzKSB7XG4gICAgc3ZnLnNldEF0dHJpYnV0ZSgndmlld0JveCcsICcwIDAgMTAwIDUwJyk7XG59O1xuXG5TZW1pQ2lyY2xlLnByb3RvdHlwZS5faW5pdGlhbGl6ZVRleHRDb250YWluZXIgPSBmdW5jdGlvbiBfaW5pdGlhbGl6ZVRleHRDb250YWluZXIoXG4gICAgb3B0cyxcbiAgICBjb250YWluZXIsXG4gICAgdGV4dENvbnRhaW5lclxuKSB7XG4gICAgaWYgKG9wdHMudGV4dC5zdHlsZSkge1xuICAgICAgICAvLyBSZXNldCB0b3Agc3R5bGVcbiAgICAgICAgdGV4dENvbnRhaW5lci5zdHlsZS50b3AgPSAnYXV0byc7XG4gICAgICAgIHRleHRDb250YWluZXIuc3R5bGUuYm90dG9tID0gJzAnO1xuXG4gICAgICAgIGlmIChvcHRzLnRleHQuYWxpZ25Ub0JvdHRvbSkge1xuICAgICAgICAgICAgdXRpbHMuc2V0U3R5bGUodGV4dENvbnRhaW5lciwgJ3RyYW5zZm9ybScsICd0cmFuc2xhdGUoLTUwJSwgMCknKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHV0aWxzLnNldFN0eWxlKHRleHRDb250YWluZXIsICd0cmFuc2Zvcm0nLCAndHJhbnNsYXRlKC01MCUsIDUwJSknKTtcbiAgICAgICAgfVxuICAgIH1cbn07XG5cbi8vIFNoYXJlIGZ1bmN0aW9uYWxpdHkgd2l0aCBDaXJjbGUsIGp1c3QgaGF2ZSBkaWZmZXJlbnQgcGF0aFxuU2VtaUNpcmNsZS5wcm90b3R5cGUuX3BhdGhTdHJpbmcgPSBDaXJjbGUucHJvdG90eXBlLl9wYXRoU3RyaW5nO1xuU2VtaUNpcmNsZS5wcm90b3R5cGUuX3RyYWlsU3RyaW5nID0gQ2lyY2xlLnByb3RvdHlwZS5fdHJhaWxTdHJpbmc7XG5cbm1vZHVsZS5leHBvcnRzID0gU2VtaUNpcmNsZTtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L3Byb2dyZXNzYmFyLmpzL3NyYy9zZW1pY2lyY2xlLmpzXG4gKiogbW9kdWxlIGlkID0gNzlcbiAqKiBtb2R1bGUgY2h1bmtzID0gM1xuICoqLyJdLCJzb3VyY2VSb290IjoiIn0=