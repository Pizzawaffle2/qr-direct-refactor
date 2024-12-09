import '@/app/globals.css';
import type { AppProps } from 'next/app';
import Layout from '../components/UI/Layout';
import { UserProvider } from '@auth0/nextjs-auth0/client';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <UserProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </UserProvider>
  );
}
