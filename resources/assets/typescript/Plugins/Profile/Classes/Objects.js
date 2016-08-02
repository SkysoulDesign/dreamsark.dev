"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Components_1 = require("../Abstract/Components");
var Helpers_1 = require("../../Helpers");
var Helpers_2 = require("../../../Helpers");
/**
 * Objects Class
 */
var Objects = (function (_super) {
    __extends(Objects, _super);
    function Objects() {
        _super.apply(this, arguments);
        /**
         * Objects Collection
         * @type {Character[]}
         */
        this.collection = Helpers_2.requireAll(require.context("../Objects", false, /\.js$/));
        /**
         * List of Initialized Object
         * @type {THREE.Object3D[]}
         */
        this.initialized = {};
    }
    Objects.prototype.boot = function (app) {
        var _this = this;
        this.loader = app.loader;
        this.collection.forEach(function (object) {
            for (var name_1 in object) {
                if (object.hasOwnProperty(name_1)) {
                    _this.init(name_1, {
                        loaded: false,
                        object: object[name_1]
                    });
                }
            }
        });
    };
    Objects.prototype.init = function (name, character) {
        var _this = this;
        name = Helpers_2.toCamelCase(name);
        return new Promise(function (accept, reject) {
            if (character.object instanceof Function)
                character.object = new character.object(_this.app);
            character.name = name;
            if (!character.force && character.object.hasOwnProperty('defer') && character.object.defer) {
                character.loaded = false;
                _this.initialized[character.name] = character;
                return accept(character);
            }
            if (character.object.models instanceof Function) {
                /**
                 * Load Models
                 */
                var items = character.object.models();
                if (character.object.textures instanceof Function)
                    items = Helpers_2.extend(items, character.object.textures());
                _this.load(items, function (object, materials) {
                    var textures = {}, geometry = {};
                    for (var i in object) {
                        if (object[i] instanceof THREE.Texture)
                            textures[i] = object[i];
                        else
                            geometry[i] = object[i];
                    }
                    character.loaded = true;
                    character.object = character.object.init(character.name, geometry, textures, materials);
                    _this.initialized[character.name] = character;
                    return accept(character);
                });
                return null;
            }
            console.log('still to implement... if no models at all');
        });
    };
    /**
     * Get a Character
     * @param name
     * @returns {Promise<T>|Promise}
     */
    Objects.prototype.get = function (name) {
        var _this = this;
        name = Helpers_2.toCamelCase(name);
        return new Promise(function (accept, reject) {
            if (_this.initialized.hasOwnProperty(name)) {
                if (!_this.initialized[name].loaded) {
                    _this.initialized[name].force = true;
                    _this.init(name, _this.initialized[name]).then(function (character) {
                        accept(character.object);
                    });
                }
                else {
                    accept(_this.initialized[name].object);
                }
            }
            else {
                console.log("There is no character called: " + name);
                reject(name);
            }
        });
    };
    /**
     * Load The Object with Ajax
     * @param models
     * @param callback
     */
    Objects.prototype.load = function (models, callback) {
        var counter = 1;
        var max = Helpers_1.countKeys(models);
        var _loop_1 = function(name_2) {
            this_1.loader.load(models[name_2], function (object, materials) {
                object.name = name_2;
                models[name_2] = object;
                if (counter !== max)
                    return ++counter;
                callback.apply(void 0, [models].concat(materials));
            });
        };
        var this_1 = this;
        for (var name_2 in models) {
            _loop_1(name_2);
        }
    };
    return Objects;
}(Components_1.Components));
exports.Objects = Objects;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiT2JqZWN0cy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIk9iamVjdHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQ0EsMkJBQXlCLHdCQUF3QixDQUFDLENBQUE7QUFDbEQsd0JBQXdCLGVBQWUsQ0FBQyxDQUFBO0FBQ3hDLHdCQUE4QyxrQkFBa0IsQ0FBQyxDQUFBO0FBRWpFOztHQUVHO0FBQ0g7SUFBNkIsMkJBQVU7SUFBdkM7UUFBNkIsOEJBQVU7UUFFbkM7OztXQUdHO1FBQ0ssZUFBVSxHQUFHLG9CQUFVLENBQzNCLE9BQU8sQ0FBQyxPQUFPLENBQUMsWUFBWSxFQUFFLEtBQUssRUFBRSxPQUFPLENBQUMsQ0FDaEQsQ0FBQztRQUVGOzs7V0FHRztRQUNLLGdCQUFXLEdBQUcsRUFBRSxDQUFDO0lBcUo3QixDQUFDO0lBbEpHLHNCQUFJLEdBQUosVUFBSyxHQUFHO1FBQVIsaUJBZ0JDO1FBZEcsSUFBSSxDQUFDLE1BQU0sR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDO1FBQ3pCLElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLFVBQUEsTUFBTTtZQUUxQixHQUFHLENBQUMsQ0FBQyxJQUFJLE1BQUksSUFBSSxNQUFNLENBQUMsQ0FBQyxDQUFDO2dCQUN0QixFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsY0FBYyxDQUFDLE1BQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDOUIsS0FBSSxDQUFDLElBQUksQ0FBQyxNQUFJLEVBQUU7d0JBQ1osTUFBTSxFQUFFLEtBQUs7d0JBQ2IsTUFBTSxFQUFFLE1BQU0sQ0FBQyxNQUFJLENBQUM7cUJBQ3ZCLENBQUMsQ0FBQTtnQkFDTixDQUFDO1lBQ0wsQ0FBQztRQUVMLENBQUMsQ0FBQyxDQUFBO0lBRU4sQ0FBQztJQUVELHNCQUFJLEdBQUosVUFBSyxJQUFXLEVBQUUsU0FBUztRQUEzQixpQkFnRUM7UUE5REcsSUFBSSxHQUFHLHFCQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFekIsTUFBTSxDQUFDLElBQUksT0FBTyxDQUFDLFVBQUMsTUFBTSxFQUFFLE1BQU07WUFFOUIsRUFBRSxDQUFDLENBQUMsU0FBUyxDQUFDLE1BQU0sWUFBWSxRQUFRLENBQUM7Z0JBQ3JDLFNBQVMsQ0FBQyxNQUFNLEdBQUcsSUFBSSxTQUFTLENBQUMsTUFBTSxDQUFDLEtBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUV0RCxTQUFTLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztZQUV0QixFQUFFLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxLQUFLLElBQUksU0FBUyxDQUFDLE1BQU0sQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLElBQUksU0FBUyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO2dCQUV6RixTQUFTLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztnQkFFekIsS0FBSSxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEdBQUcsU0FBUyxDQUFDO2dCQUU3QyxNQUFNLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBRTdCLENBQUM7WUFFRCxFQUFFLENBQUMsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLE1BQU0sWUFBWSxRQUFRLENBQUMsQ0FBQyxDQUFDO2dCQUU5Qzs7bUJBRUc7Z0JBQ0gsSUFBSSxLQUFLLEdBQUcsU0FBUyxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUUsQ0FBQztnQkFFdEMsRUFBRSxDQUFDLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxRQUFRLFlBQVksUUFBUSxDQUFDO29CQUM5QyxLQUFLLEdBQUcsZ0JBQU0sQ0FBQyxLQUFLLEVBQUUsU0FBUyxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDO2dCQUV2RCxLQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxVQUFDLE1BQU0sRUFBRSxTQUFTO29CQUUvQixJQUFJLFFBQVEsR0FBRyxFQUFFLEVBQ2IsUUFBUSxHQUFHLEVBQUUsQ0FBQztvQkFFbEIsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksTUFBTSxDQUFDLENBQUMsQ0FBQzt3QkFFbkIsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxZQUFZLEtBQUssQ0FBQyxPQUFPLENBQUM7NEJBQ25DLFFBQVEsQ0FBQyxDQUFDLENBQUMsR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7d0JBQzVCLElBQUk7NEJBQ0EsUUFBUSxDQUFDLENBQUMsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFFaEMsQ0FBQztvQkFFRCxTQUFTLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztvQkFDeEIsU0FBUyxDQUFDLE1BQU0sR0FBRyxTQUFTLENBQUMsTUFBTSxDQUFDLElBQUksQ0FDcEMsU0FBUyxDQUFDLElBQUksRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLFNBQVMsQ0FDaEQsQ0FBQTtvQkFFRCxLQUFJLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsR0FBRyxTQUFTLENBQUE7b0JBRTVDLE1BQU0sQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUM7Z0JBRTdCLENBQUMsQ0FBQyxDQUFBO2dCQUVGLE1BQU0sQ0FBQyxJQUFJLENBQUM7WUFFaEIsQ0FBQztZQUVELE9BQU8sQ0FBQyxHQUFHLENBQUMsMkNBQTJDLENBQUMsQ0FBQTtRQUU1RCxDQUFDLENBQUMsQ0FBQTtJQUVOLENBQUM7SUFFRDs7OztPQUlHO0lBQ0gscUJBQUcsR0FBSCxVQUFJLElBQVc7UUFBZixpQkEyQkM7UUF6QkcsSUFBSSxHQUFHLHFCQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFekIsTUFBTSxDQUFDLElBQUksT0FBTyxDQUFDLFVBQUMsTUFBTSxFQUFFLE1BQU07WUFFOUIsRUFBRSxDQUFDLENBQUMsS0FBSSxDQUFDLFdBQVcsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUV4QyxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztvQkFFakMsS0FBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO29CQUVwQyxLQUFJLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxLQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsU0FBYTt3QkFDaEUsTUFBTSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQTtvQkFDNUIsQ0FBQyxDQUFDLENBQUM7Z0JBRVAsQ0FBQztnQkFBQyxJQUFJLENBQUMsQ0FBQztvQkFDSixNQUFNLENBQUMsS0FBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQTtnQkFDekMsQ0FBQztZQUVMLENBQUM7WUFBQyxJQUFJLENBQUMsQ0FBQztnQkFDSixPQUFPLENBQUMsR0FBRyxDQUFDLG1DQUFpQyxJQUFNLENBQUMsQ0FBQztnQkFDckQsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ2pCLENBQUM7UUFFTCxDQUFDLENBQUMsQ0FBQTtJQUVOLENBQUM7SUFFRDs7OztPQUlHO0lBQ0ssc0JBQUksR0FBWixVQUFhLE1BQU0sRUFBRSxRQUFpQjtRQUVsQyxJQUFJLE9BQU8sR0FBRyxDQUFDLENBQUM7UUFDaEIsSUFBSSxHQUFHLEdBQUcsbUJBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUU1QjtZQUVJLE1BQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFJLENBQUMsRUFBRSxVQUFDLE1BQU0sRUFBRSxTQUFTO2dCQUU3QyxNQUFNLENBQUMsSUFBSSxHQUFHLE1BQUksQ0FBQztnQkFDbkIsTUFBTSxDQUFDLE1BQUksQ0FBQyxHQUFHLE1BQU0sQ0FBQztnQkFFdEIsRUFBRSxDQUFDLENBQUMsT0FBTyxLQUFLLEdBQUcsQ0FBQztvQkFDaEIsTUFBTSxDQUFDLEVBQUUsT0FBTyxDQUFDO2dCQUVyQixRQUFRLGdCQUFDLE1BQU0sU0FBSyxTQUFTLEVBQUMsQ0FBQTtZQUVsQyxDQUFDLENBQUMsQ0FBQTs7O1FBWk4sR0FBRyxDQUFDLENBQUMsSUFBSSxNQUFJLElBQUksTUFBTSxDQUFDOztTQWN2QjtJQUVMLENBQUM7SUFFTCxjQUFDO0FBQUQsQ0FBQyxBQW5LRCxDQUE2Qix1QkFBVSxHQW1LdEM7QUFuS1ksZUFBTyxVQW1LbkIsQ0FBQSJ9