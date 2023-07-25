import { configureStore } from '@reduxjs/toolkit'
import stateManage from './stateManage'

export default configureStore({
    reducer: {
        state: stateManage
    }
  })