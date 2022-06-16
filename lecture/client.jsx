// script로 불러오는 대신 npm에 설치했던것을 import 할 수 있음 js에서 하던것처럼 :)
const React = require('react');
const ReactDom = require('react-dom');
const { default: App } = require('../src/App');

ReactDom.render(<App />, document.querySelector('#root'));

// 이런 느낌이겠지
// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import './index.css';
// import App from './App';
// import reportWebVitals from './reportWebVitals';

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );