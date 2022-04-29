import Head from 'next/head';
import Link from 'next/link';

import Layout from '../app/Layout';

export default function Home() {
  return (
    <>
      <Head>
        <title>Home Page</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <Link href="./registr">
          <a>Registration</a>
        </Link>
        <Link href="./login">
          <a>Login</a>
        </Link>
      </Layout>
    </>
  );
}
