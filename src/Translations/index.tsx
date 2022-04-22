import { find } from "@execonline-inc/collections";
import {
  defaultSettings,
  element,
  initTask,
  Loaded,
  LoadedFromFallback,
  parameterized as p,
  Parameterized,
  Props,
  translations,
} from "@execonline-inc/translations";
import { identity } from "@kofno/piper";
import i18next, * as i18n from "@prebsch-exo/i18next";
import HttpApi from "@prebsch-exo/i18next-http-backend";
import { Maybe } from "maybeasy";
import * as React from "react";
import Task from "taskarian";
import i18nextNativeAsyncStorage from "../Native/i18next";
import { equalTo } from "../Predicates";
import { SupportedLanguageCode, targetPlatform } from "./Types";

const languageDetectionOptions = {
  order: ["localStorage", "navigator", "querystring"],
};

const defaultI18nSettings: i18n.InitOptions = {
  ...defaultSettings,
  detection: languageDetectionOptions,
  backend: {
    loadPath: `${process.env.PUBLIC_URL}/locales/{{lng}}/{{ns}}.json`,
  },
};

interface I18nextInitialization {
  initializer: i18n.i18n;
  i18nSettings: i18n.InitOptions;
}

const initialization = (initializer: i18n.i18n): I18nextInitialization => ({
  initializer,
  i18nSettings: defaultI18nSettings,
});

const i18nInitializerT = (
  fallback: SupportedLanguageCode
): Task<never, I18nextInitialization> => {
  const initializer = i18next.use(HttpApi);

  switch (targetPlatform) {
    case "web":
      return Task.succeed<never, i18n.i18n>(
        initializer.use(i18nextNativeAsyncStorage(fallback))
      ).map(initialization);
    case "mobile":
      return Task.succeed<never, i18n.i18n>(
        initializer.use(i18nextNativeAsyncStorage(fallback))
      ).map(initialization);
  }
};

export const loader = (
  fallback: SupportedLanguageCode
): Task<LoadedFromFallback, Loaded> =>
  i18nInitializerT(fallback)
    .mapError<LoadedFromFallback>(identity)
    .andThen(({ initializer, i18nSettings }) =>
      initTask(initializer, i18nSettings)
    );

const translatablePlainTextKeys = ["Hello World"] as const;

const notTranslatable = [] as const;

/*
 * Use `{{...}}` to interpolate scalar values (string | number).
 *   Use a `string` type for interpolation when injecting non-translatable content, such as proper nouns, or content that has already been translated externally (string).
 * Use `<abc>...</abc>` to wrap translated content in an element (Interpolator).
 * Use `<xyz/>` to replace with elements that don't need translation content in them (React.ReactElement).
 */
type TParameterizedProps = { kind: "It's <date/>"; date: React.ReactElement };

export const parameterizedValues = (
  t: TParameterizedProps
): Parameterized<TParameterizedKey, TParameterizedProps> => {
  switch (t.kind) {
    case "It's <date/>":
      return p(t, { date: element(t.date) });
  }
};

type TParameterizedKey = TParameterizedProps["kind"];
type TNotTranslatable = typeof notTranslatable[number];
type TTranslatablePlainTextKey = typeof translatablePlainTextKeys[number];

export type TPlainTextKey = TTranslatablePlainTextKey | TNotTranslatable;
export type TProps = Props<
  TPlainTextKey,
  TParameterizedKey,
  TParameterizedProps
>;

export const whenTPlainTextKey = (candidate: string): Maybe<TPlainTextKey> => {
  //The primary benefit of this equalTo method is that it can be used for currying.
  const whenStringIncludedIn = find<TPlainTextKey>(equalTo(candidate));

  return whenStringIncludedIn(notTranslatable).orElse(() =>
    whenStringIncludedIn(translatablePlainTextKeys)
  );
};

export const { L, translation, translator, T } = translations<
  TPlainTextKey,
  TNotTranslatable,
  TParameterizedKey,
  TParameterizedProps
>(translatablePlainTextKeys, notTranslatable, parameterizedValues);

export {
  AlreadyTranslated,
  alreadyTranslatedText,
  NotTranslated,
  TranslationsContext,
  TranslationsLoader,
} from "@execonline-inc/translations";
export type {
  AlreadyTranslatedText,
  LocalizationFormat,
  TranslationsState,
} from "@execonline-inc/translations";
export { localizer } from "@execonline-inc/translations/lib/localizations";
