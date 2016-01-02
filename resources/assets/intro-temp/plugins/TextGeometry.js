/**
 * @author Eberhard Graether / http://egraether.com/
 * @author Mark Lundin    / http://mark-lundin.com
 * @author Simone Manini / http://daron1337.github.io
 * @author Luca Antiga    / http://lantiga.github.io
 */
module.exports = (function (e) {
	return {

		/**
		 * Plugin Instance
		 */
		instance: null,

		init: function (text, parameters) {
			return this.plugin(text, parameters);
		},

		plugin: function (text, parameters) {

			THREE.TextGeometry = function ( text, parameters ) {

				parameters = parameters || {};

				var textShapes = THREE.FontUtils.generateShapes( text, parameters );

				// translate parameters to ExtrudeGeometry API

				parameters.amount = parameters.height !== undefined ? parameters.height : 50;

				// defaults

				if ( parameters.bevelThickness === undefined ) parameters.bevelThickness = 10;
				if ( parameters.bevelSize === undefined ) parameters.bevelSize = 8;
				if ( parameters.bevelEnabled === undefined ) parameters.bevelEnabled = false;

				THREE.ExtrudeGeometry.call( this, textShapes, parameters );

				this.type = 'TextGeometry';

			};

			THREE.TextGeometry.prototype = Object.create( THREE.ExtrudeGeometry.prototype );
			THREE.TextGeometry.prototype.constructor = THREE.TextGeometry;

			return this.instance = new THREE.TextGeometry(text, parameters);

		}

	}

})(Engine);