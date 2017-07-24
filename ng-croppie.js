/*!
 *	 Angular Croppie Tool (ngCroppie)
 *	 An awesome image cropping and rotating module for AngularJS.
 *
 *	 Credits: https://github.com/allenRoyston/ngCroppie/graphs/contributors
 *	 Inspired by Croppie.js https://github.com/Foliotek/Croppie
 *
 *	 Version: 1.0.3
 * 	 License: MIT
 */
(function () {
    'use strict';

    var module = angular.module('ngCroppie', []);

    /**
     * Crops, rotates and zooms the image to this element
     *
     * 20170724  orif-jr - Added mobile support
     * 20170720  orif-jr - Enhanced watchers for src and rotation
     * 20170406  orif-jr - Added modularized code procedure
     */
    module.directive('ngCroppie', ['$timeout', function ($timeout) {
        return {
            restrict: 'AE',
            scope: {
                src: '=',
                rotation: '=',
                viewport: '=',
                boundry: '=',
                type: '@',
                zoom: '@',
                mousezoom: '@',
                zoomslider: '@',
                exif: '@',
                orientation: '@',
                update: '=',
                ngModel: '=',
                mobile: '@'
            },
            link: function (scope, elem, attr) {
                // defaults
                if (scope.viewport == undefined) {
                    scope.viewport = {w: null, h: null};
                }
                if (scope.boundry == undefined) {
                    scope.boundry = {w: null, h: null};
                }

                // catches
                if (scope.mobile === 'true') {
                    scope.viewport.w = 250; scope.viewport.h = 250;
                    scope.boundry.w = 300; scope.boundry.h = 300;
                } else {
                    scope.viewport.w = (scope.viewport.w != undefined) ? scope.viewport.w : 300;
                    scope.viewport.h = (scope.viewport.h != undefined) ? scope.viewport.h : 300;
                    scope.boundry.w = (scope.boundry.w != undefined) ? scope.boundry.w : 400;
                    scope.boundry.h = (scope.boundry.h != undefined) ? scope.boundry.h : 400;
                }

                // viewport cannot be larger than the boundaries
                if (scope.viewport.w > scope.boundry.w) {
                    scope.viewport.w = scope.boundry.w
                }
                if (scope.viewport.h > scope.boundry.h) {
                    scope.viewport.h = scope.boundry.h
                }

                // convert string to Boolean
                var zoom = (scope.zoom === 'true' || typeof scope.zoom == 'undefined'),
                    mouseZoom = (scope.mousezoom === 'true' || typeof scope.mousezoom == 'undefined'),
                    zoomSlider = (scope.zoomslider === 'true' || typeof scope.zoomslider == 'undefined');

                // define options
                var options = {
                    viewport: {
                        width: scope.viewport.w,
                        height: scope.viewport.h,
                        type: scope.type || 'square'
                    },
                    boundary: {
                        width: scope.boundry.w,
                        height: scope.boundry.h
                    },
                    enableZoom: zoom,
                    mouseWheelZoom: mouseZoom,
                    showZoomer: zoomSlider,
                    enableExif: scope.exif,
                    enableOrientation: scope.orientation
                };

                if (scope.update != undefined) {
                    options.update = scope.update;
                }

                // create new croppie and settime for updates
                var c = new Croppie(elem[0], options);
                // get Croppie elements for further calculations
                var croppieBody = angular.element(elem[0])[0];
                var croppieCanvas = angular.element(elem[0].getElementsByClassName('cr-boundary'))[0];

                var intervalID;

                var croppieCanvasRectangle = croppieCanvas.getBoundingClientRect();

                // initialize interval only if action registered within ngCroppie container
                croppieBody.addEventListener('mousedown', function() {
                    intervalID = window.setInterval(function() {
                        c.result('canvas').then(function(img) {
                            scope.$apply(function() {
                                scope.ngModel = img;
                            });
                        });
                    }, 250);
                }, false);

                // check mouseZoom property to avoid needless event listener initialization
                if (mouseZoom) {
                    // separated "wheel" event listener to prevent conflict with Croppie default "wheel" event listener
                    croppieBody.addEventListener('wheel', function(evt) {
                        console.log('Wheel event called');
                        evt.preventDefault();
                        if ((evt.clientX > croppieCanvasRectangle.left) && (evt.clientX < croppieCanvasRectangle.right) && (evt.clientY < croppieCanvasRectangle.bottom) && (evt.clientY > croppieCanvasRectangle.top)) {
                            c.result('canvas').then(function(img) {
                                scope.$apply(function() {
                                    scope.ngModel = img;
                                });
                            });
                        }
                    }, false);
                }

                // destroy all created intervals
                croppieBody.addEventListener('mouseup', function() {
                    clearInterval(intervalID);
                }, false);
                croppieBody.addEventListener('mouseleave', function() {
                    clearInterval(intervalID);
                }, false);
                croppieBody.addEventListener('mouseout', function() {
                    clearInterval(intervalID);
                }, false);

                scope.$on('$destroy', function (event) {
                    clearInterval(intervalID);
                });

                // image rotation
                scope.$watch('rotation', function(newValue, oldValue) {
                    if (scope.orientation === 'false' || scope.orientation == undefined) {
                        throw 'ngCroppie: Cannot rotate without \'orientation\' option';
                    } else {
                        c.rotate(newValue - oldValue);
                        c.result('canvas').then(function(img) {
                            scope.$apply(function () {
                                scope.ngModel = img;
                            });
                        });
                    }
                });

                // respond to changes in src
                scope.$watch('src', function(newValue, oldValue) {
                    if (scope.src != undefined) {
                        c.bind(scope.src);
                        $timeout(function() {  //delayed for ng-file-upload
                            c.result('canvas').then(function(img) {
                                scope.$apply(function () {
                                    scope.ngModel = img;
                                });
                            });
                        }, 250);
                    }
                });
            }
        };
    }]);

}());