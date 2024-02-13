import * as React from 'react';
import {
  defaultDarkModeOverride,
  ThemeProvider,
} from '@aws-amplify/ui-react-native';

const theme = {
  overrides: [defaultDarkModeOverride],
};

interface DefaultDarkModeProps {
  colorMode: 'light' | 'dark';
}

const DefaultDarkMode: React.FC<DefaultDarkModeProps> = ({colorMode}) => {
  return (
    <ThemeProvider theme={theme} colorMode={colorMode}>
      {/* ... */}
    </ThemeProvider>
  );
};

export default DefaultDarkMode;
