# react-images-viewer

[![Build Status](https://travis-ci.org/guonanci/react-images-viewer.svg?branch=master)](https://travis-ci.org/guonanci/react-images-viewer)
[![Coverage Status](https://coveralls.io/repos/github/guonanci/react-images-viewer/badge.svg?branch=master)](https://coveralls.io/github/guonanci/react-images-viewer?branch=master)

一个简单易用，响应式，放大并查看一组图片的 React 库。

[English document](./README.md)

## 快速入门

```bash
# 推荐
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
        currImg={this.state.currImg}
        isOpen={this.state.viewerIsOpen}
        onClickPrev={this.gotoPrevious}
        onClickNext={this.gotoNext}
        onClose={this.closeViewer}
      />
    )
  }
}
```

## 例子

线上案例: [guonanci.github.io/react-images-viewer](https://guonanci.github.io/react-images-viewer)

```bash
#yarn install
yarn
yarn start
```

然后就可以在浏览器打开 [`localhost:8000`](http://localhost:8000) 窗口了。

### srcSet使用

例子:

```jsx
<Lightbox
  imgs={IMG_SET}
  ...
>
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

## 选项

Property      | Type      | Default     | Description
:-----------|:------------|:-------------|:-------------
backdropCloseable | 布尔值 | false | 是否通过点击半透明幕布来退出浏览
closeBtnTitle | 字符串 | '关闭（空格键）' | 关闭按钮的 title
enableKeyboardInput | 布尔值 | true | 支持键盘输入 - <code>空格键，esc</code>, <code>左箭头，上箭头</code>，和<code>右箭头，下箭头</code>
currImg | 数值类型 | 0 | 必须项（如果需要导航的话），初始化图像的索引
customCtrls | 数组 | undefined | 图片查看器顶部的控件元素数组
imgs | 数组 | undefined | 必须项. 图片元素数组，图像选项见下表。
imgsSeparator | 字符串 | ' / ' | 图片计数分隔符
isOpen | 布尔值 | false | 必须项（如果需要导航的话），图片是否显示
leftArrowTitle | 字符串 | '上一张（左箭头）' | 左箭头的 title
onClickPrev | 函数 | undefined | 必须项（如果需要导航的话），请求上一张时触发
onClickNext | 函数 | undefined | 必须项（如果需要导航的话），请求下一张时触发
onClose | 函数 | undefined | 关闭查看器的回调
onClickImg | 函数 | undefined | 点起当前图片的回调
onClickThumbnail | 函数 | undefined | 缩略点击的回调
preloadNextImg | 布尔值 | true | 是否预加载下一张图片
rightArrowTitle | 字符串 | '下一张（右箭头）' | 右箭头的 title
showCloseBtn | 布尔值 | true | 右上角是否显示 X 按钮
showImgCount | 布尔值 | true | 是否显示图片索引
width | 数值类型 | 1024| 轮播器的最大的宽度，默认值1024px
spinner | 函数 | DefaultSpinner | 加载器组件
spinnerColor | 字符串 | 'white' | 加载器颜色
spinnnerSize | 数值类型 | 80 | 加载器尺寸
preventAutoScroll | 布尔值 | true | 是否阻止自动滚动

## Imgs Object

Property      | Type     | Default      | Description
:----------|:----------|:----------|:----------
src     | 字符串     | undefined     | 必须项
srcSet      | 字符串数组     | undefined     | 可选项
caption     | 字符串     | undefined     | 可选项
alt     | 字符串     | undefined     | 可选项
