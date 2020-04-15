import { useState } from 'react';
import styled from 'styled-components';

const TableContainer = styled.div`
  overflow-x: auto;

  h2 {
    text-transform: uppercase;
    letter-spacing: 3px;
    color: var(--white);
  }
`;

const Table = styled.table`
  margin: 1em 0 1em 0;
  width: 100%;
  /* border-collapse: collapse; */
  text-transform: uppercase;
  letter-spacing: 2px;
  color: var(--white);

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

const Pagination = styled.div`
  display: flex;
	justify-content: center;
	align-items: center;
`;

const CurrentPage = styled.span`
  color: var(--white);
	font-size: 1.2em;
	/* margin-top: 7px; */
  @media screen and (min-width: 1300px) {
    display: none;
  }
`;

const PageNumbers = styled.ul`
  display: flex;
  justify-content: center;
  list-style: none;
  padding: 0;
  color: var(--white);
  font-size: 1.2em;

  li {
    margin-left: 1em;
    margin-right: 1em;
    user-select: none;
    cursor: pointer;
  }

  li.active {
    border-bottom: 1px solid var(--white);
  }

  @media screen and (max-width: 1300px) {
    li {
      display: none;
    }
  }
`;

const DecreasePagination = styled.button`
  cursor: pointer;
  color: var(--white);
  background: var(--black);
  border: none;
  outline: none;
  font-size: 1em;
  &:disabled {
    color: grey;
    cursor: not-allowed;
  }
`;

const IncreasePagination = styled.button`
  cursor: pointer;
  color: var(--white);
  background: var(--black);
  border: none;
  outline: none;
  font-size: 1em;
  &:disabled {
    color: grey;
    cursor: not-allowed;
  }
`;

const AscendingArrow = () => <span>&#8593;</span>;
const DescendingArrow = () => <span>&#8595;</span>;

export default function CountriesDatatable({ data }) {
  const countries = [...data];
  const { lastUpdated } = countries[0].stats;
  const [selectedSort, setSelectedSort] = useState({
    prop: 'name',
    direction: 'descending'
  });
  const [pagination, setPagination] = useState({
    currentPage: 1,
    itemsPerPage: 10
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

  const handlePagination = (e) => {
    setPagination({ currentPage: Number(event.target.id), itemsPerPage: 10 });
  };
  const stepPagination = (e, step) => {
    if (step === 'decrement')
      setPagination({
        currentPage: --pagination.currentPage,
        itemsPerPage: 10
      });
    if (step === 'increment')
      setPagination({
        currentPage: ++pagination.currentPage,
        itemsPerPage: 10
      });
  };
  sortCountries(selectedSort);

  const indexOfLastItem = pagination.currentPage * pagination.itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - pagination.itemsPerPage;
  const currentCountries = countries.slice(indexOfFirstItem, indexOfLastItem);
  const pageNumbers = [];
  for (
    let i = 1;
    i <= Math.ceil(countries.length / pagination.itemsPerPage);
    i++
  ) {
    pageNumbers.push(i);
  }
  const renderPageNumbers = pageNumbers.map((number) => {
    return (
      <li
        key={number}
        id={number}
        className={number === pagination.currentPage ? 'active' : ''}
        onClick={(e) => {
          handlePagination(e);
        }}
      >
        {number}
      </li>
    );
  });

  return (
    <TableContainer>
      <h2>Last Update: {lastUpdated}</h2>
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
          {currentCountries.map((val, i) => (
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
      <Pagination>
        <DecreasePagination
          onClick={(e) => stepPagination(e, 'decrement')}
          disabled={pagination.currentPage === 1}
        >
          {'<'}
        </DecreasePagination>
        <PageNumbers>{renderPageNumbers}</PageNumbers>
        <CurrentPage>{pagination.currentPage}</CurrentPage>
        <IncreasePagination
          onClick={(e) => stepPagination(e, 'increment')}
          disabled={pagination.currentPage === pageNumbers.length}
        >
          {'>'}
        </IncreasePagination>
      </Pagination>
    </TableContainer>
  );
}
