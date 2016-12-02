varying vec2 vUv;
uniform sampler2D texture;
uniform sampler2D texture2;
uniform float alpha;

uniform float h;

void main(void) {

    vec4 sum = vec4( 0.0 );

    sum += texture2D( texture2, vec2( vUv.x - 4.0 * h, vUv.y ) ) * 0.051;
    sum += texture2D( texture2, vec2( vUv.x - 3.0 * h, vUv.y ) ) * 0.0918;
    sum += texture2D( texture2, vec2( vUv.x - 2.0 * h, vUv.y ) ) * 0.12245;
    sum += texture2D( texture2, vec2( vUv.x - 1.0 * h, vUv.y ) ) * 0.1531;
    sum += texture2D( texture2, vec2( vUv.x, vUv.y ) ) * 0.1633;
    sum += texture2D( texture2, vec2( vUv.x + 1.0 * h, vUv.y ) ) * 0.1531;
    sum += texture2D( texture2, vec2( vUv.x + 2.0 * h, vUv.y ) ) * 0.12245;
    sum += texture2D( texture2, vec2( vUv.x + 3.0 * h, vUv.y ) ) * 0.0918;
    sum += texture2D( texture2, vec2( vUv.x + 4.0 * h, vUv.y ) ) * 0.051;
    vec4 l_vOriginalColor = texture2D( texture, vUv);
 

  //gl_FragColor = texture2D(texture2, vUv);//)*0.5+sum*0.5;
  
   vec4 l_FragColor = (l_vOriginalColor-sum)*1.3+sum;



   //gl_FragColor = l_vOriginalColor;
   l_FragColor *= 1.5;
 // gl_FragColor = texture2D(texture, vUv);
  //gl_FragColor /= 2.;
  //gl_FragColor /= 2.;
  l_FragColor.r = pow(l_FragColor.r,0.95);
  l_FragColor.g = pow(l_FragColor.g,0.95);
  l_FragColor.b = pow(l_FragColor.b,0.95);
  gl_FragColor = l_FragColor;
  l_FragColor.a = 1.;

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