import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { store, persistor } from './redux/store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';
import LoadingView from './components/loading-view';

ReactDOM.render(
    <Provider store={store}>
        {/* The <LoadingView> will be rendered until the state has been rehydrated. Then <App> will be shown. */}
        <PersistGate loading={<LoadingView />} persistor={persistor}>
            <App />
        </PersistGate>
    </Provider>, document.querySelector('#root'));