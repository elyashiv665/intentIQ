import Drawer from '@mui/material/Drawer';
import {DialogTitle, IconButton} from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import {FormControlLabel, Radio, FormControl, TextField} from '@mui/material';

import { useSelector } from 'react-redux'
import { onCloseCreatDrawer, setCreateActiveStep, setCreateActiveField } from './stateManage'


function ColorRadioButtons(selectedValue, setSelectedValue) {
  const steps = ['Details', 'Configuratins', 'Tags', 'Alerts'];

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  const controlProps = (item) => ({
    checked: selectedValue === item,
    onChange: handleChange,
    value: item,
    inputProps: { 'aria-label': item },
  });

  return <div>{steps.map(step => (
          <FormControlLabel value={step} label={step} control={ <Radio {...controlProps(step)} />} />
      ))}</div>;
}

function ActiveStepComponent(dispatch, createActiveFields) {

  function InputField(field){
    return <FormControl sx={{marginTop: '16px'}}>
            <TextField
                label={field.label}
                value={field.value}
                onChange={(e) => dispatch(setCreateActiveField({fieldId: field.id, value: e.target.value}))}
                placeholder={field.value ??''}
            />
        </FormControl>
  }

  return <div style={{display: 'flex', flexDirection: 'column', marginTop: '32px'}}>
    {createActiveFields.map(field => (InputField(field)))}
    </div>;

}


export default function CreateCustomerDrawer({dispatch}){

const { openCreatDrawer, createActiveStep, createActiveFields} = useSelector(state => (state.state));
    return   <Drawer
    anchor={'right'}
    open={openCreatDrawer}
    onClose={() => dispatch(onCloseCreatDrawer)}
    PaperProps={{
      sx: { width: "30%" },
    }}
  >
    <DialogTitle>
      <IconButton onClick={() => dispatch(onCloseCreatDrawer)}>
          <ArrowBackIosIcon /> back
      </IconButton>
      <div style={{paddingLeft: 32, marginTop: 32}}>
        Create New Customer
        <div style={{marginTop: 16}}>
          {ColorRadioButtons(createActiveStep, (data) => dispatch(setCreateActiveStep(data)))}
          {ActiveStepComponent(dispatch, createActiveFields)}
        </div>
      </div>
    </DialogTitle>
      
  </Drawer>
}