import React from 'react'
import ImgsViewer from '../src/ImgsViewer'
import { mount } from 'enzyme'

const props1 = {
  imgs: [
    {
      src: 'https://images.unsplash.com/photo-1526382551041-3c817fc3d478?dpr=2&auto=format&w=1024&h=1024'
    },
    {
      src: 'https://images.unsplash.com/photo-1522985225914-17a10a58c8ec?dpr=2&auto=format&w=1024&h=1024',
      caption: 'Photo by Blake Cheek',
    }
  ]
}
const props2 = {
  imgs: [
    {
      src: 'https://images.unsplash.com/photo-1522931698295-e7b4d3e4188f?dpr=2&auto=format&w=1024&h=1024',
      thumnail: 'https://images.unsplash.com/photo-1522931698295-e7b4d3e4188f?dpr=2&auto=format&crop=faces&fit=crop&w=300&h=300',
    },
    {
      src: 'https://images.unsplash.com/photo-1482398650355-d4c6462afa0e?dpr=2&auto=format&w=1024&h=1024',
      thumnail: 'https://images.unsplash.com/photo-1482398650355-d4c6462afa0e?dpr=2&auto=format&crop=faces&fit=crop&w=240&h=159',
    }
  ]
}
it('renders correctly',  () => {
  const component = mount(
    <ImgsViewer { ...props1 } />
  )
  component.setState({ isOpen: true })
  expect(component).toMatchSnapshot()
})
it('renders with thumbnail correctly',  () => {
  const component = mount(
    <ImgsViewer { ...props2 } />
  )
  component.setState({ isOpen: true })
  expect(component).toMatchSnapshot()
})
it('renders correctly after click',  () => {
  const component = mount(
    <ImgsViewer { ...props2 } />
  )
  component.setState({ isOpen: true })
  setTimeout(() => {
    component.find('figure').first() && component.find('figure').first().simulate('click')
    expect(component).toMatchSnapshot()
  }, 10000)
})
it('unmount',  () => {
  const component = mount(
    <ImgsViewer { ...props2 } />
  )
  component.setState({ isOpen: true })
  component.unmount()
})
