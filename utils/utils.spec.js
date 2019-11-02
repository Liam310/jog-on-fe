const { checkSufficientRegionChange } = require('./utils');
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
