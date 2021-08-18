import type { AppProps } from 'next/app';

import '../styles/globals.css';
import '../styles/instantsearch.css';

// E-commerce page
import '../src/e-commerce/Theme.css';
import '../src/e-commerce/App.css';
import '../src/e-commerce/App.mobile.css';
// import '../src/e-commerce/widgets/Pagination.css';

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
