import React, { useState, useEffect, useMemo } from 'react';
import data from './mockData.json';
import tableGen from './Table';

function App() {
  const [page, setPage] = useState(0);
  const [tableData, setTableData] = useState(data);
  const [displayedData, setDisplayedData] = useState([]);
  const [sortOrder, setSortOrder] = React.useState("asc");
  const rowsPerPage = 10;

  useEffect(() => {
    const sorted = tableData.sort((a, b) => {
      if (sortOrder === "asc") {
        return new Date(a.startDate) - new Date(b.startDate);
      } else {
        return new Date(b.startDate) - new Date(a.startDate);
      }});
    setDisplayedData( sorted.slice(page * rowsPerPage, (page + 1) * rowsPerPage));
  }, [tableData, page, sortOrder]);
  
  const handleSortOrderChange = () => {
    setSortOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));
  };

  const handleChangePage = (event, newPage) => {
     setPage(newPage);
  };

  const table = useMemo(() =>(
    tableGen({displayedData, handleChangePage, handleSortOrderChange, page, sortOrder, data, rowsPerPage})
  ), [displayedData])

  return (
    <div style={{padding: '64px 0 0 64px'}}>
      {table}
  </div>
  );
}

export default App;
