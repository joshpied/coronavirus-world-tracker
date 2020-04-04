import Head from 'next/head';
import styled from 'styled-components';

const FooterContainer = styled.footer`
  margin: 1.5em 5% 1.5em 5%;
  a {
    color: #dedddd;
    text-decoration: none;
    &:hover,
    &:focus {
      color: #fff;
      text-shadow: 0 5px 15px rgba(145, 92, 182, 0.4);
    }
  }

  span.year {
    color: #fff;
  }
`;

export default function Footer() {
  return (
    <FooterContainer className="text-light">
      <a
        href="https://github.com/joshpied"
        target="_blank"
        rel="noopener noreferrer"
      >
        Josh Piedimonte
      </a>{' '}
      <span className="year">{new Date().getFullYear()}</span>
    </FooterContainer>
  );
}
