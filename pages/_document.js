import Document, { Head, Main, NextScript } from 'next/document';

export default class MyDocument extends Document {

  render() {
    return (
      <html>
        <Head>
          <link rel="shortcut icon" href="/images/vercel.svg" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}
