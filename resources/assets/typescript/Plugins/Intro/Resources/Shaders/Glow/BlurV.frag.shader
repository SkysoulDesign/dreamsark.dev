uniform sampler2D texSample;
uniform vec2 BlurOffset;//    = vec2( 0, 0.00260416666  );//1 / 384
varying vec2 PSTexcoord;


void main()
{
	gl_FragColor = texture2D(texSample, PSTexcoord);

	// Sample pixels on either side
	gl_FragColor += texture2D( texSample, PSTexcoord + ( BlurOffset * 0. ) ) * 0.2537;
	gl_FragColor += texture2D( texSample, PSTexcoord - ( BlurOffset * 0. ) ) * 0.2537;

	gl_FragColor += texture2D( texSample, PSTexcoord + ( BlurOffset * 1. ) ) * 0.2185;
	gl_FragColor += texture2D( texSample, PSTexcoord - ( BlurOffset * 1. ) ) * 0.2185;

	gl_FragColor += texture2D( texSample, PSTexcoord + ( BlurOffset * 2. ) ) * 0.0821;
	gl_FragColor += texture2D( texSample, PSTexcoord - ( BlurOffset * 2. ) ) * 0.0821;

	gl_FragColor += texture2D( texSample, PSTexcoord + ( BlurOffset * 3. ) ) * 0.0461;
	gl_FragColor += texture2D( texSample, PSTexcoord - ( BlurOffset * 3. ) ) * 0.0461;

	gl_FragColor += texture2D( texSample, PSTexcoord + ( BlurOffset * 4. ) ) * 0.0262;
	gl_FragColor += texture2D( texSample, PSTexcoord - ( BlurOffset * 4. ) ) * 0.0262;

	gl_FragColor += texture2D( texSample, PSTexcoord + ( BlurOffset * 5. ) ) * 0.0162;
	gl_FragColor += texture2D( texSample, PSTexcoord - ( BlurOffset * 5. ) ) * 0.0162;

	gl_FragColor += texture2D( texSample, PSTexcoord + ( BlurOffset * 6. ) ) * 0.0102;
	gl_FragColor += texture2D( texSample, PSTexcoord - ( BlurOffset * 6. ) ) * 0.0102;

	gl_FragColor += texture2D( texSample, PSTexcoord + ( BlurOffset * 7. ) ) * 0.0102;
	gl_FragColor += texture2D( texSample, PSTexcoord - ( BlurOffset * 7. ) ) * 0.0102;

	gl_FragColor += texture2D( texSample, PSTexcoord + ( BlurOffset * 8. ) ) * 0.0052;
	gl_FragColor += texture2D( texSample, PSTexcoord - ( BlurOffset * 8. ) ) * 0.0052;

}