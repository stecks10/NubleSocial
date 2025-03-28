export const palette = {
  // Primary
  primary: '#22A45D',
  primaryLight: '#E7F5EF',
  primaryDark: '#0A8D40',
  
  // Secondary
  secondary: '#FE3165',
  secondaryLight: '#FCECF0',
  secondaryDark: '#D10049',
  
  // Gray scale
  gray100: '#F8F9FA',
  gray200: '#E9ECEF',
  gray300: '#DEE2E6',
  gray400: '#CED4DA',
  gray500: '#ADB5BD',
  gray600: '#6C757D',
  gray700: '#495057',
  gray800: '#343A40',
  gray900: '#212529',
  
  // Status
  success: '#22A45D',
  error: '#FF3B30',
  warning: '#FFCC00',
  
  // Common
  white: '#FFFFFF',
  black: '#000000',
};

export const theme = {
  colors: {
    ...palette,
    background: palette.white,
    text: palette.gray900,
    primary: palette.primary,
    secondary: palette.secondary,
    border: palette.gray300,
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 40,
  },
  borderRadius: {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 24,
    xxl: 32,
  },
  fontSize: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 20,
    xxl: 24,
    xxxl: 30,
  },
  fontWeight: {
    regular: '400',
    medium: '500',
    semiBold: '600',
    bold: '700',
  },
};

export type Theme = typeof theme;
export type ThemeColors = keyof typeof theme.colors;
export type ThemeSpacing = keyof typeof theme.spacing;
export type ThemeBorderRadius = keyof typeof theme.borderRadius;
export type ThemeFontSize = keyof typeof theme.fontSize;
export type ThemeFontWeight = keyof typeof theme.fontWeight;