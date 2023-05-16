import Image from 'next/image'
import Layout from '@/components/layout'
import Link from 'next/link'
import 'react-modern-calendar-datepicker/lib/DatePicker.css';
import Popup from 'reactjs-popup';
import { connect } from 'react-redux';
import AppointmentsTable from '@/components/appointments_table';
import React from 'react';
class  Appointments extends React.Component {
    state = {
        appointments: []
    }

    componentDidMount =() => {
        const appointments = this.props.user_appointments.user_appointments != null ? this.props.user_appointments.user_appointments.doctor.appointments:[]

        this.setState({appointments:appointments})
    }
    render(){
        const {appointments} = this.state
        console.log(appointments)
        return (
            <Layout>
                <div className='my-5 px-5'>
                    {/* TITLE */}
                    <div className='flex justify-between items-center'>
                        <div>
                        <h4>APPOINTMENTS</h4>
                        <p>Your upcoming appointments</p>
                        </div>
                        
                        <Popup 
                            contentStyle={{background:"lightgrey", height:300, width: 300, marginTop:100, borderRadius:10}}
                            trigger={<button className='text-black bg-[#47bb92]'>NEW APPOINTMENT</button>}
                            position="left"
                        >
                            <div className='p-5'>
                                <div className='border-b-[1px] border-gray-700 pb-4'>
                                    <h4>Register an Appointment</h4>
                                </div>

                                <form>
                                    <div className='flex flex-col space-y-2'>
                                        <label>Doctor</label>
                                        <select>
                                            <option>Dr Hashim Athman</option>
                                        </select>
                                    </div>

                                    <div className='flex flex-col space-y-2'>
                                        <label>Date</label>
                                        <input type='datetime-local' />
                                    </div>
                                    
                                </form>
                                
                            </div>
                        </Popup>
                        {/* <Link href="">
                        <button className='text-black bg-[#47bb92]'>NEW APPOINTMENT</button>
                        </Link> */}
                        
                    </div>
        
                    {/* TABLE */}
        
                    <div className='bg-[#ffffff] p-5 my-5'>
                        
                        {/* TABLE */}
        
                        <AppointmentsTable appointments={appointments}/>
                    </div>
                </div>
                
            </Layout>
        )
    }
 
}

const mapStateToProps = (state) => ({
    user_appointments: state.user_appointments,
    user: state.user.user
  });
  
  const mapDispatchToProps = {};
  
  export default connect(mapStateToProps, mapDispatchToProps)(Appointments);
