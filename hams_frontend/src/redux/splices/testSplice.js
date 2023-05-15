import {createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { notification_api_stub_get } from '../../api/_stub'

const initialState = {
  tests: [],
}

export const testsAPI = createAsyncThunk(
  'tests/get',
  async () => {
    const res = await notification_api_stub_get(`/diagnosis/tests/`)
    return res
  }
)

const testsSplice = createSlice({
  name: 'tests',
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(testsAPI.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(testsAPI.fulfilled, (state, action) => {
      state.isLoading = false
      state.user_appointments = action.payload
    })
    builder.addCase(testsAPI.rejected, (state, action) => {
      state.isLoading = false
      state.error = action.error.message
    })
  },
  
})

export default testsSplice.reducer