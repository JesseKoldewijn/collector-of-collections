import colors from "tailwindcss/colors";

export const themeConfig = {
  light: {
    background: colors.neutral["100"],
    text: colors.neutral["950"],
    tabBorder: colors.lime[500],
    tabIcon: colors.lime[500],
    tabIconActive: colors.lime[700],
  },
  dark: {
    background: colors.neutral["950"],
    text: colors.neutral["100"],
    tabBorder: colors.lime[400],
    tabIcon: colors.lime[400],
    tabIconActive: colors.lime[600],
  },
};
