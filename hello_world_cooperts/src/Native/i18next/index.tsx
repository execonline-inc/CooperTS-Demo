import { noop } from "@kofno/piper";
import { LanguageDetectorAsyncModule } from "@prebsch-exo/i18next";
import { SupportedLanguageCode } from "../../Translations/Types";

// Currently this app is missing the ability to detect user's language and handle language detection errors, but this is where that functionality could be added.

export const assertNever = (x: never) => {
  throw new Error(`Unexpected object: ${x}`);
};

type Callback = (language: string) => void;

const detect =
  (fallback: SupportedLanguageCode) =>
  (callback: Callback): void => {
    callback(fallback);
  };

const cacheUserLanguage = (language: string): void => {
  //   setItem(storageKey, language).fork(handleSetItemError, noop);
};

const i18nextNativeAsyncStorage = (
  fallback: SupportedLanguageCode
): LanguageDetectorAsyncModule => ({
  type: "languageDetector",
  async: true,
  init: noop,
  detect: detect(fallback),
  cacheUserLanguage,
});

export default i18nextNativeAsyncStorage;
