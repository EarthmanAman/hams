import { configureStore } from '@reduxjs/toolkit'

import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import thunk from 'redux-thunk';
import loginSplice from './splices/loginSplice';

const persistConfig = {
  key: 'root',
  storage,
}

const loginSpliceR = persistReducer(persistConfig, loginSplice)

export const store = configureStore( {
  reducer: {
    token: loginSpliceR,
   
  },
  middleware: [thunk]

})

export const persistor = persistStore(store)
