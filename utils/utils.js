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
