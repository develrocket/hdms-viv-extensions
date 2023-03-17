import BaseExtension from './base-extension';

const _BEFORE_RENDER = `\
  float minVals[16] = float[16](1. / 0., 1. / 0., 1. / 0., 1. / 0., 1. / 0., 1. / 0., 1. / 0., 1. / 0., 1. / 0., 1. / 0., 1. / 0., 1. / 0., 1. / 0., 1. / 0., 1. / 0., 1. / 0.);
`;

const _RENDER = `\
  float intensityArray[16] = float[16](intensityValue0, intensityValue1, intensityValue2, intensityValue3, intensityValue4, intensityValue5, intensityValue6, intensityValue7, intensityValue8, intensityValue9, intensityValue10, intensityValue11, intensityValue12, intensityValue13, intensityValue14, intensityValue15);

  for(int i = 0; i < 16; i++) {
    if(intensityArray[i] < minVals[i]) {
      minVals[i] = intensityArray[i];
    }
  }
`;

const _AFTER_RENDER = `\
  float total = 0.0;
  for(int i = 0; i < 16; i++) {
    total += minVals[i];
  }
  // Do not go past 1 in opacity/colormap value.
  total = min(total, 1.0);
  color = colormap(total, total);
`;

/**
 * This deck.gl extension allows for an additive colormap like viridis or jet to be used for pseudo-coloring channels with Minimum Intensity Projection in 3D.
 */
const MinimumIntensityProjectionExtension = class extends BaseExtension {
  constructor(args) {
    super(args);
    this.rendering = { _BEFORE_RENDER, _RENDER, _AFTER_RENDER };
  }
};

MinimumIntensityProjectionExtension.extensionName =
  'MinimumIntensityProjectionExtension';

export default MinimumIntensityProjectionExtension;
