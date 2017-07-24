# ngCroppie - Angular Croppie Tool

[![Build Status][travis-image]][travis-url]
[![NPM version][npm-image]][npm-url]
[![Dependency Status][depstat-image]][depstat-url]
[![NPM Montly Downloads][npm-downloads-image]][npm-downloads-url]
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

#### [Demo](http://orif-jr.github.io/ng-croppie/#demo)

## Example
**JS**
```js
function ExampleCtrl() {
  var vm = this;

  vm.inputImage = null;
  vm.outputImage = null;

  vm.onUpdate = function(data) {
    //console.log(data);
  };
}

angular
  .module('exampleModule', ['ngCroppie'])
  .controller('ExampleCtrl', [ExampleCtrl]);
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
- **Image** or **Blob** `data`: path to image file or base64;
- **Base64** `ng-model`: the image output, returns are a base64;
- **Function** `update`: place a functon in the controller to run whenever changes are made to the image;
- **Object** `boundry { w: __, h: __ }`: (optional) the size of the container that will host the croppie tool - defaults to 400x400;
- **Object** `viewport { w: __, h: __ }`: (optional) the output size, must be smaller than the boundry or it will equal it - defaults to 300x300;
- **Boolean** `zoom`: (optional) enable zoom slider - defaults to true;
- **Boolean** `mousezoom`: enable mouse scroll bar to zoom in/out. Works with `zoom` - defaults to true;
- **Boolean** `zoomslider`: enable zoom slider only (scrolling and pinching zoom still possible if set to false), works with `zoom` - defaults to true;
- **Boolean** `exif`: (optional) enable exif orientation compatability - defaults to undefined;
- **Boolean** `orientation`: (optional) enable custom orientation support when binding images - defaults to false.
- **Integer** `rotation`: rotate the image by a specified degree amount, works with `orientation` - valid values: 90, 180, 270, -90, -180, -270;
- **String** `type`: (optional) can either be 'circle' or 'square' - defaults to 'square';
- **Boolean** `mobile`: (optional) enable mobile view - defaults to viewport: 250x250 and boundry: 300x300;

## Version
1.0.3

### Contributors

- orif-jr
- stasinua
- htao00
- alanheppenstall

### Updates
- added mobile support
- updated dependencies
- code refactoring

### License
MIT © [ngCroppie](https://github.com/allenRoyston/ngCroppie)

[travis-url]: https://img.shields.io/travis/allenRoyston/ngCroppie
[travis-image]: https://img.shields.io/travis/allenRoyston/ngCroppie.svg

[npm-url]: https://npmjs.org/package/ng-croppie
[npm-image]: https://img.shields.io/npm/v/ng-croppie.svg

<!--
from david-dm
[depstat-url]: https://david-dm.org/allenRoyston/ngCroppie
[depstat-image]: https://david-dm.org/allenRoyston/ngCroppie.svg
-->
[depstat-url]: https://gemnasium.com/github.com/allenRoyston/ngCroppie
[depstat-image]: https://gemnasium.com/badges/github.com/allenRoyston/ngCroppie.svg
<!--
[![DevDependencies Status][devdepstat-image]][devdepstat-url]
[devdepstat-url]: https://david-dm.org/allenRoyston/ngCroppie?type=dev
[devdepstat-image]: https://david-dm.org/allenRoyston/ngCroppie/dev-status.svg
-->
[npm-downloads-url]: https://www.npmjs.com/package/ng-croppie
[npm-downloads-image]: https://img.shields.io/npm/dm/ng-croppie.svg

[license-image]: https://img.shields.io/badge/license-MIT-blue.svg
[license-url]: LICENSE
