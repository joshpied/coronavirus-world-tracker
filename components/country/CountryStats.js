import styled from 'styled-components';
import CountUp from 'react-countup';
import useData from '../../utils/useData';

import CountryBarChart from './CountryBarChart';
import Loading from '../shared/Loading';

// styled components
const StatGrid = styled.div`
  display: flex;
  justify-content: space-between;

  @media screen and (max-width: 696px) {
    flex-direction: column;
    text-align: center;
  }
`;
const StatBlock = styled.div`
  width: 28%;
  background: ${props => props.background};
  color: #fff;
  font-size: 2rem;
  padding: 2rem;
  border-radius: 5px;

  @media screen and (max-width: 696px) {
    width: auto;
  }
`;
const StatTitle = styled.h6`
  font-size: 1vw;
  text-transform: uppercase;
  letter-spacing: 5px;
  color: #fff;
  margin-top: 5px;
  margin-bottom: 0;

  @media screen and (max-width: 696px) {
    font-size: 2vw;
  }
`;
const StatValue = styled.h2`
  font-size: 2.5vw;
  text-transform: uppercase;
  letter-spacing: 5px;
  color: #fff;
  margin-top: 5px;
  margin-bottom: 5px;

  @media screen and (max-width: 696px) {
    font-size: 5vw;
  }
`;
const NoCountryData = styled.h4`
  text-transform: uppercase;
  letter-spacing: 5px;
  color: #fff;
  margin-top: 5px;
  margin-bottom: 5px;
  text-align: center;
`;

export default function Stats({ url }) {
  const { data, loading, error } = useData(url);
  if (loading) return <Loading></Loading>;
  if (error) return <p style={{ color: '#fff' }}>Error...</p>;
  if (data.success) {
    return (
      <>
        <StatGrid>
          <StatBlock background="#17a2b8">
            <StatTitle>Confirmed</StatTitle>
            <StatValue>
              <CountUp end={data.country.stats.confirmed} separator="," />
            </StatValue>
          </StatBlock>
          <StatBlock background="#dc3545">
            <StatTitle className="title">Deceased</StatTitle>
            <StatValue>
              <CountUp end={data.country.stats.deceased} separator="," />
            </StatValue>
          </StatBlock>
          <StatBlock background="#2AA744">
            <StatTitle className="title">Recovered</StatTitle>
            <StatValue>
              <CountUp end={data.country.stats.recovered} separator="," />
            </StatValue>
          </StatBlock>
        </StatGrid>
        <CountryBarChart country={data.country}></CountryBarChart>
      </>
    );
  } else {
    return (
      <NoCountryData style={{ color: '#fff' }}>{data.message}</NoCountryData>
    );
  }
}
