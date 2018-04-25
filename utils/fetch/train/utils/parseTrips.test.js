const fs = require('fs')
const { resolve } = require('path')
const test = require('ava')
const parseTrips = require('./parseTrips')

const data = fs.readFileSync(resolve(__dirname, '__tests__/trips.html'), 'utf8')

test('parse train times', (t) => {
  const expected = {
    arrivals: [
      {
        type: 'LAST_TRAIN',
        day: 'WEEKDAYS',
        terminal: 'HarbourFront',
        time: '2328'
      },
      {
        type: 'LAST_TRAIN',
        day: 'SATURDAYS',
        terminal: 'HarbourFront',
        time: '2328'
      },
      {
        type: 'LAST_TRAIN',
        day: 'SUNDAYS_PH',
        terminal: 'HarbourFront',
        time: '2328'
      },
      {
        type: 'FIRST_TRAIN',
        day: 'WEEKDAYS',
        terminal: 'HarbourFront',
        time: '0542'
      },
      {
        type: 'FIRST_TRAIN',
        day: 'SATURDAYS',
        terminal: 'HarbourFront',
        time: '0542'
      },
      {
        type: 'FIRST_TRAIN',
        day: 'SUNDAYS_PH',
        terminal: 'HarbourFront',
        time: '0603'
      }
    ],
    frequencies: [
      {
        type: 'PEAK',
        day: 'WEEKDAYS',
        terminal: 'HarbourFront',
        frequency: 3
      },
      {
        type: 'OFF-PEAK',
        day: 'WEEKDAYS',
        terminal: 'HarbourFront',
        frequency: 4.5
      },
      {
        type: 'PEAK',
        day: 'SATURDAYS',
        terminal: 'HarbourFront',
        frequency: 3.75
      },
      {
        type: 'OFF-PEAK',
        day: 'SATURDAYS',
        terminal: 'HarbourFront',
        frequency: 4.25
      },
      {
        type: 'OFF-PEAK',
        day: 'SUNDAYS_PH',
        terminal: 'HarbourFront',
        frequency: 4.25
      }
    ],
    peaks: [
      {
        day: 'WEEKDAYS',
        time: [
          '0730',
          '0930'
        ]
      },
      {
        day: 'WEEKDAYS',
        time: [
          '1730',
          '1930'
        ]
      }
    ]
  }
  const value = parseTrips(data)

  t.deepEqual(value, expected)
})
