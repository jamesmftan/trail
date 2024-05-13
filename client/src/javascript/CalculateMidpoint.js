export const calculateMidpoint = (latitude, longitude) => {
  if (latitude.length !== longitude.length || latitude.length === 0) {
    console.error(
      "Invalid input: Latitude and longitude arrays must have the same non-zero length."
    );
    return null;
  }

  let sumLatitude = 0;
  let sumLongitude = 0;
  for (let i = 0; i < latitude.length; i++) {
    sumLatitude += latitude[i];
    sumLongitude += longitude[i];
  }

  const averageLatitude = sumLatitude / latitude.length;
  const averageLongitude = sumLongitude / longitude.length;

  if (isNaN(averageLatitude) || isNaN(averageLongitude)) {
    console.error("Invalid input: Unable to calculate midpoint.");
    return null;
  }

  return { latitude: averageLatitude, longitude: averageLongitude };
};
