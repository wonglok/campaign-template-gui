import { useFrame, useThree } from '@react-three/fiber'
import { useMemo } from 'react'

import {
  WebGLCubeRenderTarget,
  Scene,
  Mesh,
  ShaderMaterial,
  CubeRefractionMapping,
  BackSide,
  NoBlending,
  BoxBufferGeometry,
  CubeCamera,
  // LinearMipmapLinearFilter,
  // RGBFormat,
  // LinearFilter,
  CubeReflectionMapping,
  // sRGBEncoding,
  SRGBColorSpace,
} from 'three'

// import { cloneUniforms } from "three/src/renderers/shaders/UniformsUtils.js";
// import * as dat from '';

// let DefaultCode = `
// const mat2 m = mat2( 0.80,  0.60, -0.60,  0.80 );

// float noise( in vec2 p ) {
//   return sin(p.x)*sin(p.y);
// }

// float fbm4( vec2 p ) {
//     float f = 0.0;
//     f += 0.5000 * noise( p ); p = m * p * 2.02;
//     f += 0.2500 * noise( p ); p = m * p * 2.03;
//     f += 0.1250 * noise( p ); p = m * p * 2.01;
//     f += 0.0625 * noise( p );
//     return f / 0.9375;
// }

// float fbm6( vec2 p ) {
//     float f = 0.0;
//     f += 0.500000*(0.5 + 0.5 * noise( p )); p = m*p*2.02;
//     f += 0.250000*(0.5 + 0.5 * noise( p )); p = m*p*2.03;
//     f += 0.125000*(0.5 + 0.5 * noise( p )); p = m*p*2.01;
//     f += 0.062500*(0.5 + 0.5 * noise( p )); p = m*p*2.04;
//     f += 0.031250*(0.5 + 0.5 * noise( p )); p = m*p*2.01;
//     f += 0.015625*(0.5 + 0.5 * noise( p ));
//     return f/0.96875;
// }

// float pattern (vec2 p) {
//   float vout = fbm4( p + time + fbm6(  p + fbm4( p + time )) );
//   return abs(vout);
// }

// vec4 mainImage (vec2 uv) {
//   return vec4(vec3(
//     0.35 + pattern(uv * 1.70123 + -0.17 * cos(time * 0.05)),
//     0.35 + pattern(uv * 1.70123 +  0.0 * cos(time * 0.05)),
//     0.35 + pattern(uv * 1.70123 +  0.17 * cos(time * 0.05))
//   ), 1.0);
// }
// `

export function useEnv(uniforms = {}, res = 128, frames = Infinity) {
  let { gl } = useThree()

  let { envMap, compute } = useMemo(() => {
    let scene = new Scene()

    let shader = {
      uniforms: {
        ...uniforms,
        time: { value: 0.5 },
      },

      vertexShader: `
        varying vec3 vPos;
        varying vec3 vWorldDirection;
        vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
          return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
        }
        void main() {
          vPos = position;
          vWorldDirection = transformDirection( position, modelMatrix );
          #include <begin_vertex>
          #include <project_vertex>
        }
      `,

      fragmentShader: `
        varying vec3 vWorldDirection;
        varying vec3 vPos;
        #define RECIPROCAL_PI 0.31830988618
        #define RECIPROCAL_PI2 0.15915494

        uniform float time;


        const float PI = 3.14159265;
        const float SCALE = 1.0;
        const mat3 m = mat3(
          cos(PI * SCALE), -sin(PI * SCALE), 0.0,
          sin(PI * SCALE),  cos(PI * SCALE), 0.0,
          0.0,  0.0, 1.0
        );

        float noise( in vec3 p ) {
          return cos(p.x) * sin(p.y) * cos(p.z);
        }

        float fbm4( vec3 p ) {
            float f = 0.0;
            f += 0.5000 * noise( p ); p = m * p * 2.02;
            f += 0.2500 * noise( p ); p = m * p * 2.03;
            f += 0.1250 * noise( p ); p = m * p * 2.01;
            f += 0.0625 * noise( p );
            return f / 0.9375;
        }

        float fbm6( vec3 p ) {
            float f = 0.0;
            f += 0.500000*(0.5 + 0.5 * noise( p )); p = m*p*2.02;
            f += 0.250000*(0.5 + 0.5 * noise( p )); p = m*p*2.03;
            f += 0.125000*(0.5 + 0.5 * noise( p )); p = m*p*2.01;
            f += 0.062500*(0.5 + 0.5 * noise( p )); p = m*p*2.04;
            f += 0.031250*(0.5 + 0.5 * noise( p )); p = m*p*2.01;
            f += 0.015625*(0.5 + 0.5 * noise( p ));
            return f/0.96875;
        }

        float pattern (vec3 p) {
          float vout = fbm4( p + time + fbm6(  p + fbm4( p + time )) );
          return abs(vout);
        }

        vec4 mainImage (vec2 uv, vec3 direction, vec3 pos) {
          return vec4(vec3(
            (pattern(5.3 * direction.xyz + -0.1 * sin(time * 0.1))),
            (pattern(5.3 * direction.xyz +  0.0 * sin(time * 0.1))),
            (pattern(5.3 * direction.xyz +  0.1 * sin(time * 0.1)))
          ), 1.0);
        }

        void main() {
          vec3 direction = normalize( vWorldDirection );
          vec2 sampleUV;
          sampleUV.y = asin( clamp( direction.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
          sampleUV.x = atan( direction.z, direction.x ) * RECIPROCAL_PI2 + 0.5;

          gl_FragColor = mainImage(sampleUV, direction, vPos);

        }
      `,
    }

    //

    let material = new ShaderMaterial({
      type: 'CubemapFromEquirect',
      uniforms: shader.uniforms,
      vertexShader: shader.vertexShader,
      fragmentShader: shader.fragmentShader,
      side: BackSide,
      blending: NoBlending,
    })

    let mesh = new Mesh(new BoxBufferGeometry(5, 5, 5), material)
    scene.add(mesh)

    let cubeRtt = new WebGLCubeRenderTarget(res, {
      generateMipmaps: true,
      // magFilter: LinearFilter,
      // minFilter: LinearMipmapLinearFilter,
    })

    let camera = new CubeCamera(1, 100000, cubeRtt)

    shader.uniforms.time.value = 0.4
    camera.update(gl, scene)

    let compute = () => {
      shader.uniforms.time.value += 1 / 60
      camera.update(gl, scene)
    }

    cubeRtt.texture.mapping = CubeRefractionMapping
    cubeRtt.texture.mapping = CubeReflectionMapping
    cubeRtt.texture.colorSpace = SRGBColorSpace

    return {
      envMap: cubeRtt.texture,
      compute,
    }
  }, [res])

  let i = 0
  useFrame(() => {
    if (i <= frames || frames === -1) {
      i++
      compute()
    }
  })

  return envMap
}
