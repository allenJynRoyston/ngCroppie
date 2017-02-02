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
                //Get Croppie elements for further calculations
                var croppieBody = angular.element(document.getElementsByTagName('ng-croppie'))[0];
                var croppieCanvas = angular.element(document.getElementsByClassName('cr-boundary'))[0];

                var intervalID;

                var croppieCanvasRectangle = croppieCanvas.getBoundingClientRect();

                //Initialize interval only if action regitered within ngCroppie container
                croppieBody.addEventListener("mousedown", function () {
                  intervalID = window.setInterval(function(){
                    c.result('canvas').then(function(img){
                      scope.$apply(function(){
                        scope.ngModel = img
                      })
                    })
                  }, 250);
                }, false);

                //Check mouseZoom property to avoid needless event listener initialization
                if (mouseZoom) {
                  //Separated "wheel" event listener to prevent conflict with Croppie default "wheel" event listener
                  croppieBody.addEventListener("wheel", function (evt) {
                    console.log("Wheel event called");
                    evt.preventDefault();
                    if ((evt.clientX > croppieCanvasRectangle.left) && (evt.clientX < croppieCanvasRectangle.right) && (evt.clientY < croppieCanvasRectangle.bottom) && (evt.clientY > croppieCanvasRectangle.top)) {
                      c.result('canvas').then(function(img){
                        scope.$apply(function(){
                          scope.ngModel = img
                        })
                      });
                    }
                  }, false);
                }

                // Destroy all created intervals
                croppieBody.addEventListener("mouseup", function () {
                  clearInterval(intervalID);
                }, false);
                croppieBody.addEventListener("mouseleave", function () {
                  clearInterval(intervalID);
                }, false);
                croppieBody.addEventListener("mouseout", function () {
                  clearInterval(intervalID);
                }, false);

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
