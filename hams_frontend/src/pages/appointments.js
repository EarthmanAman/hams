import Image from 'next/image'
import Layout from '@/components/layout'
import Link from 'next/link'
import 'react-modern-calendar-datepicker/lib/DatePicker.css';
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
        
                        <Link href="">
                        <button className='text-black bg-[#47bb92]'>NEW APPOINTMENT</button>
                        </Link>
                        
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
