
import Layout from '@/components/layout'
import Link from 'next/link'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import {MdCalendarMonth, MdRemoveRedEye, MdEditSquare, MdDelete, MdPersonPin, MdDirectionsWalk, MdPhoneEnabled} from "react-icons/md"
import 'react-tabs/style/react-tabs.css';
import { connect } from 'react-redux';
import Avatar from "../../public/avatar.png"
import Image from 'next/image';
import {MdTipsAndUpdates} from "react-icons/md"
import React from 'react';
import { notification_api_stub_get } from '@/api/_stub';
const imageLoader = require("../loader");
class  AppointmentDetail extends React.Component {
    state = {
        tests: []
    }
    componentDidMount = async() => {
        let tests = await notification_api_stub_get("/diagnosis/tests/")
        this.setState({tests:tests})
    }
    render() {
        const tests = this.state.tests
        const appointment = this.props.appointment.payload
        return (
            <Layout>
                <div className='my-5 px-5'>
                    {/* TITLE */}
                    <div className='flex justify-between items-center'>
                      <div className='pb-3 border-b-[1px] w-[100%]'>
                        <h4>Appointment Details</h4>
                       
                      </div>
                      
                    </div>
        
                    <div className='flex justify-between my-5'>
                        {/* LEFT  */}
                        <div className='flex space-x-3'>
                            {/* IMAGE  */}
                            <div className='h-12 w-12'>
                                <Image loader={imageLoader} src={Avatar} className="w-[100%] h-auto" alt="about" />
                            </div>
        
                            {/* NAME  */}
                            <div>
                                <h5>{appointment.patient.user.first_name} {appointment.patient.user.last_name}</h5>
                                <p>{appointment.patient.user.phone_no}</p>
                            </div>
                        </div>
        
                        {/* RIGHT  */}
                        <div className='flex space-x-3'>
                            <button className='bg-red-500'>CANCEL</button>
                            <button className='bg-[#47bb92]'>RESCHEDULE</button>
                        </div>
                    </div>
        
                    <Tabs>
                        <TabList>
                        <Tab><h5>Overview</h5></Tab>
                        <Tab><h5>Tests</h5></Tab>
                        <Tab><h5>Diagnosis</h5></Tab>
                        <Tab><h5>Prescription</h5></Tab>
                        </TabList>
        
                        <TabPanel>
                            <div className='bg-[#ffffff] p-5'>
                                <div>
                                    <div>
                                        <h4>Basic Info</h4>
                                    </div>
        
                                    {/* LIST  */}
                                    <div className="p-1.5 w-full inline-block align-middle">
                                        <div className="overflow-hidden border rounded-lg">
                                            <table className="min-w-full divide-y divide-gray-200">
                                                <thead className="bg-gray-50">
                                                    <tr>
                                                        <th
                                                            scope="col"
                                                            className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                                                        >
                                                            NAME
                                                        </th>
                                                        <th
                                                            scope="col"
                                                            className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                                                        >
                                                            AGE
                                                        </th>
                                                        
                                                        <th
                                                            scope="col"
                                                            className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                                                        >
                                                            GENDER
                                                        </th>
        
                                                        <th
                                                            scope="col"
                                                            className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                                                        >
                                                            PHONE NO
                                                        </th>
        
                                                        <th
                                                            scope="col"
                                                            className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                                                        >
                                                            EMAIL
                                                        </th>
                                                       
                                                    </tr>
                                                </thead>
        
                                                <tbody className="divide-y divide-gray-200">
                                                    <tr>
                                                        
                                                        <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap">
                                                        {appointment.patient.user.first_name} {appointment.patient.user.last_name}
                                                        </td>
                                                        <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                                                            30
                                                        </td>
                                                        <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                                                            Male
                                                        </td>
        
                                                        <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                                                        {appointment.patient.user.phone_no}
                                                        </td>
        
                                                        <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                                                        {appointment.patient.user.email}
                                                        </td>
                                                    </tr>
                                                    
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                                
        
                                
                            </div>
        
                            <div className='bg-[#ffffff] p-5 mt-5'>
                                <div>
                                    <div>
                                        <h4>Previous Visits</h4>
                                    </div>
        
                                    {/* LIST  */}
                                    <div className="p-1.5 w-full inline-block align-middle">
                                        <div className="overflow-hidden border rounded-lg">
                                            <table className="min-w-full divide-y divide-gray-200">
                                                <thead className="bg-gray-50">
                                                    <tr>
                                                        <th
                                                            scope="col"
                                                            className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                                                        >
                                                            DateTime
                                                        </th>
                                                        <th
                                                            scope="col"
                                                            className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                                                        >
                                                            Tests Done
                                                        </th>
                                                        
                                                        <th
                                                            scope="col"
                                                            className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                                                        >
                                                            Diagnosis
                                                        </th>
        
                                                        <th
                                                            scope="col"
                                                            className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                                                        >
                                                            Prescription
                                                        </th>
        
                                                        
                                                       
                                                    </tr>
                                                </thead>
        
                                                <tbody className="divide-y divide-gray-200">
                                                    <tr>
                                                        
                                                        <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap">
                                                            John Doe
                                                        </td>
                                                        <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                                                            30
                                                        </td>
                                                        <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                                                            Male
                                                        </td>
        
                                                        <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                                                            +254 79835 3456
                                                        </td>
        
                                                        
                                                    </tr>
                                                    
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                                
        
                                
                            </div>
        
        
                        </TabPanel>
                        <TabPanel>
                            <div className='bg-[#ffffff] p-5'>
                                <div className='flex justify-end'>
                                    <form>
                                        <select className='p-2 border-[1px] rounded-md text-black'>
                                            {tests.map((test) => 
                                            <option key={test.id} value={test.id}>{test.name}</option>
                                            )}
                                            
                                            
                                        </select>
                                    </form>
                                    <button className='bg-[#47bb92] ml-3'>ADD TEST</button>
                                </div>
        
                                {/* LIST  */}
                                <div className="p-1.5 w-full inline-block align-middle mt-5">
                                        <div className="overflow-hidden border rounded-lg">
                                            <table className="min-w-full divide-y divide-gray-200">
                                                <thead className="bg-gray-50">
                                                    <tr>
                                                        <th
                                                            scope="col"
                                                            className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                                                        >
                                                            Test Name
                                                        </th>
                                                        <th
                                                            scope="col"
                                                            className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                                                        >
                                                            Date
                                                        </th>
                                                        
                                                        <th
                                                            scope="col"
                                                            className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                                                        >
                                                            Findings
                                                        </th>
        
                                                        <th
                                                            scope="col"
                                                            className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                                                        >
                                                            Action
                                                        </th>
        
                                                        
                                                       
                                                    </tr>
                                                </thead>
        
                                                <tbody className="divide-y divide-gray-200">

                                                    {appointment.tests.length == 0 ? <p className='text-red-500'>No tests yet</p> :
                                                    appointment.tests.map((test) => 
                                                    <tr key={test.id}>
                                                        
                                                        <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap">
                                                            {test.test.name}
                                                        </td>
                                                        <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                                                            13 May 2023
                                                        </td>
                                                        <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                                                            Malaria positive
                                                        </td>
        
                                                        <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                                                
                                                            <div className="flex space-x-2">
                                                                
                                                                {/* <button className="border-0 p-0">
                                                                    <Link href={"/appointment_detail"}>
                                                                    <MdRemoveRedEye size={20} color="blue"/>
                                                                    </Link>
                                                                </button> */}
        
                                                                <button className="border-0 p-0">
                                                                    <MdEditSquare size={20} color="blue"/>
                                                                </button>
        
                                                                <button className="border-0 p-0"><MdDelete size={20} color="red"/></button>
                                                                    
                                                                    
                                                            
                                                                
                                                            </div>
                                                        </td>
                                                    </tr>
                                                    )
                                                    
                                                    }
                                                    
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                            </div>
                        </TabPanel>
        
                        <TabPanel>
                            <div className='bg-[#ffffff] p-5'>
                                <div className='flex justify-end'>
                                    <form>
                                        
                                    </form>
                                    <button className='bg-[#47bb92] ml-3'>ADD TEST</button>
                                </div>
        
                                {/* LIST  */}
                                {/* CARDS */}
                                <div className='my-4 flex space-x-4'>
        
                                {/* CARD  */}
                                <div className='flex-1 min-h-[200px] bg-[#F4F5FA] bg-opacity-30 shadow-sm p-5'>
                                {/* TITLE  */}
                                <div className='pb-3 border-b-[1px] border-[#5C5C5C] flex justify-between'>
                                    <div>
                                        <h4>Malaria </h4>
        
                                        <div className='flex space-x-2 items-center mt-2'>
                                            <MdCalendarMonth color='#5C5C5C'/>
                                            <p>13 May 2023, 10:00 AM</p>
                                        </div>
                                    </div>
                                    <div className='flex space-x-4'>
                                        <button className="border-0 p-0">
                                            <MdEditSquare size={20} color="blue"/>
                                        </button>
        
                                        <button className="border-0 p-0"><MdDelete size={20} color="red"/></button>
                                            
                                    </div>
                                    
                                </div>
        
                                <div className='mx-3 my-3 mb-5 flex space-x-4'>
                                    <p>Description of diagnosis will go here.</p>
        
                                </div>
        
                               
                                </div>
        
                                {/* CARD  */}
                                <div className='flex-1 min-h-[200px] bg-[#F4F5FA] bg-opacity-30 shadow-sm p-5'>
                                {/* TITLE  */}
                                <div className='pb-3 border-b-[1px] border-[#5C5C5C] flex justify-between'>
                                    <div>
                                        <h4>Malaria </h4>
        
                                        <div className='flex space-x-2 items-center mt-2'>
                                            <MdCalendarMonth color='#5C5C5C'/>
                                            <p>13 May 2023, 10:00 AM</p>
                                        </div>
                                    </div>
                                    <div className='flex space-x-4'>
                                        <button className="border-0 p-0">
                                            <MdEditSquare size={20} color="blue"/>
                                        </button>
        
                                        <button className="border-0 p-0"><MdDelete size={20} color="red"/></button>
                                            
                                    </div>
                                    
                                </div>
        
                                <div className='mx-3 my-3 mb-5 flex space-x-4'>
                                    <p>Description of diagnosis will go here.</p>
        
                                </div>
        
                               
                                </div>
        
        
                                </div>
        
                            </div>
                        </TabPanel>
        
                        <TabPanel>
                            <div className='bg-[#ffffff] p-5'>
                                <div className='flex justify-end'>
                                    <form>
                                        
                                    </form>
                                    <button className='bg-[#47bb92] ml-3'>ADD PRESCRIPTION</button>
                                </div>
        
                                {/* LIST  */}
                                <div className="p-1.5 w-full inline-block align-middle mt-5">
                                    <div className="overflow-hidden border rounded-lg">
                                        <table className="min-w-full divide-y divide-gray-200">
                                            <thead className="bg-gray-50">
                                                <tr>
                                                    <th
                                                        scope="col"
                                                        className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                                                    >
                                                        Condition
                                                    </th>
                                                    <th
                                                        scope="col"
                                                        className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                                                    >
                                                        Medication
                                                    </th>
                                                    
                                                    <th
                                                        scope="col"
                                                        className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                                                    >
                                                        Amount
                                                    </th>
        
                                                    <th
                                                        scope="col"
                                                        className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                                                    >
                                                        Action
                                                    </th>
        
                                                    
                                                    
                                                </tr>
                                            </thead>
        
                                            <tbody className="divide-y divide-gray-200">
                                                <tr>
                                                    
                                                    <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap">
                                                        Diabetes Test
                                                    </td>
                                                    <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                                                        13 May 2023
                                                    </td>
                                                    <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                                                        Malaria positive
                                                    </td>
        
                                                    <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                                            
                                                        <div className="flex space-x-2">
                                                            
                                                            {/* <button className="border-0 p-0">
                                                                <Link href={"/appointment_detail"}>
                                                                <MdRemoveRedEye size={20} color="blue"/>
                                                                </Link>
                                                            </button> */}
        
                                                            <button className="border-0 p-0">
                                                                <MdEditSquare size={20} color="blue"/>
                                                            </button>
        
                                                            <button className="border-0 p-0"><MdDelete size={20} color="red"/></button>
                                                                
                                                                
                                                        
                                                            
                                                        </div>
                                                    </td>
                                                </tr>
                                                
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </TabPanel>
                    </Tabs>
                </div>
              
            </Layout>
          )
    }
  
}


const mapStateToProps = (state) => ({
    // user_appointments: state.user_appointments,
    appointment: state.appointment.appointment,
  });
  
  const mapDispatchToProps = {};
  
  export default connect(mapStateToProps, mapDispatchToProps)(AppointmentDetail);