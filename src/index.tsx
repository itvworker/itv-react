import React from 'react';
import ReactDOM from 'react-dom';
import './index.less';
import App from './App';
// import reportWebVitals from './reportWebVitals';
import 'lib-flexible'
import store from './store';

store.dispatch({
  type:"uid",
  uid:"123"
})

const reducer = (state, action)=>{
    state.uid="1324324234"
}
reducer(store.getState(), {type:"UID", data: 10})

console.log(store.getState());



ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
