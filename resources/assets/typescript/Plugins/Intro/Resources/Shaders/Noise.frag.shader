// varying vec2 vUv;
// varying float noise;

// void main() {

//     // compose the colour using the UV coordinate
//     // and modulate it with the noise like ambient occlusion
//     vec3 color = vec3( vUv * ( 1. - 2. * noise ), 0.0 );
//     gl_FragColor = vec4( color.rgb, 1.0 );

// }

varying vec2 vUv;
uniform sampler2D texture;

void main(void) {
   gl_FragColor = texture2D(texture, vUv);
}
