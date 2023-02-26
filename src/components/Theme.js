import React from 'react'
import {createUseStyles, useTheme, ThemeProvider} from 'react-jss';

const theme = {
  display: 'grid';
};

export default function ThemeTest(child) {
  return (
    <ThemeProvider theme={theme}>
      {child}
    </ThemeProvider>
  )
};
