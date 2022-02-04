import { explicitMaybe } from "@execonline-inc/decoders";
import Decoder, { field, string, succeed } from "jsonous";
import { HelloWorld } from "./Types";

export const helloWorldDecoder: Decoder<HelloWorld> = succeed({}).assign(
  "message",
  field("message", explicitMaybe(string))
);
