import styled from 'styled-components';

import Layout from '../components/Layout';
import CountrySelector from '../components/CountrySelector';

const CountryStats = styled.main`
  margin-left: 5%;
  margin-right: 5%;
`;

export default function IndexPage() {
  return (
    <Layout>
      <CountryStats>
        <CountrySelector></CountrySelector>
      </CountryStats>
    </Layout>
  );
}
