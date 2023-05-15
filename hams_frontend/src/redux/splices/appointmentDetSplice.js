import {createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { api_stub_post } from '../../api/_stub'

const initialState = {
  appointment: null
}


const appointmentDetSplice = createSlice({
  name: 'appointment',
  initialState,
  reducers: {
    addAppointment(state, appointment){
      state.appointment = appointment
    }
  },

  
})
export const {addAppointment} = appointmentDetSplice.actions

export default appointmentDetSplice.reducer