import { createSlice } from '@reduxjs/toolkit'
import data from './mockData.json';

const PER_PAGE = parseInt(process.env.REACT_APP_PER_PAGE);

const calculatePage = (state) => {
    state.sortOrder = state.sortOrder === "asc" ? "desc" : "asc";
    const sorted = state.data.sort((a, b) => {
      if (state.sortOrder === "asc") {
        return new Date(a.startDate) - new Date(b.startDate);
      } else {
        return new Date(b.startDate) - new Date(a.startDate);
      }});
    return sorted.slice(state.page * PER_PAGE, (state.page + 1) * PER_PAGE);
};

export const tableStateManage = createSlice({
  name: 'state',
  initialState: {
    page:0,
    displayedData : data.slice(0, 10),
    data,
    sortOrder : 'asc'
  },
  reducers: {
    sortOrderChange: (state) => {
      state.displayedData = calculatePage(state);
    },

    changePage: (state, page) => {
      console.log('new page', page.payload)
      state.page = page.payload;
      state.displayedData = calculatePage(state);
    }
  }
})

export const { sortOrderChange, changePage } = tableStateManage.actions

export default tableStateManage.reducer