const { getCenterOfBounds, getBounds } = require('geolib');

exports.checkSufficientRegionChange = (oldRegion, newRegion) => {
  const latChange = Math.abs(oldRegion.latitude - newRegion.latitude);
  const longChange = Math.abs(oldRegion.longitude - newRegion.longitude);
  const latDeltaChange = newRegion.latitudeDelta / oldRegion.latitudeDelta;
  // No need to check longitudeDelta given its consistent ratio with latitudeDelta

  const latChangeCheck = latChange > 0.4 * oldRegion.latitudeDelta;
  const longChangeCheck = longChange > 0.2 * oldRegion.longitudeDelta;
  const latDeltaChangeCheck = latDeltaChange > 1.75 || latDeltaChange < 0.6;

  return latChangeCheck || longChangeCheck || latDeltaChangeCheck;
};

exports.convertRouteToRegion = route => {
  const { minLat, maxLat, minLng, maxLng } = getBounds(route);
  let { latitude, longitude } = getCenterOfBounds(route);
  let latitudeDelta = (maxLat - minLat) * 1.8;
  let longitudeDelta = (maxLng - minLng) * 1.2;

  // Round all to 8dp to avoid horrible floating point arithmetic
  latitude = Number(latitude.toFixed(8));
  longitude = Number(longitude.toFixed(8));
  latitudeDelta = Number(latitudeDelta.toFixed(8));
  longitudeDelta = Number(longitudeDelta.toFixed(8));

  return {
    latitude,
    longitude,
    latitudeDelta,
    longitudeDelta
  };
};
