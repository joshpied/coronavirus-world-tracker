import { useState } from 'react';
import styled from 'styled-components';

import useStats from '../utils/useStats';
import Stats from './Stats';

export default function CountrySelector() {
  
  const { stats: countries, loading, error } = useStats(
    'https://covid19.mathdro.id/api/countries'
  );

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

  const [selectedCountry, setSelectedCountry] = useState('Italy');
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error...</p>;

  
  return (
    <div>
      <CountrySelectorHeader>
        <div>
          <h2 className="title">Stats for {selectedCountry} </h2>
          <img
            src={`https://www.countryflags.io/${countries.countries[selectedCountry]}/flat/32.png`}
          />
        </div>

        <select
          onChange={e => {
            setSelectedCountry(e.target.value);
          }}
        >
          {Object.entries(countries.countries).map(([country, code]) => (
            <option
              selected={selectedCountry === country}
              key={country}
              value={country}
            >
              {country}
            </option>
          ))}
        </select>
      </CountrySelectorHeader>
      <Stats
        url={encodeURI(
          `https://covid19.mathdro.id/api/countries/${selectedCountry}`
        )}
      ></Stats>
    </div>
  );
}
