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
    /* sticky nav */
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
        display: flex;
        align-items: stretch;
        text-transform: uppercase;
        letter-spacing: 3px;
        padding: 1.25rem 0.5rem;
        /* font-size: calc(0.75em + 1.5vmin); */
        font-size: 24px;
        font-weight: bold;
        text-decoration: none;
        color: #dedddd;

        /* filter color for #fff */
        img {
          filter: invert(100%) sepia(0%) saturate(7443%) hue-rotate(65deg)
            brightness(112%) contrast(73%);
          margin-right: 6px;
        }
        &:hover,
        &:focus {
          text-shadow: 0 5px 15px rgba(145, 92, 182, 0.4);
          span {
            color: #fff;
          }
          /* filter color for #dedddd */
          img {
            filter: invert(100%) sepia(0%) saturate(7459%) hue-rotate(331deg)
              brightness(94%) contrast(103%);
          }
        }
      }
    }
  }

  @media screen and (max-width: 910px) {
    flex-direction: column;
    h1 {
      text-align: center;
    }
    nav {
      align-self: auto;
      ul {
        justify-content: space-between;
        align-self: none;
      }
    }
  }

  @media screen and (max-width: 696px) {
    h1 {
      text-align: center;
      margin-bottom: 0;
      font-size: calc(0.75em + 1.5vmin);
    }

    nav {
      ul {
        a {
          flex-direction: column;
          font-size: 3.5vmin;
          letter-spacing: 3px;
          img {
            margin-right: 0;
          }
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
              <a>
                <img src="/images/icons/globe.svg" />
                <span>world</span>
              </a>
            </Link>
          </li>
          <li>
            <Link href="/country">
              <a>
                <img src="/images/icons/flag.svg" />
                <span>country</span>
              </a>
            </Link>
          </li>
          <li>
            <Link href="/compare">
              <a>
                <img src="/images/icons/bar-chart-2.svg" />
                <span>compare</span>
              </a>
            </Link>
          </li>
          <li>
            <Link href="/map">
              <a>
                <img src="/images/icons/map.svg" />
                <span>map</span>
              </a>
            </Link>
          </li>
        </ul>
      </nav>
    </HeaderContainer>
  );
}
