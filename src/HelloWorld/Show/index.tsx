import ShowHelloWorldStore from "./Store";
import { observer } from "mobx-react";
import * as React from "react";

interface Props {
  message: string;
}

class ShowHelloWorld extends React.Component<Props> {
  store = new ShowHelloWorldStore();
  componentDidMount() {
    this.store.load();
  }

  render() {
    return (
      <>
        <h1>{this.props.message}</h1>
      </>
    );
  }
}

export default observer(ShowHelloWorld);
