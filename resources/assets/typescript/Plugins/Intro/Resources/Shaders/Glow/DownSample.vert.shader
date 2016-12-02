uniform vec2 PixelOffset;//   = vec2(  0.0097656250, 0.0013020833  );// Pixel offsets ( 1 / 512, 1 / 384 )
varying vec2 PSTexcoord;


void main()
{
	gl_Position = projectionMatrix * modelViewMatrix *vec4(position,1);
	PSTexcoord = uv + ( PixelOffset * 0.5 );

}