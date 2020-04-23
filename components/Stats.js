import styled from 'styled-components';
import CountUp from 'react-countup';

import useStats from '../utils/useStats';
import Loading from './shared/Loading';

const StatGrid = styled.div`
  display: flex;
  justify-content: space-between;

  @media screen and (max-width: 696px) {
    flex-direction: column;
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
const StatTitle = styled.div`
  display: flex;
  align-items: center;
`;
const StatIcon = styled.img`
  width: 1.5vw;
  height: 1.5vw;
  filter: invert(100%) sepia(0%) saturate(0%) hue-rotate(179deg)
    brightness(107%) contrast(101%);

  @media screen and (max-width: 696px) {
    display: none;
  }
`;
const StatName = styled.h6`
  font-size: 1.5vw;
  text-transform: uppercase;
  letter-spacing: 5px;
  color: #fff;
  margin: 0 auto 0 5px;

  @media screen and (max-width: 696px) {
    font-size: 2vw;
  }
`;
const StatValue = styled.h2`
  display: flex;
  align-items: center;
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
const StatValueIcon = styled.img`
  display: none;
  filter: invert(100%) sepia(0%) saturate(0%) hue-rotate(179deg)
    brightness(107%) contrast(101%);

  @media screen and (max-width: 696px) {
    display: flex;
    width: 5vw;
    height: 5vw;
    margin-right: 5px;
  }
`;

export default function Stats({ url }) {
  const { stats, loading, error } = useStats(url);

  if (loading) return <Loading></Loading>;
  if (error) return <p style={{ color: '#fff' }}>Error...</p>;
  return (
    <StatGrid>
      <StatBlock background="#17a2b8">
        <StatTitle>
          <StatIcon src="images/icons/check-circle.svg" />
          <StatName>Confirmed</StatName>
        </StatTitle>
        <StatValue>
          <StatValueIcon src="images/icons/check-circle.svg" />
          <CountUp end={stats?.confirmed?.value} separator="," />
        </StatValue>
      </StatBlock>
      <StatBlock background="#dc3545">
        <StatTitle>
          <StatIcon src="images/icons/ribbon.svg" />
          <StatName className="title">Deceased</StatName>
        </StatTitle>
        <StatValue>
          <StatValueIcon src="images/icons/ribbon.svg" />
          <CountUp end={stats?.deaths?.value} separator="," />
        </StatValue>
      </StatBlock>
      <StatBlock background="#2AA744">
        <StatTitle>
          <StatIcon src="images/icons/activity.svg" />
          <StatName className="title">Recovered</StatName>
        </StatTitle>
        <StatValue>
          <StatValueIcon src="images/icons/activity.svg" />
          <CountUp end={stats?.recovered?.value} separator="," />
        </StatValue>
      </StatBlock>
    </StatGrid>
  );
}
