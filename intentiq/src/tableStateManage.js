import { createSlice } from '@reduxjs/toolkit'
import data from './mockData.json';

const PER_PAGE = parseInt(process.env.REACT_APP_PER_PAGE);

const calculatePage = (state) => {
    return state.data.slice(state.page * PER_PAGE, (state.page + 1) * PER_PAGE);
};
const calculateSort = (state) => {
  const sorted = state.data.sort((a, b) => {
    if (state.sortOrder === "asc") {
      return new Date(a.startDate) - new Date(b.startDate);
    } else if(state.sortOrder === 'desc') {
      return new Date(b.startDate) - new Date(a.startDate);
    }else{
      return true
    }});
  return sorted;
};

export const tableStateManage = createSlice({
  name: 'state',
  initialState: {
    page:0,
    displayedData : data.slice(0, 10),
    data,
    sortOrder : 'asc',
    activeRowHover: undefined,
    openDrawer: false
  },
  reducers: {
    sortOrderChange: (state) => {
      state.sortOrder = state.sortOrder === "asc" ? "desc" : "asc";
      state.data = calculateSort(state);
      state.displayedData = calculatePage(state);
    },

    changePage: (state, page) => {
      state.page = page.payload;
      state.displayedData = calculatePage(state);
    },

    setActiveRowHover: (state, customer) => {
      state.activeRowHover = customer.payload;
    },

    onOpenDrawer: (state) =>{
      state.openDrawer = true
    },
    onCloseDrawer: (state) =>{
      console.log('onCloseDrawer')
      state.openDrawer = false
    }
  }
})

export const { sortOrderChange, changePage, setActiveRowHover, onOpenDrawer, onCloseDrawer } = tableStateManage.actions

export default tableStateManage.reducer