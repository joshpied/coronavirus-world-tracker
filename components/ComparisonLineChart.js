import styled from 'styled-components';
import useStats from '../utils/useStats';
import { Line } from 'react-chartjs-2';
import { default_colors } from '../helpers';

const ComparisonLineChartContainer = styled.div``;

export default function ComparisonLineChart({ url, stat, title }) {
  const { stats, loading, error } = useStats(url);

  const formatData = ({ countries }) => {
    const labels = Object.keys(countries['China'].dates);

    const coupleCountries = {
      US: countries['US'],
      Canada: countries['Canada'],
      China: countries['China'],
      Italy: countries['Italy']
    };

    const datasets = Object.keys(coupleCountries).map((key, index) => ({
      label: key,
      data: Object.values(coupleCountries[key].dates),
      fill: false,
      backgroundColor: default_colors[index],
      borderColor: default_colors[index]
    }));

    const data = {
      labels,
      datasets
    };

    return data;
  };

  if (loading) return <p style={{ color: '#fff' }}>Loading...</p>;
  if (error) return <p> style={{ color: '#fff' }}Error...</p>;
  return (
    <ComparisonLineChartContainer>
      <h3 className="title">{title}</h3>
      <Line data={formatData(stats)}></Line>
    </ComparisonLineChartContainer>
  );
}
