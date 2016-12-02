uniform float exposure;
varying vec2 PSTexcoord;
uniform sampler2D tFull;
uniform sampler2D tBlur;


uniform float controlBlur;

vec4 lerp(vec4 a, vec4 b, float w)
{
  return a + w*(b-a);
}

void main()
{
	vec4 original = texture2D( tFull, PSTexcoord );
	vec4 blur = texture2D( tBlur, PSTexcoord );

	//vec4 color = lerp( original, blur, 0.4 );
	//vec2 hi = vec2(0.5 -PSTexcoord.x, 0.5 -PSTexcoord.y );
	gl_FragColor = original + blur * exposure * 0.5;
	//vec2 l_offset = vec2(1./1024.,1./1024.);
	// if(controlBlur == 1.){
			//float l_fSqrt = sqrt(hi.x*hi.x+hi.y*hi.y);
			// l_fSqrt *= l_fSqrt;
			// l_fSqrt -= 0.1;

			// color *= l_fSqrt;;
			//gl_FragColor = color;
			//l_fSqrt = 1.-l_fSqrt;
			//gl_FragColor += vec4(l_fSqrt,l_fSqrt,l_fSqrt,l_fSqrt)*color;
			//gl_FragColor = color*l_fSqrt+gl_FragColor;
			 //gl_FragColor = lerp( color,gl_FragColor,l_fSqrt );
			//  gl_FragColor = color*vec4(l_fSqrt,l_fSqrt,l_fSqrt,l_fSqrt)*5.;
			
		// }
	
	// vec2 l_TempTexCord = PSTexcoord - 0.5;
	// float vignette = 1. - dot( l_TempTexCord, l_TempTexCord );

	// color *= pow( vignette, 4.0 );
	// color *= exposure;

	// gl_FragColor = pow( color,vec4( 0.55, 0.55, 0.55, 0.55) );
}