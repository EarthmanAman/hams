import {createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { api_stub_post } from '../../api/_stub'

const initialState = {
  user: {token:null},
}

export const loginAPI = createAsyncThunk(
  'login/token',
  async (context) => {
    const res = await api_stub_post("/accounts/login/", context)
    return res
  }
)



const loginSplice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    logOutReducer(state){
      state.user = initialState
    }
  },

  extraReducers: (builder) => {
    builder.addCase(loginAPI.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(loginAPI.fulfilled, (state, action) => {
      state.isLoading = false
      state.user = action.payload
    })
    builder.addCase(loginAPI.rejected, (state, action) => {
      state.isLoading = false
      state.error = action.error.message
    })
  },
  
})

export const {logOutReducer} = loginSplice.actions

export default loginSplice.reducer