// index.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import {persistor, store} from './store/store';
import App from "./App";
import {SnackbarProvider} from "notistack";
import {PersistGate} from "redux-persist/integration/react";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <SnackbarProvider>
            <App/>
          </SnackbarProvider>
        </PersistGate>
    </Provider>
);
