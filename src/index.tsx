import ReactDOM from 'react-dom/client';

import App from './component/App/App';
import './index.module.scss';

// eslint-disable-next-line import/order, import/no-extraneous-dependencies
import { Provider } from 'react-redux';

import store from './store';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <App />
  </Provider>
);
