import vm from 'vm'

import _ from 'underscore'
import underscore from '../src/underscore'

const compile = (template, data, settings) => vm.runInNewContext(`(${underscore(template, settings)})(${JSON.stringify(data)})`, {_})

const compare = (template, data, settings) => expect(compile(template, data, settings)).toBe(_.template(template, settings)(data))

test('simple template with default template syntax', () => {
  const template = `<div class="test">Hello <%- msg %></div>`
  compare(template, {msg: 'underscore'})
  compare(template, {msg: '<script>alert("xss")</script>'})
})

test('template with function call inside', () => {
  compare(`<ul>
<% _.each(imgs, function(img, i) { %>
<li>
<img src="<%- img %>.jpg" alt="<%- i %>">
</li>
<% }) %>
</ul>`, {imgs: Array.from({length: 10})})
})

test('change interpolate/escape settings', () => {
  const settings = {
    interpolate: /{{([\s\S]+?)}}/g,
    escape: /{{-([\s\S]+?)}}/
  }

  compare(`mustache {{ msg }}`, {msg: 'is great'}, settings)
  compare(`mustache {{- msg }}`, {msg: '<script>alert("is great")</script>'}, settings)
})
