import { apply_transparent_color } from '../shader-utils';

const fs = `\
uniform vec3 transparentColor;
uniform bool useTransparentColor;
uniform float opacity;

uniform vec3 colors[16];

${apply_transparent_color}

void mutate_color(inout vec3 rgb, float intensity0, float intensity1, float intensity2, float intensity3, float intensity4, float intensity5, float intensity6, float intensity7, float intensity8, float intensity9, float intensity10, float intensity11, float intensity12, float intensity13, float intensity14, float intensity15) { 
  rgb += max(0.0, min(1.0, intensity0)) * vec3(colors[0]);
  rgb += max(0.0, min(1.0, intensity1)) * vec3(colors[1]);
  rgb += max(0.0, min(1.0, intensity2)) * vec3(colors[2]);
  rgb += max(0.0, min(1.0, intensity3)) * vec3(colors[3]);
  rgb += max(0.0, min(1.0, intensity4)) * vec3(colors[4]);
  rgb += max(0.0, min(1.0, intensity5)) * vec3(colors[5]);
  rgb += max(0.0, min(1.0, intensity6)) * vec3(colors[6]);
  rgb += max(0.0, min(1.0, intensity7)) * vec3(colors[7]);
  rgb += max(0.0, min(1.0, intensity8)) * vec3(colors[8]);
  rgb += max(0.0, min(1.0, intensity9)) * vec3(colors[9]);
  rgb += max(0.0, min(1.0, intensity10)) * vec3(colors[10]);
  rgb += max(0.0, min(1.0, intensity11)) * vec3(colors[11]);
  rgb += max(0.0, min(1.0, intensity12)) * vec3(colors[12]);
  rgb += max(0.0, min(1.0, intensity13)) * vec3(colors[13]);
  rgb += max(0.0, min(1.0, intensity14)) * vec3(colors[14]);
  rgb += max(0.0, min(1.0, intensity15)) * vec3(colors[15]);
}

vec4 apply_opacity(vec3 rgb) {
  return vec4(apply_transparent_color(rgb, transparentColor, useTransparentColor, opacity));
}
`;

const DECKGL_MUTATE_COLOR = `\
vec3 rgb = rgba.rgb;
mutate_color(rgb, intensity0, intensity1, intensity2, intensity3, intensity4, intensity5, intensity6, intensity7, intensity8, intensity9, intensity10, intensity11, intensity12, intensity13, intensity14, intensity15);
rgba = apply_opacity(rgb);
`;

export default {
  name: 'color-palette-module',
  fs,
  inject: {
    'fs:DECKGL_MUTATE_COLOR': DECKGL_MUTATE_COLOR
  }
};
