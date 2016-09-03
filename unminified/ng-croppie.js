/*************************
 * acrCroppie
 * Allen Royston
 * Version: 1.0.0
 * Updated 4/12/2016
 *************************/
angular.module('ngCroppie', []).directive('ngCroppie', [
  function ($compile) {
    return {
        restrict: 'AE',
        scope:{
          src: '=',
          viewport: '=',
          boundry: '=',
          type: '@',
          zoom: '@',
          mousezoom: '@',
          update: '=',
          ngModel: '='
        },
        link: function(scope, elem, attr) {

                // defaults
                if(scope.viewport == undefined){
                  scope.viewport = {w: null, h: null}
                }

                if(scope.boundry == undefined){
                  scope.boundry = {w: null, h: null}
                }

                // catches
                scope.viewport.w = (scope.viewport.w != undefined) ? scope.viewport.w : 300;
                scope.viewport.h = (scope.viewport.h != undefined) ? scope.viewport.h : 300;
                scope.boundry.w = (scope.boundry.w != undefined) ? scope.boundry.w : 400;
                scope.boundry.h = (scope.boundry.h != undefined) ? scope.boundry.h : 400;

                // viewport cannot be larger than the boundaries
                if(scope.viewport.w > scope.boundry.w){ scope.viewport.w = scope.boundry.w }
                if(scope.viewport.h > scope.boundry.h){ scope.viewport.h = scope.boundry.h }

                // convert string to Boolean
                var zoom = (scope.zoom === "true"),
                    mouseZoom = (scope.mousezoom === "true");

                // define options
                var options =  {
                    viewport: {
                      width: scope.viewport.w,
                      height: scope.viewport.h,
                      type: scope.type || 'square'
                    },
                    boundary: {
                      width: scope.boundry.w,
                      height: scope.boundry.h
                    },
                    showZoom: zoom,
                    mouseWheelZoom: mouseZoom,
                }

                if (scope.update != undefined){
                  options.update = scope.update
                }

                // create new croppie and settime for updates
                var c = new Croppie(elem[0], options);
                var intervalID = window.setInterval(function(){
                  c.result('canvas').then(function(img){
                    scope.$apply(function(){
                      scope.ngModel = img
                    })
                  })
                }, 250);

                scope.$on("$destroy",
                    function( event ) {
                        clearInterval(intervalID);
                    }
                );

                // respond to changes in src
                scope.$watch('src', function(newValue, oldValue) {
                    if(scope.src != undefined){
                          c.bind(scope.src);
                          c.result('canvas').then(function(img){
                            scope.$apply(function(){
                              scope.ngModel = img
                            })
                          })
                    }
              })


        }

    };
  }
]);
