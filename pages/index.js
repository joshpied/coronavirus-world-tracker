import styled from 'styled-components';

import useData from '../utils/useData';
import Stats from '../components/shared/Stats';
import CountriesDatatable from '../components/world/CountriesDatatable';
import WorldStatsPieChart from '../components/world/WorldStatsPieChart';
import Loading from '../components/shared/Loading';

const WorldContainer = styled.main`
  margin-left: 5%;
  margin-right: 5%;
`;

const WorldChartsContainer = styled.div`
  margin-top: 1em;
  display: flex;
  justify-content: space-evenly;

  @media screen and (max-width: 1049px) {
    flex-direction: column;
  }
`;

export default function IndexPage() {
  const {
    data: countryData,
    loading: countryLoading,
    error: countryError
  } = useData('https://coronavirus-world-api.now.sh/api/countries');
  
  const { data: worldData, loading: worldLoading, error: worldError } = useData(
    'https://coronavirus-world-api.now.sh/api/world'
  );

  if (countryError) return <p style={{ color: '#fff' }}>Error...</p>;
  if (worldError) return <p style={{ color: '#fff' }}>Error...</p>;
  if (countryLoading) return <Loading></Loading>;
  if (worldLoading) return <Loading></Loading>;

  return (
    <WorldContainer>
      <h2 className="title">Worldwide</h2>
      <Stats stats={worldData.recentStats}></Stats>
      <WorldChartsContainer>
        <WorldStatsPieChart
          url="https://covid19.mathdro.id/api/confirmed"
          stat="confirmed"
          title="Cases Breakdown"
        ></WorldStatsPieChart>
        <WorldStatsPieChart
          url="https://covid19.mathdro.id/api/deaths"
          stat="deaths"
          title="Deceased Breakdown"
        ></WorldStatsPieChart>
      </WorldChartsContainer>
      <CountriesDatatable data={countryData.countries}></CountriesDatatable>
    </WorldContainer>
  );
}
