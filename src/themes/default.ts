import { createTheme, responsiveFontSizes } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface BreakpointOverrides {
    xs: true;
    sm: true;
    md: true;
    lg: true;
    xl: true;
    mobile: true;
    tablet: true;
    laptop: true;
    desktop: true;
  }

  interface TypeText {
    contrast: string;
  }

  interface TypeBackground {
    navbar: string;
  }

  interface TypographyVariants {
    'title-42-medium': React.CSSProperties;
    'title-32-bold': React.CSSProperties;
    'title-24-bold': React.CSSProperties;
    'title-24-medium': React.CSSProperties;
    'subtitle-20-bold': React.CSSProperties;
    'subtitle-20-medium': React.CSSProperties;
    'subtitle-18-bold': React.CSSProperties;
    'subtitle-18-semi-bold': React.CSSProperties;
    'subtitle-18-medium': React.CSSProperties;
    'title-16-bold': React.CSSProperties;
    'subtitle-16-semi-bold': React.CSSProperties;
    'body-16-medium': React.CSSProperties;
    'body-16-regular': React.CSSProperties;
    'body-14-medium': React.CSSProperties;
    'body-14-regular': React.CSSProperties;
    'caption-12-medium': React.CSSProperties;
    'caption-12-regular': React.CSSProperties;
    'button-14': React.CSSProperties;
    'link-14': React.CSSProperties;
    'button-12': React.CSSProperties;
    'caption-8-regular': React.CSSProperties;
    'caption-8-medium': React.CSSProperties;
    'caption-10-regular': React.CSSProperties;
  }
  interface TypographyVariantsOptions {
    'title-42-medium'?: React.CSSProperties
    'title-32-bold'?: React.CSSProperties
    'title-24-bold'?: React.CSSProperties
    'title-24-medium'?: React.CSSProperties
    'subtitle-20-bold'?: React.CSSProperties
    'subtitle-20-medium'?: React.CSSProperties
    'subtitle-18-bold'?: React.CSSProperties
    'subtitle-18-semi-bold'?: React.CSSProperties
    'subtitle-18-medium'?: React.CSSProperties
    'title-16-bold'?: React.CSSProperties
    'subtitle-16-semi-bold'?: React.CSSProperties
    'body-16-medium'?: React.CSSProperties
    'body-16-regular'?: React.CSSProperties
    'body-14-medium'?: React.CSSProperties
    'body-14-regular'?: React.CSSProperties
    'caption-12-medium'?: React.CSSProperties
    'caption-12-regular'?: React.CSSProperties
    'button-14'?: React.CSSProperties
    'link-14'?: React.CSSProperties
    'button-12'?: React.CSSProperties
    'caption-8-regular'?: React.CSSProperties
    'caption-8-medium'?: React.CSSProperties
    'caption-10-regular'?: React.CSSProperties
  }
}

declare module '@mui/material/styles/createPalette' {
  interface Palette {

  }
  interface PaletteOptions {

  }
}

declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    'title-42-medium': true;
    'title-32-bold': true;
    'title-24-bold': true;
    'title-24-medium': true;
    'subtitle-20-bold': true;
    'subtitle-20-medium': true;
    'subtitle-18-bold': true;
    'subtitle-18-semi-bold': true;
    'subtitle-18-medium': true;
    'title-16-bold': true;
    'subtitle-16-semi-bold': true;
    'body-16-medium': true;
    'body-16-regular': true;
    'body-14-medium': true;
    'body-14-regular': true;
    'caption-12-medium': true;
    'caption-12-regular': true;
    'button-14': true;
    'link-14': true;
    'button-12': true;
    'caption-8-regular': true;
    'caption-8-medium': true;
    'caption-10-regular': true;
  }
}

