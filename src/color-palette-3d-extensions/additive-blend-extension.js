import BaseExtension from './base-extension';

const _BEFORE_RENDER = ``;

const _RENDER = `\
  vec3 rgbCombo = vec3(0.0);
  vec3 hsvCombo = vec3(0.0);
  float intensityArray[16] = float[16](intensityValue0, intensityValue1, intensityValue2, intensityValue3, intensityValue4, intensityValue5, intensityValue6, intensityValue7, intensityValue8, intensityValue9, intensityValue10, intensityValue11, intensityValue12, intensityValue13, intensityValue14, intensityValue15);
  float total = 0.0;
  for(int i = 0; i < 16; i++) {
    float intensityValue = intensityArray[i];
    rgbCombo += max(0.0, min(1.0, intensityValue)) * colors[i];
    total += intensityValue;
  }
  // Do not go past 1 in opacity.
  total = min(total, 1.0);
  vec4 val_color = vec4(rgbCombo, total);
  // Opacity correction
  val_color.a = 1.0 - pow(1.0 - val_color.a, 1.0);
  color.rgb += (1.0 - color.a) * val_color.a * val_color.rgb;
  color.a += (1.0 - color.a) * val_color.a;
  if (color.a >= 0.95) {
    break;
  }
`;

const _AFTER_RENDER = ``;

/**
 * This deck.gl extension allows for a color palette to be used for rendering in 3D with additive blending.
 * */
const AdditiveBlendExtension = class extends BaseExtension {
  constructor(args) {
    super(args);
    this.rendering = { _BEFORE_RENDER, _RENDER, _AFTER_RENDER };
  }
};

AdditiveBlendExtension.extensionName = 'AdditiveBlendExtension';

export default AdditiveBlendExtension;
