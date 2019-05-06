import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import Annotation from './components/annotation';
import store from './store';

import './index.css';

const App = () => (
  <Provider store={store}>
    <Annotation />
  </Provider>
);

ReactDOM.render(<App />, document.getElementById('root'));
