import { useState } from 'react';
import useData from '../utils/useData';
import styled from 'styled-components';
import MapGL, { Source, Layer } from 'react-map-gl';
import Layout from '../components/Layout';

const Map = styled.main`
  margin-left: 5%;
  margin-right: 5%;
`;

// 1. make api route to get most recent confirmed stat for each country, maybe format it already as geojson?
// 2. use source/layer to make cluster


export default function MapPage() {
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
    'https://coronavirus-world-api.now.sh/api/time-series/confirmed'
  );

  const geojson = {
    type: 'FeatureCollection',
    features: [
      {
        type: 'Feature',
        geometry: { type: 'Point', coordinates: [-122.4, 37.8] }
        // properties: {
        //   id: 'ak16994521',
        // }
      }
    ]
  };

  if (loading) return <p style={{ color: '#fff' }}>Loading...</p>;
  if (error) return <p> style={{ color: '#fff' }}Error...</p>;
  return (
    <Layout>
      <Map>
        <MapGL
          {...state.viewport}
          width="100%"
          height="80vh"
          mapStyle="mapbox://styles/mapbox/dark-v9"
          onViewportChange={newViewport =>
            setState({ ...state, viewport: newViewport })
          }
          mapboxApiAccessToken={process.env.MAPBOX_API_KEY}
        >
          <Source id="my-data" type="geojson" data={geojson}>
            <Layer
              id="point"
              type="circle"
              paint={{
                'circle-radius': 10,
                'circle-color': '#007cbf'
              }}
            />
          </Source>
        </MapGL>
      </Map>
    </Layout>
  );
}
