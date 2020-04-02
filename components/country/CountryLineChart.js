import styled from 'styled-components';
import { Line } from 'react-chartjs-2';
import { default_colors } from '../../helpers';

const CountryLineChartContainer = styled.div`
  margin: 1.5em 0 1.5em 0;
`;

export default function ComparisonLineChart({ country }) {
  const formatData = country => {
    const labels = Object.keys(country.confirmedDates);

    const datasets = [
      {
        label: 'Confirmed',
        data: Object.values(country.confirmedDates),
        fill: false,
        backgroundColor: default_colors[0],
        borderColor: default_colors[0]
      },
      {
        label: 'Deceased',
        data: Object.values(country.deceasedDates),
        fill: false,
        backgroundColor: default_colors[1],
        borderColor: default_colors[1]
      },
      {
        label: 'Recovered',
        data: Object.values(country.recoveredDates),
        fill: false,
        backgroundColor: default_colors[3],
        borderColor: default_colors[3]
      }
    ];

    return { labels, datasets };
  };

  return (
    <CountryLineChartContainer>
      {/* <h3 className="title">{country.name}</h3> */}
      <Line data={formatData(country)}></Line>
    </CountryLineChartContainer>
  );
}
