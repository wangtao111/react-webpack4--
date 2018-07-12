import React from 'react';  // 必须引入
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { Provider } from 'react-redux';
import App from "./components/App";

import store from './store';
ReactDOM.render(
    <Provider store={store}>
        <AppContainer>
          <App/>
        </AppContainer>
    </Provider>,
  document.getElementById('main')
);
if (module.hot) {
  module.hot.accept();
}
