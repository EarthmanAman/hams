import React, { useState } from "react";
import Image from 'next/image'
import { Inter } from 'next/font/google'
import Layout from '@/components/layout'
import Link from 'next/link'
import 'react-modern-calendar-datepicker/lib/DatePicker.css';
import { Calendar } from "react-modern-calendar-datepicker";

import {MdCalendarMonth, MdTipsAndUpdates, MdPersonPin, MdDirectionsWalk, MdPhoneEnabled} from "react-icons/md"
import {CiCalendarDate} from "react-icons/ci"

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const [selectedDay, setSelectedDay] = useState(null);

  return (
    <Layout>
      <div className='my-3 flex space-x-2'>
        <div className='bg-[#ffffff] m-h-[300px] flex-[2] rounded-md p-5'>
          {/* TITLE */}
          <div className='flex justify-between items-center'>
            <div>
              <h4>NEXT APPOINTMENTS</h4>
              <p>Your next appointment today</p>
            </div>

            <Link href="">
              <p className='text-blue-600'>See all</p>
            </Link>
            
          </div>

          {/* CARDS */}
          <div className='my-4 flex space-x-4'>

            {/* CARD  */}
            <div className='flex-1 min-h-[200px] bg-[#F4F5FA] bg-opacity-30 shadow-sm p-5'>
              {/* TITLE  */}
              <div className='pb-3 border-b-[1px] border-[#5C5C5C]'>
                <h4>Hashim Athman Abdalla</h4>

                <div className='flex space-x-2 items-center mt-2'>
                  <MdCalendarMonth color='#5C5C5C'/>
                  <p>13 May 2023, 10:00 AM</p>
                </div>
              </div>



              <div className='mx-3 my-3 mb-5 flex space-x-4'>
                <div className='flex flex-col space-y-4'>
                  

                  <div className='flex space-x-2 items-center'>
                    <MdPersonPin />
                    <p>Gender - Male</p>
                  </div>

                  <div className='flex space-x-2 items-center'>
                    <MdDirectionsWalk />
                    <p>Visits - 4</p>
                  </div>

                </div>

                <div className='flex flex-col space-y-4'>
                  <div className='flex space-x-2 items-center'>
                    <MdTipsAndUpdates />
                    <p>Age - 30 years</p>
                  </div>

                  <div className='flex space-x-2 items-center'>
                    <MdPhoneEnabled />
                    <p>+254 79835 2592</p>
                  </div>

                </div>

              </div>
              {/* BUTTONS */}
              <div className='flex space-x-4 mt-3'>
                <button>POSTPONE</button>
                <button className='bg-[#47bb92]'>START</button>
              </div>
            </div>

            {/* CARD  */}
            <div className='flex-1 min-h-[200px] bg-[#F4F5FA] bg-opacity-30 shadow-sm p-5'>
              {/* TITLE  */}
              <div className='pb-3 border-b-[1px] border-[#5C5C5C]'>
                <h4>Hashim Athman Abdalla</h4>

                <div className='flex space-x-2 items-center mt-2'>
                  <MdCalendarMonth color='#5C5C5C'/>
                  <p>13 May 2023, 10:00 AM</p>
                </div>
              </div>



              <div className='mx-3 my-3 mb-5 flex space-x-4'>
                <div className='flex flex-col space-y-4'>
                  

                  <div className='flex space-x-2 items-center'>
                    <MdPersonPin />
                    <p>Gender - Male</p>
                  </div>

                  <div className='flex space-x-2 items-center'>
                    <MdDirectionsWalk />
                    <p>Visits - 4</p>
                  </div>

                </div>

                <div className='flex flex-col space-y-4'>
                  <div className='flex space-x-2 items-center'>
                    <MdTipsAndUpdates />
                    <p>Age - 30 years</p>
                  </div>

                  <div className='flex space-x-2 items-center'>
                    <MdPhoneEnabled />
                    <p>+254 79835 2592</p>
                  </div>

                </div>

              </div>
              {/* BUTTONS */}
              <div className='flex space-x-4 mt-3'>
                <button>POSTPONE</button>
                <button className='bg-[#47bb92]'>START</button>
              </div>
            </div>


          </div>


        </div>

        <div className='bg-[#ffffff] m-h-[300px] flex-1 rounded-md'>
          {/* TITLE */}
          <div className='p-5'>
            <div>
              <h4>APPOINTMENTS</h4>
              {/* <p>Your next appointment today</p> */}
            </div>
            
          </div>

          {/* CALENDER  */}
          <Calendar
            value={selectedDay}
            onChange={setSelectedDay}
            shouldHighlightWeekends
          />
        </div>
        
      </div>
    </Layout>
  )
}
