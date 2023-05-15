import {createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { api_stub_get } from '../../api/_stub'

const initialState = {
  contents: null,
  isLoading: false,
  error: null,
}

export const getTotals = createAsyncThunk(
  'content/totals',
  async () => {
    const res = await api_stub_get("/equipment/dashboard/totals/1/")
    return res
  }
)

const totalsSlice = createSlice({
  name: 'totals',
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(getTotals.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(getTotals.fulfilled, (state, action) => {
      state.isLoading = false
      state.contents = action.payload
    })
    builder.addCase(getTotals.rejected, (state, action) => {
      state.isLoading = false
      state.error = action.error.message
    })
  },
  
})

export default totalsSlice.reducer