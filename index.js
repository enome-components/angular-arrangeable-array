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
      
      var current;
      var current_drop;
      
      $scope.dragStart = function (e) {

        current = e;
        current.offsetY = e.pageY - current.target.offsetTop; // FF doesn't support offsetY
        
        // Prevent selection
        document.onmousedown = function () { return false; };

        // On drop
        document.onmouseup = function () {
          if (current) {
            current.target.style.zIndex = 0;
            current.target.style.position = 'inherit';
            current.target.style.top = 'inherit';
            resetExpand();
            (current = null);
          }
        };

        document.onmousemove = function (e) {

          if (current) {
            current.target.style.position = 'absolute';
            current.target.style.zIndex = 10;
            current.target.style.top = (e.pageY - current.offsetY) + 'px';

            var dropareas = root[0].querySelectorAll('.droparea');

            [].forEach.call(dropareas, function (droparea) {

              var cords = droparea.getBoundingClientRect();

              if (e.pageX >= cords.left && e.pageX <= cords.right && e.pageY >= cords.top && e.pageY <= cords.bottom) {
                resetExpand();
                droparea.classList.add('expand');
              }

            });


          }

        };

      };

      /*
      root.bind('mousemove', function (e) {

        if (current) {
          console.log(e.target, 'over');
          //resetExpand();
          //e.target.classList.add('expand');
        }

      });
      */

      /*
      var drag_el;

      $document.bind('mousemove', select('row', function (e) {

        if (e.which === 1) {
          e.target.style.background = 'red';
          e.target.style.position = 'absolute';
          e.target.style.top = (e.clientY) + 'px';
          e.target.style.left = (e.clientX) + 'px';
          e.stopPropagation();
          e.preventDefault();
          return false;
        }

      }));
      */

      /*
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
