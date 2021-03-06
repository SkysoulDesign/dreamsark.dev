
varying vec2 vUv;
uniform sampler2D texture;
uniform float waves;
uniform float warp;
uniform float angle;

void main() {

    vUv = uv;
    vec3 l_Pos = position;

    l_Pos.z = sin(angle+position.x/warp)*waves;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(l_Pos,1);
}

