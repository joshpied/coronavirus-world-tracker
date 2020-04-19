import styled from 'styled-components';
import ComparisonLineChart from '../components/ComparisonLineChart';

const CountryComparison = styled.main`
  margin-left: 5%;
  margin-right: 5%;
`;

export default function ComparePage(props) {
  return (
      <CountryComparison>
        <ComparisonLineChart
          url="https://coronavirus-world-api.now.sh/api/countries/time-series/confirmed/new"
          stat="confirmed/new"
          title="Confirmed New Cases"
        ></ComparisonLineChart>
        <ComparisonLineChart
          url="https://coronavirus-world-api.now.sh/api/countries/time-series/confirmed"
          stat="confirmed"
          title="Confirmed Total Cases"
        ></ComparisonLineChart>
      </CountryComparison>
  );
}
