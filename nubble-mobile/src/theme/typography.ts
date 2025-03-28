import { TextStyle } from 'react-native';
import { theme, ThemeFontSize, ThemeFontWeight } from './theme';

interface TypographyParams {
  fontSize?: ThemeFontSize;
  fontWeight?: ThemeFontWeight;
}

/**
 * Creates typography styles based on the theme
 * @param params - Typography parameters (fontSize, fontWeight)
 * @returns TextStyle object with typography properties
 * @example
 * ```tsx
 * const styles = StyleSheet.create({
 *   title: {
 *     ...typography({ fontSize: 'xl', fontWeight: 'bold' }),
 *     color: 'red',
 *   }
 * });
 * ```
 */
export function typography({
  fontSize = 'md', 
  fontWeight = 'regular'
}: TypographyParams = {}): TextStyle {
  return {
    fontSize: theme.fontSize[fontSize],
    fontWeight: theme.fontWeight[fontWeight],
  };
}