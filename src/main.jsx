import React from 'react';
import ReactDOM from 'react-dom/client';
import { HangedApp } from './HangedApp.jsx';
import { Provider } from 'react-redux';
import store from './store/store';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';


ReactDOM.createRoot(document.getElementById('root')).render(
    <Provider store={ store }>
        <React.StrictMode>
            <HangedApp/>
        </React.StrictMode>
    </Provider>,
);
