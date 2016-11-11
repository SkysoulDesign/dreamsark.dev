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
	var Helpers_1 = __webpack_require__(2);
	window['dreamsark'].exposes({
	    MediumEditor: __webpack_require__(69)
	});
	var MediumEditorTables = __webpack_require__(71);
	var Medium = (function (_super) {
	    __extends(Medium, _super);
	    function Medium(app, element, options) {
	        _super.call(this);
	        this.defaults = {
	            disableExtraSpaces: true,
	            buttonLabels: 'fontawesome',
	            toolbar: {
	                buttons: [
	                    'bold', 'italic', 'underline', 'anchor', 'h2', 'h3', 'quote', 'table'
	                ]
	            },
	            extensions: {
	                table: new MediumEditorTables()
	            }
	        };
	        this.instance = new MediumEditor(element, Helpers_1.extend(this.defaults, options));
	    }
	    return Medium;
	}(Plugins_1.Plugins));
	exports.Medium = Medium;
	/**
	 * Auto install itself
	 */
	window['dreamsark'].install({
	    Medium: Medium
	});
	//# sourceMappingURL=Medium.js.map

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

/***/ 2:
/***/ function(module, exports) {

	"use strict";
	/**
	 * For Loop
	 */
	exports.forEach = function (array, callback, scope) {
	    for (var i = 0; i < array.length; i++)
	        callback.call(scope, i, array[i]);
	};
	/**
	 * Pop array by key name
	 *
	 * @param data
	 * @param key
	 * @returns any[]
	 */
	exports.popByKey = function (data, key, defaults) {
	    if (!data.hasOwnProperty(key))
	        return defaults;
	    var value = data[key];
	    delete data[key];
	    return value;
	};
	/**
	 * Extend Object
	 *
	 * @param defaults
	 * @param object
	 * @returns {any}
	 */
	exports.extend = function (defaults, object) {
	    for (var i in object) {
	        if (object.hasOwnProperty(i)) {
	            defaults[i] = object[i];
	        }
	    }
	    return defaults;
	};
	/**
	 * Convert String to CamelCase
	 *
	 * @param str
	 * @returns {string}
	 */
	exports.toCamelCase = function (str) {
	    return str.replace(/^([A-Z])|[\s-_](\w)/g, function (match, p1, p2, offset) {
	        if (p2)
	            return p2.toUpperCase();
	        return p1.toLowerCase();
	    });
	};
	exports.captalize = function (str) {
	    return str.charAt(0).toUpperCase() + str.slice(1);
	};
	/**
	 * Firefox have an issue to submit form if its not appended to the body
	 * @param form
	 */
	exports.submitForm = function (form) {
	    document.body.appendChild(form);
	    form.submit();
	};
	/**
	 * Require a whole Folder
	 *
	 * @param requireContext
	 * @returns {U[]}
	 */
	exports.requireAll = function (requireContext) {
	    return requireContext.keys().map(requireContext);
	};
	//# sourceMappingURL=Helpers.js.map

/***/ },

/***/ 69:
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/* WEBPACK VAR INJECTION */(function(process) {/*global self, document, DOMException */
	
	/*! @source http://purl.eligrey.com/github/classList.js/blob/master/classList.js */
	
	// Full polyfill for browsers with no classList support
	if (!("classList" in document.createElement("_"))) {
	  (function (view) {
	
	  "use strict";
	
	  if (!('Element' in view)) return;
	
	  var
	      classListProp = "classList"
	    , protoProp = "prototype"
	    , elemCtrProto = view.Element[protoProp]
	    , objCtr = Object
	    , strTrim = String[protoProp].trim || function () {
	      return this.replace(/^\s+|\s+$/g, "");
	    }
	    , arrIndexOf = Array[protoProp].indexOf || function (item) {
	      var
	          i = 0
	        , len = this.length
	      ;
	      for (; i < len; i++) {
	        if (i in this && this[i] === item) {
	          return i;
	        }
	      }
	      return -1;
	    }
	    // Vendors: please allow content code to instantiate DOMExceptions
	    , DOMEx = function (type, message) {
	      this.name = type;
	      this.code = DOMException[type];
	      this.message = message;
	    }
	    , checkTokenAndGetIndex = function (classList, token) {
	      if (token === "") {
	        throw new DOMEx(
	            "SYNTAX_ERR"
	          , "An invalid or illegal string was specified"
	        );
	      }
	      if (/\s/.test(token)) {
	        throw new DOMEx(
	            "INVALID_CHARACTER_ERR"
	          , "String contains an invalid character"
	        );
	      }
	      return arrIndexOf.call(classList, token);
	    }
	    , ClassList = function (elem) {
	      var
	          trimmedClasses = strTrim.call(elem.getAttribute("class") || "")
	        , classes = trimmedClasses ? trimmedClasses.split(/\s+/) : []
	        , i = 0
	        , len = classes.length
	      ;
	      for (; i < len; i++) {
	        this.push(classes[i]);
	      }
	      this._updateClassName = function () {
	        elem.setAttribute("class", this.toString());
	      };
	    }
	    , classListProto = ClassList[protoProp] = []
	    , classListGetter = function () {
	      return new ClassList(this);
	    }
	  ;
	  // Most DOMException implementations don't allow calling DOMException's toString()
	  // on non-DOMExceptions. Error's toString() is sufficient here.
	  DOMEx[protoProp] = Error[protoProp];
	  classListProto.item = function (i) {
	    return this[i] || null;
	  };
	  classListProto.contains = function (token) {
	    token += "";
	    return checkTokenAndGetIndex(this, token) !== -1;
	  };
	  classListProto.add = function () {
	    var
	        tokens = arguments
	      , i = 0
	      , l = tokens.length
	      , token
	      , updated = false
	    ;
	    do {
	      token = tokens[i] + "";
	      if (checkTokenAndGetIndex(this, token) === -1) {
	        this.push(token);
	        updated = true;
	      }
	    }
	    while (++i < l);
	
	    if (updated) {
	      this._updateClassName();
	    }
	  };
	  classListProto.remove = function () {
	    var
	        tokens = arguments
	      , i = 0
	      , l = tokens.length
	      , token
	      , updated = false
	      , index
	    ;
	    do {
	      token = tokens[i] + "";
	      index = checkTokenAndGetIndex(this, token);
	      while (index !== -1) {
	        this.splice(index, 1);
	        updated = true;
	        index = checkTokenAndGetIndex(this, token);
	      }
	    }
	    while (++i < l);
	
	    if (updated) {
	      this._updateClassName();
	    }
	  };
	  classListProto.toggle = function (token, force) {
	    token += "";
	
	    var
	        result = this.contains(token)
	      , method = result ?
	        force !== true && "remove"
	      :
	        force !== false && "add"
	    ;
	
	    if (method) {
	      this[method](token);
	    }
	
	    if (force === true || force === false) {
	      return force;
	    } else {
	      return !result;
	    }
	  };
	  classListProto.toString = function () {
	    return this.join(" ");
	  };
	
	  if (objCtr.defineProperty) {
	    var classListPropDesc = {
	        get: classListGetter
	      , enumerable: true
	      , configurable: true
	    };
	    try {
	      objCtr.defineProperty(elemCtrProto, classListProp, classListPropDesc);
	    } catch (ex) { // IE 8 doesn't support enumerable:true
	      if (ex.number === -0x7FF5EC54) {
	        classListPropDesc.enumerable = false;
	        objCtr.defineProperty(elemCtrProto, classListProp, classListPropDesc);
	      }
	    }
	  } else if (objCtr[protoProp].__defineGetter__) {
	    elemCtrProto.__defineGetter__(classListProp, classListGetter);
	  }
	
	  }(self));
	}
	
	/* Blob.js
	 * A Blob implementation.
	 * 2014-07-24
	 *
	 * By Eli Grey, http://eligrey.com
	 * By Devin Samarin, https://github.com/dsamarin
	 * License: X11/MIT
	 *   See https://github.com/eligrey/Blob.js/blob/master/LICENSE.md
	 */
	
	/*global self, unescape */
	/*jslint bitwise: true, regexp: true, confusion: true, es5: true, vars: true, white: true,
	  plusplus: true */
	
	/*! @source http://purl.eligrey.com/github/Blob.js/blob/master/Blob.js */
	
	(function (view) {
	  "use strict";
	
	  view.URL = view.URL || view.webkitURL;
	
	  if (view.Blob && view.URL) {
	    try {
	      new Blob;
	      return;
	    } catch (e) {}
	  }
	
	  // Internally we use a BlobBuilder implementation to base Blob off of
	  // in order to support older browsers that only have BlobBuilder
	  var BlobBuilder = view.BlobBuilder || view.WebKitBlobBuilder || view.MozBlobBuilder || (function(view) {
	    var
	        get_class = function(object) {
	        return Object.prototype.toString.call(object).match(/^\[object\s(.*)\]$/)[1];
	      }
	      , FakeBlobBuilder = function BlobBuilder() {
	        this.data = [];
	      }
	      , FakeBlob = function Blob(data, type, encoding) {
	        this.data = data;
	        this.size = data.length;
	        this.type = type;
	        this.encoding = encoding;
	      }
	      , FBB_proto = FakeBlobBuilder.prototype
	      , FB_proto = FakeBlob.prototype
	      , FileReaderSync = view.FileReaderSync
	      , FileException = function(type) {
	        this.code = this[this.name = type];
	      }
	      , file_ex_codes = (
	          "NOT_FOUND_ERR SECURITY_ERR ABORT_ERR NOT_READABLE_ERR ENCODING_ERR "
	        + "NO_MODIFICATION_ALLOWED_ERR INVALID_STATE_ERR SYNTAX_ERR"
	      ).split(" ")
	      , file_ex_code = file_ex_codes.length
	      , real_URL = view.URL || view.webkitURL || view
	      , real_create_object_URL = real_URL.createObjectURL
	      , real_revoke_object_URL = real_URL.revokeObjectURL
	      , URL = real_URL
	      , btoa = view.btoa
	      , atob = view.atob
	
	      , ArrayBuffer = view.ArrayBuffer
	      , Uint8Array = view.Uint8Array
	
	      , origin = /^[\w-]+:\/*\[?[\w\.:-]+\]?(?::[0-9]+)?/
	    ;
	    FakeBlob.fake = FB_proto.fake = true;
	    while (file_ex_code--) {
	      FileException.prototype[file_ex_codes[file_ex_code]] = file_ex_code + 1;
	    }
	    // Polyfill URL
	    if (!real_URL.createObjectURL) {
	      URL = view.URL = function(uri) {
	        var
	            uri_info = document.createElementNS("http://www.w3.org/1999/xhtml", "a")
	          , uri_origin
	        ;
	        uri_info.href = uri;
	        if (!("origin" in uri_info)) {
	          if (uri_info.protocol.toLowerCase() === "data:") {
	            uri_info.origin = null;
	          } else {
	            uri_origin = uri.match(origin);
	            uri_info.origin = uri_origin && uri_origin[1];
	          }
	        }
	        return uri_info;
	      };
	    }
	    URL.createObjectURL = function(blob) {
	      var
	          type = blob.type
	        , data_URI_header
	      ;
	      if (type === null) {
	        type = "application/octet-stream";
	      }
	      if (blob instanceof FakeBlob) {
	        data_URI_header = "data:" + type;
	        if (blob.encoding === "base64") {
	          return data_URI_header + ";base64," + blob.data;
	        } else if (blob.encoding === "URI") {
	          return data_URI_header + "," + decodeURIComponent(blob.data);
	        } if (btoa) {
	          return data_URI_header + ";base64," + btoa(blob.data);
	        } else {
	          return data_URI_header + "," + encodeURIComponent(blob.data);
	        }
	      } else if (real_create_object_URL) {
	        return real_create_object_URL.call(real_URL, blob);
	      }
	    };
	    URL.revokeObjectURL = function(object_URL) {
	      if (object_URL.substring(0, 5) !== "data:" && real_revoke_object_URL) {
	        real_revoke_object_URL.call(real_URL, object_URL);
	      }
	    };
	    FBB_proto.append = function(data/*, endings*/) {
	      var bb = this.data;
	      // decode data to a binary string
	      if (Uint8Array && (data instanceof ArrayBuffer || data instanceof Uint8Array)) {
	        var
	            str = ""
	          , buf = new Uint8Array(data)
	          , i = 0
	          , buf_len = buf.length
	        ;
	        for (; i < buf_len; i++) {
	          str += String.fromCharCode(buf[i]);
	        }
	        bb.push(str);
	      } else if (get_class(data) === "Blob" || get_class(data) === "File") {
	        if (FileReaderSync) {
	          var fr = new FileReaderSync;
	          bb.push(fr.readAsBinaryString(data));
	        } else {
	          // async FileReader won't work as BlobBuilder is sync
	          throw new FileException("NOT_READABLE_ERR");
	        }
	      } else if (data instanceof FakeBlob) {
	        if (data.encoding === "base64" && atob) {
	          bb.push(atob(data.data));
	        } else if (data.encoding === "URI") {
	          bb.push(decodeURIComponent(data.data));
	        } else if (data.encoding === "raw") {
	          bb.push(data.data);
	        }
	      } else {
	        if (typeof data !== "string") {
	          data += ""; // convert unsupported types to strings
	        }
	        // decode UTF-16 to binary string
	        bb.push(unescape(encodeURIComponent(data)));
	      }
	    };
	    FBB_proto.getBlob = function(type) {
	      if (!arguments.length) {
	        type = null;
	      }
	      return new FakeBlob(this.data.join(""), type, "raw");
	    };
	    FBB_proto.toString = function() {
	      return "[object BlobBuilder]";
	    };
	    FB_proto.slice = function(start, end, type) {
	      var args = arguments.length;
	      if (args < 3) {
	        type = null;
	      }
	      return new FakeBlob(
	          this.data.slice(start, args > 1 ? end : this.data.length)
	        , type
	        , this.encoding
	      );
	    };
	    FB_proto.toString = function() {
	      return "[object Blob]";
	    };
	    FB_proto.close = function() {
	      this.size = 0;
	      delete this.data;
	    };
	    return FakeBlobBuilder;
	  }(view));
	
	  view.Blob = function(blobParts, options) {
	    var type = options ? (options.type || "") : "";
	    var builder = new BlobBuilder();
	    if (blobParts) {
	      for (var i = 0, len = blobParts.length; i < len; i++) {
	        if (Uint8Array && blobParts[i] instanceof Uint8Array) {
	          builder.append(blobParts[i].buffer);
	        }
	        else {
	          builder.append(blobParts[i]);
	        }
	      }
	    }
	    var blob = builder.getBlob(type);
	    if (!blob.slice && blob.webkitSlice) {
	      blob.slice = blob.webkitSlice;
	    }
	    return blob;
	  };
	
	  var getPrototypeOf = Object.getPrototypeOf || function(object) {
	    return object.__proto__;
	  };
	  view.Blob.prototype = getPrototypeOf(new view.Blob());
	}(typeof self !== "undefined" && self || typeof window !== "undefined" && window || this.content || this));
	
	(function (root, factory) {
	    'use strict';
	    var isElectron = typeof module === 'object' && process && process.versions && process.versions.electron;
	    if (!isElectron && typeof module === 'object') {
	        module.exports = factory;
	    } else if (true) {
	        !(__WEBPACK_AMD_DEFINE_RESULT__ = function () {
	            return factory;
	        }.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	    } else {
	        root.MediumEditor = factory;
	    }
	}(this, function () {
	
	    'use strict';
	
	function MediumEditor(elements, options) {
	    'use strict';
	    return this.init(elements, options);
	}
	
	MediumEditor.extensions = {};
	/*jshint unused: true */
	(function (window) {
	    'use strict';
	
	    function copyInto(overwrite, dest) {
	        var prop,
	            sources = Array.prototype.slice.call(arguments, 2);
	        dest = dest || {};
	        for (var i = 0; i < sources.length; i++) {
	            var source = sources[i];
	            if (source) {
	                for (prop in source) {
	                    if (source.hasOwnProperty(prop) &&
	                        typeof source[prop] !== 'undefined' &&
	                        (overwrite || dest.hasOwnProperty(prop) === false)) {
	                        dest[prop] = source[prop];
	                    }
	                }
	            }
	        }
	        return dest;
	    }
	
	    // https://developer.mozilla.org/en-US/docs/Web/API/Node/contains
	    // Some browsers (including phantom) don't return true for Node.contains(child)
	    // if child is a text node.  Detect these cases here and use a fallback
	    // for calls to Util.isDescendant()
	    var nodeContainsWorksWithTextNodes = false;
	    try {
	        var testParent = document.createElement('div'),
	            testText = document.createTextNode(' ');
	        testParent.appendChild(testText);
	        nodeContainsWorksWithTextNodes = testParent.contains(testText);
	    } catch (exc) {}
	
	    var Util = {
	
	        // http://stackoverflow.com/questions/17907445/how-to-detect-ie11#comment30165888_17907562
	        // by rg89
	        isIE: ((navigator.appName === 'Microsoft Internet Explorer') || ((navigator.appName === 'Netscape') && (new RegExp('Trident/.*rv:([0-9]{1,}[.0-9]{0,})').exec(navigator.userAgent) !== null))),
	
	        isEdge: (/Edge\/\d+/).exec(navigator.userAgent) !== null,
	
	        // if firefox
	        isFF: (navigator.userAgent.toLowerCase().indexOf('firefox') > -1),
	
	        // http://stackoverflow.com/a/11752084/569101
	        isMac: (window.navigator.platform.toUpperCase().indexOf('MAC') >= 0),
	
	        // https://github.com/jashkenas/underscore
	        // Lonely letter MUST USE the uppercase code
	        keyCode: {
	            BACKSPACE: 8,
	            TAB: 9,
	            ENTER: 13,
	            ESCAPE: 27,
	            SPACE: 32,
	            DELETE: 46,
	            K: 75, // K keycode, and not k
	            M: 77,
	            V: 86
	        },
	
	        /**
	         * Returns true if it's metaKey on Mac, or ctrlKey on non-Mac.
	         * See #591
	         */
	        isMetaCtrlKey: function (event) {
	            if ((Util.isMac && event.metaKey) || (!Util.isMac && event.ctrlKey)) {
	                return true;
	            }
	
	            return false;
	        },
	
	        /**
	         * Returns true if the key associated to the event is inside keys array
	         *
	         * @see : https://github.com/jquery/jquery/blob/0705be475092aede1eddae01319ec931fb9c65fc/src/event.js#L473-L484
	         * @see : http://stackoverflow.com/q/4471582/569101
	         */
	        isKey: function (event, keys) {
	            var keyCode = Util.getKeyCode(event);
	
	            // it's not an array let's just compare strings!
	            if (false === Array.isArray(keys)) {
	                return keyCode === keys;
	            }
	
	            if (-1 === keys.indexOf(keyCode)) {
	                return false;
	            }
	
	            return true;
	        },
	
	        getKeyCode: function (event) {
	            var keyCode = event.which;
	
	            // getting the key code from event
	            if (null === keyCode) {
	                keyCode = event.charCode !== null ? event.charCode : event.keyCode;
	            }
	
	            return keyCode;
	        },
	
	        blockContainerElementNames: [
	            // elements our editor generates
	            'p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'blockquote', 'pre', 'ul', 'li', 'ol',
	            // all other known block elements
	            'address', 'article', 'aside', 'audio', 'canvas', 'dd', 'dl', 'dt', 'fieldset',
	            'figcaption', 'figure', 'footer', 'form', 'header', 'hgroup', 'main', 'nav',
	            'noscript', 'output', 'section', 'video',
	            'table', 'thead', 'tbody', 'tfoot', 'tr', 'th', 'td'
	        ],
	
	        emptyElementNames: ['br', 'col', 'colgroup', 'hr', 'img', 'input', 'source', 'wbr'],
	
	        extend: function extend(/* dest, source1, source2, ...*/) {
	            var args = [true].concat(Array.prototype.slice.call(arguments));
	            return copyInto.apply(this, args);
	        },
	
	        defaults: function defaults(/*dest, source1, source2, ...*/) {
	            var args = [false].concat(Array.prototype.slice.call(arguments));
	            return copyInto.apply(this, args);
	        },
	
	        /*
	         * Create a link around the provided text nodes which must be adjacent to each other and all be
	         * descendants of the same closest block container. If the preconditions are not met, unexpected
	         * behavior will result.
	         */
	        createLink: function (document, textNodes, href, target) {
	            var anchor = document.createElement('a');
	            Util.moveTextRangeIntoElement(textNodes[0], textNodes[textNodes.length - 1], anchor);
	            anchor.setAttribute('href', href);
	            if (target) {
	                anchor.setAttribute('target', target);
	            }
	            return anchor;
	        },
	
	        /*
	         * Given the provided match in the format {start: 1, end: 2} where start and end are indices into the
	         * textContent of the provided element argument, modify the DOM inside element to ensure that the text
	         * identified by the provided match can be returned as text nodes that contain exactly that text, without
	         * any additional text at the beginning or end of the returned array of adjacent text nodes.
	         *
	         * The only DOM manipulation performed by this function is splitting the text nodes, non-text nodes are
	         * not affected in any way.
	         */
	        findOrCreateMatchingTextNodes: function (document, element, match) {
	            var treeWalker = document.createTreeWalker(element, NodeFilter.SHOW_ALL, null, false),
	                matchedNodes = [],
	                currentTextIndex = 0,
	                startReached = false,
	                currentNode = null,
	                newNode = null;
	
	            while ((currentNode = treeWalker.nextNode()) !== null) {
	                if (currentNode.nodeType > 3) {
	                    continue;
	                } else if (currentNode.nodeType === 3) {
	                    if (!startReached && match.start < (currentTextIndex + currentNode.nodeValue.length)) {
	                        startReached = true;
	                        newNode = Util.splitStartNodeIfNeeded(currentNode, match.start, currentTextIndex);
	                    }
	                    if (startReached) {
	                        Util.splitEndNodeIfNeeded(currentNode, newNode, match.end, currentTextIndex);
	                    }
	                    if (startReached && currentTextIndex === match.end) {
	                        break; // Found the node(s) corresponding to the link. Break out and move on to the next.
	                    } else if (startReached && currentTextIndex > (match.end + 1)) {
	                        throw new Error('PerformLinking overshot the target!'); // should never happen...
	                    }
	
	                    if (startReached) {
	                        matchedNodes.push(newNode || currentNode);
	                    }
	
	                    currentTextIndex += currentNode.nodeValue.length;
	                    if (newNode !== null) {
	                        currentTextIndex += newNode.nodeValue.length;
	                        // Skip the newNode as we'll already have pushed it to the matches
	                        treeWalker.nextNode();
	                    }
	                    newNode = null;
	                } else if (currentNode.tagName.toLowerCase() === 'img') {
	                    if (!startReached && (match.start <= currentTextIndex)) {
	                        startReached = true;
	                    }
	                    if (startReached) {
	                        matchedNodes.push(currentNode);
	                    }
	                }
	            }
	            return matchedNodes;
	        },
	
	        /*
	         * Given the provided text node and text coordinates, split the text node if needed to make it align
	         * precisely with the coordinates.
	         *
	         * This function is intended to be called from Util.findOrCreateMatchingTextNodes.
	         */
	        splitStartNodeIfNeeded: function (currentNode, matchStartIndex, currentTextIndex) {
	            if (matchStartIndex !== currentTextIndex) {
	                return currentNode.splitText(matchStartIndex - currentTextIndex);
	            }
	            return null;
	        },
	
	        /*
	         * Given the provided text node and text coordinates, split the text node if needed to make it align
	         * precisely with the coordinates. The newNode argument should from the result of Util.splitStartNodeIfNeeded,
	         * if that function has been called on the same currentNode.
	         *
	         * This function is intended to be called from Util.findOrCreateMatchingTextNodes.
	         */
	        splitEndNodeIfNeeded: function (currentNode, newNode, matchEndIndex, currentTextIndex) {
	            var textIndexOfEndOfFarthestNode,
	                endSplitPoint;
	            textIndexOfEndOfFarthestNode = currentTextIndex + (newNode || currentNode).nodeValue.length +
	                    (newNode ? currentNode.nodeValue.length : 0) -
	                    1;
	            endSplitPoint = (newNode || currentNode).nodeValue.length -
	                    (textIndexOfEndOfFarthestNode + 1 - matchEndIndex);
	            if (textIndexOfEndOfFarthestNode >= matchEndIndex &&
	                    currentTextIndex !== textIndexOfEndOfFarthestNode &&
	                    endSplitPoint !== 0) {
	                (newNode || currentNode).splitText(endSplitPoint);
	            }
	        },
	
	        /*
	        * Take an element, and break up all of its text content into unique pieces such that:
	         * 1) All text content of the elements are in separate blocks. No piece of text content should span
	         *    across multiple blocks. This means no element return by this function should have
	         *    any blocks as children.
	         * 2) The union of the textcontent of all of the elements returned here covers all
	         *    of the text within the element.
	         *
	         *
	         * EXAMPLE:
	         * In the event that we have something like:
	         *
	         * <blockquote>
	         *   <p>Some Text</p>
	         *   <ol>
	         *     <li>List Item 1</li>
	         *     <li>List Item 2</li>
	         *   </ol>
	         * </blockquote>
	         *
	         * This function would return these elements as an array:
	         *   [ <p>Some Text</p>, <li>List Item 1</li>, <li>List Item 2</li> ]
	         *
	         * Since the <blockquote> and <ol> elements contain blocks within them they are not returned.
	         * Since the <p> and <li>'s don't contain block elements and cover all the text content of the
	         * <blockquote> container, they are the elements returned.
	         */
	        splitByBlockElements: function (element) {
	            if (element.nodeType !== 3 && element.nodeType !== 1) {
	                return [];
	            }
	
	            var toRet = [],
	                blockElementQuery = MediumEditor.util.blockContainerElementNames.join(',');
	
	            if (element.nodeType === 3 || element.querySelectorAll(blockElementQuery).length === 0) {
	                return [element];
	            }
	
	            for (var i = 0; i < element.childNodes.length; i++) {
	                var child = element.childNodes[i];
	                if (child.nodeType === 3) {
	                    toRet.push(child);
	                } else if (child.nodeType === 1) {
	                    var blockElements = child.querySelectorAll(blockElementQuery);
	                    if (blockElements.length === 0) {
	                        toRet.push(child);
	                    } else {
	                        toRet = toRet.concat(MediumEditor.util.splitByBlockElements(child));
	                    }
	                }
	            }
	
	            return toRet;
	        },
	
	        // Find the next node in the DOM tree that represents any text that is being
	        // displayed directly next to the targetNode (passed as an argument)
	        // Text that appears directly next to the current node can be:
	        //  - A sibling text node
	        //  - A descendant of a sibling element
	        //  - A sibling text node of an ancestor
	        //  - A descendant of a sibling element of an ancestor
	        findAdjacentTextNodeWithContent: function findAdjacentTextNodeWithContent(rootNode, targetNode, ownerDocument) {
	            var pastTarget = false,
	                nextNode,
	                nodeIterator = ownerDocument.createNodeIterator(rootNode, NodeFilter.SHOW_TEXT, null, false);
	
	            // Use a native NodeIterator to iterate over all the text nodes that are descendants
	            // of the rootNode.  Once past the targetNode, choose the first non-empty text node
	            nextNode = nodeIterator.nextNode();
	            while (nextNode) {
	                if (nextNode === targetNode) {
	                    pastTarget = true;
	                } else if (pastTarget) {
	                    if (nextNode.nodeType === 3 && nextNode.nodeValue && nextNode.nodeValue.trim().length > 0) {
	                        break;
	                    }
	                }
	                nextNode = nodeIterator.nextNode();
	            }
	
	            return nextNode;
	        },
	
	        // Find an element's previous sibling within a medium-editor element
	        // If one doesn't exist, find the closest ancestor's previous sibling
	        findPreviousSibling: function (node) {
	            if (!node || Util.isMediumEditorElement(node)) {
	                return false;
	            }
	
	            var previousSibling = node.previousSibling;
	            while (!previousSibling && !Util.isMediumEditorElement(node.parentNode)) {
	                node = node.parentNode;
	                previousSibling = node.previousSibling;
	            }
	
	            return previousSibling;
	        },
	
	        isDescendant: function isDescendant(parent, child, checkEquality) {
	            if (!parent || !child) {
	                return false;
	            }
	            if (parent === child) {
	                return !!checkEquality;
	            }
	            // If parent is not an element, it can't have any descendants
	            if (parent.nodeType !== 1) {
	                return false;
	            }
	            if (nodeContainsWorksWithTextNodes || child.nodeType !== 3) {
	                return parent.contains(child);
	            }
	            var node = child.parentNode;
	            while (node !== null) {
	                if (node === parent) {
	                    return true;
	                }
	                node = node.parentNode;
	            }
	            return false;
	        },
	
	        // https://github.com/jashkenas/underscore
	        isElement: function isElement(obj) {
	            return !!(obj && obj.nodeType === 1);
	        },
	
	        // https://github.com/jashkenas/underscore
	        throttle: function (func, wait) {
	            var THROTTLE_INTERVAL = 50,
	                context,
	                args,
	                result,
	                timeout = null,
	                previous = 0,
	                later = function () {
	                    previous = Date.now();
	                    timeout = null;
	                    result = func.apply(context, args);
	                    if (!timeout) {
	                        context = args = null;
	                    }
	                };
	
	            if (!wait && wait !== 0) {
	                wait = THROTTLE_INTERVAL;
	            }
	
	            return function () {
	                var now = Date.now(),
	                    remaining = wait - (now - previous);
	
	                context = this;
	                args = arguments;
	                if (remaining <= 0 || remaining > wait) {
	                    if (timeout) {
	                        clearTimeout(timeout);
	                        timeout = null;
	                    }
	                    previous = now;
	                    result = func.apply(context, args);
	                    if (!timeout) {
	                        context = args = null;
	                    }
	                } else if (!timeout) {
	                    timeout = setTimeout(later, remaining);
	                }
	                return result;
	            };
	        },
	
	        traverseUp: function (current, testElementFunction) {
	            if (!current) {
	                return false;
	            }
	
	            do {
	                if (current.nodeType === 1) {
	                    if (testElementFunction(current)) {
	                        return current;
	                    }
	                    // do not traverse upwards past the nearest containing editor
	                    if (Util.isMediumEditorElement(current)) {
	                        return false;
	                    }
	                }
	
	                current = current.parentNode;
	            } while (current);
	
	            return false;
	        },
	
	        htmlEntities: function (str) {
	            // converts special characters (like <) into their escaped/encoded values (like &lt;).
	            // This allows you to show to display the string without the browser reading it as HTML.
	            return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
	        },
	
	        // http://stackoverflow.com/questions/6690752/insert-html-at-caret-in-a-contenteditable-div
	        insertHTMLCommand: function (doc, html) {
	            var selection, range, el, fragment, node, lastNode, toReplace,
	                res = false,
	                ecArgs = ['insertHTML', false, html];
	
	            /* Edge's implementation of insertHTML is just buggy right now:
	             * - Doesn't allow leading white space at the beginning of an element
	             * - Found a case when a <font size="2"> tag was inserted when calling alignCenter inside a blockquote
	             *
	             * There are likely other bugs, these are just the ones we found so far.
	             * For now, let's just use the same fallback we did for IE
	             */
	            if (!MediumEditor.util.isEdge && doc.queryCommandSupported('insertHTML')) {
	                try {
	                    return doc.execCommand.apply(doc, ecArgs);
	                } catch (ignore) {}
	            }
	
	            selection = doc.getSelection();
	            if (selection.rangeCount) {
	                range = selection.getRangeAt(0);
	                toReplace = range.commonAncestorContainer;
	
	                // https://github.com/yabwe/medium-editor/issues/748
	                // If the selection is an empty editor element, create a temporary text node inside of the editor
	                // and select it so that we don't delete the editor element
	                if (Util.isMediumEditorElement(toReplace) && !toReplace.firstChild) {
	                    range.selectNode(toReplace.appendChild(doc.createTextNode('')));
	                } else if ((toReplace.nodeType === 3 && range.startOffset === 0 && range.endOffset === toReplace.nodeValue.length) ||
	                        (toReplace.nodeType !== 3 && toReplace.innerHTML === range.toString())) {
	                    // Ensure range covers maximum amount of nodes as possible
	                    // By moving up the DOM and selecting ancestors whose only child is the range
	                    while (!Util.isMediumEditorElement(toReplace) &&
	                            toReplace.parentNode &&
	                            toReplace.parentNode.childNodes.length === 1 &&
	                            !Util.isMediumEditorElement(toReplace.parentNode)) {
	                        toReplace = toReplace.parentNode;
	                    }
	                    range.selectNode(toReplace);
	                }
	                range.deleteContents();
	
	                el = doc.createElement('div');
	                el.innerHTML = html;
	                fragment = doc.createDocumentFragment();
	                while (el.firstChild) {
	                    node = el.firstChild;
	                    lastNode = fragment.appendChild(node);
	                }
	                range.insertNode(fragment);
	
	                // Preserve the selection:
	                if (lastNode) {
	                    range = range.cloneRange();
	                    range.setStartAfter(lastNode);
	                    range.collapse(true);
	                    MediumEditor.selection.selectRange(doc, range);
	                }
	                res = true;
	            }
	
	            // https://github.com/yabwe/medium-editor/issues/992
	            // If we're monitoring calls to execCommand, notify listeners as if a real call had happened
	            if (doc.execCommand.callListeners) {
	                doc.execCommand.callListeners(ecArgs, res);
	            }
	            return res;
	        },
	
	        execFormatBlock: function (doc, tagName) {
	            // Get the top level block element that contains the selection
	            var blockContainer = Util.getTopBlockContainer(MediumEditor.selection.getSelectionStart(doc)),
	                childNodes;
	
	            // Special handling for blockquote
	            if (tagName === 'blockquote') {
	                if (blockContainer) {
	                    childNodes = Array.prototype.slice.call(blockContainer.childNodes);
	                    // Check if the blockquote has a block element as a child (nested blocks)
	                    if (childNodes.some(function (childNode) {
	                        return Util.isBlockContainer(childNode);
	                    })) {
	                        // FF handles blockquote differently on formatBlock
	                        // allowing nesting, we need to use outdent
	                        // https://developer.mozilla.org/en-US/docs/Rich-Text_Editing_in_Mozilla
	                        return doc.execCommand('outdent', false, null);
	                    }
	                }
	
	                // When IE blockquote needs to be called as indent
	                // http://stackoverflow.com/questions/1816223/rich-text-editor-with-blockquote-function/1821777#1821777
	                if (Util.isIE) {
	                    return doc.execCommand('indent', false, tagName);
	                }
	            }
	
	            // If the blockContainer is already the element type being passed in
	            // treat it as 'undo' formatting and just convert it to a <p>
	            if (blockContainer && tagName === blockContainer.nodeName.toLowerCase()) {
	                tagName = 'p';
	            }
	
	            // When IE we need to add <> to heading elements
	            // http://stackoverflow.com/questions/10741831/execcommand-formatblock-headings-in-ie
	            if (Util.isIE) {
	                tagName = '<' + tagName + '>';
	            }
	
	            // When FF, IE and Edge, we have to handle blockquote node seperately as 'formatblock' does not work.
	            // https://developer.mozilla.org/en-US/docs/Web/API/Document/execCommand#Commands
	            if (blockContainer && blockContainer.nodeName.toLowerCase() === 'blockquote') {
	                // For IE, just use outdent
	                if (Util.isIE && tagName === '<p>') {
	                    return doc.execCommand('outdent', false, tagName);
	                }
	
	                // For Firefox and Edge, make sure there's a nested block element before calling outdent
	                if ((Util.isFF || Util.isEdge) && tagName === 'p') {
	                    childNodes = Array.prototype.slice.call(blockContainer.childNodes);
	                    // If there are some non-block elements we need to wrap everything in a <p> before we outdent
	                    if (childNodes.some(function (childNode) {
	                        return !Util.isBlockContainer(childNode);
	                    })) {
	                        doc.execCommand('formatBlock', false, tagName);
	                    }
	                    return doc.execCommand('outdent', false, tagName);
	                }
	            }
	
	            return doc.execCommand('formatBlock', false, tagName);
	        },
	
	        /**
	         * Set target to blank on the given el element
	         *
	         * TODO: not sure if this should be here
	         *
	         * When creating a link (using core -> createLink) the selection returned by Firefox will be the parent of the created link
	         * instead of the created link itself (as it is for Chrome for example), so we retrieve all "a" children to grab the good one by
	         * using `anchorUrl` to ensure that we are adding target="_blank" on the good one.
	         * This isn't a bulletproof solution anyway ..
	         */
	        setTargetBlank: function (el, anchorUrl) {
	            var i, url = anchorUrl || false;
	            if (el.nodeName.toLowerCase() === 'a') {
	                el.target = '_blank';
	            } else {
	                el = el.getElementsByTagName('a');
	
	                for (i = 0; i < el.length; i += 1) {
	                    if (false === url || url === el[i].attributes.href.value) {
	                        el[i].target = '_blank';
	                    }
	                }
	            }
	        },
	
	        /*
	         * this function is called to explicitly remove the target='_blank' as FF holds on to _blank value even
	         * after unchecking the checkbox on anchor form
	         */
	        removeTargetBlank: function (el, anchorUrl) {
	            var i;
	            if (el.nodeName.toLowerCase() === 'a') {
	                el.removeAttribute('target');
	            } else {
	                el = el.getElementsByTagName('a');
	
	                for (i = 0; i < el.length; i += 1) {
	                    if (anchorUrl === el[i].attributes.href.value) {
	                        el[i].removeAttribute('target');
	                    }
	                }
	            }
	        },
	
	        addClassToAnchors: function (el, buttonClass) {
	            var classes = buttonClass.split(' '),
	                i,
	                j;
	            if (el.nodeName.toLowerCase() === 'a') {
	                for (j = 0; j < classes.length; j += 1) {
	                    el.classList.add(classes[j]);
	                }
	            } else {
	                el = el.getElementsByTagName('a');
	                for (i = 0; i < el.length; i += 1) {
	                    for (j = 0; j < classes.length; j += 1) {
	                        el[i].classList.add(classes[j]);
	                    }
	                }
	            }
	        },
	
	        isListItem: function (node) {
	            if (!node) {
	                return false;
	            }
	            if (node.nodeName.toLowerCase() === 'li') {
	                return true;
	            }
	
	            var parentNode = node.parentNode,
	                tagName = parentNode.nodeName.toLowerCase();
	            while (tagName === 'li' || (!Util.isBlockContainer(parentNode) && tagName !== 'div')) {
	                if (tagName === 'li') {
	                    return true;
	                }
	                parentNode = parentNode.parentNode;
	                if (parentNode) {
	                    tagName = parentNode.nodeName.toLowerCase();
	                } else {
	                    return false;
	                }
	            }
	            return false;
	        },
	
	        cleanListDOM: function (ownerDocument, element) {
	            if (element.nodeName.toLowerCase() !== 'li') {
	                return;
	            }
	
	            var list = element.parentElement;
	
	            if (list.parentElement.nodeName.toLowerCase() === 'p') { // yes we need to clean up
	                Util.unwrap(list.parentElement, ownerDocument);
	
	                // move cursor at the end of the text inside the list
	                // for some unknown reason, the cursor is moved to end of the "visual" line
	                MediumEditor.selection.moveCursor(ownerDocument, element.firstChild, element.firstChild.textContent.length);
	            }
	        },
	
	        /* splitDOMTree
	         *
	         * Given a root element some descendant element, split the root element
	         * into its own element containing the descendant element and all elements
	         * on the left or right side of the descendant ('right' is default)
	         *
	         * example:
	         *
	         *         <div>
	         *      /    |   \
	         *  <span> <span> <span>
	         *   / \    / \    / \
	         *  1   2  3   4  5   6
	         *
	         *  If I wanted to split this tree given the <div> as the root and "4" as the leaf
	         *  the result would be (the prime ' marks indicates nodes that are created as clones):
	         *
	         *   SPLITTING OFF 'RIGHT' TREE       SPLITTING OFF 'LEFT' TREE
	         *
	         *     <div>            <div>'              <div>'      <div>
	         *      / \              / \                 / \          |
	         * <span> <span>   <span>' <span>       <span> <span>   <span>
	         *   / \    |        |      / \           /\     /\       /\
	         *  1   2   3        4     5   6         1  2   3  4     5  6
	         *
	         *  The above example represents splitting off the 'right' or 'left' part of a tree, where
	         *  the <div>' would be returned as an element not appended to the DOM, and the <div>
	         *  would remain in place where it was
	         *
	        */
	        splitOffDOMTree: function (rootNode, leafNode, splitLeft) {
	            var splitOnNode = leafNode,
	                createdNode = null,
	                splitRight = !splitLeft;
	
	            // loop until we hit the root
	            while (splitOnNode !== rootNode) {
	                var currParent = splitOnNode.parentNode,
	                    newParent = currParent.cloneNode(false),
	                    targetNode = (splitRight ? splitOnNode : currParent.firstChild),
	                    appendLast;
	
	                // Create a new parent element which is a clone of the current parent
	                if (createdNode) {
	                    if (splitRight) {
	                        // If we're splitting right, add previous created element before siblings
	                        newParent.appendChild(createdNode);
	                    } else {
	                        // If we're splitting left, add previous created element last
	                        appendLast = createdNode;
	                    }
	                }
	                createdNode = newParent;
	
	                while (targetNode) {
	                    var sibling = targetNode.nextSibling;
	                    // Special handling for the 'splitNode'
	                    if (targetNode === splitOnNode) {
	                        if (!targetNode.hasChildNodes()) {
	                            targetNode.parentNode.removeChild(targetNode);
	                        } else {
	                            // For the node we're splitting on, if it has children, we need to clone it
	                            // and not just move it
	                            targetNode = targetNode.cloneNode(false);
	                        }
	                        // If the resulting split node has content, add it
	                        if (targetNode.textContent) {
	                            createdNode.appendChild(targetNode);
	                        }
	
	                        targetNode = (splitRight ? sibling : null);
	                    } else {
	                        // For general case, just remove the element and only
	                        // add it to the split tree if it contains something
	                        targetNode.parentNode.removeChild(targetNode);
	                        if (targetNode.hasChildNodes() || targetNode.textContent) {
	                            createdNode.appendChild(targetNode);
	                        }
	
	                        targetNode = sibling;
	                    }
	                }
	
	                // If we had an element we wanted to append at the end, do that now
	                if (appendLast) {
	                    createdNode.appendChild(appendLast);
	                }
	
	                splitOnNode = currParent;
	            }
	
	            return createdNode;
	        },
	
	        moveTextRangeIntoElement: function (startNode, endNode, newElement) {
	            if (!startNode || !endNode) {
	                return false;
	            }
	
	            var rootNode = Util.findCommonRoot(startNode, endNode);
	            if (!rootNode) {
	                return false;
	            }
	
	            if (endNode === startNode) {
	                var temp = startNode.parentNode,
	                    sibling = startNode.nextSibling;
	                temp.removeChild(startNode);
	                newElement.appendChild(startNode);
	                if (sibling) {
	                    temp.insertBefore(newElement, sibling);
	                } else {
	                    temp.appendChild(newElement);
	                }
	                return newElement.hasChildNodes();
	            }
	
	            // create rootChildren array which includes all the children
	            // we care about
	            var rootChildren = [],
	                firstChild,
	                lastChild,
	                nextNode;
	            for (var i = 0; i < rootNode.childNodes.length; i++) {
	                nextNode = rootNode.childNodes[i];
	                if (!firstChild) {
	                    if (Util.isDescendant(nextNode, startNode, true)) {
	                        firstChild = nextNode;
	                    }
	                } else {
	                    if (Util.isDescendant(nextNode, endNode, true)) {
	                        lastChild = nextNode;
	                        break;
	                    } else {
	                        rootChildren.push(nextNode);
	                    }
	                }
	            }
	
	            var afterLast = lastChild.nextSibling,
	                fragment = rootNode.ownerDocument.createDocumentFragment();
	
	            // build up fragment on startNode side of tree
	            if (firstChild === startNode) {
	                firstChild.parentNode.removeChild(firstChild);
	                fragment.appendChild(firstChild);
	            } else {
	                fragment.appendChild(Util.splitOffDOMTree(firstChild, startNode));
	            }
	
	            // add any elements between firstChild & lastChild
	            rootChildren.forEach(function (element) {
	                element.parentNode.removeChild(element);
	                fragment.appendChild(element);
	            });
	
	            // build up fragment on endNode side of the tree
	            if (lastChild === endNode) {
	                lastChild.parentNode.removeChild(lastChild);
	                fragment.appendChild(lastChild);
	            } else {
	                fragment.appendChild(Util.splitOffDOMTree(lastChild, endNode, true));
	            }
	
	            // Add fragment into passed in element
	            newElement.appendChild(fragment);
	
	            if (lastChild.parentNode === rootNode) {
	                // If last child is in the root, insert newElement in front of it
	                rootNode.insertBefore(newElement, lastChild);
	            } else if (afterLast) {
	                // If last child was removed, but it had a sibling, insert in front of it
	                rootNode.insertBefore(newElement, afterLast);
	            } else {
	                // lastChild was removed and was the last actual element just append
	                rootNode.appendChild(newElement);
	            }
	
	            return newElement.hasChildNodes();
	        },
	
	        /* based on http://stackoverflow.com/a/6183069 */
	        depthOfNode: function (inNode) {
	            var theDepth = 0,
	                node = inNode;
	            while (node.parentNode !== null) {
	                node = node.parentNode;
	                theDepth++;
	            }
	            return theDepth;
	        },
	
	        findCommonRoot: function (inNode1, inNode2) {
	            var depth1 = Util.depthOfNode(inNode1),
	                depth2 = Util.depthOfNode(inNode2),
	                node1 = inNode1,
	                node2 = inNode2;
	
	            while (depth1 !== depth2) {
	                if (depth1 > depth2) {
	                    node1 = node1.parentNode;
	                    depth1 -= 1;
	                } else {
	                    node2 = node2.parentNode;
	                    depth2 -= 1;
	                }
	            }
	
	            while (node1 !== node2) {
	                node1 = node1.parentNode;
	                node2 = node2.parentNode;
	            }
	
	            return node1;
	        },
	        /* END - based on http://stackoverflow.com/a/6183069 */
	
	        isElementAtBeginningOfBlock: function (node) {
	            var textVal,
	                sibling;
	            while (!Util.isBlockContainer(node) && !Util.isMediumEditorElement(node)) {
	                sibling = node;
	                while (sibling = sibling.previousSibling) {
	                    textVal = sibling.nodeType === 3 ? sibling.nodeValue : sibling.textContent;
	                    if (textVal.length > 0) {
	                        return false;
	                    }
	                }
	                node = node.parentNode;
	            }
	            return true;
	        },
	
	        isMediumEditorElement: function (element) {
	            return element && element.getAttribute && !!element.getAttribute('data-medium-editor-element');
	        },
	
	        getContainerEditorElement: function (element) {
	            return Util.traverseUp(element, function (node) {
	                return Util.isMediumEditorElement(node);
	            });
	        },
	
	        isBlockContainer: function (element) {
	            return element && element.nodeType !== 3 && Util.blockContainerElementNames.indexOf(element.nodeName.toLowerCase()) !== -1;
	        },
	
	        /* Finds the closest ancestor which is a block container element
	         * If element is within editor element but not within any other block element,
	         * the editor element is returned
	         */
	        getClosestBlockContainer: function (node) {
	            return Util.traverseUp(node, function (node) {
	                return Util.isBlockContainer(node) || Util.isMediumEditorElement(node);
	            });
	        },
	
	        /* Finds highest level ancestor element which is a block container element
	         * If element is within editor element but not within any other block element,
	         * the editor element is returned
	         */
	        getTopBlockContainer: function (element) {
	            var topBlock = Util.isBlockContainer(element) ? element : false;
	            Util.traverseUp(element, function (el) {
	                if (Util.isBlockContainer(el)) {
	                    topBlock = el;
	                }
	                if (!topBlock && Util.isMediumEditorElement(el)) {
	                    topBlock = el;
	                    return true;
	                }
	                return false;
	            });
	            return topBlock;
	        },
	
	        getFirstSelectableLeafNode: function (element) {
	            while (element && element.firstChild) {
	                element = element.firstChild;
	            }
	
	            // We don't want to set the selection to an element that can't have children, this messes up Gecko.
	            element = Util.traverseUp(element, function (el) {
	                return Util.emptyElementNames.indexOf(el.nodeName.toLowerCase()) === -1;
	            });
	            // Selecting at the beginning of a table doesn't work in PhantomJS.
	            if (element.nodeName.toLowerCase() === 'table') {
	                var firstCell = element.querySelector('th, td');
	                if (firstCell) {
	                    element = firstCell;
	                }
	            }
	            return element;
	        },
	
	        // TODO: remove getFirstTextNode AND _getFirstTextNode when jumping in 6.0.0 (no code references)
	        getFirstTextNode: function (element) {
	            Util.warn('getFirstTextNode is deprecated and will be removed in version 6.0.0');
	            return Util._getFirstTextNode(element);
	        },
	
	        _getFirstTextNode: function (element) {
	            if (element.nodeType === 3) {
	                return element;
	            }
	
	            for (var i = 0; i < element.childNodes.length; i++) {
	                var textNode = Util._getFirstTextNode(element.childNodes[i]);
	                if (textNode !== null) {
	                    return textNode;
	                }
	            }
	            return null;
	        },
	
	        ensureUrlHasProtocol: function (url) {
	            if (url.indexOf('://') === -1) {
	                return 'http://' + url;
	            }
	            return url;
	        },
	
	        warn: function () {
	            if (window.console !== undefined && typeof window.console.warn === 'function') {
	                window.console.warn.apply(window.console, arguments);
	            }
	        },
	
	        deprecated: function (oldName, newName, version) {
	            // simple deprecation warning mechanism.
	            var m = oldName + ' is deprecated, please use ' + newName + ' instead.';
	            if (version) {
	                m += ' Will be removed in ' + version;
	            }
	            Util.warn(m);
	        },
	
	        deprecatedMethod: function (oldName, newName, args, version) {
	            // run the replacement and warn when someone calls a deprecated method
	            Util.deprecated(oldName, newName, version);
	            if (typeof this[newName] === 'function') {
	                this[newName].apply(this, args);
	            }
	        },
	
	        cleanupAttrs: function (el, attrs) {
	            attrs.forEach(function (attr) {
	                el.removeAttribute(attr);
	            });
	        },
	
	        cleanupTags: function (el, tags) {
	            tags.forEach(function (tag) {
	                if (el.nodeName.toLowerCase() === tag) {
	                    el.parentNode.removeChild(el);
	                }
	            });
	        },
	
	        // get the closest parent
	        getClosestTag: function (el, tag) {
	            return Util.traverseUp(el, function (element) {
	                return element.nodeName.toLowerCase() === tag.toLowerCase();
	            });
	        },
	
	        unwrap: function (el, doc) {
	            var fragment = doc.createDocumentFragment(),
	                nodes = Array.prototype.slice.call(el.childNodes);
	
	            // cast nodeList to array since appending child
	            // to a different node will alter length of el.childNodes
	            for (var i = 0; i < nodes.length; i++) {
	                fragment.appendChild(nodes[i]);
	            }
	
	            if (fragment.childNodes.length) {
	                el.parentNode.replaceChild(fragment, el);
	            } else {
	                el.parentNode.removeChild(el);
	            }
	        },
	
	        guid: function () {
	            function _s4() {
	                return Math
	                    .floor((1 + Math.random()) * 0x10000)
	                    .toString(16)
	                    .substring(1);
	            }
	
	            return _s4() + _s4() + '-' + _s4() + '-' + _s4() + '-' + _s4() + '-' + _s4() + _s4() + _s4();
	        }
	    };
	
	    MediumEditor.util = Util;
	}(window));
	
	(function () {
	    'use strict';
	
	    var Extension = function (options) {
	        MediumEditor.util.extend(this, options);
	    };
	
	    Extension.extend = function (protoProps) {
	        // magic extender thinger. mostly borrowed from backbone/goog.inherits
	        // place this function on some thing you want extend-able.
	        //
	        // example:
	        //
	        //      function Thing(args){
	        //          this.options = args;
	        //      }
	        //
	        //      Thing.prototype = { foo: "bar" };
	        //      Thing.extend = extenderify;
	        //
	        //      var ThingTwo = Thing.extend({ foo: "baz" });
	        //
	        //      var thingOne = new Thing(); // foo === "bar"
	        //      var thingTwo = new ThingTwo(); // foo === "baz"
	        //
	        //      which seems like some simply shallow copy nonsense
	        //      at first, but a lot more is going on there.
	        //
	        //      passing a `constructor` to the extend props
	        //      will cause the instance to instantiate through that
	        //      instead of the parent's constructor.
	
	        var parent = this,
	            child;
	
	        // The constructor function for the new subclass is either defined by you
	        // (the "constructor" property in your `extend` definition), or defaulted
	        // by us to simply call the parent's constructor.
	
	        if (protoProps && protoProps.hasOwnProperty('constructor')) {
	            child = protoProps.constructor;
	        } else {
	            child = function () {
	                return parent.apply(this, arguments);
	            };
	        }
	
	        // das statics (.extend comes over, so your subclass can have subclasses too)
	        MediumEditor.util.extend(child, parent);
	
	        // Set the prototype chain to inherit from `parent`, without calling
	        // `parent`'s constructor function.
	        var Surrogate = function () {
	            this.constructor = child;
	        };
	        Surrogate.prototype = parent.prototype;
	        child.prototype = new Surrogate();
	
	        if (protoProps) {
	            MediumEditor.util.extend(child.prototype, protoProps);
	        }
	
	        // todo: $super?
	
	        return child;
	    };
	
	    Extension.prototype = {
	        /* init: [function]
	         *
	         * Called by MediumEditor during initialization.
	         * The .base property will already have been set to
	         * current instance of MediumEditor when this is called.
	         * All helper methods will exist as well
	         */
	        init: function () {},
	
	        /* base: [MediumEditor instance]
	         *
	         * If not overriden, this will be set to the current instance
	         * of MediumEditor, before the init method is called
	         */
	        base: undefined,
	
	        /* name: [string]
	         *
	         * 'name' of the extension, used for retrieving the extension.
	         * If not set, MediumEditor will set this to be the key
	         * used when passing the extension into MediumEditor via the
	         * 'extensions' option
	         */
	        name: undefined,
	
	        /* checkState: [function (node)]
	         *
	         * If implemented, this function will be called one or more times
	         * the state of the editor & toolbar are updated.
	         * When the state is updated, the editor does the following:
	         *
	         * 1) Find the parent node containing the current selection
	         * 2) Call checkState on the extension, passing the node as an argument
	         * 3) Get the parent node of the previous node
	         * 4) Repeat steps #2 and #3 until we move outside the parent contenteditable
	         */
	        checkState: undefined,
	
	        /* destroy: [function ()]
	         *
	         * This method should remove any created html, custom event handlers
	         * or any other cleanup tasks that should be performed.
	         * If implemented, this function will be called when MediumEditor's
	         * destroy method has been called.
	         */
	        destroy: undefined,
	
	        /* As alternatives to checkState, these functions provide a more structured
	         * path to updating the state of an extension (usually a button) whenever
	         * the state of the editor & toolbar are updated.
	         */
	
	        /* queryCommandState: [function ()]
	         *
	         * If implemented, this function will be called once on each extension
	         * when the state of the editor/toolbar is being updated.
	         *
	         * If this function returns a non-null value, the extension will
	         * be ignored as the code climbs the dom tree.
	         *
	         * If this function returns true, and the setActive() function is defined
	         * setActive() will be called
	         */
	        queryCommandState: undefined,
	
	        /* isActive: [function ()]
	         *
	         * If implemented, this function will be called when MediumEditor
	         * has determined that this extension is 'active' for the current selection.
	         * This may be called when the editor & toolbar are being updated,
	         * but only if queryCommandState() or isAlreadyApplied() functions
	         * are implemented, and when called, return true.
	         */
	        isActive: undefined,
	
	        /* isAlreadyApplied: [function (node)]
	         *
	         * If implemented, this function is similar to checkState() in
	         * that it will be called repeatedly as MediumEditor moves up
	         * the DOM to update the editor & toolbar after a state change.
	         *
	         * NOTE: This function will NOT be called if checkState() has
	         * been implemented. This function will NOT be called if
	         * queryCommandState() is implemented and returns a non-null
	         * value when called
	         */
	        isAlreadyApplied: undefined,
	
	        /* setActive: [function ()]
	         *
	         * If implemented, this function is called when MediumEditor knows
	         * that this extension is currently enabled.  Currently, this
	         * function is called when updating the editor & toolbar, and
	         * only if queryCommandState() or isAlreadyApplied(node) return
	         * true when called
	         */
	        setActive: undefined,
	
	        /* setInactive: [function ()]
	         *
	         * If implemented, this function is called when MediumEditor knows
	         * that this extension is currently disabled.  Curently, this
	         * is called at the beginning of each state change for
	         * the editor & toolbar. After calling this, MediumEditor
	         * will attempt to update the extension, either via checkState()
	         * or the combination of queryCommandState(), isAlreadyApplied(node),
	         * isActive(), and setActive()
	         */
	        setInactive: undefined,
	
	        /* getInteractionElements: [function ()]
	         *
	         * If the extension renders any elements that the user can interact with,
	         * this method should be implemented and return the root element or an array
	         * containing all of the root elements. MediumEditor will call this function
	         * during interaction to see if the user clicked on something outside of the editor.
	         * The elements are used to check if the target element of a click or
	         * other user event is a descendant of any extension elements.
	         * This way, the editor can also count user interaction within editor elements as
	         * interactions with the editor, and thus not trigger 'blur'
	         */
	        getInteractionElements: undefined,
	
	        /************************ Helpers ************************
	         * The following are helpers that are either set by MediumEditor
	         * during initialization, or are helper methods which either
	         * route calls to the MediumEditor instance or provide common
	         * functionality for all extensions
	         *********************************************************/
	
	        /* window: [Window]
	         *
	         * If not overriden, this will be set to the window object
	         * to be used by MediumEditor and its extensions.  This is
	         * passed via the 'contentWindow' option to MediumEditor
	         * and is the global 'window' object by default
	         */
	        'window': undefined,
	
	        /* document: [Document]
	         *
	         * If not overriden, this will be set to the document object
	         * to be used by MediumEditor and its extensions. This is
	         * passed via the 'ownerDocument' optin to MediumEditor
	         * and is the global 'document' object by default
	         */
	        'document': undefined,
	
	        /* getEditorElements: [function ()]
	         *
	         * Helper function which returns an array containing
	         * all the contenteditable elements for this instance
	         * of MediumEditor
	         */
	        getEditorElements: function () {
	            return this.base.elements;
	        },
	
	        /* getEditorId: [function ()]
	         *
	         * Helper function which returns a unique identifier
	         * for this instance of MediumEditor
	         */
	        getEditorId: function () {
	            return this.base.id;
	        },
	
	        /* getEditorOptions: [function (option)]
	         *
	         * Helper function which returns the value of an option
	         * used to initialize this instance of MediumEditor
	         */
	        getEditorOption: function (option) {
	            return this.base.options[option];
	        }
	    };
	
	    /* List of method names to add to the prototype of Extension
	     * Each of these methods will be defined as helpers that
	     * just call directly into the MediumEditor instance.
	     *
	     * example for 'on' method:
	     * Extension.prototype.on = function () {
	     *     return this.base.on.apply(this.base, arguments);
	     * }
	     */
	    [
	        // general helpers
	        'execAction',
	
	        // event handling
	        'on',
	        'off',
	        'subscribe',
	        'trigger'
	
	    ].forEach(function (helper) {
	        Extension.prototype[helper] = function () {
	            return this.base[helper].apply(this.base, arguments);
	        };
	    });
	
	    MediumEditor.Extension = Extension;
	})();
	
	(function () {
	    'use strict';
	
	    function filterOnlyParentElements(node) {
	        if (MediumEditor.util.isBlockContainer(node)) {
	            return NodeFilter.FILTER_ACCEPT;
	        } else {
	            return NodeFilter.FILTER_SKIP;
	        }
	    }
	
	    var Selection = {
	        findMatchingSelectionParent: function (testElementFunction, contentWindow) {
	            var selection = contentWindow.getSelection(),
	                range,
	                current;
	
	            if (selection.rangeCount === 0) {
	                return false;
	            }
	
	            range = selection.getRangeAt(0);
	            current = range.commonAncestorContainer;
	
	            return MediumEditor.util.traverseUp(current, testElementFunction);
	        },
	
	        getSelectionElement: function (contentWindow) {
	            return this.findMatchingSelectionParent(function (el) {
	                return MediumEditor.util.isMediumEditorElement(el);
	            }, contentWindow);
	        },
	
	        // http://stackoverflow.com/questions/17678843/cant-restore-selection-after-html-modify-even-if-its-the-same-html
	        // Tim Down
	        exportSelection: function (root, doc) {
	            if (!root) {
	                return null;
	            }
	
	            var selectionState = null,
	                selection = doc.getSelection();
	
	            if (selection.rangeCount > 0) {
	                var range = selection.getRangeAt(0),
	                    preSelectionRange = range.cloneRange(),
	                    start;
	
	                preSelectionRange.selectNodeContents(root);
	                preSelectionRange.setEnd(range.startContainer, range.startOffset);
	                start = preSelectionRange.toString().length;
	
	                selectionState = {
	                    start: start,
	                    end: start + range.toString().length
	                };
	
	                // Check to see if the selection starts with any images
	                // if so we need to make sure the the beginning of the selection is
	                // set correctly when importing selection
	                if (this.doesRangeStartWithImages(range, doc)) {
	                    selectionState.startsWithImage = true;
	                }
	
	                // Check to see if the selection has any trailing images
	                // if so, this this means we need to look for them when we import selection
	                var trailingImageCount = this.getTrailingImageCount(root, selectionState, range.endContainer, range.endOffset);
	                if (trailingImageCount) {
	                    selectionState.trailingImageCount = trailingImageCount;
	                }
	
	                // If start = 0 there may still be an empty paragraph before it, but we don't care.
	                if (start !== 0) {
	                    var emptyBlocksIndex = this.getIndexRelativeToAdjacentEmptyBlocks(doc, root, range.startContainer, range.startOffset);
	                    if (emptyBlocksIndex !== -1) {
	                        selectionState.emptyBlocksIndex = emptyBlocksIndex;
	                    }
	                }
	            }
	
	            return selectionState;
	        },
	
	        // http://stackoverflow.com/questions/17678843/cant-restore-selection-after-html-modify-even-if-its-the-same-html
	        // Tim Down
	        //
	        // {object} selectionState - the selection to import
	        // {DOMElement} root - the root element the selection is being restored inside of
	        // {Document} doc - the document to use for managing selection
	        // {boolean} [favorLaterSelectionAnchor] - defaults to false. If true, import the cursor immediately
	        //      subsequent to an anchor tag if it would otherwise be placed right at the trailing edge inside the
	        //      anchor. This cursor positioning, even though visually equivalent to the user, can affect behavior
	        //      in MS IE.
	        importSelection: function (selectionState, root, doc, favorLaterSelectionAnchor) {
	            if (!selectionState || !root) {
	                return;
	            }
	
	            var range = doc.createRange();
	            range.setStart(root, 0);
	            range.collapse(true);
	
	            var node = root,
	                nodeStack = [],
	                charIndex = 0,
	                foundStart = false,
	                foundEnd = false,
	                trailingImageCount = 0,
	                stop = false,
	                nextCharIndex,
	                allowRangeToStartAtEndOfNode = false,
	                lastTextNode = null;
	
	            // When importing selection, the start of the selection may lie at the end of an element
	            // or at the beginning of an element.  Since visually there is no difference between these 2
	            // we will try to move the selection to the beginning of an element since this is generally
	            // what users will expect and it's a more predictable behavior.
	            //
	            // However, there are some specific cases when we don't want to do this:
	            //  1) We're attempting to move the cursor outside of the end of an anchor [favorLaterSelectionAnchor = true]
	            //  2) The selection starts with an image, which is special since an image doesn't have any 'content'
	            //     as far as selection and ranges are concerned
	            //  3) The selection starts after a specified number of empty block elements (selectionState.emptyBlocksIndex)
	            //
	            // For these cases, we want the selection to start at a very specific location, so we should NOT
	            // automatically move the cursor to the beginning of the first actual chunk of text
	            if (favorLaterSelectionAnchor || selectionState.startsWithImage || typeof selectionState.emptyBlocksIndex !== 'undefined') {
	                allowRangeToStartAtEndOfNode = true;
	            }
	
	            while (!stop && node) {
	                // Only iterate over elements and text nodes
	                if (node.nodeType > 3) {
	                    node = nodeStack.pop();
	                    continue;
	                }
	
	                // If we hit a text node, we need to add the amount of characters to the overall count
	                if (node.nodeType === 3 && !foundEnd) {
	                    nextCharIndex = charIndex + node.length;
	                    // Check if we're at or beyond the start of the selection we're importing
	                    if (!foundStart && selectionState.start >= charIndex && selectionState.start <= nextCharIndex) {
	                        // NOTE: We only want to allow a selection to start at the END of an element if
	                        //  allowRangeToStartAtEndOfNode is true
	                        if (allowRangeToStartAtEndOfNode || selectionState.start < nextCharIndex) {
	                            range.setStart(node, selectionState.start - charIndex);
	                            foundStart = true;
	                        }
	                        // We're at the end of a text node where the selection could start but we shouldn't
	                        // make the selection start here because allowRangeToStartAtEndOfNode is false.
	                        // However, we should keep a reference to this node in case there aren't any more
	                        // text nodes after this, so that we have somewhere to import the selection to
	                        else {
	                            lastTextNode = node;
	                        }
	                    }
	                    // We've found the start of the selection, check if we're at or beyond the end of the selection we're importing
	                    if (foundStart && selectionState.end >= charIndex && selectionState.end <= nextCharIndex) {
	                        if (!selectionState.trailingImageCount) {
	                            range.setEnd(node, selectionState.end - charIndex);
	                            stop = true;
	                        } else {
	                            foundEnd = true;
	                        }
	                    }
	                    charIndex = nextCharIndex;
	                } else {
	                    if (selectionState.trailingImageCount && foundEnd) {
	                        if (node.nodeName.toLowerCase() === 'img') {
	                            trailingImageCount++;
	                        }
	                        if (trailingImageCount === selectionState.trailingImageCount) {
	                            // Find which index the image is in its parent's children
	                            var endIndex = 0;
	                            while (node.parentNode.childNodes[endIndex] !== node) {
	                                endIndex++;
	                            }
	                            range.setEnd(node.parentNode, endIndex + 1);
	                            stop = true;
	                        }
	                    }
	
	                    if (!stop && node.nodeType === 1) {
	                        // this is an element
	                        // add all its children to the stack
	                        var i = node.childNodes.length - 1;
	                        while (i >= 0) {
	                            nodeStack.push(node.childNodes[i]);
	                            i -= 1;
	                        }
	                    }
	                }
	
	                if (!stop) {
	                    node = nodeStack.pop();
	                }
	            }
	
	            // If we've gone through the entire text but didn't find the beginning of a text node
	            // to make the selection start at, we should fall back to starting the selection
	            // at the END of the last text node we found
	            if (!foundStart && lastTextNode) {
	                range.setStart(lastTextNode, lastTextNode.length);
	                range.setEnd(lastTextNode, lastTextNode.length);
	            }
	
	            if (typeof selectionState.emptyBlocksIndex !== 'undefined') {
	                range = this.importSelectionMoveCursorPastBlocks(doc, root, selectionState.emptyBlocksIndex, range);
	            }
	
	            // If the selection is right at the ending edge of a link, put it outside the anchor tag instead of inside.
	            if (favorLaterSelectionAnchor) {
	                range = this.importSelectionMoveCursorPastAnchor(selectionState, range);
	            }
	
	            this.selectRange(doc, range);
	        },
	
	        // Utility method called from importSelection only
	        importSelectionMoveCursorPastAnchor: function (selectionState, range) {
	            var nodeInsideAnchorTagFunction = function (node) {
	                return node.nodeName.toLowerCase() === 'a';
	            };
	            if (selectionState.start === selectionState.end &&
	                    range.startContainer.nodeType === 3 &&
	                    range.startOffset === range.startContainer.nodeValue.length &&
	                    MediumEditor.util.traverseUp(range.startContainer, nodeInsideAnchorTagFunction)) {
	                var prevNode = range.startContainer,
	                    currentNode = range.startContainer.parentNode;
	                while (currentNode !== null && currentNode.nodeName.toLowerCase() !== 'a') {
	                    if (currentNode.childNodes[currentNode.childNodes.length - 1] !== prevNode) {
	                        currentNode = null;
	                    } else {
	                        prevNode = currentNode;
	                        currentNode = currentNode.parentNode;
	                    }
	                }
	                if (currentNode !== null && currentNode.nodeName.toLowerCase() === 'a') {
	                    var currentNodeIndex = null;
	                    for (var i = 0; currentNodeIndex === null && i < currentNode.parentNode.childNodes.length; i++) {
	                        if (currentNode.parentNode.childNodes[i] === currentNode) {
	                            currentNodeIndex = i;
	                        }
	                    }
	                    range.setStart(currentNode.parentNode, currentNodeIndex + 1);
	                    range.collapse(true);
	                }
	            }
	            return range;
	        },
	
	        // Uses the emptyBlocksIndex calculated by getIndexRelativeToAdjacentEmptyBlocks
	        // to move the cursor back to the start of the correct paragraph
	        importSelectionMoveCursorPastBlocks: function (doc, root, index, range) {
	            var treeWalker = doc.createTreeWalker(root, NodeFilter.SHOW_ELEMENT, filterOnlyParentElements, false),
	                startContainer = range.startContainer,
	                startBlock,
	                targetNode,
	                currIndex = 0;
	            index = index || 1; // If index is 0, we still want to move to the next block
	
	            // Chrome counts newlines and spaces that separate block elements as actual elements.
	            // If the selection is inside one of these text nodes, and it has a previous sibling
	            // which is a block element, we want the treewalker to start at the previous sibling
	            // and NOT at the parent of the textnode
	            if (startContainer.nodeType === 3 && MediumEditor.util.isBlockContainer(startContainer.previousSibling)) {
	                startBlock = startContainer.previousSibling;
	            } else {
	                startBlock = MediumEditor.util.getClosestBlockContainer(startContainer);
	            }
	
	            // Skip over empty blocks until we hit the block we want the selection to be in
	            while (treeWalker.nextNode()) {
	                if (!targetNode) {
	                    // Loop through all blocks until we hit the starting block element
	                    if (startBlock === treeWalker.currentNode) {
	                        targetNode = treeWalker.currentNode;
	                    }
	                } else {
	                    targetNode = treeWalker.currentNode;
	                    currIndex++;
	                    // We hit the target index, bail
	                    if (currIndex === index) {
	                        break;
	                    }
	                    // If we find a non-empty block, ignore the emptyBlocksIndex and just put selection here
	                    if (targetNode.textContent.length > 0) {
	                        break;
	                    }
	                }
	            }
	
	            if (!targetNode) {
	                targetNode = startBlock;
	            }
	
	            // We're selecting a high-level block node, so make sure the cursor gets moved into the deepest
	            // element at the beginning of the block
	            range.setStart(MediumEditor.util.getFirstSelectableLeafNode(targetNode), 0);
	
	            return range;
	        },
	
	        // Returns -1 unless the cursor is at the beginning of a paragraph/block
	        // If the paragraph/block is preceeded by empty paragraphs/block (with no text)
	        // it will return the number of empty paragraphs before the cursor.
	        // Otherwise, it will return 0, which indicates the cursor is at the beginning
	        // of a paragraph/block, and not at the end of the paragraph/block before it
	        getIndexRelativeToAdjacentEmptyBlocks: function (doc, root, cursorContainer, cursorOffset) {
	            // If there is text in front of the cursor, that means there isn't only empty blocks before it
	            if (cursorContainer.textContent.length > 0 && cursorOffset > 0) {
	                return -1;
	            }
	
	            // Check if the block that contains the cursor has any other text in front of the cursor
	            var node = cursorContainer;
	            if (node.nodeType !== 3) {
	                node = cursorContainer.childNodes[cursorOffset];
	            }
	            if (node) {
	                // The element isn't at the beginning of a block, so it has content before it
	                if (!MediumEditor.util.isElementAtBeginningOfBlock(node)) {
	                    return -1;
	                }
	
	                var previousSibling = MediumEditor.util.findPreviousSibling(node);
	                // If there is no previous sibling, this is the first text element in the editor
	                if (!previousSibling) {
	                    return -1;
	                }
	                // If the previous sibling has text, then there are no empty blocks before this
	                else if (previousSibling.nodeValue) {
	                    return -1;
	                }
	            }
	
	            // Walk over block elements, counting number of empty blocks between last piece of text
	            // and the block the cursor is in
	            var closestBlock = MediumEditor.util.getClosestBlockContainer(cursorContainer),
	                treeWalker = doc.createTreeWalker(root, NodeFilter.SHOW_ELEMENT, filterOnlyParentElements, false),
	                emptyBlocksCount = 0;
	            while (treeWalker.nextNode()) {
	                var blockIsEmpty = treeWalker.currentNode.textContent === '';
	                if (blockIsEmpty || emptyBlocksCount > 0) {
	                    emptyBlocksCount += 1;
	                }
	                if (treeWalker.currentNode === closestBlock) {
	                    return emptyBlocksCount;
	                }
	                if (!blockIsEmpty) {
	                    emptyBlocksCount = 0;
	                }
	            }
	
	            return emptyBlocksCount;
	        },
	
	        // Returns true if the selection range begins with an image tag
	        // Returns false if the range starts with any non empty text nodes
	        doesRangeStartWithImages: function (range, doc) {
	            if (range.startOffset !== 0 || range.startContainer.nodeType !== 1) {
	                return false;
	            }
	
	            if (range.startContainer.nodeName.toLowerCase() === 'img') {
	                return true;
	            }
	
	            var img = range.startContainer.querySelector('img');
	            if (!img) {
	                return false;
	            }
	
	            var treeWalker = doc.createTreeWalker(range.startContainer, NodeFilter.SHOW_ALL, null, false);
	            while (treeWalker.nextNode()) {
	                var next = treeWalker.currentNode;
	                // If we hit the image, then there isn't any text before the image so
	                // the image is at the beginning of the range
	                if (next === img) {
	                    break;
	                }
	                // If we haven't hit the iamge, but found text that contains content
	                // then the range doesn't start with an image
	                if (next.nodeValue) {
	                    return false;
	                }
	            }
	
	            return true;
	        },
	
	        getTrailingImageCount: function (root, selectionState, endContainer, endOffset) {
	            // If the endOffset of a range is 0, the endContainer doesn't contain images
	            // If the endContainer is a text node, there are no trailing images
	            if (endOffset === 0 || endContainer.nodeType !== 1) {
	                return 0;
	            }
	
	            // If the endContainer isn't an image, and doesn't have an image descendants
	            // there are no trailing images
	            if (endContainer.nodeName.toLowerCase() !== 'img' && !endContainer.querySelector('img')) {
	                return 0;
	            }
	
	            var lastNode = endContainer.childNodes[endOffset - 1];
	            while (lastNode.hasChildNodes()) {
	                lastNode = lastNode.lastChild;
	            }
	
	            var node = root,
	                nodeStack = [],
	                charIndex = 0,
	                foundStart = false,
	                foundEnd = false,
	                stop = false,
	                nextCharIndex,
	                trailingImages = 0;
	
	            while (!stop && node) {
	                // Only iterate over elements and text nodes
	                if (node.nodeType > 3) {
	                    node = nodeStack.pop();
	                    continue;
	                }
	
	                if (node.nodeType === 3 && !foundEnd) {
	                    trailingImages = 0;
	                    nextCharIndex = charIndex + node.length;
	                    if (!foundStart && selectionState.start >= charIndex && selectionState.start <= nextCharIndex) {
	                        foundStart = true;
	                    }
	                    if (foundStart && selectionState.end >= charIndex && selectionState.end <= nextCharIndex) {
	                        foundEnd = true;
	                    }
	                    charIndex = nextCharIndex;
	                } else {
	                    if (node.nodeName.toLowerCase() === 'img') {
	                        trailingImages++;
	                    }
	
	                    if (node === lastNode) {
	                        stop = true;
	                    } else if (node.nodeType === 1) {
	                        // this is an element
	                        // add all its children to the stack
	                        var i = node.childNodes.length - 1;
	                        while (i >= 0) {
	                            nodeStack.push(node.childNodes[i]);
	                            i -= 1;
	                        }
	                    }
	                }
	
	                if (!stop) {
	                    node = nodeStack.pop();
	                }
	            }
	
	            return trailingImages;
	        },
	
	        // determine if the current selection contains any 'content'
	        // content being any non-white space text or an image
	        selectionContainsContent: function (doc) {
	            var sel = doc.getSelection();
	
	            // collapsed selection or selection withour range doesn't contain content
	            if (!sel || sel.isCollapsed || !sel.rangeCount) {
	                return false;
	            }
	
	            // if toString() contains any text, the selection contains some content
	            if (sel.toString().trim() !== '') {
	                return true;
	            }
	
	            // if selection contains only image(s), it will return empty for toString()
	            // so check for an image manually
	            var selectionNode = this.getSelectedParentElement(sel.getRangeAt(0));
	            if (selectionNode) {
	                if (selectionNode.nodeName.toLowerCase() === 'img' ||
	                    (selectionNode.nodeType === 1 && selectionNode.querySelector('img'))) {
	                    return true;
	                }
	            }
	
	            return false;
	        },
	
	        selectionInContentEditableFalse: function (contentWindow) {
	            // determine if the current selection is exclusively inside
	            // a contenteditable="false", though treat the case of an
	            // explicit contenteditable="true" inside a "false" as false.
	            var sawtrue,
	                sawfalse = this.findMatchingSelectionParent(function (el) {
	                    var ce = el && el.getAttribute('contenteditable');
	                    if (ce === 'true') {
	                        sawtrue = true;
	                    }
	                    return el.nodeName !== '#text' && ce === 'false';
	                }, contentWindow);
	
	            return !sawtrue && sawfalse;
	        },
	
	        // http://stackoverflow.com/questions/4176923/html-of-selected-text
	        // by Tim Down
	        getSelectionHtml: function getSelectionHtml(doc) {
	            var i,
	                html = '',
	                sel = doc.getSelection(),
	                len,
	                container;
	            if (sel.rangeCount) {
	                container = doc.createElement('div');
	                for (i = 0, len = sel.rangeCount; i < len; i += 1) {
	                    container.appendChild(sel.getRangeAt(i).cloneContents());
	                }
	                html = container.innerHTML;
	            }
	            return html;
	        },
	
	        /**
	         *  Find the caret position within an element irrespective of any inline tags it may contain.
	         *
	         *  @param {DOMElement} An element containing the cursor to find offsets relative to.
	         *  @param {Range} A Range representing cursor position. Will window.getSelection if none is passed.
	         *  @return {Object} 'left' and 'right' attributes contain offsets from begining and end of Element
	         */
	        getCaretOffsets: function getCaretOffsets(element, range) {
	            var preCaretRange, postCaretRange;
	
	            if (!range) {
	                range = window.getSelection().getRangeAt(0);
	            }
	
	            preCaretRange = range.cloneRange();
	            postCaretRange = range.cloneRange();
	
	            preCaretRange.selectNodeContents(element);
	            preCaretRange.setEnd(range.endContainer, range.endOffset);
	
	            postCaretRange.selectNodeContents(element);
	            postCaretRange.setStart(range.endContainer, range.endOffset);
	
	            return {
	                left: preCaretRange.toString().length,
	                right: postCaretRange.toString().length
	            };
	        },
	
	        // http://stackoverflow.com/questions/15867542/range-object-get-selection-parent-node-chrome-vs-firefox
	        rangeSelectsSingleNode: function (range) {
	            var startNode = range.startContainer;
	            return startNode === range.endContainer &&
	                startNode.hasChildNodes() &&
	                range.endOffset === range.startOffset + 1;
	        },
	
	        getSelectedParentElement: function (range) {
	            if (!range) {
	                return null;
	            }
	
	            // Selection encompasses a single element
	            if (this.rangeSelectsSingleNode(range) && range.startContainer.childNodes[range.startOffset].nodeType !== 3) {
	                return range.startContainer.childNodes[range.startOffset];
	            }
	
	            // Selection range starts inside a text node, so get its parent
	            if (range.startContainer.nodeType === 3) {
	                return range.startContainer.parentNode;
	            }
	
	            // Selection starts inside an element
	            return range.startContainer;
	        },
	
	        getSelectedElements: function (doc) {
	            var selection = doc.getSelection(),
	                range,
	                toRet,
	                currNode;
	
	            if (!selection.rangeCount || selection.isCollapsed || !selection.getRangeAt(0).commonAncestorContainer) {
	                return [];
	            }
	
	            range = selection.getRangeAt(0);
	
	            if (range.commonAncestorContainer.nodeType === 3) {
	                toRet = [];
	                currNode = range.commonAncestorContainer;
	                while (currNode.parentNode && currNode.parentNode.childNodes.length === 1) {
	                    toRet.push(currNode.parentNode);
	                    currNode = currNode.parentNode;
	                }
	
	                return toRet;
	            }
	
	            return [].filter.call(range.commonAncestorContainer.getElementsByTagName('*'), function (el) {
	                return (typeof selection.containsNode === 'function') ? selection.containsNode(el, true) : true;
	            });
	        },
	
	        selectNode: function (node, doc) {
	            var range = doc.createRange();
	            range.selectNodeContents(node);
	            this.selectRange(doc, range);
	        },
	
	        select: function (doc, startNode, startOffset, endNode, endOffset) {
	            var range = doc.createRange();
	            range.setStart(startNode, startOffset);
	            if (endNode) {
	                range.setEnd(endNode, endOffset);
	            } else {
	                range.collapse(true);
	            }
	            this.selectRange(doc, range);
	            return range;
	        },
	
	        /**
	         *  Clear the current highlighted selection and set the caret to the start or the end of that prior selection, defaults to end.
	         *
	         *  @param {DomDocument} doc            Current document
	         *  @param {boolean} moveCursorToStart  A boolean representing whether or not to set the caret to the beginning of the prior selection.
	         */
	        clearSelection: function (doc, moveCursorToStart) {
	            if (moveCursorToStart) {
	                doc.getSelection().collapseToStart();
	            } else {
	                doc.getSelection().collapseToEnd();
	            }
	        },
	
	        /**
	         * Move cursor to the given node with the given offset.
	         *
	         * @param  {DomDocument} doc     Current document
	         * @param  {DomElement}  node    Element where to jump
	         * @param  {integer}     offset  Where in the element should we jump, 0 by default
	         */
	        moveCursor: function (doc, node, offset) {
	            this.select(doc, node, offset);
	        },
	
	        getSelectionRange: function (ownerDocument) {
	            var selection = ownerDocument.getSelection();
	            if (selection.rangeCount === 0) {
	                return null;
	            }
	            return selection.getRangeAt(0);
	        },
	
	        selectRange: function (ownerDocument, range) {
	            var selection = ownerDocument.getSelection();
	
	            selection.removeAllRanges();
	            selection.addRange(range);
	        },
	
	        // http://stackoverflow.com/questions/1197401/how-can-i-get-the-element-the-caret-is-in-with-javascript-when-using-contentedi
	        // by You
	        getSelectionStart: function (ownerDocument) {
	            var node = ownerDocument.getSelection().anchorNode,
	                startNode = (node && node.nodeType === 3 ? node.parentNode : node);
	
	            return startNode;
	        }
	    };
	
	    MediumEditor.selection = Selection;
	}());
	
	(function () {
	    'use strict';
	
	    function isElementDescendantOfExtension(extensions, element) {
	        return extensions.some(function (extension) {
	            if (typeof extension.getInteractionElements !== 'function') {
	                return false;
	            }
	
	            var extensionElements = extension.getInteractionElements();
	            if (!extensionElements) {
	                return false;
	            }
	
	            if (!Array.isArray(extensionElements)) {
	                extensionElements = [extensionElements];
	            }
	            return extensionElements.some(function (el) {
	                return MediumEditor.util.isDescendant(el, element, true);
	            });
	        });
	    }
	
	    var Events = function (instance) {
	        this.base = instance;
	        this.options = this.base.options;
	        this.events = [];
	        this.disabledEvents = {};
	        this.customEvents = {};
	        this.listeners = {};
	    };
	
	    Events.prototype = {
	        InputEventOnContenteditableSupported: !MediumEditor.util.isIE && !MediumEditor.util.isEdge,
	
	        // Helpers for event handling
	
	        attachDOMEvent: function (targets, event, listener, useCapture) {
	            targets = MediumEditor.util.isElement(targets) || [window, document].indexOf(targets) > -1 ? [targets] : targets;
	
	            Array.prototype.forEach.call(targets, function (target) {
	                target.addEventListener(event, listener, useCapture);
	                this.events.push([target, event, listener, useCapture]);
	            }.bind(this));
	        },
	
	        detachDOMEvent: function (targets, event, listener, useCapture) {
	            var index, e;
	            targets = MediumEditor.util.isElement(targets) || [window, document].indexOf(targets) > -1 ? [targets] : targets;
	
	            Array.prototype.forEach.call(targets, function (target) {
	                index = this.indexOfListener(target, event, listener, useCapture);
	                if (index !== -1) {
	                    e = this.events.splice(index, 1)[0];
	                    e[0].removeEventListener(e[1], e[2], e[3]);
	                }
	            }.bind(this));
	        },
	
	        indexOfListener: function (target, event, listener, useCapture) {
	            var i, n, item;
	            for (i = 0, n = this.events.length; i < n; i = i + 1) {
	                item = this.events[i];
	                if (item[0] === target && item[1] === event && item[2] === listener && item[3] === useCapture) {
	                    return i;
	                }
	            }
	            return -1;
	        },
	
	        detachAllDOMEvents: function () {
	            var e = this.events.pop();
	            while (e) {
	                e[0].removeEventListener(e[1], e[2], e[3]);
	                e = this.events.pop();
	            }
	        },
	
	        detachAllEventsFromElement: function (element) {
	            var filtered = this.events.filter(function (e) {
	                return e && e[0].getAttribute && e[0].getAttribute('medium-editor-index') === element.getAttribute('medium-editor-index');
	            });
	
	            for (var i = 0, len = filtered.length; i < len; i++) {
	                var e = filtered[i];
	                this.detachDOMEvent(e[0], e[1], e[2], e[3]);
	            }
	        },
	
	        // Attach all existing handlers to a new element
	        attachAllEventsToElement: function (element) {
	            if (this.listeners['editableInput']) {
	                this.contentCache[element.getAttribute('medium-editor-index')] = element.innerHTML;
	            }
	
	            if (this.eventsCache) {
	                this.eventsCache.forEach(function (e) {
	                    this.attachDOMEvent(element, e['name'], e['handler'].bind(this));
	                }, this);
	            }
	        },
	
	        enableCustomEvent: function (event) {
	            if (this.disabledEvents[event] !== undefined) {
	                delete this.disabledEvents[event];
	            }
	        },
	
	        disableCustomEvent: function (event) {
	            this.disabledEvents[event] = true;
	        },
	
	        // custom events
	        attachCustomEvent: function (event, listener) {
	            this.setupListener(event);
	            if (!this.customEvents[event]) {
	                this.customEvents[event] = [];
	            }
	            this.customEvents[event].push(listener);
	        },
	
	        detachCustomEvent: function (event, listener) {
	            var index = this.indexOfCustomListener(event, listener);
	            if (index !== -1) {
	                this.customEvents[event].splice(index, 1);
	                // TODO: If array is empty, should detach internal listeners via destroyListener()
	            }
	        },
	
	        indexOfCustomListener: function (event, listener) {
	            if (!this.customEvents[event] || !this.customEvents[event].length) {
	                return -1;
	            }
	
	            return this.customEvents[event].indexOf(listener);
	        },
	
	        detachAllCustomEvents: function () {
	            this.customEvents = {};
	            // TODO: Should detach internal listeners here via destroyListener()
	        },
	
	        triggerCustomEvent: function (name, data, editable) {
	            if (this.customEvents[name] && !this.disabledEvents[name]) {
	                this.customEvents[name].forEach(function (listener) {
	                    listener(data, editable);
	                });
	            }
	        },
	
	        // Cleaning up
	
	        destroy: function () {
	            this.detachAllDOMEvents();
	            this.detachAllCustomEvents();
	            this.detachExecCommand();
	
	            if (this.base.elements) {
	                this.base.elements.forEach(function (element) {
	                    element.removeAttribute('data-medium-focused');
	                });
	            }
	        },
	
	        // Listening to calls to document.execCommand
	
	        // Attach a listener to be notified when document.execCommand is called
	        attachToExecCommand: function () {
	            if (this.execCommandListener) {
	                return;
	            }
	
	            // Store an instance of the listener so:
	            // 1) We only attach to execCommand once
	            // 2) We can remove the listener later
	            this.execCommandListener = function (execInfo) {
	                this.handleDocumentExecCommand(execInfo);
	            }.bind(this);
	
	            // Ensure that execCommand has been wrapped correctly
	            this.wrapExecCommand();
	
	            // Add listener to list of execCommand listeners
	            this.options.ownerDocument.execCommand.listeners.push(this.execCommandListener);
	        },
	
	        // Remove our listener for calls to document.execCommand
	        detachExecCommand: function () {
	            var doc = this.options.ownerDocument;
	            if (!this.execCommandListener || !doc.execCommand.listeners) {
	                return;
	            }
	
	            // Find the index of this listener in the array of listeners so it can be removed
	            var index = doc.execCommand.listeners.indexOf(this.execCommandListener);
	            if (index !== -1) {
	                doc.execCommand.listeners.splice(index, 1);
	            }
	
	            // If the list of listeners is now empty, put execCommand back to its original state
	            if (!doc.execCommand.listeners.length) {
	                this.unwrapExecCommand();
	            }
	        },
	
	        // Wrap document.execCommand in a custom method so we can listen to calls to it
	        wrapExecCommand: function () {
	            var doc = this.options.ownerDocument;
	
	            // Ensure all instance of MediumEditor only wrap execCommand once
	            if (doc.execCommand.listeners) {
	                return;
	            }
	
	            // Helper method to call all listeners to execCommand
	            var callListeners = function (args, result) {
	                    if (doc.execCommand.listeners) {
	                        doc.execCommand.listeners.forEach(function (listener) {
	                            listener({
	                                command: args[0],
	                                value: args[2],
	                                args: args,
	                                result: result
	                            });
	                        });
	                    }
	                },
	
	            // Create a wrapper method for execCommand which will:
	            // 1) Call document.execCommand with the correct arguments
	            // 2) Loop through any listeners and notify them that execCommand was called
	            //    passing extra info on the call
	            // 3) Return the result
	                wrapper = function () {
	                    var result = doc.execCommand.orig.apply(this, arguments);
	
	                    if (!doc.execCommand.listeners) {
	                        return result;
	                    }
	
	                    var args = Array.prototype.slice.call(arguments);
	                    callListeners(args, result);
	
	                    return result;
	                };
	
	            // Store a reference to the original execCommand
	            wrapper.orig = doc.execCommand;
	
	            // Attach an array for storing listeners
	            wrapper.listeners = [];
	
	            // Helper for notifying listeners
	            wrapper.callListeners = callListeners;
	
	            // Overwrite execCommand
	            doc.execCommand = wrapper;
	        },
	
	        // Revert document.execCommand back to its original self
	        unwrapExecCommand: function () {
	            var doc = this.options.ownerDocument;
	            if (!doc.execCommand.orig) {
	                return;
	            }
	
	            // Use the reference to the original execCommand to revert back
	            doc.execCommand = doc.execCommand.orig;
	        },
	
	        // Listening to browser events to emit events medium-editor cares about
	        setupListener: function (name) {
	            if (this.listeners[name]) {
	                return;
	            }
	
	            switch (name) {
	                case 'externalInteraction':
	                    // Detecting when user has interacted with elements outside of MediumEditor
	                    this.attachDOMEvent(this.options.ownerDocument.body, 'mousedown', this.handleBodyMousedown.bind(this), true);
	                    this.attachDOMEvent(this.options.ownerDocument.body, 'click', this.handleBodyClick.bind(this), true);
	                    this.attachDOMEvent(this.options.ownerDocument.body, 'focus', this.handleBodyFocus.bind(this), true);
	                    break;
	                case 'blur':
	                    // Detecting when focus is lost
	                    this.setupListener('externalInteraction');
	                    break;
	                case 'focus':
	                    // Detecting when focus moves into some part of MediumEditor
	                    this.setupListener('externalInteraction');
	                    break;
	                case 'editableInput':
	                    // setup cache for knowing when the content has changed
	                    this.contentCache = {};
	                    this.base.elements.forEach(function (element) {
	                        this.contentCache[element.getAttribute('medium-editor-index')] = element.innerHTML;
	                    }, this);
	
	                    // Attach to the 'oninput' event, handled correctly by most browsers
	                    if (this.InputEventOnContenteditableSupported) {
	                        this.attachToEachElement('input', this.handleInput);
	                    }
	
	                    // For browsers which don't support the input event on contenteditable (IE)
	                    // we'll attach to 'selectionchange' on the document and 'keypress' on the editables
	                    if (!this.InputEventOnContenteditableSupported) {
	                        this.setupListener('editableKeypress');
	                        this.keypressUpdateInput = true;
	                        this.attachDOMEvent(document, 'selectionchange', this.handleDocumentSelectionChange.bind(this));
	                        // Listen to calls to execCommand
	                        this.attachToExecCommand();
	                    }
	                    break;
	                case 'editableClick':
	                    // Detecting click in the contenteditables
	                    this.attachToEachElement('click', this.handleClick);
	                    break;
	                case 'editableBlur':
	                    // Detecting blur in the contenteditables
	                    this.attachToEachElement('blur', this.handleBlur);
	                    break;
	                case 'editableKeypress':
	                    // Detecting keypress in the contenteditables
	                    this.attachToEachElement('keypress', this.handleKeypress);
	                    break;
	                case 'editableKeyup':
	                    // Detecting keyup in the contenteditables
	                    this.attachToEachElement('keyup', this.handleKeyup);
	                    break;
	                case 'editableKeydown':
	                    // Detecting keydown on the contenteditables
	                    this.attachToEachElement('keydown', this.handleKeydown);
	                    break;
	                case 'editableKeydownSpace':
	                    // Detecting keydown for SPACE on the contenteditables
	                    this.setupListener('editableKeydown');
	                    break;
	                case 'editableKeydownEnter':
	                    // Detecting keydown for ENTER on the contenteditables
	                    this.setupListener('editableKeydown');
	                    break;
	                case 'editableKeydownTab':
	                    // Detecting keydown for TAB on the contenteditable
	                    this.setupListener('editableKeydown');
	                    break;
	                case 'editableKeydownDelete':
	                    // Detecting keydown for DELETE/BACKSPACE on the contenteditables
	                    this.setupListener('editableKeydown');
	                    break;
	                case 'editableMouseover':
	                    // Detecting mouseover on the contenteditables
	                    this.attachToEachElement('mouseover', this.handleMouseover);
	                    break;
	                case 'editableDrag':
	                    // Detecting dragover and dragleave on the contenteditables
	                    this.attachToEachElement('dragover', this.handleDragging);
	                    this.attachToEachElement('dragleave', this.handleDragging);
	                    break;
	                case 'editableDrop':
	                    // Detecting drop on the contenteditables
	                    this.attachToEachElement('drop', this.handleDrop);
	                    break;
	                // TODO: We need to have a custom 'paste' event separate from 'editablePaste'
	                // Need to think about the way to introduce this without breaking folks
	                case 'editablePaste':
	                    // Detecting paste on the contenteditables
	                    this.attachToEachElement('paste', this.handlePaste);
	                    break;
	            }
	            this.listeners[name] = true;
	        },
	
	        attachToEachElement: function (name, handler) {
	            // build our internal cache to know which element got already what handler attached
	            if (!this.eventsCache) {
	                this.eventsCache = [];
	            }
	
	            this.base.elements.forEach(function (element) {
	                this.attachDOMEvent(element, name, handler.bind(this));
	            }, this);
	
	            this.eventsCache.push({ 'name': name, 'handler': handler });
	        },
	
	        cleanupElement: function (element) {
	            var index = element.getAttribute('medium-editor-index');
	            if (index) {
	                this.detachAllEventsFromElement(element);
	                if (this.contentCache) {
	                    delete this.contentCache[index];
	                }
	            }
	        },
	
	        focusElement: function (element) {
	            element.focus();
	            this.updateFocus(element, { target: element, type: 'focus' });
	        },
	
	        updateFocus: function (target, eventObj) {
	            var hadFocus = this.base.getFocusedElement(),
	                toFocus;
	
	            // For clicks, we need to know if the mousedown that caused the click happened inside the existing focused element
	            // or one of the extension elements.  If so, we don't want to focus another element
	            if (hadFocus &&
	                    eventObj.type === 'click' &&
	                    this.lastMousedownTarget &&
	                    (MediumEditor.util.isDescendant(hadFocus, this.lastMousedownTarget, true) ||
	                     isElementDescendantOfExtension(this.base.extensions, this.lastMousedownTarget))) {
	                toFocus = hadFocus;
	            }
	
	            if (!toFocus) {
	                this.base.elements.some(function (element) {
	                    // If the target is part of an editor element, this is the element getting focus
	                    if (!toFocus && (MediumEditor.util.isDescendant(element, target, true))) {
	                        toFocus = element;
	                    }
	
	                    // bail if we found an element that's getting focus
	                    return !!toFocus;
	                }, this);
	            }
	
	            // Check if the target is external (not part of the editor, toolbar, or any other extension)
	            var externalEvent = !MediumEditor.util.isDescendant(hadFocus, target, true) &&
	                                !isElementDescendantOfExtension(this.base.extensions, target);
	
	            if (toFocus !== hadFocus) {
	                // If element has focus, and focus is going outside of editor
	                // Don't blur focused element if clicking on editor, toolbar, or anchorpreview
	                if (hadFocus && externalEvent) {
	                    // Trigger blur on the editable that has lost focus
	                    hadFocus.removeAttribute('data-medium-focused');
	                    this.triggerCustomEvent('blur', eventObj, hadFocus);
	                }
	
	                // If focus is going into an editor element
	                if (toFocus) {
	                    // Trigger focus on the editable that now has focus
	                    toFocus.setAttribute('data-medium-focused', true);
	                    this.triggerCustomEvent('focus', eventObj, toFocus);
	                }
	            }
	
	            if (externalEvent) {
	                this.triggerCustomEvent('externalInteraction', eventObj);
	            }
	        },
	
	        updateInput: function (target, eventObj) {
	            if (!this.contentCache) {
	                return;
	            }
	            // An event triggered which signifies that the user may have changed someting
	            // Look in our cache of input for the contenteditables to see if something changed
	            var index = target.getAttribute('medium-editor-index'),
	                html = target.innerHTML;
	
	            if (html !== this.contentCache[index]) {
	                // The content has changed since the last time we checked, fire the event
	                this.triggerCustomEvent('editableInput', eventObj, target);
	            }
	            this.contentCache[index] = html;
	        },
	
	        handleDocumentSelectionChange: function (event) {
	            // When selectionchange fires, target and current target are set
	            // to document, since this is where the event is handled
	            // However, currentTarget will have an 'activeElement' property
	            // which will point to whatever element has focus.
	            if (event.currentTarget && event.currentTarget.activeElement) {
	                var activeElement = event.currentTarget.activeElement,
	                    currentTarget;
	                // We can look at the 'activeElement' to determine if the selectionchange has
	                // happened within a contenteditable owned by this instance of MediumEditor
	                this.base.elements.some(function (element) {
	                    if (MediumEditor.util.isDescendant(element, activeElement, true)) {
	                        currentTarget = element;
	                        return true;
	                    }
	                    return false;
	                }, this);
	
	                // We know selectionchange fired within one of our contenteditables
	                if (currentTarget) {
	                    this.updateInput(currentTarget, { target: activeElement, currentTarget: currentTarget });
	                }
	            }
	        },
	
	        handleDocumentExecCommand: function () {
	            // document.execCommand has been called
	            // If one of our contenteditables currently has focus, we should
	            // attempt to trigger the 'editableInput' event
	            var target = this.base.getFocusedElement();
	            if (target) {
	                this.updateInput(target, { target: target, currentTarget: target });
	            }
	        },
	
	        handleBodyClick: function (event) {
	            this.updateFocus(event.target, event);
	        },
	
	        handleBodyFocus: function (event) {
	            this.updateFocus(event.target, event);
	        },
	
	        handleBodyMousedown: function (event) {
	            this.lastMousedownTarget = event.target;
	        },
	
	        handleInput: function (event) {
	            this.updateInput(event.currentTarget, event);
	        },
	
	        handleClick: function (event) {
	            this.triggerCustomEvent('editableClick', event, event.currentTarget);
	        },
	
	        handleBlur: function (event) {
	            this.triggerCustomEvent('editableBlur', event, event.currentTarget);
	        },
	
	        handleKeypress: function (event) {
	            this.triggerCustomEvent('editableKeypress', event, event.currentTarget);
	
	            // If we're doing manual detection of the editableInput event we need
	            // to check for input changes during 'keypress'
	            if (this.keypressUpdateInput) {
	                var eventObj = { target: event.target, currentTarget: event.currentTarget };
	
	                // In IE, we need to let the rest of the event stack complete before we detect
	                // changes to input, so using setTimeout here
	                setTimeout(function () {
	                    this.updateInput(eventObj.currentTarget, eventObj);
	                }.bind(this), 0);
	            }
	        },
	
	        handleKeyup: function (event) {
	            this.triggerCustomEvent('editableKeyup', event, event.currentTarget);
	        },
	
	        handleMouseover: function (event) {
	            this.triggerCustomEvent('editableMouseover', event, event.currentTarget);
	        },
	
	        handleDragging: function (event) {
	            this.triggerCustomEvent('editableDrag', event, event.currentTarget);
	        },
	
	        handleDrop: function (event) {
	            this.triggerCustomEvent('editableDrop', event, event.currentTarget);
	        },
	
	        handlePaste: function (event) {
	            this.triggerCustomEvent('editablePaste', event, event.currentTarget);
	        },
	
	        handleKeydown: function (event) {
	
	            this.triggerCustomEvent('editableKeydown', event, event.currentTarget);
	
	            if (MediumEditor.util.isKey(event, MediumEditor.util.keyCode.SPACE)) {
	                return this.triggerCustomEvent('editableKeydownSpace', event, event.currentTarget);
	            }
	
	            if (MediumEditor.util.isKey(event, MediumEditor.util.keyCode.ENTER) || (event.ctrlKey && MediumEditor.util.isKey(event, MediumEditor.util.keyCode.M))) {
	                return this.triggerCustomEvent('editableKeydownEnter', event, event.currentTarget);
	            }
	
	            if (MediumEditor.util.isKey(event, MediumEditor.util.keyCode.TAB)) {
	                return this.triggerCustomEvent('editableKeydownTab', event, event.currentTarget);
	            }
	
	            if (MediumEditor.util.isKey(event, [MediumEditor.util.keyCode.DELETE, MediumEditor.util.keyCode.BACKSPACE])) {
	                return this.triggerCustomEvent('editableKeydownDelete', event, event.currentTarget);
	            }
	        }
	    };
	
	    MediumEditor.Events = Events;
	}());
	
	(function () {
	    'use strict';
	
	    var Button = MediumEditor.Extension.extend({
	
	        /* Button Options */
	
	        /* action: [string]
	         * The action argument to pass to MediumEditor.execAction()
	         * when the button is clicked
	         */
	        action: undefined,
	
	        /* aria: [string]
	         * The value to add as the aria-label attribute of the button
	         * element displayed in the toolbar.
	         * This is also used as the tooltip for the button
	         */
	        aria: undefined,
	
	        /* tagNames: [Array]
	         * NOTE: This is not used if useQueryState is set to true.
	         *
	         * Array of element tag names that would indicate that this
	         * button has already been applied. If this action has already
	         * been applied, the button will be displayed as 'active' in the toolbar
	         *
	         * Example:
	         * For 'bold', if the text is ever within a <b> or <strong>
	         * tag that indicates the text is already bold. So the array
	         * of tagNames for bold would be: ['b', 'strong']
	         */
	        tagNames: undefined,
	
	        /* style: [Object]
	         * NOTE: This is not used if useQueryState is set to true.
	         *
	         * A pair of css property & value(s) that indicate that this
	         * button has already been applied. If this action has already
	         * been applied, the button will be displayed as 'active' in the toolbar
	         * Properties of the object:
	         *   prop [String]: name of the css property
	         *   value [String]: value(s) of the css property
	         *                   multiple values can be separated by a '|'
	         *
	         * Example:
	         * For 'bold', if the text is ever within an element with a 'font-weight'
	         * style property set to '700' or 'bold', that indicates the text
	         * is already bold.  So the style object for bold would be:
	         * { prop: 'font-weight', value: '700|bold' }
	         */
	        style: undefined,
	
	        /* useQueryState: [boolean]
	         * Enables/disables whether this button should use the built-in
	         * document.queryCommandState() method to determine whether
	         * the action has already been applied.  If the action has already
	         * been applied, the button will be displayed as 'active' in the toolbar
	         *
	         * Example:
	         * For 'bold', if this is set to true, the code will call:
	         * document.queryCommandState('bold') which will return true if the
	         * browser thinks the text is already bold, and false otherwise
	         */
	        useQueryState: undefined,
	
	        /* contentDefault: [string]
	         * Default innerHTML to put inside the button
	         */
	        contentDefault: undefined,
	
	        /* contentFA: [string]
	         * The innerHTML to use for the content of the button
	         * if the `buttonLabels` option for MediumEditor is set to 'fontawesome'
	         */
	        contentFA: undefined,
	
	        /* classList: [Array]
	         * An array of classNames (strings) to be added to the button
	         */
	        classList: undefined,
	
	        /* attrs: [object]
	         * A set of key-value pairs to add to the button as custom attributes
	         */
	        attrs: undefined,
	
	        // The button constructor can optionally accept the name of a built-in button
	        // (ie 'bold', 'italic', etc.)
	        // When the name of a button is passed, it will initialize itself with the
	        // configuration for that button
	        constructor: function (options) {
	            if (Button.isBuiltInButton(options)) {
	                MediumEditor.Extension.call(this, this.defaults[options]);
	            } else {
	                MediumEditor.Extension.call(this, options);
	            }
	        },
	
	        init: function () {
	            MediumEditor.Extension.prototype.init.apply(this, arguments);
	
	            this.button = this.createButton();
	            this.on(this.button, 'click', this.handleClick.bind(this));
	        },
	
	        /* getButton: [function ()]
	         *
	         * If implemented, this function will be called when
	         * the toolbar is being created.  The DOM Element returned
	         * by this function will be appended to the toolbar along
	         * with any other buttons.
	         */
	        getButton: function () {
	            return this.button;
	        },
	
	        getAction: function () {
	            return (typeof this.action === 'function') ? this.action(this.base.options) : this.action;
	        },
	
	        getAria: function () {
	            return (typeof this.aria === 'function') ? this.aria(this.base.options) : this.aria;
	        },
	
	        getTagNames: function () {
	            return (typeof this.tagNames === 'function') ? this.tagNames(this.base.options) : this.tagNames;
	        },
	
	        createButton: function () {
	            var button = this.document.createElement('button'),
	                content = this.contentDefault,
	                ariaLabel = this.getAria(),
	                buttonLabels = this.getEditorOption('buttonLabels');
	            // Add class names
	            button.classList.add('medium-editor-action');
	            button.classList.add('medium-editor-action-' + this.name);
	            if (this.classList) {
	                this.classList.forEach(function (className) {
	                    button.classList.add(className);
	                });
	            }
	
	            // Add attributes
	            button.setAttribute('data-action', this.getAction());
	            if (ariaLabel) {
	                button.setAttribute('title', ariaLabel);
	                button.setAttribute('aria-label', ariaLabel);
	            }
	            if (this.attrs) {
	                Object.keys(this.attrs).forEach(function (attr) {
	                    button.setAttribute(attr, this.attrs[attr]);
	                }, this);
	            }
	
	            if (buttonLabels === 'fontawesome' && this.contentFA) {
	                content = this.contentFA;
	            }
	            button.innerHTML = content;
	            return button;
	        },
	
	        handleClick: function (event) {
	            event.preventDefault();
	            event.stopPropagation();
	
	            var action = this.getAction();
	
	            if (action) {
	                this.execAction(action);
	            }
	        },
	
	        isActive: function () {
	            return this.button.classList.contains(this.getEditorOption('activeButtonClass'));
	        },
	
	        setInactive: function () {
	            this.button.classList.remove(this.getEditorOption('activeButtonClass'));
	            delete this.knownState;
	        },
	
	        setActive: function () {
	            this.button.classList.add(this.getEditorOption('activeButtonClass'));
	            delete this.knownState;
	        },
	
	        queryCommandState: function () {
	            var queryState = null;
	            if (this.useQueryState) {
	                queryState = this.base.queryCommandState(this.getAction());
	            }
	            return queryState;
	        },
	
	        isAlreadyApplied: function (node) {
	            var isMatch = false,
	                tagNames = this.getTagNames(),
	                styleVals,
	                computedStyle;
	
	            if (this.knownState === false || this.knownState === true) {
	                return this.knownState;
	            }
	
	            if (tagNames && tagNames.length > 0) {
	                isMatch = tagNames.indexOf(node.nodeName.toLowerCase()) !== -1;
	            }
	
	            if (!isMatch && this.style) {
	                styleVals = this.style.value.split('|');
	                computedStyle = this.window.getComputedStyle(node, null).getPropertyValue(this.style.prop);
	                styleVals.forEach(function (val) {
	                    if (!this.knownState) {
	                        isMatch = (computedStyle.indexOf(val) !== -1);
	                        // text-decoration is not inherited by default
	                        // so if the computed style for text-decoration doesn't match
	                        // don't write to knownState so we can fallback to other checks
	                        if (isMatch || this.style.prop !== 'text-decoration') {
	                            this.knownState = isMatch;
	                        }
	                    }
	                }, this);
	            }
	
	            return isMatch;
	        }
	    });
	
	    Button.isBuiltInButton = function (name) {
	        return (typeof name === 'string') && MediumEditor.extensions.button.prototype.defaults.hasOwnProperty(name);
	    };
	
	    MediumEditor.extensions.button = Button;
	}());
	
	(function () {
	    'use strict';
	
	    /* MediumEditor.extensions.button.defaults: [Object]
	     * Set of default config options for all of the built-in MediumEditor buttons
	     */
	    MediumEditor.extensions.button.prototype.defaults = {
	        'bold': {
	            name: 'bold',
	            action: 'bold',
	            aria: 'bold',
	            tagNames: ['b', 'strong'],
	            style: {
	                prop: 'font-weight',
	                value: '700|bold'
	            },
	            useQueryState: true,
	            contentDefault: '<b>B</b>',
	            contentFA: '<i class="fa fa-bold"></i>'
	        },
	        'italic': {
	            name: 'italic',
	            action: 'italic',
	            aria: 'italic',
	            tagNames: ['i', 'em'],
	            style: {
	                prop: 'font-style',
	                value: 'italic'
	            },
	            useQueryState: true,
	            contentDefault: '<b><i>I</i></b>',
	            contentFA: '<i class="fa fa-italic"></i>'
	        },
	        'underline': {
	            name: 'underline',
	            action: 'underline',
	            aria: 'underline',
	            tagNames: ['u'],
	            style: {
	                prop: 'text-decoration',
	                value: 'underline'
	            },
	            useQueryState: true,
	            contentDefault: '<b><u>U</u></b>',
	            contentFA: '<i class="fa fa-underline"></i>'
	        },
	        'strikethrough': {
	            name: 'strikethrough',
	            action: 'strikethrough',
	            aria: 'strike through',
	            tagNames: ['strike'],
	            style: {
	                prop: 'text-decoration',
	                value: 'line-through'
	            },
	            useQueryState: true,
	            contentDefault: '<s>A</s>',
	            contentFA: '<i class="fa fa-strikethrough"></i>'
	        },
	        'superscript': {
	            name: 'superscript',
	            action: 'superscript',
	            aria: 'superscript',
	            tagNames: ['sup'],
	            /* firefox doesn't behave the way we want it to, so we CAN'T use queryCommandState for superscript
	               https://github.com/guardian/scribe/blob/master/BROWSERINCONSISTENCIES.md#documentquerycommandstate */
	            // useQueryState: true
	            contentDefault: '<b>x<sup>1</sup></b>',
	            contentFA: '<i class="fa fa-superscript"></i>'
	        },
	        'subscript': {
	            name: 'subscript',
	            action: 'subscript',
	            aria: 'subscript',
	            tagNames: ['sub'],
	            /* firefox doesn't behave the way we want it to, so we CAN'T use queryCommandState for subscript
	               https://github.com/guardian/scribe/blob/master/BROWSERINCONSISTENCIES.md#documentquerycommandstate */
	            // useQueryState: true
	            contentDefault: '<b>x<sub>1</sub></b>',
	            contentFA: '<i class="fa fa-subscript"></i>'
	        },
	        'image': {
	            name: 'image',
	            action: 'image',
	            aria: 'image',
	            tagNames: ['img'],
	            contentDefault: '<b>image</b>',
	            contentFA: '<i class="fa fa-picture-o"></i>'
	        },
	        'orderedlist': {
	            name: 'orderedlist',
	            action: 'insertorderedlist',
	            aria: 'ordered list',
	            tagNames: ['ol'],
	            useQueryState: true,
	            contentDefault: '<b>1.</b>',
	            contentFA: '<i class="fa fa-list-ol"></i>'
	        },
	        'unorderedlist': {
	            name: 'unorderedlist',
	            action: 'insertunorderedlist',
	            aria: 'unordered list',
	            tagNames: ['ul'],
	            useQueryState: true,
	            contentDefault: '<b>&bull;</b>',
	            contentFA: '<i class="fa fa-list-ul"></i>'
	        },
	        'indent': {
	            name: 'indent',
	            action: 'indent',
	            aria: 'indent',
	            tagNames: [],
	            contentDefault: '<b>&rarr;</b>',
	            contentFA: '<i class="fa fa-indent"></i>'
	        },
	        'outdent': {
	            name: 'outdent',
	            action: 'outdent',
	            aria: 'outdent',
	            tagNames: [],
	            contentDefault: '<b>&larr;</b>',
	            contentFA: '<i class="fa fa-outdent"></i>'
	        },
	        'justifyCenter': {
	            name: 'justifyCenter',
	            action: 'justifyCenter',
	            aria: 'center justify',
	            tagNames: [],
	            style: {
	                prop: 'text-align',
	                value: 'center'
	            },
	            contentDefault: '<b>C</b>',
	            contentFA: '<i class="fa fa-align-center"></i>'
	        },
	        'justifyFull': {
	            name: 'justifyFull',
	            action: 'justifyFull',
	            aria: 'full justify',
	            tagNames: [],
	            style: {
	                prop: 'text-align',
	                value: 'justify'
	            },
	            contentDefault: '<b>J</b>',
	            contentFA: '<i class="fa fa-align-justify"></i>'
	        },
	        'justifyLeft': {
	            name: 'justifyLeft',
	            action: 'justifyLeft',
	            aria: 'left justify',
	            tagNames: [],
	            style: {
	                prop: 'text-align',
	                value: 'left'
	            },
	            contentDefault: '<b>L</b>',
	            contentFA: '<i class="fa fa-align-left"></i>'
	        },
	        'justifyRight': {
	            name: 'justifyRight',
	            action: 'justifyRight',
	            aria: 'right justify',
	            tagNames: [],
	            style: {
	                prop: 'text-align',
	                value: 'right'
	            },
	            contentDefault: '<b>R</b>',
	            contentFA: '<i class="fa fa-align-right"></i>'
	        },
	        // Known inline elements that are not removed, or not removed consistantly across browsers:
	        // <span>, <label>, <br>
	        'removeFormat': {
	            name: 'removeFormat',
	            aria: 'remove formatting',
	            action: 'removeFormat',
	            contentDefault: '<b>X</b>',
	            contentFA: '<i class="fa fa-eraser"></i>'
	        },
	
	        /***** Buttons for appending block elements (append-<element> action) *****/
	
	        'quote': {
	            name: 'quote',
	            action: 'append-blockquote',
	            aria: 'blockquote',
	            tagNames: ['blockquote'],
	            contentDefault: '<b>&ldquo;</b>',
	            contentFA: '<i class="fa fa-quote-right"></i>'
	        },
	        'pre': {
	            name: 'pre',
	            action: 'append-pre',
	            aria: 'preformatted text',
	            tagNames: ['pre'],
	            contentDefault: '<b>0101</b>',
	            contentFA: '<i class="fa fa-code fa-lg"></i>'
	        },
	        'h1': {
	            name: 'h1',
	            action: 'append-h1',
	            aria: 'header type one',
	            tagNames: ['h1'],
	            contentDefault: '<b>H1</b>',
	            contentFA: '<i class="fa fa-header"><sup>1</sup>'
	        },
	        'h2': {
	            name: 'h2',
	            action: 'append-h2',
	            aria: 'header type two',
	            tagNames: ['h2'],
	            contentDefault: '<b>H2</b>',
	            contentFA: '<i class="fa fa-header"><sup>2</sup>'
	        },
	        'h3': {
	            name: 'h3',
	            action: 'append-h3',
	            aria: 'header type three',
	            tagNames: ['h3'],
	            contentDefault: '<b>H3</b>',
	            contentFA: '<i class="fa fa-header"><sup>3</sup>'
	        },
	        'h4': {
	            name: 'h4',
	            action: 'append-h4',
	            aria: 'header type four',
	            tagNames: ['h4'],
	            contentDefault: '<b>H4</b>',
	            contentFA: '<i class="fa fa-header"><sup>4</sup>'
	        },
	        'h5': {
	            name: 'h5',
	            action: 'append-h5',
	            aria: 'header type five',
	            tagNames: ['h5'],
	            contentDefault: '<b>H5</b>',
	            contentFA: '<i class="fa fa-header"><sup>5</sup>'
	        },
	        'h6': {
	            name: 'h6',
	            action: 'append-h6',
	            aria: 'header type six',
	            tagNames: ['h6'],
	            contentDefault: '<b>H6</b>',
	            contentFA: '<i class="fa fa-header"><sup>6</sup>'
	        }
	    };
	
	})();
	(function () {
	    'use strict';
	
	    /* Base functionality for an extension which will display
	     * a 'form' inside the toolbar
	     */
	    var FormExtension = MediumEditor.extensions.button.extend({
	
	        init: function () {
	            MediumEditor.extensions.button.prototype.init.apply(this, arguments);
	        },
	
	        // default labels for the form buttons
	        formSaveLabel: '&#10003;',
	        formCloseLabel: '&times;',
	
	        /* activeClass: [string]
	         * set class which added to shown form
	         */
	        activeClass: 'medium-editor-toolbar-form-active',
	
	        /* hasForm: [boolean]
	         *
	         * Setting this to true will cause getForm() to be called
	         * when the toolbar is created, so the form can be appended
	         * inside the toolbar container
	         */
	        hasForm: true,
	
	        /* getForm: [function ()]
	         *
	         * When hasForm is true, this function must be implemented
	         * and return a DOM Element which will be appended to
	         * the toolbar container. The form should start hidden, and
	         * the extension can choose when to hide/show it
	         */
	        getForm: function () {},
	
	        /* isDisplayed: [function ()]
	         *
	         * This function should return true/false reflecting
	         * whether the form is currently displayed
	         */
	        isDisplayed: function () {
	            if (this.hasForm) {
	                return this.getForm().classList.contains(this.activeClass);
	            }
	            return false;
	        },
	
	        /* hideForm: [function ()]
	         *
	         * This function should show the form element inside
	         * the toolbar container
	         */
	        showForm: function () {
	            if (this.hasForm) {
	                this.getForm().classList.add(this.activeClass);
	            }
	        },
	
	        /* hideForm: [function ()]
	         *
	         * This function should hide the form element inside
	         * the toolbar container
	         */
	        hideForm: function () {
	            if (this.hasForm) {
	                this.getForm().classList.remove(this.activeClass);
	            }
	        },
	
	        /************************ Helpers ************************
	         * The following are helpers that are either set by MediumEditor
	         * during initialization, or are helper methods which either
	         * route calls to the MediumEditor instance or provide common
	         * functionality for all form extensions
	         *********************************************************/
	
	        /* showToolbarDefaultActions: [function ()]
	         *
	         * Helper method which will turn back the toolbar after canceling
	         * the customized form
	         */
	        showToolbarDefaultActions: function () {
	            var toolbar = this.base.getExtensionByName('toolbar');
	            if (toolbar) {
	                toolbar.showToolbarDefaultActions();
	            }
	        },
	
	        /* hideToolbarDefaultActions: [function ()]
	         *
	         * Helper function which will hide the default contents of the
	         * toolbar, but leave the toolbar container in the same state
	         * to allow a form to display its custom contents inside the toolbar
	         */
	        hideToolbarDefaultActions: function () {
	            var toolbar = this.base.getExtensionByName('toolbar');
	            if (toolbar) {
	                toolbar.hideToolbarDefaultActions();
	            }
	        },
	
	        /* setToolbarPosition: [function ()]
	         *
	         * Helper function which will update the size and position
	         * of the toolbar based on the toolbar content and the current
	         * position of the user's selection
	         */
	        setToolbarPosition: function () {
	            var toolbar = this.base.getExtensionByName('toolbar');
	            if (toolbar) {
	                toolbar.setToolbarPosition();
	            }
	        }
	    });
	
	    MediumEditor.extensions.form = FormExtension;
	})();
	(function () {
	    'use strict';
	
	    var AnchorForm = MediumEditor.extensions.form.extend({
	        /* Anchor Form Options */
	
	        /* customClassOption: [string]  (previously options.anchorButton + options.anchorButtonClass)
	         * Custom class name the user can optionally have added to their created links (ie 'button').
	         * If passed as a non-empty string, a checkbox will be displayed allowing the user to choose
	         * whether to have the class added to the created link or not.
	         */
	        customClassOption: null,
	
	        /* customClassOptionText: [string]
	         * text to be shown in the checkbox when the __customClassOption__ is being used.
	         */
	        customClassOptionText: 'Button',
	
	        /* linkValidation: [boolean]  (previously options.checkLinkFormat)
	         * enables/disables check for common URL protocols on anchor links.
	         */
	        linkValidation: false,
	
	        /* placeholderText: [string]  (previously options.anchorInputPlaceholder)
	         * text to be shown as placeholder of the anchor input.
	         */
	        placeholderText: 'Paste or type a link',
	
	        /* targetCheckbox: [boolean]  (previously options.anchorTarget)
	         * enables/disables displaying a "Open in new window" checkbox, which when checked
	         * changes the `target` attribute of the created link.
	         */
	        targetCheckbox: false,
	
	        /* targetCheckboxText: [string]  (previously options.anchorInputCheckboxLabel)
	         * text to be shown in the checkbox enabled via the __targetCheckbox__ option.
	         */
	        targetCheckboxText: 'Open in new window',
	
	        // Options for the Button base class
	        name: 'anchor',
	        action: 'createLink',
	        aria: 'link',
	        tagNames: ['a'],
	        contentDefault: '<b>#</b>',
	        contentFA: '<i class="fa fa-link"></i>',
	
	        init: function () {
	            MediumEditor.extensions.form.prototype.init.apply(this, arguments);
	
	            this.subscribe('editableKeydown', this.handleKeydown.bind(this));
	        },
	
	        // Called when the button the toolbar is clicked
	        // Overrides ButtonExtension.handleClick
	        handleClick: function (event) {
	            event.preventDefault();
	            event.stopPropagation();
	
	            var range = MediumEditor.selection.getSelectionRange(this.document);
	
	            if (range.startContainer.nodeName.toLowerCase() === 'a' ||
	                range.endContainer.nodeName.toLowerCase() === 'a' ||
	                MediumEditor.util.getClosestTag(MediumEditor.selection.getSelectedParentElement(range), 'a')) {
	                return this.execAction('unlink');
	            }
	
	            if (!this.isDisplayed()) {
	                this.showForm();
	            }
	
	            return false;
	        },
	
	        // Called when user hits the defined shortcut (CTRL / COMMAND + K)
	        handleKeydown: function (event) {
	            if (MediumEditor.util.isKey(event, MediumEditor.util.keyCode.K) && MediumEditor.util.isMetaCtrlKey(event) && !event.shiftKey) {
	                this.handleClick(event);
	            }
	        },
	
	        // Called by medium-editor to append form to the toolbar
	        getForm: function () {
	            if (!this.form) {
	                this.form = this.createForm();
	            }
	            return this.form;
	        },
	
	        getTemplate: function () {
	            var template = [
	                '<input type="text" class="medium-editor-toolbar-input" placeholder="', this.placeholderText, '">'
	            ];
	
	            template.push(
	                '<a href="#" class="medium-editor-toolbar-save">',
	                this.getEditorOption('buttonLabels') === 'fontawesome' ? '<i class="fa fa-check"></i>' : this.formSaveLabel,
	                '</a>'
	            );
	
	            template.push('<a href="#" class="medium-editor-toolbar-close">',
	                this.getEditorOption('buttonLabels') === 'fontawesome' ? '<i class="fa fa-times"></i>' : this.formCloseLabel,
	                '</a>');
	
	            // both of these options are slightly moot with the ability to
	            // override the various form buildup/serialize functions.
	
	            if (this.targetCheckbox) {
	                // fixme: ideally, this targetCheckboxText would be a formLabel too,
	                // figure out how to deprecate? also consider `fa-` icon default implcations.
	                template.push(
	                    '<div class="medium-editor-toolbar-form-row">',
	                    '<input type="checkbox" class="medium-editor-toolbar-anchor-target">',
	                    '<label>',
	                    this.targetCheckboxText,
	                    '</label>',
	                    '</div>'
	                );
	            }
	
	            if (this.customClassOption) {
	                // fixme: expose this `Button` text as a formLabel property, too
	                // and provide similar access to a `fa-` icon default.
	                template.push(
	                    '<div class="medium-editor-toolbar-form-row">',
	                    '<input type="checkbox" class="medium-editor-toolbar-anchor-button">',
	                    '<label>',
	                    this.customClassOptionText,
	                    '</label>',
	                    '</div>'
	                );
	            }
	
	            return template.join('');
	
	        },
	
	        // Used by medium-editor when the default toolbar is to be displayed
	        isDisplayed: function () {
	            return MediumEditor.extensions.form.prototype.isDisplayed.apply(this);
	        },
	
	        hideForm: function () {
	            MediumEditor.extensions.form.prototype.hideForm.apply(this);
	            this.getInput().value = '';
	        },
	
	        showForm: function (opts) {
	            var input = this.getInput(),
	                targetCheckbox = this.getAnchorTargetCheckbox(),
	                buttonCheckbox = this.getAnchorButtonCheckbox();
	
	            opts = opts || { value: '' };
	            // TODO: This is for backwards compatability
	            // We don't need to support the 'string' argument in 6.0.0
	            if (typeof opts === 'string') {
	                opts = {
	                    value: opts
	                };
	            }
	
	            this.base.saveSelection();
	            this.hideToolbarDefaultActions();
	            MediumEditor.extensions.form.prototype.showForm.apply(this);
	            this.setToolbarPosition();
	
	            input.value = opts.value;
	            input.focus();
	
	            // If we have a target checkbox, we want it to be checked/unchecked
	            // based on whether the existing link has target=_blank
	            if (targetCheckbox) {
	                targetCheckbox.checked = opts.target === '_blank';
	            }
	
	            // If we have a custom class checkbox, we want it to be checked/unchecked
	            // based on whether an existing link already has the class
	            if (buttonCheckbox) {
	                var classList = opts.buttonClass ? opts.buttonClass.split(' ') : [];
	                buttonCheckbox.checked = (classList.indexOf(this.customClassOption) !== -1);
	            }
	        },
	
	        // Called by core when tearing down medium-editor (destroy)
	        destroy: function () {
	            if (!this.form) {
	                return false;
	            }
	
	            if (this.form.parentNode) {
	                this.form.parentNode.removeChild(this.form);
	            }
	
	            delete this.form;
	        },
	
	        // core methods
	
	        getFormOpts: function () {
	            // no notion of private functions? wanted `_getFormOpts`
	            var targetCheckbox = this.getAnchorTargetCheckbox(),
	                buttonCheckbox = this.getAnchorButtonCheckbox(),
	                opts = {
	                    value: this.getInput().value.trim()
	                };
	
	            if (this.linkValidation) {
	                opts.value = this.checkLinkFormat(opts.value);
	            }
	
	            opts.target = '_self';
	            if (targetCheckbox && targetCheckbox.checked) {
	                opts.target = '_blank';
	            }
	
	            if (buttonCheckbox && buttonCheckbox.checked) {
	                opts.buttonClass = this.customClassOption;
	            }
	
	            return opts;
	        },
	
	        doFormSave: function () {
	            var opts = this.getFormOpts();
	            this.completeFormSave(opts);
	        },
	
	        completeFormSave: function (opts) {
	            this.base.restoreSelection();
	            this.execAction(this.action, opts);
	            this.base.checkSelection();
	        },
	
	        checkLinkFormat: function (value) {
	            // Matches any alphabetical characters followed by ://
	            // Matches protocol relative "//"
	            // Matches common external protocols "mailto:" "tel:" "maps:"
	            // Matches relative hash link, begins with "#"
	            var urlSchemeRegex = /^([a-z]+:)?\/\/|^(mailto|tel|maps):|^\#/i,
	            // var te is a regex for checking if the string is a telephone number
	            telRegex = /^\+?\s?\(?(?:\d\s?\-?\)?){3,20}$/;
	            if (telRegex.test(value)) {
	                return 'tel:' + value;
	            } else {
	                // Check for URL scheme and default to http:// if none found
	                return (urlSchemeRegex.test(value) ? '' : 'http://') + encodeURI(value);
	            }
	        },
	
	        doFormCancel: function () {
	            this.base.restoreSelection();
	            this.base.checkSelection();
	        },
	
	        // form creation and event handling
	        attachFormEvents: function (form) {
	            var close = form.querySelector('.medium-editor-toolbar-close'),
	                save = form.querySelector('.medium-editor-toolbar-save'),
	                input = form.querySelector('.medium-editor-toolbar-input');
	
	            // Handle clicks on the form itself
	            this.on(form, 'click', this.handleFormClick.bind(this));
	
	            // Handle typing in the textbox
	            this.on(input, 'keyup', this.handleTextboxKeyup.bind(this));
	
	            // Handle close button clicks
	            this.on(close, 'click', this.handleCloseClick.bind(this));
	
	            // Handle save button clicks (capture)
	            this.on(save, 'click', this.handleSaveClick.bind(this), true);
	
	        },
	
	        createForm: function () {
	            var doc = this.document,
	                form = doc.createElement('div');
	
	            // Anchor Form (div)
	            form.className = 'medium-editor-toolbar-form';
	            form.id = 'medium-editor-toolbar-form-anchor-' + this.getEditorId();
	            form.innerHTML = this.getTemplate();
	            this.attachFormEvents(form);
	
	            return form;
	        },
	
	        getInput: function () {
	            return this.getForm().querySelector('input.medium-editor-toolbar-input');
	        },
	
	        getAnchorTargetCheckbox: function () {
	            return this.getForm().querySelector('.medium-editor-toolbar-anchor-target');
	        },
	
	        getAnchorButtonCheckbox: function () {
	            return this.getForm().querySelector('.medium-editor-toolbar-anchor-button');
	        },
	
	        handleTextboxKeyup: function (event) {
	            // For ENTER -> create the anchor
	            if (event.keyCode === MediumEditor.util.keyCode.ENTER) {
	                event.preventDefault();
	                this.doFormSave();
	                return;
	            }
	
	            // For ESCAPE -> close the form
	            if (event.keyCode === MediumEditor.util.keyCode.ESCAPE) {
	                event.preventDefault();
	                this.doFormCancel();
	            }
	        },
	
	        handleFormClick: function (event) {
	            // make sure not to hide form when clicking inside the form
	            event.stopPropagation();
	        },
	
	        handleSaveClick: function (event) {
	            // Clicking Save -> create the anchor
	            event.preventDefault();
	            this.doFormSave();
	        },
	
	        handleCloseClick: function (event) {
	            // Click Close -> close the form
	            event.preventDefault();
	            this.doFormCancel();
	        }
	    });
	
	    MediumEditor.extensions.anchor = AnchorForm;
	}());
	
	(function () {
	    'use strict';
	
	    var AnchorPreview = MediumEditor.Extension.extend({
	        name: 'anchor-preview',
	
	        // Anchor Preview Options
	
	        /* hideDelay: [number]  (previously options.anchorPreviewHideDelay)
	         * time in milliseconds to show the anchor tag preview after the mouse has left the anchor tag.
	         */
	        hideDelay: 500,
	
	        /* previewValueSelector: [string]
	         * the default selector to locate where to put the activeAnchor value in the preview
	         */
	        previewValueSelector: 'a',
	
	        /* showWhenToolbarIsVisible: [boolean]
	         * determines whether the anchor tag preview shows up when the toolbar is visible
	         */
	        showWhenToolbarIsVisible: false,
	
	        /* showOnEmptyLinks: [boolean]
	        * determines whether the anchor tag preview shows up on links with href="" or href="#something"
	        */
	        showOnEmptyLinks: true,
	
	        init: function () {
	            this.anchorPreview = this.createPreview();
	
	            this.getEditorOption('elementsContainer').appendChild(this.anchorPreview);
	
	            this.attachToEditables();
	        },
	
	        getInteractionElements: function () {
	            return this.getPreviewElement();
	        },
	
	        // TODO: Remove this function in 6.0.0
	        getPreviewElement: function () {
	            return this.anchorPreview;
	        },
	
	        createPreview: function () {
	            var el = this.document.createElement('div');
	
	            el.id = 'medium-editor-anchor-preview-' + this.getEditorId();
	            el.className = 'medium-editor-anchor-preview';
	            el.innerHTML = this.getTemplate();
	
	            this.on(el, 'click', this.handleClick.bind(this));
	
	            return el;
	        },
	
	        getTemplate: function () {
	            return '<div class="medium-editor-toolbar-anchor-preview" id="medium-editor-toolbar-anchor-preview">' +
	                '    <a class="medium-editor-toolbar-anchor-preview-inner"></a>' +
	                '</div>';
	        },
	
	        destroy: function () {
	            if (this.anchorPreview) {
	                if (this.anchorPreview.parentNode) {
	                    this.anchorPreview.parentNode.removeChild(this.anchorPreview);
	                }
	                delete this.anchorPreview;
	            }
	        },
	
	        hidePreview: function () {
	            this.anchorPreview.classList.remove('medium-editor-anchor-preview-active');
	            this.activeAnchor = null;
	        },
	
	        showPreview: function (anchorEl) {
	            if (this.anchorPreview.classList.contains('medium-editor-anchor-preview-active') ||
	                    anchorEl.getAttribute('data-disable-preview')) {
	                return true;
	            }
	
	            if (this.previewValueSelector) {
	                this.anchorPreview.querySelector(this.previewValueSelector).textContent = anchorEl.attributes.href.value;
	                this.anchorPreview.querySelector(this.previewValueSelector).href = anchorEl.attributes.href.value;
	            }
	
	            this.anchorPreview.classList.add('medium-toolbar-arrow-over');
	            this.anchorPreview.classList.remove('medium-toolbar-arrow-under');
	
	            if (!this.anchorPreview.classList.contains('medium-editor-anchor-preview-active')) {
	                this.anchorPreview.classList.add('medium-editor-anchor-preview-active');
	            }
	
	            this.activeAnchor = anchorEl;
	
	            this.positionPreview();
	            this.attachPreviewHandlers();
	
	            return this;
	        },
	
	        positionPreview: function (activeAnchor) {
	            activeAnchor = activeAnchor || this.activeAnchor;
	            var containerWidth = this.window.innerWidth,
	                buttonHeight = this.anchorPreview.offsetHeight,
	                boundary = activeAnchor.getBoundingClientRect(),
	                diffLeft = this.diffLeft,
	                diffTop = this.diffTop,
	                elementsContainer = this.getEditorOption('elementsContainer'),
	                elementsContainerAbsolute = ['absolute', 'fixed'].indexOf(window.getComputedStyle(elementsContainer).getPropertyValue('position')) > -1,
	                relativeBoundary = {},
	                halfOffsetWidth, defaultLeft, middleBoundary, elementsContainerBoundary, top;
	
	            halfOffsetWidth = this.anchorPreview.offsetWidth / 2;
	            var toolbarExtension = this.base.getExtensionByName('toolbar');
	            if (toolbarExtension) {
	                diffLeft = toolbarExtension.diffLeft;
	                diffTop = toolbarExtension.diffTop;
	            }
	            defaultLeft = diffLeft - halfOffsetWidth;
	
	            // If container element is absolute / fixed, recalculate boundaries to be relative to the container
	            if (elementsContainerAbsolute) {
	                elementsContainerBoundary = elementsContainer.getBoundingClientRect();
	                ['top', 'left'].forEach(function (key) {
	                    relativeBoundary[key] = boundary[key] - elementsContainerBoundary[key];
	                });
	
	                relativeBoundary.width = boundary.width;
	                relativeBoundary.height = boundary.height;
	                boundary = relativeBoundary;
	
	                containerWidth = elementsContainerBoundary.width;
	
	                // Adjust top position according to container scroll position
	                top = elementsContainer.scrollTop;
	            } else {
	                // Adjust top position according to window scroll position
	                top = this.window.pageYOffset;
	            }
	
	            middleBoundary = boundary.left + boundary.width / 2;
	            top += buttonHeight + boundary.top + boundary.height - diffTop - this.anchorPreview.offsetHeight;
	
	            this.anchorPreview.style.top = Math.round(top) + 'px';
	            this.anchorPreview.style.right = 'initial';
	            if (middleBoundary < halfOffsetWidth) {
	                this.anchorPreview.style.left = defaultLeft + halfOffsetWidth + 'px';
	                this.anchorPreview.style.right = 'initial';
	            } else if ((containerWidth - middleBoundary) < halfOffsetWidth) {
	                this.anchorPreview.style.left = 'auto';
	                this.anchorPreview.style.right = 0;
	            } else {
	                this.anchorPreview.style.left = defaultLeft + middleBoundary + 'px';
	                this.anchorPreview.style.right = 'initial';
	            }
	        },
	
	        attachToEditables: function () {
	            this.subscribe('editableMouseover', this.handleEditableMouseover.bind(this));
	            this.subscribe('positionedToolbar', this.handlePositionedToolbar.bind(this));
	        },
	
	        handlePositionedToolbar: function () {
	            // If the toolbar is visible and positioned, we don't need to hide the preview
	            // when showWhenToolbarIsVisible is true
	            if (!this.showWhenToolbarIsVisible) {
	                this.hidePreview();
	            }
	        },
	
	        handleClick: function (event) {
	            var anchorExtension = this.base.getExtensionByName('anchor'),
	                activeAnchor = this.activeAnchor;
	
	            if (anchorExtension && activeAnchor) {
	                event.preventDefault();
	
	                this.base.selectElement(this.activeAnchor);
	
	                // Using setTimeout + delay because:
	                // We may actually be displaying the anchor form, which should be controlled by delay
	                this.base.delay(function () {
	                    if (activeAnchor) {
	                        var opts = {
	                            value: activeAnchor.attributes.href.value,
	                            target: activeAnchor.getAttribute('target'),
	                            buttonClass: activeAnchor.getAttribute('class')
	                        };
	                        anchorExtension.showForm(opts);
	                        activeAnchor = null;
	                    }
	                }.bind(this));
	            }
	
	            this.hidePreview();
	        },
	
	        handleAnchorMouseout: function () {
	            this.anchorToPreview = null;
	            this.off(this.activeAnchor, 'mouseout', this.instanceHandleAnchorMouseout);
	            this.instanceHandleAnchorMouseout = null;
	        },
	
	        handleEditableMouseover: function (event) {
	            var target = MediumEditor.util.getClosestTag(event.target, 'a');
	
	            if (false === target) {
	                return;
	            }
	
	            // Detect empty href attributes
	            // The browser will make href="" or href="#top"
	            // into absolute urls when accessed as event.target.href, so check the html
	            if (!this.showOnEmptyLinks &&
	                (!/href=["']\S+["']/.test(target.outerHTML) || /href=["']#\S+["']/.test(target.outerHTML))) {
	                return true;
	            }
	
	            // only show when toolbar is not present
	            var toolbar = this.base.getExtensionByName('toolbar');
	            if (!this.showWhenToolbarIsVisible && toolbar && toolbar.isDisplayed && toolbar.isDisplayed()) {
	                return true;
	            }
	
	            // detach handler for other anchor in case we hovered multiple anchors quickly
	            if (this.activeAnchor && this.activeAnchor !== target) {
	                this.detachPreviewHandlers();
	            }
	
	            this.anchorToPreview = target;
	
	            this.instanceHandleAnchorMouseout = this.handleAnchorMouseout.bind(this);
	            this.on(this.anchorToPreview, 'mouseout', this.instanceHandleAnchorMouseout);
	            // Using setTimeout + delay because:
	            // - We're going to show the anchor preview according to the configured delay
	            //   if the mouse has not left the anchor tag in that time
	            this.base.delay(function () {
	                if (this.anchorToPreview) {
	                    this.showPreview(this.anchorToPreview);
	                }
	            }.bind(this));
	        },
	
	        handlePreviewMouseover: function () {
	            this.lastOver = (new Date()).getTime();
	            this.hovering = true;
	        },
	
	        handlePreviewMouseout: function (event) {
	            if (!event.relatedTarget || !/anchor-preview/.test(event.relatedTarget.className)) {
	                this.hovering = false;
	            }
	        },
	
	        updatePreview: function () {
	            if (this.hovering) {
	                return true;
	            }
	            var durr = (new Date()).getTime() - this.lastOver;
	            if (durr > this.hideDelay) {
	                // hide the preview 1/2 second after mouse leaves the link
	                this.detachPreviewHandlers();
	            }
	        },
	
	        detachPreviewHandlers: function () {
	            // cleanup
	            clearInterval(this.intervalTimer);
	            if (this.instanceHandlePreviewMouseover) {
	                this.off(this.anchorPreview, 'mouseover', this.instanceHandlePreviewMouseover);
	                this.off(this.anchorPreview, 'mouseout', this.instanceHandlePreviewMouseout);
	                if (this.activeAnchor) {
	                    this.off(this.activeAnchor, 'mouseover', this.instanceHandlePreviewMouseover);
	                    this.off(this.activeAnchor, 'mouseout', this.instanceHandlePreviewMouseout);
	                }
	            }
	
	            this.hidePreview();
	
	            this.hovering = this.instanceHandlePreviewMouseover = this.instanceHandlePreviewMouseout = null;
	        },
	
	        // TODO: break up method and extract out handlers
	        attachPreviewHandlers: function () {
	            this.lastOver = (new Date()).getTime();
	            this.hovering = true;
	
	            this.instanceHandlePreviewMouseover = this.handlePreviewMouseover.bind(this);
	            this.instanceHandlePreviewMouseout = this.handlePreviewMouseout.bind(this);
	
	            this.intervalTimer = setInterval(this.updatePreview.bind(this), 200);
	
	            this.on(this.anchorPreview, 'mouseover', this.instanceHandlePreviewMouseover);
	            this.on(this.anchorPreview, 'mouseout', this.instanceHandlePreviewMouseout);
	            this.on(this.activeAnchor, 'mouseover', this.instanceHandlePreviewMouseover);
	            this.on(this.activeAnchor, 'mouseout', this.instanceHandlePreviewMouseout);
	        }
	    });
	
	    MediumEditor.extensions.anchorPreview = AnchorPreview;
	}());
	
	(function () {
	    'use strict';
	
	    var WHITESPACE_CHARS,
	        KNOWN_TLDS_FRAGMENT,
	        LINK_REGEXP_TEXT,
	        KNOWN_TLDS_REGEXP;
	
	    WHITESPACE_CHARS = [' ', '\t', '\n', '\r', '\u00A0', '\u2000', '\u2001', '\u2002', '\u2003',
	                                    '\u2028', '\u2029'];
	    KNOWN_TLDS_FRAGMENT = 'com|net|org|edu|gov|mil|aero|asia|biz|cat|coop|info|int|jobs|mobi|museum|name|post|pro|tel|travel|' +
	        'xxx|ac|ad|ae|af|ag|ai|al|am|an|ao|aq|ar|as|at|au|aw|ax|az|ba|bb|bd|be|bf|bg|bh|bi|bj|bm|bn|bo|br|bs|bt|bv|bw|by|' +
	        'bz|ca|cc|cd|cf|cg|ch|ci|ck|cl|cm|cn|co|cr|cs|cu|cv|cx|cy|cz|dd|de|dj|dk|dm|do|dz|ec|ee|eg|eh|er|es|et|eu|fi|fj|' +
	        'fk|fm|fo|fr|ga|gb|gd|ge|gf|gg|gh|gi|gl|gm|gn|gp|gq|gr|gs|gt|gu|gw|gy|hk|hm|hn|hr|ht|hu|id|ie|il|im|in|io|iq|ir|' +
	        'is|it|je|jm|jo|jp|ke|kg|kh|ki|km|kn|kp|kr|kw|ky|kz|la|lb|lc|li|lk|lr|ls|lt|lu|lv|ly|ma|mc|md|me|mg|mh|mk|ml|mm|' +
	        'mn|mo|mp|mq|mr|ms|mt|mu|mv|mw|mx|my|mz|na|nc|ne|nf|ng|ni|nl|no|np|nr|nu|nz|om|pa|pe|pf|pg|ph|pk|pl|pm|pn|pr|ps|' +
	        'pt|pw|py|qa|re|ro|rs|ru|rw|sa|sb|sc|sd|se|sg|sh|si|sj|ja|sk|sl|sm|sn|so|sr|ss|st|su|sv|sx|sy|sz|tc|td|tf|tg|th|' +
	        'tj|tk|tl|tm|tn|to|tp|tr|tt|tv|tw|tz|ua|ug|uk|us|uy|uz|va|vc|ve|vg|vi|vn|vu|wf|ws|ye|yt|yu|za|zm|zw';
	
	    LINK_REGEXP_TEXT =
	        '(' +
	        // Version of Gruber URL Regexp optimized for JS: http://stackoverflow.com/a/17733640
	        '((?:(https?://|ftps?://|nntp://)|www\\d{0,3}[.]|[a-z0-9.\\-]+[.](' + KNOWN_TLDS_FRAGMENT + ')\\\/)\\S+(?:[^\\s`!\\[\\]{};:\'\".,?\u00AB\u00BB\u201C\u201D\u2018\u2019]))' +
	        // Addition to above Regexp to support bare domains/one level subdomains with common non-i18n TLDs and without www prefix:
	        ')|(([a-z0-9\\-]+\\.)?[a-z0-9\\-]+\\.(' + KNOWN_TLDS_FRAGMENT + '))';
	
	    KNOWN_TLDS_REGEXP = new RegExp('^(' + KNOWN_TLDS_FRAGMENT + ')$', 'i');
	
	    function nodeIsNotInsideAnchorTag(node) {
	        return !MediumEditor.util.getClosestTag(node, 'a');
	    }
	
	    var AutoLink = MediumEditor.Extension.extend({
	        init: function () {
	            MediumEditor.Extension.prototype.init.apply(this, arguments);
	
	            this.disableEventHandling = false;
	            this.subscribe('editableKeypress', this.onKeypress.bind(this));
	            this.subscribe('editableBlur', this.onBlur.bind(this));
	            // MS IE has it's own auto-URL detect feature but ours is better in some ways. Be consistent.
	            this.document.execCommand('AutoUrlDetect', false, false);
	        },
	
	        isLastInstance: function () {
	            var activeInstances = 0;
	            for (var i = 0; i < this.window._mediumEditors.length; i++) {
	                var editor = this.window._mediumEditors[i];
	                if (editor !== null && editor.getExtensionByName('autoLink') !== undefined) {
	                    activeInstances++;
	                }
	            }
	            return activeInstances === 1;
	        },
	
	        destroy: function () {
	            // Turn AutoUrlDetect back on
	            if (this.document.queryCommandSupported('AutoUrlDetect') && this.isLastInstance()) {
	                this.document.execCommand('AutoUrlDetect', false, true);
	            }
	        },
	
	        onBlur: function (blurEvent, editable) {
	            this.performLinking(editable);
	        },
	
	        onKeypress: function (keyPressEvent) {
	            if (this.disableEventHandling) {
	                return;
	            }
	
	            if (MediumEditor.util.isKey(keyPressEvent, [MediumEditor.util.keyCode.SPACE, MediumEditor.util.keyCode.ENTER])) {
	                clearTimeout(this.performLinkingTimeout);
	                // Saving/restoring the selection in the middle of a keypress doesn't work well...
	                this.performLinkingTimeout = setTimeout(function () {
	                    try {
	                        var sel = this.base.exportSelection();
	                        if (this.performLinking(keyPressEvent.target)) {
	                            // pass true for favorLaterSelectionAnchor - this is needed for links at the end of a
	                            // paragraph in MS IE, or MS IE causes the link to be deleted right after adding it.
	                            this.base.importSelection(sel, true);
	                        }
	                    } catch (e) {
	                        if (window.console) {
	                            window.console.error('Failed to perform linking', e);
	                        }
	                        this.disableEventHandling = true;
	                    }
	                }.bind(this), 0);
	            }
	        },
	
	        performLinking: function (contenteditable) {
	            /*
	            Perform linking on blockElement basis, blockElements are HTML elements with text content and without
	            child element.
	
	            Example:
	            - HTML content
	            <blockquote>
	              <p>link.</p>
	              <p>my</p>
	            </blockquote>
	
	            - blockElements
	            [<p>link.</p>, <p>my</p>]
	
	            otherwise the detection can wrongly find the end of one paragraph and the beginning of another paragraph
	            to constitute a link, such as a paragraph ending "link." and the next paragraph beginning with "my" is
	            interpreted into "link.my" and the code tries to create a link across blockElements - which doesn't work
	            and is terrible.
	            (Medium deletes the spaces/returns between P tags so the textContent ends up without paragraph spacing)
	            */
	            var blockElements = MediumEditor.util.splitByBlockElements(contenteditable),
	                documentModified = false;
	            if (blockElements.length === 0) {
	                blockElements = [contenteditable];
	            }
	            for (var i = 0; i < blockElements.length; i++) {
	                documentModified = this.removeObsoleteAutoLinkSpans(blockElements[i]) || documentModified;
	                documentModified = this.performLinkingWithinElement(blockElements[i]) || documentModified;
	            }
	            this.base.events.updateInput(contenteditable, { target: contenteditable, currentTarget: contenteditable });
	            return documentModified;
	        },
	
	        removeObsoleteAutoLinkSpans: function (element) {
	            if (!element || element.nodeType === 3) {
	                return false;
	            }
	
	            var spans = element.querySelectorAll('span[data-auto-link="true"]'),
	                documentModified = false;
	
	            for (var i = 0; i < spans.length; i++) {
	                var textContent = spans[i].textContent;
	                if (textContent.indexOf('://') === -1) {
	                    textContent = MediumEditor.util.ensureUrlHasProtocol(textContent);
	                }
	                if (spans[i].getAttribute('data-href') !== textContent && nodeIsNotInsideAnchorTag(spans[i])) {
	                    documentModified = true;
	                    var trimmedTextContent = textContent.replace(/\s+$/, '');
	                    if (spans[i].getAttribute('data-href') === trimmedTextContent) {
	                        var charactersTrimmed = textContent.length - trimmedTextContent.length,
	                            subtree = MediumEditor.util.splitOffDOMTree(spans[i], this.splitTextBeforeEnd(spans[i], charactersTrimmed));
	                        spans[i].parentNode.insertBefore(subtree, spans[i].nextSibling);
	                    } else {
	                        // Some editing has happened to the span, so just remove it entirely. The user can put it back
	                        // around just the href content if they need to prevent it from linking
	                        MediumEditor.util.unwrap(spans[i], this.document);
	                    }
	                }
	            }
	            return documentModified;
	        },
	
	        splitTextBeforeEnd: function (element, characterCount) {
	            var treeWalker = this.document.createTreeWalker(element, NodeFilter.SHOW_TEXT, null, false),
	                lastChildNotExhausted = true;
	
	            // Start the tree walker at the last descendant of the span
	            while (lastChildNotExhausted) {
	                lastChildNotExhausted = treeWalker.lastChild() !== null;
	            }
	
	            var currentNode,
	                currentNodeValue,
	                previousNode;
	            while (characterCount > 0 && previousNode !== null) {
	                currentNode = treeWalker.currentNode;
	                currentNodeValue = currentNode.nodeValue;
	                if (currentNodeValue.length > characterCount) {
	                    previousNode = currentNode.splitText(currentNodeValue.length - characterCount);
	                    characterCount = 0;
	                } else {
	                    previousNode = treeWalker.previousNode();
	                    characterCount -= currentNodeValue.length;
	                }
	            }
	            return previousNode;
	        },
	
	        performLinkingWithinElement: function (element) {
	            var matches = this.findLinkableText(element),
	                linkCreated = false;
	
	            for (var matchIndex = 0; matchIndex < matches.length; matchIndex++) {
	                var matchingTextNodes = MediumEditor.util.findOrCreateMatchingTextNodes(this.document, element,
	                        matches[matchIndex]);
	                if (this.shouldNotLink(matchingTextNodes)) {
	                    continue;
	                }
	                this.createAutoLink(matchingTextNodes, matches[matchIndex].href);
	            }
	            return linkCreated;
	        },
	
	        shouldNotLink: function (textNodes) {
	            var shouldNotLink = false;
	            for (var i = 0; i < textNodes.length && shouldNotLink === false; i++) {
	                // Do not link if the text node is either inside an anchor or inside span[data-auto-link]
	                shouldNotLink = !!MediumEditor.util.traverseUp(textNodes[i], function (node) {
	                    return node.nodeName.toLowerCase() === 'a' ||
	                        (node.getAttribute && node.getAttribute('data-auto-link') === 'true');
	                });
	            }
	            return shouldNotLink;
	        },
	
	        findLinkableText: function (contenteditable) {
	            var linkRegExp = new RegExp(LINK_REGEXP_TEXT, 'gi'),
	                textContent = contenteditable.textContent,
	                match = null,
	                matches = [];
	
	            while ((match = linkRegExp.exec(textContent)) !== null) {
	                var matchOk = true,
	                    matchEnd = match.index + match[0].length;
	                // If the regexp detected something as a link that has text immediately preceding/following it, bail out.
	                matchOk = (match.index === 0 || WHITESPACE_CHARS.indexOf(textContent[match.index - 1]) !== -1) &&
	                    (matchEnd === textContent.length || WHITESPACE_CHARS.indexOf(textContent[matchEnd]) !== -1);
	                // If the regexp detected a bare domain that doesn't use one of our expected TLDs, bail out.
	                matchOk = matchOk && (match[0].indexOf('/') !== -1 ||
	                    KNOWN_TLDS_REGEXP.test(match[0].split('.').pop().split('?').shift()));
	
	                if (matchOk) {
	                    matches.push({
	                        href: match[0],
	                        start: match.index,
	                        end: matchEnd
	                    });
	                }
	            }
	            return matches;
	        },
	
	        createAutoLink: function (textNodes, href) {
	            href = MediumEditor.util.ensureUrlHasProtocol(href);
	            var anchor = MediumEditor.util.createLink(this.document, textNodes, href, this.getEditorOption('targetBlank') ? '_blank' : null),
	                span = this.document.createElement('span');
	            span.setAttribute('data-auto-link', 'true');
	            span.setAttribute('data-href', href);
	            anchor.insertBefore(span, anchor.firstChild);
	            while (anchor.childNodes.length > 1) {
	                span.appendChild(anchor.childNodes[1]);
	            }
	        }
	
	    });
	
	    MediumEditor.extensions.autoLink = AutoLink;
	}());
	
	(function () {
	    'use strict';
	
	    var CLASS_DRAG_OVER = 'medium-editor-dragover';
	
	    function clearClassNames(element) {
	        var editable = MediumEditor.util.getContainerEditorElement(element),
	            existing = Array.prototype.slice.call(editable.parentElement.querySelectorAll('.' + CLASS_DRAG_OVER));
	
	        existing.forEach(function (el) {
	            el.classList.remove(CLASS_DRAG_OVER);
	        });
	    }
	
	    var FileDragging = MediumEditor.Extension.extend({
	        name: 'fileDragging',
	
	        allowedTypes: ['image'],
	
	        init: function () {
	            MediumEditor.Extension.prototype.init.apply(this, arguments);
	
	            this.subscribe('editableDrag', this.handleDrag.bind(this));
	            this.subscribe('editableDrop', this.handleDrop.bind(this));
	        },
	
	        handleDrag: function (event) {
	            event.preventDefault();
	            event.dataTransfer.dropEffect = 'copy';
	
	            var target = event.target.classList ? event.target : event.target.parentElement;
	
	            // Ensure the class gets removed from anything that had it before
	            clearClassNames(target);
	
	            if (event.type === 'dragover') {
	                target.classList.add(CLASS_DRAG_OVER);
	            }
	        },
	
	        handleDrop: function (event) {
	            // Prevent file from opening in the current window
	            event.preventDefault();
	            event.stopPropagation();
	            // Select the dropping target, and set the selection to the end of the target
	            // https://github.com/yabwe/medium-editor/issues/980
	            this.base.selectElement(event.target);
	            var selection = this.base.exportSelection();
	            selection.start = selection.end;
	            this.base.importSelection(selection);
	            // IE9 does not support the File API, so prevent file from opening in the window
	            // but also don't try to actually get the file
	            if (event.dataTransfer.files) {
	                Array.prototype.slice.call(event.dataTransfer.files).forEach(function (file) {
	                    if (this.isAllowedFile(file)) {
	                        if (file.type.match('image')) {
	                            this.insertImageFile(file);
	                        }
	                    }
	                }, this);
	            }
	
	            // Make sure we remove our class from everything
	            clearClassNames(event.target);
	        },
	
	        isAllowedFile: function (file) {
	            return this.allowedTypes.some(function (fileType) {
	                return !!file.type.match(fileType);
	            });
	        },
	
	        insertImageFile: function (file) {
	            if (typeof FileReader !== 'function') {
	                return;
	            }
	            var fileReader = new FileReader();
	            fileReader.readAsDataURL(file);
	
	            // attach the onload event handler, makes it easier to listen in with jasmine
	            fileReader.addEventListener('load', function (e) {
	                var addImageElement = this.document.createElement('img');
	                addImageElement.src = e.target.result;
	                MediumEditor.util.insertHTMLCommand(this.document, addImageElement.outerHTML);
	            }.bind(this));
	        }
	    });
	
	    MediumEditor.extensions.fileDragging = FileDragging;
	}());
	
	(function () {
	    'use strict';
	
	    var KeyboardCommands = MediumEditor.Extension.extend({
	        name: 'keyboard-commands',
	
	        /* KeyboardCommands Options */
	
	        /* commands: [Array]
	         * Array of objects describing each command and the combination of keys that will trigger it
	         * Required for each object:
	         *   command [String] (argument passed to editor.execAction())
	         *   key [String] (keyboard character that triggers this command)
	         *   meta [boolean] (whether the ctrl/meta key has to be active or inactive)
	         *   shift [boolean] (whether the shift key has to be active or inactive)
	         *   alt [boolean] (whether the alt key has to be active or inactive)
	         */
	        commands: [
	            {
	                command: 'bold',
	                key: 'B',
	                meta: true,
	                shift: false,
	                alt: false
	            },
	            {
	                command: 'italic',
	                key: 'I',
	                meta: true,
	                shift: false,
	                alt: false
	            },
	            {
	                command: 'underline',
	                key: 'U',
	                meta: true,
	                shift: false,
	                alt: false
	            }
	        ],
	
	        init: function () {
	            MediumEditor.Extension.prototype.init.apply(this, arguments);
	
	            this.subscribe('editableKeydown', this.handleKeydown.bind(this));
	            this.keys = {};
	            this.commands.forEach(function (command) {
	                var keyCode = command.key.charCodeAt(0);
	                if (!this.keys[keyCode]) {
	                    this.keys[keyCode] = [];
	                }
	                this.keys[keyCode].push(command);
	            }, this);
	        },
	
	        handleKeydown: function (event) {
	            var keyCode = MediumEditor.util.getKeyCode(event);
	            if (!this.keys[keyCode]) {
	                return;
	            }
	
	            var isMeta = MediumEditor.util.isMetaCtrlKey(event),
	                isShift = !!event.shiftKey,
	                isAlt = !!event.altKey;
	
	            this.keys[keyCode].forEach(function (data) {
	                if (data.meta === isMeta &&
	                    data.shift === isShift &&
	                    (data.alt === isAlt ||
	                     undefined === data.alt)) { // TODO deprecated: remove check for undefined === data.alt when jumping to 6.0.0
	                    event.preventDefault();
	                    event.stopPropagation();
	
	                    // command can be a function to execute
	                    if (typeof data.command === 'function') {
	                        data.command.apply(this);
	                    }
	                    // command can be false so the shortcut is just disabled
	                    else if (false !== data.command) {
	                        this.execAction(data.command);
	                    }
	                }
	            }, this);
	        }
	    });
	
	    MediumEditor.extensions.keyboardCommands = KeyboardCommands;
	}());
	
	(function () {
	    'use strict';
	
	    var FontNameForm = MediumEditor.extensions.form.extend({
	
	        name: 'fontname',
	        action: 'fontName',
	        aria: 'change font name',
	        contentDefault: '&#xB1;', // ±
	        contentFA: '<i class="fa fa-font"></i>',
	
	        fonts: ['', 'Arial', 'Verdana', 'Times New Roman'],
	
	        init: function () {
	            MediumEditor.extensions.form.prototype.init.apply(this, arguments);
	        },
	
	        // Called when the button the toolbar is clicked
	        // Overrides ButtonExtension.handleClick
	        handleClick: function (event) {
	            event.preventDefault();
	            event.stopPropagation();
	
	            if (!this.isDisplayed()) {
	                // Get FontName of current selection (convert to string since IE returns this as number)
	                var fontName = this.document.queryCommandValue('fontName') + '';
	                this.showForm(fontName);
	            }
	
	            return false;
	        },
	
	        // Called by medium-editor to append form to the toolbar
	        getForm: function () {
	            if (!this.form) {
	                this.form = this.createForm();
	            }
	            return this.form;
	        },
	
	        // Used by medium-editor when the default toolbar is to be displayed
	        isDisplayed: function () {
	            return this.getForm().style.display === 'block';
	        },
	
	        hideForm: function () {
	            this.getForm().style.display = 'none';
	            this.getSelect().value = '';
	        },
	
	        showForm: function (fontName) {
	            var select = this.getSelect();
	
	            this.base.saveSelection();
	            this.hideToolbarDefaultActions();
	            this.getForm().style.display = 'block';
	            this.setToolbarPosition();
	
	            select.value = fontName || '';
	            select.focus();
	        },
	
	        // Called by core when tearing down medium-editor (destroy)
	        destroy: function () {
	            if (!this.form) {
	                return false;
	            }
	
	            if (this.form.parentNode) {
	                this.form.parentNode.removeChild(this.form);
	            }
	
	            delete this.form;
	        },
	
	        // core methods
	
	        doFormSave: function () {
	            this.base.restoreSelection();
	            this.base.checkSelection();
	        },
	
	        doFormCancel: function () {
	            this.base.restoreSelection();
	            this.clearFontName();
	            this.base.checkSelection();
	        },
	
	        // form creation and event handling
	        createForm: function () {
	            var doc = this.document,
	                form = doc.createElement('div'),
	                select = doc.createElement('select'),
	                close = doc.createElement('a'),
	                save = doc.createElement('a'),
	                option;
	
	            // Font Name Form (div)
	            form.className = 'medium-editor-toolbar-form';
	            form.id = 'medium-editor-toolbar-form-fontname-' + this.getEditorId();
	
	            // Handle clicks on the form itself
	            this.on(form, 'click', this.handleFormClick.bind(this));
	
	            // Add font names
	            for (var i = 0; i<this.fonts.length; i++) {
	                option = doc.createElement('option');
	                option.innerHTML = this.fonts[i];
	                option.value = this.fonts[i];
	                select.appendChild(option);
	            }
	
	            select.className = 'medium-editor-toolbar-select';
	            form.appendChild(select);
	
	            // Handle typing in the textbox
	            this.on(select, 'change', this.handleFontChange.bind(this));
	
	            // Add save buton
	            save.setAttribute('href', '#');
	            save.className = 'medium-editor-toobar-save';
	            save.innerHTML = this.getEditorOption('buttonLabels') === 'fontawesome' ?
	                             '<i class="fa fa-check"></i>' :
	                             '&#10003;';
	            form.appendChild(save);
	
	            // Handle save button clicks (capture)
	            this.on(save, 'click', this.handleSaveClick.bind(this), true);
	
	            // Add close button
	            close.setAttribute('href', '#');
	            close.className = 'medium-editor-toobar-close';
	            close.innerHTML = this.getEditorOption('buttonLabels') === 'fontawesome' ?
	                              '<i class="fa fa-times"></i>' :
	                              '&times;';
	            form.appendChild(close);
	
	            // Handle close button clicks
	            this.on(close, 'click', this.handleCloseClick.bind(this));
	
	            return form;
	        },
	
	        getSelect: function () {
	            return this.getForm().querySelector('select.medium-editor-toolbar-select');
	        },
	
	        clearFontName: function () {
	            MediumEditor.selection.getSelectedElements(this.document).forEach(function (el) {
	                if (el.nodeName.toLowerCase() === 'font' && el.hasAttribute('face')) {
	                    el.removeAttribute('face');
	                }
	            });
	        },
	
	        handleFontChange: function () {
	            var font = this.getSelect().value;
	            if (font === '') {
	                this.clearFontName();
	            } else {
	                this.execAction('fontName', { value: font });
	            }
	        },
	
	        handleFormClick: function (event) {
	            // make sure not to hide form when clicking inside the form
	            event.stopPropagation();
	        },
	
	        handleSaveClick: function (event) {
	            // Clicking Save -> create the font size
	            event.preventDefault();
	            this.doFormSave();
	        },
	
	        handleCloseClick: function (event) {
	            // Click Close -> close the form
	            event.preventDefault();
	            this.doFormCancel();
	        }
	    });
	
	    MediumEditor.extensions.fontName = FontNameForm;
	}());
	
	(function () {
	    'use strict';
	
	    var FontSizeForm = MediumEditor.extensions.form.extend({
	
	        name: 'fontsize',
	        action: 'fontSize',
	        aria: 'increase/decrease font size',
	        contentDefault: '&#xB1;', // ±
	        contentFA: '<i class="fa fa-text-height"></i>',
	
	        init: function () {
	            MediumEditor.extensions.form.prototype.init.apply(this, arguments);
	        },
	
	        // Called when the button the toolbar is clicked
	        // Overrides ButtonExtension.handleClick
	        handleClick: function (event) {
	            event.preventDefault();
	            event.stopPropagation();
	
	            if (!this.isDisplayed()) {
	                // Get fontsize of current selection (convert to string since IE returns this as number)
	                var fontSize = this.document.queryCommandValue('fontSize') + '';
	                this.showForm(fontSize);
	            }
	
	            return false;
	        },
	
	        // Called by medium-editor to append form to the toolbar
	        getForm: function () {
	            if (!this.form) {
	                this.form = this.createForm();
	            }
	            return this.form;
	        },
	
	        // Used by medium-editor when the default toolbar is to be displayed
	        isDisplayed: function () {
	            return this.getForm().style.display === 'block';
	        },
	
	        hideForm: function () {
	            this.getForm().style.display = 'none';
	            this.getInput().value = '';
	        },
	
	        showForm: function (fontSize) {
	            var input = this.getInput();
	
	            this.base.saveSelection();
	            this.hideToolbarDefaultActions();
	            this.getForm().style.display = 'block';
	            this.setToolbarPosition();
	
	            input.value = fontSize || '';
	            input.focus();
	        },
	
	        // Called by core when tearing down medium-editor (destroy)
	        destroy: function () {
	            if (!this.form) {
	                return false;
	            }
	
	            if (this.form.parentNode) {
	                this.form.parentNode.removeChild(this.form);
	            }
	
	            delete this.form;
	        },
	
	        // core methods
	
	        doFormSave: function () {
	            this.base.restoreSelection();
	            this.base.checkSelection();
	        },
	
	        doFormCancel: function () {
	            this.base.restoreSelection();
	            this.clearFontSize();
	            this.base.checkSelection();
	        },
	
	        // form creation and event handling
	        createForm: function () {
	            var doc = this.document,
	                form = doc.createElement('div'),
	                input = doc.createElement('input'),
	                close = doc.createElement('a'),
	                save = doc.createElement('a');
	
	            // Font Size Form (div)
	            form.className = 'medium-editor-toolbar-form';
	            form.id = 'medium-editor-toolbar-form-fontsize-' + this.getEditorId();
	
	            // Handle clicks on the form itself
	            this.on(form, 'click', this.handleFormClick.bind(this));
	
	            // Add font size slider
	            input.setAttribute('type', 'range');
	            input.setAttribute('min', '1');
	            input.setAttribute('max', '7');
	            input.className = 'medium-editor-toolbar-input';
	            form.appendChild(input);
	
	            // Handle typing in the textbox
	            this.on(input, 'change', this.handleSliderChange.bind(this));
	
	            // Add save buton
	            save.setAttribute('href', '#');
	            save.className = 'medium-editor-toobar-save';
	            save.innerHTML = this.getEditorOption('buttonLabels') === 'fontawesome' ?
	                             '<i class="fa fa-check"></i>' :
	                             '&#10003;';
	            form.appendChild(save);
	
	            // Handle save button clicks (capture)
	            this.on(save, 'click', this.handleSaveClick.bind(this), true);
	
	            // Add close button
	            close.setAttribute('href', '#');
	            close.className = 'medium-editor-toobar-close';
	            close.innerHTML = this.getEditorOption('buttonLabels') === 'fontawesome' ?
	                              '<i class="fa fa-times"></i>' :
	                              '&times;';
	            form.appendChild(close);
	
	            // Handle close button clicks
	            this.on(close, 'click', this.handleCloseClick.bind(this));
	
	            return form;
	        },
	
	        getInput: function () {
	            return this.getForm().querySelector('input.medium-editor-toolbar-input');
	        },
	
	        clearFontSize: function () {
	            MediumEditor.selection.getSelectedElements(this.document).forEach(function (el) {
	                if (el.nodeName.toLowerCase() === 'font' && el.hasAttribute('size')) {
	                    el.removeAttribute('size');
	                }
	            });
	        },
	
	        handleSliderChange: function () {
	            var size = this.getInput().value;
	            if (size === '4') {
	                this.clearFontSize();
	            } else {
	                this.execAction('fontSize', { value: size });
	            }
	        },
	
	        handleFormClick: function (event) {
	            // make sure not to hide form when clicking inside the form
	            event.stopPropagation();
	        },
	
	        handleSaveClick: function (event) {
	            // Clicking Save -> create the font size
	            event.preventDefault();
	            this.doFormSave();
	        },
	
	        handleCloseClick: function (event) {
	            // Click Close -> close the form
	            event.preventDefault();
	            this.doFormCancel();
	        }
	    });
	
	    MediumEditor.extensions.fontSize = FontSizeForm;
	}());
	(function () {
	    'use strict';
	
	    /* Helpers and internal variables that don't need to be members of actual paste handler */
	
	    var pasteBinDefaultContent = '%ME_PASTEBIN%',
	        lastRange = null,
	        keyboardPasteEditable = null,
	        stopProp = function (event) {
	            event.stopPropagation();
	        };
	
	    /*jslint regexp: true*/
	    /*
	        jslint does not allow character negation, because the negation
	        will not match any unicode characters. In the regexes in this
	        block, negation is used specifically to match the end of an html
	        tag, and in fact unicode characters *should* be allowed.
	    */
	    function createReplacements() {
	        return [
	            // Remove anything but the contents within the BODY element
	            [new RegExp(/^[\s\S]*<body[^>]*>\s*|\s*<\/body[^>]*>[\s\S]*$/g), ''],
	
	            // cleanup comments added by Chrome when pasting html
	            [new RegExp(/<!--StartFragment-->|<!--EndFragment-->/g), ''],
	
	            // Trailing BR elements
	            [new RegExp(/<br>$/i), ''],
	
	            // replace two bogus tags that begin pastes from google docs
	            [new RegExp(/<[^>]*docs-internal-guid[^>]*>/gi), ''],
	            [new RegExp(/<\/b>(<br[^>]*>)?$/gi), ''],
	
	             // un-html spaces and newlines inserted by OS X
	            [new RegExp(/<span class="Apple-converted-space">\s+<\/span>/g), ' '],
	            [new RegExp(/<br class="Apple-interchange-newline">/g), '<br>'],
	
	            // replace google docs italics+bold with a span to be replaced once the html is inserted
	            [new RegExp(/<span[^>]*(font-style:italic;font-weight:(bold|700)|font-weight:(bold|700);font-style:italic)[^>]*>/gi), '<span class="replace-with italic bold">'],
	
	            // replace google docs italics with a span to be replaced once the html is inserted
	            [new RegExp(/<span[^>]*font-style:italic[^>]*>/gi), '<span class="replace-with italic">'],
	
	            //[replace google docs bolds with a span to be replaced once the html is inserted
	            [new RegExp(/<span[^>]*font-weight:(bold|700)[^>]*>/gi), '<span class="replace-with bold">'],
	
	             // replace manually entered b/i/a tags with real ones
	            [new RegExp(/&lt;(\/?)(i|b|a)&gt;/gi), '<$1$2>'],
	
	             // replace manually a tags with real ones, converting smart-quotes from google docs
	            [new RegExp(/&lt;a(?:(?!href).)+href=(?:&quot;|&rdquo;|&ldquo;|"|“|”)(((?!&quot;|&rdquo;|&ldquo;|"|“|”).)*)(?:&quot;|&rdquo;|&ldquo;|"|“|”)(?:(?!&gt;).)*&gt;/gi), '<a href="$1">'],
	
	            // Newlines between paragraphs in html have no syntactic value,
	            // but then have a tendency to accidentally become additional paragraphs down the line
	            [new RegExp(/<\/p>\n+/gi), '</p>'],
	            [new RegExp(/\n+<p/gi), '<p'],
	
	            // Microsoft Word makes these odd tags, like <o:p></o:p>
	            [new RegExp(/<\/?o:[a-z]*>/gi), ''],
	
	            // Microsoft Word adds some special elements around list items
	            [new RegExp(/<!\[if !supportLists\]>(((?!<!).)*)<!\[endif]\>/gi), '$1']
	        ];
	    }
	    /*jslint regexp: false*/
	
	    /**
	     * Gets various content types out of the Clipboard API. It will also get the
	     * plain text using older IE and WebKit API.
	     *
	     * @param {event} event Event fired on paste.
	     * @param {win} reference to window
	     * @param {doc} reference to document
	     * @return {Object} Object with mime types and data for those mime types.
	     */
	    function getClipboardContent(event, win, doc) {
	        var dataTransfer = event.clipboardData || win.clipboardData || doc.dataTransfer,
	            data = {};
	
	        if (!dataTransfer) {
	            return data;
	        }
	
	        // Use old WebKit/IE API
	        if (dataTransfer.getData) {
	            var legacyText = dataTransfer.getData('Text');
	            if (legacyText && legacyText.length > 0) {
	                data['text/plain'] = legacyText;
	            }
	        }
	
	        if (dataTransfer.types) {
	            for (var i = 0; i < dataTransfer.types.length; i++) {
	                var contentType = dataTransfer.types[i];
	                data[contentType] = dataTransfer.getData(contentType);
	            }
	        }
	
	        return data;
	    }
	
	    var PasteHandler = MediumEditor.Extension.extend({
	        /* Paste Options */
	
	        /* forcePlainText: [boolean]
	         * Forces pasting as plain text.
	         */
	        forcePlainText: true,
	
	        /* cleanPastedHTML: [boolean]
	         * cleans pasted content from different sources, like google docs etc.
	         */
	        cleanPastedHTML: false,
	
	        /* preCleanReplacements: [Array]
	         * custom pairs (2 element arrays) of RegExp and replacement text to use during past when
	         * __forcePlainText__ or __cleanPastedHTML__ are `true` OR when calling `cleanPaste(text)` helper method.
	         * These replacements are executed before any medium editor defined replacements.
	         */
	        preCleanReplacements: [],
	
	        /* cleanReplacements: [Array]
	         * custom pairs (2 element arrays) of RegExp and replacement text to use during paste when
	         * __forcePlainText__ or __cleanPastedHTML__ are `true` OR when calling `cleanPaste(text)` helper method.
	         * These replacements are executed after any medium editor defined replacements.
	         */
	        cleanReplacements: [],
	
	        /* cleanAttrs:: [Array]
	         * list of element attributes to remove during paste when __cleanPastedHTML__ is `true` or when
	         * calling `cleanPaste(text)` or `pasteHTML(html, options)` helper methods.
	         */
	        cleanAttrs: ['class', 'style', 'dir'],
	
	        /* cleanTags: [Array]
	         * list of element tag names to remove during paste when __cleanPastedHTML__ is `true` or when
	         * calling `cleanPaste(text)` or `pasteHTML(html, options)` helper methods.
	         */
	        cleanTags: ['meta'],
	
	        init: function () {
	            MediumEditor.Extension.prototype.init.apply(this, arguments);
	
	            if (this.forcePlainText || this.cleanPastedHTML) {
	                this.subscribe('editableKeydown', this.handleKeydown.bind(this));
	                // We need access to the full event data in paste
	                // so we can't use the editablePaste event here
	                this.getEditorElements().forEach(function (element) {
	                    this.on(element, 'paste', this.handlePaste.bind(this));
	                }, this);
	                this.subscribe('addElement', this.handleAddElement.bind(this));
	            }
	        },
	
	        handleAddElement: function (event, editable) {
	            this.on(editable, 'paste', this.handlePaste.bind(this));
	        },
	
	        destroy: function () {
	            // Make sure pastebin is destroyed in case it's still around for some reason
	            if (this.forcePlainText || this.cleanPastedHTML) {
	                this.removePasteBin();
	            }
	        },
	
	        handlePaste: function (event, editable) {
	            if (event.defaultPrevented) {
	                return;
	            }
	
	            var clipboardContent = getClipboardContent(event, this.window, this.document),
	                pastedHTML = clipboardContent['text/html'],
	                pastedPlain = clipboardContent['text/plain'];
	
	            if (this.window.clipboardData && event.clipboardData === undefined && !pastedHTML) {
	                // If window.clipboardData exists, but event.clipboardData doesn't exist,
	                // we're probably in IE. IE only has two possibilities for clipboard
	                // data format: 'Text' and 'URL'.
	                //
	                // For IE, we'll fallback to 'Text' for text/html
	                pastedHTML = pastedPlain;
	            }
	
	            if (pastedHTML || pastedPlain) {
	                event.preventDefault();
	
	                this.doPaste(pastedHTML, pastedPlain, editable);
	            }
	        },
	
	        doPaste: function (pastedHTML, pastedPlain, editable) {
	            var paragraphs,
	                html = '',
	                p;
	
	            if (this.cleanPastedHTML && pastedHTML) {
	                return this.cleanPaste(pastedHTML);
	            }
	
	            if (!(this.getEditorOption('disableReturn') || (editable && editable.getAttribute('data-disable-return')))) {
	                paragraphs = pastedPlain.split(/[\r\n]+/g);
	                // If there are no \r\n in data, don't wrap in <p>
	                if (paragraphs.length > 1) {
	                    for (p = 0; p < paragraphs.length; p += 1) {
	                        if (paragraphs[p] !== '') {
	                            html += '<p>' + MediumEditor.util.htmlEntities(paragraphs[p]) + '</p>';
	                        }
	                    }
	                } else {
	                    html = MediumEditor.util.htmlEntities(paragraphs[0]);
	                }
	            } else {
	                html = MediumEditor.util.htmlEntities(pastedPlain);
	            }
	            MediumEditor.util.insertHTMLCommand(this.document, html);
	        },
	
	        handlePasteBinPaste: function (event) {
	            if (event.defaultPrevented) {
	                this.removePasteBin();
	                return;
	            }
	
	            var clipboardContent = getClipboardContent(event, this.window, this.document),
	                pastedHTML = clipboardContent['text/html'],
	                pastedPlain = clipboardContent['text/plain'],
	                editable = keyboardPasteEditable;
	
	            // If we have valid html already, or we're not in cleanPastedHTML mode
	            // we can ignore the paste bin and just paste now
	            if (!this.cleanPastedHTML || pastedHTML) {
	                event.preventDefault();
	                this.removePasteBin();
	                this.doPaste(pastedHTML, pastedPlain, editable);
	
	                // The event handling code listens for paste on the editable element
	                // in order to trigger the editablePaste event.  Since this paste event
	                // is happening on the pastebin, the event handling code never knows about it
	                // So, we have to trigger editablePaste manually
	                this.trigger('editablePaste', { currentTarget: editable, target: editable }, editable);
	                return;
	            }
	
	            // We need to look at the paste bin, so do a setTimeout to let the paste
	            // fall through into the paste bin
	            setTimeout(function () {
	                // Only look for HTML if we're in cleanPastedHTML mode
	                if (this.cleanPastedHTML) {
	                    // If clipboard didn't have HTML, try the paste bin
	                    pastedHTML = this.getPasteBinHtml();
	                }
	
	                // If we needed the paste bin, we're done with it now, remove it
	                this.removePasteBin();
	
	                // Handle the paste with the html from the paste bin
	                this.doPaste(pastedHTML, pastedPlain, editable);
	
	                // The event handling code listens for paste on the editable element
	                // in order to trigger the editablePaste event.  Since this paste event
	                // is happening on the pastebin, the event handling code never knows about it
	                // So, we have to trigger editablePaste manually
	                this.trigger('editablePaste', { currentTarget: editable, target: editable }, editable);
	            }.bind(this), 0);
	        },
	
	        handleKeydown: function (event, editable) {
	            // if it's not Ctrl+V, do nothing
	            if (!(MediumEditor.util.isKey(event, MediumEditor.util.keyCode.V) && MediumEditor.util.isMetaCtrlKey(event))) {
	                return;
	            }
	
	            event.stopImmediatePropagation();
	
	            this.removePasteBin();
	            this.createPasteBin(editable);
	        },
	
	        createPasteBin: function (editable) {
	            var rects,
	                range = MediumEditor.selection.getSelectionRange(this.document),
	                top = this.window.pageYOffset;
	
	            keyboardPasteEditable = editable;
	
	            if (range) {
	                rects = range.getClientRects();
	
	                // on empty line, rects is empty so we grab information from the first container of the range
	                if (rects.length) {
	                    top += rects[0].top;
	                } else {
	                    top += range.startContainer.getBoundingClientRect().top;
	                }
	            }
	
	            lastRange = range;
	
	            var pasteBinElm = this.document.createElement('div');
	            pasteBinElm.id = this.pasteBinId = 'medium-editor-pastebin-' + (+Date.now());
	            pasteBinElm.setAttribute('style', 'border: 1px red solid; position: absolute; top: ' + top + 'px; width: 10px; height: 10px; overflow: hidden; opacity: 0');
	            pasteBinElm.setAttribute('contentEditable', true);
	            pasteBinElm.innerHTML = pasteBinDefaultContent;
	
	            this.document.body.appendChild(pasteBinElm);
	
	            // avoid .focus() to stop other event (actually the paste event)
	            this.on(pasteBinElm, 'focus', stopProp);
	            this.on(pasteBinElm, 'focusin', stopProp);
	            this.on(pasteBinElm, 'focusout', stopProp);
	
	            pasteBinElm.focus();
	
	            MediumEditor.selection.selectNode(pasteBinElm, this.document);
	
	            if (!this.boundHandlePaste) {
	                this.boundHandlePaste = this.handlePasteBinPaste.bind(this);
	            }
	
	            this.on(pasteBinElm, 'paste', this.boundHandlePaste);
	        },
	
	        removePasteBin: function () {
	            if (null !== lastRange) {
	                MediumEditor.selection.selectRange(this.document, lastRange);
	                lastRange = null;
	            }
	
	            if (null !== keyboardPasteEditable) {
	                keyboardPasteEditable = null;
	            }
	
	            var pasteBinElm = this.getPasteBin();
	            if (!pasteBinElm) {
	                return;
	            }
	
	            if (pasteBinElm) {
	                this.off(pasteBinElm, 'focus', stopProp);
	                this.off(pasteBinElm, 'focusin', stopProp);
	                this.off(pasteBinElm, 'focusout', stopProp);
	                this.off(pasteBinElm, 'paste', this.boundHandlePaste);
	                pasteBinElm.parentElement.removeChild(pasteBinElm);
	            }
	        },
	
	        getPasteBin: function () {
	            return this.document.getElementById(this.pasteBinId);
	        },
	
	        getPasteBinHtml: function () {
	            var pasteBinElm = this.getPasteBin();
	
	            if (!pasteBinElm) {
	                return false;
	            }
	
	            // WebKit has a nice bug where it clones the paste bin if you paste from for example notepad
	            // so we need to force plain text mode in this case
	            if (pasteBinElm.firstChild && pasteBinElm.firstChild.id === 'mcepastebin') {
	                return false;
	            }
	
	            var pasteBinHtml = pasteBinElm.innerHTML;
	
	            // If paste bin is empty try using plain text mode
	            // since that is better than nothing right
	            if (!pasteBinHtml || pasteBinHtml === pasteBinDefaultContent) {
	                return false;
	            }
	
	            return pasteBinHtml;
	        },
	
	        cleanPaste: function (text) {
	            var i, elList, tmp, workEl,
	                multiline = /<p|<br|<div/.test(text),
	                replacements = [].concat(
	                    this.preCleanReplacements || [],
	                    createReplacements(),
	                    this.cleanReplacements || []);
	
	            for (i = 0; i < replacements.length; i += 1) {
	                text = text.replace(replacements[i][0], replacements[i][1]);
	            }
	
	            if (!multiline) {
	                return this.pasteHTML(text);
	            }
	
	            // create a temporary div to cleanup block elements
	            tmp = this.document.createElement('div');
	
	            // double br's aren't converted to p tags, but we want paragraphs.
	            tmp.innerHTML = '<p>' + text.split('<br><br>').join('</p><p>') + '</p>';
	
	            // block element cleanup
	            elList = tmp.querySelectorAll('a,p,div,br');
	            for (i = 0; i < elList.length; i += 1) {
	                workEl = elList[i];
	
	                // Microsoft Word replaces some spaces with newlines.
	                // While newlines between block elements are meaningless, newlines within
	                // elements are sometimes actually spaces.
	                workEl.innerHTML = workEl.innerHTML.replace(/\n/gi, ' ');
	
	                switch (workEl.nodeName.toLowerCase()) {
	                    case 'p':
	                    case 'div':
	                        this.filterCommonBlocks(workEl);
	                        break;
	                    case 'br':
	                        this.filterLineBreak(workEl);
	                        break;
	                }
	            }
	
	            this.pasteHTML(tmp.innerHTML);
	        },
	
	        pasteHTML: function (html, options) {
	            options = MediumEditor.util.defaults({}, options, {
	                cleanAttrs: this.cleanAttrs,
	                cleanTags: this.cleanTags
	            });
	
	            var elList, workEl, i, fragmentBody, pasteBlock = this.document.createDocumentFragment();
	
	            pasteBlock.appendChild(this.document.createElement('body'));
	
	            fragmentBody = pasteBlock.querySelector('body');
	            fragmentBody.innerHTML = html;
	
	            this.cleanupSpans(fragmentBody);
	
	            elList = fragmentBody.querySelectorAll('*');
	            for (i = 0; i < elList.length; i += 1) {
	                workEl = elList[i];
	
	                if ('a' === workEl.nodeName.toLowerCase() && this.getEditorOption('targetBlank')) {
	                    MediumEditor.util.setTargetBlank(workEl);
	                }
	
	                MediumEditor.util.cleanupAttrs(workEl, options.cleanAttrs);
	                MediumEditor.util.cleanupTags(workEl, options.cleanTags);
	            }
	
	            MediumEditor.util.insertHTMLCommand(this.document, fragmentBody.innerHTML.replace(/&nbsp;/g, ' '));
	        },
	
	        // TODO (6.0): Make this an internal helper instead of member of paste handler
	        isCommonBlock: function (el) {
	            return (el && (el.nodeName.toLowerCase() === 'p' || el.nodeName.toLowerCase() === 'div'));
	        },
	
	        // TODO (6.0): Make this an internal helper instead of member of paste handler
	        filterCommonBlocks: function (el) {
	            if (/^\s*$/.test(el.textContent) && el.parentNode) {
	                el.parentNode.removeChild(el);
	            }
	        },
	
	        // TODO (6.0): Make this an internal helper instead of member of paste handler
	        filterLineBreak: function (el) {
	            if (this.isCommonBlock(el.previousElementSibling)) {
	                // remove stray br's following common block elements
	                this.removeWithParent(el);
	            } else if (this.isCommonBlock(el.parentNode) && (el.parentNode.firstChild === el || el.parentNode.lastChild === el)) {
	                // remove br's just inside open or close tags of a div/p
	                this.removeWithParent(el);
	            } else if (el.parentNode && el.parentNode.childElementCount === 1 && el.parentNode.textContent === '') {
	                // and br's that are the only child of elements other than div/p
	                this.removeWithParent(el);
	            }
	        },
	
	        // TODO (6.0): Make this an internal helper instead of member of paste handler
	        // remove an element, including its parent, if it is the only element within its parent
	        removeWithParent: function (el) {
	            if (el && el.parentNode) {
	                if (el.parentNode.parentNode && el.parentNode.childElementCount === 1) {
	                    el.parentNode.parentNode.removeChild(el.parentNode);
	                } else {
	                    el.parentNode.removeChild(el);
	                }
	            }
	        },
	
	        // TODO (6.0): Make this an internal helper instead of member of paste handler
	        cleanupSpans: function (containerEl) {
	            var i,
	                el,
	                newEl,
	                spans = containerEl.querySelectorAll('.replace-with'),
	                isCEF = function (el) {
	                    return (el && el.nodeName !== '#text' && el.getAttribute('contenteditable') === 'false');
	                };
	
	            for (i = 0; i < spans.length; i += 1) {
	                el = spans[i];
	                newEl = this.document.createElement(el.classList.contains('bold') ? 'b' : 'i');
	
	                if (el.classList.contains('bold') && el.classList.contains('italic')) {
	                    // add an i tag as well if this has both italics and bold
	                    newEl.innerHTML = '<i>' + el.innerHTML + '</i>';
	                } else {
	                    newEl.innerHTML = el.innerHTML;
	                }
	                el.parentNode.replaceChild(newEl, el);
	            }
	
	            spans = containerEl.querySelectorAll('span');
	            for (i = 0; i < spans.length; i += 1) {
	                el = spans[i];
	
	                // bail if span is in contenteditable = false
	                if (MediumEditor.util.traverseUp(el, isCEF)) {
	                    return false;
	                }
	
	                // remove empty spans, replace others with their contents
	                MediumEditor.util.unwrap(el, this.document);
	            }
	        }
	    });
	
	    MediumEditor.extensions.paste = PasteHandler;
	}());
	
	(function () {
	    'use strict';
	
	    var Placeholder = MediumEditor.Extension.extend({
	        name: 'placeholder',
	
	        /* Placeholder Options */
	
	        /* text: [string]
	         * Text to display in the placeholder
	         */
	        text: 'Type your text',
	
	        /* hideOnClick: [boolean]
	         * Should we hide the placeholder on click (true) or when user starts typing (false)
	         */
	        hideOnClick: true,
	
	        init: function () {
	            MediumEditor.Extension.prototype.init.apply(this, arguments);
	
	            this.initPlaceholders();
	            this.attachEventHandlers();
	        },
	
	        initPlaceholders: function () {
	            this.getEditorElements().forEach(this.initElement, this);
	        },
	
	        handleAddElement: function (event, editable) {
	            this.initElement(editable);
	        },
	
	        initElement: function (el) {
	            if (!el.getAttribute('data-placeholder')) {
	                el.setAttribute('data-placeholder', this.text);
	            }
	            this.updatePlaceholder(el);
	        },
	
	        destroy: function () {
	            this.getEditorElements().forEach(this.cleanupElement, this);
	        },
	
	        handleRemoveElement: function (event, editable) {
	            this.cleanupElement(editable);
	        },
	
	        cleanupElement: function (el) {
	            if (el.getAttribute('data-placeholder') === this.text) {
	                el.removeAttribute('data-placeholder');
	            }
	        },
	
	        showPlaceholder: function (el) {
	            if (el) {
	                // https://github.com/yabwe/medium-editor/issues/234
	                // In firefox, styling the placeholder with an absolutely positioned
	                // pseudo element causes the cursor to appear in a bad location
	                // when the element is completely empty, so apply a different class to
	                // style it with a relatively positioned pseudo element
	                if (MediumEditor.util.isFF && el.childNodes.length === 0) {
	                    el.classList.add('medium-editor-placeholder-relative');
	                    el.classList.remove('medium-editor-placeholder');
	                } else {
	                    el.classList.add('medium-editor-placeholder');
	                    el.classList.remove('medium-editor-placeholder-relative');
	                }
	            }
	        },
	
	        hidePlaceholder: function (el) {
	            if (el) {
	                el.classList.remove('medium-editor-placeholder');
	                el.classList.remove('medium-editor-placeholder-relative');
	            }
	        },
	
	        updatePlaceholder: function (el, dontShow) {
	            // If the element has content, hide the placeholder
	            if (el.querySelector('img, blockquote, ul, ol, table') || (el.textContent.replace(/^\s+|\s+$/g, '') !== '')) {
	                return this.hidePlaceholder(el);
	            }
	
	            if (!dontShow) {
	                this.showPlaceholder(el);
	            }
	        },
	
	        attachEventHandlers: function () {
	            if (this.hideOnClick) {
	                // For the 'hideOnClick' option, the placeholder should always be hidden on focus
	                this.subscribe('focus', this.handleFocus.bind(this));
	            }
	
	            // If the editor has content, it should always hide the placeholder
	            this.subscribe('editableInput', this.handleInput.bind(this));
	
	            // When the editor loses focus, check if the placeholder should be visible
	            this.subscribe('blur', this.handleBlur.bind(this));
	
	            // Need to know when elements are added/removed from the editor
	            this.subscribe('addElement', this.handleAddElement.bind(this));
	            this.subscribe('removeElement', this.handleRemoveElement.bind(this));
	        },
	
	        handleInput: function (event, element) {
	            // If the placeholder should be hidden on focus and the
	            // element has focus, don't show the placeholder
	            var dontShow = this.hideOnClick && (element === this.base.getFocusedElement());
	
	            // Editor's content has changed, check if the placeholder should be hidden
	            this.updatePlaceholder(element, dontShow);
	        },
	
	        handleFocus: function (event, element) {
	            // Editor has focus, hide the placeholder
	            this.hidePlaceholder(element);
	        },
	
	        handleBlur: function (event, element) {
	            // Editor has lost focus, check if the placeholder should be shown
	            this.updatePlaceholder(element);
	        }
	    });
	
	    MediumEditor.extensions.placeholder = Placeholder;
	}());
	
	(function () {
	    'use strict';
	
	    var Toolbar = MediumEditor.Extension.extend({
	        name: 'toolbar',
	
	        /* Toolbar Options */
	
	        /* align: ['left'|'center'|'right']
	         * When the __static__ option is true, this aligns the static toolbar
	         * relative to the medium-editor element.
	         */
	        align: 'center',
	
	        /* allowMultiParagraphSelection: [boolean]
	         * enables/disables whether the toolbar should be displayed when
	         * selecting multiple paragraphs/block elements
	         */
	        allowMultiParagraphSelection: true,
	
	        /* buttons: [Array]
	         * the names of the set of buttons to display on the toolbar.
	         */
	        buttons: ['bold', 'italic', 'underline', 'anchor', 'h2', 'h3', 'quote'],
	
	        /* diffLeft: [Number]
	         * value in pixels to be added to the X axis positioning of the toolbar.
	         */
	        diffLeft: 0,
	
	        /* diffTop: [Number]
	         * value in pixels to be added to the Y axis positioning of the toolbar.
	         */
	        diffTop: -10,
	
	        /* firstButtonClass: [string]
	         * CSS class added to the first button in the toolbar.
	         */
	        firstButtonClass: 'medium-editor-button-first',
	
	        /* lastButtonClass: [string]
	         * CSS class added to the last button in the toolbar.
	         */
	        lastButtonClass: 'medium-editor-button-last',
	
	        /* standardizeSelectionStart: [boolean]
	         * enables/disables standardizing how the beginning of a range is decided
	         * between browsers whenever the selected text is analyzed for updating toolbar buttons status.
	         */
	        standardizeSelectionStart: false,
	
	        /* static: [boolean]
	         * enable/disable the toolbar always displaying in the same location
	         * relative to the medium-editor element.
	         */
	        static: false,
	
	        /* sticky: [boolean]
	         * When the __static__ option is true, this enables/disables the toolbar
	         * "sticking" to the viewport and staying visible on the screen while
	         * the page scrolls.
	         */
	        sticky: false,
	
	        /* stickyTopOffset: [Number]
	         * Value in pixel of the top offset above the toolbar
	         */
	        stickyTopOffset: 0,
	
	        /* updateOnEmptySelection: [boolean]
	         * When the __static__ option is true, this enables/disables updating
	         * the state of the toolbar buttons even when the selection is collapsed
	         * (there is no selection, just a cursor).
	         */
	        updateOnEmptySelection: false,
	
	        /* relativeContainer: [node]
	         * appending the toolbar to a given node instead of body
	         */
	        relativeContainer: null,
	
	        init: function () {
	            MediumEditor.Extension.prototype.init.apply(this, arguments);
	
	            this.initThrottledMethods();
	
	            if (!this.relativeContainer) {
	                this.getEditorOption('elementsContainer').appendChild(this.getToolbarElement());
	            } else {
	                this.relativeContainer.appendChild(this.getToolbarElement());
	            }
	        },
	
	        // Helper method to execute method for every extension, but ignoring the toolbar extension
	        forEachExtension: function (iterator, context) {
	            return this.base.extensions.forEach(function (command) {
	                if (command === this) {
	                    return;
	                }
	                return iterator.apply(context || this, arguments);
	            }, this);
	        },
	
	        // Toolbar creation/deletion
	
	        createToolbar: function () {
	            var toolbar = this.document.createElement('div');
	
	            toolbar.id = 'medium-editor-toolbar-' + this.getEditorId();
	            toolbar.className = 'medium-editor-toolbar';
	
	            if (this.static) {
	                toolbar.className += ' static-toolbar';
	            } else if (this.relativeContainer) {
	                toolbar.className += ' medium-editor-relative-toolbar';
	            } else {
	                toolbar.className += ' medium-editor-stalker-toolbar';
	            }
	
	            toolbar.appendChild(this.createToolbarButtons());
	
	            // Add any forms that extensions may have
	            this.forEachExtension(function (extension) {
	                if (extension.hasForm) {
	                    toolbar.appendChild(extension.getForm());
	                }
	            });
	
	            this.attachEventHandlers();
	
	            return toolbar;
	        },
	
	        createToolbarButtons: function () {
	            var ul = this.document.createElement('ul'),
	                li,
	                btn,
	                buttons,
	                extension,
	                buttonName,
	                buttonOpts;
	
	            ul.id = 'medium-editor-toolbar-actions' + this.getEditorId();
	            ul.className = 'medium-editor-toolbar-actions';
	            ul.style.display = 'block';
	
	            this.buttons.forEach(function (button) {
	                if (typeof button === 'string') {
	                    buttonName = button;
	                    buttonOpts = null;
	                } else {
	                    buttonName = button.name;
	                    buttonOpts = button;
	                }
	
	                // If the button already exists as an extension, it'll be returned
	                // othwerise it'll create the default built-in button
	                extension = this.base.addBuiltInExtension(buttonName, buttonOpts);
	
	                if (extension && typeof extension.getButton === 'function') {
	                    btn = extension.getButton(this.base);
	                    li = this.document.createElement('li');
	                    if (MediumEditor.util.isElement(btn)) {
	                        li.appendChild(btn);
	                    } else {
	                        li.innerHTML = btn;
	                    }
	                    ul.appendChild(li);
	                }
	            }, this);
	
	            buttons = ul.querySelectorAll('button');
	            if (buttons.length > 0) {
	                buttons[0].classList.add(this.firstButtonClass);
	                buttons[buttons.length - 1].classList.add(this.lastButtonClass);
	            }
	
	            return ul;
	        },
	
	        destroy: function () {
	            if (this.toolbar) {
	                if (this.toolbar.parentNode) {
	                    this.toolbar.parentNode.removeChild(this.toolbar);
	                }
	                delete this.toolbar;
	            }
	        },
	
	        // Toolbar accessors
	
	        getInteractionElements: function () {
	            return this.getToolbarElement();
	        },
	
	        getToolbarElement: function () {
	            if (!this.toolbar) {
	                this.toolbar = this.createToolbar();
	            }
	
	            return this.toolbar;
	        },
	
	        getToolbarActionsElement: function () {
	            return this.getToolbarElement().querySelector('.medium-editor-toolbar-actions');
	        },
	
	        // Toolbar event handlers
	
	        initThrottledMethods: function () {
	            // throttledPositionToolbar is throttled because:
	            // - It will be called when the browser is resizing, which can fire many times very quickly
	            // - For some event (like resize) a slight lag in UI responsiveness is OK and provides performance benefits
	            this.throttledPositionToolbar = MediumEditor.util.throttle(function () {
	                if (this.base.isActive) {
	                    this.positionToolbarIfShown();
	                }
	            }.bind(this));
	        },
	
	        attachEventHandlers: function () {
	            // MediumEditor custom events for when user beings and ends interaction with a contenteditable and its elements
	            this.subscribe('blur', this.handleBlur.bind(this));
	            this.subscribe('focus', this.handleFocus.bind(this));
	
	            // Updating the state of the toolbar as things change
	            this.subscribe('editableClick', this.handleEditableClick.bind(this));
	            this.subscribe('editableKeyup', this.handleEditableKeyup.bind(this));
	
	            // Handle mouseup on document for updating the selection in the toolbar
	            this.on(this.document.documentElement, 'mouseup', this.handleDocumentMouseup.bind(this));
	
	            // Add a scroll event for sticky toolbar
	            if (this.static && this.sticky) {
	                // On scroll (capture), re-position the toolbar
	                this.on(this.window, 'scroll', this.handleWindowScroll.bind(this), true);
	            }
	
	            // On resize, re-position the toolbar
	            this.on(this.window, 'resize', this.handleWindowResize.bind(this));
	        },
	
	        handleWindowScroll: function () {
	            this.positionToolbarIfShown();
	        },
	
	        handleWindowResize: function () {
	            this.throttledPositionToolbar();
	        },
	
	        handleDocumentMouseup: function (event) {
	            // Do not trigger checkState when mouseup fires over the toolbar
	            if (event &&
	                    event.target &&
	                    MediumEditor.util.isDescendant(this.getToolbarElement(), event.target)) {
	                return false;
	            }
	            this.checkState();
	        },
	
	        handleEditableClick: function () {
	            // Delay the call to checkState to handle bug where selection is empty
	            // immediately after clicking inside a pre-existing selection
	            setTimeout(function () {
	                this.checkState();
	            }.bind(this), 0);
	        },
	
	        handleEditableKeyup: function () {
	            this.checkState();
	        },
	
	        handleBlur: function () {
	            // Kill any previously delayed calls to hide the toolbar
	            clearTimeout(this.hideTimeout);
	
	            // Blur may fire even if we have a selection, so we want to prevent any delayed showToolbar
	            // calls from happening in this specific case
	            clearTimeout(this.delayShowTimeout);
	
	            // Delay the call to hideToolbar to handle bug with multiple editors on the page at once
	            this.hideTimeout = setTimeout(function () {
	                this.hideToolbar();
	            }.bind(this), 1);
	        },
	
	        handleFocus: function () {
	            this.checkState();
	        },
	
	        // Hiding/showing toolbar
	
	        isDisplayed: function () {
	            return this.getToolbarElement().classList.contains('medium-editor-toolbar-active');
	        },
	
	        showToolbar: function () {
	            clearTimeout(this.hideTimeout);
	            if (!this.isDisplayed()) {
	                this.getToolbarElement().classList.add('medium-editor-toolbar-active');
	                this.trigger('showToolbar', {}, this.base.getFocusedElement());
	            }
	        },
	
	        hideToolbar: function () {
	            if (this.isDisplayed()) {
	                this.getToolbarElement().classList.remove('medium-editor-toolbar-active');
	                this.trigger('hideToolbar', {}, this.base.getFocusedElement());
	            }
	        },
	
	        isToolbarDefaultActionsDisplayed: function () {
	            return this.getToolbarActionsElement().style.display === 'block';
	        },
	
	        hideToolbarDefaultActions: function () {
	            if (this.isToolbarDefaultActionsDisplayed()) {
	                this.getToolbarActionsElement().style.display = 'none';
	            }
	        },
	
	        showToolbarDefaultActions: function () {
	            this.hideExtensionForms();
	
	            if (!this.isToolbarDefaultActionsDisplayed()) {
	                this.getToolbarActionsElement().style.display = 'block';
	            }
	
	            // Using setTimeout + options.delay because:
	            // We will actually be displaying the toolbar, which should be controlled by options.delay
	            this.delayShowTimeout = this.base.delay(function () {
	                this.showToolbar();
	            }.bind(this));
	        },
	
	        hideExtensionForms: function () {
	            // Hide all extension forms
	            this.forEachExtension(function (extension) {
	                if (extension.hasForm && extension.isDisplayed()) {
	                    extension.hideForm();
	                }
	            });
	        },
	
	        // Responding to changes in user selection
	
	        // Checks for existance of multiple block elements in the current selection
	        multipleBlockElementsSelected: function () {
	            var regexEmptyHTMLTags = /<[^\/>][^>]*><\/[^>]+>/gim, // http://stackoverflow.com/questions/3129738/remove-empty-tags-using-regex
	                regexBlockElements = new RegExp('<(' + MediumEditor.util.blockContainerElementNames.join('|') + ')[^>]*>', 'g'),
	                selectionHTML = MediumEditor.selection.getSelectionHtml(this.document).replace(regexEmptyHTMLTags, ''), // Filter out empty blocks from selection
	                hasMultiParagraphs = selectionHTML.match(regexBlockElements); // Find how many block elements are within the html
	
	            return !!hasMultiParagraphs && hasMultiParagraphs.length > 1;
	        },
	
	        modifySelection: function () {
	            var selection = this.window.getSelection(),
	                selectionRange = selection.getRangeAt(0);
	
	            /*
	            * In firefox, there are cases (ie doubleclick of a word) where the selectionRange start
	            * will be at the very end of an element.  In other browsers, the selectionRange start
	            * would instead be at the very beginning of an element that actually has content.
	            * example:
	            *   <span>foo</span><span>bar</span>
	            *
	            * If the text 'bar' is selected, most browsers will have the selectionRange start at the beginning
	            * of the 'bar' span.  However, there are cases where firefox will have the selectionRange start
	            * at the end of the 'foo' span.  The contenteditable behavior will be ok, but if there are any
	            * properties on the 'bar' span, they won't be reflected accurately in the toolbar
	            * (ie 'Bold' button wouldn't be active)
	            *
	            * So, for cases where the selectionRange start is at the end of an element/node, find the next
	            * adjacent text node that actually has content in it, and move the selectionRange start there.
	            */
	            if (this.standardizeSelectionStart &&
	                    selectionRange.startContainer.nodeValue &&
	                    (selectionRange.startOffset === selectionRange.startContainer.nodeValue.length)) {
	                var adjacentNode = MediumEditor.util.findAdjacentTextNodeWithContent(MediumEditor.selection.getSelectionElement(this.window), selectionRange.startContainer, this.document);
	                if (adjacentNode) {
	                    var offset = 0;
	                    while (adjacentNode.nodeValue.substr(offset, 1).trim().length === 0) {
	                        offset = offset + 1;
	                    }
	                    selectionRange = MediumEditor.selection.select(this.document, adjacentNode, offset,
	                        selectionRange.endContainer, selectionRange.endOffset);
	                }
	            }
	        },
	
	        checkState: function () {
	            if (this.base.preventSelectionUpdates) {
	                return;
	            }
	
	            // If no editable has focus OR selection is inside contenteditable = false
	            // hide toolbar
	            if (!this.base.getFocusedElement() ||
	                    MediumEditor.selection.selectionInContentEditableFalse(this.window)) {
	                return this.hideToolbar();
	            }
	
	            // If there's no selection element, selection element doesn't belong to this editor
	            // or toolbar is disabled for this selection element
	            // hide toolbar
	            var selectionElement = MediumEditor.selection.getSelectionElement(this.window);
	            if (!selectionElement ||
	                    this.getEditorElements().indexOf(selectionElement) === -1 ||
	                    selectionElement.getAttribute('data-disable-toolbar')) {
	                return this.hideToolbar();
	            }
	
	            // Now we know there's a focused editable with a selection
	
	            // If the updateOnEmptySelection option is true, show the toolbar
	            if (this.updateOnEmptySelection && this.static) {
	                return this.showAndUpdateToolbar();
	            }
	
	            // If we don't have a 'valid' selection -> hide toolbar
	            if (!MediumEditor.selection.selectionContainsContent(this.document) ||
	                (this.allowMultiParagraphSelection === false && this.multipleBlockElementsSelected())) {
	                return this.hideToolbar();
	            }
	
	            this.showAndUpdateToolbar();
	        },
	
	        // Updating the toolbar
	
	        showAndUpdateToolbar: function () {
	            this.modifySelection();
	            this.setToolbarButtonStates();
	            this.trigger('positionToolbar', {}, this.base.getFocusedElement());
	            this.showToolbarDefaultActions();
	            this.setToolbarPosition();
	        },
	
	        setToolbarButtonStates: function () {
	            this.forEachExtension(function (extension) {
	                if (typeof extension.isActive === 'function' &&
	                    typeof extension.setInactive === 'function') {
	                    extension.setInactive();
	                }
	            });
	
	            this.checkActiveButtons();
	        },
	
	        checkActiveButtons: function () {
	            var manualStateChecks = [],
	                queryState = null,
	                selectionRange = MediumEditor.selection.getSelectionRange(this.document),
	                parentNode,
	                updateExtensionState = function (extension) {
	                    if (typeof extension.checkState === 'function') {
	                        extension.checkState(parentNode);
	                    } else if (typeof extension.isActive === 'function' &&
	                               typeof extension.isAlreadyApplied === 'function' &&
	                               typeof extension.setActive === 'function') {
	                        if (!extension.isActive() && extension.isAlreadyApplied(parentNode)) {
	                            extension.setActive();
	                        }
	                    }
	                };
	
	            if (!selectionRange) {
	                return;
	            }
	
	            // Loop through all extensions
	            this.forEachExtension(function (extension) {
	                // For those extensions where we can use document.queryCommandState(), do so
	                if (typeof extension.queryCommandState === 'function') {
	                    queryState = extension.queryCommandState();
	                    // If queryCommandState returns a valid value, we can trust the browser
	                    // and don't need to do our manual checks
	                    if (queryState !== null) {
	                        if (queryState && typeof extension.setActive === 'function') {
	                            extension.setActive();
	                        }
	                        return;
	                    }
	                }
	                // We can't use queryCommandState for this extension, so add to manualStateChecks
	                manualStateChecks.push(extension);
	            });
	
	            parentNode = MediumEditor.selection.getSelectedParentElement(selectionRange);
	
	            // Make sure the selection parent isn't outside of the contenteditable
	            if (!this.getEditorElements().some(function (element) {
	                    return MediumEditor.util.isDescendant(element, parentNode, true);
	                })) {
	                return;
	            }
	
	            // Climb up the DOM and do manual checks for whether a certain extension is currently enabled for this node
	            while (parentNode) {
	                manualStateChecks.forEach(updateExtensionState);
	
	                // we can abort the search upwards if we leave the contentEditable element
	                if (MediumEditor.util.isMediumEditorElement(parentNode)) {
	                    break;
	                }
	                parentNode = parentNode.parentNode;
	            }
	        },
	
	        // Positioning toolbar
	
	        positionToolbarIfShown: function () {
	            if (this.isDisplayed()) {
	                this.setToolbarPosition();
	            }
	        },
	
	        setToolbarPosition: function () {
	            var container = this.base.getFocusedElement(),
	                selection = this.window.getSelection();
	
	            // If there isn't a valid selection, bail
	            if (!container) {
	                return this;
	            }
	
	            if (this.static || !selection.isCollapsed) {
	                this.showToolbar();
	
	                // we don't need any absolute positioning if relativeContainer is set
	                if (!this.relativeContainer) {
	                    if (this.static) {
	                        this.positionStaticToolbar(container);
	                    } else {
	                        this.positionToolbar(selection);
	                    }
	                }
	
	                this.trigger('positionedToolbar', {}, this.base.getFocusedElement());
	            }
	        },
	
	        positionStaticToolbar: function (container) {
	            // position the toolbar at left 0, so we can get the real width of the toolbar
	            this.getToolbarElement().style.left = '0';
	
	            // document.documentElement for IE 9
	            var scrollTop = (this.document.documentElement && this.document.documentElement.scrollTop) || this.document.body.scrollTop,
	                windowWidth = this.window.innerWidth,
	                toolbarElement = this.getToolbarElement(),
	                containerRect = container.getBoundingClientRect(),
	                containerTop = containerRect.top + scrollTop,
	                containerCenter = (containerRect.left + (containerRect.width / 2)),
	                toolbarHeight = toolbarElement.offsetHeight,
	                toolbarWidth = toolbarElement.offsetWidth,
	                halfOffsetWidth = toolbarWidth / 2,
	                targetLeft;
	
	            if (this.sticky) {
	                // If it's beyond the height of the editor, position it at the bottom of the editor
	                if (scrollTop > (containerTop + container.offsetHeight - toolbarHeight - this.stickyTopOffset)) {
	                    toolbarElement.style.top = (containerTop + container.offsetHeight - toolbarHeight) + 'px';
	                    toolbarElement.classList.remove('medium-editor-sticky-toolbar');
	                // Stick the toolbar to the top of the window
	                } else if (scrollTop > (containerTop - toolbarHeight - this.stickyTopOffset)) {
	                    toolbarElement.classList.add('medium-editor-sticky-toolbar');
	                    toolbarElement.style.top = this.stickyTopOffset + 'px';
	                // Normal static toolbar position
	                } else {
	                    toolbarElement.classList.remove('medium-editor-sticky-toolbar');
	                    toolbarElement.style.top = containerTop - toolbarHeight + 'px';
	                }
	            } else {
	                toolbarElement.style.top = containerTop - toolbarHeight + 'px';
	            }
	
	            switch (this.align) {
	                case 'left':
	                    targetLeft = containerRect.left;
	                    break;
	
	                case 'right':
	                    targetLeft = containerRect.right - toolbarWidth;
	                    break;
	
	                case 'center':
	                    targetLeft = containerCenter - halfOffsetWidth;
	                    break;
	            }
	
	            if (targetLeft < 0) {
	                targetLeft = 0;
	            } else if ((targetLeft + toolbarWidth) > windowWidth) {
	                targetLeft = (windowWidth - Math.ceil(toolbarWidth) - 1);
	            }
	
	            toolbarElement.style.left = targetLeft + 'px';
	        },
	
	        positionToolbar: function (selection) {
	            // position the toolbar at left 0, so we can get the real width of the toolbar
	            this.getToolbarElement().style.left = '0';
	            this.getToolbarElement().style.right = 'initial';
	
	            var range = selection.getRangeAt(0),
	                boundary = range.getBoundingClientRect();
	
	            // Handle selections with just images
	            if (!boundary || ((boundary.height === 0 && boundary.width === 0) && range.startContainer === range.endContainer)) {
	                // If there's a nested image, use that for the bounding rectangle
	                if (range.startContainer.nodeType === 1 && range.startContainer.querySelector('img')) {
	                    boundary = range.startContainer.querySelector('img').getBoundingClientRect();
	                } else {
	                    boundary = range.startContainer.getBoundingClientRect();
	                }
	            }
	
	            var containerWidth = this.window.innerWidth,
	                toolbarElement = this.getToolbarElement(),
	                toolbarHeight = toolbarElement.offsetHeight,
	                toolbarWidth = toolbarElement.offsetWidth,
	                halfOffsetWidth = toolbarWidth / 2,
	                buttonHeight = 50,
	                defaultLeft = this.diffLeft - halfOffsetWidth,
	                elementsContainer = this.getEditorOption('elementsContainer'),
	                elementsContainerAbsolute = ['absolute', 'fixed'].indexOf(window.getComputedStyle(elementsContainer).getPropertyValue('position')) > -1,
	                positions = {},
	                relativeBoundary = {},
	                middleBoundary, elementsContainerBoundary;
	
	            // If container element is absolute / fixed, recalculate boundaries to be relative to the container
	            if (elementsContainerAbsolute) {
	                elementsContainerBoundary = elementsContainer.getBoundingClientRect();
	                ['top', 'left'].forEach(function (key) {
	                    relativeBoundary[key] = boundary[key] - elementsContainerBoundary[key];
	                });
	
	                relativeBoundary.width = boundary.width;
	                relativeBoundary.height = boundary.height;
	                boundary = relativeBoundary;
	
	                containerWidth = elementsContainerBoundary.width;
	
	                // Adjust top position according to container scroll position
	                positions.top = elementsContainer.scrollTop;
	            } else {
	                // Adjust top position according to window scroll position
	                positions.top = this.window.pageYOffset;
	            }
	
	            middleBoundary = boundary.left + boundary.width / 2;
	            positions.top += boundary.top - toolbarHeight;
	
	            if (boundary.top < buttonHeight) {
	                toolbarElement.classList.add('medium-toolbar-arrow-over');
	                toolbarElement.classList.remove('medium-toolbar-arrow-under');
	                positions.top += buttonHeight + boundary.height - this.diffTop;
	            } else {
	                toolbarElement.classList.add('medium-toolbar-arrow-under');
	                toolbarElement.classList.remove('medium-toolbar-arrow-over');
	                positions.top += this.diffTop;
	            }
	
	            if (middleBoundary < halfOffsetWidth) {
	                positions.left = defaultLeft + halfOffsetWidth;
	                positions.right = 'initial';
	            } else if ((containerWidth - middleBoundary) < halfOffsetWidth) {
	                positions.left = 'auto';
	                positions.right = 0;
	            } else {
	                positions.left = defaultLeft + middleBoundary;
	                positions.right = 'initial';
	            }
	
	            ['top', 'left', 'right'].forEach(function (key) {
	                toolbarElement.style[key] = positions[key] + (isNaN(positions[key]) ? '' : 'px');
	            });
	        }
	    });
	
	    MediumEditor.extensions.toolbar = Toolbar;
	}());
	
	(function () {
	    'use strict';
	
	    var ImageDragging = MediumEditor.Extension.extend({
	        init: function () {
	            MediumEditor.Extension.prototype.init.apply(this, arguments);
	
	            this.subscribe('editableDrag', this.handleDrag.bind(this));
	            this.subscribe('editableDrop', this.handleDrop.bind(this));
	        },
	
	        handleDrag: function (event) {
	            var className = 'medium-editor-dragover';
	            event.preventDefault();
	            event.dataTransfer.dropEffect = 'copy';
	
	            if (event.type === 'dragover') {
	                event.target.classList.add(className);
	            } else if (event.type === 'dragleave') {
	                event.target.classList.remove(className);
	            }
	        },
	
	        handleDrop: function (event) {
	            var className = 'medium-editor-dragover',
	                files;
	            event.preventDefault();
	            event.stopPropagation();
	
	            // IE9 does not support the File API, so prevent file from opening in a new window
	            // but also don't try to actually get the file
	            if (event.dataTransfer.files) {
	                files = Array.prototype.slice.call(event.dataTransfer.files, 0);
	                files.some(function (file) {
	                    if (file.type.match('image')) {
	                        var fileReader, id;
	                        fileReader = new FileReader();
	                        fileReader.readAsDataURL(file);
	
	                        id = 'medium-img-' + (+new Date());
	                        MediumEditor.util.insertHTMLCommand(this.document, '<img class="medium-editor-image-loading" id="' + id + '" />');
	
	                        fileReader.onload = function () {
	                            var img = this.document.getElementById(id);
	                            if (img) {
	                                img.removeAttribute('id');
	                                img.removeAttribute('class');
	                                img.src = fileReader.result;
	                            }
	                        }.bind(this);
	                    }
	                }.bind(this));
	            }
	            event.target.classList.remove(className);
	        }
	    });
	
	    MediumEditor.extensions.imageDragging = ImageDragging;
	}());
	
	(function () {
	    'use strict';
	
	    // Event handlers that shouldn't be exposed externally
	
	    function handleDisableExtraSpaces(event) {
	        var node = MediumEditor.selection.getSelectionStart(this.options.ownerDocument),
	            textContent = node.textContent,
	            caretPositions = MediumEditor.selection.getCaretOffsets(node);
	
	        if ((textContent[caretPositions.left - 1] === undefined) || (textContent[caretPositions.left - 1].trim() === '') || (textContent[caretPositions.left] !== undefined && textContent[caretPositions.left].trim() === '')) {
	            event.preventDefault();
	        }
	    }
	
	    function handleDisabledEnterKeydown(event, element) {
	        if (this.options.disableReturn || element.getAttribute('data-disable-return')) {
	            event.preventDefault();
	        } else if (this.options.disableDoubleReturn || element.getAttribute('data-disable-double-return')) {
	            var node = MediumEditor.selection.getSelectionStart(this.options.ownerDocument);
	
	            // if current text selection is empty OR previous sibling text is empty OR it is not a list
	            if ((node && node.textContent.trim() === '' && node.nodeName.toLowerCase() !== 'li') ||
	                (node.previousElementSibling && node.previousElementSibling.nodeName.toLowerCase() !== 'br' &&
	                 node.previousElementSibling.textContent.trim() === '')) {
	                event.preventDefault();
	            }
	        }
	    }
	
	    function handleTabKeydown(event) {
	        // Override tab only for pre nodes
	        var node = MediumEditor.selection.getSelectionStart(this.options.ownerDocument),
	            tag = node && node.nodeName.toLowerCase();
	
	        if (tag === 'pre') {
	            event.preventDefault();
	            MediumEditor.util.insertHTMLCommand(this.options.ownerDocument, '    ');
	        }
	
	        // Tab to indent list structures!
	        if (MediumEditor.util.isListItem(node)) {
	            event.preventDefault();
	
	            // If Shift is down, outdent, otherwise indent
	            if (event.shiftKey) {
	                this.options.ownerDocument.execCommand('outdent', false, null);
	            } else {
	                this.options.ownerDocument.execCommand('indent', false, null);
	            }
	        }
	    }
	
	    function handleBlockDeleteKeydowns(event) {
	        var p, node = MediumEditor.selection.getSelectionStart(this.options.ownerDocument),
	            tagName = node.nodeName.toLowerCase(),
	            isEmpty = /^(\s+|<br\/?>)?$/i,
	            isHeader = /h\d/i;
	
	        if (MediumEditor.util.isKey(event, [MediumEditor.util.keyCode.BACKSPACE, MediumEditor.util.keyCode.ENTER]) &&
	                // has a preceeding sibling
	                node.previousElementSibling &&
	                // in a header
	                isHeader.test(tagName) &&
	                // at the very end of the block
	                MediumEditor.selection.getCaretOffsets(node).left === 0) {
	            if (MediumEditor.util.isKey(event, MediumEditor.util.keyCode.BACKSPACE) && isEmpty.test(node.previousElementSibling.innerHTML)) {
	                // backspacing the begining of a header into an empty previous element will
	                // change the tagName of the current node to prevent one
	                // instead delete previous node and cancel the event.
	                node.previousElementSibling.parentNode.removeChild(node.previousElementSibling);
	                event.preventDefault();
	            } else if (!this.options.disableDoubleReturn && MediumEditor.util.isKey(event, MediumEditor.util.keyCode.ENTER)) {
	                // hitting return in the begining of a header will create empty header elements before the current one
	                // instead, make "<p><br></p>" element, which are what happens if you hit return in an empty paragraph
	                p = this.options.ownerDocument.createElement('p');
	                p.innerHTML = '<br>';
	                node.previousElementSibling.parentNode.insertBefore(p, node);
	                event.preventDefault();
	            }
	        } else if (MediumEditor.util.isKey(event, MediumEditor.util.keyCode.DELETE) &&
	                    // between two sibling elements
	                    node.nextElementSibling &&
	                    node.previousElementSibling &&
	                    // not in a header
	                    !isHeader.test(tagName) &&
	                    // in an empty tag
	                    isEmpty.test(node.innerHTML) &&
	                    // when the next tag *is* a header
	                    isHeader.test(node.nextElementSibling.nodeName.toLowerCase())) {
	            // hitting delete in an empty element preceding a header, ex:
	            //  <p>[CURSOR]</p><h1>Header</h1>
	            // Will cause the h1 to become a paragraph.
	            // Instead, delete the paragraph node and move the cursor to the begining of the h1
	
	            // remove node and move cursor to start of header
	            MediumEditor.selection.moveCursor(this.options.ownerDocument, node.nextElementSibling);
	
	            node.previousElementSibling.parentNode.removeChild(node);
	
	            event.preventDefault();
	        } else if (MediumEditor.util.isKey(event, MediumEditor.util.keyCode.BACKSPACE) &&
	                tagName === 'li' &&
	                // hitting backspace inside an empty li
	                isEmpty.test(node.innerHTML) &&
	                // is first element (no preceeding siblings)
	                !node.previousElementSibling &&
	                // parent also does not have a sibling
	                !node.parentElement.previousElementSibling &&
	                // is not the only li in a list
	                node.nextElementSibling &&
	                node.nextElementSibling.nodeName.toLowerCase() === 'li') {
	            // backspacing in an empty first list element in the first list (with more elements) ex:
	            //  <ul><li>[CURSOR]</li><li>List Item 2</li></ul>
	            // will remove the first <li> but add some extra element before (varies based on browser)
	            // Instead, this will:
	            // 1) remove the list element
	            // 2) create a paragraph before the list
	            // 3) move the cursor into the paragraph
	
	            // create a paragraph before the list
	            p = this.options.ownerDocument.createElement('p');
	            p.innerHTML = '<br>';
	            node.parentElement.parentElement.insertBefore(p, node.parentElement);
	
	            // move the cursor into the new paragraph
	            MediumEditor.selection.moveCursor(this.options.ownerDocument, p);
	
	            // remove the list element
	            node.parentElement.removeChild(node);
	
	            event.preventDefault();
	        } else if (MediumEditor.util.isKey(event, MediumEditor.util.keyCode.BACKSPACE) &&
	                (MediumEditor.util.getClosestTag(node, 'blockquote') !== false) &&
	                MediumEditor.selection.getCaretOffsets(node).left === 0) {
	
	            // when cursor is at the begining of the element and the element is <blockquote>
	            // then pressing backspace key should change the <blockquote> to a <p> tag
	            event.preventDefault();
	            MediumEditor.util.execFormatBlock(this.options.ownerDocument, 'p');
	        } else if (MediumEditor.util.isKey(event, MediumEditor.util.keyCode.ENTER) &&
	                (MediumEditor.util.getClosestTag(node, 'blockquote') !== false) &&
	                MediumEditor.selection.getCaretOffsets(node).right === 0) {
	
	            // when cursor is at the end of <blockquote>,
	            // then pressing enter key should create <p> tag, not <blockquote>
	            p = this.options.ownerDocument.createElement('p');
	            p.innerHTML = '<br>';
	            node.parentElement.insertBefore(p, node.nextSibling);
	
	            // move the cursor into the new paragraph
	            MediumEditor.selection.moveCursor(this.options.ownerDocument, p);
	
	            event.preventDefault();
	        }
	    }
	
	    function handleKeyup(event) {
	        var node = MediumEditor.selection.getSelectionStart(this.options.ownerDocument),
	            tagName;
	
	        if (!node) {
	            return;
	        }
	
	        // https://github.com/yabwe/medium-editor/issues/994
	        // Firefox thrown an error when calling `formatBlock` on an empty editable blockContainer that's not a <div>
	        if (MediumEditor.util.isMediumEditorElement(node) && node.children.length === 0 && !MediumEditor.util.isBlockContainer(node)) {
	            this.options.ownerDocument.execCommand('formatBlock', false, 'p');
	        }
	
	        // https://github.com/yabwe/medium-editor/issues/834
	        // https://github.com/yabwe/medium-editor/pull/382
	        // Don't call format block if this is a block element (ie h1, figCaption, etc.)
	        if (MediumEditor.util.isKey(event, MediumEditor.util.keyCode.ENTER) &&
	            !MediumEditor.util.isListItem(node) &&
	            !MediumEditor.util.isBlockContainer(node)) {
	
	            tagName = node.nodeName.toLowerCase();
	            // For anchor tags, unlink
	            if (tagName === 'a') {
	                this.options.ownerDocument.execCommand('unlink', false, null);
	            } else if (!event.shiftKey && !event.ctrlKey) {
	                this.options.ownerDocument.execCommand('formatBlock', false, 'p');
	            }
	        }
	    }
	
	    function handleEditableInput(event, editable) {
	        var textarea = editable.parentNode.querySelector('textarea[medium-editor-textarea-id="' + editable.getAttribute('medium-editor-textarea-id') + '"]');
	        if (textarea) {
	            textarea.value = editable.innerHTML.trim();
	        }
	    }
	
	    // Internal helper methods which shouldn't be exposed externally
	
	    function addToEditors(win) {
	        if (!win._mediumEditors) {
	            // To avoid breaking users who are assuming that the unique id on
	            // medium-editor elements will start at 1, inserting a 'null' in the
	            // array so the unique-id can always map to the index of the editor instance
	            win._mediumEditors = [null];
	        }
	
	        // If this already has a unique id, re-use it
	        if (!this.id) {
	            this.id = win._mediumEditors.length;
	        }
	
	        win._mediumEditors[this.id] = this;
	    }
	
	    function removeFromEditors(win) {
	        if (!win._mediumEditors || !win._mediumEditors[this.id]) {
	            return;
	        }
	
	        /* Setting the instance to null in the array instead of deleting it allows:
	         * 1) Each instance to preserve its own unique-id, even after being destroyed
	         *    and initialized again
	         * 2) The unique-id to always correspond to an index in the array of medium-editor
	         *    instances. Thus, we will be able to look at a contenteditable, and determine
	         *    which instance it belongs to, by indexing into the global array.
	         */
	        win._mediumEditors[this.id] = null;
	    }
	
	    function createElementsArray(selector, doc, filterEditorElements) {
	        var elements = [];
	
	        if (!selector) {
	            selector = [];
	        }
	        // If string, use as query selector
	        if (typeof selector === 'string') {
	            selector = doc.querySelectorAll(selector);
	        }
	        // If element, put into array
	        if (MediumEditor.util.isElement(selector)) {
	            selector = [selector];
	        }
	
	        if (filterEditorElements) {
	            // Remove elements that have already been initialized by the editor
	            // selecotr might not be an array (ie NodeList) so use for loop
	            for (var i = 0; i < selector.length; i++) {
	                var el = selector[i];
	                if (MediumEditor.util.isElement(el) &&
	                    !el.getAttribute('data-medium-editor-element') &&
	                    !el.getAttribute('medium-editor-textarea-id')) {
	                    elements.push(el);
	                }
	            }
	        } else {
	            // Convert NodeList (or other array like object) into an array
	            elements = Array.prototype.slice.apply(selector);
	        }
	
	        return elements;
	    }
	
	    function cleanupTextareaElement(element) {
	        var textarea = element.parentNode.querySelector('textarea[medium-editor-textarea-id="' + element.getAttribute('medium-editor-textarea-id') + '"]');
	        if (textarea) {
	            // Un-hide the textarea
	            textarea.classList.remove('medium-editor-hidden');
	            textarea.removeAttribute('medium-editor-textarea-id');
	        }
	        if (element.parentNode) {
	            element.parentNode.removeChild(element);
	        }
	    }
	
	    function setExtensionDefaults(extension, defaults) {
	        Object.keys(defaults).forEach(function (prop) {
	            if (extension[prop] === undefined) {
	                extension[prop] = defaults[prop];
	            }
	        });
	        return extension;
	    }
	
	    function initExtension(extension, name, instance) {
	        var extensionDefaults = {
	            'window': instance.options.contentWindow,
	            'document': instance.options.ownerDocument,
	            'base': instance
	        };
	
	        // Add default options into the extension
	        extension = setExtensionDefaults(extension, extensionDefaults);
	
	        // Call init on the extension
	        if (typeof extension.init === 'function') {
	            extension.init();
	        }
	
	        // Set extension name (if not already set)
	        if (!extension.name) {
	            extension.name = name;
	        }
	        return extension;
	    }
	
	    function isToolbarEnabled() {
	        // If any of the elements don't have the toolbar disabled
	        // We need a toolbar
	        if (this.elements.every(function (element) {
	                return !!element.getAttribute('data-disable-toolbar');
	            })) {
	            return false;
	        }
	
	        return this.options.toolbar !== false;
	    }
	
	    function isAnchorPreviewEnabled() {
	        // If toolbar is disabled, don't add
	        if (!isToolbarEnabled.call(this)) {
	            return false;
	        }
	
	        return this.options.anchorPreview !== false;
	    }
	
	    function isPlaceholderEnabled() {
	        return this.options.placeholder !== false;
	    }
	
	    function isAutoLinkEnabled() {
	        return this.options.autoLink !== false;
	    }
	
	    function isImageDraggingEnabled() {
	        return this.options.imageDragging !== false;
	    }
	
	    function isKeyboardCommandsEnabled() {
	        return this.options.keyboardCommands !== false;
	    }
	
	    function shouldUseFileDraggingExtension() {
	        // Since the file-dragging extension replaces the image-dragging extension,
	        // we need to check if the user passed an overrided image-dragging extension.
	        // If they have, to avoid breaking users, we won't use file-dragging extension.
	        return !this.options.extensions['imageDragging'];
	    }
	
	    function createContentEditable(textarea) {
	        var div = this.options.ownerDocument.createElement('div'),
	            now = Date.now(),
	            uniqueId = 'medium-editor-' + now,
	            atts = textarea.attributes;
	
	        // Some browsers can move pretty fast, since we're using a timestamp
	        // to make a unique-id, ensure that the id is actually unique on the page
	        while (this.options.ownerDocument.getElementById(uniqueId)) {
	            now++;
	            uniqueId = 'medium-editor-' + now;
	        }
	
	        div.className = textarea.className;
	        div.id = uniqueId;
	        div.innerHTML = textarea.value;
	
	        textarea.setAttribute('medium-editor-textarea-id', uniqueId);
	
	        // re-create all attributes from the textearea to the new created div
	        for (var i = 0, n = atts.length; i < n; i++) {
	            // do not re-create existing attributes
	            if (!div.hasAttribute(atts[i].nodeName)) {
	                div.setAttribute(atts[i].nodeName, atts[i].nodeValue);
	            }
	        }
	
	        // If textarea has a form, listen for reset on the form to clear
	        // the content of the created div
	        if (textarea.form) {
	            this.on(textarea.form, 'reset', function (event) {
	                if (!event.defaultPrevented) {
	                    this.resetContent(this.options.ownerDocument.getElementById(uniqueId));
	                }
	            }.bind(this));
	        }
	
	        textarea.classList.add('medium-editor-hidden');
	        textarea.parentNode.insertBefore(
	            div,
	            textarea
	        );
	
	        return div;
	    }
	
	    function initElement(element, editorId) {
	        if (!element.getAttribute('data-medium-editor-element')) {
	            if (element.nodeName.toLowerCase() === 'textarea') {
	                element = createContentEditable.call(this, element);
	
	                // Make sure we only attach to editableInput once for <textarea> elements
	                if (!this.instanceHandleEditableInput) {
	                    this.instanceHandleEditableInput = handleEditableInput.bind(this);
	                    this.subscribe('editableInput', this.instanceHandleEditableInput);
	                }
	            }
	
	            if (!this.options.disableEditing && !element.getAttribute('data-disable-editing')) {
	                element.setAttribute('contentEditable', true);
	                element.setAttribute('spellcheck', this.options.spellcheck);
	            }
	
	            // Make sure we only attach to editableKeydownEnter once for disable-return options
	            if (!this.instanceHandleEditableKeydownEnter) {
	                if (element.getAttribute('data-disable-return') || element.getAttribute('data-disable-double-return')) {
	                    this.instanceHandleEditableKeydownEnter = handleDisabledEnterKeydown.bind(this);
	                    this.subscribe('editableKeydownEnter', this.instanceHandleEditableKeydownEnter);
	                }
	            }
	
	            // if we're not disabling return, add a handler to help handle cleanup
	            // for certain cases when enter is pressed
	            if (!this.options.disableReturn && !element.getAttribute('data-disable-return')) {
	                this.on(element, 'keyup', handleKeyup.bind(this));
	            }
	
	            var elementId = MediumEditor.util.guid();
	
	            element.setAttribute('data-medium-editor-element', true);
	            element.classList.add('medium-editor-element');
	            element.setAttribute('role', 'textbox');
	            element.setAttribute('aria-multiline', true);
	            element.setAttribute('data-medium-editor-editor-index', editorId);
	            // TODO: Merge data-medium-editor-element and medium-editor-index attributes for 6.0.0
	            // medium-editor-index is not named correctly anymore and can be re-purposed to signify
	            // whether the element has been initialized or not
	            element.setAttribute('medium-editor-index', elementId);
	            initialContent[elementId] = element.innerHTML;
	
	            this.events.attachAllEventsToElement(element);
	        }
	
	        return element;
	    }
	
	    function attachHandlers() {
	        // attach to tabs
	        this.subscribe('editableKeydownTab', handleTabKeydown.bind(this));
	
	        // Bind keys which can create or destroy a block element: backspace, delete, return
	        this.subscribe('editableKeydownDelete', handleBlockDeleteKeydowns.bind(this));
	        this.subscribe('editableKeydownEnter', handleBlockDeleteKeydowns.bind(this));
	
	        // Bind double space event
	        if (this.options.disableExtraSpaces) {
	            this.subscribe('editableKeydownSpace', handleDisableExtraSpaces.bind(this));
	        }
	
	        // Make sure we only attach to editableKeydownEnter once for disable-return options
	        if (!this.instanceHandleEditableKeydownEnter) {
	            // disabling return or double return
	            if (this.options.disableReturn || this.options.disableDoubleReturn) {
	                this.instanceHandleEditableKeydownEnter = handleDisabledEnterKeydown.bind(this);
	                this.subscribe('editableKeydownEnter', this.instanceHandleEditableKeydownEnter);
	            }
	        }
	    }
	
	    function initExtensions() {
	
	        this.extensions = [];
	
	        // Passed in extensions
	        Object.keys(this.options.extensions).forEach(function (name) {
	            // Always save the toolbar extension for last
	            if (name !== 'toolbar' && this.options.extensions[name]) {
	                this.extensions.push(initExtension(this.options.extensions[name], name, this));
	            }
	        }, this);
	
	        // 4 Cases for imageDragging + fileDragging extensons:
	        //
	        // 1. ImageDragging ON + No Custom Image Dragging Extension:
	        //    * Use fileDragging extension (default options)
	        // 2. ImageDragging OFF + No Custom Image Dragging Extension:
	        //    * Use fileDragging extension w/ images turned off
	        // 3. ImageDragging ON + Custom Image Dragging Extension:
	        //    * Don't use fileDragging (could interfere with custom image dragging extension)
	        // 4. ImageDragging OFF + Custom Image Dragging:
	        //    * Don't use fileDragging (could interfere with custom image dragging extension)
	        if (shouldUseFileDraggingExtension.call(this)) {
	            var opts = this.options.fileDragging;
	            if (!opts) {
	                opts = {};
	
	                // Image is in the 'allowedTypes' list by default.
	                // If imageDragging is off override the 'allowedTypes' list with an empty one
	                if (!isImageDraggingEnabled.call(this)) {
	                    opts.allowedTypes = [];
	                }
	            }
	            this.addBuiltInExtension('fileDragging', opts);
	        }
	
	        // Built-in extensions
	        var builtIns = {
	            paste: true,
	            'anchor-preview': isAnchorPreviewEnabled.call(this),
	            autoLink: isAutoLinkEnabled.call(this),
	            keyboardCommands: isKeyboardCommandsEnabled.call(this),
	            placeholder: isPlaceholderEnabled.call(this)
	        };
	        Object.keys(builtIns).forEach(function (name) {
	            if (builtIns[name]) {
	                this.addBuiltInExtension(name);
	            }
	        }, this);
	
	        // Users can pass in a custom toolbar extension
	        // so check for that first and if it's not present
	        // just create the default toolbar
	        var toolbarExtension = this.options.extensions['toolbar'];
	        if (!toolbarExtension && isToolbarEnabled.call(this)) {
	            // Backwards compatability
	            var toolbarOptions = MediumEditor.util.extend({}, this.options.toolbar, {
	                allowMultiParagraphSelection: this.options.allowMultiParagraphSelection // deprecated
	            });
	            toolbarExtension = new MediumEditor.extensions.toolbar(toolbarOptions);
	        }
	
	        // If the toolbar is not disabled, so we actually have an extension
	        // initialize it and add it to the extensions array
	        if (toolbarExtension) {
	            this.extensions.push(initExtension(toolbarExtension, 'toolbar', this));
	        }
	    }
	
	    function mergeOptions(defaults, options) {
	        var deprecatedProperties = [
	            ['allowMultiParagraphSelection', 'toolbar.allowMultiParagraphSelection']
	        ];
	        // warn about using deprecated properties
	        if (options) {
	            deprecatedProperties.forEach(function (pair) {
	                if (options.hasOwnProperty(pair[0]) && options[pair[0]] !== undefined) {
	                    MediumEditor.util.deprecated(pair[0], pair[1], 'v6.0.0');
	                }
	            });
	        }
	
	        return MediumEditor.util.defaults({}, options, defaults);
	    }
	
	    function execActionInternal(action, opts) {
	        /*jslint regexp: true*/
	        var appendAction = /^append-(.+)$/gi,
	            justifyAction = /justify([A-Za-z]*)$/g, /* Detecting if is justifyCenter|Right|Left */
	            match,
	            cmdValueArgument;
	        /*jslint regexp: false*/
	
	        // Actions starting with 'append-' should attempt to format a block of text ('formatBlock') using a specific
	        // type of block element (ie append-blockquote, append-h1, append-pre, etc.)
	        match = appendAction.exec(action);
	        if (match) {
	            return MediumEditor.util.execFormatBlock(this.options.ownerDocument, match[1]);
	        }
	
	        if (action === 'fontSize') {
	            // TODO: Deprecate support for opts.size in 6.0.0
	            if (opts.size) {
	                MediumEditor.util.deprecated('.size option for fontSize command', '.value', '6.0.0');
	            }
	            cmdValueArgument = opts.value || opts.size;
	            return this.options.ownerDocument.execCommand('fontSize', false, cmdValueArgument);
	        }
	
	        if (action === 'fontName') {
	            // TODO: Deprecate support for opts.name in 6.0.0
	            if (opts.name) {
	                MediumEditor.util.deprecated('.name option for fontName command', '.value', '6.0.0');
	            }
	            cmdValueArgument = opts.value || opts.name;
	            return this.options.ownerDocument.execCommand('fontName', false, cmdValueArgument);
	        }
	
	        if (action === 'createLink') {
	            return this.createLink(opts);
	        }
	
	        if (action === 'image') {
	            var src = this.options.contentWindow.getSelection().toString().trim();
	            return this.options.ownerDocument.execCommand('insertImage', false, src);
	        }
	
	        /* Issue: https://github.com/yabwe/medium-editor/issues/595
	         * If the action is to justify the text */
	        if (justifyAction.exec(action)) {
	            var result = this.options.ownerDocument.execCommand(action, false, null),
	                parentNode = MediumEditor.selection.getSelectedParentElement(MediumEditor.selection.getSelectionRange(this.options.ownerDocument));
	            if (parentNode) {
	                cleanupJustifyDivFragments.call(this, MediumEditor.util.getTopBlockContainer(parentNode));
	            }
	
	            return result;
	        }
	
	        cmdValueArgument = opts && opts.value;
	        return this.options.ownerDocument.execCommand(action, false, cmdValueArgument);
	    }
	
	    /* If we've just justified text within a container block
	     * Chrome may have removed <br> elements and instead wrapped lines in <div> elements
	     * with a text-align property.  If so, we want to fix this
	     */
	    function cleanupJustifyDivFragments(blockContainer) {
	        if (!blockContainer) {
	            return;
	        }
	
	        var textAlign,
	            childDivs = Array.prototype.slice.call(blockContainer.childNodes).filter(function (element) {
	                var isDiv = element.nodeName.toLowerCase() === 'div';
	                if (isDiv && !textAlign) {
	                    textAlign = element.style.textAlign;
	                }
	                return isDiv;
	            });
	
	        /* If we found child <div> elements with text-align style attributes
	         * we should fix this by:
	         *
	         * 1) Unwrapping each <div> which has a text-align style
	         * 2) Insert a <br> element after each set of 'unwrapped' div children
	         * 3) Set the text-align style of the parent block element
	         */
	        if (childDivs.length) {
	            // Since we're mucking with the HTML, preserve selection
	            this.saveSelection();
	            childDivs.forEach(function (div) {
	                if (div.style.textAlign === textAlign) {
	                    var lastChild = div.lastChild;
	                    if (lastChild) {
	                        // Instead of a div, extract the child elements and add a <br>
	                        MediumEditor.util.unwrap(div, this.options.ownerDocument);
	                        var br = this.options.ownerDocument.createElement('BR');
	                        lastChild.parentNode.insertBefore(br, lastChild.nextSibling);
	                    }
	                }
	            }, this);
	            blockContainer.style.textAlign = textAlign;
	            // We're done, so restore selection
	            this.restoreSelection();
	        }
	    }
	
	    var initialContent = {};
	
	    MediumEditor.prototype = {
	        // NOT DOCUMENTED - exposed for backwards compatability
	        init: function (elements, options) {
	            this.options = mergeOptions.call(this, this.defaults, options);
	            this.origElements = elements;
	
	            if (!this.options.elementsContainer) {
	                this.options.elementsContainer = this.options.ownerDocument.body;
	            }
	
	            return this.setup();
	        },
	
	        setup: function () {
	            if (this.isActive) {
	                return;
	            }
	
	            addToEditors.call(this, this.options.contentWindow);
	            this.events = new MediumEditor.Events(this);
	            this.elements = [];
	
	            this.addElements(this.origElements);
	
	            if (this.elements.length === 0) {
	                return;
	            }
	
	            this.isActive = true;
	
	            // Call initialization helpers
	            initExtensions.call(this);
	            attachHandlers.call(this);
	        },
	
	        destroy: function () {
	            if (!this.isActive) {
	                return;
	            }
	
	            this.isActive = false;
	
	            this.extensions.forEach(function (extension) {
	                if (typeof extension.destroy === 'function') {
	                    extension.destroy();
	                }
	            }, this);
	
	            this.events.destroy();
	
	            this.elements.forEach(function (element) {
	                // Reset elements content, fix for issue where after editor destroyed the red underlines on spelling errors are left
	                if (this.options.spellcheck) {
	                    element.innerHTML = element.innerHTML;
	                }
	
	                // cleanup extra added attributes
	                element.removeAttribute('contentEditable');
	                element.removeAttribute('spellcheck');
	                element.removeAttribute('data-medium-editor-element');
	                element.classList.remove('medium-editor-element');
	                element.removeAttribute('role');
	                element.removeAttribute('aria-multiline');
	                element.removeAttribute('medium-editor-index');
	                element.removeAttribute('data-medium-editor-editor-index');
	
	                // Remove any elements created for textareas
	                if (element.getAttribute('medium-editor-textarea-id')) {
	                    cleanupTextareaElement(element);
	                }
	            }, this);
	            this.elements = [];
	            this.instanceHandleEditableKeydownEnter = null;
	            this.instanceHandleEditableInput = null;
	
	            removeFromEditors.call(this, this.options.contentWindow);
	        },
	
	        on: function (target, event, listener, useCapture) {
	            this.events.attachDOMEvent(target, event, listener, useCapture);
	
	            return this;
	        },
	
	        off: function (target, event, listener, useCapture) {
	            this.events.detachDOMEvent(target, event, listener, useCapture);
	
	            return this;
	        },
	
	        subscribe: function (event, listener) {
	            this.events.attachCustomEvent(event, listener);
	
	            return this;
	        },
	
	        unsubscribe: function (event, listener) {
	            this.events.detachCustomEvent(event, listener);
	
	            return this;
	        },
	
	        trigger: function (name, data, editable) {
	            this.events.triggerCustomEvent(name, data, editable);
	
	            return this;
	        },
	
	        delay: function (fn) {
	            var self = this;
	            return setTimeout(function () {
	                if (self.isActive) {
	                    fn();
	                }
	            }, this.options.delay);
	        },
	
	        serialize: function () {
	            var i,
	                elementid,
	                content = {},
	                len = this.elements.length;
	
	            for (i = 0; i < len; i += 1) {
	                elementid = (this.elements[i].id !== '') ? this.elements[i].id : 'element-' + i;
	                content[elementid] = {
	                    value: this.elements[i].innerHTML.trim()
	                };
	            }
	            return content;
	        },
	
	        getExtensionByName: function (name) {
	            var extension;
	            if (this.extensions && this.extensions.length) {
	                this.extensions.some(function (ext) {
	                    if (ext.name === name) {
	                        extension = ext;
	                        return true;
	                    }
	                    return false;
	                });
	            }
	            return extension;
	        },
	
	        /**
	         * NOT DOCUMENTED - exposed as a helper for other extensions to use
	         */
	        addBuiltInExtension: function (name, opts) {
	            var extension = this.getExtensionByName(name),
	                merged;
	            if (extension) {
	                return extension;
	            }
	
	            switch (name) {
	                case 'anchor':
	                    merged = MediumEditor.util.extend({}, this.options.anchor, opts);
	                    extension = new MediumEditor.extensions.anchor(merged);
	                    break;
	                case 'anchor-preview':
	                    extension = new MediumEditor.extensions.anchorPreview(this.options.anchorPreview);
	                    break;
	                case 'autoLink':
	                    extension = new MediumEditor.extensions.autoLink();
	                    break;
	                case 'fileDragging':
	                    extension = new MediumEditor.extensions.fileDragging(opts);
	                    break;
	                case 'fontname':
	                    extension = new MediumEditor.extensions.fontName(this.options.fontName);
	                    break;
	                case 'fontsize':
	                    extension = new MediumEditor.extensions.fontSize(opts);
	                    break;
	                case 'keyboardCommands':
	                    extension = new MediumEditor.extensions.keyboardCommands(this.options.keyboardCommands);
	                    break;
	                case 'paste':
	                    extension = new MediumEditor.extensions.paste(this.options.paste);
	                    break;
	                case 'placeholder':
	                    extension = new MediumEditor.extensions.placeholder(this.options.placeholder);
	                    break;
	                default:
	                    // All of the built-in buttons for MediumEditor are extensions
	                    // so check to see if the extension we're creating is a built-in button
	                    if (MediumEditor.extensions.button.isBuiltInButton(name)) {
	                        if (opts) {
	                            merged = MediumEditor.util.defaults({}, opts, MediumEditor.extensions.button.prototype.defaults[name]);
	                            extension = new MediumEditor.extensions.button(merged);
	                        } else {
	                            extension = new MediumEditor.extensions.button(name);
	                        }
	                    }
	            }
	
	            if (extension) {
	                this.extensions.push(initExtension(extension, name, this));
	            }
	
	            return extension;
	        },
	
	        stopSelectionUpdates: function () {
	            this.preventSelectionUpdates = true;
	        },
	
	        startSelectionUpdates: function () {
	            this.preventSelectionUpdates = false;
	        },
	
	        checkSelection: function () {
	            var toolbar = this.getExtensionByName('toolbar');
	            if (toolbar) {
	                toolbar.checkState();
	            }
	            return this;
	        },
	
	        // Wrapper around document.queryCommandState for checking whether an action has already
	        // been applied to the current selection
	        queryCommandState: function (action) {
	            var fullAction = /^full-(.+)$/gi,
	                match,
	                queryState = null;
	
	            // Actions starting with 'full-' need to be modified since this is a medium-editor concept
	            match = fullAction.exec(action);
	            if (match) {
	                action = match[1];
	            }
	
	            try {
	                queryState = this.options.ownerDocument.queryCommandState(action);
	            } catch (exc) {
	                queryState = null;
	            }
	
	            return queryState;
	        },
	
	        execAction: function (action, opts) {
	            /*jslint regexp: true*/
	            var fullAction = /^full-(.+)$/gi,
	                match,
	                result;
	            /*jslint regexp: false*/
	
	            // Actions starting with 'full-' should be applied to to the entire contents of the editable element
	            // (ie full-bold, full-append-pre, etc.)
	            match = fullAction.exec(action);
	            if (match) {
	                // Store the current selection to be restored after applying the action
	                this.saveSelection();
	                // Select all of the contents before calling the action
	                this.selectAllContents();
	                result = execActionInternal.call(this, match[1], opts);
	                // Restore the previous selection
	                this.restoreSelection();
	            } else {
	                result = execActionInternal.call(this, action, opts);
	            }
	
	            // do some DOM clean-up for known browser issues after the action
	            if (action === 'insertunorderedlist' || action === 'insertorderedlist') {
	                MediumEditor.util.cleanListDOM(this.options.ownerDocument, this.getSelectedParentElement());
	            }
	
	            this.checkSelection();
	            return result;
	        },
	
	        getSelectedParentElement: function (range) {
	            if (range === undefined) {
	                range = this.options.contentWindow.getSelection().getRangeAt(0);
	            }
	            return MediumEditor.selection.getSelectedParentElement(range);
	        },
	
	        selectAllContents: function () {
	            var currNode = MediumEditor.selection.getSelectionElement(this.options.contentWindow);
	
	            if (currNode) {
	                // Move to the lowest descendant node that still selects all of the contents
	                while (currNode.children.length === 1) {
	                    currNode = currNode.children[0];
	                }
	
	                this.selectElement(currNode);
	            }
	        },
	
	        selectElement: function (element) {
	            MediumEditor.selection.selectNode(element, this.options.ownerDocument);
	
	            var selElement = MediumEditor.selection.getSelectionElement(this.options.contentWindow);
	            if (selElement) {
	                this.events.focusElement(selElement);
	            }
	        },
	
	        getFocusedElement: function () {
	            var focused;
	            this.elements.some(function (element) {
	                // Find the element that has focus
	                if (!focused && element.getAttribute('data-medium-focused')) {
	                    focused = element;
	                }
	
	                // bail if we found the element that had focus
	                return !!focused;
	            }, this);
	
	            return focused;
	        },
	
	        // Export the state of the selection in respect to one of this
	        // instance of MediumEditor's elements
	        exportSelection: function () {
	            var selectionElement = MediumEditor.selection.getSelectionElement(this.options.contentWindow),
	                editableElementIndex = this.elements.indexOf(selectionElement),
	                selectionState = null;
	
	            if (editableElementIndex >= 0) {
	                selectionState = MediumEditor.selection.exportSelection(selectionElement, this.options.ownerDocument);
	            }
	
	            if (selectionState !== null && editableElementIndex !== 0) {
	                selectionState.editableElementIndex = editableElementIndex;
	            }
	
	            return selectionState;
	        },
	
	        saveSelection: function () {
	            this.selectionState = this.exportSelection();
	        },
	
	        // Restore a selection based on a selectionState returned by a call
	        // to MediumEditor.exportSelection
	        importSelection: function (selectionState, favorLaterSelectionAnchor) {
	            if (!selectionState) {
	                return;
	            }
	
	            var editableElement = this.elements[selectionState.editableElementIndex || 0];
	            MediumEditor.selection.importSelection(selectionState, editableElement, this.options.ownerDocument, favorLaterSelectionAnchor);
	        },
	
	        restoreSelection: function () {
	            this.importSelection(this.selectionState);
	        },
	
	        createLink: function (opts) {
	            var currentEditor = MediumEditor.selection.getSelectionElement(this.options.contentWindow),
	                customEvent = {},
	                targetUrl;
	
	            // Make sure the selection is within an element this editor is tracking
	            if (this.elements.indexOf(currentEditor) === -1) {
	                return;
	            }
	
	            try {
	                this.events.disableCustomEvent('editableInput');
	                // TODO: Deprecate support for opts.url in 6.0.0
	                if (opts.url) {
	                    MediumEditor.util.deprecated('.url option for createLink', '.value', '6.0.0');
	                }
	                targetUrl = opts.url || opts.value;
	                if (targetUrl && targetUrl.trim().length > 0) {
	                    var currentSelection = this.options.contentWindow.getSelection();
	                    if (currentSelection) {
	                        var currRange = currentSelection.getRangeAt(0),
	                            commonAncestorContainer = currRange.commonAncestorContainer,
	                            exportedSelection,
	                            startContainerParentElement,
	                            endContainerParentElement,
	                            textNodes;
	
	                        // If the selection is contained within a single text node
	                        // and the selection starts at the beginning of the text node,
	                        // MSIE still says the startContainer is the parent of the text node.
	                        // If the selection is contained within a single text node, we
	                        // want to just use the default browser 'createLink', so we need
	                        // to account for this case and adjust the commonAncestorContainer accordingly
	                        if (currRange.endContainer.nodeType === 3 &&
	                            currRange.startContainer.nodeType !== 3 &&
	                            currRange.startOffset === 0 &&
	                            currRange.startContainer.firstChild === currRange.endContainer) {
	                            commonAncestorContainer = currRange.endContainer;
	                        }
	
	                        startContainerParentElement = MediumEditor.util.getClosestBlockContainer(currRange.startContainer);
	                        endContainerParentElement = MediumEditor.util.getClosestBlockContainer(currRange.endContainer);
	
	                        // If the selection is not contained within a single text node
	                        // but the selection is contained within the same block element
	                        // we want to make sure we create a single link, and not multiple links
	                        // which can happen with the built in browser functionality
	                        if (commonAncestorContainer.nodeType !== 3 && commonAncestorContainer.textContent.length !== 0 && startContainerParentElement === endContainerParentElement) {
	                            var parentElement = (startContainerParentElement || currentEditor),
	                                fragment = this.options.ownerDocument.createDocumentFragment();
	
	                            // since we are going to create a link from an extracted text,
	                            // be sure that if we are updating a link, we won't let an empty link behind (see #754)
	                            // (Workaroung for Chrome)
	                            this.execAction('unlink');
	
	                            exportedSelection = this.exportSelection();
	                            fragment.appendChild(parentElement.cloneNode(true));
	
	                            if (currentEditor === parentElement) {
	                                // We have to avoid the editor itself being wiped out when it's the only block element,
	                                // as our reference inside this.elements gets detached from the page when insertHTML runs.
	                                // If we just use [parentElement, 0] and [parentElement, parentElement.childNodes.length]
	                                // as the range boundaries, this happens whenever parentElement === currentEditor.
	                                // The tradeoff to this workaround is that a orphaned tag can sometimes be left behind at
	                                // the end of the editor's content.
	                                // In Gecko:
	                                // as an empty <strong></strong> if parentElement.lastChild is a <strong> tag.
	                                // In WebKit:
	                                // an invented <br /> tag at the end in the same situation
	                                MediumEditor.selection.select(
	                                    this.options.ownerDocument,
	                                    parentElement.firstChild,
	                                    0,
	                                    parentElement.lastChild,
	                                    parentElement.lastChild.nodeType === 3 ?
	                                    parentElement.lastChild.nodeValue.length : parentElement.lastChild.childNodes.length
	                                );
	                            } else {
	                                MediumEditor.selection.select(
	                                    this.options.ownerDocument,
	                                    parentElement,
	                                    0,
	                                    parentElement,
	                                    parentElement.childNodes.length
	                                );
	                            }
	
	                            var modifiedExportedSelection = this.exportSelection();
	
	                            textNodes = MediumEditor.util.findOrCreateMatchingTextNodes(
	                                this.options.ownerDocument,
	                                fragment,
	                                {
	                                    start: exportedSelection.start - modifiedExportedSelection.start,
	                                    end: exportedSelection.end - modifiedExportedSelection.start,
	                                    editableElementIndex: exportedSelection.editableElementIndex
	                                }
	                            );
	                            // If textNodes are not present, when changing link on images
	                            // ex: <a><img src="http://image.test.com"></a>, change fragment to currRange.startContainer
	                            // and set textNodes array to [imageElement, imageElement]
	                            if (textNodes.length === 0) {
	                                fragment = this.options.ownerDocument.createDocumentFragment();
	                                fragment.appendChild(commonAncestorContainer.cloneNode(true));
	                                textNodes = [fragment.firstChild.firstChild, fragment.firstChild.lastChild];
	                            }
	
	                            // Creates the link in the document fragment
	                            MediumEditor.util.createLink(this.options.ownerDocument, textNodes, targetUrl.trim());
	
	                            // Chrome trims the leading whitespaces when inserting HTML, which messes up restoring the selection.
	                            var leadingWhitespacesCount = (fragment.firstChild.innerHTML.match(/^\s+/) || [''])[0].length;
	
	                            // Now move the created link back into the original document in a way to preserve undo/redo history
	                            MediumEditor.util.insertHTMLCommand(this.options.ownerDocument, fragment.firstChild.innerHTML.replace(/^\s+/, ''));
	                            exportedSelection.start -= leadingWhitespacesCount;
	                            exportedSelection.end -= leadingWhitespacesCount;
	
	                            this.importSelection(exportedSelection);
	                        } else {
	                            this.options.ownerDocument.execCommand('createLink', false, targetUrl);
	                        }
	
	                        if (this.options.targetBlank || opts.target === '_blank') {
	                            MediumEditor.util.setTargetBlank(MediumEditor.selection.getSelectionStart(this.options.ownerDocument), targetUrl);
	                        } else {
	                            MediumEditor.util.removeTargetBlank(MediumEditor.selection.getSelectionStart(this.options.ownerDocument), targetUrl);
	                        }
	
	                        if (opts.buttonClass) {
	                            MediumEditor.util.addClassToAnchors(MediumEditor.selection.getSelectionStart(this.options.ownerDocument), opts.buttonClass);
	                        }
	                    }
	                }
	                // Fire input event for backwards compatibility if anyone was listening directly to the DOM input event
	                if (this.options.targetBlank || opts.target === '_blank' || opts.buttonClass) {
	                    customEvent = this.options.ownerDocument.createEvent('HTMLEvents');
	                    customEvent.initEvent('input', true, true, this.options.contentWindow);
	                    for (var i = 0, len = this.elements.length; i < len; i += 1) {
	                        this.elements[i].dispatchEvent(customEvent);
	                    }
	                }
	            } finally {
	                this.events.enableCustomEvent('editableInput');
	            }
	            // Fire our custom editableInput event
	            this.events.triggerCustomEvent('editableInput', customEvent, currentEditor);
	        },
	
	        cleanPaste: function (text) {
	            this.getExtensionByName('paste').cleanPaste(text);
	        },
	
	        pasteHTML: function (html, options) {
	            this.getExtensionByName('paste').pasteHTML(html, options);
	        },
	
	        setContent: function (html, index) {
	            index = index || 0;
	
	            if (this.elements[index]) {
	                var target = this.elements[index];
	                target.innerHTML = html;
	                this.checkContentChanged(target);
	            }
	        },
	
	        getContent: function (index) {
	            index = index || 0;
	
	            if (this.elements[index]) {
	                return this.elements[index].innerHTML.trim();
	            }
	            return null;
	        },
	
	        checkContentChanged: function (editable) {
	            editable = editable || MediumEditor.selection.getSelectionElement(this.options.contentWindow);
	            this.events.updateInput(editable, { target: editable, currentTarget: editable });
	        },
	
	        resetContent: function (element) {
	            // For all elements that exist in the this.elements array, we can assume:
	            // - Its initial content has been set in the initialContent object
	            // - It has a medium-editor-index attribute which is the key value in the initialContent object
	
	            if (element) {
	                var index = this.elements.indexOf(element);
	                if (index !== -1) {
	                    this.setContent(initialContent[element.getAttribute('medium-editor-index')], index);
	                }
	                return;
	            }
	
	            this.elements.forEach(function (el, idx) {
	                this.setContent(initialContent[el.getAttribute('medium-editor-index')], idx);
	            }, this);
	        },
	
	        addElements: function (selector) {
	            // Convert elements into an array
	            var elements = createElementsArray(selector, this.options.ownerDocument, true);
	
	            // Do we have elements to add now?
	            if (elements.length === 0) {
	                return false;
	            }
	
	            elements.forEach(function (element) {
	                // Initialize all new elements (we check that in those functions don't worry)
	                element = initElement.call(this, element, this.id);
	
	                // Add new elements to our internal elements array
	                this.elements.push(element);
	
	                // Trigger event so extensions can know when an element has been added
	                this.trigger('addElement', { target: element, currentTarget: element }, element);
	            }, this);
	        },
	
	        removeElements: function (selector) {
	            // Convert elements into an array
	            var elements = createElementsArray(selector, this.options.ownerDocument),
	                toRemove = elements.map(function (el) {
	                    // For textareas, make sure we're looking at the editor div and not the textarea itself
	                    if (el.getAttribute('medium-editor-textarea-id') && el.parentNode) {
	                        return el.parentNode.querySelector('div[medium-editor-textarea-id="' + el.getAttribute('medium-editor-textarea-id') + '"]');
	                    } else {
	                        return el;
	                    }
	                });
	
	            this.elements = this.elements.filter(function (element) {
	                // If this is an element we want to remove
	                if (toRemove.indexOf(element) !== -1) {
	                    this.events.cleanupElement(element);
	                    if (element.getAttribute('medium-editor-textarea-id')) {
	                        cleanupTextareaElement(element);
	                    }
	                    // Trigger event so extensions can clean-up elements that are being removed
	                    this.trigger('removeElement', { target: element, currentTarget: element }, element);
	                    return false;
	                }
	                return true;
	            }, this);
	        }
	    };
	
	    MediumEditor.getEditorFromElement = function (element) {
	        var index = element.getAttribute('data-medium-editor-editor-index'),
	            win = element && element.ownerDocument && (element.ownerDocument.defaultView || element.ownerDocument.parentWindow);
	        if (win && win._mediumEditors && win._mediumEditors[index]) {
	            return win._mediumEditors[index];
	        }
	        return null;
	    };
	}());
	
	(function () {
	    // summary: The default options hash used by the Editor
	
	    MediumEditor.prototype.defaults = {
	        activeButtonClass: 'medium-editor-button-active',
	        buttonLabels: false,
	        delay: 0,
	        disableReturn: false,
	        disableDoubleReturn: false,
	        disableExtraSpaces: false,
	        disableEditing: false,
	        autoLink: false,
	        elementsContainer: false,
	        contentWindow: window,
	        ownerDocument: document,
	        targetBlank: false,
	        extensions: {},
	        spellcheck: true
	    };
	})();
	
	MediumEditor.parseVersionString = function (release) {
	    var split = release.split('-'),
	        version = split[0].split('.'),
	        preRelease = (split.length > 1) ? split[1] : '';
	    return {
	        major: parseInt(version[0], 10),
	        minor: parseInt(version[1], 10),
	        revision: parseInt(version[2], 10),
	        preRelease: preRelease,
	        toString: function () {
	            return [version[0], version[1], version[2]].join('.') + (preRelease ? '-' + preRelease : '');
	        }
	    };
	};
	
	MediumEditor.version = MediumEditor.parseVersionString.call(this, ({
	    // grunt-bump looks for this:
	    'version': '5.21.1'
	}).version);
	
	    return MediumEditor;
	}()));
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(70)))

/***/ },

/***/ 70:
/***/ function(module, exports) {

	// shim for using process in browser
	
	var process = module.exports = {};
	
	// cached from whatever global is present so that test runners that stub it
	// don't break things.  But we need to wrap it in a try catch in case it is
	// wrapped in strict mode code which doesn't define any globals.  It's inside a
	// function because try/catches deoptimize in certain engines.
	
	var cachedSetTimeout;
	var cachedClearTimeout;
	
	(function () {
	  try {
	    cachedSetTimeout = setTimeout;
	  } catch (e) {
	    cachedSetTimeout = function () {
	      throw new Error('setTimeout is not defined');
	    }
	  }
	  try {
	    cachedClearTimeout = clearTimeout;
	  } catch (e) {
	    cachedClearTimeout = function () {
	      throw new Error('clearTimeout is not defined');
	    }
	  }
	} ())
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;
	
	function cleanUpNextTick() {
	    if (!draining || !currentQueue) {
	        return;
	    }
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}
	
	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = cachedSetTimeout.call(null, cleanUpNextTick);
	    draining = true;
	
	    var len = queue.length;
	    while(len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            if (currentQueue) {
	                currentQueue[queueIndex].run();
	            }
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    cachedClearTimeout.call(null, timeout);
	}
	
	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        cachedSetTimeout.call(null, drainQueue, 0);
	    }
	};
	
	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};
	
	function noop() {}
	
	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;
	
	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};
	
	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function() { return 0; };


/***/ },

/***/ 71:
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/* WEBPACK VAR INJECTION */(function(process) {(function (root, factory) {
	  'use strict';
	  var isElectron = typeof module === 'object' && process && process.versions && process.versions.electron;
	  if (!isElectron && typeof module === 'object') {
	    module.exports = factory;
	  } else if (true) {
	    !(__WEBPACK_AMD_DEFINE_RESULT__ = function() {
	        return factory;
	    }.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  } else {
	    root.MediumEditorTable = factory;
	  }
	}(this, function () {
	
	  'use strict';
	
	function extend(dest, source) {
	    var prop;
	    dest = dest || {};
	    for (prop in source) {
	        if (source.hasOwnProperty(prop) && !dest.hasOwnProperty(prop)) {
	            dest[prop] = source[prop];
	        }
	    }
	    return dest;
	}
	
	function getSelectionText(doc) {
	    if (doc.getSelection) {
	        return doc.getSelection().toString();
	    }
	    if (doc.selection && doc.selection.type !== 'Control') {
	        return doc.selection.createRange().text;
	    }
	    return '';
	}
	
	function getSelectionStart(doc) {
	    var node = doc.getSelection().anchorNode,
	        startNode = (node && node.nodeType === 3 ? node.parentNode : node);
	
	    return startNode;
	}
	
	function placeCaretAtNode(doc, node, before) {
	    if (doc.getSelection !== undefined && node) {
	        var range = doc.createRange(),
	            selection = doc.getSelection();
	
	        if (before) {
	            range.setStartBefore(node);
	        } else {
	            range.setStartAfter(node);
	        }
	
	        range.collapse(true);
	
	        selection.removeAllRanges();
	        selection.addRange(range);
	    }
	}
	
	function isInsideElementOfTag(node, tag) {
	    if (!node) {
	        return false;
	    }
	
	    var parentNode = node.parentNode,
	        tagName = parentNode.tagName.toLowerCase();
	
	    while (tagName !== 'body') {
	        if (tagName === tag) {
	            return true;
	        }
	        parentNode = parentNode.parentNode;
	
	        if (parentNode && parentNode.tagName) {
	            tagName = parentNode.tagName.toLowerCase();
	        } else {
	            return false;
	        }
	    }
	
	    return false;
	}
	
	function getParentOf(el, tagTarget) {
	    var tagName = el && el.tagName ? el.tagName.toLowerCase() : false;
	
	    if (!tagName) {
	        return false;
	    }
	    while (tagName && tagName !== 'body') {
	        if (tagName === tagTarget) {
	            return el;
	        }
	        el = el.parentNode;
	        tagName = el && el.tagName ? el.tagName.toLowerCase() : false;
	    }
	}
	
	function Grid(el, callback, rows, columns) {
	    return this.init(el, callback, rows, columns);
	}
	
	Grid.prototype = {
	    init: function (el, callback, rows, columns) {
	        this._root = el;
	        this._callback = callback;
	        this.rows = rows;
	        this.columns = columns;
	        return this._render();
	    },
	
	    setCurrentCell: function (cell) {
	        this._currentCell = cell;
	    },
	
	    markCells: function () {
	        [].forEach.call(this._cellsElements, function (el) {
	            var cell = {
	                    column: parseInt(el.dataset.column, 10),
	                    row: parseInt(el.dataset.row, 10)
	                },
	                active = this._currentCell &&
	                         cell.row <= this._currentCell.row &&
	                         cell.column <= this._currentCell.column;
	
	            if (active === true) {
	                el.classList.add('active');
	            } else {
	                el.classList.remove('active');
	            }
	        }.bind(this));
	    },
	
	    _generateCells: function () {
	        var row = -1;
	
	        this._cells = [];
	
	        for (var i = 0; i < this.rows * this.columns; i++) {
	            var column = i % this.columns;
	
	            if (column === 0) {
	                row++;
	            }
	
	            this._cells.push({
	                column: column,
	                row: row,
	                active: false
	            });
	        }
	    },
	
	    _html: function () {
	        var width = this.columns * COLUMN_WIDTH + BORDER_WIDTH * 2,
	            height = this.rows * COLUMN_WIDTH + BORDER_WIDTH * 2,
	            html = '<div class="medium-editor-table-builder-grid clearfix" style="width:' + width + 'px;height:' + height + 'px;">';
	        html += this._cellsHTML();
	        html += '</div>';
	        return html;
	    },
	
	    _cellsHTML: function () {
	        var html = '';
	        this._generateCells();
	        this._cells.map(function (cell) {
	            html += '<a href="#" class="medium-editor-table-builder-cell' +
	                    (cell.active === true ? ' active' : '') +
	                    '" ' + 'data-row="' + cell.row +
	                    '" data-column="' + cell.column + '">';
	            html += '</a>';
	        });
	        return html;
	    },
	
	    _render: function () {
	        this._root.innerHTML = this._html();
	        this._cellsElements = this._root.querySelectorAll('a');
	        this._bindEvents();
	    },
	
	    _bindEvents: function () {
	        [].forEach.call(this._cellsElements, function (el) {
	            this._onMouseEnter(el);
	            this._onClick(el);
	        }.bind(this));
	    },
	
	    _onMouseEnter: function (el) {
	        var self = this,
	            timer;
	
	        el.addEventListener('mouseenter', function () {
	            clearTimeout(timer);
	
	            var dataset = this.dataset;
	
	            timer = setTimeout(function () {
	                self._currentCell = {
	                    column: parseInt(dataset.column, 10),
	                    row: parseInt(dataset.row, 10)
	                };
	                self.markCells();
	            }, 50);
	        });
	    },
	
	    _onClick: function (el) {
	        var self = this;
	        el.addEventListener('click', function (e) {
	            e.preventDefault();
	            self._callback(this.dataset.row, this.dataset.column);
	        });
	    }
	};
	
	function Builder(options) {
	    return this.init(options);
	}
	
	Builder.prototype = {
	    init: function (options) {
	        this.options = options;
	        this._doc = options.ownerDocument || document;
	        this._root = this._doc.createElement('div');
	        this._root.className = 'medium-editor-table-builder';
	        this.grid = new Grid(
	          this._root,
	          this.options.onClick,
	          this.options.rows,
	          this.options.columns
	        );
	
	        this._range = null;
	        this._toolbar = this._doc.createElement('div');
	        this._toolbar.className = 'medium-editor-table-builder-toolbar';
	
	        var spanRow = this._doc.createElement('span');
	        spanRow.innerHTML = 'Row:';
	        this._toolbar.appendChild(spanRow);
	        var addRowBefore = this._doc.createElement('button');
	        addRowBefore.title = 'Add row before';
	        addRowBefore.innerHTML = '<i class="fa fa-long-arrow-up"></i>';
	        addRowBefore.onclick = this.addRow.bind(this, true);
	        this._toolbar.appendChild(addRowBefore);
	
	        var addRowAfter = this._doc.createElement('button');
	        addRowAfter.title = 'Add row after';
	        addRowAfter.innerHTML = '<i class="fa fa-long-arrow-down"></i>';
	        addRowAfter.onclick = this.addRow.bind(this, false);
	        this._toolbar.appendChild(addRowAfter);
	
	        var remRow = this._doc.createElement('button');
	        remRow.title = 'Remove row';
	        remRow.innerHTML = '<i class="fa fa-close"></i>';
	        remRow.onclick = this.removeRow.bind(this);
	        this._toolbar.appendChild(remRow);
	
	        var spanCol = this._doc.createElement('span');
	        spanCol.innerHTML = 'Column:';
	        this._toolbar.appendChild(spanCol);
	        var addColumnBefore = this._doc.createElement('button');
	        addColumnBefore.title = 'Add column before';
	        addColumnBefore.innerHTML = '<i class="fa fa-long-arrow-left"></i>';
	        addColumnBefore.onclick = this.addColumn.bind(this, true);
	        this._toolbar.appendChild(addColumnBefore);
	
	        var addColumnAfter = this._doc.createElement('button');
	        addColumnAfter.title = 'Add column after';
	        addColumnAfter.innerHTML = '<i class="fa fa-long-arrow-right"></i>';
	        addColumnAfter.onclick = this.addColumn.bind(this, false);
	        this._toolbar.appendChild(addColumnAfter);
	
	        var remColumn = this._doc.createElement('button');
	        remColumn.title = 'Remove column';
	        remColumn.innerHTML = '<i class="fa fa-close"></i>';
	        remColumn.onclick = this.removeColumn.bind(this);
	        this._toolbar.appendChild(remColumn);
	
	        var remTable = this._doc.createElement('button');
	        remTable.title = 'Remove table';
	        remTable.innerHTML = '<i class="fa fa-trash-o"></i>';
	        remTable.onclick = this.removeTable.bind(this);
	        this._toolbar.appendChild(remTable);
	
	        var grid = this._root.childNodes[0];
	        this._root.insertBefore(this._toolbar, grid);
	    },
	
	    getElement: function () {
	        return this._root;
	    },
	
	    hide: function () {
	        this._root.style.display = '';
	        this.grid.setCurrentCell({ column: -1, row: -1 });
	        this.grid.markCells();
	    },
	
	    show: function (left) {
	        this._root.style.display = 'block';
	        this._root.style.left = left + 'px';
	    },
	
	    setEditor: function (range) {
	        this._range = range;
	        this._toolbar.style.display = 'block';
	    },
	
	    setBuilder: function () {
	        this._range = null;
	        this._toolbar.style.display = 'none';
	        var elements = this._doc.getElementsByClassName('medium-editor-table-builder-grid');
	        for (var i = 0; i < elements.length; i++) {
	            elements[i].style.height = (COLUMN_WIDTH * this.rows + BORDER_WIDTH * 2) + 'px';
	            elements[i].style.width = (COLUMN_WIDTH * this.columns + BORDER_WIDTH * 2) + 'px';
	        }
	    },
	
	    addRow: function (before, e) {
	        e.preventDefault();
	        e.stopPropagation();
	        var tbody = this._range.parentNode.parentNode,
	            tr = this._doc.createElement('tr'),
	            td;
	        for (var i = 0; i < this._range.parentNode.childNodes.length; i++) {
	            td = this._doc.createElement('td');
	            td.appendChild(this._doc.createElement('br'));
	            tr.appendChild(td);
	        }
	        if (before !== true && this._range.parentNode.nextSibling) {
	            tbody.insertBefore(tr, this._range.parentNode.nextSibling);
	        } else if (before === true) {
	            tbody.insertBefore(tr, this._range.parentNode);
	        } else {
	            tbody.appendChild(tr);
	        }
	        this.options.onClick(0, 0);
	    },
	
	    removeRow: function (e) {
	        e.preventDefault();
	        e.stopPropagation();
	        this._range.parentNode.parentNode.removeChild(this._range.parentNode);
	        this.options.onClick(0, 0);
	    },
	
	    addColumn: function (before, e) {
	        e.preventDefault();
	        e.stopPropagation();
	        var cell = Array.prototype.indexOf.call(this._range.parentNode.childNodes, this._range),
	            tbody = this._range.parentNode.parentNode,
	            td;
	
	        for (var i = 0; i < tbody.childNodes.length; i++) {
	            td = this._doc.createElement('td');
	            td.appendChild(this._doc.createElement('br'));
	            if (before === true) {
	                tbody.childNodes[i].insertBefore(td, tbody.childNodes[i].childNodes[cell]);
	            } else if (this._range.parentNode.parentNode.childNodes[i].childNodes[cell].nextSibling) {
	                tbody.childNodes[i].insertBefore(td, tbody.childNodes[i].childNodes[cell].nextSibling);
	            } else {
	                tbody.childNodes[i].appendChild(td);
	            }
	        }
	
	        this.options.onClick(0, 0);
	    },
	
	    removeColumn: function (e) {
	        e.preventDefault();
	        e.stopPropagation();
	        var cell = Array.prototype.indexOf.call(this._range.parentNode.childNodes, this._range),
	            tbody = this._range.parentNode.parentNode,
	            rows = tbody.childNodes.length;
	
	        for (var i = 0; i < rows; i++) {
	            tbody.childNodes[i].removeChild(tbody.childNodes[i].childNodes[cell]);
	        }
	        this.options.onClick(0, 0);
	    },
	
	    removeTable: function (e) {
	        e.preventDefault();
	        e.stopPropagation();
	        var cell = Array.prototype.indexOf.call(this._range.parentNode.childNodes, this._range),
	            table = this._range.parentNode.parentNode.parentNode;
	
	        table.parentNode.removeChild(table);
	        this.options.onClick(0, 0);
	    }
	};
	
	function Table(editor) {
	    return this.init(editor);
	}
	
	var TAB_KEY_CODE = 9;
	
	Table.prototype = {
	    init: function (editor) {
	        this._editor = editor;
	        this._doc = this._editor.options.ownerDocument;
	        this._bindTabBehavior();
	    },
	
	    insert: function (rows, cols) {
	        var html = this._html(rows, cols);
	
	        this._editor.pasteHTML(
	            '<table class="medium-editor-table" id="medium-editor-table"' +
	            ' width="100%">' +
	            '<tbody>' +
	            html +
	            '</tbody>' +
	            '</table>', {
	                cleanAttrs: [],
	                cleanTags: []
	            }
	        );
	
	        var table = this._doc.getElementById('medium-editor-table');
	        table.removeAttribute('id');
	        placeCaretAtNode(this._doc, table.querySelector('td'), true);
	
	        this._editor.checkSelection();
	    },
	
	    _html: function (rows, cols) {
	        var html = '',
	            x, y,
	            text = getSelectionText(this._doc);
	
	        for (x = 0; x <= rows; x++) {
	            html += '<tr>';
	            for (y = 0; y <= cols; y++) {
	                html += '<td>' + (x === 0 && y === 0 ? text : '<br />') + '</td>';
	            }
	            html += '</tr>';
	        }
	        return html;
	    },
	
	    _bindTabBehavior: function () {
	        var self = this;
	        [].forEach.call(this._editor.elements, function (el) {
	            el.addEventListener('keydown', function (e) {
	                self._onKeyDown(e);
	            });
	        });
	    },
	
	    _onKeyDown: function (e) {
	        var el = getSelectionStart(this._doc),
	            table;
	
	        if (e.which === TAB_KEY_CODE && isInsideElementOfTag(el, 'table')) {
	            e.preventDefault();
	            e.stopPropagation();
	            table = this._getTableElements(el);
	            if (e.shiftKey) {
	                this._tabBackwards(el.previousSibling, table.row);
	            } else {
	                if (this._isLastCell(el, table.row, table.root)) {
	                    this._insertRow(getParentOf(el, 'tbody'), table.row.cells.length);
	                }
	                placeCaretAtNode(this._doc, el);
	            }
	        }
	    },
	
	    _getTableElements: function (el) {
	        return {
	            cell: getParentOf(el, 'td'),
	            row: getParentOf(el, 'tr'),
	            root: getParentOf(el, 'table')
	        };
	    },
	
	    _tabBackwards: function (el, row) {
	        el = el || this._getPreviousRowLastCell(row);
	        placeCaretAtNode(this._doc, el, true);
	    },
	
	    _insertRow: function (tbody, cols) {
	        var tr = document.createElement('tr'),
	            html = '',
	            i;
	
	        for (i = 0; i < cols; i += 1) {
	            html += '<td><br /></td>';
	        }
	        tr.innerHTML = html;
	        tbody.appendChild(tr);
	    },
	
	    _isLastCell: function (el, row, table) {
	        return (
	          (row.cells.length - 1) === el.cellIndex &&
	          (table.rows.length - 1) === row.rowIndex
	        );
	    },
	
	    _getPreviousRowLastCell: function (row) {
	        row = row.previousSibling;
	        if (row) {
	            return row.cells[row.cells.length - 1];
	        }
	    }
	};
	
	var COLUMN_WIDTH = 16,
	    BORDER_WIDTH = 1,
	    MediumEditorTable;
	
	MediumEditorTable = MediumEditor.extensions.form.extend({
	    name: 'table',
	
	    aria: 'create table',
	    action: 'table',
	    contentDefault: 'TBL',
	    contentFA: '<i class="fa fa-table"></i>',
	
	    handleClick: function (event) {
	        event.preventDefault();
	        event.stopPropagation();
	
	        this[this.isActive() === true ? 'hide' : 'show']();
	    },
	
	    hide: function () {
	        this.setInactive();
	        this.builder.hide();
	    },
	
	    show: function () {
	        this.setActive();
	
	        var range = MediumEditor.selection.getSelectionRange(this.document);
	        if (range.startContainer.nodeName.toLowerCase() === 'td' ||
	          range.endContainer.nodeName.toLowerCase() === 'td' ||
	          MediumEditor.util.getClosestTag(MediumEditor.selection.getSelectedParentElement(range), 'td')) {
	            this.builder.setEditor(MediumEditor.selection.getSelectedParentElement(range));
	        } else {
	            this.builder.setBuilder();
	        }
	        this.builder.show(this.button.offsetLeft);
	    },
	
	    getForm: function () {
	        if (!this.builder) {
	            this.builder = new Builder({
	                onClick: function (rows, columns) {
	                    if (rows > 0 || columns > 0) {
	                        this.table.insert(rows, columns);
	                    }
	                    this.hide();
	                }.bind(this),
	                ownerDocument: this.document,
	                rows: this.rows || 10,
	                columns: this.columns || 10
	            });
	
	            this.table = new Table(this.base);
	        }
	
	        return this.builder.getElement();
	    }
	});
	
	  return MediumEditorTable;
	}()));
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(70)))

/***/ }

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgYzYwOGYzOGU4MjJkMzNkZTNlZmU/OWZlZCoiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2Fzc2V0cy90eXBlc2NyaXB0L1BsdWdpbnMvTWVkaXVtLmpzIiwid2VicGFjazovLy8uL3Jlc291cmNlcy9hc3NldHMvdHlwZXNjcmlwdC9BYnN0cmFjdC9QbHVnaW5zLmpzPzM1MjEqIiwid2VicGFjazovLy8uL3Jlc291cmNlcy9hc3NldHMvdHlwZXNjcmlwdC9IZWxwZXJzLmpzPzE3YjUiLCJ3ZWJwYWNrOi8vLy4vfi9tZWRpdW0tZWRpdG9yL2Rpc3QvanMvbWVkaXVtLWVkaXRvci5qcyIsIndlYnBhY2s6Ly8vLi9+L3Byb2Nlc3MvYnJvd3Nlci5qcyIsIndlYnBhY2s6Ly8vLi9+L21lZGl1bS1lZGl0b3ItdGFibGVzL2Rpc3QvanMvbWVkaXVtLWVkaXRvci10YWJsZXMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHVCQUFlO0FBQ2Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7O0FDdENBO0FBQ0E7QUFDQTtBQUNBLG9CQUFtQixzQkFBc0I7QUFDekM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFDO0FBQ0QsbUM7Ozs7Ozs7QUN2Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUM7QUFDRDtBQUNBLG9DOzs7Ozs7O0FDVkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFtQixrQkFBa0I7QUFDckM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9DOzs7Ozs7O21DQ3RFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFZLFNBQVM7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFZLFNBQVM7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLLGFBQWE7QUFDbEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUc7QUFDSDtBQUNBOztBQUVBLElBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQ0FBcUM7QUFDckMsVUFBUztBQUNUO0FBQ0EsVUFBUztBQUNULHNDQUFxQztBQUNyQyxVQUFTO0FBQ1Q7QUFDQTtBQUNBLFFBQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFjLGFBQWE7QUFDM0I7QUFDQTtBQUNBO0FBQ0EsUUFBTztBQUNQO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxRQUFPO0FBQ1A7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0EsUUFBTztBQUNQO0FBQ0Esc0JBQXFCO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQSw4Q0FBNkMsU0FBUztBQUN0RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQSxVQUFTO0FBQ1QsTUFBSztBQUNMO0FBQ0E7QUFDQSxFQUFDOztBQUVEOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0JBQXVCLG9CQUFvQjtBQUMzQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7O0FBRUw7O0FBRUE7QUFDQTtBQUNBLGlKQUFnSixHQUFHLE9BQU8sR0FBRzs7QUFFN0o7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7O0FBRVQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLFVBQVM7O0FBRVQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxVQUFTOztBQUVUO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxVQUFTOztBQUVUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxVQUFTOztBQUVUO0FBQ0E7QUFDQTtBQUNBLFVBQVM7O0FBRVQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTOztBQUVUO0FBQ0Esb0RBQW1ELGlCQUFpQjtBQUNwRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGtCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0JBQThCO0FBQzlCLHNCQUFxQjtBQUNyQixnRkFBK0U7QUFDL0U7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7O0FBRVQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7O0FBRVQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7O0FBRVQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsNEJBQTJCLCtCQUErQjtBQUMxRDtBQUNBO0FBQ0E7QUFDQSxrQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0Esc0JBQXFCO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsVUFBUzs7QUFFVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxVQUFTOztBQUVUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsVUFBUzs7QUFFVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7O0FBRVQ7QUFDQTtBQUNBO0FBQ0EsVUFBUzs7QUFFVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7O0FBRVQ7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxjQUFhOztBQUViO0FBQ0EsVUFBUzs7QUFFVDtBQUNBLGlHQUFnRztBQUNoRztBQUNBLG9EQUFtRCxzQkFBc0Isc0JBQXNCLHdCQUF3QjtBQUN2SCxVQUFTOztBQUVUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBaUI7QUFDakI7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUzs7QUFFVDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNCQUFxQjtBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQkFBcUI7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLFVBQVM7O0FBRVQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWE7QUFDYjs7QUFFQSw0QkFBMkIsZUFBZTtBQUMxQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUzs7QUFFVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYTtBQUNiOztBQUVBLDRCQUEyQixlQUFlO0FBQzFDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTOztBQUVUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0QkFBMkIsb0JBQW9CO0FBQy9DO0FBQ0E7QUFDQSxjQUFhO0FBQ2I7QUFDQSw0QkFBMkIsZUFBZTtBQUMxQyxnQ0FBK0Isb0JBQW9CO0FBQ25EO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUzs7QUFFVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTOztBQUVUO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBLHFFQUFvRTtBQUNwRTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7O0FBRVQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQkFBcUI7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwwQkFBeUI7QUFDekI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLHNCQUFxQjtBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxVQUFTOztBQUVUO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDRCQUEyQixnQ0FBZ0M7QUFDM0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQSxzQkFBcUI7QUFDckI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWE7QUFDYjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYTs7QUFFYjtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWE7QUFDYjtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsY0FBYTtBQUNiO0FBQ0E7QUFDQSxjQUFhO0FBQ2I7QUFDQTtBQUNBOztBQUVBO0FBQ0EsVUFBUzs7QUFFVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTOztBQUVUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxVQUFTO0FBQ1Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7O0FBRVQ7QUFDQTtBQUNBLFVBQVM7O0FBRVQ7QUFDQTtBQUNBO0FBQ0EsY0FBYTtBQUNiLFVBQVM7O0FBRVQ7QUFDQTtBQUNBLFVBQVM7O0FBRVQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFhO0FBQ2IsVUFBUzs7QUFFVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFhO0FBQ2I7QUFDQSxVQUFTOztBQUVUO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGNBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUzs7QUFFVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7O0FBRVQ7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsNEJBQTJCLCtCQUErQjtBQUMxRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTOztBQUVUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTOztBQUVUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUzs7QUFFVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7O0FBRVQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUzs7QUFFVDtBQUNBO0FBQ0E7QUFDQSxjQUFhO0FBQ2IsVUFBUzs7QUFFVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYTtBQUNiLFVBQVM7O0FBRVQ7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFhO0FBQ2IsVUFBUzs7QUFFVDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLDRCQUEyQixrQkFBa0I7QUFDN0M7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsY0FBYTtBQUNiO0FBQ0E7QUFDQSxVQUFTOztBQUVUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEVBQUM7O0FBRUQ7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQ0FBbUM7QUFDbkM7QUFDQTtBQUNBLDhDQUE2QyxhQUFhO0FBQzFEO0FBQ0EsNENBQTJDO0FBQzNDLCtDQUE4QztBQUM5QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZCQUE0Qjs7QUFFNUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7O0FBRVQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTOztBQUVUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7O0FBRUw7QUFDQSxFQUFDOztBQUVEO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsVUFBUzs7QUFFVDtBQUNBO0FBQ0E7QUFDQSxjQUFhO0FBQ2IsVUFBUzs7QUFFVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsVUFBUzs7QUFFVDtBQUNBO0FBQ0E7QUFDQSxhQUFZLE9BQU87QUFDbkIsYUFBWSxXQUFXO0FBQ3ZCLGFBQVksU0FBUztBQUNyQixhQUFZLFFBQVE7QUFDcEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwwQkFBeUI7QUFDekI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxVQUFTOztBQUVUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQkFBcUI7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0NBQW1DLDJFQUEyRTtBQUM5RztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTOztBQUVUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQ0FBK0I7O0FBRS9CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWE7QUFDYjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0EsVUFBUzs7QUFFVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsVUFBUzs7QUFFVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxVQUFTOztBQUVUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWlCO0FBQ2pCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0Esc0JBQXFCO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLFVBQVM7O0FBRVQ7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsVUFBUzs7QUFFVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWlCOztBQUVqQjtBQUNBLFVBQVM7O0FBRVQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrREFBaUQsU0FBUztBQUMxRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUzs7QUFFVDtBQUNBO0FBQ0E7QUFDQSxxQkFBb0IsV0FBVztBQUMvQixxQkFBb0IsTUFBTTtBQUMxQixzQkFBcUIsT0FBTztBQUM1QjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUzs7QUFFVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTOztBQUVUO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxVQUFTOztBQUVUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGNBQWE7QUFDYixVQUFTOztBQUVUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUzs7QUFFVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUzs7QUFFVDtBQUNBO0FBQ0E7QUFDQSxxQkFBb0IsWUFBWTtBQUNoQyxxQkFBb0IsUUFBUTtBQUM1QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWE7QUFDYjtBQUNBO0FBQ0EsVUFBUzs7QUFFVDtBQUNBO0FBQ0E7QUFDQSxxQkFBb0IsWUFBWTtBQUNoQyxxQkFBb0IsV0FBVztBQUMvQixxQkFBb0IsUUFBUTtBQUM1QjtBQUNBO0FBQ0E7QUFDQSxVQUFTOztBQUVUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7O0FBRVQ7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsVUFBUzs7QUFFVDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEVBQUM7O0FBRUQ7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFhO0FBQ2IsVUFBUztBQUNUOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGNBQWE7QUFDYixVQUFTOztBQUVUO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFhO0FBQ2IsVUFBUzs7QUFFVDtBQUNBO0FBQ0EsZ0RBQStDLE9BQU87QUFDdEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUzs7QUFFVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTOztBQUVUO0FBQ0E7QUFDQTtBQUNBLGNBQWE7O0FBRWIsbURBQWtELFNBQVM7QUFDM0Q7QUFDQTtBQUNBO0FBQ0EsVUFBUzs7QUFFVDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGtCQUFpQjtBQUNqQjtBQUNBLFVBQVM7O0FBRVQ7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTOztBQUVUO0FBQ0E7QUFDQSxVQUFTOztBQUVUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUzs7QUFFVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTOztBQUVUO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsVUFBUzs7QUFFVDtBQUNBO0FBQ0E7QUFDQSxVQUFTOztBQUVUO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWlCO0FBQ2pCO0FBQ0EsVUFBUzs7QUFFVDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxrQkFBaUI7QUFDakI7QUFDQSxVQUFTOztBQUVUOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWE7O0FBRWI7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsVUFBUzs7QUFFVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7O0FBRVQ7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDhCQUE2QjtBQUM3QiwwQkFBeUI7QUFDekI7QUFDQSxrQkFBaUI7O0FBRWpCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFVBQVM7O0FBRVQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxVQUFTOztBQUVUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNCQUFxQjs7QUFFckI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTOztBQUVUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGNBQWE7O0FBRWIsb0NBQW1DLG1DQUFtQztBQUN0RSxVQUFTOztBQUVUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTOztBQUVUO0FBQ0E7QUFDQSx3Q0FBdUMsaUNBQWlDO0FBQ3hFLFVBQVM7O0FBRVQ7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGtCQUFpQjtBQUNqQjs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxVQUFTOztBQUVUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7O0FBRVQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBaUI7O0FBRWpCO0FBQ0E7QUFDQSxzREFBcUQsc0RBQXNEO0FBQzNHO0FBQ0E7QUFDQSxVQUFTOztBQUVUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJDQUEwQyx3Q0FBd0M7QUFDbEY7QUFDQSxVQUFTOztBQUVUO0FBQ0E7QUFDQSxVQUFTOztBQUVUO0FBQ0E7QUFDQSxVQUFTOztBQUVUO0FBQ0E7QUFDQSxVQUFTOztBQUVUO0FBQ0E7QUFDQSxVQUFTOztBQUVUO0FBQ0E7QUFDQSxVQUFTOztBQUVUO0FBQ0E7QUFDQSxVQUFTOztBQUVUO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsaUNBQWdDOztBQUVoQztBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFpQjtBQUNqQjtBQUNBLFVBQVM7O0FBRVQ7QUFDQTtBQUNBLFVBQVM7O0FBRVQ7QUFDQTtBQUNBLFVBQVM7O0FBRVQ7QUFDQTtBQUNBLFVBQVM7O0FBRVQ7QUFDQTtBQUNBLFVBQVM7O0FBRVQ7QUFDQTtBQUNBLFVBQVM7O0FBRVQ7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEVBQUM7O0FBRUQ7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFZO0FBQ1o7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWE7QUFDYjtBQUNBO0FBQ0EsVUFBUzs7QUFFVDtBQUNBOztBQUVBO0FBQ0E7QUFDQSxVQUFTOztBQUVUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7O0FBRVQ7QUFDQTtBQUNBLFVBQVM7O0FBRVQ7QUFDQTtBQUNBLFVBQVM7O0FBRVQ7QUFDQTtBQUNBLFVBQVM7O0FBRVQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFpQjtBQUNqQjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBaUI7QUFDakI7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7O0FBRVQ7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7O0FBRVQ7QUFDQTtBQUNBLFVBQVM7O0FBRVQ7QUFDQTtBQUNBO0FBQ0EsVUFBUzs7QUFFVDtBQUNBO0FBQ0E7QUFDQSxVQUFTOztBQUVUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7O0FBRVQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWlCO0FBQ2pCOztBQUVBO0FBQ0E7QUFDQSxNQUFLOztBQUVMO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEVBQUM7O0FBRUQ7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUNBQXNDO0FBQ3RDO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1Q0FBc0M7QUFDdEM7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVDQUFzQztBQUN0QztBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYTtBQUNiO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWE7QUFDYjtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFhO0FBQ2I7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYTtBQUNiO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7O0FBRVQ7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdDQUF1QztBQUN2QztBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsRUFBQztBQUNEO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFVBQVM7O0FBRVQ7QUFDQSxpQ0FBZ0M7QUFDaEMsaUNBQWdDOztBQUVoQztBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdDQUErQjs7QUFFL0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTOztBQUVUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7O0FBRVQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUzs7QUFFVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTOztBQUVUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTOztBQUVUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7O0FBRUw7QUFDQSxFQUFDO0FBQ0Q7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxVQUFTOztBQUVUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxVQUFTOztBQUVUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTOztBQUVUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7O0FBRVQ7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBLFVBQVM7O0FBRVQ7QUFDQTtBQUNBO0FBQ0EsVUFBUzs7QUFFVDtBQUNBO0FBQ0E7QUFDQSxVQUFTOztBQUVUO0FBQ0E7QUFDQTtBQUNBOztBQUVBLDZCQUE0QjtBQUM1QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUzs7QUFFVDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLFVBQVM7O0FBRVQ7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLFVBQVM7O0FBRVQ7QUFDQTtBQUNBO0FBQ0EsVUFBUzs7QUFFVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7O0FBRVQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtREFBa0QsS0FBSztBQUN2RDtBQUNBO0FBQ0EsY0FBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLFVBQVM7O0FBRVQ7QUFDQTtBQUNBO0FBQ0EsVUFBUzs7QUFFVDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUEsVUFBUzs7QUFFVDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLFVBQVM7O0FBRVQ7QUFDQTtBQUNBLFVBQVM7O0FBRVQ7QUFDQTtBQUNBLFVBQVM7O0FBRVQ7QUFDQTtBQUNBLFVBQVM7O0FBRVQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7O0FBRVQ7QUFDQTtBQUNBO0FBQ0EsVUFBUzs7QUFFVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7O0FBRVQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7O0FBRUw7QUFDQSxFQUFDOztBQUVEO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0EsVUFBUzs7QUFFVDtBQUNBO0FBQ0EsVUFBUzs7QUFFVDtBQUNBO0FBQ0E7QUFDQSxVQUFTOztBQUVUO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0EsVUFBUzs7QUFFVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7O0FBRVQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTOztBQUVUO0FBQ0E7QUFDQTtBQUNBLFVBQVM7O0FBRVQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsVUFBUzs7QUFFVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQ0FBcUM7QUFDckM7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFpQjs7QUFFakI7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQSxjQUFhO0FBQ2I7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWE7QUFDYjtBQUNBO0FBQ0EsY0FBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLFVBQVM7O0FBRVQ7QUFDQTtBQUNBO0FBQ0EsVUFBUzs7QUFFVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTOztBQUVUO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFpQjtBQUNqQjs7QUFFQTtBQUNBLFVBQVM7O0FBRVQ7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTOztBQUVUO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYTtBQUNiLFVBQVM7O0FBRVQ7QUFDQTtBQUNBO0FBQ0EsVUFBUzs7QUFFVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7O0FBRVQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUzs7QUFFVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0EsVUFBUzs7QUFFVDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLOztBQUVMO0FBQ0EsRUFBQzs7QUFFRDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGtEQUFpRCxJQUFJLDZFQUE2RTtBQUNsSTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7O0FBRVQ7QUFDQTtBQUNBLDRCQUEyQix1Q0FBdUM7QUFDbEU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUzs7QUFFVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUzs7QUFFVDtBQUNBO0FBQ0EsVUFBUzs7QUFFVDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0JBQXFCO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBaUI7QUFDakI7QUFDQSxVQUFTOztBQUVUO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0QkFBMkIsMEJBQTBCO0FBQ3JEO0FBQ0E7QUFDQTtBQUNBLDREQUEyRCwwREFBMEQ7QUFDckg7QUFDQSxVQUFTOztBQUVUO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUEsNEJBQTJCLGtCQUFrQjtBQUM3QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0JBQXFCO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUzs7QUFFVDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTOztBQUVUO0FBQ0E7QUFDQTs7QUFFQSxxQ0FBb0MsNkJBQTZCO0FBQ2pFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTOztBQUVUO0FBQ0E7QUFDQSw0QkFBMkIsaURBQWlEO0FBQzVFO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWlCO0FBQ2pCO0FBQ0E7QUFDQSxVQUFTOztBQUVUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQkFBcUI7QUFDckI7QUFDQTtBQUNBO0FBQ0EsVUFBUzs7QUFFVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLE1BQUs7O0FBRUw7QUFDQSxFQUFDOztBQUVEO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxVQUFTOztBQUVUO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7O0FBRVQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBaUI7QUFDakI7O0FBRUE7QUFDQTtBQUNBLFVBQVM7O0FBRVQ7QUFDQTtBQUNBO0FBQ0EsY0FBYTtBQUNiLFVBQVM7O0FBRVQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFhO0FBQ2I7QUFDQSxNQUFLOztBQUVMO0FBQ0EsRUFBQzs7QUFFRDtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYTtBQUNiLFVBQVM7O0FBRVQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnREFBK0M7QUFDL0M7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFhO0FBQ2I7QUFDQSxNQUFLOztBQUVMO0FBQ0EsRUFBQzs7QUFFRDtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGdDQUErQjtBQUMvQjs7QUFFQTs7QUFFQTtBQUNBO0FBQ0EsVUFBUzs7QUFFVDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxVQUFTOztBQUVUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7O0FBRVQ7QUFDQTtBQUNBO0FBQ0EsVUFBUzs7QUFFVDtBQUNBO0FBQ0E7QUFDQSxVQUFTOztBQUVUO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFVBQVM7O0FBRVQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxVQUFTOztBQUVUOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7O0FBRVQ7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTOztBQUVUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSw0QkFBMkIscUJBQXFCO0FBQ2hEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1Q0FBc0M7QUFDdEM7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUNBQXNDO0FBQ3RDOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxVQUFTOztBQUVUO0FBQ0E7QUFDQSxVQUFTOztBQUVUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFhO0FBQ2IsVUFBUzs7QUFFVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWE7QUFDYiw4Q0FBNkMsY0FBYztBQUMzRDtBQUNBLFVBQVM7O0FBRVQ7QUFDQTtBQUNBO0FBQ0EsVUFBUzs7QUFFVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7O0FBRVQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7O0FBRUw7QUFDQSxFQUFDOztBQUVEO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZ0NBQStCO0FBQy9COztBQUVBO0FBQ0E7QUFDQSxVQUFTOztBQUVUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLFVBQVM7O0FBRVQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUzs7QUFFVDtBQUNBO0FBQ0E7QUFDQSxVQUFTOztBQUVUO0FBQ0E7QUFDQTtBQUNBLFVBQVM7O0FBRVQ7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsVUFBUzs7QUFFVDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLFVBQVM7O0FBRVQ7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsVUFBUzs7QUFFVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7O0FBRVQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVDQUFzQztBQUN0Qzs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1Q0FBc0M7QUFDdEM7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLFVBQVM7O0FBRVQ7QUFDQTtBQUNBLFVBQVM7O0FBRVQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWE7QUFDYixVQUFTOztBQUVUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYTtBQUNiLDhDQUE2QyxjQUFjO0FBQzNEO0FBQ0EsVUFBUzs7QUFFVDtBQUNBO0FBQ0E7QUFDQSxVQUFTOztBQUVUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUzs7QUFFVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSzs7QUFFTDtBQUNBLEVBQUM7QUFDRDtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0EsdURBQXNELDhDQUE4Qzs7QUFFcEc7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsOEJBQTZCLGdCQUFnQjs7QUFFN0M7QUFDQSw4QkFBNkIsNkJBQTZCLFFBQVEsUUFBUSxrQkFBa0IsUUFBUSxRQUFRLG9CQUFvQixRQUFRLFFBQVEsaUJBQWlCLFFBQVE7O0FBRXpLO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdCQUFlLE1BQU07QUFDckIsZ0JBQWUsSUFBSTtBQUNuQixnQkFBZSxJQUFJO0FBQ25CLGlCQUFnQixPQUFPO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDRCQUEyQiwrQkFBK0I7QUFDMUQ7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWlCO0FBQ2pCO0FBQ0E7QUFDQSxVQUFTOztBQUVUO0FBQ0E7QUFDQSxVQUFTOztBQUVUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTOztBQUVUO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFVBQVM7O0FBRVQ7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0NBQStCLHVCQUF1QjtBQUN0RDtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFpQjtBQUNqQjtBQUNBO0FBQ0EsY0FBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLFVBQVM7O0FBRVQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnREFBK0MsNENBQTRDO0FBQzNGO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnREFBK0MsNENBQTRDO0FBQzNGLGNBQWE7QUFDYixVQUFTOztBQUVUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBLFVBQVM7O0FBRVQ7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxrQkFBaUI7QUFDakI7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQSxzRUFBcUUsb0JBQW9CLG9CQUFvQixhQUFhLGNBQWMsa0JBQWtCO0FBQzFKO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0EsVUFBUzs7QUFFVDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7O0FBRVQ7QUFDQTtBQUNBLFVBQVM7O0FBRVQ7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsVUFBUzs7QUFFVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSx3QkFBdUIseUJBQXlCO0FBQ2hEO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0Esd0JBQXVCLG1CQUFtQjtBQUMxQzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLFVBQVM7O0FBRVQ7QUFDQSxvREFBbUQ7QUFDbkQ7QUFDQTtBQUNBLGNBQWE7O0FBRWI7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBLHdCQUF1QixtQkFBbUI7QUFDMUM7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSxzR0FBcUc7QUFDckcsVUFBUzs7QUFFVDtBQUNBO0FBQ0E7QUFDQSxVQUFTOztBQUVUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTOztBQUVUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFhO0FBQ2I7QUFDQTtBQUNBLGNBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxVQUFTOztBQUVUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQSxVQUFTOztBQUVUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSx3QkFBdUIsa0JBQWtCO0FBQ3pDO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esa0JBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0Esd0JBQXVCLGtCQUFrQjtBQUN6Qzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7O0FBRUw7QUFDQSxFQUFDOztBQUVEO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxVQUFTOztBQUVUO0FBQ0E7QUFDQSxVQUFTOztBQUVUO0FBQ0E7QUFDQSxVQUFTOztBQUVUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTOztBQUVUO0FBQ0E7QUFDQSxVQUFTOztBQUVUO0FBQ0E7QUFDQSxVQUFTOztBQUVUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUzs7QUFFVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7O0FBRVQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7O0FBRVQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxVQUFTOztBQUVUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7O0FBRVQ7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFVBQVM7O0FBRVQ7QUFDQTtBQUNBO0FBQ0EsVUFBUzs7QUFFVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7O0FBRUw7QUFDQSxFQUFDOztBQUVEO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0EsY0FBYTtBQUNiO0FBQ0E7QUFDQSxVQUFTOztBQUVUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYTtBQUNiLFVBQVM7O0FBRVQ7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxjQUFhO0FBQ2I7QUFDQSxjQUFhO0FBQ2I7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYTs7QUFFYjs7QUFFQTtBQUNBLFVBQVM7O0FBRVQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBaUI7QUFDakI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0JBQXFCO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYTs7QUFFYjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsVUFBUzs7QUFFVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7O0FBRVQ7O0FBRUE7QUFDQTtBQUNBLFVBQVM7O0FBRVQ7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxVQUFTOztBQUVUO0FBQ0E7QUFDQSxVQUFTOztBQUVUOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFhO0FBQ2IsVUFBUzs7QUFFVDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxVQUFTOztBQUVUO0FBQ0E7QUFDQSxVQUFTOztBQUVUO0FBQ0E7QUFDQSxVQUFTOztBQUVUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTOztBQUVUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFhO0FBQ2IsVUFBUzs7QUFFVDtBQUNBO0FBQ0EsVUFBUzs7QUFFVDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGNBQWE7QUFDYixVQUFTOztBQUVUO0FBQ0E7QUFDQSxVQUFTOztBQUVUOztBQUVBO0FBQ0E7QUFDQSxVQUFTOztBQUVUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0NBQThDO0FBQzlDO0FBQ0EsVUFBUzs7QUFFVDtBQUNBO0FBQ0E7QUFDQSwrQ0FBOEM7QUFDOUM7QUFDQSxVQUFTOztBQUVUO0FBQ0E7QUFDQSxVQUFTOztBQUVUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUzs7QUFFVDtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWE7QUFDYixVQUFTOztBQUVUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWE7QUFDYixVQUFTOztBQUVUOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw4RUFBNkU7O0FBRTdFO0FBQ0EsVUFBUzs7QUFFVDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7O0FBRVQ7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsVUFBUzs7QUFFVDs7QUFFQTtBQUNBO0FBQ0E7QUFDQSwrQ0FBOEM7QUFDOUM7QUFDQTtBQUNBLFVBQVM7O0FBRVQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYTs7QUFFYjtBQUNBLFVBQVM7O0FBRVQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNCQUFxQjtBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFhOztBQUViOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGtCQUFpQjtBQUNqQjtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTOztBQUVUOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUzs7QUFFVDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNCQUFxQjtBQUNyQjtBQUNBO0FBQ0E7O0FBRUEscURBQW9EO0FBQ3BEO0FBQ0EsVUFBUzs7QUFFVDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0Esa0JBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBLGNBQWE7QUFDYjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsY0FBYTtBQUNiO0FBQ0E7O0FBRUE7QUFDQSxVQUFTOztBQUVUO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0JBQThCO0FBQzlCLHNDQUFxQztBQUNyQzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWlCOztBQUVqQjtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBLGNBQWE7QUFDYjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxjQUFhO0FBQ2I7QUFDQTtBQUNBLGNBQWE7QUFDYjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGNBQWE7QUFDYjtBQUNBLE1BQUs7O0FBRUw7QUFDQSxFQUFDOztBQUVEO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxVQUFTOztBQUVUO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxjQUFhO0FBQ2I7QUFDQTtBQUNBLFVBQVM7O0FBRVQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBCQUF5QjtBQUN6QjtBQUNBLGtCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQSxNQUFLOztBQUVMO0FBQ0EsRUFBQzs7QUFFRDtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxjQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSw0QkFBMkIscUJBQXFCO0FBQ2hEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYTtBQUNiO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQSx5Q0FBd0MsT0FBTztBQUMvQztBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYTtBQUNiOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUzs7QUFFVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUzs7QUFFVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2REFBNEQ7QUFDNUQ7QUFDQSxjQUFhO0FBQ2I7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFhO0FBQ2I7O0FBRUEsNkNBQTRDO0FBQzVDOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWE7O0FBRWI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0EsVUFBUzs7QUFFVDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7O0FBRVQ7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFhOztBQUViOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYTtBQUNiO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLFVBQVM7O0FBRVQ7QUFDQTs7QUFFQTtBQUNBLFVBQVM7O0FBRVQ7QUFDQTs7QUFFQTtBQUNBLFVBQVM7O0FBRVQ7QUFDQTs7QUFFQTtBQUNBLFVBQVM7O0FBRVQ7QUFDQTs7QUFFQTtBQUNBLFVBQVM7O0FBRVQ7QUFDQTs7QUFFQTtBQUNBLFVBQVM7O0FBRVQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYTtBQUNiLFVBQVM7O0FBRVQ7QUFDQTtBQUNBO0FBQ0EsNkJBQTRCO0FBQzVCOztBQUVBLHdCQUF1QixTQUFTO0FBQ2hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7O0FBRVQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWlCO0FBQ2pCO0FBQ0E7QUFDQSxVQUFTOztBQUVUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EseURBQXdEO0FBQ3hEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUVBQWtFO0FBQ2xFO0FBQ0EsMEJBQXlCO0FBQ3pCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLFVBQVM7O0FBRVQ7QUFDQTtBQUNBLFVBQVM7O0FBRVQ7QUFDQTtBQUNBLFVBQVM7O0FBRVQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUzs7QUFFVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsY0FBYTtBQUNiO0FBQ0E7O0FBRUE7QUFDQSxVQUFTOztBQUVUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYTtBQUNiO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFVBQVM7O0FBRVQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7O0FBRVQ7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxVQUFTOztBQUVUO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTOztBQUVUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxjQUFhOztBQUViO0FBQ0EsVUFBUzs7QUFFVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLFVBQVM7O0FBRVQ7QUFDQTtBQUNBLFVBQVM7O0FBRVQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxVQUFTOztBQUVUO0FBQ0E7QUFDQSxVQUFTOztBQUVUO0FBQ0E7QUFDQSxpQ0FBZ0M7QUFDaEM7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDhCQUE2QjtBQUM3QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsMEJBQXlCO0FBQ3pCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLDBCQUF5QjtBQUN6QjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdFQUErRCxTQUFTO0FBQ3hFO0FBQ0E7QUFDQTtBQUNBLGNBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7O0FBRVQ7QUFDQTtBQUNBLFVBQVM7O0FBRVQ7QUFDQTtBQUNBLFVBQVM7O0FBRVQ7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUzs7QUFFVDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUzs7QUFFVDtBQUNBO0FBQ0EsZ0RBQStDLDRDQUE0QztBQUMzRixVQUFTOztBQUVUO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxjQUFhO0FBQ2IsVUFBUzs7QUFFVDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSw2Q0FBNEMsMENBQTBDO0FBQ3RGLGNBQWE7QUFDYixVQUFTOztBQUVUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0JBQXFCO0FBQ3JCO0FBQ0E7QUFDQSxrQkFBaUI7O0FBRWpCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvREFBbUQsMENBQTBDO0FBQzdGO0FBQ0E7QUFDQTtBQUNBLGNBQWE7QUFDYjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFDOztBQUVEO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1QkFBc0I7QUFDdEI7QUFDQTtBQUNBLEVBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxFQUFDOztBQUVEO0FBQ0EsRUFBQzs7Ozs7Ozs7O0FDOWxQRDs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLElBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSx3QkFBdUIsc0JBQXNCO0FBQzdDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0JBQXFCO0FBQ3JCOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSw0QkFBMkI7QUFDM0I7QUFDQTtBQUNBO0FBQ0EsNkJBQTRCLFVBQVU7Ozs7Ozs7O21DQ3RIdEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUc7QUFDSDtBQUNBO0FBQ0EsTUFBSztBQUNMLElBQUc7QUFDSDtBQUNBO0FBQ0EsRUFBQzs7QUFFRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLOztBQUVMO0FBQ0E7QUFDQSxNQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBaUI7QUFDakI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxjQUFhO0FBQ2I7QUFDQTtBQUNBLFVBQVM7QUFDVCxNQUFLOztBQUVMO0FBQ0E7O0FBRUE7O0FBRUEsd0JBQXVCLDhCQUE4QjtBQUNyRDs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFhO0FBQ2I7QUFDQSxNQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBLHlHQUF3Ryx3QkFBd0I7QUFDaEk7QUFDQTtBQUNBO0FBQ0EsTUFBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQSxNQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVCxNQUFLOztBQUVMO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWE7QUFDYixVQUFTO0FBQ1QsTUFBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsTUFBSzs7QUFFTDtBQUNBO0FBQ0EsTUFBSzs7QUFFTDtBQUNBO0FBQ0EsbUNBQWtDLHNCQUFzQjtBQUN4RDtBQUNBLE1BQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0EsTUFBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQSxNQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0JBQXVCLHFCQUFxQjtBQUM1QztBQUNBO0FBQ0E7QUFDQSxNQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdCQUF1Qiw4Q0FBOEM7QUFDckU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLE1BQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLHdCQUF1Qiw2QkFBNkI7QUFDcEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFhO0FBQ2I7QUFDQSxjQUFhO0FBQ2I7QUFDQTtBQUNBOztBQUVBO0FBQ0EsTUFBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsd0JBQXVCLFVBQVU7QUFDakM7QUFDQTtBQUNBO0FBQ0EsTUFBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSzs7QUFFTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0EsTUFBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxvQkFBbUIsV0FBVztBQUM5QjtBQUNBLHdCQUF1QixXQUFXO0FBQ2xDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFhO0FBQ2IsVUFBUztBQUNULE1BQUs7O0FBRUw7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0EsTUFBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxvQkFBbUIsVUFBVTtBQUM3QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0EsTUFBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQSxNQUFLOztBQUVMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxNQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0EsY0FBYTs7QUFFYjtBQUNBOztBQUVBO0FBQ0E7QUFDQSxFQUFDOztBQUVEO0FBQ0EsRUFBQyIsImZpbGUiOiJtZWRpdW0uanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0ZXhwb3J0czoge30sXG4gXHRcdFx0aWQ6IG1vZHVsZUlkLFxuIFx0XHRcdGxvYWRlZDogZmFsc2VcbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHdlYnBhY2svYm9vdHN0cmFwIGM2MDhmMzhlODIyZDMzZGUzZWZlXG4gKiovIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19leHRlbmRzID0gKHRoaXMgJiYgdGhpcy5fX2V4dGVuZHMpIHx8IGZ1bmN0aW9uIChkLCBiKSB7XG4gICAgZm9yICh2YXIgcCBpbiBiKSBpZiAoYi5oYXNPd25Qcm9wZXJ0eShwKSkgZFtwXSA9IGJbcF07XG4gICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XG4gICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xufTtcbnZhciBQbHVnaW5zXzEgPSByZXF1aXJlKFwiLi4vQWJzdHJhY3QvUGx1Z2luc1wiKTtcbnZhciBIZWxwZXJzXzEgPSByZXF1aXJlKFwiLi4vSGVscGVyc1wiKTtcbndpbmRvd1snZHJlYW1zYXJrJ10uZXhwb3Nlcyh7XG4gICAgTWVkaXVtRWRpdG9yOiByZXF1aXJlKFwibWVkaXVtLWVkaXRvclwiKVxufSk7XG52YXIgTWVkaXVtRWRpdG9yVGFibGVzID0gcmVxdWlyZShcIm1lZGl1bS1lZGl0b3ItdGFibGVzXCIpO1xudmFyIE1lZGl1bSA9IChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgX19leHRlbmRzKE1lZGl1bSwgX3N1cGVyKTtcbiAgICBmdW5jdGlvbiBNZWRpdW0oYXBwLCBlbGVtZW50LCBvcHRpb25zKSB7XG4gICAgICAgIF9zdXBlci5jYWxsKHRoaXMpO1xuICAgICAgICB0aGlzLmRlZmF1bHRzID0ge1xuICAgICAgICAgICAgZGlzYWJsZUV4dHJhU3BhY2VzOiB0cnVlLFxuICAgICAgICAgICAgYnV0dG9uTGFiZWxzOiAnZm9udGF3ZXNvbWUnLFxuICAgICAgICAgICAgdG9vbGJhcjoge1xuICAgICAgICAgICAgICAgIGJ1dHRvbnM6IFtcbiAgICAgICAgICAgICAgICAgICAgJ2JvbGQnLCAnaXRhbGljJywgJ3VuZGVybGluZScsICdhbmNob3InLCAnaDInLCAnaDMnLCAncXVvdGUnLCAndGFibGUnXG4gICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGV4dGVuc2lvbnM6IHtcbiAgICAgICAgICAgICAgICB0YWJsZTogbmV3IE1lZGl1bUVkaXRvclRhYmxlcygpXG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuaW5zdGFuY2UgPSBuZXcgTWVkaXVtRWRpdG9yKGVsZW1lbnQsIEhlbHBlcnNfMS5leHRlbmQodGhpcy5kZWZhdWx0cywgb3B0aW9ucykpO1xuICAgIH1cbiAgICByZXR1cm4gTWVkaXVtO1xufShQbHVnaW5zXzEuUGx1Z2lucykpO1xuZXhwb3J0cy5NZWRpdW0gPSBNZWRpdW07XG4vKipcbiAqIEF1dG8gaW5zdGFsbCBpdHNlbGZcbiAqL1xud2luZG93WydkcmVhbXNhcmsnXS5pbnN0YWxsKHtcbiAgICBNZWRpdW06IE1lZGl1bVxufSk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1NZWRpdW0uanMubWFwXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3Jlc291cmNlcy9hc3NldHMvdHlwZXNjcmlwdC9QbHVnaW5zL01lZGl1bS5qc1xuICoqIG1vZHVsZSBpZCA9IDBcbiAqKiBtb2R1bGUgY2h1bmtzID0gMlxuICoqLyIsIlwidXNlIHN0cmljdFwiO1xudmFyIFBsdWdpbnMgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIFBsdWdpbnMoKSB7XG4gICAgICAgIHRoaXMuZXhwb3NlcyA9IHt9O1xuICAgIH1cbiAgICBQbHVnaW5zLnByb3RvdHlwZS5pbnN0YWxsID0gZnVuY3Rpb24gKCkge1xuICAgIH07XG4gICAgcmV0dXJuIFBsdWdpbnM7XG59KCkpO1xuZXhwb3J0cy5QbHVnaW5zID0gUGx1Z2lucztcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPVBsdWdpbnMuanMubWFwXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3Jlc291cmNlcy9hc3NldHMvdHlwZXNjcmlwdC9BYnN0cmFjdC9QbHVnaW5zLmpzXG4gKiogbW9kdWxlIGlkID0gMVxuICoqIG1vZHVsZSBjaHVua3MgPSAwIDEgMiAzXG4gKiovIiwiXCJ1c2Ugc3RyaWN0XCI7XG4vKipcbiAqIEZvciBMb29wXG4gKi9cbmV4cG9ydHMuZm9yRWFjaCA9IGZ1bmN0aW9uIChhcnJheSwgY2FsbGJhY2ssIHNjb3BlKSB7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcnJheS5sZW5ndGg7IGkrKylcbiAgICAgICAgY2FsbGJhY2suY2FsbChzY29wZSwgaSwgYXJyYXlbaV0pO1xufTtcbi8qKlxuICogUG9wIGFycmF5IGJ5IGtleSBuYW1lXG4gKlxuICogQHBhcmFtIGRhdGFcbiAqIEBwYXJhbSBrZXlcbiAqIEByZXR1cm5zIGFueVtdXG4gKi9cbmV4cG9ydHMucG9wQnlLZXkgPSBmdW5jdGlvbiAoZGF0YSwga2V5LCBkZWZhdWx0cykge1xuICAgIGlmICghZGF0YS5oYXNPd25Qcm9wZXJ0eShrZXkpKVxuICAgICAgICByZXR1cm4gZGVmYXVsdHM7XG4gICAgdmFyIHZhbHVlID0gZGF0YVtrZXldO1xuICAgIGRlbGV0ZSBkYXRhW2tleV07XG4gICAgcmV0dXJuIHZhbHVlO1xufTtcbi8qKlxuICogRXh0ZW5kIE9iamVjdFxuICpcbiAqIEBwYXJhbSBkZWZhdWx0c1xuICogQHBhcmFtIG9iamVjdFxuICogQHJldHVybnMge2FueX1cbiAqL1xuZXhwb3J0cy5leHRlbmQgPSBmdW5jdGlvbiAoZGVmYXVsdHMsIG9iamVjdCkge1xuICAgIGZvciAodmFyIGkgaW4gb2JqZWN0KSB7XG4gICAgICAgIGlmIChvYmplY3QuaGFzT3duUHJvcGVydHkoaSkpIHtcbiAgICAgICAgICAgIGRlZmF1bHRzW2ldID0gb2JqZWN0W2ldO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBkZWZhdWx0cztcbn07XG4vKipcbiAqIENvbnZlcnQgU3RyaW5nIHRvIENhbWVsQ2FzZVxuICpcbiAqIEBwYXJhbSBzdHJcbiAqIEByZXR1cm5zIHtzdHJpbmd9XG4gKi9cbmV4cG9ydHMudG9DYW1lbENhc2UgPSBmdW5jdGlvbiAoc3RyKSB7XG4gICAgcmV0dXJuIHN0ci5yZXBsYWNlKC9eKFtBLVpdKXxbXFxzLV9dKFxcdykvZywgZnVuY3Rpb24gKG1hdGNoLCBwMSwgcDIsIG9mZnNldCkge1xuICAgICAgICBpZiAocDIpXG4gICAgICAgICAgICByZXR1cm4gcDIudG9VcHBlckNhc2UoKTtcbiAgICAgICAgcmV0dXJuIHAxLnRvTG93ZXJDYXNlKCk7XG4gICAgfSk7XG59O1xuZXhwb3J0cy5jYXB0YWxpemUgPSBmdW5jdGlvbiAoc3RyKSB7XG4gICAgcmV0dXJuIHN0ci5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArIHN0ci5zbGljZSgxKTtcbn07XG4vKipcbiAqIEZpcmVmb3ggaGF2ZSBhbiBpc3N1ZSB0byBzdWJtaXQgZm9ybSBpZiBpdHMgbm90IGFwcGVuZGVkIHRvIHRoZSBib2R5XG4gKiBAcGFyYW0gZm9ybVxuICovXG5leHBvcnRzLnN1Ym1pdEZvcm0gPSBmdW5jdGlvbiAoZm9ybSkge1xuICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoZm9ybSk7XG4gICAgZm9ybS5zdWJtaXQoKTtcbn07XG4vKipcbiAqIFJlcXVpcmUgYSB3aG9sZSBGb2xkZXJcbiAqXG4gKiBAcGFyYW0gcmVxdWlyZUNvbnRleHRcbiAqIEByZXR1cm5zIHtVW119XG4gKi9cbmV4cG9ydHMucmVxdWlyZUFsbCA9IGZ1bmN0aW9uIChyZXF1aXJlQ29udGV4dCkge1xuICAgIHJldHVybiByZXF1aXJlQ29udGV4dC5rZXlzKCkubWFwKHJlcXVpcmVDb250ZXh0KTtcbn07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1IZWxwZXJzLmpzLm1hcFxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9yZXNvdXJjZXMvYXNzZXRzL3R5cGVzY3JpcHQvSGVscGVycy5qc1xuICoqIG1vZHVsZSBpZCA9IDJcbiAqKiBtb2R1bGUgY2h1bmtzID0gMCAyXG4gKiovIiwiLypnbG9iYWwgc2VsZiwgZG9jdW1lbnQsIERPTUV4Y2VwdGlvbiAqL1xuXG4vKiEgQHNvdXJjZSBodHRwOi8vcHVybC5lbGlncmV5LmNvbS9naXRodWIvY2xhc3NMaXN0LmpzL2Jsb2IvbWFzdGVyL2NsYXNzTGlzdC5qcyAqL1xuXG4vLyBGdWxsIHBvbHlmaWxsIGZvciBicm93c2VycyB3aXRoIG5vIGNsYXNzTGlzdCBzdXBwb3J0XG5pZiAoIShcImNsYXNzTGlzdFwiIGluIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJfXCIpKSkge1xuICAoZnVuY3Rpb24gKHZpZXcpIHtcblxuICBcInVzZSBzdHJpY3RcIjtcblxuICBpZiAoISgnRWxlbWVudCcgaW4gdmlldykpIHJldHVybjtcblxuICB2YXJcbiAgICAgIGNsYXNzTGlzdFByb3AgPSBcImNsYXNzTGlzdFwiXG4gICAgLCBwcm90b1Byb3AgPSBcInByb3RvdHlwZVwiXG4gICAgLCBlbGVtQ3RyUHJvdG8gPSB2aWV3LkVsZW1lbnRbcHJvdG9Qcm9wXVxuICAgICwgb2JqQ3RyID0gT2JqZWN0XG4gICAgLCBzdHJUcmltID0gU3RyaW5nW3Byb3RvUHJvcF0udHJpbSB8fCBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gdGhpcy5yZXBsYWNlKC9eXFxzK3xcXHMrJC9nLCBcIlwiKTtcbiAgICB9XG4gICAgLCBhcnJJbmRleE9mID0gQXJyYXlbcHJvdG9Qcm9wXS5pbmRleE9mIHx8IGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICB2YXJcbiAgICAgICAgICBpID0gMFxuICAgICAgICAsIGxlbiA9IHRoaXMubGVuZ3RoXG4gICAgICA7XG4gICAgICBmb3IgKDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgIGlmIChpIGluIHRoaXMgJiYgdGhpc1tpXSA9PT0gaXRlbSkge1xuICAgICAgICAgIHJldHVybiBpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gLTE7XG4gICAgfVxuICAgIC8vIFZlbmRvcnM6IHBsZWFzZSBhbGxvdyBjb250ZW50IGNvZGUgdG8gaW5zdGFudGlhdGUgRE9NRXhjZXB0aW9uc1xuICAgICwgRE9NRXggPSBmdW5jdGlvbiAodHlwZSwgbWVzc2FnZSkge1xuICAgICAgdGhpcy5uYW1lID0gdHlwZTtcbiAgICAgIHRoaXMuY29kZSA9IERPTUV4Y2VwdGlvblt0eXBlXTtcbiAgICAgIHRoaXMubWVzc2FnZSA9IG1lc3NhZ2U7XG4gICAgfVxuICAgICwgY2hlY2tUb2tlbkFuZEdldEluZGV4ID0gZnVuY3Rpb24gKGNsYXNzTGlzdCwgdG9rZW4pIHtcbiAgICAgIGlmICh0b2tlbiA9PT0gXCJcIikge1xuICAgICAgICB0aHJvdyBuZXcgRE9NRXgoXG4gICAgICAgICAgICBcIlNZTlRBWF9FUlJcIlxuICAgICAgICAgICwgXCJBbiBpbnZhbGlkIG9yIGlsbGVnYWwgc3RyaW5nIHdhcyBzcGVjaWZpZWRcIlxuICAgICAgICApO1xuICAgICAgfVxuICAgICAgaWYgKC9cXHMvLnRlc3QodG9rZW4pKSB7XG4gICAgICAgIHRocm93IG5ldyBET01FeChcbiAgICAgICAgICAgIFwiSU5WQUxJRF9DSEFSQUNURVJfRVJSXCJcbiAgICAgICAgICAsIFwiU3RyaW5nIGNvbnRhaW5zIGFuIGludmFsaWQgY2hhcmFjdGVyXCJcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBhcnJJbmRleE9mLmNhbGwoY2xhc3NMaXN0LCB0b2tlbik7XG4gICAgfVxuICAgICwgQ2xhc3NMaXN0ID0gZnVuY3Rpb24gKGVsZW0pIHtcbiAgICAgIHZhclxuICAgICAgICAgIHRyaW1tZWRDbGFzc2VzID0gc3RyVHJpbS5jYWxsKGVsZW0uZ2V0QXR0cmlidXRlKFwiY2xhc3NcIikgfHwgXCJcIilcbiAgICAgICAgLCBjbGFzc2VzID0gdHJpbW1lZENsYXNzZXMgPyB0cmltbWVkQ2xhc3Nlcy5zcGxpdCgvXFxzKy8pIDogW11cbiAgICAgICAgLCBpID0gMFxuICAgICAgICAsIGxlbiA9IGNsYXNzZXMubGVuZ3RoXG4gICAgICA7XG4gICAgICBmb3IgKDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgIHRoaXMucHVzaChjbGFzc2VzW2ldKTtcbiAgICAgIH1cbiAgICAgIHRoaXMuX3VwZGF0ZUNsYXNzTmFtZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgZWxlbS5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCB0aGlzLnRvU3RyaW5nKCkpO1xuICAgICAgfTtcbiAgICB9XG4gICAgLCBjbGFzc0xpc3RQcm90byA9IENsYXNzTGlzdFtwcm90b1Byb3BdID0gW11cbiAgICAsIGNsYXNzTGlzdEdldHRlciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiBuZXcgQ2xhc3NMaXN0KHRoaXMpO1xuICAgIH1cbiAgO1xuICAvLyBNb3N0IERPTUV4Y2VwdGlvbiBpbXBsZW1lbnRhdGlvbnMgZG9uJ3QgYWxsb3cgY2FsbGluZyBET01FeGNlcHRpb24ncyB0b1N0cmluZygpXG4gIC8vIG9uIG5vbi1ET01FeGNlcHRpb25zLiBFcnJvcidzIHRvU3RyaW5nKCkgaXMgc3VmZmljaWVudCBoZXJlLlxuICBET01FeFtwcm90b1Byb3BdID0gRXJyb3JbcHJvdG9Qcm9wXTtcbiAgY2xhc3NMaXN0UHJvdG8uaXRlbSA9IGZ1bmN0aW9uIChpKSB7XG4gICAgcmV0dXJuIHRoaXNbaV0gfHwgbnVsbDtcbiAgfTtcbiAgY2xhc3NMaXN0UHJvdG8uY29udGFpbnMgPSBmdW5jdGlvbiAodG9rZW4pIHtcbiAgICB0b2tlbiArPSBcIlwiO1xuICAgIHJldHVybiBjaGVja1Rva2VuQW5kR2V0SW5kZXgodGhpcywgdG9rZW4pICE9PSAtMTtcbiAgfTtcbiAgY2xhc3NMaXN0UHJvdG8uYWRkID0gZnVuY3Rpb24gKCkge1xuICAgIHZhclxuICAgICAgICB0b2tlbnMgPSBhcmd1bWVudHNcbiAgICAgICwgaSA9IDBcbiAgICAgICwgbCA9IHRva2Vucy5sZW5ndGhcbiAgICAgICwgdG9rZW5cbiAgICAgICwgdXBkYXRlZCA9IGZhbHNlXG4gICAgO1xuICAgIGRvIHtcbiAgICAgIHRva2VuID0gdG9rZW5zW2ldICsgXCJcIjtcbiAgICAgIGlmIChjaGVja1Rva2VuQW5kR2V0SW5kZXgodGhpcywgdG9rZW4pID09PSAtMSkge1xuICAgICAgICB0aGlzLnB1c2godG9rZW4pO1xuICAgICAgICB1cGRhdGVkID0gdHJ1ZTtcbiAgICAgIH1cbiAgICB9XG4gICAgd2hpbGUgKCsraSA8IGwpO1xuXG4gICAgaWYgKHVwZGF0ZWQpIHtcbiAgICAgIHRoaXMuX3VwZGF0ZUNsYXNzTmFtZSgpO1xuICAgIH1cbiAgfTtcbiAgY2xhc3NMaXN0UHJvdG8ucmVtb3ZlID0gZnVuY3Rpb24gKCkge1xuICAgIHZhclxuICAgICAgICB0b2tlbnMgPSBhcmd1bWVudHNcbiAgICAgICwgaSA9IDBcbiAgICAgICwgbCA9IHRva2Vucy5sZW5ndGhcbiAgICAgICwgdG9rZW5cbiAgICAgICwgdXBkYXRlZCA9IGZhbHNlXG4gICAgICAsIGluZGV4XG4gICAgO1xuICAgIGRvIHtcbiAgICAgIHRva2VuID0gdG9rZW5zW2ldICsgXCJcIjtcbiAgICAgIGluZGV4ID0gY2hlY2tUb2tlbkFuZEdldEluZGV4KHRoaXMsIHRva2VuKTtcbiAgICAgIHdoaWxlIChpbmRleCAhPT0gLTEpIHtcbiAgICAgICAgdGhpcy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgICB1cGRhdGVkID0gdHJ1ZTtcbiAgICAgICAgaW5kZXggPSBjaGVja1Rva2VuQW5kR2V0SW5kZXgodGhpcywgdG9rZW4pO1xuICAgICAgfVxuICAgIH1cbiAgICB3aGlsZSAoKytpIDwgbCk7XG5cbiAgICBpZiAodXBkYXRlZCkge1xuICAgICAgdGhpcy5fdXBkYXRlQ2xhc3NOYW1lKCk7XG4gICAgfVxuICB9O1xuICBjbGFzc0xpc3RQcm90by50b2dnbGUgPSBmdW5jdGlvbiAodG9rZW4sIGZvcmNlKSB7XG4gICAgdG9rZW4gKz0gXCJcIjtcblxuICAgIHZhclxuICAgICAgICByZXN1bHQgPSB0aGlzLmNvbnRhaW5zKHRva2VuKVxuICAgICAgLCBtZXRob2QgPSByZXN1bHQgP1xuICAgICAgICBmb3JjZSAhPT0gdHJ1ZSAmJiBcInJlbW92ZVwiXG4gICAgICA6XG4gICAgICAgIGZvcmNlICE9PSBmYWxzZSAmJiBcImFkZFwiXG4gICAgO1xuXG4gICAgaWYgKG1ldGhvZCkge1xuICAgICAgdGhpc1ttZXRob2RdKHRva2VuKTtcbiAgICB9XG5cbiAgICBpZiAoZm9yY2UgPT09IHRydWUgfHwgZm9yY2UgPT09IGZhbHNlKSB7XG4gICAgICByZXR1cm4gZm9yY2U7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiAhcmVzdWx0O1xuICAgIH1cbiAgfTtcbiAgY2xhc3NMaXN0UHJvdG8udG9TdHJpbmcgPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXMuam9pbihcIiBcIik7XG4gIH07XG5cbiAgaWYgKG9iakN0ci5kZWZpbmVQcm9wZXJ0eSkge1xuICAgIHZhciBjbGFzc0xpc3RQcm9wRGVzYyA9IHtcbiAgICAgICAgZ2V0OiBjbGFzc0xpc3RHZXR0ZXJcbiAgICAgICwgZW51bWVyYWJsZTogdHJ1ZVxuICAgICAgLCBjb25maWd1cmFibGU6IHRydWVcbiAgICB9O1xuICAgIHRyeSB7XG4gICAgICBvYmpDdHIuZGVmaW5lUHJvcGVydHkoZWxlbUN0clByb3RvLCBjbGFzc0xpc3RQcm9wLCBjbGFzc0xpc3RQcm9wRGVzYyk7XG4gICAgfSBjYXRjaCAoZXgpIHsgLy8gSUUgOCBkb2Vzbid0IHN1cHBvcnQgZW51bWVyYWJsZTp0cnVlXG4gICAgICBpZiAoZXgubnVtYmVyID09PSAtMHg3RkY1RUM1NCkge1xuICAgICAgICBjbGFzc0xpc3RQcm9wRGVzYy5lbnVtZXJhYmxlID0gZmFsc2U7XG4gICAgICAgIG9iakN0ci5kZWZpbmVQcm9wZXJ0eShlbGVtQ3RyUHJvdG8sIGNsYXNzTGlzdFByb3AsIGNsYXNzTGlzdFByb3BEZXNjKTtcbiAgICAgIH1cbiAgICB9XG4gIH0gZWxzZSBpZiAob2JqQ3RyW3Byb3RvUHJvcF0uX19kZWZpbmVHZXR0ZXJfXykge1xuICAgIGVsZW1DdHJQcm90by5fX2RlZmluZUdldHRlcl9fKGNsYXNzTGlzdFByb3AsIGNsYXNzTGlzdEdldHRlcik7XG4gIH1cblxuICB9KHNlbGYpKTtcbn1cblxuLyogQmxvYi5qc1xuICogQSBCbG9iIGltcGxlbWVudGF0aW9uLlxuICogMjAxNC0wNy0yNFxuICpcbiAqIEJ5IEVsaSBHcmV5LCBodHRwOi8vZWxpZ3JleS5jb21cbiAqIEJ5IERldmluIFNhbWFyaW4sIGh0dHBzOi8vZ2l0aHViLmNvbS9kc2FtYXJpblxuICogTGljZW5zZTogWDExL01JVFxuICogICBTZWUgaHR0cHM6Ly9naXRodWIuY29tL2VsaWdyZXkvQmxvYi5qcy9ibG9iL21hc3Rlci9MSUNFTlNFLm1kXG4gKi9cblxuLypnbG9iYWwgc2VsZiwgdW5lc2NhcGUgKi9cbi8qanNsaW50IGJpdHdpc2U6IHRydWUsIHJlZ2V4cDogdHJ1ZSwgY29uZnVzaW9uOiB0cnVlLCBlczU6IHRydWUsIHZhcnM6IHRydWUsIHdoaXRlOiB0cnVlLFxuICBwbHVzcGx1czogdHJ1ZSAqL1xuXG4vKiEgQHNvdXJjZSBodHRwOi8vcHVybC5lbGlncmV5LmNvbS9naXRodWIvQmxvYi5qcy9ibG9iL21hc3Rlci9CbG9iLmpzICovXG5cbihmdW5jdGlvbiAodmlldykge1xuICBcInVzZSBzdHJpY3RcIjtcblxuICB2aWV3LlVSTCA9IHZpZXcuVVJMIHx8IHZpZXcud2Via2l0VVJMO1xuXG4gIGlmICh2aWV3LkJsb2IgJiYgdmlldy5VUkwpIHtcbiAgICB0cnkge1xuICAgICAgbmV3IEJsb2I7XG4gICAgICByZXR1cm47XG4gICAgfSBjYXRjaCAoZSkge31cbiAgfVxuXG4gIC8vIEludGVybmFsbHkgd2UgdXNlIGEgQmxvYkJ1aWxkZXIgaW1wbGVtZW50YXRpb24gdG8gYmFzZSBCbG9iIG9mZiBvZlxuICAvLyBpbiBvcmRlciB0byBzdXBwb3J0IG9sZGVyIGJyb3dzZXJzIHRoYXQgb25seSBoYXZlIEJsb2JCdWlsZGVyXG4gIHZhciBCbG9iQnVpbGRlciA9IHZpZXcuQmxvYkJ1aWxkZXIgfHwgdmlldy5XZWJLaXRCbG9iQnVpbGRlciB8fCB2aWV3Lk1vekJsb2JCdWlsZGVyIHx8IChmdW5jdGlvbih2aWV3KSB7XG4gICAgdmFyXG4gICAgICAgIGdldF9jbGFzcyA9IGZ1bmN0aW9uKG9iamVjdCkge1xuICAgICAgICByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG9iamVjdCkubWF0Y2goL15cXFtvYmplY3RcXHMoLiopXFxdJC8pWzFdO1xuICAgICAgfVxuICAgICAgLCBGYWtlQmxvYkJ1aWxkZXIgPSBmdW5jdGlvbiBCbG9iQnVpbGRlcigpIHtcbiAgICAgICAgdGhpcy5kYXRhID0gW107XG4gICAgICB9XG4gICAgICAsIEZha2VCbG9iID0gZnVuY3Rpb24gQmxvYihkYXRhLCB0eXBlLCBlbmNvZGluZykge1xuICAgICAgICB0aGlzLmRhdGEgPSBkYXRhO1xuICAgICAgICB0aGlzLnNpemUgPSBkYXRhLmxlbmd0aDtcbiAgICAgICAgdGhpcy50eXBlID0gdHlwZTtcbiAgICAgICAgdGhpcy5lbmNvZGluZyA9IGVuY29kaW5nO1xuICAgICAgfVxuICAgICAgLCBGQkJfcHJvdG8gPSBGYWtlQmxvYkJ1aWxkZXIucHJvdG90eXBlXG4gICAgICAsIEZCX3Byb3RvID0gRmFrZUJsb2IucHJvdG90eXBlXG4gICAgICAsIEZpbGVSZWFkZXJTeW5jID0gdmlldy5GaWxlUmVhZGVyU3luY1xuICAgICAgLCBGaWxlRXhjZXB0aW9uID0gZnVuY3Rpb24odHlwZSkge1xuICAgICAgICB0aGlzLmNvZGUgPSB0aGlzW3RoaXMubmFtZSA9IHR5cGVdO1xuICAgICAgfVxuICAgICAgLCBmaWxlX2V4X2NvZGVzID0gKFxuICAgICAgICAgIFwiTk9UX0ZPVU5EX0VSUiBTRUNVUklUWV9FUlIgQUJPUlRfRVJSIE5PVF9SRUFEQUJMRV9FUlIgRU5DT0RJTkdfRVJSIFwiXG4gICAgICAgICsgXCJOT19NT0RJRklDQVRJT05fQUxMT1dFRF9FUlIgSU5WQUxJRF9TVEFURV9FUlIgU1lOVEFYX0VSUlwiXG4gICAgICApLnNwbGl0KFwiIFwiKVxuICAgICAgLCBmaWxlX2V4X2NvZGUgPSBmaWxlX2V4X2NvZGVzLmxlbmd0aFxuICAgICAgLCByZWFsX1VSTCA9IHZpZXcuVVJMIHx8IHZpZXcud2Via2l0VVJMIHx8IHZpZXdcbiAgICAgICwgcmVhbF9jcmVhdGVfb2JqZWN0X1VSTCA9IHJlYWxfVVJMLmNyZWF0ZU9iamVjdFVSTFxuICAgICAgLCByZWFsX3Jldm9rZV9vYmplY3RfVVJMID0gcmVhbF9VUkwucmV2b2tlT2JqZWN0VVJMXG4gICAgICAsIFVSTCA9IHJlYWxfVVJMXG4gICAgICAsIGJ0b2EgPSB2aWV3LmJ0b2FcbiAgICAgICwgYXRvYiA9IHZpZXcuYXRvYlxuXG4gICAgICAsIEFycmF5QnVmZmVyID0gdmlldy5BcnJheUJ1ZmZlclxuICAgICAgLCBVaW50OEFycmF5ID0gdmlldy5VaW50OEFycmF5XG5cbiAgICAgICwgb3JpZ2luID0gL15bXFx3LV0rOlxcLypcXFs/W1xcd1xcLjotXStcXF0/KD86OlswLTldKyk/L1xuICAgIDtcbiAgICBGYWtlQmxvYi5mYWtlID0gRkJfcHJvdG8uZmFrZSA9IHRydWU7XG4gICAgd2hpbGUgKGZpbGVfZXhfY29kZS0tKSB7XG4gICAgICBGaWxlRXhjZXB0aW9uLnByb3RvdHlwZVtmaWxlX2V4X2NvZGVzW2ZpbGVfZXhfY29kZV1dID0gZmlsZV9leF9jb2RlICsgMTtcbiAgICB9XG4gICAgLy8gUG9seWZpbGwgVVJMXG4gICAgaWYgKCFyZWFsX1VSTC5jcmVhdGVPYmplY3RVUkwpIHtcbiAgICAgIFVSTCA9IHZpZXcuVVJMID0gZnVuY3Rpb24odXJpKSB7XG4gICAgICAgIHZhclxuICAgICAgICAgICAgdXJpX2luZm8gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMoXCJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hodG1sXCIsIFwiYVwiKVxuICAgICAgICAgICwgdXJpX29yaWdpblxuICAgICAgICA7XG4gICAgICAgIHVyaV9pbmZvLmhyZWYgPSB1cmk7XG4gICAgICAgIGlmICghKFwib3JpZ2luXCIgaW4gdXJpX2luZm8pKSB7XG4gICAgICAgICAgaWYgKHVyaV9pbmZvLnByb3RvY29sLnRvTG93ZXJDYXNlKCkgPT09IFwiZGF0YTpcIikge1xuICAgICAgICAgICAgdXJpX2luZm8ub3JpZ2luID0gbnVsbDtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdXJpX29yaWdpbiA9IHVyaS5tYXRjaChvcmlnaW4pO1xuICAgICAgICAgICAgdXJpX2luZm8ub3JpZ2luID0gdXJpX29yaWdpbiAmJiB1cmlfb3JpZ2luWzFdO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdXJpX2luZm87XG4gICAgICB9O1xuICAgIH1cbiAgICBVUkwuY3JlYXRlT2JqZWN0VVJMID0gZnVuY3Rpb24oYmxvYikge1xuICAgICAgdmFyXG4gICAgICAgICAgdHlwZSA9IGJsb2IudHlwZVxuICAgICAgICAsIGRhdGFfVVJJX2hlYWRlclxuICAgICAgO1xuICAgICAgaWYgKHR5cGUgPT09IG51bGwpIHtcbiAgICAgICAgdHlwZSA9IFwiYXBwbGljYXRpb24vb2N0ZXQtc3RyZWFtXCI7XG4gICAgICB9XG4gICAgICBpZiAoYmxvYiBpbnN0YW5jZW9mIEZha2VCbG9iKSB7XG4gICAgICAgIGRhdGFfVVJJX2hlYWRlciA9IFwiZGF0YTpcIiArIHR5cGU7XG4gICAgICAgIGlmIChibG9iLmVuY29kaW5nID09PSBcImJhc2U2NFwiKSB7XG4gICAgICAgICAgcmV0dXJuIGRhdGFfVVJJX2hlYWRlciArIFwiO2Jhc2U2NCxcIiArIGJsb2IuZGF0YTtcbiAgICAgICAgfSBlbHNlIGlmIChibG9iLmVuY29kaW5nID09PSBcIlVSSVwiKSB7XG4gICAgICAgICAgcmV0dXJuIGRhdGFfVVJJX2hlYWRlciArIFwiLFwiICsgZGVjb2RlVVJJQ29tcG9uZW50KGJsb2IuZGF0YSk7XG4gICAgICAgIH0gaWYgKGJ0b2EpIHtcbiAgICAgICAgICByZXR1cm4gZGF0YV9VUklfaGVhZGVyICsgXCI7YmFzZTY0LFwiICsgYnRvYShibG9iLmRhdGEpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiBkYXRhX1VSSV9oZWFkZXIgKyBcIixcIiArIGVuY29kZVVSSUNvbXBvbmVudChibG9iLmRhdGEpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKHJlYWxfY3JlYXRlX29iamVjdF9VUkwpIHtcbiAgICAgICAgcmV0dXJuIHJlYWxfY3JlYXRlX29iamVjdF9VUkwuY2FsbChyZWFsX1VSTCwgYmxvYik7XG4gICAgICB9XG4gICAgfTtcbiAgICBVUkwucmV2b2tlT2JqZWN0VVJMID0gZnVuY3Rpb24ob2JqZWN0X1VSTCkge1xuICAgICAgaWYgKG9iamVjdF9VUkwuc3Vic3RyaW5nKDAsIDUpICE9PSBcImRhdGE6XCIgJiYgcmVhbF9yZXZva2Vfb2JqZWN0X1VSTCkge1xuICAgICAgICByZWFsX3Jldm9rZV9vYmplY3RfVVJMLmNhbGwocmVhbF9VUkwsIG9iamVjdF9VUkwpO1xuICAgICAgfVxuICAgIH07XG4gICAgRkJCX3Byb3RvLmFwcGVuZCA9IGZ1bmN0aW9uKGRhdGEvKiwgZW5kaW5ncyovKSB7XG4gICAgICB2YXIgYmIgPSB0aGlzLmRhdGE7XG4gICAgICAvLyBkZWNvZGUgZGF0YSB0byBhIGJpbmFyeSBzdHJpbmdcbiAgICAgIGlmIChVaW50OEFycmF5ICYmIChkYXRhIGluc3RhbmNlb2YgQXJyYXlCdWZmZXIgfHwgZGF0YSBpbnN0YW5jZW9mIFVpbnQ4QXJyYXkpKSB7XG4gICAgICAgIHZhclxuICAgICAgICAgICAgc3RyID0gXCJcIlxuICAgICAgICAgICwgYnVmID0gbmV3IFVpbnQ4QXJyYXkoZGF0YSlcbiAgICAgICAgICAsIGkgPSAwXG4gICAgICAgICAgLCBidWZfbGVuID0gYnVmLmxlbmd0aFxuICAgICAgICA7XG4gICAgICAgIGZvciAoOyBpIDwgYnVmX2xlbjsgaSsrKSB7XG4gICAgICAgICAgc3RyICs9IFN0cmluZy5mcm9tQ2hhckNvZGUoYnVmW2ldKTtcbiAgICAgICAgfVxuICAgICAgICBiYi5wdXNoKHN0cik7XG4gICAgICB9IGVsc2UgaWYgKGdldF9jbGFzcyhkYXRhKSA9PT0gXCJCbG9iXCIgfHwgZ2V0X2NsYXNzKGRhdGEpID09PSBcIkZpbGVcIikge1xuICAgICAgICBpZiAoRmlsZVJlYWRlclN5bmMpIHtcbiAgICAgICAgICB2YXIgZnIgPSBuZXcgRmlsZVJlYWRlclN5bmM7XG4gICAgICAgICAgYmIucHVzaChmci5yZWFkQXNCaW5hcnlTdHJpbmcoZGF0YSkpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIC8vIGFzeW5jIEZpbGVSZWFkZXIgd29uJ3Qgd29yayBhcyBCbG9iQnVpbGRlciBpcyBzeW5jXG4gICAgICAgICAgdGhyb3cgbmV3IEZpbGVFeGNlcHRpb24oXCJOT1RfUkVBREFCTEVfRVJSXCIpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKGRhdGEgaW5zdGFuY2VvZiBGYWtlQmxvYikge1xuICAgICAgICBpZiAoZGF0YS5lbmNvZGluZyA9PT0gXCJiYXNlNjRcIiAmJiBhdG9iKSB7XG4gICAgICAgICAgYmIucHVzaChhdG9iKGRhdGEuZGF0YSkpO1xuICAgICAgICB9IGVsc2UgaWYgKGRhdGEuZW5jb2RpbmcgPT09IFwiVVJJXCIpIHtcbiAgICAgICAgICBiYi5wdXNoKGRlY29kZVVSSUNvbXBvbmVudChkYXRhLmRhdGEpKTtcbiAgICAgICAgfSBlbHNlIGlmIChkYXRhLmVuY29kaW5nID09PSBcInJhd1wiKSB7XG4gICAgICAgICAgYmIucHVzaChkYXRhLmRhdGEpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAodHlwZW9mIGRhdGEgIT09IFwic3RyaW5nXCIpIHtcbiAgICAgICAgICBkYXRhICs9IFwiXCI7IC8vIGNvbnZlcnQgdW5zdXBwb3J0ZWQgdHlwZXMgdG8gc3RyaW5nc1xuICAgICAgICB9XG4gICAgICAgIC8vIGRlY29kZSBVVEYtMTYgdG8gYmluYXJ5IHN0cmluZ1xuICAgICAgICBiYi5wdXNoKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChkYXRhKSkpO1xuICAgICAgfVxuICAgIH07XG4gICAgRkJCX3Byb3RvLmdldEJsb2IgPSBmdW5jdGlvbih0eXBlKSB7XG4gICAgICBpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHtcbiAgICAgICAgdHlwZSA9IG51bGw7XG4gICAgICB9XG4gICAgICByZXR1cm4gbmV3IEZha2VCbG9iKHRoaXMuZGF0YS5qb2luKFwiXCIpLCB0eXBlLCBcInJhd1wiKTtcbiAgICB9O1xuICAgIEZCQl9wcm90by50b1N0cmluZyA9IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIFwiW29iamVjdCBCbG9iQnVpbGRlcl1cIjtcbiAgICB9O1xuICAgIEZCX3Byb3RvLnNsaWNlID0gZnVuY3Rpb24oc3RhcnQsIGVuZCwgdHlwZSkge1xuICAgICAgdmFyIGFyZ3MgPSBhcmd1bWVudHMubGVuZ3RoO1xuICAgICAgaWYgKGFyZ3MgPCAzKSB7XG4gICAgICAgIHR5cGUgPSBudWxsO1xuICAgICAgfVxuICAgICAgcmV0dXJuIG5ldyBGYWtlQmxvYihcbiAgICAgICAgICB0aGlzLmRhdGEuc2xpY2Uoc3RhcnQsIGFyZ3MgPiAxID8gZW5kIDogdGhpcy5kYXRhLmxlbmd0aClcbiAgICAgICAgLCB0eXBlXG4gICAgICAgICwgdGhpcy5lbmNvZGluZ1xuICAgICAgKTtcbiAgICB9O1xuICAgIEZCX3Byb3RvLnRvU3RyaW5nID0gZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gXCJbb2JqZWN0IEJsb2JdXCI7XG4gICAgfTtcbiAgICBGQl9wcm90by5jbG9zZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgdGhpcy5zaXplID0gMDtcbiAgICAgIGRlbGV0ZSB0aGlzLmRhdGE7XG4gICAgfTtcbiAgICByZXR1cm4gRmFrZUJsb2JCdWlsZGVyO1xuICB9KHZpZXcpKTtcblxuICB2aWV3LkJsb2IgPSBmdW5jdGlvbihibG9iUGFydHMsIG9wdGlvbnMpIHtcbiAgICB2YXIgdHlwZSA9IG9wdGlvbnMgPyAob3B0aW9ucy50eXBlIHx8IFwiXCIpIDogXCJcIjtcbiAgICB2YXIgYnVpbGRlciA9IG5ldyBCbG9iQnVpbGRlcigpO1xuICAgIGlmIChibG9iUGFydHMpIHtcbiAgICAgIGZvciAodmFyIGkgPSAwLCBsZW4gPSBibG9iUGFydHMubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgaWYgKFVpbnQ4QXJyYXkgJiYgYmxvYlBhcnRzW2ldIGluc3RhbmNlb2YgVWludDhBcnJheSkge1xuICAgICAgICAgIGJ1aWxkZXIuYXBwZW5kKGJsb2JQYXJ0c1tpXS5idWZmZXIpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgIGJ1aWxkZXIuYXBwZW5kKGJsb2JQYXJ0c1tpXSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgdmFyIGJsb2IgPSBidWlsZGVyLmdldEJsb2IodHlwZSk7XG4gICAgaWYgKCFibG9iLnNsaWNlICYmIGJsb2Iud2Via2l0U2xpY2UpIHtcbiAgICAgIGJsb2Iuc2xpY2UgPSBibG9iLndlYmtpdFNsaWNlO1xuICAgIH1cbiAgICByZXR1cm4gYmxvYjtcbiAgfTtcblxuICB2YXIgZ2V0UHJvdG90eXBlT2YgPSBPYmplY3QuZ2V0UHJvdG90eXBlT2YgfHwgZnVuY3Rpb24ob2JqZWN0KSB7XG4gICAgcmV0dXJuIG9iamVjdC5fX3Byb3RvX187XG4gIH07XG4gIHZpZXcuQmxvYi5wcm90b3R5cGUgPSBnZXRQcm90b3R5cGVPZihuZXcgdmlldy5CbG9iKCkpO1xufSh0eXBlb2Ygc2VsZiAhPT0gXCJ1bmRlZmluZWRcIiAmJiBzZWxmIHx8IHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgJiYgd2luZG93IHx8IHRoaXMuY29udGVudCB8fCB0aGlzKSk7XG5cbihmdW5jdGlvbiAocm9vdCwgZmFjdG9yeSkge1xuICAgICd1c2Ugc3RyaWN0JztcbiAgICB2YXIgaXNFbGVjdHJvbiA9IHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnICYmIHByb2Nlc3MgJiYgcHJvY2Vzcy52ZXJzaW9ucyAmJiBwcm9jZXNzLnZlcnNpb25zLmVsZWN0cm9uO1xuICAgIGlmICghaXNFbGVjdHJvbiAmJiB0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0Jykge1xuICAgICAgICBtb2R1bGUuZXhwb3J0cyA9IGZhY3Rvcnk7XG4gICAgfSBlbHNlIGlmICh0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpIHtcbiAgICAgICAgZGVmaW5lKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWN0b3J5O1xuICAgICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgICByb290Lk1lZGl1bUVkaXRvciA9IGZhY3Rvcnk7XG4gICAgfVxufSh0aGlzLCBmdW5jdGlvbiAoKSB7XG5cbiAgICAndXNlIHN0cmljdCc7XG5cbmZ1bmN0aW9uIE1lZGl1bUVkaXRvcihlbGVtZW50cywgb3B0aW9ucykge1xuICAgICd1c2Ugc3RyaWN0JztcbiAgICByZXR1cm4gdGhpcy5pbml0KGVsZW1lbnRzLCBvcHRpb25zKTtcbn1cblxuTWVkaXVtRWRpdG9yLmV4dGVuc2lvbnMgPSB7fTtcbi8qanNoaW50IHVudXNlZDogdHJ1ZSAqL1xuKGZ1bmN0aW9uICh3aW5kb3cpIHtcbiAgICAndXNlIHN0cmljdCc7XG5cbiAgICBmdW5jdGlvbiBjb3B5SW50byhvdmVyd3JpdGUsIGRlc3QpIHtcbiAgICAgICAgdmFyIHByb3AsXG4gICAgICAgICAgICBzb3VyY2VzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAyKTtcbiAgICAgICAgZGVzdCA9IGRlc3QgfHwge307XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc291cmNlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgdmFyIHNvdXJjZSA9IHNvdXJjZXNbaV07XG4gICAgICAgICAgICBpZiAoc291cmNlKSB7XG4gICAgICAgICAgICAgICAgZm9yIChwcm9wIGluIHNvdXJjZSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoc291cmNlLmhhc093blByb3BlcnR5KHByb3ApICYmXG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlb2Ygc291cmNlW3Byb3BdICE9PSAndW5kZWZpbmVkJyAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgKG92ZXJ3cml0ZSB8fCBkZXN0Lmhhc093blByb3BlcnR5KHByb3ApID09PSBmYWxzZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlc3RbcHJvcF0gPSBzb3VyY2VbcHJvcF07XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGRlc3Q7XG4gICAgfVxuXG4gICAgLy8gaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvQVBJL05vZGUvY29udGFpbnNcbiAgICAvLyBTb21lIGJyb3dzZXJzIChpbmNsdWRpbmcgcGhhbnRvbSkgZG9uJ3QgcmV0dXJuIHRydWUgZm9yIE5vZGUuY29udGFpbnMoY2hpbGQpXG4gICAgLy8gaWYgY2hpbGQgaXMgYSB0ZXh0IG5vZGUuICBEZXRlY3QgdGhlc2UgY2FzZXMgaGVyZSBhbmQgdXNlIGEgZmFsbGJhY2tcbiAgICAvLyBmb3IgY2FsbHMgdG8gVXRpbC5pc0Rlc2NlbmRhbnQoKVxuICAgIHZhciBub2RlQ29udGFpbnNXb3Jrc1dpdGhUZXh0Tm9kZXMgPSBmYWxzZTtcbiAgICB0cnkge1xuICAgICAgICB2YXIgdGVzdFBhcmVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpLFxuICAgICAgICAgICAgdGVzdFRleHQgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZSgnICcpO1xuICAgICAgICB0ZXN0UGFyZW50LmFwcGVuZENoaWxkKHRlc3RUZXh0KTtcbiAgICAgICAgbm9kZUNvbnRhaW5zV29ya3NXaXRoVGV4dE5vZGVzID0gdGVzdFBhcmVudC5jb250YWlucyh0ZXN0VGV4dCk7XG4gICAgfSBjYXRjaCAoZXhjKSB7fVxuXG4gICAgdmFyIFV0aWwgPSB7XG5cbiAgICAgICAgLy8gaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy8xNzkwNzQ0NS9ob3ctdG8tZGV0ZWN0LWllMTEjY29tbWVudDMwMTY1ODg4XzE3OTA3NTYyXG4gICAgICAgIC8vIGJ5IHJnODlcbiAgICAgICAgaXNJRTogKChuYXZpZ2F0b3IuYXBwTmFtZSA9PT0gJ01pY3Jvc29mdCBJbnRlcm5ldCBFeHBsb3JlcicpIHx8ICgobmF2aWdhdG9yLmFwcE5hbWUgPT09ICdOZXRzY2FwZScpICYmIChuZXcgUmVnRXhwKCdUcmlkZW50Ly4qcnY6KFswLTldezEsfVsuMC05XXswLH0pJykuZXhlYyhuYXZpZ2F0b3IudXNlckFnZW50KSAhPT0gbnVsbCkpKSxcblxuICAgICAgICBpc0VkZ2U6ICgvRWRnZVxcL1xcZCsvKS5leGVjKG5hdmlnYXRvci51c2VyQWdlbnQpICE9PSBudWxsLFxuXG4gICAgICAgIC8vIGlmIGZpcmVmb3hcbiAgICAgICAgaXNGRjogKG5hdmlnYXRvci51c2VyQWdlbnQudG9Mb3dlckNhc2UoKS5pbmRleE9mKCdmaXJlZm94JykgPiAtMSksXG5cbiAgICAgICAgLy8gaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL2EvMTE3NTIwODQvNTY5MTAxXG4gICAgICAgIGlzTWFjOiAod2luZG93Lm5hdmlnYXRvci5wbGF0Zm9ybS50b1VwcGVyQ2FzZSgpLmluZGV4T2YoJ01BQycpID49IDApLFxuXG4gICAgICAgIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9qYXNoa2VuYXMvdW5kZXJzY29yZVxuICAgICAgICAvLyBMb25lbHkgbGV0dGVyIE1VU1QgVVNFIHRoZSB1cHBlcmNhc2UgY29kZVxuICAgICAgICBrZXlDb2RlOiB7XG4gICAgICAgICAgICBCQUNLU1BBQ0U6IDgsXG4gICAgICAgICAgICBUQUI6IDksXG4gICAgICAgICAgICBFTlRFUjogMTMsXG4gICAgICAgICAgICBFU0NBUEU6IDI3LFxuICAgICAgICAgICAgU1BBQ0U6IDMyLFxuICAgICAgICAgICAgREVMRVRFOiA0NixcbiAgICAgICAgICAgIEs6IDc1LCAvLyBLIGtleWNvZGUsIGFuZCBub3Qga1xuICAgICAgICAgICAgTTogNzcsXG4gICAgICAgICAgICBWOiA4NlxuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBSZXR1cm5zIHRydWUgaWYgaXQncyBtZXRhS2V5IG9uIE1hYywgb3IgY3RybEtleSBvbiBub24tTWFjLlxuICAgICAgICAgKiBTZWUgIzU5MVxuICAgICAgICAgKi9cbiAgICAgICAgaXNNZXRhQ3RybEtleTogZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgICAgICBpZiAoKFV0aWwuaXNNYWMgJiYgZXZlbnQubWV0YUtleSkgfHwgKCFVdGlsLmlzTWFjICYmIGV2ZW50LmN0cmxLZXkpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogUmV0dXJucyB0cnVlIGlmIHRoZSBrZXkgYXNzb2NpYXRlZCB0byB0aGUgZXZlbnQgaXMgaW5zaWRlIGtleXMgYXJyYXlcbiAgICAgICAgICpcbiAgICAgICAgICogQHNlZSA6IGh0dHBzOi8vZ2l0aHViLmNvbS9qcXVlcnkvanF1ZXJ5L2Jsb2IvMDcwNWJlNDc1MDkyYWVkZTFlZGRhZTAxMzE5ZWM5MzFmYjljNjVmYy9zcmMvZXZlbnQuanMjTDQ3My1MNDg0XG4gICAgICAgICAqIEBzZWUgOiBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vcS80NDcxNTgyLzU2OTEwMVxuICAgICAgICAgKi9cbiAgICAgICAgaXNLZXk6IGZ1bmN0aW9uIChldmVudCwga2V5cykge1xuICAgICAgICAgICAgdmFyIGtleUNvZGUgPSBVdGlsLmdldEtleUNvZGUoZXZlbnQpO1xuXG4gICAgICAgICAgICAvLyBpdCdzIG5vdCBhbiBhcnJheSBsZXQncyBqdXN0IGNvbXBhcmUgc3RyaW5ncyFcbiAgICAgICAgICAgIGlmIChmYWxzZSA9PT0gQXJyYXkuaXNBcnJheShrZXlzKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBrZXlDb2RlID09PSBrZXlzO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoLTEgPT09IGtleXMuaW5kZXhPZihrZXlDb2RlKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH0sXG5cbiAgICAgICAgZ2V0S2V5Q29kZTogZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgICAgICB2YXIga2V5Q29kZSA9IGV2ZW50LndoaWNoO1xuXG4gICAgICAgICAgICAvLyBnZXR0aW5nIHRoZSBrZXkgY29kZSBmcm9tIGV2ZW50XG4gICAgICAgICAgICBpZiAobnVsbCA9PT0ga2V5Q29kZSkge1xuICAgICAgICAgICAgICAgIGtleUNvZGUgPSBldmVudC5jaGFyQ29kZSAhPT0gbnVsbCA/IGV2ZW50LmNoYXJDb2RlIDogZXZlbnQua2V5Q29kZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIGtleUNvZGU7XG4gICAgICAgIH0sXG5cbiAgICAgICAgYmxvY2tDb250YWluZXJFbGVtZW50TmFtZXM6IFtcbiAgICAgICAgICAgIC8vIGVsZW1lbnRzIG91ciBlZGl0b3IgZ2VuZXJhdGVzXG4gICAgICAgICAgICAncCcsICdoMScsICdoMicsICdoMycsICdoNCcsICdoNScsICdoNicsICdibG9ja3F1b3RlJywgJ3ByZScsICd1bCcsICdsaScsICdvbCcsXG4gICAgICAgICAgICAvLyBhbGwgb3RoZXIga25vd24gYmxvY2sgZWxlbWVudHNcbiAgICAgICAgICAgICdhZGRyZXNzJywgJ2FydGljbGUnLCAnYXNpZGUnLCAnYXVkaW8nLCAnY2FudmFzJywgJ2RkJywgJ2RsJywgJ2R0JywgJ2ZpZWxkc2V0JyxcbiAgICAgICAgICAgICdmaWdjYXB0aW9uJywgJ2ZpZ3VyZScsICdmb290ZXInLCAnZm9ybScsICdoZWFkZXInLCAnaGdyb3VwJywgJ21haW4nLCAnbmF2JyxcbiAgICAgICAgICAgICdub3NjcmlwdCcsICdvdXRwdXQnLCAnc2VjdGlvbicsICd2aWRlbycsXG4gICAgICAgICAgICAndGFibGUnLCAndGhlYWQnLCAndGJvZHknLCAndGZvb3QnLCAndHInLCAndGgnLCAndGQnXG4gICAgICAgIF0sXG5cbiAgICAgICAgZW1wdHlFbGVtZW50TmFtZXM6IFsnYnInLCAnY29sJywgJ2NvbGdyb3VwJywgJ2hyJywgJ2ltZycsICdpbnB1dCcsICdzb3VyY2UnLCAnd2JyJ10sXG5cbiAgICAgICAgZXh0ZW5kOiBmdW5jdGlvbiBleHRlbmQoLyogZGVzdCwgc291cmNlMSwgc291cmNlMiwgLi4uKi8pIHtcbiAgICAgICAgICAgIHZhciBhcmdzID0gW3RydWVdLmNvbmNhdChBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMpKTtcbiAgICAgICAgICAgIHJldHVybiBjb3B5SW50by5hcHBseSh0aGlzLCBhcmdzKTtcbiAgICAgICAgfSxcblxuICAgICAgICBkZWZhdWx0czogZnVuY3Rpb24gZGVmYXVsdHMoLypkZXN0LCBzb3VyY2UxLCBzb3VyY2UyLCAuLi4qLykge1xuICAgICAgICAgICAgdmFyIGFyZ3MgPSBbZmFsc2VdLmNvbmNhdChBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMpKTtcbiAgICAgICAgICAgIHJldHVybiBjb3B5SW50by5hcHBseSh0aGlzLCBhcmdzKTtcbiAgICAgICAgfSxcblxuICAgICAgICAvKlxuICAgICAgICAgKiBDcmVhdGUgYSBsaW5rIGFyb3VuZCB0aGUgcHJvdmlkZWQgdGV4dCBub2RlcyB3aGljaCBtdXN0IGJlIGFkamFjZW50IHRvIGVhY2ggb3RoZXIgYW5kIGFsbCBiZVxuICAgICAgICAgKiBkZXNjZW5kYW50cyBvZiB0aGUgc2FtZSBjbG9zZXN0IGJsb2NrIGNvbnRhaW5lci4gSWYgdGhlIHByZWNvbmRpdGlvbnMgYXJlIG5vdCBtZXQsIHVuZXhwZWN0ZWRcbiAgICAgICAgICogYmVoYXZpb3Igd2lsbCByZXN1bHQuXG4gICAgICAgICAqL1xuICAgICAgICBjcmVhdGVMaW5rOiBmdW5jdGlvbiAoZG9jdW1lbnQsIHRleHROb2RlcywgaHJlZiwgdGFyZ2V0KSB7XG4gICAgICAgICAgICB2YXIgYW5jaG9yID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpO1xuICAgICAgICAgICAgVXRpbC5tb3ZlVGV4dFJhbmdlSW50b0VsZW1lbnQodGV4dE5vZGVzWzBdLCB0ZXh0Tm9kZXNbdGV4dE5vZGVzLmxlbmd0aCAtIDFdLCBhbmNob3IpO1xuICAgICAgICAgICAgYW5jaG9yLnNldEF0dHJpYnV0ZSgnaHJlZicsIGhyZWYpO1xuICAgICAgICAgICAgaWYgKHRhcmdldCkge1xuICAgICAgICAgICAgICAgIGFuY2hvci5zZXRBdHRyaWJ1dGUoJ3RhcmdldCcsIHRhcmdldCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gYW5jaG9yO1xuICAgICAgICB9LFxuXG4gICAgICAgIC8qXG4gICAgICAgICAqIEdpdmVuIHRoZSBwcm92aWRlZCBtYXRjaCBpbiB0aGUgZm9ybWF0IHtzdGFydDogMSwgZW5kOiAyfSB3aGVyZSBzdGFydCBhbmQgZW5kIGFyZSBpbmRpY2VzIGludG8gdGhlXG4gICAgICAgICAqIHRleHRDb250ZW50IG9mIHRoZSBwcm92aWRlZCBlbGVtZW50IGFyZ3VtZW50LCBtb2RpZnkgdGhlIERPTSBpbnNpZGUgZWxlbWVudCB0byBlbnN1cmUgdGhhdCB0aGUgdGV4dFxuICAgICAgICAgKiBpZGVudGlmaWVkIGJ5IHRoZSBwcm92aWRlZCBtYXRjaCBjYW4gYmUgcmV0dXJuZWQgYXMgdGV4dCBub2RlcyB0aGF0IGNvbnRhaW4gZXhhY3RseSB0aGF0IHRleHQsIHdpdGhvdXRcbiAgICAgICAgICogYW55IGFkZGl0aW9uYWwgdGV4dCBhdCB0aGUgYmVnaW5uaW5nIG9yIGVuZCBvZiB0aGUgcmV0dXJuZWQgYXJyYXkgb2YgYWRqYWNlbnQgdGV4dCBub2Rlcy5cbiAgICAgICAgICpcbiAgICAgICAgICogVGhlIG9ubHkgRE9NIG1hbmlwdWxhdGlvbiBwZXJmb3JtZWQgYnkgdGhpcyBmdW5jdGlvbiBpcyBzcGxpdHRpbmcgdGhlIHRleHQgbm9kZXMsIG5vbi10ZXh0IG5vZGVzIGFyZVxuICAgICAgICAgKiBub3QgYWZmZWN0ZWQgaW4gYW55IHdheS5cbiAgICAgICAgICovXG4gICAgICAgIGZpbmRPckNyZWF0ZU1hdGNoaW5nVGV4dE5vZGVzOiBmdW5jdGlvbiAoZG9jdW1lbnQsIGVsZW1lbnQsIG1hdGNoKSB7XG4gICAgICAgICAgICB2YXIgdHJlZVdhbGtlciA9IGRvY3VtZW50LmNyZWF0ZVRyZWVXYWxrZXIoZWxlbWVudCwgTm9kZUZpbHRlci5TSE9XX0FMTCwgbnVsbCwgZmFsc2UpLFxuICAgICAgICAgICAgICAgIG1hdGNoZWROb2RlcyA9IFtdLFxuICAgICAgICAgICAgICAgIGN1cnJlbnRUZXh0SW5kZXggPSAwLFxuICAgICAgICAgICAgICAgIHN0YXJ0UmVhY2hlZCA9IGZhbHNlLFxuICAgICAgICAgICAgICAgIGN1cnJlbnROb2RlID0gbnVsbCxcbiAgICAgICAgICAgICAgICBuZXdOb2RlID0gbnVsbDtcblxuICAgICAgICAgICAgd2hpbGUgKChjdXJyZW50Tm9kZSA9IHRyZWVXYWxrZXIubmV4dE5vZGUoKSkgIT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICBpZiAoY3VycmVudE5vZGUubm9kZVR5cGUgPiAzKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoY3VycmVudE5vZGUubm9kZVR5cGUgPT09IDMpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFzdGFydFJlYWNoZWQgJiYgbWF0Y2guc3RhcnQgPCAoY3VycmVudFRleHRJbmRleCArIGN1cnJlbnROb2RlLm5vZGVWYWx1ZS5sZW5ndGgpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzdGFydFJlYWNoZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgbmV3Tm9kZSA9IFV0aWwuc3BsaXRTdGFydE5vZGVJZk5lZWRlZChjdXJyZW50Tm9kZSwgbWF0Y2guc3RhcnQsIGN1cnJlbnRUZXh0SW5kZXgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmIChzdGFydFJlYWNoZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIFV0aWwuc3BsaXRFbmROb2RlSWZOZWVkZWQoY3VycmVudE5vZGUsIG5ld05vZGUsIG1hdGNoLmVuZCwgY3VycmVudFRleHRJbmRleCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKHN0YXJ0UmVhY2hlZCAmJiBjdXJyZW50VGV4dEluZGV4ID09PSBtYXRjaC5lbmQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrOyAvLyBGb3VuZCB0aGUgbm9kZShzKSBjb3JyZXNwb25kaW5nIHRvIHRoZSBsaW5rLiBCcmVhayBvdXQgYW5kIG1vdmUgb24gdG8gdGhlIG5leHQuXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoc3RhcnRSZWFjaGVkICYmIGN1cnJlbnRUZXh0SW5kZXggPiAobWF0Y2guZW5kICsgMSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignUGVyZm9ybUxpbmtpbmcgb3ZlcnNob3QgdGhlIHRhcmdldCEnKTsgLy8gc2hvdWxkIG5ldmVyIGhhcHBlbi4uLlxuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKHN0YXJ0UmVhY2hlZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbWF0Y2hlZE5vZGVzLnB1c2gobmV3Tm9kZSB8fCBjdXJyZW50Tm9kZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBjdXJyZW50VGV4dEluZGV4ICs9IGN1cnJlbnROb2RlLm5vZGVWYWx1ZS5sZW5ndGg7XG4gICAgICAgICAgICAgICAgICAgIGlmIChuZXdOb2RlICE9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjdXJyZW50VGV4dEluZGV4ICs9IG5ld05vZGUubm9kZVZhbHVlLmxlbmd0aDtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIFNraXAgdGhlIG5ld05vZGUgYXMgd2UnbGwgYWxyZWFkeSBoYXZlIHB1c2hlZCBpdCB0byB0aGUgbWF0Y2hlc1xuICAgICAgICAgICAgICAgICAgICAgICAgdHJlZVdhbGtlci5uZXh0Tm9kZSgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIG5ld05vZGUgPSBudWxsO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoY3VycmVudE5vZGUudGFnTmFtZS50b0xvd2VyQ2FzZSgpID09PSAnaW1nJykge1xuICAgICAgICAgICAgICAgICAgICBpZiAoIXN0YXJ0UmVhY2hlZCAmJiAobWF0Y2guc3RhcnQgPD0gY3VycmVudFRleHRJbmRleCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0YXJ0UmVhY2hlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKHN0YXJ0UmVhY2hlZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbWF0Y2hlZE5vZGVzLnB1c2goY3VycmVudE5vZGUpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIG1hdGNoZWROb2RlcztcbiAgICAgICAgfSxcblxuICAgICAgICAvKlxuICAgICAgICAgKiBHaXZlbiB0aGUgcHJvdmlkZWQgdGV4dCBub2RlIGFuZCB0ZXh0IGNvb3JkaW5hdGVzLCBzcGxpdCB0aGUgdGV4dCBub2RlIGlmIG5lZWRlZCB0byBtYWtlIGl0IGFsaWduXG4gICAgICAgICAqIHByZWNpc2VseSB3aXRoIHRoZSBjb29yZGluYXRlcy5cbiAgICAgICAgICpcbiAgICAgICAgICogVGhpcyBmdW5jdGlvbiBpcyBpbnRlbmRlZCB0byBiZSBjYWxsZWQgZnJvbSBVdGlsLmZpbmRPckNyZWF0ZU1hdGNoaW5nVGV4dE5vZGVzLlxuICAgICAgICAgKi9cbiAgICAgICAgc3BsaXRTdGFydE5vZGVJZk5lZWRlZDogZnVuY3Rpb24gKGN1cnJlbnROb2RlLCBtYXRjaFN0YXJ0SW5kZXgsIGN1cnJlbnRUZXh0SW5kZXgpIHtcbiAgICAgICAgICAgIGlmIChtYXRjaFN0YXJ0SW5kZXggIT09IGN1cnJlbnRUZXh0SW5kZXgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gY3VycmVudE5vZGUuc3BsaXRUZXh0KG1hdGNoU3RhcnRJbmRleCAtIGN1cnJlbnRUZXh0SW5kZXgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH0sXG5cbiAgICAgICAgLypcbiAgICAgICAgICogR2l2ZW4gdGhlIHByb3ZpZGVkIHRleHQgbm9kZSBhbmQgdGV4dCBjb29yZGluYXRlcywgc3BsaXQgdGhlIHRleHQgbm9kZSBpZiBuZWVkZWQgdG8gbWFrZSBpdCBhbGlnblxuICAgICAgICAgKiBwcmVjaXNlbHkgd2l0aCB0aGUgY29vcmRpbmF0ZXMuIFRoZSBuZXdOb2RlIGFyZ3VtZW50IHNob3VsZCBmcm9tIHRoZSByZXN1bHQgb2YgVXRpbC5zcGxpdFN0YXJ0Tm9kZUlmTmVlZGVkLFxuICAgICAgICAgKiBpZiB0aGF0IGZ1bmN0aW9uIGhhcyBiZWVuIGNhbGxlZCBvbiB0aGUgc2FtZSBjdXJyZW50Tm9kZS5cbiAgICAgICAgICpcbiAgICAgICAgICogVGhpcyBmdW5jdGlvbiBpcyBpbnRlbmRlZCB0byBiZSBjYWxsZWQgZnJvbSBVdGlsLmZpbmRPckNyZWF0ZU1hdGNoaW5nVGV4dE5vZGVzLlxuICAgICAgICAgKi9cbiAgICAgICAgc3BsaXRFbmROb2RlSWZOZWVkZWQ6IGZ1bmN0aW9uIChjdXJyZW50Tm9kZSwgbmV3Tm9kZSwgbWF0Y2hFbmRJbmRleCwgY3VycmVudFRleHRJbmRleCkge1xuICAgICAgICAgICAgdmFyIHRleHRJbmRleE9mRW5kT2ZGYXJ0aGVzdE5vZGUsXG4gICAgICAgICAgICAgICAgZW5kU3BsaXRQb2ludDtcbiAgICAgICAgICAgIHRleHRJbmRleE9mRW5kT2ZGYXJ0aGVzdE5vZGUgPSBjdXJyZW50VGV4dEluZGV4ICsgKG5ld05vZGUgfHwgY3VycmVudE5vZGUpLm5vZGVWYWx1ZS5sZW5ndGggK1xuICAgICAgICAgICAgICAgICAgICAobmV3Tm9kZSA/IGN1cnJlbnROb2RlLm5vZGVWYWx1ZS5sZW5ndGggOiAwKSAtXG4gICAgICAgICAgICAgICAgICAgIDE7XG4gICAgICAgICAgICBlbmRTcGxpdFBvaW50ID0gKG5ld05vZGUgfHwgY3VycmVudE5vZGUpLm5vZGVWYWx1ZS5sZW5ndGggLVxuICAgICAgICAgICAgICAgICAgICAodGV4dEluZGV4T2ZFbmRPZkZhcnRoZXN0Tm9kZSArIDEgLSBtYXRjaEVuZEluZGV4KTtcbiAgICAgICAgICAgIGlmICh0ZXh0SW5kZXhPZkVuZE9mRmFydGhlc3ROb2RlID49IG1hdGNoRW5kSW5kZXggJiZcbiAgICAgICAgICAgICAgICAgICAgY3VycmVudFRleHRJbmRleCAhPT0gdGV4dEluZGV4T2ZFbmRPZkZhcnRoZXN0Tm9kZSAmJlxuICAgICAgICAgICAgICAgICAgICBlbmRTcGxpdFBvaW50ICE9PSAwKSB7XG4gICAgICAgICAgICAgICAgKG5ld05vZGUgfHwgY3VycmVudE5vZGUpLnNwbGl0VGV4dChlbmRTcGxpdFBvaW50KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICAvKlxuICAgICAgICAqIFRha2UgYW4gZWxlbWVudCwgYW5kIGJyZWFrIHVwIGFsbCBvZiBpdHMgdGV4dCBjb250ZW50IGludG8gdW5pcXVlIHBpZWNlcyBzdWNoIHRoYXQ6XG4gICAgICAgICAqIDEpIEFsbCB0ZXh0IGNvbnRlbnQgb2YgdGhlIGVsZW1lbnRzIGFyZSBpbiBzZXBhcmF0ZSBibG9ja3MuIE5vIHBpZWNlIG9mIHRleHQgY29udGVudCBzaG91bGQgc3BhblxuICAgICAgICAgKiAgICBhY3Jvc3MgbXVsdGlwbGUgYmxvY2tzLiBUaGlzIG1lYW5zIG5vIGVsZW1lbnQgcmV0dXJuIGJ5IHRoaXMgZnVuY3Rpb24gc2hvdWxkIGhhdmVcbiAgICAgICAgICogICAgYW55IGJsb2NrcyBhcyBjaGlsZHJlbi5cbiAgICAgICAgICogMikgVGhlIHVuaW9uIG9mIHRoZSB0ZXh0Y29udGVudCBvZiBhbGwgb2YgdGhlIGVsZW1lbnRzIHJldHVybmVkIGhlcmUgY292ZXJzIGFsbFxuICAgICAgICAgKiAgICBvZiB0aGUgdGV4dCB3aXRoaW4gdGhlIGVsZW1lbnQuXG4gICAgICAgICAqXG4gICAgICAgICAqXG4gICAgICAgICAqIEVYQU1QTEU6XG4gICAgICAgICAqIEluIHRoZSBldmVudCB0aGF0IHdlIGhhdmUgc29tZXRoaW5nIGxpa2U6XG4gICAgICAgICAqXG4gICAgICAgICAqIDxibG9ja3F1b3RlPlxuICAgICAgICAgKiAgIDxwPlNvbWUgVGV4dDwvcD5cbiAgICAgICAgICogICA8b2w+XG4gICAgICAgICAqICAgICA8bGk+TGlzdCBJdGVtIDE8L2xpPlxuICAgICAgICAgKiAgICAgPGxpPkxpc3QgSXRlbSAyPC9saT5cbiAgICAgICAgICogICA8L29sPlxuICAgICAgICAgKiA8L2Jsb2NrcXVvdGU+XG4gICAgICAgICAqXG4gICAgICAgICAqIFRoaXMgZnVuY3Rpb24gd291bGQgcmV0dXJuIHRoZXNlIGVsZW1lbnRzIGFzIGFuIGFycmF5OlxuICAgICAgICAgKiAgIFsgPHA+U29tZSBUZXh0PC9wPiwgPGxpPkxpc3QgSXRlbSAxPC9saT4sIDxsaT5MaXN0IEl0ZW0gMjwvbGk+IF1cbiAgICAgICAgICpcbiAgICAgICAgICogU2luY2UgdGhlIDxibG9ja3F1b3RlPiBhbmQgPG9sPiBlbGVtZW50cyBjb250YWluIGJsb2NrcyB3aXRoaW4gdGhlbSB0aGV5IGFyZSBub3QgcmV0dXJuZWQuXG4gICAgICAgICAqIFNpbmNlIHRoZSA8cD4gYW5kIDxsaT4ncyBkb24ndCBjb250YWluIGJsb2NrIGVsZW1lbnRzIGFuZCBjb3ZlciBhbGwgdGhlIHRleHQgY29udGVudCBvZiB0aGVcbiAgICAgICAgICogPGJsb2NrcXVvdGU+IGNvbnRhaW5lciwgdGhleSBhcmUgdGhlIGVsZW1lbnRzIHJldHVybmVkLlxuICAgICAgICAgKi9cbiAgICAgICAgc3BsaXRCeUJsb2NrRWxlbWVudHM6IGZ1bmN0aW9uIChlbGVtZW50KSB7XG4gICAgICAgICAgICBpZiAoZWxlbWVudC5ub2RlVHlwZSAhPT0gMyAmJiBlbGVtZW50Lm5vZGVUeXBlICE9PSAxKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFtdO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB2YXIgdG9SZXQgPSBbXSxcbiAgICAgICAgICAgICAgICBibG9ja0VsZW1lbnRRdWVyeSA9IE1lZGl1bUVkaXRvci51dGlsLmJsb2NrQ29udGFpbmVyRWxlbWVudE5hbWVzLmpvaW4oJywnKTtcblxuICAgICAgICAgICAgaWYgKGVsZW1lbnQubm9kZVR5cGUgPT09IDMgfHwgZWxlbWVudC5xdWVyeVNlbGVjdG9yQWxsKGJsb2NrRWxlbWVudFF1ZXJ5KS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gW2VsZW1lbnRdO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGVsZW1lbnQuY2hpbGROb2Rlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIHZhciBjaGlsZCA9IGVsZW1lbnQuY2hpbGROb2Rlc1tpXTtcbiAgICAgICAgICAgICAgICBpZiAoY2hpbGQubm9kZVR5cGUgPT09IDMpIHtcbiAgICAgICAgICAgICAgICAgICAgdG9SZXQucHVzaChjaGlsZCk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChjaGlsZC5ub2RlVHlwZSA9PT0gMSkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgYmxvY2tFbGVtZW50cyA9IGNoaWxkLnF1ZXJ5U2VsZWN0b3JBbGwoYmxvY2tFbGVtZW50UXVlcnkpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoYmxvY2tFbGVtZW50cy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRvUmV0LnB1c2goY2hpbGQpO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgdG9SZXQgPSB0b1JldC5jb25jYXQoTWVkaXVtRWRpdG9yLnV0aWwuc3BsaXRCeUJsb2NrRWxlbWVudHMoY2hpbGQpKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIHRvUmV0O1xuICAgICAgICB9LFxuXG4gICAgICAgIC8vIEZpbmQgdGhlIG5leHQgbm9kZSBpbiB0aGUgRE9NIHRyZWUgdGhhdCByZXByZXNlbnRzIGFueSB0ZXh0IHRoYXQgaXMgYmVpbmdcbiAgICAgICAgLy8gZGlzcGxheWVkIGRpcmVjdGx5IG5leHQgdG8gdGhlIHRhcmdldE5vZGUgKHBhc3NlZCBhcyBhbiBhcmd1bWVudClcbiAgICAgICAgLy8gVGV4dCB0aGF0IGFwcGVhcnMgZGlyZWN0bHkgbmV4dCB0byB0aGUgY3VycmVudCBub2RlIGNhbiBiZTpcbiAgICAgICAgLy8gIC0gQSBzaWJsaW5nIHRleHQgbm9kZVxuICAgICAgICAvLyAgLSBBIGRlc2NlbmRhbnQgb2YgYSBzaWJsaW5nIGVsZW1lbnRcbiAgICAgICAgLy8gIC0gQSBzaWJsaW5nIHRleHQgbm9kZSBvZiBhbiBhbmNlc3RvclxuICAgICAgICAvLyAgLSBBIGRlc2NlbmRhbnQgb2YgYSBzaWJsaW5nIGVsZW1lbnQgb2YgYW4gYW5jZXN0b3JcbiAgICAgICAgZmluZEFkamFjZW50VGV4dE5vZGVXaXRoQ29udGVudDogZnVuY3Rpb24gZmluZEFkamFjZW50VGV4dE5vZGVXaXRoQ29udGVudChyb290Tm9kZSwgdGFyZ2V0Tm9kZSwgb3duZXJEb2N1bWVudCkge1xuICAgICAgICAgICAgdmFyIHBhc3RUYXJnZXQgPSBmYWxzZSxcbiAgICAgICAgICAgICAgICBuZXh0Tm9kZSxcbiAgICAgICAgICAgICAgICBub2RlSXRlcmF0b3IgPSBvd25lckRvY3VtZW50LmNyZWF0ZU5vZGVJdGVyYXRvcihyb290Tm9kZSwgTm9kZUZpbHRlci5TSE9XX1RFWFQsIG51bGwsIGZhbHNlKTtcblxuICAgICAgICAgICAgLy8gVXNlIGEgbmF0aXZlIE5vZGVJdGVyYXRvciB0byBpdGVyYXRlIG92ZXIgYWxsIHRoZSB0ZXh0IG5vZGVzIHRoYXQgYXJlIGRlc2NlbmRhbnRzXG4gICAgICAgICAgICAvLyBvZiB0aGUgcm9vdE5vZGUuICBPbmNlIHBhc3QgdGhlIHRhcmdldE5vZGUsIGNob29zZSB0aGUgZmlyc3Qgbm9uLWVtcHR5IHRleHQgbm9kZVxuICAgICAgICAgICAgbmV4dE5vZGUgPSBub2RlSXRlcmF0b3IubmV4dE5vZGUoKTtcbiAgICAgICAgICAgIHdoaWxlIChuZXh0Tm9kZSkge1xuICAgICAgICAgICAgICAgIGlmIChuZXh0Tm9kZSA9PT0gdGFyZ2V0Tm9kZSkge1xuICAgICAgICAgICAgICAgICAgICBwYXN0VGFyZ2V0ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHBhc3RUYXJnZXQpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKG5leHROb2RlLm5vZGVUeXBlID09PSAzICYmIG5leHROb2RlLm5vZGVWYWx1ZSAmJiBuZXh0Tm9kZS5ub2RlVmFsdWUudHJpbSgpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIG5leHROb2RlID0gbm9kZUl0ZXJhdG9yLm5leHROb2RlKCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiBuZXh0Tm9kZTtcbiAgICAgICAgfSxcblxuICAgICAgICAvLyBGaW5kIGFuIGVsZW1lbnQncyBwcmV2aW91cyBzaWJsaW5nIHdpdGhpbiBhIG1lZGl1bS1lZGl0b3IgZWxlbWVudFxuICAgICAgICAvLyBJZiBvbmUgZG9lc24ndCBleGlzdCwgZmluZCB0aGUgY2xvc2VzdCBhbmNlc3RvcidzIHByZXZpb3VzIHNpYmxpbmdcbiAgICAgICAgZmluZFByZXZpb3VzU2libGluZzogZnVuY3Rpb24gKG5vZGUpIHtcbiAgICAgICAgICAgIGlmICghbm9kZSB8fCBVdGlsLmlzTWVkaXVtRWRpdG9yRWxlbWVudChub2RlKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdmFyIHByZXZpb3VzU2libGluZyA9IG5vZGUucHJldmlvdXNTaWJsaW5nO1xuICAgICAgICAgICAgd2hpbGUgKCFwcmV2aW91c1NpYmxpbmcgJiYgIVV0aWwuaXNNZWRpdW1FZGl0b3JFbGVtZW50KG5vZGUucGFyZW50Tm9kZSkpIHtcbiAgICAgICAgICAgICAgICBub2RlID0gbm9kZS5wYXJlbnROb2RlO1xuICAgICAgICAgICAgICAgIHByZXZpb3VzU2libGluZyA9IG5vZGUucHJldmlvdXNTaWJsaW5nO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gcHJldmlvdXNTaWJsaW5nO1xuICAgICAgICB9LFxuXG4gICAgICAgIGlzRGVzY2VuZGFudDogZnVuY3Rpb24gaXNEZXNjZW5kYW50KHBhcmVudCwgY2hpbGQsIGNoZWNrRXF1YWxpdHkpIHtcbiAgICAgICAgICAgIGlmICghcGFyZW50IHx8ICFjaGlsZCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChwYXJlbnQgPT09IGNoaWxkKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuICEhY2hlY2tFcXVhbGl0eTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIElmIHBhcmVudCBpcyBub3QgYW4gZWxlbWVudCwgaXQgY2FuJ3QgaGF2ZSBhbnkgZGVzY2VuZGFudHNcbiAgICAgICAgICAgIGlmIChwYXJlbnQubm9kZVR5cGUgIT09IDEpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAobm9kZUNvbnRhaW5zV29ya3NXaXRoVGV4dE5vZGVzIHx8IGNoaWxkLm5vZGVUeXBlICE9PSAzKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHBhcmVudC5jb250YWlucyhjaGlsZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2YXIgbm9kZSA9IGNoaWxkLnBhcmVudE5vZGU7XG4gICAgICAgICAgICB3aGlsZSAobm9kZSAhPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIGlmIChub2RlID09PSBwYXJlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIG5vZGUgPSBub2RlLnBhcmVudE5vZGU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH0sXG5cbiAgICAgICAgLy8gaHR0cHM6Ly9naXRodWIuY29tL2phc2hrZW5hcy91bmRlcnNjb3JlXG4gICAgICAgIGlzRWxlbWVudDogZnVuY3Rpb24gaXNFbGVtZW50KG9iaikge1xuICAgICAgICAgICAgcmV0dXJuICEhKG9iaiAmJiBvYmoubm9kZVR5cGUgPT09IDEpO1xuICAgICAgICB9LFxuXG4gICAgICAgIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9qYXNoa2VuYXMvdW5kZXJzY29yZVxuICAgICAgICB0aHJvdHRsZTogZnVuY3Rpb24gKGZ1bmMsIHdhaXQpIHtcbiAgICAgICAgICAgIHZhciBUSFJPVFRMRV9JTlRFUlZBTCA9IDUwLFxuICAgICAgICAgICAgICAgIGNvbnRleHQsXG4gICAgICAgICAgICAgICAgYXJncyxcbiAgICAgICAgICAgICAgICByZXN1bHQsXG4gICAgICAgICAgICAgICAgdGltZW91dCA9IG51bGwsXG4gICAgICAgICAgICAgICAgcHJldmlvdXMgPSAwLFxuICAgICAgICAgICAgICAgIGxhdGVyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICBwcmV2aW91cyA9IERhdGUubm93KCk7XG4gICAgICAgICAgICAgICAgICAgIHRpbWVvdXQgPSBudWxsO1xuICAgICAgICAgICAgICAgICAgICByZXN1bHQgPSBmdW5jLmFwcGx5KGNvbnRleHQsIGFyZ3MpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoIXRpbWVvdXQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRleHQgPSBhcmdzID0gbnVsbDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIGlmICghd2FpdCAmJiB3YWl0ICE9PSAwKSB7XG4gICAgICAgICAgICAgICAgd2FpdCA9IFRIUk9UVExFX0lOVEVSVkFMO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHZhciBub3cgPSBEYXRlLm5vdygpLFxuICAgICAgICAgICAgICAgICAgICByZW1haW5pbmcgPSB3YWl0IC0gKG5vdyAtIHByZXZpb3VzKTtcblxuICAgICAgICAgICAgICAgIGNvbnRleHQgPSB0aGlzO1xuICAgICAgICAgICAgICAgIGFyZ3MgPSBhcmd1bWVudHM7XG4gICAgICAgICAgICAgICAgaWYgKHJlbWFpbmluZyA8PSAwIHx8IHJlbWFpbmluZyA+IHdhaXQpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRpbWVvdXQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsZWFyVGltZW91dCh0aW1lb3V0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRpbWVvdXQgPSBudWxsO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHByZXZpb3VzID0gbm93O1xuICAgICAgICAgICAgICAgICAgICByZXN1bHQgPSBmdW5jLmFwcGx5KGNvbnRleHQsIGFyZ3MpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoIXRpbWVvdXQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRleHQgPSBhcmdzID0gbnVsbDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoIXRpbWVvdXQpIHtcbiAgICAgICAgICAgICAgICAgICAgdGltZW91dCA9IHNldFRpbWVvdXQobGF0ZXIsIHJlbWFpbmluZyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgICAgICB9O1xuICAgICAgICB9LFxuXG4gICAgICAgIHRyYXZlcnNlVXA6IGZ1bmN0aW9uIChjdXJyZW50LCB0ZXN0RWxlbWVudEZ1bmN0aW9uKSB7XG4gICAgICAgICAgICBpZiAoIWN1cnJlbnQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGRvIHtcbiAgICAgICAgICAgICAgICBpZiAoY3VycmVudC5ub2RlVHlwZSA9PT0gMSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAodGVzdEVsZW1lbnRGdW5jdGlvbihjdXJyZW50KSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGN1cnJlbnQ7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgLy8gZG8gbm90IHRyYXZlcnNlIHVwd2FyZHMgcGFzdCB0aGUgbmVhcmVzdCBjb250YWluaW5nIGVkaXRvclxuICAgICAgICAgICAgICAgICAgICBpZiAoVXRpbC5pc01lZGl1bUVkaXRvckVsZW1lbnQoY3VycmVudCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGN1cnJlbnQgPSBjdXJyZW50LnBhcmVudE5vZGU7XG4gICAgICAgICAgICB9IHdoaWxlIChjdXJyZW50KTtcblxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9LFxuXG4gICAgICAgIGh0bWxFbnRpdGllczogZnVuY3Rpb24gKHN0cikge1xuICAgICAgICAgICAgLy8gY29udmVydHMgc3BlY2lhbCBjaGFyYWN0ZXJzIChsaWtlIDwpIGludG8gdGhlaXIgZXNjYXBlZC9lbmNvZGVkIHZhbHVlcyAobGlrZSAmbHQ7KS5cbiAgICAgICAgICAgIC8vIFRoaXMgYWxsb3dzIHlvdSB0byBzaG93IHRvIGRpc3BsYXkgdGhlIHN0cmluZyB3aXRob3V0IHRoZSBicm93c2VyIHJlYWRpbmcgaXQgYXMgSFRNTC5cbiAgICAgICAgICAgIHJldHVybiBTdHJpbmcoc3RyKS5yZXBsYWNlKC8mL2csICcmYW1wOycpLnJlcGxhY2UoLzwvZywgJyZsdDsnKS5yZXBsYWNlKC8+L2csICcmZ3Q7JykucmVwbGFjZSgvXCIvZywgJyZxdW90OycpO1xuICAgICAgICB9LFxuXG4gICAgICAgIC8vIGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvNjY5MDc1Mi9pbnNlcnQtaHRtbC1hdC1jYXJldC1pbi1hLWNvbnRlbnRlZGl0YWJsZS1kaXZcbiAgICAgICAgaW5zZXJ0SFRNTENvbW1hbmQ6IGZ1bmN0aW9uIChkb2MsIGh0bWwpIHtcbiAgICAgICAgICAgIHZhciBzZWxlY3Rpb24sIHJhbmdlLCBlbCwgZnJhZ21lbnQsIG5vZGUsIGxhc3ROb2RlLCB0b1JlcGxhY2UsXG4gICAgICAgICAgICAgICAgcmVzID0gZmFsc2UsXG4gICAgICAgICAgICAgICAgZWNBcmdzID0gWydpbnNlcnRIVE1MJywgZmFsc2UsIGh0bWxdO1xuXG4gICAgICAgICAgICAvKiBFZGdlJ3MgaW1wbGVtZW50YXRpb24gb2YgaW5zZXJ0SFRNTCBpcyBqdXN0IGJ1Z2d5IHJpZ2h0IG5vdzpcbiAgICAgICAgICAgICAqIC0gRG9lc24ndCBhbGxvdyBsZWFkaW5nIHdoaXRlIHNwYWNlIGF0IHRoZSBiZWdpbm5pbmcgb2YgYW4gZWxlbWVudFxuICAgICAgICAgICAgICogLSBGb3VuZCBhIGNhc2Ugd2hlbiBhIDxmb250IHNpemU9XCIyXCI+IHRhZyB3YXMgaW5zZXJ0ZWQgd2hlbiBjYWxsaW5nIGFsaWduQ2VudGVyIGluc2lkZSBhIGJsb2NrcXVvdGVcbiAgICAgICAgICAgICAqXG4gICAgICAgICAgICAgKiBUaGVyZSBhcmUgbGlrZWx5IG90aGVyIGJ1Z3MsIHRoZXNlIGFyZSBqdXN0IHRoZSBvbmVzIHdlIGZvdW5kIHNvIGZhci5cbiAgICAgICAgICAgICAqIEZvciBub3csIGxldCdzIGp1c3QgdXNlIHRoZSBzYW1lIGZhbGxiYWNrIHdlIGRpZCBmb3IgSUVcbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgaWYgKCFNZWRpdW1FZGl0b3IudXRpbC5pc0VkZ2UgJiYgZG9jLnF1ZXJ5Q29tbWFuZFN1cHBvcnRlZCgnaW5zZXJ0SFRNTCcpKSB7XG4gICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRvYy5leGVjQ29tbWFuZC5hcHBseShkb2MsIGVjQXJncyk7XG4gICAgICAgICAgICAgICAgfSBjYXRjaCAoaWdub3JlKSB7fVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBzZWxlY3Rpb24gPSBkb2MuZ2V0U2VsZWN0aW9uKCk7XG4gICAgICAgICAgICBpZiAoc2VsZWN0aW9uLnJhbmdlQ291bnQpIHtcbiAgICAgICAgICAgICAgICByYW5nZSA9IHNlbGVjdGlvbi5nZXRSYW5nZUF0KDApO1xuICAgICAgICAgICAgICAgIHRvUmVwbGFjZSA9IHJhbmdlLmNvbW1vbkFuY2VzdG9yQ29udGFpbmVyO1xuXG4gICAgICAgICAgICAgICAgLy8gaHR0cHM6Ly9naXRodWIuY29tL3lhYndlL21lZGl1bS1lZGl0b3IvaXNzdWVzLzc0OFxuICAgICAgICAgICAgICAgIC8vIElmIHRoZSBzZWxlY3Rpb24gaXMgYW4gZW1wdHkgZWRpdG9yIGVsZW1lbnQsIGNyZWF0ZSBhIHRlbXBvcmFyeSB0ZXh0IG5vZGUgaW5zaWRlIG9mIHRoZSBlZGl0b3JcbiAgICAgICAgICAgICAgICAvLyBhbmQgc2VsZWN0IGl0IHNvIHRoYXQgd2UgZG9uJ3QgZGVsZXRlIHRoZSBlZGl0b3IgZWxlbWVudFxuICAgICAgICAgICAgICAgIGlmIChVdGlsLmlzTWVkaXVtRWRpdG9yRWxlbWVudCh0b1JlcGxhY2UpICYmICF0b1JlcGxhY2UuZmlyc3RDaGlsZCkge1xuICAgICAgICAgICAgICAgICAgICByYW5nZS5zZWxlY3ROb2RlKHRvUmVwbGFjZS5hcHBlbmRDaGlsZChkb2MuY3JlYXRlVGV4dE5vZGUoJycpKSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICgodG9SZXBsYWNlLm5vZGVUeXBlID09PSAzICYmIHJhbmdlLnN0YXJ0T2Zmc2V0ID09PSAwICYmIHJhbmdlLmVuZE9mZnNldCA9PT0gdG9SZXBsYWNlLm5vZGVWYWx1ZS5sZW5ndGgpIHx8XG4gICAgICAgICAgICAgICAgICAgICAgICAodG9SZXBsYWNlLm5vZGVUeXBlICE9PSAzICYmIHRvUmVwbGFjZS5pbm5lckhUTUwgPT09IHJhbmdlLnRvU3RyaW5nKCkpKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIEVuc3VyZSByYW5nZSBjb3ZlcnMgbWF4aW11bSBhbW91bnQgb2Ygbm9kZXMgYXMgcG9zc2libGVcbiAgICAgICAgICAgICAgICAgICAgLy8gQnkgbW92aW5nIHVwIHRoZSBET00gYW5kIHNlbGVjdGluZyBhbmNlc3RvcnMgd2hvc2Ugb25seSBjaGlsZCBpcyB0aGUgcmFuZ2VcbiAgICAgICAgICAgICAgICAgICAgd2hpbGUgKCFVdGlsLmlzTWVkaXVtRWRpdG9yRWxlbWVudCh0b1JlcGxhY2UpICYmXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdG9SZXBsYWNlLnBhcmVudE5vZGUgJiZcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0b1JlcGxhY2UucGFyZW50Tm9kZS5jaGlsZE5vZGVzLmxlbmd0aCA9PT0gMSAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICFVdGlsLmlzTWVkaXVtRWRpdG9yRWxlbWVudCh0b1JlcGxhY2UucGFyZW50Tm9kZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRvUmVwbGFjZSA9IHRvUmVwbGFjZS5wYXJlbnROb2RlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHJhbmdlLnNlbGVjdE5vZGUodG9SZXBsYWNlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmFuZ2UuZGVsZXRlQ29udGVudHMoKTtcblxuICAgICAgICAgICAgICAgIGVsID0gZG9jLmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgICAgIGVsLmlubmVySFRNTCA9IGh0bWw7XG4gICAgICAgICAgICAgICAgZnJhZ21lbnQgPSBkb2MuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpO1xuICAgICAgICAgICAgICAgIHdoaWxlIChlbC5maXJzdENoaWxkKSB7XG4gICAgICAgICAgICAgICAgICAgIG5vZGUgPSBlbC5maXJzdENoaWxkO1xuICAgICAgICAgICAgICAgICAgICBsYXN0Tm9kZSA9IGZyYWdtZW50LmFwcGVuZENoaWxkKG5vZGUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByYW5nZS5pbnNlcnROb2RlKGZyYWdtZW50KTtcblxuICAgICAgICAgICAgICAgIC8vIFByZXNlcnZlIHRoZSBzZWxlY3Rpb246XG4gICAgICAgICAgICAgICAgaWYgKGxhc3ROb2RlKSB7XG4gICAgICAgICAgICAgICAgICAgIHJhbmdlID0gcmFuZ2UuY2xvbmVSYW5nZSgpO1xuICAgICAgICAgICAgICAgICAgICByYW5nZS5zZXRTdGFydEFmdGVyKGxhc3ROb2RlKTtcbiAgICAgICAgICAgICAgICAgICAgcmFuZ2UuY29sbGFwc2UodHJ1ZSk7XG4gICAgICAgICAgICAgICAgICAgIE1lZGl1bUVkaXRvci5zZWxlY3Rpb24uc2VsZWN0UmFuZ2UoZG9jLCByYW5nZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJlcyA9IHRydWU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS95YWJ3ZS9tZWRpdW0tZWRpdG9yL2lzc3Vlcy85OTJcbiAgICAgICAgICAgIC8vIElmIHdlJ3JlIG1vbml0b3JpbmcgY2FsbHMgdG8gZXhlY0NvbW1hbmQsIG5vdGlmeSBsaXN0ZW5lcnMgYXMgaWYgYSByZWFsIGNhbGwgaGFkIGhhcHBlbmVkXG4gICAgICAgICAgICBpZiAoZG9jLmV4ZWNDb21tYW5kLmNhbGxMaXN0ZW5lcnMpIHtcbiAgICAgICAgICAgICAgICBkb2MuZXhlY0NvbW1hbmQuY2FsbExpc3RlbmVycyhlY0FyZ3MsIHJlcyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gcmVzO1xuICAgICAgICB9LFxuXG4gICAgICAgIGV4ZWNGb3JtYXRCbG9jazogZnVuY3Rpb24gKGRvYywgdGFnTmFtZSkge1xuICAgICAgICAgICAgLy8gR2V0IHRoZSB0b3AgbGV2ZWwgYmxvY2sgZWxlbWVudCB0aGF0IGNvbnRhaW5zIHRoZSBzZWxlY3Rpb25cbiAgICAgICAgICAgIHZhciBibG9ja0NvbnRhaW5lciA9IFV0aWwuZ2V0VG9wQmxvY2tDb250YWluZXIoTWVkaXVtRWRpdG9yLnNlbGVjdGlvbi5nZXRTZWxlY3Rpb25TdGFydChkb2MpKSxcbiAgICAgICAgICAgICAgICBjaGlsZE5vZGVzO1xuXG4gICAgICAgICAgICAvLyBTcGVjaWFsIGhhbmRsaW5nIGZvciBibG9ja3F1b3RlXG4gICAgICAgICAgICBpZiAodGFnTmFtZSA9PT0gJ2Jsb2NrcXVvdGUnKSB7XG4gICAgICAgICAgICAgICAgaWYgKGJsb2NrQ29udGFpbmVyKSB7XG4gICAgICAgICAgICAgICAgICAgIGNoaWxkTm9kZXMgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChibG9ja0NvbnRhaW5lci5jaGlsZE5vZGVzKTtcbiAgICAgICAgICAgICAgICAgICAgLy8gQ2hlY2sgaWYgdGhlIGJsb2NrcXVvdGUgaGFzIGEgYmxvY2sgZWxlbWVudCBhcyBhIGNoaWxkIChuZXN0ZWQgYmxvY2tzKVxuICAgICAgICAgICAgICAgICAgICBpZiAoY2hpbGROb2Rlcy5zb21lKGZ1bmN0aW9uIChjaGlsZE5vZGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBVdGlsLmlzQmxvY2tDb250YWluZXIoY2hpbGROb2RlKTtcbiAgICAgICAgICAgICAgICAgICAgfSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIEZGIGhhbmRsZXMgYmxvY2txdW90ZSBkaWZmZXJlbnRseSBvbiBmb3JtYXRCbG9ja1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gYWxsb3dpbmcgbmVzdGluZywgd2UgbmVlZCB0byB1c2Ugb3V0ZGVudFxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9SaWNoLVRleHRfRWRpdGluZ19pbl9Nb3ppbGxhXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZG9jLmV4ZWNDb21tYW5kKCdvdXRkZW50JywgZmFsc2UsIG51bGwpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgLy8gV2hlbiBJRSBibG9ja3F1b3RlIG5lZWRzIHRvIGJlIGNhbGxlZCBhcyBpbmRlbnRcbiAgICAgICAgICAgICAgICAvLyBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzE4MTYyMjMvcmljaC10ZXh0LWVkaXRvci13aXRoLWJsb2NrcXVvdGUtZnVuY3Rpb24vMTgyMTc3NyMxODIxNzc3XG4gICAgICAgICAgICAgICAgaWYgKFV0aWwuaXNJRSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZG9jLmV4ZWNDb21tYW5kKCdpbmRlbnQnLCBmYWxzZSwgdGFnTmFtZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBJZiB0aGUgYmxvY2tDb250YWluZXIgaXMgYWxyZWFkeSB0aGUgZWxlbWVudCB0eXBlIGJlaW5nIHBhc3NlZCBpblxuICAgICAgICAgICAgLy8gdHJlYXQgaXQgYXMgJ3VuZG8nIGZvcm1hdHRpbmcgYW5kIGp1c3QgY29udmVydCBpdCB0byBhIDxwPlxuICAgICAgICAgICAgaWYgKGJsb2NrQ29udGFpbmVyICYmIHRhZ05hbWUgPT09IGJsb2NrQ29udGFpbmVyLm5vZGVOYW1lLnRvTG93ZXJDYXNlKCkpIHtcbiAgICAgICAgICAgICAgICB0YWdOYW1lID0gJ3AnO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBXaGVuIElFIHdlIG5lZWQgdG8gYWRkIDw+IHRvIGhlYWRpbmcgZWxlbWVudHNcbiAgICAgICAgICAgIC8vIGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvMTA3NDE4MzEvZXhlY2NvbW1hbmQtZm9ybWF0YmxvY2staGVhZGluZ3MtaW4taWVcbiAgICAgICAgICAgIGlmIChVdGlsLmlzSUUpIHtcbiAgICAgICAgICAgICAgICB0YWdOYW1lID0gJzwnICsgdGFnTmFtZSArICc+JztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gV2hlbiBGRiwgSUUgYW5kIEVkZ2UsIHdlIGhhdmUgdG8gaGFuZGxlIGJsb2NrcXVvdGUgbm9kZSBzZXBlcmF0ZWx5IGFzICdmb3JtYXRibG9jaycgZG9lcyBub3Qgd29yay5cbiAgICAgICAgICAgIC8vIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0FQSS9Eb2N1bWVudC9leGVjQ29tbWFuZCNDb21tYW5kc1xuICAgICAgICAgICAgaWYgKGJsb2NrQ29udGFpbmVyICYmIGJsb2NrQ29udGFpbmVyLm5vZGVOYW1lLnRvTG93ZXJDYXNlKCkgPT09ICdibG9ja3F1b3RlJykge1xuICAgICAgICAgICAgICAgIC8vIEZvciBJRSwganVzdCB1c2Ugb3V0ZGVudFxuICAgICAgICAgICAgICAgIGlmIChVdGlsLmlzSUUgJiYgdGFnTmFtZSA9PT0gJzxwPicpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRvYy5leGVjQ29tbWFuZCgnb3V0ZGVudCcsIGZhbHNlLCB0YWdOYW1lKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAvLyBGb3IgRmlyZWZveCBhbmQgRWRnZSwgbWFrZSBzdXJlIHRoZXJlJ3MgYSBuZXN0ZWQgYmxvY2sgZWxlbWVudCBiZWZvcmUgY2FsbGluZyBvdXRkZW50XG4gICAgICAgICAgICAgICAgaWYgKChVdGlsLmlzRkYgfHwgVXRpbC5pc0VkZ2UpICYmIHRhZ05hbWUgPT09ICdwJykge1xuICAgICAgICAgICAgICAgICAgICBjaGlsZE5vZGVzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYmxvY2tDb250YWluZXIuY2hpbGROb2Rlcyk7XG4gICAgICAgICAgICAgICAgICAgIC8vIElmIHRoZXJlIGFyZSBzb21lIG5vbi1ibG9jayBlbGVtZW50cyB3ZSBuZWVkIHRvIHdyYXAgZXZlcnl0aGluZyBpbiBhIDxwPiBiZWZvcmUgd2Ugb3V0ZGVudFxuICAgICAgICAgICAgICAgICAgICBpZiAoY2hpbGROb2Rlcy5zb21lKGZ1bmN0aW9uIChjaGlsZE5vZGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAhVXRpbC5pc0Jsb2NrQ29udGFpbmVyKGNoaWxkTm9kZSk7XG4gICAgICAgICAgICAgICAgICAgIH0pKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBkb2MuZXhlY0NvbW1hbmQoJ2Zvcm1hdEJsb2NrJywgZmFsc2UsIHRhZ05hbWUpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBkb2MuZXhlY0NvbW1hbmQoJ291dGRlbnQnLCBmYWxzZSwgdGFnTmFtZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gZG9jLmV4ZWNDb21tYW5kKCdmb3JtYXRCbG9jaycsIGZhbHNlLCB0YWdOYW1lKTtcbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogU2V0IHRhcmdldCB0byBibGFuayBvbiB0aGUgZ2l2ZW4gZWwgZWxlbWVudFxuICAgICAgICAgKlxuICAgICAgICAgKiBUT0RPOiBub3Qgc3VyZSBpZiB0aGlzIHNob3VsZCBiZSBoZXJlXG4gICAgICAgICAqXG4gICAgICAgICAqIFdoZW4gY3JlYXRpbmcgYSBsaW5rICh1c2luZyBjb3JlIC0+IGNyZWF0ZUxpbmspIHRoZSBzZWxlY3Rpb24gcmV0dXJuZWQgYnkgRmlyZWZveCB3aWxsIGJlIHRoZSBwYXJlbnQgb2YgdGhlIGNyZWF0ZWQgbGlua1xuICAgICAgICAgKiBpbnN0ZWFkIG9mIHRoZSBjcmVhdGVkIGxpbmsgaXRzZWxmIChhcyBpdCBpcyBmb3IgQ2hyb21lIGZvciBleGFtcGxlKSwgc28gd2UgcmV0cmlldmUgYWxsIFwiYVwiIGNoaWxkcmVuIHRvIGdyYWIgdGhlIGdvb2Qgb25lIGJ5XG4gICAgICAgICAqIHVzaW5nIGBhbmNob3JVcmxgIHRvIGVuc3VyZSB0aGF0IHdlIGFyZSBhZGRpbmcgdGFyZ2V0PVwiX2JsYW5rXCIgb24gdGhlIGdvb2Qgb25lLlxuICAgICAgICAgKiBUaGlzIGlzbid0IGEgYnVsbGV0cHJvb2Ygc29sdXRpb24gYW55d2F5IC4uXG4gICAgICAgICAqL1xuICAgICAgICBzZXRUYXJnZXRCbGFuazogZnVuY3Rpb24gKGVsLCBhbmNob3JVcmwpIHtcbiAgICAgICAgICAgIHZhciBpLCB1cmwgPSBhbmNob3JVcmwgfHwgZmFsc2U7XG4gICAgICAgICAgICBpZiAoZWwubm9kZU5hbWUudG9Mb3dlckNhc2UoKSA9PT0gJ2EnKSB7XG4gICAgICAgICAgICAgICAgZWwudGFyZ2V0ID0gJ19ibGFuayc7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGVsID0gZWwuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2EnKTtcblxuICAgICAgICAgICAgICAgIGZvciAoaSA9IDA7IGkgPCBlbC5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZmFsc2UgPT09IHVybCB8fCB1cmwgPT09IGVsW2ldLmF0dHJpYnV0ZXMuaHJlZi52YWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZWxbaV0udGFyZ2V0ID0gJ19ibGFuayc7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgLypcbiAgICAgICAgICogdGhpcyBmdW5jdGlvbiBpcyBjYWxsZWQgdG8gZXhwbGljaXRseSByZW1vdmUgdGhlIHRhcmdldD0nX2JsYW5rJyBhcyBGRiBob2xkcyBvbiB0byBfYmxhbmsgdmFsdWUgZXZlblxuICAgICAgICAgKiBhZnRlciB1bmNoZWNraW5nIHRoZSBjaGVja2JveCBvbiBhbmNob3IgZm9ybVxuICAgICAgICAgKi9cbiAgICAgICAgcmVtb3ZlVGFyZ2V0Qmxhbms6IGZ1bmN0aW9uIChlbCwgYW5jaG9yVXJsKSB7XG4gICAgICAgICAgICB2YXIgaTtcbiAgICAgICAgICAgIGlmIChlbC5ub2RlTmFtZS50b0xvd2VyQ2FzZSgpID09PSAnYScpIHtcbiAgICAgICAgICAgICAgICBlbC5yZW1vdmVBdHRyaWJ1dGUoJ3RhcmdldCcpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBlbCA9IGVsLmdldEVsZW1lbnRzQnlUYWdOYW1lKCdhJyk7XG5cbiAgICAgICAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwgZWwubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGFuY2hvclVybCA9PT0gZWxbaV0uYXR0cmlidXRlcy5ocmVmLnZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBlbFtpXS5yZW1vdmVBdHRyaWJ1dGUoJ3RhcmdldCcpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIGFkZENsYXNzVG9BbmNob3JzOiBmdW5jdGlvbiAoZWwsIGJ1dHRvbkNsYXNzKSB7XG4gICAgICAgICAgICB2YXIgY2xhc3NlcyA9IGJ1dHRvbkNsYXNzLnNwbGl0KCcgJyksXG4gICAgICAgICAgICAgICAgaSxcbiAgICAgICAgICAgICAgICBqO1xuICAgICAgICAgICAgaWYgKGVsLm5vZGVOYW1lLnRvTG93ZXJDYXNlKCkgPT09ICdhJykge1xuICAgICAgICAgICAgICAgIGZvciAoaiA9IDA7IGogPCBjbGFzc2VzLmxlbmd0aDsgaiArPSAxKSB7XG4gICAgICAgICAgICAgICAgICAgIGVsLmNsYXNzTGlzdC5hZGQoY2xhc3Nlc1tqXSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBlbCA9IGVsLmdldEVsZW1lbnRzQnlUYWdOYW1lKCdhJyk7XG4gICAgICAgICAgICAgICAgZm9yIChpID0gMDsgaSA8IGVsLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICAgICAgICAgICAgICAgIGZvciAoaiA9IDA7IGogPCBjbGFzc2VzLmxlbmd0aDsgaiArPSAxKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBlbFtpXS5jbGFzc0xpc3QuYWRkKGNsYXNzZXNbal0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIGlzTGlzdEl0ZW06IGZ1bmN0aW9uIChub2RlKSB7XG4gICAgICAgICAgICBpZiAoIW5vZGUpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAobm9kZS5ub2RlTmFtZS50b0xvd2VyQ2FzZSgpID09PSAnbGknKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHZhciBwYXJlbnROb2RlID0gbm9kZS5wYXJlbnROb2RlLFxuICAgICAgICAgICAgICAgIHRhZ05hbWUgPSBwYXJlbnROb2RlLm5vZGVOYW1lLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgICAgICB3aGlsZSAodGFnTmFtZSA9PT0gJ2xpJyB8fCAoIVV0aWwuaXNCbG9ja0NvbnRhaW5lcihwYXJlbnROb2RlKSAmJiB0YWdOYW1lICE9PSAnZGl2JykpIHtcbiAgICAgICAgICAgICAgICBpZiAodGFnTmFtZSA9PT0gJ2xpJykge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcGFyZW50Tm9kZSA9IHBhcmVudE5vZGUucGFyZW50Tm9kZTtcbiAgICAgICAgICAgICAgICBpZiAocGFyZW50Tm9kZSkge1xuICAgICAgICAgICAgICAgICAgICB0YWdOYW1lID0gcGFyZW50Tm9kZS5ub2RlTmFtZS50b0xvd2VyQ2FzZSgpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH0sXG5cbiAgICAgICAgY2xlYW5MaXN0RE9NOiBmdW5jdGlvbiAob3duZXJEb2N1bWVudCwgZWxlbWVudCkge1xuICAgICAgICAgICAgaWYgKGVsZW1lbnQubm9kZU5hbWUudG9Mb3dlckNhc2UoKSAhPT0gJ2xpJykge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdmFyIGxpc3QgPSBlbGVtZW50LnBhcmVudEVsZW1lbnQ7XG5cbiAgICAgICAgICAgIGlmIChsaXN0LnBhcmVudEVsZW1lbnQubm9kZU5hbWUudG9Mb3dlckNhc2UoKSA9PT0gJ3AnKSB7IC8vIHllcyB3ZSBuZWVkIHRvIGNsZWFuIHVwXG4gICAgICAgICAgICAgICAgVXRpbC51bndyYXAobGlzdC5wYXJlbnRFbGVtZW50LCBvd25lckRvY3VtZW50KTtcblxuICAgICAgICAgICAgICAgIC8vIG1vdmUgY3Vyc29yIGF0IHRoZSBlbmQgb2YgdGhlIHRleHQgaW5zaWRlIHRoZSBsaXN0XG4gICAgICAgICAgICAgICAgLy8gZm9yIHNvbWUgdW5rbm93biByZWFzb24sIHRoZSBjdXJzb3IgaXMgbW92ZWQgdG8gZW5kIG9mIHRoZSBcInZpc3VhbFwiIGxpbmVcbiAgICAgICAgICAgICAgICBNZWRpdW1FZGl0b3Iuc2VsZWN0aW9uLm1vdmVDdXJzb3Iob3duZXJEb2N1bWVudCwgZWxlbWVudC5maXJzdENoaWxkLCBlbGVtZW50LmZpcnN0Q2hpbGQudGV4dENvbnRlbnQubGVuZ3RoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICAvKiBzcGxpdERPTVRyZWVcbiAgICAgICAgICpcbiAgICAgICAgICogR2l2ZW4gYSByb290IGVsZW1lbnQgc29tZSBkZXNjZW5kYW50IGVsZW1lbnQsIHNwbGl0IHRoZSByb290IGVsZW1lbnRcbiAgICAgICAgICogaW50byBpdHMgb3duIGVsZW1lbnQgY29udGFpbmluZyB0aGUgZGVzY2VuZGFudCBlbGVtZW50IGFuZCBhbGwgZWxlbWVudHNcbiAgICAgICAgICogb24gdGhlIGxlZnQgb3IgcmlnaHQgc2lkZSBvZiB0aGUgZGVzY2VuZGFudCAoJ3JpZ2h0JyBpcyBkZWZhdWx0KVxuICAgICAgICAgKlxuICAgICAgICAgKiBleGFtcGxlOlxuICAgICAgICAgKlxuICAgICAgICAgKiAgICAgICAgIDxkaXY+XG4gICAgICAgICAqICAgICAgLyAgICB8ICAgXFxcbiAgICAgICAgICogIDxzcGFuPiA8c3Bhbj4gPHNwYW4+XG4gICAgICAgICAqICAgLyBcXCAgICAvIFxcICAgIC8gXFxcbiAgICAgICAgICogIDEgICAyICAzICAgNCAgNSAgIDZcbiAgICAgICAgICpcbiAgICAgICAgICogIElmIEkgd2FudGVkIHRvIHNwbGl0IHRoaXMgdHJlZSBnaXZlbiB0aGUgPGRpdj4gYXMgdGhlIHJvb3QgYW5kIFwiNFwiIGFzIHRoZSBsZWFmXG4gICAgICAgICAqICB0aGUgcmVzdWx0IHdvdWxkIGJlICh0aGUgcHJpbWUgJyBtYXJrcyBpbmRpY2F0ZXMgbm9kZXMgdGhhdCBhcmUgY3JlYXRlZCBhcyBjbG9uZXMpOlxuICAgICAgICAgKlxuICAgICAgICAgKiAgIFNQTElUVElORyBPRkYgJ1JJR0hUJyBUUkVFICAgICAgIFNQTElUVElORyBPRkYgJ0xFRlQnIFRSRUVcbiAgICAgICAgICpcbiAgICAgICAgICogICAgIDxkaXY+ICAgICAgICAgICAgPGRpdj4nICAgICAgICAgICAgICA8ZGl2PicgICAgICA8ZGl2PlxuICAgICAgICAgKiAgICAgIC8gXFwgICAgICAgICAgICAgIC8gXFwgICAgICAgICAgICAgICAgIC8gXFwgICAgICAgICAgfFxuICAgICAgICAgKiA8c3Bhbj4gPHNwYW4+ICAgPHNwYW4+JyA8c3Bhbj4gICAgICAgPHNwYW4+IDxzcGFuPiAgIDxzcGFuPlxuICAgICAgICAgKiAgIC8gXFwgICAgfCAgICAgICAgfCAgICAgIC8gXFwgICAgICAgICAgIC9cXCAgICAgL1xcICAgICAgIC9cXFxuICAgICAgICAgKiAgMSAgIDIgICAzICAgICAgICA0ICAgICA1ICAgNiAgICAgICAgIDEgIDIgICAzICA0ICAgICA1ICA2XG4gICAgICAgICAqXG4gICAgICAgICAqICBUaGUgYWJvdmUgZXhhbXBsZSByZXByZXNlbnRzIHNwbGl0dGluZyBvZmYgdGhlICdyaWdodCcgb3IgJ2xlZnQnIHBhcnQgb2YgYSB0cmVlLCB3aGVyZVxuICAgICAgICAgKiAgdGhlIDxkaXY+JyB3b3VsZCBiZSByZXR1cm5lZCBhcyBhbiBlbGVtZW50IG5vdCBhcHBlbmRlZCB0byB0aGUgRE9NLCBhbmQgdGhlIDxkaXY+XG4gICAgICAgICAqICB3b3VsZCByZW1haW4gaW4gcGxhY2Ugd2hlcmUgaXQgd2FzXG4gICAgICAgICAqXG4gICAgICAgICovXG4gICAgICAgIHNwbGl0T2ZmRE9NVHJlZTogZnVuY3Rpb24gKHJvb3ROb2RlLCBsZWFmTm9kZSwgc3BsaXRMZWZ0KSB7XG4gICAgICAgICAgICB2YXIgc3BsaXRPbk5vZGUgPSBsZWFmTm9kZSxcbiAgICAgICAgICAgICAgICBjcmVhdGVkTm9kZSA9IG51bGwsXG4gICAgICAgICAgICAgICAgc3BsaXRSaWdodCA9ICFzcGxpdExlZnQ7XG5cbiAgICAgICAgICAgIC8vIGxvb3AgdW50aWwgd2UgaGl0IHRoZSByb290XG4gICAgICAgICAgICB3aGlsZSAoc3BsaXRPbk5vZGUgIT09IHJvb3ROb2RlKSB7XG4gICAgICAgICAgICAgICAgdmFyIGN1cnJQYXJlbnQgPSBzcGxpdE9uTm9kZS5wYXJlbnROb2RlLFxuICAgICAgICAgICAgICAgICAgICBuZXdQYXJlbnQgPSBjdXJyUGFyZW50LmNsb25lTm9kZShmYWxzZSksXG4gICAgICAgICAgICAgICAgICAgIHRhcmdldE5vZGUgPSAoc3BsaXRSaWdodCA/IHNwbGl0T25Ob2RlIDogY3VyclBhcmVudC5maXJzdENoaWxkKSxcbiAgICAgICAgICAgICAgICAgICAgYXBwZW5kTGFzdDtcblxuICAgICAgICAgICAgICAgIC8vIENyZWF0ZSBhIG5ldyBwYXJlbnQgZWxlbWVudCB3aGljaCBpcyBhIGNsb25lIG9mIHRoZSBjdXJyZW50IHBhcmVudFxuICAgICAgICAgICAgICAgIGlmIChjcmVhdGVkTm9kZSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoc3BsaXRSaWdodCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gSWYgd2UncmUgc3BsaXR0aW5nIHJpZ2h0LCBhZGQgcHJldmlvdXMgY3JlYXRlZCBlbGVtZW50IGJlZm9yZSBzaWJsaW5nc1xuICAgICAgICAgICAgICAgICAgICAgICAgbmV3UGFyZW50LmFwcGVuZENoaWxkKGNyZWF0ZWROb2RlKTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIElmIHdlJ3JlIHNwbGl0dGluZyBsZWZ0LCBhZGQgcHJldmlvdXMgY3JlYXRlZCBlbGVtZW50IGxhc3RcbiAgICAgICAgICAgICAgICAgICAgICAgIGFwcGVuZExhc3QgPSBjcmVhdGVkTm9kZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjcmVhdGVkTm9kZSA9IG5ld1BhcmVudDtcblxuICAgICAgICAgICAgICAgIHdoaWxlICh0YXJnZXROb2RlKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBzaWJsaW5nID0gdGFyZ2V0Tm9kZS5uZXh0U2libGluZztcbiAgICAgICAgICAgICAgICAgICAgLy8gU3BlY2lhbCBoYW5kbGluZyBmb3IgdGhlICdzcGxpdE5vZGUnXG4gICAgICAgICAgICAgICAgICAgIGlmICh0YXJnZXROb2RlID09PSBzcGxpdE9uTm9kZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCF0YXJnZXROb2RlLmhhc0NoaWxkTm9kZXMoKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRhcmdldE5vZGUucGFyZW50Tm9kZS5yZW1vdmVDaGlsZCh0YXJnZXROb2RlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gRm9yIHRoZSBub2RlIHdlJ3JlIHNwbGl0dGluZyBvbiwgaWYgaXQgaGFzIGNoaWxkcmVuLCB3ZSBuZWVkIHRvIGNsb25lIGl0XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gYW5kIG5vdCBqdXN0IG1vdmUgaXRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YXJnZXROb2RlID0gdGFyZ2V0Tm9kZS5jbG9uZU5vZGUoZmFsc2UpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gSWYgdGhlIHJlc3VsdGluZyBzcGxpdCBub2RlIGhhcyBjb250ZW50LCBhZGQgaXRcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0YXJnZXROb2RlLnRleHRDb250ZW50KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY3JlYXRlZE5vZGUuYXBwZW5kQ2hpbGQodGFyZ2V0Tm9kZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHRhcmdldE5vZGUgPSAoc3BsaXRSaWdodCA/IHNpYmxpbmcgOiBudWxsKTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIEZvciBnZW5lcmFsIGNhc2UsIGp1c3QgcmVtb3ZlIHRoZSBlbGVtZW50IGFuZCBvbmx5XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBhZGQgaXQgdG8gdGhlIHNwbGl0IHRyZWUgaWYgaXQgY29udGFpbnMgc29tZXRoaW5nXG4gICAgICAgICAgICAgICAgICAgICAgICB0YXJnZXROb2RlLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQodGFyZ2V0Tm9kZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGFyZ2V0Tm9kZS5oYXNDaGlsZE5vZGVzKCkgfHwgdGFyZ2V0Tm9kZS50ZXh0Q29udGVudCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNyZWF0ZWROb2RlLmFwcGVuZENoaWxkKHRhcmdldE5vZGUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICB0YXJnZXROb2RlID0gc2libGluZztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIC8vIElmIHdlIGhhZCBhbiBlbGVtZW50IHdlIHdhbnRlZCB0byBhcHBlbmQgYXQgdGhlIGVuZCwgZG8gdGhhdCBub3dcbiAgICAgICAgICAgICAgICBpZiAoYXBwZW5kTGFzdCkge1xuICAgICAgICAgICAgICAgICAgICBjcmVhdGVkTm9kZS5hcHBlbmRDaGlsZChhcHBlbmRMYXN0KTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBzcGxpdE9uTm9kZSA9IGN1cnJQYXJlbnQ7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiBjcmVhdGVkTm9kZTtcbiAgICAgICAgfSxcblxuICAgICAgICBtb3ZlVGV4dFJhbmdlSW50b0VsZW1lbnQ6IGZ1bmN0aW9uIChzdGFydE5vZGUsIGVuZE5vZGUsIG5ld0VsZW1lbnQpIHtcbiAgICAgICAgICAgIGlmICghc3RhcnROb2RlIHx8ICFlbmROb2RlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB2YXIgcm9vdE5vZGUgPSBVdGlsLmZpbmRDb21tb25Sb290KHN0YXJ0Tm9kZSwgZW5kTm9kZSk7XG4gICAgICAgICAgICBpZiAoIXJvb3ROb2RlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoZW5kTm9kZSA9PT0gc3RhcnROb2RlKSB7XG4gICAgICAgICAgICAgICAgdmFyIHRlbXAgPSBzdGFydE5vZGUucGFyZW50Tm9kZSxcbiAgICAgICAgICAgICAgICAgICAgc2libGluZyA9IHN0YXJ0Tm9kZS5uZXh0U2libGluZztcbiAgICAgICAgICAgICAgICB0ZW1wLnJlbW92ZUNoaWxkKHN0YXJ0Tm9kZSk7XG4gICAgICAgICAgICAgICAgbmV3RWxlbWVudC5hcHBlbmRDaGlsZChzdGFydE5vZGUpO1xuICAgICAgICAgICAgICAgIGlmIChzaWJsaW5nKSB7XG4gICAgICAgICAgICAgICAgICAgIHRlbXAuaW5zZXJ0QmVmb3JlKG5ld0VsZW1lbnQsIHNpYmxpbmcpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRlbXAuYXBwZW5kQ2hpbGQobmV3RWxlbWVudCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBuZXdFbGVtZW50Lmhhc0NoaWxkTm9kZXMoKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gY3JlYXRlIHJvb3RDaGlsZHJlbiBhcnJheSB3aGljaCBpbmNsdWRlcyBhbGwgdGhlIGNoaWxkcmVuXG4gICAgICAgICAgICAvLyB3ZSBjYXJlIGFib3V0XG4gICAgICAgICAgICB2YXIgcm9vdENoaWxkcmVuID0gW10sXG4gICAgICAgICAgICAgICAgZmlyc3RDaGlsZCxcbiAgICAgICAgICAgICAgICBsYXN0Q2hpbGQsXG4gICAgICAgICAgICAgICAgbmV4dE5vZGU7XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHJvb3ROb2RlLmNoaWxkTm9kZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBuZXh0Tm9kZSA9IHJvb3ROb2RlLmNoaWxkTm9kZXNbaV07XG4gICAgICAgICAgICAgICAgaWYgKCFmaXJzdENoaWxkKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChVdGlsLmlzRGVzY2VuZGFudChuZXh0Tm9kZSwgc3RhcnROb2RlLCB0cnVlKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZmlyc3RDaGlsZCA9IG5leHROb2RlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKFV0aWwuaXNEZXNjZW5kYW50KG5leHROb2RlLCBlbmROb2RlLCB0cnVlKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGFzdENoaWxkID0gbmV4dE5vZGU7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJvb3RDaGlsZHJlbi5wdXNoKG5leHROb2RlKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdmFyIGFmdGVyTGFzdCA9IGxhc3RDaGlsZC5uZXh0U2libGluZyxcbiAgICAgICAgICAgICAgICBmcmFnbWVudCA9IHJvb3ROb2RlLm93bmVyRG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpO1xuXG4gICAgICAgICAgICAvLyBidWlsZCB1cCBmcmFnbWVudCBvbiBzdGFydE5vZGUgc2lkZSBvZiB0cmVlXG4gICAgICAgICAgICBpZiAoZmlyc3RDaGlsZCA9PT0gc3RhcnROb2RlKSB7XG4gICAgICAgICAgICAgICAgZmlyc3RDaGlsZC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKGZpcnN0Q2hpbGQpO1xuICAgICAgICAgICAgICAgIGZyYWdtZW50LmFwcGVuZENoaWxkKGZpcnN0Q2hpbGQpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBmcmFnbWVudC5hcHBlbmRDaGlsZChVdGlsLnNwbGl0T2ZmRE9NVHJlZShmaXJzdENoaWxkLCBzdGFydE5vZGUpKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gYWRkIGFueSBlbGVtZW50cyBiZXR3ZWVuIGZpcnN0Q2hpbGQgJiBsYXN0Q2hpbGRcbiAgICAgICAgICAgIHJvb3RDaGlsZHJlbi5mb3JFYWNoKGZ1bmN0aW9uIChlbGVtZW50KSB7XG4gICAgICAgICAgICAgICAgZWxlbWVudC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKGVsZW1lbnQpO1xuICAgICAgICAgICAgICAgIGZyYWdtZW50LmFwcGVuZENoaWxkKGVsZW1lbnQpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIC8vIGJ1aWxkIHVwIGZyYWdtZW50IG9uIGVuZE5vZGUgc2lkZSBvZiB0aGUgdHJlZVxuICAgICAgICAgICAgaWYgKGxhc3RDaGlsZCA9PT0gZW5kTm9kZSkge1xuICAgICAgICAgICAgICAgIGxhc3RDaGlsZC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKGxhc3RDaGlsZCk7XG4gICAgICAgICAgICAgICAgZnJhZ21lbnQuYXBwZW5kQ2hpbGQobGFzdENoaWxkKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgZnJhZ21lbnQuYXBwZW5kQ2hpbGQoVXRpbC5zcGxpdE9mZkRPTVRyZWUobGFzdENoaWxkLCBlbmROb2RlLCB0cnVlKSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIEFkZCBmcmFnbWVudCBpbnRvIHBhc3NlZCBpbiBlbGVtZW50XG4gICAgICAgICAgICBuZXdFbGVtZW50LmFwcGVuZENoaWxkKGZyYWdtZW50KTtcblxuICAgICAgICAgICAgaWYgKGxhc3RDaGlsZC5wYXJlbnROb2RlID09PSByb290Tm9kZSkge1xuICAgICAgICAgICAgICAgIC8vIElmIGxhc3QgY2hpbGQgaXMgaW4gdGhlIHJvb3QsIGluc2VydCBuZXdFbGVtZW50IGluIGZyb250IG9mIGl0XG4gICAgICAgICAgICAgICAgcm9vdE5vZGUuaW5zZXJ0QmVmb3JlKG5ld0VsZW1lbnQsIGxhc3RDaGlsZCk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGFmdGVyTGFzdCkge1xuICAgICAgICAgICAgICAgIC8vIElmIGxhc3QgY2hpbGQgd2FzIHJlbW92ZWQsIGJ1dCBpdCBoYWQgYSBzaWJsaW5nLCBpbnNlcnQgaW4gZnJvbnQgb2YgaXRcbiAgICAgICAgICAgICAgICByb290Tm9kZS5pbnNlcnRCZWZvcmUobmV3RWxlbWVudCwgYWZ0ZXJMYXN0KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgLy8gbGFzdENoaWxkIHdhcyByZW1vdmVkIGFuZCB3YXMgdGhlIGxhc3QgYWN0dWFsIGVsZW1lbnQganVzdCBhcHBlbmRcbiAgICAgICAgICAgICAgICByb290Tm9kZS5hcHBlbmRDaGlsZChuZXdFbGVtZW50KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIG5ld0VsZW1lbnQuaGFzQ2hpbGROb2RlcygpO1xuICAgICAgICB9LFxuXG4gICAgICAgIC8qIGJhc2VkIG9uIGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9hLzYxODMwNjkgKi9cbiAgICAgICAgZGVwdGhPZk5vZGU6IGZ1bmN0aW9uIChpbk5vZGUpIHtcbiAgICAgICAgICAgIHZhciB0aGVEZXB0aCA9IDAsXG4gICAgICAgICAgICAgICAgbm9kZSA9IGluTm9kZTtcbiAgICAgICAgICAgIHdoaWxlIChub2RlLnBhcmVudE5vZGUgIT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICBub2RlID0gbm9kZS5wYXJlbnROb2RlO1xuICAgICAgICAgICAgICAgIHRoZURlcHRoKys7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdGhlRGVwdGg7XG4gICAgICAgIH0sXG5cbiAgICAgICAgZmluZENvbW1vblJvb3Q6IGZ1bmN0aW9uIChpbk5vZGUxLCBpbk5vZGUyKSB7XG4gICAgICAgICAgICB2YXIgZGVwdGgxID0gVXRpbC5kZXB0aE9mTm9kZShpbk5vZGUxKSxcbiAgICAgICAgICAgICAgICBkZXB0aDIgPSBVdGlsLmRlcHRoT2ZOb2RlKGluTm9kZTIpLFxuICAgICAgICAgICAgICAgIG5vZGUxID0gaW5Ob2RlMSxcbiAgICAgICAgICAgICAgICBub2RlMiA9IGluTm9kZTI7XG5cbiAgICAgICAgICAgIHdoaWxlIChkZXB0aDEgIT09IGRlcHRoMikge1xuICAgICAgICAgICAgICAgIGlmIChkZXB0aDEgPiBkZXB0aDIpIHtcbiAgICAgICAgICAgICAgICAgICAgbm9kZTEgPSBub2RlMS5wYXJlbnROb2RlO1xuICAgICAgICAgICAgICAgICAgICBkZXB0aDEgLT0gMTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBub2RlMiA9IG5vZGUyLnBhcmVudE5vZGU7XG4gICAgICAgICAgICAgICAgICAgIGRlcHRoMiAtPSAxO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgd2hpbGUgKG5vZGUxICE9PSBub2RlMikge1xuICAgICAgICAgICAgICAgIG5vZGUxID0gbm9kZTEucGFyZW50Tm9kZTtcbiAgICAgICAgICAgICAgICBub2RlMiA9IG5vZGUyLnBhcmVudE5vZGU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiBub2RlMTtcbiAgICAgICAgfSxcbiAgICAgICAgLyogRU5EIC0gYmFzZWQgb24gaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL2EvNjE4MzA2OSAqL1xuXG4gICAgICAgIGlzRWxlbWVudEF0QmVnaW5uaW5nT2ZCbG9jazogZnVuY3Rpb24gKG5vZGUpIHtcbiAgICAgICAgICAgIHZhciB0ZXh0VmFsLFxuICAgICAgICAgICAgICAgIHNpYmxpbmc7XG4gICAgICAgICAgICB3aGlsZSAoIVV0aWwuaXNCbG9ja0NvbnRhaW5lcihub2RlKSAmJiAhVXRpbC5pc01lZGl1bUVkaXRvckVsZW1lbnQobm9kZSkpIHtcbiAgICAgICAgICAgICAgICBzaWJsaW5nID0gbm9kZTtcbiAgICAgICAgICAgICAgICB3aGlsZSAoc2libGluZyA9IHNpYmxpbmcucHJldmlvdXNTaWJsaW5nKSB7XG4gICAgICAgICAgICAgICAgICAgIHRleHRWYWwgPSBzaWJsaW5nLm5vZGVUeXBlID09PSAzID8gc2libGluZy5ub2RlVmFsdWUgOiBzaWJsaW5nLnRleHRDb250ZW50O1xuICAgICAgICAgICAgICAgICAgICBpZiAodGV4dFZhbC5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgbm9kZSA9IG5vZGUucGFyZW50Tm9kZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9LFxuXG4gICAgICAgIGlzTWVkaXVtRWRpdG9yRWxlbWVudDogZnVuY3Rpb24gKGVsZW1lbnQpIHtcbiAgICAgICAgICAgIHJldHVybiBlbGVtZW50ICYmIGVsZW1lbnQuZ2V0QXR0cmlidXRlICYmICEhZWxlbWVudC5nZXRBdHRyaWJ1dGUoJ2RhdGEtbWVkaXVtLWVkaXRvci1lbGVtZW50Jyk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgZ2V0Q29udGFpbmVyRWRpdG9yRWxlbWVudDogZnVuY3Rpb24gKGVsZW1lbnQpIHtcbiAgICAgICAgICAgIHJldHVybiBVdGlsLnRyYXZlcnNlVXAoZWxlbWVudCwgZnVuY3Rpb24gKG5vZGUpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gVXRpbC5pc01lZGl1bUVkaXRvckVsZW1lbnQobm9kZSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSxcblxuICAgICAgICBpc0Jsb2NrQ29udGFpbmVyOiBmdW5jdGlvbiAoZWxlbWVudCkge1xuICAgICAgICAgICAgcmV0dXJuIGVsZW1lbnQgJiYgZWxlbWVudC5ub2RlVHlwZSAhPT0gMyAmJiBVdGlsLmJsb2NrQ29udGFpbmVyRWxlbWVudE5hbWVzLmluZGV4T2YoZWxlbWVudC5ub2RlTmFtZS50b0xvd2VyQ2FzZSgpKSAhPT0gLTE7XG4gICAgICAgIH0sXG5cbiAgICAgICAgLyogRmluZHMgdGhlIGNsb3Nlc3QgYW5jZXN0b3Igd2hpY2ggaXMgYSBibG9jayBjb250YWluZXIgZWxlbWVudFxuICAgICAgICAgKiBJZiBlbGVtZW50IGlzIHdpdGhpbiBlZGl0b3IgZWxlbWVudCBidXQgbm90IHdpdGhpbiBhbnkgb3RoZXIgYmxvY2sgZWxlbWVudCxcbiAgICAgICAgICogdGhlIGVkaXRvciBlbGVtZW50IGlzIHJldHVybmVkXG4gICAgICAgICAqL1xuICAgICAgICBnZXRDbG9zZXN0QmxvY2tDb250YWluZXI6IGZ1bmN0aW9uIChub2RlKSB7XG4gICAgICAgICAgICByZXR1cm4gVXRpbC50cmF2ZXJzZVVwKG5vZGUsIGZ1bmN0aW9uIChub2RlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFV0aWwuaXNCbG9ja0NvbnRhaW5lcihub2RlKSB8fCBVdGlsLmlzTWVkaXVtRWRpdG9yRWxlbWVudChub2RlKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9LFxuXG4gICAgICAgIC8qIEZpbmRzIGhpZ2hlc3QgbGV2ZWwgYW5jZXN0b3IgZWxlbWVudCB3aGljaCBpcyBhIGJsb2NrIGNvbnRhaW5lciBlbGVtZW50XG4gICAgICAgICAqIElmIGVsZW1lbnQgaXMgd2l0aGluIGVkaXRvciBlbGVtZW50IGJ1dCBub3Qgd2l0aGluIGFueSBvdGhlciBibG9jayBlbGVtZW50LFxuICAgICAgICAgKiB0aGUgZWRpdG9yIGVsZW1lbnQgaXMgcmV0dXJuZWRcbiAgICAgICAgICovXG4gICAgICAgIGdldFRvcEJsb2NrQ29udGFpbmVyOiBmdW5jdGlvbiAoZWxlbWVudCkge1xuICAgICAgICAgICAgdmFyIHRvcEJsb2NrID0gVXRpbC5pc0Jsb2NrQ29udGFpbmVyKGVsZW1lbnQpID8gZWxlbWVudCA6IGZhbHNlO1xuICAgICAgICAgICAgVXRpbC50cmF2ZXJzZVVwKGVsZW1lbnQsIGZ1bmN0aW9uIChlbCkge1xuICAgICAgICAgICAgICAgIGlmIChVdGlsLmlzQmxvY2tDb250YWluZXIoZWwpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRvcEJsb2NrID0gZWw7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICghdG9wQmxvY2sgJiYgVXRpbC5pc01lZGl1bUVkaXRvckVsZW1lbnQoZWwpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRvcEJsb2NrID0gZWw7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybiB0b3BCbG9jaztcbiAgICAgICAgfSxcblxuICAgICAgICBnZXRGaXJzdFNlbGVjdGFibGVMZWFmTm9kZTogZnVuY3Rpb24gKGVsZW1lbnQpIHtcbiAgICAgICAgICAgIHdoaWxlIChlbGVtZW50ICYmIGVsZW1lbnQuZmlyc3RDaGlsZCkge1xuICAgICAgICAgICAgICAgIGVsZW1lbnQgPSBlbGVtZW50LmZpcnN0Q2hpbGQ7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIFdlIGRvbid0IHdhbnQgdG8gc2V0IHRoZSBzZWxlY3Rpb24gdG8gYW4gZWxlbWVudCB0aGF0IGNhbid0IGhhdmUgY2hpbGRyZW4sIHRoaXMgbWVzc2VzIHVwIEdlY2tvLlxuICAgICAgICAgICAgZWxlbWVudCA9IFV0aWwudHJhdmVyc2VVcChlbGVtZW50LCBmdW5jdGlvbiAoZWwpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gVXRpbC5lbXB0eUVsZW1lbnROYW1lcy5pbmRleE9mKGVsLm5vZGVOYW1lLnRvTG93ZXJDYXNlKCkpID09PSAtMTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgLy8gU2VsZWN0aW5nIGF0IHRoZSBiZWdpbm5pbmcgb2YgYSB0YWJsZSBkb2Vzbid0IHdvcmsgaW4gUGhhbnRvbUpTLlxuICAgICAgICAgICAgaWYgKGVsZW1lbnQubm9kZU5hbWUudG9Mb3dlckNhc2UoKSA9PT0gJ3RhYmxlJykge1xuICAgICAgICAgICAgICAgIHZhciBmaXJzdENlbGwgPSBlbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJ3RoLCB0ZCcpO1xuICAgICAgICAgICAgICAgIGlmIChmaXJzdENlbGwpIHtcbiAgICAgICAgICAgICAgICAgICAgZWxlbWVudCA9IGZpcnN0Q2VsbDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gZWxlbWVudDtcbiAgICAgICAgfSxcblxuICAgICAgICAvLyBUT0RPOiByZW1vdmUgZ2V0Rmlyc3RUZXh0Tm9kZSBBTkQgX2dldEZpcnN0VGV4dE5vZGUgd2hlbiBqdW1waW5nIGluIDYuMC4wIChubyBjb2RlIHJlZmVyZW5jZXMpXG4gICAgICAgIGdldEZpcnN0VGV4dE5vZGU6IGZ1bmN0aW9uIChlbGVtZW50KSB7XG4gICAgICAgICAgICBVdGlsLndhcm4oJ2dldEZpcnN0VGV4dE5vZGUgaXMgZGVwcmVjYXRlZCBhbmQgd2lsbCBiZSByZW1vdmVkIGluIHZlcnNpb24gNi4wLjAnKTtcbiAgICAgICAgICAgIHJldHVybiBVdGlsLl9nZXRGaXJzdFRleHROb2RlKGVsZW1lbnQpO1xuICAgICAgICB9LFxuXG4gICAgICAgIF9nZXRGaXJzdFRleHROb2RlOiBmdW5jdGlvbiAoZWxlbWVudCkge1xuICAgICAgICAgICAgaWYgKGVsZW1lbnQubm9kZVR5cGUgPT09IDMpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZWxlbWVudDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBlbGVtZW50LmNoaWxkTm9kZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICB2YXIgdGV4dE5vZGUgPSBVdGlsLl9nZXRGaXJzdFRleHROb2RlKGVsZW1lbnQuY2hpbGROb2Rlc1tpXSk7XG4gICAgICAgICAgICAgICAgaWYgKHRleHROb2RlICE9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0ZXh0Tm9kZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfSxcblxuICAgICAgICBlbnN1cmVVcmxIYXNQcm90b2NvbDogZnVuY3Rpb24gKHVybCkge1xuICAgICAgICAgICAgaWYgKHVybC5pbmRleE9mKCc6Ly8nKSA9PT0gLTEpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gJ2h0dHA6Ly8nICsgdXJsO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHVybDtcbiAgICAgICAgfSxcblxuICAgICAgICB3YXJuOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBpZiAod2luZG93LmNvbnNvbGUgIT09IHVuZGVmaW5lZCAmJiB0eXBlb2Ygd2luZG93LmNvbnNvbGUud2FybiA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgICAgIHdpbmRvdy5jb25zb2xlLndhcm4uYXBwbHkod2luZG93LmNvbnNvbGUsIGFyZ3VtZW50cyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgZGVwcmVjYXRlZDogZnVuY3Rpb24gKG9sZE5hbWUsIG5ld05hbWUsIHZlcnNpb24pIHtcbiAgICAgICAgICAgIC8vIHNpbXBsZSBkZXByZWNhdGlvbiB3YXJuaW5nIG1lY2hhbmlzbS5cbiAgICAgICAgICAgIHZhciBtID0gb2xkTmFtZSArICcgaXMgZGVwcmVjYXRlZCwgcGxlYXNlIHVzZSAnICsgbmV3TmFtZSArICcgaW5zdGVhZC4nO1xuICAgICAgICAgICAgaWYgKHZlcnNpb24pIHtcbiAgICAgICAgICAgICAgICBtICs9ICcgV2lsbCBiZSByZW1vdmVkIGluICcgKyB2ZXJzaW9uO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgVXRpbC53YXJuKG0pO1xuICAgICAgICB9LFxuXG4gICAgICAgIGRlcHJlY2F0ZWRNZXRob2Q6IGZ1bmN0aW9uIChvbGROYW1lLCBuZXdOYW1lLCBhcmdzLCB2ZXJzaW9uKSB7XG4gICAgICAgICAgICAvLyBydW4gdGhlIHJlcGxhY2VtZW50IGFuZCB3YXJuIHdoZW4gc29tZW9uZSBjYWxscyBhIGRlcHJlY2F0ZWQgbWV0aG9kXG4gICAgICAgICAgICBVdGlsLmRlcHJlY2F0ZWQob2xkTmFtZSwgbmV3TmFtZSwgdmVyc2lvbik7XG4gICAgICAgICAgICBpZiAodHlwZW9mIHRoaXNbbmV3TmFtZV0gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgICAgICB0aGlzW25ld05hbWVdLmFwcGx5KHRoaXMsIGFyZ3MpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIGNsZWFudXBBdHRyczogZnVuY3Rpb24gKGVsLCBhdHRycykge1xuICAgICAgICAgICAgYXR0cnMuZm9yRWFjaChmdW5jdGlvbiAoYXR0cikge1xuICAgICAgICAgICAgICAgIGVsLnJlbW92ZUF0dHJpYnV0ZShhdHRyKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9LFxuXG4gICAgICAgIGNsZWFudXBUYWdzOiBmdW5jdGlvbiAoZWwsIHRhZ3MpIHtcbiAgICAgICAgICAgIHRhZ3MuZm9yRWFjaChmdW5jdGlvbiAodGFnKSB7XG4gICAgICAgICAgICAgICAgaWYgKGVsLm5vZGVOYW1lLnRvTG93ZXJDYXNlKCkgPT09IHRhZykge1xuICAgICAgICAgICAgICAgICAgICBlbC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKGVsKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSxcblxuICAgICAgICAvLyBnZXQgdGhlIGNsb3Nlc3QgcGFyZW50XG4gICAgICAgIGdldENsb3Nlc3RUYWc6IGZ1bmN0aW9uIChlbCwgdGFnKSB7XG4gICAgICAgICAgICByZXR1cm4gVXRpbC50cmF2ZXJzZVVwKGVsLCBmdW5jdGlvbiAoZWxlbWVudCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBlbGVtZW50Lm5vZGVOYW1lLnRvTG93ZXJDYXNlKCkgPT09IHRhZy50b0xvd2VyQ2FzZSgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgdW53cmFwOiBmdW5jdGlvbiAoZWwsIGRvYykge1xuICAgICAgICAgICAgdmFyIGZyYWdtZW50ID0gZG9jLmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKSxcbiAgICAgICAgICAgICAgICBub2RlcyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGVsLmNoaWxkTm9kZXMpO1xuXG4gICAgICAgICAgICAvLyBjYXN0IG5vZGVMaXN0IHRvIGFycmF5IHNpbmNlIGFwcGVuZGluZyBjaGlsZFxuICAgICAgICAgICAgLy8gdG8gYSBkaWZmZXJlbnQgbm9kZSB3aWxsIGFsdGVyIGxlbmd0aCBvZiBlbC5jaGlsZE5vZGVzXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IG5vZGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgZnJhZ21lbnQuYXBwZW5kQ2hpbGQobm9kZXNbaV0pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoZnJhZ21lbnQuY2hpbGROb2Rlcy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICBlbC5wYXJlbnROb2RlLnJlcGxhY2VDaGlsZChmcmFnbWVudCwgZWwpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBlbC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKGVsKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICBndWlkOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBmdW5jdGlvbiBfczQoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIE1hdGhcbiAgICAgICAgICAgICAgICAgICAgLmZsb29yKCgxICsgTWF0aC5yYW5kb20oKSkgKiAweDEwMDAwKVxuICAgICAgICAgICAgICAgICAgICAudG9TdHJpbmcoMTYpXG4gICAgICAgICAgICAgICAgICAgIC5zdWJzdHJpbmcoMSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiBfczQoKSArIF9zNCgpICsgJy0nICsgX3M0KCkgKyAnLScgKyBfczQoKSArICctJyArIF9zNCgpICsgJy0nICsgX3M0KCkgKyBfczQoKSArIF9zNCgpO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIE1lZGl1bUVkaXRvci51dGlsID0gVXRpbDtcbn0od2luZG93KSk7XG5cbihmdW5jdGlvbiAoKSB7XG4gICAgJ3VzZSBzdHJpY3QnO1xuXG4gICAgdmFyIEV4dGVuc2lvbiA9IGZ1bmN0aW9uIChvcHRpb25zKSB7XG4gICAgICAgIE1lZGl1bUVkaXRvci51dGlsLmV4dGVuZCh0aGlzLCBvcHRpb25zKTtcbiAgICB9O1xuXG4gICAgRXh0ZW5zaW9uLmV4dGVuZCA9IGZ1bmN0aW9uIChwcm90b1Byb3BzKSB7XG4gICAgICAgIC8vIG1hZ2ljIGV4dGVuZGVyIHRoaW5nZXIuIG1vc3RseSBib3Jyb3dlZCBmcm9tIGJhY2tib25lL2dvb2cuaW5oZXJpdHNcbiAgICAgICAgLy8gcGxhY2UgdGhpcyBmdW5jdGlvbiBvbiBzb21lIHRoaW5nIHlvdSB3YW50IGV4dGVuZC1hYmxlLlxuICAgICAgICAvL1xuICAgICAgICAvLyBleGFtcGxlOlxuICAgICAgICAvL1xuICAgICAgICAvLyAgICAgIGZ1bmN0aW9uIFRoaW5nKGFyZ3Mpe1xuICAgICAgICAvLyAgICAgICAgICB0aGlzLm9wdGlvbnMgPSBhcmdzO1xuICAgICAgICAvLyAgICAgIH1cbiAgICAgICAgLy9cbiAgICAgICAgLy8gICAgICBUaGluZy5wcm90b3R5cGUgPSB7IGZvbzogXCJiYXJcIiB9O1xuICAgICAgICAvLyAgICAgIFRoaW5nLmV4dGVuZCA9IGV4dGVuZGVyaWZ5O1xuICAgICAgICAvL1xuICAgICAgICAvLyAgICAgIHZhciBUaGluZ1R3byA9IFRoaW5nLmV4dGVuZCh7IGZvbzogXCJiYXpcIiB9KTtcbiAgICAgICAgLy9cbiAgICAgICAgLy8gICAgICB2YXIgdGhpbmdPbmUgPSBuZXcgVGhpbmcoKTsgLy8gZm9vID09PSBcImJhclwiXG4gICAgICAgIC8vICAgICAgdmFyIHRoaW5nVHdvID0gbmV3IFRoaW5nVHdvKCk7IC8vIGZvbyA9PT0gXCJiYXpcIlxuICAgICAgICAvL1xuICAgICAgICAvLyAgICAgIHdoaWNoIHNlZW1zIGxpa2Ugc29tZSBzaW1wbHkgc2hhbGxvdyBjb3B5IG5vbnNlbnNlXG4gICAgICAgIC8vICAgICAgYXQgZmlyc3QsIGJ1dCBhIGxvdCBtb3JlIGlzIGdvaW5nIG9uIHRoZXJlLlxuICAgICAgICAvL1xuICAgICAgICAvLyAgICAgIHBhc3NpbmcgYSBgY29uc3RydWN0b3JgIHRvIHRoZSBleHRlbmQgcHJvcHNcbiAgICAgICAgLy8gICAgICB3aWxsIGNhdXNlIHRoZSBpbnN0YW5jZSB0byBpbnN0YW50aWF0ZSB0aHJvdWdoIHRoYXRcbiAgICAgICAgLy8gICAgICBpbnN0ZWFkIG9mIHRoZSBwYXJlbnQncyBjb25zdHJ1Y3Rvci5cblxuICAgICAgICB2YXIgcGFyZW50ID0gdGhpcyxcbiAgICAgICAgICAgIGNoaWxkO1xuXG4gICAgICAgIC8vIFRoZSBjb25zdHJ1Y3RvciBmdW5jdGlvbiBmb3IgdGhlIG5ldyBzdWJjbGFzcyBpcyBlaXRoZXIgZGVmaW5lZCBieSB5b3VcbiAgICAgICAgLy8gKHRoZSBcImNvbnN0cnVjdG9yXCIgcHJvcGVydHkgaW4geW91ciBgZXh0ZW5kYCBkZWZpbml0aW9uKSwgb3IgZGVmYXVsdGVkXG4gICAgICAgIC8vIGJ5IHVzIHRvIHNpbXBseSBjYWxsIHRoZSBwYXJlbnQncyBjb25zdHJ1Y3Rvci5cblxuICAgICAgICBpZiAocHJvdG9Qcm9wcyAmJiBwcm90b1Byb3BzLmhhc093blByb3BlcnR5KCdjb25zdHJ1Y3RvcicpKSB7XG4gICAgICAgICAgICBjaGlsZCA9IHByb3RvUHJvcHMuY29uc3RydWN0b3I7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjaGlsZCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcGFyZW50LmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gZGFzIHN0YXRpY3MgKC5leHRlbmQgY29tZXMgb3Zlciwgc28geW91ciBzdWJjbGFzcyBjYW4gaGF2ZSBzdWJjbGFzc2VzIHRvbylcbiAgICAgICAgTWVkaXVtRWRpdG9yLnV0aWwuZXh0ZW5kKGNoaWxkLCBwYXJlbnQpO1xuXG4gICAgICAgIC8vIFNldCB0aGUgcHJvdG90eXBlIGNoYWluIHRvIGluaGVyaXQgZnJvbSBgcGFyZW50YCwgd2l0aG91dCBjYWxsaW5nXG4gICAgICAgIC8vIGBwYXJlbnRgJ3MgY29uc3RydWN0b3IgZnVuY3Rpb24uXG4gICAgICAgIHZhciBTdXJyb2dhdGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB0aGlzLmNvbnN0cnVjdG9yID0gY2hpbGQ7XG4gICAgICAgIH07XG4gICAgICAgIFN1cnJvZ2F0ZS5wcm90b3R5cGUgPSBwYXJlbnQucHJvdG90eXBlO1xuICAgICAgICBjaGlsZC5wcm90b3R5cGUgPSBuZXcgU3Vycm9nYXRlKCk7XG5cbiAgICAgICAgaWYgKHByb3RvUHJvcHMpIHtcbiAgICAgICAgICAgIE1lZGl1bUVkaXRvci51dGlsLmV4dGVuZChjaGlsZC5wcm90b3R5cGUsIHByb3RvUHJvcHMpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gdG9kbzogJHN1cGVyP1xuXG4gICAgICAgIHJldHVybiBjaGlsZDtcbiAgICB9O1xuXG4gICAgRXh0ZW5zaW9uLnByb3RvdHlwZSA9IHtcbiAgICAgICAgLyogaW5pdDogW2Z1bmN0aW9uXVxuICAgICAgICAgKlxuICAgICAgICAgKiBDYWxsZWQgYnkgTWVkaXVtRWRpdG9yIGR1cmluZyBpbml0aWFsaXphdGlvbi5cbiAgICAgICAgICogVGhlIC5iYXNlIHByb3BlcnR5IHdpbGwgYWxyZWFkeSBoYXZlIGJlZW4gc2V0IHRvXG4gICAgICAgICAqIGN1cnJlbnQgaW5zdGFuY2Ugb2YgTWVkaXVtRWRpdG9yIHdoZW4gdGhpcyBpcyBjYWxsZWQuXG4gICAgICAgICAqIEFsbCBoZWxwZXIgbWV0aG9kcyB3aWxsIGV4aXN0IGFzIHdlbGxcbiAgICAgICAgICovXG4gICAgICAgIGluaXQ6IGZ1bmN0aW9uICgpIHt9LFxuXG4gICAgICAgIC8qIGJhc2U6IFtNZWRpdW1FZGl0b3IgaW5zdGFuY2VdXG4gICAgICAgICAqXG4gICAgICAgICAqIElmIG5vdCBvdmVycmlkZW4sIHRoaXMgd2lsbCBiZSBzZXQgdG8gdGhlIGN1cnJlbnQgaW5zdGFuY2VcbiAgICAgICAgICogb2YgTWVkaXVtRWRpdG9yLCBiZWZvcmUgdGhlIGluaXQgbWV0aG9kIGlzIGNhbGxlZFxuICAgICAgICAgKi9cbiAgICAgICAgYmFzZTogdW5kZWZpbmVkLFxuXG4gICAgICAgIC8qIG5hbWU6IFtzdHJpbmddXG4gICAgICAgICAqXG4gICAgICAgICAqICduYW1lJyBvZiB0aGUgZXh0ZW5zaW9uLCB1c2VkIGZvciByZXRyaWV2aW5nIHRoZSBleHRlbnNpb24uXG4gICAgICAgICAqIElmIG5vdCBzZXQsIE1lZGl1bUVkaXRvciB3aWxsIHNldCB0aGlzIHRvIGJlIHRoZSBrZXlcbiAgICAgICAgICogdXNlZCB3aGVuIHBhc3NpbmcgdGhlIGV4dGVuc2lvbiBpbnRvIE1lZGl1bUVkaXRvciB2aWEgdGhlXG4gICAgICAgICAqICdleHRlbnNpb25zJyBvcHRpb25cbiAgICAgICAgICovXG4gICAgICAgIG5hbWU6IHVuZGVmaW5lZCxcblxuICAgICAgICAvKiBjaGVja1N0YXRlOiBbZnVuY3Rpb24gKG5vZGUpXVxuICAgICAgICAgKlxuICAgICAgICAgKiBJZiBpbXBsZW1lbnRlZCwgdGhpcyBmdW5jdGlvbiB3aWxsIGJlIGNhbGxlZCBvbmUgb3IgbW9yZSB0aW1lc1xuICAgICAgICAgKiB0aGUgc3RhdGUgb2YgdGhlIGVkaXRvciAmIHRvb2xiYXIgYXJlIHVwZGF0ZWQuXG4gICAgICAgICAqIFdoZW4gdGhlIHN0YXRlIGlzIHVwZGF0ZWQsIHRoZSBlZGl0b3IgZG9lcyB0aGUgZm9sbG93aW5nOlxuICAgICAgICAgKlxuICAgICAgICAgKiAxKSBGaW5kIHRoZSBwYXJlbnQgbm9kZSBjb250YWluaW5nIHRoZSBjdXJyZW50IHNlbGVjdGlvblxuICAgICAgICAgKiAyKSBDYWxsIGNoZWNrU3RhdGUgb24gdGhlIGV4dGVuc2lvbiwgcGFzc2luZyB0aGUgbm9kZSBhcyBhbiBhcmd1bWVudFxuICAgICAgICAgKiAzKSBHZXQgdGhlIHBhcmVudCBub2RlIG9mIHRoZSBwcmV2aW91cyBub2RlXG4gICAgICAgICAqIDQpIFJlcGVhdCBzdGVwcyAjMiBhbmQgIzMgdW50aWwgd2UgbW92ZSBvdXRzaWRlIHRoZSBwYXJlbnQgY29udGVudGVkaXRhYmxlXG4gICAgICAgICAqL1xuICAgICAgICBjaGVja1N0YXRlOiB1bmRlZmluZWQsXG5cbiAgICAgICAgLyogZGVzdHJveTogW2Z1bmN0aW9uICgpXVxuICAgICAgICAgKlxuICAgICAgICAgKiBUaGlzIG1ldGhvZCBzaG91bGQgcmVtb3ZlIGFueSBjcmVhdGVkIGh0bWwsIGN1c3RvbSBldmVudCBoYW5kbGVyc1xuICAgICAgICAgKiBvciBhbnkgb3RoZXIgY2xlYW51cCB0YXNrcyB0aGF0IHNob3VsZCBiZSBwZXJmb3JtZWQuXG4gICAgICAgICAqIElmIGltcGxlbWVudGVkLCB0aGlzIGZ1bmN0aW9uIHdpbGwgYmUgY2FsbGVkIHdoZW4gTWVkaXVtRWRpdG9yJ3NcbiAgICAgICAgICogZGVzdHJveSBtZXRob2QgaGFzIGJlZW4gY2FsbGVkLlxuICAgICAgICAgKi9cbiAgICAgICAgZGVzdHJveTogdW5kZWZpbmVkLFxuXG4gICAgICAgIC8qIEFzIGFsdGVybmF0aXZlcyB0byBjaGVja1N0YXRlLCB0aGVzZSBmdW5jdGlvbnMgcHJvdmlkZSBhIG1vcmUgc3RydWN0dXJlZFxuICAgICAgICAgKiBwYXRoIHRvIHVwZGF0aW5nIHRoZSBzdGF0ZSBvZiBhbiBleHRlbnNpb24gKHVzdWFsbHkgYSBidXR0b24pIHdoZW5ldmVyXG4gICAgICAgICAqIHRoZSBzdGF0ZSBvZiB0aGUgZWRpdG9yICYgdG9vbGJhciBhcmUgdXBkYXRlZC5cbiAgICAgICAgICovXG5cbiAgICAgICAgLyogcXVlcnlDb21tYW5kU3RhdGU6IFtmdW5jdGlvbiAoKV1cbiAgICAgICAgICpcbiAgICAgICAgICogSWYgaW1wbGVtZW50ZWQsIHRoaXMgZnVuY3Rpb24gd2lsbCBiZSBjYWxsZWQgb25jZSBvbiBlYWNoIGV4dGVuc2lvblxuICAgICAgICAgKiB3aGVuIHRoZSBzdGF0ZSBvZiB0aGUgZWRpdG9yL3Rvb2xiYXIgaXMgYmVpbmcgdXBkYXRlZC5cbiAgICAgICAgICpcbiAgICAgICAgICogSWYgdGhpcyBmdW5jdGlvbiByZXR1cm5zIGEgbm9uLW51bGwgdmFsdWUsIHRoZSBleHRlbnNpb24gd2lsbFxuICAgICAgICAgKiBiZSBpZ25vcmVkIGFzIHRoZSBjb2RlIGNsaW1icyB0aGUgZG9tIHRyZWUuXG4gICAgICAgICAqXG4gICAgICAgICAqIElmIHRoaXMgZnVuY3Rpb24gcmV0dXJucyB0cnVlLCBhbmQgdGhlIHNldEFjdGl2ZSgpIGZ1bmN0aW9uIGlzIGRlZmluZWRcbiAgICAgICAgICogc2V0QWN0aXZlKCkgd2lsbCBiZSBjYWxsZWRcbiAgICAgICAgICovXG4gICAgICAgIHF1ZXJ5Q29tbWFuZFN0YXRlOiB1bmRlZmluZWQsXG5cbiAgICAgICAgLyogaXNBY3RpdmU6IFtmdW5jdGlvbiAoKV1cbiAgICAgICAgICpcbiAgICAgICAgICogSWYgaW1wbGVtZW50ZWQsIHRoaXMgZnVuY3Rpb24gd2lsbCBiZSBjYWxsZWQgd2hlbiBNZWRpdW1FZGl0b3JcbiAgICAgICAgICogaGFzIGRldGVybWluZWQgdGhhdCB0aGlzIGV4dGVuc2lvbiBpcyAnYWN0aXZlJyBmb3IgdGhlIGN1cnJlbnQgc2VsZWN0aW9uLlxuICAgICAgICAgKiBUaGlzIG1heSBiZSBjYWxsZWQgd2hlbiB0aGUgZWRpdG9yICYgdG9vbGJhciBhcmUgYmVpbmcgdXBkYXRlZCxcbiAgICAgICAgICogYnV0IG9ubHkgaWYgcXVlcnlDb21tYW5kU3RhdGUoKSBvciBpc0FscmVhZHlBcHBsaWVkKCkgZnVuY3Rpb25zXG4gICAgICAgICAqIGFyZSBpbXBsZW1lbnRlZCwgYW5kIHdoZW4gY2FsbGVkLCByZXR1cm4gdHJ1ZS5cbiAgICAgICAgICovXG4gICAgICAgIGlzQWN0aXZlOiB1bmRlZmluZWQsXG5cbiAgICAgICAgLyogaXNBbHJlYWR5QXBwbGllZDogW2Z1bmN0aW9uIChub2RlKV1cbiAgICAgICAgICpcbiAgICAgICAgICogSWYgaW1wbGVtZW50ZWQsIHRoaXMgZnVuY3Rpb24gaXMgc2ltaWxhciB0byBjaGVja1N0YXRlKCkgaW5cbiAgICAgICAgICogdGhhdCBpdCB3aWxsIGJlIGNhbGxlZCByZXBlYXRlZGx5IGFzIE1lZGl1bUVkaXRvciBtb3ZlcyB1cFxuICAgICAgICAgKiB0aGUgRE9NIHRvIHVwZGF0ZSB0aGUgZWRpdG9yICYgdG9vbGJhciBhZnRlciBhIHN0YXRlIGNoYW5nZS5cbiAgICAgICAgICpcbiAgICAgICAgICogTk9URTogVGhpcyBmdW5jdGlvbiB3aWxsIE5PVCBiZSBjYWxsZWQgaWYgY2hlY2tTdGF0ZSgpIGhhc1xuICAgICAgICAgKiBiZWVuIGltcGxlbWVudGVkLiBUaGlzIGZ1bmN0aW9uIHdpbGwgTk9UIGJlIGNhbGxlZCBpZlxuICAgICAgICAgKiBxdWVyeUNvbW1hbmRTdGF0ZSgpIGlzIGltcGxlbWVudGVkIGFuZCByZXR1cm5zIGEgbm9uLW51bGxcbiAgICAgICAgICogdmFsdWUgd2hlbiBjYWxsZWRcbiAgICAgICAgICovXG4gICAgICAgIGlzQWxyZWFkeUFwcGxpZWQ6IHVuZGVmaW5lZCxcblxuICAgICAgICAvKiBzZXRBY3RpdmU6IFtmdW5jdGlvbiAoKV1cbiAgICAgICAgICpcbiAgICAgICAgICogSWYgaW1wbGVtZW50ZWQsIHRoaXMgZnVuY3Rpb24gaXMgY2FsbGVkIHdoZW4gTWVkaXVtRWRpdG9yIGtub3dzXG4gICAgICAgICAqIHRoYXQgdGhpcyBleHRlbnNpb24gaXMgY3VycmVudGx5IGVuYWJsZWQuICBDdXJyZW50bHksIHRoaXNcbiAgICAgICAgICogZnVuY3Rpb24gaXMgY2FsbGVkIHdoZW4gdXBkYXRpbmcgdGhlIGVkaXRvciAmIHRvb2xiYXIsIGFuZFxuICAgICAgICAgKiBvbmx5IGlmIHF1ZXJ5Q29tbWFuZFN0YXRlKCkgb3IgaXNBbHJlYWR5QXBwbGllZChub2RlKSByZXR1cm5cbiAgICAgICAgICogdHJ1ZSB3aGVuIGNhbGxlZFxuICAgICAgICAgKi9cbiAgICAgICAgc2V0QWN0aXZlOiB1bmRlZmluZWQsXG5cbiAgICAgICAgLyogc2V0SW5hY3RpdmU6IFtmdW5jdGlvbiAoKV1cbiAgICAgICAgICpcbiAgICAgICAgICogSWYgaW1wbGVtZW50ZWQsIHRoaXMgZnVuY3Rpb24gaXMgY2FsbGVkIHdoZW4gTWVkaXVtRWRpdG9yIGtub3dzXG4gICAgICAgICAqIHRoYXQgdGhpcyBleHRlbnNpb24gaXMgY3VycmVudGx5IGRpc2FibGVkLiAgQ3VyZW50bHksIHRoaXNcbiAgICAgICAgICogaXMgY2FsbGVkIGF0IHRoZSBiZWdpbm5pbmcgb2YgZWFjaCBzdGF0ZSBjaGFuZ2UgZm9yXG4gICAgICAgICAqIHRoZSBlZGl0b3IgJiB0b29sYmFyLiBBZnRlciBjYWxsaW5nIHRoaXMsIE1lZGl1bUVkaXRvclxuICAgICAgICAgKiB3aWxsIGF0dGVtcHQgdG8gdXBkYXRlIHRoZSBleHRlbnNpb24sIGVpdGhlciB2aWEgY2hlY2tTdGF0ZSgpXG4gICAgICAgICAqIG9yIHRoZSBjb21iaW5hdGlvbiBvZiBxdWVyeUNvbW1hbmRTdGF0ZSgpLCBpc0FscmVhZHlBcHBsaWVkKG5vZGUpLFxuICAgICAgICAgKiBpc0FjdGl2ZSgpLCBhbmQgc2V0QWN0aXZlKClcbiAgICAgICAgICovXG4gICAgICAgIHNldEluYWN0aXZlOiB1bmRlZmluZWQsXG5cbiAgICAgICAgLyogZ2V0SW50ZXJhY3Rpb25FbGVtZW50czogW2Z1bmN0aW9uICgpXVxuICAgICAgICAgKlxuICAgICAgICAgKiBJZiB0aGUgZXh0ZW5zaW9uIHJlbmRlcnMgYW55IGVsZW1lbnRzIHRoYXQgdGhlIHVzZXIgY2FuIGludGVyYWN0IHdpdGgsXG4gICAgICAgICAqIHRoaXMgbWV0aG9kIHNob3VsZCBiZSBpbXBsZW1lbnRlZCBhbmQgcmV0dXJuIHRoZSByb290IGVsZW1lbnQgb3IgYW4gYXJyYXlcbiAgICAgICAgICogY29udGFpbmluZyBhbGwgb2YgdGhlIHJvb3QgZWxlbWVudHMuIE1lZGl1bUVkaXRvciB3aWxsIGNhbGwgdGhpcyBmdW5jdGlvblxuICAgICAgICAgKiBkdXJpbmcgaW50ZXJhY3Rpb24gdG8gc2VlIGlmIHRoZSB1c2VyIGNsaWNrZWQgb24gc29tZXRoaW5nIG91dHNpZGUgb2YgdGhlIGVkaXRvci5cbiAgICAgICAgICogVGhlIGVsZW1lbnRzIGFyZSB1c2VkIHRvIGNoZWNrIGlmIHRoZSB0YXJnZXQgZWxlbWVudCBvZiBhIGNsaWNrIG9yXG4gICAgICAgICAqIG90aGVyIHVzZXIgZXZlbnQgaXMgYSBkZXNjZW5kYW50IG9mIGFueSBleHRlbnNpb24gZWxlbWVudHMuXG4gICAgICAgICAqIFRoaXMgd2F5LCB0aGUgZWRpdG9yIGNhbiBhbHNvIGNvdW50IHVzZXIgaW50ZXJhY3Rpb24gd2l0aGluIGVkaXRvciBlbGVtZW50cyBhc1xuICAgICAgICAgKiBpbnRlcmFjdGlvbnMgd2l0aCB0aGUgZWRpdG9yLCBhbmQgdGh1cyBub3QgdHJpZ2dlciAnYmx1cidcbiAgICAgICAgICovXG4gICAgICAgIGdldEludGVyYWN0aW9uRWxlbWVudHM6IHVuZGVmaW5lZCxcblxuICAgICAgICAvKioqKioqKioqKioqKioqKioqKioqKioqIEhlbHBlcnMgKioqKioqKioqKioqKioqKioqKioqKioqXG4gICAgICAgICAqIFRoZSBmb2xsb3dpbmcgYXJlIGhlbHBlcnMgdGhhdCBhcmUgZWl0aGVyIHNldCBieSBNZWRpdW1FZGl0b3JcbiAgICAgICAgICogZHVyaW5nIGluaXRpYWxpemF0aW9uLCBvciBhcmUgaGVscGVyIG1ldGhvZHMgd2hpY2ggZWl0aGVyXG4gICAgICAgICAqIHJvdXRlIGNhbGxzIHRvIHRoZSBNZWRpdW1FZGl0b3IgaW5zdGFuY2Ugb3IgcHJvdmlkZSBjb21tb25cbiAgICAgICAgICogZnVuY3Rpb25hbGl0eSBmb3IgYWxsIGV4dGVuc2lvbnNcbiAgICAgICAgICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblxuICAgICAgICAvKiB3aW5kb3c6IFtXaW5kb3ddXG4gICAgICAgICAqXG4gICAgICAgICAqIElmIG5vdCBvdmVycmlkZW4sIHRoaXMgd2lsbCBiZSBzZXQgdG8gdGhlIHdpbmRvdyBvYmplY3RcbiAgICAgICAgICogdG8gYmUgdXNlZCBieSBNZWRpdW1FZGl0b3IgYW5kIGl0cyBleHRlbnNpb25zLiAgVGhpcyBpc1xuICAgICAgICAgKiBwYXNzZWQgdmlhIHRoZSAnY29udGVudFdpbmRvdycgb3B0aW9uIHRvIE1lZGl1bUVkaXRvclxuICAgICAgICAgKiBhbmQgaXMgdGhlIGdsb2JhbCAnd2luZG93JyBvYmplY3QgYnkgZGVmYXVsdFxuICAgICAgICAgKi9cbiAgICAgICAgJ3dpbmRvdyc6IHVuZGVmaW5lZCxcblxuICAgICAgICAvKiBkb2N1bWVudDogW0RvY3VtZW50XVxuICAgICAgICAgKlxuICAgICAgICAgKiBJZiBub3Qgb3ZlcnJpZGVuLCB0aGlzIHdpbGwgYmUgc2V0IHRvIHRoZSBkb2N1bWVudCBvYmplY3RcbiAgICAgICAgICogdG8gYmUgdXNlZCBieSBNZWRpdW1FZGl0b3IgYW5kIGl0cyBleHRlbnNpb25zLiBUaGlzIGlzXG4gICAgICAgICAqIHBhc3NlZCB2aWEgdGhlICdvd25lckRvY3VtZW50JyBvcHRpbiB0byBNZWRpdW1FZGl0b3JcbiAgICAgICAgICogYW5kIGlzIHRoZSBnbG9iYWwgJ2RvY3VtZW50JyBvYmplY3QgYnkgZGVmYXVsdFxuICAgICAgICAgKi9cbiAgICAgICAgJ2RvY3VtZW50JzogdW5kZWZpbmVkLFxuXG4gICAgICAgIC8qIGdldEVkaXRvckVsZW1lbnRzOiBbZnVuY3Rpb24gKCldXG4gICAgICAgICAqXG4gICAgICAgICAqIEhlbHBlciBmdW5jdGlvbiB3aGljaCByZXR1cm5zIGFuIGFycmF5IGNvbnRhaW5pbmdcbiAgICAgICAgICogYWxsIHRoZSBjb250ZW50ZWRpdGFibGUgZWxlbWVudHMgZm9yIHRoaXMgaW5zdGFuY2VcbiAgICAgICAgICogb2YgTWVkaXVtRWRpdG9yXG4gICAgICAgICAqL1xuICAgICAgICBnZXRFZGl0b3JFbGVtZW50czogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuYmFzZS5lbGVtZW50cztcbiAgICAgICAgfSxcblxuICAgICAgICAvKiBnZXRFZGl0b3JJZDogW2Z1bmN0aW9uICgpXVxuICAgICAgICAgKlxuICAgICAgICAgKiBIZWxwZXIgZnVuY3Rpb24gd2hpY2ggcmV0dXJucyBhIHVuaXF1ZSBpZGVudGlmaWVyXG4gICAgICAgICAqIGZvciB0aGlzIGluc3RhbmNlIG9mIE1lZGl1bUVkaXRvclxuICAgICAgICAgKi9cbiAgICAgICAgZ2V0RWRpdG9ySWQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmJhc2UuaWQ7XG4gICAgICAgIH0sXG5cbiAgICAgICAgLyogZ2V0RWRpdG9yT3B0aW9uczogW2Z1bmN0aW9uIChvcHRpb24pXVxuICAgICAgICAgKlxuICAgICAgICAgKiBIZWxwZXIgZnVuY3Rpb24gd2hpY2ggcmV0dXJucyB0aGUgdmFsdWUgb2YgYW4gb3B0aW9uXG4gICAgICAgICAqIHVzZWQgdG8gaW5pdGlhbGl6ZSB0aGlzIGluc3RhbmNlIG9mIE1lZGl1bUVkaXRvclxuICAgICAgICAgKi9cbiAgICAgICAgZ2V0RWRpdG9yT3B0aW9uOiBmdW5jdGlvbiAob3B0aW9uKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5iYXNlLm9wdGlvbnNbb3B0aW9uXTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICAvKiBMaXN0IG9mIG1ldGhvZCBuYW1lcyB0byBhZGQgdG8gdGhlIHByb3RvdHlwZSBvZiBFeHRlbnNpb25cbiAgICAgKiBFYWNoIG9mIHRoZXNlIG1ldGhvZHMgd2lsbCBiZSBkZWZpbmVkIGFzIGhlbHBlcnMgdGhhdFxuICAgICAqIGp1c3QgY2FsbCBkaXJlY3RseSBpbnRvIHRoZSBNZWRpdW1FZGl0b3IgaW5zdGFuY2UuXG4gICAgICpcbiAgICAgKiBleGFtcGxlIGZvciAnb24nIG1ldGhvZDpcbiAgICAgKiBFeHRlbnNpb24ucHJvdG90eXBlLm9uID0gZnVuY3Rpb24gKCkge1xuICAgICAqICAgICByZXR1cm4gdGhpcy5iYXNlLm9uLmFwcGx5KHRoaXMuYmFzZSwgYXJndW1lbnRzKTtcbiAgICAgKiB9XG4gICAgICovXG4gICAgW1xuICAgICAgICAvLyBnZW5lcmFsIGhlbHBlcnNcbiAgICAgICAgJ2V4ZWNBY3Rpb24nLFxuXG4gICAgICAgIC8vIGV2ZW50IGhhbmRsaW5nXG4gICAgICAgICdvbicsXG4gICAgICAgICdvZmYnLFxuICAgICAgICAnc3Vic2NyaWJlJyxcbiAgICAgICAgJ3RyaWdnZXInXG5cbiAgICBdLmZvckVhY2goZnVuY3Rpb24gKGhlbHBlcikge1xuICAgICAgICBFeHRlbnNpb24ucHJvdG90eXBlW2hlbHBlcl0gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5iYXNlW2hlbHBlcl0uYXBwbHkodGhpcy5iYXNlLCBhcmd1bWVudHMpO1xuICAgICAgICB9O1xuICAgIH0pO1xuXG4gICAgTWVkaXVtRWRpdG9yLkV4dGVuc2lvbiA9IEV4dGVuc2lvbjtcbn0pKCk7XG5cbihmdW5jdGlvbiAoKSB7XG4gICAgJ3VzZSBzdHJpY3QnO1xuXG4gICAgZnVuY3Rpb24gZmlsdGVyT25seVBhcmVudEVsZW1lbnRzKG5vZGUpIHtcbiAgICAgICAgaWYgKE1lZGl1bUVkaXRvci51dGlsLmlzQmxvY2tDb250YWluZXIobm9kZSkpIHtcbiAgICAgICAgICAgIHJldHVybiBOb2RlRmlsdGVyLkZJTFRFUl9BQ0NFUFQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gTm9kZUZpbHRlci5GSUxURVJfU0tJUDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHZhciBTZWxlY3Rpb24gPSB7XG4gICAgICAgIGZpbmRNYXRjaGluZ1NlbGVjdGlvblBhcmVudDogZnVuY3Rpb24gKHRlc3RFbGVtZW50RnVuY3Rpb24sIGNvbnRlbnRXaW5kb3cpIHtcbiAgICAgICAgICAgIHZhciBzZWxlY3Rpb24gPSBjb250ZW50V2luZG93LmdldFNlbGVjdGlvbigpLFxuICAgICAgICAgICAgICAgIHJhbmdlLFxuICAgICAgICAgICAgICAgIGN1cnJlbnQ7XG5cbiAgICAgICAgICAgIGlmIChzZWxlY3Rpb24ucmFuZ2VDb3VudCA9PT0gMCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmFuZ2UgPSBzZWxlY3Rpb24uZ2V0UmFuZ2VBdCgwKTtcbiAgICAgICAgICAgIGN1cnJlbnQgPSByYW5nZS5jb21tb25BbmNlc3RvckNvbnRhaW5lcjtcblxuICAgICAgICAgICAgcmV0dXJuIE1lZGl1bUVkaXRvci51dGlsLnRyYXZlcnNlVXAoY3VycmVudCwgdGVzdEVsZW1lbnRGdW5jdGlvbik7XG4gICAgICAgIH0sXG5cbiAgICAgICAgZ2V0U2VsZWN0aW9uRWxlbWVudDogZnVuY3Rpb24gKGNvbnRlbnRXaW5kb3cpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmZpbmRNYXRjaGluZ1NlbGVjdGlvblBhcmVudChmdW5jdGlvbiAoZWwpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gTWVkaXVtRWRpdG9yLnV0aWwuaXNNZWRpdW1FZGl0b3JFbGVtZW50KGVsKTtcbiAgICAgICAgICAgIH0sIGNvbnRlbnRXaW5kb3cpO1xuICAgICAgICB9LFxuXG4gICAgICAgIC8vIGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvMTc2Nzg4NDMvY2FudC1yZXN0b3JlLXNlbGVjdGlvbi1hZnRlci1odG1sLW1vZGlmeS1ldmVuLWlmLWl0cy10aGUtc2FtZS1odG1sXG4gICAgICAgIC8vIFRpbSBEb3duXG4gICAgICAgIGV4cG9ydFNlbGVjdGlvbjogZnVuY3Rpb24gKHJvb3QsIGRvYykge1xuICAgICAgICAgICAgaWYgKCFyb290KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHZhciBzZWxlY3Rpb25TdGF0ZSA9IG51bGwsXG4gICAgICAgICAgICAgICAgc2VsZWN0aW9uID0gZG9jLmdldFNlbGVjdGlvbigpO1xuXG4gICAgICAgICAgICBpZiAoc2VsZWN0aW9uLnJhbmdlQ291bnQgPiAwKSB7XG4gICAgICAgICAgICAgICAgdmFyIHJhbmdlID0gc2VsZWN0aW9uLmdldFJhbmdlQXQoMCksXG4gICAgICAgICAgICAgICAgICAgIHByZVNlbGVjdGlvblJhbmdlID0gcmFuZ2UuY2xvbmVSYW5nZSgpLFxuICAgICAgICAgICAgICAgICAgICBzdGFydDtcblxuICAgICAgICAgICAgICAgIHByZVNlbGVjdGlvblJhbmdlLnNlbGVjdE5vZGVDb250ZW50cyhyb290KTtcbiAgICAgICAgICAgICAgICBwcmVTZWxlY3Rpb25SYW5nZS5zZXRFbmQocmFuZ2Uuc3RhcnRDb250YWluZXIsIHJhbmdlLnN0YXJ0T2Zmc2V0KTtcbiAgICAgICAgICAgICAgICBzdGFydCA9IHByZVNlbGVjdGlvblJhbmdlLnRvU3RyaW5nKCkubGVuZ3RoO1xuXG4gICAgICAgICAgICAgICAgc2VsZWN0aW9uU3RhdGUgPSB7XG4gICAgICAgICAgICAgICAgICAgIHN0YXJ0OiBzdGFydCxcbiAgICAgICAgICAgICAgICAgICAgZW5kOiBzdGFydCArIHJhbmdlLnRvU3RyaW5nKCkubGVuZ3RoXG4gICAgICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgICAgIC8vIENoZWNrIHRvIHNlZSBpZiB0aGUgc2VsZWN0aW9uIHN0YXJ0cyB3aXRoIGFueSBpbWFnZXNcbiAgICAgICAgICAgICAgICAvLyBpZiBzbyB3ZSBuZWVkIHRvIG1ha2Ugc3VyZSB0aGUgdGhlIGJlZ2lubmluZyBvZiB0aGUgc2VsZWN0aW9uIGlzXG4gICAgICAgICAgICAgICAgLy8gc2V0IGNvcnJlY3RseSB3aGVuIGltcG9ydGluZyBzZWxlY3Rpb25cbiAgICAgICAgICAgICAgICBpZiAodGhpcy5kb2VzUmFuZ2VTdGFydFdpdGhJbWFnZXMocmFuZ2UsIGRvYykpIHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0aW9uU3RhdGUuc3RhcnRzV2l0aEltYWdlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAvLyBDaGVjayB0byBzZWUgaWYgdGhlIHNlbGVjdGlvbiBoYXMgYW55IHRyYWlsaW5nIGltYWdlc1xuICAgICAgICAgICAgICAgIC8vIGlmIHNvLCB0aGlzIHRoaXMgbWVhbnMgd2UgbmVlZCB0byBsb29rIGZvciB0aGVtIHdoZW4gd2UgaW1wb3J0IHNlbGVjdGlvblxuICAgICAgICAgICAgICAgIHZhciB0cmFpbGluZ0ltYWdlQ291bnQgPSB0aGlzLmdldFRyYWlsaW5nSW1hZ2VDb3VudChyb290LCBzZWxlY3Rpb25TdGF0ZSwgcmFuZ2UuZW5kQ29udGFpbmVyLCByYW5nZS5lbmRPZmZzZXQpO1xuICAgICAgICAgICAgICAgIGlmICh0cmFpbGluZ0ltYWdlQ291bnQpIHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0aW9uU3RhdGUudHJhaWxpbmdJbWFnZUNvdW50ID0gdHJhaWxpbmdJbWFnZUNvdW50O1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIC8vIElmIHN0YXJ0ID0gMCB0aGVyZSBtYXkgc3RpbGwgYmUgYW4gZW1wdHkgcGFyYWdyYXBoIGJlZm9yZSBpdCwgYnV0IHdlIGRvbid0IGNhcmUuXG4gICAgICAgICAgICAgICAgaWYgKHN0YXJ0ICE9PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBlbXB0eUJsb2Nrc0luZGV4ID0gdGhpcy5nZXRJbmRleFJlbGF0aXZlVG9BZGphY2VudEVtcHR5QmxvY2tzKGRvYywgcm9vdCwgcmFuZ2Uuc3RhcnRDb250YWluZXIsIHJhbmdlLnN0YXJ0T2Zmc2V0KTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGVtcHR5QmxvY2tzSW5kZXggIT09IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxlY3Rpb25TdGF0ZS5lbXB0eUJsb2Nrc0luZGV4ID0gZW1wdHlCbG9ja3NJbmRleDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIHNlbGVjdGlvblN0YXRlO1xuICAgICAgICB9LFxuXG4gICAgICAgIC8vIGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvMTc2Nzg4NDMvY2FudC1yZXN0b3JlLXNlbGVjdGlvbi1hZnRlci1odG1sLW1vZGlmeS1ldmVuLWlmLWl0cy10aGUtc2FtZS1odG1sXG4gICAgICAgIC8vIFRpbSBEb3duXG4gICAgICAgIC8vXG4gICAgICAgIC8vIHtvYmplY3R9IHNlbGVjdGlvblN0YXRlIC0gdGhlIHNlbGVjdGlvbiB0byBpbXBvcnRcbiAgICAgICAgLy8ge0RPTUVsZW1lbnR9IHJvb3QgLSB0aGUgcm9vdCBlbGVtZW50IHRoZSBzZWxlY3Rpb24gaXMgYmVpbmcgcmVzdG9yZWQgaW5zaWRlIG9mXG4gICAgICAgIC8vIHtEb2N1bWVudH0gZG9jIC0gdGhlIGRvY3VtZW50IHRvIHVzZSBmb3IgbWFuYWdpbmcgc2VsZWN0aW9uXG4gICAgICAgIC8vIHtib29sZWFufSBbZmF2b3JMYXRlclNlbGVjdGlvbkFuY2hvcl0gLSBkZWZhdWx0cyB0byBmYWxzZS4gSWYgdHJ1ZSwgaW1wb3J0IHRoZSBjdXJzb3IgaW1tZWRpYXRlbHlcbiAgICAgICAgLy8gICAgICBzdWJzZXF1ZW50IHRvIGFuIGFuY2hvciB0YWcgaWYgaXQgd291bGQgb3RoZXJ3aXNlIGJlIHBsYWNlZCByaWdodCBhdCB0aGUgdHJhaWxpbmcgZWRnZSBpbnNpZGUgdGhlXG4gICAgICAgIC8vICAgICAgYW5jaG9yLiBUaGlzIGN1cnNvciBwb3NpdGlvbmluZywgZXZlbiB0aG91Z2ggdmlzdWFsbHkgZXF1aXZhbGVudCB0byB0aGUgdXNlciwgY2FuIGFmZmVjdCBiZWhhdmlvclxuICAgICAgICAvLyAgICAgIGluIE1TIElFLlxuICAgICAgICBpbXBvcnRTZWxlY3Rpb246IGZ1bmN0aW9uIChzZWxlY3Rpb25TdGF0ZSwgcm9vdCwgZG9jLCBmYXZvckxhdGVyU2VsZWN0aW9uQW5jaG9yKSB7XG4gICAgICAgICAgICBpZiAoIXNlbGVjdGlvblN0YXRlIHx8ICFyb290KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB2YXIgcmFuZ2UgPSBkb2MuY3JlYXRlUmFuZ2UoKTtcbiAgICAgICAgICAgIHJhbmdlLnNldFN0YXJ0KHJvb3QsIDApO1xuICAgICAgICAgICAgcmFuZ2UuY29sbGFwc2UodHJ1ZSk7XG5cbiAgICAgICAgICAgIHZhciBub2RlID0gcm9vdCxcbiAgICAgICAgICAgICAgICBub2RlU3RhY2sgPSBbXSxcbiAgICAgICAgICAgICAgICBjaGFySW5kZXggPSAwLFxuICAgICAgICAgICAgICAgIGZvdW5kU3RhcnQgPSBmYWxzZSxcbiAgICAgICAgICAgICAgICBmb3VuZEVuZCA9IGZhbHNlLFxuICAgICAgICAgICAgICAgIHRyYWlsaW5nSW1hZ2VDb3VudCA9IDAsXG4gICAgICAgICAgICAgICAgc3RvcCA9IGZhbHNlLFxuICAgICAgICAgICAgICAgIG5leHRDaGFySW5kZXgsXG4gICAgICAgICAgICAgICAgYWxsb3dSYW5nZVRvU3RhcnRBdEVuZE9mTm9kZSA9IGZhbHNlLFxuICAgICAgICAgICAgICAgIGxhc3RUZXh0Tm9kZSA9IG51bGw7XG5cbiAgICAgICAgICAgIC8vIFdoZW4gaW1wb3J0aW5nIHNlbGVjdGlvbiwgdGhlIHN0YXJ0IG9mIHRoZSBzZWxlY3Rpb24gbWF5IGxpZSBhdCB0aGUgZW5kIG9mIGFuIGVsZW1lbnRcbiAgICAgICAgICAgIC8vIG9yIGF0IHRoZSBiZWdpbm5pbmcgb2YgYW4gZWxlbWVudC4gIFNpbmNlIHZpc3VhbGx5IHRoZXJlIGlzIG5vIGRpZmZlcmVuY2UgYmV0d2VlbiB0aGVzZSAyXG4gICAgICAgICAgICAvLyB3ZSB3aWxsIHRyeSB0byBtb3ZlIHRoZSBzZWxlY3Rpb24gdG8gdGhlIGJlZ2lubmluZyBvZiBhbiBlbGVtZW50IHNpbmNlIHRoaXMgaXMgZ2VuZXJhbGx5XG4gICAgICAgICAgICAvLyB3aGF0IHVzZXJzIHdpbGwgZXhwZWN0IGFuZCBpdCdzIGEgbW9yZSBwcmVkaWN0YWJsZSBiZWhhdmlvci5cbiAgICAgICAgICAgIC8vXG4gICAgICAgICAgICAvLyBIb3dldmVyLCB0aGVyZSBhcmUgc29tZSBzcGVjaWZpYyBjYXNlcyB3aGVuIHdlIGRvbid0IHdhbnQgdG8gZG8gdGhpczpcbiAgICAgICAgICAgIC8vICAxKSBXZSdyZSBhdHRlbXB0aW5nIHRvIG1vdmUgdGhlIGN1cnNvciBvdXRzaWRlIG9mIHRoZSBlbmQgb2YgYW4gYW5jaG9yIFtmYXZvckxhdGVyU2VsZWN0aW9uQW5jaG9yID0gdHJ1ZV1cbiAgICAgICAgICAgIC8vICAyKSBUaGUgc2VsZWN0aW9uIHN0YXJ0cyB3aXRoIGFuIGltYWdlLCB3aGljaCBpcyBzcGVjaWFsIHNpbmNlIGFuIGltYWdlIGRvZXNuJ3QgaGF2ZSBhbnkgJ2NvbnRlbnQnXG4gICAgICAgICAgICAvLyAgICAgYXMgZmFyIGFzIHNlbGVjdGlvbiBhbmQgcmFuZ2VzIGFyZSBjb25jZXJuZWRcbiAgICAgICAgICAgIC8vICAzKSBUaGUgc2VsZWN0aW9uIHN0YXJ0cyBhZnRlciBhIHNwZWNpZmllZCBudW1iZXIgb2YgZW1wdHkgYmxvY2sgZWxlbWVudHMgKHNlbGVjdGlvblN0YXRlLmVtcHR5QmxvY2tzSW5kZXgpXG4gICAgICAgICAgICAvL1xuICAgICAgICAgICAgLy8gRm9yIHRoZXNlIGNhc2VzLCB3ZSB3YW50IHRoZSBzZWxlY3Rpb24gdG8gc3RhcnQgYXQgYSB2ZXJ5IHNwZWNpZmljIGxvY2F0aW9uLCBzbyB3ZSBzaG91bGQgTk9UXG4gICAgICAgICAgICAvLyBhdXRvbWF0aWNhbGx5IG1vdmUgdGhlIGN1cnNvciB0byB0aGUgYmVnaW5uaW5nIG9mIHRoZSBmaXJzdCBhY3R1YWwgY2h1bmsgb2YgdGV4dFxuICAgICAgICAgICAgaWYgKGZhdm9yTGF0ZXJTZWxlY3Rpb25BbmNob3IgfHwgc2VsZWN0aW9uU3RhdGUuc3RhcnRzV2l0aEltYWdlIHx8IHR5cGVvZiBzZWxlY3Rpb25TdGF0ZS5lbXB0eUJsb2Nrc0luZGV4ICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgIGFsbG93UmFuZ2VUb1N0YXJ0QXRFbmRPZk5vZGUgPSB0cnVlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB3aGlsZSAoIXN0b3AgJiYgbm9kZSkge1xuICAgICAgICAgICAgICAgIC8vIE9ubHkgaXRlcmF0ZSBvdmVyIGVsZW1lbnRzIGFuZCB0ZXh0IG5vZGVzXG4gICAgICAgICAgICAgICAgaWYgKG5vZGUubm9kZVR5cGUgPiAzKSB7XG4gICAgICAgICAgICAgICAgICAgIG5vZGUgPSBub2RlU3RhY2sucG9wKCk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIC8vIElmIHdlIGhpdCBhIHRleHQgbm9kZSwgd2UgbmVlZCB0byBhZGQgdGhlIGFtb3VudCBvZiBjaGFyYWN0ZXJzIHRvIHRoZSBvdmVyYWxsIGNvdW50XG4gICAgICAgICAgICAgICAgaWYgKG5vZGUubm9kZVR5cGUgPT09IDMgJiYgIWZvdW5kRW5kKSB7XG4gICAgICAgICAgICAgICAgICAgIG5leHRDaGFySW5kZXggPSBjaGFySW5kZXggKyBub2RlLmxlbmd0aDtcbiAgICAgICAgICAgICAgICAgICAgLy8gQ2hlY2sgaWYgd2UncmUgYXQgb3IgYmV5b25kIHRoZSBzdGFydCBvZiB0aGUgc2VsZWN0aW9uIHdlJ3JlIGltcG9ydGluZ1xuICAgICAgICAgICAgICAgICAgICBpZiAoIWZvdW5kU3RhcnQgJiYgc2VsZWN0aW9uU3RhdGUuc3RhcnQgPj0gY2hhckluZGV4ICYmIHNlbGVjdGlvblN0YXRlLnN0YXJ0IDw9IG5leHRDaGFySW5kZXgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIE5PVEU6IFdlIG9ubHkgd2FudCB0byBhbGxvdyBhIHNlbGVjdGlvbiB0byBzdGFydCBhdCB0aGUgRU5EIG9mIGFuIGVsZW1lbnQgaWZcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICBhbGxvd1JhbmdlVG9TdGFydEF0RW5kT2ZOb2RlIGlzIHRydWVcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChhbGxvd1JhbmdlVG9TdGFydEF0RW5kT2ZOb2RlIHx8IHNlbGVjdGlvblN0YXRlLnN0YXJ0IDwgbmV4dENoYXJJbmRleCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJhbmdlLnNldFN0YXJ0KG5vZGUsIHNlbGVjdGlvblN0YXRlLnN0YXJ0IC0gY2hhckluZGV4KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3VuZFN0YXJ0ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIFdlJ3JlIGF0IHRoZSBlbmQgb2YgYSB0ZXh0IG5vZGUgd2hlcmUgdGhlIHNlbGVjdGlvbiBjb3VsZCBzdGFydCBidXQgd2Ugc2hvdWxkbid0XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBtYWtlIHRoZSBzZWxlY3Rpb24gc3RhcnQgaGVyZSBiZWNhdXNlIGFsbG93UmFuZ2VUb1N0YXJ0QXRFbmRPZk5vZGUgaXMgZmFsc2UuXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBIb3dldmVyLCB3ZSBzaG91bGQga2VlcCBhIHJlZmVyZW5jZSB0byB0aGlzIG5vZGUgaW4gY2FzZSB0aGVyZSBhcmVuJ3QgYW55IG1vcmVcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHRleHQgbm9kZXMgYWZ0ZXIgdGhpcywgc28gdGhhdCB3ZSBoYXZlIHNvbWV3aGVyZSB0byBpbXBvcnQgdGhlIHNlbGVjdGlvbiB0b1xuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGFzdFRleHROb2RlID0gbm9kZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAvLyBXZSd2ZSBmb3VuZCB0aGUgc3RhcnQgb2YgdGhlIHNlbGVjdGlvbiwgY2hlY2sgaWYgd2UncmUgYXQgb3IgYmV5b25kIHRoZSBlbmQgb2YgdGhlIHNlbGVjdGlvbiB3ZSdyZSBpbXBvcnRpbmdcbiAgICAgICAgICAgICAgICAgICAgaWYgKGZvdW5kU3RhcnQgJiYgc2VsZWN0aW9uU3RhdGUuZW5kID49IGNoYXJJbmRleCAmJiBzZWxlY3Rpb25TdGF0ZS5lbmQgPD0gbmV4dENoYXJJbmRleCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFzZWxlY3Rpb25TdGF0ZS50cmFpbGluZ0ltYWdlQ291bnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByYW5nZS5zZXRFbmQobm9kZSwgc2VsZWN0aW9uU3RhdGUuZW5kIC0gY2hhckluZGV4KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdG9wID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZm91bmRFbmQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGNoYXJJbmRleCA9IG5leHRDaGFySW5kZXg7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHNlbGVjdGlvblN0YXRlLnRyYWlsaW5nSW1hZ2VDb3VudCAmJiBmb3VuZEVuZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG5vZGUubm9kZU5hbWUudG9Mb3dlckNhc2UoKSA9PT0gJ2ltZycpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0cmFpbGluZ0ltYWdlQ291bnQrKztcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0cmFpbGluZ0ltYWdlQ291bnQgPT09IHNlbGVjdGlvblN0YXRlLnRyYWlsaW5nSW1hZ2VDb3VudCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIEZpbmQgd2hpY2ggaW5kZXggdGhlIGltYWdlIGlzIGluIGl0cyBwYXJlbnQncyBjaGlsZHJlblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBlbmRJbmRleCA9IDA7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2hpbGUgKG5vZGUucGFyZW50Tm9kZS5jaGlsZE5vZGVzW2VuZEluZGV4XSAhPT0gbm9kZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbmRJbmRleCsrO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByYW5nZS5zZXRFbmQobm9kZS5wYXJlbnROb2RlLCBlbmRJbmRleCArIDEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0b3AgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKCFzdG9wICYmIG5vZGUubm9kZVR5cGUgPT09IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHRoaXMgaXMgYW4gZWxlbWVudFxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gYWRkIGFsbCBpdHMgY2hpbGRyZW4gdG8gdGhlIHN0YWNrXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgaSA9IG5vZGUuY2hpbGROb2Rlcy5sZW5ndGggLSAxO1xuICAgICAgICAgICAgICAgICAgICAgICAgd2hpbGUgKGkgPj0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5vZGVTdGFjay5wdXNoKG5vZGUuY2hpbGROb2Rlc1tpXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaSAtPSAxO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKCFzdG9wKSB7XG4gICAgICAgICAgICAgICAgICAgIG5vZGUgPSBub2RlU3RhY2sucG9wKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBJZiB3ZSd2ZSBnb25lIHRocm91Z2ggdGhlIGVudGlyZSB0ZXh0IGJ1dCBkaWRuJ3QgZmluZCB0aGUgYmVnaW5uaW5nIG9mIGEgdGV4dCBub2RlXG4gICAgICAgICAgICAvLyB0byBtYWtlIHRoZSBzZWxlY3Rpb24gc3RhcnQgYXQsIHdlIHNob3VsZCBmYWxsIGJhY2sgdG8gc3RhcnRpbmcgdGhlIHNlbGVjdGlvblxuICAgICAgICAgICAgLy8gYXQgdGhlIEVORCBvZiB0aGUgbGFzdCB0ZXh0IG5vZGUgd2UgZm91bmRcbiAgICAgICAgICAgIGlmICghZm91bmRTdGFydCAmJiBsYXN0VGV4dE5vZGUpIHtcbiAgICAgICAgICAgICAgICByYW5nZS5zZXRTdGFydChsYXN0VGV4dE5vZGUsIGxhc3RUZXh0Tm9kZS5sZW5ndGgpO1xuICAgICAgICAgICAgICAgIHJhbmdlLnNldEVuZChsYXN0VGV4dE5vZGUsIGxhc3RUZXh0Tm9kZS5sZW5ndGgpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAodHlwZW9mIHNlbGVjdGlvblN0YXRlLmVtcHR5QmxvY2tzSW5kZXggIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgcmFuZ2UgPSB0aGlzLmltcG9ydFNlbGVjdGlvbk1vdmVDdXJzb3JQYXN0QmxvY2tzKGRvYywgcm9vdCwgc2VsZWN0aW9uU3RhdGUuZW1wdHlCbG9ja3NJbmRleCwgcmFuZ2UpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBJZiB0aGUgc2VsZWN0aW9uIGlzIHJpZ2h0IGF0IHRoZSBlbmRpbmcgZWRnZSBvZiBhIGxpbmssIHB1dCBpdCBvdXRzaWRlIHRoZSBhbmNob3IgdGFnIGluc3RlYWQgb2YgaW5zaWRlLlxuICAgICAgICAgICAgaWYgKGZhdm9yTGF0ZXJTZWxlY3Rpb25BbmNob3IpIHtcbiAgICAgICAgICAgICAgICByYW5nZSA9IHRoaXMuaW1wb3J0U2VsZWN0aW9uTW92ZUN1cnNvclBhc3RBbmNob3Ioc2VsZWN0aW9uU3RhdGUsIHJhbmdlKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5zZWxlY3RSYW5nZShkb2MsIHJhbmdlKTtcbiAgICAgICAgfSxcblxuICAgICAgICAvLyBVdGlsaXR5IG1ldGhvZCBjYWxsZWQgZnJvbSBpbXBvcnRTZWxlY3Rpb24gb25seVxuICAgICAgICBpbXBvcnRTZWxlY3Rpb25Nb3ZlQ3Vyc29yUGFzdEFuY2hvcjogZnVuY3Rpb24gKHNlbGVjdGlvblN0YXRlLCByYW5nZSkge1xuICAgICAgICAgICAgdmFyIG5vZGVJbnNpZGVBbmNob3JUYWdGdW5jdGlvbiA9IGZ1bmN0aW9uIChub2RlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG5vZGUubm9kZU5hbWUudG9Mb3dlckNhc2UoKSA9PT0gJ2EnO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGlmIChzZWxlY3Rpb25TdGF0ZS5zdGFydCA9PT0gc2VsZWN0aW9uU3RhdGUuZW5kICYmXG4gICAgICAgICAgICAgICAgICAgIHJhbmdlLnN0YXJ0Q29udGFpbmVyLm5vZGVUeXBlID09PSAzICYmXG4gICAgICAgICAgICAgICAgICAgIHJhbmdlLnN0YXJ0T2Zmc2V0ID09PSByYW5nZS5zdGFydENvbnRhaW5lci5ub2RlVmFsdWUubGVuZ3RoICYmXG4gICAgICAgICAgICAgICAgICAgIE1lZGl1bUVkaXRvci51dGlsLnRyYXZlcnNlVXAocmFuZ2Uuc3RhcnRDb250YWluZXIsIG5vZGVJbnNpZGVBbmNob3JUYWdGdW5jdGlvbikpIHtcbiAgICAgICAgICAgICAgICB2YXIgcHJldk5vZGUgPSByYW5nZS5zdGFydENvbnRhaW5lcixcbiAgICAgICAgICAgICAgICAgICAgY3VycmVudE5vZGUgPSByYW5nZS5zdGFydENvbnRhaW5lci5wYXJlbnROb2RlO1xuICAgICAgICAgICAgICAgIHdoaWxlIChjdXJyZW50Tm9kZSAhPT0gbnVsbCAmJiBjdXJyZW50Tm9kZS5ub2RlTmFtZS50b0xvd2VyQ2FzZSgpICE9PSAnYScpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGN1cnJlbnROb2RlLmNoaWxkTm9kZXNbY3VycmVudE5vZGUuY2hpbGROb2Rlcy5sZW5ndGggLSAxXSAhPT0gcHJldk5vZGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGN1cnJlbnROb2RlID0gbnVsbDtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHByZXZOb2RlID0gY3VycmVudE5vZGU7XG4gICAgICAgICAgICAgICAgICAgICAgICBjdXJyZW50Tm9kZSA9IGN1cnJlbnROb2RlLnBhcmVudE5vZGU7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKGN1cnJlbnROb2RlICE9PSBudWxsICYmIGN1cnJlbnROb2RlLm5vZGVOYW1lLnRvTG93ZXJDYXNlKCkgPT09ICdhJykge1xuICAgICAgICAgICAgICAgICAgICB2YXIgY3VycmVudE5vZGVJbmRleCA9IG51bGw7XG4gICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBjdXJyZW50Tm9kZUluZGV4ID09PSBudWxsICYmIGkgPCBjdXJyZW50Tm9kZS5wYXJlbnROb2RlLmNoaWxkTm9kZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjdXJyZW50Tm9kZS5wYXJlbnROb2RlLmNoaWxkTm9kZXNbaV0gPT09IGN1cnJlbnROb2RlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY3VycmVudE5vZGVJbmRleCA9IGk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgcmFuZ2Uuc2V0U3RhcnQoY3VycmVudE5vZGUucGFyZW50Tm9kZSwgY3VycmVudE5vZGVJbmRleCArIDEpO1xuICAgICAgICAgICAgICAgICAgICByYW5nZS5jb2xsYXBzZSh0cnVlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gcmFuZ2U7XG4gICAgICAgIH0sXG5cbiAgICAgICAgLy8gVXNlcyB0aGUgZW1wdHlCbG9ja3NJbmRleCBjYWxjdWxhdGVkIGJ5IGdldEluZGV4UmVsYXRpdmVUb0FkamFjZW50RW1wdHlCbG9ja3NcbiAgICAgICAgLy8gdG8gbW92ZSB0aGUgY3Vyc29yIGJhY2sgdG8gdGhlIHN0YXJ0IG9mIHRoZSBjb3JyZWN0IHBhcmFncmFwaFxuICAgICAgICBpbXBvcnRTZWxlY3Rpb25Nb3ZlQ3Vyc29yUGFzdEJsb2NrczogZnVuY3Rpb24gKGRvYywgcm9vdCwgaW5kZXgsIHJhbmdlKSB7XG4gICAgICAgICAgICB2YXIgdHJlZVdhbGtlciA9IGRvYy5jcmVhdGVUcmVlV2Fsa2VyKHJvb3QsIE5vZGVGaWx0ZXIuU0hPV19FTEVNRU5ULCBmaWx0ZXJPbmx5UGFyZW50RWxlbWVudHMsIGZhbHNlKSxcbiAgICAgICAgICAgICAgICBzdGFydENvbnRhaW5lciA9IHJhbmdlLnN0YXJ0Q29udGFpbmVyLFxuICAgICAgICAgICAgICAgIHN0YXJ0QmxvY2ssXG4gICAgICAgICAgICAgICAgdGFyZ2V0Tm9kZSxcbiAgICAgICAgICAgICAgICBjdXJySW5kZXggPSAwO1xuICAgICAgICAgICAgaW5kZXggPSBpbmRleCB8fCAxOyAvLyBJZiBpbmRleCBpcyAwLCB3ZSBzdGlsbCB3YW50IHRvIG1vdmUgdG8gdGhlIG5leHQgYmxvY2tcblxuICAgICAgICAgICAgLy8gQ2hyb21lIGNvdW50cyBuZXdsaW5lcyBhbmQgc3BhY2VzIHRoYXQgc2VwYXJhdGUgYmxvY2sgZWxlbWVudHMgYXMgYWN0dWFsIGVsZW1lbnRzLlxuICAgICAgICAgICAgLy8gSWYgdGhlIHNlbGVjdGlvbiBpcyBpbnNpZGUgb25lIG9mIHRoZXNlIHRleHQgbm9kZXMsIGFuZCBpdCBoYXMgYSBwcmV2aW91cyBzaWJsaW5nXG4gICAgICAgICAgICAvLyB3aGljaCBpcyBhIGJsb2NrIGVsZW1lbnQsIHdlIHdhbnQgdGhlIHRyZWV3YWxrZXIgdG8gc3RhcnQgYXQgdGhlIHByZXZpb3VzIHNpYmxpbmdcbiAgICAgICAgICAgIC8vIGFuZCBOT1QgYXQgdGhlIHBhcmVudCBvZiB0aGUgdGV4dG5vZGVcbiAgICAgICAgICAgIGlmIChzdGFydENvbnRhaW5lci5ub2RlVHlwZSA9PT0gMyAmJiBNZWRpdW1FZGl0b3IudXRpbC5pc0Jsb2NrQ29udGFpbmVyKHN0YXJ0Q29udGFpbmVyLnByZXZpb3VzU2libGluZykpIHtcbiAgICAgICAgICAgICAgICBzdGFydEJsb2NrID0gc3RhcnRDb250YWluZXIucHJldmlvdXNTaWJsaW5nO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBzdGFydEJsb2NrID0gTWVkaXVtRWRpdG9yLnV0aWwuZ2V0Q2xvc2VzdEJsb2NrQ29udGFpbmVyKHN0YXJ0Q29udGFpbmVyKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gU2tpcCBvdmVyIGVtcHR5IGJsb2NrcyB1bnRpbCB3ZSBoaXQgdGhlIGJsb2NrIHdlIHdhbnQgdGhlIHNlbGVjdGlvbiB0byBiZSBpblxuICAgICAgICAgICAgd2hpbGUgKHRyZWVXYWxrZXIubmV4dE5vZGUoKSkge1xuICAgICAgICAgICAgICAgIGlmICghdGFyZ2V0Tm9kZSkge1xuICAgICAgICAgICAgICAgICAgICAvLyBMb29wIHRocm91Z2ggYWxsIGJsb2NrcyB1bnRpbCB3ZSBoaXQgdGhlIHN0YXJ0aW5nIGJsb2NrIGVsZW1lbnRcbiAgICAgICAgICAgICAgICAgICAgaWYgKHN0YXJ0QmxvY2sgPT09IHRyZWVXYWxrZXIuY3VycmVudE5vZGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRhcmdldE5vZGUgPSB0cmVlV2Fsa2VyLmN1cnJlbnROb2RlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGFyZ2V0Tm9kZSA9IHRyZWVXYWxrZXIuY3VycmVudE5vZGU7XG4gICAgICAgICAgICAgICAgICAgIGN1cnJJbmRleCsrO1xuICAgICAgICAgICAgICAgICAgICAvLyBXZSBoaXQgdGhlIHRhcmdldCBpbmRleCwgYmFpbFxuICAgICAgICAgICAgICAgICAgICBpZiAoY3VyckluZGV4ID09PSBpbmRleCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgLy8gSWYgd2UgZmluZCBhIG5vbi1lbXB0eSBibG9jaywgaWdub3JlIHRoZSBlbXB0eUJsb2Nrc0luZGV4IGFuZCBqdXN0IHB1dCBzZWxlY3Rpb24gaGVyZVxuICAgICAgICAgICAgICAgICAgICBpZiAodGFyZ2V0Tm9kZS50ZXh0Q29udGVudC5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKCF0YXJnZXROb2RlKSB7XG4gICAgICAgICAgICAgICAgdGFyZ2V0Tm9kZSA9IHN0YXJ0QmxvY2s7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIFdlJ3JlIHNlbGVjdGluZyBhIGhpZ2gtbGV2ZWwgYmxvY2sgbm9kZSwgc28gbWFrZSBzdXJlIHRoZSBjdXJzb3IgZ2V0cyBtb3ZlZCBpbnRvIHRoZSBkZWVwZXN0XG4gICAgICAgICAgICAvLyBlbGVtZW50IGF0IHRoZSBiZWdpbm5pbmcgb2YgdGhlIGJsb2NrXG4gICAgICAgICAgICByYW5nZS5zZXRTdGFydChNZWRpdW1FZGl0b3IudXRpbC5nZXRGaXJzdFNlbGVjdGFibGVMZWFmTm9kZSh0YXJnZXROb2RlKSwgMCk7XG5cbiAgICAgICAgICAgIHJldHVybiByYW5nZTtcbiAgICAgICAgfSxcblxuICAgICAgICAvLyBSZXR1cm5zIC0xIHVubGVzcyB0aGUgY3Vyc29yIGlzIGF0IHRoZSBiZWdpbm5pbmcgb2YgYSBwYXJhZ3JhcGgvYmxvY2tcbiAgICAgICAgLy8gSWYgdGhlIHBhcmFncmFwaC9ibG9jayBpcyBwcmVjZWVkZWQgYnkgZW1wdHkgcGFyYWdyYXBocy9ibG9jayAod2l0aCBubyB0ZXh0KVxuICAgICAgICAvLyBpdCB3aWxsIHJldHVybiB0aGUgbnVtYmVyIG9mIGVtcHR5IHBhcmFncmFwaHMgYmVmb3JlIHRoZSBjdXJzb3IuXG4gICAgICAgIC8vIE90aGVyd2lzZSwgaXQgd2lsbCByZXR1cm4gMCwgd2hpY2ggaW5kaWNhdGVzIHRoZSBjdXJzb3IgaXMgYXQgdGhlIGJlZ2lubmluZ1xuICAgICAgICAvLyBvZiBhIHBhcmFncmFwaC9ibG9jaywgYW5kIG5vdCBhdCB0aGUgZW5kIG9mIHRoZSBwYXJhZ3JhcGgvYmxvY2sgYmVmb3JlIGl0XG4gICAgICAgIGdldEluZGV4UmVsYXRpdmVUb0FkamFjZW50RW1wdHlCbG9ja3M6IGZ1bmN0aW9uIChkb2MsIHJvb3QsIGN1cnNvckNvbnRhaW5lciwgY3Vyc29yT2Zmc2V0KSB7XG4gICAgICAgICAgICAvLyBJZiB0aGVyZSBpcyB0ZXh0IGluIGZyb250IG9mIHRoZSBjdXJzb3IsIHRoYXQgbWVhbnMgdGhlcmUgaXNuJ3Qgb25seSBlbXB0eSBibG9ja3MgYmVmb3JlIGl0XG4gICAgICAgICAgICBpZiAoY3Vyc29yQ29udGFpbmVyLnRleHRDb250ZW50Lmxlbmd0aCA+IDAgJiYgY3Vyc29yT2Zmc2V0ID4gMCkge1xuICAgICAgICAgICAgICAgIHJldHVybiAtMTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gQ2hlY2sgaWYgdGhlIGJsb2NrIHRoYXQgY29udGFpbnMgdGhlIGN1cnNvciBoYXMgYW55IG90aGVyIHRleHQgaW4gZnJvbnQgb2YgdGhlIGN1cnNvclxuICAgICAgICAgICAgdmFyIG5vZGUgPSBjdXJzb3JDb250YWluZXI7XG4gICAgICAgICAgICBpZiAobm9kZS5ub2RlVHlwZSAhPT0gMykge1xuICAgICAgICAgICAgICAgIG5vZGUgPSBjdXJzb3JDb250YWluZXIuY2hpbGROb2Rlc1tjdXJzb3JPZmZzZXRdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKG5vZGUpIHtcbiAgICAgICAgICAgICAgICAvLyBUaGUgZWxlbWVudCBpc24ndCBhdCB0aGUgYmVnaW5uaW5nIG9mIGEgYmxvY2ssIHNvIGl0IGhhcyBjb250ZW50IGJlZm9yZSBpdFxuICAgICAgICAgICAgICAgIGlmICghTWVkaXVtRWRpdG9yLnV0aWwuaXNFbGVtZW50QXRCZWdpbm5pbmdPZkJsb2NrKG5vZGUpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAtMTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB2YXIgcHJldmlvdXNTaWJsaW5nID0gTWVkaXVtRWRpdG9yLnV0aWwuZmluZFByZXZpb3VzU2libGluZyhub2RlKTtcbiAgICAgICAgICAgICAgICAvLyBJZiB0aGVyZSBpcyBubyBwcmV2aW91cyBzaWJsaW5nLCB0aGlzIGlzIHRoZSBmaXJzdCB0ZXh0IGVsZW1lbnQgaW4gdGhlIGVkaXRvclxuICAgICAgICAgICAgICAgIGlmICghcHJldmlvdXNTaWJsaW5nKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAtMTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLy8gSWYgdGhlIHByZXZpb3VzIHNpYmxpbmcgaGFzIHRleHQsIHRoZW4gdGhlcmUgYXJlIG5vIGVtcHR5IGJsb2NrcyBiZWZvcmUgdGhpc1xuICAgICAgICAgICAgICAgIGVsc2UgaWYgKHByZXZpb3VzU2libGluZy5ub2RlVmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIC0xO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gV2FsayBvdmVyIGJsb2NrIGVsZW1lbnRzLCBjb3VudGluZyBudW1iZXIgb2YgZW1wdHkgYmxvY2tzIGJldHdlZW4gbGFzdCBwaWVjZSBvZiB0ZXh0XG4gICAgICAgICAgICAvLyBhbmQgdGhlIGJsb2NrIHRoZSBjdXJzb3IgaXMgaW5cbiAgICAgICAgICAgIHZhciBjbG9zZXN0QmxvY2sgPSBNZWRpdW1FZGl0b3IudXRpbC5nZXRDbG9zZXN0QmxvY2tDb250YWluZXIoY3Vyc29yQ29udGFpbmVyKSxcbiAgICAgICAgICAgICAgICB0cmVlV2Fsa2VyID0gZG9jLmNyZWF0ZVRyZWVXYWxrZXIocm9vdCwgTm9kZUZpbHRlci5TSE9XX0VMRU1FTlQsIGZpbHRlck9ubHlQYXJlbnRFbGVtZW50cywgZmFsc2UpLFxuICAgICAgICAgICAgICAgIGVtcHR5QmxvY2tzQ291bnQgPSAwO1xuICAgICAgICAgICAgd2hpbGUgKHRyZWVXYWxrZXIubmV4dE5vZGUoKSkge1xuICAgICAgICAgICAgICAgIHZhciBibG9ja0lzRW1wdHkgPSB0cmVlV2Fsa2VyLmN1cnJlbnROb2RlLnRleHRDb250ZW50ID09PSAnJztcbiAgICAgICAgICAgICAgICBpZiAoYmxvY2tJc0VtcHR5IHx8IGVtcHR5QmxvY2tzQ291bnQgPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgIGVtcHR5QmxvY2tzQ291bnQgKz0gMTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKHRyZWVXYWxrZXIuY3VycmVudE5vZGUgPT09IGNsb3Nlc3RCbG9jaykge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZW1wdHlCbG9ja3NDb3VudDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKCFibG9ja0lzRW1wdHkpIHtcbiAgICAgICAgICAgICAgICAgICAgZW1wdHlCbG9ja3NDb3VudCA9IDA7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gZW1wdHlCbG9ja3NDb3VudDtcbiAgICAgICAgfSxcblxuICAgICAgICAvLyBSZXR1cm5zIHRydWUgaWYgdGhlIHNlbGVjdGlvbiByYW5nZSBiZWdpbnMgd2l0aCBhbiBpbWFnZSB0YWdcbiAgICAgICAgLy8gUmV0dXJucyBmYWxzZSBpZiB0aGUgcmFuZ2Ugc3RhcnRzIHdpdGggYW55IG5vbiBlbXB0eSB0ZXh0IG5vZGVzXG4gICAgICAgIGRvZXNSYW5nZVN0YXJ0V2l0aEltYWdlczogZnVuY3Rpb24gKHJhbmdlLCBkb2MpIHtcbiAgICAgICAgICAgIGlmIChyYW5nZS5zdGFydE9mZnNldCAhPT0gMCB8fCByYW5nZS5zdGFydENvbnRhaW5lci5ub2RlVHlwZSAhPT0gMSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHJhbmdlLnN0YXJ0Q29udGFpbmVyLm5vZGVOYW1lLnRvTG93ZXJDYXNlKCkgPT09ICdpbWcnKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHZhciBpbWcgPSByYW5nZS5zdGFydENvbnRhaW5lci5xdWVyeVNlbGVjdG9yKCdpbWcnKTtcbiAgICAgICAgICAgIGlmICghaW1nKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB2YXIgdHJlZVdhbGtlciA9IGRvYy5jcmVhdGVUcmVlV2Fsa2VyKHJhbmdlLnN0YXJ0Q29udGFpbmVyLCBOb2RlRmlsdGVyLlNIT1dfQUxMLCBudWxsLCBmYWxzZSk7XG4gICAgICAgICAgICB3aGlsZSAodHJlZVdhbGtlci5uZXh0Tm9kZSgpKSB7XG4gICAgICAgICAgICAgICAgdmFyIG5leHQgPSB0cmVlV2Fsa2VyLmN1cnJlbnROb2RlO1xuICAgICAgICAgICAgICAgIC8vIElmIHdlIGhpdCB0aGUgaW1hZ2UsIHRoZW4gdGhlcmUgaXNuJ3QgYW55IHRleHQgYmVmb3JlIHRoZSBpbWFnZSBzb1xuICAgICAgICAgICAgICAgIC8vIHRoZSBpbWFnZSBpcyBhdCB0aGUgYmVnaW5uaW5nIG9mIHRoZSByYW5nZVxuICAgICAgICAgICAgICAgIGlmIChuZXh0ID09PSBpbWcpIHtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8vIElmIHdlIGhhdmVuJ3QgaGl0IHRoZSBpYW1nZSwgYnV0IGZvdW5kIHRleHQgdGhhdCBjb250YWlucyBjb250ZW50XG4gICAgICAgICAgICAgICAgLy8gdGhlbiB0aGUgcmFuZ2UgZG9lc24ndCBzdGFydCB3aXRoIGFuIGltYWdlXG4gICAgICAgICAgICAgICAgaWYgKG5leHQubm9kZVZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9LFxuXG4gICAgICAgIGdldFRyYWlsaW5nSW1hZ2VDb3VudDogZnVuY3Rpb24gKHJvb3QsIHNlbGVjdGlvblN0YXRlLCBlbmRDb250YWluZXIsIGVuZE9mZnNldCkge1xuICAgICAgICAgICAgLy8gSWYgdGhlIGVuZE9mZnNldCBvZiBhIHJhbmdlIGlzIDAsIHRoZSBlbmRDb250YWluZXIgZG9lc24ndCBjb250YWluIGltYWdlc1xuICAgICAgICAgICAgLy8gSWYgdGhlIGVuZENvbnRhaW5lciBpcyBhIHRleHQgbm9kZSwgdGhlcmUgYXJlIG5vIHRyYWlsaW5nIGltYWdlc1xuICAgICAgICAgICAgaWYgKGVuZE9mZnNldCA9PT0gMCB8fCBlbmRDb250YWluZXIubm9kZVR5cGUgIT09IDEpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gMDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gSWYgdGhlIGVuZENvbnRhaW5lciBpc24ndCBhbiBpbWFnZSwgYW5kIGRvZXNuJ3QgaGF2ZSBhbiBpbWFnZSBkZXNjZW5kYW50c1xuICAgICAgICAgICAgLy8gdGhlcmUgYXJlIG5vIHRyYWlsaW5nIGltYWdlc1xuICAgICAgICAgICAgaWYgKGVuZENvbnRhaW5lci5ub2RlTmFtZS50b0xvd2VyQ2FzZSgpICE9PSAnaW1nJyAmJiAhZW5kQ29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoJ2ltZycpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIDA7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHZhciBsYXN0Tm9kZSA9IGVuZENvbnRhaW5lci5jaGlsZE5vZGVzW2VuZE9mZnNldCAtIDFdO1xuICAgICAgICAgICAgd2hpbGUgKGxhc3ROb2RlLmhhc0NoaWxkTm9kZXMoKSkge1xuICAgICAgICAgICAgICAgIGxhc3ROb2RlID0gbGFzdE5vZGUubGFzdENoaWxkO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB2YXIgbm9kZSA9IHJvb3QsXG4gICAgICAgICAgICAgICAgbm9kZVN0YWNrID0gW10sXG4gICAgICAgICAgICAgICAgY2hhckluZGV4ID0gMCxcbiAgICAgICAgICAgICAgICBmb3VuZFN0YXJ0ID0gZmFsc2UsXG4gICAgICAgICAgICAgICAgZm91bmRFbmQgPSBmYWxzZSxcbiAgICAgICAgICAgICAgICBzdG9wID0gZmFsc2UsXG4gICAgICAgICAgICAgICAgbmV4dENoYXJJbmRleCxcbiAgICAgICAgICAgICAgICB0cmFpbGluZ0ltYWdlcyA9IDA7XG5cbiAgICAgICAgICAgIHdoaWxlICghc3RvcCAmJiBub2RlKSB7XG4gICAgICAgICAgICAgICAgLy8gT25seSBpdGVyYXRlIG92ZXIgZWxlbWVudHMgYW5kIHRleHQgbm9kZXNcbiAgICAgICAgICAgICAgICBpZiAobm9kZS5ub2RlVHlwZSA+IDMpIHtcbiAgICAgICAgICAgICAgICAgICAgbm9kZSA9IG5vZGVTdGFjay5wb3AoKTtcbiAgICAgICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKG5vZGUubm9kZVR5cGUgPT09IDMgJiYgIWZvdW5kRW5kKSB7XG4gICAgICAgICAgICAgICAgICAgIHRyYWlsaW5nSW1hZ2VzID0gMDtcbiAgICAgICAgICAgICAgICAgICAgbmV4dENoYXJJbmRleCA9IGNoYXJJbmRleCArIG5vZGUubGVuZ3RoO1xuICAgICAgICAgICAgICAgICAgICBpZiAoIWZvdW5kU3RhcnQgJiYgc2VsZWN0aW9uU3RhdGUuc3RhcnQgPj0gY2hhckluZGV4ICYmIHNlbGVjdGlvblN0YXRlLnN0YXJ0IDw9IG5leHRDaGFySW5kZXgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvdW5kU3RhcnQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmIChmb3VuZFN0YXJ0ICYmIHNlbGVjdGlvblN0YXRlLmVuZCA+PSBjaGFySW5kZXggJiYgc2VsZWN0aW9uU3RhdGUuZW5kIDw9IG5leHRDaGFySW5kZXgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvdW5kRW5kID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBjaGFySW5kZXggPSBuZXh0Q2hhckluZGV4O1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChub2RlLm5vZGVOYW1lLnRvTG93ZXJDYXNlKCkgPT09ICdpbWcnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0cmFpbGluZ0ltYWdlcysrO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKG5vZGUgPT09IGxhc3ROb2RlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzdG9wID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChub2RlLm5vZGVUeXBlID09PSAxKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyB0aGlzIGlzIGFuIGVsZW1lbnRcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGFkZCBhbGwgaXRzIGNoaWxkcmVuIHRvIHRoZSBzdGFja1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGkgPSBub2RlLmNoaWxkTm9kZXMubGVuZ3RoIC0gMTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHdoaWxlIChpID49IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBub2RlU3RhY2sucHVzaChub2RlLmNoaWxkTm9kZXNbaV0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGkgLT0gMTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmICghc3RvcCkge1xuICAgICAgICAgICAgICAgICAgICBub2RlID0gbm9kZVN0YWNrLnBvcCgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIHRyYWlsaW5nSW1hZ2VzO1xuICAgICAgICB9LFxuXG4gICAgICAgIC8vIGRldGVybWluZSBpZiB0aGUgY3VycmVudCBzZWxlY3Rpb24gY29udGFpbnMgYW55ICdjb250ZW50J1xuICAgICAgICAvLyBjb250ZW50IGJlaW5nIGFueSBub24td2hpdGUgc3BhY2UgdGV4dCBvciBhbiBpbWFnZVxuICAgICAgICBzZWxlY3Rpb25Db250YWluc0NvbnRlbnQ6IGZ1bmN0aW9uIChkb2MpIHtcbiAgICAgICAgICAgIHZhciBzZWwgPSBkb2MuZ2V0U2VsZWN0aW9uKCk7XG5cbiAgICAgICAgICAgIC8vIGNvbGxhcHNlZCBzZWxlY3Rpb24gb3Igc2VsZWN0aW9uIHdpdGhvdXIgcmFuZ2UgZG9lc24ndCBjb250YWluIGNvbnRlbnRcbiAgICAgICAgICAgIGlmICghc2VsIHx8IHNlbC5pc0NvbGxhcHNlZCB8fCAhc2VsLnJhbmdlQ291bnQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIGlmIHRvU3RyaW5nKCkgY29udGFpbnMgYW55IHRleHQsIHRoZSBzZWxlY3Rpb24gY29udGFpbnMgc29tZSBjb250ZW50XG4gICAgICAgICAgICBpZiAoc2VsLnRvU3RyaW5nKCkudHJpbSgpICE9PSAnJykge1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBpZiBzZWxlY3Rpb24gY29udGFpbnMgb25seSBpbWFnZShzKSwgaXQgd2lsbCByZXR1cm4gZW1wdHkgZm9yIHRvU3RyaW5nKClcbiAgICAgICAgICAgIC8vIHNvIGNoZWNrIGZvciBhbiBpbWFnZSBtYW51YWxseVxuICAgICAgICAgICAgdmFyIHNlbGVjdGlvbk5vZGUgPSB0aGlzLmdldFNlbGVjdGVkUGFyZW50RWxlbWVudChzZWwuZ2V0UmFuZ2VBdCgwKSk7XG4gICAgICAgICAgICBpZiAoc2VsZWN0aW9uTm9kZSkge1xuICAgICAgICAgICAgICAgIGlmIChzZWxlY3Rpb25Ob2RlLm5vZGVOYW1lLnRvTG93ZXJDYXNlKCkgPT09ICdpbWcnIHx8XG4gICAgICAgICAgICAgICAgICAgIChzZWxlY3Rpb25Ob2RlLm5vZGVUeXBlID09PSAxICYmIHNlbGVjdGlvbk5vZGUucXVlcnlTZWxlY3RvcignaW1nJykpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9LFxuXG4gICAgICAgIHNlbGVjdGlvbkluQ29udGVudEVkaXRhYmxlRmFsc2U6IGZ1bmN0aW9uIChjb250ZW50V2luZG93KSB7XG4gICAgICAgICAgICAvLyBkZXRlcm1pbmUgaWYgdGhlIGN1cnJlbnQgc2VsZWN0aW9uIGlzIGV4Y2x1c2l2ZWx5IGluc2lkZVxuICAgICAgICAgICAgLy8gYSBjb250ZW50ZWRpdGFibGU9XCJmYWxzZVwiLCB0aG91Z2ggdHJlYXQgdGhlIGNhc2Ugb2YgYW5cbiAgICAgICAgICAgIC8vIGV4cGxpY2l0IGNvbnRlbnRlZGl0YWJsZT1cInRydWVcIiBpbnNpZGUgYSBcImZhbHNlXCIgYXMgZmFsc2UuXG4gICAgICAgICAgICB2YXIgc2F3dHJ1ZSxcbiAgICAgICAgICAgICAgICBzYXdmYWxzZSA9IHRoaXMuZmluZE1hdGNoaW5nU2VsZWN0aW9uUGFyZW50KGZ1bmN0aW9uIChlbCkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgY2UgPSBlbCAmJiBlbC5nZXRBdHRyaWJ1dGUoJ2NvbnRlbnRlZGl0YWJsZScpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoY2UgPT09ICd0cnVlJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2F3dHJ1ZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGVsLm5vZGVOYW1lICE9PSAnI3RleHQnICYmIGNlID09PSAnZmFsc2UnO1xuICAgICAgICAgICAgICAgIH0sIGNvbnRlbnRXaW5kb3cpO1xuXG4gICAgICAgICAgICByZXR1cm4gIXNhd3RydWUgJiYgc2F3ZmFsc2U7XG4gICAgICAgIH0sXG5cbiAgICAgICAgLy8gaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy80MTc2OTIzL2h0bWwtb2Ytc2VsZWN0ZWQtdGV4dFxuICAgICAgICAvLyBieSBUaW0gRG93blxuICAgICAgICBnZXRTZWxlY3Rpb25IdG1sOiBmdW5jdGlvbiBnZXRTZWxlY3Rpb25IdG1sKGRvYykge1xuICAgICAgICAgICAgdmFyIGksXG4gICAgICAgICAgICAgICAgaHRtbCA9ICcnLFxuICAgICAgICAgICAgICAgIHNlbCA9IGRvYy5nZXRTZWxlY3Rpb24oKSxcbiAgICAgICAgICAgICAgICBsZW4sXG4gICAgICAgICAgICAgICAgY29udGFpbmVyO1xuICAgICAgICAgICAgaWYgKHNlbC5yYW5nZUNvdW50KSB7XG4gICAgICAgICAgICAgICAgY29udGFpbmVyID0gZG9jLmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgICAgIGZvciAoaSA9IDAsIGxlbiA9IHNlbC5yYW5nZUNvdW50OyBpIDwgbGVuOyBpICs9IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgY29udGFpbmVyLmFwcGVuZENoaWxkKHNlbC5nZXRSYW5nZUF0KGkpLmNsb25lQ29udGVudHMoKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGh0bWwgPSBjb250YWluZXIuaW5uZXJIVE1MO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGh0bWw7XG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqICBGaW5kIHRoZSBjYXJldCBwb3NpdGlvbiB3aXRoaW4gYW4gZWxlbWVudCBpcnJlc3BlY3RpdmUgb2YgYW55IGlubGluZSB0YWdzIGl0IG1heSBjb250YWluLlxuICAgICAgICAgKlxuICAgICAgICAgKiAgQHBhcmFtIHtET01FbGVtZW50fSBBbiBlbGVtZW50IGNvbnRhaW5pbmcgdGhlIGN1cnNvciB0byBmaW5kIG9mZnNldHMgcmVsYXRpdmUgdG8uXG4gICAgICAgICAqICBAcGFyYW0ge1JhbmdlfSBBIFJhbmdlIHJlcHJlc2VudGluZyBjdXJzb3IgcG9zaXRpb24uIFdpbGwgd2luZG93LmdldFNlbGVjdGlvbiBpZiBub25lIGlzIHBhc3NlZC5cbiAgICAgICAgICogIEByZXR1cm4ge09iamVjdH0gJ2xlZnQnIGFuZCAncmlnaHQnIGF0dHJpYnV0ZXMgY29udGFpbiBvZmZzZXRzIGZyb20gYmVnaW5pbmcgYW5kIGVuZCBvZiBFbGVtZW50XG4gICAgICAgICAqL1xuICAgICAgICBnZXRDYXJldE9mZnNldHM6IGZ1bmN0aW9uIGdldENhcmV0T2Zmc2V0cyhlbGVtZW50LCByYW5nZSkge1xuICAgICAgICAgICAgdmFyIHByZUNhcmV0UmFuZ2UsIHBvc3RDYXJldFJhbmdlO1xuXG4gICAgICAgICAgICBpZiAoIXJhbmdlKSB7XG4gICAgICAgICAgICAgICAgcmFuZ2UgPSB3aW5kb3cuZ2V0U2VsZWN0aW9uKCkuZ2V0UmFuZ2VBdCgwKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcHJlQ2FyZXRSYW5nZSA9IHJhbmdlLmNsb25lUmFuZ2UoKTtcbiAgICAgICAgICAgIHBvc3RDYXJldFJhbmdlID0gcmFuZ2UuY2xvbmVSYW5nZSgpO1xuXG4gICAgICAgICAgICBwcmVDYXJldFJhbmdlLnNlbGVjdE5vZGVDb250ZW50cyhlbGVtZW50KTtcbiAgICAgICAgICAgIHByZUNhcmV0UmFuZ2Uuc2V0RW5kKHJhbmdlLmVuZENvbnRhaW5lciwgcmFuZ2UuZW5kT2Zmc2V0KTtcblxuICAgICAgICAgICAgcG9zdENhcmV0UmFuZ2Uuc2VsZWN0Tm9kZUNvbnRlbnRzKGVsZW1lbnQpO1xuICAgICAgICAgICAgcG9zdENhcmV0UmFuZ2Uuc2V0U3RhcnQocmFuZ2UuZW5kQ29udGFpbmVyLCByYW5nZS5lbmRPZmZzZXQpO1xuXG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIGxlZnQ6IHByZUNhcmV0UmFuZ2UudG9TdHJpbmcoKS5sZW5ndGgsXG4gICAgICAgICAgICAgICAgcmlnaHQ6IHBvc3RDYXJldFJhbmdlLnRvU3RyaW5nKCkubGVuZ3RoXG4gICAgICAgICAgICB9O1xuICAgICAgICB9LFxuXG4gICAgICAgIC8vIGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvMTU4Njc1NDIvcmFuZ2Utb2JqZWN0LWdldC1zZWxlY3Rpb24tcGFyZW50LW5vZGUtY2hyb21lLXZzLWZpcmVmb3hcbiAgICAgICAgcmFuZ2VTZWxlY3RzU2luZ2xlTm9kZTogZnVuY3Rpb24gKHJhbmdlKSB7XG4gICAgICAgICAgICB2YXIgc3RhcnROb2RlID0gcmFuZ2Uuc3RhcnRDb250YWluZXI7XG4gICAgICAgICAgICByZXR1cm4gc3RhcnROb2RlID09PSByYW5nZS5lbmRDb250YWluZXIgJiZcbiAgICAgICAgICAgICAgICBzdGFydE5vZGUuaGFzQ2hpbGROb2RlcygpICYmXG4gICAgICAgICAgICAgICAgcmFuZ2UuZW5kT2Zmc2V0ID09PSByYW5nZS5zdGFydE9mZnNldCArIDE7XG4gICAgICAgIH0sXG5cbiAgICAgICAgZ2V0U2VsZWN0ZWRQYXJlbnRFbGVtZW50OiBmdW5jdGlvbiAocmFuZ2UpIHtcbiAgICAgICAgICAgIGlmICghcmFuZ2UpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gU2VsZWN0aW9uIGVuY29tcGFzc2VzIGEgc2luZ2xlIGVsZW1lbnRcbiAgICAgICAgICAgIGlmICh0aGlzLnJhbmdlU2VsZWN0c1NpbmdsZU5vZGUocmFuZ2UpICYmIHJhbmdlLnN0YXJ0Q29udGFpbmVyLmNoaWxkTm9kZXNbcmFuZ2Uuc3RhcnRPZmZzZXRdLm5vZGVUeXBlICE9PSAzKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJhbmdlLnN0YXJ0Q29udGFpbmVyLmNoaWxkTm9kZXNbcmFuZ2Uuc3RhcnRPZmZzZXRdO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBTZWxlY3Rpb24gcmFuZ2Ugc3RhcnRzIGluc2lkZSBhIHRleHQgbm9kZSwgc28gZ2V0IGl0cyBwYXJlbnRcbiAgICAgICAgICAgIGlmIChyYW5nZS5zdGFydENvbnRhaW5lci5ub2RlVHlwZSA9PT0gMykge1xuICAgICAgICAgICAgICAgIHJldHVybiByYW5nZS5zdGFydENvbnRhaW5lci5wYXJlbnROb2RlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBTZWxlY3Rpb24gc3RhcnRzIGluc2lkZSBhbiBlbGVtZW50XG4gICAgICAgICAgICByZXR1cm4gcmFuZ2Uuc3RhcnRDb250YWluZXI7XG4gICAgICAgIH0sXG5cbiAgICAgICAgZ2V0U2VsZWN0ZWRFbGVtZW50czogZnVuY3Rpb24gKGRvYykge1xuICAgICAgICAgICAgdmFyIHNlbGVjdGlvbiA9IGRvYy5nZXRTZWxlY3Rpb24oKSxcbiAgICAgICAgICAgICAgICByYW5nZSxcbiAgICAgICAgICAgICAgICB0b1JldCxcbiAgICAgICAgICAgICAgICBjdXJyTm9kZTtcblxuICAgICAgICAgICAgaWYgKCFzZWxlY3Rpb24ucmFuZ2VDb3VudCB8fCBzZWxlY3Rpb24uaXNDb2xsYXBzZWQgfHwgIXNlbGVjdGlvbi5nZXRSYW5nZUF0KDApLmNvbW1vbkFuY2VzdG9yQ29udGFpbmVyKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFtdO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByYW5nZSA9IHNlbGVjdGlvbi5nZXRSYW5nZUF0KDApO1xuXG4gICAgICAgICAgICBpZiAocmFuZ2UuY29tbW9uQW5jZXN0b3JDb250YWluZXIubm9kZVR5cGUgPT09IDMpIHtcbiAgICAgICAgICAgICAgICB0b1JldCA9IFtdO1xuICAgICAgICAgICAgICAgIGN1cnJOb2RlID0gcmFuZ2UuY29tbW9uQW5jZXN0b3JDb250YWluZXI7XG4gICAgICAgICAgICAgICAgd2hpbGUgKGN1cnJOb2RlLnBhcmVudE5vZGUgJiYgY3Vyck5vZGUucGFyZW50Tm9kZS5jaGlsZE5vZGVzLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICAgICAgICAgICAgICB0b1JldC5wdXNoKGN1cnJOb2RlLnBhcmVudE5vZGUpO1xuICAgICAgICAgICAgICAgICAgICBjdXJyTm9kZSA9IGN1cnJOb2RlLnBhcmVudE5vZGU7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRvUmV0O1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gW10uZmlsdGVyLmNhbGwocmFuZ2UuY29tbW9uQW5jZXN0b3JDb250YWluZXIuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJyonKSwgZnVuY3Rpb24gKGVsKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuICh0eXBlb2Ygc2VsZWN0aW9uLmNvbnRhaW5zTm9kZSA9PT0gJ2Z1bmN0aW9uJykgPyBzZWxlY3Rpb24uY29udGFpbnNOb2RlKGVsLCB0cnVlKSA6IHRydWU7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSxcblxuICAgICAgICBzZWxlY3ROb2RlOiBmdW5jdGlvbiAobm9kZSwgZG9jKSB7XG4gICAgICAgICAgICB2YXIgcmFuZ2UgPSBkb2MuY3JlYXRlUmFuZ2UoKTtcbiAgICAgICAgICAgIHJhbmdlLnNlbGVjdE5vZGVDb250ZW50cyhub2RlKTtcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0UmFuZ2UoZG9jLCByYW5nZSk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgc2VsZWN0OiBmdW5jdGlvbiAoZG9jLCBzdGFydE5vZGUsIHN0YXJ0T2Zmc2V0LCBlbmROb2RlLCBlbmRPZmZzZXQpIHtcbiAgICAgICAgICAgIHZhciByYW5nZSA9IGRvYy5jcmVhdGVSYW5nZSgpO1xuICAgICAgICAgICAgcmFuZ2Uuc2V0U3RhcnQoc3RhcnROb2RlLCBzdGFydE9mZnNldCk7XG4gICAgICAgICAgICBpZiAoZW5kTm9kZSkge1xuICAgICAgICAgICAgICAgIHJhbmdlLnNldEVuZChlbmROb2RlLCBlbmRPZmZzZXQpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByYW5nZS5jb2xsYXBzZSh0cnVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuc2VsZWN0UmFuZ2UoZG9jLCByYW5nZSk7XG4gICAgICAgICAgICByZXR1cm4gcmFuZ2U7XG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqICBDbGVhciB0aGUgY3VycmVudCBoaWdobGlnaHRlZCBzZWxlY3Rpb24gYW5kIHNldCB0aGUgY2FyZXQgdG8gdGhlIHN0YXJ0IG9yIHRoZSBlbmQgb2YgdGhhdCBwcmlvciBzZWxlY3Rpb24sIGRlZmF1bHRzIHRvIGVuZC5cbiAgICAgICAgICpcbiAgICAgICAgICogIEBwYXJhbSB7RG9tRG9jdW1lbnR9IGRvYyAgICAgICAgICAgIEN1cnJlbnQgZG9jdW1lbnRcbiAgICAgICAgICogIEBwYXJhbSB7Ym9vbGVhbn0gbW92ZUN1cnNvclRvU3RhcnQgIEEgYm9vbGVhbiByZXByZXNlbnRpbmcgd2hldGhlciBvciBub3QgdG8gc2V0IHRoZSBjYXJldCB0byB0aGUgYmVnaW5uaW5nIG9mIHRoZSBwcmlvciBzZWxlY3Rpb24uXG4gICAgICAgICAqL1xuICAgICAgICBjbGVhclNlbGVjdGlvbjogZnVuY3Rpb24gKGRvYywgbW92ZUN1cnNvclRvU3RhcnQpIHtcbiAgICAgICAgICAgIGlmIChtb3ZlQ3Vyc29yVG9TdGFydCkge1xuICAgICAgICAgICAgICAgIGRvYy5nZXRTZWxlY3Rpb24oKS5jb2xsYXBzZVRvU3RhcnQoKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgZG9jLmdldFNlbGVjdGlvbigpLmNvbGxhcHNlVG9FbmQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogTW92ZSBjdXJzb3IgdG8gdGhlIGdpdmVuIG5vZGUgd2l0aCB0aGUgZ2l2ZW4gb2Zmc2V0LlxuICAgICAgICAgKlxuICAgICAgICAgKiBAcGFyYW0gIHtEb21Eb2N1bWVudH0gZG9jICAgICBDdXJyZW50IGRvY3VtZW50XG4gICAgICAgICAqIEBwYXJhbSAge0RvbUVsZW1lbnR9ICBub2RlICAgIEVsZW1lbnQgd2hlcmUgdG8ganVtcFxuICAgICAgICAgKiBAcGFyYW0gIHtpbnRlZ2VyfSAgICAgb2Zmc2V0ICBXaGVyZSBpbiB0aGUgZWxlbWVudCBzaG91bGQgd2UganVtcCwgMCBieSBkZWZhdWx0XG4gICAgICAgICAqL1xuICAgICAgICBtb3ZlQ3Vyc29yOiBmdW5jdGlvbiAoZG9jLCBub2RlLCBvZmZzZXQpIHtcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0KGRvYywgbm9kZSwgb2Zmc2V0KTtcbiAgICAgICAgfSxcblxuICAgICAgICBnZXRTZWxlY3Rpb25SYW5nZTogZnVuY3Rpb24gKG93bmVyRG9jdW1lbnQpIHtcbiAgICAgICAgICAgIHZhciBzZWxlY3Rpb24gPSBvd25lckRvY3VtZW50LmdldFNlbGVjdGlvbigpO1xuICAgICAgICAgICAgaWYgKHNlbGVjdGlvbi5yYW5nZUNvdW50ID09PSAwKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gc2VsZWN0aW9uLmdldFJhbmdlQXQoMCk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgc2VsZWN0UmFuZ2U6IGZ1bmN0aW9uIChvd25lckRvY3VtZW50LCByYW5nZSkge1xuICAgICAgICAgICAgdmFyIHNlbGVjdGlvbiA9IG93bmVyRG9jdW1lbnQuZ2V0U2VsZWN0aW9uKCk7XG5cbiAgICAgICAgICAgIHNlbGVjdGlvbi5yZW1vdmVBbGxSYW5nZXMoKTtcbiAgICAgICAgICAgIHNlbGVjdGlvbi5hZGRSYW5nZShyYW5nZSk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgLy8gaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy8xMTk3NDAxL2hvdy1jYW4taS1nZXQtdGhlLWVsZW1lbnQtdGhlLWNhcmV0LWlzLWluLXdpdGgtamF2YXNjcmlwdC13aGVuLXVzaW5nLWNvbnRlbnRlZGlcbiAgICAgICAgLy8gYnkgWW91XG4gICAgICAgIGdldFNlbGVjdGlvblN0YXJ0OiBmdW5jdGlvbiAob3duZXJEb2N1bWVudCkge1xuICAgICAgICAgICAgdmFyIG5vZGUgPSBvd25lckRvY3VtZW50LmdldFNlbGVjdGlvbigpLmFuY2hvck5vZGUsXG4gICAgICAgICAgICAgICAgc3RhcnROb2RlID0gKG5vZGUgJiYgbm9kZS5ub2RlVHlwZSA9PT0gMyA/IG5vZGUucGFyZW50Tm9kZSA6IG5vZGUpO1xuXG4gICAgICAgICAgICByZXR1cm4gc3RhcnROb2RlO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIE1lZGl1bUVkaXRvci5zZWxlY3Rpb24gPSBTZWxlY3Rpb247XG59KCkpO1xuXG4oZnVuY3Rpb24gKCkge1xuICAgICd1c2Ugc3RyaWN0JztcblxuICAgIGZ1bmN0aW9uIGlzRWxlbWVudERlc2NlbmRhbnRPZkV4dGVuc2lvbihleHRlbnNpb25zLCBlbGVtZW50KSB7XG4gICAgICAgIHJldHVybiBleHRlbnNpb25zLnNvbWUoZnVuY3Rpb24gKGV4dGVuc2lvbikge1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBleHRlbnNpb24uZ2V0SW50ZXJhY3Rpb25FbGVtZW50cyAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdmFyIGV4dGVuc2lvbkVsZW1lbnRzID0gZXh0ZW5zaW9uLmdldEludGVyYWN0aW9uRWxlbWVudHMoKTtcbiAgICAgICAgICAgIGlmICghZXh0ZW5zaW9uRWxlbWVudHMpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICghQXJyYXkuaXNBcnJheShleHRlbnNpb25FbGVtZW50cykpIHtcbiAgICAgICAgICAgICAgICBleHRlbnNpb25FbGVtZW50cyA9IFtleHRlbnNpb25FbGVtZW50c107XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gZXh0ZW5zaW9uRWxlbWVudHMuc29tZShmdW5jdGlvbiAoZWwpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gTWVkaXVtRWRpdG9yLnV0aWwuaXNEZXNjZW5kYW50KGVsLCBlbGVtZW50LCB0cnVlKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICB2YXIgRXZlbnRzID0gZnVuY3Rpb24gKGluc3RhbmNlKSB7XG4gICAgICAgIHRoaXMuYmFzZSA9IGluc3RhbmNlO1xuICAgICAgICB0aGlzLm9wdGlvbnMgPSB0aGlzLmJhc2Uub3B0aW9ucztcbiAgICAgICAgdGhpcy5ldmVudHMgPSBbXTtcbiAgICAgICAgdGhpcy5kaXNhYmxlZEV2ZW50cyA9IHt9O1xuICAgICAgICB0aGlzLmN1c3RvbUV2ZW50cyA9IHt9O1xuICAgICAgICB0aGlzLmxpc3RlbmVycyA9IHt9O1xuICAgIH07XG5cbiAgICBFdmVudHMucHJvdG90eXBlID0ge1xuICAgICAgICBJbnB1dEV2ZW50T25Db250ZW50ZWRpdGFibGVTdXBwb3J0ZWQ6ICFNZWRpdW1FZGl0b3IudXRpbC5pc0lFICYmICFNZWRpdW1FZGl0b3IudXRpbC5pc0VkZ2UsXG5cbiAgICAgICAgLy8gSGVscGVycyBmb3IgZXZlbnQgaGFuZGxpbmdcblxuICAgICAgICBhdHRhY2hET01FdmVudDogZnVuY3Rpb24gKHRhcmdldHMsIGV2ZW50LCBsaXN0ZW5lciwgdXNlQ2FwdHVyZSkge1xuICAgICAgICAgICAgdGFyZ2V0cyA9IE1lZGl1bUVkaXRvci51dGlsLmlzRWxlbWVudCh0YXJnZXRzKSB8fCBbd2luZG93LCBkb2N1bWVudF0uaW5kZXhPZih0YXJnZXRzKSA+IC0xID8gW3RhcmdldHNdIDogdGFyZ2V0cztcblxuICAgICAgICAgICAgQXJyYXkucHJvdG90eXBlLmZvckVhY2guY2FsbCh0YXJnZXRzLCBmdW5jdGlvbiAodGFyZ2V0KSB7XG4gICAgICAgICAgICAgICAgdGFyZ2V0LmFkZEV2ZW50TGlzdGVuZXIoZXZlbnQsIGxpc3RlbmVyLCB1c2VDYXB0dXJlKTtcbiAgICAgICAgICAgICAgICB0aGlzLmV2ZW50cy5wdXNoKFt0YXJnZXQsIGV2ZW50LCBsaXN0ZW5lciwgdXNlQ2FwdHVyZV0pO1xuICAgICAgICAgICAgfS5iaW5kKHRoaXMpKTtcbiAgICAgICAgfSxcblxuICAgICAgICBkZXRhY2hET01FdmVudDogZnVuY3Rpb24gKHRhcmdldHMsIGV2ZW50LCBsaXN0ZW5lciwgdXNlQ2FwdHVyZSkge1xuICAgICAgICAgICAgdmFyIGluZGV4LCBlO1xuICAgICAgICAgICAgdGFyZ2V0cyA9IE1lZGl1bUVkaXRvci51dGlsLmlzRWxlbWVudCh0YXJnZXRzKSB8fCBbd2luZG93LCBkb2N1bWVudF0uaW5kZXhPZih0YXJnZXRzKSA+IC0xID8gW3RhcmdldHNdIDogdGFyZ2V0cztcblxuICAgICAgICAgICAgQXJyYXkucHJvdG90eXBlLmZvckVhY2guY2FsbCh0YXJnZXRzLCBmdW5jdGlvbiAodGFyZ2V0KSB7XG4gICAgICAgICAgICAgICAgaW5kZXggPSB0aGlzLmluZGV4T2ZMaXN0ZW5lcih0YXJnZXQsIGV2ZW50LCBsaXN0ZW5lciwgdXNlQ2FwdHVyZSk7XG4gICAgICAgICAgICAgICAgaWYgKGluZGV4ICE9PSAtMSkge1xuICAgICAgICAgICAgICAgICAgICBlID0gdGhpcy5ldmVudHMuc3BsaWNlKGluZGV4LCAxKVswXTtcbiAgICAgICAgICAgICAgICAgICAgZVswXS5yZW1vdmVFdmVudExpc3RlbmVyKGVbMV0sIGVbMl0sIGVbM10pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0uYmluZCh0aGlzKSk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgaW5kZXhPZkxpc3RlbmVyOiBmdW5jdGlvbiAodGFyZ2V0LCBldmVudCwgbGlzdGVuZXIsIHVzZUNhcHR1cmUpIHtcbiAgICAgICAgICAgIHZhciBpLCBuLCBpdGVtO1xuICAgICAgICAgICAgZm9yIChpID0gMCwgbiA9IHRoaXMuZXZlbnRzLmxlbmd0aDsgaSA8IG47IGkgPSBpICsgMSkge1xuICAgICAgICAgICAgICAgIGl0ZW0gPSB0aGlzLmV2ZW50c1tpXTtcbiAgICAgICAgICAgICAgICBpZiAoaXRlbVswXSA9PT0gdGFyZ2V0ICYmIGl0ZW1bMV0gPT09IGV2ZW50ICYmIGl0ZW1bMl0gPT09IGxpc3RlbmVyICYmIGl0ZW1bM10gPT09IHVzZUNhcHR1cmUpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIC0xO1xuICAgICAgICB9LFxuXG4gICAgICAgIGRldGFjaEFsbERPTUV2ZW50czogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIGUgPSB0aGlzLmV2ZW50cy5wb3AoKTtcbiAgICAgICAgICAgIHdoaWxlIChlKSB7XG4gICAgICAgICAgICAgICAgZVswXS5yZW1vdmVFdmVudExpc3RlbmVyKGVbMV0sIGVbMl0sIGVbM10pO1xuICAgICAgICAgICAgICAgIGUgPSB0aGlzLmV2ZW50cy5wb3AoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICBkZXRhY2hBbGxFdmVudHNGcm9tRWxlbWVudDogZnVuY3Rpb24gKGVsZW1lbnQpIHtcbiAgICAgICAgICAgIHZhciBmaWx0ZXJlZCA9IHRoaXMuZXZlbnRzLmZpbHRlcihmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBlICYmIGVbMF0uZ2V0QXR0cmlidXRlICYmIGVbMF0uZ2V0QXR0cmlidXRlKCdtZWRpdW0tZWRpdG9yLWluZGV4JykgPT09IGVsZW1lbnQuZ2V0QXR0cmlidXRlKCdtZWRpdW0tZWRpdG9yLWluZGV4Jyk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDAsIGxlbiA9IGZpbHRlcmVkLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgICAgICAgICAgdmFyIGUgPSBmaWx0ZXJlZFtpXTtcbiAgICAgICAgICAgICAgICB0aGlzLmRldGFjaERPTUV2ZW50KGVbMF0sIGVbMV0sIGVbMl0sIGVbM10pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIC8vIEF0dGFjaCBhbGwgZXhpc3RpbmcgaGFuZGxlcnMgdG8gYSBuZXcgZWxlbWVudFxuICAgICAgICBhdHRhY2hBbGxFdmVudHNUb0VsZW1lbnQ6IGZ1bmN0aW9uIChlbGVtZW50KSB7XG4gICAgICAgICAgICBpZiAodGhpcy5saXN0ZW5lcnNbJ2VkaXRhYmxlSW5wdXQnXSkge1xuICAgICAgICAgICAgICAgIHRoaXMuY29udGVudENhY2hlW2VsZW1lbnQuZ2V0QXR0cmlidXRlKCdtZWRpdW0tZWRpdG9yLWluZGV4JyldID0gZWxlbWVudC5pbm5lckhUTUw7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICh0aGlzLmV2ZW50c0NhY2hlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5ldmVudHNDYWNoZS5mb3JFYWNoKGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYXR0YWNoRE9NRXZlbnQoZWxlbWVudCwgZVsnbmFtZSddLCBlWydoYW5kbGVyJ10uYmluZCh0aGlzKSk7XG4gICAgICAgICAgICAgICAgfSwgdGhpcyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgZW5hYmxlQ3VzdG9tRXZlbnQ6IGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICAgICAgaWYgKHRoaXMuZGlzYWJsZWRFdmVudHNbZXZlbnRdICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICBkZWxldGUgdGhpcy5kaXNhYmxlZEV2ZW50c1tldmVudF07XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgZGlzYWJsZUN1c3RvbUV2ZW50OiBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgICAgIHRoaXMuZGlzYWJsZWRFdmVudHNbZXZlbnRdID0gdHJ1ZTtcbiAgICAgICAgfSxcblxuICAgICAgICAvLyBjdXN0b20gZXZlbnRzXG4gICAgICAgIGF0dGFjaEN1c3RvbUV2ZW50OiBmdW5jdGlvbiAoZXZlbnQsIGxpc3RlbmVyKSB7XG4gICAgICAgICAgICB0aGlzLnNldHVwTGlzdGVuZXIoZXZlbnQpO1xuICAgICAgICAgICAgaWYgKCF0aGlzLmN1c3RvbUV2ZW50c1tldmVudF0pIHtcbiAgICAgICAgICAgICAgICB0aGlzLmN1c3RvbUV2ZW50c1tldmVudF0gPSBbXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuY3VzdG9tRXZlbnRzW2V2ZW50XS5wdXNoKGxpc3RlbmVyKTtcbiAgICAgICAgfSxcblxuICAgICAgICBkZXRhY2hDdXN0b21FdmVudDogZnVuY3Rpb24gKGV2ZW50LCBsaXN0ZW5lcikge1xuICAgICAgICAgICAgdmFyIGluZGV4ID0gdGhpcy5pbmRleE9mQ3VzdG9tTGlzdGVuZXIoZXZlbnQsIGxpc3RlbmVyKTtcbiAgICAgICAgICAgIGlmIChpbmRleCAhPT0gLTEpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmN1c3RvbUV2ZW50c1tldmVudF0uc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgICAgICAgICAgICAvLyBUT0RPOiBJZiBhcnJheSBpcyBlbXB0eSwgc2hvdWxkIGRldGFjaCBpbnRlcm5hbCBsaXN0ZW5lcnMgdmlhIGRlc3Ryb3lMaXN0ZW5lcigpXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgaW5kZXhPZkN1c3RvbUxpc3RlbmVyOiBmdW5jdGlvbiAoZXZlbnQsIGxpc3RlbmVyKSB7XG4gICAgICAgICAgICBpZiAoIXRoaXMuY3VzdG9tRXZlbnRzW2V2ZW50XSB8fCAhdGhpcy5jdXN0b21FdmVudHNbZXZlbnRdLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIHJldHVybiAtMTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuY3VzdG9tRXZlbnRzW2V2ZW50XS5pbmRleE9mKGxpc3RlbmVyKTtcbiAgICAgICAgfSxcblxuICAgICAgICBkZXRhY2hBbGxDdXN0b21FdmVudHM6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHRoaXMuY3VzdG9tRXZlbnRzID0ge307XG4gICAgICAgICAgICAvLyBUT0RPOiBTaG91bGQgZGV0YWNoIGludGVybmFsIGxpc3RlbmVycyBoZXJlIHZpYSBkZXN0cm95TGlzdGVuZXIoKVxuICAgICAgICB9LFxuXG4gICAgICAgIHRyaWdnZXJDdXN0b21FdmVudDogZnVuY3Rpb24gKG5hbWUsIGRhdGEsIGVkaXRhYmxlKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5jdXN0b21FdmVudHNbbmFtZV0gJiYgIXRoaXMuZGlzYWJsZWRFdmVudHNbbmFtZV0pIHtcbiAgICAgICAgICAgICAgICB0aGlzLmN1c3RvbUV2ZW50c1tuYW1lXS5mb3JFYWNoKGZ1bmN0aW9uIChsaXN0ZW5lcikge1xuICAgICAgICAgICAgICAgICAgICBsaXN0ZW5lcihkYXRhLCBlZGl0YWJsZSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgLy8gQ2xlYW5pbmcgdXBcblxuICAgICAgICBkZXN0cm95OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB0aGlzLmRldGFjaEFsbERPTUV2ZW50cygpO1xuICAgICAgICAgICAgdGhpcy5kZXRhY2hBbGxDdXN0b21FdmVudHMoKTtcbiAgICAgICAgICAgIHRoaXMuZGV0YWNoRXhlY0NvbW1hbmQoKTtcblxuICAgICAgICAgICAgaWYgKHRoaXMuYmFzZS5lbGVtZW50cykge1xuICAgICAgICAgICAgICAgIHRoaXMuYmFzZS5lbGVtZW50cy5mb3JFYWNoKGZ1bmN0aW9uIChlbGVtZW50KSB7XG4gICAgICAgICAgICAgICAgICAgIGVsZW1lbnQucmVtb3ZlQXR0cmlidXRlKCdkYXRhLW1lZGl1bS1mb2N1c2VkJyk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgLy8gTGlzdGVuaW5nIHRvIGNhbGxzIHRvIGRvY3VtZW50LmV4ZWNDb21tYW5kXG5cbiAgICAgICAgLy8gQXR0YWNoIGEgbGlzdGVuZXIgdG8gYmUgbm90aWZpZWQgd2hlbiBkb2N1bWVudC5leGVjQ29tbWFuZCBpcyBjYWxsZWRcbiAgICAgICAgYXR0YWNoVG9FeGVjQ29tbWFuZDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgaWYgKHRoaXMuZXhlY0NvbW1hbmRMaXN0ZW5lcikge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gU3RvcmUgYW4gaW5zdGFuY2Ugb2YgdGhlIGxpc3RlbmVyIHNvOlxuICAgICAgICAgICAgLy8gMSkgV2Ugb25seSBhdHRhY2ggdG8gZXhlY0NvbW1hbmQgb25jZVxuICAgICAgICAgICAgLy8gMikgV2UgY2FuIHJlbW92ZSB0aGUgbGlzdGVuZXIgbGF0ZXJcbiAgICAgICAgICAgIHRoaXMuZXhlY0NvbW1hbmRMaXN0ZW5lciA9IGZ1bmN0aW9uIChleGVjSW5mbykge1xuICAgICAgICAgICAgICAgIHRoaXMuaGFuZGxlRG9jdW1lbnRFeGVjQ29tbWFuZChleGVjSW5mbyk7XG4gICAgICAgICAgICB9LmJpbmQodGhpcyk7XG5cbiAgICAgICAgICAgIC8vIEVuc3VyZSB0aGF0IGV4ZWNDb21tYW5kIGhhcyBiZWVuIHdyYXBwZWQgY29ycmVjdGx5XG4gICAgICAgICAgICB0aGlzLndyYXBFeGVjQ29tbWFuZCgpO1xuXG4gICAgICAgICAgICAvLyBBZGQgbGlzdGVuZXIgdG8gbGlzdCBvZiBleGVjQ29tbWFuZCBsaXN0ZW5lcnNcbiAgICAgICAgICAgIHRoaXMub3B0aW9ucy5vd25lckRvY3VtZW50LmV4ZWNDb21tYW5kLmxpc3RlbmVycy5wdXNoKHRoaXMuZXhlY0NvbW1hbmRMaXN0ZW5lcik7XG4gICAgICAgIH0sXG5cbiAgICAgICAgLy8gUmVtb3ZlIG91ciBsaXN0ZW5lciBmb3IgY2FsbHMgdG8gZG9jdW1lbnQuZXhlY0NvbW1hbmRcbiAgICAgICAgZGV0YWNoRXhlY0NvbW1hbmQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBkb2MgPSB0aGlzLm9wdGlvbnMub3duZXJEb2N1bWVudDtcbiAgICAgICAgICAgIGlmICghdGhpcy5leGVjQ29tbWFuZExpc3RlbmVyIHx8ICFkb2MuZXhlY0NvbW1hbmQubGlzdGVuZXJzKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBGaW5kIHRoZSBpbmRleCBvZiB0aGlzIGxpc3RlbmVyIGluIHRoZSBhcnJheSBvZiBsaXN0ZW5lcnMgc28gaXQgY2FuIGJlIHJlbW92ZWRcbiAgICAgICAgICAgIHZhciBpbmRleCA9IGRvYy5leGVjQ29tbWFuZC5saXN0ZW5lcnMuaW5kZXhPZih0aGlzLmV4ZWNDb21tYW5kTGlzdGVuZXIpO1xuICAgICAgICAgICAgaWYgKGluZGV4ICE9PSAtMSkge1xuICAgICAgICAgICAgICAgIGRvYy5leGVjQ29tbWFuZC5saXN0ZW5lcnMuc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gSWYgdGhlIGxpc3Qgb2YgbGlzdGVuZXJzIGlzIG5vdyBlbXB0eSwgcHV0IGV4ZWNDb21tYW5kIGJhY2sgdG8gaXRzIG9yaWdpbmFsIHN0YXRlXG4gICAgICAgICAgICBpZiAoIWRvYy5leGVjQ29tbWFuZC5saXN0ZW5lcnMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgdGhpcy51bndyYXBFeGVjQ29tbWFuZCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIC8vIFdyYXAgZG9jdW1lbnQuZXhlY0NvbW1hbmQgaW4gYSBjdXN0b20gbWV0aG9kIHNvIHdlIGNhbiBsaXN0ZW4gdG8gY2FsbHMgdG8gaXRcbiAgICAgICAgd3JhcEV4ZWNDb21tYW5kOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgZG9jID0gdGhpcy5vcHRpb25zLm93bmVyRG9jdW1lbnQ7XG5cbiAgICAgICAgICAgIC8vIEVuc3VyZSBhbGwgaW5zdGFuY2Ugb2YgTWVkaXVtRWRpdG9yIG9ubHkgd3JhcCBleGVjQ29tbWFuZCBvbmNlXG4gICAgICAgICAgICBpZiAoZG9jLmV4ZWNDb21tYW5kLmxpc3RlbmVycykge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gSGVscGVyIG1ldGhvZCB0byBjYWxsIGFsbCBsaXN0ZW5lcnMgdG8gZXhlY0NvbW1hbmRcbiAgICAgICAgICAgIHZhciBjYWxsTGlzdGVuZXJzID0gZnVuY3Rpb24gKGFyZ3MsIHJlc3VsdCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZG9jLmV4ZWNDb21tYW5kLmxpc3RlbmVycykge1xuICAgICAgICAgICAgICAgICAgICAgICAgZG9jLmV4ZWNDb21tYW5kLmxpc3RlbmVycy5mb3JFYWNoKGZ1bmN0aW9uIChsaXN0ZW5lcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxpc3RlbmVyKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29tbWFuZDogYXJnc1swXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IGFyZ3NbMl0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFyZ3M6IGFyZ3MsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdDogcmVzdWx0XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIC8vIENyZWF0ZSBhIHdyYXBwZXIgbWV0aG9kIGZvciBleGVjQ29tbWFuZCB3aGljaCB3aWxsOlxuICAgICAgICAgICAgLy8gMSkgQ2FsbCBkb2N1bWVudC5leGVjQ29tbWFuZCB3aXRoIHRoZSBjb3JyZWN0IGFyZ3VtZW50c1xuICAgICAgICAgICAgLy8gMikgTG9vcCB0aHJvdWdoIGFueSBsaXN0ZW5lcnMgYW5kIG5vdGlmeSB0aGVtIHRoYXQgZXhlY0NvbW1hbmQgd2FzIGNhbGxlZFxuICAgICAgICAgICAgLy8gICAgcGFzc2luZyBleHRyYSBpbmZvIG9uIHRoZSBjYWxsXG4gICAgICAgICAgICAvLyAzKSBSZXR1cm4gdGhlIHJlc3VsdFxuICAgICAgICAgICAgICAgIHdyYXBwZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciByZXN1bHQgPSBkb2MuZXhlY0NvbW1hbmQub3JpZy5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmICghZG9jLmV4ZWNDb21tYW5kLmxpc3RlbmVycykge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIHZhciBhcmdzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzKTtcbiAgICAgICAgICAgICAgICAgICAgY2FsbExpc3RlbmVycyhhcmdzLCByZXN1bHQpO1xuXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgLy8gU3RvcmUgYSByZWZlcmVuY2UgdG8gdGhlIG9yaWdpbmFsIGV4ZWNDb21tYW5kXG4gICAgICAgICAgICB3cmFwcGVyLm9yaWcgPSBkb2MuZXhlY0NvbW1hbmQ7XG5cbiAgICAgICAgICAgIC8vIEF0dGFjaCBhbiBhcnJheSBmb3Igc3RvcmluZyBsaXN0ZW5lcnNcbiAgICAgICAgICAgIHdyYXBwZXIubGlzdGVuZXJzID0gW107XG5cbiAgICAgICAgICAgIC8vIEhlbHBlciBmb3Igbm90aWZ5aW5nIGxpc3RlbmVyc1xuICAgICAgICAgICAgd3JhcHBlci5jYWxsTGlzdGVuZXJzID0gY2FsbExpc3RlbmVycztcblxuICAgICAgICAgICAgLy8gT3ZlcndyaXRlIGV4ZWNDb21tYW5kXG4gICAgICAgICAgICBkb2MuZXhlY0NvbW1hbmQgPSB3cmFwcGVyO1xuICAgICAgICB9LFxuXG4gICAgICAgIC8vIFJldmVydCBkb2N1bWVudC5leGVjQ29tbWFuZCBiYWNrIHRvIGl0cyBvcmlnaW5hbCBzZWxmXG4gICAgICAgIHVud3JhcEV4ZWNDb21tYW5kOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgZG9jID0gdGhpcy5vcHRpb25zLm93bmVyRG9jdW1lbnQ7XG4gICAgICAgICAgICBpZiAoIWRvYy5leGVjQ29tbWFuZC5vcmlnKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBVc2UgdGhlIHJlZmVyZW5jZSB0byB0aGUgb3JpZ2luYWwgZXhlY0NvbW1hbmQgdG8gcmV2ZXJ0IGJhY2tcbiAgICAgICAgICAgIGRvYy5leGVjQ29tbWFuZCA9IGRvYy5leGVjQ29tbWFuZC5vcmlnO1xuICAgICAgICB9LFxuXG4gICAgICAgIC8vIExpc3RlbmluZyB0byBicm93c2VyIGV2ZW50cyB0byBlbWl0IGV2ZW50cyBtZWRpdW0tZWRpdG9yIGNhcmVzIGFib3V0XG4gICAgICAgIHNldHVwTGlzdGVuZXI6IGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5saXN0ZW5lcnNbbmFtZV0pIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHN3aXRjaCAobmFtZSkge1xuICAgICAgICAgICAgICAgIGNhc2UgJ2V4dGVybmFsSW50ZXJhY3Rpb24nOlxuICAgICAgICAgICAgICAgICAgICAvLyBEZXRlY3Rpbmcgd2hlbiB1c2VyIGhhcyBpbnRlcmFjdGVkIHdpdGggZWxlbWVudHMgb3V0c2lkZSBvZiBNZWRpdW1FZGl0b3JcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hdHRhY2hET01FdmVudCh0aGlzLm9wdGlvbnMub3duZXJEb2N1bWVudC5ib2R5LCAnbW91c2Vkb3duJywgdGhpcy5oYW5kbGVCb2R5TW91c2Vkb3duLmJpbmQodGhpcyksIHRydWUpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmF0dGFjaERPTUV2ZW50KHRoaXMub3B0aW9ucy5vd25lckRvY3VtZW50LmJvZHksICdjbGljaycsIHRoaXMuaGFuZGxlQm9keUNsaWNrLmJpbmQodGhpcyksIHRydWUpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmF0dGFjaERPTUV2ZW50KHRoaXMub3B0aW9ucy5vd25lckRvY3VtZW50LmJvZHksICdmb2N1cycsIHRoaXMuaGFuZGxlQm9keUZvY3VzLmJpbmQodGhpcyksIHRydWUpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdibHVyJzpcbiAgICAgICAgICAgICAgICAgICAgLy8gRGV0ZWN0aW5nIHdoZW4gZm9jdXMgaXMgbG9zdFxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldHVwTGlzdGVuZXIoJ2V4dGVybmFsSW50ZXJhY3Rpb24nKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnZm9jdXMnOlxuICAgICAgICAgICAgICAgICAgICAvLyBEZXRlY3Rpbmcgd2hlbiBmb2N1cyBtb3ZlcyBpbnRvIHNvbWUgcGFydCBvZiBNZWRpdW1FZGl0b3JcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXR1cExpc3RlbmVyKCdleHRlcm5hbEludGVyYWN0aW9uJyk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ2VkaXRhYmxlSW5wdXQnOlxuICAgICAgICAgICAgICAgICAgICAvLyBzZXR1cCBjYWNoZSBmb3Iga25vd2luZyB3aGVuIHRoZSBjb250ZW50IGhhcyBjaGFuZ2VkXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY29udGVudENhY2hlID0ge307XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYmFzZS5lbGVtZW50cy5mb3JFYWNoKGZ1bmN0aW9uIChlbGVtZW50KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbnRlbnRDYWNoZVtlbGVtZW50LmdldEF0dHJpYnV0ZSgnbWVkaXVtLWVkaXRvci1pbmRleCcpXSA9IGVsZW1lbnQuaW5uZXJIVE1MO1xuICAgICAgICAgICAgICAgICAgICB9LCB0aGlzKTtcblxuICAgICAgICAgICAgICAgICAgICAvLyBBdHRhY2ggdG8gdGhlICdvbmlucHV0JyBldmVudCwgaGFuZGxlZCBjb3JyZWN0bHkgYnkgbW9zdCBicm93c2Vyc1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5JbnB1dEV2ZW50T25Db250ZW50ZWRpdGFibGVTdXBwb3J0ZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYXR0YWNoVG9FYWNoRWxlbWVudCgnaW5wdXQnLCB0aGlzLmhhbmRsZUlucHV0KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIC8vIEZvciBicm93c2VycyB3aGljaCBkb24ndCBzdXBwb3J0IHRoZSBpbnB1dCBldmVudCBvbiBjb250ZW50ZWRpdGFibGUgKElFKVxuICAgICAgICAgICAgICAgICAgICAvLyB3ZSdsbCBhdHRhY2ggdG8gJ3NlbGVjdGlvbmNoYW5nZScgb24gdGhlIGRvY3VtZW50IGFuZCAna2V5cHJlc3MnIG9uIHRoZSBlZGl0YWJsZXNcbiAgICAgICAgICAgICAgICAgICAgaWYgKCF0aGlzLklucHV0RXZlbnRPbkNvbnRlbnRlZGl0YWJsZVN1cHBvcnRlZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXR1cExpc3RlbmVyKCdlZGl0YWJsZUtleXByZXNzJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmtleXByZXNzVXBkYXRlSW5wdXQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5hdHRhY2hET01FdmVudChkb2N1bWVudCwgJ3NlbGVjdGlvbmNoYW5nZScsIHRoaXMuaGFuZGxlRG9jdW1lbnRTZWxlY3Rpb25DaGFuZ2UuYmluZCh0aGlzKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBMaXN0ZW4gdG8gY2FsbHMgdG8gZXhlY0NvbW1hbmRcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYXR0YWNoVG9FeGVjQ29tbWFuZCgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ2VkaXRhYmxlQ2xpY2snOlxuICAgICAgICAgICAgICAgICAgICAvLyBEZXRlY3RpbmcgY2xpY2sgaW4gdGhlIGNvbnRlbnRlZGl0YWJsZXNcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hdHRhY2hUb0VhY2hFbGVtZW50KCdjbGljaycsIHRoaXMuaGFuZGxlQ2xpY2spO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdlZGl0YWJsZUJsdXInOlxuICAgICAgICAgICAgICAgICAgICAvLyBEZXRlY3RpbmcgYmx1ciBpbiB0aGUgY29udGVudGVkaXRhYmxlc1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmF0dGFjaFRvRWFjaEVsZW1lbnQoJ2JsdXInLCB0aGlzLmhhbmRsZUJsdXIpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdlZGl0YWJsZUtleXByZXNzJzpcbiAgICAgICAgICAgICAgICAgICAgLy8gRGV0ZWN0aW5nIGtleXByZXNzIGluIHRoZSBjb250ZW50ZWRpdGFibGVzXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYXR0YWNoVG9FYWNoRWxlbWVudCgna2V5cHJlc3MnLCB0aGlzLmhhbmRsZUtleXByZXNzKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnZWRpdGFibGVLZXl1cCc6XG4gICAgICAgICAgICAgICAgICAgIC8vIERldGVjdGluZyBrZXl1cCBpbiB0aGUgY29udGVudGVkaXRhYmxlc1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmF0dGFjaFRvRWFjaEVsZW1lbnQoJ2tleXVwJywgdGhpcy5oYW5kbGVLZXl1cCk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ2VkaXRhYmxlS2V5ZG93bic6XG4gICAgICAgICAgICAgICAgICAgIC8vIERldGVjdGluZyBrZXlkb3duIG9uIHRoZSBjb250ZW50ZWRpdGFibGVzXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYXR0YWNoVG9FYWNoRWxlbWVudCgna2V5ZG93bicsIHRoaXMuaGFuZGxlS2V5ZG93bik7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ2VkaXRhYmxlS2V5ZG93blNwYWNlJzpcbiAgICAgICAgICAgICAgICAgICAgLy8gRGV0ZWN0aW5nIGtleWRvd24gZm9yIFNQQUNFIG9uIHRoZSBjb250ZW50ZWRpdGFibGVzXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0dXBMaXN0ZW5lcignZWRpdGFibGVLZXlkb3duJyk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ2VkaXRhYmxlS2V5ZG93bkVudGVyJzpcbiAgICAgICAgICAgICAgICAgICAgLy8gRGV0ZWN0aW5nIGtleWRvd24gZm9yIEVOVEVSIG9uIHRoZSBjb250ZW50ZWRpdGFibGVzXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0dXBMaXN0ZW5lcignZWRpdGFibGVLZXlkb3duJyk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ2VkaXRhYmxlS2V5ZG93blRhYic6XG4gICAgICAgICAgICAgICAgICAgIC8vIERldGVjdGluZyBrZXlkb3duIGZvciBUQUIgb24gdGhlIGNvbnRlbnRlZGl0YWJsZVxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldHVwTGlzdGVuZXIoJ2VkaXRhYmxlS2V5ZG93bicpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdlZGl0YWJsZUtleWRvd25EZWxldGUnOlxuICAgICAgICAgICAgICAgICAgICAvLyBEZXRlY3Rpbmcga2V5ZG93biBmb3IgREVMRVRFL0JBQ0tTUEFDRSBvbiB0aGUgY29udGVudGVkaXRhYmxlc1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldHVwTGlzdGVuZXIoJ2VkaXRhYmxlS2V5ZG93bicpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdlZGl0YWJsZU1vdXNlb3Zlcic6XG4gICAgICAgICAgICAgICAgICAgIC8vIERldGVjdGluZyBtb3VzZW92ZXIgb24gdGhlIGNvbnRlbnRlZGl0YWJsZXNcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hdHRhY2hUb0VhY2hFbGVtZW50KCdtb3VzZW92ZXInLCB0aGlzLmhhbmRsZU1vdXNlb3Zlcik7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ2VkaXRhYmxlRHJhZyc6XG4gICAgICAgICAgICAgICAgICAgIC8vIERldGVjdGluZyBkcmFnb3ZlciBhbmQgZHJhZ2xlYXZlIG9uIHRoZSBjb250ZW50ZWRpdGFibGVzXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYXR0YWNoVG9FYWNoRWxlbWVudCgnZHJhZ292ZXInLCB0aGlzLmhhbmRsZURyYWdnaW5nKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hdHRhY2hUb0VhY2hFbGVtZW50KCdkcmFnbGVhdmUnLCB0aGlzLmhhbmRsZURyYWdnaW5nKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnZWRpdGFibGVEcm9wJzpcbiAgICAgICAgICAgICAgICAgICAgLy8gRGV0ZWN0aW5nIGRyb3Agb24gdGhlIGNvbnRlbnRlZGl0YWJsZXNcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hdHRhY2hUb0VhY2hFbGVtZW50KCdkcm9wJywgdGhpcy5oYW5kbGVEcm9wKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgLy8gVE9ETzogV2UgbmVlZCB0byBoYXZlIGEgY3VzdG9tICdwYXN0ZScgZXZlbnQgc2VwYXJhdGUgZnJvbSAnZWRpdGFibGVQYXN0ZSdcbiAgICAgICAgICAgICAgICAvLyBOZWVkIHRvIHRoaW5rIGFib3V0IHRoZSB3YXkgdG8gaW50cm9kdWNlIHRoaXMgd2l0aG91dCBicmVha2luZyBmb2xrc1xuICAgICAgICAgICAgICAgIGNhc2UgJ2VkaXRhYmxlUGFzdGUnOlxuICAgICAgICAgICAgICAgICAgICAvLyBEZXRlY3RpbmcgcGFzdGUgb24gdGhlIGNvbnRlbnRlZGl0YWJsZXNcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hdHRhY2hUb0VhY2hFbGVtZW50KCdwYXN0ZScsIHRoaXMuaGFuZGxlUGFzdGUpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMubGlzdGVuZXJzW25hbWVdID0gdHJ1ZTtcbiAgICAgICAgfSxcblxuICAgICAgICBhdHRhY2hUb0VhY2hFbGVtZW50OiBmdW5jdGlvbiAobmFtZSwgaGFuZGxlcikge1xuICAgICAgICAgICAgLy8gYnVpbGQgb3VyIGludGVybmFsIGNhY2hlIHRvIGtub3cgd2hpY2ggZWxlbWVudCBnb3QgYWxyZWFkeSB3aGF0IGhhbmRsZXIgYXR0YWNoZWRcbiAgICAgICAgICAgIGlmICghdGhpcy5ldmVudHNDYWNoZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuZXZlbnRzQ2FjaGUgPSBbXTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5iYXNlLmVsZW1lbnRzLmZvckVhY2goZnVuY3Rpb24gKGVsZW1lbnQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmF0dGFjaERPTUV2ZW50KGVsZW1lbnQsIG5hbWUsIGhhbmRsZXIuYmluZCh0aGlzKSk7XG4gICAgICAgICAgICB9LCB0aGlzKTtcblxuICAgICAgICAgICAgdGhpcy5ldmVudHNDYWNoZS5wdXNoKHsgJ25hbWUnOiBuYW1lLCAnaGFuZGxlcic6IGhhbmRsZXIgfSk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgY2xlYW51cEVsZW1lbnQ6IGZ1bmN0aW9uIChlbGVtZW50KSB7XG4gICAgICAgICAgICB2YXIgaW5kZXggPSBlbGVtZW50LmdldEF0dHJpYnV0ZSgnbWVkaXVtLWVkaXRvci1pbmRleCcpO1xuICAgICAgICAgICAgaWYgKGluZGV4KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5kZXRhY2hBbGxFdmVudHNGcm9tRWxlbWVudChlbGVtZW50KTtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5jb250ZW50Q2FjaGUpIHtcbiAgICAgICAgICAgICAgICAgICAgZGVsZXRlIHRoaXMuY29udGVudENhY2hlW2luZGV4XTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgZm9jdXNFbGVtZW50OiBmdW5jdGlvbiAoZWxlbWVudCkge1xuICAgICAgICAgICAgZWxlbWVudC5mb2N1cygpO1xuICAgICAgICAgICAgdGhpcy51cGRhdGVGb2N1cyhlbGVtZW50LCB7IHRhcmdldDogZWxlbWVudCwgdHlwZTogJ2ZvY3VzJyB9KTtcbiAgICAgICAgfSxcblxuICAgICAgICB1cGRhdGVGb2N1czogZnVuY3Rpb24gKHRhcmdldCwgZXZlbnRPYmopIHtcbiAgICAgICAgICAgIHZhciBoYWRGb2N1cyA9IHRoaXMuYmFzZS5nZXRGb2N1c2VkRWxlbWVudCgpLFxuICAgICAgICAgICAgICAgIHRvRm9jdXM7XG5cbiAgICAgICAgICAgIC8vIEZvciBjbGlja3MsIHdlIG5lZWQgdG8ga25vdyBpZiB0aGUgbW91c2Vkb3duIHRoYXQgY2F1c2VkIHRoZSBjbGljayBoYXBwZW5lZCBpbnNpZGUgdGhlIGV4aXN0aW5nIGZvY3VzZWQgZWxlbWVudFxuICAgICAgICAgICAgLy8gb3Igb25lIG9mIHRoZSBleHRlbnNpb24gZWxlbWVudHMuICBJZiBzbywgd2UgZG9uJ3Qgd2FudCB0byBmb2N1cyBhbm90aGVyIGVsZW1lbnRcbiAgICAgICAgICAgIGlmIChoYWRGb2N1cyAmJlxuICAgICAgICAgICAgICAgICAgICBldmVudE9iai50eXBlID09PSAnY2xpY2snICYmXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubGFzdE1vdXNlZG93blRhcmdldCAmJlxuICAgICAgICAgICAgICAgICAgICAoTWVkaXVtRWRpdG9yLnV0aWwuaXNEZXNjZW5kYW50KGhhZEZvY3VzLCB0aGlzLmxhc3RNb3VzZWRvd25UYXJnZXQsIHRydWUpIHx8XG4gICAgICAgICAgICAgICAgICAgICBpc0VsZW1lbnREZXNjZW5kYW50T2ZFeHRlbnNpb24odGhpcy5iYXNlLmV4dGVuc2lvbnMsIHRoaXMubGFzdE1vdXNlZG93blRhcmdldCkpKSB7XG4gICAgICAgICAgICAgICAgdG9Gb2N1cyA9IGhhZEZvY3VzO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoIXRvRm9jdXMpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmJhc2UuZWxlbWVudHMuc29tZShmdW5jdGlvbiAoZWxlbWVudCkge1xuICAgICAgICAgICAgICAgICAgICAvLyBJZiB0aGUgdGFyZ2V0IGlzIHBhcnQgb2YgYW4gZWRpdG9yIGVsZW1lbnQsIHRoaXMgaXMgdGhlIGVsZW1lbnQgZ2V0dGluZyBmb2N1c1xuICAgICAgICAgICAgICAgICAgICBpZiAoIXRvRm9jdXMgJiYgKE1lZGl1bUVkaXRvci51dGlsLmlzRGVzY2VuZGFudChlbGVtZW50LCB0YXJnZXQsIHRydWUpKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdG9Gb2N1cyA9IGVsZW1lbnQ7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAvLyBiYWlsIGlmIHdlIGZvdW5kIGFuIGVsZW1lbnQgdGhhdCdzIGdldHRpbmcgZm9jdXNcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICEhdG9Gb2N1cztcbiAgICAgICAgICAgICAgICB9LCB0aGlzKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gQ2hlY2sgaWYgdGhlIHRhcmdldCBpcyBleHRlcm5hbCAobm90IHBhcnQgb2YgdGhlIGVkaXRvciwgdG9vbGJhciwgb3IgYW55IG90aGVyIGV4dGVuc2lvbilcbiAgICAgICAgICAgIHZhciBleHRlcm5hbEV2ZW50ID0gIU1lZGl1bUVkaXRvci51dGlsLmlzRGVzY2VuZGFudChoYWRGb2N1cywgdGFyZ2V0LCB0cnVlKSAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAhaXNFbGVtZW50RGVzY2VuZGFudE9mRXh0ZW5zaW9uKHRoaXMuYmFzZS5leHRlbnNpb25zLCB0YXJnZXQpO1xuXG4gICAgICAgICAgICBpZiAodG9Gb2N1cyAhPT0gaGFkRm9jdXMpIHtcbiAgICAgICAgICAgICAgICAvLyBJZiBlbGVtZW50IGhhcyBmb2N1cywgYW5kIGZvY3VzIGlzIGdvaW5nIG91dHNpZGUgb2YgZWRpdG9yXG4gICAgICAgICAgICAgICAgLy8gRG9uJ3QgYmx1ciBmb2N1c2VkIGVsZW1lbnQgaWYgY2xpY2tpbmcgb24gZWRpdG9yLCB0b29sYmFyLCBvciBhbmNob3JwcmV2aWV3XG4gICAgICAgICAgICAgICAgaWYgKGhhZEZvY3VzICYmIGV4dGVybmFsRXZlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gVHJpZ2dlciBibHVyIG9uIHRoZSBlZGl0YWJsZSB0aGF0IGhhcyBsb3N0IGZvY3VzXG4gICAgICAgICAgICAgICAgICAgIGhhZEZvY3VzLnJlbW92ZUF0dHJpYnV0ZSgnZGF0YS1tZWRpdW0tZm9jdXNlZCcpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnRyaWdnZXJDdXN0b21FdmVudCgnYmx1cicsIGV2ZW50T2JqLCBoYWRGb2N1cyk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgLy8gSWYgZm9jdXMgaXMgZ29pbmcgaW50byBhbiBlZGl0b3IgZWxlbWVudFxuICAgICAgICAgICAgICAgIGlmICh0b0ZvY3VzKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIFRyaWdnZXIgZm9jdXMgb24gdGhlIGVkaXRhYmxlIHRoYXQgbm93IGhhcyBmb2N1c1xuICAgICAgICAgICAgICAgICAgICB0b0ZvY3VzLnNldEF0dHJpYnV0ZSgnZGF0YS1tZWRpdW0tZm9jdXNlZCcsIHRydWUpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnRyaWdnZXJDdXN0b21FdmVudCgnZm9jdXMnLCBldmVudE9iaiwgdG9Gb2N1cyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoZXh0ZXJuYWxFdmVudCkge1xuICAgICAgICAgICAgICAgIHRoaXMudHJpZ2dlckN1c3RvbUV2ZW50KCdleHRlcm5hbEludGVyYWN0aW9uJywgZXZlbnRPYmopO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIHVwZGF0ZUlucHV0OiBmdW5jdGlvbiAodGFyZ2V0LCBldmVudE9iaikge1xuICAgICAgICAgICAgaWYgKCF0aGlzLmNvbnRlbnRDYWNoZSkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIEFuIGV2ZW50IHRyaWdnZXJlZCB3aGljaCBzaWduaWZpZXMgdGhhdCB0aGUgdXNlciBtYXkgaGF2ZSBjaGFuZ2VkIHNvbWV0aW5nXG4gICAgICAgICAgICAvLyBMb29rIGluIG91ciBjYWNoZSBvZiBpbnB1dCBmb3IgdGhlIGNvbnRlbnRlZGl0YWJsZXMgdG8gc2VlIGlmIHNvbWV0aGluZyBjaGFuZ2VkXG4gICAgICAgICAgICB2YXIgaW5kZXggPSB0YXJnZXQuZ2V0QXR0cmlidXRlKCdtZWRpdW0tZWRpdG9yLWluZGV4JyksXG4gICAgICAgICAgICAgICAgaHRtbCA9IHRhcmdldC5pbm5lckhUTUw7XG5cbiAgICAgICAgICAgIGlmIChodG1sICE9PSB0aGlzLmNvbnRlbnRDYWNoZVtpbmRleF0pIHtcbiAgICAgICAgICAgICAgICAvLyBUaGUgY29udGVudCBoYXMgY2hhbmdlZCBzaW5jZSB0aGUgbGFzdCB0aW1lIHdlIGNoZWNrZWQsIGZpcmUgdGhlIGV2ZW50XG4gICAgICAgICAgICAgICAgdGhpcy50cmlnZ2VyQ3VzdG9tRXZlbnQoJ2VkaXRhYmxlSW5wdXQnLCBldmVudE9iaiwgdGFyZ2V0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuY29udGVudENhY2hlW2luZGV4XSA9IGh0bWw7XG4gICAgICAgIH0sXG5cbiAgICAgICAgaGFuZGxlRG9jdW1lbnRTZWxlY3Rpb25DaGFuZ2U6IGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICAgICAgLy8gV2hlbiBzZWxlY3Rpb25jaGFuZ2UgZmlyZXMsIHRhcmdldCBhbmQgY3VycmVudCB0YXJnZXQgYXJlIHNldFxuICAgICAgICAgICAgLy8gdG8gZG9jdW1lbnQsIHNpbmNlIHRoaXMgaXMgd2hlcmUgdGhlIGV2ZW50IGlzIGhhbmRsZWRcbiAgICAgICAgICAgIC8vIEhvd2V2ZXIsIGN1cnJlbnRUYXJnZXQgd2lsbCBoYXZlIGFuICdhY3RpdmVFbGVtZW50JyBwcm9wZXJ0eVxuICAgICAgICAgICAgLy8gd2hpY2ggd2lsbCBwb2ludCB0byB3aGF0ZXZlciBlbGVtZW50IGhhcyBmb2N1cy5cbiAgICAgICAgICAgIGlmIChldmVudC5jdXJyZW50VGFyZ2V0ICYmIGV2ZW50LmN1cnJlbnRUYXJnZXQuYWN0aXZlRWxlbWVudCkge1xuICAgICAgICAgICAgICAgIHZhciBhY3RpdmVFbGVtZW50ID0gZXZlbnQuY3VycmVudFRhcmdldC5hY3RpdmVFbGVtZW50LFxuICAgICAgICAgICAgICAgICAgICBjdXJyZW50VGFyZ2V0O1xuICAgICAgICAgICAgICAgIC8vIFdlIGNhbiBsb29rIGF0IHRoZSAnYWN0aXZlRWxlbWVudCcgdG8gZGV0ZXJtaW5lIGlmIHRoZSBzZWxlY3Rpb25jaGFuZ2UgaGFzXG4gICAgICAgICAgICAgICAgLy8gaGFwcGVuZWQgd2l0aGluIGEgY29udGVudGVkaXRhYmxlIG93bmVkIGJ5IHRoaXMgaW5zdGFuY2Ugb2YgTWVkaXVtRWRpdG9yXG4gICAgICAgICAgICAgICAgdGhpcy5iYXNlLmVsZW1lbnRzLnNvbWUoZnVuY3Rpb24gKGVsZW1lbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKE1lZGl1bUVkaXRvci51dGlsLmlzRGVzY2VuZGFudChlbGVtZW50LCBhY3RpdmVFbGVtZW50LCB0cnVlKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY3VycmVudFRhcmdldCA9IGVsZW1lbnQ7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgfSwgdGhpcyk7XG5cbiAgICAgICAgICAgICAgICAvLyBXZSBrbm93IHNlbGVjdGlvbmNoYW5nZSBmaXJlZCB3aXRoaW4gb25lIG9mIG91ciBjb250ZW50ZWRpdGFibGVzXG4gICAgICAgICAgICAgICAgaWYgKGN1cnJlbnRUYXJnZXQpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy51cGRhdGVJbnB1dChjdXJyZW50VGFyZ2V0LCB7IHRhcmdldDogYWN0aXZlRWxlbWVudCwgY3VycmVudFRhcmdldDogY3VycmVudFRhcmdldCB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgaGFuZGxlRG9jdW1lbnRFeGVjQ29tbWFuZDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgLy8gZG9jdW1lbnQuZXhlY0NvbW1hbmQgaGFzIGJlZW4gY2FsbGVkXG4gICAgICAgICAgICAvLyBJZiBvbmUgb2Ygb3VyIGNvbnRlbnRlZGl0YWJsZXMgY3VycmVudGx5IGhhcyBmb2N1cywgd2Ugc2hvdWxkXG4gICAgICAgICAgICAvLyBhdHRlbXB0IHRvIHRyaWdnZXIgdGhlICdlZGl0YWJsZUlucHV0JyBldmVudFxuICAgICAgICAgICAgdmFyIHRhcmdldCA9IHRoaXMuYmFzZS5nZXRGb2N1c2VkRWxlbWVudCgpO1xuICAgICAgICAgICAgaWYgKHRhcmdldCkge1xuICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlSW5wdXQodGFyZ2V0LCB7IHRhcmdldDogdGFyZ2V0LCBjdXJyZW50VGFyZ2V0OiB0YXJnZXQgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgaGFuZGxlQm9keUNsaWNrOiBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlRm9jdXMoZXZlbnQudGFyZ2V0LCBldmVudCk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgaGFuZGxlQm9keUZvY3VzOiBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlRm9jdXMoZXZlbnQudGFyZ2V0LCBldmVudCk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgaGFuZGxlQm9keU1vdXNlZG93bjogZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgICAgICB0aGlzLmxhc3RNb3VzZWRvd25UYXJnZXQgPSBldmVudC50YXJnZXQ7XG4gICAgICAgIH0sXG5cbiAgICAgICAgaGFuZGxlSW5wdXQ6IGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICAgICAgdGhpcy51cGRhdGVJbnB1dChldmVudC5jdXJyZW50VGFyZ2V0LCBldmVudCk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgaGFuZGxlQ2xpY2s6IGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICAgICAgdGhpcy50cmlnZ2VyQ3VzdG9tRXZlbnQoJ2VkaXRhYmxlQ2xpY2snLCBldmVudCwgZXZlbnQuY3VycmVudFRhcmdldCk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgaGFuZGxlQmx1cjogZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgICAgICB0aGlzLnRyaWdnZXJDdXN0b21FdmVudCgnZWRpdGFibGVCbHVyJywgZXZlbnQsIGV2ZW50LmN1cnJlbnRUYXJnZXQpO1xuICAgICAgICB9LFxuXG4gICAgICAgIGhhbmRsZUtleXByZXNzOiBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgICAgIHRoaXMudHJpZ2dlckN1c3RvbUV2ZW50KCdlZGl0YWJsZUtleXByZXNzJywgZXZlbnQsIGV2ZW50LmN1cnJlbnRUYXJnZXQpO1xuXG4gICAgICAgICAgICAvLyBJZiB3ZSdyZSBkb2luZyBtYW51YWwgZGV0ZWN0aW9uIG9mIHRoZSBlZGl0YWJsZUlucHV0IGV2ZW50IHdlIG5lZWRcbiAgICAgICAgICAgIC8vIHRvIGNoZWNrIGZvciBpbnB1dCBjaGFuZ2VzIGR1cmluZyAna2V5cHJlc3MnXG4gICAgICAgICAgICBpZiAodGhpcy5rZXlwcmVzc1VwZGF0ZUlucHV0KSB7XG4gICAgICAgICAgICAgICAgdmFyIGV2ZW50T2JqID0geyB0YXJnZXQ6IGV2ZW50LnRhcmdldCwgY3VycmVudFRhcmdldDogZXZlbnQuY3VycmVudFRhcmdldCB9O1xuXG4gICAgICAgICAgICAgICAgLy8gSW4gSUUsIHdlIG5lZWQgdG8gbGV0IHRoZSByZXN0IG9mIHRoZSBldmVudCBzdGFjayBjb21wbGV0ZSBiZWZvcmUgd2UgZGV0ZWN0XG4gICAgICAgICAgICAgICAgLy8gY2hhbmdlcyB0byBpbnB1dCwgc28gdXNpbmcgc2V0VGltZW91dCBoZXJlXG4gICAgICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlSW5wdXQoZXZlbnRPYmouY3VycmVudFRhcmdldCwgZXZlbnRPYmopO1xuICAgICAgICAgICAgICAgIH0uYmluZCh0aGlzKSwgMCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgaGFuZGxlS2V5dXA6IGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICAgICAgdGhpcy50cmlnZ2VyQ3VzdG9tRXZlbnQoJ2VkaXRhYmxlS2V5dXAnLCBldmVudCwgZXZlbnQuY3VycmVudFRhcmdldCk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgaGFuZGxlTW91c2VvdmVyOiBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgICAgIHRoaXMudHJpZ2dlckN1c3RvbUV2ZW50KCdlZGl0YWJsZU1vdXNlb3ZlcicsIGV2ZW50LCBldmVudC5jdXJyZW50VGFyZ2V0KTtcbiAgICAgICAgfSxcblxuICAgICAgICBoYW5kbGVEcmFnZ2luZzogZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgICAgICB0aGlzLnRyaWdnZXJDdXN0b21FdmVudCgnZWRpdGFibGVEcmFnJywgZXZlbnQsIGV2ZW50LmN1cnJlbnRUYXJnZXQpO1xuICAgICAgICB9LFxuXG4gICAgICAgIGhhbmRsZURyb3A6IGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICAgICAgdGhpcy50cmlnZ2VyQ3VzdG9tRXZlbnQoJ2VkaXRhYmxlRHJvcCcsIGV2ZW50LCBldmVudC5jdXJyZW50VGFyZ2V0KTtcbiAgICAgICAgfSxcblxuICAgICAgICBoYW5kbGVQYXN0ZTogZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgICAgICB0aGlzLnRyaWdnZXJDdXN0b21FdmVudCgnZWRpdGFibGVQYXN0ZScsIGV2ZW50LCBldmVudC5jdXJyZW50VGFyZ2V0KTtcbiAgICAgICAgfSxcblxuICAgICAgICBoYW5kbGVLZXlkb3duOiBmdW5jdGlvbiAoZXZlbnQpIHtcblxuICAgICAgICAgICAgdGhpcy50cmlnZ2VyQ3VzdG9tRXZlbnQoJ2VkaXRhYmxlS2V5ZG93bicsIGV2ZW50LCBldmVudC5jdXJyZW50VGFyZ2V0KTtcblxuICAgICAgICAgICAgaWYgKE1lZGl1bUVkaXRvci51dGlsLmlzS2V5KGV2ZW50LCBNZWRpdW1FZGl0b3IudXRpbC5rZXlDb2RlLlNQQUNFKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnRyaWdnZXJDdXN0b21FdmVudCgnZWRpdGFibGVLZXlkb3duU3BhY2UnLCBldmVudCwgZXZlbnQuY3VycmVudFRhcmdldCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChNZWRpdW1FZGl0b3IudXRpbC5pc0tleShldmVudCwgTWVkaXVtRWRpdG9yLnV0aWwua2V5Q29kZS5FTlRFUikgfHwgKGV2ZW50LmN0cmxLZXkgJiYgTWVkaXVtRWRpdG9yLnV0aWwuaXNLZXkoZXZlbnQsIE1lZGl1bUVkaXRvci51dGlsLmtleUNvZGUuTSkpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMudHJpZ2dlckN1c3RvbUV2ZW50KCdlZGl0YWJsZUtleWRvd25FbnRlcicsIGV2ZW50LCBldmVudC5jdXJyZW50VGFyZ2V0KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKE1lZGl1bUVkaXRvci51dGlsLmlzS2V5KGV2ZW50LCBNZWRpdW1FZGl0b3IudXRpbC5rZXlDb2RlLlRBQikpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy50cmlnZ2VyQ3VzdG9tRXZlbnQoJ2VkaXRhYmxlS2V5ZG93blRhYicsIGV2ZW50LCBldmVudC5jdXJyZW50VGFyZ2V0KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKE1lZGl1bUVkaXRvci51dGlsLmlzS2V5KGV2ZW50LCBbTWVkaXVtRWRpdG9yLnV0aWwua2V5Q29kZS5ERUxFVEUsIE1lZGl1bUVkaXRvci51dGlsLmtleUNvZGUuQkFDS1NQQUNFXSkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy50cmlnZ2VyQ3VzdG9tRXZlbnQoJ2VkaXRhYmxlS2V5ZG93bkRlbGV0ZScsIGV2ZW50LCBldmVudC5jdXJyZW50VGFyZ2V0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG5cbiAgICBNZWRpdW1FZGl0b3IuRXZlbnRzID0gRXZlbnRzO1xufSgpKTtcblxuKGZ1bmN0aW9uICgpIHtcbiAgICAndXNlIHN0cmljdCc7XG5cbiAgICB2YXIgQnV0dG9uID0gTWVkaXVtRWRpdG9yLkV4dGVuc2lvbi5leHRlbmQoe1xuXG4gICAgICAgIC8qIEJ1dHRvbiBPcHRpb25zICovXG5cbiAgICAgICAgLyogYWN0aW9uOiBbc3RyaW5nXVxuICAgICAgICAgKiBUaGUgYWN0aW9uIGFyZ3VtZW50IHRvIHBhc3MgdG8gTWVkaXVtRWRpdG9yLmV4ZWNBY3Rpb24oKVxuICAgICAgICAgKiB3aGVuIHRoZSBidXR0b24gaXMgY2xpY2tlZFxuICAgICAgICAgKi9cbiAgICAgICAgYWN0aW9uOiB1bmRlZmluZWQsXG5cbiAgICAgICAgLyogYXJpYTogW3N0cmluZ11cbiAgICAgICAgICogVGhlIHZhbHVlIHRvIGFkZCBhcyB0aGUgYXJpYS1sYWJlbCBhdHRyaWJ1dGUgb2YgdGhlIGJ1dHRvblxuICAgICAgICAgKiBlbGVtZW50IGRpc3BsYXllZCBpbiB0aGUgdG9vbGJhci5cbiAgICAgICAgICogVGhpcyBpcyBhbHNvIHVzZWQgYXMgdGhlIHRvb2x0aXAgZm9yIHRoZSBidXR0b25cbiAgICAgICAgICovXG4gICAgICAgIGFyaWE6IHVuZGVmaW5lZCxcblxuICAgICAgICAvKiB0YWdOYW1lczogW0FycmF5XVxuICAgICAgICAgKiBOT1RFOiBUaGlzIGlzIG5vdCB1c2VkIGlmIHVzZVF1ZXJ5U3RhdGUgaXMgc2V0IHRvIHRydWUuXG4gICAgICAgICAqXG4gICAgICAgICAqIEFycmF5IG9mIGVsZW1lbnQgdGFnIG5hbWVzIHRoYXQgd291bGQgaW5kaWNhdGUgdGhhdCB0aGlzXG4gICAgICAgICAqIGJ1dHRvbiBoYXMgYWxyZWFkeSBiZWVuIGFwcGxpZWQuIElmIHRoaXMgYWN0aW9uIGhhcyBhbHJlYWR5XG4gICAgICAgICAqIGJlZW4gYXBwbGllZCwgdGhlIGJ1dHRvbiB3aWxsIGJlIGRpc3BsYXllZCBhcyAnYWN0aXZlJyBpbiB0aGUgdG9vbGJhclxuICAgICAgICAgKlxuICAgICAgICAgKiBFeGFtcGxlOlxuICAgICAgICAgKiBGb3IgJ2JvbGQnLCBpZiB0aGUgdGV4dCBpcyBldmVyIHdpdGhpbiBhIDxiPiBvciA8c3Ryb25nPlxuICAgICAgICAgKiB0YWcgdGhhdCBpbmRpY2F0ZXMgdGhlIHRleHQgaXMgYWxyZWFkeSBib2xkLiBTbyB0aGUgYXJyYXlcbiAgICAgICAgICogb2YgdGFnTmFtZXMgZm9yIGJvbGQgd291bGQgYmU6IFsnYicsICdzdHJvbmcnXVxuICAgICAgICAgKi9cbiAgICAgICAgdGFnTmFtZXM6IHVuZGVmaW5lZCxcblxuICAgICAgICAvKiBzdHlsZTogW09iamVjdF1cbiAgICAgICAgICogTk9URTogVGhpcyBpcyBub3QgdXNlZCBpZiB1c2VRdWVyeVN0YXRlIGlzIHNldCB0byB0cnVlLlxuICAgICAgICAgKlxuICAgICAgICAgKiBBIHBhaXIgb2YgY3NzIHByb3BlcnR5ICYgdmFsdWUocykgdGhhdCBpbmRpY2F0ZSB0aGF0IHRoaXNcbiAgICAgICAgICogYnV0dG9uIGhhcyBhbHJlYWR5IGJlZW4gYXBwbGllZC4gSWYgdGhpcyBhY3Rpb24gaGFzIGFscmVhZHlcbiAgICAgICAgICogYmVlbiBhcHBsaWVkLCB0aGUgYnV0dG9uIHdpbGwgYmUgZGlzcGxheWVkIGFzICdhY3RpdmUnIGluIHRoZSB0b29sYmFyXG4gICAgICAgICAqIFByb3BlcnRpZXMgb2YgdGhlIG9iamVjdDpcbiAgICAgICAgICogICBwcm9wIFtTdHJpbmddOiBuYW1lIG9mIHRoZSBjc3MgcHJvcGVydHlcbiAgICAgICAgICogICB2YWx1ZSBbU3RyaW5nXTogdmFsdWUocykgb2YgdGhlIGNzcyBwcm9wZXJ0eVxuICAgICAgICAgKiAgICAgICAgICAgICAgICAgICBtdWx0aXBsZSB2YWx1ZXMgY2FuIGJlIHNlcGFyYXRlZCBieSBhICd8J1xuICAgICAgICAgKlxuICAgICAgICAgKiBFeGFtcGxlOlxuICAgICAgICAgKiBGb3IgJ2JvbGQnLCBpZiB0aGUgdGV4dCBpcyBldmVyIHdpdGhpbiBhbiBlbGVtZW50IHdpdGggYSAnZm9udC13ZWlnaHQnXG4gICAgICAgICAqIHN0eWxlIHByb3BlcnR5IHNldCB0byAnNzAwJyBvciAnYm9sZCcsIHRoYXQgaW5kaWNhdGVzIHRoZSB0ZXh0XG4gICAgICAgICAqIGlzIGFscmVhZHkgYm9sZC4gIFNvIHRoZSBzdHlsZSBvYmplY3QgZm9yIGJvbGQgd291bGQgYmU6XG4gICAgICAgICAqIHsgcHJvcDogJ2ZvbnQtd2VpZ2h0JywgdmFsdWU6ICc3MDB8Ym9sZCcgfVxuICAgICAgICAgKi9cbiAgICAgICAgc3R5bGU6IHVuZGVmaW5lZCxcblxuICAgICAgICAvKiB1c2VRdWVyeVN0YXRlOiBbYm9vbGVhbl1cbiAgICAgICAgICogRW5hYmxlcy9kaXNhYmxlcyB3aGV0aGVyIHRoaXMgYnV0dG9uIHNob3VsZCB1c2UgdGhlIGJ1aWx0LWluXG4gICAgICAgICAqIGRvY3VtZW50LnF1ZXJ5Q29tbWFuZFN0YXRlKCkgbWV0aG9kIHRvIGRldGVybWluZSB3aGV0aGVyXG4gICAgICAgICAqIHRoZSBhY3Rpb24gaGFzIGFscmVhZHkgYmVlbiBhcHBsaWVkLiAgSWYgdGhlIGFjdGlvbiBoYXMgYWxyZWFkeVxuICAgICAgICAgKiBiZWVuIGFwcGxpZWQsIHRoZSBidXR0b24gd2lsbCBiZSBkaXNwbGF5ZWQgYXMgJ2FjdGl2ZScgaW4gdGhlIHRvb2xiYXJcbiAgICAgICAgICpcbiAgICAgICAgICogRXhhbXBsZTpcbiAgICAgICAgICogRm9yICdib2xkJywgaWYgdGhpcyBpcyBzZXQgdG8gdHJ1ZSwgdGhlIGNvZGUgd2lsbCBjYWxsOlxuICAgICAgICAgKiBkb2N1bWVudC5xdWVyeUNvbW1hbmRTdGF0ZSgnYm9sZCcpIHdoaWNoIHdpbGwgcmV0dXJuIHRydWUgaWYgdGhlXG4gICAgICAgICAqIGJyb3dzZXIgdGhpbmtzIHRoZSB0ZXh0IGlzIGFscmVhZHkgYm9sZCwgYW5kIGZhbHNlIG90aGVyd2lzZVxuICAgICAgICAgKi9cbiAgICAgICAgdXNlUXVlcnlTdGF0ZTogdW5kZWZpbmVkLFxuXG4gICAgICAgIC8qIGNvbnRlbnREZWZhdWx0OiBbc3RyaW5nXVxuICAgICAgICAgKiBEZWZhdWx0IGlubmVySFRNTCB0byBwdXQgaW5zaWRlIHRoZSBidXR0b25cbiAgICAgICAgICovXG4gICAgICAgIGNvbnRlbnREZWZhdWx0OiB1bmRlZmluZWQsXG5cbiAgICAgICAgLyogY29udGVudEZBOiBbc3RyaW5nXVxuICAgICAgICAgKiBUaGUgaW5uZXJIVE1MIHRvIHVzZSBmb3IgdGhlIGNvbnRlbnQgb2YgdGhlIGJ1dHRvblxuICAgICAgICAgKiBpZiB0aGUgYGJ1dHRvbkxhYmVsc2Agb3B0aW9uIGZvciBNZWRpdW1FZGl0b3IgaXMgc2V0IHRvICdmb250YXdlc29tZSdcbiAgICAgICAgICovXG4gICAgICAgIGNvbnRlbnRGQTogdW5kZWZpbmVkLFxuXG4gICAgICAgIC8qIGNsYXNzTGlzdDogW0FycmF5XVxuICAgICAgICAgKiBBbiBhcnJheSBvZiBjbGFzc05hbWVzIChzdHJpbmdzKSB0byBiZSBhZGRlZCB0byB0aGUgYnV0dG9uXG4gICAgICAgICAqL1xuICAgICAgICBjbGFzc0xpc3Q6IHVuZGVmaW5lZCxcblxuICAgICAgICAvKiBhdHRyczogW29iamVjdF1cbiAgICAgICAgICogQSBzZXQgb2Yga2V5LXZhbHVlIHBhaXJzIHRvIGFkZCB0byB0aGUgYnV0dG9uIGFzIGN1c3RvbSBhdHRyaWJ1dGVzXG4gICAgICAgICAqL1xuICAgICAgICBhdHRyczogdW5kZWZpbmVkLFxuXG4gICAgICAgIC8vIFRoZSBidXR0b24gY29uc3RydWN0b3IgY2FuIG9wdGlvbmFsbHkgYWNjZXB0IHRoZSBuYW1lIG9mIGEgYnVpbHQtaW4gYnV0dG9uXG4gICAgICAgIC8vIChpZSAnYm9sZCcsICdpdGFsaWMnLCBldGMuKVxuICAgICAgICAvLyBXaGVuIHRoZSBuYW1lIG9mIGEgYnV0dG9uIGlzIHBhc3NlZCwgaXQgd2lsbCBpbml0aWFsaXplIGl0c2VsZiB3aXRoIHRoZVxuICAgICAgICAvLyBjb25maWd1cmF0aW9uIGZvciB0aGF0IGJ1dHRvblxuICAgICAgICBjb25zdHJ1Y3RvcjogZnVuY3Rpb24gKG9wdGlvbnMpIHtcbiAgICAgICAgICAgIGlmIChCdXR0b24uaXNCdWlsdEluQnV0dG9uKG9wdGlvbnMpKSB7XG4gICAgICAgICAgICAgICAgTWVkaXVtRWRpdG9yLkV4dGVuc2lvbi5jYWxsKHRoaXMsIHRoaXMuZGVmYXVsdHNbb3B0aW9uc10pO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBNZWRpdW1FZGl0b3IuRXh0ZW5zaW9uLmNhbGwodGhpcywgb3B0aW9ucyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgaW5pdDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgTWVkaXVtRWRpdG9yLkV4dGVuc2lvbi5wcm90b3R5cGUuaW5pdC5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuXG4gICAgICAgICAgICB0aGlzLmJ1dHRvbiA9IHRoaXMuY3JlYXRlQnV0dG9uKCk7XG4gICAgICAgICAgICB0aGlzLm9uKHRoaXMuYnV0dG9uLCAnY2xpY2snLCB0aGlzLmhhbmRsZUNsaWNrLmJpbmQodGhpcykpO1xuICAgICAgICB9LFxuXG4gICAgICAgIC8qIGdldEJ1dHRvbjogW2Z1bmN0aW9uICgpXVxuICAgICAgICAgKlxuICAgICAgICAgKiBJZiBpbXBsZW1lbnRlZCwgdGhpcyBmdW5jdGlvbiB3aWxsIGJlIGNhbGxlZCB3aGVuXG4gICAgICAgICAqIHRoZSB0b29sYmFyIGlzIGJlaW5nIGNyZWF0ZWQuICBUaGUgRE9NIEVsZW1lbnQgcmV0dXJuZWRcbiAgICAgICAgICogYnkgdGhpcyBmdW5jdGlvbiB3aWxsIGJlIGFwcGVuZGVkIHRvIHRoZSB0b29sYmFyIGFsb25nXG4gICAgICAgICAqIHdpdGggYW55IG90aGVyIGJ1dHRvbnMuXG4gICAgICAgICAqL1xuICAgICAgICBnZXRCdXR0b246IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmJ1dHRvbjtcbiAgICAgICAgfSxcblxuICAgICAgICBnZXRBY3Rpb246IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiAodHlwZW9mIHRoaXMuYWN0aW9uID09PSAnZnVuY3Rpb24nKSA/IHRoaXMuYWN0aW9uKHRoaXMuYmFzZS5vcHRpb25zKSA6IHRoaXMuYWN0aW9uO1xuICAgICAgICB9LFxuXG4gICAgICAgIGdldEFyaWE6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiAodHlwZW9mIHRoaXMuYXJpYSA9PT0gJ2Z1bmN0aW9uJykgPyB0aGlzLmFyaWEodGhpcy5iYXNlLm9wdGlvbnMpIDogdGhpcy5hcmlhO1xuICAgICAgICB9LFxuXG4gICAgICAgIGdldFRhZ05hbWVzOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gKHR5cGVvZiB0aGlzLnRhZ05hbWVzID09PSAnZnVuY3Rpb24nKSA/IHRoaXMudGFnTmFtZXModGhpcy5iYXNlLm9wdGlvbnMpIDogdGhpcy50YWdOYW1lcztcbiAgICAgICAgfSxcblxuICAgICAgICBjcmVhdGVCdXR0b246IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBidXR0b24gPSB0aGlzLmRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpLFxuICAgICAgICAgICAgICAgIGNvbnRlbnQgPSB0aGlzLmNvbnRlbnREZWZhdWx0LFxuICAgICAgICAgICAgICAgIGFyaWFMYWJlbCA9IHRoaXMuZ2V0QXJpYSgpLFxuICAgICAgICAgICAgICAgIGJ1dHRvbkxhYmVscyA9IHRoaXMuZ2V0RWRpdG9yT3B0aW9uKCdidXR0b25MYWJlbHMnKTtcbiAgICAgICAgICAgIC8vIEFkZCBjbGFzcyBuYW1lc1xuICAgICAgICAgICAgYnV0dG9uLmNsYXNzTGlzdC5hZGQoJ21lZGl1bS1lZGl0b3ItYWN0aW9uJyk7XG4gICAgICAgICAgICBidXR0b24uY2xhc3NMaXN0LmFkZCgnbWVkaXVtLWVkaXRvci1hY3Rpb24tJyArIHRoaXMubmFtZSk7XG4gICAgICAgICAgICBpZiAodGhpcy5jbGFzc0xpc3QpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNsYXNzTGlzdC5mb3JFYWNoKGZ1bmN0aW9uIChjbGFzc05hbWUpIHtcbiAgICAgICAgICAgICAgICAgICAgYnV0dG9uLmNsYXNzTGlzdC5hZGQoY2xhc3NOYW1lKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gQWRkIGF0dHJpYnV0ZXNcbiAgICAgICAgICAgIGJ1dHRvbi5zZXRBdHRyaWJ1dGUoJ2RhdGEtYWN0aW9uJywgdGhpcy5nZXRBY3Rpb24oKSk7XG4gICAgICAgICAgICBpZiAoYXJpYUxhYmVsKSB7XG4gICAgICAgICAgICAgICAgYnV0dG9uLnNldEF0dHJpYnV0ZSgndGl0bGUnLCBhcmlhTGFiZWwpO1xuICAgICAgICAgICAgICAgIGJ1dHRvbi5zZXRBdHRyaWJ1dGUoJ2FyaWEtbGFiZWwnLCBhcmlhTGFiZWwpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRoaXMuYXR0cnMpIHtcbiAgICAgICAgICAgICAgICBPYmplY3Qua2V5cyh0aGlzLmF0dHJzKS5mb3JFYWNoKGZ1bmN0aW9uIChhdHRyKSB7XG4gICAgICAgICAgICAgICAgICAgIGJ1dHRvbi5zZXRBdHRyaWJ1dGUoYXR0ciwgdGhpcy5hdHRyc1thdHRyXSk7XG4gICAgICAgICAgICAgICAgfSwgdGhpcyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChidXR0b25MYWJlbHMgPT09ICdmb250YXdlc29tZScgJiYgdGhpcy5jb250ZW50RkEpIHtcbiAgICAgICAgICAgICAgICBjb250ZW50ID0gdGhpcy5jb250ZW50RkE7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBidXR0b24uaW5uZXJIVE1MID0gY29udGVudDtcbiAgICAgICAgICAgIHJldHVybiBidXR0b247XG4gICAgICAgIH0sXG5cbiAgICAgICAgaGFuZGxlQ2xpY2s6IGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuXG4gICAgICAgICAgICB2YXIgYWN0aW9uID0gdGhpcy5nZXRBY3Rpb24oKTtcblxuICAgICAgICAgICAgaWYgKGFjdGlvbikge1xuICAgICAgICAgICAgICAgIHRoaXMuZXhlY0FjdGlvbihhY3Rpb24pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIGlzQWN0aXZlOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5idXR0b24uY2xhc3NMaXN0LmNvbnRhaW5zKHRoaXMuZ2V0RWRpdG9yT3B0aW9uKCdhY3RpdmVCdXR0b25DbGFzcycpKTtcbiAgICAgICAgfSxcblxuICAgICAgICBzZXRJbmFjdGl2ZTogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdGhpcy5idXR0b24uY2xhc3NMaXN0LnJlbW92ZSh0aGlzLmdldEVkaXRvck9wdGlvbignYWN0aXZlQnV0dG9uQ2xhc3MnKSk7XG4gICAgICAgICAgICBkZWxldGUgdGhpcy5rbm93blN0YXRlO1xuICAgICAgICB9LFxuXG4gICAgICAgIHNldEFjdGl2ZTogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdGhpcy5idXR0b24uY2xhc3NMaXN0LmFkZCh0aGlzLmdldEVkaXRvck9wdGlvbignYWN0aXZlQnV0dG9uQ2xhc3MnKSk7XG4gICAgICAgICAgICBkZWxldGUgdGhpcy5rbm93blN0YXRlO1xuICAgICAgICB9LFxuXG4gICAgICAgIHF1ZXJ5Q29tbWFuZFN0YXRlOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgcXVlcnlTdGF0ZSA9IG51bGw7XG4gICAgICAgICAgICBpZiAodGhpcy51c2VRdWVyeVN0YXRlKSB7XG4gICAgICAgICAgICAgICAgcXVlcnlTdGF0ZSA9IHRoaXMuYmFzZS5xdWVyeUNvbW1hbmRTdGF0ZSh0aGlzLmdldEFjdGlvbigpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBxdWVyeVN0YXRlO1xuICAgICAgICB9LFxuXG4gICAgICAgIGlzQWxyZWFkeUFwcGxpZWQ6IGZ1bmN0aW9uIChub2RlKSB7XG4gICAgICAgICAgICB2YXIgaXNNYXRjaCA9IGZhbHNlLFxuICAgICAgICAgICAgICAgIHRhZ05hbWVzID0gdGhpcy5nZXRUYWdOYW1lcygpLFxuICAgICAgICAgICAgICAgIHN0eWxlVmFscyxcbiAgICAgICAgICAgICAgICBjb21wdXRlZFN0eWxlO1xuXG4gICAgICAgICAgICBpZiAodGhpcy5rbm93blN0YXRlID09PSBmYWxzZSB8fCB0aGlzLmtub3duU3RhdGUgPT09IHRydWUpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5rbm93blN0YXRlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAodGFnTmFtZXMgJiYgdGFnTmFtZXMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgIGlzTWF0Y2ggPSB0YWdOYW1lcy5pbmRleE9mKG5vZGUubm9kZU5hbWUudG9Mb3dlckNhc2UoKSkgIT09IC0xO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoIWlzTWF0Y2ggJiYgdGhpcy5zdHlsZSkge1xuICAgICAgICAgICAgICAgIHN0eWxlVmFscyA9IHRoaXMuc3R5bGUudmFsdWUuc3BsaXQoJ3wnKTtcbiAgICAgICAgICAgICAgICBjb21wdXRlZFN0eWxlID0gdGhpcy53aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShub2RlLCBudWxsKS5nZXRQcm9wZXJ0eVZhbHVlKHRoaXMuc3R5bGUucHJvcCk7XG4gICAgICAgICAgICAgICAgc3R5bGVWYWxzLmZvckVhY2goZnVuY3Rpb24gKHZhbCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoIXRoaXMua25vd25TdGF0ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaXNNYXRjaCA9IChjb21wdXRlZFN0eWxlLmluZGV4T2YodmFsKSAhPT0gLTEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gdGV4dC1kZWNvcmF0aW9uIGlzIG5vdCBpbmhlcml0ZWQgYnkgZGVmYXVsdFxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gc28gaWYgdGhlIGNvbXB1dGVkIHN0eWxlIGZvciB0ZXh0LWRlY29yYXRpb24gZG9lc24ndCBtYXRjaFxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gZG9uJ3Qgd3JpdGUgdG8ga25vd25TdGF0ZSBzbyB3ZSBjYW4gZmFsbGJhY2sgdG8gb3RoZXIgY2hlY2tzXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoaXNNYXRjaCB8fCB0aGlzLnN0eWxlLnByb3AgIT09ICd0ZXh0LWRlY29yYXRpb24nKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5rbm93blN0YXRlID0gaXNNYXRjaDtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sIHRoaXMpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gaXNNYXRjaDtcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgQnV0dG9uLmlzQnVpbHRJbkJ1dHRvbiA9IGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgICAgIHJldHVybiAodHlwZW9mIG5hbWUgPT09ICdzdHJpbmcnKSAmJiBNZWRpdW1FZGl0b3IuZXh0ZW5zaW9ucy5idXR0b24ucHJvdG90eXBlLmRlZmF1bHRzLmhhc093blByb3BlcnR5KG5hbWUpO1xuICAgIH07XG5cbiAgICBNZWRpdW1FZGl0b3IuZXh0ZW5zaW9ucy5idXR0b24gPSBCdXR0b247XG59KCkpO1xuXG4oZnVuY3Rpb24gKCkge1xuICAgICd1c2Ugc3RyaWN0JztcblxuICAgIC8qIE1lZGl1bUVkaXRvci5leHRlbnNpb25zLmJ1dHRvbi5kZWZhdWx0czogW09iamVjdF1cbiAgICAgKiBTZXQgb2YgZGVmYXVsdCBjb25maWcgb3B0aW9ucyBmb3IgYWxsIG9mIHRoZSBidWlsdC1pbiBNZWRpdW1FZGl0b3IgYnV0dG9uc1xuICAgICAqL1xuICAgIE1lZGl1bUVkaXRvci5leHRlbnNpb25zLmJ1dHRvbi5wcm90b3R5cGUuZGVmYXVsdHMgPSB7XG4gICAgICAgICdib2xkJzoge1xuICAgICAgICAgICAgbmFtZTogJ2JvbGQnLFxuICAgICAgICAgICAgYWN0aW9uOiAnYm9sZCcsXG4gICAgICAgICAgICBhcmlhOiAnYm9sZCcsXG4gICAgICAgICAgICB0YWdOYW1lczogWydiJywgJ3N0cm9uZyddLFxuICAgICAgICAgICAgc3R5bGU6IHtcbiAgICAgICAgICAgICAgICBwcm9wOiAnZm9udC13ZWlnaHQnLFxuICAgICAgICAgICAgICAgIHZhbHVlOiAnNzAwfGJvbGQnXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgdXNlUXVlcnlTdGF0ZTogdHJ1ZSxcbiAgICAgICAgICAgIGNvbnRlbnREZWZhdWx0OiAnPGI+QjwvYj4nLFxuICAgICAgICAgICAgY29udGVudEZBOiAnPGkgY2xhc3M9XCJmYSBmYS1ib2xkXCI+PC9pPidcbiAgICAgICAgfSxcbiAgICAgICAgJ2l0YWxpYyc6IHtcbiAgICAgICAgICAgIG5hbWU6ICdpdGFsaWMnLFxuICAgICAgICAgICAgYWN0aW9uOiAnaXRhbGljJyxcbiAgICAgICAgICAgIGFyaWE6ICdpdGFsaWMnLFxuICAgICAgICAgICAgdGFnTmFtZXM6IFsnaScsICdlbSddLFxuICAgICAgICAgICAgc3R5bGU6IHtcbiAgICAgICAgICAgICAgICBwcm9wOiAnZm9udC1zdHlsZScsXG4gICAgICAgICAgICAgICAgdmFsdWU6ICdpdGFsaWMnXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgdXNlUXVlcnlTdGF0ZTogdHJ1ZSxcbiAgICAgICAgICAgIGNvbnRlbnREZWZhdWx0OiAnPGI+PGk+STwvaT48L2I+JyxcbiAgICAgICAgICAgIGNvbnRlbnRGQTogJzxpIGNsYXNzPVwiZmEgZmEtaXRhbGljXCI+PC9pPidcbiAgICAgICAgfSxcbiAgICAgICAgJ3VuZGVybGluZSc6IHtcbiAgICAgICAgICAgIG5hbWU6ICd1bmRlcmxpbmUnLFxuICAgICAgICAgICAgYWN0aW9uOiAndW5kZXJsaW5lJyxcbiAgICAgICAgICAgIGFyaWE6ICd1bmRlcmxpbmUnLFxuICAgICAgICAgICAgdGFnTmFtZXM6IFsndSddLFxuICAgICAgICAgICAgc3R5bGU6IHtcbiAgICAgICAgICAgICAgICBwcm9wOiAndGV4dC1kZWNvcmF0aW9uJyxcbiAgICAgICAgICAgICAgICB2YWx1ZTogJ3VuZGVybGluZSdcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB1c2VRdWVyeVN0YXRlOiB0cnVlLFxuICAgICAgICAgICAgY29udGVudERlZmF1bHQ6ICc8Yj48dT5VPC91PjwvYj4nLFxuICAgICAgICAgICAgY29udGVudEZBOiAnPGkgY2xhc3M9XCJmYSBmYS11bmRlcmxpbmVcIj48L2k+J1xuICAgICAgICB9LFxuICAgICAgICAnc3RyaWtldGhyb3VnaCc6IHtcbiAgICAgICAgICAgIG5hbWU6ICdzdHJpa2V0aHJvdWdoJyxcbiAgICAgICAgICAgIGFjdGlvbjogJ3N0cmlrZXRocm91Z2gnLFxuICAgICAgICAgICAgYXJpYTogJ3N0cmlrZSB0aHJvdWdoJyxcbiAgICAgICAgICAgIHRhZ05hbWVzOiBbJ3N0cmlrZSddLFxuICAgICAgICAgICAgc3R5bGU6IHtcbiAgICAgICAgICAgICAgICBwcm9wOiAndGV4dC1kZWNvcmF0aW9uJyxcbiAgICAgICAgICAgICAgICB2YWx1ZTogJ2xpbmUtdGhyb3VnaCdcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB1c2VRdWVyeVN0YXRlOiB0cnVlLFxuICAgICAgICAgICAgY29udGVudERlZmF1bHQ6ICc8cz5BPC9zPicsXG4gICAgICAgICAgICBjb250ZW50RkE6ICc8aSBjbGFzcz1cImZhIGZhLXN0cmlrZXRocm91Z2hcIj48L2k+J1xuICAgICAgICB9LFxuICAgICAgICAnc3VwZXJzY3JpcHQnOiB7XG4gICAgICAgICAgICBuYW1lOiAnc3VwZXJzY3JpcHQnLFxuICAgICAgICAgICAgYWN0aW9uOiAnc3VwZXJzY3JpcHQnLFxuICAgICAgICAgICAgYXJpYTogJ3N1cGVyc2NyaXB0JyxcbiAgICAgICAgICAgIHRhZ05hbWVzOiBbJ3N1cCddLFxuICAgICAgICAgICAgLyogZmlyZWZveCBkb2Vzbid0IGJlaGF2ZSB0aGUgd2F5IHdlIHdhbnQgaXQgdG8sIHNvIHdlIENBTidUIHVzZSBxdWVyeUNvbW1hbmRTdGF0ZSBmb3Igc3VwZXJzY3JpcHRcbiAgICAgICAgICAgICAgIGh0dHBzOi8vZ2l0aHViLmNvbS9ndWFyZGlhbi9zY3JpYmUvYmxvYi9tYXN0ZXIvQlJPV1NFUklOQ09OU0lTVEVOQ0lFUy5tZCNkb2N1bWVudHF1ZXJ5Y29tbWFuZHN0YXRlICovXG4gICAgICAgICAgICAvLyB1c2VRdWVyeVN0YXRlOiB0cnVlXG4gICAgICAgICAgICBjb250ZW50RGVmYXVsdDogJzxiPng8c3VwPjE8L3N1cD48L2I+JyxcbiAgICAgICAgICAgIGNvbnRlbnRGQTogJzxpIGNsYXNzPVwiZmEgZmEtc3VwZXJzY3JpcHRcIj48L2k+J1xuICAgICAgICB9LFxuICAgICAgICAnc3Vic2NyaXB0Jzoge1xuICAgICAgICAgICAgbmFtZTogJ3N1YnNjcmlwdCcsXG4gICAgICAgICAgICBhY3Rpb246ICdzdWJzY3JpcHQnLFxuICAgICAgICAgICAgYXJpYTogJ3N1YnNjcmlwdCcsXG4gICAgICAgICAgICB0YWdOYW1lczogWydzdWInXSxcbiAgICAgICAgICAgIC8qIGZpcmVmb3ggZG9lc24ndCBiZWhhdmUgdGhlIHdheSB3ZSB3YW50IGl0IHRvLCBzbyB3ZSBDQU4nVCB1c2UgcXVlcnlDb21tYW5kU3RhdGUgZm9yIHN1YnNjcmlwdFxuICAgICAgICAgICAgICAgaHR0cHM6Ly9naXRodWIuY29tL2d1YXJkaWFuL3NjcmliZS9ibG9iL21hc3Rlci9CUk9XU0VSSU5DT05TSVNURU5DSUVTLm1kI2RvY3VtZW50cXVlcnljb21tYW5kc3RhdGUgKi9cbiAgICAgICAgICAgIC8vIHVzZVF1ZXJ5U3RhdGU6IHRydWVcbiAgICAgICAgICAgIGNvbnRlbnREZWZhdWx0OiAnPGI+eDxzdWI+MTwvc3ViPjwvYj4nLFxuICAgICAgICAgICAgY29udGVudEZBOiAnPGkgY2xhc3M9XCJmYSBmYS1zdWJzY3JpcHRcIj48L2k+J1xuICAgICAgICB9LFxuICAgICAgICAnaW1hZ2UnOiB7XG4gICAgICAgICAgICBuYW1lOiAnaW1hZ2UnLFxuICAgICAgICAgICAgYWN0aW9uOiAnaW1hZ2UnLFxuICAgICAgICAgICAgYXJpYTogJ2ltYWdlJyxcbiAgICAgICAgICAgIHRhZ05hbWVzOiBbJ2ltZyddLFxuICAgICAgICAgICAgY29udGVudERlZmF1bHQ6ICc8Yj5pbWFnZTwvYj4nLFxuICAgICAgICAgICAgY29udGVudEZBOiAnPGkgY2xhc3M9XCJmYSBmYS1waWN0dXJlLW9cIj48L2k+J1xuICAgICAgICB9LFxuICAgICAgICAnb3JkZXJlZGxpc3QnOiB7XG4gICAgICAgICAgICBuYW1lOiAnb3JkZXJlZGxpc3QnLFxuICAgICAgICAgICAgYWN0aW9uOiAnaW5zZXJ0b3JkZXJlZGxpc3QnLFxuICAgICAgICAgICAgYXJpYTogJ29yZGVyZWQgbGlzdCcsXG4gICAgICAgICAgICB0YWdOYW1lczogWydvbCddLFxuICAgICAgICAgICAgdXNlUXVlcnlTdGF0ZTogdHJ1ZSxcbiAgICAgICAgICAgIGNvbnRlbnREZWZhdWx0OiAnPGI+MS48L2I+JyxcbiAgICAgICAgICAgIGNvbnRlbnRGQTogJzxpIGNsYXNzPVwiZmEgZmEtbGlzdC1vbFwiPjwvaT4nXG4gICAgICAgIH0sXG4gICAgICAgICd1bm9yZGVyZWRsaXN0Jzoge1xuICAgICAgICAgICAgbmFtZTogJ3Vub3JkZXJlZGxpc3QnLFxuICAgICAgICAgICAgYWN0aW9uOiAnaW5zZXJ0dW5vcmRlcmVkbGlzdCcsXG4gICAgICAgICAgICBhcmlhOiAndW5vcmRlcmVkIGxpc3QnLFxuICAgICAgICAgICAgdGFnTmFtZXM6IFsndWwnXSxcbiAgICAgICAgICAgIHVzZVF1ZXJ5U3RhdGU6IHRydWUsXG4gICAgICAgICAgICBjb250ZW50RGVmYXVsdDogJzxiPiZidWxsOzwvYj4nLFxuICAgICAgICAgICAgY29udGVudEZBOiAnPGkgY2xhc3M9XCJmYSBmYS1saXN0LXVsXCI+PC9pPidcbiAgICAgICAgfSxcbiAgICAgICAgJ2luZGVudCc6IHtcbiAgICAgICAgICAgIG5hbWU6ICdpbmRlbnQnLFxuICAgICAgICAgICAgYWN0aW9uOiAnaW5kZW50JyxcbiAgICAgICAgICAgIGFyaWE6ICdpbmRlbnQnLFxuICAgICAgICAgICAgdGFnTmFtZXM6IFtdLFxuICAgICAgICAgICAgY29udGVudERlZmF1bHQ6ICc8Yj4mcmFycjs8L2I+JyxcbiAgICAgICAgICAgIGNvbnRlbnRGQTogJzxpIGNsYXNzPVwiZmEgZmEtaW5kZW50XCI+PC9pPidcbiAgICAgICAgfSxcbiAgICAgICAgJ291dGRlbnQnOiB7XG4gICAgICAgICAgICBuYW1lOiAnb3V0ZGVudCcsXG4gICAgICAgICAgICBhY3Rpb246ICdvdXRkZW50JyxcbiAgICAgICAgICAgIGFyaWE6ICdvdXRkZW50JyxcbiAgICAgICAgICAgIHRhZ05hbWVzOiBbXSxcbiAgICAgICAgICAgIGNvbnRlbnREZWZhdWx0OiAnPGI+JmxhcnI7PC9iPicsXG4gICAgICAgICAgICBjb250ZW50RkE6ICc8aSBjbGFzcz1cImZhIGZhLW91dGRlbnRcIj48L2k+J1xuICAgICAgICB9LFxuICAgICAgICAnanVzdGlmeUNlbnRlcic6IHtcbiAgICAgICAgICAgIG5hbWU6ICdqdXN0aWZ5Q2VudGVyJyxcbiAgICAgICAgICAgIGFjdGlvbjogJ2p1c3RpZnlDZW50ZXInLFxuICAgICAgICAgICAgYXJpYTogJ2NlbnRlciBqdXN0aWZ5JyxcbiAgICAgICAgICAgIHRhZ05hbWVzOiBbXSxcbiAgICAgICAgICAgIHN0eWxlOiB7XG4gICAgICAgICAgICAgICAgcHJvcDogJ3RleHQtYWxpZ24nLFxuICAgICAgICAgICAgICAgIHZhbHVlOiAnY2VudGVyJ1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGNvbnRlbnREZWZhdWx0OiAnPGI+QzwvYj4nLFxuICAgICAgICAgICAgY29udGVudEZBOiAnPGkgY2xhc3M9XCJmYSBmYS1hbGlnbi1jZW50ZXJcIj48L2k+J1xuICAgICAgICB9LFxuICAgICAgICAnanVzdGlmeUZ1bGwnOiB7XG4gICAgICAgICAgICBuYW1lOiAnanVzdGlmeUZ1bGwnLFxuICAgICAgICAgICAgYWN0aW9uOiAnanVzdGlmeUZ1bGwnLFxuICAgICAgICAgICAgYXJpYTogJ2Z1bGwganVzdGlmeScsXG4gICAgICAgICAgICB0YWdOYW1lczogW10sXG4gICAgICAgICAgICBzdHlsZToge1xuICAgICAgICAgICAgICAgIHByb3A6ICd0ZXh0LWFsaWduJyxcbiAgICAgICAgICAgICAgICB2YWx1ZTogJ2p1c3RpZnknXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgY29udGVudERlZmF1bHQ6ICc8Yj5KPC9iPicsXG4gICAgICAgICAgICBjb250ZW50RkE6ICc8aSBjbGFzcz1cImZhIGZhLWFsaWduLWp1c3RpZnlcIj48L2k+J1xuICAgICAgICB9LFxuICAgICAgICAnanVzdGlmeUxlZnQnOiB7XG4gICAgICAgICAgICBuYW1lOiAnanVzdGlmeUxlZnQnLFxuICAgICAgICAgICAgYWN0aW9uOiAnanVzdGlmeUxlZnQnLFxuICAgICAgICAgICAgYXJpYTogJ2xlZnQganVzdGlmeScsXG4gICAgICAgICAgICB0YWdOYW1lczogW10sXG4gICAgICAgICAgICBzdHlsZToge1xuICAgICAgICAgICAgICAgIHByb3A6ICd0ZXh0LWFsaWduJyxcbiAgICAgICAgICAgICAgICB2YWx1ZTogJ2xlZnQnXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgY29udGVudERlZmF1bHQ6ICc8Yj5MPC9iPicsXG4gICAgICAgICAgICBjb250ZW50RkE6ICc8aSBjbGFzcz1cImZhIGZhLWFsaWduLWxlZnRcIj48L2k+J1xuICAgICAgICB9LFxuICAgICAgICAnanVzdGlmeVJpZ2h0Jzoge1xuICAgICAgICAgICAgbmFtZTogJ2p1c3RpZnlSaWdodCcsXG4gICAgICAgICAgICBhY3Rpb246ICdqdXN0aWZ5UmlnaHQnLFxuICAgICAgICAgICAgYXJpYTogJ3JpZ2h0IGp1c3RpZnknLFxuICAgICAgICAgICAgdGFnTmFtZXM6IFtdLFxuICAgICAgICAgICAgc3R5bGU6IHtcbiAgICAgICAgICAgICAgICBwcm9wOiAndGV4dC1hbGlnbicsXG4gICAgICAgICAgICAgICAgdmFsdWU6ICdyaWdodCdcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBjb250ZW50RGVmYXVsdDogJzxiPlI8L2I+JyxcbiAgICAgICAgICAgIGNvbnRlbnRGQTogJzxpIGNsYXNzPVwiZmEgZmEtYWxpZ24tcmlnaHRcIj48L2k+J1xuICAgICAgICB9LFxuICAgICAgICAvLyBLbm93biBpbmxpbmUgZWxlbWVudHMgdGhhdCBhcmUgbm90IHJlbW92ZWQsIG9yIG5vdCByZW1vdmVkIGNvbnNpc3RhbnRseSBhY3Jvc3MgYnJvd3NlcnM6XG4gICAgICAgIC8vIDxzcGFuPiwgPGxhYmVsPiwgPGJyPlxuICAgICAgICAncmVtb3ZlRm9ybWF0Jzoge1xuICAgICAgICAgICAgbmFtZTogJ3JlbW92ZUZvcm1hdCcsXG4gICAgICAgICAgICBhcmlhOiAncmVtb3ZlIGZvcm1hdHRpbmcnLFxuICAgICAgICAgICAgYWN0aW9uOiAncmVtb3ZlRm9ybWF0JyxcbiAgICAgICAgICAgIGNvbnRlbnREZWZhdWx0OiAnPGI+WDwvYj4nLFxuICAgICAgICAgICAgY29udGVudEZBOiAnPGkgY2xhc3M9XCJmYSBmYS1lcmFzZXJcIj48L2k+J1xuICAgICAgICB9LFxuXG4gICAgICAgIC8qKioqKiBCdXR0b25zIGZvciBhcHBlbmRpbmcgYmxvY2sgZWxlbWVudHMgKGFwcGVuZC08ZWxlbWVudD4gYWN0aW9uKSAqKioqKi9cblxuICAgICAgICAncXVvdGUnOiB7XG4gICAgICAgICAgICBuYW1lOiAncXVvdGUnLFxuICAgICAgICAgICAgYWN0aW9uOiAnYXBwZW5kLWJsb2NrcXVvdGUnLFxuICAgICAgICAgICAgYXJpYTogJ2Jsb2NrcXVvdGUnLFxuICAgICAgICAgICAgdGFnTmFtZXM6IFsnYmxvY2txdW90ZSddLFxuICAgICAgICAgICAgY29udGVudERlZmF1bHQ6ICc8Yj4mbGRxdW87PC9iPicsXG4gICAgICAgICAgICBjb250ZW50RkE6ICc8aSBjbGFzcz1cImZhIGZhLXF1b3RlLXJpZ2h0XCI+PC9pPidcbiAgICAgICAgfSxcbiAgICAgICAgJ3ByZSc6IHtcbiAgICAgICAgICAgIG5hbWU6ICdwcmUnLFxuICAgICAgICAgICAgYWN0aW9uOiAnYXBwZW5kLXByZScsXG4gICAgICAgICAgICBhcmlhOiAncHJlZm9ybWF0dGVkIHRleHQnLFxuICAgICAgICAgICAgdGFnTmFtZXM6IFsncHJlJ10sXG4gICAgICAgICAgICBjb250ZW50RGVmYXVsdDogJzxiPjAxMDE8L2I+JyxcbiAgICAgICAgICAgIGNvbnRlbnRGQTogJzxpIGNsYXNzPVwiZmEgZmEtY29kZSBmYS1sZ1wiPjwvaT4nXG4gICAgICAgIH0sXG4gICAgICAgICdoMSc6IHtcbiAgICAgICAgICAgIG5hbWU6ICdoMScsXG4gICAgICAgICAgICBhY3Rpb246ICdhcHBlbmQtaDEnLFxuICAgICAgICAgICAgYXJpYTogJ2hlYWRlciB0eXBlIG9uZScsXG4gICAgICAgICAgICB0YWdOYW1lczogWydoMSddLFxuICAgICAgICAgICAgY29udGVudERlZmF1bHQ6ICc8Yj5IMTwvYj4nLFxuICAgICAgICAgICAgY29udGVudEZBOiAnPGkgY2xhc3M9XCJmYSBmYS1oZWFkZXJcIj48c3VwPjE8L3N1cD4nXG4gICAgICAgIH0sXG4gICAgICAgICdoMic6IHtcbiAgICAgICAgICAgIG5hbWU6ICdoMicsXG4gICAgICAgICAgICBhY3Rpb246ICdhcHBlbmQtaDInLFxuICAgICAgICAgICAgYXJpYTogJ2hlYWRlciB0eXBlIHR3bycsXG4gICAgICAgICAgICB0YWdOYW1lczogWydoMiddLFxuICAgICAgICAgICAgY29udGVudERlZmF1bHQ6ICc8Yj5IMjwvYj4nLFxuICAgICAgICAgICAgY29udGVudEZBOiAnPGkgY2xhc3M9XCJmYSBmYS1oZWFkZXJcIj48c3VwPjI8L3N1cD4nXG4gICAgICAgIH0sXG4gICAgICAgICdoMyc6IHtcbiAgICAgICAgICAgIG5hbWU6ICdoMycsXG4gICAgICAgICAgICBhY3Rpb246ICdhcHBlbmQtaDMnLFxuICAgICAgICAgICAgYXJpYTogJ2hlYWRlciB0eXBlIHRocmVlJyxcbiAgICAgICAgICAgIHRhZ05hbWVzOiBbJ2gzJ10sXG4gICAgICAgICAgICBjb250ZW50RGVmYXVsdDogJzxiPkgzPC9iPicsXG4gICAgICAgICAgICBjb250ZW50RkE6ICc8aSBjbGFzcz1cImZhIGZhLWhlYWRlclwiPjxzdXA+Mzwvc3VwPidcbiAgICAgICAgfSxcbiAgICAgICAgJ2g0Jzoge1xuICAgICAgICAgICAgbmFtZTogJ2g0JyxcbiAgICAgICAgICAgIGFjdGlvbjogJ2FwcGVuZC1oNCcsXG4gICAgICAgICAgICBhcmlhOiAnaGVhZGVyIHR5cGUgZm91cicsXG4gICAgICAgICAgICB0YWdOYW1lczogWydoNCddLFxuICAgICAgICAgICAgY29udGVudERlZmF1bHQ6ICc8Yj5INDwvYj4nLFxuICAgICAgICAgICAgY29udGVudEZBOiAnPGkgY2xhc3M9XCJmYSBmYS1oZWFkZXJcIj48c3VwPjQ8L3N1cD4nXG4gICAgICAgIH0sXG4gICAgICAgICdoNSc6IHtcbiAgICAgICAgICAgIG5hbWU6ICdoNScsXG4gICAgICAgICAgICBhY3Rpb246ICdhcHBlbmQtaDUnLFxuICAgICAgICAgICAgYXJpYTogJ2hlYWRlciB0eXBlIGZpdmUnLFxuICAgICAgICAgICAgdGFnTmFtZXM6IFsnaDUnXSxcbiAgICAgICAgICAgIGNvbnRlbnREZWZhdWx0OiAnPGI+SDU8L2I+JyxcbiAgICAgICAgICAgIGNvbnRlbnRGQTogJzxpIGNsYXNzPVwiZmEgZmEtaGVhZGVyXCI+PHN1cD41PC9zdXA+J1xuICAgICAgICB9LFxuICAgICAgICAnaDYnOiB7XG4gICAgICAgICAgICBuYW1lOiAnaDYnLFxuICAgICAgICAgICAgYWN0aW9uOiAnYXBwZW5kLWg2JyxcbiAgICAgICAgICAgIGFyaWE6ICdoZWFkZXIgdHlwZSBzaXgnLFxuICAgICAgICAgICAgdGFnTmFtZXM6IFsnaDYnXSxcbiAgICAgICAgICAgIGNvbnRlbnREZWZhdWx0OiAnPGI+SDY8L2I+JyxcbiAgICAgICAgICAgIGNvbnRlbnRGQTogJzxpIGNsYXNzPVwiZmEgZmEtaGVhZGVyXCI+PHN1cD42PC9zdXA+J1xuICAgICAgICB9XG4gICAgfTtcblxufSkoKTtcbihmdW5jdGlvbiAoKSB7XG4gICAgJ3VzZSBzdHJpY3QnO1xuXG4gICAgLyogQmFzZSBmdW5jdGlvbmFsaXR5IGZvciBhbiBleHRlbnNpb24gd2hpY2ggd2lsbCBkaXNwbGF5XG4gICAgICogYSAnZm9ybScgaW5zaWRlIHRoZSB0b29sYmFyXG4gICAgICovXG4gICAgdmFyIEZvcm1FeHRlbnNpb24gPSBNZWRpdW1FZGl0b3IuZXh0ZW5zaW9ucy5idXR0b24uZXh0ZW5kKHtcblxuICAgICAgICBpbml0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBNZWRpdW1FZGl0b3IuZXh0ZW5zaW9ucy5idXR0b24ucHJvdG90eXBlLmluaXQuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgICAgfSxcblxuICAgICAgICAvLyBkZWZhdWx0IGxhYmVscyBmb3IgdGhlIGZvcm0gYnV0dG9uc1xuICAgICAgICBmb3JtU2F2ZUxhYmVsOiAnJiMxMDAwMzsnLFxuICAgICAgICBmb3JtQ2xvc2VMYWJlbDogJyZ0aW1lczsnLFxuXG4gICAgICAgIC8qIGFjdGl2ZUNsYXNzOiBbc3RyaW5nXVxuICAgICAgICAgKiBzZXQgY2xhc3Mgd2hpY2ggYWRkZWQgdG8gc2hvd24gZm9ybVxuICAgICAgICAgKi9cbiAgICAgICAgYWN0aXZlQ2xhc3M6ICdtZWRpdW0tZWRpdG9yLXRvb2xiYXItZm9ybS1hY3RpdmUnLFxuXG4gICAgICAgIC8qIGhhc0Zvcm06IFtib29sZWFuXVxuICAgICAgICAgKlxuICAgICAgICAgKiBTZXR0aW5nIHRoaXMgdG8gdHJ1ZSB3aWxsIGNhdXNlIGdldEZvcm0oKSB0byBiZSBjYWxsZWRcbiAgICAgICAgICogd2hlbiB0aGUgdG9vbGJhciBpcyBjcmVhdGVkLCBzbyB0aGUgZm9ybSBjYW4gYmUgYXBwZW5kZWRcbiAgICAgICAgICogaW5zaWRlIHRoZSB0b29sYmFyIGNvbnRhaW5lclxuICAgICAgICAgKi9cbiAgICAgICAgaGFzRm9ybTogdHJ1ZSxcblxuICAgICAgICAvKiBnZXRGb3JtOiBbZnVuY3Rpb24gKCldXG4gICAgICAgICAqXG4gICAgICAgICAqIFdoZW4gaGFzRm9ybSBpcyB0cnVlLCB0aGlzIGZ1bmN0aW9uIG11c3QgYmUgaW1wbGVtZW50ZWRcbiAgICAgICAgICogYW5kIHJldHVybiBhIERPTSBFbGVtZW50IHdoaWNoIHdpbGwgYmUgYXBwZW5kZWQgdG9cbiAgICAgICAgICogdGhlIHRvb2xiYXIgY29udGFpbmVyLiBUaGUgZm9ybSBzaG91bGQgc3RhcnQgaGlkZGVuLCBhbmRcbiAgICAgICAgICogdGhlIGV4dGVuc2lvbiBjYW4gY2hvb3NlIHdoZW4gdG8gaGlkZS9zaG93IGl0XG4gICAgICAgICAqL1xuICAgICAgICBnZXRGb3JtOiBmdW5jdGlvbiAoKSB7fSxcblxuICAgICAgICAvKiBpc0Rpc3BsYXllZDogW2Z1bmN0aW9uICgpXVxuICAgICAgICAgKlxuICAgICAgICAgKiBUaGlzIGZ1bmN0aW9uIHNob3VsZCByZXR1cm4gdHJ1ZS9mYWxzZSByZWZsZWN0aW5nXG4gICAgICAgICAqIHdoZXRoZXIgdGhlIGZvcm0gaXMgY3VycmVudGx5IGRpc3BsYXllZFxuICAgICAgICAgKi9cbiAgICAgICAgaXNEaXNwbGF5ZWQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmhhc0Zvcm0pIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5nZXRGb3JtKCkuY2xhc3NMaXN0LmNvbnRhaW5zKHRoaXMuYWN0aXZlQ2xhc3MpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9LFxuXG4gICAgICAgIC8qIGhpZGVGb3JtOiBbZnVuY3Rpb24gKCldXG4gICAgICAgICAqXG4gICAgICAgICAqIFRoaXMgZnVuY3Rpb24gc2hvdWxkIHNob3cgdGhlIGZvcm0gZWxlbWVudCBpbnNpZGVcbiAgICAgICAgICogdGhlIHRvb2xiYXIgY29udGFpbmVyXG4gICAgICAgICAqL1xuICAgICAgICBzaG93Rm9ybTogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgaWYgKHRoaXMuaGFzRm9ybSkge1xuICAgICAgICAgICAgICAgIHRoaXMuZ2V0Rm9ybSgpLmNsYXNzTGlzdC5hZGQodGhpcy5hY3RpdmVDbGFzcyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgLyogaGlkZUZvcm06IFtmdW5jdGlvbiAoKV1cbiAgICAgICAgICpcbiAgICAgICAgICogVGhpcyBmdW5jdGlvbiBzaG91bGQgaGlkZSB0aGUgZm9ybSBlbGVtZW50IGluc2lkZVxuICAgICAgICAgKiB0aGUgdG9vbGJhciBjb250YWluZXJcbiAgICAgICAgICovXG4gICAgICAgIGhpZGVGb3JtOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5oYXNGb3JtKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5nZXRGb3JtKCkuY2xhc3NMaXN0LnJlbW92ZSh0aGlzLmFjdGl2ZUNsYXNzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICAvKioqKioqKioqKioqKioqKioqKioqKioqIEhlbHBlcnMgKioqKioqKioqKioqKioqKioqKioqKioqXG4gICAgICAgICAqIFRoZSBmb2xsb3dpbmcgYXJlIGhlbHBlcnMgdGhhdCBhcmUgZWl0aGVyIHNldCBieSBNZWRpdW1FZGl0b3JcbiAgICAgICAgICogZHVyaW5nIGluaXRpYWxpemF0aW9uLCBvciBhcmUgaGVscGVyIG1ldGhvZHMgd2hpY2ggZWl0aGVyXG4gICAgICAgICAqIHJvdXRlIGNhbGxzIHRvIHRoZSBNZWRpdW1FZGl0b3IgaW5zdGFuY2Ugb3IgcHJvdmlkZSBjb21tb25cbiAgICAgICAgICogZnVuY3Rpb25hbGl0eSBmb3IgYWxsIGZvcm0gZXh0ZW5zaW9uc1xuICAgICAgICAgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXG4gICAgICAgIC8qIHNob3dUb29sYmFyRGVmYXVsdEFjdGlvbnM6IFtmdW5jdGlvbiAoKV1cbiAgICAgICAgICpcbiAgICAgICAgICogSGVscGVyIG1ldGhvZCB3aGljaCB3aWxsIHR1cm4gYmFjayB0aGUgdG9vbGJhciBhZnRlciBjYW5jZWxpbmdcbiAgICAgICAgICogdGhlIGN1c3RvbWl6ZWQgZm9ybVxuICAgICAgICAgKi9cbiAgICAgICAgc2hvd1Rvb2xiYXJEZWZhdWx0QWN0aW9uczogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIHRvb2xiYXIgPSB0aGlzLmJhc2UuZ2V0RXh0ZW5zaW9uQnlOYW1lKCd0b29sYmFyJyk7XG4gICAgICAgICAgICBpZiAodG9vbGJhcikge1xuICAgICAgICAgICAgICAgIHRvb2xiYXIuc2hvd1Rvb2xiYXJEZWZhdWx0QWN0aW9ucygpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIC8qIGhpZGVUb29sYmFyRGVmYXVsdEFjdGlvbnM6IFtmdW5jdGlvbiAoKV1cbiAgICAgICAgICpcbiAgICAgICAgICogSGVscGVyIGZ1bmN0aW9uIHdoaWNoIHdpbGwgaGlkZSB0aGUgZGVmYXVsdCBjb250ZW50cyBvZiB0aGVcbiAgICAgICAgICogdG9vbGJhciwgYnV0IGxlYXZlIHRoZSB0b29sYmFyIGNvbnRhaW5lciBpbiB0aGUgc2FtZSBzdGF0ZVxuICAgICAgICAgKiB0byBhbGxvdyBhIGZvcm0gdG8gZGlzcGxheSBpdHMgY3VzdG9tIGNvbnRlbnRzIGluc2lkZSB0aGUgdG9vbGJhclxuICAgICAgICAgKi9cbiAgICAgICAgaGlkZVRvb2xiYXJEZWZhdWx0QWN0aW9uczogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIHRvb2xiYXIgPSB0aGlzLmJhc2UuZ2V0RXh0ZW5zaW9uQnlOYW1lKCd0b29sYmFyJyk7XG4gICAgICAgICAgICBpZiAodG9vbGJhcikge1xuICAgICAgICAgICAgICAgIHRvb2xiYXIuaGlkZVRvb2xiYXJEZWZhdWx0QWN0aW9ucygpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIC8qIHNldFRvb2xiYXJQb3NpdGlvbjogW2Z1bmN0aW9uICgpXVxuICAgICAgICAgKlxuICAgICAgICAgKiBIZWxwZXIgZnVuY3Rpb24gd2hpY2ggd2lsbCB1cGRhdGUgdGhlIHNpemUgYW5kIHBvc2l0aW9uXG4gICAgICAgICAqIG9mIHRoZSB0b29sYmFyIGJhc2VkIG9uIHRoZSB0b29sYmFyIGNvbnRlbnQgYW5kIHRoZSBjdXJyZW50XG4gICAgICAgICAqIHBvc2l0aW9uIG9mIHRoZSB1c2VyJ3Mgc2VsZWN0aW9uXG4gICAgICAgICAqL1xuICAgICAgICBzZXRUb29sYmFyUG9zaXRpb246IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciB0b29sYmFyID0gdGhpcy5iYXNlLmdldEV4dGVuc2lvbkJ5TmFtZSgndG9vbGJhcicpO1xuICAgICAgICAgICAgaWYgKHRvb2xiYXIpIHtcbiAgICAgICAgICAgICAgICB0b29sYmFyLnNldFRvb2xiYXJQb3NpdGlvbigpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICBNZWRpdW1FZGl0b3IuZXh0ZW5zaW9ucy5mb3JtID0gRm9ybUV4dGVuc2lvbjtcbn0pKCk7XG4oZnVuY3Rpb24gKCkge1xuICAgICd1c2Ugc3RyaWN0JztcblxuICAgIHZhciBBbmNob3JGb3JtID0gTWVkaXVtRWRpdG9yLmV4dGVuc2lvbnMuZm9ybS5leHRlbmQoe1xuICAgICAgICAvKiBBbmNob3IgRm9ybSBPcHRpb25zICovXG5cbiAgICAgICAgLyogY3VzdG9tQ2xhc3NPcHRpb246IFtzdHJpbmddICAocHJldmlvdXNseSBvcHRpb25zLmFuY2hvckJ1dHRvbiArIG9wdGlvbnMuYW5jaG9yQnV0dG9uQ2xhc3MpXG4gICAgICAgICAqIEN1c3RvbSBjbGFzcyBuYW1lIHRoZSB1c2VyIGNhbiBvcHRpb25hbGx5IGhhdmUgYWRkZWQgdG8gdGhlaXIgY3JlYXRlZCBsaW5rcyAoaWUgJ2J1dHRvbicpLlxuICAgICAgICAgKiBJZiBwYXNzZWQgYXMgYSBub24tZW1wdHkgc3RyaW5nLCBhIGNoZWNrYm94IHdpbGwgYmUgZGlzcGxheWVkIGFsbG93aW5nIHRoZSB1c2VyIHRvIGNob29zZVxuICAgICAgICAgKiB3aGV0aGVyIHRvIGhhdmUgdGhlIGNsYXNzIGFkZGVkIHRvIHRoZSBjcmVhdGVkIGxpbmsgb3Igbm90LlxuICAgICAgICAgKi9cbiAgICAgICAgY3VzdG9tQ2xhc3NPcHRpb246IG51bGwsXG5cbiAgICAgICAgLyogY3VzdG9tQ2xhc3NPcHRpb25UZXh0OiBbc3RyaW5nXVxuICAgICAgICAgKiB0ZXh0IHRvIGJlIHNob3duIGluIHRoZSBjaGVja2JveCB3aGVuIHRoZSBfX2N1c3RvbUNsYXNzT3B0aW9uX18gaXMgYmVpbmcgdXNlZC5cbiAgICAgICAgICovXG4gICAgICAgIGN1c3RvbUNsYXNzT3B0aW9uVGV4dDogJ0J1dHRvbicsXG5cbiAgICAgICAgLyogbGlua1ZhbGlkYXRpb246IFtib29sZWFuXSAgKHByZXZpb3VzbHkgb3B0aW9ucy5jaGVja0xpbmtGb3JtYXQpXG4gICAgICAgICAqIGVuYWJsZXMvZGlzYWJsZXMgY2hlY2sgZm9yIGNvbW1vbiBVUkwgcHJvdG9jb2xzIG9uIGFuY2hvciBsaW5rcy5cbiAgICAgICAgICovXG4gICAgICAgIGxpbmtWYWxpZGF0aW9uOiBmYWxzZSxcblxuICAgICAgICAvKiBwbGFjZWhvbGRlclRleHQ6IFtzdHJpbmddICAocHJldmlvdXNseSBvcHRpb25zLmFuY2hvcklucHV0UGxhY2Vob2xkZXIpXG4gICAgICAgICAqIHRleHQgdG8gYmUgc2hvd24gYXMgcGxhY2Vob2xkZXIgb2YgdGhlIGFuY2hvciBpbnB1dC5cbiAgICAgICAgICovXG4gICAgICAgIHBsYWNlaG9sZGVyVGV4dDogJ1Bhc3RlIG9yIHR5cGUgYSBsaW5rJyxcblxuICAgICAgICAvKiB0YXJnZXRDaGVja2JveDogW2Jvb2xlYW5dICAocHJldmlvdXNseSBvcHRpb25zLmFuY2hvclRhcmdldClcbiAgICAgICAgICogZW5hYmxlcy9kaXNhYmxlcyBkaXNwbGF5aW5nIGEgXCJPcGVuIGluIG5ldyB3aW5kb3dcIiBjaGVja2JveCwgd2hpY2ggd2hlbiBjaGVja2VkXG4gICAgICAgICAqIGNoYW5nZXMgdGhlIGB0YXJnZXRgIGF0dHJpYnV0ZSBvZiB0aGUgY3JlYXRlZCBsaW5rLlxuICAgICAgICAgKi9cbiAgICAgICAgdGFyZ2V0Q2hlY2tib3g6IGZhbHNlLFxuXG4gICAgICAgIC8qIHRhcmdldENoZWNrYm94VGV4dDogW3N0cmluZ10gIChwcmV2aW91c2x5IG9wdGlvbnMuYW5jaG9ySW5wdXRDaGVja2JveExhYmVsKVxuICAgICAgICAgKiB0ZXh0IHRvIGJlIHNob3duIGluIHRoZSBjaGVja2JveCBlbmFibGVkIHZpYSB0aGUgX190YXJnZXRDaGVja2JveF9fIG9wdGlvbi5cbiAgICAgICAgICovXG4gICAgICAgIHRhcmdldENoZWNrYm94VGV4dDogJ09wZW4gaW4gbmV3IHdpbmRvdycsXG5cbiAgICAgICAgLy8gT3B0aW9ucyBmb3IgdGhlIEJ1dHRvbiBiYXNlIGNsYXNzXG4gICAgICAgIG5hbWU6ICdhbmNob3InLFxuICAgICAgICBhY3Rpb246ICdjcmVhdGVMaW5rJyxcbiAgICAgICAgYXJpYTogJ2xpbmsnLFxuICAgICAgICB0YWdOYW1lczogWydhJ10sXG4gICAgICAgIGNvbnRlbnREZWZhdWx0OiAnPGI+IzwvYj4nLFxuICAgICAgICBjb250ZW50RkE6ICc8aSBjbGFzcz1cImZhIGZhLWxpbmtcIj48L2k+JyxcblxuICAgICAgICBpbml0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBNZWRpdW1FZGl0b3IuZXh0ZW5zaW9ucy5mb3JtLnByb3RvdHlwZS5pbml0LmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG5cbiAgICAgICAgICAgIHRoaXMuc3Vic2NyaWJlKCdlZGl0YWJsZUtleWRvd24nLCB0aGlzLmhhbmRsZUtleWRvd24uYmluZCh0aGlzKSk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgLy8gQ2FsbGVkIHdoZW4gdGhlIGJ1dHRvbiB0aGUgdG9vbGJhciBpcyBjbGlja2VkXG4gICAgICAgIC8vIE92ZXJyaWRlcyBCdXR0b25FeHRlbnNpb24uaGFuZGxlQ2xpY2tcbiAgICAgICAgaGFuZGxlQ2xpY2s6IGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuXG4gICAgICAgICAgICB2YXIgcmFuZ2UgPSBNZWRpdW1FZGl0b3Iuc2VsZWN0aW9uLmdldFNlbGVjdGlvblJhbmdlKHRoaXMuZG9jdW1lbnQpO1xuXG4gICAgICAgICAgICBpZiAocmFuZ2Uuc3RhcnRDb250YWluZXIubm9kZU5hbWUudG9Mb3dlckNhc2UoKSA9PT0gJ2EnIHx8XG4gICAgICAgICAgICAgICAgcmFuZ2UuZW5kQ29udGFpbmVyLm5vZGVOYW1lLnRvTG93ZXJDYXNlKCkgPT09ICdhJyB8fFxuICAgICAgICAgICAgICAgIE1lZGl1bUVkaXRvci51dGlsLmdldENsb3Nlc3RUYWcoTWVkaXVtRWRpdG9yLnNlbGVjdGlvbi5nZXRTZWxlY3RlZFBhcmVudEVsZW1lbnQocmFuZ2UpLCAnYScpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZXhlY0FjdGlvbigndW5saW5rJyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICghdGhpcy5pc0Rpc3BsYXllZCgpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zaG93Rm9ybSgpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH0sXG5cbiAgICAgICAgLy8gQ2FsbGVkIHdoZW4gdXNlciBoaXRzIHRoZSBkZWZpbmVkIHNob3J0Y3V0IChDVFJMIC8gQ09NTUFORCArIEspXG4gICAgICAgIGhhbmRsZUtleWRvd246IGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICAgICAgaWYgKE1lZGl1bUVkaXRvci51dGlsLmlzS2V5KGV2ZW50LCBNZWRpdW1FZGl0b3IudXRpbC5rZXlDb2RlLkspICYmIE1lZGl1bUVkaXRvci51dGlsLmlzTWV0YUN0cmxLZXkoZXZlbnQpICYmICFldmVudC5zaGlmdEtleSkge1xuICAgICAgICAgICAgICAgIHRoaXMuaGFuZGxlQ2xpY2soZXZlbnQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIC8vIENhbGxlZCBieSBtZWRpdW0tZWRpdG9yIHRvIGFwcGVuZCBmb3JtIHRvIHRoZSB0b29sYmFyXG4gICAgICAgIGdldEZvcm06IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGlmICghdGhpcy5mb3JtKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5mb3JtID0gdGhpcy5jcmVhdGVGb3JtKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5mb3JtO1xuICAgICAgICB9LFxuXG4gICAgICAgIGdldFRlbXBsYXRlOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgdGVtcGxhdGUgPSBbXG4gICAgICAgICAgICAgICAgJzxpbnB1dCB0eXBlPVwidGV4dFwiIGNsYXNzPVwibWVkaXVtLWVkaXRvci10b29sYmFyLWlucHV0XCIgcGxhY2Vob2xkZXI9XCInLCB0aGlzLnBsYWNlaG9sZGVyVGV4dCwgJ1wiPidcbiAgICAgICAgICAgIF07XG5cbiAgICAgICAgICAgIHRlbXBsYXRlLnB1c2goXG4gICAgICAgICAgICAgICAgJzxhIGhyZWY9XCIjXCIgY2xhc3M9XCJtZWRpdW0tZWRpdG9yLXRvb2xiYXItc2F2ZVwiPicsXG4gICAgICAgICAgICAgICAgdGhpcy5nZXRFZGl0b3JPcHRpb24oJ2J1dHRvbkxhYmVscycpID09PSAnZm9udGF3ZXNvbWUnID8gJzxpIGNsYXNzPVwiZmEgZmEtY2hlY2tcIj48L2k+JyA6IHRoaXMuZm9ybVNhdmVMYWJlbCxcbiAgICAgICAgICAgICAgICAnPC9hPidcbiAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgIHRlbXBsYXRlLnB1c2goJzxhIGhyZWY9XCIjXCIgY2xhc3M9XCJtZWRpdW0tZWRpdG9yLXRvb2xiYXItY2xvc2VcIj4nLFxuICAgICAgICAgICAgICAgIHRoaXMuZ2V0RWRpdG9yT3B0aW9uKCdidXR0b25MYWJlbHMnKSA9PT0gJ2ZvbnRhd2Vzb21lJyA/ICc8aSBjbGFzcz1cImZhIGZhLXRpbWVzXCI+PC9pPicgOiB0aGlzLmZvcm1DbG9zZUxhYmVsLFxuICAgICAgICAgICAgICAgICc8L2E+Jyk7XG5cbiAgICAgICAgICAgIC8vIGJvdGggb2YgdGhlc2Ugb3B0aW9ucyBhcmUgc2xpZ2h0bHkgbW9vdCB3aXRoIHRoZSBhYmlsaXR5IHRvXG4gICAgICAgICAgICAvLyBvdmVycmlkZSB0aGUgdmFyaW91cyBmb3JtIGJ1aWxkdXAvc2VyaWFsaXplIGZ1bmN0aW9ucy5cblxuICAgICAgICAgICAgaWYgKHRoaXMudGFyZ2V0Q2hlY2tib3gpIHtcbiAgICAgICAgICAgICAgICAvLyBmaXhtZTogaWRlYWxseSwgdGhpcyB0YXJnZXRDaGVja2JveFRleHQgd291bGQgYmUgYSBmb3JtTGFiZWwgdG9vLFxuICAgICAgICAgICAgICAgIC8vIGZpZ3VyZSBvdXQgaG93IHRvIGRlcHJlY2F0ZT8gYWxzbyBjb25zaWRlciBgZmEtYCBpY29uIGRlZmF1bHQgaW1wbGNhdGlvbnMuXG4gICAgICAgICAgICAgICAgdGVtcGxhdGUucHVzaChcbiAgICAgICAgICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJtZWRpdW0tZWRpdG9yLXRvb2xiYXItZm9ybS1yb3dcIj4nLFxuICAgICAgICAgICAgICAgICAgICAnPGlucHV0IHR5cGU9XCJjaGVja2JveFwiIGNsYXNzPVwibWVkaXVtLWVkaXRvci10b29sYmFyLWFuY2hvci10YXJnZXRcIj4nLFxuICAgICAgICAgICAgICAgICAgICAnPGxhYmVsPicsXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudGFyZ2V0Q2hlY2tib3hUZXh0LFxuICAgICAgICAgICAgICAgICAgICAnPC9sYWJlbD4nLFxuICAgICAgICAgICAgICAgICAgICAnPC9kaXY+J1xuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICh0aGlzLmN1c3RvbUNsYXNzT3B0aW9uKSB7XG4gICAgICAgICAgICAgICAgLy8gZml4bWU6IGV4cG9zZSB0aGlzIGBCdXR0b25gIHRleHQgYXMgYSBmb3JtTGFiZWwgcHJvcGVydHksIHRvb1xuICAgICAgICAgICAgICAgIC8vIGFuZCBwcm92aWRlIHNpbWlsYXIgYWNjZXNzIHRvIGEgYGZhLWAgaWNvbiBkZWZhdWx0LlxuICAgICAgICAgICAgICAgIHRlbXBsYXRlLnB1c2goXG4gICAgICAgICAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwibWVkaXVtLWVkaXRvci10b29sYmFyLWZvcm0tcm93XCI+JyxcbiAgICAgICAgICAgICAgICAgICAgJzxpbnB1dCB0eXBlPVwiY2hlY2tib3hcIiBjbGFzcz1cIm1lZGl1bS1lZGl0b3ItdG9vbGJhci1hbmNob3ItYnV0dG9uXCI+JyxcbiAgICAgICAgICAgICAgICAgICAgJzxsYWJlbD4nLFxuICAgICAgICAgICAgICAgICAgICB0aGlzLmN1c3RvbUNsYXNzT3B0aW9uVGV4dCxcbiAgICAgICAgICAgICAgICAgICAgJzwvbGFiZWw+JyxcbiAgICAgICAgICAgICAgICAgICAgJzwvZGl2PidcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gdGVtcGxhdGUuam9pbignJyk7XG5cbiAgICAgICAgfSxcblxuICAgICAgICAvLyBVc2VkIGJ5IG1lZGl1bS1lZGl0b3Igd2hlbiB0aGUgZGVmYXVsdCB0b29sYmFyIGlzIHRvIGJlIGRpc3BsYXllZFxuICAgICAgICBpc0Rpc3BsYXllZDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIE1lZGl1bUVkaXRvci5leHRlbnNpb25zLmZvcm0ucHJvdG90eXBlLmlzRGlzcGxheWVkLmFwcGx5KHRoaXMpO1xuICAgICAgICB9LFxuXG4gICAgICAgIGhpZGVGb3JtOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBNZWRpdW1FZGl0b3IuZXh0ZW5zaW9ucy5mb3JtLnByb3RvdHlwZS5oaWRlRm9ybS5hcHBseSh0aGlzKTtcbiAgICAgICAgICAgIHRoaXMuZ2V0SW5wdXQoKS52YWx1ZSA9ICcnO1xuICAgICAgICB9LFxuXG4gICAgICAgIHNob3dGb3JtOiBmdW5jdGlvbiAob3B0cykge1xuICAgICAgICAgICAgdmFyIGlucHV0ID0gdGhpcy5nZXRJbnB1dCgpLFxuICAgICAgICAgICAgICAgIHRhcmdldENoZWNrYm94ID0gdGhpcy5nZXRBbmNob3JUYXJnZXRDaGVja2JveCgpLFxuICAgICAgICAgICAgICAgIGJ1dHRvbkNoZWNrYm94ID0gdGhpcy5nZXRBbmNob3JCdXR0b25DaGVja2JveCgpO1xuXG4gICAgICAgICAgICBvcHRzID0gb3B0cyB8fCB7IHZhbHVlOiAnJyB9O1xuICAgICAgICAgICAgLy8gVE9ETzogVGhpcyBpcyBmb3IgYmFja3dhcmRzIGNvbXBhdGFiaWxpdHlcbiAgICAgICAgICAgIC8vIFdlIGRvbid0IG5lZWQgdG8gc3VwcG9ydCB0aGUgJ3N0cmluZycgYXJndW1lbnQgaW4gNi4wLjBcbiAgICAgICAgICAgIGlmICh0eXBlb2Ygb3B0cyA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgICAgICBvcHRzID0ge1xuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogb3B0c1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMuYmFzZS5zYXZlU2VsZWN0aW9uKCk7XG4gICAgICAgICAgICB0aGlzLmhpZGVUb29sYmFyRGVmYXVsdEFjdGlvbnMoKTtcbiAgICAgICAgICAgIE1lZGl1bUVkaXRvci5leHRlbnNpb25zLmZvcm0ucHJvdG90eXBlLnNob3dGb3JtLmFwcGx5KHRoaXMpO1xuICAgICAgICAgICAgdGhpcy5zZXRUb29sYmFyUG9zaXRpb24oKTtcblxuICAgICAgICAgICAgaW5wdXQudmFsdWUgPSBvcHRzLnZhbHVlO1xuICAgICAgICAgICAgaW5wdXQuZm9jdXMoKTtcblxuICAgICAgICAgICAgLy8gSWYgd2UgaGF2ZSBhIHRhcmdldCBjaGVja2JveCwgd2Ugd2FudCBpdCB0byBiZSBjaGVja2VkL3VuY2hlY2tlZFxuICAgICAgICAgICAgLy8gYmFzZWQgb24gd2hldGhlciB0aGUgZXhpc3RpbmcgbGluayBoYXMgdGFyZ2V0PV9ibGFua1xuICAgICAgICAgICAgaWYgKHRhcmdldENoZWNrYm94KSB7XG4gICAgICAgICAgICAgICAgdGFyZ2V0Q2hlY2tib3guY2hlY2tlZCA9IG9wdHMudGFyZ2V0ID09PSAnX2JsYW5rJztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gSWYgd2UgaGF2ZSBhIGN1c3RvbSBjbGFzcyBjaGVja2JveCwgd2Ugd2FudCBpdCB0byBiZSBjaGVja2VkL3VuY2hlY2tlZFxuICAgICAgICAgICAgLy8gYmFzZWQgb24gd2hldGhlciBhbiBleGlzdGluZyBsaW5rIGFscmVhZHkgaGFzIHRoZSBjbGFzc1xuICAgICAgICAgICAgaWYgKGJ1dHRvbkNoZWNrYm94KSB7XG4gICAgICAgICAgICAgICAgdmFyIGNsYXNzTGlzdCA9IG9wdHMuYnV0dG9uQ2xhc3MgPyBvcHRzLmJ1dHRvbkNsYXNzLnNwbGl0KCcgJykgOiBbXTtcbiAgICAgICAgICAgICAgICBidXR0b25DaGVja2JveC5jaGVja2VkID0gKGNsYXNzTGlzdC5pbmRleE9mKHRoaXMuY3VzdG9tQ2xhc3NPcHRpb24pICE9PSAtMSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgLy8gQ2FsbGVkIGJ5IGNvcmUgd2hlbiB0ZWFyaW5nIGRvd24gbWVkaXVtLWVkaXRvciAoZGVzdHJveSlcbiAgICAgICAgZGVzdHJveTogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgaWYgKCF0aGlzLmZvcm0pIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICh0aGlzLmZvcm0ucGFyZW50Tm9kZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuZm9ybS5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHRoaXMuZm9ybSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGRlbGV0ZSB0aGlzLmZvcm07XG4gICAgICAgIH0sXG5cbiAgICAgICAgLy8gY29yZSBtZXRob2RzXG5cbiAgICAgICAgZ2V0Rm9ybU9wdHM6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIC8vIG5vIG5vdGlvbiBvZiBwcml2YXRlIGZ1bmN0aW9ucz8gd2FudGVkIGBfZ2V0Rm9ybU9wdHNgXG4gICAgICAgICAgICB2YXIgdGFyZ2V0Q2hlY2tib3ggPSB0aGlzLmdldEFuY2hvclRhcmdldENoZWNrYm94KCksXG4gICAgICAgICAgICAgICAgYnV0dG9uQ2hlY2tib3ggPSB0aGlzLmdldEFuY2hvckJ1dHRvbkNoZWNrYm94KCksXG4gICAgICAgICAgICAgICAgb3B0cyA9IHtcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IHRoaXMuZ2V0SW5wdXQoKS52YWx1ZS50cmltKClcbiAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICBpZiAodGhpcy5saW5rVmFsaWRhdGlvbikge1xuICAgICAgICAgICAgICAgIG9wdHMudmFsdWUgPSB0aGlzLmNoZWNrTGlua0Zvcm1hdChvcHRzLnZhbHVlKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgb3B0cy50YXJnZXQgPSAnX3NlbGYnO1xuICAgICAgICAgICAgaWYgKHRhcmdldENoZWNrYm94ICYmIHRhcmdldENoZWNrYm94LmNoZWNrZWQpIHtcbiAgICAgICAgICAgICAgICBvcHRzLnRhcmdldCA9ICdfYmxhbmsnO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoYnV0dG9uQ2hlY2tib3ggJiYgYnV0dG9uQ2hlY2tib3guY2hlY2tlZCkge1xuICAgICAgICAgICAgICAgIG9wdHMuYnV0dG9uQ2xhc3MgPSB0aGlzLmN1c3RvbUNsYXNzT3B0aW9uO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gb3B0cztcbiAgICAgICAgfSxcblxuICAgICAgICBkb0Zvcm1TYXZlOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgb3B0cyA9IHRoaXMuZ2V0Rm9ybU9wdHMoKTtcbiAgICAgICAgICAgIHRoaXMuY29tcGxldGVGb3JtU2F2ZShvcHRzKTtcbiAgICAgICAgfSxcblxuICAgICAgICBjb21wbGV0ZUZvcm1TYXZlOiBmdW5jdGlvbiAob3B0cykge1xuICAgICAgICAgICAgdGhpcy5iYXNlLnJlc3RvcmVTZWxlY3Rpb24oKTtcbiAgICAgICAgICAgIHRoaXMuZXhlY0FjdGlvbih0aGlzLmFjdGlvbiwgb3B0cyk7XG4gICAgICAgICAgICB0aGlzLmJhc2UuY2hlY2tTZWxlY3Rpb24oKTtcbiAgICAgICAgfSxcblxuICAgICAgICBjaGVja0xpbmtGb3JtYXQ6IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICAgICAgLy8gTWF0Y2hlcyBhbnkgYWxwaGFiZXRpY2FsIGNoYXJhY3RlcnMgZm9sbG93ZWQgYnkgOi8vXG4gICAgICAgICAgICAvLyBNYXRjaGVzIHByb3RvY29sIHJlbGF0aXZlIFwiLy9cIlxuICAgICAgICAgICAgLy8gTWF0Y2hlcyBjb21tb24gZXh0ZXJuYWwgcHJvdG9jb2xzIFwibWFpbHRvOlwiIFwidGVsOlwiIFwibWFwczpcIlxuICAgICAgICAgICAgLy8gTWF0Y2hlcyByZWxhdGl2ZSBoYXNoIGxpbmssIGJlZ2lucyB3aXRoIFwiI1wiXG4gICAgICAgICAgICB2YXIgdXJsU2NoZW1lUmVnZXggPSAvXihbYS16XSs6KT9cXC9cXC98XihtYWlsdG98dGVsfG1hcHMpOnxeXFwjL2ksXG4gICAgICAgICAgICAvLyB2YXIgdGUgaXMgYSByZWdleCBmb3IgY2hlY2tpbmcgaWYgdGhlIHN0cmluZyBpcyBhIHRlbGVwaG9uZSBudW1iZXJcbiAgICAgICAgICAgIHRlbFJlZ2V4ID0gL15cXCs/XFxzP1xcKD8oPzpcXGRcXHM/XFwtP1xcKT8pezMsMjB9JC87XG4gICAgICAgICAgICBpZiAodGVsUmVnZXgudGVzdCh2YWx1ZSkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gJ3RlbDonICsgdmFsdWU7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vIENoZWNrIGZvciBVUkwgc2NoZW1lIGFuZCBkZWZhdWx0IHRvIGh0dHA6Ly8gaWYgbm9uZSBmb3VuZFxuICAgICAgICAgICAgICAgIHJldHVybiAodXJsU2NoZW1lUmVnZXgudGVzdCh2YWx1ZSkgPyAnJyA6ICdodHRwOi8vJykgKyBlbmNvZGVVUkkodmFsdWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIGRvRm9ybUNhbmNlbDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdGhpcy5iYXNlLnJlc3RvcmVTZWxlY3Rpb24oKTtcbiAgICAgICAgICAgIHRoaXMuYmFzZS5jaGVja1NlbGVjdGlvbigpO1xuICAgICAgICB9LFxuXG4gICAgICAgIC8vIGZvcm0gY3JlYXRpb24gYW5kIGV2ZW50IGhhbmRsaW5nXG4gICAgICAgIGF0dGFjaEZvcm1FdmVudHM6IGZ1bmN0aW9uIChmb3JtKSB7XG4gICAgICAgICAgICB2YXIgY2xvc2UgPSBmb3JtLnF1ZXJ5U2VsZWN0b3IoJy5tZWRpdW0tZWRpdG9yLXRvb2xiYXItY2xvc2UnKSxcbiAgICAgICAgICAgICAgICBzYXZlID0gZm9ybS5xdWVyeVNlbGVjdG9yKCcubWVkaXVtLWVkaXRvci10b29sYmFyLXNhdmUnKSxcbiAgICAgICAgICAgICAgICBpbnB1dCA9IGZvcm0ucXVlcnlTZWxlY3RvcignLm1lZGl1bS1lZGl0b3ItdG9vbGJhci1pbnB1dCcpO1xuXG4gICAgICAgICAgICAvLyBIYW5kbGUgY2xpY2tzIG9uIHRoZSBmb3JtIGl0c2VsZlxuICAgICAgICAgICAgdGhpcy5vbihmb3JtLCAnY2xpY2snLCB0aGlzLmhhbmRsZUZvcm1DbGljay5iaW5kKHRoaXMpKTtcblxuICAgICAgICAgICAgLy8gSGFuZGxlIHR5cGluZyBpbiB0aGUgdGV4dGJveFxuICAgICAgICAgICAgdGhpcy5vbihpbnB1dCwgJ2tleXVwJywgdGhpcy5oYW5kbGVUZXh0Ym94S2V5dXAuYmluZCh0aGlzKSk7XG5cbiAgICAgICAgICAgIC8vIEhhbmRsZSBjbG9zZSBidXR0b24gY2xpY2tzXG4gICAgICAgICAgICB0aGlzLm9uKGNsb3NlLCAnY2xpY2snLCB0aGlzLmhhbmRsZUNsb3NlQ2xpY2suYmluZCh0aGlzKSk7XG5cbiAgICAgICAgICAgIC8vIEhhbmRsZSBzYXZlIGJ1dHRvbiBjbGlja3MgKGNhcHR1cmUpXG4gICAgICAgICAgICB0aGlzLm9uKHNhdmUsICdjbGljaycsIHRoaXMuaGFuZGxlU2F2ZUNsaWNrLmJpbmQodGhpcyksIHRydWUpO1xuXG4gICAgICAgIH0sXG5cbiAgICAgICAgY3JlYXRlRm9ybTogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIGRvYyA9IHRoaXMuZG9jdW1lbnQsXG4gICAgICAgICAgICAgICAgZm9ybSA9IGRvYy5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblxuICAgICAgICAgICAgLy8gQW5jaG9yIEZvcm0gKGRpdilcbiAgICAgICAgICAgIGZvcm0uY2xhc3NOYW1lID0gJ21lZGl1bS1lZGl0b3ItdG9vbGJhci1mb3JtJztcbiAgICAgICAgICAgIGZvcm0uaWQgPSAnbWVkaXVtLWVkaXRvci10b29sYmFyLWZvcm0tYW5jaG9yLScgKyB0aGlzLmdldEVkaXRvcklkKCk7XG4gICAgICAgICAgICBmb3JtLmlubmVySFRNTCA9IHRoaXMuZ2V0VGVtcGxhdGUoKTtcbiAgICAgICAgICAgIHRoaXMuYXR0YWNoRm9ybUV2ZW50cyhmb3JtKTtcblxuICAgICAgICAgICAgcmV0dXJuIGZvcm07XG4gICAgICAgIH0sXG5cbiAgICAgICAgZ2V0SW5wdXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmdldEZvcm0oKS5xdWVyeVNlbGVjdG9yKCdpbnB1dC5tZWRpdW0tZWRpdG9yLXRvb2xiYXItaW5wdXQnKTtcbiAgICAgICAgfSxcblxuICAgICAgICBnZXRBbmNob3JUYXJnZXRDaGVja2JveDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ2V0Rm9ybSgpLnF1ZXJ5U2VsZWN0b3IoJy5tZWRpdW0tZWRpdG9yLXRvb2xiYXItYW5jaG9yLXRhcmdldCcpO1xuICAgICAgICB9LFxuXG4gICAgICAgIGdldEFuY2hvckJ1dHRvbkNoZWNrYm94OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5nZXRGb3JtKCkucXVlcnlTZWxlY3RvcignLm1lZGl1bS1lZGl0b3ItdG9vbGJhci1hbmNob3ItYnV0dG9uJyk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgaGFuZGxlVGV4dGJveEtleXVwOiBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgICAgIC8vIEZvciBFTlRFUiAtPiBjcmVhdGUgdGhlIGFuY2hvclxuICAgICAgICAgICAgaWYgKGV2ZW50LmtleUNvZGUgPT09IE1lZGl1bUVkaXRvci51dGlsLmtleUNvZGUuRU5URVIpIHtcbiAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgIHRoaXMuZG9Gb3JtU2F2ZSgpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gRm9yIEVTQ0FQRSAtPiBjbG9zZSB0aGUgZm9ybVxuICAgICAgICAgICAgaWYgKGV2ZW50LmtleUNvZGUgPT09IE1lZGl1bUVkaXRvci51dGlsLmtleUNvZGUuRVNDQVBFKSB7XG4gICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICB0aGlzLmRvRm9ybUNhbmNlbCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIGhhbmRsZUZvcm1DbGljazogZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgICAgICAvLyBtYWtlIHN1cmUgbm90IHRvIGhpZGUgZm9ybSB3aGVuIGNsaWNraW5nIGluc2lkZSB0aGUgZm9ybVxuICAgICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgaGFuZGxlU2F2ZUNsaWNrOiBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgICAgIC8vIENsaWNraW5nIFNhdmUgLT4gY3JlYXRlIHRoZSBhbmNob3JcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICB0aGlzLmRvRm9ybVNhdmUoKTtcbiAgICAgICAgfSxcblxuICAgICAgICBoYW5kbGVDbG9zZUNsaWNrOiBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgICAgIC8vIENsaWNrIENsb3NlIC0+IGNsb3NlIHRoZSBmb3JtXG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgdGhpcy5kb0Zvcm1DYW5jZWwoKTtcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgTWVkaXVtRWRpdG9yLmV4dGVuc2lvbnMuYW5jaG9yID0gQW5jaG9yRm9ybTtcbn0oKSk7XG5cbihmdW5jdGlvbiAoKSB7XG4gICAgJ3VzZSBzdHJpY3QnO1xuXG4gICAgdmFyIEFuY2hvclByZXZpZXcgPSBNZWRpdW1FZGl0b3IuRXh0ZW5zaW9uLmV4dGVuZCh7XG4gICAgICAgIG5hbWU6ICdhbmNob3ItcHJldmlldycsXG5cbiAgICAgICAgLy8gQW5jaG9yIFByZXZpZXcgT3B0aW9uc1xuXG4gICAgICAgIC8qIGhpZGVEZWxheTogW251bWJlcl0gIChwcmV2aW91c2x5IG9wdGlvbnMuYW5jaG9yUHJldmlld0hpZGVEZWxheSlcbiAgICAgICAgICogdGltZSBpbiBtaWxsaXNlY29uZHMgdG8gc2hvdyB0aGUgYW5jaG9yIHRhZyBwcmV2aWV3IGFmdGVyIHRoZSBtb3VzZSBoYXMgbGVmdCB0aGUgYW5jaG9yIHRhZy5cbiAgICAgICAgICovXG4gICAgICAgIGhpZGVEZWxheTogNTAwLFxuXG4gICAgICAgIC8qIHByZXZpZXdWYWx1ZVNlbGVjdG9yOiBbc3RyaW5nXVxuICAgICAgICAgKiB0aGUgZGVmYXVsdCBzZWxlY3RvciB0byBsb2NhdGUgd2hlcmUgdG8gcHV0IHRoZSBhY3RpdmVBbmNob3IgdmFsdWUgaW4gdGhlIHByZXZpZXdcbiAgICAgICAgICovXG4gICAgICAgIHByZXZpZXdWYWx1ZVNlbGVjdG9yOiAnYScsXG5cbiAgICAgICAgLyogc2hvd1doZW5Ub29sYmFySXNWaXNpYmxlOiBbYm9vbGVhbl1cbiAgICAgICAgICogZGV0ZXJtaW5lcyB3aGV0aGVyIHRoZSBhbmNob3IgdGFnIHByZXZpZXcgc2hvd3MgdXAgd2hlbiB0aGUgdG9vbGJhciBpcyB2aXNpYmxlXG4gICAgICAgICAqL1xuICAgICAgICBzaG93V2hlblRvb2xiYXJJc1Zpc2libGU6IGZhbHNlLFxuXG4gICAgICAgIC8qIHNob3dPbkVtcHR5TGlua3M6IFtib29sZWFuXVxuICAgICAgICAqIGRldGVybWluZXMgd2hldGhlciB0aGUgYW5jaG9yIHRhZyBwcmV2aWV3IHNob3dzIHVwIG9uIGxpbmtzIHdpdGggaHJlZj1cIlwiIG9yIGhyZWY9XCIjc29tZXRoaW5nXCJcbiAgICAgICAgKi9cbiAgICAgICAgc2hvd09uRW1wdHlMaW5rczogdHJ1ZSxcblxuICAgICAgICBpbml0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB0aGlzLmFuY2hvclByZXZpZXcgPSB0aGlzLmNyZWF0ZVByZXZpZXcoKTtcblxuICAgICAgICAgICAgdGhpcy5nZXRFZGl0b3JPcHRpb24oJ2VsZW1lbnRzQ29udGFpbmVyJykuYXBwZW5kQ2hpbGQodGhpcy5hbmNob3JQcmV2aWV3KTtcblxuICAgICAgICAgICAgdGhpcy5hdHRhY2hUb0VkaXRhYmxlcygpO1xuICAgICAgICB9LFxuXG4gICAgICAgIGdldEludGVyYWN0aW9uRWxlbWVudHM6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmdldFByZXZpZXdFbGVtZW50KCk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgLy8gVE9ETzogUmVtb3ZlIHRoaXMgZnVuY3Rpb24gaW4gNi4wLjBcbiAgICAgICAgZ2V0UHJldmlld0VsZW1lbnQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmFuY2hvclByZXZpZXc7XG4gICAgICAgIH0sXG5cbiAgICAgICAgY3JlYXRlUHJldmlldzogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIGVsID0gdGhpcy5kb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblxuICAgICAgICAgICAgZWwuaWQgPSAnbWVkaXVtLWVkaXRvci1hbmNob3ItcHJldmlldy0nICsgdGhpcy5nZXRFZGl0b3JJZCgpO1xuICAgICAgICAgICAgZWwuY2xhc3NOYW1lID0gJ21lZGl1bS1lZGl0b3ItYW5jaG9yLXByZXZpZXcnO1xuICAgICAgICAgICAgZWwuaW5uZXJIVE1MID0gdGhpcy5nZXRUZW1wbGF0ZSgpO1xuXG4gICAgICAgICAgICB0aGlzLm9uKGVsLCAnY2xpY2snLCB0aGlzLmhhbmRsZUNsaWNrLmJpbmQodGhpcykpO1xuXG4gICAgICAgICAgICByZXR1cm4gZWw7XG4gICAgICAgIH0sXG5cbiAgICAgICAgZ2V0VGVtcGxhdGU6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiAnPGRpdiBjbGFzcz1cIm1lZGl1bS1lZGl0b3ItdG9vbGJhci1hbmNob3ItcHJldmlld1wiIGlkPVwibWVkaXVtLWVkaXRvci10b29sYmFyLWFuY2hvci1wcmV2aWV3XCI+JyArXG4gICAgICAgICAgICAgICAgJyAgICA8YSBjbGFzcz1cIm1lZGl1bS1lZGl0b3ItdG9vbGJhci1hbmNob3ItcHJldmlldy1pbm5lclwiPjwvYT4nICtcbiAgICAgICAgICAgICAgICAnPC9kaXY+JztcbiAgICAgICAgfSxcblxuICAgICAgICBkZXN0cm95OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5hbmNob3JQcmV2aWV3KSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuYW5jaG9yUHJldmlldy5wYXJlbnROb2RlKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYW5jaG9yUHJldmlldy5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHRoaXMuYW5jaG9yUHJldmlldyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGRlbGV0ZSB0aGlzLmFuY2hvclByZXZpZXc7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgaGlkZVByZXZpZXc6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHRoaXMuYW5jaG9yUHJldmlldy5jbGFzc0xpc3QucmVtb3ZlKCdtZWRpdW0tZWRpdG9yLWFuY2hvci1wcmV2aWV3LWFjdGl2ZScpO1xuICAgICAgICAgICAgdGhpcy5hY3RpdmVBbmNob3IgPSBudWxsO1xuICAgICAgICB9LFxuXG4gICAgICAgIHNob3dQcmV2aWV3OiBmdW5jdGlvbiAoYW5jaG9yRWwpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmFuY2hvclByZXZpZXcuY2xhc3NMaXN0LmNvbnRhaW5zKCdtZWRpdW0tZWRpdG9yLWFuY2hvci1wcmV2aWV3LWFjdGl2ZScpIHx8XG4gICAgICAgICAgICAgICAgICAgIGFuY2hvckVsLmdldEF0dHJpYnV0ZSgnZGF0YS1kaXNhYmxlLXByZXZpZXcnKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAodGhpcy5wcmV2aWV3VmFsdWVTZWxlY3Rvcikge1xuICAgICAgICAgICAgICAgIHRoaXMuYW5jaG9yUHJldmlldy5xdWVyeVNlbGVjdG9yKHRoaXMucHJldmlld1ZhbHVlU2VsZWN0b3IpLnRleHRDb250ZW50ID0gYW5jaG9yRWwuYXR0cmlidXRlcy5ocmVmLnZhbHVlO1xuICAgICAgICAgICAgICAgIHRoaXMuYW5jaG9yUHJldmlldy5xdWVyeVNlbGVjdG9yKHRoaXMucHJldmlld1ZhbHVlU2VsZWN0b3IpLmhyZWYgPSBhbmNob3JFbC5hdHRyaWJ1dGVzLmhyZWYudmFsdWU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMuYW5jaG9yUHJldmlldy5jbGFzc0xpc3QuYWRkKCdtZWRpdW0tdG9vbGJhci1hcnJvdy1vdmVyJyk7XG4gICAgICAgICAgICB0aGlzLmFuY2hvclByZXZpZXcuY2xhc3NMaXN0LnJlbW92ZSgnbWVkaXVtLXRvb2xiYXItYXJyb3ctdW5kZXInKTtcblxuICAgICAgICAgICAgaWYgKCF0aGlzLmFuY2hvclByZXZpZXcuY2xhc3NMaXN0LmNvbnRhaW5zKCdtZWRpdW0tZWRpdG9yLWFuY2hvci1wcmV2aWV3LWFjdGl2ZScpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5hbmNob3JQcmV2aWV3LmNsYXNzTGlzdC5hZGQoJ21lZGl1bS1lZGl0b3ItYW5jaG9yLXByZXZpZXctYWN0aXZlJyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMuYWN0aXZlQW5jaG9yID0gYW5jaG9yRWw7XG5cbiAgICAgICAgICAgIHRoaXMucG9zaXRpb25QcmV2aWV3KCk7XG4gICAgICAgICAgICB0aGlzLmF0dGFjaFByZXZpZXdIYW5kbGVycygpO1xuXG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfSxcblxuICAgICAgICBwb3NpdGlvblByZXZpZXc6IGZ1bmN0aW9uIChhY3RpdmVBbmNob3IpIHtcbiAgICAgICAgICAgIGFjdGl2ZUFuY2hvciA9IGFjdGl2ZUFuY2hvciB8fCB0aGlzLmFjdGl2ZUFuY2hvcjtcbiAgICAgICAgICAgIHZhciBjb250YWluZXJXaWR0aCA9IHRoaXMud2luZG93LmlubmVyV2lkdGgsXG4gICAgICAgICAgICAgICAgYnV0dG9uSGVpZ2h0ID0gdGhpcy5hbmNob3JQcmV2aWV3Lm9mZnNldEhlaWdodCxcbiAgICAgICAgICAgICAgICBib3VuZGFyeSA9IGFjdGl2ZUFuY2hvci5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKSxcbiAgICAgICAgICAgICAgICBkaWZmTGVmdCA9IHRoaXMuZGlmZkxlZnQsXG4gICAgICAgICAgICAgICAgZGlmZlRvcCA9IHRoaXMuZGlmZlRvcCxcbiAgICAgICAgICAgICAgICBlbGVtZW50c0NvbnRhaW5lciA9IHRoaXMuZ2V0RWRpdG9yT3B0aW9uKCdlbGVtZW50c0NvbnRhaW5lcicpLFxuICAgICAgICAgICAgICAgIGVsZW1lbnRzQ29udGFpbmVyQWJzb2x1dGUgPSBbJ2Fic29sdXRlJywgJ2ZpeGVkJ10uaW5kZXhPZih3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShlbGVtZW50c0NvbnRhaW5lcikuZ2V0UHJvcGVydHlWYWx1ZSgncG9zaXRpb24nKSkgPiAtMSxcbiAgICAgICAgICAgICAgICByZWxhdGl2ZUJvdW5kYXJ5ID0ge30sXG4gICAgICAgICAgICAgICAgaGFsZk9mZnNldFdpZHRoLCBkZWZhdWx0TGVmdCwgbWlkZGxlQm91bmRhcnksIGVsZW1lbnRzQ29udGFpbmVyQm91bmRhcnksIHRvcDtcblxuICAgICAgICAgICAgaGFsZk9mZnNldFdpZHRoID0gdGhpcy5hbmNob3JQcmV2aWV3Lm9mZnNldFdpZHRoIC8gMjtcbiAgICAgICAgICAgIHZhciB0b29sYmFyRXh0ZW5zaW9uID0gdGhpcy5iYXNlLmdldEV4dGVuc2lvbkJ5TmFtZSgndG9vbGJhcicpO1xuICAgICAgICAgICAgaWYgKHRvb2xiYXJFeHRlbnNpb24pIHtcbiAgICAgICAgICAgICAgICBkaWZmTGVmdCA9IHRvb2xiYXJFeHRlbnNpb24uZGlmZkxlZnQ7XG4gICAgICAgICAgICAgICAgZGlmZlRvcCA9IHRvb2xiYXJFeHRlbnNpb24uZGlmZlRvcDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGRlZmF1bHRMZWZ0ID0gZGlmZkxlZnQgLSBoYWxmT2Zmc2V0V2lkdGg7XG5cbiAgICAgICAgICAgIC8vIElmIGNvbnRhaW5lciBlbGVtZW50IGlzIGFic29sdXRlIC8gZml4ZWQsIHJlY2FsY3VsYXRlIGJvdW5kYXJpZXMgdG8gYmUgcmVsYXRpdmUgdG8gdGhlIGNvbnRhaW5lclxuICAgICAgICAgICAgaWYgKGVsZW1lbnRzQ29udGFpbmVyQWJzb2x1dGUpIHtcbiAgICAgICAgICAgICAgICBlbGVtZW50c0NvbnRhaW5lckJvdW5kYXJ5ID0gZWxlbWVudHNDb250YWluZXIuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgICAgICAgICAgICAgWyd0b3AnLCAnbGVmdCddLmZvckVhY2goZnVuY3Rpb24gKGtleSkge1xuICAgICAgICAgICAgICAgICAgICByZWxhdGl2ZUJvdW5kYXJ5W2tleV0gPSBib3VuZGFyeVtrZXldIC0gZWxlbWVudHNDb250YWluZXJCb3VuZGFyeVtrZXldO1xuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgcmVsYXRpdmVCb3VuZGFyeS53aWR0aCA9IGJvdW5kYXJ5LndpZHRoO1xuICAgICAgICAgICAgICAgIHJlbGF0aXZlQm91bmRhcnkuaGVpZ2h0ID0gYm91bmRhcnkuaGVpZ2h0O1xuICAgICAgICAgICAgICAgIGJvdW5kYXJ5ID0gcmVsYXRpdmVCb3VuZGFyeTtcblxuICAgICAgICAgICAgICAgIGNvbnRhaW5lcldpZHRoID0gZWxlbWVudHNDb250YWluZXJCb3VuZGFyeS53aWR0aDtcblxuICAgICAgICAgICAgICAgIC8vIEFkanVzdCB0b3AgcG9zaXRpb24gYWNjb3JkaW5nIHRvIGNvbnRhaW5lciBzY3JvbGwgcG9zaXRpb25cbiAgICAgICAgICAgICAgICB0b3AgPSBlbGVtZW50c0NvbnRhaW5lci5zY3JvbGxUb3A7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vIEFkanVzdCB0b3AgcG9zaXRpb24gYWNjb3JkaW5nIHRvIHdpbmRvdyBzY3JvbGwgcG9zaXRpb25cbiAgICAgICAgICAgICAgICB0b3AgPSB0aGlzLndpbmRvdy5wYWdlWU9mZnNldDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgbWlkZGxlQm91bmRhcnkgPSBib3VuZGFyeS5sZWZ0ICsgYm91bmRhcnkud2lkdGggLyAyO1xuICAgICAgICAgICAgdG9wICs9IGJ1dHRvbkhlaWdodCArIGJvdW5kYXJ5LnRvcCArIGJvdW5kYXJ5LmhlaWdodCAtIGRpZmZUb3AgLSB0aGlzLmFuY2hvclByZXZpZXcub2Zmc2V0SGVpZ2h0O1xuXG4gICAgICAgICAgICB0aGlzLmFuY2hvclByZXZpZXcuc3R5bGUudG9wID0gTWF0aC5yb3VuZCh0b3ApICsgJ3B4JztcbiAgICAgICAgICAgIHRoaXMuYW5jaG9yUHJldmlldy5zdHlsZS5yaWdodCA9ICdpbml0aWFsJztcbiAgICAgICAgICAgIGlmIChtaWRkbGVCb3VuZGFyeSA8IGhhbGZPZmZzZXRXaWR0aCkge1xuICAgICAgICAgICAgICAgIHRoaXMuYW5jaG9yUHJldmlldy5zdHlsZS5sZWZ0ID0gZGVmYXVsdExlZnQgKyBoYWxmT2Zmc2V0V2lkdGggKyAncHgnO1xuICAgICAgICAgICAgICAgIHRoaXMuYW5jaG9yUHJldmlldy5zdHlsZS5yaWdodCA9ICdpbml0aWFsJztcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoKGNvbnRhaW5lcldpZHRoIC0gbWlkZGxlQm91bmRhcnkpIDwgaGFsZk9mZnNldFdpZHRoKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5hbmNob3JQcmV2aWV3LnN0eWxlLmxlZnQgPSAnYXV0byc7XG4gICAgICAgICAgICAgICAgdGhpcy5hbmNob3JQcmV2aWV3LnN0eWxlLnJpZ2h0ID0gMDtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5hbmNob3JQcmV2aWV3LnN0eWxlLmxlZnQgPSBkZWZhdWx0TGVmdCArIG1pZGRsZUJvdW5kYXJ5ICsgJ3B4JztcbiAgICAgICAgICAgICAgICB0aGlzLmFuY2hvclByZXZpZXcuc3R5bGUucmlnaHQgPSAnaW5pdGlhbCc7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgYXR0YWNoVG9FZGl0YWJsZXM6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHRoaXMuc3Vic2NyaWJlKCdlZGl0YWJsZU1vdXNlb3ZlcicsIHRoaXMuaGFuZGxlRWRpdGFibGVNb3VzZW92ZXIuYmluZCh0aGlzKSk7XG4gICAgICAgICAgICB0aGlzLnN1YnNjcmliZSgncG9zaXRpb25lZFRvb2xiYXInLCB0aGlzLmhhbmRsZVBvc2l0aW9uZWRUb29sYmFyLmJpbmQodGhpcykpO1xuICAgICAgICB9LFxuXG4gICAgICAgIGhhbmRsZVBvc2l0aW9uZWRUb29sYmFyOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAvLyBJZiB0aGUgdG9vbGJhciBpcyB2aXNpYmxlIGFuZCBwb3NpdGlvbmVkLCB3ZSBkb24ndCBuZWVkIHRvIGhpZGUgdGhlIHByZXZpZXdcbiAgICAgICAgICAgIC8vIHdoZW4gc2hvd1doZW5Ub29sYmFySXNWaXNpYmxlIGlzIHRydWVcbiAgICAgICAgICAgIGlmICghdGhpcy5zaG93V2hlblRvb2xiYXJJc1Zpc2libGUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmhpZGVQcmV2aWV3KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgaGFuZGxlQ2xpY2s6IGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICAgICAgdmFyIGFuY2hvckV4dGVuc2lvbiA9IHRoaXMuYmFzZS5nZXRFeHRlbnNpb25CeU5hbWUoJ2FuY2hvcicpLFxuICAgICAgICAgICAgICAgIGFjdGl2ZUFuY2hvciA9IHRoaXMuYWN0aXZlQW5jaG9yO1xuXG4gICAgICAgICAgICBpZiAoYW5jaG9yRXh0ZW5zaW9uICYmIGFjdGl2ZUFuY2hvcikge1xuICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgICAgICAgICB0aGlzLmJhc2Uuc2VsZWN0RWxlbWVudCh0aGlzLmFjdGl2ZUFuY2hvcik7XG5cbiAgICAgICAgICAgICAgICAvLyBVc2luZyBzZXRUaW1lb3V0ICsgZGVsYXkgYmVjYXVzZTpcbiAgICAgICAgICAgICAgICAvLyBXZSBtYXkgYWN0dWFsbHkgYmUgZGlzcGxheWluZyB0aGUgYW5jaG9yIGZvcm0sIHdoaWNoIHNob3VsZCBiZSBjb250cm9sbGVkIGJ5IGRlbGF5XG4gICAgICAgICAgICAgICAgdGhpcy5iYXNlLmRlbGF5KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGFjdGl2ZUFuY2hvcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG9wdHMgPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IGFjdGl2ZUFuY2hvci5hdHRyaWJ1dGVzLmhyZWYudmFsdWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFyZ2V0OiBhY3RpdmVBbmNob3IuZ2V0QXR0cmlidXRlKCd0YXJnZXQnKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBidXR0b25DbGFzczogYWN0aXZlQW5jaG9yLmdldEF0dHJpYnV0ZSgnY2xhc3MnKVxuICAgICAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFuY2hvckV4dGVuc2lvbi5zaG93Rm9ybShvcHRzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFjdGl2ZUFuY2hvciA9IG51bGw7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LmJpbmQodGhpcykpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLmhpZGVQcmV2aWV3KCk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgaGFuZGxlQW5jaG9yTW91c2VvdXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHRoaXMuYW5jaG9yVG9QcmV2aWV3ID0gbnVsbDtcbiAgICAgICAgICAgIHRoaXMub2ZmKHRoaXMuYWN0aXZlQW5jaG9yLCAnbW91c2VvdXQnLCB0aGlzLmluc3RhbmNlSGFuZGxlQW5jaG9yTW91c2VvdXQpO1xuICAgICAgICAgICAgdGhpcy5pbnN0YW5jZUhhbmRsZUFuY2hvck1vdXNlb3V0ID0gbnVsbDtcbiAgICAgICAgfSxcblxuICAgICAgICBoYW5kbGVFZGl0YWJsZU1vdXNlb3ZlcjogZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgICAgICB2YXIgdGFyZ2V0ID0gTWVkaXVtRWRpdG9yLnV0aWwuZ2V0Q2xvc2VzdFRhZyhldmVudC50YXJnZXQsICdhJyk7XG5cbiAgICAgICAgICAgIGlmIChmYWxzZSA9PT0gdGFyZ2V0KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBEZXRlY3QgZW1wdHkgaHJlZiBhdHRyaWJ1dGVzXG4gICAgICAgICAgICAvLyBUaGUgYnJvd3NlciB3aWxsIG1ha2UgaHJlZj1cIlwiIG9yIGhyZWY9XCIjdG9wXCJcbiAgICAgICAgICAgIC8vIGludG8gYWJzb2x1dGUgdXJscyB3aGVuIGFjY2Vzc2VkIGFzIGV2ZW50LnRhcmdldC5ocmVmLCBzbyBjaGVjayB0aGUgaHRtbFxuICAgICAgICAgICAgaWYgKCF0aGlzLnNob3dPbkVtcHR5TGlua3MgJiZcbiAgICAgICAgICAgICAgICAoIS9ocmVmPVtcIiddXFxTK1tcIiddLy50ZXN0KHRhcmdldC5vdXRlckhUTUwpIHx8IC9ocmVmPVtcIiddI1xcUytbXCInXS8udGVzdCh0YXJnZXQub3V0ZXJIVE1MKSkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gb25seSBzaG93IHdoZW4gdG9vbGJhciBpcyBub3QgcHJlc2VudFxuICAgICAgICAgICAgdmFyIHRvb2xiYXIgPSB0aGlzLmJhc2UuZ2V0RXh0ZW5zaW9uQnlOYW1lKCd0b29sYmFyJyk7XG4gICAgICAgICAgICBpZiAoIXRoaXMuc2hvd1doZW5Ub29sYmFySXNWaXNpYmxlICYmIHRvb2xiYXIgJiYgdG9vbGJhci5pc0Rpc3BsYXllZCAmJiB0b29sYmFyLmlzRGlzcGxheWVkKCkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gZGV0YWNoIGhhbmRsZXIgZm9yIG90aGVyIGFuY2hvciBpbiBjYXNlIHdlIGhvdmVyZWQgbXVsdGlwbGUgYW5jaG9ycyBxdWlja2x5XG4gICAgICAgICAgICBpZiAodGhpcy5hY3RpdmVBbmNob3IgJiYgdGhpcy5hY3RpdmVBbmNob3IgIT09IHRhcmdldCkge1xuICAgICAgICAgICAgICAgIHRoaXMuZGV0YWNoUHJldmlld0hhbmRsZXJzKCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMuYW5jaG9yVG9QcmV2aWV3ID0gdGFyZ2V0O1xuXG4gICAgICAgICAgICB0aGlzLmluc3RhbmNlSGFuZGxlQW5jaG9yTW91c2VvdXQgPSB0aGlzLmhhbmRsZUFuY2hvck1vdXNlb3V0LmJpbmQodGhpcyk7XG4gICAgICAgICAgICB0aGlzLm9uKHRoaXMuYW5jaG9yVG9QcmV2aWV3LCAnbW91c2VvdXQnLCB0aGlzLmluc3RhbmNlSGFuZGxlQW5jaG9yTW91c2VvdXQpO1xuICAgICAgICAgICAgLy8gVXNpbmcgc2V0VGltZW91dCArIGRlbGF5IGJlY2F1c2U6XG4gICAgICAgICAgICAvLyAtIFdlJ3JlIGdvaW5nIHRvIHNob3cgdGhlIGFuY2hvciBwcmV2aWV3IGFjY29yZGluZyB0byB0aGUgY29uZmlndXJlZCBkZWxheVxuICAgICAgICAgICAgLy8gICBpZiB0aGUgbW91c2UgaGFzIG5vdCBsZWZ0IHRoZSBhbmNob3IgdGFnIGluIHRoYXQgdGltZVxuICAgICAgICAgICAgdGhpcy5iYXNlLmRlbGF5KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5hbmNob3JUb1ByZXZpZXcpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zaG93UHJldmlldyh0aGlzLmFuY2hvclRvUHJldmlldyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfS5iaW5kKHRoaXMpKTtcbiAgICAgICAgfSxcblxuICAgICAgICBoYW5kbGVQcmV2aWV3TW91c2VvdmVyOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB0aGlzLmxhc3RPdmVyID0gKG5ldyBEYXRlKCkpLmdldFRpbWUoKTtcbiAgICAgICAgICAgIHRoaXMuaG92ZXJpbmcgPSB0cnVlO1xuICAgICAgICB9LFxuXG4gICAgICAgIGhhbmRsZVByZXZpZXdNb3VzZW91dDogZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgICAgICBpZiAoIWV2ZW50LnJlbGF0ZWRUYXJnZXQgfHwgIS9hbmNob3ItcHJldmlldy8udGVzdChldmVudC5yZWxhdGVkVGFyZ2V0LmNsYXNzTmFtZSkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmhvdmVyaW5nID0gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgdXBkYXRlUHJldmlldzogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgaWYgKHRoaXMuaG92ZXJpbmcpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHZhciBkdXJyID0gKG5ldyBEYXRlKCkpLmdldFRpbWUoKSAtIHRoaXMubGFzdE92ZXI7XG4gICAgICAgICAgICBpZiAoZHVyciA+IHRoaXMuaGlkZURlbGF5KSB7XG4gICAgICAgICAgICAgICAgLy8gaGlkZSB0aGUgcHJldmlldyAxLzIgc2Vjb25kIGFmdGVyIG1vdXNlIGxlYXZlcyB0aGUgbGlua1xuICAgICAgICAgICAgICAgIHRoaXMuZGV0YWNoUHJldmlld0hhbmRsZXJzKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgZGV0YWNoUHJldmlld0hhbmRsZXJzOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAvLyBjbGVhbnVwXG4gICAgICAgICAgICBjbGVhckludGVydmFsKHRoaXMuaW50ZXJ2YWxUaW1lcik7XG4gICAgICAgICAgICBpZiAodGhpcy5pbnN0YW5jZUhhbmRsZVByZXZpZXdNb3VzZW92ZXIpIHtcbiAgICAgICAgICAgICAgICB0aGlzLm9mZih0aGlzLmFuY2hvclByZXZpZXcsICdtb3VzZW92ZXInLCB0aGlzLmluc3RhbmNlSGFuZGxlUHJldmlld01vdXNlb3Zlcik7XG4gICAgICAgICAgICAgICAgdGhpcy5vZmYodGhpcy5hbmNob3JQcmV2aWV3LCAnbW91c2VvdXQnLCB0aGlzLmluc3RhbmNlSGFuZGxlUHJldmlld01vdXNlb3V0KTtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5hY3RpdmVBbmNob3IpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vZmYodGhpcy5hY3RpdmVBbmNob3IsICdtb3VzZW92ZXInLCB0aGlzLmluc3RhbmNlSGFuZGxlUHJldmlld01vdXNlb3Zlcik7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMub2ZmKHRoaXMuYWN0aXZlQW5jaG9yLCAnbW91c2VvdXQnLCB0aGlzLmluc3RhbmNlSGFuZGxlUHJldmlld01vdXNlb3V0KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMuaGlkZVByZXZpZXcoKTtcblxuICAgICAgICAgICAgdGhpcy5ob3ZlcmluZyA9IHRoaXMuaW5zdGFuY2VIYW5kbGVQcmV2aWV3TW91c2VvdmVyID0gdGhpcy5pbnN0YW5jZUhhbmRsZVByZXZpZXdNb3VzZW91dCA9IG51bGw7XG4gICAgICAgIH0sXG5cbiAgICAgICAgLy8gVE9ETzogYnJlYWsgdXAgbWV0aG9kIGFuZCBleHRyYWN0IG91dCBoYW5kbGVyc1xuICAgICAgICBhdHRhY2hQcmV2aWV3SGFuZGxlcnM6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHRoaXMubGFzdE92ZXIgPSAobmV3IERhdGUoKSkuZ2V0VGltZSgpO1xuICAgICAgICAgICAgdGhpcy5ob3ZlcmluZyA9IHRydWU7XG5cbiAgICAgICAgICAgIHRoaXMuaW5zdGFuY2VIYW5kbGVQcmV2aWV3TW91c2VvdmVyID0gdGhpcy5oYW5kbGVQcmV2aWV3TW91c2VvdmVyLmJpbmQodGhpcyk7XG4gICAgICAgICAgICB0aGlzLmluc3RhbmNlSGFuZGxlUHJldmlld01vdXNlb3V0ID0gdGhpcy5oYW5kbGVQcmV2aWV3TW91c2VvdXQuYmluZCh0aGlzKTtcblxuICAgICAgICAgICAgdGhpcy5pbnRlcnZhbFRpbWVyID0gc2V0SW50ZXJ2YWwodGhpcy51cGRhdGVQcmV2aWV3LmJpbmQodGhpcyksIDIwMCk7XG5cbiAgICAgICAgICAgIHRoaXMub24odGhpcy5hbmNob3JQcmV2aWV3LCAnbW91c2VvdmVyJywgdGhpcy5pbnN0YW5jZUhhbmRsZVByZXZpZXdNb3VzZW92ZXIpO1xuICAgICAgICAgICAgdGhpcy5vbih0aGlzLmFuY2hvclByZXZpZXcsICdtb3VzZW91dCcsIHRoaXMuaW5zdGFuY2VIYW5kbGVQcmV2aWV3TW91c2VvdXQpO1xuICAgICAgICAgICAgdGhpcy5vbih0aGlzLmFjdGl2ZUFuY2hvciwgJ21vdXNlb3ZlcicsIHRoaXMuaW5zdGFuY2VIYW5kbGVQcmV2aWV3TW91c2VvdmVyKTtcbiAgICAgICAgICAgIHRoaXMub24odGhpcy5hY3RpdmVBbmNob3IsICdtb3VzZW91dCcsIHRoaXMuaW5zdGFuY2VIYW5kbGVQcmV2aWV3TW91c2VvdXQpO1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICBNZWRpdW1FZGl0b3IuZXh0ZW5zaW9ucy5hbmNob3JQcmV2aWV3ID0gQW5jaG9yUHJldmlldztcbn0oKSk7XG5cbihmdW5jdGlvbiAoKSB7XG4gICAgJ3VzZSBzdHJpY3QnO1xuXG4gICAgdmFyIFdISVRFU1BBQ0VfQ0hBUlMsXG4gICAgICAgIEtOT1dOX1RMRFNfRlJBR01FTlQsXG4gICAgICAgIExJTktfUkVHRVhQX1RFWFQsXG4gICAgICAgIEtOT1dOX1RMRFNfUkVHRVhQO1xuXG4gICAgV0hJVEVTUEFDRV9DSEFSUyA9IFsnICcsICdcXHQnLCAnXFxuJywgJ1xccicsICdcXHUwMEEwJywgJ1xcdTIwMDAnLCAnXFx1MjAwMScsICdcXHUyMDAyJywgJ1xcdTIwMDMnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ1xcdTIwMjgnLCAnXFx1MjAyOSddO1xuICAgIEtOT1dOX1RMRFNfRlJBR01FTlQgPSAnY29tfG5ldHxvcmd8ZWR1fGdvdnxtaWx8YWVyb3xhc2lhfGJpenxjYXR8Y29vcHxpbmZvfGludHxqb2JzfG1vYml8bXVzZXVtfG5hbWV8cG9zdHxwcm98dGVsfHRyYXZlbHwnICtcbiAgICAgICAgJ3h4eHxhY3xhZHxhZXxhZnxhZ3xhaXxhbHxhbXxhbnxhb3xhcXxhcnxhc3xhdHxhdXxhd3xheHxhenxiYXxiYnxiZHxiZXxiZnxiZ3xiaHxiaXxianxibXxibnxib3xicnxic3xidHxidnxid3xieXwnICtcbiAgICAgICAgJ2J6fGNhfGNjfGNkfGNmfGNnfGNofGNpfGNrfGNsfGNtfGNufGNvfGNyfGNzfGN1fGN2fGN4fGN5fGN6fGRkfGRlfGRqfGRrfGRtfGRvfGR6fGVjfGVlfGVnfGVofGVyfGVzfGV0fGV1fGZpfGZqfCcgK1xuICAgICAgICAnZmt8Zm18Zm98ZnJ8Z2F8Z2J8Z2R8Z2V8Z2Z8Z2d8Z2h8Z2l8Z2x8Z218Z258Z3B8Z3F8Z3J8Z3N8Z3R8Z3V8Z3d8Z3l8aGt8aG18aG58aHJ8aHR8aHV8aWR8aWV8aWx8aW18aW58aW98aXF8aXJ8JyArXG4gICAgICAgICdpc3xpdHxqZXxqbXxqb3xqcHxrZXxrZ3xraHxraXxrbXxrbnxrcHxrcnxrd3xreXxrenxsYXxsYnxsY3xsaXxsa3xscnxsc3xsdHxsdXxsdnxseXxtYXxtY3xtZHxtZXxtZ3xtaHxta3xtbHxtbXwnICtcbiAgICAgICAgJ21ufG1vfG1wfG1xfG1yfG1zfG10fG11fG12fG13fG14fG15fG16fG5hfG5jfG5lfG5mfG5nfG5pfG5sfG5vfG5wfG5yfG51fG56fG9tfHBhfHBlfHBmfHBnfHBofHBrfHBsfHBtfHBufHByfHBzfCcgK1xuICAgICAgICAncHR8cHd8cHl8cWF8cmV8cm98cnN8cnV8cnd8c2F8c2J8c2N8c2R8c2V8c2d8c2h8c2l8c2p8amF8c2t8c2x8c218c258c298c3J8c3N8c3R8c3V8c3Z8c3h8c3l8c3p8dGN8dGR8dGZ8dGd8dGh8JyArXG4gICAgICAgICd0anx0a3x0bHx0bXx0bnx0b3x0cHx0cnx0dHx0dnx0d3x0enx1YXx1Z3x1a3x1c3x1eXx1enx2YXx2Y3x2ZXx2Z3x2aXx2bnx2dXx3Znx3c3x5ZXx5dHx5dXx6YXx6bXx6dyc7XG5cbiAgICBMSU5LX1JFR0VYUF9URVhUID1cbiAgICAgICAgJygnICtcbiAgICAgICAgLy8gVmVyc2lvbiBvZiBHcnViZXIgVVJMIFJlZ2V4cCBvcHRpbWl6ZWQgZm9yIEpTOiBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vYS8xNzczMzY0MFxuICAgICAgICAnKCg/OihodHRwcz86Ly98ZnRwcz86Ly98bm50cDovLyl8d3d3XFxcXGR7MCwzfVsuXXxbYS16MC05LlxcXFwtXStbLl0oJyArIEtOT1dOX1RMRFNfRlJBR01FTlQgKyAnKVxcXFxcXC8pXFxcXFMrKD86W15cXFxcc2AhXFxcXFtcXFxcXXt9OzpcXCdcXFwiLiw/XFx1MDBBQlxcdTAwQkJcXHUyMDFDXFx1MjAxRFxcdTIwMThcXHUyMDE5XSkpJyArXG4gICAgICAgIC8vIEFkZGl0aW9uIHRvIGFib3ZlIFJlZ2V4cCB0byBzdXBwb3J0IGJhcmUgZG9tYWlucy9vbmUgbGV2ZWwgc3ViZG9tYWlucyB3aXRoIGNvbW1vbiBub24taTE4biBUTERzIGFuZCB3aXRob3V0IHd3dyBwcmVmaXg6XG4gICAgICAgICcpfCgoW2EtejAtOVxcXFwtXStcXFxcLik/W2EtejAtOVxcXFwtXStcXFxcLignICsgS05PV05fVExEU19GUkFHTUVOVCArICcpKSc7XG5cbiAgICBLTk9XTl9UTERTX1JFR0VYUCA9IG5ldyBSZWdFeHAoJ14oJyArIEtOT1dOX1RMRFNfRlJBR01FTlQgKyAnKSQnLCAnaScpO1xuXG4gICAgZnVuY3Rpb24gbm9kZUlzTm90SW5zaWRlQW5jaG9yVGFnKG5vZGUpIHtcbiAgICAgICAgcmV0dXJuICFNZWRpdW1FZGl0b3IudXRpbC5nZXRDbG9zZXN0VGFnKG5vZGUsICdhJyk7XG4gICAgfVxuXG4gICAgdmFyIEF1dG9MaW5rID0gTWVkaXVtRWRpdG9yLkV4dGVuc2lvbi5leHRlbmQoe1xuICAgICAgICBpbml0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBNZWRpdW1FZGl0b3IuRXh0ZW5zaW9uLnByb3RvdHlwZS5pbml0LmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG5cbiAgICAgICAgICAgIHRoaXMuZGlzYWJsZUV2ZW50SGFuZGxpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMuc3Vic2NyaWJlKCdlZGl0YWJsZUtleXByZXNzJywgdGhpcy5vbktleXByZXNzLmJpbmQodGhpcykpO1xuICAgICAgICAgICAgdGhpcy5zdWJzY3JpYmUoJ2VkaXRhYmxlQmx1cicsIHRoaXMub25CbHVyLmJpbmQodGhpcykpO1xuICAgICAgICAgICAgLy8gTVMgSUUgaGFzIGl0J3Mgb3duIGF1dG8tVVJMIGRldGVjdCBmZWF0dXJlIGJ1dCBvdXJzIGlzIGJldHRlciBpbiBzb21lIHdheXMuIEJlIGNvbnNpc3RlbnQuXG4gICAgICAgICAgICB0aGlzLmRvY3VtZW50LmV4ZWNDb21tYW5kKCdBdXRvVXJsRGV0ZWN0JywgZmFsc2UsIGZhbHNlKTtcbiAgICAgICAgfSxcblxuICAgICAgICBpc0xhc3RJbnN0YW5jZTogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIGFjdGl2ZUluc3RhbmNlcyA9IDA7XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMud2luZG93Ll9tZWRpdW1FZGl0b3JzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgdmFyIGVkaXRvciA9IHRoaXMud2luZG93Ll9tZWRpdW1FZGl0b3JzW2ldO1xuICAgICAgICAgICAgICAgIGlmIChlZGl0b3IgIT09IG51bGwgJiYgZWRpdG9yLmdldEV4dGVuc2lvbkJ5TmFtZSgnYXV0b0xpbmsnKSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgIGFjdGl2ZUluc3RhbmNlcysrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBhY3RpdmVJbnN0YW5jZXMgPT09IDE7XG4gICAgICAgIH0sXG5cbiAgICAgICAgZGVzdHJveTogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgLy8gVHVybiBBdXRvVXJsRGV0ZWN0IGJhY2sgb25cbiAgICAgICAgICAgIGlmICh0aGlzLmRvY3VtZW50LnF1ZXJ5Q29tbWFuZFN1cHBvcnRlZCgnQXV0b1VybERldGVjdCcpICYmIHRoaXMuaXNMYXN0SW5zdGFuY2UoKSkge1xuICAgICAgICAgICAgICAgIHRoaXMuZG9jdW1lbnQuZXhlY0NvbW1hbmQoJ0F1dG9VcmxEZXRlY3QnLCBmYWxzZSwgdHJ1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgb25CbHVyOiBmdW5jdGlvbiAoYmx1ckV2ZW50LCBlZGl0YWJsZSkge1xuICAgICAgICAgICAgdGhpcy5wZXJmb3JtTGlua2luZyhlZGl0YWJsZSk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgb25LZXlwcmVzczogZnVuY3Rpb24gKGtleVByZXNzRXZlbnQpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmRpc2FibGVFdmVudEhhbmRsaW5nKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoTWVkaXVtRWRpdG9yLnV0aWwuaXNLZXkoa2V5UHJlc3NFdmVudCwgW01lZGl1bUVkaXRvci51dGlsLmtleUNvZGUuU1BBQ0UsIE1lZGl1bUVkaXRvci51dGlsLmtleUNvZGUuRU5URVJdKSkge1xuICAgICAgICAgICAgICAgIGNsZWFyVGltZW91dCh0aGlzLnBlcmZvcm1MaW5raW5nVGltZW91dCk7XG4gICAgICAgICAgICAgICAgLy8gU2F2aW5nL3Jlc3RvcmluZyB0aGUgc2VsZWN0aW9uIGluIHRoZSBtaWRkbGUgb2YgYSBrZXlwcmVzcyBkb2Vzbid0IHdvcmsgd2VsbC4uLlxuICAgICAgICAgICAgICAgIHRoaXMucGVyZm9ybUxpbmtpbmdUaW1lb3V0ID0gc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgc2VsID0gdGhpcy5iYXNlLmV4cG9ydFNlbGVjdGlvbigpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMucGVyZm9ybUxpbmtpbmcoa2V5UHJlc3NFdmVudC50YXJnZXQpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gcGFzcyB0cnVlIGZvciBmYXZvckxhdGVyU2VsZWN0aW9uQW5jaG9yIC0gdGhpcyBpcyBuZWVkZWQgZm9yIGxpbmtzIGF0IHRoZSBlbmQgb2YgYVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHBhcmFncmFwaCBpbiBNUyBJRSwgb3IgTVMgSUUgY2F1c2VzIHRoZSBsaW5rIHRvIGJlIGRlbGV0ZWQgcmlnaHQgYWZ0ZXIgYWRkaW5nIGl0LlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYmFzZS5pbXBvcnRTZWxlY3Rpb24oc2VsLCB0cnVlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHdpbmRvdy5jb25zb2xlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2luZG93LmNvbnNvbGUuZXJyb3IoJ0ZhaWxlZCB0byBwZXJmb3JtIGxpbmtpbmcnLCBlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZGlzYWJsZUV2ZW50SGFuZGxpbmcgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfS5iaW5kKHRoaXMpLCAwKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICBwZXJmb3JtTGlua2luZzogZnVuY3Rpb24gKGNvbnRlbnRlZGl0YWJsZSkge1xuICAgICAgICAgICAgLypcbiAgICAgICAgICAgIFBlcmZvcm0gbGlua2luZyBvbiBibG9ja0VsZW1lbnQgYmFzaXMsIGJsb2NrRWxlbWVudHMgYXJlIEhUTUwgZWxlbWVudHMgd2l0aCB0ZXh0IGNvbnRlbnQgYW5kIHdpdGhvdXRcbiAgICAgICAgICAgIGNoaWxkIGVsZW1lbnQuXG5cbiAgICAgICAgICAgIEV4YW1wbGU6XG4gICAgICAgICAgICAtIEhUTUwgY29udGVudFxuICAgICAgICAgICAgPGJsb2NrcXVvdGU+XG4gICAgICAgICAgICAgIDxwPmxpbmsuPC9wPlxuICAgICAgICAgICAgICA8cD5teTwvcD5cbiAgICAgICAgICAgIDwvYmxvY2txdW90ZT5cblxuICAgICAgICAgICAgLSBibG9ja0VsZW1lbnRzXG4gICAgICAgICAgICBbPHA+bGluay48L3A+LCA8cD5teTwvcD5dXG5cbiAgICAgICAgICAgIG90aGVyd2lzZSB0aGUgZGV0ZWN0aW9uIGNhbiB3cm9uZ2x5IGZpbmQgdGhlIGVuZCBvZiBvbmUgcGFyYWdyYXBoIGFuZCB0aGUgYmVnaW5uaW5nIG9mIGFub3RoZXIgcGFyYWdyYXBoXG4gICAgICAgICAgICB0byBjb25zdGl0dXRlIGEgbGluaywgc3VjaCBhcyBhIHBhcmFncmFwaCBlbmRpbmcgXCJsaW5rLlwiIGFuZCB0aGUgbmV4dCBwYXJhZ3JhcGggYmVnaW5uaW5nIHdpdGggXCJteVwiIGlzXG4gICAgICAgICAgICBpbnRlcnByZXRlZCBpbnRvIFwibGluay5teVwiIGFuZCB0aGUgY29kZSB0cmllcyB0byBjcmVhdGUgYSBsaW5rIGFjcm9zcyBibG9ja0VsZW1lbnRzIC0gd2hpY2ggZG9lc24ndCB3b3JrXG4gICAgICAgICAgICBhbmQgaXMgdGVycmlibGUuXG4gICAgICAgICAgICAoTWVkaXVtIGRlbGV0ZXMgdGhlIHNwYWNlcy9yZXR1cm5zIGJldHdlZW4gUCB0YWdzIHNvIHRoZSB0ZXh0Q29udGVudCBlbmRzIHVwIHdpdGhvdXQgcGFyYWdyYXBoIHNwYWNpbmcpXG4gICAgICAgICAgICAqL1xuICAgICAgICAgICAgdmFyIGJsb2NrRWxlbWVudHMgPSBNZWRpdW1FZGl0b3IudXRpbC5zcGxpdEJ5QmxvY2tFbGVtZW50cyhjb250ZW50ZWRpdGFibGUpLFxuICAgICAgICAgICAgICAgIGRvY3VtZW50TW9kaWZpZWQgPSBmYWxzZTtcbiAgICAgICAgICAgIGlmIChibG9ja0VsZW1lbnRzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgICAgIGJsb2NrRWxlbWVudHMgPSBbY29udGVudGVkaXRhYmxlXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYmxvY2tFbGVtZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGRvY3VtZW50TW9kaWZpZWQgPSB0aGlzLnJlbW92ZU9ic29sZXRlQXV0b0xpbmtTcGFucyhibG9ja0VsZW1lbnRzW2ldKSB8fCBkb2N1bWVudE1vZGlmaWVkO1xuICAgICAgICAgICAgICAgIGRvY3VtZW50TW9kaWZpZWQgPSB0aGlzLnBlcmZvcm1MaW5raW5nV2l0aGluRWxlbWVudChibG9ja0VsZW1lbnRzW2ldKSB8fCBkb2N1bWVudE1vZGlmaWVkO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5iYXNlLmV2ZW50cy51cGRhdGVJbnB1dChjb250ZW50ZWRpdGFibGUsIHsgdGFyZ2V0OiBjb250ZW50ZWRpdGFibGUsIGN1cnJlbnRUYXJnZXQ6IGNvbnRlbnRlZGl0YWJsZSB9KTtcbiAgICAgICAgICAgIHJldHVybiBkb2N1bWVudE1vZGlmaWVkO1xuICAgICAgICB9LFxuXG4gICAgICAgIHJlbW92ZU9ic29sZXRlQXV0b0xpbmtTcGFuczogZnVuY3Rpb24gKGVsZW1lbnQpIHtcbiAgICAgICAgICAgIGlmICghZWxlbWVudCB8fCBlbGVtZW50Lm5vZGVUeXBlID09PSAzKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB2YXIgc3BhbnMgPSBlbGVtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ3NwYW5bZGF0YS1hdXRvLWxpbms9XCJ0cnVlXCJdJyksXG4gICAgICAgICAgICAgICAgZG9jdW1lbnRNb2RpZmllZCA9IGZhbHNlO1xuXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHNwYW5zLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgdmFyIHRleHRDb250ZW50ID0gc3BhbnNbaV0udGV4dENvbnRlbnQ7XG4gICAgICAgICAgICAgICAgaWYgKHRleHRDb250ZW50LmluZGV4T2YoJzovLycpID09PSAtMSkge1xuICAgICAgICAgICAgICAgICAgICB0ZXh0Q29udGVudCA9IE1lZGl1bUVkaXRvci51dGlsLmVuc3VyZVVybEhhc1Byb3RvY29sKHRleHRDb250ZW50KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKHNwYW5zW2ldLmdldEF0dHJpYnV0ZSgnZGF0YS1ocmVmJykgIT09IHRleHRDb250ZW50ICYmIG5vZGVJc05vdEluc2lkZUFuY2hvclRhZyhzcGFuc1tpXSkpIHtcbiAgICAgICAgICAgICAgICAgICAgZG9jdW1lbnRNb2RpZmllZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIHZhciB0cmltbWVkVGV4dENvbnRlbnQgPSB0ZXh0Q29udGVudC5yZXBsYWNlKC9cXHMrJC8sICcnKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHNwYW5zW2ldLmdldEF0dHJpYnV0ZSgnZGF0YS1ocmVmJykgPT09IHRyaW1tZWRUZXh0Q29udGVudCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGNoYXJhY3RlcnNUcmltbWVkID0gdGV4dENvbnRlbnQubGVuZ3RoIC0gdHJpbW1lZFRleHRDb250ZW50Lmxlbmd0aCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdWJ0cmVlID0gTWVkaXVtRWRpdG9yLnV0aWwuc3BsaXRPZmZET01UcmVlKHNwYW5zW2ldLCB0aGlzLnNwbGl0VGV4dEJlZm9yZUVuZChzcGFuc1tpXSwgY2hhcmFjdGVyc1RyaW1tZWQpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNwYW5zW2ldLnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKHN1YnRyZWUsIHNwYW5zW2ldLm5leHRTaWJsaW5nKTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIFNvbWUgZWRpdGluZyBoYXMgaGFwcGVuZWQgdG8gdGhlIHNwYW4sIHNvIGp1c3QgcmVtb3ZlIGl0IGVudGlyZWx5LiBUaGUgdXNlciBjYW4gcHV0IGl0IGJhY2tcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGFyb3VuZCBqdXN0IHRoZSBocmVmIGNvbnRlbnQgaWYgdGhleSBuZWVkIHRvIHByZXZlbnQgaXQgZnJvbSBsaW5raW5nXG4gICAgICAgICAgICAgICAgICAgICAgICBNZWRpdW1FZGl0b3IudXRpbC51bndyYXAoc3BhbnNbaV0sIHRoaXMuZG9jdW1lbnQpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGRvY3VtZW50TW9kaWZpZWQ7XG4gICAgICAgIH0sXG5cbiAgICAgICAgc3BsaXRUZXh0QmVmb3JlRW5kOiBmdW5jdGlvbiAoZWxlbWVudCwgY2hhcmFjdGVyQ291bnQpIHtcbiAgICAgICAgICAgIHZhciB0cmVlV2Fsa2VyID0gdGhpcy5kb2N1bWVudC5jcmVhdGVUcmVlV2Fsa2VyKGVsZW1lbnQsIE5vZGVGaWx0ZXIuU0hPV19URVhULCBudWxsLCBmYWxzZSksXG4gICAgICAgICAgICAgICAgbGFzdENoaWxkTm90RXhoYXVzdGVkID0gdHJ1ZTtcblxuICAgICAgICAgICAgLy8gU3RhcnQgdGhlIHRyZWUgd2Fsa2VyIGF0IHRoZSBsYXN0IGRlc2NlbmRhbnQgb2YgdGhlIHNwYW5cbiAgICAgICAgICAgIHdoaWxlIChsYXN0Q2hpbGROb3RFeGhhdXN0ZWQpIHtcbiAgICAgICAgICAgICAgICBsYXN0Q2hpbGROb3RFeGhhdXN0ZWQgPSB0cmVlV2Fsa2VyLmxhc3RDaGlsZCgpICE9PSBudWxsO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB2YXIgY3VycmVudE5vZGUsXG4gICAgICAgICAgICAgICAgY3VycmVudE5vZGVWYWx1ZSxcbiAgICAgICAgICAgICAgICBwcmV2aW91c05vZGU7XG4gICAgICAgICAgICB3aGlsZSAoY2hhcmFjdGVyQ291bnQgPiAwICYmIHByZXZpb3VzTm9kZSAhPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIGN1cnJlbnROb2RlID0gdHJlZVdhbGtlci5jdXJyZW50Tm9kZTtcbiAgICAgICAgICAgICAgICBjdXJyZW50Tm9kZVZhbHVlID0gY3VycmVudE5vZGUubm9kZVZhbHVlO1xuICAgICAgICAgICAgICAgIGlmIChjdXJyZW50Tm9kZVZhbHVlLmxlbmd0aCA+IGNoYXJhY3RlckNvdW50KSB7XG4gICAgICAgICAgICAgICAgICAgIHByZXZpb3VzTm9kZSA9IGN1cnJlbnROb2RlLnNwbGl0VGV4dChjdXJyZW50Tm9kZVZhbHVlLmxlbmd0aCAtIGNoYXJhY3RlckNvdW50KTtcbiAgICAgICAgICAgICAgICAgICAgY2hhcmFjdGVyQ291bnQgPSAwO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHByZXZpb3VzTm9kZSA9IHRyZWVXYWxrZXIucHJldmlvdXNOb2RlKCk7XG4gICAgICAgICAgICAgICAgICAgIGNoYXJhY3RlckNvdW50IC09IGN1cnJlbnROb2RlVmFsdWUubGVuZ3RoO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBwcmV2aW91c05vZGU7XG4gICAgICAgIH0sXG5cbiAgICAgICAgcGVyZm9ybUxpbmtpbmdXaXRoaW5FbGVtZW50OiBmdW5jdGlvbiAoZWxlbWVudCkge1xuICAgICAgICAgICAgdmFyIG1hdGNoZXMgPSB0aGlzLmZpbmRMaW5rYWJsZVRleHQoZWxlbWVudCksXG4gICAgICAgICAgICAgICAgbGlua0NyZWF0ZWQgPSBmYWxzZTtcblxuICAgICAgICAgICAgZm9yICh2YXIgbWF0Y2hJbmRleCA9IDA7IG1hdGNoSW5kZXggPCBtYXRjaGVzLmxlbmd0aDsgbWF0Y2hJbmRleCsrKSB7XG4gICAgICAgICAgICAgICAgdmFyIG1hdGNoaW5nVGV4dE5vZGVzID0gTWVkaXVtRWRpdG9yLnV0aWwuZmluZE9yQ3JlYXRlTWF0Y2hpbmdUZXh0Tm9kZXModGhpcy5kb2N1bWVudCwgZWxlbWVudCxcbiAgICAgICAgICAgICAgICAgICAgICAgIG1hdGNoZXNbbWF0Y2hJbmRleF0pO1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLnNob3VsZE5vdExpbmsobWF0Y2hpbmdUZXh0Tm9kZXMpKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzLmNyZWF0ZUF1dG9MaW5rKG1hdGNoaW5nVGV4dE5vZGVzLCBtYXRjaGVzW21hdGNoSW5kZXhdLmhyZWYpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGxpbmtDcmVhdGVkO1xuICAgICAgICB9LFxuXG4gICAgICAgIHNob3VsZE5vdExpbms6IGZ1bmN0aW9uICh0ZXh0Tm9kZXMpIHtcbiAgICAgICAgICAgIHZhciBzaG91bGROb3RMaW5rID0gZmFsc2U7XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRleHROb2Rlcy5sZW5ndGggJiYgc2hvdWxkTm90TGluayA9PT0gZmFsc2U7IGkrKykge1xuICAgICAgICAgICAgICAgIC8vIERvIG5vdCBsaW5rIGlmIHRoZSB0ZXh0IG5vZGUgaXMgZWl0aGVyIGluc2lkZSBhbiBhbmNob3Igb3IgaW5zaWRlIHNwYW5bZGF0YS1hdXRvLWxpbmtdXG4gICAgICAgICAgICAgICAgc2hvdWxkTm90TGluayA9ICEhTWVkaXVtRWRpdG9yLnV0aWwudHJhdmVyc2VVcCh0ZXh0Tm9kZXNbaV0sIGZ1bmN0aW9uIChub2RlKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBub2RlLm5vZGVOYW1lLnRvTG93ZXJDYXNlKCkgPT09ICdhJyB8fFxuICAgICAgICAgICAgICAgICAgICAgICAgKG5vZGUuZ2V0QXR0cmlidXRlICYmIG5vZGUuZ2V0QXR0cmlidXRlKCdkYXRhLWF1dG8tbGluaycpID09PSAndHJ1ZScpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHNob3VsZE5vdExpbms7XG4gICAgICAgIH0sXG5cbiAgICAgICAgZmluZExpbmthYmxlVGV4dDogZnVuY3Rpb24gKGNvbnRlbnRlZGl0YWJsZSkge1xuICAgICAgICAgICAgdmFyIGxpbmtSZWdFeHAgPSBuZXcgUmVnRXhwKExJTktfUkVHRVhQX1RFWFQsICdnaScpLFxuICAgICAgICAgICAgICAgIHRleHRDb250ZW50ID0gY29udGVudGVkaXRhYmxlLnRleHRDb250ZW50LFxuICAgICAgICAgICAgICAgIG1hdGNoID0gbnVsbCxcbiAgICAgICAgICAgICAgICBtYXRjaGVzID0gW107XG5cbiAgICAgICAgICAgIHdoaWxlICgobWF0Y2ggPSBsaW5rUmVnRXhwLmV4ZWModGV4dENvbnRlbnQpKSAhPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIHZhciBtYXRjaE9rID0gdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgbWF0Y2hFbmQgPSBtYXRjaC5pbmRleCArIG1hdGNoWzBdLmxlbmd0aDtcbiAgICAgICAgICAgICAgICAvLyBJZiB0aGUgcmVnZXhwIGRldGVjdGVkIHNvbWV0aGluZyBhcyBhIGxpbmsgdGhhdCBoYXMgdGV4dCBpbW1lZGlhdGVseSBwcmVjZWRpbmcvZm9sbG93aW5nIGl0LCBiYWlsIG91dC5cbiAgICAgICAgICAgICAgICBtYXRjaE9rID0gKG1hdGNoLmluZGV4ID09PSAwIHx8IFdISVRFU1BBQ0VfQ0hBUlMuaW5kZXhPZih0ZXh0Q29udGVudFttYXRjaC5pbmRleCAtIDFdKSAhPT0gLTEpICYmXG4gICAgICAgICAgICAgICAgICAgIChtYXRjaEVuZCA9PT0gdGV4dENvbnRlbnQubGVuZ3RoIHx8IFdISVRFU1BBQ0VfQ0hBUlMuaW5kZXhPZih0ZXh0Q29udGVudFttYXRjaEVuZF0pICE9PSAtMSk7XG4gICAgICAgICAgICAgICAgLy8gSWYgdGhlIHJlZ2V4cCBkZXRlY3RlZCBhIGJhcmUgZG9tYWluIHRoYXQgZG9lc24ndCB1c2Ugb25lIG9mIG91ciBleHBlY3RlZCBUTERzLCBiYWlsIG91dC5cbiAgICAgICAgICAgICAgICBtYXRjaE9rID0gbWF0Y2hPayAmJiAobWF0Y2hbMF0uaW5kZXhPZignLycpICE9PSAtMSB8fFxuICAgICAgICAgICAgICAgICAgICBLTk9XTl9UTERTX1JFR0VYUC50ZXN0KG1hdGNoWzBdLnNwbGl0KCcuJykucG9wKCkuc3BsaXQoJz8nKS5zaGlmdCgpKSk7XG5cbiAgICAgICAgICAgICAgICBpZiAobWF0Y2hPaykge1xuICAgICAgICAgICAgICAgICAgICBtYXRjaGVzLnB1c2goe1xuICAgICAgICAgICAgICAgICAgICAgICAgaHJlZjogbWF0Y2hbMF0sXG4gICAgICAgICAgICAgICAgICAgICAgICBzdGFydDogbWF0Y2guaW5kZXgsXG4gICAgICAgICAgICAgICAgICAgICAgICBlbmQ6IG1hdGNoRW5kXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBtYXRjaGVzO1xuICAgICAgICB9LFxuXG4gICAgICAgIGNyZWF0ZUF1dG9MaW5rOiBmdW5jdGlvbiAodGV4dE5vZGVzLCBocmVmKSB7XG4gICAgICAgICAgICBocmVmID0gTWVkaXVtRWRpdG9yLnV0aWwuZW5zdXJlVXJsSGFzUHJvdG9jb2woaHJlZik7XG4gICAgICAgICAgICB2YXIgYW5jaG9yID0gTWVkaXVtRWRpdG9yLnV0aWwuY3JlYXRlTGluayh0aGlzLmRvY3VtZW50LCB0ZXh0Tm9kZXMsIGhyZWYsIHRoaXMuZ2V0RWRpdG9yT3B0aW9uKCd0YXJnZXRCbGFuaycpID8gJ19ibGFuaycgOiBudWxsKSxcbiAgICAgICAgICAgICAgICBzcGFuID0gdGhpcy5kb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gICAgICAgICAgICBzcGFuLnNldEF0dHJpYnV0ZSgnZGF0YS1hdXRvLWxpbmsnLCAndHJ1ZScpO1xuICAgICAgICAgICAgc3Bhbi5zZXRBdHRyaWJ1dGUoJ2RhdGEtaHJlZicsIGhyZWYpO1xuICAgICAgICAgICAgYW5jaG9yLmluc2VydEJlZm9yZShzcGFuLCBhbmNob3IuZmlyc3RDaGlsZCk7XG4gICAgICAgICAgICB3aGlsZSAoYW5jaG9yLmNoaWxkTm9kZXMubGVuZ3RoID4gMSkge1xuICAgICAgICAgICAgICAgIHNwYW4uYXBwZW5kQ2hpbGQoYW5jaG9yLmNoaWxkTm9kZXNbMV0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICB9KTtcblxuICAgIE1lZGl1bUVkaXRvci5leHRlbnNpb25zLmF1dG9MaW5rID0gQXV0b0xpbms7XG59KCkpO1xuXG4oZnVuY3Rpb24gKCkge1xuICAgICd1c2Ugc3RyaWN0JztcblxuICAgIHZhciBDTEFTU19EUkFHX09WRVIgPSAnbWVkaXVtLWVkaXRvci1kcmFnb3Zlcic7XG5cbiAgICBmdW5jdGlvbiBjbGVhckNsYXNzTmFtZXMoZWxlbWVudCkge1xuICAgICAgICB2YXIgZWRpdGFibGUgPSBNZWRpdW1FZGl0b3IudXRpbC5nZXRDb250YWluZXJFZGl0b3JFbGVtZW50KGVsZW1lbnQpLFxuICAgICAgICAgICAgZXhpc3RpbmcgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChlZGl0YWJsZS5wYXJlbnRFbGVtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy4nICsgQ0xBU1NfRFJBR19PVkVSKSk7XG5cbiAgICAgICAgZXhpc3RpbmcuZm9yRWFjaChmdW5jdGlvbiAoZWwpIHtcbiAgICAgICAgICAgIGVsLmNsYXNzTGlzdC5yZW1vdmUoQ0xBU1NfRFJBR19PVkVSKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgdmFyIEZpbGVEcmFnZ2luZyA9IE1lZGl1bUVkaXRvci5FeHRlbnNpb24uZXh0ZW5kKHtcbiAgICAgICAgbmFtZTogJ2ZpbGVEcmFnZ2luZycsXG5cbiAgICAgICAgYWxsb3dlZFR5cGVzOiBbJ2ltYWdlJ10sXG5cbiAgICAgICAgaW5pdDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgTWVkaXVtRWRpdG9yLkV4dGVuc2lvbi5wcm90b3R5cGUuaW5pdC5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuXG4gICAgICAgICAgICB0aGlzLnN1YnNjcmliZSgnZWRpdGFibGVEcmFnJywgdGhpcy5oYW5kbGVEcmFnLmJpbmQodGhpcykpO1xuICAgICAgICAgICAgdGhpcy5zdWJzY3JpYmUoJ2VkaXRhYmxlRHJvcCcsIHRoaXMuaGFuZGxlRHJvcC5iaW5kKHRoaXMpKTtcbiAgICAgICAgfSxcblxuICAgICAgICBoYW5kbGVEcmFnOiBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICBldmVudC5kYXRhVHJhbnNmZXIuZHJvcEVmZmVjdCA9ICdjb3B5JztcblxuICAgICAgICAgICAgdmFyIHRhcmdldCA9IGV2ZW50LnRhcmdldC5jbGFzc0xpc3QgPyBldmVudC50YXJnZXQgOiBldmVudC50YXJnZXQucGFyZW50RWxlbWVudDtcblxuICAgICAgICAgICAgLy8gRW5zdXJlIHRoZSBjbGFzcyBnZXRzIHJlbW92ZWQgZnJvbSBhbnl0aGluZyB0aGF0IGhhZCBpdCBiZWZvcmVcbiAgICAgICAgICAgIGNsZWFyQ2xhc3NOYW1lcyh0YXJnZXQpO1xuXG4gICAgICAgICAgICBpZiAoZXZlbnQudHlwZSA9PT0gJ2RyYWdvdmVyJykge1xuICAgICAgICAgICAgICAgIHRhcmdldC5jbGFzc0xpc3QuYWRkKENMQVNTX0RSQUdfT1ZFUik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgaGFuZGxlRHJvcDogZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgICAgICAvLyBQcmV2ZW50IGZpbGUgZnJvbSBvcGVuaW5nIGluIHRoZSBjdXJyZW50IHdpbmRvd1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICAgICAgLy8gU2VsZWN0IHRoZSBkcm9wcGluZyB0YXJnZXQsIGFuZCBzZXQgdGhlIHNlbGVjdGlvbiB0byB0aGUgZW5kIG9mIHRoZSB0YXJnZXRcbiAgICAgICAgICAgIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS95YWJ3ZS9tZWRpdW0tZWRpdG9yL2lzc3Vlcy85ODBcbiAgICAgICAgICAgIHRoaXMuYmFzZS5zZWxlY3RFbGVtZW50KGV2ZW50LnRhcmdldCk7XG4gICAgICAgICAgICB2YXIgc2VsZWN0aW9uID0gdGhpcy5iYXNlLmV4cG9ydFNlbGVjdGlvbigpO1xuICAgICAgICAgICAgc2VsZWN0aW9uLnN0YXJ0ID0gc2VsZWN0aW9uLmVuZDtcbiAgICAgICAgICAgIHRoaXMuYmFzZS5pbXBvcnRTZWxlY3Rpb24oc2VsZWN0aW9uKTtcbiAgICAgICAgICAgIC8vIElFOSBkb2VzIG5vdCBzdXBwb3J0IHRoZSBGaWxlIEFQSSwgc28gcHJldmVudCBmaWxlIGZyb20gb3BlbmluZyBpbiB0aGUgd2luZG93XG4gICAgICAgICAgICAvLyBidXQgYWxzbyBkb24ndCB0cnkgdG8gYWN0dWFsbHkgZ2V0IHRoZSBmaWxlXG4gICAgICAgICAgICBpZiAoZXZlbnQuZGF0YVRyYW5zZmVyLmZpbGVzKSB7XG4gICAgICAgICAgICAgICAgQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoZXZlbnQuZGF0YVRyYW5zZmVyLmZpbGVzKS5mb3JFYWNoKGZ1bmN0aW9uIChmaWxlKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmlzQWxsb3dlZEZpbGUoZmlsZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChmaWxlLnR5cGUubWF0Y2goJ2ltYWdlJykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmluc2VydEltYWdlRmlsZShmaWxlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sIHRoaXMpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBNYWtlIHN1cmUgd2UgcmVtb3ZlIG91ciBjbGFzcyBmcm9tIGV2ZXJ5dGhpbmdcbiAgICAgICAgICAgIGNsZWFyQ2xhc3NOYW1lcyhldmVudC50YXJnZXQpO1xuICAgICAgICB9LFxuXG4gICAgICAgIGlzQWxsb3dlZEZpbGU6IGZ1bmN0aW9uIChmaWxlKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5hbGxvd2VkVHlwZXMuc29tZShmdW5jdGlvbiAoZmlsZVR5cGUpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gISFmaWxlLnR5cGUubWF0Y2goZmlsZVR5cGUpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgaW5zZXJ0SW1hZ2VGaWxlOiBmdW5jdGlvbiAoZmlsZSkge1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBGaWxlUmVhZGVyICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFyIGZpbGVSZWFkZXIgPSBuZXcgRmlsZVJlYWRlcigpO1xuICAgICAgICAgICAgZmlsZVJlYWRlci5yZWFkQXNEYXRhVVJMKGZpbGUpO1xuXG4gICAgICAgICAgICAvLyBhdHRhY2ggdGhlIG9ubG9hZCBldmVudCBoYW5kbGVyLCBtYWtlcyBpdCBlYXNpZXIgdG8gbGlzdGVuIGluIHdpdGggamFzbWluZVxuICAgICAgICAgICAgZmlsZVJlYWRlci5hZGRFdmVudExpc3RlbmVyKCdsb2FkJywgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgICAgICB2YXIgYWRkSW1hZ2VFbGVtZW50ID0gdGhpcy5kb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKTtcbiAgICAgICAgICAgICAgICBhZGRJbWFnZUVsZW1lbnQuc3JjID0gZS50YXJnZXQucmVzdWx0O1xuICAgICAgICAgICAgICAgIE1lZGl1bUVkaXRvci51dGlsLmluc2VydEhUTUxDb21tYW5kKHRoaXMuZG9jdW1lbnQsIGFkZEltYWdlRWxlbWVudC5vdXRlckhUTUwpO1xuICAgICAgICAgICAgfS5iaW5kKHRoaXMpKTtcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgTWVkaXVtRWRpdG9yLmV4dGVuc2lvbnMuZmlsZURyYWdnaW5nID0gRmlsZURyYWdnaW5nO1xufSgpKTtcblxuKGZ1bmN0aW9uICgpIHtcbiAgICAndXNlIHN0cmljdCc7XG5cbiAgICB2YXIgS2V5Ym9hcmRDb21tYW5kcyA9IE1lZGl1bUVkaXRvci5FeHRlbnNpb24uZXh0ZW5kKHtcbiAgICAgICAgbmFtZTogJ2tleWJvYXJkLWNvbW1hbmRzJyxcblxuICAgICAgICAvKiBLZXlib2FyZENvbW1hbmRzIE9wdGlvbnMgKi9cblxuICAgICAgICAvKiBjb21tYW5kczogW0FycmF5XVxuICAgICAgICAgKiBBcnJheSBvZiBvYmplY3RzIGRlc2NyaWJpbmcgZWFjaCBjb21tYW5kIGFuZCB0aGUgY29tYmluYXRpb24gb2Yga2V5cyB0aGF0IHdpbGwgdHJpZ2dlciBpdFxuICAgICAgICAgKiBSZXF1aXJlZCBmb3IgZWFjaCBvYmplY3Q6XG4gICAgICAgICAqICAgY29tbWFuZCBbU3RyaW5nXSAoYXJndW1lbnQgcGFzc2VkIHRvIGVkaXRvci5leGVjQWN0aW9uKCkpXG4gICAgICAgICAqICAga2V5IFtTdHJpbmddIChrZXlib2FyZCBjaGFyYWN0ZXIgdGhhdCB0cmlnZ2VycyB0aGlzIGNvbW1hbmQpXG4gICAgICAgICAqICAgbWV0YSBbYm9vbGVhbl0gKHdoZXRoZXIgdGhlIGN0cmwvbWV0YSBrZXkgaGFzIHRvIGJlIGFjdGl2ZSBvciBpbmFjdGl2ZSlcbiAgICAgICAgICogICBzaGlmdCBbYm9vbGVhbl0gKHdoZXRoZXIgdGhlIHNoaWZ0IGtleSBoYXMgdG8gYmUgYWN0aXZlIG9yIGluYWN0aXZlKVxuICAgICAgICAgKiAgIGFsdCBbYm9vbGVhbl0gKHdoZXRoZXIgdGhlIGFsdCBrZXkgaGFzIHRvIGJlIGFjdGl2ZSBvciBpbmFjdGl2ZSlcbiAgICAgICAgICovXG4gICAgICAgIGNvbW1hbmRzOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgY29tbWFuZDogJ2JvbGQnLFxuICAgICAgICAgICAgICAgIGtleTogJ0InLFxuICAgICAgICAgICAgICAgIG1ldGE6IHRydWUsXG4gICAgICAgICAgICAgICAgc2hpZnQ6IGZhbHNlLFxuICAgICAgICAgICAgICAgIGFsdDogZmFsc2VcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgY29tbWFuZDogJ2l0YWxpYycsXG4gICAgICAgICAgICAgICAga2V5OiAnSScsXG4gICAgICAgICAgICAgICAgbWV0YTogdHJ1ZSxcbiAgICAgICAgICAgICAgICBzaGlmdDogZmFsc2UsXG4gICAgICAgICAgICAgICAgYWx0OiBmYWxzZVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBjb21tYW5kOiAndW5kZXJsaW5lJyxcbiAgICAgICAgICAgICAgICBrZXk6ICdVJyxcbiAgICAgICAgICAgICAgICBtZXRhOiB0cnVlLFxuICAgICAgICAgICAgICAgIHNoaWZ0OiBmYWxzZSxcbiAgICAgICAgICAgICAgICBhbHQ6IGZhbHNlXG4gICAgICAgICAgICB9XG4gICAgICAgIF0sXG5cbiAgICAgICAgaW5pdDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgTWVkaXVtRWRpdG9yLkV4dGVuc2lvbi5wcm90b3R5cGUuaW5pdC5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuXG4gICAgICAgICAgICB0aGlzLnN1YnNjcmliZSgnZWRpdGFibGVLZXlkb3duJywgdGhpcy5oYW5kbGVLZXlkb3duLmJpbmQodGhpcykpO1xuICAgICAgICAgICAgdGhpcy5rZXlzID0ge307XG4gICAgICAgICAgICB0aGlzLmNvbW1hbmRzLmZvckVhY2goZnVuY3Rpb24gKGNvbW1hbmQpIHtcbiAgICAgICAgICAgICAgICB2YXIga2V5Q29kZSA9IGNvbW1hbmQua2V5LmNoYXJDb2RlQXQoMCk7XG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLmtleXNba2V5Q29kZV0pIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5rZXlzW2tleUNvZGVdID0gW107XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRoaXMua2V5c1trZXlDb2RlXS5wdXNoKGNvbW1hbmQpO1xuICAgICAgICAgICAgfSwgdGhpcyk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgaGFuZGxlS2V5ZG93bjogZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgICAgICB2YXIga2V5Q29kZSA9IE1lZGl1bUVkaXRvci51dGlsLmdldEtleUNvZGUoZXZlbnQpO1xuICAgICAgICAgICAgaWYgKCF0aGlzLmtleXNba2V5Q29kZV0pIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHZhciBpc01ldGEgPSBNZWRpdW1FZGl0b3IudXRpbC5pc01ldGFDdHJsS2V5KGV2ZW50KSxcbiAgICAgICAgICAgICAgICBpc1NoaWZ0ID0gISFldmVudC5zaGlmdEtleSxcbiAgICAgICAgICAgICAgICBpc0FsdCA9ICEhZXZlbnQuYWx0S2V5O1xuXG4gICAgICAgICAgICB0aGlzLmtleXNba2V5Q29kZV0uZm9yRWFjaChmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgICAgICAgICAgIGlmIChkYXRhLm1ldGEgPT09IGlzTWV0YSAmJlxuICAgICAgICAgICAgICAgICAgICBkYXRhLnNoaWZ0ID09PSBpc1NoaWZ0ICYmXG4gICAgICAgICAgICAgICAgICAgIChkYXRhLmFsdCA9PT0gaXNBbHQgfHxcbiAgICAgICAgICAgICAgICAgICAgIHVuZGVmaW5lZCA9PT0gZGF0YS5hbHQpKSB7IC8vIFRPRE8gZGVwcmVjYXRlZDogcmVtb3ZlIGNoZWNrIGZvciB1bmRlZmluZWQgPT09IGRhdGEuYWx0IHdoZW4ganVtcGluZyB0byA2LjAuMFxuICAgICAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcblxuICAgICAgICAgICAgICAgICAgICAvLyBjb21tYW5kIGNhbiBiZSBhIGZ1bmN0aW9uIHRvIGV4ZWN1dGVcbiAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBkYXRhLmNvbW1hbmQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGEuY29tbWFuZC5hcHBseSh0aGlzKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAvLyBjb21tYW5kIGNhbiBiZSBmYWxzZSBzbyB0aGUgc2hvcnRjdXQgaXMganVzdCBkaXNhYmxlZFxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmIChmYWxzZSAhPT0gZGF0YS5jb21tYW5kKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmV4ZWNBY3Rpb24oZGF0YS5jb21tYW5kKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sIHRoaXMpO1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICBNZWRpdW1FZGl0b3IuZXh0ZW5zaW9ucy5rZXlib2FyZENvbW1hbmRzID0gS2V5Ym9hcmRDb21tYW5kcztcbn0oKSk7XG5cbihmdW5jdGlvbiAoKSB7XG4gICAgJ3VzZSBzdHJpY3QnO1xuXG4gICAgdmFyIEZvbnROYW1lRm9ybSA9IE1lZGl1bUVkaXRvci5leHRlbnNpb25zLmZvcm0uZXh0ZW5kKHtcblxuICAgICAgICBuYW1lOiAnZm9udG5hbWUnLFxuICAgICAgICBhY3Rpb246ICdmb250TmFtZScsXG4gICAgICAgIGFyaWE6ICdjaGFuZ2UgZm9udCBuYW1lJyxcbiAgICAgICAgY29udGVudERlZmF1bHQ6ICcmI3hCMTsnLCAvLyDCsVxuICAgICAgICBjb250ZW50RkE6ICc8aSBjbGFzcz1cImZhIGZhLWZvbnRcIj48L2k+JyxcblxuICAgICAgICBmb250czogWycnLCAnQXJpYWwnLCAnVmVyZGFuYScsICdUaW1lcyBOZXcgUm9tYW4nXSxcblxuICAgICAgICBpbml0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBNZWRpdW1FZGl0b3IuZXh0ZW5zaW9ucy5mb3JtLnByb3RvdHlwZS5pbml0LmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgLy8gQ2FsbGVkIHdoZW4gdGhlIGJ1dHRvbiB0aGUgdG9vbGJhciBpcyBjbGlja2VkXG4gICAgICAgIC8vIE92ZXJyaWRlcyBCdXR0b25FeHRlbnNpb24uaGFuZGxlQ2xpY2tcbiAgICAgICAgaGFuZGxlQ2xpY2s6IGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuXG4gICAgICAgICAgICBpZiAoIXRoaXMuaXNEaXNwbGF5ZWQoKSkge1xuICAgICAgICAgICAgICAgIC8vIEdldCBGb250TmFtZSBvZiBjdXJyZW50IHNlbGVjdGlvbiAoY29udmVydCB0byBzdHJpbmcgc2luY2UgSUUgcmV0dXJucyB0aGlzIGFzIG51bWJlcilcbiAgICAgICAgICAgICAgICB2YXIgZm9udE5hbWUgPSB0aGlzLmRvY3VtZW50LnF1ZXJ5Q29tbWFuZFZhbHVlKCdmb250TmFtZScpICsgJyc7XG4gICAgICAgICAgICAgICAgdGhpcy5zaG93Rm9ybShmb250TmFtZSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfSxcblxuICAgICAgICAvLyBDYWxsZWQgYnkgbWVkaXVtLWVkaXRvciB0byBhcHBlbmQgZm9ybSB0byB0aGUgdG9vbGJhclxuICAgICAgICBnZXRGb3JtOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBpZiAoIXRoaXMuZm9ybSkge1xuICAgICAgICAgICAgICAgIHRoaXMuZm9ybSA9IHRoaXMuY3JlYXRlRm9ybSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZm9ybTtcbiAgICAgICAgfSxcblxuICAgICAgICAvLyBVc2VkIGJ5IG1lZGl1bS1lZGl0b3Igd2hlbiB0aGUgZGVmYXVsdCB0b29sYmFyIGlzIHRvIGJlIGRpc3BsYXllZFxuICAgICAgICBpc0Rpc3BsYXllZDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ2V0Rm9ybSgpLnN0eWxlLmRpc3BsYXkgPT09ICdibG9jayc7XG4gICAgICAgIH0sXG5cbiAgICAgICAgaGlkZUZvcm06IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHRoaXMuZ2V0Rm9ybSgpLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgICAgICAgICB0aGlzLmdldFNlbGVjdCgpLnZhbHVlID0gJyc7XG4gICAgICAgIH0sXG5cbiAgICAgICAgc2hvd0Zvcm06IGZ1bmN0aW9uIChmb250TmFtZSkge1xuICAgICAgICAgICAgdmFyIHNlbGVjdCA9IHRoaXMuZ2V0U2VsZWN0KCk7XG5cbiAgICAgICAgICAgIHRoaXMuYmFzZS5zYXZlU2VsZWN0aW9uKCk7XG4gICAgICAgICAgICB0aGlzLmhpZGVUb29sYmFyRGVmYXVsdEFjdGlvbnMoKTtcbiAgICAgICAgICAgIHRoaXMuZ2V0Rm9ybSgpLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xuICAgICAgICAgICAgdGhpcy5zZXRUb29sYmFyUG9zaXRpb24oKTtcblxuICAgICAgICAgICAgc2VsZWN0LnZhbHVlID0gZm9udE5hbWUgfHwgJyc7XG4gICAgICAgICAgICBzZWxlY3QuZm9jdXMoKTtcbiAgICAgICAgfSxcblxuICAgICAgICAvLyBDYWxsZWQgYnkgY29yZSB3aGVuIHRlYXJpbmcgZG93biBtZWRpdW0tZWRpdG9yIChkZXN0cm95KVxuICAgICAgICBkZXN0cm95OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBpZiAoIXRoaXMuZm9ybSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHRoaXMuZm9ybS5wYXJlbnROb2RlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5mb3JtLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQodGhpcy5mb3JtKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZGVsZXRlIHRoaXMuZm9ybTtcbiAgICAgICAgfSxcblxuICAgICAgICAvLyBjb3JlIG1ldGhvZHNcblxuICAgICAgICBkb0Zvcm1TYXZlOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB0aGlzLmJhc2UucmVzdG9yZVNlbGVjdGlvbigpO1xuICAgICAgICAgICAgdGhpcy5iYXNlLmNoZWNrU2VsZWN0aW9uKCk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgZG9Gb3JtQ2FuY2VsOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB0aGlzLmJhc2UucmVzdG9yZVNlbGVjdGlvbigpO1xuICAgICAgICAgICAgdGhpcy5jbGVhckZvbnROYW1lKCk7XG4gICAgICAgICAgICB0aGlzLmJhc2UuY2hlY2tTZWxlY3Rpb24oKTtcbiAgICAgICAgfSxcblxuICAgICAgICAvLyBmb3JtIGNyZWF0aW9uIGFuZCBldmVudCBoYW5kbGluZ1xuICAgICAgICBjcmVhdGVGb3JtOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgZG9jID0gdGhpcy5kb2N1bWVudCxcbiAgICAgICAgICAgICAgICBmb3JtID0gZG9jLmNyZWF0ZUVsZW1lbnQoJ2RpdicpLFxuICAgICAgICAgICAgICAgIHNlbGVjdCA9IGRvYy5jcmVhdGVFbGVtZW50KCdzZWxlY3QnKSxcbiAgICAgICAgICAgICAgICBjbG9zZSA9IGRvYy5jcmVhdGVFbGVtZW50KCdhJyksXG4gICAgICAgICAgICAgICAgc2F2ZSA9IGRvYy5jcmVhdGVFbGVtZW50KCdhJyksXG4gICAgICAgICAgICAgICAgb3B0aW9uO1xuXG4gICAgICAgICAgICAvLyBGb250IE5hbWUgRm9ybSAoZGl2KVxuICAgICAgICAgICAgZm9ybS5jbGFzc05hbWUgPSAnbWVkaXVtLWVkaXRvci10b29sYmFyLWZvcm0nO1xuICAgICAgICAgICAgZm9ybS5pZCA9ICdtZWRpdW0tZWRpdG9yLXRvb2xiYXItZm9ybS1mb250bmFtZS0nICsgdGhpcy5nZXRFZGl0b3JJZCgpO1xuXG4gICAgICAgICAgICAvLyBIYW5kbGUgY2xpY2tzIG9uIHRoZSBmb3JtIGl0c2VsZlxuICAgICAgICAgICAgdGhpcy5vbihmb3JtLCAnY2xpY2snLCB0aGlzLmhhbmRsZUZvcm1DbGljay5iaW5kKHRoaXMpKTtcblxuICAgICAgICAgICAgLy8gQWRkIGZvbnQgbmFtZXNcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpPHRoaXMuZm9udHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBvcHRpb24gPSBkb2MuY3JlYXRlRWxlbWVudCgnb3B0aW9uJyk7XG4gICAgICAgICAgICAgICAgb3B0aW9uLmlubmVySFRNTCA9IHRoaXMuZm9udHNbaV07XG4gICAgICAgICAgICAgICAgb3B0aW9uLnZhbHVlID0gdGhpcy5mb250c1tpXTtcbiAgICAgICAgICAgICAgICBzZWxlY3QuYXBwZW5kQ2hpbGQob3B0aW9uKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgc2VsZWN0LmNsYXNzTmFtZSA9ICdtZWRpdW0tZWRpdG9yLXRvb2xiYXItc2VsZWN0JztcbiAgICAgICAgICAgIGZvcm0uYXBwZW5kQ2hpbGQoc2VsZWN0KTtcblxuICAgICAgICAgICAgLy8gSGFuZGxlIHR5cGluZyBpbiB0aGUgdGV4dGJveFxuICAgICAgICAgICAgdGhpcy5vbihzZWxlY3QsICdjaGFuZ2UnLCB0aGlzLmhhbmRsZUZvbnRDaGFuZ2UuYmluZCh0aGlzKSk7XG5cbiAgICAgICAgICAgIC8vIEFkZCBzYXZlIGJ1dG9uXG4gICAgICAgICAgICBzYXZlLnNldEF0dHJpYnV0ZSgnaHJlZicsICcjJyk7XG4gICAgICAgICAgICBzYXZlLmNsYXNzTmFtZSA9ICdtZWRpdW0tZWRpdG9yLXRvb2Jhci1zYXZlJztcbiAgICAgICAgICAgIHNhdmUuaW5uZXJIVE1MID0gdGhpcy5nZXRFZGl0b3JPcHRpb24oJ2J1dHRvbkxhYmVscycpID09PSAnZm9udGF3ZXNvbWUnID9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJzxpIGNsYXNzPVwiZmEgZmEtY2hlY2tcIj48L2k+JyA6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICcmIzEwMDAzOyc7XG4gICAgICAgICAgICBmb3JtLmFwcGVuZENoaWxkKHNhdmUpO1xuXG4gICAgICAgICAgICAvLyBIYW5kbGUgc2F2ZSBidXR0b24gY2xpY2tzIChjYXB0dXJlKVxuICAgICAgICAgICAgdGhpcy5vbihzYXZlLCAnY2xpY2snLCB0aGlzLmhhbmRsZVNhdmVDbGljay5iaW5kKHRoaXMpLCB0cnVlKTtcblxuICAgICAgICAgICAgLy8gQWRkIGNsb3NlIGJ1dHRvblxuICAgICAgICAgICAgY2xvc2Uuc2V0QXR0cmlidXRlKCdocmVmJywgJyMnKTtcbiAgICAgICAgICAgIGNsb3NlLmNsYXNzTmFtZSA9ICdtZWRpdW0tZWRpdG9yLXRvb2Jhci1jbG9zZSc7XG4gICAgICAgICAgICBjbG9zZS5pbm5lckhUTUwgPSB0aGlzLmdldEVkaXRvck9wdGlvbignYnV0dG9uTGFiZWxzJykgPT09ICdmb250YXdlc29tZScgP1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJzxpIGNsYXNzPVwiZmEgZmEtdGltZXNcIj48L2k+JyA6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnJnRpbWVzOyc7XG4gICAgICAgICAgICBmb3JtLmFwcGVuZENoaWxkKGNsb3NlKTtcblxuICAgICAgICAgICAgLy8gSGFuZGxlIGNsb3NlIGJ1dHRvbiBjbGlja3NcbiAgICAgICAgICAgIHRoaXMub24oY2xvc2UsICdjbGljaycsIHRoaXMuaGFuZGxlQ2xvc2VDbGljay5iaW5kKHRoaXMpKTtcblxuICAgICAgICAgICAgcmV0dXJuIGZvcm07XG4gICAgICAgIH0sXG5cbiAgICAgICAgZ2V0U2VsZWN0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5nZXRGb3JtKCkucXVlcnlTZWxlY3Rvcignc2VsZWN0Lm1lZGl1bS1lZGl0b3ItdG9vbGJhci1zZWxlY3QnKTtcbiAgICAgICAgfSxcblxuICAgICAgICBjbGVhckZvbnROYW1lOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBNZWRpdW1FZGl0b3Iuc2VsZWN0aW9uLmdldFNlbGVjdGVkRWxlbWVudHModGhpcy5kb2N1bWVudCkuZm9yRWFjaChmdW5jdGlvbiAoZWwpIHtcbiAgICAgICAgICAgICAgICBpZiAoZWwubm9kZU5hbWUudG9Mb3dlckNhc2UoKSA9PT0gJ2ZvbnQnICYmIGVsLmhhc0F0dHJpYnV0ZSgnZmFjZScpKSB7XG4gICAgICAgICAgICAgICAgICAgIGVsLnJlbW92ZUF0dHJpYnV0ZSgnZmFjZScpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9LFxuXG4gICAgICAgIGhhbmRsZUZvbnRDaGFuZ2U6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBmb250ID0gdGhpcy5nZXRTZWxlY3QoKS52YWx1ZTtcbiAgICAgICAgICAgIGlmIChmb250ID09PSAnJykge1xuICAgICAgICAgICAgICAgIHRoaXMuY2xlYXJGb250TmFtZSgpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLmV4ZWNBY3Rpb24oJ2ZvbnROYW1lJywgeyB2YWx1ZTogZm9udCB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICBoYW5kbGVGb3JtQ2xpY2s6IGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICAgICAgLy8gbWFrZSBzdXJlIG5vdCB0byBoaWRlIGZvcm0gd2hlbiBjbGlja2luZyBpbnNpZGUgdGhlIGZvcm1cbiAgICAgICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICB9LFxuXG4gICAgICAgIGhhbmRsZVNhdmVDbGljazogZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgICAgICAvLyBDbGlja2luZyBTYXZlIC0+IGNyZWF0ZSB0aGUgZm9udCBzaXplXG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgdGhpcy5kb0Zvcm1TYXZlKCk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgaGFuZGxlQ2xvc2VDbGljazogZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgICAgICAvLyBDbGljayBDbG9zZSAtPiBjbG9zZSB0aGUgZm9ybVxuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIHRoaXMuZG9Gb3JtQ2FuY2VsKCk7XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIE1lZGl1bUVkaXRvci5leHRlbnNpb25zLmZvbnROYW1lID0gRm9udE5hbWVGb3JtO1xufSgpKTtcblxuKGZ1bmN0aW9uICgpIHtcbiAgICAndXNlIHN0cmljdCc7XG5cbiAgICB2YXIgRm9udFNpemVGb3JtID0gTWVkaXVtRWRpdG9yLmV4dGVuc2lvbnMuZm9ybS5leHRlbmQoe1xuXG4gICAgICAgIG5hbWU6ICdmb250c2l6ZScsXG4gICAgICAgIGFjdGlvbjogJ2ZvbnRTaXplJyxcbiAgICAgICAgYXJpYTogJ2luY3JlYXNlL2RlY3JlYXNlIGZvbnQgc2l6ZScsXG4gICAgICAgIGNvbnRlbnREZWZhdWx0OiAnJiN4QjE7JywgLy8gwrFcbiAgICAgICAgY29udGVudEZBOiAnPGkgY2xhc3M9XCJmYSBmYS10ZXh0LWhlaWdodFwiPjwvaT4nLFxuXG4gICAgICAgIGluaXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIE1lZGl1bUVkaXRvci5leHRlbnNpb25zLmZvcm0ucHJvdG90eXBlLmluaXQuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgICAgfSxcblxuICAgICAgICAvLyBDYWxsZWQgd2hlbiB0aGUgYnV0dG9uIHRoZSB0b29sYmFyIGlzIGNsaWNrZWRcbiAgICAgICAgLy8gT3ZlcnJpZGVzIEJ1dHRvbkV4dGVuc2lvbi5oYW5kbGVDbGlja1xuICAgICAgICBoYW5kbGVDbGljazogZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG5cbiAgICAgICAgICAgIGlmICghdGhpcy5pc0Rpc3BsYXllZCgpKSB7XG4gICAgICAgICAgICAgICAgLy8gR2V0IGZvbnRzaXplIG9mIGN1cnJlbnQgc2VsZWN0aW9uIChjb252ZXJ0IHRvIHN0cmluZyBzaW5jZSBJRSByZXR1cm5zIHRoaXMgYXMgbnVtYmVyKVxuICAgICAgICAgICAgICAgIHZhciBmb250U2l6ZSA9IHRoaXMuZG9jdW1lbnQucXVlcnlDb21tYW5kVmFsdWUoJ2ZvbnRTaXplJykgKyAnJztcbiAgICAgICAgICAgICAgICB0aGlzLnNob3dGb3JtKGZvbnRTaXplKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9LFxuXG4gICAgICAgIC8vIENhbGxlZCBieSBtZWRpdW0tZWRpdG9yIHRvIGFwcGVuZCBmb3JtIHRvIHRoZSB0b29sYmFyXG4gICAgICAgIGdldEZvcm06IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGlmICghdGhpcy5mb3JtKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5mb3JtID0gdGhpcy5jcmVhdGVGb3JtKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5mb3JtO1xuICAgICAgICB9LFxuXG4gICAgICAgIC8vIFVzZWQgYnkgbWVkaXVtLWVkaXRvciB3aGVuIHRoZSBkZWZhdWx0IHRvb2xiYXIgaXMgdG8gYmUgZGlzcGxheWVkXG4gICAgICAgIGlzRGlzcGxheWVkOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5nZXRGb3JtKCkuc3R5bGUuZGlzcGxheSA9PT0gJ2Jsb2NrJztcbiAgICAgICAgfSxcblxuICAgICAgICBoaWRlRm9ybTogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdGhpcy5nZXRGb3JtKCkuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICAgICAgICAgIHRoaXMuZ2V0SW5wdXQoKS52YWx1ZSA9ICcnO1xuICAgICAgICB9LFxuXG4gICAgICAgIHNob3dGb3JtOiBmdW5jdGlvbiAoZm9udFNpemUpIHtcbiAgICAgICAgICAgIHZhciBpbnB1dCA9IHRoaXMuZ2V0SW5wdXQoKTtcblxuICAgICAgICAgICAgdGhpcy5iYXNlLnNhdmVTZWxlY3Rpb24oKTtcbiAgICAgICAgICAgIHRoaXMuaGlkZVRvb2xiYXJEZWZhdWx0QWN0aW9ucygpO1xuICAgICAgICAgICAgdGhpcy5nZXRGb3JtKCkuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG4gICAgICAgICAgICB0aGlzLnNldFRvb2xiYXJQb3NpdGlvbigpO1xuXG4gICAgICAgICAgICBpbnB1dC52YWx1ZSA9IGZvbnRTaXplIHx8ICcnO1xuICAgICAgICAgICAgaW5wdXQuZm9jdXMoKTtcbiAgICAgICAgfSxcblxuICAgICAgICAvLyBDYWxsZWQgYnkgY29yZSB3aGVuIHRlYXJpbmcgZG93biBtZWRpdW0tZWRpdG9yIChkZXN0cm95KVxuICAgICAgICBkZXN0cm95OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBpZiAoIXRoaXMuZm9ybSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHRoaXMuZm9ybS5wYXJlbnROb2RlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5mb3JtLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQodGhpcy5mb3JtKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZGVsZXRlIHRoaXMuZm9ybTtcbiAgICAgICAgfSxcblxuICAgICAgICAvLyBjb3JlIG1ldGhvZHNcblxuICAgICAgICBkb0Zvcm1TYXZlOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB0aGlzLmJhc2UucmVzdG9yZVNlbGVjdGlvbigpO1xuICAgICAgICAgICAgdGhpcy5iYXNlLmNoZWNrU2VsZWN0aW9uKCk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgZG9Gb3JtQ2FuY2VsOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB0aGlzLmJhc2UucmVzdG9yZVNlbGVjdGlvbigpO1xuICAgICAgICAgICAgdGhpcy5jbGVhckZvbnRTaXplKCk7XG4gICAgICAgICAgICB0aGlzLmJhc2UuY2hlY2tTZWxlY3Rpb24oKTtcbiAgICAgICAgfSxcblxuICAgICAgICAvLyBmb3JtIGNyZWF0aW9uIGFuZCBldmVudCBoYW5kbGluZ1xuICAgICAgICBjcmVhdGVGb3JtOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgZG9jID0gdGhpcy5kb2N1bWVudCxcbiAgICAgICAgICAgICAgICBmb3JtID0gZG9jLmNyZWF0ZUVsZW1lbnQoJ2RpdicpLFxuICAgICAgICAgICAgICAgIGlucHV0ID0gZG9jLmNyZWF0ZUVsZW1lbnQoJ2lucHV0JyksXG4gICAgICAgICAgICAgICAgY2xvc2UgPSBkb2MuY3JlYXRlRWxlbWVudCgnYScpLFxuICAgICAgICAgICAgICAgIHNhdmUgPSBkb2MuY3JlYXRlRWxlbWVudCgnYScpO1xuXG4gICAgICAgICAgICAvLyBGb250IFNpemUgRm9ybSAoZGl2KVxuICAgICAgICAgICAgZm9ybS5jbGFzc05hbWUgPSAnbWVkaXVtLWVkaXRvci10b29sYmFyLWZvcm0nO1xuICAgICAgICAgICAgZm9ybS5pZCA9ICdtZWRpdW0tZWRpdG9yLXRvb2xiYXItZm9ybS1mb250c2l6ZS0nICsgdGhpcy5nZXRFZGl0b3JJZCgpO1xuXG4gICAgICAgICAgICAvLyBIYW5kbGUgY2xpY2tzIG9uIHRoZSBmb3JtIGl0c2VsZlxuICAgICAgICAgICAgdGhpcy5vbihmb3JtLCAnY2xpY2snLCB0aGlzLmhhbmRsZUZvcm1DbGljay5iaW5kKHRoaXMpKTtcblxuICAgICAgICAgICAgLy8gQWRkIGZvbnQgc2l6ZSBzbGlkZXJcbiAgICAgICAgICAgIGlucHV0LnNldEF0dHJpYnV0ZSgndHlwZScsICdyYW5nZScpO1xuICAgICAgICAgICAgaW5wdXQuc2V0QXR0cmlidXRlKCdtaW4nLCAnMScpO1xuICAgICAgICAgICAgaW5wdXQuc2V0QXR0cmlidXRlKCdtYXgnLCAnNycpO1xuICAgICAgICAgICAgaW5wdXQuY2xhc3NOYW1lID0gJ21lZGl1bS1lZGl0b3ItdG9vbGJhci1pbnB1dCc7XG4gICAgICAgICAgICBmb3JtLmFwcGVuZENoaWxkKGlucHV0KTtcblxuICAgICAgICAgICAgLy8gSGFuZGxlIHR5cGluZyBpbiB0aGUgdGV4dGJveFxuICAgICAgICAgICAgdGhpcy5vbihpbnB1dCwgJ2NoYW5nZScsIHRoaXMuaGFuZGxlU2xpZGVyQ2hhbmdlLmJpbmQodGhpcykpO1xuXG4gICAgICAgICAgICAvLyBBZGQgc2F2ZSBidXRvblxuICAgICAgICAgICAgc2F2ZS5zZXRBdHRyaWJ1dGUoJ2hyZWYnLCAnIycpO1xuICAgICAgICAgICAgc2F2ZS5jbGFzc05hbWUgPSAnbWVkaXVtLWVkaXRvci10b29iYXItc2F2ZSc7XG4gICAgICAgICAgICBzYXZlLmlubmVySFRNTCA9IHRoaXMuZ2V0RWRpdG9yT3B0aW9uKCdidXR0b25MYWJlbHMnKSA9PT0gJ2ZvbnRhd2Vzb21lJyA/XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICc8aSBjbGFzcz1cImZhIGZhLWNoZWNrXCI+PC9pPicgOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnJiMxMDAwMzsnO1xuICAgICAgICAgICAgZm9ybS5hcHBlbmRDaGlsZChzYXZlKTtcblxuICAgICAgICAgICAgLy8gSGFuZGxlIHNhdmUgYnV0dG9uIGNsaWNrcyAoY2FwdHVyZSlcbiAgICAgICAgICAgIHRoaXMub24oc2F2ZSwgJ2NsaWNrJywgdGhpcy5oYW5kbGVTYXZlQ2xpY2suYmluZCh0aGlzKSwgdHJ1ZSk7XG5cbiAgICAgICAgICAgIC8vIEFkZCBjbG9zZSBidXR0b25cbiAgICAgICAgICAgIGNsb3NlLnNldEF0dHJpYnV0ZSgnaHJlZicsICcjJyk7XG4gICAgICAgICAgICBjbG9zZS5jbGFzc05hbWUgPSAnbWVkaXVtLWVkaXRvci10b29iYXItY2xvc2UnO1xuICAgICAgICAgICAgY2xvc2UuaW5uZXJIVE1MID0gdGhpcy5nZXRFZGl0b3JPcHRpb24oJ2J1dHRvbkxhYmVscycpID09PSAnZm9udGF3ZXNvbWUnID9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICc8aSBjbGFzcz1cImZhIGZhLXRpbWVzXCI+PC9pPicgOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJyZ0aW1lczsnO1xuICAgICAgICAgICAgZm9ybS5hcHBlbmRDaGlsZChjbG9zZSk7XG5cbiAgICAgICAgICAgIC8vIEhhbmRsZSBjbG9zZSBidXR0b24gY2xpY2tzXG4gICAgICAgICAgICB0aGlzLm9uKGNsb3NlLCAnY2xpY2snLCB0aGlzLmhhbmRsZUNsb3NlQ2xpY2suYmluZCh0aGlzKSk7XG5cbiAgICAgICAgICAgIHJldHVybiBmb3JtO1xuICAgICAgICB9LFxuXG4gICAgICAgIGdldElucHV0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5nZXRGb3JtKCkucXVlcnlTZWxlY3RvcignaW5wdXQubWVkaXVtLWVkaXRvci10b29sYmFyLWlucHV0Jyk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgY2xlYXJGb250U2l6ZTogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgTWVkaXVtRWRpdG9yLnNlbGVjdGlvbi5nZXRTZWxlY3RlZEVsZW1lbnRzKHRoaXMuZG9jdW1lbnQpLmZvckVhY2goZnVuY3Rpb24gKGVsKSB7XG4gICAgICAgICAgICAgICAgaWYgKGVsLm5vZGVOYW1lLnRvTG93ZXJDYXNlKCkgPT09ICdmb250JyAmJiBlbC5oYXNBdHRyaWJ1dGUoJ3NpemUnKSkge1xuICAgICAgICAgICAgICAgICAgICBlbC5yZW1vdmVBdHRyaWJ1dGUoJ3NpemUnKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSxcblxuICAgICAgICBoYW5kbGVTbGlkZXJDaGFuZ2U6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBzaXplID0gdGhpcy5nZXRJbnB1dCgpLnZhbHVlO1xuICAgICAgICAgICAgaWYgKHNpemUgPT09ICc0Jykge1xuICAgICAgICAgICAgICAgIHRoaXMuY2xlYXJGb250U2l6ZSgpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLmV4ZWNBY3Rpb24oJ2ZvbnRTaXplJywgeyB2YWx1ZTogc2l6ZSB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICBoYW5kbGVGb3JtQ2xpY2s6IGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICAgICAgLy8gbWFrZSBzdXJlIG5vdCB0byBoaWRlIGZvcm0gd2hlbiBjbGlja2luZyBpbnNpZGUgdGhlIGZvcm1cbiAgICAgICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICB9LFxuXG4gICAgICAgIGhhbmRsZVNhdmVDbGljazogZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgICAgICAvLyBDbGlja2luZyBTYXZlIC0+IGNyZWF0ZSB0aGUgZm9udCBzaXplXG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgdGhpcy5kb0Zvcm1TYXZlKCk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgaGFuZGxlQ2xvc2VDbGljazogZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgICAgICAvLyBDbGljayBDbG9zZSAtPiBjbG9zZSB0aGUgZm9ybVxuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIHRoaXMuZG9Gb3JtQ2FuY2VsKCk7XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIE1lZGl1bUVkaXRvci5leHRlbnNpb25zLmZvbnRTaXplID0gRm9udFNpemVGb3JtO1xufSgpKTtcbihmdW5jdGlvbiAoKSB7XG4gICAgJ3VzZSBzdHJpY3QnO1xuXG4gICAgLyogSGVscGVycyBhbmQgaW50ZXJuYWwgdmFyaWFibGVzIHRoYXQgZG9uJ3QgbmVlZCB0byBiZSBtZW1iZXJzIG9mIGFjdHVhbCBwYXN0ZSBoYW5kbGVyICovXG5cbiAgICB2YXIgcGFzdGVCaW5EZWZhdWx0Q29udGVudCA9ICclTUVfUEFTVEVCSU4lJyxcbiAgICAgICAgbGFzdFJhbmdlID0gbnVsbCxcbiAgICAgICAga2V5Ym9hcmRQYXN0ZUVkaXRhYmxlID0gbnVsbCxcbiAgICAgICAgc3RvcFByb3AgPSBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICB9O1xuXG4gICAgLypqc2xpbnQgcmVnZXhwOiB0cnVlKi9cbiAgICAvKlxuICAgICAgICBqc2xpbnQgZG9lcyBub3QgYWxsb3cgY2hhcmFjdGVyIG5lZ2F0aW9uLCBiZWNhdXNlIHRoZSBuZWdhdGlvblxuICAgICAgICB3aWxsIG5vdCBtYXRjaCBhbnkgdW5pY29kZSBjaGFyYWN0ZXJzLiBJbiB0aGUgcmVnZXhlcyBpbiB0aGlzXG4gICAgICAgIGJsb2NrLCBuZWdhdGlvbiBpcyB1c2VkIHNwZWNpZmljYWxseSB0byBtYXRjaCB0aGUgZW5kIG9mIGFuIGh0bWxcbiAgICAgICAgdGFnLCBhbmQgaW4gZmFjdCB1bmljb2RlIGNoYXJhY3RlcnMgKnNob3VsZCogYmUgYWxsb3dlZC5cbiAgICAqL1xuICAgIGZ1bmN0aW9uIGNyZWF0ZVJlcGxhY2VtZW50cygpIHtcbiAgICAgICAgcmV0dXJuIFtcbiAgICAgICAgICAgIC8vIFJlbW92ZSBhbnl0aGluZyBidXQgdGhlIGNvbnRlbnRzIHdpdGhpbiB0aGUgQk9EWSBlbGVtZW50XG4gICAgICAgICAgICBbbmV3IFJlZ0V4cCgvXltcXHNcXFNdKjxib2R5W14+XSo+XFxzKnxcXHMqPFxcL2JvZHlbXj5dKj5bXFxzXFxTXSokL2cpLCAnJ10sXG5cbiAgICAgICAgICAgIC8vIGNsZWFudXAgY29tbWVudHMgYWRkZWQgYnkgQ2hyb21lIHdoZW4gcGFzdGluZyBodG1sXG4gICAgICAgICAgICBbbmV3IFJlZ0V4cCgvPCEtLVN0YXJ0RnJhZ21lbnQtLT58PCEtLUVuZEZyYWdtZW50LS0+L2cpLCAnJ10sXG5cbiAgICAgICAgICAgIC8vIFRyYWlsaW5nIEJSIGVsZW1lbnRzXG4gICAgICAgICAgICBbbmV3IFJlZ0V4cCgvPGJyPiQvaSksICcnXSxcblxuICAgICAgICAgICAgLy8gcmVwbGFjZSB0d28gYm9ndXMgdGFncyB0aGF0IGJlZ2luIHBhc3RlcyBmcm9tIGdvb2dsZSBkb2NzXG4gICAgICAgICAgICBbbmV3IFJlZ0V4cCgvPFtePl0qZG9jcy1pbnRlcm5hbC1ndWlkW14+XSo+L2dpKSwgJyddLFxuICAgICAgICAgICAgW25ldyBSZWdFeHAoLzxcXC9iPig8YnJbXj5dKj4pPyQvZ2kpLCAnJ10sXG5cbiAgICAgICAgICAgICAvLyB1bi1odG1sIHNwYWNlcyBhbmQgbmV3bGluZXMgaW5zZXJ0ZWQgYnkgT1MgWFxuICAgICAgICAgICAgW25ldyBSZWdFeHAoLzxzcGFuIGNsYXNzPVwiQXBwbGUtY29udmVydGVkLXNwYWNlXCI+XFxzKzxcXC9zcGFuPi9nKSwgJyAnXSxcbiAgICAgICAgICAgIFtuZXcgUmVnRXhwKC88YnIgY2xhc3M9XCJBcHBsZS1pbnRlcmNoYW5nZS1uZXdsaW5lXCI+L2cpLCAnPGJyPiddLFxuXG4gICAgICAgICAgICAvLyByZXBsYWNlIGdvb2dsZSBkb2NzIGl0YWxpY3MrYm9sZCB3aXRoIGEgc3BhbiB0byBiZSByZXBsYWNlZCBvbmNlIHRoZSBodG1sIGlzIGluc2VydGVkXG4gICAgICAgICAgICBbbmV3IFJlZ0V4cCgvPHNwYW5bXj5dKihmb250LXN0eWxlOml0YWxpYztmb250LXdlaWdodDooYm9sZHw3MDApfGZvbnQtd2VpZ2h0Oihib2xkfDcwMCk7Zm9udC1zdHlsZTppdGFsaWMpW14+XSo+L2dpKSwgJzxzcGFuIGNsYXNzPVwicmVwbGFjZS13aXRoIGl0YWxpYyBib2xkXCI+J10sXG5cbiAgICAgICAgICAgIC8vIHJlcGxhY2UgZ29vZ2xlIGRvY3MgaXRhbGljcyB3aXRoIGEgc3BhbiB0byBiZSByZXBsYWNlZCBvbmNlIHRoZSBodG1sIGlzIGluc2VydGVkXG4gICAgICAgICAgICBbbmV3IFJlZ0V4cCgvPHNwYW5bXj5dKmZvbnQtc3R5bGU6aXRhbGljW14+XSo+L2dpKSwgJzxzcGFuIGNsYXNzPVwicmVwbGFjZS13aXRoIGl0YWxpY1wiPiddLFxuXG4gICAgICAgICAgICAvL1tyZXBsYWNlIGdvb2dsZSBkb2NzIGJvbGRzIHdpdGggYSBzcGFuIHRvIGJlIHJlcGxhY2VkIG9uY2UgdGhlIGh0bWwgaXMgaW5zZXJ0ZWRcbiAgICAgICAgICAgIFtuZXcgUmVnRXhwKC88c3BhbltePl0qZm9udC13ZWlnaHQ6KGJvbGR8NzAwKVtePl0qPi9naSksICc8c3BhbiBjbGFzcz1cInJlcGxhY2Utd2l0aCBib2xkXCI+J10sXG5cbiAgICAgICAgICAgICAvLyByZXBsYWNlIG1hbnVhbGx5IGVudGVyZWQgYi9pL2EgdGFncyB3aXRoIHJlYWwgb25lc1xuICAgICAgICAgICAgW25ldyBSZWdFeHAoLyZsdDsoXFwvPykoaXxifGEpJmd0Oy9naSksICc8JDEkMj4nXSxcblxuICAgICAgICAgICAgIC8vIHJlcGxhY2UgbWFudWFsbHkgYSB0YWdzIHdpdGggcmVhbCBvbmVzLCBjb252ZXJ0aW5nIHNtYXJ0LXF1b3RlcyBmcm9tIGdvb2dsZSBkb2NzXG4gICAgICAgICAgICBbbmV3IFJlZ0V4cCgvJmx0O2EoPzooPyFocmVmKS4pK2hyZWY9KD86JnF1b3Q7fCZyZHF1bzt8JmxkcXVvO3xcInzigJx84oCdKSgoKD8hJnF1b3Q7fCZyZHF1bzt8JmxkcXVvO3xcInzigJx84oCdKS4pKikoPzomcXVvdDt8JnJkcXVvO3wmbGRxdW87fFwifOKAnHzigJ0pKD86KD8hJmd0OykuKSomZ3Q7L2dpKSwgJzxhIGhyZWY9XCIkMVwiPiddLFxuXG4gICAgICAgICAgICAvLyBOZXdsaW5lcyBiZXR3ZWVuIHBhcmFncmFwaHMgaW4gaHRtbCBoYXZlIG5vIHN5bnRhY3RpYyB2YWx1ZSxcbiAgICAgICAgICAgIC8vIGJ1dCB0aGVuIGhhdmUgYSB0ZW5kZW5jeSB0byBhY2NpZGVudGFsbHkgYmVjb21lIGFkZGl0aW9uYWwgcGFyYWdyYXBocyBkb3duIHRoZSBsaW5lXG4gICAgICAgICAgICBbbmV3IFJlZ0V4cCgvPFxcL3A+XFxuKy9naSksICc8L3A+J10sXG4gICAgICAgICAgICBbbmV3IFJlZ0V4cCgvXFxuKzxwL2dpKSwgJzxwJ10sXG5cbiAgICAgICAgICAgIC8vIE1pY3Jvc29mdCBXb3JkIG1ha2VzIHRoZXNlIG9kZCB0YWdzLCBsaWtlIDxvOnA+PC9vOnA+XG4gICAgICAgICAgICBbbmV3IFJlZ0V4cCgvPFxcLz9vOlthLXpdKj4vZ2kpLCAnJ10sXG5cbiAgICAgICAgICAgIC8vIE1pY3Jvc29mdCBXb3JkIGFkZHMgc29tZSBzcGVjaWFsIGVsZW1lbnRzIGFyb3VuZCBsaXN0IGl0ZW1zXG4gICAgICAgICAgICBbbmV3IFJlZ0V4cCgvPCFcXFtpZiAhc3VwcG9ydExpc3RzXFxdPigoKD8hPCEpLikqKTwhXFxbZW5kaWZdXFw+L2dpKSwgJyQxJ11cbiAgICAgICAgXTtcbiAgICB9XG4gICAgLypqc2xpbnQgcmVnZXhwOiBmYWxzZSovXG5cbiAgICAvKipcbiAgICAgKiBHZXRzIHZhcmlvdXMgY29udGVudCB0eXBlcyBvdXQgb2YgdGhlIENsaXBib2FyZCBBUEkuIEl0IHdpbGwgYWxzbyBnZXQgdGhlXG4gICAgICogcGxhaW4gdGV4dCB1c2luZyBvbGRlciBJRSBhbmQgV2ViS2l0IEFQSS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7ZXZlbnR9IGV2ZW50IEV2ZW50IGZpcmVkIG9uIHBhc3RlLlxuICAgICAqIEBwYXJhbSB7d2lufSByZWZlcmVuY2UgdG8gd2luZG93XG4gICAgICogQHBhcmFtIHtkb2N9IHJlZmVyZW5jZSB0byBkb2N1bWVudFxuICAgICAqIEByZXR1cm4ge09iamVjdH0gT2JqZWN0IHdpdGggbWltZSB0eXBlcyBhbmQgZGF0YSBmb3IgdGhvc2UgbWltZSB0eXBlcy5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBnZXRDbGlwYm9hcmRDb250ZW50KGV2ZW50LCB3aW4sIGRvYykge1xuICAgICAgICB2YXIgZGF0YVRyYW5zZmVyID0gZXZlbnQuY2xpcGJvYXJkRGF0YSB8fCB3aW4uY2xpcGJvYXJkRGF0YSB8fCBkb2MuZGF0YVRyYW5zZmVyLFxuICAgICAgICAgICAgZGF0YSA9IHt9O1xuXG4gICAgICAgIGlmICghZGF0YVRyYW5zZmVyKSB7XG4gICAgICAgICAgICByZXR1cm4gZGF0YTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFVzZSBvbGQgV2ViS2l0L0lFIEFQSVxuICAgICAgICBpZiAoZGF0YVRyYW5zZmVyLmdldERhdGEpIHtcbiAgICAgICAgICAgIHZhciBsZWdhY3lUZXh0ID0gZGF0YVRyYW5zZmVyLmdldERhdGEoJ1RleHQnKTtcbiAgICAgICAgICAgIGlmIChsZWdhY3lUZXh0ICYmIGxlZ2FjeVRleHQubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgIGRhdGFbJ3RleHQvcGxhaW4nXSA9IGxlZ2FjeVRleHQ7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZGF0YVRyYW5zZmVyLnR5cGVzKSB7XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGRhdGFUcmFuc2Zlci50eXBlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIHZhciBjb250ZW50VHlwZSA9IGRhdGFUcmFuc2Zlci50eXBlc1tpXTtcbiAgICAgICAgICAgICAgICBkYXRhW2NvbnRlbnRUeXBlXSA9IGRhdGFUcmFuc2Zlci5nZXREYXRhKGNvbnRlbnRUeXBlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBkYXRhO1xuICAgIH1cblxuICAgIHZhciBQYXN0ZUhhbmRsZXIgPSBNZWRpdW1FZGl0b3IuRXh0ZW5zaW9uLmV4dGVuZCh7XG4gICAgICAgIC8qIFBhc3RlIE9wdGlvbnMgKi9cblxuICAgICAgICAvKiBmb3JjZVBsYWluVGV4dDogW2Jvb2xlYW5dXG4gICAgICAgICAqIEZvcmNlcyBwYXN0aW5nIGFzIHBsYWluIHRleHQuXG4gICAgICAgICAqL1xuICAgICAgICBmb3JjZVBsYWluVGV4dDogdHJ1ZSxcblxuICAgICAgICAvKiBjbGVhblBhc3RlZEhUTUw6IFtib29sZWFuXVxuICAgICAgICAgKiBjbGVhbnMgcGFzdGVkIGNvbnRlbnQgZnJvbSBkaWZmZXJlbnQgc291cmNlcywgbGlrZSBnb29nbGUgZG9jcyBldGMuXG4gICAgICAgICAqL1xuICAgICAgICBjbGVhblBhc3RlZEhUTUw6IGZhbHNlLFxuXG4gICAgICAgIC8qIHByZUNsZWFuUmVwbGFjZW1lbnRzOiBbQXJyYXldXG4gICAgICAgICAqIGN1c3RvbSBwYWlycyAoMiBlbGVtZW50IGFycmF5cykgb2YgUmVnRXhwIGFuZCByZXBsYWNlbWVudCB0ZXh0IHRvIHVzZSBkdXJpbmcgcGFzdCB3aGVuXG4gICAgICAgICAqIF9fZm9yY2VQbGFpblRleHRfXyBvciBfX2NsZWFuUGFzdGVkSFRNTF9fIGFyZSBgdHJ1ZWAgT1Igd2hlbiBjYWxsaW5nIGBjbGVhblBhc3RlKHRleHQpYCBoZWxwZXIgbWV0aG9kLlxuICAgICAgICAgKiBUaGVzZSByZXBsYWNlbWVudHMgYXJlIGV4ZWN1dGVkIGJlZm9yZSBhbnkgbWVkaXVtIGVkaXRvciBkZWZpbmVkIHJlcGxhY2VtZW50cy5cbiAgICAgICAgICovXG4gICAgICAgIHByZUNsZWFuUmVwbGFjZW1lbnRzOiBbXSxcblxuICAgICAgICAvKiBjbGVhblJlcGxhY2VtZW50czogW0FycmF5XVxuICAgICAgICAgKiBjdXN0b20gcGFpcnMgKDIgZWxlbWVudCBhcnJheXMpIG9mIFJlZ0V4cCBhbmQgcmVwbGFjZW1lbnQgdGV4dCB0byB1c2UgZHVyaW5nIHBhc3RlIHdoZW5cbiAgICAgICAgICogX19mb3JjZVBsYWluVGV4dF9fIG9yIF9fY2xlYW5QYXN0ZWRIVE1MX18gYXJlIGB0cnVlYCBPUiB3aGVuIGNhbGxpbmcgYGNsZWFuUGFzdGUodGV4dClgIGhlbHBlciBtZXRob2QuXG4gICAgICAgICAqIFRoZXNlIHJlcGxhY2VtZW50cyBhcmUgZXhlY3V0ZWQgYWZ0ZXIgYW55IG1lZGl1bSBlZGl0b3IgZGVmaW5lZCByZXBsYWNlbWVudHMuXG4gICAgICAgICAqL1xuICAgICAgICBjbGVhblJlcGxhY2VtZW50czogW10sXG5cbiAgICAgICAgLyogY2xlYW5BdHRyczo6IFtBcnJheV1cbiAgICAgICAgICogbGlzdCBvZiBlbGVtZW50IGF0dHJpYnV0ZXMgdG8gcmVtb3ZlIGR1cmluZyBwYXN0ZSB3aGVuIF9fY2xlYW5QYXN0ZWRIVE1MX18gaXMgYHRydWVgIG9yIHdoZW5cbiAgICAgICAgICogY2FsbGluZyBgY2xlYW5QYXN0ZSh0ZXh0KWAgb3IgYHBhc3RlSFRNTChodG1sLCBvcHRpb25zKWAgaGVscGVyIG1ldGhvZHMuXG4gICAgICAgICAqL1xuICAgICAgICBjbGVhbkF0dHJzOiBbJ2NsYXNzJywgJ3N0eWxlJywgJ2RpciddLFxuXG4gICAgICAgIC8qIGNsZWFuVGFnczogW0FycmF5XVxuICAgICAgICAgKiBsaXN0IG9mIGVsZW1lbnQgdGFnIG5hbWVzIHRvIHJlbW92ZSBkdXJpbmcgcGFzdGUgd2hlbiBfX2NsZWFuUGFzdGVkSFRNTF9fIGlzIGB0cnVlYCBvciB3aGVuXG4gICAgICAgICAqIGNhbGxpbmcgYGNsZWFuUGFzdGUodGV4dClgIG9yIGBwYXN0ZUhUTUwoaHRtbCwgb3B0aW9ucylgIGhlbHBlciBtZXRob2RzLlxuICAgICAgICAgKi9cbiAgICAgICAgY2xlYW5UYWdzOiBbJ21ldGEnXSxcblxuICAgICAgICBpbml0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBNZWRpdW1FZGl0b3IuRXh0ZW5zaW9uLnByb3RvdHlwZS5pbml0LmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG5cbiAgICAgICAgICAgIGlmICh0aGlzLmZvcmNlUGxhaW5UZXh0IHx8IHRoaXMuY2xlYW5QYXN0ZWRIVE1MKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zdWJzY3JpYmUoJ2VkaXRhYmxlS2V5ZG93bicsIHRoaXMuaGFuZGxlS2V5ZG93bi5iaW5kKHRoaXMpKTtcbiAgICAgICAgICAgICAgICAvLyBXZSBuZWVkIGFjY2VzcyB0byB0aGUgZnVsbCBldmVudCBkYXRhIGluIHBhc3RlXG4gICAgICAgICAgICAgICAgLy8gc28gd2UgY2FuJ3QgdXNlIHRoZSBlZGl0YWJsZVBhc3RlIGV2ZW50IGhlcmVcbiAgICAgICAgICAgICAgICB0aGlzLmdldEVkaXRvckVsZW1lbnRzKCkuZm9yRWFjaChmdW5jdGlvbiAoZWxlbWVudCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm9uKGVsZW1lbnQsICdwYXN0ZScsIHRoaXMuaGFuZGxlUGFzdGUuYmluZCh0aGlzKSk7XG4gICAgICAgICAgICAgICAgfSwgdGhpcyk7XG4gICAgICAgICAgICAgICAgdGhpcy5zdWJzY3JpYmUoJ2FkZEVsZW1lbnQnLCB0aGlzLmhhbmRsZUFkZEVsZW1lbnQuYmluZCh0aGlzKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgaGFuZGxlQWRkRWxlbWVudDogZnVuY3Rpb24gKGV2ZW50LCBlZGl0YWJsZSkge1xuICAgICAgICAgICAgdGhpcy5vbihlZGl0YWJsZSwgJ3Bhc3RlJywgdGhpcy5oYW5kbGVQYXN0ZS5iaW5kKHRoaXMpKTtcbiAgICAgICAgfSxcblxuICAgICAgICBkZXN0cm95OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAvLyBNYWtlIHN1cmUgcGFzdGViaW4gaXMgZGVzdHJveWVkIGluIGNhc2UgaXQncyBzdGlsbCBhcm91bmQgZm9yIHNvbWUgcmVhc29uXG4gICAgICAgICAgICBpZiAodGhpcy5mb3JjZVBsYWluVGV4dCB8fCB0aGlzLmNsZWFuUGFzdGVkSFRNTCkge1xuICAgICAgICAgICAgICAgIHRoaXMucmVtb3ZlUGFzdGVCaW4oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICBoYW5kbGVQYXN0ZTogZnVuY3Rpb24gKGV2ZW50LCBlZGl0YWJsZSkge1xuICAgICAgICAgICAgaWYgKGV2ZW50LmRlZmF1bHRQcmV2ZW50ZWQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHZhciBjbGlwYm9hcmRDb250ZW50ID0gZ2V0Q2xpcGJvYXJkQ29udGVudChldmVudCwgdGhpcy53aW5kb3csIHRoaXMuZG9jdW1lbnQpLFxuICAgICAgICAgICAgICAgIHBhc3RlZEhUTUwgPSBjbGlwYm9hcmRDb250ZW50Wyd0ZXh0L2h0bWwnXSxcbiAgICAgICAgICAgICAgICBwYXN0ZWRQbGFpbiA9IGNsaXBib2FyZENvbnRlbnRbJ3RleHQvcGxhaW4nXTtcblxuICAgICAgICAgICAgaWYgKHRoaXMud2luZG93LmNsaXBib2FyZERhdGEgJiYgZXZlbnQuY2xpcGJvYXJkRGF0YSA9PT0gdW5kZWZpbmVkICYmICFwYXN0ZWRIVE1MKSB7XG4gICAgICAgICAgICAgICAgLy8gSWYgd2luZG93LmNsaXBib2FyZERhdGEgZXhpc3RzLCBidXQgZXZlbnQuY2xpcGJvYXJkRGF0YSBkb2Vzbid0IGV4aXN0LFxuICAgICAgICAgICAgICAgIC8vIHdlJ3JlIHByb2JhYmx5IGluIElFLiBJRSBvbmx5IGhhcyB0d28gcG9zc2liaWxpdGllcyBmb3IgY2xpcGJvYXJkXG4gICAgICAgICAgICAgICAgLy8gZGF0YSBmb3JtYXQ6ICdUZXh0JyBhbmQgJ1VSTCcuXG4gICAgICAgICAgICAgICAgLy9cbiAgICAgICAgICAgICAgICAvLyBGb3IgSUUsIHdlJ2xsIGZhbGxiYWNrIHRvICdUZXh0JyBmb3IgdGV4dC9odG1sXG4gICAgICAgICAgICAgICAgcGFzdGVkSFRNTCA9IHBhc3RlZFBsYWluO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAocGFzdGVkSFRNTCB8fCBwYXN0ZWRQbGFpbikge1xuICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgICAgICAgICB0aGlzLmRvUGFzdGUocGFzdGVkSFRNTCwgcGFzdGVkUGxhaW4sIGVkaXRhYmxlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICBkb1Bhc3RlOiBmdW5jdGlvbiAocGFzdGVkSFRNTCwgcGFzdGVkUGxhaW4sIGVkaXRhYmxlKSB7XG4gICAgICAgICAgICB2YXIgcGFyYWdyYXBocyxcbiAgICAgICAgICAgICAgICBodG1sID0gJycsXG4gICAgICAgICAgICAgICAgcDtcblxuICAgICAgICAgICAgaWYgKHRoaXMuY2xlYW5QYXN0ZWRIVE1MICYmIHBhc3RlZEhUTUwpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5jbGVhblBhc3RlKHBhc3RlZEhUTUwpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoISh0aGlzLmdldEVkaXRvck9wdGlvbignZGlzYWJsZVJldHVybicpIHx8IChlZGl0YWJsZSAmJiBlZGl0YWJsZS5nZXRBdHRyaWJ1dGUoJ2RhdGEtZGlzYWJsZS1yZXR1cm4nKSkpKSB7XG4gICAgICAgICAgICAgICAgcGFyYWdyYXBocyA9IHBhc3RlZFBsYWluLnNwbGl0KC9bXFxyXFxuXSsvZyk7XG4gICAgICAgICAgICAgICAgLy8gSWYgdGhlcmUgYXJlIG5vIFxcclxcbiBpbiBkYXRhLCBkb24ndCB3cmFwIGluIDxwPlxuICAgICAgICAgICAgICAgIGlmIChwYXJhZ3JhcGhzLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgZm9yIChwID0gMDsgcCA8IHBhcmFncmFwaHMubGVuZ3RoOyBwICs9IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChwYXJhZ3JhcGhzW3BdICE9PSAnJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGh0bWwgKz0gJzxwPicgKyBNZWRpdW1FZGl0b3IudXRpbC5odG1sRW50aXRpZXMocGFyYWdyYXBoc1twXSkgKyAnPC9wPic7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBodG1sID0gTWVkaXVtRWRpdG9yLnV0aWwuaHRtbEVudGl0aWVzKHBhcmFncmFwaHNbMF0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgaHRtbCA9IE1lZGl1bUVkaXRvci51dGlsLmh0bWxFbnRpdGllcyhwYXN0ZWRQbGFpbik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBNZWRpdW1FZGl0b3IudXRpbC5pbnNlcnRIVE1MQ29tbWFuZCh0aGlzLmRvY3VtZW50LCBodG1sKTtcbiAgICAgICAgfSxcblxuICAgICAgICBoYW5kbGVQYXN0ZUJpblBhc3RlOiBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgICAgIGlmIChldmVudC5kZWZhdWx0UHJldmVudGVkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5yZW1vdmVQYXN0ZUJpbigpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdmFyIGNsaXBib2FyZENvbnRlbnQgPSBnZXRDbGlwYm9hcmRDb250ZW50KGV2ZW50LCB0aGlzLndpbmRvdywgdGhpcy5kb2N1bWVudCksXG4gICAgICAgICAgICAgICAgcGFzdGVkSFRNTCA9IGNsaXBib2FyZENvbnRlbnRbJ3RleHQvaHRtbCddLFxuICAgICAgICAgICAgICAgIHBhc3RlZFBsYWluID0gY2xpcGJvYXJkQ29udGVudFsndGV4dC9wbGFpbiddLFxuICAgICAgICAgICAgICAgIGVkaXRhYmxlID0ga2V5Ym9hcmRQYXN0ZUVkaXRhYmxlO1xuXG4gICAgICAgICAgICAvLyBJZiB3ZSBoYXZlIHZhbGlkIGh0bWwgYWxyZWFkeSwgb3Igd2UncmUgbm90IGluIGNsZWFuUGFzdGVkSFRNTCBtb2RlXG4gICAgICAgICAgICAvLyB3ZSBjYW4gaWdub3JlIHRoZSBwYXN0ZSBiaW4gYW5kIGp1c3QgcGFzdGUgbm93XG4gICAgICAgICAgICBpZiAoIXRoaXMuY2xlYW5QYXN0ZWRIVE1MIHx8IHBhc3RlZEhUTUwpIHtcbiAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgIHRoaXMucmVtb3ZlUGFzdGVCaW4oKTtcbiAgICAgICAgICAgICAgICB0aGlzLmRvUGFzdGUocGFzdGVkSFRNTCwgcGFzdGVkUGxhaW4sIGVkaXRhYmxlKTtcblxuICAgICAgICAgICAgICAgIC8vIFRoZSBldmVudCBoYW5kbGluZyBjb2RlIGxpc3RlbnMgZm9yIHBhc3RlIG9uIHRoZSBlZGl0YWJsZSBlbGVtZW50XG4gICAgICAgICAgICAgICAgLy8gaW4gb3JkZXIgdG8gdHJpZ2dlciB0aGUgZWRpdGFibGVQYXN0ZSBldmVudC4gIFNpbmNlIHRoaXMgcGFzdGUgZXZlbnRcbiAgICAgICAgICAgICAgICAvLyBpcyBoYXBwZW5pbmcgb24gdGhlIHBhc3RlYmluLCB0aGUgZXZlbnQgaGFuZGxpbmcgY29kZSBuZXZlciBrbm93cyBhYm91dCBpdFxuICAgICAgICAgICAgICAgIC8vIFNvLCB3ZSBoYXZlIHRvIHRyaWdnZXIgZWRpdGFibGVQYXN0ZSBtYW51YWxseVxuICAgICAgICAgICAgICAgIHRoaXMudHJpZ2dlcignZWRpdGFibGVQYXN0ZScsIHsgY3VycmVudFRhcmdldDogZWRpdGFibGUsIHRhcmdldDogZWRpdGFibGUgfSwgZWRpdGFibGUpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gV2UgbmVlZCB0byBsb29rIGF0IHRoZSBwYXN0ZSBiaW4sIHNvIGRvIGEgc2V0VGltZW91dCB0byBsZXQgdGhlIHBhc3RlXG4gICAgICAgICAgICAvLyBmYWxsIHRocm91Z2ggaW50byB0aGUgcGFzdGUgYmluXG4gICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAvLyBPbmx5IGxvb2sgZm9yIEhUTUwgaWYgd2UncmUgaW4gY2xlYW5QYXN0ZWRIVE1MIG1vZGVcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5jbGVhblBhc3RlZEhUTUwpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gSWYgY2xpcGJvYXJkIGRpZG4ndCBoYXZlIEhUTUwsIHRyeSB0aGUgcGFzdGUgYmluXG4gICAgICAgICAgICAgICAgICAgIHBhc3RlZEhUTUwgPSB0aGlzLmdldFBhc3RlQmluSHRtbCgpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIC8vIElmIHdlIG5lZWRlZCB0aGUgcGFzdGUgYmluLCB3ZSdyZSBkb25lIHdpdGggaXQgbm93LCByZW1vdmUgaXRcbiAgICAgICAgICAgICAgICB0aGlzLnJlbW92ZVBhc3RlQmluKCk7XG5cbiAgICAgICAgICAgICAgICAvLyBIYW5kbGUgdGhlIHBhc3RlIHdpdGggdGhlIGh0bWwgZnJvbSB0aGUgcGFzdGUgYmluXG4gICAgICAgICAgICAgICAgdGhpcy5kb1Bhc3RlKHBhc3RlZEhUTUwsIHBhc3RlZFBsYWluLCBlZGl0YWJsZSk7XG5cbiAgICAgICAgICAgICAgICAvLyBUaGUgZXZlbnQgaGFuZGxpbmcgY29kZSBsaXN0ZW5zIGZvciBwYXN0ZSBvbiB0aGUgZWRpdGFibGUgZWxlbWVudFxuICAgICAgICAgICAgICAgIC8vIGluIG9yZGVyIHRvIHRyaWdnZXIgdGhlIGVkaXRhYmxlUGFzdGUgZXZlbnQuICBTaW5jZSB0aGlzIHBhc3RlIGV2ZW50XG4gICAgICAgICAgICAgICAgLy8gaXMgaGFwcGVuaW5nIG9uIHRoZSBwYXN0ZWJpbiwgdGhlIGV2ZW50IGhhbmRsaW5nIGNvZGUgbmV2ZXIga25vd3MgYWJvdXQgaXRcbiAgICAgICAgICAgICAgICAvLyBTbywgd2UgaGF2ZSB0byB0cmlnZ2VyIGVkaXRhYmxlUGFzdGUgbWFudWFsbHlcbiAgICAgICAgICAgICAgICB0aGlzLnRyaWdnZXIoJ2VkaXRhYmxlUGFzdGUnLCB7IGN1cnJlbnRUYXJnZXQ6IGVkaXRhYmxlLCB0YXJnZXQ6IGVkaXRhYmxlIH0sIGVkaXRhYmxlKTtcbiAgICAgICAgICAgIH0uYmluZCh0aGlzKSwgMCk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgaGFuZGxlS2V5ZG93bjogZnVuY3Rpb24gKGV2ZW50LCBlZGl0YWJsZSkge1xuICAgICAgICAgICAgLy8gaWYgaXQncyBub3QgQ3RybCtWLCBkbyBub3RoaW5nXG4gICAgICAgICAgICBpZiAoIShNZWRpdW1FZGl0b3IudXRpbC5pc0tleShldmVudCwgTWVkaXVtRWRpdG9yLnV0aWwua2V5Q29kZS5WKSAmJiBNZWRpdW1FZGl0b3IudXRpbC5pc01ldGFDdHJsS2V5KGV2ZW50KSkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGV2ZW50LnN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbigpO1xuXG4gICAgICAgICAgICB0aGlzLnJlbW92ZVBhc3RlQmluKCk7XG4gICAgICAgICAgICB0aGlzLmNyZWF0ZVBhc3RlQmluKGVkaXRhYmxlKTtcbiAgICAgICAgfSxcblxuICAgICAgICBjcmVhdGVQYXN0ZUJpbjogZnVuY3Rpb24gKGVkaXRhYmxlKSB7XG4gICAgICAgICAgICB2YXIgcmVjdHMsXG4gICAgICAgICAgICAgICAgcmFuZ2UgPSBNZWRpdW1FZGl0b3Iuc2VsZWN0aW9uLmdldFNlbGVjdGlvblJhbmdlKHRoaXMuZG9jdW1lbnQpLFxuICAgICAgICAgICAgICAgIHRvcCA9IHRoaXMud2luZG93LnBhZ2VZT2Zmc2V0O1xuXG4gICAgICAgICAgICBrZXlib2FyZFBhc3RlRWRpdGFibGUgPSBlZGl0YWJsZTtcblxuICAgICAgICAgICAgaWYgKHJhbmdlKSB7XG4gICAgICAgICAgICAgICAgcmVjdHMgPSByYW5nZS5nZXRDbGllbnRSZWN0cygpO1xuXG4gICAgICAgICAgICAgICAgLy8gb24gZW1wdHkgbGluZSwgcmVjdHMgaXMgZW1wdHkgc28gd2UgZ3JhYiBpbmZvcm1hdGlvbiBmcm9tIHRoZSBmaXJzdCBjb250YWluZXIgb2YgdGhlIHJhbmdlXG4gICAgICAgICAgICAgICAgaWYgKHJlY3RzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICB0b3AgKz0gcmVjdHNbMF0udG9wO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRvcCArPSByYW5nZS5zdGFydENvbnRhaW5lci5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS50b3A7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBsYXN0UmFuZ2UgPSByYW5nZTtcblxuICAgICAgICAgICAgdmFyIHBhc3RlQmluRWxtID0gdGhpcy5kb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgIHBhc3RlQmluRWxtLmlkID0gdGhpcy5wYXN0ZUJpbklkID0gJ21lZGl1bS1lZGl0b3ItcGFzdGViaW4tJyArICgrRGF0ZS5ub3coKSk7XG4gICAgICAgICAgICBwYXN0ZUJpbkVsbS5zZXRBdHRyaWJ1dGUoJ3N0eWxlJywgJ2JvcmRlcjogMXB4IHJlZCBzb2xpZDsgcG9zaXRpb246IGFic29sdXRlOyB0b3A6ICcgKyB0b3AgKyAncHg7IHdpZHRoOiAxMHB4OyBoZWlnaHQ6IDEwcHg7IG92ZXJmbG93OiBoaWRkZW47IG9wYWNpdHk6IDAnKTtcbiAgICAgICAgICAgIHBhc3RlQmluRWxtLnNldEF0dHJpYnV0ZSgnY29udGVudEVkaXRhYmxlJywgdHJ1ZSk7XG4gICAgICAgICAgICBwYXN0ZUJpbkVsbS5pbm5lckhUTUwgPSBwYXN0ZUJpbkRlZmF1bHRDb250ZW50O1xuXG4gICAgICAgICAgICB0aGlzLmRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQocGFzdGVCaW5FbG0pO1xuXG4gICAgICAgICAgICAvLyBhdm9pZCAuZm9jdXMoKSB0byBzdG9wIG90aGVyIGV2ZW50IChhY3R1YWxseSB0aGUgcGFzdGUgZXZlbnQpXG4gICAgICAgICAgICB0aGlzLm9uKHBhc3RlQmluRWxtLCAnZm9jdXMnLCBzdG9wUHJvcCk7XG4gICAgICAgICAgICB0aGlzLm9uKHBhc3RlQmluRWxtLCAnZm9jdXNpbicsIHN0b3BQcm9wKTtcbiAgICAgICAgICAgIHRoaXMub24ocGFzdGVCaW5FbG0sICdmb2N1c291dCcsIHN0b3BQcm9wKTtcblxuICAgICAgICAgICAgcGFzdGVCaW5FbG0uZm9jdXMoKTtcblxuICAgICAgICAgICAgTWVkaXVtRWRpdG9yLnNlbGVjdGlvbi5zZWxlY3ROb2RlKHBhc3RlQmluRWxtLCB0aGlzLmRvY3VtZW50KTtcblxuICAgICAgICAgICAgaWYgKCF0aGlzLmJvdW5kSGFuZGxlUGFzdGUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmJvdW5kSGFuZGxlUGFzdGUgPSB0aGlzLmhhbmRsZVBhc3RlQmluUGFzdGUuYmluZCh0aGlzKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5vbihwYXN0ZUJpbkVsbSwgJ3Bhc3RlJywgdGhpcy5ib3VuZEhhbmRsZVBhc3RlKTtcbiAgICAgICAgfSxcblxuICAgICAgICByZW1vdmVQYXN0ZUJpbjogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgaWYgKG51bGwgIT09IGxhc3RSYW5nZSkge1xuICAgICAgICAgICAgICAgIE1lZGl1bUVkaXRvci5zZWxlY3Rpb24uc2VsZWN0UmFuZ2UodGhpcy5kb2N1bWVudCwgbGFzdFJhbmdlKTtcbiAgICAgICAgICAgICAgICBsYXN0UmFuZ2UgPSBudWxsO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAobnVsbCAhPT0ga2V5Ym9hcmRQYXN0ZUVkaXRhYmxlKSB7XG4gICAgICAgICAgICAgICAga2V5Ym9hcmRQYXN0ZUVkaXRhYmxlID0gbnVsbDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdmFyIHBhc3RlQmluRWxtID0gdGhpcy5nZXRQYXN0ZUJpbigpO1xuICAgICAgICAgICAgaWYgKCFwYXN0ZUJpbkVsbSkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHBhc3RlQmluRWxtKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5vZmYocGFzdGVCaW5FbG0sICdmb2N1cycsIHN0b3BQcm9wKTtcbiAgICAgICAgICAgICAgICB0aGlzLm9mZihwYXN0ZUJpbkVsbSwgJ2ZvY3VzaW4nLCBzdG9wUHJvcCk7XG4gICAgICAgICAgICAgICAgdGhpcy5vZmYocGFzdGVCaW5FbG0sICdmb2N1c291dCcsIHN0b3BQcm9wKTtcbiAgICAgICAgICAgICAgICB0aGlzLm9mZihwYXN0ZUJpbkVsbSwgJ3Bhc3RlJywgdGhpcy5ib3VuZEhhbmRsZVBhc3RlKTtcbiAgICAgICAgICAgICAgICBwYXN0ZUJpbkVsbS5wYXJlbnRFbGVtZW50LnJlbW92ZUNoaWxkKHBhc3RlQmluRWxtKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICBnZXRQYXN0ZUJpbjogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQodGhpcy5wYXN0ZUJpbklkKTtcbiAgICAgICAgfSxcblxuICAgICAgICBnZXRQYXN0ZUJpbkh0bWw6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBwYXN0ZUJpbkVsbSA9IHRoaXMuZ2V0UGFzdGVCaW4oKTtcblxuICAgICAgICAgICAgaWYgKCFwYXN0ZUJpbkVsbSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gV2ViS2l0IGhhcyBhIG5pY2UgYnVnIHdoZXJlIGl0IGNsb25lcyB0aGUgcGFzdGUgYmluIGlmIHlvdSBwYXN0ZSBmcm9tIGZvciBleGFtcGxlIG5vdGVwYWRcbiAgICAgICAgICAgIC8vIHNvIHdlIG5lZWQgdG8gZm9yY2UgcGxhaW4gdGV4dCBtb2RlIGluIHRoaXMgY2FzZVxuICAgICAgICAgICAgaWYgKHBhc3RlQmluRWxtLmZpcnN0Q2hpbGQgJiYgcGFzdGVCaW5FbG0uZmlyc3RDaGlsZC5pZCA9PT0gJ21jZXBhc3RlYmluJykge1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdmFyIHBhc3RlQmluSHRtbCA9IHBhc3RlQmluRWxtLmlubmVySFRNTDtcblxuICAgICAgICAgICAgLy8gSWYgcGFzdGUgYmluIGlzIGVtcHR5IHRyeSB1c2luZyBwbGFpbiB0ZXh0IG1vZGVcbiAgICAgICAgICAgIC8vIHNpbmNlIHRoYXQgaXMgYmV0dGVyIHRoYW4gbm90aGluZyByaWdodFxuICAgICAgICAgICAgaWYgKCFwYXN0ZUJpbkh0bWwgfHwgcGFzdGVCaW5IdG1sID09PSBwYXN0ZUJpbkRlZmF1bHRDb250ZW50KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gcGFzdGVCaW5IdG1sO1xuICAgICAgICB9LFxuXG4gICAgICAgIGNsZWFuUGFzdGU6IGZ1bmN0aW9uICh0ZXh0KSB7XG4gICAgICAgICAgICB2YXIgaSwgZWxMaXN0LCB0bXAsIHdvcmtFbCxcbiAgICAgICAgICAgICAgICBtdWx0aWxpbmUgPSAvPHB8PGJyfDxkaXYvLnRlc3QodGV4dCksXG4gICAgICAgICAgICAgICAgcmVwbGFjZW1lbnRzID0gW10uY29uY2F0KFxuICAgICAgICAgICAgICAgICAgICB0aGlzLnByZUNsZWFuUmVwbGFjZW1lbnRzIHx8IFtdLFxuICAgICAgICAgICAgICAgICAgICBjcmVhdGVSZXBsYWNlbWVudHMoKSxcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jbGVhblJlcGxhY2VtZW50cyB8fCBbXSk7XG5cbiAgICAgICAgICAgIGZvciAoaSA9IDA7IGkgPCByZXBsYWNlbWVudHMubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgICAgICAgICAgICB0ZXh0ID0gdGV4dC5yZXBsYWNlKHJlcGxhY2VtZW50c1tpXVswXSwgcmVwbGFjZW1lbnRzW2ldWzFdKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKCFtdWx0aWxpbmUpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5wYXN0ZUhUTUwodGV4dCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIGNyZWF0ZSBhIHRlbXBvcmFyeSBkaXYgdG8gY2xlYW51cCBibG9jayBlbGVtZW50c1xuICAgICAgICAgICAgdG1wID0gdGhpcy5kb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblxuICAgICAgICAgICAgLy8gZG91YmxlIGJyJ3MgYXJlbid0IGNvbnZlcnRlZCB0byBwIHRhZ3MsIGJ1dCB3ZSB3YW50IHBhcmFncmFwaHMuXG4gICAgICAgICAgICB0bXAuaW5uZXJIVE1MID0gJzxwPicgKyB0ZXh0LnNwbGl0KCc8YnI+PGJyPicpLmpvaW4oJzwvcD48cD4nKSArICc8L3A+JztcblxuICAgICAgICAgICAgLy8gYmxvY2sgZWxlbWVudCBjbGVhbnVwXG4gICAgICAgICAgICBlbExpc3QgPSB0bXAucXVlcnlTZWxlY3RvckFsbCgnYSxwLGRpdixicicpO1xuICAgICAgICAgICAgZm9yIChpID0gMDsgaSA8IGVsTGlzdC5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgICAgICAgICAgIHdvcmtFbCA9IGVsTGlzdFtpXTtcblxuICAgICAgICAgICAgICAgIC8vIE1pY3Jvc29mdCBXb3JkIHJlcGxhY2VzIHNvbWUgc3BhY2VzIHdpdGggbmV3bGluZXMuXG4gICAgICAgICAgICAgICAgLy8gV2hpbGUgbmV3bGluZXMgYmV0d2VlbiBibG9jayBlbGVtZW50cyBhcmUgbWVhbmluZ2xlc3MsIG5ld2xpbmVzIHdpdGhpblxuICAgICAgICAgICAgICAgIC8vIGVsZW1lbnRzIGFyZSBzb21ldGltZXMgYWN0dWFsbHkgc3BhY2VzLlxuICAgICAgICAgICAgICAgIHdvcmtFbC5pbm5lckhUTUwgPSB3b3JrRWwuaW5uZXJIVE1MLnJlcGxhY2UoL1xcbi9naSwgJyAnKTtcblxuICAgICAgICAgICAgICAgIHN3aXRjaCAod29ya0VsLm5vZGVOYW1lLnRvTG93ZXJDYXNlKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAncCc6XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ2Rpdic6XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmZpbHRlckNvbW1vbkJsb2Nrcyh3b3JrRWwpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ2JyJzpcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZmlsdGVyTGluZUJyZWFrKHdvcmtFbCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMucGFzdGVIVE1MKHRtcC5pbm5lckhUTUwpO1xuICAgICAgICB9LFxuXG4gICAgICAgIHBhc3RlSFRNTDogZnVuY3Rpb24gKGh0bWwsIG9wdGlvbnMpIHtcbiAgICAgICAgICAgIG9wdGlvbnMgPSBNZWRpdW1FZGl0b3IudXRpbC5kZWZhdWx0cyh7fSwgb3B0aW9ucywge1xuICAgICAgICAgICAgICAgIGNsZWFuQXR0cnM6IHRoaXMuY2xlYW5BdHRycyxcbiAgICAgICAgICAgICAgICBjbGVhblRhZ3M6IHRoaXMuY2xlYW5UYWdzXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgdmFyIGVsTGlzdCwgd29ya0VsLCBpLCBmcmFnbWVudEJvZHksIHBhc3RlQmxvY2sgPSB0aGlzLmRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKTtcblxuICAgICAgICAgICAgcGFzdGVCbG9jay5hcHBlbmRDaGlsZCh0aGlzLmRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2JvZHknKSk7XG5cbiAgICAgICAgICAgIGZyYWdtZW50Qm9keSA9IHBhc3RlQmxvY2sucXVlcnlTZWxlY3RvcignYm9keScpO1xuICAgICAgICAgICAgZnJhZ21lbnRCb2R5LmlubmVySFRNTCA9IGh0bWw7XG5cbiAgICAgICAgICAgIHRoaXMuY2xlYW51cFNwYW5zKGZyYWdtZW50Qm9keSk7XG5cbiAgICAgICAgICAgIGVsTGlzdCA9IGZyYWdtZW50Qm9keS5xdWVyeVNlbGVjdG9yQWxsKCcqJyk7XG4gICAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwgZWxMaXN0Lmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICAgICAgICAgICAgd29ya0VsID0gZWxMaXN0W2ldO1xuXG4gICAgICAgICAgICAgICAgaWYgKCdhJyA9PT0gd29ya0VsLm5vZGVOYW1lLnRvTG93ZXJDYXNlKCkgJiYgdGhpcy5nZXRFZGl0b3JPcHRpb24oJ3RhcmdldEJsYW5rJykpIHtcbiAgICAgICAgICAgICAgICAgICAgTWVkaXVtRWRpdG9yLnV0aWwuc2V0VGFyZ2V0Qmxhbmsod29ya0VsKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBNZWRpdW1FZGl0b3IudXRpbC5jbGVhbnVwQXR0cnMod29ya0VsLCBvcHRpb25zLmNsZWFuQXR0cnMpO1xuICAgICAgICAgICAgICAgIE1lZGl1bUVkaXRvci51dGlsLmNsZWFudXBUYWdzKHdvcmtFbCwgb3B0aW9ucy5jbGVhblRhZ3MpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBNZWRpdW1FZGl0b3IudXRpbC5pbnNlcnRIVE1MQ29tbWFuZCh0aGlzLmRvY3VtZW50LCBmcmFnbWVudEJvZHkuaW5uZXJIVE1MLnJlcGxhY2UoLyZuYnNwOy9nLCAnICcpKTtcbiAgICAgICAgfSxcblxuICAgICAgICAvLyBUT0RPICg2LjApOiBNYWtlIHRoaXMgYW4gaW50ZXJuYWwgaGVscGVyIGluc3RlYWQgb2YgbWVtYmVyIG9mIHBhc3RlIGhhbmRsZXJcbiAgICAgICAgaXNDb21tb25CbG9jazogZnVuY3Rpb24gKGVsKSB7XG4gICAgICAgICAgICByZXR1cm4gKGVsICYmIChlbC5ub2RlTmFtZS50b0xvd2VyQ2FzZSgpID09PSAncCcgfHwgZWwubm9kZU5hbWUudG9Mb3dlckNhc2UoKSA9PT0gJ2RpdicpKTtcbiAgICAgICAgfSxcblxuICAgICAgICAvLyBUT0RPICg2LjApOiBNYWtlIHRoaXMgYW4gaW50ZXJuYWwgaGVscGVyIGluc3RlYWQgb2YgbWVtYmVyIG9mIHBhc3RlIGhhbmRsZXJcbiAgICAgICAgZmlsdGVyQ29tbW9uQmxvY2tzOiBmdW5jdGlvbiAoZWwpIHtcbiAgICAgICAgICAgIGlmICgvXlxccyokLy50ZXN0KGVsLnRleHRDb250ZW50KSAmJiBlbC5wYXJlbnROb2RlKSB7XG4gICAgICAgICAgICAgICAgZWwucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChlbCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgLy8gVE9ETyAoNi4wKTogTWFrZSB0aGlzIGFuIGludGVybmFsIGhlbHBlciBpbnN0ZWFkIG9mIG1lbWJlciBvZiBwYXN0ZSBoYW5kbGVyXG4gICAgICAgIGZpbHRlckxpbmVCcmVhazogZnVuY3Rpb24gKGVsKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5pc0NvbW1vbkJsb2NrKGVsLnByZXZpb3VzRWxlbWVudFNpYmxpbmcpKSB7XG4gICAgICAgICAgICAgICAgLy8gcmVtb3ZlIHN0cmF5IGJyJ3MgZm9sbG93aW5nIGNvbW1vbiBibG9jayBlbGVtZW50c1xuICAgICAgICAgICAgICAgIHRoaXMucmVtb3ZlV2l0aFBhcmVudChlbCk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMuaXNDb21tb25CbG9jayhlbC5wYXJlbnROb2RlKSAmJiAoZWwucGFyZW50Tm9kZS5maXJzdENoaWxkID09PSBlbCB8fCBlbC5wYXJlbnROb2RlLmxhc3RDaGlsZCA9PT0gZWwpKSB7XG4gICAgICAgICAgICAgICAgLy8gcmVtb3ZlIGJyJ3MganVzdCBpbnNpZGUgb3BlbiBvciBjbG9zZSB0YWdzIG9mIGEgZGl2L3BcbiAgICAgICAgICAgICAgICB0aGlzLnJlbW92ZVdpdGhQYXJlbnQoZWwpO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChlbC5wYXJlbnROb2RlICYmIGVsLnBhcmVudE5vZGUuY2hpbGRFbGVtZW50Q291bnQgPT09IDEgJiYgZWwucGFyZW50Tm9kZS50ZXh0Q29udGVudCA9PT0gJycpIHtcbiAgICAgICAgICAgICAgICAvLyBhbmQgYnIncyB0aGF0IGFyZSB0aGUgb25seSBjaGlsZCBvZiBlbGVtZW50cyBvdGhlciB0aGFuIGRpdi9wXG4gICAgICAgICAgICAgICAgdGhpcy5yZW1vdmVXaXRoUGFyZW50KGVsKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICAvLyBUT0RPICg2LjApOiBNYWtlIHRoaXMgYW4gaW50ZXJuYWwgaGVscGVyIGluc3RlYWQgb2YgbWVtYmVyIG9mIHBhc3RlIGhhbmRsZXJcbiAgICAgICAgLy8gcmVtb3ZlIGFuIGVsZW1lbnQsIGluY2x1ZGluZyBpdHMgcGFyZW50LCBpZiBpdCBpcyB0aGUgb25seSBlbGVtZW50IHdpdGhpbiBpdHMgcGFyZW50XG4gICAgICAgIHJlbW92ZVdpdGhQYXJlbnQ6IGZ1bmN0aW9uIChlbCkge1xuICAgICAgICAgICAgaWYgKGVsICYmIGVsLnBhcmVudE5vZGUpIHtcbiAgICAgICAgICAgICAgICBpZiAoZWwucGFyZW50Tm9kZS5wYXJlbnROb2RlICYmIGVsLnBhcmVudE5vZGUuY2hpbGRFbGVtZW50Q291bnQgPT09IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgZWwucGFyZW50Tm9kZS5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKGVsLnBhcmVudE5vZGUpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGVsLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoZWwpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICAvLyBUT0RPICg2LjApOiBNYWtlIHRoaXMgYW4gaW50ZXJuYWwgaGVscGVyIGluc3RlYWQgb2YgbWVtYmVyIG9mIHBhc3RlIGhhbmRsZXJcbiAgICAgICAgY2xlYW51cFNwYW5zOiBmdW5jdGlvbiAoY29udGFpbmVyRWwpIHtcbiAgICAgICAgICAgIHZhciBpLFxuICAgICAgICAgICAgICAgIGVsLFxuICAgICAgICAgICAgICAgIG5ld0VsLFxuICAgICAgICAgICAgICAgIHNwYW5zID0gY29udGFpbmVyRWwucXVlcnlTZWxlY3RvckFsbCgnLnJlcGxhY2Utd2l0aCcpLFxuICAgICAgICAgICAgICAgIGlzQ0VGID0gZnVuY3Rpb24gKGVsKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAoZWwgJiYgZWwubm9kZU5hbWUgIT09ICcjdGV4dCcgJiYgZWwuZ2V0QXR0cmlidXRlKCdjb250ZW50ZWRpdGFibGUnKSA9PT0gJ2ZhbHNlJyk7XG4gICAgICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgZm9yIChpID0gMDsgaSA8IHNwYW5zLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICAgICAgICAgICAgZWwgPSBzcGFuc1tpXTtcbiAgICAgICAgICAgICAgICBuZXdFbCA9IHRoaXMuZG9jdW1lbnQuY3JlYXRlRWxlbWVudChlbC5jbGFzc0xpc3QuY29udGFpbnMoJ2JvbGQnKSA/ICdiJyA6ICdpJyk7XG5cbiAgICAgICAgICAgICAgICBpZiAoZWwuY2xhc3NMaXN0LmNvbnRhaW5zKCdib2xkJykgJiYgZWwuY2xhc3NMaXN0LmNvbnRhaW5zKCdpdGFsaWMnKSkge1xuICAgICAgICAgICAgICAgICAgICAvLyBhZGQgYW4gaSB0YWcgYXMgd2VsbCBpZiB0aGlzIGhhcyBib3RoIGl0YWxpY3MgYW5kIGJvbGRcbiAgICAgICAgICAgICAgICAgICAgbmV3RWwuaW5uZXJIVE1MID0gJzxpPicgKyBlbC5pbm5lckhUTUwgKyAnPC9pPic7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgbmV3RWwuaW5uZXJIVE1MID0gZWwuaW5uZXJIVE1MO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbC5wYXJlbnROb2RlLnJlcGxhY2VDaGlsZChuZXdFbCwgZWwpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBzcGFucyA9IGNvbnRhaW5lckVsLnF1ZXJ5U2VsZWN0b3JBbGwoJ3NwYW4nKTtcbiAgICAgICAgICAgIGZvciAoaSA9IDA7IGkgPCBzcGFucy5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgICAgICAgICAgIGVsID0gc3BhbnNbaV07XG5cbiAgICAgICAgICAgICAgICAvLyBiYWlsIGlmIHNwYW4gaXMgaW4gY29udGVudGVkaXRhYmxlID0gZmFsc2VcbiAgICAgICAgICAgICAgICBpZiAoTWVkaXVtRWRpdG9yLnV0aWwudHJhdmVyc2VVcChlbCwgaXNDRUYpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAvLyByZW1vdmUgZW1wdHkgc3BhbnMsIHJlcGxhY2Ugb3RoZXJzIHdpdGggdGhlaXIgY29udGVudHNcbiAgICAgICAgICAgICAgICBNZWRpdW1FZGl0b3IudXRpbC51bndyYXAoZWwsIHRoaXMuZG9jdW1lbnQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICBNZWRpdW1FZGl0b3IuZXh0ZW5zaW9ucy5wYXN0ZSA9IFBhc3RlSGFuZGxlcjtcbn0oKSk7XG5cbihmdW5jdGlvbiAoKSB7XG4gICAgJ3VzZSBzdHJpY3QnO1xuXG4gICAgdmFyIFBsYWNlaG9sZGVyID0gTWVkaXVtRWRpdG9yLkV4dGVuc2lvbi5leHRlbmQoe1xuICAgICAgICBuYW1lOiAncGxhY2Vob2xkZXInLFxuXG4gICAgICAgIC8qIFBsYWNlaG9sZGVyIE9wdGlvbnMgKi9cblxuICAgICAgICAvKiB0ZXh0OiBbc3RyaW5nXVxuICAgICAgICAgKiBUZXh0IHRvIGRpc3BsYXkgaW4gdGhlIHBsYWNlaG9sZGVyXG4gICAgICAgICAqL1xuICAgICAgICB0ZXh0OiAnVHlwZSB5b3VyIHRleHQnLFxuXG4gICAgICAgIC8qIGhpZGVPbkNsaWNrOiBbYm9vbGVhbl1cbiAgICAgICAgICogU2hvdWxkIHdlIGhpZGUgdGhlIHBsYWNlaG9sZGVyIG9uIGNsaWNrICh0cnVlKSBvciB3aGVuIHVzZXIgc3RhcnRzIHR5cGluZyAoZmFsc2UpXG4gICAgICAgICAqL1xuICAgICAgICBoaWRlT25DbGljazogdHJ1ZSxcblxuICAgICAgICBpbml0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBNZWRpdW1FZGl0b3IuRXh0ZW5zaW9uLnByb3RvdHlwZS5pbml0LmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG5cbiAgICAgICAgICAgIHRoaXMuaW5pdFBsYWNlaG9sZGVycygpO1xuICAgICAgICAgICAgdGhpcy5hdHRhY2hFdmVudEhhbmRsZXJzKCk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgaW5pdFBsYWNlaG9sZGVyczogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdGhpcy5nZXRFZGl0b3JFbGVtZW50cygpLmZvckVhY2godGhpcy5pbml0RWxlbWVudCwgdGhpcyk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgaGFuZGxlQWRkRWxlbWVudDogZnVuY3Rpb24gKGV2ZW50LCBlZGl0YWJsZSkge1xuICAgICAgICAgICAgdGhpcy5pbml0RWxlbWVudChlZGl0YWJsZSk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgaW5pdEVsZW1lbnQ6IGZ1bmN0aW9uIChlbCkge1xuICAgICAgICAgICAgaWYgKCFlbC5nZXRBdHRyaWJ1dGUoJ2RhdGEtcGxhY2Vob2xkZXInKSkge1xuICAgICAgICAgICAgICAgIGVsLnNldEF0dHJpYnV0ZSgnZGF0YS1wbGFjZWhvbGRlcicsIHRoaXMudGV4dCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZVBsYWNlaG9sZGVyKGVsKTtcbiAgICAgICAgfSxcblxuICAgICAgICBkZXN0cm95OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB0aGlzLmdldEVkaXRvckVsZW1lbnRzKCkuZm9yRWFjaCh0aGlzLmNsZWFudXBFbGVtZW50LCB0aGlzKTtcbiAgICAgICAgfSxcblxuICAgICAgICBoYW5kbGVSZW1vdmVFbGVtZW50OiBmdW5jdGlvbiAoZXZlbnQsIGVkaXRhYmxlKSB7XG4gICAgICAgICAgICB0aGlzLmNsZWFudXBFbGVtZW50KGVkaXRhYmxlKTtcbiAgICAgICAgfSxcblxuICAgICAgICBjbGVhbnVwRWxlbWVudDogZnVuY3Rpb24gKGVsKSB7XG4gICAgICAgICAgICBpZiAoZWwuZ2V0QXR0cmlidXRlKCdkYXRhLXBsYWNlaG9sZGVyJykgPT09IHRoaXMudGV4dCkge1xuICAgICAgICAgICAgICAgIGVsLnJlbW92ZUF0dHJpYnV0ZSgnZGF0YS1wbGFjZWhvbGRlcicpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIHNob3dQbGFjZWhvbGRlcjogZnVuY3Rpb24gKGVsKSB7XG4gICAgICAgICAgICBpZiAoZWwpIHtcbiAgICAgICAgICAgICAgICAvLyBodHRwczovL2dpdGh1Yi5jb20veWFid2UvbWVkaXVtLWVkaXRvci9pc3N1ZXMvMjM0XG4gICAgICAgICAgICAgICAgLy8gSW4gZmlyZWZveCwgc3R5bGluZyB0aGUgcGxhY2Vob2xkZXIgd2l0aCBhbiBhYnNvbHV0ZWx5IHBvc2l0aW9uZWRcbiAgICAgICAgICAgICAgICAvLyBwc2V1ZG8gZWxlbWVudCBjYXVzZXMgdGhlIGN1cnNvciB0byBhcHBlYXIgaW4gYSBiYWQgbG9jYXRpb25cbiAgICAgICAgICAgICAgICAvLyB3aGVuIHRoZSBlbGVtZW50IGlzIGNvbXBsZXRlbHkgZW1wdHksIHNvIGFwcGx5IGEgZGlmZmVyZW50IGNsYXNzIHRvXG4gICAgICAgICAgICAgICAgLy8gc3R5bGUgaXQgd2l0aCBhIHJlbGF0aXZlbHkgcG9zaXRpb25lZCBwc2V1ZG8gZWxlbWVudFxuICAgICAgICAgICAgICAgIGlmIChNZWRpdW1FZGl0b3IudXRpbC5pc0ZGICYmIGVsLmNoaWxkTm9kZXMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIGVsLmNsYXNzTGlzdC5hZGQoJ21lZGl1bS1lZGl0b3ItcGxhY2Vob2xkZXItcmVsYXRpdmUnKTtcbiAgICAgICAgICAgICAgICAgICAgZWwuY2xhc3NMaXN0LnJlbW92ZSgnbWVkaXVtLWVkaXRvci1wbGFjZWhvbGRlcicpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGVsLmNsYXNzTGlzdC5hZGQoJ21lZGl1bS1lZGl0b3ItcGxhY2Vob2xkZXInKTtcbiAgICAgICAgICAgICAgICAgICAgZWwuY2xhc3NMaXN0LnJlbW92ZSgnbWVkaXVtLWVkaXRvci1wbGFjZWhvbGRlci1yZWxhdGl2ZScpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICBoaWRlUGxhY2Vob2xkZXI6IGZ1bmN0aW9uIChlbCkge1xuICAgICAgICAgICAgaWYgKGVsKSB7XG4gICAgICAgICAgICAgICAgZWwuY2xhc3NMaXN0LnJlbW92ZSgnbWVkaXVtLWVkaXRvci1wbGFjZWhvbGRlcicpO1xuICAgICAgICAgICAgICAgIGVsLmNsYXNzTGlzdC5yZW1vdmUoJ21lZGl1bS1lZGl0b3ItcGxhY2Vob2xkZXItcmVsYXRpdmUnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICB1cGRhdGVQbGFjZWhvbGRlcjogZnVuY3Rpb24gKGVsLCBkb250U2hvdykge1xuICAgICAgICAgICAgLy8gSWYgdGhlIGVsZW1lbnQgaGFzIGNvbnRlbnQsIGhpZGUgdGhlIHBsYWNlaG9sZGVyXG4gICAgICAgICAgICBpZiAoZWwucXVlcnlTZWxlY3RvcignaW1nLCBibG9ja3F1b3RlLCB1bCwgb2wsIHRhYmxlJykgfHwgKGVsLnRleHRDb250ZW50LnJlcGxhY2UoL15cXHMrfFxccyskL2csICcnKSAhPT0gJycpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuaGlkZVBsYWNlaG9sZGVyKGVsKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKCFkb250U2hvdykge1xuICAgICAgICAgICAgICAgIHRoaXMuc2hvd1BsYWNlaG9sZGVyKGVsKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICBhdHRhY2hFdmVudEhhbmRsZXJzOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5oaWRlT25DbGljaykge1xuICAgICAgICAgICAgICAgIC8vIEZvciB0aGUgJ2hpZGVPbkNsaWNrJyBvcHRpb24sIHRoZSBwbGFjZWhvbGRlciBzaG91bGQgYWx3YXlzIGJlIGhpZGRlbiBvbiBmb2N1c1xuICAgICAgICAgICAgICAgIHRoaXMuc3Vic2NyaWJlKCdmb2N1cycsIHRoaXMuaGFuZGxlRm9jdXMuYmluZCh0aGlzKSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIElmIHRoZSBlZGl0b3IgaGFzIGNvbnRlbnQsIGl0IHNob3VsZCBhbHdheXMgaGlkZSB0aGUgcGxhY2Vob2xkZXJcbiAgICAgICAgICAgIHRoaXMuc3Vic2NyaWJlKCdlZGl0YWJsZUlucHV0JywgdGhpcy5oYW5kbGVJbnB1dC5iaW5kKHRoaXMpKTtcblxuICAgICAgICAgICAgLy8gV2hlbiB0aGUgZWRpdG9yIGxvc2VzIGZvY3VzLCBjaGVjayBpZiB0aGUgcGxhY2Vob2xkZXIgc2hvdWxkIGJlIHZpc2libGVcbiAgICAgICAgICAgIHRoaXMuc3Vic2NyaWJlKCdibHVyJywgdGhpcy5oYW5kbGVCbHVyLmJpbmQodGhpcykpO1xuXG4gICAgICAgICAgICAvLyBOZWVkIHRvIGtub3cgd2hlbiBlbGVtZW50cyBhcmUgYWRkZWQvcmVtb3ZlZCBmcm9tIHRoZSBlZGl0b3JcbiAgICAgICAgICAgIHRoaXMuc3Vic2NyaWJlKCdhZGRFbGVtZW50JywgdGhpcy5oYW5kbGVBZGRFbGVtZW50LmJpbmQodGhpcykpO1xuICAgICAgICAgICAgdGhpcy5zdWJzY3JpYmUoJ3JlbW92ZUVsZW1lbnQnLCB0aGlzLmhhbmRsZVJlbW92ZUVsZW1lbnQuYmluZCh0aGlzKSk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgaGFuZGxlSW5wdXQ6IGZ1bmN0aW9uIChldmVudCwgZWxlbWVudCkge1xuICAgICAgICAgICAgLy8gSWYgdGhlIHBsYWNlaG9sZGVyIHNob3VsZCBiZSBoaWRkZW4gb24gZm9jdXMgYW5kIHRoZVxuICAgICAgICAgICAgLy8gZWxlbWVudCBoYXMgZm9jdXMsIGRvbid0IHNob3cgdGhlIHBsYWNlaG9sZGVyXG4gICAgICAgICAgICB2YXIgZG9udFNob3cgPSB0aGlzLmhpZGVPbkNsaWNrICYmIChlbGVtZW50ID09PSB0aGlzLmJhc2UuZ2V0Rm9jdXNlZEVsZW1lbnQoKSk7XG5cbiAgICAgICAgICAgIC8vIEVkaXRvcidzIGNvbnRlbnQgaGFzIGNoYW5nZWQsIGNoZWNrIGlmIHRoZSBwbGFjZWhvbGRlciBzaG91bGQgYmUgaGlkZGVuXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZVBsYWNlaG9sZGVyKGVsZW1lbnQsIGRvbnRTaG93KTtcbiAgICAgICAgfSxcblxuICAgICAgICBoYW5kbGVGb2N1czogZnVuY3Rpb24gKGV2ZW50LCBlbGVtZW50KSB7XG4gICAgICAgICAgICAvLyBFZGl0b3IgaGFzIGZvY3VzLCBoaWRlIHRoZSBwbGFjZWhvbGRlclxuICAgICAgICAgICAgdGhpcy5oaWRlUGxhY2Vob2xkZXIoZWxlbWVudCk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgaGFuZGxlQmx1cjogZnVuY3Rpb24gKGV2ZW50LCBlbGVtZW50KSB7XG4gICAgICAgICAgICAvLyBFZGl0b3IgaGFzIGxvc3QgZm9jdXMsIGNoZWNrIGlmIHRoZSBwbGFjZWhvbGRlciBzaG91bGQgYmUgc2hvd25cbiAgICAgICAgICAgIHRoaXMudXBkYXRlUGxhY2Vob2xkZXIoZWxlbWVudCk7XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIE1lZGl1bUVkaXRvci5leHRlbnNpb25zLnBsYWNlaG9sZGVyID0gUGxhY2Vob2xkZXI7XG59KCkpO1xuXG4oZnVuY3Rpb24gKCkge1xuICAgICd1c2Ugc3RyaWN0JztcblxuICAgIHZhciBUb29sYmFyID0gTWVkaXVtRWRpdG9yLkV4dGVuc2lvbi5leHRlbmQoe1xuICAgICAgICBuYW1lOiAndG9vbGJhcicsXG5cbiAgICAgICAgLyogVG9vbGJhciBPcHRpb25zICovXG5cbiAgICAgICAgLyogYWxpZ246IFsnbGVmdCd8J2NlbnRlcid8J3JpZ2h0J11cbiAgICAgICAgICogV2hlbiB0aGUgX19zdGF0aWNfXyBvcHRpb24gaXMgdHJ1ZSwgdGhpcyBhbGlnbnMgdGhlIHN0YXRpYyB0b29sYmFyXG4gICAgICAgICAqIHJlbGF0aXZlIHRvIHRoZSBtZWRpdW0tZWRpdG9yIGVsZW1lbnQuXG4gICAgICAgICAqL1xuICAgICAgICBhbGlnbjogJ2NlbnRlcicsXG5cbiAgICAgICAgLyogYWxsb3dNdWx0aVBhcmFncmFwaFNlbGVjdGlvbjogW2Jvb2xlYW5dXG4gICAgICAgICAqIGVuYWJsZXMvZGlzYWJsZXMgd2hldGhlciB0aGUgdG9vbGJhciBzaG91bGQgYmUgZGlzcGxheWVkIHdoZW5cbiAgICAgICAgICogc2VsZWN0aW5nIG11bHRpcGxlIHBhcmFncmFwaHMvYmxvY2sgZWxlbWVudHNcbiAgICAgICAgICovXG4gICAgICAgIGFsbG93TXVsdGlQYXJhZ3JhcGhTZWxlY3Rpb246IHRydWUsXG5cbiAgICAgICAgLyogYnV0dG9uczogW0FycmF5XVxuICAgICAgICAgKiB0aGUgbmFtZXMgb2YgdGhlIHNldCBvZiBidXR0b25zIHRvIGRpc3BsYXkgb24gdGhlIHRvb2xiYXIuXG4gICAgICAgICAqL1xuICAgICAgICBidXR0b25zOiBbJ2JvbGQnLCAnaXRhbGljJywgJ3VuZGVybGluZScsICdhbmNob3InLCAnaDInLCAnaDMnLCAncXVvdGUnXSxcblxuICAgICAgICAvKiBkaWZmTGVmdDogW051bWJlcl1cbiAgICAgICAgICogdmFsdWUgaW4gcGl4ZWxzIHRvIGJlIGFkZGVkIHRvIHRoZSBYIGF4aXMgcG9zaXRpb25pbmcgb2YgdGhlIHRvb2xiYXIuXG4gICAgICAgICAqL1xuICAgICAgICBkaWZmTGVmdDogMCxcblxuICAgICAgICAvKiBkaWZmVG9wOiBbTnVtYmVyXVxuICAgICAgICAgKiB2YWx1ZSBpbiBwaXhlbHMgdG8gYmUgYWRkZWQgdG8gdGhlIFkgYXhpcyBwb3NpdGlvbmluZyBvZiB0aGUgdG9vbGJhci5cbiAgICAgICAgICovXG4gICAgICAgIGRpZmZUb3A6IC0xMCxcblxuICAgICAgICAvKiBmaXJzdEJ1dHRvbkNsYXNzOiBbc3RyaW5nXVxuICAgICAgICAgKiBDU1MgY2xhc3MgYWRkZWQgdG8gdGhlIGZpcnN0IGJ1dHRvbiBpbiB0aGUgdG9vbGJhci5cbiAgICAgICAgICovXG4gICAgICAgIGZpcnN0QnV0dG9uQ2xhc3M6ICdtZWRpdW0tZWRpdG9yLWJ1dHRvbi1maXJzdCcsXG5cbiAgICAgICAgLyogbGFzdEJ1dHRvbkNsYXNzOiBbc3RyaW5nXVxuICAgICAgICAgKiBDU1MgY2xhc3MgYWRkZWQgdG8gdGhlIGxhc3QgYnV0dG9uIGluIHRoZSB0b29sYmFyLlxuICAgICAgICAgKi9cbiAgICAgICAgbGFzdEJ1dHRvbkNsYXNzOiAnbWVkaXVtLWVkaXRvci1idXR0b24tbGFzdCcsXG5cbiAgICAgICAgLyogc3RhbmRhcmRpemVTZWxlY3Rpb25TdGFydDogW2Jvb2xlYW5dXG4gICAgICAgICAqIGVuYWJsZXMvZGlzYWJsZXMgc3RhbmRhcmRpemluZyBob3cgdGhlIGJlZ2lubmluZyBvZiBhIHJhbmdlIGlzIGRlY2lkZWRcbiAgICAgICAgICogYmV0d2VlbiBicm93c2VycyB3aGVuZXZlciB0aGUgc2VsZWN0ZWQgdGV4dCBpcyBhbmFseXplZCBmb3IgdXBkYXRpbmcgdG9vbGJhciBidXR0b25zIHN0YXR1cy5cbiAgICAgICAgICovXG4gICAgICAgIHN0YW5kYXJkaXplU2VsZWN0aW9uU3RhcnQ6IGZhbHNlLFxuXG4gICAgICAgIC8qIHN0YXRpYzogW2Jvb2xlYW5dXG4gICAgICAgICAqIGVuYWJsZS9kaXNhYmxlIHRoZSB0b29sYmFyIGFsd2F5cyBkaXNwbGF5aW5nIGluIHRoZSBzYW1lIGxvY2F0aW9uXG4gICAgICAgICAqIHJlbGF0aXZlIHRvIHRoZSBtZWRpdW0tZWRpdG9yIGVsZW1lbnQuXG4gICAgICAgICAqL1xuICAgICAgICBzdGF0aWM6IGZhbHNlLFxuXG4gICAgICAgIC8qIHN0aWNreTogW2Jvb2xlYW5dXG4gICAgICAgICAqIFdoZW4gdGhlIF9fc3RhdGljX18gb3B0aW9uIGlzIHRydWUsIHRoaXMgZW5hYmxlcy9kaXNhYmxlcyB0aGUgdG9vbGJhclxuICAgICAgICAgKiBcInN0aWNraW5nXCIgdG8gdGhlIHZpZXdwb3J0IGFuZCBzdGF5aW5nIHZpc2libGUgb24gdGhlIHNjcmVlbiB3aGlsZVxuICAgICAgICAgKiB0aGUgcGFnZSBzY3JvbGxzLlxuICAgICAgICAgKi9cbiAgICAgICAgc3RpY2t5OiBmYWxzZSxcblxuICAgICAgICAvKiBzdGlja3lUb3BPZmZzZXQ6IFtOdW1iZXJdXG4gICAgICAgICAqIFZhbHVlIGluIHBpeGVsIG9mIHRoZSB0b3Agb2Zmc2V0IGFib3ZlIHRoZSB0b29sYmFyXG4gICAgICAgICAqL1xuICAgICAgICBzdGlja3lUb3BPZmZzZXQ6IDAsXG5cbiAgICAgICAgLyogdXBkYXRlT25FbXB0eVNlbGVjdGlvbjogW2Jvb2xlYW5dXG4gICAgICAgICAqIFdoZW4gdGhlIF9fc3RhdGljX18gb3B0aW9uIGlzIHRydWUsIHRoaXMgZW5hYmxlcy9kaXNhYmxlcyB1cGRhdGluZ1xuICAgICAgICAgKiB0aGUgc3RhdGUgb2YgdGhlIHRvb2xiYXIgYnV0dG9ucyBldmVuIHdoZW4gdGhlIHNlbGVjdGlvbiBpcyBjb2xsYXBzZWRcbiAgICAgICAgICogKHRoZXJlIGlzIG5vIHNlbGVjdGlvbiwganVzdCBhIGN1cnNvcikuXG4gICAgICAgICAqL1xuICAgICAgICB1cGRhdGVPbkVtcHR5U2VsZWN0aW9uOiBmYWxzZSxcblxuICAgICAgICAvKiByZWxhdGl2ZUNvbnRhaW5lcjogW25vZGVdXG4gICAgICAgICAqIGFwcGVuZGluZyB0aGUgdG9vbGJhciB0byBhIGdpdmVuIG5vZGUgaW5zdGVhZCBvZiBib2R5XG4gICAgICAgICAqL1xuICAgICAgICByZWxhdGl2ZUNvbnRhaW5lcjogbnVsbCxcblxuICAgICAgICBpbml0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBNZWRpdW1FZGl0b3IuRXh0ZW5zaW9uLnByb3RvdHlwZS5pbml0LmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG5cbiAgICAgICAgICAgIHRoaXMuaW5pdFRocm90dGxlZE1ldGhvZHMoKTtcblxuICAgICAgICAgICAgaWYgKCF0aGlzLnJlbGF0aXZlQ29udGFpbmVyKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5nZXRFZGl0b3JPcHRpb24oJ2VsZW1lbnRzQ29udGFpbmVyJykuYXBwZW5kQ2hpbGQodGhpcy5nZXRUb29sYmFyRWxlbWVudCgpKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5yZWxhdGl2ZUNvbnRhaW5lci5hcHBlbmRDaGlsZCh0aGlzLmdldFRvb2xiYXJFbGVtZW50KCkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIC8vIEhlbHBlciBtZXRob2QgdG8gZXhlY3V0ZSBtZXRob2QgZm9yIGV2ZXJ5IGV4dGVuc2lvbiwgYnV0IGlnbm9yaW5nIHRoZSB0b29sYmFyIGV4dGVuc2lvblxuICAgICAgICBmb3JFYWNoRXh0ZW5zaW9uOiBmdW5jdGlvbiAoaXRlcmF0b3IsIGNvbnRleHQpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmJhc2UuZXh0ZW5zaW9ucy5mb3JFYWNoKGZ1bmN0aW9uIChjb21tYW5kKSB7XG4gICAgICAgICAgICAgICAgaWYgKGNvbW1hbmQgPT09IHRoaXMpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gaXRlcmF0b3IuYXBwbHkoY29udGV4dCB8fCB0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgICAgICAgfSwgdGhpcyk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgLy8gVG9vbGJhciBjcmVhdGlvbi9kZWxldGlvblxuXG4gICAgICAgIGNyZWF0ZVRvb2xiYXI6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciB0b29sYmFyID0gdGhpcy5kb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblxuICAgICAgICAgICAgdG9vbGJhci5pZCA9ICdtZWRpdW0tZWRpdG9yLXRvb2xiYXItJyArIHRoaXMuZ2V0RWRpdG9ySWQoKTtcbiAgICAgICAgICAgIHRvb2xiYXIuY2xhc3NOYW1lID0gJ21lZGl1bS1lZGl0b3ItdG9vbGJhcic7XG5cbiAgICAgICAgICAgIGlmICh0aGlzLnN0YXRpYykge1xuICAgICAgICAgICAgICAgIHRvb2xiYXIuY2xhc3NOYW1lICs9ICcgc3RhdGljLXRvb2xiYXInO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLnJlbGF0aXZlQ29udGFpbmVyKSB7XG4gICAgICAgICAgICAgICAgdG9vbGJhci5jbGFzc05hbWUgKz0gJyBtZWRpdW0tZWRpdG9yLXJlbGF0aXZlLXRvb2xiYXInO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0b29sYmFyLmNsYXNzTmFtZSArPSAnIG1lZGl1bS1lZGl0b3Itc3RhbGtlci10b29sYmFyJztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdG9vbGJhci5hcHBlbmRDaGlsZCh0aGlzLmNyZWF0ZVRvb2xiYXJCdXR0b25zKCkpO1xuXG4gICAgICAgICAgICAvLyBBZGQgYW55IGZvcm1zIHRoYXQgZXh0ZW5zaW9ucyBtYXkgaGF2ZVxuICAgICAgICAgICAgdGhpcy5mb3JFYWNoRXh0ZW5zaW9uKGZ1bmN0aW9uIChleHRlbnNpb24pIHtcbiAgICAgICAgICAgICAgICBpZiAoZXh0ZW5zaW9uLmhhc0Zvcm0pIHtcbiAgICAgICAgICAgICAgICAgICAgdG9vbGJhci5hcHBlbmRDaGlsZChleHRlbnNpb24uZ2V0Rm9ybSgpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgdGhpcy5hdHRhY2hFdmVudEhhbmRsZXJzKCk7XG5cbiAgICAgICAgICAgIHJldHVybiB0b29sYmFyO1xuICAgICAgICB9LFxuXG4gICAgICAgIGNyZWF0ZVRvb2xiYXJCdXR0b25zOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgdWwgPSB0aGlzLmRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3VsJyksXG4gICAgICAgICAgICAgICAgbGksXG4gICAgICAgICAgICAgICAgYnRuLFxuICAgICAgICAgICAgICAgIGJ1dHRvbnMsXG4gICAgICAgICAgICAgICAgZXh0ZW5zaW9uLFxuICAgICAgICAgICAgICAgIGJ1dHRvbk5hbWUsXG4gICAgICAgICAgICAgICAgYnV0dG9uT3B0cztcblxuICAgICAgICAgICAgdWwuaWQgPSAnbWVkaXVtLWVkaXRvci10b29sYmFyLWFjdGlvbnMnICsgdGhpcy5nZXRFZGl0b3JJZCgpO1xuICAgICAgICAgICAgdWwuY2xhc3NOYW1lID0gJ21lZGl1bS1lZGl0b3ItdG9vbGJhci1hY3Rpb25zJztcbiAgICAgICAgICAgIHVsLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xuXG4gICAgICAgICAgICB0aGlzLmJ1dHRvbnMuZm9yRWFjaChmdW5jdGlvbiAoYnV0dG9uKSB7XG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBidXR0b24gPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAgICAgICAgIGJ1dHRvbk5hbWUgPSBidXR0b247XG4gICAgICAgICAgICAgICAgICAgIGJ1dHRvbk9wdHMgPSBudWxsO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGJ1dHRvbk5hbWUgPSBidXR0b24ubmFtZTtcbiAgICAgICAgICAgICAgICAgICAgYnV0dG9uT3B0cyA9IGJ1dHRvbjtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAvLyBJZiB0aGUgYnV0dG9uIGFscmVhZHkgZXhpc3RzIGFzIGFuIGV4dGVuc2lvbiwgaXQnbGwgYmUgcmV0dXJuZWRcbiAgICAgICAgICAgICAgICAvLyBvdGh3ZXJpc2UgaXQnbGwgY3JlYXRlIHRoZSBkZWZhdWx0IGJ1aWx0LWluIGJ1dHRvblxuICAgICAgICAgICAgICAgIGV4dGVuc2lvbiA9IHRoaXMuYmFzZS5hZGRCdWlsdEluRXh0ZW5zaW9uKGJ1dHRvbk5hbWUsIGJ1dHRvbk9wdHMpO1xuXG4gICAgICAgICAgICAgICAgaWYgKGV4dGVuc2lvbiAmJiB0eXBlb2YgZXh0ZW5zaW9uLmdldEJ1dHRvbiA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgICAgICAgICBidG4gPSBleHRlbnNpb24uZ2V0QnV0dG9uKHRoaXMuYmFzZSk7XG4gICAgICAgICAgICAgICAgICAgIGxpID0gdGhpcy5kb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoTWVkaXVtRWRpdG9yLnV0aWwuaXNFbGVtZW50KGJ0bikpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxpLmFwcGVuZENoaWxkKGJ0bik7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsaS5pbm5lckhUTUwgPSBidG47XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgdWwuYXBwZW5kQ2hpbGQobGkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sIHRoaXMpO1xuXG4gICAgICAgICAgICBidXR0b25zID0gdWwucXVlcnlTZWxlY3RvckFsbCgnYnV0dG9uJyk7XG4gICAgICAgICAgICBpZiAoYnV0dG9ucy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgYnV0dG9uc1swXS5jbGFzc0xpc3QuYWRkKHRoaXMuZmlyc3RCdXR0b25DbGFzcyk7XG4gICAgICAgICAgICAgICAgYnV0dG9uc1tidXR0b25zLmxlbmd0aCAtIDFdLmNsYXNzTGlzdC5hZGQodGhpcy5sYXN0QnV0dG9uQ2xhc3MpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gdWw7XG4gICAgICAgIH0sXG5cbiAgICAgICAgZGVzdHJveTogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgaWYgKHRoaXMudG9vbGJhcikge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLnRvb2xiYXIucGFyZW50Tm9kZSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnRvb2xiYXIucGFyZW50Tm9kZS5yZW1vdmVDaGlsZCh0aGlzLnRvb2xiYXIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBkZWxldGUgdGhpcy50b29sYmFyO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIC8vIFRvb2xiYXIgYWNjZXNzb3JzXG5cbiAgICAgICAgZ2V0SW50ZXJhY3Rpb25FbGVtZW50czogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ2V0VG9vbGJhckVsZW1lbnQoKTtcbiAgICAgICAgfSxcblxuICAgICAgICBnZXRUb29sYmFyRWxlbWVudDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgaWYgKCF0aGlzLnRvb2xiYXIpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnRvb2xiYXIgPSB0aGlzLmNyZWF0ZVRvb2xiYXIoKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIHRoaXMudG9vbGJhcjtcbiAgICAgICAgfSxcblxuICAgICAgICBnZXRUb29sYmFyQWN0aW9uc0VsZW1lbnQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmdldFRvb2xiYXJFbGVtZW50KCkucXVlcnlTZWxlY3RvcignLm1lZGl1bS1lZGl0b3ItdG9vbGJhci1hY3Rpb25zJyk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgLy8gVG9vbGJhciBldmVudCBoYW5kbGVyc1xuXG4gICAgICAgIGluaXRUaHJvdHRsZWRNZXRob2RzOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAvLyB0aHJvdHRsZWRQb3NpdGlvblRvb2xiYXIgaXMgdGhyb3R0bGVkIGJlY2F1c2U6XG4gICAgICAgICAgICAvLyAtIEl0IHdpbGwgYmUgY2FsbGVkIHdoZW4gdGhlIGJyb3dzZXIgaXMgcmVzaXppbmcsIHdoaWNoIGNhbiBmaXJlIG1hbnkgdGltZXMgdmVyeSBxdWlja2x5XG4gICAgICAgICAgICAvLyAtIEZvciBzb21lIGV2ZW50IChsaWtlIHJlc2l6ZSkgYSBzbGlnaHQgbGFnIGluIFVJIHJlc3BvbnNpdmVuZXNzIGlzIE9LIGFuZCBwcm92aWRlcyBwZXJmb3JtYW5jZSBiZW5lZml0c1xuICAgICAgICAgICAgdGhpcy50aHJvdHRsZWRQb3NpdGlvblRvb2xiYXIgPSBNZWRpdW1FZGl0b3IudXRpbC50aHJvdHRsZShmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuYmFzZS5pc0FjdGl2ZSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnBvc2l0aW9uVG9vbGJhcklmU2hvd24oKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LmJpbmQodGhpcykpO1xuICAgICAgICB9LFxuXG4gICAgICAgIGF0dGFjaEV2ZW50SGFuZGxlcnM6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIC8vIE1lZGl1bUVkaXRvciBjdXN0b20gZXZlbnRzIGZvciB3aGVuIHVzZXIgYmVpbmdzIGFuZCBlbmRzIGludGVyYWN0aW9uIHdpdGggYSBjb250ZW50ZWRpdGFibGUgYW5kIGl0cyBlbGVtZW50c1xuICAgICAgICAgICAgdGhpcy5zdWJzY3JpYmUoJ2JsdXInLCB0aGlzLmhhbmRsZUJsdXIuYmluZCh0aGlzKSk7XG4gICAgICAgICAgICB0aGlzLnN1YnNjcmliZSgnZm9jdXMnLCB0aGlzLmhhbmRsZUZvY3VzLmJpbmQodGhpcykpO1xuXG4gICAgICAgICAgICAvLyBVcGRhdGluZyB0aGUgc3RhdGUgb2YgdGhlIHRvb2xiYXIgYXMgdGhpbmdzIGNoYW5nZVxuICAgICAgICAgICAgdGhpcy5zdWJzY3JpYmUoJ2VkaXRhYmxlQ2xpY2snLCB0aGlzLmhhbmRsZUVkaXRhYmxlQ2xpY2suYmluZCh0aGlzKSk7XG4gICAgICAgICAgICB0aGlzLnN1YnNjcmliZSgnZWRpdGFibGVLZXl1cCcsIHRoaXMuaGFuZGxlRWRpdGFibGVLZXl1cC5iaW5kKHRoaXMpKTtcblxuICAgICAgICAgICAgLy8gSGFuZGxlIG1vdXNldXAgb24gZG9jdW1lbnQgZm9yIHVwZGF0aW5nIHRoZSBzZWxlY3Rpb24gaW4gdGhlIHRvb2xiYXJcbiAgICAgICAgICAgIHRoaXMub24odGhpcy5kb2N1bWVudC5kb2N1bWVudEVsZW1lbnQsICdtb3VzZXVwJywgdGhpcy5oYW5kbGVEb2N1bWVudE1vdXNldXAuYmluZCh0aGlzKSk7XG5cbiAgICAgICAgICAgIC8vIEFkZCBhIHNjcm9sbCBldmVudCBmb3Igc3RpY2t5IHRvb2xiYXJcbiAgICAgICAgICAgIGlmICh0aGlzLnN0YXRpYyAmJiB0aGlzLnN0aWNreSkge1xuICAgICAgICAgICAgICAgIC8vIE9uIHNjcm9sbCAoY2FwdHVyZSksIHJlLXBvc2l0aW9uIHRoZSB0b29sYmFyXG4gICAgICAgICAgICAgICAgdGhpcy5vbih0aGlzLndpbmRvdywgJ3Njcm9sbCcsIHRoaXMuaGFuZGxlV2luZG93U2Nyb2xsLmJpbmQodGhpcyksIHRydWUpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBPbiByZXNpemUsIHJlLXBvc2l0aW9uIHRoZSB0b29sYmFyXG4gICAgICAgICAgICB0aGlzLm9uKHRoaXMud2luZG93LCAncmVzaXplJywgdGhpcy5oYW5kbGVXaW5kb3dSZXNpemUuYmluZCh0aGlzKSk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgaGFuZGxlV2luZG93U2Nyb2xsOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB0aGlzLnBvc2l0aW9uVG9vbGJhcklmU2hvd24oKTtcbiAgICAgICAgfSxcblxuICAgICAgICBoYW5kbGVXaW5kb3dSZXNpemU6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHRoaXMudGhyb3R0bGVkUG9zaXRpb25Ub29sYmFyKCk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgaGFuZGxlRG9jdW1lbnRNb3VzZXVwOiBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgICAgIC8vIERvIG5vdCB0cmlnZ2VyIGNoZWNrU3RhdGUgd2hlbiBtb3VzZXVwIGZpcmVzIG92ZXIgdGhlIHRvb2xiYXJcbiAgICAgICAgICAgIGlmIChldmVudCAmJlxuICAgICAgICAgICAgICAgICAgICBldmVudC50YXJnZXQgJiZcbiAgICAgICAgICAgICAgICAgICAgTWVkaXVtRWRpdG9yLnV0aWwuaXNEZXNjZW5kYW50KHRoaXMuZ2V0VG9vbGJhckVsZW1lbnQoKSwgZXZlbnQudGFyZ2V0KSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuY2hlY2tTdGF0ZSgpO1xuICAgICAgICB9LFxuXG4gICAgICAgIGhhbmRsZUVkaXRhYmxlQ2xpY2s6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIC8vIERlbGF5IHRoZSBjYWxsIHRvIGNoZWNrU3RhdGUgdG8gaGFuZGxlIGJ1ZyB3aGVyZSBzZWxlY3Rpb24gaXMgZW1wdHlcbiAgICAgICAgICAgIC8vIGltbWVkaWF0ZWx5IGFmdGVyIGNsaWNraW5nIGluc2lkZSBhIHByZS1leGlzdGluZyBzZWxlY3Rpb25cbiAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHRoaXMuY2hlY2tTdGF0ZSgpO1xuICAgICAgICAgICAgfS5iaW5kKHRoaXMpLCAwKTtcbiAgICAgICAgfSxcblxuICAgICAgICBoYW5kbGVFZGl0YWJsZUtleXVwOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB0aGlzLmNoZWNrU3RhdGUoKTtcbiAgICAgICAgfSxcblxuICAgICAgICBoYW5kbGVCbHVyOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAvLyBLaWxsIGFueSBwcmV2aW91c2x5IGRlbGF5ZWQgY2FsbHMgdG8gaGlkZSB0aGUgdG9vbGJhclxuICAgICAgICAgICAgY2xlYXJUaW1lb3V0KHRoaXMuaGlkZVRpbWVvdXQpO1xuXG4gICAgICAgICAgICAvLyBCbHVyIG1heSBmaXJlIGV2ZW4gaWYgd2UgaGF2ZSBhIHNlbGVjdGlvbiwgc28gd2Ugd2FudCB0byBwcmV2ZW50IGFueSBkZWxheWVkIHNob3dUb29sYmFyXG4gICAgICAgICAgICAvLyBjYWxscyBmcm9tIGhhcHBlbmluZyBpbiB0aGlzIHNwZWNpZmljIGNhc2VcbiAgICAgICAgICAgIGNsZWFyVGltZW91dCh0aGlzLmRlbGF5U2hvd1RpbWVvdXQpO1xuXG4gICAgICAgICAgICAvLyBEZWxheSB0aGUgY2FsbCB0byBoaWRlVG9vbGJhciB0byBoYW5kbGUgYnVnIHdpdGggbXVsdGlwbGUgZWRpdG9ycyBvbiB0aGUgcGFnZSBhdCBvbmNlXG4gICAgICAgICAgICB0aGlzLmhpZGVUaW1lb3V0ID0gc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5oaWRlVG9vbGJhcigpO1xuICAgICAgICAgICAgfS5iaW5kKHRoaXMpLCAxKTtcbiAgICAgICAgfSxcblxuICAgICAgICBoYW5kbGVGb2N1czogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdGhpcy5jaGVja1N0YXRlKCk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgLy8gSGlkaW5nL3Nob3dpbmcgdG9vbGJhclxuXG4gICAgICAgIGlzRGlzcGxheWVkOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5nZXRUb29sYmFyRWxlbWVudCgpLmNsYXNzTGlzdC5jb250YWlucygnbWVkaXVtLWVkaXRvci10b29sYmFyLWFjdGl2ZScpO1xuICAgICAgICB9LFxuXG4gICAgICAgIHNob3dUb29sYmFyOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBjbGVhclRpbWVvdXQodGhpcy5oaWRlVGltZW91dCk7XG4gICAgICAgICAgICBpZiAoIXRoaXMuaXNEaXNwbGF5ZWQoKSkge1xuICAgICAgICAgICAgICAgIHRoaXMuZ2V0VG9vbGJhckVsZW1lbnQoKS5jbGFzc0xpc3QuYWRkKCdtZWRpdW0tZWRpdG9yLXRvb2xiYXItYWN0aXZlJyk7XG4gICAgICAgICAgICAgICAgdGhpcy50cmlnZ2VyKCdzaG93VG9vbGJhcicsIHt9LCB0aGlzLmJhc2UuZ2V0Rm9jdXNlZEVsZW1lbnQoKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgaGlkZVRvb2xiYXI6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmlzRGlzcGxheWVkKCkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmdldFRvb2xiYXJFbGVtZW50KCkuY2xhc3NMaXN0LnJlbW92ZSgnbWVkaXVtLWVkaXRvci10b29sYmFyLWFjdGl2ZScpO1xuICAgICAgICAgICAgICAgIHRoaXMudHJpZ2dlcignaGlkZVRvb2xiYXInLCB7fSwgdGhpcy5iYXNlLmdldEZvY3VzZWRFbGVtZW50KCkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIGlzVG9vbGJhckRlZmF1bHRBY3Rpb25zRGlzcGxheWVkOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5nZXRUb29sYmFyQWN0aW9uc0VsZW1lbnQoKS5zdHlsZS5kaXNwbGF5ID09PSAnYmxvY2snO1xuICAgICAgICB9LFxuXG4gICAgICAgIGhpZGVUb29sYmFyRGVmYXVsdEFjdGlvbnM6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmlzVG9vbGJhckRlZmF1bHRBY3Rpb25zRGlzcGxheWVkKCkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmdldFRvb2xiYXJBY3Rpb25zRWxlbWVudCgpLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgc2hvd1Rvb2xiYXJEZWZhdWx0QWN0aW9uczogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdGhpcy5oaWRlRXh0ZW5zaW9uRm9ybXMoKTtcblxuICAgICAgICAgICAgaWYgKCF0aGlzLmlzVG9vbGJhckRlZmF1bHRBY3Rpb25zRGlzcGxheWVkKCkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmdldFRvb2xiYXJBY3Rpb25zRWxlbWVudCgpLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBVc2luZyBzZXRUaW1lb3V0ICsgb3B0aW9ucy5kZWxheSBiZWNhdXNlOlxuICAgICAgICAgICAgLy8gV2Ugd2lsbCBhY3R1YWxseSBiZSBkaXNwbGF5aW5nIHRoZSB0b29sYmFyLCB3aGljaCBzaG91bGQgYmUgY29udHJvbGxlZCBieSBvcHRpb25zLmRlbGF5XG4gICAgICAgICAgICB0aGlzLmRlbGF5U2hvd1RpbWVvdXQgPSB0aGlzLmJhc2UuZGVsYXkoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHRoaXMuc2hvd1Rvb2xiYXIoKTtcbiAgICAgICAgICAgIH0uYmluZCh0aGlzKSk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgaGlkZUV4dGVuc2lvbkZvcm1zOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAvLyBIaWRlIGFsbCBleHRlbnNpb24gZm9ybXNcbiAgICAgICAgICAgIHRoaXMuZm9yRWFjaEV4dGVuc2lvbihmdW5jdGlvbiAoZXh0ZW5zaW9uKSB7XG4gICAgICAgICAgICAgICAgaWYgKGV4dGVuc2lvbi5oYXNGb3JtICYmIGV4dGVuc2lvbi5pc0Rpc3BsYXllZCgpKSB7XG4gICAgICAgICAgICAgICAgICAgIGV4dGVuc2lvbi5oaWRlRm9ybSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9LFxuXG4gICAgICAgIC8vIFJlc3BvbmRpbmcgdG8gY2hhbmdlcyBpbiB1c2VyIHNlbGVjdGlvblxuXG4gICAgICAgIC8vIENoZWNrcyBmb3IgZXhpc3RhbmNlIG9mIG11bHRpcGxlIGJsb2NrIGVsZW1lbnRzIGluIHRoZSBjdXJyZW50IHNlbGVjdGlvblxuICAgICAgICBtdWx0aXBsZUJsb2NrRWxlbWVudHNTZWxlY3RlZDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIHJlZ2V4RW1wdHlIVE1MVGFncyA9IC88W15cXC8+XVtePl0qPjxcXC9bXj5dKz4vZ2ltLCAvLyBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzMxMjk3MzgvcmVtb3ZlLWVtcHR5LXRhZ3MtdXNpbmctcmVnZXhcbiAgICAgICAgICAgICAgICByZWdleEJsb2NrRWxlbWVudHMgPSBuZXcgUmVnRXhwKCc8KCcgKyBNZWRpdW1FZGl0b3IudXRpbC5ibG9ja0NvbnRhaW5lckVsZW1lbnROYW1lcy5qb2luKCd8JykgKyAnKVtePl0qPicsICdnJyksXG4gICAgICAgICAgICAgICAgc2VsZWN0aW9uSFRNTCA9IE1lZGl1bUVkaXRvci5zZWxlY3Rpb24uZ2V0U2VsZWN0aW9uSHRtbCh0aGlzLmRvY3VtZW50KS5yZXBsYWNlKHJlZ2V4RW1wdHlIVE1MVGFncywgJycpLCAvLyBGaWx0ZXIgb3V0IGVtcHR5IGJsb2NrcyBmcm9tIHNlbGVjdGlvblxuICAgICAgICAgICAgICAgIGhhc011bHRpUGFyYWdyYXBocyA9IHNlbGVjdGlvbkhUTUwubWF0Y2gocmVnZXhCbG9ja0VsZW1lbnRzKTsgLy8gRmluZCBob3cgbWFueSBibG9jayBlbGVtZW50cyBhcmUgd2l0aGluIHRoZSBodG1sXG5cbiAgICAgICAgICAgIHJldHVybiAhIWhhc011bHRpUGFyYWdyYXBocyAmJiBoYXNNdWx0aVBhcmFncmFwaHMubGVuZ3RoID4gMTtcbiAgICAgICAgfSxcblxuICAgICAgICBtb2RpZnlTZWxlY3Rpb246IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBzZWxlY3Rpb24gPSB0aGlzLndpbmRvdy5nZXRTZWxlY3Rpb24oKSxcbiAgICAgICAgICAgICAgICBzZWxlY3Rpb25SYW5nZSA9IHNlbGVjdGlvbi5nZXRSYW5nZUF0KDApO1xuXG4gICAgICAgICAgICAvKlxuICAgICAgICAgICAgKiBJbiBmaXJlZm94LCB0aGVyZSBhcmUgY2FzZXMgKGllIGRvdWJsZWNsaWNrIG9mIGEgd29yZCkgd2hlcmUgdGhlIHNlbGVjdGlvblJhbmdlIHN0YXJ0XG4gICAgICAgICAgICAqIHdpbGwgYmUgYXQgdGhlIHZlcnkgZW5kIG9mIGFuIGVsZW1lbnQuICBJbiBvdGhlciBicm93c2VycywgdGhlIHNlbGVjdGlvblJhbmdlIHN0YXJ0XG4gICAgICAgICAgICAqIHdvdWxkIGluc3RlYWQgYmUgYXQgdGhlIHZlcnkgYmVnaW5uaW5nIG9mIGFuIGVsZW1lbnQgdGhhdCBhY3R1YWxseSBoYXMgY29udGVudC5cbiAgICAgICAgICAgICogZXhhbXBsZTpcbiAgICAgICAgICAgICogICA8c3Bhbj5mb288L3NwYW4+PHNwYW4+YmFyPC9zcGFuPlxuICAgICAgICAgICAgKlxuICAgICAgICAgICAgKiBJZiB0aGUgdGV4dCAnYmFyJyBpcyBzZWxlY3RlZCwgbW9zdCBicm93c2VycyB3aWxsIGhhdmUgdGhlIHNlbGVjdGlvblJhbmdlIHN0YXJ0IGF0IHRoZSBiZWdpbm5pbmdcbiAgICAgICAgICAgICogb2YgdGhlICdiYXInIHNwYW4uICBIb3dldmVyLCB0aGVyZSBhcmUgY2FzZXMgd2hlcmUgZmlyZWZveCB3aWxsIGhhdmUgdGhlIHNlbGVjdGlvblJhbmdlIHN0YXJ0XG4gICAgICAgICAgICAqIGF0IHRoZSBlbmQgb2YgdGhlICdmb28nIHNwYW4uICBUaGUgY29udGVudGVkaXRhYmxlIGJlaGF2aW9yIHdpbGwgYmUgb2ssIGJ1dCBpZiB0aGVyZSBhcmUgYW55XG4gICAgICAgICAgICAqIHByb3BlcnRpZXMgb24gdGhlICdiYXInIHNwYW4sIHRoZXkgd29uJ3QgYmUgcmVmbGVjdGVkIGFjY3VyYXRlbHkgaW4gdGhlIHRvb2xiYXJcbiAgICAgICAgICAgICogKGllICdCb2xkJyBidXR0b24gd291bGRuJ3QgYmUgYWN0aXZlKVxuICAgICAgICAgICAgKlxuICAgICAgICAgICAgKiBTbywgZm9yIGNhc2VzIHdoZXJlIHRoZSBzZWxlY3Rpb25SYW5nZSBzdGFydCBpcyBhdCB0aGUgZW5kIG9mIGFuIGVsZW1lbnQvbm9kZSwgZmluZCB0aGUgbmV4dFxuICAgICAgICAgICAgKiBhZGphY2VudCB0ZXh0IG5vZGUgdGhhdCBhY3R1YWxseSBoYXMgY29udGVudCBpbiBpdCwgYW5kIG1vdmUgdGhlIHNlbGVjdGlvblJhbmdlIHN0YXJ0IHRoZXJlLlxuICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIGlmICh0aGlzLnN0YW5kYXJkaXplU2VsZWN0aW9uU3RhcnQgJiZcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0aW9uUmFuZ2Uuc3RhcnRDb250YWluZXIubm9kZVZhbHVlICYmXG4gICAgICAgICAgICAgICAgICAgIChzZWxlY3Rpb25SYW5nZS5zdGFydE9mZnNldCA9PT0gc2VsZWN0aW9uUmFuZ2Uuc3RhcnRDb250YWluZXIubm9kZVZhbHVlLmxlbmd0aCkpIHtcbiAgICAgICAgICAgICAgICB2YXIgYWRqYWNlbnROb2RlID0gTWVkaXVtRWRpdG9yLnV0aWwuZmluZEFkamFjZW50VGV4dE5vZGVXaXRoQ29udGVudChNZWRpdW1FZGl0b3Iuc2VsZWN0aW9uLmdldFNlbGVjdGlvbkVsZW1lbnQodGhpcy53aW5kb3cpLCBzZWxlY3Rpb25SYW5nZS5zdGFydENvbnRhaW5lciwgdGhpcy5kb2N1bWVudCk7XG4gICAgICAgICAgICAgICAgaWYgKGFkamFjZW50Tm9kZSkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgb2Zmc2V0ID0gMDtcbiAgICAgICAgICAgICAgICAgICAgd2hpbGUgKGFkamFjZW50Tm9kZS5ub2RlVmFsdWUuc3Vic3RyKG9mZnNldCwgMSkudHJpbSgpLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgb2Zmc2V0ID0gb2Zmc2V0ICsgMTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBzZWxlY3Rpb25SYW5nZSA9IE1lZGl1bUVkaXRvci5zZWxlY3Rpb24uc2VsZWN0KHRoaXMuZG9jdW1lbnQsIGFkamFjZW50Tm9kZSwgb2Zmc2V0LFxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0aW9uUmFuZ2UuZW5kQ29udGFpbmVyLCBzZWxlY3Rpb25SYW5nZS5lbmRPZmZzZXQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICBjaGVja1N0YXRlOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5iYXNlLnByZXZlbnRTZWxlY3Rpb25VcGRhdGVzKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBJZiBubyBlZGl0YWJsZSBoYXMgZm9jdXMgT1Igc2VsZWN0aW9uIGlzIGluc2lkZSBjb250ZW50ZWRpdGFibGUgPSBmYWxzZVxuICAgICAgICAgICAgLy8gaGlkZSB0b29sYmFyXG4gICAgICAgICAgICBpZiAoIXRoaXMuYmFzZS5nZXRGb2N1c2VkRWxlbWVudCgpIHx8XG4gICAgICAgICAgICAgICAgICAgIE1lZGl1bUVkaXRvci5zZWxlY3Rpb24uc2VsZWN0aW9uSW5Db250ZW50RWRpdGFibGVGYWxzZSh0aGlzLndpbmRvdykpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5oaWRlVG9vbGJhcigpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBJZiB0aGVyZSdzIG5vIHNlbGVjdGlvbiBlbGVtZW50LCBzZWxlY3Rpb24gZWxlbWVudCBkb2Vzbid0IGJlbG9uZyB0byB0aGlzIGVkaXRvclxuICAgICAgICAgICAgLy8gb3IgdG9vbGJhciBpcyBkaXNhYmxlZCBmb3IgdGhpcyBzZWxlY3Rpb24gZWxlbWVudFxuICAgICAgICAgICAgLy8gaGlkZSB0b29sYmFyXG4gICAgICAgICAgICB2YXIgc2VsZWN0aW9uRWxlbWVudCA9IE1lZGl1bUVkaXRvci5zZWxlY3Rpb24uZ2V0U2VsZWN0aW9uRWxlbWVudCh0aGlzLndpbmRvdyk7XG4gICAgICAgICAgICBpZiAoIXNlbGVjdGlvbkVsZW1lbnQgfHxcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5nZXRFZGl0b3JFbGVtZW50cygpLmluZGV4T2Yoc2VsZWN0aW9uRWxlbWVudCkgPT09IC0xIHx8XG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdGlvbkVsZW1lbnQuZ2V0QXR0cmlidXRlKCdkYXRhLWRpc2FibGUtdG9vbGJhcicpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuaGlkZVRvb2xiYXIoKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gTm93IHdlIGtub3cgdGhlcmUncyBhIGZvY3VzZWQgZWRpdGFibGUgd2l0aCBhIHNlbGVjdGlvblxuXG4gICAgICAgICAgICAvLyBJZiB0aGUgdXBkYXRlT25FbXB0eVNlbGVjdGlvbiBvcHRpb24gaXMgdHJ1ZSwgc2hvdyB0aGUgdG9vbGJhclxuICAgICAgICAgICAgaWYgKHRoaXMudXBkYXRlT25FbXB0eVNlbGVjdGlvbiAmJiB0aGlzLnN0YXRpYykge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnNob3dBbmRVcGRhdGVUb29sYmFyKCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIElmIHdlIGRvbid0IGhhdmUgYSAndmFsaWQnIHNlbGVjdGlvbiAtPiBoaWRlIHRvb2xiYXJcbiAgICAgICAgICAgIGlmICghTWVkaXVtRWRpdG9yLnNlbGVjdGlvbi5zZWxlY3Rpb25Db250YWluc0NvbnRlbnQodGhpcy5kb2N1bWVudCkgfHxcbiAgICAgICAgICAgICAgICAodGhpcy5hbGxvd011bHRpUGFyYWdyYXBoU2VsZWN0aW9uID09PSBmYWxzZSAmJiB0aGlzLm11bHRpcGxlQmxvY2tFbGVtZW50c1NlbGVjdGVkKCkpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuaGlkZVRvb2xiYXIoKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5zaG93QW5kVXBkYXRlVG9vbGJhcigpO1xuICAgICAgICB9LFxuXG4gICAgICAgIC8vIFVwZGF0aW5nIHRoZSB0b29sYmFyXG5cbiAgICAgICAgc2hvd0FuZFVwZGF0ZVRvb2xiYXI6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHRoaXMubW9kaWZ5U2VsZWN0aW9uKCk7XG4gICAgICAgICAgICB0aGlzLnNldFRvb2xiYXJCdXR0b25TdGF0ZXMoKTtcbiAgICAgICAgICAgIHRoaXMudHJpZ2dlcigncG9zaXRpb25Ub29sYmFyJywge30sIHRoaXMuYmFzZS5nZXRGb2N1c2VkRWxlbWVudCgpKTtcbiAgICAgICAgICAgIHRoaXMuc2hvd1Rvb2xiYXJEZWZhdWx0QWN0aW9ucygpO1xuICAgICAgICAgICAgdGhpcy5zZXRUb29sYmFyUG9zaXRpb24oKTtcbiAgICAgICAgfSxcblxuICAgICAgICBzZXRUb29sYmFyQnV0dG9uU3RhdGVzOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB0aGlzLmZvckVhY2hFeHRlbnNpb24oZnVuY3Rpb24gKGV4dGVuc2lvbikge1xuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgZXh0ZW5zaW9uLmlzQWN0aXZlID09PSAnZnVuY3Rpb24nICYmXG4gICAgICAgICAgICAgICAgICAgIHR5cGVvZiBleHRlbnNpb24uc2V0SW5hY3RpdmUgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgICAgICAgICAgZXh0ZW5zaW9uLnNldEluYWN0aXZlKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHRoaXMuY2hlY2tBY3RpdmVCdXR0b25zKCk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgY2hlY2tBY3RpdmVCdXR0b25zOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgbWFudWFsU3RhdGVDaGVja3MgPSBbXSxcbiAgICAgICAgICAgICAgICBxdWVyeVN0YXRlID0gbnVsbCxcbiAgICAgICAgICAgICAgICBzZWxlY3Rpb25SYW5nZSA9IE1lZGl1bUVkaXRvci5zZWxlY3Rpb24uZ2V0U2VsZWN0aW9uUmFuZ2UodGhpcy5kb2N1bWVudCksXG4gICAgICAgICAgICAgICAgcGFyZW50Tm9kZSxcbiAgICAgICAgICAgICAgICB1cGRhdGVFeHRlbnNpb25TdGF0ZSA9IGZ1bmN0aW9uIChleHRlbnNpb24pIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBleHRlbnNpb24uY2hlY2tTdGF0ZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgZXh0ZW5zaW9uLmNoZWNrU3RhdGUocGFyZW50Tm9kZSk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIGV4dGVuc2lvbi5pc0FjdGl2ZSA9PT0gJ2Z1bmN0aW9uJyAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGVvZiBleHRlbnNpb24uaXNBbHJlYWR5QXBwbGllZCA9PT0gJ2Z1bmN0aW9uJyAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGVvZiBleHRlbnNpb24uc2V0QWN0aXZlID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIWV4dGVuc2lvbi5pc0FjdGl2ZSgpICYmIGV4dGVuc2lvbi5pc0FscmVhZHlBcHBsaWVkKHBhcmVudE5vZGUpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZXh0ZW5zaW9uLnNldEFjdGl2ZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgaWYgKCFzZWxlY3Rpb25SYW5nZSkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gTG9vcCB0aHJvdWdoIGFsbCBleHRlbnNpb25zXG4gICAgICAgICAgICB0aGlzLmZvckVhY2hFeHRlbnNpb24oZnVuY3Rpb24gKGV4dGVuc2lvbikge1xuICAgICAgICAgICAgICAgIC8vIEZvciB0aG9zZSBleHRlbnNpb25zIHdoZXJlIHdlIGNhbiB1c2UgZG9jdW1lbnQucXVlcnlDb21tYW5kU3RhdGUoKSwgZG8gc29cbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIGV4dGVuc2lvbi5xdWVyeUNvbW1hbmRTdGF0ZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgICAgICAgICBxdWVyeVN0YXRlID0gZXh0ZW5zaW9uLnF1ZXJ5Q29tbWFuZFN0YXRlKCk7XG4gICAgICAgICAgICAgICAgICAgIC8vIElmIHF1ZXJ5Q29tbWFuZFN0YXRlIHJldHVybnMgYSB2YWxpZCB2YWx1ZSwgd2UgY2FuIHRydXN0IHRoZSBicm93c2VyXG4gICAgICAgICAgICAgICAgICAgIC8vIGFuZCBkb24ndCBuZWVkIHRvIGRvIG91ciBtYW51YWwgY2hlY2tzXG4gICAgICAgICAgICAgICAgICAgIGlmIChxdWVyeVN0YXRlICE9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocXVlcnlTdGF0ZSAmJiB0eXBlb2YgZXh0ZW5zaW9uLnNldEFjdGl2ZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGV4dGVuc2lvbi5zZXRBY3RpdmUoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvLyBXZSBjYW4ndCB1c2UgcXVlcnlDb21tYW5kU3RhdGUgZm9yIHRoaXMgZXh0ZW5zaW9uLCBzbyBhZGQgdG8gbWFudWFsU3RhdGVDaGVja3NcbiAgICAgICAgICAgICAgICBtYW51YWxTdGF0ZUNoZWNrcy5wdXNoKGV4dGVuc2lvbik7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgcGFyZW50Tm9kZSA9IE1lZGl1bUVkaXRvci5zZWxlY3Rpb24uZ2V0U2VsZWN0ZWRQYXJlbnRFbGVtZW50KHNlbGVjdGlvblJhbmdlKTtcblxuICAgICAgICAgICAgLy8gTWFrZSBzdXJlIHRoZSBzZWxlY3Rpb24gcGFyZW50IGlzbid0IG91dHNpZGUgb2YgdGhlIGNvbnRlbnRlZGl0YWJsZVxuICAgICAgICAgICAgaWYgKCF0aGlzLmdldEVkaXRvckVsZW1lbnRzKCkuc29tZShmdW5jdGlvbiAoZWxlbWVudCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gTWVkaXVtRWRpdG9yLnV0aWwuaXNEZXNjZW5kYW50KGVsZW1lbnQsIHBhcmVudE5vZGUsIHRydWUpO1xuICAgICAgICAgICAgICAgIH0pKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBDbGltYiB1cCB0aGUgRE9NIGFuZCBkbyBtYW51YWwgY2hlY2tzIGZvciB3aGV0aGVyIGEgY2VydGFpbiBleHRlbnNpb24gaXMgY3VycmVudGx5IGVuYWJsZWQgZm9yIHRoaXMgbm9kZVxuICAgICAgICAgICAgd2hpbGUgKHBhcmVudE5vZGUpIHtcbiAgICAgICAgICAgICAgICBtYW51YWxTdGF0ZUNoZWNrcy5mb3JFYWNoKHVwZGF0ZUV4dGVuc2lvblN0YXRlKTtcblxuICAgICAgICAgICAgICAgIC8vIHdlIGNhbiBhYm9ydCB0aGUgc2VhcmNoIHVwd2FyZHMgaWYgd2UgbGVhdmUgdGhlIGNvbnRlbnRFZGl0YWJsZSBlbGVtZW50XG4gICAgICAgICAgICAgICAgaWYgKE1lZGl1bUVkaXRvci51dGlsLmlzTWVkaXVtRWRpdG9yRWxlbWVudChwYXJlbnROb2RlKSkge1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcGFyZW50Tm9kZSA9IHBhcmVudE5vZGUucGFyZW50Tm9kZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICAvLyBQb3NpdGlvbmluZyB0b29sYmFyXG5cbiAgICAgICAgcG9zaXRpb25Ub29sYmFySWZTaG93bjogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgaWYgKHRoaXMuaXNEaXNwbGF5ZWQoKSkge1xuICAgICAgICAgICAgICAgIHRoaXMuc2V0VG9vbGJhclBvc2l0aW9uKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgc2V0VG9vbGJhclBvc2l0aW9uOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgY29udGFpbmVyID0gdGhpcy5iYXNlLmdldEZvY3VzZWRFbGVtZW50KCksXG4gICAgICAgICAgICAgICAgc2VsZWN0aW9uID0gdGhpcy53aW5kb3cuZ2V0U2VsZWN0aW9uKCk7XG5cbiAgICAgICAgICAgIC8vIElmIHRoZXJlIGlzbid0IGEgdmFsaWQgc2VsZWN0aW9uLCBiYWlsXG4gICAgICAgICAgICBpZiAoIWNvbnRhaW5lcikge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAodGhpcy5zdGF0aWMgfHwgIXNlbGVjdGlvbi5pc0NvbGxhcHNlZCkge1xuICAgICAgICAgICAgICAgIHRoaXMuc2hvd1Rvb2xiYXIoKTtcblxuICAgICAgICAgICAgICAgIC8vIHdlIGRvbid0IG5lZWQgYW55IGFic29sdXRlIHBvc2l0aW9uaW5nIGlmIHJlbGF0aXZlQ29udGFpbmVyIGlzIHNldFxuICAgICAgICAgICAgICAgIGlmICghdGhpcy5yZWxhdGl2ZUNvbnRhaW5lcikge1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5zdGF0aWMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucG9zaXRpb25TdGF0aWNUb29sYmFyKGNvbnRhaW5lcik7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnBvc2l0aW9uVG9vbGJhcihzZWxlY3Rpb24pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgdGhpcy50cmlnZ2VyKCdwb3NpdGlvbmVkVG9vbGJhcicsIHt9LCB0aGlzLmJhc2UuZ2V0Rm9jdXNlZEVsZW1lbnQoKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgcG9zaXRpb25TdGF0aWNUb29sYmFyOiBmdW5jdGlvbiAoY29udGFpbmVyKSB7XG4gICAgICAgICAgICAvLyBwb3NpdGlvbiB0aGUgdG9vbGJhciBhdCBsZWZ0IDAsIHNvIHdlIGNhbiBnZXQgdGhlIHJlYWwgd2lkdGggb2YgdGhlIHRvb2xiYXJcbiAgICAgICAgICAgIHRoaXMuZ2V0VG9vbGJhckVsZW1lbnQoKS5zdHlsZS5sZWZ0ID0gJzAnO1xuXG4gICAgICAgICAgICAvLyBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQgZm9yIElFIDlcbiAgICAgICAgICAgIHZhciBzY3JvbGxUb3AgPSAodGhpcy5kb2N1bWVudC5kb2N1bWVudEVsZW1lbnQgJiYgdGhpcy5kb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc2Nyb2xsVG9wKSB8fCB0aGlzLmRvY3VtZW50LmJvZHkuc2Nyb2xsVG9wLFxuICAgICAgICAgICAgICAgIHdpbmRvd1dpZHRoID0gdGhpcy53aW5kb3cuaW5uZXJXaWR0aCxcbiAgICAgICAgICAgICAgICB0b29sYmFyRWxlbWVudCA9IHRoaXMuZ2V0VG9vbGJhckVsZW1lbnQoKSxcbiAgICAgICAgICAgICAgICBjb250YWluZXJSZWN0ID0gY29udGFpbmVyLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLFxuICAgICAgICAgICAgICAgIGNvbnRhaW5lclRvcCA9IGNvbnRhaW5lclJlY3QudG9wICsgc2Nyb2xsVG9wLFxuICAgICAgICAgICAgICAgIGNvbnRhaW5lckNlbnRlciA9IChjb250YWluZXJSZWN0LmxlZnQgKyAoY29udGFpbmVyUmVjdC53aWR0aCAvIDIpKSxcbiAgICAgICAgICAgICAgICB0b29sYmFySGVpZ2h0ID0gdG9vbGJhckVsZW1lbnQub2Zmc2V0SGVpZ2h0LFxuICAgICAgICAgICAgICAgIHRvb2xiYXJXaWR0aCA9IHRvb2xiYXJFbGVtZW50Lm9mZnNldFdpZHRoLFxuICAgICAgICAgICAgICAgIGhhbGZPZmZzZXRXaWR0aCA9IHRvb2xiYXJXaWR0aCAvIDIsXG4gICAgICAgICAgICAgICAgdGFyZ2V0TGVmdDtcblxuICAgICAgICAgICAgaWYgKHRoaXMuc3RpY2t5KSB7XG4gICAgICAgICAgICAgICAgLy8gSWYgaXQncyBiZXlvbmQgdGhlIGhlaWdodCBvZiB0aGUgZWRpdG9yLCBwb3NpdGlvbiBpdCBhdCB0aGUgYm90dG9tIG9mIHRoZSBlZGl0b3JcbiAgICAgICAgICAgICAgICBpZiAoc2Nyb2xsVG9wID4gKGNvbnRhaW5lclRvcCArIGNvbnRhaW5lci5vZmZzZXRIZWlnaHQgLSB0b29sYmFySGVpZ2h0IC0gdGhpcy5zdGlja3lUb3BPZmZzZXQpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRvb2xiYXJFbGVtZW50LnN0eWxlLnRvcCA9IChjb250YWluZXJUb3AgKyBjb250YWluZXIub2Zmc2V0SGVpZ2h0IC0gdG9vbGJhckhlaWdodCkgKyAncHgnO1xuICAgICAgICAgICAgICAgICAgICB0b29sYmFyRWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKCdtZWRpdW0tZWRpdG9yLXN0aWNreS10b29sYmFyJyk7XG4gICAgICAgICAgICAgICAgLy8gU3RpY2sgdGhlIHRvb2xiYXIgdG8gdGhlIHRvcCBvZiB0aGUgd2luZG93XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChzY3JvbGxUb3AgPiAoY29udGFpbmVyVG9wIC0gdG9vbGJhckhlaWdodCAtIHRoaXMuc3RpY2t5VG9wT2Zmc2V0KSkge1xuICAgICAgICAgICAgICAgICAgICB0b29sYmFyRWxlbWVudC5jbGFzc0xpc3QuYWRkKCdtZWRpdW0tZWRpdG9yLXN0aWNreS10b29sYmFyJyk7XG4gICAgICAgICAgICAgICAgICAgIHRvb2xiYXJFbGVtZW50LnN0eWxlLnRvcCA9IHRoaXMuc3RpY2t5VG9wT2Zmc2V0ICsgJ3B4JztcbiAgICAgICAgICAgICAgICAvLyBOb3JtYWwgc3RhdGljIHRvb2xiYXIgcG9zaXRpb25cbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0b29sYmFyRWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKCdtZWRpdW0tZWRpdG9yLXN0aWNreS10b29sYmFyJyk7XG4gICAgICAgICAgICAgICAgICAgIHRvb2xiYXJFbGVtZW50LnN0eWxlLnRvcCA9IGNvbnRhaW5lclRvcCAtIHRvb2xiYXJIZWlnaHQgKyAncHgnO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdG9vbGJhckVsZW1lbnQuc3R5bGUudG9wID0gY29udGFpbmVyVG9wIC0gdG9vbGJhckhlaWdodCArICdweCc7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHN3aXRjaCAodGhpcy5hbGlnbikge1xuICAgICAgICAgICAgICAgIGNhc2UgJ2xlZnQnOlxuICAgICAgICAgICAgICAgICAgICB0YXJnZXRMZWZ0ID0gY29udGFpbmVyUmVjdC5sZWZ0O1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgIGNhc2UgJ3JpZ2h0JzpcbiAgICAgICAgICAgICAgICAgICAgdGFyZ2V0TGVmdCA9IGNvbnRhaW5lclJlY3QucmlnaHQgLSB0b29sYmFyV2lkdGg7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgY2FzZSAnY2VudGVyJzpcbiAgICAgICAgICAgICAgICAgICAgdGFyZ2V0TGVmdCA9IGNvbnRhaW5lckNlbnRlciAtIGhhbGZPZmZzZXRXaWR0aDtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICh0YXJnZXRMZWZ0IDwgMCkge1xuICAgICAgICAgICAgICAgIHRhcmdldExlZnQgPSAwO1xuICAgICAgICAgICAgfSBlbHNlIGlmICgodGFyZ2V0TGVmdCArIHRvb2xiYXJXaWR0aCkgPiB3aW5kb3dXaWR0aCkge1xuICAgICAgICAgICAgICAgIHRhcmdldExlZnQgPSAod2luZG93V2lkdGggLSBNYXRoLmNlaWwodG9vbGJhcldpZHRoKSAtIDEpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0b29sYmFyRWxlbWVudC5zdHlsZS5sZWZ0ID0gdGFyZ2V0TGVmdCArICdweCc7XG4gICAgICAgIH0sXG5cbiAgICAgICAgcG9zaXRpb25Ub29sYmFyOiBmdW5jdGlvbiAoc2VsZWN0aW9uKSB7XG4gICAgICAgICAgICAvLyBwb3NpdGlvbiB0aGUgdG9vbGJhciBhdCBsZWZ0IDAsIHNvIHdlIGNhbiBnZXQgdGhlIHJlYWwgd2lkdGggb2YgdGhlIHRvb2xiYXJcbiAgICAgICAgICAgIHRoaXMuZ2V0VG9vbGJhckVsZW1lbnQoKS5zdHlsZS5sZWZ0ID0gJzAnO1xuICAgICAgICAgICAgdGhpcy5nZXRUb29sYmFyRWxlbWVudCgpLnN0eWxlLnJpZ2h0ID0gJ2luaXRpYWwnO1xuXG4gICAgICAgICAgICB2YXIgcmFuZ2UgPSBzZWxlY3Rpb24uZ2V0UmFuZ2VBdCgwKSxcbiAgICAgICAgICAgICAgICBib3VuZGFyeSA9IHJhbmdlLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuXG4gICAgICAgICAgICAvLyBIYW5kbGUgc2VsZWN0aW9ucyB3aXRoIGp1c3QgaW1hZ2VzXG4gICAgICAgICAgICBpZiAoIWJvdW5kYXJ5IHx8ICgoYm91bmRhcnkuaGVpZ2h0ID09PSAwICYmIGJvdW5kYXJ5LndpZHRoID09PSAwKSAmJiByYW5nZS5zdGFydENvbnRhaW5lciA9PT0gcmFuZ2UuZW5kQ29udGFpbmVyKSkge1xuICAgICAgICAgICAgICAgIC8vIElmIHRoZXJlJ3MgYSBuZXN0ZWQgaW1hZ2UsIHVzZSB0aGF0IGZvciB0aGUgYm91bmRpbmcgcmVjdGFuZ2xlXG4gICAgICAgICAgICAgICAgaWYgKHJhbmdlLnN0YXJ0Q29udGFpbmVyLm5vZGVUeXBlID09PSAxICYmIHJhbmdlLnN0YXJ0Q29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoJ2ltZycpKSB7XG4gICAgICAgICAgICAgICAgICAgIGJvdW5kYXJ5ID0gcmFuZ2Uuc3RhcnRDb250YWluZXIucXVlcnlTZWxlY3RvcignaW1nJykuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgYm91bmRhcnkgPSByYW5nZS5zdGFydENvbnRhaW5lci5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHZhciBjb250YWluZXJXaWR0aCA9IHRoaXMud2luZG93LmlubmVyV2lkdGgsXG4gICAgICAgICAgICAgICAgdG9vbGJhckVsZW1lbnQgPSB0aGlzLmdldFRvb2xiYXJFbGVtZW50KCksXG4gICAgICAgICAgICAgICAgdG9vbGJhckhlaWdodCA9IHRvb2xiYXJFbGVtZW50Lm9mZnNldEhlaWdodCxcbiAgICAgICAgICAgICAgICB0b29sYmFyV2lkdGggPSB0b29sYmFyRWxlbWVudC5vZmZzZXRXaWR0aCxcbiAgICAgICAgICAgICAgICBoYWxmT2Zmc2V0V2lkdGggPSB0b29sYmFyV2lkdGggLyAyLFxuICAgICAgICAgICAgICAgIGJ1dHRvbkhlaWdodCA9IDUwLFxuICAgICAgICAgICAgICAgIGRlZmF1bHRMZWZ0ID0gdGhpcy5kaWZmTGVmdCAtIGhhbGZPZmZzZXRXaWR0aCxcbiAgICAgICAgICAgICAgICBlbGVtZW50c0NvbnRhaW5lciA9IHRoaXMuZ2V0RWRpdG9yT3B0aW9uKCdlbGVtZW50c0NvbnRhaW5lcicpLFxuICAgICAgICAgICAgICAgIGVsZW1lbnRzQ29udGFpbmVyQWJzb2x1dGUgPSBbJ2Fic29sdXRlJywgJ2ZpeGVkJ10uaW5kZXhPZih3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShlbGVtZW50c0NvbnRhaW5lcikuZ2V0UHJvcGVydHlWYWx1ZSgncG9zaXRpb24nKSkgPiAtMSxcbiAgICAgICAgICAgICAgICBwb3NpdGlvbnMgPSB7fSxcbiAgICAgICAgICAgICAgICByZWxhdGl2ZUJvdW5kYXJ5ID0ge30sXG4gICAgICAgICAgICAgICAgbWlkZGxlQm91bmRhcnksIGVsZW1lbnRzQ29udGFpbmVyQm91bmRhcnk7XG5cbiAgICAgICAgICAgIC8vIElmIGNvbnRhaW5lciBlbGVtZW50IGlzIGFic29sdXRlIC8gZml4ZWQsIHJlY2FsY3VsYXRlIGJvdW5kYXJpZXMgdG8gYmUgcmVsYXRpdmUgdG8gdGhlIGNvbnRhaW5lclxuICAgICAgICAgICAgaWYgKGVsZW1lbnRzQ29udGFpbmVyQWJzb2x1dGUpIHtcbiAgICAgICAgICAgICAgICBlbGVtZW50c0NvbnRhaW5lckJvdW5kYXJ5ID0gZWxlbWVudHNDb250YWluZXIuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgICAgICAgICAgICAgWyd0b3AnLCAnbGVmdCddLmZvckVhY2goZnVuY3Rpb24gKGtleSkge1xuICAgICAgICAgICAgICAgICAgICByZWxhdGl2ZUJvdW5kYXJ5W2tleV0gPSBib3VuZGFyeVtrZXldIC0gZWxlbWVudHNDb250YWluZXJCb3VuZGFyeVtrZXldO1xuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgcmVsYXRpdmVCb3VuZGFyeS53aWR0aCA9IGJvdW5kYXJ5LndpZHRoO1xuICAgICAgICAgICAgICAgIHJlbGF0aXZlQm91bmRhcnkuaGVpZ2h0ID0gYm91bmRhcnkuaGVpZ2h0O1xuICAgICAgICAgICAgICAgIGJvdW5kYXJ5ID0gcmVsYXRpdmVCb3VuZGFyeTtcblxuICAgICAgICAgICAgICAgIGNvbnRhaW5lcldpZHRoID0gZWxlbWVudHNDb250YWluZXJCb3VuZGFyeS53aWR0aDtcblxuICAgICAgICAgICAgICAgIC8vIEFkanVzdCB0b3AgcG9zaXRpb24gYWNjb3JkaW5nIHRvIGNvbnRhaW5lciBzY3JvbGwgcG9zaXRpb25cbiAgICAgICAgICAgICAgICBwb3NpdGlvbnMudG9wID0gZWxlbWVudHNDb250YWluZXIuc2Nyb2xsVG9wO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAvLyBBZGp1c3QgdG9wIHBvc2l0aW9uIGFjY29yZGluZyB0byB3aW5kb3cgc2Nyb2xsIHBvc2l0aW9uXG4gICAgICAgICAgICAgICAgcG9zaXRpb25zLnRvcCA9IHRoaXMud2luZG93LnBhZ2VZT2Zmc2V0O1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBtaWRkbGVCb3VuZGFyeSA9IGJvdW5kYXJ5LmxlZnQgKyBib3VuZGFyeS53aWR0aCAvIDI7XG4gICAgICAgICAgICBwb3NpdGlvbnMudG9wICs9IGJvdW5kYXJ5LnRvcCAtIHRvb2xiYXJIZWlnaHQ7XG5cbiAgICAgICAgICAgIGlmIChib3VuZGFyeS50b3AgPCBidXR0b25IZWlnaHQpIHtcbiAgICAgICAgICAgICAgICB0b29sYmFyRWxlbWVudC5jbGFzc0xpc3QuYWRkKCdtZWRpdW0tdG9vbGJhci1hcnJvdy1vdmVyJyk7XG4gICAgICAgICAgICAgICAgdG9vbGJhckVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZSgnbWVkaXVtLXRvb2xiYXItYXJyb3ctdW5kZXInKTtcbiAgICAgICAgICAgICAgICBwb3NpdGlvbnMudG9wICs9IGJ1dHRvbkhlaWdodCArIGJvdW5kYXJ5LmhlaWdodCAtIHRoaXMuZGlmZlRvcDtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdG9vbGJhckVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnbWVkaXVtLXRvb2xiYXItYXJyb3ctdW5kZXInKTtcbiAgICAgICAgICAgICAgICB0b29sYmFyRWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKCdtZWRpdW0tdG9vbGJhci1hcnJvdy1vdmVyJyk7XG4gICAgICAgICAgICAgICAgcG9zaXRpb25zLnRvcCArPSB0aGlzLmRpZmZUb3A7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChtaWRkbGVCb3VuZGFyeSA8IGhhbGZPZmZzZXRXaWR0aCkge1xuICAgICAgICAgICAgICAgIHBvc2l0aW9ucy5sZWZ0ID0gZGVmYXVsdExlZnQgKyBoYWxmT2Zmc2V0V2lkdGg7XG4gICAgICAgICAgICAgICAgcG9zaXRpb25zLnJpZ2h0ID0gJ2luaXRpYWwnO1xuICAgICAgICAgICAgfSBlbHNlIGlmICgoY29udGFpbmVyV2lkdGggLSBtaWRkbGVCb3VuZGFyeSkgPCBoYWxmT2Zmc2V0V2lkdGgpIHtcbiAgICAgICAgICAgICAgICBwb3NpdGlvbnMubGVmdCA9ICdhdXRvJztcbiAgICAgICAgICAgICAgICBwb3NpdGlvbnMucmlnaHQgPSAwO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBwb3NpdGlvbnMubGVmdCA9IGRlZmF1bHRMZWZ0ICsgbWlkZGxlQm91bmRhcnk7XG4gICAgICAgICAgICAgICAgcG9zaXRpb25zLnJpZ2h0ID0gJ2luaXRpYWwnO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBbJ3RvcCcsICdsZWZ0JywgJ3JpZ2h0J10uZm9yRWFjaChmdW5jdGlvbiAoa2V5KSB7XG4gICAgICAgICAgICAgICAgdG9vbGJhckVsZW1lbnQuc3R5bGVba2V5XSA9IHBvc2l0aW9uc1trZXldICsgKGlzTmFOKHBvc2l0aW9uc1trZXldKSA/ICcnIDogJ3B4Jyk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgTWVkaXVtRWRpdG9yLmV4dGVuc2lvbnMudG9vbGJhciA9IFRvb2xiYXI7XG59KCkpO1xuXG4oZnVuY3Rpb24gKCkge1xuICAgICd1c2Ugc3RyaWN0JztcblxuICAgIHZhciBJbWFnZURyYWdnaW5nID0gTWVkaXVtRWRpdG9yLkV4dGVuc2lvbi5leHRlbmQoe1xuICAgICAgICBpbml0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBNZWRpdW1FZGl0b3IuRXh0ZW5zaW9uLnByb3RvdHlwZS5pbml0LmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG5cbiAgICAgICAgICAgIHRoaXMuc3Vic2NyaWJlKCdlZGl0YWJsZURyYWcnLCB0aGlzLmhhbmRsZURyYWcuYmluZCh0aGlzKSk7XG4gICAgICAgICAgICB0aGlzLnN1YnNjcmliZSgnZWRpdGFibGVEcm9wJywgdGhpcy5oYW5kbGVEcm9wLmJpbmQodGhpcykpO1xuICAgICAgICB9LFxuXG4gICAgICAgIGhhbmRsZURyYWc6IGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICAgICAgdmFyIGNsYXNzTmFtZSA9ICdtZWRpdW0tZWRpdG9yLWRyYWdvdmVyJztcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICBldmVudC5kYXRhVHJhbnNmZXIuZHJvcEVmZmVjdCA9ICdjb3B5JztcblxuICAgICAgICAgICAgaWYgKGV2ZW50LnR5cGUgPT09ICdkcmFnb3ZlcicpIHtcbiAgICAgICAgICAgICAgICBldmVudC50YXJnZXQuY2xhc3NMaXN0LmFkZChjbGFzc05hbWUpO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChldmVudC50eXBlID09PSAnZHJhZ2xlYXZlJykge1xuICAgICAgICAgICAgICAgIGV2ZW50LnRhcmdldC5jbGFzc0xpc3QucmVtb3ZlKGNsYXNzTmFtZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgaGFuZGxlRHJvcDogZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgICAgICB2YXIgY2xhc3NOYW1lID0gJ21lZGl1bS1lZGl0b3ItZHJhZ292ZXInLFxuICAgICAgICAgICAgICAgIGZpbGVzO1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuXG4gICAgICAgICAgICAvLyBJRTkgZG9lcyBub3Qgc3VwcG9ydCB0aGUgRmlsZSBBUEksIHNvIHByZXZlbnQgZmlsZSBmcm9tIG9wZW5pbmcgaW4gYSBuZXcgd2luZG93XG4gICAgICAgICAgICAvLyBidXQgYWxzbyBkb24ndCB0cnkgdG8gYWN0dWFsbHkgZ2V0IHRoZSBmaWxlXG4gICAgICAgICAgICBpZiAoZXZlbnQuZGF0YVRyYW5zZmVyLmZpbGVzKSB7XG4gICAgICAgICAgICAgICAgZmlsZXMgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChldmVudC5kYXRhVHJhbnNmZXIuZmlsZXMsIDApO1xuICAgICAgICAgICAgICAgIGZpbGVzLnNvbWUoZnVuY3Rpb24gKGZpbGUpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGZpbGUudHlwZS5tYXRjaCgnaW1hZ2UnKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGZpbGVSZWFkZXIsIGlkO1xuICAgICAgICAgICAgICAgICAgICAgICAgZmlsZVJlYWRlciA9IG5ldyBGaWxlUmVhZGVyKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBmaWxlUmVhZGVyLnJlYWRBc0RhdGFVUkwoZmlsZSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlkID0gJ21lZGl1bS1pbWctJyArICgrbmV3IERhdGUoKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBNZWRpdW1FZGl0b3IudXRpbC5pbnNlcnRIVE1MQ29tbWFuZCh0aGlzLmRvY3VtZW50LCAnPGltZyBjbGFzcz1cIm1lZGl1bS1lZGl0b3ItaW1hZ2UtbG9hZGluZ1wiIGlkPVwiJyArIGlkICsgJ1wiIC8+Jyk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGZpbGVSZWFkZXIub25sb2FkID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBpbWcgPSB0aGlzLmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGlkKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaW1nKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGltZy5yZW1vdmVBdHRyaWJ1dGUoJ2lkJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGltZy5yZW1vdmVBdHRyaWJ1dGUoJ2NsYXNzJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGltZy5zcmMgPSBmaWxlUmVhZGVyLnJlc3VsdDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9LmJpbmQodGhpcyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LmJpbmQodGhpcykpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZXZlbnQudGFyZ2V0LmNsYXNzTGlzdC5yZW1vdmUoY2xhc3NOYW1lKTtcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgTWVkaXVtRWRpdG9yLmV4dGVuc2lvbnMuaW1hZ2VEcmFnZ2luZyA9IEltYWdlRHJhZ2dpbmc7XG59KCkpO1xuXG4oZnVuY3Rpb24gKCkge1xuICAgICd1c2Ugc3RyaWN0JztcblxuICAgIC8vIEV2ZW50IGhhbmRsZXJzIHRoYXQgc2hvdWxkbid0IGJlIGV4cG9zZWQgZXh0ZXJuYWxseVxuXG4gICAgZnVuY3Rpb24gaGFuZGxlRGlzYWJsZUV4dHJhU3BhY2VzKGV2ZW50KSB7XG4gICAgICAgIHZhciBub2RlID0gTWVkaXVtRWRpdG9yLnNlbGVjdGlvbi5nZXRTZWxlY3Rpb25TdGFydCh0aGlzLm9wdGlvbnMub3duZXJEb2N1bWVudCksXG4gICAgICAgICAgICB0ZXh0Q29udGVudCA9IG5vZGUudGV4dENvbnRlbnQsXG4gICAgICAgICAgICBjYXJldFBvc2l0aW9ucyA9IE1lZGl1bUVkaXRvci5zZWxlY3Rpb24uZ2V0Q2FyZXRPZmZzZXRzKG5vZGUpO1xuXG4gICAgICAgIGlmICgodGV4dENvbnRlbnRbY2FyZXRQb3NpdGlvbnMubGVmdCAtIDFdID09PSB1bmRlZmluZWQpIHx8ICh0ZXh0Q29udGVudFtjYXJldFBvc2l0aW9ucy5sZWZ0IC0gMV0udHJpbSgpID09PSAnJykgfHwgKHRleHRDb250ZW50W2NhcmV0UG9zaXRpb25zLmxlZnRdICE9PSB1bmRlZmluZWQgJiYgdGV4dENvbnRlbnRbY2FyZXRQb3NpdGlvbnMubGVmdF0udHJpbSgpID09PSAnJykpIHtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBoYW5kbGVEaXNhYmxlZEVudGVyS2V5ZG93bihldmVudCwgZWxlbWVudCkge1xuICAgICAgICBpZiAodGhpcy5vcHRpb25zLmRpc2FibGVSZXR1cm4gfHwgZWxlbWVudC5nZXRBdHRyaWJ1dGUoJ2RhdGEtZGlzYWJsZS1yZXR1cm4nKSkge1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLm9wdGlvbnMuZGlzYWJsZURvdWJsZVJldHVybiB8fCBlbGVtZW50LmdldEF0dHJpYnV0ZSgnZGF0YS1kaXNhYmxlLWRvdWJsZS1yZXR1cm4nKSkge1xuICAgICAgICAgICAgdmFyIG5vZGUgPSBNZWRpdW1FZGl0b3Iuc2VsZWN0aW9uLmdldFNlbGVjdGlvblN0YXJ0KHRoaXMub3B0aW9ucy5vd25lckRvY3VtZW50KTtcblxuICAgICAgICAgICAgLy8gaWYgY3VycmVudCB0ZXh0IHNlbGVjdGlvbiBpcyBlbXB0eSBPUiBwcmV2aW91cyBzaWJsaW5nIHRleHQgaXMgZW1wdHkgT1IgaXQgaXMgbm90IGEgbGlzdFxuICAgICAgICAgICAgaWYgKChub2RlICYmIG5vZGUudGV4dENvbnRlbnQudHJpbSgpID09PSAnJyAmJiBub2RlLm5vZGVOYW1lLnRvTG93ZXJDYXNlKCkgIT09ICdsaScpIHx8XG4gICAgICAgICAgICAgICAgKG5vZGUucHJldmlvdXNFbGVtZW50U2libGluZyAmJiBub2RlLnByZXZpb3VzRWxlbWVudFNpYmxpbmcubm9kZU5hbWUudG9Mb3dlckNhc2UoKSAhPT0gJ2JyJyAmJlxuICAgICAgICAgICAgICAgICBub2RlLnByZXZpb3VzRWxlbWVudFNpYmxpbmcudGV4dENvbnRlbnQudHJpbSgpID09PSAnJykpIHtcbiAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaGFuZGxlVGFiS2V5ZG93bihldmVudCkge1xuICAgICAgICAvLyBPdmVycmlkZSB0YWIgb25seSBmb3IgcHJlIG5vZGVzXG4gICAgICAgIHZhciBub2RlID0gTWVkaXVtRWRpdG9yLnNlbGVjdGlvbi5nZXRTZWxlY3Rpb25TdGFydCh0aGlzLm9wdGlvbnMub3duZXJEb2N1bWVudCksXG4gICAgICAgICAgICB0YWcgPSBub2RlICYmIG5vZGUubm9kZU5hbWUudG9Mb3dlckNhc2UoKTtcblxuICAgICAgICBpZiAodGFnID09PSAncHJlJykge1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIE1lZGl1bUVkaXRvci51dGlsLmluc2VydEhUTUxDb21tYW5kKHRoaXMub3B0aW9ucy5vd25lckRvY3VtZW50LCAnICAgICcpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gVGFiIHRvIGluZGVudCBsaXN0IHN0cnVjdHVyZXMhXG4gICAgICAgIGlmIChNZWRpdW1FZGl0b3IudXRpbC5pc0xpc3RJdGVtKG5vZGUpKSB7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgICAgICAvLyBJZiBTaGlmdCBpcyBkb3duLCBvdXRkZW50LCBvdGhlcndpc2UgaW5kZW50XG4gICAgICAgICAgICBpZiAoZXZlbnQuc2hpZnRLZXkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLm9wdGlvbnMub3duZXJEb2N1bWVudC5leGVjQ29tbWFuZCgnb3V0ZGVudCcsIGZhbHNlLCBudWxsKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5vcHRpb25zLm93bmVyRG9jdW1lbnQuZXhlY0NvbW1hbmQoJ2luZGVudCcsIGZhbHNlLCBudWxsKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGhhbmRsZUJsb2NrRGVsZXRlS2V5ZG93bnMoZXZlbnQpIHtcbiAgICAgICAgdmFyIHAsIG5vZGUgPSBNZWRpdW1FZGl0b3Iuc2VsZWN0aW9uLmdldFNlbGVjdGlvblN0YXJ0KHRoaXMub3B0aW9ucy5vd25lckRvY3VtZW50KSxcbiAgICAgICAgICAgIHRhZ05hbWUgPSBub2RlLm5vZGVOYW1lLnRvTG93ZXJDYXNlKCksXG4gICAgICAgICAgICBpc0VtcHR5ID0gL14oXFxzK3w8YnJcXC8/Pik/JC9pLFxuICAgICAgICAgICAgaXNIZWFkZXIgPSAvaFxcZC9pO1xuXG4gICAgICAgIGlmIChNZWRpdW1FZGl0b3IudXRpbC5pc0tleShldmVudCwgW01lZGl1bUVkaXRvci51dGlsLmtleUNvZGUuQkFDS1NQQUNFLCBNZWRpdW1FZGl0b3IudXRpbC5rZXlDb2RlLkVOVEVSXSkgJiZcbiAgICAgICAgICAgICAgICAvLyBoYXMgYSBwcmVjZWVkaW5nIHNpYmxpbmdcbiAgICAgICAgICAgICAgICBub2RlLnByZXZpb3VzRWxlbWVudFNpYmxpbmcgJiZcbiAgICAgICAgICAgICAgICAvLyBpbiBhIGhlYWRlclxuICAgICAgICAgICAgICAgIGlzSGVhZGVyLnRlc3QodGFnTmFtZSkgJiZcbiAgICAgICAgICAgICAgICAvLyBhdCB0aGUgdmVyeSBlbmQgb2YgdGhlIGJsb2NrXG4gICAgICAgICAgICAgICAgTWVkaXVtRWRpdG9yLnNlbGVjdGlvbi5nZXRDYXJldE9mZnNldHMobm9kZSkubGVmdCA9PT0gMCkge1xuICAgICAgICAgICAgaWYgKE1lZGl1bUVkaXRvci51dGlsLmlzS2V5KGV2ZW50LCBNZWRpdW1FZGl0b3IudXRpbC5rZXlDb2RlLkJBQ0tTUEFDRSkgJiYgaXNFbXB0eS50ZXN0KG5vZGUucHJldmlvdXNFbGVtZW50U2libGluZy5pbm5lckhUTUwpKSB7XG4gICAgICAgICAgICAgICAgLy8gYmFja3NwYWNpbmcgdGhlIGJlZ2luaW5nIG9mIGEgaGVhZGVyIGludG8gYW4gZW1wdHkgcHJldmlvdXMgZWxlbWVudCB3aWxsXG4gICAgICAgICAgICAgICAgLy8gY2hhbmdlIHRoZSB0YWdOYW1lIG9mIHRoZSBjdXJyZW50IG5vZGUgdG8gcHJldmVudCBvbmVcbiAgICAgICAgICAgICAgICAvLyBpbnN0ZWFkIGRlbGV0ZSBwcmV2aW91cyBub2RlIGFuZCBjYW5jZWwgdGhlIGV2ZW50LlxuICAgICAgICAgICAgICAgIG5vZGUucHJldmlvdXNFbGVtZW50U2libGluZy5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKG5vZGUucHJldmlvdXNFbGVtZW50U2libGluZyk7XG4gICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoIXRoaXMub3B0aW9ucy5kaXNhYmxlRG91YmxlUmV0dXJuICYmIE1lZGl1bUVkaXRvci51dGlsLmlzS2V5KGV2ZW50LCBNZWRpdW1FZGl0b3IudXRpbC5rZXlDb2RlLkVOVEVSKSkge1xuICAgICAgICAgICAgICAgIC8vIGhpdHRpbmcgcmV0dXJuIGluIHRoZSBiZWdpbmluZyBvZiBhIGhlYWRlciB3aWxsIGNyZWF0ZSBlbXB0eSBoZWFkZXIgZWxlbWVudHMgYmVmb3JlIHRoZSBjdXJyZW50IG9uZVxuICAgICAgICAgICAgICAgIC8vIGluc3RlYWQsIG1ha2UgXCI8cD48YnI+PC9wPlwiIGVsZW1lbnQsIHdoaWNoIGFyZSB3aGF0IGhhcHBlbnMgaWYgeW91IGhpdCByZXR1cm4gaW4gYW4gZW1wdHkgcGFyYWdyYXBoXG4gICAgICAgICAgICAgICAgcCA9IHRoaXMub3B0aW9ucy5vd25lckRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcbiAgICAgICAgICAgICAgICBwLmlubmVySFRNTCA9ICc8YnI+JztcbiAgICAgICAgICAgICAgICBub2RlLnByZXZpb3VzRWxlbWVudFNpYmxpbmcucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUocCwgbm9kZSk7XG4gICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmIChNZWRpdW1FZGl0b3IudXRpbC5pc0tleShldmVudCwgTWVkaXVtRWRpdG9yLnV0aWwua2V5Q29kZS5ERUxFVEUpICYmXG4gICAgICAgICAgICAgICAgICAgIC8vIGJldHdlZW4gdHdvIHNpYmxpbmcgZWxlbWVudHNcbiAgICAgICAgICAgICAgICAgICAgbm9kZS5uZXh0RWxlbWVudFNpYmxpbmcgJiZcbiAgICAgICAgICAgICAgICAgICAgbm9kZS5wcmV2aW91c0VsZW1lbnRTaWJsaW5nICYmXG4gICAgICAgICAgICAgICAgICAgIC8vIG5vdCBpbiBhIGhlYWRlclxuICAgICAgICAgICAgICAgICAgICAhaXNIZWFkZXIudGVzdCh0YWdOYW1lKSAmJlxuICAgICAgICAgICAgICAgICAgICAvLyBpbiBhbiBlbXB0eSB0YWdcbiAgICAgICAgICAgICAgICAgICAgaXNFbXB0eS50ZXN0KG5vZGUuaW5uZXJIVE1MKSAmJlxuICAgICAgICAgICAgICAgICAgICAvLyB3aGVuIHRoZSBuZXh0IHRhZyAqaXMqIGEgaGVhZGVyXG4gICAgICAgICAgICAgICAgICAgIGlzSGVhZGVyLnRlc3Qobm9kZS5uZXh0RWxlbWVudFNpYmxpbmcubm9kZU5hbWUudG9Mb3dlckNhc2UoKSkpIHtcbiAgICAgICAgICAgIC8vIGhpdHRpbmcgZGVsZXRlIGluIGFuIGVtcHR5IGVsZW1lbnQgcHJlY2VkaW5nIGEgaGVhZGVyLCBleDpcbiAgICAgICAgICAgIC8vICA8cD5bQ1VSU09SXTwvcD48aDE+SGVhZGVyPC9oMT5cbiAgICAgICAgICAgIC8vIFdpbGwgY2F1c2UgdGhlIGgxIHRvIGJlY29tZSBhIHBhcmFncmFwaC5cbiAgICAgICAgICAgIC8vIEluc3RlYWQsIGRlbGV0ZSB0aGUgcGFyYWdyYXBoIG5vZGUgYW5kIG1vdmUgdGhlIGN1cnNvciB0byB0aGUgYmVnaW5pbmcgb2YgdGhlIGgxXG5cbiAgICAgICAgICAgIC8vIHJlbW92ZSBub2RlIGFuZCBtb3ZlIGN1cnNvciB0byBzdGFydCBvZiBoZWFkZXJcbiAgICAgICAgICAgIE1lZGl1bUVkaXRvci5zZWxlY3Rpb24ubW92ZUN1cnNvcih0aGlzLm9wdGlvbnMub3duZXJEb2N1bWVudCwgbm9kZS5uZXh0RWxlbWVudFNpYmxpbmcpO1xuXG4gICAgICAgICAgICBub2RlLnByZXZpb3VzRWxlbWVudFNpYmxpbmcucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChub2RlKTtcblxuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgfSBlbHNlIGlmIChNZWRpdW1FZGl0b3IudXRpbC5pc0tleShldmVudCwgTWVkaXVtRWRpdG9yLnV0aWwua2V5Q29kZS5CQUNLU1BBQ0UpICYmXG4gICAgICAgICAgICAgICAgdGFnTmFtZSA9PT0gJ2xpJyAmJlxuICAgICAgICAgICAgICAgIC8vIGhpdHRpbmcgYmFja3NwYWNlIGluc2lkZSBhbiBlbXB0eSBsaVxuICAgICAgICAgICAgICAgIGlzRW1wdHkudGVzdChub2RlLmlubmVySFRNTCkgJiZcbiAgICAgICAgICAgICAgICAvLyBpcyBmaXJzdCBlbGVtZW50IChubyBwcmVjZWVkaW5nIHNpYmxpbmdzKVxuICAgICAgICAgICAgICAgICFub2RlLnByZXZpb3VzRWxlbWVudFNpYmxpbmcgJiZcbiAgICAgICAgICAgICAgICAvLyBwYXJlbnQgYWxzbyBkb2VzIG5vdCBoYXZlIGEgc2libGluZ1xuICAgICAgICAgICAgICAgICFub2RlLnBhcmVudEVsZW1lbnQucHJldmlvdXNFbGVtZW50U2libGluZyAmJlxuICAgICAgICAgICAgICAgIC8vIGlzIG5vdCB0aGUgb25seSBsaSBpbiBhIGxpc3RcbiAgICAgICAgICAgICAgICBub2RlLm5leHRFbGVtZW50U2libGluZyAmJlxuICAgICAgICAgICAgICAgIG5vZGUubmV4dEVsZW1lbnRTaWJsaW5nLm5vZGVOYW1lLnRvTG93ZXJDYXNlKCkgPT09ICdsaScpIHtcbiAgICAgICAgICAgIC8vIGJhY2tzcGFjaW5nIGluIGFuIGVtcHR5IGZpcnN0IGxpc3QgZWxlbWVudCBpbiB0aGUgZmlyc3QgbGlzdCAod2l0aCBtb3JlIGVsZW1lbnRzKSBleDpcbiAgICAgICAgICAgIC8vICA8dWw+PGxpPltDVVJTT1JdPC9saT48bGk+TGlzdCBJdGVtIDI8L2xpPjwvdWw+XG4gICAgICAgICAgICAvLyB3aWxsIHJlbW92ZSB0aGUgZmlyc3QgPGxpPiBidXQgYWRkIHNvbWUgZXh0cmEgZWxlbWVudCBiZWZvcmUgKHZhcmllcyBiYXNlZCBvbiBicm93c2VyKVxuICAgICAgICAgICAgLy8gSW5zdGVhZCwgdGhpcyB3aWxsOlxuICAgICAgICAgICAgLy8gMSkgcmVtb3ZlIHRoZSBsaXN0IGVsZW1lbnRcbiAgICAgICAgICAgIC8vIDIpIGNyZWF0ZSBhIHBhcmFncmFwaCBiZWZvcmUgdGhlIGxpc3RcbiAgICAgICAgICAgIC8vIDMpIG1vdmUgdGhlIGN1cnNvciBpbnRvIHRoZSBwYXJhZ3JhcGhcblxuICAgICAgICAgICAgLy8gY3JlYXRlIGEgcGFyYWdyYXBoIGJlZm9yZSB0aGUgbGlzdFxuICAgICAgICAgICAgcCA9IHRoaXMub3B0aW9ucy5vd25lckRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcbiAgICAgICAgICAgIHAuaW5uZXJIVE1MID0gJzxicj4nO1xuICAgICAgICAgICAgbm9kZS5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQuaW5zZXJ0QmVmb3JlKHAsIG5vZGUucGFyZW50RWxlbWVudCk7XG5cbiAgICAgICAgICAgIC8vIG1vdmUgdGhlIGN1cnNvciBpbnRvIHRoZSBuZXcgcGFyYWdyYXBoXG4gICAgICAgICAgICBNZWRpdW1FZGl0b3Iuc2VsZWN0aW9uLm1vdmVDdXJzb3IodGhpcy5vcHRpb25zLm93bmVyRG9jdW1lbnQsIHApO1xuXG4gICAgICAgICAgICAvLyByZW1vdmUgdGhlIGxpc3QgZWxlbWVudFxuICAgICAgICAgICAgbm9kZS5wYXJlbnRFbGVtZW50LnJlbW92ZUNoaWxkKG5vZGUpO1xuXG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB9IGVsc2UgaWYgKE1lZGl1bUVkaXRvci51dGlsLmlzS2V5KGV2ZW50LCBNZWRpdW1FZGl0b3IudXRpbC5rZXlDb2RlLkJBQ0tTUEFDRSkgJiZcbiAgICAgICAgICAgICAgICAoTWVkaXVtRWRpdG9yLnV0aWwuZ2V0Q2xvc2VzdFRhZyhub2RlLCAnYmxvY2txdW90ZScpICE9PSBmYWxzZSkgJiZcbiAgICAgICAgICAgICAgICBNZWRpdW1FZGl0b3Iuc2VsZWN0aW9uLmdldENhcmV0T2Zmc2V0cyhub2RlKS5sZWZ0ID09PSAwKSB7XG5cbiAgICAgICAgICAgIC8vIHdoZW4gY3Vyc29yIGlzIGF0IHRoZSBiZWdpbmluZyBvZiB0aGUgZWxlbWVudCBhbmQgdGhlIGVsZW1lbnQgaXMgPGJsb2NrcXVvdGU+XG4gICAgICAgICAgICAvLyB0aGVuIHByZXNzaW5nIGJhY2tzcGFjZSBrZXkgc2hvdWxkIGNoYW5nZSB0aGUgPGJsb2NrcXVvdGU+IHRvIGEgPHA+IHRhZ1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIE1lZGl1bUVkaXRvci51dGlsLmV4ZWNGb3JtYXRCbG9jayh0aGlzLm9wdGlvbnMub3duZXJEb2N1bWVudCwgJ3AnKTtcbiAgICAgICAgfSBlbHNlIGlmIChNZWRpdW1FZGl0b3IudXRpbC5pc0tleShldmVudCwgTWVkaXVtRWRpdG9yLnV0aWwua2V5Q29kZS5FTlRFUikgJiZcbiAgICAgICAgICAgICAgICAoTWVkaXVtRWRpdG9yLnV0aWwuZ2V0Q2xvc2VzdFRhZyhub2RlLCAnYmxvY2txdW90ZScpICE9PSBmYWxzZSkgJiZcbiAgICAgICAgICAgICAgICBNZWRpdW1FZGl0b3Iuc2VsZWN0aW9uLmdldENhcmV0T2Zmc2V0cyhub2RlKS5yaWdodCA9PT0gMCkge1xuXG4gICAgICAgICAgICAvLyB3aGVuIGN1cnNvciBpcyBhdCB0aGUgZW5kIG9mIDxibG9ja3F1b3RlPixcbiAgICAgICAgICAgIC8vIHRoZW4gcHJlc3NpbmcgZW50ZXIga2V5IHNob3VsZCBjcmVhdGUgPHA+IHRhZywgbm90IDxibG9ja3F1b3RlPlxuICAgICAgICAgICAgcCA9IHRoaXMub3B0aW9ucy5vd25lckRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcbiAgICAgICAgICAgIHAuaW5uZXJIVE1MID0gJzxicj4nO1xuICAgICAgICAgICAgbm9kZS5wYXJlbnRFbGVtZW50Lmluc2VydEJlZm9yZShwLCBub2RlLm5leHRTaWJsaW5nKTtcblxuICAgICAgICAgICAgLy8gbW92ZSB0aGUgY3Vyc29yIGludG8gdGhlIG5ldyBwYXJhZ3JhcGhcbiAgICAgICAgICAgIE1lZGl1bUVkaXRvci5zZWxlY3Rpb24ubW92ZUN1cnNvcih0aGlzLm9wdGlvbnMub3duZXJEb2N1bWVudCwgcCk7XG5cbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBoYW5kbGVLZXl1cChldmVudCkge1xuICAgICAgICB2YXIgbm9kZSA9IE1lZGl1bUVkaXRvci5zZWxlY3Rpb24uZ2V0U2VsZWN0aW9uU3RhcnQodGhpcy5vcHRpb25zLm93bmVyRG9jdW1lbnQpLFxuICAgICAgICAgICAgdGFnTmFtZTtcblxuICAgICAgICBpZiAoIW5vZGUpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS95YWJ3ZS9tZWRpdW0tZWRpdG9yL2lzc3Vlcy85OTRcbiAgICAgICAgLy8gRmlyZWZveCB0aHJvd24gYW4gZXJyb3Igd2hlbiBjYWxsaW5nIGBmb3JtYXRCbG9ja2Agb24gYW4gZW1wdHkgZWRpdGFibGUgYmxvY2tDb250YWluZXIgdGhhdCdzIG5vdCBhIDxkaXY+XG4gICAgICAgIGlmIChNZWRpdW1FZGl0b3IudXRpbC5pc01lZGl1bUVkaXRvckVsZW1lbnQobm9kZSkgJiYgbm9kZS5jaGlsZHJlbi5sZW5ndGggPT09IDAgJiYgIU1lZGl1bUVkaXRvci51dGlsLmlzQmxvY2tDb250YWluZXIobm9kZSkpIHtcbiAgICAgICAgICAgIHRoaXMub3B0aW9ucy5vd25lckRvY3VtZW50LmV4ZWNDb21tYW5kKCdmb3JtYXRCbG9jaycsIGZhbHNlLCAncCcpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gaHR0cHM6Ly9naXRodWIuY29tL3lhYndlL21lZGl1bS1lZGl0b3IvaXNzdWVzLzgzNFxuICAgICAgICAvLyBodHRwczovL2dpdGh1Yi5jb20veWFid2UvbWVkaXVtLWVkaXRvci9wdWxsLzM4MlxuICAgICAgICAvLyBEb24ndCBjYWxsIGZvcm1hdCBibG9jayBpZiB0aGlzIGlzIGEgYmxvY2sgZWxlbWVudCAoaWUgaDEsIGZpZ0NhcHRpb24sIGV0Yy4pXG4gICAgICAgIGlmIChNZWRpdW1FZGl0b3IudXRpbC5pc0tleShldmVudCwgTWVkaXVtRWRpdG9yLnV0aWwua2V5Q29kZS5FTlRFUikgJiZcbiAgICAgICAgICAgICFNZWRpdW1FZGl0b3IudXRpbC5pc0xpc3RJdGVtKG5vZGUpICYmXG4gICAgICAgICAgICAhTWVkaXVtRWRpdG9yLnV0aWwuaXNCbG9ja0NvbnRhaW5lcihub2RlKSkge1xuXG4gICAgICAgICAgICB0YWdOYW1lID0gbm9kZS5ub2RlTmFtZS50b0xvd2VyQ2FzZSgpO1xuICAgICAgICAgICAgLy8gRm9yIGFuY2hvciB0YWdzLCB1bmxpbmtcbiAgICAgICAgICAgIGlmICh0YWdOYW1lID09PSAnYScpIHtcbiAgICAgICAgICAgICAgICB0aGlzLm9wdGlvbnMub3duZXJEb2N1bWVudC5leGVjQ29tbWFuZCgndW5saW5rJywgZmFsc2UsIG51bGwpO1xuICAgICAgICAgICAgfSBlbHNlIGlmICghZXZlbnQuc2hpZnRLZXkgJiYgIWV2ZW50LmN0cmxLZXkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLm9wdGlvbnMub3duZXJEb2N1bWVudC5leGVjQ29tbWFuZCgnZm9ybWF0QmxvY2snLCBmYWxzZSwgJ3AnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGhhbmRsZUVkaXRhYmxlSW5wdXQoZXZlbnQsIGVkaXRhYmxlKSB7XG4gICAgICAgIHZhciB0ZXh0YXJlYSA9IGVkaXRhYmxlLnBhcmVudE5vZGUucXVlcnlTZWxlY3RvcigndGV4dGFyZWFbbWVkaXVtLWVkaXRvci10ZXh0YXJlYS1pZD1cIicgKyBlZGl0YWJsZS5nZXRBdHRyaWJ1dGUoJ21lZGl1bS1lZGl0b3ItdGV4dGFyZWEtaWQnKSArICdcIl0nKTtcbiAgICAgICAgaWYgKHRleHRhcmVhKSB7XG4gICAgICAgICAgICB0ZXh0YXJlYS52YWx1ZSA9IGVkaXRhYmxlLmlubmVySFRNTC50cmltKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBJbnRlcm5hbCBoZWxwZXIgbWV0aG9kcyB3aGljaCBzaG91bGRuJ3QgYmUgZXhwb3NlZCBleHRlcm5hbGx5XG5cbiAgICBmdW5jdGlvbiBhZGRUb0VkaXRvcnMod2luKSB7XG4gICAgICAgIGlmICghd2luLl9tZWRpdW1FZGl0b3JzKSB7XG4gICAgICAgICAgICAvLyBUbyBhdm9pZCBicmVha2luZyB1c2VycyB3aG8gYXJlIGFzc3VtaW5nIHRoYXQgdGhlIHVuaXF1ZSBpZCBvblxuICAgICAgICAgICAgLy8gbWVkaXVtLWVkaXRvciBlbGVtZW50cyB3aWxsIHN0YXJ0IGF0IDEsIGluc2VydGluZyBhICdudWxsJyBpbiB0aGVcbiAgICAgICAgICAgIC8vIGFycmF5IHNvIHRoZSB1bmlxdWUtaWQgY2FuIGFsd2F5cyBtYXAgdG8gdGhlIGluZGV4IG9mIHRoZSBlZGl0b3IgaW5zdGFuY2VcbiAgICAgICAgICAgIHdpbi5fbWVkaXVtRWRpdG9ycyA9IFtudWxsXTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIElmIHRoaXMgYWxyZWFkeSBoYXMgYSB1bmlxdWUgaWQsIHJlLXVzZSBpdFxuICAgICAgICBpZiAoIXRoaXMuaWQpIHtcbiAgICAgICAgICAgIHRoaXMuaWQgPSB3aW4uX21lZGl1bUVkaXRvcnMubGVuZ3RoO1xuICAgICAgICB9XG5cbiAgICAgICAgd2luLl9tZWRpdW1FZGl0b3JzW3RoaXMuaWRdID0gdGhpcztcbiAgICB9XG5cbiAgICBmdW5jdGlvbiByZW1vdmVGcm9tRWRpdG9ycyh3aW4pIHtcbiAgICAgICAgaWYgKCF3aW4uX21lZGl1bUVkaXRvcnMgfHwgIXdpbi5fbWVkaXVtRWRpdG9yc1t0aGlzLmlkXSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgLyogU2V0dGluZyB0aGUgaW5zdGFuY2UgdG8gbnVsbCBpbiB0aGUgYXJyYXkgaW5zdGVhZCBvZiBkZWxldGluZyBpdCBhbGxvd3M6XG4gICAgICAgICAqIDEpIEVhY2ggaW5zdGFuY2UgdG8gcHJlc2VydmUgaXRzIG93biB1bmlxdWUtaWQsIGV2ZW4gYWZ0ZXIgYmVpbmcgZGVzdHJveWVkXG4gICAgICAgICAqICAgIGFuZCBpbml0aWFsaXplZCBhZ2FpblxuICAgICAgICAgKiAyKSBUaGUgdW5pcXVlLWlkIHRvIGFsd2F5cyBjb3JyZXNwb25kIHRvIGFuIGluZGV4IGluIHRoZSBhcnJheSBvZiBtZWRpdW0tZWRpdG9yXG4gICAgICAgICAqICAgIGluc3RhbmNlcy4gVGh1cywgd2Ugd2lsbCBiZSBhYmxlIHRvIGxvb2sgYXQgYSBjb250ZW50ZWRpdGFibGUsIGFuZCBkZXRlcm1pbmVcbiAgICAgICAgICogICAgd2hpY2ggaW5zdGFuY2UgaXQgYmVsb25ncyB0bywgYnkgaW5kZXhpbmcgaW50byB0aGUgZ2xvYmFsIGFycmF5LlxuICAgICAgICAgKi9cbiAgICAgICAgd2luLl9tZWRpdW1FZGl0b3JzW3RoaXMuaWRdID0gbnVsbDtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjcmVhdGVFbGVtZW50c0FycmF5KHNlbGVjdG9yLCBkb2MsIGZpbHRlckVkaXRvckVsZW1lbnRzKSB7XG4gICAgICAgIHZhciBlbGVtZW50cyA9IFtdO1xuXG4gICAgICAgIGlmICghc2VsZWN0b3IpIHtcbiAgICAgICAgICAgIHNlbGVjdG9yID0gW107XG4gICAgICAgIH1cbiAgICAgICAgLy8gSWYgc3RyaW5nLCB1c2UgYXMgcXVlcnkgc2VsZWN0b3JcbiAgICAgICAgaWYgKHR5cGVvZiBzZWxlY3RvciA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIHNlbGVjdG9yID0gZG9jLnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IpO1xuICAgICAgICB9XG4gICAgICAgIC8vIElmIGVsZW1lbnQsIHB1dCBpbnRvIGFycmF5XG4gICAgICAgIGlmIChNZWRpdW1FZGl0b3IudXRpbC5pc0VsZW1lbnQoc2VsZWN0b3IpKSB7XG4gICAgICAgICAgICBzZWxlY3RvciA9IFtzZWxlY3Rvcl07XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZmlsdGVyRWRpdG9yRWxlbWVudHMpIHtcbiAgICAgICAgICAgIC8vIFJlbW92ZSBlbGVtZW50cyB0aGF0IGhhdmUgYWxyZWFkeSBiZWVuIGluaXRpYWxpemVkIGJ5IHRoZSBlZGl0b3JcbiAgICAgICAgICAgIC8vIHNlbGVjb3RyIG1pZ2h0IG5vdCBiZSBhbiBhcnJheSAoaWUgTm9kZUxpc3QpIHNvIHVzZSBmb3IgbG9vcFxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzZWxlY3Rvci5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIHZhciBlbCA9IHNlbGVjdG9yW2ldO1xuICAgICAgICAgICAgICAgIGlmIChNZWRpdW1FZGl0b3IudXRpbC5pc0VsZW1lbnQoZWwpICYmXG4gICAgICAgICAgICAgICAgICAgICFlbC5nZXRBdHRyaWJ1dGUoJ2RhdGEtbWVkaXVtLWVkaXRvci1lbGVtZW50JykgJiZcbiAgICAgICAgICAgICAgICAgICAgIWVsLmdldEF0dHJpYnV0ZSgnbWVkaXVtLWVkaXRvci10ZXh0YXJlYS1pZCcpKSB7XG4gICAgICAgICAgICAgICAgICAgIGVsZW1lbnRzLnB1c2goZWwpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIENvbnZlcnQgTm9kZUxpc3QgKG9yIG90aGVyIGFycmF5IGxpa2Ugb2JqZWN0KSBpbnRvIGFuIGFycmF5XG4gICAgICAgICAgICBlbGVtZW50cyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5hcHBseShzZWxlY3Rvcik7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZWxlbWVudHM7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY2xlYW51cFRleHRhcmVhRWxlbWVudChlbGVtZW50KSB7XG4gICAgICAgIHZhciB0ZXh0YXJlYSA9IGVsZW1lbnQucGFyZW50Tm9kZS5xdWVyeVNlbGVjdG9yKCd0ZXh0YXJlYVttZWRpdW0tZWRpdG9yLXRleHRhcmVhLWlkPVwiJyArIGVsZW1lbnQuZ2V0QXR0cmlidXRlKCdtZWRpdW0tZWRpdG9yLXRleHRhcmVhLWlkJykgKyAnXCJdJyk7XG4gICAgICAgIGlmICh0ZXh0YXJlYSkge1xuICAgICAgICAgICAgLy8gVW4taGlkZSB0aGUgdGV4dGFyZWFcbiAgICAgICAgICAgIHRleHRhcmVhLmNsYXNzTGlzdC5yZW1vdmUoJ21lZGl1bS1lZGl0b3ItaGlkZGVuJyk7XG4gICAgICAgICAgICB0ZXh0YXJlYS5yZW1vdmVBdHRyaWJ1dGUoJ21lZGl1bS1lZGl0b3ItdGV4dGFyZWEtaWQnKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZWxlbWVudC5wYXJlbnROb2RlKSB7XG4gICAgICAgICAgICBlbGVtZW50LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoZWxlbWVudCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBzZXRFeHRlbnNpb25EZWZhdWx0cyhleHRlbnNpb24sIGRlZmF1bHRzKSB7XG4gICAgICAgIE9iamVjdC5rZXlzKGRlZmF1bHRzKS5mb3JFYWNoKGZ1bmN0aW9uIChwcm9wKSB7XG4gICAgICAgICAgICBpZiAoZXh0ZW5zaW9uW3Byb3BdID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICBleHRlbnNpb25bcHJvcF0gPSBkZWZhdWx0c1twcm9wXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBleHRlbnNpb247XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaW5pdEV4dGVuc2lvbihleHRlbnNpb24sIG5hbWUsIGluc3RhbmNlKSB7XG4gICAgICAgIHZhciBleHRlbnNpb25EZWZhdWx0cyA9IHtcbiAgICAgICAgICAgICd3aW5kb3cnOiBpbnN0YW5jZS5vcHRpb25zLmNvbnRlbnRXaW5kb3csXG4gICAgICAgICAgICAnZG9jdW1lbnQnOiBpbnN0YW5jZS5vcHRpb25zLm93bmVyRG9jdW1lbnQsXG4gICAgICAgICAgICAnYmFzZSc6IGluc3RhbmNlXG4gICAgICAgIH07XG5cbiAgICAgICAgLy8gQWRkIGRlZmF1bHQgb3B0aW9ucyBpbnRvIHRoZSBleHRlbnNpb25cbiAgICAgICAgZXh0ZW5zaW9uID0gc2V0RXh0ZW5zaW9uRGVmYXVsdHMoZXh0ZW5zaW9uLCBleHRlbnNpb25EZWZhdWx0cyk7XG5cbiAgICAgICAgLy8gQ2FsbCBpbml0IG9uIHRoZSBleHRlbnNpb25cbiAgICAgICAgaWYgKHR5cGVvZiBleHRlbnNpb24uaW5pdCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgZXh0ZW5zaW9uLmluaXQoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFNldCBleHRlbnNpb24gbmFtZSAoaWYgbm90IGFscmVhZHkgc2V0KVxuICAgICAgICBpZiAoIWV4dGVuc2lvbi5uYW1lKSB7XG4gICAgICAgICAgICBleHRlbnNpb24ubmFtZSA9IG5hbWU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGV4dGVuc2lvbjtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBpc1Rvb2xiYXJFbmFibGVkKCkge1xuICAgICAgICAvLyBJZiBhbnkgb2YgdGhlIGVsZW1lbnRzIGRvbid0IGhhdmUgdGhlIHRvb2xiYXIgZGlzYWJsZWRcbiAgICAgICAgLy8gV2UgbmVlZCBhIHRvb2xiYXJcbiAgICAgICAgaWYgKHRoaXMuZWxlbWVudHMuZXZlcnkoZnVuY3Rpb24gKGVsZW1lbnQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gISFlbGVtZW50LmdldEF0dHJpYnV0ZSgnZGF0YS1kaXNhYmxlLXRvb2xiYXInKTtcbiAgICAgICAgICAgIH0pKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGhpcy5vcHRpb25zLnRvb2xiYXIgIT09IGZhbHNlO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGlzQW5jaG9yUHJldmlld0VuYWJsZWQoKSB7XG4gICAgICAgIC8vIElmIHRvb2xiYXIgaXMgZGlzYWJsZWQsIGRvbid0IGFkZFxuICAgICAgICBpZiAoIWlzVG9vbGJhckVuYWJsZWQuY2FsbCh0aGlzKSkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXMub3B0aW9ucy5hbmNob3JQcmV2aWV3ICE9PSBmYWxzZTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBpc1BsYWNlaG9sZGVyRW5hYmxlZCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMub3B0aW9ucy5wbGFjZWhvbGRlciAhPT0gZmFsc2U7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaXNBdXRvTGlua0VuYWJsZWQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm9wdGlvbnMuYXV0b0xpbmsgIT09IGZhbHNlO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGlzSW1hZ2VEcmFnZ2luZ0VuYWJsZWQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm9wdGlvbnMuaW1hZ2VEcmFnZ2luZyAhPT0gZmFsc2U7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaXNLZXlib2FyZENvbW1hbmRzRW5hYmxlZCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMub3B0aW9ucy5rZXlib2FyZENvbW1hbmRzICE9PSBmYWxzZTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBzaG91bGRVc2VGaWxlRHJhZ2dpbmdFeHRlbnNpb24oKSB7XG4gICAgICAgIC8vIFNpbmNlIHRoZSBmaWxlLWRyYWdnaW5nIGV4dGVuc2lvbiByZXBsYWNlcyB0aGUgaW1hZ2UtZHJhZ2dpbmcgZXh0ZW5zaW9uLFxuICAgICAgICAvLyB3ZSBuZWVkIHRvIGNoZWNrIGlmIHRoZSB1c2VyIHBhc3NlZCBhbiBvdmVycmlkZWQgaW1hZ2UtZHJhZ2dpbmcgZXh0ZW5zaW9uLlxuICAgICAgICAvLyBJZiB0aGV5IGhhdmUsIHRvIGF2b2lkIGJyZWFraW5nIHVzZXJzLCB3ZSB3b24ndCB1c2UgZmlsZS1kcmFnZ2luZyBleHRlbnNpb24uXG4gICAgICAgIHJldHVybiAhdGhpcy5vcHRpb25zLmV4dGVuc2lvbnNbJ2ltYWdlRHJhZ2dpbmcnXTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjcmVhdGVDb250ZW50RWRpdGFibGUodGV4dGFyZWEpIHtcbiAgICAgICAgdmFyIGRpdiA9IHRoaXMub3B0aW9ucy5vd25lckRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpLFxuICAgICAgICAgICAgbm93ID0gRGF0ZS5ub3coKSxcbiAgICAgICAgICAgIHVuaXF1ZUlkID0gJ21lZGl1bS1lZGl0b3ItJyArIG5vdyxcbiAgICAgICAgICAgIGF0dHMgPSB0ZXh0YXJlYS5hdHRyaWJ1dGVzO1xuXG4gICAgICAgIC8vIFNvbWUgYnJvd3NlcnMgY2FuIG1vdmUgcHJldHR5IGZhc3QsIHNpbmNlIHdlJ3JlIHVzaW5nIGEgdGltZXN0YW1wXG4gICAgICAgIC8vIHRvIG1ha2UgYSB1bmlxdWUtaWQsIGVuc3VyZSB0aGF0IHRoZSBpZCBpcyBhY3R1YWxseSB1bmlxdWUgb24gdGhlIHBhZ2VcbiAgICAgICAgd2hpbGUgKHRoaXMub3B0aW9ucy5vd25lckRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHVuaXF1ZUlkKSkge1xuICAgICAgICAgICAgbm93Kys7XG4gICAgICAgICAgICB1bmlxdWVJZCA9ICdtZWRpdW0tZWRpdG9yLScgKyBub3c7XG4gICAgICAgIH1cblxuICAgICAgICBkaXYuY2xhc3NOYW1lID0gdGV4dGFyZWEuY2xhc3NOYW1lO1xuICAgICAgICBkaXYuaWQgPSB1bmlxdWVJZDtcbiAgICAgICAgZGl2LmlubmVySFRNTCA9IHRleHRhcmVhLnZhbHVlO1xuXG4gICAgICAgIHRleHRhcmVhLnNldEF0dHJpYnV0ZSgnbWVkaXVtLWVkaXRvci10ZXh0YXJlYS1pZCcsIHVuaXF1ZUlkKTtcblxuICAgICAgICAvLyByZS1jcmVhdGUgYWxsIGF0dHJpYnV0ZXMgZnJvbSB0aGUgdGV4dGVhcmVhIHRvIHRoZSBuZXcgY3JlYXRlZCBkaXZcbiAgICAgICAgZm9yICh2YXIgaSA9IDAsIG4gPSBhdHRzLmxlbmd0aDsgaSA8IG47IGkrKykge1xuICAgICAgICAgICAgLy8gZG8gbm90IHJlLWNyZWF0ZSBleGlzdGluZyBhdHRyaWJ1dGVzXG4gICAgICAgICAgICBpZiAoIWRpdi5oYXNBdHRyaWJ1dGUoYXR0c1tpXS5ub2RlTmFtZSkpIHtcbiAgICAgICAgICAgICAgICBkaXYuc2V0QXR0cmlidXRlKGF0dHNbaV0ubm9kZU5hbWUsIGF0dHNbaV0ubm9kZVZhbHVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIElmIHRleHRhcmVhIGhhcyBhIGZvcm0sIGxpc3RlbiBmb3IgcmVzZXQgb24gdGhlIGZvcm0gdG8gY2xlYXJcbiAgICAgICAgLy8gdGhlIGNvbnRlbnQgb2YgdGhlIGNyZWF0ZWQgZGl2XG4gICAgICAgIGlmICh0ZXh0YXJlYS5mb3JtKSB7XG4gICAgICAgICAgICB0aGlzLm9uKHRleHRhcmVhLmZvcm0sICdyZXNldCcsIGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICAgICAgICAgIGlmICghZXZlbnQuZGVmYXVsdFByZXZlbnRlZCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlc2V0Q29udGVudCh0aGlzLm9wdGlvbnMub3duZXJEb2N1bWVudC5nZXRFbGVtZW50QnlJZCh1bmlxdWVJZCkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0uYmluZCh0aGlzKSk7XG4gICAgICAgIH1cblxuICAgICAgICB0ZXh0YXJlYS5jbGFzc0xpc3QuYWRkKCdtZWRpdW0tZWRpdG9yLWhpZGRlbicpO1xuICAgICAgICB0ZXh0YXJlYS5wYXJlbnROb2RlLmluc2VydEJlZm9yZShcbiAgICAgICAgICAgIGRpdixcbiAgICAgICAgICAgIHRleHRhcmVhXG4gICAgICAgICk7XG5cbiAgICAgICAgcmV0dXJuIGRpdjtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBpbml0RWxlbWVudChlbGVtZW50LCBlZGl0b3JJZCkge1xuICAgICAgICBpZiAoIWVsZW1lbnQuZ2V0QXR0cmlidXRlKCdkYXRhLW1lZGl1bS1lZGl0b3ItZWxlbWVudCcpKSB7XG4gICAgICAgICAgICBpZiAoZWxlbWVudC5ub2RlTmFtZS50b0xvd2VyQ2FzZSgpID09PSAndGV4dGFyZWEnKSB7XG4gICAgICAgICAgICAgICAgZWxlbWVudCA9IGNyZWF0ZUNvbnRlbnRFZGl0YWJsZS5jYWxsKHRoaXMsIGVsZW1lbnQpO1xuXG4gICAgICAgICAgICAgICAgLy8gTWFrZSBzdXJlIHdlIG9ubHkgYXR0YWNoIHRvIGVkaXRhYmxlSW5wdXQgb25jZSBmb3IgPHRleHRhcmVhPiBlbGVtZW50c1xuICAgICAgICAgICAgICAgIGlmICghdGhpcy5pbnN0YW5jZUhhbmRsZUVkaXRhYmxlSW5wdXQpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pbnN0YW5jZUhhbmRsZUVkaXRhYmxlSW5wdXQgPSBoYW5kbGVFZGl0YWJsZUlucHV0LmJpbmQodGhpcyk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3Vic2NyaWJlKCdlZGl0YWJsZUlucHV0JywgdGhpcy5pbnN0YW5jZUhhbmRsZUVkaXRhYmxlSW5wdXQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKCF0aGlzLm9wdGlvbnMuZGlzYWJsZUVkaXRpbmcgJiYgIWVsZW1lbnQuZ2V0QXR0cmlidXRlKCdkYXRhLWRpc2FibGUtZWRpdGluZycpKSB7XG4gICAgICAgICAgICAgICAgZWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2NvbnRlbnRFZGl0YWJsZScsIHRydWUpO1xuICAgICAgICAgICAgICAgIGVsZW1lbnQuc2V0QXR0cmlidXRlKCdzcGVsbGNoZWNrJywgdGhpcy5vcHRpb25zLnNwZWxsY2hlY2spO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBNYWtlIHN1cmUgd2Ugb25seSBhdHRhY2ggdG8gZWRpdGFibGVLZXlkb3duRW50ZXIgb25jZSBmb3IgZGlzYWJsZS1yZXR1cm4gb3B0aW9uc1xuICAgICAgICAgICAgaWYgKCF0aGlzLmluc3RhbmNlSGFuZGxlRWRpdGFibGVLZXlkb3duRW50ZXIpIHtcbiAgICAgICAgICAgICAgICBpZiAoZWxlbWVudC5nZXRBdHRyaWJ1dGUoJ2RhdGEtZGlzYWJsZS1yZXR1cm4nKSB8fCBlbGVtZW50LmdldEF0dHJpYnV0ZSgnZGF0YS1kaXNhYmxlLWRvdWJsZS1yZXR1cm4nKSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmluc3RhbmNlSGFuZGxlRWRpdGFibGVLZXlkb3duRW50ZXIgPSBoYW5kbGVEaXNhYmxlZEVudGVyS2V5ZG93bi5iaW5kKHRoaXMpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnN1YnNjcmliZSgnZWRpdGFibGVLZXlkb3duRW50ZXInLCB0aGlzLmluc3RhbmNlSGFuZGxlRWRpdGFibGVLZXlkb3duRW50ZXIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gaWYgd2UncmUgbm90IGRpc2FibGluZyByZXR1cm4sIGFkZCBhIGhhbmRsZXIgdG8gaGVscCBoYW5kbGUgY2xlYW51cFxuICAgICAgICAgICAgLy8gZm9yIGNlcnRhaW4gY2FzZXMgd2hlbiBlbnRlciBpcyBwcmVzc2VkXG4gICAgICAgICAgICBpZiAoIXRoaXMub3B0aW9ucy5kaXNhYmxlUmV0dXJuICYmICFlbGVtZW50LmdldEF0dHJpYnV0ZSgnZGF0YS1kaXNhYmxlLXJldHVybicpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5vbihlbGVtZW50LCAna2V5dXAnLCBoYW5kbGVLZXl1cC5iaW5kKHRoaXMpKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdmFyIGVsZW1lbnRJZCA9IE1lZGl1bUVkaXRvci51dGlsLmd1aWQoKTtcblxuICAgICAgICAgICAgZWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2RhdGEtbWVkaXVtLWVkaXRvci1lbGVtZW50JywgdHJ1ZSk7XG4gICAgICAgICAgICBlbGVtZW50LmNsYXNzTGlzdC5hZGQoJ21lZGl1bS1lZGl0b3ItZWxlbWVudCcpO1xuICAgICAgICAgICAgZWxlbWVudC5zZXRBdHRyaWJ1dGUoJ3JvbGUnLCAndGV4dGJveCcpO1xuICAgICAgICAgICAgZWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2FyaWEtbXVsdGlsaW5lJywgdHJ1ZSk7XG4gICAgICAgICAgICBlbGVtZW50LnNldEF0dHJpYnV0ZSgnZGF0YS1tZWRpdW0tZWRpdG9yLWVkaXRvci1pbmRleCcsIGVkaXRvcklkKTtcbiAgICAgICAgICAgIC8vIFRPRE86IE1lcmdlIGRhdGEtbWVkaXVtLWVkaXRvci1lbGVtZW50IGFuZCBtZWRpdW0tZWRpdG9yLWluZGV4IGF0dHJpYnV0ZXMgZm9yIDYuMC4wXG4gICAgICAgICAgICAvLyBtZWRpdW0tZWRpdG9yLWluZGV4IGlzIG5vdCBuYW1lZCBjb3JyZWN0bHkgYW55bW9yZSBhbmQgY2FuIGJlIHJlLXB1cnBvc2VkIHRvIHNpZ25pZnlcbiAgICAgICAgICAgIC8vIHdoZXRoZXIgdGhlIGVsZW1lbnQgaGFzIGJlZW4gaW5pdGlhbGl6ZWQgb3Igbm90XG4gICAgICAgICAgICBlbGVtZW50LnNldEF0dHJpYnV0ZSgnbWVkaXVtLWVkaXRvci1pbmRleCcsIGVsZW1lbnRJZCk7XG4gICAgICAgICAgICBpbml0aWFsQ29udGVudFtlbGVtZW50SWRdID0gZWxlbWVudC5pbm5lckhUTUw7XG5cbiAgICAgICAgICAgIHRoaXMuZXZlbnRzLmF0dGFjaEFsbEV2ZW50c1RvRWxlbWVudChlbGVtZW50KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBlbGVtZW50O1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGF0dGFjaEhhbmRsZXJzKCkge1xuICAgICAgICAvLyBhdHRhY2ggdG8gdGFic1xuICAgICAgICB0aGlzLnN1YnNjcmliZSgnZWRpdGFibGVLZXlkb3duVGFiJywgaGFuZGxlVGFiS2V5ZG93bi5iaW5kKHRoaXMpKTtcblxuICAgICAgICAvLyBCaW5kIGtleXMgd2hpY2ggY2FuIGNyZWF0ZSBvciBkZXN0cm95IGEgYmxvY2sgZWxlbWVudDogYmFja3NwYWNlLCBkZWxldGUsIHJldHVyblxuICAgICAgICB0aGlzLnN1YnNjcmliZSgnZWRpdGFibGVLZXlkb3duRGVsZXRlJywgaGFuZGxlQmxvY2tEZWxldGVLZXlkb3ducy5iaW5kKHRoaXMpKTtcbiAgICAgICAgdGhpcy5zdWJzY3JpYmUoJ2VkaXRhYmxlS2V5ZG93bkVudGVyJywgaGFuZGxlQmxvY2tEZWxldGVLZXlkb3ducy5iaW5kKHRoaXMpKTtcblxuICAgICAgICAvLyBCaW5kIGRvdWJsZSBzcGFjZSBldmVudFxuICAgICAgICBpZiAodGhpcy5vcHRpb25zLmRpc2FibGVFeHRyYVNwYWNlcykge1xuICAgICAgICAgICAgdGhpcy5zdWJzY3JpYmUoJ2VkaXRhYmxlS2V5ZG93blNwYWNlJywgaGFuZGxlRGlzYWJsZUV4dHJhU3BhY2VzLmJpbmQodGhpcykpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gTWFrZSBzdXJlIHdlIG9ubHkgYXR0YWNoIHRvIGVkaXRhYmxlS2V5ZG93bkVudGVyIG9uY2UgZm9yIGRpc2FibGUtcmV0dXJuIG9wdGlvbnNcbiAgICAgICAgaWYgKCF0aGlzLmluc3RhbmNlSGFuZGxlRWRpdGFibGVLZXlkb3duRW50ZXIpIHtcbiAgICAgICAgICAgIC8vIGRpc2FibGluZyByZXR1cm4gb3IgZG91YmxlIHJldHVyblxuICAgICAgICAgICAgaWYgKHRoaXMub3B0aW9ucy5kaXNhYmxlUmV0dXJuIHx8IHRoaXMub3B0aW9ucy5kaXNhYmxlRG91YmxlUmV0dXJuKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5pbnN0YW5jZUhhbmRsZUVkaXRhYmxlS2V5ZG93bkVudGVyID0gaGFuZGxlRGlzYWJsZWRFbnRlcktleWRvd24uYmluZCh0aGlzKTtcbiAgICAgICAgICAgICAgICB0aGlzLnN1YnNjcmliZSgnZWRpdGFibGVLZXlkb3duRW50ZXInLCB0aGlzLmluc3RhbmNlSGFuZGxlRWRpdGFibGVLZXlkb3duRW50ZXIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaW5pdEV4dGVuc2lvbnMoKSB7XG5cbiAgICAgICAgdGhpcy5leHRlbnNpb25zID0gW107XG5cbiAgICAgICAgLy8gUGFzc2VkIGluIGV4dGVuc2lvbnNcbiAgICAgICAgT2JqZWN0LmtleXModGhpcy5vcHRpb25zLmV4dGVuc2lvbnMpLmZvckVhY2goZnVuY3Rpb24gKG5hbWUpIHtcbiAgICAgICAgICAgIC8vIEFsd2F5cyBzYXZlIHRoZSB0b29sYmFyIGV4dGVuc2lvbiBmb3IgbGFzdFxuICAgICAgICAgICAgaWYgKG5hbWUgIT09ICd0b29sYmFyJyAmJiB0aGlzLm9wdGlvbnMuZXh0ZW5zaW9uc1tuYW1lXSkge1xuICAgICAgICAgICAgICAgIHRoaXMuZXh0ZW5zaW9ucy5wdXNoKGluaXRFeHRlbnNpb24odGhpcy5vcHRpb25zLmV4dGVuc2lvbnNbbmFtZV0sIG5hbWUsIHRoaXMpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwgdGhpcyk7XG5cbiAgICAgICAgLy8gNCBDYXNlcyBmb3IgaW1hZ2VEcmFnZ2luZyArIGZpbGVEcmFnZ2luZyBleHRlbnNvbnM6XG4gICAgICAgIC8vXG4gICAgICAgIC8vIDEuIEltYWdlRHJhZ2dpbmcgT04gKyBObyBDdXN0b20gSW1hZ2UgRHJhZ2dpbmcgRXh0ZW5zaW9uOlxuICAgICAgICAvLyAgICAqIFVzZSBmaWxlRHJhZ2dpbmcgZXh0ZW5zaW9uIChkZWZhdWx0IG9wdGlvbnMpXG4gICAgICAgIC8vIDIuIEltYWdlRHJhZ2dpbmcgT0ZGICsgTm8gQ3VzdG9tIEltYWdlIERyYWdnaW5nIEV4dGVuc2lvbjpcbiAgICAgICAgLy8gICAgKiBVc2UgZmlsZURyYWdnaW5nIGV4dGVuc2lvbiB3LyBpbWFnZXMgdHVybmVkIG9mZlxuICAgICAgICAvLyAzLiBJbWFnZURyYWdnaW5nIE9OICsgQ3VzdG9tIEltYWdlIERyYWdnaW5nIEV4dGVuc2lvbjpcbiAgICAgICAgLy8gICAgKiBEb24ndCB1c2UgZmlsZURyYWdnaW5nIChjb3VsZCBpbnRlcmZlcmUgd2l0aCBjdXN0b20gaW1hZ2UgZHJhZ2dpbmcgZXh0ZW5zaW9uKVxuICAgICAgICAvLyA0LiBJbWFnZURyYWdnaW5nIE9GRiArIEN1c3RvbSBJbWFnZSBEcmFnZ2luZzpcbiAgICAgICAgLy8gICAgKiBEb24ndCB1c2UgZmlsZURyYWdnaW5nIChjb3VsZCBpbnRlcmZlcmUgd2l0aCBjdXN0b20gaW1hZ2UgZHJhZ2dpbmcgZXh0ZW5zaW9uKVxuICAgICAgICBpZiAoc2hvdWxkVXNlRmlsZURyYWdnaW5nRXh0ZW5zaW9uLmNhbGwodGhpcykpIHtcbiAgICAgICAgICAgIHZhciBvcHRzID0gdGhpcy5vcHRpb25zLmZpbGVEcmFnZ2luZztcbiAgICAgICAgICAgIGlmICghb3B0cykge1xuICAgICAgICAgICAgICAgIG9wdHMgPSB7fTtcblxuICAgICAgICAgICAgICAgIC8vIEltYWdlIGlzIGluIHRoZSAnYWxsb3dlZFR5cGVzJyBsaXN0IGJ5IGRlZmF1bHQuXG4gICAgICAgICAgICAgICAgLy8gSWYgaW1hZ2VEcmFnZ2luZyBpcyBvZmYgb3ZlcnJpZGUgdGhlICdhbGxvd2VkVHlwZXMnIGxpc3Qgd2l0aCBhbiBlbXB0eSBvbmVcbiAgICAgICAgICAgICAgICBpZiAoIWlzSW1hZ2VEcmFnZ2luZ0VuYWJsZWQuY2FsbCh0aGlzKSkge1xuICAgICAgICAgICAgICAgICAgICBvcHRzLmFsbG93ZWRUeXBlcyA9IFtdO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuYWRkQnVpbHRJbkV4dGVuc2lvbignZmlsZURyYWdnaW5nJywgb3B0cyk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBCdWlsdC1pbiBleHRlbnNpb25zXG4gICAgICAgIHZhciBidWlsdElucyA9IHtcbiAgICAgICAgICAgIHBhc3RlOiB0cnVlLFxuICAgICAgICAgICAgJ2FuY2hvci1wcmV2aWV3JzogaXNBbmNob3JQcmV2aWV3RW5hYmxlZC5jYWxsKHRoaXMpLFxuICAgICAgICAgICAgYXV0b0xpbms6IGlzQXV0b0xpbmtFbmFibGVkLmNhbGwodGhpcyksXG4gICAgICAgICAgICBrZXlib2FyZENvbW1hbmRzOiBpc0tleWJvYXJkQ29tbWFuZHNFbmFibGVkLmNhbGwodGhpcyksXG4gICAgICAgICAgICBwbGFjZWhvbGRlcjogaXNQbGFjZWhvbGRlckVuYWJsZWQuY2FsbCh0aGlzKVxuICAgICAgICB9O1xuICAgICAgICBPYmplY3Qua2V5cyhidWlsdElucykuZm9yRWFjaChmdW5jdGlvbiAobmFtZSkge1xuICAgICAgICAgICAgaWYgKGJ1aWx0SW5zW25hbWVdKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5hZGRCdWlsdEluRXh0ZW5zaW9uKG5hbWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LCB0aGlzKTtcblxuICAgICAgICAvLyBVc2VycyBjYW4gcGFzcyBpbiBhIGN1c3RvbSB0b29sYmFyIGV4dGVuc2lvblxuICAgICAgICAvLyBzbyBjaGVjayBmb3IgdGhhdCBmaXJzdCBhbmQgaWYgaXQncyBub3QgcHJlc2VudFxuICAgICAgICAvLyBqdXN0IGNyZWF0ZSB0aGUgZGVmYXVsdCB0b29sYmFyXG4gICAgICAgIHZhciB0b29sYmFyRXh0ZW5zaW9uID0gdGhpcy5vcHRpb25zLmV4dGVuc2lvbnNbJ3Rvb2xiYXInXTtcbiAgICAgICAgaWYgKCF0b29sYmFyRXh0ZW5zaW9uICYmIGlzVG9vbGJhckVuYWJsZWQuY2FsbCh0aGlzKSkge1xuICAgICAgICAgICAgLy8gQmFja3dhcmRzIGNvbXBhdGFiaWxpdHlcbiAgICAgICAgICAgIHZhciB0b29sYmFyT3B0aW9ucyA9IE1lZGl1bUVkaXRvci51dGlsLmV4dGVuZCh7fSwgdGhpcy5vcHRpb25zLnRvb2xiYXIsIHtcbiAgICAgICAgICAgICAgICBhbGxvd011bHRpUGFyYWdyYXBoU2VsZWN0aW9uOiB0aGlzLm9wdGlvbnMuYWxsb3dNdWx0aVBhcmFncmFwaFNlbGVjdGlvbiAvLyBkZXByZWNhdGVkXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHRvb2xiYXJFeHRlbnNpb24gPSBuZXcgTWVkaXVtRWRpdG9yLmV4dGVuc2lvbnMudG9vbGJhcih0b29sYmFyT3B0aW9ucyk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBJZiB0aGUgdG9vbGJhciBpcyBub3QgZGlzYWJsZWQsIHNvIHdlIGFjdHVhbGx5IGhhdmUgYW4gZXh0ZW5zaW9uXG4gICAgICAgIC8vIGluaXRpYWxpemUgaXQgYW5kIGFkZCBpdCB0byB0aGUgZXh0ZW5zaW9ucyBhcnJheVxuICAgICAgICBpZiAodG9vbGJhckV4dGVuc2lvbikge1xuICAgICAgICAgICAgdGhpcy5leHRlbnNpb25zLnB1c2goaW5pdEV4dGVuc2lvbih0b29sYmFyRXh0ZW5zaW9uLCAndG9vbGJhcicsIHRoaXMpKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIG1lcmdlT3B0aW9ucyhkZWZhdWx0cywgb3B0aW9ucykge1xuICAgICAgICB2YXIgZGVwcmVjYXRlZFByb3BlcnRpZXMgPSBbXG4gICAgICAgICAgICBbJ2FsbG93TXVsdGlQYXJhZ3JhcGhTZWxlY3Rpb24nLCAndG9vbGJhci5hbGxvd011bHRpUGFyYWdyYXBoU2VsZWN0aW9uJ11cbiAgICAgICAgXTtcbiAgICAgICAgLy8gd2FybiBhYm91dCB1c2luZyBkZXByZWNhdGVkIHByb3BlcnRpZXNcbiAgICAgICAgaWYgKG9wdGlvbnMpIHtcbiAgICAgICAgICAgIGRlcHJlY2F0ZWRQcm9wZXJ0aWVzLmZvckVhY2goZnVuY3Rpb24gKHBhaXIpIHtcbiAgICAgICAgICAgICAgICBpZiAob3B0aW9ucy5oYXNPd25Qcm9wZXJ0eShwYWlyWzBdKSAmJiBvcHRpb25zW3BhaXJbMF1dICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgTWVkaXVtRWRpdG9yLnV0aWwuZGVwcmVjYXRlZChwYWlyWzBdLCBwYWlyWzFdLCAndjYuMC4wJyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gTWVkaXVtRWRpdG9yLnV0aWwuZGVmYXVsdHMoe30sIG9wdGlvbnMsIGRlZmF1bHRzKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBleGVjQWN0aW9uSW50ZXJuYWwoYWN0aW9uLCBvcHRzKSB7XG4gICAgICAgIC8qanNsaW50IHJlZ2V4cDogdHJ1ZSovXG4gICAgICAgIHZhciBhcHBlbmRBY3Rpb24gPSAvXmFwcGVuZC0oLispJC9naSxcbiAgICAgICAgICAgIGp1c3RpZnlBY3Rpb24gPSAvanVzdGlmeShbQS1aYS16XSopJC9nLCAvKiBEZXRlY3RpbmcgaWYgaXMganVzdGlmeUNlbnRlcnxSaWdodHxMZWZ0ICovXG4gICAgICAgICAgICBtYXRjaCxcbiAgICAgICAgICAgIGNtZFZhbHVlQXJndW1lbnQ7XG4gICAgICAgIC8qanNsaW50IHJlZ2V4cDogZmFsc2UqL1xuXG4gICAgICAgIC8vIEFjdGlvbnMgc3RhcnRpbmcgd2l0aCAnYXBwZW5kLScgc2hvdWxkIGF0dGVtcHQgdG8gZm9ybWF0IGEgYmxvY2sgb2YgdGV4dCAoJ2Zvcm1hdEJsb2NrJykgdXNpbmcgYSBzcGVjaWZpY1xuICAgICAgICAvLyB0eXBlIG9mIGJsb2NrIGVsZW1lbnQgKGllIGFwcGVuZC1ibG9ja3F1b3RlLCBhcHBlbmQtaDEsIGFwcGVuZC1wcmUsIGV0Yy4pXG4gICAgICAgIG1hdGNoID0gYXBwZW5kQWN0aW9uLmV4ZWMoYWN0aW9uKTtcbiAgICAgICAgaWYgKG1hdGNoKSB7XG4gICAgICAgICAgICByZXR1cm4gTWVkaXVtRWRpdG9yLnV0aWwuZXhlY0Zvcm1hdEJsb2NrKHRoaXMub3B0aW9ucy5vd25lckRvY3VtZW50LCBtYXRjaFsxXSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoYWN0aW9uID09PSAnZm9udFNpemUnKSB7XG4gICAgICAgICAgICAvLyBUT0RPOiBEZXByZWNhdGUgc3VwcG9ydCBmb3Igb3B0cy5zaXplIGluIDYuMC4wXG4gICAgICAgICAgICBpZiAob3B0cy5zaXplKSB7XG4gICAgICAgICAgICAgICAgTWVkaXVtRWRpdG9yLnV0aWwuZGVwcmVjYXRlZCgnLnNpemUgb3B0aW9uIGZvciBmb250U2l6ZSBjb21tYW5kJywgJy52YWx1ZScsICc2LjAuMCcpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY21kVmFsdWVBcmd1bWVudCA9IG9wdHMudmFsdWUgfHwgb3B0cy5zaXplO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMub3B0aW9ucy5vd25lckRvY3VtZW50LmV4ZWNDb21tYW5kKCdmb250U2l6ZScsIGZhbHNlLCBjbWRWYWx1ZUFyZ3VtZW50KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChhY3Rpb24gPT09ICdmb250TmFtZScpIHtcbiAgICAgICAgICAgIC8vIFRPRE86IERlcHJlY2F0ZSBzdXBwb3J0IGZvciBvcHRzLm5hbWUgaW4gNi4wLjBcbiAgICAgICAgICAgIGlmIChvcHRzLm5hbWUpIHtcbiAgICAgICAgICAgICAgICBNZWRpdW1FZGl0b3IudXRpbC5kZXByZWNhdGVkKCcubmFtZSBvcHRpb24gZm9yIGZvbnROYW1lIGNvbW1hbmQnLCAnLnZhbHVlJywgJzYuMC4wJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjbWRWYWx1ZUFyZ3VtZW50ID0gb3B0cy52YWx1ZSB8fCBvcHRzLm5hbWU7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5vcHRpb25zLm93bmVyRG9jdW1lbnQuZXhlY0NvbW1hbmQoJ2ZvbnROYW1lJywgZmFsc2UsIGNtZFZhbHVlQXJndW1lbnQpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGFjdGlvbiA9PT0gJ2NyZWF0ZUxpbmsnKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5jcmVhdGVMaW5rKG9wdHMpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGFjdGlvbiA9PT0gJ2ltYWdlJykge1xuICAgICAgICAgICAgdmFyIHNyYyA9IHRoaXMub3B0aW9ucy5jb250ZW50V2luZG93LmdldFNlbGVjdGlvbigpLnRvU3RyaW5nKCkudHJpbSgpO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMub3B0aW9ucy5vd25lckRvY3VtZW50LmV4ZWNDb21tYW5kKCdpbnNlcnRJbWFnZScsIGZhbHNlLCBzcmMpO1xuICAgICAgICB9XG5cbiAgICAgICAgLyogSXNzdWU6IGh0dHBzOi8vZ2l0aHViLmNvbS95YWJ3ZS9tZWRpdW0tZWRpdG9yL2lzc3Vlcy81OTVcbiAgICAgICAgICogSWYgdGhlIGFjdGlvbiBpcyB0byBqdXN0aWZ5IHRoZSB0ZXh0ICovXG4gICAgICAgIGlmIChqdXN0aWZ5QWN0aW9uLmV4ZWMoYWN0aW9uKSkge1xuICAgICAgICAgICAgdmFyIHJlc3VsdCA9IHRoaXMub3B0aW9ucy5vd25lckRvY3VtZW50LmV4ZWNDb21tYW5kKGFjdGlvbiwgZmFsc2UsIG51bGwpLFxuICAgICAgICAgICAgICAgIHBhcmVudE5vZGUgPSBNZWRpdW1FZGl0b3Iuc2VsZWN0aW9uLmdldFNlbGVjdGVkUGFyZW50RWxlbWVudChNZWRpdW1FZGl0b3Iuc2VsZWN0aW9uLmdldFNlbGVjdGlvblJhbmdlKHRoaXMub3B0aW9ucy5vd25lckRvY3VtZW50KSk7XG4gICAgICAgICAgICBpZiAocGFyZW50Tm9kZSkge1xuICAgICAgICAgICAgICAgIGNsZWFudXBKdXN0aWZ5RGl2RnJhZ21lbnRzLmNhbGwodGhpcywgTWVkaXVtRWRpdG9yLnV0aWwuZ2V0VG9wQmxvY2tDb250YWluZXIocGFyZW50Tm9kZSkpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICB9XG5cbiAgICAgICAgY21kVmFsdWVBcmd1bWVudCA9IG9wdHMgJiYgb3B0cy52YWx1ZTtcbiAgICAgICAgcmV0dXJuIHRoaXMub3B0aW9ucy5vd25lckRvY3VtZW50LmV4ZWNDb21tYW5kKGFjdGlvbiwgZmFsc2UsIGNtZFZhbHVlQXJndW1lbnQpO1xuICAgIH1cblxuICAgIC8qIElmIHdlJ3ZlIGp1c3QganVzdGlmaWVkIHRleHQgd2l0aGluIGEgY29udGFpbmVyIGJsb2NrXG4gICAgICogQ2hyb21lIG1heSBoYXZlIHJlbW92ZWQgPGJyPiBlbGVtZW50cyBhbmQgaW5zdGVhZCB3cmFwcGVkIGxpbmVzIGluIDxkaXY+IGVsZW1lbnRzXG4gICAgICogd2l0aCBhIHRleHQtYWxpZ24gcHJvcGVydHkuICBJZiBzbywgd2Ugd2FudCB0byBmaXggdGhpc1xuICAgICAqL1xuICAgIGZ1bmN0aW9uIGNsZWFudXBKdXN0aWZ5RGl2RnJhZ21lbnRzKGJsb2NrQ29udGFpbmVyKSB7XG4gICAgICAgIGlmICghYmxvY2tDb250YWluZXIpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciB0ZXh0QWxpZ24sXG4gICAgICAgICAgICBjaGlsZERpdnMgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChibG9ja0NvbnRhaW5lci5jaGlsZE5vZGVzKS5maWx0ZXIoZnVuY3Rpb24gKGVsZW1lbnQpIHtcbiAgICAgICAgICAgICAgICB2YXIgaXNEaXYgPSBlbGVtZW50Lm5vZGVOYW1lLnRvTG93ZXJDYXNlKCkgPT09ICdkaXYnO1xuICAgICAgICAgICAgICAgIGlmIChpc0RpdiAmJiAhdGV4dEFsaWduKSB7XG4gICAgICAgICAgICAgICAgICAgIHRleHRBbGlnbiA9IGVsZW1lbnQuc3R5bGUudGV4dEFsaWduO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gaXNEaXY7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAvKiBJZiB3ZSBmb3VuZCBjaGlsZCA8ZGl2PiBlbGVtZW50cyB3aXRoIHRleHQtYWxpZ24gc3R5bGUgYXR0cmlidXRlc1xuICAgICAgICAgKiB3ZSBzaG91bGQgZml4IHRoaXMgYnk6XG4gICAgICAgICAqXG4gICAgICAgICAqIDEpIFVud3JhcHBpbmcgZWFjaCA8ZGl2PiB3aGljaCBoYXMgYSB0ZXh0LWFsaWduIHN0eWxlXG4gICAgICAgICAqIDIpIEluc2VydCBhIDxicj4gZWxlbWVudCBhZnRlciBlYWNoIHNldCBvZiAndW53cmFwcGVkJyBkaXYgY2hpbGRyZW5cbiAgICAgICAgICogMykgU2V0IHRoZSB0ZXh0LWFsaWduIHN0eWxlIG9mIHRoZSBwYXJlbnQgYmxvY2sgZWxlbWVudFxuICAgICAgICAgKi9cbiAgICAgICAgaWYgKGNoaWxkRGl2cy5sZW5ndGgpIHtcbiAgICAgICAgICAgIC8vIFNpbmNlIHdlJ3JlIG11Y2tpbmcgd2l0aCB0aGUgSFRNTCwgcHJlc2VydmUgc2VsZWN0aW9uXG4gICAgICAgICAgICB0aGlzLnNhdmVTZWxlY3Rpb24oKTtcbiAgICAgICAgICAgIGNoaWxkRGl2cy5mb3JFYWNoKGZ1bmN0aW9uIChkaXYpIHtcbiAgICAgICAgICAgICAgICBpZiAoZGl2LnN0eWxlLnRleHRBbGlnbiA9PT0gdGV4dEFsaWduKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBsYXN0Q2hpbGQgPSBkaXYubGFzdENoaWxkO1xuICAgICAgICAgICAgICAgICAgICBpZiAobGFzdENoaWxkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBJbnN0ZWFkIG9mIGEgZGl2LCBleHRyYWN0IHRoZSBjaGlsZCBlbGVtZW50cyBhbmQgYWRkIGEgPGJyPlxuICAgICAgICAgICAgICAgICAgICAgICAgTWVkaXVtRWRpdG9yLnV0aWwudW53cmFwKGRpdiwgdGhpcy5vcHRpb25zLm93bmVyRG9jdW1lbnQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGJyID0gdGhpcy5vcHRpb25zLm93bmVyRG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnQlInKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxhc3RDaGlsZC5wYXJlbnROb2RlLmluc2VydEJlZm9yZShiciwgbGFzdENoaWxkLm5leHRTaWJsaW5nKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sIHRoaXMpO1xuICAgICAgICAgICAgYmxvY2tDb250YWluZXIuc3R5bGUudGV4dEFsaWduID0gdGV4dEFsaWduO1xuICAgICAgICAgICAgLy8gV2UncmUgZG9uZSwgc28gcmVzdG9yZSBzZWxlY3Rpb25cbiAgICAgICAgICAgIHRoaXMucmVzdG9yZVNlbGVjdGlvbigpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgdmFyIGluaXRpYWxDb250ZW50ID0ge307XG5cbiAgICBNZWRpdW1FZGl0b3IucHJvdG90eXBlID0ge1xuICAgICAgICAvLyBOT1QgRE9DVU1FTlRFRCAtIGV4cG9zZWQgZm9yIGJhY2t3YXJkcyBjb21wYXRhYmlsaXR5XG4gICAgICAgIGluaXQ6IGZ1bmN0aW9uIChlbGVtZW50cywgb3B0aW9ucykge1xuICAgICAgICAgICAgdGhpcy5vcHRpb25zID0gbWVyZ2VPcHRpb25zLmNhbGwodGhpcywgdGhpcy5kZWZhdWx0cywgb3B0aW9ucyk7XG4gICAgICAgICAgICB0aGlzLm9yaWdFbGVtZW50cyA9IGVsZW1lbnRzO1xuXG4gICAgICAgICAgICBpZiAoIXRoaXMub3B0aW9ucy5lbGVtZW50c0NvbnRhaW5lcikge1xuICAgICAgICAgICAgICAgIHRoaXMub3B0aW9ucy5lbGVtZW50c0NvbnRhaW5lciA9IHRoaXMub3B0aW9ucy5vd25lckRvY3VtZW50LmJvZHk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiB0aGlzLnNldHVwKCk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgc2V0dXA6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmlzQWN0aXZlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBhZGRUb0VkaXRvcnMuY2FsbCh0aGlzLCB0aGlzLm9wdGlvbnMuY29udGVudFdpbmRvdyk7XG4gICAgICAgICAgICB0aGlzLmV2ZW50cyA9IG5ldyBNZWRpdW1FZGl0b3IuRXZlbnRzKHRoaXMpO1xuICAgICAgICAgICAgdGhpcy5lbGVtZW50cyA9IFtdO1xuXG4gICAgICAgICAgICB0aGlzLmFkZEVsZW1lbnRzKHRoaXMub3JpZ0VsZW1lbnRzKTtcblxuICAgICAgICAgICAgaWYgKHRoaXMuZWxlbWVudHMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLmlzQWN0aXZlID0gdHJ1ZTtcblxuICAgICAgICAgICAgLy8gQ2FsbCBpbml0aWFsaXphdGlvbiBoZWxwZXJzXG4gICAgICAgICAgICBpbml0RXh0ZW5zaW9ucy5jYWxsKHRoaXMpO1xuICAgICAgICAgICAgYXR0YWNoSGFuZGxlcnMuY2FsbCh0aGlzKTtcbiAgICAgICAgfSxcblxuICAgICAgICBkZXN0cm95OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBpZiAoIXRoaXMuaXNBY3RpdmUpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMuaXNBY3RpdmUgPSBmYWxzZTtcblxuICAgICAgICAgICAgdGhpcy5leHRlbnNpb25zLmZvckVhY2goZnVuY3Rpb24gKGV4dGVuc2lvbikge1xuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgZXh0ZW5zaW9uLmRlc3Ryb3kgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgICAgICAgICAgZXh0ZW5zaW9uLmRlc3Ryb3koKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LCB0aGlzKTtcblxuICAgICAgICAgICAgdGhpcy5ldmVudHMuZGVzdHJveSgpO1xuXG4gICAgICAgICAgICB0aGlzLmVsZW1lbnRzLmZvckVhY2goZnVuY3Rpb24gKGVsZW1lbnQpIHtcbiAgICAgICAgICAgICAgICAvLyBSZXNldCBlbGVtZW50cyBjb250ZW50LCBmaXggZm9yIGlzc3VlIHdoZXJlIGFmdGVyIGVkaXRvciBkZXN0cm95ZWQgdGhlIHJlZCB1bmRlcmxpbmVzIG9uIHNwZWxsaW5nIGVycm9ycyBhcmUgbGVmdFxuICAgICAgICAgICAgICAgIGlmICh0aGlzLm9wdGlvbnMuc3BlbGxjaGVjaykge1xuICAgICAgICAgICAgICAgICAgICBlbGVtZW50LmlubmVySFRNTCA9IGVsZW1lbnQuaW5uZXJIVE1MO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIC8vIGNsZWFudXAgZXh0cmEgYWRkZWQgYXR0cmlidXRlc1xuICAgICAgICAgICAgICAgIGVsZW1lbnQucmVtb3ZlQXR0cmlidXRlKCdjb250ZW50RWRpdGFibGUnKTtcbiAgICAgICAgICAgICAgICBlbGVtZW50LnJlbW92ZUF0dHJpYnV0ZSgnc3BlbGxjaGVjaycpO1xuICAgICAgICAgICAgICAgIGVsZW1lbnQucmVtb3ZlQXR0cmlidXRlKCdkYXRhLW1lZGl1bS1lZGl0b3ItZWxlbWVudCcpO1xuICAgICAgICAgICAgICAgIGVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZSgnbWVkaXVtLWVkaXRvci1lbGVtZW50Jyk7XG4gICAgICAgICAgICAgICAgZWxlbWVudC5yZW1vdmVBdHRyaWJ1dGUoJ3JvbGUnKTtcbiAgICAgICAgICAgICAgICBlbGVtZW50LnJlbW92ZUF0dHJpYnV0ZSgnYXJpYS1tdWx0aWxpbmUnKTtcbiAgICAgICAgICAgICAgICBlbGVtZW50LnJlbW92ZUF0dHJpYnV0ZSgnbWVkaXVtLWVkaXRvci1pbmRleCcpO1xuICAgICAgICAgICAgICAgIGVsZW1lbnQucmVtb3ZlQXR0cmlidXRlKCdkYXRhLW1lZGl1bS1lZGl0b3ItZWRpdG9yLWluZGV4Jyk7XG5cbiAgICAgICAgICAgICAgICAvLyBSZW1vdmUgYW55IGVsZW1lbnRzIGNyZWF0ZWQgZm9yIHRleHRhcmVhc1xuICAgICAgICAgICAgICAgIGlmIChlbGVtZW50LmdldEF0dHJpYnV0ZSgnbWVkaXVtLWVkaXRvci10ZXh0YXJlYS1pZCcpKSB7XG4gICAgICAgICAgICAgICAgICAgIGNsZWFudXBUZXh0YXJlYUVsZW1lbnQoZWxlbWVudCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSwgdGhpcyk7XG4gICAgICAgICAgICB0aGlzLmVsZW1lbnRzID0gW107XG4gICAgICAgICAgICB0aGlzLmluc3RhbmNlSGFuZGxlRWRpdGFibGVLZXlkb3duRW50ZXIgPSBudWxsO1xuICAgICAgICAgICAgdGhpcy5pbnN0YW5jZUhhbmRsZUVkaXRhYmxlSW5wdXQgPSBudWxsO1xuXG4gICAgICAgICAgICByZW1vdmVGcm9tRWRpdG9ycy5jYWxsKHRoaXMsIHRoaXMub3B0aW9ucy5jb250ZW50V2luZG93KTtcbiAgICAgICAgfSxcblxuICAgICAgICBvbjogZnVuY3Rpb24gKHRhcmdldCwgZXZlbnQsIGxpc3RlbmVyLCB1c2VDYXB0dXJlKSB7XG4gICAgICAgICAgICB0aGlzLmV2ZW50cy5hdHRhY2hET01FdmVudCh0YXJnZXQsIGV2ZW50LCBsaXN0ZW5lciwgdXNlQ2FwdHVyZSk7XG5cbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9LFxuXG4gICAgICAgIG9mZjogZnVuY3Rpb24gKHRhcmdldCwgZXZlbnQsIGxpc3RlbmVyLCB1c2VDYXB0dXJlKSB7XG4gICAgICAgICAgICB0aGlzLmV2ZW50cy5kZXRhY2hET01FdmVudCh0YXJnZXQsIGV2ZW50LCBsaXN0ZW5lciwgdXNlQ2FwdHVyZSk7XG5cbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9LFxuXG4gICAgICAgIHN1YnNjcmliZTogZnVuY3Rpb24gKGV2ZW50LCBsaXN0ZW5lcikge1xuICAgICAgICAgICAgdGhpcy5ldmVudHMuYXR0YWNoQ3VzdG9tRXZlbnQoZXZlbnQsIGxpc3RlbmVyKTtcblxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH0sXG5cbiAgICAgICAgdW5zdWJzY3JpYmU6IGZ1bmN0aW9uIChldmVudCwgbGlzdGVuZXIpIHtcbiAgICAgICAgICAgIHRoaXMuZXZlbnRzLmRldGFjaEN1c3RvbUV2ZW50KGV2ZW50LCBsaXN0ZW5lcik7XG5cbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9LFxuXG4gICAgICAgIHRyaWdnZXI6IGZ1bmN0aW9uIChuYW1lLCBkYXRhLCBlZGl0YWJsZSkge1xuICAgICAgICAgICAgdGhpcy5ldmVudHMudHJpZ2dlckN1c3RvbUV2ZW50KG5hbWUsIGRhdGEsIGVkaXRhYmxlKTtcblxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH0sXG5cbiAgICAgICAgZGVsYXk6IGZ1bmN0aW9uIChmbikge1xuICAgICAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICAgICAgcmV0dXJuIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIGlmIChzZWxmLmlzQWN0aXZlKSB7XG4gICAgICAgICAgICAgICAgICAgIGZuKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSwgdGhpcy5vcHRpb25zLmRlbGF5KTtcbiAgICAgICAgfSxcblxuICAgICAgICBzZXJpYWxpemU6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBpLFxuICAgICAgICAgICAgICAgIGVsZW1lbnRpZCxcbiAgICAgICAgICAgICAgICBjb250ZW50ID0ge30sXG4gICAgICAgICAgICAgICAgbGVuID0gdGhpcy5lbGVtZW50cy5sZW5ndGg7XG5cbiAgICAgICAgICAgIGZvciAoaSA9IDA7IGkgPCBsZW47IGkgKz0gMSkge1xuICAgICAgICAgICAgICAgIGVsZW1lbnRpZCA9ICh0aGlzLmVsZW1lbnRzW2ldLmlkICE9PSAnJykgPyB0aGlzLmVsZW1lbnRzW2ldLmlkIDogJ2VsZW1lbnQtJyArIGk7XG4gICAgICAgICAgICAgICAgY29udGVudFtlbGVtZW50aWRdID0ge1xuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogdGhpcy5lbGVtZW50c1tpXS5pbm5lckhUTUwudHJpbSgpXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBjb250ZW50O1xuICAgICAgICB9LFxuXG4gICAgICAgIGdldEV4dGVuc2lvbkJ5TmFtZTogZnVuY3Rpb24gKG5hbWUpIHtcbiAgICAgICAgICAgIHZhciBleHRlbnNpb247XG4gICAgICAgICAgICBpZiAodGhpcy5leHRlbnNpb25zICYmIHRoaXMuZXh0ZW5zaW9ucy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmV4dGVuc2lvbnMuc29tZShmdW5jdGlvbiAoZXh0KSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChleHQubmFtZSA9PT0gbmFtZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZXh0ZW5zaW9uID0gZXh0O1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGV4dGVuc2lvbjtcbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogTk9UIERPQ1VNRU5URUQgLSBleHBvc2VkIGFzIGEgaGVscGVyIGZvciBvdGhlciBleHRlbnNpb25zIHRvIHVzZVxuICAgICAgICAgKi9cbiAgICAgICAgYWRkQnVpbHRJbkV4dGVuc2lvbjogZnVuY3Rpb24gKG5hbWUsIG9wdHMpIHtcbiAgICAgICAgICAgIHZhciBleHRlbnNpb24gPSB0aGlzLmdldEV4dGVuc2lvbkJ5TmFtZShuYW1lKSxcbiAgICAgICAgICAgICAgICBtZXJnZWQ7XG4gICAgICAgICAgICBpZiAoZXh0ZW5zaW9uKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGV4dGVuc2lvbjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgc3dpdGNoIChuYW1lKSB7XG4gICAgICAgICAgICAgICAgY2FzZSAnYW5jaG9yJzpcbiAgICAgICAgICAgICAgICAgICAgbWVyZ2VkID0gTWVkaXVtRWRpdG9yLnV0aWwuZXh0ZW5kKHt9LCB0aGlzLm9wdGlvbnMuYW5jaG9yLCBvcHRzKTtcbiAgICAgICAgICAgICAgICAgICAgZXh0ZW5zaW9uID0gbmV3IE1lZGl1bUVkaXRvci5leHRlbnNpb25zLmFuY2hvcihtZXJnZWQpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdhbmNob3ItcHJldmlldyc6XG4gICAgICAgICAgICAgICAgICAgIGV4dGVuc2lvbiA9IG5ldyBNZWRpdW1FZGl0b3IuZXh0ZW5zaW9ucy5hbmNob3JQcmV2aWV3KHRoaXMub3B0aW9ucy5hbmNob3JQcmV2aWV3KTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnYXV0b0xpbmsnOlxuICAgICAgICAgICAgICAgICAgICBleHRlbnNpb24gPSBuZXcgTWVkaXVtRWRpdG9yLmV4dGVuc2lvbnMuYXV0b0xpbmsoKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnZmlsZURyYWdnaW5nJzpcbiAgICAgICAgICAgICAgICAgICAgZXh0ZW5zaW9uID0gbmV3IE1lZGl1bUVkaXRvci5leHRlbnNpb25zLmZpbGVEcmFnZ2luZyhvcHRzKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnZm9udG5hbWUnOlxuICAgICAgICAgICAgICAgICAgICBleHRlbnNpb24gPSBuZXcgTWVkaXVtRWRpdG9yLmV4dGVuc2lvbnMuZm9udE5hbWUodGhpcy5vcHRpb25zLmZvbnROYW1lKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnZm9udHNpemUnOlxuICAgICAgICAgICAgICAgICAgICBleHRlbnNpb24gPSBuZXcgTWVkaXVtRWRpdG9yLmV4dGVuc2lvbnMuZm9udFNpemUob3B0cyk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ2tleWJvYXJkQ29tbWFuZHMnOlxuICAgICAgICAgICAgICAgICAgICBleHRlbnNpb24gPSBuZXcgTWVkaXVtRWRpdG9yLmV4dGVuc2lvbnMua2V5Ym9hcmRDb21tYW5kcyh0aGlzLm9wdGlvbnMua2V5Ym9hcmRDb21tYW5kcyk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ3Bhc3RlJzpcbiAgICAgICAgICAgICAgICAgICAgZXh0ZW5zaW9uID0gbmV3IE1lZGl1bUVkaXRvci5leHRlbnNpb25zLnBhc3RlKHRoaXMub3B0aW9ucy5wYXN0ZSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ3BsYWNlaG9sZGVyJzpcbiAgICAgICAgICAgICAgICAgICAgZXh0ZW5zaW9uID0gbmV3IE1lZGl1bUVkaXRvci5leHRlbnNpb25zLnBsYWNlaG9sZGVyKHRoaXMub3B0aW9ucy5wbGFjZWhvbGRlcik7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgIC8vIEFsbCBvZiB0aGUgYnVpbHQtaW4gYnV0dG9ucyBmb3IgTWVkaXVtRWRpdG9yIGFyZSBleHRlbnNpb25zXG4gICAgICAgICAgICAgICAgICAgIC8vIHNvIGNoZWNrIHRvIHNlZSBpZiB0aGUgZXh0ZW5zaW9uIHdlJ3JlIGNyZWF0aW5nIGlzIGEgYnVpbHQtaW4gYnV0dG9uXG4gICAgICAgICAgICAgICAgICAgIGlmIChNZWRpdW1FZGl0b3IuZXh0ZW5zaW9ucy5idXR0b24uaXNCdWlsdEluQnV0dG9uKG5hbWUpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAob3B0cykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1lcmdlZCA9IE1lZGl1bUVkaXRvci51dGlsLmRlZmF1bHRzKHt9LCBvcHRzLCBNZWRpdW1FZGl0b3IuZXh0ZW5zaW9ucy5idXR0b24ucHJvdG90eXBlLmRlZmF1bHRzW25hbWVdKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBleHRlbnNpb24gPSBuZXcgTWVkaXVtRWRpdG9yLmV4dGVuc2lvbnMuYnV0dG9uKG1lcmdlZCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGV4dGVuc2lvbiA9IG5ldyBNZWRpdW1FZGl0b3IuZXh0ZW5zaW9ucy5idXR0b24obmFtZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGV4dGVuc2lvbikge1xuICAgICAgICAgICAgICAgIHRoaXMuZXh0ZW5zaW9ucy5wdXNoKGluaXRFeHRlbnNpb24oZXh0ZW5zaW9uLCBuYW1lLCB0aGlzKSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiBleHRlbnNpb247XG4gICAgICAgIH0sXG5cbiAgICAgICAgc3RvcFNlbGVjdGlvblVwZGF0ZXM6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHRoaXMucHJldmVudFNlbGVjdGlvblVwZGF0ZXMgPSB0cnVlO1xuICAgICAgICB9LFxuXG4gICAgICAgIHN0YXJ0U2VsZWN0aW9uVXBkYXRlczogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdGhpcy5wcmV2ZW50U2VsZWN0aW9uVXBkYXRlcyA9IGZhbHNlO1xuICAgICAgICB9LFxuXG4gICAgICAgIGNoZWNrU2VsZWN0aW9uOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgdG9vbGJhciA9IHRoaXMuZ2V0RXh0ZW5zaW9uQnlOYW1lKCd0b29sYmFyJyk7XG4gICAgICAgICAgICBpZiAodG9vbGJhcikge1xuICAgICAgICAgICAgICAgIHRvb2xiYXIuY2hlY2tTdGF0ZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH0sXG5cbiAgICAgICAgLy8gV3JhcHBlciBhcm91bmQgZG9jdW1lbnQucXVlcnlDb21tYW5kU3RhdGUgZm9yIGNoZWNraW5nIHdoZXRoZXIgYW4gYWN0aW9uIGhhcyBhbHJlYWR5XG4gICAgICAgIC8vIGJlZW4gYXBwbGllZCB0byB0aGUgY3VycmVudCBzZWxlY3Rpb25cbiAgICAgICAgcXVlcnlDb21tYW5kU3RhdGU6IGZ1bmN0aW9uIChhY3Rpb24pIHtcbiAgICAgICAgICAgIHZhciBmdWxsQWN0aW9uID0gL15mdWxsLSguKykkL2dpLFxuICAgICAgICAgICAgICAgIG1hdGNoLFxuICAgICAgICAgICAgICAgIHF1ZXJ5U3RhdGUgPSBudWxsO1xuXG4gICAgICAgICAgICAvLyBBY3Rpb25zIHN0YXJ0aW5nIHdpdGggJ2Z1bGwtJyBuZWVkIHRvIGJlIG1vZGlmaWVkIHNpbmNlIHRoaXMgaXMgYSBtZWRpdW0tZWRpdG9yIGNvbmNlcHRcbiAgICAgICAgICAgIG1hdGNoID0gZnVsbEFjdGlvbi5leGVjKGFjdGlvbik7XG4gICAgICAgICAgICBpZiAobWF0Y2gpIHtcbiAgICAgICAgICAgICAgICBhY3Rpb24gPSBtYXRjaFsxXTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBxdWVyeVN0YXRlID0gdGhpcy5vcHRpb25zLm93bmVyRG9jdW1lbnQucXVlcnlDb21tYW5kU3RhdGUoYWN0aW9uKTtcbiAgICAgICAgICAgIH0gY2F0Y2ggKGV4Yykge1xuICAgICAgICAgICAgICAgIHF1ZXJ5U3RhdGUgPSBudWxsO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gcXVlcnlTdGF0ZTtcbiAgICAgICAgfSxcblxuICAgICAgICBleGVjQWN0aW9uOiBmdW5jdGlvbiAoYWN0aW9uLCBvcHRzKSB7XG4gICAgICAgICAgICAvKmpzbGludCByZWdleHA6IHRydWUqL1xuICAgICAgICAgICAgdmFyIGZ1bGxBY3Rpb24gPSAvXmZ1bGwtKC4rKSQvZ2ksXG4gICAgICAgICAgICAgICAgbWF0Y2gsXG4gICAgICAgICAgICAgICAgcmVzdWx0O1xuICAgICAgICAgICAgLypqc2xpbnQgcmVnZXhwOiBmYWxzZSovXG5cbiAgICAgICAgICAgIC8vIEFjdGlvbnMgc3RhcnRpbmcgd2l0aCAnZnVsbC0nIHNob3VsZCBiZSBhcHBsaWVkIHRvIHRvIHRoZSBlbnRpcmUgY29udGVudHMgb2YgdGhlIGVkaXRhYmxlIGVsZW1lbnRcbiAgICAgICAgICAgIC8vIChpZSBmdWxsLWJvbGQsIGZ1bGwtYXBwZW5kLXByZSwgZXRjLilcbiAgICAgICAgICAgIG1hdGNoID0gZnVsbEFjdGlvbi5leGVjKGFjdGlvbik7XG4gICAgICAgICAgICBpZiAobWF0Y2gpIHtcbiAgICAgICAgICAgICAgICAvLyBTdG9yZSB0aGUgY3VycmVudCBzZWxlY3Rpb24gdG8gYmUgcmVzdG9yZWQgYWZ0ZXIgYXBwbHlpbmcgdGhlIGFjdGlvblxuICAgICAgICAgICAgICAgIHRoaXMuc2F2ZVNlbGVjdGlvbigpO1xuICAgICAgICAgICAgICAgIC8vIFNlbGVjdCBhbGwgb2YgdGhlIGNvbnRlbnRzIGJlZm9yZSBjYWxsaW5nIHRoZSBhY3Rpb25cbiAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdEFsbENvbnRlbnRzKCk7XG4gICAgICAgICAgICAgICAgcmVzdWx0ID0gZXhlY0FjdGlvbkludGVybmFsLmNhbGwodGhpcywgbWF0Y2hbMV0sIG9wdHMpO1xuICAgICAgICAgICAgICAgIC8vIFJlc3RvcmUgdGhlIHByZXZpb3VzIHNlbGVjdGlvblxuICAgICAgICAgICAgICAgIHRoaXMucmVzdG9yZVNlbGVjdGlvbigpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXN1bHQgPSBleGVjQWN0aW9uSW50ZXJuYWwuY2FsbCh0aGlzLCBhY3Rpb24sIG9wdHMpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBkbyBzb21lIERPTSBjbGVhbi11cCBmb3Iga25vd24gYnJvd3NlciBpc3N1ZXMgYWZ0ZXIgdGhlIGFjdGlvblxuICAgICAgICAgICAgaWYgKGFjdGlvbiA9PT0gJ2luc2VydHVub3JkZXJlZGxpc3QnIHx8IGFjdGlvbiA9PT0gJ2luc2VydG9yZGVyZWRsaXN0Jykge1xuICAgICAgICAgICAgICAgIE1lZGl1bUVkaXRvci51dGlsLmNsZWFuTGlzdERPTSh0aGlzLm9wdGlvbnMub3duZXJEb2N1bWVudCwgdGhpcy5nZXRTZWxlY3RlZFBhcmVudEVsZW1lbnQoKSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMuY2hlY2tTZWxlY3Rpb24oKTtcbiAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgIH0sXG5cbiAgICAgICAgZ2V0U2VsZWN0ZWRQYXJlbnRFbGVtZW50OiBmdW5jdGlvbiAocmFuZ2UpIHtcbiAgICAgICAgICAgIGlmIChyYW5nZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgcmFuZ2UgPSB0aGlzLm9wdGlvbnMuY29udGVudFdpbmRvdy5nZXRTZWxlY3Rpb24oKS5nZXRSYW5nZUF0KDApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIE1lZGl1bUVkaXRvci5zZWxlY3Rpb24uZ2V0U2VsZWN0ZWRQYXJlbnRFbGVtZW50KHJhbmdlKTtcbiAgICAgICAgfSxcblxuICAgICAgICBzZWxlY3RBbGxDb250ZW50czogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIGN1cnJOb2RlID0gTWVkaXVtRWRpdG9yLnNlbGVjdGlvbi5nZXRTZWxlY3Rpb25FbGVtZW50KHRoaXMub3B0aW9ucy5jb250ZW50V2luZG93KTtcblxuICAgICAgICAgICAgaWYgKGN1cnJOb2RlKSB7XG4gICAgICAgICAgICAgICAgLy8gTW92ZSB0byB0aGUgbG93ZXN0IGRlc2NlbmRhbnQgbm9kZSB0aGF0IHN0aWxsIHNlbGVjdHMgYWxsIG9mIHRoZSBjb250ZW50c1xuICAgICAgICAgICAgICAgIHdoaWxlIChjdXJyTm9kZS5jaGlsZHJlbi5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgY3Vyck5vZGUgPSBjdXJyTm9kZS5jaGlsZHJlblswXTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdEVsZW1lbnQoY3Vyck5vZGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIHNlbGVjdEVsZW1lbnQ6IGZ1bmN0aW9uIChlbGVtZW50KSB7XG4gICAgICAgICAgICBNZWRpdW1FZGl0b3Iuc2VsZWN0aW9uLnNlbGVjdE5vZGUoZWxlbWVudCwgdGhpcy5vcHRpb25zLm93bmVyRG9jdW1lbnQpO1xuXG4gICAgICAgICAgICB2YXIgc2VsRWxlbWVudCA9IE1lZGl1bUVkaXRvci5zZWxlY3Rpb24uZ2V0U2VsZWN0aW9uRWxlbWVudCh0aGlzLm9wdGlvbnMuY29udGVudFdpbmRvdyk7XG4gICAgICAgICAgICBpZiAoc2VsRWxlbWVudCkge1xuICAgICAgICAgICAgICAgIHRoaXMuZXZlbnRzLmZvY3VzRWxlbWVudChzZWxFbGVtZW50KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICBnZXRGb2N1c2VkRWxlbWVudDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIGZvY3VzZWQ7XG4gICAgICAgICAgICB0aGlzLmVsZW1lbnRzLnNvbWUoZnVuY3Rpb24gKGVsZW1lbnQpIHtcbiAgICAgICAgICAgICAgICAvLyBGaW5kIHRoZSBlbGVtZW50IHRoYXQgaGFzIGZvY3VzXG4gICAgICAgICAgICAgICAgaWYgKCFmb2N1c2VkICYmIGVsZW1lbnQuZ2V0QXR0cmlidXRlKCdkYXRhLW1lZGl1bS1mb2N1c2VkJykpIHtcbiAgICAgICAgICAgICAgICAgICAgZm9jdXNlZCA9IGVsZW1lbnQ7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgLy8gYmFpbCBpZiB3ZSBmb3VuZCB0aGUgZWxlbWVudCB0aGF0IGhhZCBmb2N1c1xuICAgICAgICAgICAgICAgIHJldHVybiAhIWZvY3VzZWQ7XG4gICAgICAgICAgICB9LCB0aGlzKTtcblxuICAgICAgICAgICAgcmV0dXJuIGZvY3VzZWQ7XG4gICAgICAgIH0sXG5cbiAgICAgICAgLy8gRXhwb3J0IHRoZSBzdGF0ZSBvZiB0aGUgc2VsZWN0aW9uIGluIHJlc3BlY3QgdG8gb25lIG9mIHRoaXNcbiAgICAgICAgLy8gaW5zdGFuY2Ugb2YgTWVkaXVtRWRpdG9yJ3MgZWxlbWVudHNcbiAgICAgICAgZXhwb3J0U2VsZWN0aW9uOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgc2VsZWN0aW9uRWxlbWVudCA9IE1lZGl1bUVkaXRvci5zZWxlY3Rpb24uZ2V0U2VsZWN0aW9uRWxlbWVudCh0aGlzLm9wdGlvbnMuY29udGVudFdpbmRvdyksXG4gICAgICAgICAgICAgICAgZWRpdGFibGVFbGVtZW50SW5kZXggPSB0aGlzLmVsZW1lbnRzLmluZGV4T2Yoc2VsZWN0aW9uRWxlbWVudCksXG4gICAgICAgICAgICAgICAgc2VsZWN0aW9uU3RhdGUgPSBudWxsO1xuXG4gICAgICAgICAgICBpZiAoZWRpdGFibGVFbGVtZW50SW5kZXggPj0gMCkge1xuICAgICAgICAgICAgICAgIHNlbGVjdGlvblN0YXRlID0gTWVkaXVtRWRpdG9yLnNlbGVjdGlvbi5leHBvcnRTZWxlY3Rpb24oc2VsZWN0aW9uRWxlbWVudCwgdGhpcy5vcHRpb25zLm93bmVyRG9jdW1lbnQpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoc2VsZWN0aW9uU3RhdGUgIT09IG51bGwgJiYgZWRpdGFibGVFbGVtZW50SW5kZXggIT09IDApIHtcbiAgICAgICAgICAgICAgICBzZWxlY3Rpb25TdGF0ZS5lZGl0YWJsZUVsZW1lbnRJbmRleCA9IGVkaXRhYmxlRWxlbWVudEluZGV4O1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gc2VsZWN0aW9uU3RhdGU7XG4gICAgICAgIH0sXG5cbiAgICAgICAgc2F2ZVNlbGVjdGlvbjogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdGhpcy5zZWxlY3Rpb25TdGF0ZSA9IHRoaXMuZXhwb3J0U2VsZWN0aW9uKCk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgLy8gUmVzdG9yZSBhIHNlbGVjdGlvbiBiYXNlZCBvbiBhIHNlbGVjdGlvblN0YXRlIHJldHVybmVkIGJ5IGEgY2FsbFxuICAgICAgICAvLyB0byBNZWRpdW1FZGl0b3IuZXhwb3J0U2VsZWN0aW9uXG4gICAgICAgIGltcG9ydFNlbGVjdGlvbjogZnVuY3Rpb24gKHNlbGVjdGlvblN0YXRlLCBmYXZvckxhdGVyU2VsZWN0aW9uQW5jaG9yKSB7XG4gICAgICAgICAgICBpZiAoIXNlbGVjdGlvblN0YXRlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB2YXIgZWRpdGFibGVFbGVtZW50ID0gdGhpcy5lbGVtZW50c1tzZWxlY3Rpb25TdGF0ZS5lZGl0YWJsZUVsZW1lbnRJbmRleCB8fCAwXTtcbiAgICAgICAgICAgIE1lZGl1bUVkaXRvci5zZWxlY3Rpb24uaW1wb3J0U2VsZWN0aW9uKHNlbGVjdGlvblN0YXRlLCBlZGl0YWJsZUVsZW1lbnQsIHRoaXMub3B0aW9ucy5vd25lckRvY3VtZW50LCBmYXZvckxhdGVyU2VsZWN0aW9uQW5jaG9yKTtcbiAgICAgICAgfSxcblxuICAgICAgICByZXN0b3JlU2VsZWN0aW9uOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB0aGlzLmltcG9ydFNlbGVjdGlvbih0aGlzLnNlbGVjdGlvblN0YXRlKTtcbiAgICAgICAgfSxcblxuICAgICAgICBjcmVhdGVMaW5rOiBmdW5jdGlvbiAob3B0cykge1xuICAgICAgICAgICAgdmFyIGN1cnJlbnRFZGl0b3IgPSBNZWRpdW1FZGl0b3Iuc2VsZWN0aW9uLmdldFNlbGVjdGlvbkVsZW1lbnQodGhpcy5vcHRpb25zLmNvbnRlbnRXaW5kb3cpLFxuICAgICAgICAgICAgICAgIGN1c3RvbUV2ZW50ID0ge30sXG4gICAgICAgICAgICAgICAgdGFyZ2V0VXJsO1xuXG4gICAgICAgICAgICAvLyBNYWtlIHN1cmUgdGhlIHNlbGVjdGlvbiBpcyB3aXRoaW4gYW4gZWxlbWVudCB0aGlzIGVkaXRvciBpcyB0cmFja2luZ1xuICAgICAgICAgICAgaWYgKHRoaXMuZWxlbWVudHMuaW5kZXhPZihjdXJyZW50RWRpdG9yKSA9PT0gLTEpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgdGhpcy5ldmVudHMuZGlzYWJsZUN1c3RvbUV2ZW50KCdlZGl0YWJsZUlucHV0Jyk7XG4gICAgICAgICAgICAgICAgLy8gVE9ETzogRGVwcmVjYXRlIHN1cHBvcnQgZm9yIG9wdHMudXJsIGluIDYuMC4wXG4gICAgICAgICAgICAgICAgaWYgKG9wdHMudXJsKSB7XG4gICAgICAgICAgICAgICAgICAgIE1lZGl1bUVkaXRvci51dGlsLmRlcHJlY2F0ZWQoJy51cmwgb3B0aW9uIGZvciBjcmVhdGVMaW5rJywgJy52YWx1ZScsICc2LjAuMCcpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0YXJnZXRVcmwgPSBvcHRzLnVybCB8fCBvcHRzLnZhbHVlO1xuICAgICAgICAgICAgICAgIGlmICh0YXJnZXRVcmwgJiYgdGFyZ2V0VXJsLnRyaW0oKS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBjdXJyZW50U2VsZWN0aW9uID0gdGhpcy5vcHRpb25zLmNvbnRlbnRXaW5kb3cuZ2V0U2VsZWN0aW9uKCk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChjdXJyZW50U2VsZWN0aW9uKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgY3VyclJhbmdlID0gY3VycmVudFNlbGVjdGlvbi5nZXRSYW5nZUF0KDApLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbW1vbkFuY2VzdG9yQ29udGFpbmVyID0gY3VyclJhbmdlLmNvbW1vbkFuY2VzdG9yQ29udGFpbmVyLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGV4cG9ydGVkU2VsZWN0aW9uLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXJ0Q29udGFpbmVyUGFyZW50RWxlbWVudCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbmRDb250YWluZXJQYXJlbnRFbGVtZW50LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRleHROb2RlcztcblxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gSWYgdGhlIHNlbGVjdGlvbiBpcyBjb250YWluZWQgd2l0aGluIGEgc2luZ2xlIHRleHQgbm9kZVxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gYW5kIHRoZSBzZWxlY3Rpb24gc3RhcnRzIGF0IHRoZSBiZWdpbm5pbmcgb2YgdGhlIHRleHQgbm9kZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIE1TSUUgc3RpbGwgc2F5cyB0aGUgc3RhcnRDb250YWluZXIgaXMgdGhlIHBhcmVudCBvZiB0aGUgdGV4dCBub2RlLlxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gSWYgdGhlIHNlbGVjdGlvbiBpcyBjb250YWluZWQgd2l0aGluIGEgc2luZ2xlIHRleHQgbm9kZSwgd2VcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHdhbnQgdG8ganVzdCB1c2UgdGhlIGRlZmF1bHQgYnJvd3NlciAnY3JlYXRlTGluaycsIHNvIHdlIG5lZWRcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHRvIGFjY291bnQgZm9yIHRoaXMgY2FzZSBhbmQgYWRqdXN0IHRoZSBjb21tb25BbmNlc3RvckNvbnRhaW5lciBhY2NvcmRpbmdseVxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGN1cnJSYW5nZS5lbmRDb250YWluZXIubm9kZVR5cGUgPT09IDMgJiZcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjdXJyUmFuZ2Uuc3RhcnRDb250YWluZXIubm9kZVR5cGUgIT09IDMgJiZcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjdXJyUmFuZ2Uuc3RhcnRPZmZzZXQgPT09IDAgJiZcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjdXJyUmFuZ2Uuc3RhcnRDb250YWluZXIuZmlyc3RDaGlsZCA9PT0gY3VyclJhbmdlLmVuZENvbnRhaW5lcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbW1vbkFuY2VzdG9yQ29udGFpbmVyID0gY3VyclJhbmdlLmVuZENvbnRhaW5lcjtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgc3RhcnRDb250YWluZXJQYXJlbnRFbGVtZW50ID0gTWVkaXVtRWRpdG9yLnV0aWwuZ2V0Q2xvc2VzdEJsb2NrQ29udGFpbmVyKGN1cnJSYW5nZS5zdGFydENvbnRhaW5lcik7XG4gICAgICAgICAgICAgICAgICAgICAgICBlbmRDb250YWluZXJQYXJlbnRFbGVtZW50ID0gTWVkaXVtRWRpdG9yLnV0aWwuZ2V0Q2xvc2VzdEJsb2NrQ29udGFpbmVyKGN1cnJSYW5nZS5lbmRDb250YWluZXIpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBJZiB0aGUgc2VsZWN0aW9uIGlzIG5vdCBjb250YWluZWQgd2l0aGluIGEgc2luZ2xlIHRleHQgbm9kZVxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gYnV0IHRoZSBzZWxlY3Rpb24gaXMgY29udGFpbmVkIHdpdGhpbiB0aGUgc2FtZSBibG9jayBlbGVtZW50XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyB3ZSB3YW50IHRvIG1ha2Ugc3VyZSB3ZSBjcmVhdGUgYSBzaW5nbGUgbGluaywgYW5kIG5vdCBtdWx0aXBsZSBsaW5rc1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gd2hpY2ggY2FuIGhhcHBlbiB3aXRoIHRoZSBidWlsdCBpbiBicm93c2VyIGZ1bmN0aW9uYWxpdHlcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjb21tb25BbmNlc3RvckNvbnRhaW5lci5ub2RlVHlwZSAhPT0gMyAmJiBjb21tb25BbmNlc3RvckNvbnRhaW5lci50ZXh0Q29udGVudC5sZW5ndGggIT09IDAgJiYgc3RhcnRDb250YWluZXJQYXJlbnRFbGVtZW50ID09PSBlbmRDb250YWluZXJQYXJlbnRFbGVtZW50KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHBhcmVudEVsZW1lbnQgPSAoc3RhcnRDb250YWluZXJQYXJlbnRFbGVtZW50IHx8IGN1cnJlbnRFZGl0b3IpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmcmFnbWVudCA9IHRoaXMub3B0aW9ucy5vd25lckRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHNpbmNlIHdlIGFyZSBnb2luZyB0byBjcmVhdGUgYSBsaW5rIGZyb20gYW4gZXh0cmFjdGVkIHRleHQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gYmUgc3VyZSB0aGF0IGlmIHdlIGFyZSB1cGRhdGluZyBhIGxpbmssIHdlIHdvbid0IGxldCBhbiBlbXB0eSBsaW5rIGJlaGluZCAoc2VlICM3NTQpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gKFdvcmthcm91bmcgZm9yIENocm9tZSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmV4ZWNBY3Rpb24oJ3VubGluaycpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZXhwb3J0ZWRTZWxlY3Rpb24gPSB0aGlzLmV4cG9ydFNlbGVjdGlvbigpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZyYWdtZW50LmFwcGVuZENoaWxkKHBhcmVudEVsZW1lbnQuY2xvbmVOb2RlKHRydWUpKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjdXJyZW50RWRpdG9yID09PSBwYXJlbnRFbGVtZW50KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFdlIGhhdmUgdG8gYXZvaWQgdGhlIGVkaXRvciBpdHNlbGYgYmVpbmcgd2lwZWQgb3V0IHdoZW4gaXQncyB0aGUgb25seSBibG9jayBlbGVtZW50LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBhcyBvdXIgcmVmZXJlbmNlIGluc2lkZSB0aGlzLmVsZW1lbnRzIGdldHMgZGV0YWNoZWQgZnJvbSB0aGUgcGFnZSB3aGVuIGluc2VydEhUTUwgcnVucy5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gSWYgd2UganVzdCB1c2UgW3BhcmVudEVsZW1lbnQsIDBdIGFuZCBbcGFyZW50RWxlbWVudCwgcGFyZW50RWxlbWVudC5jaGlsZE5vZGVzLmxlbmd0aF1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gYXMgdGhlIHJhbmdlIGJvdW5kYXJpZXMsIHRoaXMgaGFwcGVucyB3aGVuZXZlciBwYXJlbnRFbGVtZW50ID09PSBjdXJyZW50RWRpdG9yLlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBUaGUgdHJhZGVvZmYgdG8gdGhpcyB3b3JrYXJvdW5kIGlzIHRoYXQgYSBvcnBoYW5lZCB0YWcgY2FuIHNvbWV0aW1lcyBiZSBsZWZ0IGJlaGluZCBhdFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyB0aGUgZW5kIG9mIHRoZSBlZGl0b3IncyBjb250ZW50LlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBJbiBHZWNrbzpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gYXMgYW4gZW1wdHkgPHN0cm9uZz48L3N0cm9uZz4gaWYgcGFyZW50RWxlbWVudC5sYXN0Q2hpbGQgaXMgYSA8c3Ryb25nPiB0YWcuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIEluIFdlYktpdDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gYW4gaW52ZW50ZWQgPGJyIC8+IHRhZyBhdCB0aGUgZW5kIGluIHRoZSBzYW1lIHNpdHVhdGlvblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBNZWRpdW1FZGl0b3Iuc2VsZWN0aW9uLnNlbGVjdChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMub3B0aW9ucy5vd25lckRvY3VtZW50LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGFyZW50RWxlbWVudC5maXJzdENoaWxkLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgMCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhcmVudEVsZW1lbnQubGFzdENoaWxkLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGFyZW50RWxlbWVudC5sYXN0Q2hpbGQubm9kZVR5cGUgPT09IDMgP1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGFyZW50RWxlbWVudC5sYXN0Q2hpbGQubm9kZVZhbHVlLmxlbmd0aCA6IHBhcmVudEVsZW1lbnQubGFzdENoaWxkLmNoaWxkTm9kZXMubGVuZ3RoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgTWVkaXVtRWRpdG9yLnNlbGVjdGlvbi5zZWxlY3QoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm9wdGlvbnMub3duZXJEb2N1bWVudCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhcmVudEVsZW1lbnQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAwLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGFyZW50RWxlbWVudCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhcmVudEVsZW1lbnQuY2hpbGROb2Rlcy5sZW5ndGhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgbW9kaWZpZWRFeHBvcnRlZFNlbGVjdGlvbiA9IHRoaXMuZXhwb3J0U2VsZWN0aW9uKCk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZXh0Tm9kZXMgPSBNZWRpdW1FZGl0b3IudXRpbC5maW5kT3JDcmVhdGVNYXRjaGluZ1RleHROb2RlcyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5vcHRpb25zLm93bmVyRG9jdW1lbnQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZyYWdtZW50LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGFydDogZXhwb3J0ZWRTZWxlY3Rpb24uc3RhcnQgLSBtb2RpZmllZEV4cG9ydGVkU2VsZWN0aW9uLnN0YXJ0LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZW5kOiBleHBvcnRlZFNlbGVjdGlvbi5lbmQgLSBtb2RpZmllZEV4cG9ydGVkU2VsZWN0aW9uLnN0YXJ0LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWRpdGFibGVFbGVtZW50SW5kZXg6IGV4cG9ydGVkU2VsZWN0aW9uLmVkaXRhYmxlRWxlbWVudEluZGV4XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIElmIHRleHROb2RlcyBhcmUgbm90IHByZXNlbnQsIHdoZW4gY2hhbmdpbmcgbGluayBvbiBpbWFnZXNcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBleDogPGE+PGltZyBzcmM9XCJodHRwOi8vaW1hZ2UudGVzdC5jb21cIj48L2E+LCBjaGFuZ2UgZnJhZ21lbnQgdG8gY3VyclJhbmdlLnN0YXJ0Q29udGFpbmVyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gYW5kIHNldCB0ZXh0Tm9kZXMgYXJyYXkgdG8gW2ltYWdlRWxlbWVudCwgaW1hZ2VFbGVtZW50XVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0ZXh0Tm9kZXMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZyYWdtZW50ID0gdGhpcy5vcHRpb25zLm93bmVyRG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmcmFnbWVudC5hcHBlbmRDaGlsZChjb21tb25BbmNlc3RvckNvbnRhaW5lci5jbG9uZU5vZGUodHJ1ZSkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZXh0Tm9kZXMgPSBbZnJhZ21lbnQuZmlyc3RDaGlsZC5maXJzdENoaWxkLCBmcmFnbWVudC5maXJzdENoaWxkLmxhc3RDaGlsZF07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gQ3JlYXRlcyB0aGUgbGluayBpbiB0aGUgZG9jdW1lbnQgZnJhZ21lbnRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBNZWRpdW1FZGl0b3IudXRpbC5jcmVhdGVMaW5rKHRoaXMub3B0aW9ucy5vd25lckRvY3VtZW50LCB0ZXh0Tm9kZXMsIHRhcmdldFVybC50cmltKCkpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gQ2hyb21lIHRyaW1zIHRoZSBsZWFkaW5nIHdoaXRlc3BhY2VzIHdoZW4gaW5zZXJ0aW5nIEhUTUwsIHdoaWNoIG1lc3NlcyB1cCByZXN0b3JpbmcgdGhlIHNlbGVjdGlvbi5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgbGVhZGluZ1doaXRlc3BhY2VzQ291bnQgPSAoZnJhZ21lbnQuZmlyc3RDaGlsZC5pbm5lckhUTUwubWF0Y2goL15cXHMrLykgfHwgWycnXSlbMF0ubGVuZ3RoO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gTm93IG1vdmUgdGhlIGNyZWF0ZWQgbGluayBiYWNrIGludG8gdGhlIG9yaWdpbmFsIGRvY3VtZW50IGluIGEgd2F5IHRvIHByZXNlcnZlIHVuZG8vcmVkbyBoaXN0b3J5XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgTWVkaXVtRWRpdG9yLnV0aWwuaW5zZXJ0SFRNTENvbW1hbmQodGhpcy5vcHRpb25zLm93bmVyRG9jdW1lbnQsIGZyYWdtZW50LmZpcnN0Q2hpbGQuaW5uZXJIVE1MLnJlcGxhY2UoL15cXHMrLywgJycpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBleHBvcnRlZFNlbGVjdGlvbi5zdGFydCAtPSBsZWFkaW5nV2hpdGVzcGFjZXNDb3VudDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBleHBvcnRlZFNlbGVjdGlvbi5lbmQgLT0gbGVhZGluZ1doaXRlc3BhY2VzQ291bnQ7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmltcG9ydFNlbGVjdGlvbihleHBvcnRlZFNlbGVjdGlvbik7XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMub3B0aW9ucy5vd25lckRvY3VtZW50LmV4ZWNDb21tYW5kKCdjcmVhdGVMaW5rJywgZmFsc2UsIHRhcmdldFVybCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLm9wdGlvbnMudGFyZ2V0QmxhbmsgfHwgb3B0cy50YXJnZXQgPT09ICdfYmxhbmsnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgTWVkaXVtRWRpdG9yLnV0aWwuc2V0VGFyZ2V0QmxhbmsoTWVkaXVtRWRpdG9yLnNlbGVjdGlvbi5nZXRTZWxlY3Rpb25TdGFydCh0aGlzLm9wdGlvbnMub3duZXJEb2N1bWVudCksIHRhcmdldFVybCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIE1lZGl1bUVkaXRvci51dGlsLnJlbW92ZVRhcmdldEJsYW5rKE1lZGl1bUVkaXRvci5zZWxlY3Rpb24uZ2V0U2VsZWN0aW9uU3RhcnQodGhpcy5vcHRpb25zLm93bmVyRG9jdW1lbnQpLCB0YXJnZXRVcmwpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAob3B0cy5idXR0b25DbGFzcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIE1lZGl1bUVkaXRvci51dGlsLmFkZENsYXNzVG9BbmNob3JzKE1lZGl1bUVkaXRvci5zZWxlY3Rpb24uZ2V0U2VsZWN0aW9uU3RhcnQodGhpcy5vcHRpb25zLm93bmVyRG9jdW1lbnQpLCBvcHRzLmJ1dHRvbkNsYXNzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvLyBGaXJlIGlucHV0IGV2ZW50IGZvciBiYWNrd2FyZHMgY29tcGF0aWJpbGl0eSBpZiBhbnlvbmUgd2FzIGxpc3RlbmluZyBkaXJlY3RseSB0byB0aGUgRE9NIGlucHV0IGV2ZW50XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMub3B0aW9ucy50YXJnZXRCbGFuayB8fCBvcHRzLnRhcmdldCA9PT0gJ19ibGFuaycgfHwgb3B0cy5idXR0b25DbGFzcykge1xuICAgICAgICAgICAgICAgICAgICBjdXN0b21FdmVudCA9IHRoaXMub3B0aW9ucy5vd25lckRvY3VtZW50LmNyZWF0ZUV2ZW50KCdIVE1MRXZlbnRzJyk7XG4gICAgICAgICAgICAgICAgICAgIGN1c3RvbUV2ZW50LmluaXRFdmVudCgnaW5wdXQnLCB0cnVlLCB0cnVlLCB0aGlzLm9wdGlvbnMuY29udGVudFdpbmRvdyk7XG4gICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwLCBsZW4gPSB0aGlzLmVsZW1lbnRzLmxlbmd0aDsgaSA8IGxlbjsgaSArPSAxKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmVsZW1lbnRzW2ldLmRpc3BhdGNoRXZlbnQoY3VzdG9tRXZlbnQpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgICAgICAgICB0aGlzLmV2ZW50cy5lbmFibGVDdXN0b21FdmVudCgnZWRpdGFibGVJbnB1dCcpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gRmlyZSBvdXIgY3VzdG9tIGVkaXRhYmxlSW5wdXQgZXZlbnRcbiAgICAgICAgICAgIHRoaXMuZXZlbnRzLnRyaWdnZXJDdXN0b21FdmVudCgnZWRpdGFibGVJbnB1dCcsIGN1c3RvbUV2ZW50LCBjdXJyZW50RWRpdG9yKTtcbiAgICAgICAgfSxcblxuICAgICAgICBjbGVhblBhc3RlOiBmdW5jdGlvbiAodGV4dCkge1xuICAgICAgICAgICAgdGhpcy5nZXRFeHRlbnNpb25CeU5hbWUoJ3Bhc3RlJykuY2xlYW5QYXN0ZSh0ZXh0KTtcbiAgICAgICAgfSxcblxuICAgICAgICBwYXN0ZUhUTUw6IGZ1bmN0aW9uIChodG1sLCBvcHRpb25zKSB7XG4gICAgICAgICAgICB0aGlzLmdldEV4dGVuc2lvbkJ5TmFtZSgncGFzdGUnKS5wYXN0ZUhUTUwoaHRtbCwgb3B0aW9ucyk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgc2V0Q29udGVudDogZnVuY3Rpb24gKGh0bWwsIGluZGV4KSB7XG4gICAgICAgICAgICBpbmRleCA9IGluZGV4IHx8IDA7XG5cbiAgICAgICAgICAgIGlmICh0aGlzLmVsZW1lbnRzW2luZGV4XSkge1xuICAgICAgICAgICAgICAgIHZhciB0YXJnZXQgPSB0aGlzLmVsZW1lbnRzW2luZGV4XTtcbiAgICAgICAgICAgICAgICB0YXJnZXQuaW5uZXJIVE1MID0gaHRtbDtcbiAgICAgICAgICAgICAgICB0aGlzLmNoZWNrQ29udGVudENoYW5nZWQodGFyZ2V0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICBnZXRDb250ZW50OiBmdW5jdGlvbiAoaW5kZXgpIHtcbiAgICAgICAgICAgIGluZGV4ID0gaW5kZXggfHwgMDtcblxuICAgICAgICAgICAgaWYgKHRoaXMuZWxlbWVudHNbaW5kZXhdKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZWxlbWVudHNbaW5kZXhdLmlubmVySFRNTC50cmltKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfSxcblxuICAgICAgICBjaGVja0NvbnRlbnRDaGFuZ2VkOiBmdW5jdGlvbiAoZWRpdGFibGUpIHtcbiAgICAgICAgICAgIGVkaXRhYmxlID0gZWRpdGFibGUgfHwgTWVkaXVtRWRpdG9yLnNlbGVjdGlvbi5nZXRTZWxlY3Rpb25FbGVtZW50KHRoaXMub3B0aW9ucy5jb250ZW50V2luZG93KTtcbiAgICAgICAgICAgIHRoaXMuZXZlbnRzLnVwZGF0ZUlucHV0KGVkaXRhYmxlLCB7IHRhcmdldDogZWRpdGFibGUsIGN1cnJlbnRUYXJnZXQ6IGVkaXRhYmxlIH0pO1xuICAgICAgICB9LFxuXG4gICAgICAgIHJlc2V0Q29udGVudDogZnVuY3Rpb24gKGVsZW1lbnQpIHtcbiAgICAgICAgICAgIC8vIEZvciBhbGwgZWxlbWVudHMgdGhhdCBleGlzdCBpbiB0aGUgdGhpcy5lbGVtZW50cyBhcnJheSwgd2UgY2FuIGFzc3VtZTpcbiAgICAgICAgICAgIC8vIC0gSXRzIGluaXRpYWwgY29udGVudCBoYXMgYmVlbiBzZXQgaW4gdGhlIGluaXRpYWxDb250ZW50IG9iamVjdFxuICAgICAgICAgICAgLy8gLSBJdCBoYXMgYSBtZWRpdW0tZWRpdG9yLWluZGV4IGF0dHJpYnV0ZSB3aGljaCBpcyB0aGUga2V5IHZhbHVlIGluIHRoZSBpbml0aWFsQ29udGVudCBvYmplY3RcblxuICAgICAgICAgICAgaWYgKGVsZW1lbnQpIHtcbiAgICAgICAgICAgICAgICB2YXIgaW5kZXggPSB0aGlzLmVsZW1lbnRzLmluZGV4T2YoZWxlbWVudCk7XG4gICAgICAgICAgICAgICAgaWYgKGluZGV4ICE9PSAtMSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldENvbnRlbnQoaW5pdGlhbENvbnRlbnRbZWxlbWVudC5nZXRBdHRyaWJ1dGUoJ21lZGl1bS1lZGl0b3ItaW5kZXgnKV0sIGluZGV4KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLmVsZW1lbnRzLmZvckVhY2goZnVuY3Rpb24gKGVsLCBpZHgpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNldENvbnRlbnQoaW5pdGlhbENvbnRlbnRbZWwuZ2V0QXR0cmlidXRlKCdtZWRpdW0tZWRpdG9yLWluZGV4JyldLCBpZHgpO1xuICAgICAgICAgICAgfSwgdGhpcyk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgYWRkRWxlbWVudHM6IGZ1bmN0aW9uIChzZWxlY3Rvcikge1xuICAgICAgICAgICAgLy8gQ29udmVydCBlbGVtZW50cyBpbnRvIGFuIGFycmF5XG4gICAgICAgICAgICB2YXIgZWxlbWVudHMgPSBjcmVhdGVFbGVtZW50c0FycmF5KHNlbGVjdG9yLCB0aGlzLm9wdGlvbnMub3duZXJEb2N1bWVudCwgdHJ1ZSk7XG5cbiAgICAgICAgICAgIC8vIERvIHdlIGhhdmUgZWxlbWVudHMgdG8gYWRkIG5vdz9cbiAgICAgICAgICAgIGlmIChlbGVtZW50cy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGVsZW1lbnRzLmZvckVhY2goZnVuY3Rpb24gKGVsZW1lbnQpIHtcbiAgICAgICAgICAgICAgICAvLyBJbml0aWFsaXplIGFsbCBuZXcgZWxlbWVudHMgKHdlIGNoZWNrIHRoYXQgaW4gdGhvc2UgZnVuY3Rpb25zIGRvbid0IHdvcnJ5KVxuICAgICAgICAgICAgICAgIGVsZW1lbnQgPSBpbml0RWxlbWVudC5jYWxsKHRoaXMsIGVsZW1lbnQsIHRoaXMuaWQpO1xuXG4gICAgICAgICAgICAgICAgLy8gQWRkIG5ldyBlbGVtZW50cyB0byBvdXIgaW50ZXJuYWwgZWxlbWVudHMgYXJyYXlcbiAgICAgICAgICAgICAgICB0aGlzLmVsZW1lbnRzLnB1c2goZWxlbWVudCk7XG5cbiAgICAgICAgICAgICAgICAvLyBUcmlnZ2VyIGV2ZW50IHNvIGV4dGVuc2lvbnMgY2FuIGtub3cgd2hlbiBhbiBlbGVtZW50IGhhcyBiZWVuIGFkZGVkXG4gICAgICAgICAgICAgICAgdGhpcy50cmlnZ2VyKCdhZGRFbGVtZW50JywgeyB0YXJnZXQ6IGVsZW1lbnQsIGN1cnJlbnRUYXJnZXQ6IGVsZW1lbnQgfSwgZWxlbWVudCk7XG4gICAgICAgICAgICB9LCB0aGlzKTtcbiAgICAgICAgfSxcblxuICAgICAgICByZW1vdmVFbGVtZW50czogZnVuY3Rpb24gKHNlbGVjdG9yKSB7XG4gICAgICAgICAgICAvLyBDb252ZXJ0IGVsZW1lbnRzIGludG8gYW4gYXJyYXlcbiAgICAgICAgICAgIHZhciBlbGVtZW50cyA9IGNyZWF0ZUVsZW1lbnRzQXJyYXkoc2VsZWN0b3IsIHRoaXMub3B0aW9ucy5vd25lckRvY3VtZW50KSxcbiAgICAgICAgICAgICAgICB0b1JlbW92ZSA9IGVsZW1lbnRzLm1hcChmdW5jdGlvbiAoZWwpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gRm9yIHRleHRhcmVhcywgbWFrZSBzdXJlIHdlJ3JlIGxvb2tpbmcgYXQgdGhlIGVkaXRvciBkaXYgYW5kIG5vdCB0aGUgdGV4dGFyZWEgaXRzZWxmXG4gICAgICAgICAgICAgICAgICAgIGlmIChlbC5nZXRBdHRyaWJ1dGUoJ21lZGl1bS1lZGl0b3ItdGV4dGFyZWEtaWQnKSAmJiBlbC5wYXJlbnROb2RlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZWwucGFyZW50Tm9kZS5xdWVyeVNlbGVjdG9yKCdkaXZbbWVkaXVtLWVkaXRvci10ZXh0YXJlYS1pZD1cIicgKyBlbC5nZXRBdHRyaWJ1dGUoJ21lZGl1bS1lZGl0b3ItdGV4dGFyZWEtaWQnKSArICdcIl0nKTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBlbDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICB0aGlzLmVsZW1lbnRzID0gdGhpcy5lbGVtZW50cy5maWx0ZXIoZnVuY3Rpb24gKGVsZW1lbnQpIHtcbiAgICAgICAgICAgICAgICAvLyBJZiB0aGlzIGlzIGFuIGVsZW1lbnQgd2Ugd2FudCB0byByZW1vdmVcbiAgICAgICAgICAgICAgICBpZiAodG9SZW1vdmUuaW5kZXhPZihlbGVtZW50KSAhPT0gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ldmVudHMuY2xlYW51cEVsZW1lbnQoZWxlbWVudCk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChlbGVtZW50LmdldEF0dHJpYnV0ZSgnbWVkaXVtLWVkaXRvci10ZXh0YXJlYS1pZCcpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjbGVhbnVwVGV4dGFyZWFFbGVtZW50KGVsZW1lbnQpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIC8vIFRyaWdnZXIgZXZlbnQgc28gZXh0ZW5zaW9ucyBjYW4gY2xlYW4tdXAgZWxlbWVudHMgdGhhdCBhcmUgYmVpbmcgcmVtb3ZlZFxuICAgICAgICAgICAgICAgICAgICB0aGlzLnRyaWdnZXIoJ3JlbW92ZUVsZW1lbnQnLCB7IHRhcmdldDogZWxlbWVudCwgY3VycmVudFRhcmdldDogZWxlbWVudCB9LCBlbGVtZW50KTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH0sIHRoaXMpO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIE1lZGl1bUVkaXRvci5nZXRFZGl0b3JGcm9tRWxlbWVudCA9IGZ1bmN0aW9uIChlbGVtZW50KSB7XG4gICAgICAgIHZhciBpbmRleCA9IGVsZW1lbnQuZ2V0QXR0cmlidXRlKCdkYXRhLW1lZGl1bS1lZGl0b3ItZWRpdG9yLWluZGV4JyksXG4gICAgICAgICAgICB3aW4gPSBlbGVtZW50ICYmIGVsZW1lbnQub3duZXJEb2N1bWVudCAmJiAoZWxlbWVudC5vd25lckRvY3VtZW50LmRlZmF1bHRWaWV3IHx8IGVsZW1lbnQub3duZXJEb2N1bWVudC5wYXJlbnRXaW5kb3cpO1xuICAgICAgICBpZiAod2luICYmIHdpbi5fbWVkaXVtRWRpdG9ycyAmJiB3aW4uX21lZGl1bUVkaXRvcnNbaW5kZXhdKSB7XG4gICAgICAgICAgICByZXR1cm4gd2luLl9tZWRpdW1FZGl0b3JzW2luZGV4XTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9O1xufSgpKTtcblxuKGZ1bmN0aW9uICgpIHtcbiAgICAvLyBzdW1tYXJ5OiBUaGUgZGVmYXVsdCBvcHRpb25zIGhhc2ggdXNlZCBieSB0aGUgRWRpdG9yXG5cbiAgICBNZWRpdW1FZGl0b3IucHJvdG90eXBlLmRlZmF1bHRzID0ge1xuICAgICAgICBhY3RpdmVCdXR0b25DbGFzczogJ21lZGl1bS1lZGl0b3ItYnV0dG9uLWFjdGl2ZScsXG4gICAgICAgIGJ1dHRvbkxhYmVsczogZmFsc2UsXG4gICAgICAgIGRlbGF5OiAwLFxuICAgICAgICBkaXNhYmxlUmV0dXJuOiBmYWxzZSxcbiAgICAgICAgZGlzYWJsZURvdWJsZVJldHVybjogZmFsc2UsXG4gICAgICAgIGRpc2FibGVFeHRyYVNwYWNlczogZmFsc2UsXG4gICAgICAgIGRpc2FibGVFZGl0aW5nOiBmYWxzZSxcbiAgICAgICAgYXV0b0xpbms6IGZhbHNlLFxuICAgICAgICBlbGVtZW50c0NvbnRhaW5lcjogZmFsc2UsXG4gICAgICAgIGNvbnRlbnRXaW5kb3c6IHdpbmRvdyxcbiAgICAgICAgb3duZXJEb2N1bWVudDogZG9jdW1lbnQsXG4gICAgICAgIHRhcmdldEJsYW5rOiBmYWxzZSxcbiAgICAgICAgZXh0ZW5zaW9uczoge30sXG4gICAgICAgIHNwZWxsY2hlY2s6IHRydWVcbiAgICB9O1xufSkoKTtcblxuTWVkaXVtRWRpdG9yLnBhcnNlVmVyc2lvblN0cmluZyA9IGZ1bmN0aW9uIChyZWxlYXNlKSB7XG4gICAgdmFyIHNwbGl0ID0gcmVsZWFzZS5zcGxpdCgnLScpLFxuICAgICAgICB2ZXJzaW9uID0gc3BsaXRbMF0uc3BsaXQoJy4nKSxcbiAgICAgICAgcHJlUmVsZWFzZSA9IChzcGxpdC5sZW5ndGggPiAxKSA/IHNwbGl0WzFdIDogJyc7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgbWFqb3I6IHBhcnNlSW50KHZlcnNpb25bMF0sIDEwKSxcbiAgICAgICAgbWlub3I6IHBhcnNlSW50KHZlcnNpb25bMV0sIDEwKSxcbiAgICAgICAgcmV2aXNpb246IHBhcnNlSW50KHZlcnNpb25bMl0sIDEwKSxcbiAgICAgICAgcHJlUmVsZWFzZTogcHJlUmVsZWFzZSxcbiAgICAgICAgdG9TdHJpbmc6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiBbdmVyc2lvblswXSwgdmVyc2lvblsxXSwgdmVyc2lvblsyXV0uam9pbignLicpICsgKHByZVJlbGVhc2UgPyAnLScgKyBwcmVSZWxlYXNlIDogJycpO1xuICAgICAgICB9XG4gICAgfTtcbn07XG5cbk1lZGl1bUVkaXRvci52ZXJzaW9uID0gTWVkaXVtRWRpdG9yLnBhcnNlVmVyc2lvblN0cmluZy5jYWxsKHRoaXMsICh7XG4gICAgLy8gZ3J1bnQtYnVtcCBsb29rcyBmb3IgdGhpczpcbiAgICAndmVyc2lvbic6ICc1LjIxLjEnXG59KS52ZXJzaW9uKTtcblxuICAgIHJldHVybiBNZWRpdW1FZGl0b3I7XG59KCkpKTtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L21lZGl1bS1lZGl0b3IvZGlzdC9qcy9tZWRpdW0tZWRpdG9yLmpzXG4gKiogbW9kdWxlIGlkID0gNjlcbiAqKiBtb2R1bGUgY2h1bmtzID0gMlxuICoqLyIsIi8vIHNoaW0gZm9yIHVzaW5nIHByb2Nlc3MgaW4gYnJvd3NlclxuXG52YXIgcHJvY2VzcyA9IG1vZHVsZS5leHBvcnRzID0ge307XG5cbi8vIGNhY2hlZCBmcm9tIHdoYXRldmVyIGdsb2JhbCBpcyBwcmVzZW50IHNvIHRoYXQgdGVzdCBydW5uZXJzIHRoYXQgc3R1YiBpdFxuLy8gZG9uJ3QgYnJlYWsgdGhpbmdzLiAgQnV0IHdlIG5lZWQgdG8gd3JhcCBpdCBpbiBhIHRyeSBjYXRjaCBpbiBjYXNlIGl0IGlzXG4vLyB3cmFwcGVkIGluIHN0cmljdCBtb2RlIGNvZGUgd2hpY2ggZG9lc24ndCBkZWZpbmUgYW55IGdsb2JhbHMuICBJdCdzIGluc2lkZSBhXG4vLyBmdW5jdGlvbiBiZWNhdXNlIHRyeS9jYXRjaGVzIGRlb3B0aW1pemUgaW4gY2VydGFpbiBlbmdpbmVzLlxuXG52YXIgY2FjaGVkU2V0VGltZW91dDtcbnZhciBjYWNoZWRDbGVhclRpbWVvdXQ7XG5cbihmdW5jdGlvbiAoKSB7XG4gIHRyeSB7XG4gICAgY2FjaGVkU2V0VGltZW91dCA9IHNldFRpbWVvdXQ7XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICBjYWNoZWRTZXRUaW1lb3V0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdzZXRUaW1lb3V0IGlzIG5vdCBkZWZpbmVkJyk7XG4gICAgfVxuICB9XG4gIHRyeSB7XG4gICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gY2xlYXJUaW1lb3V0O1xuICB9IGNhdGNoIChlKSB7XG4gICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdjbGVhclRpbWVvdXQgaXMgbm90IGRlZmluZWQnKTtcbiAgICB9XG4gIH1cbn0gKCkpXG52YXIgcXVldWUgPSBbXTtcbnZhciBkcmFpbmluZyA9IGZhbHNlO1xudmFyIGN1cnJlbnRRdWV1ZTtcbnZhciBxdWV1ZUluZGV4ID0gLTE7XG5cbmZ1bmN0aW9uIGNsZWFuVXBOZXh0VGljaygpIHtcbiAgICBpZiAoIWRyYWluaW5nIHx8ICFjdXJyZW50UXVldWUpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBkcmFpbmluZyA9IGZhbHNlO1xuICAgIGlmIChjdXJyZW50UXVldWUubGVuZ3RoKSB7XG4gICAgICAgIHF1ZXVlID0gY3VycmVudFF1ZXVlLmNvbmNhdChxdWV1ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcXVldWVJbmRleCA9IC0xO1xuICAgIH1cbiAgICBpZiAocXVldWUubGVuZ3RoKSB7XG4gICAgICAgIGRyYWluUXVldWUoKTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIGRyYWluUXVldWUoKSB7XG4gICAgaWYgKGRyYWluaW5nKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdmFyIHRpbWVvdXQgPSBjYWNoZWRTZXRUaW1lb3V0LmNhbGwobnVsbCwgY2xlYW5VcE5leHRUaWNrKTtcbiAgICBkcmFpbmluZyA9IHRydWU7XG5cbiAgICB2YXIgbGVuID0gcXVldWUubGVuZ3RoO1xuICAgIHdoaWxlKGxlbikge1xuICAgICAgICBjdXJyZW50UXVldWUgPSBxdWV1ZTtcbiAgICAgICAgcXVldWUgPSBbXTtcbiAgICAgICAgd2hpbGUgKCsrcXVldWVJbmRleCA8IGxlbikge1xuICAgICAgICAgICAgaWYgKGN1cnJlbnRRdWV1ZSkge1xuICAgICAgICAgICAgICAgIGN1cnJlbnRRdWV1ZVtxdWV1ZUluZGV4XS5ydW4oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBxdWV1ZUluZGV4ID0gLTE7XG4gICAgICAgIGxlbiA9IHF1ZXVlLmxlbmd0aDtcbiAgICB9XG4gICAgY3VycmVudFF1ZXVlID0gbnVsbDtcbiAgICBkcmFpbmluZyA9IGZhbHNlO1xuICAgIGNhY2hlZENsZWFyVGltZW91dC5jYWxsKG51bGwsIHRpbWVvdXQpO1xufVxuXG5wcm9jZXNzLm5leHRUaWNrID0gZnVuY3Rpb24gKGZ1bikge1xuICAgIHZhciBhcmdzID0gbmV3IEFycmF5KGFyZ3VtZW50cy5sZW5ndGggLSAxKTtcbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGFyZ3NbaSAtIDFdID0gYXJndW1lbnRzW2ldO1xuICAgICAgICB9XG4gICAgfVxuICAgIHF1ZXVlLnB1c2gobmV3IEl0ZW0oZnVuLCBhcmdzKSk7XG4gICAgaWYgKHF1ZXVlLmxlbmd0aCA9PT0gMSAmJiAhZHJhaW5pbmcpIHtcbiAgICAgICAgY2FjaGVkU2V0VGltZW91dC5jYWxsKG51bGwsIGRyYWluUXVldWUsIDApO1xuICAgIH1cbn07XG5cbi8vIHY4IGxpa2VzIHByZWRpY3RpYmxlIG9iamVjdHNcbmZ1bmN0aW9uIEl0ZW0oZnVuLCBhcnJheSkge1xuICAgIHRoaXMuZnVuID0gZnVuO1xuICAgIHRoaXMuYXJyYXkgPSBhcnJheTtcbn1cbkl0ZW0ucHJvdG90eXBlLnJ1biA9IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLmZ1bi5hcHBseShudWxsLCB0aGlzLmFycmF5KTtcbn07XG5wcm9jZXNzLnRpdGxlID0gJ2Jyb3dzZXInO1xucHJvY2Vzcy5icm93c2VyID0gdHJ1ZTtcbnByb2Nlc3MuZW52ID0ge307XG5wcm9jZXNzLmFyZ3YgPSBbXTtcbnByb2Nlc3MudmVyc2lvbiA9ICcnOyAvLyBlbXB0eSBzdHJpbmcgdG8gYXZvaWQgcmVnZXhwIGlzc3Vlc1xucHJvY2Vzcy52ZXJzaW9ucyA9IHt9O1xuXG5mdW5jdGlvbiBub29wKCkge31cblxucHJvY2Vzcy5vbiA9IG5vb3A7XG5wcm9jZXNzLmFkZExpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3Mub25jZSA9IG5vb3A7XG5wcm9jZXNzLm9mZiA9IG5vb3A7XG5wcm9jZXNzLnJlbW92ZUxpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3MucmVtb3ZlQWxsTGlzdGVuZXJzID0gbm9vcDtcbnByb2Nlc3MuZW1pdCA9IG5vb3A7XG5cbnByb2Nlc3MuYmluZGluZyA9IGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdwcm9jZXNzLmJpbmRpbmcgaXMgbm90IHN1cHBvcnRlZCcpO1xufTtcblxucHJvY2Vzcy5jd2QgPSBmdW5jdGlvbiAoKSB7IHJldHVybiAnLycgfTtcbnByb2Nlc3MuY2hkaXIgPSBmdW5jdGlvbiAoZGlyKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdwcm9jZXNzLmNoZGlyIGlzIG5vdCBzdXBwb3J0ZWQnKTtcbn07XG5wcm9jZXNzLnVtYXNrID0gZnVuY3Rpb24oKSB7IHJldHVybiAwOyB9O1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vcHJvY2Vzcy9icm93c2VyLmpzXG4gKiogbW9kdWxlIGlkID0gNzBcbiAqKiBtb2R1bGUgY2h1bmtzID0gMlxuICoqLyIsIihmdW5jdGlvbiAocm9vdCwgZmFjdG9yeSkge1xuICAndXNlIHN0cmljdCc7XG4gIHZhciBpc0VsZWN0cm9uID0gdHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcgJiYgcHJvY2VzcyAmJiBwcm9jZXNzLnZlcnNpb25zICYmIHByb2Nlc3MudmVyc2lvbnMuZWxlY3Ryb247XG4gIGlmICghaXNFbGVjdHJvbiAmJiB0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0Jykge1xuICAgIG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeTtcbiAgfSBlbHNlIGlmICh0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpIHtcbiAgICBkZWZpbmUoZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiBmYWN0b3J5O1xuICAgIH0pO1xuICB9IGVsc2Uge1xuICAgIHJvb3QuTWVkaXVtRWRpdG9yVGFibGUgPSBmYWN0b3J5O1xuICB9XG59KHRoaXMsIGZ1bmN0aW9uICgpIHtcblxuICAndXNlIHN0cmljdCc7XG5cbmZ1bmN0aW9uIGV4dGVuZChkZXN0LCBzb3VyY2UpIHtcbiAgICB2YXIgcHJvcDtcbiAgICBkZXN0ID0gZGVzdCB8fCB7fTtcbiAgICBmb3IgKHByb3AgaW4gc291cmNlKSB7XG4gICAgICAgIGlmIChzb3VyY2UuaGFzT3duUHJvcGVydHkocHJvcCkgJiYgIWRlc3QuaGFzT3duUHJvcGVydHkocHJvcCkpIHtcbiAgICAgICAgICAgIGRlc3RbcHJvcF0gPSBzb3VyY2VbcHJvcF07XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGRlc3Q7XG59XG5cbmZ1bmN0aW9uIGdldFNlbGVjdGlvblRleHQoZG9jKSB7XG4gICAgaWYgKGRvYy5nZXRTZWxlY3Rpb24pIHtcbiAgICAgICAgcmV0dXJuIGRvYy5nZXRTZWxlY3Rpb24oKS50b1N0cmluZygpO1xuICAgIH1cbiAgICBpZiAoZG9jLnNlbGVjdGlvbiAmJiBkb2Muc2VsZWN0aW9uLnR5cGUgIT09ICdDb250cm9sJykge1xuICAgICAgICByZXR1cm4gZG9jLnNlbGVjdGlvbi5jcmVhdGVSYW5nZSgpLnRleHQ7XG4gICAgfVxuICAgIHJldHVybiAnJztcbn1cblxuZnVuY3Rpb24gZ2V0U2VsZWN0aW9uU3RhcnQoZG9jKSB7XG4gICAgdmFyIG5vZGUgPSBkb2MuZ2V0U2VsZWN0aW9uKCkuYW5jaG9yTm9kZSxcbiAgICAgICAgc3RhcnROb2RlID0gKG5vZGUgJiYgbm9kZS5ub2RlVHlwZSA9PT0gMyA/IG5vZGUucGFyZW50Tm9kZSA6IG5vZGUpO1xuXG4gICAgcmV0dXJuIHN0YXJ0Tm9kZTtcbn1cblxuZnVuY3Rpb24gcGxhY2VDYXJldEF0Tm9kZShkb2MsIG5vZGUsIGJlZm9yZSkge1xuICAgIGlmIChkb2MuZ2V0U2VsZWN0aW9uICE9PSB1bmRlZmluZWQgJiYgbm9kZSkge1xuICAgICAgICB2YXIgcmFuZ2UgPSBkb2MuY3JlYXRlUmFuZ2UoKSxcbiAgICAgICAgICAgIHNlbGVjdGlvbiA9IGRvYy5nZXRTZWxlY3Rpb24oKTtcblxuICAgICAgICBpZiAoYmVmb3JlKSB7XG4gICAgICAgICAgICByYW5nZS5zZXRTdGFydEJlZm9yZShub2RlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJhbmdlLnNldFN0YXJ0QWZ0ZXIobm9kZSk7XG4gICAgICAgIH1cblxuICAgICAgICByYW5nZS5jb2xsYXBzZSh0cnVlKTtcblxuICAgICAgICBzZWxlY3Rpb24ucmVtb3ZlQWxsUmFuZ2VzKCk7XG4gICAgICAgIHNlbGVjdGlvbi5hZGRSYW5nZShyYW5nZSk7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBpc0luc2lkZUVsZW1lbnRPZlRhZyhub2RlLCB0YWcpIHtcbiAgICBpZiAoIW5vZGUpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIHZhciBwYXJlbnROb2RlID0gbm9kZS5wYXJlbnROb2RlLFxuICAgICAgICB0YWdOYW1lID0gcGFyZW50Tm9kZS50YWdOYW1lLnRvTG93ZXJDYXNlKCk7XG5cbiAgICB3aGlsZSAodGFnTmFtZSAhPT0gJ2JvZHknKSB7XG4gICAgICAgIGlmICh0YWdOYW1lID09PSB0YWcpIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIHBhcmVudE5vZGUgPSBwYXJlbnROb2RlLnBhcmVudE5vZGU7XG5cbiAgICAgICAgaWYgKHBhcmVudE5vZGUgJiYgcGFyZW50Tm9kZS50YWdOYW1lKSB7XG4gICAgICAgICAgICB0YWdOYW1lID0gcGFyZW50Tm9kZS50YWdOYW1lLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gZmFsc2U7XG59XG5cbmZ1bmN0aW9uIGdldFBhcmVudE9mKGVsLCB0YWdUYXJnZXQpIHtcbiAgICB2YXIgdGFnTmFtZSA9IGVsICYmIGVsLnRhZ05hbWUgPyBlbC50YWdOYW1lLnRvTG93ZXJDYXNlKCkgOiBmYWxzZTtcblxuICAgIGlmICghdGFnTmFtZSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHdoaWxlICh0YWdOYW1lICYmIHRhZ05hbWUgIT09ICdib2R5Jykge1xuICAgICAgICBpZiAodGFnTmFtZSA9PT0gdGFnVGFyZ2V0KSB7XG4gICAgICAgICAgICByZXR1cm4gZWw7XG4gICAgICAgIH1cbiAgICAgICAgZWwgPSBlbC5wYXJlbnROb2RlO1xuICAgICAgICB0YWdOYW1lID0gZWwgJiYgZWwudGFnTmFtZSA/IGVsLnRhZ05hbWUudG9Mb3dlckNhc2UoKSA6IGZhbHNlO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gR3JpZChlbCwgY2FsbGJhY2ssIHJvd3MsIGNvbHVtbnMpIHtcbiAgICByZXR1cm4gdGhpcy5pbml0KGVsLCBjYWxsYmFjaywgcm93cywgY29sdW1ucyk7XG59XG5cbkdyaWQucHJvdG90eXBlID0ge1xuICAgIGluaXQ6IGZ1bmN0aW9uIChlbCwgY2FsbGJhY2ssIHJvd3MsIGNvbHVtbnMpIHtcbiAgICAgICAgdGhpcy5fcm9vdCA9IGVsO1xuICAgICAgICB0aGlzLl9jYWxsYmFjayA9IGNhbGxiYWNrO1xuICAgICAgICB0aGlzLnJvd3MgPSByb3dzO1xuICAgICAgICB0aGlzLmNvbHVtbnMgPSBjb2x1bW5zO1xuICAgICAgICByZXR1cm4gdGhpcy5fcmVuZGVyKCk7XG4gICAgfSxcblxuICAgIHNldEN1cnJlbnRDZWxsOiBmdW5jdGlvbiAoY2VsbCkge1xuICAgICAgICB0aGlzLl9jdXJyZW50Q2VsbCA9IGNlbGw7XG4gICAgfSxcblxuICAgIG1hcmtDZWxsczogZnVuY3Rpb24gKCkge1xuICAgICAgICBbXS5mb3JFYWNoLmNhbGwodGhpcy5fY2VsbHNFbGVtZW50cywgZnVuY3Rpb24gKGVsKSB7XG4gICAgICAgICAgICB2YXIgY2VsbCA9IHtcbiAgICAgICAgICAgICAgICAgICAgY29sdW1uOiBwYXJzZUludChlbC5kYXRhc2V0LmNvbHVtbiwgMTApLFxuICAgICAgICAgICAgICAgICAgICByb3c6IHBhcnNlSW50KGVsLmRhdGFzZXQucm93LCAxMClcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGFjdGl2ZSA9IHRoaXMuX2N1cnJlbnRDZWxsICYmXG4gICAgICAgICAgICAgICAgICAgICAgICAgY2VsbC5yb3cgPD0gdGhpcy5fY3VycmVudENlbGwucm93ICYmXG4gICAgICAgICAgICAgICAgICAgICAgICAgY2VsbC5jb2x1bW4gPD0gdGhpcy5fY3VycmVudENlbGwuY29sdW1uO1xuXG4gICAgICAgICAgICBpZiAoYWN0aXZlID09PSB0cnVlKSB7XG4gICAgICAgICAgICAgICAgZWwuY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGVsLmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LmJpbmQodGhpcykpO1xuICAgIH0sXG5cbiAgICBfZ2VuZXJhdGVDZWxsczogZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgcm93ID0gLTE7XG5cbiAgICAgICAgdGhpcy5fY2VsbHMgPSBbXTtcblxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMucm93cyAqIHRoaXMuY29sdW1uczsgaSsrKSB7XG4gICAgICAgICAgICB2YXIgY29sdW1uID0gaSAlIHRoaXMuY29sdW1ucztcblxuICAgICAgICAgICAgaWYgKGNvbHVtbiA9PT0gMCkge1xuICAgICAgICAgICAgICAgIHJvdysrO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLl9jZWxscy5wdXNoKHtcbiAgICAgICAgICAgICAgICBjb2x1bW46IGNvbHVtbixcbiAgICAgICAgICAgICAgICByb3c6IHJvdyxcbiAgICAgICAgICAgICAgICBhY3RpdmU6IGZhbHNlXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBfaHRtbDogZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgd2lkdGggPSB0aGlzLmNvbHVtbnMgKiBDT0xVTU5fV0lEVEggKyBCT1JERVJfV0lEVEggKiAyLFxuICAgICAgICAgICAgaGVpZ2h0ID0gdGhpcy5yb3dzICogQ09MVU1OX1dJRFRIICsgQk9SREVSX1dJRFRIICogMixcbiAgICAgICAgICAgIGh0bWwgPSAnPGRpdiBjbGFzcz1cIm1lZGl1bS1lZGl0b3ItdGFibGUtYnVpbGRlci1ncmlkIGNsZWFyZml4XCIgc3R5bGU9XCJ3aWR0aDonICsgd2lkdGggKyAncHg7aGVpZ2h0OicgKyBoZWlnaHQgKyAncHg7XCI+JztcbiAgICAgICAgaHRtbCArPSB0aGlzLl9jZWxsc0hUTUwoKTtcbiAgICAgICAgaHRtbCArPSAnPC9kaXY+JztcbiAgICAgICAgcmV0dXJuIGh0bWw7XG4gICAgfSxcblxuICAgIF9jZWxsc0hUTUw6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGh0bWwgPSAnJztcbiAgICAgICAgdGhpcy5fZ2VuZXJhdGVDZWxscygpO1xuICAgICAgICB0aGlzLl9jZWxscy5tYXAoZnVuY3Rpb24gKGNlbGwpIHtcbiAgICAgICAgICAgIGh0bWwgKz0gJzxhIGhyZWY9XCIjXCIgY2xhc3M9XCJtZWRpdW0tZWRpdG9yLXRhYmxlLWJ1aWxkZXItY2VsbCcgK1xuICAgICAgICAgICAgICAgICAgICAoY2VsbC5hY3RpdmUgPT09IHRydWUgPyAnIGFjdGl2ZScgOiAnJykgK1xuICAgICAgICAgICAgICAgICAgICAnXCIgJyArICdkYXRhLXJvdz1cIicgKyBjZWxsLnJvdyArXG4gICAgICAgICAgICAgICAgICAgICdcIiBkYXRhLWNvbHVtbj1cIicgKyBjZWxsLmNvbHVtbiArICdcIj4nO1xuICAgICAgICAgICAgaHRtbCArPSAnPC9hPic7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gaHRtbDtcbiAgICB9LFxuXG4gICAgX3JlbmRlcjogZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLl9yb290LmlubmVySFRNTCA9IHRoaXMuX2h0bWwoKTtcbiAgICAgICAgdGhpcy5fY2VsbHNFbGVtZW50cyA9IHRoaXMuX3Jvb3QucXVlcnlTZWxlY3RvckFsbCgnYScpO1xuICAgICAgICB0aGlzLl9iaW5kRXZlbnRzKCk7XG4gICAgfSxcblxuICAgIF9iaW5kRXZlbnRzOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIFtdLmZvckVhY2guY2FsbCh0aGlzLl9jZWxsc0VsZW1lbnRzLCBmdW5jdGlvbiAoZWwpIHtcbiAgICAgICAgICAgIHRoaXMuX29uTW91c2VFbnRlcihlbCk7XG4gICAgICAgICAgICB0aGlzLl9vbkNsaWNrKGVsKTtcbiAgICAgICAgfS5iaW5kKHRoaXMpKTtcbiAgICB9LFxuXG4gICAgX29uTW91c2VFbnRlcjogZnVuY3Rpb24gKGVsKSB7XG4gICAgICAgIHZhciBzZWxmID0gdGhpcyxcbiAgICAgICAgICAgIHRpbWVyO1xuXG4gICAgICAgIGVsLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZW50ZXInLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBjbGVhclRpbWVvdXQodGltZXIpO1xuXG4gICAgICAgICAgICB2YXIgZGF0YXNldCA9IHRoaXMuZGF0YXNldDtcblxuICAgICAgICAgICAgdGltZXIgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBzZWxmLl9jdXJyZW50Q2VsbCA9IHtcbiAgICAgICAgICAgICAgICAgICAgY29sdW1uOiBwYXJzZUludChkYXRhc2V0LmNvbHVtbiwgMTApLFxuICAgICAgICAgICAgICAgICAgICByb3c6IHBhcnNlSW50KGRhdGFzZXQucm93LCAxMClcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIHNlbGYubWFya0NlbGxzKCk7XG4gICAgICAgICAgICB9LCA1MCk7XG4gICAgICAgIH0pO1xuICAgIH0sXG5cbiAgICBfb25DbGljazogZnVuY3Rpb24gKGVsKSB7XG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgZWwuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgc2VsZi5fY2FsbGJhY2sodGhpcy5kYXRhc2V0LnJvdywgdGhpcy5kYXRhc2V0LmNvbHVtbik7XG4gICAgICAgIH0pO1xuICAgIH1cbn07XG5cbmZ1bmN0aW9uIEJ1aWxkZXIob3B0aW9ucykge1xuICAgIHJldHVybiB0aGlzLmluaXQob3B0aW9ucyk7XG59XG5cbkJ1aWxkZXIucHJvdG90eXBlID0ge1xuICAgIGluaXQ6IGZ1bmN0aW9uIChvcHRpb25zKSB7XG4gICAgICAgIHRoaXMub3B0aW9ucyA9IG9wdGlvbnM7XG4gICAgICAgIHRoaXMuX2RvYyA9IG9wdGlvbnMub3duZXJEb2N1bWVudCB8fCBkb2N1bWVudDtcbiAgICAgICAgdGhpcy5fcm9vdCA9IHRoaXMuX2RvYy5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgdGhpcy5fcm9vdC5jbGFzc05hbWUgPSAnbWVkaXVtLWVkaXRvci10YWJsZS1idWlsZGVyJztcbiAgICAgICAgdGhpcy5ncmlkID0gbmV3IEdyaWQoXG4gICAgICAgICAgdGhpcy5fcm9vdCxcbiAgICAgICAgICB0aGlzLm9wdGlvbnMub25DbGljayxcbiAgICAgICAgICB0aGlzLm9wdGlvbnMucm93cyxcbiAgICAgICAgICB0aGlzLm9wdGlvbnMuY29sdW1uc1xuICAgICAgICApO1xuXG4gICAgICAgIHRoaXMuX3JhbmdlID0gbnVsbDtcbiAgICAgICAgdGhpcy5fdG9vbGJhciA9IHRoaXMuX2RvYy5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgdGhpcy5fdG9vbGJhci5jbGFzc05hbWUgPSAnbWVkaXVtLWVkaXRvci10YWJsZS1idWlsZGVyLXRvb2xiYXInO1xuXG4gICAgICAgIHZhciBzcGFuUm93ID0gdGhpcy5fZG9jLmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgICAgICAgc3BhblJvdy5pbm5lckhUTUwgPSAnUm93Oic7XG4gICAgICAgIHRoaXMuX3Rvb2xiYXIuYXBwZW5kQ2hpbGQoc3BhblJvdyk7XG4gICAgICAgIHZhciBhZGRSb3dCZWZvcmUgPSB0aGlzLl9kb2MuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG4gICAgICAgIGFkZFJvd0JlZm9yZS50aXRsZSA9ICdBZGQgcm93IGJlZm9yZSc7XG4gICAgICAgIGFkZFJvd0JlZm9yZS5pbm5lckhUTUwgPSAnPGkgY2xhc3M9XCJmYSBmYS1sb25nLWFycm93LXVwXCI+PC9pPic7XG4gICAgICAgIGFkZFJvd0JlZm9yZS5vbmNsaWNrID0gdGhpcy5hZGRSb3cuYmluZCh0aGlzLCB0cnVlKTtcbiAgICAgICAgdGhpcy5fdG9vbGJhci5hcHBlbmRDaGlsZChhZGRSb3dCZWZvcmUpO1xuXG4gICAgICAgIHZhciBhZGRSb3dBZnRlciA9IHRoaXMuX2RvYy5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbiAgICAgICAgYWRkUm93QWZ0ZXIudGl0bGUgPSAnQWRkIHJvdyBhZnRlcic7XG4gICAgICAgIGFkZFJvd0FmdGVyLmlubmVySFRNTCA9ICc8aSBjbGFzcz1cImZhIGZhLWxvbmctYXJyb3ctZG93blwiPjwvaT4nO1xuICAgICAgICBhZGRSb3dBZnRlci5vbmNsaWNrID0gdGhpcy5hZGRSb3cuYmluZCh0aGlzLCBmYWxzZSk7XG4gICAgICAgIHRoaXMuX3Rvb2xiYXIuYXBwZW5kQ2hpbGQoYWRkUm93QWZ0ZXIpO1xuXG4gICAgICAgIHZhciByZW1Sb3cgPSB0aGlzLl9kb2MuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG4gICAgICAgIHJlbVJvdy50aXRsZSA9ICdSZW1vdmUgcm93JztcbiAgICAgICAgcmVtUm93LmlubmVySFRNTCA9ICc8aSBjbGFzcz1cImZhIGZhLWNsb3NlXCI+PC9pPic7XG4gICAgICAgIHJlbVJvdy5vbmNsaWNrID0gdGhpcy5yZW1vdmVSb3cuYmluZCh0aGlzKTtcbiAgICAgICAgdGhpcy5fdG9vbGJhci5hcHBlbmRDaGlsZChyZW1Sb3cpO1xuXG4gICAgICAgIHZhciBzcGFuQ29sID0gdGhpcy5fZG9jLmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgICAgICAgc3BhbkNvbC5pbm5lckhUTUwgPSAnQ29sdW1uOic7XG4gICAgICAgIHRoaXMuX3Rvb2xiYXIuYXBwZW5kQ2hpbGQoc3BhbkNvbCk7XG4gICAgICAgIHZhciBhZGRDb2x1bW5CZWZvcmUgPSB0aGlzLl9kb2MuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG4gICAgICAgIGFkZENvbHVtbkJlZm9yZS50aXRsZSA9ICdBZGQgY29sdW1uIGJlZm9yZSc7XG4gICAgICAgIGFkZENvbHVtbkJlZm9yZS5pbm5lckhUTUwgPSAnPGkgY2xhc3M9XCJmYSBmYS1sb25nLWFycm93LWxlZnRcIj48L2k+JztcbiAgICAgICAgYWRkQ29sdW1uQmVmb3JlLm9uY2xpY2sgPSB0aGlzLmFkZENvbHVtbi5iaW5kKHRoaXMsIHRydWUpO1xuICAgICAgICB0aGlzLl90b29sYmFyLmFwcGVuZENoaWxkKGFkZENvbHVtbkJlZm9yZSk7XG5cbiAgICAgICAgdmFyIGFkZENvbHVtbkFmdGVyID0gdGhpcy5fZG9jLmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuICAgICAgICBhZGRDb2x1bW5BZnRlci50aXRsZSA9ICdBZGQgY29sdW1uIGFmdGVyJztcbiAgICAgICAgYWRkQ29sdW1uQWZ0ZXIuaW5uZXJIVE1MID0gJzxpIGNsYXNzPVwiZmEgZmEtbG9uZy1hcnJvdy1yaWdodFwiPjwvaT4nO1xuICAgICAgICBhZGRDb2x1bW5BZnRlci5vbmNsaWNrID0gdGhpcy5hZGRDb2x1bW4uYmluZCh0aGlzLCBmYWxzZSk7XG4gICAgICAgIHRoaXMuX3Rvb2xiYXIuYXBwZW5kQ2hpbGQoYWRkQ29sdW1uQWZ0ZXIpO1xuXG4gICAgICAgIHZhciByZW1Db2x1bW4gPSB0aGlzLl9kb2MuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG4gICAgICAgIHJlbUNvbHVtbi50aXRsZSA9ICdSZW1vdmUgY29sdW1uJztcbiAgICAgICAgcmVtQ29sdW1uLmlubmVySFRNTCA9ICc8aSBjbGFzcz1cImZhIGZhLWNsb3NlXCI+PC9pPic7XG4gICAgICAgIHJlbUNvbHVtbi5vbmNsaWNrID0gdGhpcy5yZW1vdmVDb2x1bW4uYmluZCh0aGlzKTtcbiAgICAgICAgdGhpcy5fdG9vbGJhci5hcHBlbmRDaGlsZChyZW1Db2x1bW4pO1xuXG4gICAgICAgIHZhciByZW1UYWJsZSA9IHRoaXMuX2RvYy5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbiAgICAgICAgcmVtVGFibGUudGl0bGUgPSAnUmVtb3ZlIHRhYmxlJztcbiAgICAgICAgcmVtVGFibGUuaW5uZXJIVE1MID0gJzxpIGNsYXNzPVwiZmEgZmEtdHJhc2gtb1wiPjwvaT4nO1xuICAgICAgICByZW1UYWJsZS5vbmNsaWNrID0gdGhpcy5yZW1vdmVUYWJsZS5iaW5kKHRoaXMpO1xuICAgICAgICB0aGlzLl90b29sYmFyLmFwcGVuZENoaWxkKHJlbVRhYmxlKTtcblxuICAgICAgICB2YXIgZ3JpZCA9IHRoaXMuX3Jvb3QuY2hpbGROb2Rlc1swXTtcbiAgICAgICAgdGhpcy5fcm9vdC5pbnNlcnRCZWZvcmUodGhpcy5fdG9vbGJhciwgZ3JpZCk7XG4gICAgfSxcblxuICAgIGdldEVsZW1lbnQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3Jvb3Q7XG4gICAgfSxcblxuICAgIGhpZGU6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5fcm9vdC5zdHlsZS5kaXNwbGF5ID0gJyc7XG4gICAgICAgIHRoaXMuZ3JpZC5zZXRDdXJyZW50Q2VsbCh7IGNvbHVtbjogLTEsIHJvdzogLTEgfSk7XG4gICAgICAgIHRoaXMuZ3JpZC5tYXJrQ2VsbHMoKTtcbiAgICB9LFxuXG4gICAgc2hvdzogZnVuY3Rpb24gKGxlZnQpIHtcbiAgICAgICAgdGhpcy5fcm9vdC5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcbiAgICAgICAgdGhpcy5fcm9vdC5zdHlsZS5sZWZ0ID0gbGVmdCArICdweCc7XG4gICAgfSxcblxuICAgIHNldEVkaXRvcjogZnVuY3Rpb24gKHJhbmdlKSB7XG4gICAgICAgIHRoaXMuX3JhbmdlID0gcmFuZ2U7XG4gICAgICAgIHRoaXMuX3Rvb2xiYXIuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG4gICAgfSxcblxuICAgIHNldEJ1aWxkZXI6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5fcmFuZ2UgPSBudWxsO1xuICAgICAgICB0aGlzLl90b29sYmFyLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgICAgIHZhciBlbGVtZW50cyA9IHRoaXMuX2RvYy5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdtZWRpdW0tZWRpdG9yLXRhYmxlLWJ1aWxkZXItZ3JpZCcpO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGVsZW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBlbGVtZW50c1tpXS5zdHlsZS5oZWlnaHQgPSAoQ09MVU1OX1dJRFRIICogdGhpcy5yb3dzICsgQk9SREVSX1dJRFRIICogMikgKyAncHgnO1xuICAgICAgICAgICAgZWxlbWVudHNbaV0uc3R5bGUud2lkdGggPSAoQ09MVU1OX1dJRFRIICogdGhpcy5jb2x1bW5zICsgQk9SREVSX1dJRFRIICogMikgKyAncHgnO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIGFkZFJvdzogZnVuY3Rpb24gKGJlZm9yZSwgZSkge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgIHZhciB0Ym9keSA9IHRoaXMuX3JhbmdlLnBhcmVudE5vZGUucGFyZW50Tm9kZSxcbiAgICAgICAgICAgIHRyID0gdGhpcy5fZG9jLmNyZWF0ZUVsZW1lbnQoJ3RyJyksXG4gICAgICAgICAgICB0ZDtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLl9yYW5nZS5wYXJlbnROb2RlLmNoaWxkTm9kZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHRkID0gdGhpcy5fZG9jLmNyZWF0ZUVsZW1lbnQoJ3RkJyk7XG4gICAgICAgICAgICB0ZC5hcHBlbmRDaGlsZCh0aGlzLl9kb2MuY3JlYXRlRWxlbWVudCgnYnInKSk7XG4gICAgICAgICAgICB0ci5hcHBlbmRDaGlsZCh0ZCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGJlZm9yZSAhPT0gdHJ1ZSAmJiB0aGlzLl9yYW5nZS5wYXJlbnROb2RlLm5leHRTaWJsaW5nKSB7XG4gICAgICAgICAgICB0Ym9keS5pbnNlcnRCZWZvcmUodHIsIHRoaXMuX3JhbmdlLnBhcmVudE5vZGUubmV4dFNpYmxpbmcpO1xuICAgICAgICB9IGVsc2UgaWYgKGJlZm9yZSA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgdGJvZHkuaW5zZXJ0QmVmb3JlKHRyLCB0aGlzLl9yYW5nZS5wYXJlbnROb2RlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRib2R5LmFwcGVuZENoaWxkKHRyKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLm9wdGlvbnMub25DbGljaygwLCAwKTtcbiAgICB9LFxuXG4gICAgcmVtb3ZlUm93OiBmdW5jdGlvbiAoZSkge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgIHRoaXMuX3JhbmdlLnBhcmVudE5vZGUucGFyZW50Tm9kZS5yZW1vdmVDaGlsZCh0aGlzLl9yYW5nZS5wYXJlbnROb2RlKTtcbiAgICAgICAgdGhpcy5vcHRpb25zLm9uQ2xpY2soMCwgMCk7XG4gICAgfSxcblxuICAgIGFkZENvbHVtbjogZnVuY3Rpb24gKGJlZm9yZSwgZSkge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgIHZhciBjZWxsID0gQXJyYXkucHJvdG90eXBlLmluZGV4T2YuY2FsbCh0aGlzLl9yYW5nZS5wYXJlbnROb2RlLmNoaWxkTm9kZXMsIHRoaXMuX3JhbmdlKSxcbiAgICAgICAgICAgIHRib2R5ID0gdGhpcy5fcmFuZ2UucGFyZW50Tm9kZS5wYXJlbnROb2RlLFxuICAgICAgICAgICAgdGQ7XG5cbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0Ym9keS5jaGlsZE5vZGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICB0ZCA9IHRoaXMuX2RvYy5jcmVhdGVFbGVtZW50KCd0ZCcpO1xuICAgICAgICAgICAgdGQuYXBwZW5kQ2hpbGQodGhpcy5fZG9jLmNyZWF0ZUVsZW1lbnQoJ2JyJykpO1xuICAgICAgICAgICAgaWYgKGJlZm9yZSA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgIHRib2R5LmNoaWxkTm9kZXNbaV0uaW5zZXJ0QmVmb3JlKHRkLCB0Ym9keS5jaGlsZE5vZGVzW2ldLmNoaWxkTm9kZXNbY2VsbF0pO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLl9yYW5nZS5wYXJlbnROb2RlLnBhcmVudE5vZGUuY2hpbGROb2Rlc1tpXS5jaGlsZE5vZGVzW2NlbGxdLm5leHRTaWJsaW5nKSB7XG4gICAgICAgICAgICAgICAgdGJvZHkuY2hpbGROb2Rlc1tpXS5pbnNlcnRCZWZvcmUodGQsIHRib2R5LmNoaWxkTm9kZXNbaV0uY2hpbGROb2Rlc1tjZWxsXS5uZXh0U2libGluZyk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRib2R5LmNoaWxkTm9kZXNbaV0uYXBwZW5kQ2hpbGQodGQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5vcHRpb25zLm9uQ2xpY2soMCwgMCk7XG4gICAgfSxcblxuICAgIHJlbW92ZUNvbHVtbjogZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICB2YXIgY2VsbCA9IEFycmF5LnByb3RvdHlwZS5pbmRleE9mLmNhbGwodGhpcy5fcmFuZ2UucGFyZW50Tm9kZS5jaGlsZE5vZGVzLCB0aGlzLl9yYW5nZSksXG4gICAgICAgICAgICB0Ym9keSA9IHRoaXMuX3JhbmdlLnBhcmVudE5vZGUucGFyZW50Tm9kZSxcbiAgICAgICAgICAgIHJvd3MgPSB0Ym9keS5jaGlsZE5vZGVzLmxlbmd0aDtcblxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHJvd3M7IGkrKykge1xuICAgICAgICAgICAgdGJvZHkuY2hpbGROb2Rlc1tpXS5yZW1vdmVDaGlsZCh0Ym9keS5jaGlsZE5vZGVzW2ldLmNoaWxkTm9kZXNbY2VsbF0pO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMub3B0aW9ucy5vbkNsaWNrKDAsIDApO1xuICAgIH0sXG5cbiAgICByZW1vdmVUYWJsZTogZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICB2YXIgY2VsbCA9IEFycmF5LnByb3RvdHlwZS5pbmRleE9mLmNhbGwodGhpcy5fcmFuZ2UucGFyZW50Tm9kZS5jaGlsZE5vZGVzLCB0aGlzLl9yYW5nZSksXG4gICAgICAgICAgICB0YWJsZSA9IHRoaXMuX3JhbmdlLnBhcmVudE5vZGUucGFyZW50Tm9kZS5wYXJlbnROb2RlO1xuXG4gICAgICAgIHRhYmxlLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQodGFibGUpO1xuICAgICAgICB0aGlzLm9wdGlvbnMub25DbGljaygwLCAwKTtcbiAgICB9XG59O1xuXG5mdW5jdGlvbiBUYWJsZShlZGl0b3IpIHtcbiAgICByZXR1cm4gdGhpcy5pbml0KGVkaXRvcik7XG59XG5cbnZhciBUQUJfS0VZX0NPREUgPSA5O1xuXG5UYWJsZS5wcm90b3R5cGUgPSB7XG4gICAgaW5pdDogZnVuY3Rpb24gKGVkaXRvcikge1xuICAgICAgICB0aGlzLl9lZGl0b3IgPSBlZGl0b3I7XG4gICAgICAgIHRoaXMuX2RvYyA9IHRoaXMuX2VkaXRvci5vcHRpb25zLm93bmVyRG9jdW1lbnQ7XG4gICAgICAgIHRoaXMuX2JpbmRUYWJCZWhhdmlvcigpO1xuICAgIH0sXG5cbiAgICBpbnNlcnQ6IGZ1bmN0aW9uIChyb3dzLCBjb2xzKSB7XG4gICAgICAgIHZhciBodG1sID0gdGhpcy5faHRtbChyb3dzLCBjb2xzKTtcblxuICAgICAgICB0aGlzLl9lZGl0b3IucGFzdGVIVE1MKFxuICAgICAgICAgICAgJzx0YWJsZSBjbGFzcz1cIm1lZGl1bS1lZGl0b3ItdGFibGVcIiBpZD1cIm1lZGl1bS1lZGl0b3ItdGFibGVcIicgK1xuICAgICAgICAgICAgJyB3aWR0aD1cIjEwMCVcIj4nICtcbiAgICAgICAgICAgICc8dGJvZHk+JyArXG4gICAgICAgICAgICBodG1sICtcbiAgICAgICAgICAgICc8L3Rib2R5PicgK1xuICAgICAgICAgICAgJzwvdGFibGU+Jywge1xuICAgICAgICAgICAgICAgIGNsZWFuQXR0cnM6IFtdLFxuICAgICAgICAgICAgICAgIGNsZWFuVGFnczogW11cbiAgICAgICAgICAgIH1cbiAgICAgICAgKTtcblxuICAgICAgICB2YXIgdGFibGUgPSB0aGlzLl9kb2MuZ2V0RWxlbWVudEJ5SWQoJ21lZGl1bS1lZGl0b3ItdGFibGUnKTtcbiAgICAgICAgdGFibGUucmVtb3ZlQXR0cmlidXRlKCdpZCcpO1xuICAgICAgICBwbGFjZUNhcmV0QXROb2RlKHRoaXMuX2RvYywgdGFibGUucXVlcnlTZWxlY3RvcigndGQnKSwgdHJ1ZSk7XG5cbiAgICAgICAgdGhpcy5fZWRpdG9yLmNoZWNrU2VsZWN0aW9uKCk7XG4gICAgfSxcblxuICAgIF9odG1sOiBmdW5jdGlvbiAocm93cywgY29scykge1xuICAgICAgICB2YXIgaHRtbCA9ICcnLFxuICAgICAgICAgICAgeCwgeSxcbiAgICAgICAgICAgIHRleHQgPSBnZXRTZWxlY3Rpb25UZXh0KHRoaXMuX2RvYyk7XG5cbiAgICAgICAgZm9yICh4ID0gMDsgeCA8PSByb3dzOyB4KyspIHtcbiAgICAgICAgICAgIGh0bWwgKz0gJzx0cj4nO1xuICAgICAgICAgICAgZm9yICh5ID0gMDsgeSA8PSBjb2xzOyB5KyspIHtcbiAgICAgICAgICAgICAgICBodG1sICs9ICc8dGQ+JyArICh4ID09PSAwICYmIHkgPT09IDAgPyB0ZXh0IDogJzxiciAvPicpICsgJzwvdGQ+JztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGh0bWwgKz0gJzwvdHI+JztcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gaHRtbDtcbiAgICB9LFxuXG4gICAgX2JpbmRUYWJCZWhhdmlvcjogZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgIFtdLmZvckVhY2guY2FsbCh0aGlzLl9lZGl0b3IuZWxlbWVudHMsIGZ1bmN0aW9uIChlbCkge1xuICAgICAgICAgICAgZWwuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICAgICAgc2VsZi5fb25LZXlEb3duKGUpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH0sXG5cbiAgICBfb25LZXlEb3duOiBmdW5jdGlvbiAoZSkge1xuICAgICAgICB2YXIgZWwgPSBnZXRTZWxlY3Rpb25TdGFydCh0aGlzLl9kb2MpLFxuICAgICAgICAgICAgdGFibGU7XG5cbiAgICAgICAgaWYgKGUud2hpY2ggPT09IFRBQl9LRVlfQ09ERSAmJiBpc0luc2lkZUVsZW1lbnRPZlRhZyhlbCwgJ3RhYmxlJykpIHtcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgICB0YWJsZSA9IHRoaXMuX2dldFRhYmxlRWxlbWVudHMoZWwpO1xuICAgICAgICAgICAgaWYgKGUuc2hpZnRLZXkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl90YWJCYWNrd2FyZHMoZWwucHJldmlvdXNTaWJsaW5nLCB0YWJsZS5yb3cpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5faXNMYXN0Q2VsbChlbCwgdGFibGUucm93LCB0YWJsZS5yb290KSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9pbnNlcnRSb3coZ2V0UGFyZW50T2YoZWwsICd0Ym9keScpLCB0YWJsZS5yb3cuY2VsbHMubGVuZ3RoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcGxhY2VDYXJldEF0Tm9kZSh0aGlzLl9kb2MsIGVsKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBfZ2V0VGFibGVFbGVtZW50czogZnVuY3Rpb24gKGVsKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBjZWxsOiBnZXRQYXJlbnRPZihlbCwgJ3RkJyksXG4gICAgICAgICAgICByb3c6IGdldFBhcmVudE9mKGVsLCAndHInKSxcbiAgICAgICAgICAgIHJvb3Q6IGdldFBhcmVudE9mKGVsLCAndGFibGUnKVxuICAgICAgICB9O1xuICAgIH0sXG5cbiAgICBfdGFiQmFja3dhcmRzOiBmdW5jdGlvbiAoZWwsIHJvdykge1xuICAgICAgICBlbCA9IGVsIHx8IHRoaXMuX2dldFByZXZpb3VzUm93TGFzdENlbGwocm93KTtcbiAgICAgICAgcGxhY2VDYXJldEF0Tm9kZSh0aGlzLl9kb2MsIGVsLCB0cnVlKTtcbiAgICB9LFxuXG4gICAgX2luc2VydFJvdzogZnVuY3Rpb24gKHRib2R5LCBjb2xzKSB7XG4gICAgICAgIHZhciB0ciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RyJyksXG4gICAgICAgICAgICBodG1sID0gJycsXG4gICAgICAgICAgICBpO1xuXG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCBjb2xzOyBpICs9IDEpIHtcbiAgICAgICAgICAgIGh0bWwgKz0gJzx0ZD48YnIgLz48L3RkPic7XG4gICAgICAgIH1cbiAgICAgICAgdHIuaW5uZXJIVE1MID0gaHRtbDtcbiAgICAgICAgdGJvZHkuYXBwZW5kQ2hpbGQodHIpO1xuICAgIH0sXG5cbiAgICBfaXNMYXN0Q2VsbDogZnVuY3Rpb24gKGVsLCByb3csIHRhYmxlKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgKHJvdy5jZWxscy5sZW5ndGggLSAxKSA9PT0gZWwuY2VsbEluZGV4ICYmXG4gICAgICAgICAgKHRhYmxlLnJvd3MubGVuZ3RoIC0gMSkgPT09IHJvdy5yb3dJbmRleFxuICAgICAgICApO1xuICAgIH0sXG5cbiAgICBfZ2V0UHJldmlvdXNSb3dMYXN0Q2VsbDogZnVuY3Rpb24gKHJvdykge1xuICAgICAgICByb3cgPSByb3cucHJldmlvdXNTaWJsaW5nO1xuICAgICAgICBpZiAocm93KSB7XG4gICAgICAgICAgICByZXR1cm4gcm93LmNlbGxzW3Jvdy5jZWxscy5sZW5ndGggLSAxXTtcbiAgICAgICAgfVxuICAgIH1cbn07XG5cbnZhciBDT0xVTU5fV0lEVEggPSAxNixcbiAgICBCT1JERVJfV0lEVEggPSAxLFxuICAgIE1lZGl1bUVkaXRvclRhYmxlO1xuXG5NZWRpdW1FZGl0b3JUYWJsZSA9IE1lZGl1bUVkaXRvci5leHRlbnNpb25zLmZvcm0uZXh0ZW5kKHtcbiAgICBuYW1lOiAndGFibGUnLFxuXG4gICAgYXJpYTogJ2NyZWF0ZSB0YWJsZScsXG4gICAgYWN0aW9uOiAndGFibGUnLFxuICAgIGNvbnRlbnREZWZhdWx0OiAnVEJMJyxcbiAgICBjb250ZW50RkE6ICc8aSBjbGFzcz1cImZhIGZhLXRhYmxlXCI+PC9pPicsXG5cbiAgICBoYW5kbGVDbGljazogZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuXG4gICAgICAgIHRoaXNbdGhpcy5pc0FjdGl2ZSgpID09PSB0cnVlID8gJ2hpZGUnIDogJ3Nob3cnXSgpO1xuICAgIH0sXG5cbiAgICBoaWRlOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuc2V0SW5hY3RpdmUoKTtcbiAgICAgICAgdGhpcy5idWlsZGVyLmhpZGUoKTtcbiAgICB9LFxuXG4gICAgc2hvdzogZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLnNldEFjdGl2ZSgpO1xuXG4gICAgICAgIHZhciByYW5nZSA9IE1lZGl1bUVkaXRvci5zZWxlY3Rpb24uZ2V0U2VsZWN0aW9uUmFuZ2UodGhpcy5kb2N1bWVudCk7XG4gICAgICAgIGlmIChyYW5nZS5zdGFydENvbnRhaW5lci5ub2RlTmFtZS50b0xvd2VyQ2FzZSgpID09PSAndGQnIHx8XG4gICAgICAgICAgcmFuZ2UuZW5kQ29udGFpbmVyLm5vZGVOYW1lLnRvTG93ZXJDYXNlKCkgPT09ICd0ZCcgfHxcbiAgICAgICAgICBNZWRpdW1FZGl0b3IudXRpbC5nZXRDbG9zZXN0VGFnKE1lZGl1bUVkaXRvci5zZWxlY3Rpb24uZ2V0U2VsZWN0ZWRQYXJlbnRFbGVtZW50KHJhbmdlKSwgJ3RkJykpIHtcbiAgICAgICAgICAgIHRoaXMuYnVpbGRlci5zZXRFZGl0b3IoTWVkaXVtRWRpdG9yLnNlbGVjdGlvbi5nZXRTZWxlY3RlZFBhcmVudEVsZW1lbnQocmFuZ2UpKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuYnVpbGRlci5zZXRCdWlsZGVyKCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5idWlsZGVyLnNob3codGhpcy5idXR0b24ub2Zmc2V0TGVmdCk7XG4gICAgfSxcblxuICAgIGdldEZvcm06IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKCF0aGlzLmJ1aWxkZXIpIHtcbiAgICAgICAgICAgIHRoaXMuYnVpbGRlciA9IG5ldyBCdWlsZGVyKHtcbiAgICAgICAgICAgICAgICBvbkNsaWNrOiBmdW5jdGlvbiAocm93cywgY29sdW1ucykge1xuICAgICAgICAgICAgICAgICAgICBpZiAocm93cyA+IDAgfHwgY29sdW1ucyA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudGFibGUuaW5zZXJ0KHJvd3MsIGNvbHVtbnMpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaGlkZSgpO1xuICAgICAgICAgICAgICAgIH0uYmluZCh0aGlzKSxcbiAgICAgICAgICAgICAgICBvd25lckRvY3VtZW50OiB0aGlzLmRvY3VtZW50LFxuICAgICAgICAgICAgICAgIHJvd3M6IHRoaXMucm93cyB8fCAxMCxcbiAgICAgICAgICAgICAgICBjb2x1bW5zOiB0aGlzLmNvbHVtbnMgfHwgMTBcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICB0aGlzLnRhYmxlID0gbmV3IFRhYmxlKHRoaXMuYmFzZSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGhpcy5idWlsZGVyLmdldEVsZW1lbnQoKTtcbiAgICB9XG59KTtcblxuICByZXR1cm4gTWVkaXVtRWRpdG9yVGFibGU7XG59KCkpKTtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L21lZGl1bS1lZGl0b3ItdGFibGVzL2Rpc3QvanMvbWVkaXVtLWVkaXRvci10YWJsZXMuanNcbiAqKiBtb2R1bGUgaWQgPSA3MVxuICoqIG1vZHVsZSBjaHVua3MgPSAyXG4gKiovIl0sInNvdXJjZVJvb3QiOiIifQ==