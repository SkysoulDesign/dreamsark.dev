precision highp float;
uniform vec3 Color1;
uniform vec3 Color2;
uniform vec3 Color3;
varying vec2 vUv;
uniform sampler2D textureColor;
uniform sampler2D textureAlpha;
uniform float offset;
uniform float fade;
uniform float power;
uniform float repeat;
void main(void) {
    float fader = pow((.5+(cos(   ( max(0.0,min(1.0,(fade+vUv.x))) * 3.1415*2.))  *-.5))*1.0,power)*4.;
    vec4 texA = texture2D(textureAlpha, vUv);
    vec4 tex = texture2D(textureColor, vec2(texA.a,0.0)*.1+vec2(vUv.x*(repeat*.01)+offset,vUv.y));
    vec3 col1 = Color1*tex.r;
    vec3 col2 = Color2*tex.g;
    vec3 col3 = Color3*tex.b;
    vec3 col = col1+col2+col3;
    gl_FragColor = vec4(col*col*texA.a*fader, 1.0);
}