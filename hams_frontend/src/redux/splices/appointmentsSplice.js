import {createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { notification_api_stub_get } from '../../api/_stub'

const initialState = {
  user_appointments: null,
}

export const appointmentsAPI = createAsyncThunk(
  'appointments/get',
  async (user_id) => {
    const res = await notification_api_stub_get(`/users/${user_id}/`)
    return res
  }
)

const appointmentsSplice = createSlice({
  name: 'user_appointments',
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(appointmentsAPI.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(appointmentsAPI.fulfilled, (state, action) => {
      state.isLoading = false
      state.user_appointments = action.payload
    })
    builder.addCase(appointmentsAPI.rejected, (state, action) => {
      state.isLoading = false
      state.error = action.error.message
    })
  },
  
})

export default appointmentsSplice.reducer