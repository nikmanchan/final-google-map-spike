import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App/App';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import { takeEvery, call, put } from 'redux-saga/effects';
import axios from 'axios';


function* rootSaga() {
    yield takeEvery('GET_ADDRESS', getAddress);
  }

function* getAddress(action) {
try {
    const address = yield call(axios.get, 
        `https://cors.io/?https://maps.googleapis.com/maps/api/place/textsearch/json?query=restaurants+in+Sydney&key=AIzaSyCZv9A4Vtnra6r04z9JnNk91zeXwX82O68`
    // `https://cors.io/?https://maps.googleapis.com/maps/api/place/findplacefromtext/json?
    // input=${action.payload.input}
    // &inputtype=textquery
    // &fields=photos,formatted_address,name,rating&key=AIzaSyCZv9A4Vtnra6r04z9JnNk91zeXwX82O68&`
);
    yield put({ type: 'SET_ADDRESS', payload: address.data });
} catch (error) {
    console.log('error getting address:', error);
}
}

const sagaMiddleware = createSagaMiddleware();

const mapRequest = (state = [], action) => {
    switch (action.type) {
      case 'SET_ADDRESS':
        return action.payload;
      default:
        return state;
    }
};


const store = createStore(
    combineReducers({ mapRequest }),
    applyMiddleware(
        logger,
        sagaMiddleware,
    )
);

sagaMiddleware.run(rootSaga);

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>
    , document.getElementById('root'));