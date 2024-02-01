const colors = require("tailwindcss/colors");

const config = {
  expo: {
    name: "RNExpoCore",
    slug: "RNExpoCore",
    scheme: "rn-expo",
    version: "1.0.0",
    orientation: "automatic",
    icon: "./assets/icon.png",
    userInterfaceStyle: "automatic",
    splash: {
      image: "./assets/splash.png",
      resizeMode: "contain",
      backgroundColor: colors.neutral["950"],
    },
    assetBundlePatterns: ["**/*"],
    ios: {
      supportsTablet: true,
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/adaptive-icon.png",
        backgroundColor: colors.neutral["950"],
      },
    },
    web: {
      bundler: "metro",
      favicon: "./assets/favicon.png",
    },
    plugins: ["expo-router"],
  },
};
module.exports = config;
