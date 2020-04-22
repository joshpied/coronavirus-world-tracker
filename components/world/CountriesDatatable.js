import { useState } from 'react';
import styled from 'styled-components';

const TableContainer = styled.div`
  overflow-x: auto;
  margin-top: 1em;
`;

const Table = styled.table`
  margin: 1em 0 1em 0;
  width: 100%;
  border-collapse: collapse;
  text-transform: uppercase;
  letter-spacing: 2px;
  color: var(--white);

  th {
    text-align: left;
    cursor: pointer;
    user-select: none;
    font-size: 0.75em;
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

  td {
    /* font-size: 0.85em; */
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

const TableHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  h4 {
    font-size: 1em;
    text-transform: uppercase;
    letter-spacing: 3px;
    color: var(--white);
    margin: 0;
  }

  @media screen and (max-width: 500px) {
    flex-direction: column;
  }
`;

const TableSearch = styled.input`
  background: #333333;
  color: var(--white);
  font-size: 1em;
  padding: 8px;
  border: 1px solid var(--white);
  border-radius: 5px;
  outline: none;
  &:focus {
    background: #333333;
    border: 1px solid #2684ff;
  }

  @media screen and (max-width: 500px) {
    width: 100%;
    margin-top: 10px;
  }
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

/* Shows on small displays */
const CurrentPage = styled.span`
  margin-left: 1em;
  margin-right: 1em;
  color: var(--white);
  font-size: 1.2em;
  border-bottom: 1px solid var(--white);
  /* margin-top: 7px; */
  @media screen and (min-width: 1300px) {
    display: none;
  }
`;

/* Page numbers only shows on larger displays */
const PageNumbers = styled.ul`
  display: flex;
  justify-content: center;
  list-style: none;
  padding: 0;
  color: var(--white);
  font-size: 1.2em;
`;

const PageNumber = styled.li`
  margin-left: 1em;
  margin-right: 1em;
  user-select: none;
  cursor: pointer;
  border-bottom: ${props => (props.isActive ? '1px solid var(--white)' : '')};

  @media screen and (max-width: 1300px) {
    display: none;
  }
`;

const PaginateArrow = styled.button`
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
  // let countries = [...data];
  const [countries, setCountries] = useState(data);
  const { lastUpdated } = countries[0].stats;
  // const [searchValue, setSearchValue] = useState('');
  const [selectedSort, setSelectedSort] = useState({
    prop: 'name',
    direction: 'descending'
  });
  const [pagination, setPagination] = useState({
    currentPage: 1,
    itemsPerPage: 10
  });

  const handleSearch = event => {
    const search = event.target.value;
    if (search === '') setCountries(data);
    else {
      const filteredCountries = data.filter(country =>
        country.name.toLowerCase().includes(search.toLowerCase())
      );
      if (filteredCountries.length === 0) {
        setCountries([
          {
            name: 'error',
            message: 'no countries found',
            stats: {
              confirmed: 1092,
              deceased: 36,
              recovered: 150,
              lastUpdated: '4/21/20'
            }
          }
        ]);
      } else setCountries(filteredCountries);
    }
  };

  const sortCountries = ({ prop, direction }) => {
    if (countries.length) {
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

  const handlePagination = e => {
    setPagination({ currentPage: Number(event.target.id), itemsPerPage: 10 });
  };

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

  const stepPagination = (e, step) => {
    if (step === 'start')
      setPagination({
        currentPage: 1,
        itemsPerPage: 10
      });
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
    if (step === 'end')
      setPagination({
        currentPage: pageNumbers.length,
        itemsPerPage: 10
      });
  };

  return (
    <TableContainer>
      <TableHeader>
        <h4>Last Update: {lastUpdated}</h4>
        <TableSearch
          type="search"
          placeholder="Search..."
          onChange={handleSearch}
        ></TableSearch>
      </TableHeader>
      <Table>
        <thead>
          <tr>
            {['name', 'confirmed', 'deceased', 'recovered'].map((val, i) => (
              <th
                className={`${val}_header`}
                key={`${i}_${val}`}
                width="25%"
                onClick={e => {
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
          {countries[0].name === 'error' ? (
            <tr>
              <td colSpan="4">no countries found</td>
            </tr>
          ) : (
            currentCountries.map((val, i) => (
              <tr key={`${i}_${val}`}>
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
            ))
          )}
        </tbody>
      </Table>
      <Pagination>
        <PaginateArrow
          onClick={e => stepPagination(e, 'start')}
          disabled={pagination.currentPage === 1}
        >
          {'<<'}
        </PaginateArrow>
        <PaginateArrow
          onClick={e => stepPagination(e, 'decrement')}
          disabled={pagination.currentPage === 1}
        >
          {'<'}
        </PaginateArrow>
        {/* <PageNumbers>{renderPageNumbers}</PageNumbers> */}
        <PageNumbers>
          {pageNumbers.map(number => (
            <PageNumber
              key={number}
              id={number}
              isActive={number === pagination.currentPage}
              // className={number === pagination.currentPage ? 'active' : ''}
              onClick={e => {
                handlePagination(e);
              }}
            >
              {number}
            </PageNumber>
          ))}
        </PageNumbers>
        <CurrentPage>{pagination.currentPage}</CurrentPage>
        <PaginateArrow
          onClick={e => stepPagination(e, 'increment')}
          disabled={pagination.currentPage === pageNumbers.length}
        >
          {'>'}
        </PaginateArrow>
        <PaginateArrow
          onClick={e => stepPagination(e, 'end')}
          disabled={pagination.currentPage === pageNumbers.length}
        >
          {'>>'}
        </PaginateArrow>
      </Pagination>
    </TableContainer>
  );
}
