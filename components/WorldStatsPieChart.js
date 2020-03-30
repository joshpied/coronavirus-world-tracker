import styled from 'styled-components';
import useStats from '../utils/useStats';
import { Pie } from 'react-chartjs-2';
import { default_colors } from '../helpers';

function formatStats(countries, stat) {
  let formattedObj = {};
  // some countries have regional data included in the dataset, need to make a new object to get total cases for each country
  for (let i in countries) {
    // current country already has a total in the new object, add to accumulator
    if (countries[i].countryRegion in formattedObj)
      formattedObj[countries[i].countryRegion] += countries[i][stat];
    // current country needs to be added to formatted data
    else formattedObj[countries[i].countryRegion] = countries[i][stat];
  }

  // sort countries descending
  const entries = Object.entries(formattedObj); // switch object back to array to sort it
  const sorted = entries.sort((a, b) => b[1] - a[1]); // now an array of array key-value pairs that is sorted by value descending
  const sortedObj = Object.fromEntries(sorted); // convert back to object to be further formatted

  // get top 10 cases in their own arrays
  const labels = Object.keys(sortedObj).slice(0, 10);
  const data = Object.values(sortedObj).slice(0, 10);
  // get total of all values outside of the top 10 cases
  const bottomValues = Object.values(sortedObj).slice(10);
  const reducer = (accumulator, currentValue) => accumulator + currentValue;
  const bottomTotal = bottomValues.reduce(reducer, 0);
  // add to labels and values -> there is now 11 each labels and values
  labels.push('Rest of World');
  data.push(bottomTotal);

  return { labels, data };
}

const StatsPieChart = styled.div`
  height: 100%;
  width: 45%;
  border: 1px solid #fff;
  border-radius: 0.5em;
  padding-bottom: 3em;

  h3 {
    padding-left: 5%;
  }

  @media screen and (max-width: 1049px) {
    width: 100%;
  }
`;

export default function Stats({ url, stat, title }) {
  const { stats, loading, error } = useStats(url);
  const { labels, data } = formatStats(stats, stat);
  const backgroundColor = [...default_colors];

  const pieData = {
    labels,
    datasets: [{ data, backgroundColor }]
  };

  const options = {
    maintainAspectRatio: true,
    legend: {
      display: true
    }
  };

  if (loading) return <p style={{ color: '#fff' }}>Loading...</p>;
  if (error) return <p> style={{ color: '#fff' }}Error...</p>;
  return (
    <StatsPieChart>
      <h3 className="title hover-underline-animation">{title}</h3>
      {/* width={300} height={300} */}
      <Pie data={pieData} height={270} options={options} responsive={true} />
    </StatsPieChart>
  );
}
