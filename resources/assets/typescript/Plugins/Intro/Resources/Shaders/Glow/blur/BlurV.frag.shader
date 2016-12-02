uniform sampler2D texSample;
uniform vec2 BlurOffset;//    = vec2( 0, 0.00260416666  );//1 / 384
varying vec2 PSTexcoord;


void main()
{
 

	// Sample pixels on either side
	vec4 color = texture2D( texSample, PSTexcoord + ( BlurOffset * 0. ) ) * 0.2537;
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

	color += texture2D( texSample, PSTexcoord + ( BlurOffset * 7. ) ) * 0.0102;
	color += texture2D( texSample, PSTexcoord - ( BlurOffset * 7. ) ) * 0.0102;

	color += texture2D( texSample, PSTexcoord + ( BlurOffset * 8. ) ) * 0.0052;
	color += texture2D( texSample, PSTexcoord - ( BlurOffset * 8. ) ) * 0.0052;

	// color /=16.;
	gl_FragColor = color;
	gl_FragColor.a = 1.;

}