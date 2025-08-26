// Grass blade fragment shader with color variation
varying vec2 vUv;
varying float vBladeHeight;

uniform vec3 uBaseColor;
uniform vec3 uTipColor;

void main() {
  // Gradient from base to tip
  vec3 color = mix(uBaseColor, uTipColor, vBladeHeight);
  
  // Slight alpha fade at edges for softer appearance
  float alpha = 1.0 - pow(abs(vUv.x - 0.5) * 2.0, 1.5);
  alpha = clamp(alpha, 0.3, 1.0);
  
  gl_FragColor = vec4(color, alpha);
}
