import { ObjectInterface } from "../../Interfaces/ObjectInterface";
import { Forgable } from "../../Abstracts/Forgable";
import { random } from "../../Helpers";
import { Anim } from "../../Curves";


var v4 = function (x, y, z, w) { return new THREE.Vector4(x, y, z, w); };

var simpleVert = "\
	varying vec2 vUv;\
	void main() {\
		vUv = uv;\
		gl_Position = projectionMatrix *\
		modelViewMatrix * vec4(position, 1.0 );\
	}\
";


var simpleFrag5 = "\
	precision highp float;\
	varying vec3 vecNormal;\
	uniform float offset;\
	varying vec2 vUv;\
	uniform sampler2D map;\
	uniform sampler2D map2;\
	void main(void) {\
		vec4 lgts = vec4(vec3(0.0),1.0);\
		vec4 tex = texture2D(map, vUv*7.);\
		vec4 tex2 = texture2D(map2, vec2(offset,0)+vUv);\
		gl_FragColor = vec4((tex2.b*vec3(.08,.0,.15))+pow(tex2.r,2.)*tex.rgb*9.*vec3(.3,.5,.9), 1.0);\
	}\
";

var simpleMat5 = new THREE.ShaderMaterial({
    uniforms:
    {
        offset: { type: 'f', value: 1.0 },
        map: { type: "t", value: null },
        map2: { type: "t", value: null },
    },
    vertexShader: simpleVert,
    fragmentShader: simpleFrag5,
});


var facingVert2 = "\
	varying vec2 vUv;\
	varying vec3 wNormal;\
	uniform float switcher;\
	uniform float offset;\
	uniform float warp;\
	uniform float warpSpeed;\
	void main() {\
		vUv = uv;\
		wNormal = mat3(modelMatrix[0].xyz,modelMatrix[1].xyz,modelMatrix[2].xyz)*normal;\
		wNormal = normalize(wNormal);\
		gl_Position = projectionMatrix *\
		modelViewMatrix * vec4(position+vec3(cos((warpSpeed*.01)*offset+10.*vUv.x)*warp*.01,sin((warpSpeed*.01)*offset+10.*vUv.x)*warp*.01,0), 1.0 );\
	}\
";

var facingVertTunnel = "\
	varying vec2 vUv;\
	uniform float switcher;\
	uniform float offset;\
	uniform float warp;\
	uniform float warpSpeed;\
	void main() {\
		vUv = uv;\
		gl_Position = projectionMatrix *\
		modelViewMatrix * vec4(position+vec3(cos((warpSpeed*.01)*offset+10.*vUv.x)*warp*.01,sin((warpSpeed*.01)*offset+10.*vUv.x)*warp*.01,0), 1.0 );\
	}\
";

//gl_Position = projectionMatrix *\
// modelViewMatrix * vec4(position+vec3(cos(offset*30.*vUv.x)*10.,sin(offset*30.*vUv.x)*10.,0), 1.0 );\
var facingFrag2 = "\
	precision highp float;\
	uniform mat4 camMat;\
	uniform mat4 camMatInverse;\
	varying vec3 wNormal;\
	varying vec2 vUv;\
	uniform sampler2D textureColor;\
	uniform sampler2D textureAlpha;\
	uniform float offset;\
	uniform float fade;\
	uniform float power;\
	void main(void) {\
		float fader = pow((1.0+(cos(   ( max(0.0,min(1.0,(fade+vUv.x))) * 3.1415*2.))  *-1.0))*.5,power)*2.;\
		vec4 texB = texture2D(textureColor, vUv);\
		vec4 tex = texture2D(textureColor, (texB.rg*.021)+vec2(vUv.x*.4+offset,vUv.y));\
		vec4 texA = texture2D(textureAlpha, vUv+(.05-tex.rg*.1));\
		vec4 camNorm = vec4(vec3(wNormal),0.) * camMat;\
		gl_FragColor = vec4(vec3(min(1.0,max(0.0,pow(camNorm.z,1.5))))*tex.rgb*texA.a*tex.a*fader, 1.0);\
	}\
";


