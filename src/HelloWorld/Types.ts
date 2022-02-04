import { Maybe } from "maybeasy";

export interface HelloWorld {
  message: Maybe<string>;
}

// export interface HelloWorldResource = Resource<HelloWorld>

// still need to create a backend with some data that gets decoded
