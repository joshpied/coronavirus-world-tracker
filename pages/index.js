import styled from 'styled-components';

import Layout from '../components/Layout';
import Stats from '../components/Stats';
import WorldStatsPieChart from '../components/WorldStatsPieChart';

const WorldStats = styled.main`
  margin-left: 5%;
  margin-right: 5%;
`;

const WorldCharts = styled.div`
  margin-top: 1em;
  display: flex;
  justify-content: space-evenly;

  @media screen and (max-width: 1049px) {
    flex-direction: column;
  }
`;

export default function IndexPage() {
  return (
    <Layout>
      <WorldStats>
        <h2 className="title">Worldwide</h2>
        <Stats url="https://covid19.mathdro.id/api"></Stats>
        <WorldCharts>
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
        </WorldCharts>
      </WorldStats>
    </Layout>
  );
}