var facingMat2 = new THREE.ShaderMaterial(
    {
        uniforms:
        {
            offset: { type: "f", value: 1.0 },
            fade: { type: "f", value: 0.0 },
            power: { type: "f", value: 1.0 },
            camMat: { type: 'm4', value: new THREE.Matrix4() },
            textureColor: { type: "t", value: null },
            textureAlpha: { type: "t", value: null }
        },
        vertexShader: facingVert2,
        fragmentShader: facingFrag2,
        // side: THREE.DoubleSide,
        blending: THREE.AdditiveBlending,
        transparent: true
    }
);


var facingFrag3 = "\
	precision highp float;\
	uniform mat4 camMat;\
	uniform mat4 camMatInverse;\
	varying vec3 wNormal;\
	uniform vec3 Color1;\
	uniform vec3 Color2;\
	uniform vec3 Color3;\
	varying vec2 vUv;\
	uniform sampler2D textureColor;\
	uniform sampler2D textureAlpha;\
	uniform float offset;\
	uniform float offsetMult;\
	uniform float fade;\
	uniform float power;\
	uniform float repeat;\
	void main(void) {\
		float fader = pow((.5+(cos(   ( max(0.0,min(1.0,(fade+vUv.x))) * 3.1415*2.))  *-.5))*1.0,power)*2.;\
		vec4 texA = texture2D(textureAlpha, vUv);\
		vec4 tex = texture2D(textureColor, vec2(texA.a,0.0)*.1+vec2(vUv.x*(repeat*.01)+offset*(offsetMult*.01),vUv.y));\
		vec3 col1 = Color1*tex.r;\
		vec3 col2 = Color2*tex.g;\
		vec3 col3 = Color3*tex.b;\
		vec3 col = col1+col2+col3;\
		vec4 camNorm = vec4(vec3(wNormal),0.) * viewMatrix;\
		gl_FragColor = vec4(vec3(min(1.0,max(0.0,min(1.0,abs(pow(camNorm.z,3.))))))*col*col*texA.a*fader, 1.0);\
	}\
";
//		gl_FragColor = vec4(vec3(min(1.0,max(0.0,min(1.0,camNorm.z*3.))))*col*col*texA.a*fader*10., 1.0);\

//		gl_FragColor = vec4(vec3(min(1.0,max(0.0,pow(camNorm.z,.1))))*col*col*texA.a*fader, 1.0);\

//		gl_FragColor = vec4(vec3(min(1.0,max(0.0,pow(camNorm.z,1.5))))*col*tex.a*fader, 1.0);\
//


var facingMat3 = new THREE.ShaderMaterial(
    {
        uniforms:
        {
            offset: { type: "f", value: 1.0 },
            offsetMult: { type: "f", value: 100.0 },
            fade: { type: "f", value: 0.0 },
            power: { type: "f", value: 1.0 },
            warp: { type: "f", value: 0.0 },
            warpSpeed: { type: "f", value: 100.0 },
            repeat: { type: "f", value: 100.0 },
            camMat: { type: 'm4', value: new THREE.Matrix4() },
            textureColor: { type: "t", value: null },
            textureAlpha: { type: "t", value: null },
            Color1: { type: "v3", value: new THREE.Vector3(0, 0, 0) },
            Color2: { type: "v3", value: new THREE.Vector3(0, 0, 0) },
            Color3: { type: "v3", value: new THREE.Vector3(0, 0, 0) },
        },
        vertexShader: facingVert2,
        fragmentShader: facingFrag3,
        // side: THREE.DoubleSide,
        blending: THREE.AdditiveBlending,
        transparent: true,
        opacity: .5
    }
);


