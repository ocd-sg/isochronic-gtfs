const test = require('ava')
const formatFrequencies = require('./formatFrequencies')

test('format: frequencies.txt', (t) => {
  const data = [
    {
      id: 'NS:WD:0',
      terminal: {
        id: 134,
        ref: 'NS28',
        refs: [
          'NS28'
        ],
        name: 'Marina South Pier',
        lat: 1.2717019,
        lon: 103.8627418
      },
      sequence: 0,
      times: {
        arrivals: [
          {
            type: 'LAST_TRAIN',
            day: 'SUNDAYS_PH',
            terminal: 'Marina South Pier',
            time: '2246'
          },
          {
            type: 'LAST_TRAIN',
            day: 'SATURDAYS',
            terminal: 'Marina South Pier',
            time: '2246'
          },
          {
            type: 'LAST_TRAIN',
            day: 'WEEKDAYS',
            terminal: 'Marina South Pier',
            time: '2246'
          },
          {
            type: 'LAST_TRAIN',
            day: 'WEEKDAYS',
            terminal: 'Marina Bay',
            time: '2253'
          },
          {
            type: 'LAST_TRAIN',
            day: 'SUNDAYS_PH',
            terminal: 'Marina Bay',
            time: '2253'
          },
          {
            type: 'LAST_TRAIN',
            day: 'SATURDAYS',
            terminal: 'Marina Bay',
            time: '2253'
          },
          {
            type: 'LAST_TRAIN',
            day: 'WEEKDAYS',
            terminal: 'Toa Payoh',
            time: '2328'
          },
          {
            type: 'LAST_TRAIN',
            day: 'SUNDAYS_PH',
            terminal: 'Toa Payoh',
            time: '2328'
          },
          {
            type: 'LAST_TRAIN',
            day: 'SATURDAYS',
            terminal: 'Toa Payoh',
            time: '2328'
          },
          {
            type: 'LAST_TRAIN',
            day: 'SUNDAYS_PH',
            terminal: 'Ang Mo Kio',
            time: '0017'
          },
          {
            type: 'LAST_TRAIN',
            day: 'SATURDAYS',
            terminal: 'Ang Mo Kio',
            time: '0017'
          },
          {
            type: 'LAST_TRAIN',
            day: 'WEEKDAYS',
            terminal: 'Ang Mo Kio',
            time: '0017'
          },
          {
            type: 'FIRST_TRAIN',
            day: 'SATURDAYS',
            terminal: 'Marina South Pier',
            time: '0516'
          },
          {
            type: 'FIRST_TRAIN',
            day: 'WEEKDAYS',
            terminal: 'Marina South Pier',
            time: '0516'
          },
          {
            type: 'FIRST_TRAIN',
            day: 'SUNDAYS_PH',
            terminal: 'Marina South Pier',
            time: '0535'
          }
        ],
        frequencies: [
          {
            type: 'PEAK',
            day: 'WEEKDAYS',
            terminal: 'Yishun',
            frequency: 3.5
          },
          {
            type: 'OFF-PEAK',
            day: 'WEEKDAYS',
            terminal: 'Yishun',
            frequency: 5
          },
          {
            type: 'PEAK',
            day: 'SATURDAYS',
            terminal: 'Yishun',
            frequency: 4.5
          },
          {
            type: 'OFF-PEAK',
            day: 'SATURDAYS',
            terminal: 'Yishun',
            frequency: 5
          },
          {
            type: 'OFF-PEAK',
            day: 'SUNDAYS_PH',
            terminal: 'Yishun',
            frequency: 5
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
          },
          {
            day: 'SATURDAYS',
            time: [
              '1200',
              '1400'
            ]
          },
          {
            day: 'SATURDAYS',
            time: [
              '1800',
              '2300'
            ]
          }
        ]
      }
    }
  ]
  const expected = [
    {
      trip_id: 'NS:WD:0',
      start_time: '05:16:00',
      end_time: '07:30:00',
      headway_secs: 300
    },
    {
      trip_id: 'NS:WD:0',
      start_time: '07:30:00',
      end_time: '09:30:00',
      headway_secs: 210
    },
    {
      trip_id: 'NS:WD:0',
      start_time: '09:30:00',
      end_time: '17:30:00',
      headway_secs: 300
    },
    {
      trip_id: 'NS:WD:0',
      start_time: '17:30:00',
      end_time: '19:30:00',
      headway_secs: 210
    },
    {
      trip_id: 'NS:WD:0',
      start_time: '19:30:00',
      end_time: '22:46:00',
      headway_secs: 300
    }
  ]
  const value = formatFrequencies(data)

  t.deepEqual(value, expected)
})

