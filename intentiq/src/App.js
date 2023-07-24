import React, { useMemo } from 'react';
import tableGen from './Table';
import { useSelector, useDispatch } from 'react-redux'
import { sortOrderChange, changePage } from './tableStateManage'

function App() {
  const {page, displayedData, sortOrder, data} = useSelector(state => (state.state));
  const dispatch = useDispatch()
  console.log(page)
  const table = useMemo(() =>(
    tableGen({dataLength: data.length, displayedData, changePage, sortOrderChange, page, sortOrder, dispatch})
  ), [displayedData])

  return (
    <div style={{padding: '64px 0 0 64px'}}>
      {table}
  </div>
  );
}

export default App;