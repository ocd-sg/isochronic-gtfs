const cheerio = require('cheerio')

const parseTrips = (html) => {
  const $ = cheerio.load(html)
  const $hiddenDiv = $('div')
  const arrivals = $hiddenDiv.html()
    .replace(/<br>/g, '\n')
    .split('---------------\n')
    .slice(1, 2)[0]
    .split('\n\n')
    .filter((d) => d)
    .map((str) =>
      str.split('\n')
        .map((d) => d.split(':')[1].trim())
    )
    .map(([type, day, _, terminal, __, time]) => ({ type, day, terminal, time }))
  const frequencies = $hiddenDiv.html()
    .replace(/<br>/g, '\n')
    .split('---------------\n')
    .slice(2, 3)[0]
    .split('\n')
    .filter((d) => d)
    .map((d) => d.split(',').map((d) => d.trim()))
    .map(([ _, terminal, __, day, ___, type, frequency ]) => ({ type, day, terminal, frequency }))
    .map((d) => Object.assign({}, d, {
      frequency: d.frequency.replace('*', '').split('-').map((d) => +d.trim())
    }))
    .map((d) => Object.assign({}, d, {
      frequency: d.frequency.reduce((memo, d) => memo + d, 0) / d.frequency.length
    }))
  const peaks = $hiddenDiv.html()
    .replace(/<br>/g, '\n')
    .split('---------------\n')
    .slice(3, 4)[0]
    .split('\n')
    .filter((d) => d)
    .map((d) => d.split(',').map((d) => d.trim()))
    .map(([ _, __, ___, day, ____, time]) => ({ day, time: time.split('to').map((d) => d.trim()) }))

  return { arrivals, frequencies, peaks }
}

module.exports = parseTrips
