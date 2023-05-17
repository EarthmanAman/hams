import {createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { api_stub_post } from '../../api/_stub'

const initialState = {
  verify: {status:null},
}

export const codeVerifyApi = createAsyncThunk(
  'verify/token',
  async (context) => {
    const res = await api_stub_post("/accounts/verify/", context)
    console.log(res)
    return res
  }
)


const vSplice = createSlice({
  name: 'verify',
  initialState,
  reducers: {
    codeRemoveReducer(state){
        state.verify = initialState
    }
  },

  extraReducers: (builder) => {
    builder.addCase(codeVerifyApi.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(codeVerifyApi.fulfilled, (state, action) => {
      state.isLoading = false
      state.verify = action.payload
    })
    builder.addCase(codeVerifyApi.rejected, (state, action) => {
      state.isLoading = false
      state.error = action.error.message
    })
  },
  
})

export const {codeRemoveReducer} = vSplice.actions

export default vSplice.reducer