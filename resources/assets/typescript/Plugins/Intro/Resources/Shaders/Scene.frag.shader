varying vec2 vUv;
uniform sampler2D texture;
uniform float alpha;

void main(void) {

    vec2 l_vMyCenter = vec2(0.5,0.5);

   gl_FragColor = texture2D(texture, vUv);
   if( gl_FragColor.r <= 0. && gl_FragColor.g >= 0.5 && gl_FragColor.b == 0. )
   {
       gl_FragColor.rgba = vec4(1,0,0,1);
   }
   //gl_FragColor = vec4(1,1,1,1);
    // if(abs(l_vMyCenter.x-vUv.x)>0.2)
    // {
    //     for(float i = 0.0;i < 4.0; i++){
    //     {
    //         vec2 l_BlurUV = vec2(vUv);
    //         l_BlurUV.x -= i*0.01;
    //         gl_FragColor += texture2D(texture, l_BlurUV);
    //         l_BlurUV = vec2(vUv)
    //         l_BlurUV.x += i*0.01;
    //         gl_FragColor += texture2D(texture, l_BlurUV);
    //     }
    //     gl_FragColor /= 4.0;
        
    // }
    // else
    // {
    //     gl_FragColor = texture2D(texture, vUv);
    // }

    // gl_FragColor.a = alpha;
}