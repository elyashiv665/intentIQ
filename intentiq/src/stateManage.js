import { createSlice } from '@reduxjs/toolkit'
import data from './mockData.json';

const PER_PAGE = parseInt(process.env.REACT_APP_PER_PAGE);

const calculatePage = (_data, page) => {
  return _data.slice(page * PER_PAGE, (page + 1) * PER_PAGE);
};
const calculateSort = (_data, sortOrder) => {
  const sorted = _data.sort((a, b) => {
    if (sortOrder === "asc") {
      return new Date(a.startDate) - new Date(b.startDate);
    } else if(sortOrder === 'desc') {
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
     value: 'undefined',
     type: 'string'
    },{
      id: 'endDate',
      label: 'End Date',
      value: 'undefined',
      type: 'string'

     },{
      id: 'customer',
      label: 'Customer',
      value: 'undefined',
      type: 'string'

     },{
      id: 'director',
      label: 'Director',
      value: 'undefined',
      type: 'string'

     }],
  'Configuratins': [{
      id: 'impression',
      label: 'Impression',
      value: -1,
      type: 'number'

    },{
      id: 'conversion',
      label: 'Conversion',
      value: -1,
      type: 'number'

    },{
      id: 'attributeMatches',
      label: 'Attribute Matches',
      value: -1,
      type: 'number'

    }],
  'Tags': [{
    id: 'isFavorite',
    label: 'favorite',
    value: false,
    type: 'bool'

  }],
  'Alerts': [{
    id: 'conversionRate',
    label: 'Conversion Rate',
    value: -1,
    type: 'number'

  },{
    id: 'avgTimeToConversion',
    label: 'avg. Time To Conversion',
    value: -1,
    type: 'number'

  },{
    id: 'avgFrequency',
    label: 'avg. Frequency',
    value: -1,
    type: 'number'

  }]

}

function formData(state){
  const filtered = state.filterFavorite ? state.data.filter(customer => customer.isFavorite) : state.data;

  state.filteredData = filtered;
  const sorted = calculateSort(filtered, state.sortOrder);
  state.displayedData = calculatePage(sorted, state.page);
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
    fieldsPerStep:  JSON.stringify(fieldsPerStep),
    filteredData: data,
    filter: false
  },
  reducers: {
    sortOrderChange: (state) => {
      state.sortOrder = state.sortOrder === "asc" ? "desc" : "asc";
      formData(state);
    },

    changePage: (state, data) => {
      const page = data.payload;
      state.page = page;
      formData(state);
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
    createNewCostumer: (state) =>{
      try{
      const inputs = Object.values(JSON.parse(state.fieldsPerStep)).flat()
      const newCostumer = inputs.map(input => (JSON.parse(`{"${input.id}": "${input.value}"}`))).reduce((result, current) => {
        return Object.assign(result, current);
      }, {});
      state.data.push(newCostumer); 
      state.openCreatDrawer = false;
      state.activeRowHover = undefined;
      formData(state);
    }catch(err){
      console.log(err);
    }

    },

    setFavoriteFilter: (state, data) =>{
      const value = data.payload;
      state.filterFavorite = value;
      state.page = 0;
      formData(state);
    }

  }
})

export const { sortOrderChange, changePage, setActiveRowHover, onOpenCreatDrawer, onCloseCreatDrawer, setCreateActiveStep, setCreateActiveField, createNewCostumer, setFavoriteFilter} = stateManage.actions

export default stateManage.reducer