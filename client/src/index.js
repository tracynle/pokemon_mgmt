import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
// ADD YOUR STORE 
import { createStore, applyMiddleware, compose } from 'redux';
// Combined Reducers
import reducers from './reducers';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from "redux-devtools-extension";


const store = createStore(
    reducers,
    compose(
        applyMiddleware(thunk), // NEEDS TO BE FIRST
        composeWithDevTools(),
    )
);

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();