test('format: frequencies.txt, no peaks', (t) => {
  const data = [
    {
      id: 'NS:WD:0',
      terminal: {
        id: 134,
        ref: 'NS28',
        refs: [
          'NS28'
        ],
        name: 'Marina South Pier',
        lat: 1.2717019,
        lon: 103.8627418
      },
      sequence: 0,
      times: {
        arrivals: [
          {
            type: 'LAST_TRAIN',
            day: 'SUNDAYS_PH',
            terminal: 'Marina South Pier',
            time: '2246'
          },
          {
            type: 'LAST_TRAIN',
            day: 'SATURDAYS',
            terminal: 'Marina South Pier',
            time: '2246'
          },
          {
            type: 'LAST_TRAIN',
            day: 'WEEKDAYS',
            terminal: 'Marina South Pier',
            time: '2246'
          },
          {
            type: 'LAST_TRAIN',
            day: 'WEEKDAYS',
            terminal: 'Marina Bay',
            time: '2253'
          },
          {
            type: 'LAST_TRAIN',
            day: 'SUNDAYS_PH',
            terminal: 'Marina Bay',
            time: '2253'
          },
          {
            type: 'LAST_TRAIN',
            day: 'SATURDAYS',
            terminal: 'Marina Bay',
            time: '2253'
          },
          {
            type: 'LAST_TRAIN',
            day: 'WEEKDAYS',
            terminal: 'Toa Payoh',
            time: '2328'
          },
          {
            type: 'LAST_TRAIN',
            day: 'SUNDAYS_PH',
            terminal: 'Toa Payoh',
            time: '2328'
          },
          {
            type: 'LAST_TRAIN',
            day: 'SATURDAYS',
            terminal: 'Toa Payoh',
            time: '2328'
          },
          {
            type: 'LAST_TRAIN',
            day: 'SUNDAYS_PH',
            terminal: 'Ang Mo Kio',
            time: '0017'
          },
          {
            type: 'LAST_TRAIN',
            day: 'SATURDAYS',
            terminal: 'Ang Mo Kio',
            time: '0017'
          },
          {
            type: 'LAST_TRAIN',
            day: 'WEEKDAYS',
            terminal: 'Ang Mo Kio',
            time: '0017'
          },
          {
            type: 'FIRST_TRAIN',
            day: 'SATURDAYS',
            terminal: 'Marina South Pier',
            time: '0516'
          },
          {
            type: 'FIRST_TRAIN',
            day: 'WEEKDAYS',
            terminal: 'Marina South Pier',
            time: '0516'
          },
          {
            type: 'FIRST_TRAIN',
            day: 'SUNDAYS_PH',
            terminal: 'Marina South Pier',
            time: '0535'
          }
        ],
        frequencies: [
          {
            type: 'PEAK',
            day: 'WEEKDAYS',
            terminal: 'Yishun',
            frequency: 3.5
          },
          {
            type: 'OFF-PEAK',
            day: 'WEEKDAYS',
            terminal: 'Yishun',
            frequency: 5
          },
          {
            type: 'PEAK',
            day: 'SATURDAYS',
            terminal: 'Yishun',
            frequency: 4.5
          },
          {
            type: 'OFF-PEAK',
            day: 'SATURDAYS',
            terminal: 'Yishun',
            frequency: 5
          },
          {
            type: 'OFF-PEAK',
            day: 'SUNDAYS_PH',
            terminal: 'Yishun',
            frequency: 5
          }
        ],
        peaks: []
      }
    }
  ]
  const expected = [
    {
      trip_id: 'NS:WD:0',
      start_time: '05:16:00',
      end_time: '22:46:00',
      headway_secs: 300
    }
  ]
  const value = formatFrequencies(data)

  t.deepEqual(value, expected)
})
