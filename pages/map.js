import styled from 'styled-components';
import dynamic from 'next/dynamic';
const Map = dynamic(() => import('../components/map'), {
  ssr: false
});
import CountriesDatatable from '../components/map/CountriesDatatable';
import Layout from '../components/Layout';
import useData from '../utils/useData';
import Loading from '../components/shared/Loading';

const MapContainer = styled.main`
  margin-left: 5%;
  margin-right: 5%;
`;

export default function MapPage() {
  const { data, loading, error } = useData(
    'https://coronavirus-world-api.now.sh/api/countries'
  );

  if (error) return <p style={{ color: '#fff' }}>Error...</p>;
  // TODO: pass this data into the map component as well (don't have to get it twice)
  if (loading)
    return (
      <Layout>
        <MapContainer>
          <Loading></Loading>
        </MapContainer>
      </Layout>
    );
  return (
    <Layout>
      <MapContainer>
        <Map></Map>
        <CountriesDatatable data={data.countries}></CountriesDatatable>
      </MapContainer>
    </Layout>
  );
}
