// Grass blade vertex shader with wind animation
attribute vec3 instancePosition;
attribute float instanceHeight;
attribute float instanceWidth;
attribute float instanceBendFactor;
attribute float instancePhase;

uniform float uTime;
uniform float uWindStrength;
uniform vec3 uWindDirection;
uniform float uWindTurbulence;

varying vec2 vUv;
varying float vBladeHeight;

void main() {
  vUv = uv;
  vBladeHeight = position.y; // 0 at base, 1 at tip
  
  // Start with the base position (from instancing)
  vec3 pos = position;
  
  // Scale by instance size
  pos.x *= instanceWidth;
  pos.y *= instanceHeight;
  
  // Wind bending - only affects the upper part of the blade
  if (uWindStrength > 0.01 && vBladeHeight > 0.1) {
    // Bend factor increases with height (quadratic for natural curve)
    float heightFactor = vBladeHeight * vBladeHeight;
    
    // Per-instance phase variation
    float windPhase = uTime * 0.8 + instancePhase;
    
    // Wind oscillation with turbulence
    float windOscillation = sin(windPhase) * uWindTurbulence;
    
    // Apply wind force
    vec3 windForce = uWindDirection * uWindStrength * instanceBendFactor * heightFactor;
    windForce.x += windOscillation * 0.3;
    windForce.z += sin(windPhase * 1.3) * windOscillation * 0.2;
    
    pos += windForce;
  }
  
  // Apply instance transformation
  pos += instancePosition;
  
  // Transform to clip space
  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}
