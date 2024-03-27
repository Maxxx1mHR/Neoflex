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

            // borderWidth: '2px',
          },
          // '&:hover': {
          //   '.MuiOutlinedInput-notchedOutline': {
          //     borderColor: 'rgb(255,129,0)',
          //     borderWidth: '3px',
          //   },
          // },
          // '.MuiOutlinedInput-notchedOutline': {
          //   borderColor: 'rgba(255,129,0,0.3)',
          //   backgroundColor: 'rgba(255,255,255,0.1)',
          //   borderWidth: '2px',
          //   fontSize: '1.4rem',
          // },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          fontSize: '1.4rem',
          // color: 'rgba(255,255,255,0.6)',
          '&.Mui-focused': {
            color: '#ffce7f',
          },
        },
      },
    },
    // MuiInputBase: {
    //   styleOverrides: {
    //     root: {
    //       color: '#ffffff',
    //     },
    //   },
    // },
  },
});
