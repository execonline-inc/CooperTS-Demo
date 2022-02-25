import * as React from "react";
import { L, T } from "../Translations";

class HelloWorld extends React.Component {
  render() {
    return (
      <>
        <T kind="Hello World" />
        <T
          kind="It's <date/>"
          date={
            <span>
              <L localizeable={new Date()} format="short-month-day-year" />
            </span>
          }
        />
      </>
    );
  }
}

export default HelloWorld;
