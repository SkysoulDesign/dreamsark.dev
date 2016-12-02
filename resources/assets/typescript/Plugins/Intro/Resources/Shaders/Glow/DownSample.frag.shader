uniform sampler2D texSample;
uniform float colorRange;
varying vec2 PSTexcoord;

// This hack is necessary because the suppress function
// seems to work only when Kd is greater than 1, even by 0.0001f!!!
float Kd = 1.0001;

vec4 SuppressLDR( vec4 c )
{
   if( c.r >= colorRange || c.g >= colorRange || c.b >= colorRange )
      return c;
   else
      return vec4( 0.0, 0.0, 0.0, 0.0 );
}

void main()
{
	vec4 color = texture2D( texSample, PSTexcoord ) * Kd;
	gl_FragColor = SuppressLDR( color );
	//gl_FragColor *= vec4(1.,0.,0.,1.);
}