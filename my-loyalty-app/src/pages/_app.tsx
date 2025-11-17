import '../styles/global.css';
import type { AppProps } from 'next/app';
import { AuthProvider } from '../context/AuthContext';
import Header from '../components/Header';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <Header />
      <main className="pt-6">
        <Component {...pageProps} />
      </main>
    </AuthProvider>
  );
}

export default MyApp;