const theme = responsiveFontSizes(createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#ee511e',
    },
    secondary: {
      main: '#f5811f',
    },
    error: {
      main: '#ff6a55',
      dark: '#7D3030',
      light: '#F9E9DF'
    },
    warning: {
      main: '#ffaf0f',
    },
    info: {
      main: '#4576e5',
    },
    success: {
      main: '#83bf6e',
    },
    background: {
      default: '#ffffff',
      paper: 'rgba(255, 255, 255, 0.60)',
      navbar: 'rgba(255, 255, 255, 0.80)',
    },
    grey: {
      50: '#fafafa',
      100: '#f5f5f5',
      200: '#eeeeee',
      300: '#e0e0e0',
      400: '#bdbdbd',
      500: '#E1E1EA',
      600: '#BCBCBC',
      700: '#616161',
      800: '#424242',
      900: '#212121',
      A100: '#f5f5f5',
      A200: '#eeeeee',
      A400: '#bdbdbd',
      A700: '#616161',
    },
    text: {
      primary: '#10061F',
      secondary: '#475569',
      disabled: '#7F8EA4',
    },
  },
  typography: {
    fontFamily: [
      'Comfortaa',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    'title-42-medium': {
      fontSize: '42px',
      fontStyle: 'normal',
      fontWeight: 500,
      lineHeight: '58px', // 138.095%
      letterSpacing: '-0.5px',
    },
    'title-32-bold': {
      fontSize: '28px',
      fontStyle: 'normal',
      fontWeight: 500,
      lineHeight: '36px', // 128.571%
      letterSpacing: '-0.5px',
    },
    'title-24-bold': {
      fontSize: '24px',
      fontStyle: 'normal',
      fontWeight: 500,
      lineHeight: '36px', // 150%
      letterSpacing: '-0.5px',
    },
    'title-24-medium': {
      fontSize: '24px',
      fontStyle: 'normal',
      fontWeight: 400,
      lineHeight: '36px', // 150%
      letterSpacing: '-0.5px',
    },
    'subtitle-20-bold': {
      fontSize: '20px',
      fontStyle: 'normal',
      fontWeight: 500,
      lineHeight: '26px', // 130%
    },
    'subtitle-20-medium': {
      fontSize: '20px',
      fontStyle: 'normal',
      fontWeight: 400,
      lineHeight: '26px', // 130%
      letterSpacing: '-0.5px',
    },
    'subtitle-18-bold': {
      fontSize: '18px',
      fontStyle: 'normal',
      fontWeight: 700,
      lineHeight: '24px', // 133.333%
    },
    'subtitle-18-semi-bold': {
      fontSize: '18px',
      fontStyle: 'normal',
      fontWeight: 500,
      lineHeight: '24px', // 133.333%
      letterSpacing: '-0.5px',
    },
    'subtitle-18-medium': {
      fontSize: '18px',
      fontStyle: 'normal',
      fontWeight: 400,
      lineHeight: '24px', // 133.333%
      letterSpacing: '-0.5px',
    },
    'title-16-bold': {
      fontSize: '16px',
      fontStyle: 'normal',
      fontWeight: 700,
      lineHeight: '22px', // 137.5%
    },
    'subtitle-16-semi-bold': {
      fontSize: '16px',
      fontStyle: 'normal',
      fontWeight: 500,
      lineHeight: '22px', // 137.5%
    },
    'body-16-medium': {
      fontSize: '16px',
      fontStyle: 'normal',
      fontWeight: 500,
      lineHeight: '22px', // 137.5%
      letterSpacing: '-0.5px',
    },
    'body-16-regular': {
      fontSize: '16px',
      fontStyle: 'normal',
      fontWeight: 400,
      lineHeight: '22px', // 137.5%
      letterSpacing: '-0.5px',
    },
    'body-14-medium': {
      fontSize: '14px',
      fontStyle: 'normal',
      fontWeight: 500,
      lineHeight: '20px', // 142.857%
      letterSpacing: '-0.5px',
    },
    'body-14-regular': {
      fontSize: '14px',
      fontStyle: 'normal',
      fontWeight: 400,
      lineHeight: '20px', // 142.857%
      letterSpacing: '-0.5px',
    },
    'caption-12-medium': {
      fontSize: '12px',
      fontStyle: 'normal',
      fontWeight: 500,
      lineHeight: '16px', // 133.333%
      letterSpacing: '-0.5px',
    },
    'caption-12-regular': {
      fontSize: '12px',
      fontStyle: 'normal',
      fontWeight: 400,
      lineHeight: '16px', // 133.333%
      letterSpacing: '-0.5px',
    },
    'button-14': {
      fontSize: '14px',
      fontStyle: 'normal',
      fontWeight: 700,
      lineHeight: '20px', // 142.857%
    },
    'link-14': {
      fontSize: '14px',
      fontStyle: 'normal',
      fontWeight: 600,
      lineHeight: '20px', // 142.857%
    },
    'button-12': {
      fontSize: '12px',
      fontStyle: 'normal',
      fontWeight: 600,
      lineHeight: '16px', // 133.333%
    },
    'caption-8-regular': {
      fontSize: '8px',
      fontStyle: 'normal',
      fontWeight: 400,
      lineHeight: '12px', // 150%
      letterSpacing: '-0.5px',
    },
    'caption-8-medium': {
      fontSize: '8px',
      fontStyle: 'normal',
      fontWeight: 600,
      lineHeight: 'normal',
    },
    'caption-10-regular': {
      fontSize: '10px',
      fontStyle: 'normal',
      fontWeight: 400,
      lineHeight: '14px', // 140%
      letterSpacing: '-0.5px',
    }
  },
  spacing: (factor: number) => `${0.25 * factor}rem`,
}));

export default theme;