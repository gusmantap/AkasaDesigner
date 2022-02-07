import '../styles/globals.css';
import './styles.css';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import { StoreProvider } from '../designer/context';

// This default export is required in a new `pages/_app.js` file.
export default function MyApp({ Component, pageProps }) {
	return (
		// <StoreProvider>
			<>
				<Component {...pageProps} />
			</>
		// </StoreProvider>
	);
  }

