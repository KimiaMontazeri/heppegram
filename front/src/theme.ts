import {
  extendTheme,
  type ThemeConfig,
  theme as baseTheme,
  withDefaultColorScheme,
} from '@chakra-ui/react';

const config: ThemeConfig = {
  initialColorMode: 'light',
  useSystemColorMode: false,
};

const colors = {
  primary: baseTheme.colors.teal,
};

export const theme = extendTheme(
  { config, colors },
  withDefaultColorScheme({ colorScheme: 'primary' }),
);
