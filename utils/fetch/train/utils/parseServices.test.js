const test = require('ava')
const parseServices = require('./parseServices')
const stops = require('./__tests__/stops.json')

test('parse train services', (t) => {
  const lines = [
    {
      id: 'CG',
      stops: ['EW4', 'CG1', 'CG2']
    }
  ]
  const expected = ['Tanah Merah', 'Expo', 'Changi Airport']
  const values = parseServices(lines)(stops)
  const value = values[0].stops.map(({ name }) => name)

  t.deepEqual(value, expected)
})

test('parse train services: missing stops', (t) => {
  const lines = [
    {
      id: 'CG',
      stops: ['SOME', 'EW4', 'STATIONS', 'CG1', 'MISSING', 'CG2']
    }
  ]
  const expected = ['Tanah Merah', 'Expo', 'Changi Airport']
  const values = parseServices(lines)(stops)
  const value = values[0].stops.map(({ name }) => name)

  t.deepEqual(value, expected)
})

test('parse train services: directions', (t) => {
  const lines = [
    {
      id: 'CG',
      stops: ['EW4', 'CG1', 'CG2']
    }
  ]
  const expected = [
    ['Tanah Merah', 'Expo', 'Changi Airport'],
    ['Changi Airport', 'Expo', 'Tanah Merah']
  ]
  const values = parseServices(lines)(stops)
  const value = values[0].directions
    .map((direction) =>
      direction.stops.map(({ name }) => name)
    )

  t.deepEqual(value, expected)
})
