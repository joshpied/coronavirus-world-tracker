import styled from 'styled-components';
import CountUp from 'react-countup';

import useStats from '../utils/useStats';

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

const x = 3;

export default function Stats({ url }) {
  const { stats, loading, error } = useStats(url);

  // console.log(stats, loading, error);
  if (loading) return <p style={{ color: '#fff' }}>Loading...</p>;
  if (error) return <p style={{ color: '#fff' }}>Error...</p>;
  return (
    <StatGrid>
      <StatBlock background="#17a2b8">
        <StatTitle>Confirmed</StatTitle>
        <StatValue>
          <CountUp end={stats?.confirmed?.value} separator="," />
        </StatValue>
      </StatBlock>
      <StatBlock background="#dc3545">
        <StatTitle className="title">Deceased</StatTitle>
        <StatValue>
          <CountUp end={stats?.deaths?.value} separator="," />
        </StatValue>
      </StatBlock>
      <StatBlock background="#2AA744">
        <StatTitle className="title">Recovered</StatTitle>
        <StatValue>
          <CountUp end={stats?.recovered?.value} separator="," />
        </StatValue>
      </StatBlock>
    </StatGrid>
  );
}
