import styled from 'styled-components';
import ComparisonLineChart from '../components/ComparisonLineChart';
import Layout from '../components/Layout';

const CountryComparison = styled.main`
  margin-left: 5%;
  margin-right: 5%;
`;

export default function ComparePage(props) {
  return (
    <Layout>
      <CountryComparison>
        <ComparisonLineChart
          url="https://coronavirus-world-api.now.sh/api/time-series/confirmed/new"
          stat="confirmed/new"
          title="Confirmed New Cases"
        ></ComparisonLineChart>
        <ComparisonLineChart
            url="https://coronavirus-world-api.now.sh/api/time-series/confirmed"
            stat="confirmed"
            title="Confirmed Total Cases"
          ></ComparisonLineChart>
      </CountryComparison>
    </Layout>
  );
}
