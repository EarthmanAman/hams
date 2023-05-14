import Image from 'next/image'
import { Inter } from 'next/font/google'
import Layout from '@/components/layout'
import Link from 'next/link'

import {MdCalendarMonth} from "react-icons/md"

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
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

          <div className='my-4 flex space-x-2'>
            <div className='flex-1 min-h-[200px] bg-[#F4F5FA] bg-opacity-30 shadow-sm p-5'>

              <div className='pb-3 border-b-[1px] border-[#5C5C5C]'>
                <h4>Hashim Athman Abdalla</h4>

                <div className='flex space-x-2 items-center mt-2'>
                  <MdCalendarMonth color='#5C5C5C'/>
                  <p>13 May 2023, 10:00 AM</p>
                </div>
              </div>
              
            </div>

            <div className='flex-1 min-h-[200px] bg-[#F4F5FA] bg-opacity-30 shadow-sm'>
              <h5>Hello</h5>
            </div>
          </div>
        </div>

        <div className='bg-[#ffffff] m-h-[300px] flex-1 rounded-md'>
          
        </div>
        
      </div>
    </Layout>
  )
}
