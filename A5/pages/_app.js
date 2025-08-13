import '@/styles/globals.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Layout from '@/components/Layout';

// SWR
import { SWRConfig } from 'swr';

// jotai
import { Provider } from 'jotai';

export default function App({ Component, pageProps }) {
  return (
    // SWRConfig sets up 
    <SWRConfig value={{
      // fetches data from a URL and returns as JSON
      fetcher: (...args) => fetch(...args).then((res) => res.json())
    }}>
      {/* jotai provider */}
      <Provider>
        {/* layout component */}
        <Layout>
          {/* the current page */}
          <Component {...pageProps} />
        </Layout>
      </Provider>
    </SWRConfig>
  );
}
