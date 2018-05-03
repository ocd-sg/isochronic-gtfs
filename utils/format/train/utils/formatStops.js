const transform = ({
  id: stop_id,
  name: stop_name,
  lat: stop_lat,
  lon: stop_lon
}) => ({
  stop_id,
  stop_name,
  stop_lat: stop_lat > stop_lon ? stop_lon : stop_lat,
  stop_lon: stop_lat > stop_lon ? stop_lat : stop_lon
})

const formatStops = (stops) =>
  stops
    .map(transform)
    .reduce((memo, d) => memo.find(({ stop_id }) => d.stop_id === stop_id) ? memo : [ ...memo, d ], [])

module.exports = formatStops
