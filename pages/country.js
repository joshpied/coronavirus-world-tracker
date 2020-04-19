import styled from 'styled-components';

import CountrySelector from '../components/country/CountrySelector';

const Country = styled.main`
  margin-left: 5%;
  margin-right: 5%;
`;

export default function CountryPage() {
  return (
    <Country>
      <CountrySelector></CountrySelector>
    </Country>
  );
}
