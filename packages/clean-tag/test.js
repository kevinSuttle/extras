import test from 'ava'
import React from 'react'
import { create as render } from 'react-test-renderer'
import tag from './index'

test('renders', t => {
  const json = render(React.createElement(tag)).toJSON()
  t.is(json.type, 'div')
  t.snapshot(json)
})

test('omits props', t => {
  const json = render(React.createElement(tag, {
    id: 'hello',
    theme: {},
    m: 2,
    px: 3,
    color: 'blue'
  })).toJSON()
  t.is(json.props.m, undefined)
  t.is(json.props.px, undefined)
  t.is(json.props.blue, undefined)
  t.is(json.props.theme, undefined)
  t.is(json.props.id, 'hello')
})

test('exports html tags', t => {
  const h1 = render(React.createElement(tag.h1)).toJSON()
  const header = render(React.createElement(tag.header)).toJSON()
  t.is(h1.type, 'h1')
  t.is(header.type, 'header')
})

test('exported html tags only omits props', t => {
  const json = render(React.createElement(tag.h1, {
    id: 'hello',
    m: 2,
    px: 3,
    color: 'blue'
  })).toJSON()
  t.is(json.props.m, undefined)
  t.is(json.props.px, undefined)
  t.is(json.props.blue, undefined)
  t.is(json.props.id, 'hello')
})

test('accepts an is prop to change the underlying element', t => {
  const json = render(React.createElement(tag, {
    is: 'header'
  })).toJSON()
  t.is(json.type, 'header')
})

test('accepts custom omitProps', t => {
  const json = render(React.createElement(tag, {
    hello: 'hi',
    omitProps: [ 'hello' ]
  })).toJSON()
  t.is(json.props.hello, undefined)
})

test('forwards ref', t => {
  let ref = 'hi'
  const json = render(
    React.createElement(tag, {
      ref: r => ref = r
    })
  ).toJSON()
  t.not(ref, 'hi')
})
