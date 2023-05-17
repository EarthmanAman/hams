import {createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { api_stub_post } from '../../api/_stub'

const initialState = {
  code: {status:null},
}

export const verifyApi = createAsyncThunk(
    'code/token',
    async (context) => {
      const res = await api_stub_post("/accounts/verify/", context)
      console.log(res)
      return res
    }
  )
const verifySplice = createSlice({
  name: 'code',
  initialState,
  reducers: {
    
  },

  extraReducers: (builder) => {
    builder.addCase(verifyApi.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(verifyApi.fulfilled, (state, action) => {
      state.isLoading = false
      state.code = action.payload
    })
    builder.addCase(verifyApi.rejected, (state, action) => {
      state.isLoading = false
      state.error = action.error.message
    })
  },
  
})

export default verifySplice.reducer