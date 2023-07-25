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

export const stateManage = createSlice({
  name: 'state',
  initialState: {
    page:0,
    displayedData : data.slice(0, 10),
    data,
    sortOrder : 'asc',
    activeRowHover: undefined,
    openCreatDrawer: false,
    createActiveStep: 0
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

    onOpenCreatDrawer: (state) =>{
      state.openCreatDrawer = true
    },
    onCloseCreatDrawer: (state) =>{
      state.openCreatDrawer = false
    },
    setCreateActiveStep: (state, newStep) =>{
      state.createActiveStep = newStep.payload;
    }
  }
})

export const { sortOrderChange, changePage, setActiveRowHover, onOpenCreatDrawer, onCloseCreatDrawer, setCreateActiveStep} = stateManage.actions

export default stateManage.reducer