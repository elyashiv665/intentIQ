import Drawer from '@mui/material/Drawer';
import {DialogTitle, IconButton} from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import {FormControlLabel, Radio, FormControl, TextField, Button} from '@mui/material';

import { useSelector } from 'react-redux'
import { onCloseCreatDrawer, setCreateActiveStep, setCreateActiveField, createNewCostumer } from './stateManage'


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

function ActiveStepComponent(dispatch, fieldsPerStep, createActiveStep) {

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
    {fieldsPerStep[createActiveStep].map(field => (InputField(field)))}
    </div>;

}


export default function CreateCustomerDrawer({dispatch}){

const { openCreatDrawer, createActiveStep, fieldsPerStep} = useSelector(state => (state.state));

console.log('fieldsPerStep', JSON.parse(fieldsPerStep))
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
      </div>
      
    </DialogTitle>
    <div style={{marginLeft: 32, display: 'flex', flexDirection: 'column'}}>
      <div style={{marginTop: 16, paddingRight: 32}}>
          {ColorRadioButtons(createActiveStep, (data) => dispatch(setCreateActiveStep(data)))}
          {ActiveStepComponent(dispatch, JSON.parse(fieldsPerStep), createActiveStep)}
      </div>
        <Button 
          sx={{ backgroundColor: 'blue', color: 'white !important', marginTop: '32px', alignSelf: 'center'}} 
          varient={'contained'} 
          onClick={() => dispatch(createNewCostumer())}>
            Create New Costumer
        </Button>
    </div>
  </Drawer>
}