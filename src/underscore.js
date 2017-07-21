import _ from 'underscore'

export default (source, settings) => _.template(source, settings).source
