const transform = ({
  BusStopCode: stop_id,
  Description: stop_name,
  Latitude: stop_lat,
  Longitude: stop_lon
}) => ({
  stop_id,
  stop_name,
  stop_lat: stop_lat > stop_lon ? stop_lon : stop_lat,
  stop_lon: stop_lat > stop_lon ? stop_lat : stop_lon
})

const formatStops = (stops) =>
  stops.map(transform)

module.exports = formatStops
