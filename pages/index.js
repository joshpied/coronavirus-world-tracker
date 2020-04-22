import styled from 'styled-components';

import useData from '../utils/useData';
import Stats from '../components/Stats';
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
  const { data, loading, error } = useData(
    'https://coronavirus-world-api.now.sh/api/countries'
  );

  if (error) return <p style={{ color: '#fff' }}>Error...</p>;
  // TODO: pass this data into the map component as well (don't have to get it twice)
  if (loading) return <Loading></Loading>;

  return (
    <WorldContainer>
      <h2 className="title">Worldwide</h2>
      <Stats url="https://covid19.mathdro.id/api"></Stats>
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
      <CountriesDatatable data={data.countries}></CountriesDatatable>
    </WorldContainer>
  );
}
