import styled from 'styled-components';
import { Line, Bar } from 'react-chartjs-2';
import { default_colors } from '../../helpers';

const CountryBarChartContainer = styled.div`
  margin: 1.5em 0 1.5em 0;
`;

export default function CountryBarChart({ country }) {
  const formatData = country => {
    const arbitraryStackKey = 'stack1';
    const data = {
      labels: Object.keys(country.confirmedDates),
      datasets: [
        {
          stack: arbitraryStackKey,
          label: 'Confirmed Cases',
          data: Object.values(country.confirmedDates),
          backgroundColor: default_colors[0],
          borderColor: default_colors[0]
        },
        {
          stack: arbitraryStackKey,
          label: 'Deceased',
          data: Object.values(country.deceasedDates),
          backgroundColor: default_colors[1],
          borderColor: default_colors[1]
        },
        {
          stack: arbitraryStackKey,
          label: 'Recovered',
          data: Object.values(country.recoveredDates),
          backgroundColor: default_colors[3],
          borderColor: default_colors[3]
        }
      ]
    };

    return data;
  };

  // remove y axis labels since deceased and recovered are inclusive of confirmed cases
  const options = {
    scales: {
      yAxes: [
        {
          display: false
        }
      ]
    }
  };

  return (
    <CountryBarChartContainer>
      <h3 className="title">{country.name} Cases Over Time</h3>
      <Bar data={formatData(country)} options={options}></Bar>
    </CountryBarChartContainer>
  );
}