var facingFragtunnel = "\
	precision highp float;\
	uniform vec3 Color1;\
	uniform vec3 Color2;\
	uniform vec3 Color3;\
	varying vec2 vUv;\
	uniform sampler2D textureColor;\
	uniform sampler2D textureAlpha;\
	uniform float offset;\
	uniform float fade;\
	uniform float power;\
	uniform float repeat;\
	void main(void) {\
		float fader = pow((.5+(cos(   ( max(0.0,min(1.0,(fade+vUv.x))) * 3.1415*2.))  *-.5))*1.0,power)*4.;\
		vec4 texA = texture2D(textureAlpha, vUv);\
		vec4 tex = texture2D(textureColor, vec2(texA.a,0.0)*.1+vec2(vUv.x*(repeat*.01)+offset,vUv.y));\
		vec3 col1 = Color1*tex.r;\
		vec3 col2 = Color2*tex.g;\
		vec3 col3 = Color3*tex.b;\
		vec3 col = col1+col2+col3;\
		gl_FragColor = vec4(col*col*texA.a*fader, 1.0);\
	}\
";

var facingMatTunnel = new THREE.ShaderMaterial(
    {
        uniforms:
        {
            offset: { type: "f", value: 1.0 },
            offsetMult: { type: "f", value: 1.0 },
            fade: { type: "f", value: 0.0 },
            power: { type: "f", value: 1.0 },
            warp: { type: "f", value: 0.0 },
            warpSpeed: { type: "f", value: 1.0 },
            repeat: { type: "f", value: 1.0 },
            camMat: { type: 'm4', value: new THREE.Matrix4() },
            textureColor: { type: "t", value: null },
            textureAlpha: { type: "t", value: null },
            Color1: { type: "v3", value: new THREE.Vector3(0, 0, 0) },
            Color2: { type: "v3", value: new THREE.Vector3(0, 0, 0) },
            Color3: { type: "v3", value: new THREE.Vector3(0, 0, 0) },
        },
        vertexShader: facingVertTunnel,
        fragmentShader: facingFragtunnel,
        // side: THREE.DoubleSide,
        blending: THREE.AdditiveBlending,
        transparent: true,
        opacity: .5
    }
);

/**
 * Tunnel
 */
export class Tunnel extends Forgable implements ObjectInterface {

    get materials() {
        return {
            material: 'ShaderMaterial'
        }
    }

    create(models, {material}) {

        let tunnel = new THREE.Mesh(
            new THREE.PlaneBufferGeometry(100, 100), material
        )


        // let tunnel = new THREE.Mesh(
        //     new THREE.TorusGeometry(160, 75, 2, 13), new THREE.MeshNormalMaterial({})
        // );

        // let group = new THREE.Group();

        let curves = (new Anim()).curves;
        console.log(curves);
        tunnel.userData.update = this.update.bind(this, tunnel)

        // var counter = 20;

        let swirls = [];

        // for (var i = 0; i < curves.numCurves; i++) {
        //     let mat = facingMat3.clone();
        //     if (curves[i + ""].divisions.includes("tunnel"))
        //         mat = facingMatTunnel.clone();
        //     if (curves[i + ""].divisions.includes("normal"))
        //         mat = new THREE.MeshNormalMaterial();

        //     var swirl = this.makeSurface({
        //         surface: curves[counter + ""],
        //         material: mat,
        //         textureColor: material.userData.rgb,
        //         textureAlpha: material.userData.alpha
        //     })

        //     // swirl.position.set( 0, 0, -5);
        //     swirl.material.side = THREE.DoubleSide;
        //     swirls.push(swirl);
        // }

        // tunnel.userData.swirls = swirls;
        // tunnel.userData.curves = curves;
        let counter = 40;

        tunnel.userData.swirls = [];

        tunnel.userData.next = () => {

            counter += 1;

            console.log('playing: ' + counter)

            return this.makeSurface({
                surface: curves[counter + ""],
                material: material,
                textureColor: material.userData.rgb,
                textureAlpha: material.userData.alpha
            })

        }

        setInterval(() => {
            tunnel.userData.swirls.push(tunnel.userData.next());
        }, 2000)

        tunnel.userData.timer = new THREE.Clock();

        return tunnel;
    }

