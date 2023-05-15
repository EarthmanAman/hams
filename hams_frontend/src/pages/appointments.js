import Image from 'next/image'
import Layout from '@/components/layout'
import Link from 'next/link'
import 'react-modern-calendar-datepicker/lib/DatePicker.css';

import AppointmentsTable from '@/components/appointments_table';
export default function Appointments() {
 
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

                <AppointmentsTable />
            </div>
        </div>
      
    </Layout>
  )
}
