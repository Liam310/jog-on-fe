const { checkSufficientRegionChange, convertRouteToRegion } = require('./utils');
const { expect } = require('chai');

describe('checkSufficientRegionChange', () => {
  it('returns false when passed the same region for both arguments', () => {
    expect(
      checkSufficientRegionChange(
        {
          latitude: 53.8008,
          longitude: -1.5491,
          latitudeDelta: 0.0122,
          longitudeDelta: 0.0073
        },
        {
          latitude: 53.8008,
          longitude: -1.5491,
          latitudeDelta: 0.0122,
          longitudeDelta: 0.0073
        }
      )
    ).to.be.false;
  });
  it('returns true when the latitude has changed by at least 40% of the latitudeDelta', () => {
    expect(
      checkSufficientRegionChange(
        {
          latitude: 53.8008,
          longitude: -1.5491,
          latitudeDelta: 0.0122,
          longitudeDelta: 0.0073
        },
        {
          latitude: 53.8061,
          longitude: -1.5491,
          latitudeDelta: 0.0122,
          longitudeDelta: 0.0073
        }
      )
    ).to.be.true;
  });
  it('returns false when the latitude has changed by less than 40% of the latitudeDelta', () => {
    expect(
      checkSufficientRegionChange(
        {
          latitude: 53.8008,
          longitude: -1.5491,
          latitudeDelta: 0.0122,
          longitudeDelta: 0.0073
        },
        {
          latitude: 53.8022,
          longitude: -1.5491,
          latitudeDelta: 0.0122,
          longitudeDelta: 0.0073
        }
      )
    ).to.be.false;
  });
  it('returns true when the longitude has changed by at least 20% of the longitudeDelta', () => {
    expect(
      checkSufficientRegionChange(
        {
          latitude: 53.8008,
          longitude: -1.5491,
          latitudeDelta: 0.0122,
          longitudeDelta: 0.0073
        },
        {
          latitude: 53.8008,
          longitude: -1.545,
          latitudeDelta: 0.0122,
          longitudeDelta: 0.0073
        }
      )
    ).to.be.true;
  });
  it('returns false when the longitude has changed by at less than 20% of the longitudeDelta', () => {
    expect(
      checkSufficientRegionChange(
        {
          latitude: 53.8008,
          longitude: -1.5491,
          latitudeDelta: 0.0122,
          longitudeDelta: 0.0073
        },
        {
          latitude: 53.8008,
          longitude: -1.5492,
          latitudeDelta: 0.0122,
          longitudeDelta: 0.0073
        }
      )
    ).to.be.false;
  });
  it('returns true when the latitudeDelta has increased by at least 75%', () => {
    expect(
      checkSufficientRegionChange(
        {
          latitude: 53.8008,
          longitude: -1.5491,
          latitudeDelta: 0.0122,
          longitudeDelta: 0.0073
        },
        {
          latitude: 53.8008,
          longitude: -1.5491,
          latitudeDelta: 0.0266,
          longitudeDelta: 0.0073
        }
      )
    ).to.be.true;
  });
  it('returns true when the latitudeDelta has decreased by at least 40%', () => {
    expect(
      checkSufficientRegionChange(
        {
          latitude: 53.8008,
          longitude: -1.5491,
          latitudeDelta: 0.0122,
          longitudeDelta: 0.0073
        },
        {
          latitude: 53.8008,
          longitude: -1.5491,
          latitudeDelta: 0.0071,
          longitudeDelta: 0.0073
        }
      )
    ).to.be.true;
  });
  it('returns false when the latitudeDelta has not increased or decreased sufficiently', () => {
    expect(
      checkSufficientRegionChange(
        {
          latitude: 53.8008,
          longitude: -1.5491,
          latitudeDelta: 0.0122,
          longitudeDelta: 0.0073
        },
        {
          latitude: 53.8008,
          longitude: -1.5491,
          latitudeDelta: 0.0111,
          longitudeDelta: 0.0073
        }
      )
    ).to.be.false;
  });
});

describe.only('convertRouteToRegion', () => {
  it('returns an object with the correct keys', () => {
    expect(
      convertRouteToRegion([
        { latitude: 1, longitude: 2 },
        { latitude: 3, longitude: 4 }
      ])
    ).to.have.keys('latitude', 'longitude', 'latitudeDelta', 'longitudeDelta');
  });
  it('returns the correct region for an array length 2', () => {
    expect(
      convertRouteToRegion([
        { latitude: 53.7, longitude: -1.5 },
        { latitude: 53.8, longitude: -1.6 }
      ])
    ).to.deep.equal({
      latitude: 53.75,
      longitude: -1.55,
      latitudeDelta: 0.15,
      longitudeDelta: 0.12
    });
  });
  it('return the correct region for a much longer array', () => {
    const input = [
      { latitude: 51.513357512, longitude: 7.45574331 },
      { latitude: 51.515400598, longitude: 7.45518541 },
      { latitude: 51.516241842, longitude: 7.456494328 },
      { latitude: 51.516722545, longitude: 7.459863183 },
      { latitude: 51.517443592, longitude: 7.463232037 }
    ];
    const actual = convertRouteToRegion(input);
    expect(actual).to.deep.equal({
      latitude: 51.515401,
      longitude: 7.459209,
      latitudeDelta: 0.00612912,
      longitudeDelta: 0.00965595
    });
  });
});
