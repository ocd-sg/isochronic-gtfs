const test = require('ava')
const formatRoutes = require('./formatRoutes')

test('format: routes.txt', (t) => {
  const data = [
    {
      id: 'CC',
      directions: [],
      stops: []
    }
  ]
  const expected = [
    {
      route_id: 'CC',
      route_short_name: 'CC',
      route_long_name: '',
      route_type: 1
    }
  ]
  const value = formatRoutes(data)

  t.deepEqual(value, expected)
})
