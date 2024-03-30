import { createTheme } from '@mui/material';

declare module '@mui/material/styles' {
  interface Palette {
    colors: {
      backgroundColorNavigationBar: string;
      textColor: string;
    };
  }
}

export const theme = createTheme({
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        input: {
          fontSize: '1.4rem',
        },
        root: {
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: '#ffce7f',
          },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          fontSize: '1.4rem',
          '&.Mui-focused': {
            color: '#ffce7f',
          },
        },
      },
    },
  },
});
