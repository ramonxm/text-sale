import { gray, blue, red, green } from '@radix-ui/colors';
import { createStitches } from '@stitches/react';

export const { config, createTheme, css, getCssText, globalCss, styled, theme } = createStitches({
  theme: {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    colors: {
      ...gray,
      ...blue,
      ...red,
      ...green,
    },
  },
});