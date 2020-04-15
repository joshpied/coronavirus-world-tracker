import Head from 'next/head';
import { createGlobalStyle } from 'styled-components';

import Header from './Header';
import Footer from './Footer';

const GlobalStyle = createGlobalStyle`
  :root {
    --red: #dc3545;
    --blue: #17a2b8;
    --green: #2AA744;
    --white: #fff;
    --black: #2b2a2a;
  }

  html {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }

  body {
    background: var(--black);
    margin: 0;
  }

  .title {
    text-transform: uppercase;
    letter-spacing: 5px;
    color: #fff;
  }

  .mapContainer {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    height: 85vh;
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
      <Header />
      {props.children}
      <Footer />
    </>
  );
}
