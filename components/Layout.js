import Head from 'next/head';
import Link from 'next/link';

import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  html {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }

  body {
    background: #2b2a2a;
    margin: 0;
  }

	header {
    margin: 0;
    padding-left: 5%;
    padding-right: 5%;
		display: flex;
		justify-content: space-between;
		align-self: center;
    /* frosted glass background, doesn't work in firefox */
    @supports (-webkit-backdrop-filter: none) or (backdrop-filter: none) { 
      background-color: rgba(43, 42, 42, .15);   
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
          font-size: calc(0.75em + 1vmin);
          font-weight: bold;
          text-decoration: none;
          display: flex;
          align-items: flex-start;
          color: #dedddd;
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

  footer {
    margin: 1.5em 5% 1.5em 5%;
    a {
      color: #dedddd;
      text-decoration: none;
      &:hover, &:focus {
        color: #fff;
        text-shadow: 0 5px 15px rgba(145, 92, 182, .4);
      }
    }

    span.year {
      color: #fff;
    }

  }

	@media screen and (max-width: 696px) {
    header {
      flex-direction: column;

			h1 {
				text-align: center;
        margin-bottom: 0;
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
        <link href="/images/favicon.ico" rel="icon" />
        <link rel="apple-touch-icon" href="/static/icon.png" />
        <meta
          name="apple-mobile-web-app-title"
          content="Coronavirus World Tracker"
        />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="mobile-web-app-capable" content="yes" />
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
              <Link href="/country">
                <a>country</a>
              </Link>
            </li>
            <li>
              <Link href="/compare">
                <a>compare</a>
              </Link>
            </li>
          </ul>
        </nav>
      </header>
      {props.children}
      <footer className="text-light">
        <a
          href="https://github.com/joshpied"
          target="_blank"
          rel="noopener noreferrer"
        >
          Josh Piedimonte
        </a>{' '}
        <span className="year">{new Date().getFullYear()}</span>
      </footer>
    </>
  );
}
