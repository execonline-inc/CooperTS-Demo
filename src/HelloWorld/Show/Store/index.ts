import { just, Maybe, nothing } from "maybeasy";
import { error, loading, ready, State, waiting } from "./Types";
import { action, computed, observable } from "mobx";

class ShowHelloWorldStore {
  @observable
  state: State = waiting();

  @action
  load = () => {
    this.state = loading();
  };

  @action
  ready = (message: string) => {
    this.state = ready(message);
  };

  @action
  error = (message: string) => {
    this.state = error(message);
  };

  @computed
  get errorMessage(): Maybe<string> {
    switch (this.state.kind) {
      case "error":
        return just(this.state.message);
      case "ready":
      case "loading":
      case "waiting":
        return nothing();
    }
  }
}

export default ShowHelloWorldStore;
