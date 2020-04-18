import styled from 'styled-components';
import dynamic from 'next/dynamic';
const Map = dynamic(() => import('../components/map'), {
  ssr: false
});
import Layout from '../components/Layout';
import Loading from '../components/shared/Loading';

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
