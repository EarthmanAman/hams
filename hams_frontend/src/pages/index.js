import React, { useState } from "react";
import Image from 'next/image'
import { Inter } from 'next/font/google'
import { withRouter } from 'next/router';
import Layout from '@/components/layout'
import Link from 'next/link'
import 'react-modern-calendar-datepicker/lib/DatePicker.css';
import { Calendar } from "react-modern-calendar-datepicker";
import { connect } from "react-redux";
import {MdCalendarMonth, MdEmail, MdTipsAndUpdates, MdPersonPin, MdDirectionsWalk, MdPhoneEnabled} from "react-icons/md"
import {CiCalendarDate} from "react-icons/ci"
import ApexChart from "@/components/chart";
import { appointmentsAPI } from '@/redux/splices/appointmentsSplice';

const inter = Inter({ subsets: ['latin'] })

class Home extends React.Component{

  componentDidMount =async () => {
    try{
      await this.props.appointmentsAPI(this.props.user.user.id)
    }catch(e){
      
    }
  }
  render(){
    let appointments = []
    let totals = [0,0,0,0,0,0,0]
    let propsApps = this.props.user_appointments.user_appointments
    console.log(propsApps)
    if(propsApps != null){
      if(propsApps.doctor != undefined || propsApps.doctor != null){
        appointments = this.props.user_appointments.user_appointments.doctor.appointments
        totals = this.props.user_appointments.user_appointments.doctor.totals != undefined ? this.props.user_appointments.user_appointments.doctor.totals : [0,0,0,0,0,0,0]
      }
    }
    else if(this.props.user.user.token == null){
      this.props.router.push("/login")
    }
    
    
  return (
    <Layout>
      <div className='my-3 flex space-x-2'>

        <div className="flex-[2]">
          <div className='bg-[#ffffff] m-h-[300px] flex-[2] rounded-md p-5 mb-6'>
            {/* TITLE */}
            <div className='flex justify-between items-center'>
              <div>
                <h4>NEXT APPOINTMENTS</h4>
                <p>Your next appointment today</p>
              </div>

              <Link href="/appointments">
                <p className='text-blue-600'>See all</p>
              </Link>
              
            </div>

            {/* CARDS */}
            <div className='my-4 flex space-x-4'>
              {appointments.length === 0 ? <p className="text-red-400">No appointments</p>:
              appointments.map((appointment) => 
              <div className='flex-1 min-h-[200px] bg-[#F4F5FA] bg-opacity-30 shadow-sm p-5'>
                {/* TITLE  */}
                <div className='pb-3 border-b-[1px] border-[#5C5C5C] flex justify-between items-center'>
                  <div>
                    <h4>{appointment.patient.user.first_name} {appointment.patient.user.last_name}</h4>

                    <div className='flex space-x-2 items-center mt-2'>
                      <MdCalendarMonth color='#5C5C5C'/>
                      <p>{appointment.date}</p>
                    </div>
                  </div>

                  <div>
                    <button className='bg-[#47bb92]'>View</button>
                  </div>
                  
                </div>

                <div className='mx-3 my-3 mb-5 flex space-x-4'>
                  <div className='flex flex-col space-y-4'>
                    

                    <div className='flex space-x-2 items-center'>
                      <MdPhoneEnabled color="black" />
                      <p>Phone - {appointment.patient.user.phone_no}</p>
                    </div>

                    <div className='flex space-x-2 items-center'>
                      <MdEmail color="black"/>
                      <p>Email - {appointment.patient.user.email}</p>
                    </div>

                  </div>

                  {/* <div className='flex flex-col space-y-4'>
                    <div className='flex space-x-2 items-center'>
                      <MdTipsAndUpdates color="black"/>
                      <p>Age - 30 years</p>
                    </div>

                    <div className='flex space-x-2 items-center'>
                      <MdPhoneEnabled />
                      <p>+254 79835 2592</p>
                    </div>

                  </div> */}

                </div>

                {/* BUTTONS */}
                {/* <div className='flex space-x-4 mt-3'>
                  <button className='bg-red-500 text-black text-sm'>CANCEL</button>
                  <button className="text-black text-sm">POSTPONE</button>
                  <button className='bg-[#47bb92]'>START</button>
                </div> */}
              </div>
              )
            }

              


            </div>


          </div>

          <div className='bg-[#ffffff] m-h-[300px] flex-[2] rounded-md p-5'>
            {/* TITLE */}
            <div className='flex justify-between items-center'>
              <div>
                <h4>APPOINTMENTS SUMMARY</h4>
                <p>Your Weekly Appointment Summary</p>
              </div>
            </div>

            <ApexChart totals={totals}/>

          </div>
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

const mapDispatchToProps = {appointmentsAPI};

export default withRouter( connect(mapStateToProps, mapDispatchToProps)(Home));