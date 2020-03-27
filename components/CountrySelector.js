import { useState } from 'react';
import styled from 'styled-components';
import AsyncSelect from 'react-select/async';

import useStats from '../utils/useStats';
import Stats from './Stats';

export default function CountrySelector() {
  const { stats: countries, loading, error } = useStats(
    'https://covid19.mathdro.id/api/countries'
  );

  const countryOptions = countries?.countries.map((country, i) => ({
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
    setSelectedCountry(countries.countries[e.value]);
  };

  const [selectedCountry, setSelectedCountry] = useState({
    name: 'Italy',
    iso2: 'IT'
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error...</p>;

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

  return (
    <div>
      <CountrySelectorHeader>
        <div>
          <h2 className="title">Stats for {selectedCountry.name} </h2>
          <img
            src={`https://www.countryflags.io/${selectedCountry.iso2}/flat/32.png`}
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
      <Stats
        url={encodeURI(
          `https://covid19.mathdro.id/api/countries/${selectedCountry.name}`
        )}
      ></Stats>
    </div>
  );
}
