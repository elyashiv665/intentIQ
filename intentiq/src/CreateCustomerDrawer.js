import Drawer from '@mui/material/Drawer';
import {DialogTitle, IconButton} from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import {FormControlLabel, Radio} from '@mui/material';

import { useSelector } from 'react-redux'
import { onCloseCreatDrawer, setCreateActiveStep } from './stateManage'


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
export default function CreateCustomerDrawer({dispatch}){

const { activeRowHover, openCreatDrawer, createActiveStep} = useSelector(state => (state.state));

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
        </div>
      </div>
    </DialogTitle>
      
  </Drawer>
}