import { useState } from 'react';
import styled from 'styled-components';
import AsyncSelect from 'react-select/async';

import Loading from '../shared/Loading';
import useData from '../../utils/useData';
import CountryStats from './CountryStats';

export default function CountrySelector() {
  
  const { data, loading, error } = useData(
    'https://coronavirus-world-api.now.sh/api/country'
  );

  const countryOptions = data?.countries.map((country, i) => ({
    label: country.name === 'US' ? 'United States of America' : country.name,
    value: i
  }));

  const filterCountries = inputValue => {
    return countryOptions.filter(i =>
      i.label.toLowerCase().includes(inputValue.toLowerCase())
    );
  };

  const promiseOptions = inputValue =>
    new Promise(resolve => {
      setTimeout(() => {
        resolve(filterCountries(inputValue));
      }, 100);
    });

  const CountrySelectorHeader = styled.div`
    div {
      display: flex;
      align-items: center;
    }

    select {
      background-color: #333333;
      color: #fff;
      margin-bottom: 1em;
    }
  `;

  const CountrySelectContainer = styled.div`
    margin-bottom: 1.5em;
    width: 30%;

    @media screen and (max-width: 696px) {
      width: 100%;
    }
  `;

  const setCountry = e => {
    setSelectedCountry(data.countries[e.value]);
  };

  const [selectedCountry, setSelectedCountry] = useState({
    name: 'Italy',
    code: 'IT'
  });

  const customStyles = {
    valueContainer: (provided, state) => ({
      ...provided,
      background: '#333333'
    }),
    control: (provided, state) => ({
      ...provided,
      background: '#333333'
    }),
    dropdownIndicator: (provided, state) => ({
      ...provided,
      color: 'grey'
    }),
    input: (provided, state) => ({
      ...provided,
      color: '#fff'
    }),
    singleValue: (provided, state) => ({
      ...provided,
      color: '#fff'
    }),
    menu: (provided, state) => ({
      ...provided,
      backgroundColor: '#333333',
      color: '#fff'
    }),
    option: (provided, state) => ({
      ...provided,
      color: '#fff',
      backgroundColor: state.isFocused ? '#2684FF' : '#333333'
    })
  };

  if (loading) return <Loading></Loading>;
  if (error) return <p style={{ color: '#fff' }}>Error...</p>;

  return (
    <>
      <CountrySelectorHeader>
        <div>
          <h3 className="title">Stats for {selectedCountry.name} </h3>
          <img
            src={`https://www.countryflags.io/${selectedCountry.code}/flat/32.png`}
          />
        </div>
      </CountrySelectorHeader>
      <CountrySelectContainer>
        <AsyncSelect
          placeholder="Select Country..."
          cacheOptions
          defaultOptions
          loadOptions={promiseOptions}
          styles={customStyles}
          onChange={e => {
            setCountry(e);
          }}
        />
      </CountrySelectContainer>
      <CountryStats
        url={encodeURI(
          `https://coronavirus-world-api.now.sh/api/country/${selectedCountry.code}?detailed=true`
        )}
      ></CountryStats>
    </>
  );
}
