import Constants, { ExecutionEnvironment } from "expo-constants";

export const isDev =
  Constants.appOwnership === "expo" ??
  Constants.executionEnvironment === ExecutionEnvironment.Standalone;

export const backendHostname = isDev
  ? "http://localhost:3000"
  : "https://librarian.vercel.app";
