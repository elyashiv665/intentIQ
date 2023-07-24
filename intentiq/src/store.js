import { configureStore } from '@reduxjs/toolkit'
import tableStateManage from './tableStateManage'

export default configureStore({
    reducer: {
        state: tableStateManage
    }
  })