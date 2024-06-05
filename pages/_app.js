import '../src/app/globals.css';
import { Provider } from 'react-redux';
import store from '../src/app/Store/Store';
import Navbar from '../src/app/components/Navbar';

function MyApp({ Component, pageProps }) {
  return (
    
    <Provider store={store} className="bg-white">
        <Navbar />
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;