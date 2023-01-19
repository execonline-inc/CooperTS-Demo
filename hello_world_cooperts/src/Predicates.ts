//The primary benefit of this equalTo method is that it can be used for currying.
export const equalTo =
  <T>(a: T) =>
  (b: T) =>
    a === b;
