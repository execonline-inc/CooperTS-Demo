import { Platform } from "react-native";

export type SupportedLanguageCode = "en" | "fr" | "es" | "ja";

export type SupportedLanguageEnglishName =
  | "English"
  | "Spanish"
  | "French"
  | "Japanese";

export type SupportedLanguageLocalName =
  | "English"
  | "español"
  | "français"
  | "日本語";

export type TargetPlatform = "web" | "mobile";

export const getTargetPlatform = (): TargetPlatform => {
  switch (Platform.OS) {
    case "web":
    case "macos":
    case "windows":
      return "web";
    case "ios":
    case "android":
      return "mobile";
  }
};

export const targetPlatform = getTargetPlatform();
