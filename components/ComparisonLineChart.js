import styled from 'styled-components';
import useStats from '../utils/useStats';

export default function ComparisonLineChart() {
  const { stats, loading, error } = useStats('https://covid19.mathdro.id/api/countries/USA');

	console.log(stats, loading, error);
	
  if (loading) return <p style={{ color: '#fff' }}>Loading...</p>;
  if (error) return <p style={{ color: '#fff' }}>Error...</p>;
  return (
    <div>ComparisonLineChart</div>
  );
}
