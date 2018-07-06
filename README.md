# react-images-viewer

[![Build Status](https://travis-ci.org/guonanci/react-images-viewer.svg?branch=master)](https://travis-ci.org/guonanci/react-images-viewer)
[![Coverage Status](https://coveralls.io/repos/github/guonanci/react-images-viewer/badge.svg?branch=master)](https://coveralls.io/github/guonanci/react-images-viewer?branch=master)

A react library that view photos list easily, and a simple, responsive lightbox component for display an array of images


## Quick start

```bash
npm install react-images-viewer --save
```
or
```bash
# recommended
yarn add react-images-viewer
```

```jsx
import React from 'react'
import ImgsViewer from 'react-images-viewer'

export default class Demo extends React.Component {
  render() {
    return (
      <ImgsViewer
        imgs={[{ src: 'http://example.com/img1.jpg' }, { src: 'http://example.com/img2.png' }]}
        closeBtnTitle='关闭'
        isOpen={this.state.lightIsOpen}
        onClickPrev={this.gotoPrevious}
        onClickNext={this.gotoNext}
        onClose={this.closeLightbox}
      />
    )
  }
}
```

## Demo & Example

Live Demo: [guonanci.github.io/react-images-viewer](https://guonanci.github.io/react-images-viewer)

```bash
#yarn install
yarn
yarn start
```

Then open [`localhost:8000`](http://localhost:8000) in a browser.

### Using srcSet

Example using srcSet:

```jsx
<Lightbox
  imgs={LIGHTBOX_IMG_SET}
  ...
>
```

```js
const LIGHTBOX_IMG_SET = [
  {
    src: 'http://example.com/img1.svg',
    caption: 'A forest',
    srcSet: [
      'http://example.com/img1_1024.jpg 1024w',
      'http://example.com/img1_800.jpg 800w',
      'http://example.com/img1_500.jpg 500w',
      'http://example.com/img1_320.jpg 320w'
    ]
  },
  {
    src: 'http://example.com/img2.svg',
    caption: 'A forest',
    srcSet: [
      'http://example.com/img2_1024.jpg 1024w',
      'http://example.com/img2_800.jpg 800w',
      'http://example.com/img2_500.jpg 500w',
      'http://example.com/img2_320.jpg 320w'
    ]
  }
]
```

## Options

Property      | Type      | Default     | Description
:-----------|:------------|:-------------|:-------------
backdropCloseable | bool | false | Allow users to exit the lightbox by clicking the backdrop
closeBtnTitle | str | ' Close(Esc) ' | Customize close esc title
enableKeyboardInput | bool | true | Supports keyboard input - <code>esc</code>, <code>arrow left</code>, and <code>arrow right</code>
initialIdx | num | 0 | The index of the image to display initially
customCtrls | arr | undefined | An arr of elements to display as custom controls on the top of lightbox
imgs | arr | undefined | Required. Arr of img objs See img opts table below
imgsSeparator | str | ' of ' | Customize separator in the image count
isOpen | bool | false | Whether or not the lightbox is displayed leftArrowTitle | str | ' Previous(left arrow key)' | Customize of left arrow title
onClickPrev | func | undefined | Fired on request of the previous img
onClickNext | func | undefined | Fired on request of the next img
onClose | func | undefined | Handle closing of the lightbox
onClickImg | func | undefined | Handle click on currImg
onClickThumbnail | func | undefined | Handle click on thumbnail
preloadNextImg | bool | true | Preload the next available img whatever direction the user is navigating
rightArrowTitle | str | 'Next(right arrow key)' | Customize right arrow title
showCloseBtn | bool | true | Optionally display a close 'X' btn in top right corner
showImgCount | bool | true | Optionally display img index, e.g., "2 of 20"
width | number | 1024| Maximum width of the carousel; defaults to 1024px spinner | func | DefaultSpinner | Spinner component class
spinnerColor | str | 'white' | Color of spinner
spinnnerSize | num | 80 | Size of spinner
preventAutoScroll | bool | true | Determines whether auto=scrolling is prevented

## Imgs Object

Property      | Type     | Default      | Description
:----------|:----------|:----------|:----------
src     | str     | undefined     | Required
srcSet      | arr of str      | undefined     | Optional
caption     | str     | undefined     | Optional
alt     | str     | undefined     | Optional
