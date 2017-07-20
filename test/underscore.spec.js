import vm from 'vm'

import _ from 'underscore'
import {underscore} from '../dist/precompiler.esm.js'

const compile = (template, data) => vm.runInNewContext(`(${underscore(template)})(${JSON.stringify(data)})`)

test('compile underscore default tempalte', () => {
  const template = `<div class="test">Hello <%= msg %></div>`
  const data = {msg: 'underscore'}
  expect(compile(template, data)).toBe(_.template(template)(data))
})
