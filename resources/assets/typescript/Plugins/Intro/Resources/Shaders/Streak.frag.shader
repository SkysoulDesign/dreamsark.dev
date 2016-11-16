varying vec2 vUv;
uniform sampler2D texture;
uniform float alpha;

void main(void) {
    gl_FragColor = texture2D(texture, vUv);
    gl_FragColor.a = alpha;
}