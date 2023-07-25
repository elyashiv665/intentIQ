import Drawer from '@mui/material/Drawer';
import {DialogTitle, IconButton} from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import Radio from '@mui/material/Radio';

import { useSelector } from 'react-redux'
import { onCloseCreatDrawer } from './stateManage'


function ColorRadioButtons(selectedValue, setSelectedValue) {
  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  const controlProps = (item) => ({
    checked: selectedValue === item,
    onChange: handleChange,
    value: item,
    name: 'color-radio-button-demo',
    inputProps: { 'aria-label': item },
  });

  return (
    <div>
      <Radio {...controlProps('Details')} />
      <Radio {...controlProps('Configuratins')}/>
      <Radio {...controlProps('Tags')} />
      <Radio {...controlProps('Alerts')} />
    </div>
  );
}
export default function CreateCustomerDrawer({dispatch}){
const { activeRowHover, openCreatDrawer} = useSelector(state => (state.state));

    return   <Drawer
    anchor={'right'}
    open={openCreatDrawer}
    onClose={dispatch(onCloseCreatDrawer)}
    PaperProps={{
      sx: { width: "30%" },
    }}
  >
    <DialogTitle>
      <IconButton onClick={dispatch(onCloseCreatDrawer)}>
          <ArrowBackIosIcon /> back
      </IconButton>
      <div style={{paddingLeft: 32, marginTop: 32}}>
        Create New Customer
        
      </div>
    </DialogTitle>
      
  </Drawer>
}