import Head from 'next/head';
import { createGlobalStyle } from 'styled-components';

import Header from './Header';
import Footer from './Footer';

const GlobalStyle = createGlobalStyle`
  html {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }

  body {
    background: #2b2a2a;
    margin: 0;
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
      <Header />
      {props.children}
      <Footer />
    </>
  );
}
