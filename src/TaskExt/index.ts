import { noop } from "@kofno/piper";
import Decoder from "jsonous";
import Task from "taskarian";

//TaskExt is short for "Task Extensions" and is a collection of methods for working with tasks.

export const fromDecoderAny =
  <T>(decoder: Decoder<T>) =>
  (value: unknown): Task<string, T> =>
    new Task((reject, resolve) => {
      decoder.decodeAny(value).cata({ Ok: resolve, Err: reject });
      return noop;
    });
