import '../src/app/globals.css';
import { Provider } from 'react-redux';
import store from '../src/app/Store/Store';
import Navbar from '../src/app/components/Navbar';
import Footer from '../src/app/components/Footer';

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1">
          <Component {...pageProps} />
        </main>
        <Footer />
      </div>
    </Provider>
  );
}

export default MyApp;