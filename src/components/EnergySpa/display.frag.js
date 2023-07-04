export default /* glsl */ `

// uniform sampler2D posTex;
// uniform sampler2D picture;
uniform float opacity;
uniform float time;
uniform vec3 mainColor;

// varying vec3 vReflect;
// varying vec3 vRefract[3];
// varying float vReflectionFactor;
varying vec2 vUv;

uniform samplerCube tCube;
// varying vec2 vUv;


const mat2 m = mat2( 0.80,  0.60, -0.60,  0.80 );

float noise( in vec2 p ) {
  return sin(p.x)*sin(p.y);
}

float fbm4( vec2 p ) {
    float f = 0.0;
    f += 0.5000 * noise( p ); p = m * p * 2.02;
    f += 0.2500 * noise( p ); p = m * p * 2.03;
    f += 0.1250 * noise( p ); p = m * p * 2.01;
    f += 0.0625 * noise( p );
    return f / 0.9375;
}

float fbm6( vec2 p ) {
    float f = 0.0;
    f += 0.500000*(0.5 + 0.5 * noise( p )); p = m*p*2.02;
    f += 0.250000*(0.5 + 0.5 * noise( p )); p = m*p*2.03;
    f += 0.125000*(0.5 + 0.5 * noise( p )); p = m*p*2.01;
    f += 0.062500*(0.5 + 0.5 * noise( p )); p = m*p*2.04;
    f += 0.031250*(0.5 + 0.5 * noise( p )); p = m*p*2.01;
    f += 0.015625*(0.5 + 0.5 * noise( p ));
    return f/0.96875;
}

float pattern (vec2 p) {
  float vout = fbm4( p + time + fbm6(  p + fbm4( p + time )) );
  return abs(vout);
}

varying vec3 vNormal;

void main() {
  // vec2 screen = vec2(gl_FragCoord.x, gl_FragCoord.y) / resolution.xy;

  // screen.y *= 16.0 / 9.0;
  // screen.y -= 16.0 / 9.0 * 0.75;
  // screen.x -= 0.5;

  // vec4 imgColor = texture2D(picture, (screen));

  // vec4 reflectedColor = textureCube( tCube, vec3( -vReflect.x, vReflect.yz ) );

  // gl_FragColor = vec4(reflectedColor.xyz, 1.0);

  // vec3 tRefract0 = vRefract[0];
  // vec3 tRefract1 = vRefract[1];
  // vec3 tRefract2 = vRefract[2];

  // vec4 reflectedColor = textureCube( tCube, vec3( -vReflect.x, vReflect.yz ) );
  // // vec4 reflectedColor = textureCube( tCube, vec3( -vReflect.x, vReflect.yz ) );
  // vec4 refractedColor = vec4(1.0);

  // refractedColor.r = textureCube( tCube, vec3( tRefract0.x, tRefract0.yz ) ).r;
  // refractedColor.g = textureCube( tCube, vec3( tRefract1.x, tRefract1.yz ) ).g;
  // refractedColor.b = textureCube( tCube, vec3( tRefract2.x, tRefract2.yz ) ).b;

  // // refractedColor.r = textureCube( tCube, vec3( -tRefract0.x, tRefract0.yz ) ).r;
  // // refractedColor.g = textureCube( tCube, vec3( -tRefract1.x, tRefract1.yz ) ).g;
  // // refractedColor.b = textureCube( tCube, vec3( -tRefract2.x, tRefract2.yz ) ).b;

  // // vec2 coord = gl_PointCoord.xy - vec2(0.5);
  // // if (length(coord) > 0.5) {
  // //   discard;
  // // } else {
  // //   gl_FragColor = mix( refractedColor, reflectedColor, clamp( vReflectionFactor, 0.0, 1.0 ) );
  // // }
  // gl_FragColor = mix( reflectedColor, refractedColor, clamp( vReflectionFactor, 0.0, 1.0 ) );
  // gl_FragColor.rgb *= mainColor;

  vec4 mainColor2 = vec4(0.0, 0.0, 0.0, 1.0);
  mainColor2.x = 1.0 - (mainColor.r) * pattern(sin(time + vNormal.x) * vNormal.xy * 1.0 * 0.9 + time * 10.0);
  mainColor2.y = 1.0 - (mainColor.g) * pattern(sin(time + vNormal.y) * vNormal.yz * 1.0 * 1.0 + time * 10.0);
  mainColor2.z = 1.0 - (mainColor.b) * pattern(sin(time + vNormal.z) * vNormal.zx * 1.0 * 1.1 + time * 10.0);

  gl_FragColor.a = opacity * 0.8;

  gl_FragColor.rgb = mainColor2.rgb;

  // gl_FragColor.rgb = vec3(1.0,1.0,1.0);
}

`
