# ng-base

This project is just a dead simple angular
node tools ready for development. It includes:

- angular/decorators

  [Decorators](#decorators) for declaring components using es6 classes. 

  All components are declared at `src/index.js`

  A component like `n-app` would include these:

    - `n-app.js`

       The component implementation file.

    - `n-app.html`

        Optional template. Unless specified via the `template` or `templateUrl` options for `@component`.

    - `n-app.scss`

        Optional styles for this component.

- sass

  All `.scss` get compiled into `.css`

- es6

  Compiles `src/*.js` using babel.

- webpack

  Creates js/css bundles for optimized asset delivery.

- watch

  Just edit and files get automatically recompiled.

- browsersync

  Reloads connected browsers when new bundle is built.


## prerequisites

- `npm install`

## development
`npm run dev`

## Decorators

```javascript
@module('n')
@component('n-app')
@inject('$scope')
class AppComponent {
  constructor($scope) {
    // ...
  }
}
```

- `@module`

  Defines the unleraying component as part of the specified module.

  You can create the module immediatly by using providing module dependencies: `@module('n', [])`.

- `@inject`

   Decorates the component with its arguments as the `$inject` property.

- `@component`

   Declares the tag name used for this component.
   Note that the name is dashed instead of camel cased.


   Options: Any [directive](https://docs.angularjs.org/guide/directive) options.

   As a convention the `n-app` component will have
   its template in the file `n-app/n-app.html`.
   Unless the `template` or `templateUrl` options are given.

   Additionally a `view` option can override the default path under `components` to look for the
   template. This can be used for example to
   define nested components like:

   ```javascript
   @module('n')
   @component('n-app-toolbar', {
     view: 'n-app/toolbar'
   })
   class AppToolbarComponent {
   }
   ```


## resources

- [angular 1.4](http://angularjs.org)
- [angular/decorators](https://github.com/victorborja/ng-base/blob/master/src/angular/decorators.js)
