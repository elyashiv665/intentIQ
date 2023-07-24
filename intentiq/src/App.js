import React, { useMemo } from 'react';
import tableGen from './Table';
import { useSelector, useDispatch } from 'react-redux'
import { sortOrderChange, changePage, setActiveRowHover, onOpenDrawer, onCloseDrawer } from './tableStateManage'

function App() {
  const {page, displayedData, sortOrder, data, activeRowHover, openDrawer} = useSelector(state => (state.state));
  const dispatch = useDispatch()
  const table = useMemo(() =>(
    tableGen({
        dataLength: data.length,
        displayedData, changePage,
        sortOrderChange,
        page,
        sortOrder,
        dispatch,
        setActiveRowHover,
        activeRowHover,
        onOpenDrawer,
        onCloseDrawer,
        openDrawer
      })
  ), [displayedData, activeRowHover, openDrawer])

  return (
    <div style={{padding: '64px 0 0 64px'}}>
      {table}
  </div>
  );
}

export default App;