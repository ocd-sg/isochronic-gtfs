const fs = require('fs')
const { resolve } = require('path')
const test = require('ava')
const parseStops = require('./parseStops')

const data = fs.readFileSync(resolve(__dirname, '__tests__/stops.html'), 'utf8')

test('parse train stops', (t) => {
  const expected = {
    name: 'Dhoby Ghaut',
    id: 10,
    codes: ['NS24', 'NE6', 'CC1']
  }
  const values = parseStops(data)
  const value = values.find(({ id }) => id === expected.id)

  t.deepEqual(value, expected)
})
