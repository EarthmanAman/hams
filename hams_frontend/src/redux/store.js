import { configureStore } from '@reduxjs/toolkit'

import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import thunk from 'redux-thunk';
import loginSplice from './splices/loginSplice';
import appointmentsSplice from './splices/appointmentsSplice';
import appointmentDetSplice from './splices/appointmentDetSplice';
import testSplice from './splices/testSplice';
const persistConfig = {
  key: 'root',
  storage,
}

const loginSpliceR = persistReducer(persistConfig, loginSplice)
const appointmentsSpliceR = persistReducer(persistConfig, appointmentsSplice)
const appointmentDetSpliceR = persistReducer(persistConfig, appointmentDetSplice)
const testSpliceR = persistReducer(persistConfig, testSplice)

export const store = configureStore( {
  reducer: {
    user: loginSpliceR,
    user_appointments: appointmentsSpliceR,
    appointment: appointmentDetSpliceR,
    // tests: testSpliceR,
  },
  middleware: [thunk]

})

export const persistor = persistStore(store)
