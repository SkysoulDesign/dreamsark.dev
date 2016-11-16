import { ObjectInterface } from "../../Interfaces/ObjectInterface";
import { Forgable } from "../../Abstracts/Forgable";
import { random } from "../../Helpers";

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
        );

        return tunnel

    }

    public update(tunnel, time) {

        // tunnel.userData.swirls.forEach(function (swirl) {

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
        let swirl = tunnel.userData.swirl;

        if (swirl) {
            swirl.update(1 * (time / 1000) * 30);

            if (swirl.isInScene)
                swirl.offset((1 * .3) + 1 * .2 * time * -.02);
        }

        // })
    }

    curve16() {
        var Curve_v01 = [[v4(167.76, 537.33, -987.76, 1),
        v4(22.13, 564.59, -938.9, 1),
        v4(-283.46, 712.76, -817.84, 1),
        v4(-391.81, 1124.27, -503.02, 1),
        v4(-75.92, 1268.73, -294.65, 1),
        v4(36.8, 1313.13, -218.74, 1),
        ], [v4(121.43, 292.86, -1283.11, 1),
        v4(-121.66, 354.17, -1258.95, 1),
        v4(-629.17, 632.16, -1195.93, 1),
        v4(-861.99, 1359.72, -812.88, 1),
        v4(-50.53, 1615.41, -409.23, 1),
        v4(-257.37, 1695.51, -261.42, 1),
        ]];

        var degree1_v01 = 1;
        var degree2_v01 = 5;
        var knots1_v01 = [0, 0, 1, 1,];
        var knots2_v01 = [0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1,];
        var nurbsSurface_v01 = new THREE.NURBSSurface(degree1_v01, degree2_v01, knots1_v01, knots2_v01, Curve_v01);

        return {
            func: function (u, v) { return nurbsSurface_v01.getPoint(v, u); },
            animation: [[-118, -1], [54, -0.08812329549], [2965, 0.2085208828], [3193, 1]],
            divisions: "|MAEmodelsPrevis|Gehry_15000_1_3_30_40_100_100_500_100_100_100_20|_40_2_1"
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
        var geometry = new THREE.ParametricGeometry(params.surface.func, parseInt(divisions[1]) * divisionMultiplier.x, parseInt(divisions[2]) * divisionMultiplier.y);
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
