import styled from 'styled-components';

import Layout from '../components/Layout';
import CountrySelector from '../components/country/CountrySelector';

const Country = styled.main`
  margin-left: 5%;
  margin-right: 5%;
`;

export default function CountryPage() {
  return (
    <Layout>
      <Country>
        <CountrySelector></CountrySelector>
      </Country>
    </Layout>
  );
}
