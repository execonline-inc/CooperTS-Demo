import { noop } from "@kofno/piper";
import { LanguageDetectorAsyncModule } from "@prebsch-exo/i18next";
import { SupportedLanguageCode } from "../../Translations/Types";

// Missing ability to detect user's language and handle language detection errors
// See /Users/jkernan/Projects/exec_online/platform3/src/Native/I18nextNativeAsyncStorage/index.ts in p3

export const assertNever = (x: never) => {
  throw new Error(`Unexpected object: ${x}`);
};

type Callback = (language: string) => void;

const detect =
  (fallback: SupportedLanguageCode) =>
  (callback: Callback): void => {
    callback(fallback);
    // Task.succeed<LanguageDetectionError, string>(storageKey)
    //   .andThen(getItem)
    //   .andThen(toTask(emptyLanguageError))
    //   .andThen(decodeSupportedLanguage)
    //   .elseDo(handleLanguageDetectionError)
    //   .fork(() => callback(fallback), callback);
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
