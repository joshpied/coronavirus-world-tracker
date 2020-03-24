import Head from 'next/head';
import Link from 'next/link';

import { createGlobalStyle } from 'styled-components';
const GlobalStyle = createGlobalStyle`
  html {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }

  body {
    background: #2b2a2a;
  }

	header {
    margin-left: 5%;
    margin-right: 5%;
		display: flex;
		justify-content: space-between;
		align-self: center;

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
          font-size: 1.6rem;
          font-weight: bold;
          text-decoration: none;
          display: flex;
          align-items: flex-start;
          color: #949090;
          &:hover, &:focus {
            color: #fff;
            text-shadow: 0 5px 15px rgba(145, 92, 182, .4);
            span {
              color: black; 
            }
          }
        }
			}
		}
  }

	@media screen and (max-width: 696px) {
    header {
      flex-direction: column;

			h1 {
				text-align: center;
      }
		}
	}

  .title {
    text-transform: uppercase;
    letter-spacing: 5px;
    color: #fff;
  }
`;

export default function Layout(props) {
  return (
    <>
      <Head>
        <title>Coronavirus World Tracker</title>
        <meta charSet="utf-8" />
        <meta content="width=device-width, initial-scale=1" name="viewport" />
        <link href="../static/images/favicon.ico" rel="icon" />
        <link
          href="https://api.tiles.mapbox.com/mapbox-gl-js/v1.8.1/mapbox-gl.css"
          rel="stylesheet"
        />
        <meta
          content="Track up to date worldwide COVID19 statistics"
          name="description"
        />
      </Head>
      <GlobalStyle />
      <header>
        <h1>COVID-19 Tracker</h1>
        <nav role="navigation">
          <ul>
            <li>
              <Link href="/">
                <a>world</a>
              </Link>
            </li>
            <li>
              <Link href="/CountryStats">
                <a>country</a>
              </Link>
            </li>
            {/* <li>
              <Link href="/map">
                <a>map</a>
              </Link>
            </li> */}
          </ul>
        </nav>
      </header>
      {props.children}
    </>
  );
}
