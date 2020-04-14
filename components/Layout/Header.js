import Link from 'next/link';
import styled from 'styled-components';

const HeaderContainer = styled.header`
  margin: 0;
  padding-left: 5%;
  padding-right: 5%;
  display: flex;
  justify-content: space-between;
  align-self: center;
  z-index: 2; /* keep header on top for map */
  
  /* frosted glass background, doesn't work in firefox */
  @supports (-webkit-backdrop-filter: none) or (backdrop-filter: none) {
    background-color: rgba(43, 42, 42, 0.15);
    backdrop-filter: blur(25px);
    /* stick nav */
    position: sticky;
    top: 0;
  }

  h1 {
    text-transform: uppercase;
    letter-spacing: 5px;
    color: #fff;
  }

  nav {
    align-self: center;

    ul {
      margin: 0;
      padding: 0;
      display: flex;
      list-style: none;

      a {
        text-transform: uppercase;
        letter-spacing: 5px;
        padding: 1.25rem 0.5rem;
        font-size: calc(0.75em + 1.5vmin);
        font-weight: bold;
        text-decoration: none;
        display: flex;
        align-items: flex-start;
        color: #dedddd;
        &:hover,
        &:focus {
          color: #fff;
          text-shadow: 0 5px 15px rgba(145, 92, 182, 0.4);
          span {
            color: black;
          }
        }
      }
    }
  }

  @media screen and (max-width: 696px) {
    flex-direction: column;

    h1 {
      text-align: center;
      margin-bottom: 0;
    }

    nav {
      ul {
        a {
          font-size: 2.5vmin;
        }
      }
    }
  }
`;

export default function Header() {
  return (
    <HeaderContainer>
      <h1>COVID-19 Tracker</h1>
      <nav role="navigation">
        <ul>
          <li>
            <Link href="/">
              <a>world</a>
            </Link>
          </li>
          <li>
            <Link href="/country">
              <a>country</a>
            </Link>
          </li>
          <li>
            <Link href="/compare">
              <a>compare</a>
            </Link>
          </li>
          <li>
            <Link href="/map">
              <a>map</a>
            </Link>
          </li>
        </ul>
      </nav>
    </HeaderContainer>
  );
}
