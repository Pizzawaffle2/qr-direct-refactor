import { useEffect } from 'react';
import { useRouter } from 'next/router';

import { AppProps } from 'next/app';

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  useEffect(() => {
    const redirectAfterLogin = localStorage.getItem('redirectAfterLogin');
    if (redirectAfterLogin) {
      localStorage.removeItem('redirectAfterLogin');
      router.push(redirectAfterLogin);
    }
  }, []);

  return <Component {...pageProps} />;
}

export default MyApp;
