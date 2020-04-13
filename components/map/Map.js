import { useState } from 'react';
import useData from '../../utils/useData';
import MapGL, { Source, Layer } from 'react-map-gl';
import Loading from '../shared/Loading';

export default function Map(props) {
  const [state, setState] = useState({
    viewport: {
      width: 400,
      height: 400,
      latitude: 34.885931,
      longitude: -29.369202,
      zoom: 1
    }
  });

  const { data, loading, error } = useData(
    'https://coronavirus-world-api.now.sh/api/countries'
  );

  const formatDataToGeoJson = (countries) => {
    const geoJson = {
      type: 'FeatureCollection',
      features: countries.map((country) => ({
        type: 'Feature',
        properties: {
          id: country.code,
          count: country.stats.confirmed,
          country: country.name,
          name: country.name
        },
        geometry: {
          type: 'Point',
          // UK has the wrong coordinates in the api... TODO fix that
          coordinates: [
            country.code === 'GB' ? -1.94 : country.coordinates.longitude,
            country.code === 'GB' ? 53.49 : country.coordinates.latitude
          ]
        }
      }))
    };

    return geoJson;
  };

  if (loading) return <Loading></Loading>;
  if (error) return <p> style={{ color: '#fff' }}Error...</p>;

  const circleLayer = {
    id: 'country-point',
    type: 'circle',
    source: 'countries',
    paint: {
      // with 4 steps to implement three types of circles:
      //   * Blue, 20px circles when point count is less than 100
      //   * Yellow, 30px circles when point count is between 100 and 1000
      //   * Pink, 40px circles when point count is greater than or equal to 1000
      //   * Pink, 45px circles when point count is greater than or equal to 10000
      'circle-color': [
        'step',
        ['get', 'count'],
        '#51bbd6',
        100,
        '#f1f075',
        1000,
        '#f28cb1',
        10000,
        '#c15236'
      ],
      'circle-radius': [
        'step',
        ['get', 'count'],
        20,
        100,
        30,
        1000,
        40,
        10000,
        45
      ]
    }
  };

  const countryNameLayer = {
    id: 'country-labels',
    type: 'symbol',
    source: 'countries',
    layout: {
      'text-field': ['get', 'country'],
      'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
      'text-size': 12,
      'text-offset': [0, -1] // display country name a bit higher
    },
    interactive: true
  };

  const countLayer = {
    id: 'count-labels',
    type: 'symbol',
    source: 'countries',
    layout: {
      'text-field': ['get', 'count'],
      'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
      'text-size': 12,
      'text-offset': [0, 1] // display cases count a bit lower
    },
    interactive: true
  };

  return (
    <MapGL
      {...state.viewport}
      width="100%"
      height="80vh"
      mapStyle="mapbox://styles/mapbox/dark-v9"
      onViewportChange={(newViewport) =>
        setState({ ...state, viewport: newViewport })
      }
      mapboxApiAccessToken={process.env.MAPBOX_API_KEY}
    >
      <Source
        id="countries"
        type="geojson"
        data={formatDataToGeoJson(data.countries)}
        cluster={true}
        clusterMaxZoom={5}
        clusterRadius={25}
      >
        <Layer {...circleLayer} />
        <Layer {...countLayer} />
        <Layer {...countryNameLayer} />
      </Source>
    </MapGL>
  );
}
