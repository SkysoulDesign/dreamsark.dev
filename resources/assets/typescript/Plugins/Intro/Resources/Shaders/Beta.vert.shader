
// varying vec2 vUv;
// varying vec3 vPositionRelatedUv;
// varying vec3 vOutCameraLookAt;
// varying vec3 OutNormal;
// uniform sampler2D texture;
// uniform vec3 size;
// uniform vec3 cameraLookAt;
// uniform mat4 cameraViewMatrix;

// void main() {

//     vUv = uv;
//     vec3 l_Pos = position;
//     vOutCameraLookAt = cameraLookAt;
//     OutNormal = ( vec4(normal,1)).xyz ;
//     gl_Position = projectionMatrix * modelViewMatrix * vec4(l_Pos,1);

//     vPositionRelatedUv = position;
//     vPositionRelatedUv /= size/2.;

// }


uniform vec3 viewVector;
uniform float c;
uniform float p;
varying float intensity;
void main() 
{
    vec3 vNormal = normalize( normalMatrix * normal );
	vec3 vNormel = normalize( normalMatrix * viewVector );
	intensity = pow( c - dot(vNormal, vNormel), p );
	
    gl_Position = projectionMatrix * modelViewMatrix * vec4( position*2., 1.0 );
}
