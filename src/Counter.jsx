import React, { useState } from 'react';
import { applyMiddleware, createStore } from 'redux';
import reducer from './Reducer';
import { fetchUserData, showError } from './Action';
import {thunk}  from 'redux-thunk';
import axios from 'axios';


const store = createStore(reducer,applyMiddleware(thunk))

function dataFetch(){
  return function(){
    axios.get("https://jsonplaceholder.typicode.com/users")
    .then(res=>{
      const users = res.data;
      store.dispatch(fetchUserData(users))
    })
    .catch(error=>{
      store.dispatch(showError(error.message))
    })
}}


export default function Counter() {

  const [info, setInfo] = useState([]);

  const unsubscribe = store.subscribe(()=>{
    setInfo(store.getState().users)
  })  

  return (
    <div>
      {info.map(item=>{
        return <div key={item.id}>
            <h2>{item.name}</h2>
            <h3>{item.email}</h3>
          <hr></hr>
        </div>
      })}
      <button onClick={store.dispatch(dataFetch)}>Fetch Data</button>
  </div>
  )
}