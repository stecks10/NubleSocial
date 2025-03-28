import { theme, ThemeSpacing } from './theme';

/**
 * Returns a spacing value from the theme
 * @param spacing - A ThemeSpacing key (xs, sm, md, lg, xl, xxl)
 * @returns The spacing value in pixels (number)
 * @example
 * ```tsx
 * const styles = StyleSheet.create({
 *   container: {
 *     padding: s.md,
 *     marginBottom: s.xl,
 *   }
 * });
 * ```
 */
export function s(spacing: ThemeSpacing): number {
  return theme.spacing[spacing];
}

export const spacing = s;