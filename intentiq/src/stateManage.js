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

const fieldsPerStep = {
  'Details': [{
     id: 'startDate',
     label: 'Start Date',
     value: ''
    },{
      id: 'endDate',
      label: 'End Date',
      value: ''

     },{
      id: 'customer',
      label: 'Customer',
      value: ''

     },{
      id: 'director',
      label: 'Director',
      value: -1

     }],
  'Configuratins': [{
      id: 'impression',
      label: 'Impression',
      value: -1

    },{
      id: 'conversion',
      label: 'Conversion',
      value: -1

    },{
      id: 'attributeMatches',
      label: 'Attribute Matches',
      value: -1

    }],
  'Tags': [],
  'Alerts': [{
    id: 'conversionRate',
    label: 'Conversion Rate',
    value: -1

  },{
    id: 'avgTimeToConversion',
    label: 'avg. Time To Conversion',
    value: -1

  },{
    id: 'avgFrequency',
    label: 'avg. Frequency',
    value: -1

  }]

}

export const stateManage = createSlice({
  name: 'state',
  initialState: {
    page:0,
    displayedData : data.slice(0, 10),
    data,
    sortOrder : 'asc',
    activeRowHover: undefined,
    openCreatDrawer: false,
    createActiveStep: 'Details',
    fieldsPerStep:  JSON.stringify(fieldsPerStep)
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
    },
    setCreateActiveField: (state, data) =>{
      const {fieldId, value} = data.payload;
      const updateJson =  JSON.parse(state.fieldsPerStep);
      updateJson[state.createActiveStep].find(field => field.id === fieldId).value = value;
      state.fieldsPerStep = JSON.stringify(updateJson);
    },
    createNewCostumer: (state, data) =>{
      console.log('createNewCostumer', data.payload)
    }
  }
})

export const { sortOrderChange, changePage, setActiveRowHover, onOpenCreatDrawer, onCloseCreatDrawer, setCreateActiveStep, setCreateActiveField, createNewCostumer} = stateManage.actions

export default stateManage.reducer