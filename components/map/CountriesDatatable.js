import { useState } from 'react';
import styled from 'styled-components';

const TableContainer = styled.div`
  overflow-x: auto;
`;

const Table = styled.table`
  margin: 1em 0 1em 0;
  width: 100%;
  /* border-collapse: collapse; */
  text-transform: uppercase;
  letter-spacing: 2px;
  color: white;

  th {
    text-align: left;
    cursor: pointer;
    user-select: none;
  }

  th:not(.name_header) {
    padding: 0.5em;
  }

  th.confirmed_header {
    background: var(--blue);
  }

  th.deceased_header {
    background: var(--red);
  }

  th.recovered_header {
    background: var(--green);
  }

  td.country {
    display: flex;
    align-items: center;
    span.country_name {
      margin-left: 12px;
    }
  }

  td:not(:first-child) {
    padding-left: 0.5em;
  }
`;

const AscendingArrow = () => <span>&#8593;</span>;
const DescendingArrow = () => <span>&#8595;</span>;

export default function CountriesDatatable({ data }) {
  // console.log(data);}
  const countries = [...data];
  const [selectedSort, setSelectedSort] = useState({
    prop: 'name',
    direction: 'descending'
  });

  const sortCountries = ({ prop, direction }) => {
    // 'name' prop sorts by string
    if (prop === 'name') {
      if (direction === 'descending') {
        countries.sort((a, b) =>
          a[prop].toLowerCase() > b[prop].toLowerCase()
            ? 1
            : b[prop].toLowerCase() > a[prop].toLowerCase()
            ? -1
            : 0
        );
      } else if (direction === 'ascending') {
        countries.sort((a, b) =>
          a[prop].toLowerCase() < b[prop].toLowerCase()
            ? 1
            : b[prop].toLowerCase() < a[prop].toLowerCase()
            ? -1
            : 0
        );
      }
      // other 'stats' props sorting by number
    } else {
      if (direction === 'descending')
        countries.sort((a, b) => b['stats'][prop] - a['stats'][prop]);
      if (direction === 'ascending')
        countries.sort((a, b) => a['stats'][prop] - b['stats'][prop]);
    }
  };

  const setSort = (e, prop) => {
    // sort already enabled on current heading, changes direction
    if (selectedSort.prop === prop)
      setSelectedSort({
        prop,
        direction:
          selectedSort.direction === 'ascending' ? 'descending' : 'ascending'
      });
    // default sort direction when a new header is clicked
    else setSelectedSort({ prop, direction: 'descending' });
  };

  sortCountries(selectedSort);

  return (
    <TableContainer>
      <Table>
        <thead>
          <tr>
            {['name', 'confirmed', 'deceased', 'recovered'].map((val, i) => (
              <th
                className={`${val}_header`}
                key={`${i}_${val}`}
                width="25%"
                onClick={(e) => {
                  setSort(e, val);
                }}
              >
                {val === 'name' ? 'Country' : val}{' '}
                {selectedSort.prop === val ? (
                  selectedSort.direction === 'ascending' ? (
                    <AscendingArrow />
                  ) : (
                    <DescendingArrow />
                  )
                ) : (
                  ''
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {countries.map((val, i) => (
            <tr key={`${i}_${val}`}>
              {/* <td>{i}</td> */}
              <td className="country">
                <img
                  className="country_flag"
                  src={`https://www.countryflags.io/${val.code}/flat/24.png`}
                  alt={`${val.code} Flag`}
                />
                <span className="country_name">{val.name}</span>
              </td>
              <td>{val.stats.confirmed}</td>
              <td>{val.stats.deceased}</td>
              <td>{val.stats.recovered}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </TableContainer>
  );
}
