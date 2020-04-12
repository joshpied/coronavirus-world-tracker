import styled from 'styled-components';

import Layout from '../components/Layout';
import Map from '../components/map';

const MapContainer = styled.main`
  margin-left: 5%;
  margin-right: 5%;
`;

export default function MapPage() {
  return (
    <Layout>
      <MapContainer>
        <Map></Map>
      </MapContainer>
    </Layout>
  );
}
