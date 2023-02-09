# "Hello, World!" With CooperTS

## What is CooperTS?

CooperTS is a custom expansion of TypeScript we built and use here at ExecOnline. Our original goal in creating it was to provide "no runtime failures while reducing testing burden." This project was set up as a quick window into basic functionality.

You can read more HERE.

## Why do we use it?

In short, writing code in CooperTS allows us to utilize the Typescript compiler to do as much of the work as possible.

Here are some specific reasons why CooperTS is beneficial:

- ### Prevents the occurance of `null` errors

  This is done through the use of the `Maybe<T>` type.

  Nullable values are given the type `Maybe` so the compiler can force us to handle them.

  A value of type `Maybe` will always return either a just() or a nothing().

  See example below:

  ```
  function find<T>(fn: (t: T) => boolean, ts: ReadonlyArray<T>): Maybe<T> {
    for (const t of ts) {
      if (fn(t)) {
        return just(t);
      }
    } return nothing<T>();
  }
  ```

- ### Prevents the need for complicated nested structures

  Through the use of maybes, we no longer need to write complex if/else scenarios to handle certain conditions.

  Code that looks like this:

  ```
  const parent = users.find(({ id }) => id === 1);
  if(parent) {
    const child = users.find(({id}) => id === parent.childId);
    if(child) {
      console.log(`Found child of user #1: ${child.name}!`)
    }
  }
  ```

  could be simplified and written like this:

  ```
  find(({ id }) => id === 1, users)
    .andThen(({ childId }) => find(({ id }) => id === childId, users))
    .map(({ name }) => `Found child of user #1: ${name}!`)
    .do(console.log)
  ```

  Since this is now written in a flat structure, one could find another child by simply adding another `.andThen` rather than introducing another layer of complexity with an `if` statement.

- ### Allows side-effects to work with pure functions

  Side-effects are wrapped with `Task<E, T>`, which is similar to a `promise` in JavaScript.

  Unlike a `promise`, a `Task` will not run until it is forked, meaning a function that calls a `Task` will remain pure.

  This allows us to create and run a `Task` in two separate places, which gives us the ability to build larger tasks from smaller tasks.

  Here's an example of a pure function that returns a side-effectual `Task` object:

  ```
  const setItem = (key: string, value: string): Task<Error, string> =>
    new Task<Error, string>((reject, resolve) => {
      try {
        localStorage.setItem(key, value);
        resolve(value);
      } catch (e) {
        reject(error(errorMessage(e)));
      }
      return noop;
    });
  ```

- ### Verifies types at the edges of our App

  Data coming into the app is run through a `Decoder` file which converts the data into the shape and types that we expect.

  The `Decoder<T>` takes an unknown value and returns a `Result<E, T>` which wraps an object of a guaranteed type, or throws a type error.

  Rather than type-checking external data after it is received, Decoders help us verify data before it is used in our code.

  The code below is an example of a Decoder that takes in data from an organization and assigns the values 'id' and 'name' the types 'number' and 'string' respectively.

  ```
  const organizationDecoder: Decoder<Organization> = succeed({})
    .assign('id', field('id', number))
    .assign('name', field('name', string));
  ```

- ### Ensures that all possible states are handled

  Every instance of the state that can occur in a component is listed in the component's `Store` file.

  These instances are then handled via a `Reactions` file which uses switch statements to return a function based on the current state.

  By handling state using stores and reactions files, we can rely on the compiler to tell us if we forgot to handle one of the states.

## Key Features/Packages

- ### Translations

  The translations package allows for text in your App to be translated into different languages.

  The user provides the strings that need to be translated along with their translations, and inserts them into a translation table.

  This package provides the React components `<T />` and `<L />` to allow text to be translatable and localizeable.

  In this version of our HelloWorld app, these two components are utilized to allow the text "Hello World. It's {currentDate}" to be translated into Spanish, French, and Japanese.

  The `<T />` and `<L />` components are called in `cooperts-app/src/HelloWorld/index.tsx` as shown below:

  ```
  class HelloWorld extends React.Component {
    render() {
      return (
        <div className="hello-world">
          <T kind="Hello World" />
          <br />
          <T
            kind="It's <date/>"
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
  ```

  The text to be translated is then mapped to a localized translations table (see `cooperts-app/public/locales/es/translations.json`) and handled via the main translations file `cooperts-app/src/Translations/index.tsx`.

  To switch the language, you need to manually change the two-letter language code within the index.tsx file in the root directory (cooperts-app/src/index.tsx).

  "en" = English

  "es" = Spanish

  "fr" = French

  "ja" = Japanese

- ### resource

  The resource package is used for handling links.

  The user provides their own list of allowable link rels.

  Then, this package defines types such as `Link`, `Resource<T>`, etc. that permit only those rels

- ### time

  The time package provides types for representing time measurements as a number and the corresponding unit (second, millisecond, etc)

## Setting up

First, clone down the repository. While in the directory of your choice:

```
git clone https://github.com/execonline-inc/CooperTS-Demo.git
cd CooperTS-Demo/hello_world
```

Second, install dependencies:

```
yarn install
```

Finally, start your React server:

```
yarn start
```
