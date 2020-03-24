import styled from 'styled-components';
import CountUp from 'react-countup';

import useStats from '../utils/useStats';

const StatGrid = styled.div`
  display: flex;
  justify-content: space-evenly;
  // display: grid;
  // grid-template-columns: repeat(3, 33%);
  // repeat(auto-fit, minmax(240px, 1fr));
  // grid-template-rows: auto;
  // grid-gap: 1rem;
`;
const StatBlock = styled.div`
  width: 27%;
  background: ${props => props.background};
  color: #fff;
  font-size: 2rem;
  padding: 2rem;
  border-radius: 5px;
`;
const StatTitle = styled.h6`
  font-size: 1vw;
  text-transform: uppercase;
  letter-spacing: 5px;
  color: #fff;
  margin-top: 5px;
  margin-bottom: 0;
`;
const StatValue = styled.h2`
  font-size: 2.5vw;
  text-transform: uppercase;
  letter-spacing: 5px;
  color: #fff;
  margin-top: 5px;
  margin-bottom: 5px;
`;

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
