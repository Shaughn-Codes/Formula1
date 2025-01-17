import Head from 'next/head';
import '/src/app/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Quali: F1 Stats, News, and Schedule</title>
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
