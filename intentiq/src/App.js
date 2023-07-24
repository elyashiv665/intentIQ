import React, { useMemo } from 'react';
import tableGen from './Table';
import { useSelector, useDispatch } from 'react-redux'
import { sortOrderChange, changePage, setActiveRowHover } from './tableStateManage'

function App() {
  const {page, displayedData, sortOrder, data, activeRowHover} = useSelector(state => (state.state));
  const dispatch = useDispatch()

  const table = useMemo(() =>(
    tableGen({dataLength: data.length, displayedData, changePage, sortOrderChange, page, sortOrder, dispatch, setActiveRowHover, activeRowHover})
  ), [displayedData, activeRowHover])

  return (
    <div style={{padding: '64px 0 0 64px'}}>
      {table}
  </div>
  );
}

export default App;