    public update(tunnel, time) {

        tunnel.userData.swirls.forEach(function (swirl) {

            // time = tunnel.userData.timer.getElapsedTime()
            //     curves = tunnel.userData.curves;

            // for (var i = 0; i < curves.numCurves; i++) {
            //     // scope.swirls[i].setCam(MAEVR.camera);
            //     swirls[i].update(1 * (time / 1000) * 30);
            //     if (swirls[i].isInScene)
            //         swirls[i].offset((i * .3) + 2 * .01 * time * -.02);

            // }

            // if (swirl.done) {
            //     tunnel.userData.swirl = swirl = tunnel.userData.next();
            //     tunnel.userData.timer = new THREE.Clock();
            //     time = 0;
            // }

            if (swirl) {
                swirl.update(1 * (time / 1000) * 30);

                if (swirl.isInScene)
                    swirl.offset((1 * .3) + 1 * .2 * time * -.02);
            }

        })
    }

    curve2() {
        var Curve_v01 = [
            [v4(-94.2, 115.2, -235.72, 1),
            v4(-100.55, 107.34, -235.72, 1),
            v4(-113.24, 91.54, -235.83, 1),
            v4(-122.73, 61.55, -235.87, 1),
            v4(-113, 31.66, -235.93, 1),
            v4(-99.62, 4.94, -235.97, 1),
            v4(-83.99, -21.31, -236.02, 1),
            v4(-67.54, -46.64, -236.07, 1),
            v4(-51.17, -72.21, -236.14, 1),
            v4(-36.7, -98.86, -236.2, 1),
            v4(-20.48, -124.44, -236.23, 1),
            v4(-5.35, -150.78, -236.25, 1),
            v4(11.2, -176.29, -236.27, 1),
            v4(45.4, -184.76, -236.3, 1),
            v4(64.71, -151.89, -236.32, 1),
            v4(98.72, -160.56, -236.31, 1),
            v4(106.29, -193.36, -236.31, 1),
            v4(121.46, -218.57, -236.27, 1),
            v4(124.26, -250.01, -236.3, 1),
            v4(146.06, -279.2, -236.18, 1),
            v4(146.63, -231.33, -236.08, 1),
            v4(145.6, -209.1, -236.05, 1),
            v4(145.67, -174.08, -236.01, 1),
            v4(159.8, -148.4, -236.01, 1),
            v4(192.14, -137.4, -236.04, 1),
            v4(219.54, -138.8, -236.07, 1),
            v4(253.93, -118.94, -236.11, 1),
            v4(224.22, -92.94, -236.1, 1),
            v4(197.63, -84.55, -236.09, 1),
            v4(171.02, -68.72, -236.08, 1),
            v4(141.48, -57.41, -236.06, 1),
            v4(118.14, -43.86, -236.04, 1),
            v4(82.01, -30.53, -236.02, 1),
            v4(90.93, 1.24, -235.98, 1),
            v4(90.49, 30.93, -235.92, 1),
            v4(62.35, 51.31, -235.89, 1),
            v4(39.02, 67.18, -235.86, 1),
            v4(13.3, 84.72, -235.81, 1),
            v4(-11.66, 102.01, -235.77, 1),
            v4(-39.18, 113.16, -235.74, 1),
            v4(-69.35, 124.6, -235.73, 1),
            v4(-88.44, 117.3, -235.72, 1),
            v4(-96.46, 110.48, -235.72, 1),
            ], [v4(-54.22, 61.67, -218.02, 1),
            v4(-61.31, 65.94, -218.02, 1),
            v4(-73.79, 55.62, -218.11, 1),
            v4(-75.75, 34.66, -218.16, 1),
            v4(-72.56, 14.05, -218.23, 1),
            v4(-65.2, -4.74, -218.29, 1),
            v4(-56.24, -24.64, -218.36, 1),
            v4(-63, -44.69, -218.42, 1),
            v4(-68.34, -64.85, -218.47, 1),
            v4(-60.79, -84.99, -218.5, 1),
            v4(-53, -103.74, -218.52, 1),
            v4(-40.45, -120.43, -218.54, 1),
            v4(-25.16, -134.42, -218.56, 1),
            v4(-3.84, -139.91, -218.59, 1),
            v4(14.7, -131.15, -218.59, 1),
            v4(30.12, -113.98, -218.6, 1),
            v4(35.06, -97.83, -218.6, 1),
            v4(45.92, -70.6, -218.62, 1),
            v4(61.05, -89.12, -218.59, 1),
            v4(60.91, -112.59, -218.6, 1),
            v4(64.87, -127.86, -218.56, 1),
            v4(68.85, -157.18, -218.59, 1),
            v4(63.18, -163.52, -218.42, 1),
            v4(56.37, -130.94, -218.4, 1),
            v4(53.11, -117.04, -218.35, 1),
            v4(46.63, -93.91, -218.33, 1),
            v4(50.49, -73.86, -218.31, 1),
            v4(60.76, -58.82, -218.31, 1),
            v4(99.87, -61.61, -218.35, 1),
            v4(63.81, -61.21, -218.43, 1),
            v4(66.76, -43.74, -218.36, 1),
            v4(94, -37.94, -218.35, 1),
            v4(99.01, -15.15, -218.28, 1),
            v4(84.52, 0.46, -218.25, 1),
            v4(68.41, 13.32, -218.21, 1),
            v4(52.33, 26.09, -218.17, 1),
            v4(35.6, 38.35, -218.14, 1),
            v4(19.7, 51.1, -218.11, 1),
            v4(2.78, 63.62, -218.07, 1),
            v4(-15.57, 71.79, -218.04, 1),
            v4(-36.96, 76.69, -218.02, 1),
            v4(-49.28, 69.54, -218.02, 1),
            v4(-54.53, 65.03, -218.02, 1),
            ], [v4(-6.59, -0.77, -227.14, 1),
            v4(-6.63, -2.16, -227.14, 1),
            v4(-6.87, -4.93, -227.14, 1),
            v4(-7.32, -9.08, -227.14, 1),
            v4(-7.46, -13.24, -227.15, 1),
            v4(-7.29, -17.41, -227.15, 1),
            v4(-6.82, -21.56, -227.15, 1),
            v4(-5.96, -25.64, -227.16, 1),
            v4(-4.63, -29.6, -227.16, 1),
            v4(-2.92, -33.4, -227.17, 1),
            v4(-0.91, -37.06, -227.17, 1),
            v4(1.52, -40.46, -227.17, 1),
            v4(4.41, -43.47, -227.17, 1),
            v4(7.63, -46.13, -227.18, 1),
            v4(11.07, -48.49, -227.18, 1),
            v4(14.92, -50.19, -227.18, 1),
            v4(18.93, -51.19, -227.18, 1),
            v4(23.3, -50.91, -227.17, 1),
            v4(26.35, -47.74, -227.17, 1),
            v4(28.01, -43.95, -227.16, 1),
            v4(29.44, -40.02, -227.16, 1),
            v4(30.93, -36.13, -227.16, 1),
            v4(33.14, -32.57, -227.16, 1),
            v4(36.01, -29.5, -227.16, 1),
            v4(39.53, -27.23, -227.16, 1),
            v4(42.86, -24.74, -227.16, 1),
            v4(45.25, -21.14, -227.16, 1),
            v4(44.87, -16.66, -227.16, 1),
            v4(41.71, -13.72, -227.16, 1),
            v4(38.44, -11.22, -227.16, 1),
            v4(35.39, -8.34, -227.16, 1),
            v4(32.49, -5.36, -227.15, 1),
            v4(29.22, -2.75, -227.15, 1),
            v4(25.88, -0.27, -227.15, 1),
            v4(22.54, 2.23, -227.15, 1),
            v4(18.97, 4.41, -227.14, 1),
            v4(15.08, 5.94, -227.14, 1),
            v4(10.89, 6.48, -227.14, 1),
            v4(6.78, 5.45, -227.14, 1),
            v4(3.07, 3.56, -227.14, 1),
            v4(-0.41, 1.25, -227.14, 1),
            v4(-2.56, -0.52, -227.14, 1),
            v4(-3.6, -1.44, -227.14, 1),
            ]
        ];
        var degree1_v01 = 2;
        var degree2_v01 = 42;
        var knots1_v01 = [0, 0, 0, 1, 1, 1,];
        var knots2_v01 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,];
        var nurbsSurface_v01 = new THREE.NURBSSurface(degree1_v01, degree2_v01, knots1_v01, knots2_v01, Curve_v01);

