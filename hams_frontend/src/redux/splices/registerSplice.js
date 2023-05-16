import {createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { api_stub_post } from '../../api/_stub'

const initialState = {
  register: {status:null},
}

export const registerApi = createAsyncThunk(
  'register/token',
  async (context) => {
    const res = await api_stub_post("/accounts/register/", context)
    console.log(res)
    return res
  }
)


const registerSplice = createSlice({
  name: 'register',
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(registerApi.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(registerApi.fulfilled, (state, action) => {
      state.isLoading = false
      state.register = action.payload
    })
    builder.addCase(registerApi.rejected, (state, action) => {
      state.isLoading = false
      state.error = action.error.message
    })
  },
  
})

export default registerSplice.reducer