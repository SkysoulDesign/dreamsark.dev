// varying vec2 vUv;
// varying vec3 size;
// uniform sampler2D texture;
// uniform float time;
// varying vec3 vPositionRelatedUv;
// varying vec3 vOutCameraLookAt;
// varying vec3 OutNormal;

// void main(void) {

//     float value = 1.-dot(vOutCameraLookAt,OutNormal);

//     vec4 vGlowColor = texture2D(texture, vUv);
//     vec4 color = vec4(0.5,0.5,0.,1.);
//     vec3 l_vNewUV = abs(vec3(0.5,0.5,0.5)-vPositionRelatedUv);
    
//     {
//         float l_fValue = 1./length(vPositionRelatedUv);
//         gl_FragColor = (color*(l_fValue))+vGlowColor*value;
//     }
  
// }


uniform vec3 glowColor;
varying float intensity;
void main() 
{
	vec3 glow = glowColor * intensity;
    gl_FragColor = vec4( glow, 1.0 );
}
