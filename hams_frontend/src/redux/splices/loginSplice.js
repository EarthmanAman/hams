import {createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { api_stub_post } from '../../api/_stub'

const initialState = {
  refresh: null,
  access: null,
}

export const loginAPI = createAsyncThunk(
  'login/token',
  async (context) => {
    const res = await api_stub_post("/api/token/", context)
    console.log(res)
    return res
  }
)

const loginSplice = createSlice({
  name: 'login',
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(loginAPI.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(loginAPI.fulfilled, (state, action) => {
      state.isLoading = false
      state.status = action.payload
    })
    builder.addCase(loginAPI.rejected, (state, action) => {
      state.isLoading = false
      state.error = action.error.message
    })
  },
  
})

export default loginSplice.reducer