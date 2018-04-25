const parseServices = (lines) => (stops) =>
  lines
    .map((line) => ({
      id: line.id,
      stops: line.stops
        .map((id) => stops.find(({ refs }) => refs.includes(id)))
        .filter((d) => d)
    }))
    .map((line) => ({
      ...line,
      directions: [
        {
          direction: 0,
          stops: line.stops.slice(0)
        },
        {
          direction: 1,
          stops: line.stops.slice(0).reverse()
        }
      ]
    }))

module.exports = parseServices
