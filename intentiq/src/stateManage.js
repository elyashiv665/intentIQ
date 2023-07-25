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

// const fieldsIds = ['Details', 'Configuratins', 'Tags', 'Alerts'];

const fieldsPerStep = {
  'Details': [{
     id: 'startDate',
     label: 'Start Date',
     value: undefined
    },{
      id: 'endDate',
      label: 'End Date',
      value: undefined

     },{
      id: 'customer',
      label: 'Customer',
      value: undefined

     },{
      id: 'director',
      label: 'Director',
      value: undefined

     }],
  'Configuratins': [{
      id: 'impression',
      label: 'Impression',
      value: undefined

    },{
      id: 'conversion',
      label: 'Conversion',
      value: undefined

    },{
      id: 'attributeMatches',
      label: 'Attribute Matches',
      value: undefined

    }],
  'Tags': [],
  'Alerts': [{
    id: 'conversionRate',
    label: 'Conversion Rate',
    value: undefined

  },{
    id: 'avgTimeToConversion',
    label: 'avg. Time To Conversion',
    value: undefined

  },{
    id: 'avgFrequency',
    label: 'avg. Frequency',
    value: undefined

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
    createActiveFields: fieldsPerStep['Details']
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
      console.log(newStep.payload);
      state.createActiveStep = newStep.payload;
      state.createActiveFields = fieldsPerStep[newStep.payload];
    },
    setCreateActiveField: (state, data) =>{

      const {fieldId, value} = data.payload;
      console.log('fieldId', fieldId)
      console.log('value', value)


      state.createActiveFields.find(field => field.id===fieldId).value = value.payload;
      state.createActiveFields = state.createActiveFields.map(x=>x);
    }
  }
})

export const { sortOrderChange, changePage, setActiveRowHover, onOpenCreatDrawer, onCloseCreatDrawer, setCreateActiveStep, setCreateActiveField} = stateManage.actions

export default stateManage.reducer