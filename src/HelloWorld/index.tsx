import * as React from "react";
import { L, T } from "../Translations";

class HelloWorld extends React.Component {
  render() {
    return (
      <>
        <T kind="Hello World" />
        <T
          kind="It's <date/>"
          //L (Localization) tags are a tool built into our CooperTS translation solution. They’re a way to allow translations across different date/time formats.
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
