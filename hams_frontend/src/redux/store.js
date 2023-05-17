import { configureStore } from '@reduxjs/toolkit'

import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import thunk from 'redux-thunk';
import loginSplice from './splices/loginSplice';
import appointmentsSplice from './splices/appointmentsSplice';
import appointmentDetSplice from './splices/appointmentDetSplice';
import registerSplice from './splices/registerSplice';
import verifySplice from './splices/verifySplice';
import vSplice from './splices/vSplice';
const persistConfig = {
  key: 'root',
  storage,
}

const loginSpliceR = persistReducer(persistConfig, loginSplice)
const appointmentsSpliceR = persistReducer(persistConfig, appointmentsSplice)
const appointmentDetSpliceR = persistReducer(persistConfig, appointmentDetSplice)
const verifySpliceR = persistReducer(persistConfig, verifySplice)
const registerSpliceR = persistReducer(persistConfig, registerSplice)
const vSpliceR = persistReducer(persistConfig, vSplice)

export const store = configureStore( {
  reducer: {
    user: loginSpliceR,
    user_appointments: appointmentsSpliceR,
    appointment: appointmentDetSpliceR,
    register: registerSpliceR,
    code: verifySpliceR,
    verify: vSpliceR,
  },
  middleware: [thunk]

})

export const persistor = persistStore(store)
