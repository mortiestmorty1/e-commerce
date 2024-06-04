'use client';

import { Provider } from 'react-redux';
import store from './Store/Store.js';

export function Providers({ children }) {
  return <Provider store={store}>{children}</Provider>;
}