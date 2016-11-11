varying vec2 vUv;
uniform float switcher;
uniform float offset;
uniform float warp;
uniform float warpSpeed;

void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position+vec3(cos((warpSpeed*.01)*offset+10.*vUv.x)*warp*.01,sin((warpSpeed*.01)*offset+10.*vUv.x)*warp*.01,0), 1.0 );
}