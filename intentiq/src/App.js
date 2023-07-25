import React from 'react';
import TableGen from './Table';
import {  useDispatch } from 'react-redux'

function App() {
  const dispatch = useDispatch()

  return (
    <div style={{padding: '64px 0 0 64px'}}>
      { TableGen(dispatch)}
  </div>
  );
}

export default App;