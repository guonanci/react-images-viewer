import React from 'react'
import Standard from './components/Standard'

const imgs = [
  'https://pixabay.com/zh/%E7%81%AF-%E5%85%89-%E7%85%A7%E6%98%8E-%E7%81%AF%E6%B3%A1-%E7%88%B1%E8%BF%AA%E7%94%9F%E7%9A%84%E7%81%AF%E6%B3%A1-edisson-%E9%A2%86%E5%AF%BC-%E6%8A%80%E6%9C%AF-3489395/',
  'https://pixabay.com/zh/%E9%85%8D%E5%90%88-%E8%9D%B4%E8%9D%B6-%E6%80%A7%E8%B4%A8-%E6%98%86%E8%99%AB-%E5%85%B3%E9%97%AD-%E5%A4%8F%E5%AD%A3-%E7%BF%BC-%E5%8A%A8%E7%89%A9%E4%B8%96%E7%95%8C-3495224/',
  'https://pixabay.com/zh/%E7%8B%97-%E9%9B%AA-%E5%9C%A3%E4%BC%AF%E7%BA%B3%E5%BE%B7%E7%8B%97-%E5%86%AC%E5%A4%A9-%E5%AE%A0%E7%89%A9-%E5%8A%A8%E7%89%A9-%E6%AF%9B%E7%9A%AE-%E5%86%B7-1168663/',
  'https://pixabay.com/zh/%E5%A4%8F%E5%B0%94-%E9%A9%AC-%E7%99%BD%E9%A9%AC-%E8%8D%89%E6%A1%88-%E7%99%BD%E8%89%B2%E7%9A%84%E8%A3%99%E5%AD%90-%E6%97%A5%E8%90%BD-%E5%A5%B3%E5%AD%A9%E5%92%8C%E9%A9%AC-%E5%8F%8B%E8%B0%8A-3481756/',
  'https://pixabay.com/zh/%E6%A8%B1%E6%A1%83-%E6%B0%B4%E6%9E%9C-%E6%B5%86%E6%9E%9C-%E7%BA%A2%E8%89%B2-%E5%85%B3%E4%BA%8E-%E6%96%B0%E9%B2%9C-%E5%85%B3%E9%97%AD-%E7%BE%8E%E5%91%B3-%E6%88%90%E7%86%9F-%E5%A4%8F%E5%AD%A3-3477927/'
]

React.render(
  <div>
    <Standard imgs={imgs} />
  </div>,
  document.getElementById('example')
)
