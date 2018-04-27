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
  stops.map(transform)

module.exports = formatStops
