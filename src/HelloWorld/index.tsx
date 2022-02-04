import * as React from "react";
import ShowHelloWorld from "../HelloWorld/Show/index";

class HelloWorld extends React.Component {
  render() {
    return (
      <>
        <ShowHelloWorld message="Hello World" />
      </>
    );
  }
}

export default HelloWorld;