        return {
            func: function (u, v) { return nurbsSurface_v01.getPoint(v, u); },
            animation: [[0, 1], [51, 0.166], [128, -0.377], [170, -1]],
            divisions: "|MAEmodelsPrevis|powerBallWarp_20000_2_3_8_100_140_200_100_300_100_100_20|_81_9_v1";
        }

    }

    curve() {

        var Curve_v01 = [
            [
                v4(-13.9, 11.21, 18.99, 1),
                v4(-21.19, 15.11, 154.25, 1),
                v4(-54.87, 19.93, 310.89, 1),
                v4(-88.46, 33.17, 458.79, 1),
            ], [
                v4(-8.41, -2.6, 18.99, 1),
                v4(-14.92, -6.58, 154.25, 1),
                v4(-41.3, -31.85, 310.89, 1),
                v4(-66.44, -50.55, 458.79, 1),
            ]
        ];

        var degree1_v01 = 1;
        var degree2_v01 = 3;
        var knots1_v01 = [0, 0, 1, 1,];
        var knots2_v01 = [0, 0, 0, 0, 1, 1, 1, 1,];
        var nurbsSurface_v01 = new THREE.NURBSSurface(degree1_v01, degree2_v01, knots1_v01, knots2_v01, Curve_v01);

        return {
            func: function (u, v) { return nurbsSurface_v01.getPoint(v, u); },
            animation: [[0, -1], [271, -0.4205202312], [1387, -0.01046996304], [1650, 0.951758792]],
            divisions: "|MAEmodelsPrevis|tunnel_1000_1_1_99_134_181_100_50_100_100_100_20|_20_5_v327";
        }

    };

    makeSurface(params) {

        //AtomB_5000_1_2_124_202_247_200_100_1000_100_10
        //name_timeOffset_rampPower_whichTexture_red_green_blue_colorMult_warp_warpSpeed_offsetMult_repeat_saturation

        var nameSplit = params.surface.divisions.split("|");
        var divisions = nameSplit[3].split("_");
        var shaderInfo = nameSplit[2].split("_");
        var divisionMultiplier = new THREE.Vector2(1, 1); // 3,2 for more detail
        var geometry = new THREE.ParametricGeometry(params.surface(), parseInt(divisions[1]) * divisionMultiplier.x, parseInt(divisions[2]) * divisionMultiplier.y);
        var swirl = new THREE.Mesh(geometry, params.material === undefined ? new THREE.MeshNormalMaterial() : params.material);

        swirl.material.depthTest = false;
        swirl.material.uniforms['textureColor'].value = params.textureColor;
        swirl.material.uniforms['textureAlpha'].value = params.textureAlpha;
        swirl.material.uniforms['fade'].value = 0;
        swirl.material.uniforms['power'].value = 1;

        swirl.whichTexture = shaderInfo[3];
        swirl.rampPower = shaderInfo[2];
        swirl.colorMult = shaderInfo[7];
        swirl.warp = shaderInfo[8];

        swirl.warpSpeed = shaderInfo[9] ? shaderInfo[9] : 100;
        swirl.offsetMult = shaderInfo[10] ? shaderInfo[10] : 100;
        swirl.repeat = shaderInfo[11] ? shaderInfo[11] : 100;
        swirl.saturation = shaderInfo[12] ? shaderInfo[12] : 20;

        // console.log(swirl.warpSpeed);

        swirl.objName = shaderInfo[0];

        swirl.timeOffsetRandom = (((Math.random()) * shaderInfo[1]) / 1000) * 30;
        swirl.color = new THREE.Vector3(
            ((swirl.colorMult * .01) * shaderInfo[4] / 256) + Math.random() * (swirl.saturation * .01),
            ((swirl.colorMult * .01) * shaderInfo[5] / 256) + Math.random() * (swirl.saturation * .01),
            ((swirl.colorMult * .01) * shaderInfo[6] / 256) + Math.random() * (swirl.saturation * .01));


        swirl.animation = params.surface.animation

        for (var i = 0; i < swirl.animation.length; i++) {
            swirl.animation[i][0] += swirl.timeOffsetRandom;
        }

        swirl.inPoint = swirl.animation[0][0];
        swirl.outPoint = swirl.animation[swirl.animation.length - 1][0];

        swirl.isInScene = false;
        swirl.done = false;

        swirl.update = (time) => {

            if (time < swirl.inPoint || time > swirl.outPoint && swirl.visible) {
                if (swirl.isInScene) {
                    this.app.scene.remove(swirl);
                    swirl.isInScene = false;
                    swirl.done = true;
                }
            }
            else if (time > swirl.inPoint && time < swirl.outPoint) {

                var getLerp = this.findInOut(time, swirl.animation);

                var value = this.remap(
                    getLerp[0], 0, 1,
                    swirl.animation[getLerp[1]][1],
                    swirl.animation[getLerp[2]][1]);

                if (value > -1 && value < 1) {
                    swirl.setFade(value, swirl.rampPower);

                    if (!swirl.isInScene) {
                        this.app.scene.add(swirl);
                        swirl.isInScene = true;
                    }
                }
                else {
                    if (swirl.isInScene) {
                        this.app.scene.remove(swirl);
                        swirl.isInScene = false;
                    }
                }

            }
            this.isInScene = swirl.isInScene;
            // console.log(swirl.isInScene);
        }

        swirl.next = function (cam) {
            this.material.uniforms['camMat'].value = cam.matrixWorld;
        }

        swirl.setCam = function (cam) {
            this.material.uniforms['camMat'].value = cam.matrixWorld;
        }

        swirl.offset = function (offset) {
            this.material.uniforms['offset'].value = offset;
        }

        swirl.setFade = function (fade, power) {
            this.material.uniforms['fade'].value = fade;
            this.material.uniforms['power'].value = power;
        }

        swirl.setUniform = function (uniform, value) {
            swirl.material.uniforms[uniform].value = value;
        }

        swirl.setColor = function (value) {
            var thisTexture = "Color" + swirl.whichTexture;
            swirl.material.uniforms[thisTexture].value = value;
        }

        swirl.checkIfIsInScene = function () {
            // console.log(swirl.isInScene);
            if (this.isInScene)
                return true;
            else
                return false;
        }

        swirl.setColor(swirl.color);
        swirl.setUniform("warp", swirl.warp);
        swirl.setUniform("warpSpeed", swirl.warpSpeed);
        swirl.setUniform("repeat", swirl.repeat);
        swirl.setUniform("offsetMult", swirl.offsetMult);

        return swirl;
    }

    findInOut(time, animationArray) {

        var tween = 0;
        var inPoint = 0;
        var outPoint = 0;

        for (var i = 1; i < animationArray.length; i++) {

            var b = animationArray[i][0];
            var bVal = animationArray[i][1];

            var a = animationArray[i - 1][0];
            var aVal = animationArray[i - 1][a];

            if (time < b && time > a) {
                tween = 1 - ((b - time) / (b - a));
                inPoint = i - 1;
                outPoint = i;
            }
        }

        return [tween, inPoint, outPoint];

    }

    remap(value, from1, to1, from2, to2) {
        return (value - from1) / (to1 - from1) * (to2 - from2) + from2;
    }
}
