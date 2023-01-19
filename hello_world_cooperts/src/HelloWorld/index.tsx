import * as React from "react";
import { L, T } from "../Translations";
import "./HelloWorld.css";

class HelloWorld extends React.Component {
  render() {
    return (
      //The T (Translation) component takes in a 'kind' prop as a string, and makes the string translatable when paired with a valid translation file.
      //See cooperts-app/public/locales for examples
      <div className="hello-world">
        <T kind="Hello World" />
        <br />

        {/* Similar to above, this T component interpolates the date allowing it to be dynamic, and creates a new React element, in this case the L component */}
        <T
          kind="It's <date/>"
          //L (Localization) tags are a tool built into our CooperTS translation solution. They’re a way to allow translations across different date/time formats.
          date={
            <span>
              <L localizeable={new Date()} format="short-month-day-year" />
            </span>
          }
        />
      </div>
    );
  }
}

export default HelloWorld;
