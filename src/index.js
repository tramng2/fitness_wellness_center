import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { DataProvider, DataContext } from './DataContext'
import reducer, { initialState } from './reducer'


ReactDOM.render(
  <DataProvider reducer={reducer} initialState={initialState}>
    <App />
  </DataProvider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
