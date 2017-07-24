# ngCroppie - Angular Croppie Tool

[![Build Status][travis-image]][travis-url]
[![NPM version][npm-image]][npm-url]
[![DevDependencies Status][devdepstat-image]][devdepstat-url]
[![MIT License][license-image]][license-url]

> Angular Croppie Tool is an image cropping and rotating module for AngularJS based on [Croppie.js](https://github.com/Foliotek/Croppie/)<br>
Pure Javascript implementation; Also responsive!

## Dependencies
- [Angular](https://github.com/angular/angular.js)
- [Croppie.js](https://github.com/Foliotek/Croppie/)

## Installation

```sh
# Using bower:
$ bower install ng-croppie

# Using npm:
$ npm install ng-croppie
```

## Basic usage
- Include `ngCroppie` module into your project;
- No dependencies are required in the controller;
- Add `<ng-croppie>` tag with the following arguments:
  - `src` **Image** or **Blob**: path to Image File or Base64;
  - `ng-model` **Base64**: the image output;

####[Demo](http://orif-jr.github.io/ng-croppie/#demo)

## Example
**JS**
```js
function ExampleCtrl(FileSaver, Blob) {
  var vm = this;

  vm.val = {
    text: 'Hey ho lets go!'
  };

  vm.download = function(text) {
    var data = new Blob([text], { type: 'text/plain;charset=utf-8' });
    FileSaver.saveAs(data, 'text.txt');
  };
}

angular
  .module('fileSaverExample', ['ngCroppie'])
  .controller('ExampleCtrl', ['FileSaver', 'Blob', ExampleCtrl]);
```

**HTML**
```html
<ng-croppie   src="inputImage"
              ng-model='outputImage'
              update='onUpdate'
              boundry="{w: 400, h: 400}"
              viewport="{w: 300, h: 300}"
              orientation="true"
              rotation="90"
              type="circle">
</ng-croppie>



<!-- Preview -->
<img ng-src="{{outputImage}}" />
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
1.0.3

### Contributors

- orif-jr
- stasinua
- htao00
- alanheppenstall

### Updates
- added mobile support
- updated dev dependencies
- code refactoring

### License
MIT © [ngCroppie](https://github.com/allenRoyston/ngCroppie)

[travis-url]: https://img.shields.io/travis/allenRoyston/ngCroppie
[travis-image]: https://img.shields.io/travis/allenRoyston/ngCroppie.svg

[npm-url]: https://npmjs.org/package/ng-croppie
[npm-image]: https://img.shields.io/npm/v/ng-croppie.svg

<!-- [![Dependency Status][depstat-image]][depstat-url] -->
[depstat-url]: https://david-dm.org/allenRoyston/ngCroppie
[depstat-image]: https://david-dm.org/allenRoyston/ngCroppie.svg

[devdepstat-url]: https://david-dm.org/allenRoyston/ngCroppie?type=dev
[devdepstat-image]: https://david-dm.org/allenRoyston/ngCroppie/dev-status.svg

[license-image]: http://img.shields.io/badge/license-MIT-blue.svg?style=flat
[license-url]: LICENSE
