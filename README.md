# react-images-viewer

[![Build Status](https://travis-ci.org/guonanci/react-images-viewer.svg?branch=master)](https://travis-ci.org/guonanci/react-images-viewer)
[![Coverage Status](https://coveralls.io/repos/github/guonanci/react-images-viewer/badge.svg?branch=master)](https://coveralls.io/github/guonanci/react-images-viewer?branch=master)

A react library that view photos list easily, and a simple, responsive viewer component for displaying an array of images

[中文文档](./README_CN.md)

## Quick start

```bash
# recommended
yarn add react-images-viewer
```

or

```bash
npm install react-images-viewer --save
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
        isOpen={this.state.viewerIsOpen}
        onClickPrev={this.gotoPrevious}
        onClickNext={this.gotoNext}
        onClose={this.closeViewer}
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
<ImgsViewer
  imgs={IMG_SET}
  ...
/>
```

```js
const IMG_SET = [
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
backdropCloseable | bool | false | Allow users to exit the viewer by clicking the backdrop
closeBtnTitle | str | '关闭（空格键）' | Customize close esc title
enableKeyboardInput | bool | true | Supports keyboard input - <code>space, esc</code>, <code> arrow left, arrow up</code>, and <code>arrow right, arrow down</code>
currImg | num | 0 | The index of the image to display initially
customCtrls | arr | undefined | An array of elements to display as custom controls on the top of viewer
imgs | arr | undefined | Required. Array of image objects, See img opts table below
imgCountSeparator | str | ' / ' | Customize separator in the image count
isOpen | bool | false | Whether or not the viewer is displayed leftArrowTitle | str | '上一张（左箭头）' | Customize of left arrow title
onClickPrev | func | undefined | Fired on request of the previous image
onClickNext | func | undefined | Fired on request of the next image
onClose | func | undefined | Handle closing of the viewer
onClickImg | func | undefined | Handle click on current image
onClickThumbnail | func | undefined | Handle click on thumbnail
preloadNextImg | bool | true | Whether to preload the next available image
rightArrowTitle | str | '下一张（右箭头）' | Customize right arrow title
showCloseBtn | bool | true | Optionally display a close 'X' button in top right corner
showImgCount | bool | true | Optionally display image index, e.g., "2 of 20"
width | number | 1024 | Maximum width of the carousel; defaults to 1024px
spinner | func | DefaultSpinner | Spinner component class
spinnerColor | str | '#fff' | Color of spinner
spinnnerSize | num | 100 | Size of spinner
preventAutoScroll | bool | true | Determines whether auto-scrolling is prevented

## Imgs Object

Property      | Type     | Default      | Description
:----------|:----------|:----------|:----------
src     | str     | undefined     | Required
srcSet      | arr of str      | undefined     | Optional
caption     | str     | undefined     | Optional
alt     | str     | undefined     | Optional
