var module = window.angular.module('arrangeable-array', []);

module.run(function ($templateCache) {
  $templateCache.put('template.html', require('./template'));
});

module.directive('arrangeableArray', function () {

  return {

    restrict: 'E',
    scope: { array: '=' },
    templateUrl: 'template.html',
    replace: true,
    link: function ($scope, root, attrs) {

      // Only target elements with a certain class
      
      var select = function (clss, cb) {

        return function (e) {
          if (e.target.classList.contains(clss)) {
            cb.call(this, e);
          }
        };

      };

      var resetExpand = function () {
        var expanded_dropareas = document.querySelector('.expand');

        if (expanded_dropareas) {
          expanded_dropareas.classList.remove('expand');
        }
      };

      // Events

      root.bind('dragstart', select('row', function (e) {
        e.target.classList.add('dragging');
        e.dataTransfer.setData('text/plain', 'This text may be dragged');
        e.dataTransfer.setDragImage(document.querySelector('.block'), 0, 0);
        setTimeout(function () {
          e.target.style.display = 'none';
        });
      }));

      root.bind('dragend', select('row', function (e) {
        e.target.classList.remove('dragging');
        e.target.style.background = 'white';
        e.target.style.display = 'block';
        resetExpand();
      }));

      root.bind('dragenter', select('droparea', function (e) {
        resetExpand();
        e.target.classList.add('expand');
      }));

      /*
      root.bind('dragleave', select('droparea', function (e) {
        e.target.classList.remove('expand');
      }));
      */
      
    },

    controller: function ($scope) {

      $scope.remove = function (item) {
        $scope.array.splice($scope.array.indexOf(item), 1);
      };

    }

  };

});
