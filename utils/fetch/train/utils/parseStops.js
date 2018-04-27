const cheerio = require('cheerio')

const parseStops = (html) => {
  const $ = cheerio.load(html)
  const mrts = $('#mrt_station_with_qr_list option')
    .filter((index, el) => $(el).val() !== 'default')
    .map((index, el) => {
      const $el = $(el)
      const name = $el.text().split('(')[0].trim()
      return name.replace(' Station', '')
    })
    .get()
  const stops = $('#mrt_station_list option')
    .filter((index, el) => $(el).val() !== 'default')
    .map((index, el) => {
      const $el = $(el)
      const id = +$el.val() || null
      const codes = $el.text().match(/\((.*?)\)/)[1]
        .split('/')
        .map((d) => d.trim())
      const name = $el.text().split('(')[0].trim()
      return { name, id, codes }
    })
    .get()
  return stops.filter(({ name }) => mrts.includes(name))
}

module.exports = parseStops
