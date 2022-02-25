import { stringLiteral } from "@execonline-inc/decoders";
import Decoder, { oneOf } from "jsonous";
import {
  SupportedLanguageCode,
  SupportedLanguageEnglishName,
  SupportedLanguageLocalName,
} from "./Types";

export const supportedLanguageEnglishNameDecoder: Decoder<SupportedLanguageEnglishName> =
  oneOf([
    stringLiteral<SupportedLanguageEnglishName>("English"),
    stringLiteral<SupportedLanguageEnglishName>("French"),
    stringLiteral<SupportedLanguageEnglishName>("Spanish"),
    stringLiteral<SupportedLanguageEnglishName>("Japanese"),
  ]);

export const supportedLanguageLocalNameDecoder: Decoder<SupportedLanguageLocalName> =
  oneOf([
    stringLiteral<SupportedLanguageLocalName>("English"),
    stringLiteral<SupportedLanguageLocalName>("español"),
    stringLiteral<SupportedLanguageLocalName>("français"),
    stringLiteral<SupportedLanguageLocalName>("日本語"),
  ]);

export const supportedLanguageCodeDecoder: Decoder<SupportedLanguageCode> =
  oneOf([
    stringLiteral<SupportedLanguageCode>("en"),
    stringLiteral<SupportedLanguageCode>("fr"),
    stringLiteral<SupportedLanguageCode>("es"),
    stringLiteral<SupportedLanguageCode>("ja"),
  ]);
