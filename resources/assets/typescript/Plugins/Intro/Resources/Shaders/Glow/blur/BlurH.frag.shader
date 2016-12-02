uniform sampler2D texSample;
uniform vec2 BlurOffset;//    = vec2( 0.001953195, 0 );//resolution
varying vec2 PSTexcoord;

void main()
{
	//vec4 gl_FragColor = texture2D(texSample, PSTexcoord);

	vec4 color  = texture2D( texSample, PSTexcoord + ( BlurOffset * 0. ) ) * 0.2537;
	
	color += texture2D( texSample, PSTexcoord - ( BlurOffset * 0. ) ) * 0.2537;

	color += texture2D( texSample, PSTexcoord + ( BlurOffset * 1. ) ) * 0.2185;
	color += texture2D( texSample, PSTexcoord - ( BlurOffset * 1. ) ) * 0.2185;

	color += texture2D( texSample, PSTexcoord + ( BlurOffset * 2. ) ) * 0.0821;
	color += texture2D( texSample, PSTexcoord - ( BlurOffset * 2. ) ) * 0.0821;

	color += texture2D( texSample, PSTexcoord + ( BlurOffset * 3. ) ) * 0.0461;
	color += texture2D( texSample, PSTexcoord - ( BlurOffset * 3. ) ) * 0.0461;

	color += texture2D( texSample, PSTexcoord + ( BlurOffset * 4. ) ) * 0.0262;
	color += texture2D( texSample, PSTexcoord - ( BlurOffset * 4. ) ) * 0.0262;

	color += texture2D( texSample, PSTexcoord + ( BlurOffset * 5. ) ) * 0.0162;
	color += texture2D( texSample, PSTexcoord - ( BlurOffset * 5. ) ) * 0.0162;

	color += texture2D( texSample, PSTexcoord + ( BlurOffset * 6. ) ) * 0.0102;
	color += texture2D( texSample, PSTexcoord - ( BlurOffset * 6. ) ) * 0.0102;

	color += texture2D( texSample, PSTexcoord + ( BlurOffset * 7. ) ) * 0.0052;
	color += texture2D( texSample, PSTexcoord - ( BlurOffset * 7. ) ) * 0.0052;

	color /= 1.33;
	gl_FragColor = color;
	gl_FragColor.a = 1.;
	
}