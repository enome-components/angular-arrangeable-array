
# angular-arrangeable-array

  Edit the order and remove items from an array.

## Example

Check index.html or http://plnkr.co/UNdUUg

## Installation

  Install with [component(1)](http://component.io):

    $ component install enome-components/angular-arrangeable-array

## API

```js
require('angular-arrangeable-array');

var app = window.angular.module('my-app', [ 'arrangeable-array' ]);

app.controller('Ctrl', function ($scope) {
  $scope.items = [ '/first', '/second', '/third', '/fourth' ];

  $scope.$watch('items', function () {
    console.log($scope.items);
  }, true);
});
```

```html
<body ng-app='my-app' ng-controller='Ctrl'>
  <arrangeable-array array='items'></arrangeable-array>
</body>
```

## License

  MIT
