# ng-croppie
What Am I?!

I'm an awesome AngularJS module for the even more awesome Croppie.js.
Pure Javascript implementation; no dependencies needed! Also responsive!

## Live Demo

[Check it out](https://allenroyston.herokuapp.com/access/acr-croppie/)

## Install
NPM: `npm install ng-croppie`

Bower: `bower install ngCroppie`

Download: [ng-croppie.js](unminified/ng-croppie.js) and [ng-croppie.css](unminified/ng-croppie.css)

## Ensure you link it correctly in your HTML<br>
```
<script src="path/to/ng-croppie.min.js"></script>
<link rel='stylesheet' type="text/css" href="path/to/ng-croppie.min.css"></link>
```
<!--
## CDN
cdnjs.com provides croppie via cdn https://cdnjs.com/libraries/ng-croppie
```
https://cdnjs.cloudflare.com/ajax/libs/ng-croppie/{version}/ng-croppie.min.css
https://cdnjs.cloudflare.com/ajax/libs/ng-croppie/{version}/ng-croppie.min.js
```
-->

And add it as a module for your app:<br>
```
var app = angular.module('myApp', ['ngCroppie']);
```


Nothing is required in the controller. For sake of clarity, these are the variables you'll see in the demo.<br>
```
    app.controller('basicController', ['$scope', function($scope) {

            $scope.inputImage = null;
            $scope.outputImage = null;
            $scope.onUpdate = function(data) {
                //console.log(data)
            }
    }]);
```


Now, just add it to your HTML.<br>
```
<!-- Bare minimum -->
<ng-croppie   src="inputImage"
              ng-model='outputImage'>
</ng-croppie>



<!-- With options -->
<ng-croppie   src="inputImage"
              ng-model='outputImage'
              update='onUpdate'
              boundry="{w: 400, h: 400}"
              viewport="{w: 300, h: 300}"
              enableOrientation="true"
              rotation="90" 
              type="circle">
</ng-croppie>



<!-- Preview -->
<img  ng-src="{{outputImage}}" />
```


## Parameters
```
src: [path/to/image.js] OR base64. 
ng-model: The image output. Returns are a base64. 
update: [function] place a functon in the controller to run whenever changes are made to the image. 
boundry: [object] {w: __, h: __}. This will create the size of the container that will host the Croppie tool. Not required, but will default to 300x300. 
viewport: [object] {w: __, h: __}. This will create your output size. Must be smaller than the boundry or it will equal it. Defaults to 200x200. 
zoom: [Boolean] Set to true by default, which shows the zoom slider. Not required; defaults to true.
mousezoom: [Boolean] Enables to use the mouse scroll bar to zoom in/out. Works with 'zoom' true; defaults to true.
zoomslider: [Boolean] Hide or Show the zoom slider only (scrolling and pinching zoom still possible if set to false). Works with 'zoom' true; defaults to true.
exif: [Boolean] with exif orientation compatability. Not required; defaults to undefined.
orientation: [Boolean] Support for specifying a custom orientation when binding images. Not required; defaults to false.
rotation: [Integer] Rotate the image by a specified degree amount. Only works with 'orientation' true. Not required; Valid values: 90, 180, 270, -90, -180, -270
type: [String] Can either be "circle" or "square". Not required; defaults to "square". 
```

## Version
1.0.1

### Contributors

- orif-jr
- stasinua
- htao00
- alanheppenstall

### Contributors
- orif-jr
- stasinua
- htao00
- alanheppenstall

### Updates
- updated with Croppie 2.4.0, rotation features 
- added orientation
- added rotation

### Dependencies
None, just Angular 1.4+


### License
MIT - go nuts y'all.
