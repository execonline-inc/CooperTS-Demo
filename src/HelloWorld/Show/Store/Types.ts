// import { AjaxResponse, BadStatus } from "ajaxian";

export const waiting = (): Waiting => ({ kind: "waiting" });

export const loading = (): Loading => ({ kind: "loading" });

export const ready = (message: string): Ready => ({
  kind: "ready",
  message,
});

export const error = (message: string): Error => ({ kind: "error", message });

// export const badStatusError = (error: AjaxResponse): BadStatus => ({ kind: "bad-status", error });

interface Waiting {
  kind: "waiting";
}

interface Loading {
  kind: "loading";
}

interface Ready {
  kind: "ready";
  message: string;
}

interface Error {
  kind: "error";
  message: string;
}

// interface BadStatusError {
//   kind: "bad-status";
//   error: BadStatus;
// }

export type State = Waiting | Loading | Ready | Error;
