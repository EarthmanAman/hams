
import Layout from '@/components/layout'
import Link from 'next/link'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import {MdCalendarMonth, MdRemoveRedEye, MdEditSquare, MdDelete, MdPersonPin, MdDirectionsWalk, MdPhoneEnabled} from "react-icons/md"
import 'react-tabs/style/react-tabs.css';
import Popup from 'reactjs-popup';
import { connect } from 'react-redux';
import Avatar from "../../public/avatar.png"
import Image from 'next/image';
import {MdTipsAndUpdates} from "react-icons/md"
import React from 'react';
import { notification_api_stub_get, notification_api_stub_post } from '@/api/_stub';
const imageLoader = require("../loader");
class  AppointmentDetail extends React.Component {

    state = {
        tests: [],
        test: null,
        appointment: this.props.appointment.payload,
        appointment_tests: this.props.appointment.payload.tests,
        diagnosis: this.props.appointment.payload.diagnosis,
        prescriptions: this.props.appointment.payload.prescriptions,
        disease: null,
        description: null,
        presD: null,
        presDesc: null,
        med: null
    }

    createDiagnosis = async () => {
        const {disease, description} = this.state
        const today = new Date()
        const fullDate = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        const time = today.getHours() + ':' + today.getMinutes()
        let data = {
            disease:disease,
            description: description,
            appointment: this.state.appointment.id,
            date: fullDate,
            time: time,
        }
        
        const response = await notification_api_stub_post("/diagnosis/create/", data)
        let diagnosis = this.state.diagnosis
        let ts = [data, ...diagnosis]
            // console.log(ts)
        this.setState({diagnosis: ts})
    }

    createPrescription = async () => {
        let {med, presD, presDesc} = this.state
        presD = parseInt(presD)
        let data = {
            appointment:presD,
            description: presDesc,
            name: med, 
        }
        const response = await notification_api_stub_post("/diagnosis/prescription/create/", data)
        let prescriptions = this.state.prescriptions
        let pres = this.state.diagnosis.find(item => parseInt(item.id) === presD);
        data["diagnosis"] = pres
        let ts = [data, ...prescriptions]
            // console.log(ts)
        this.setState({prescriptions: ts})
    }
    createTest = async () => {
        const test = parseInt(this.state.test)
        const appointment = this.props.appointment.payload.id
        let tests = this.state.tests
        if(test != null){
            let data = {
                diagnosis: appointment,
                test: test,
            }
            
            const response = await notification_api_stub_post("/diagnosis/test/create/", data)
            let test_item = tests.find(item => parseInt(item.id) === test);
            let t = this.state.appointment_tests
            
            let ts = [...t, {test:test_item}]
            // console.log(ts)
            this.setState({appointment_tests: ts})
            
        }
    }

    handleTestChange(event) {
        event.preventDefault();
        const v= event.target.value
        this.setState({ test: v });
      }

    handleDiseaseChange = async (event) => {
        event.preventDefault();
        const v= event.target.value
        await this.setState({ disease: v });
      }
    
    handleDescriptionChange = async (event) => {
        event.preventDefault();
        const v= event.target.value
        await this.setState({ description: v});
      }

    
      handleDChange =async (event) => {
        const v = event.target.value

        await this.setState({presD:v})
      }

      handleMedChange =async (event) => {
        const v = event.target.value

        await this.setState({med:v})
      }

      handlePreDescChange =async (event) => {
        const v = event.target.value

        await this.setState({presDesc:v})
      }
    componentDidMount = async() => {
        let tests = await notification_api_stub_get("/diagnosis/tests/")
        this.setState({tests:tests})
    }
    render() {
        const tests = this.state.tests
        const appointment = this.state.appointment
        const appointment_tests = this.state.appointment_tests
        const diagnosis = this.state.diagnosis
        const prescriptions = this.state.prescriptions
        // console.log()
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
                            <Popup 
                                contentStyle={{background:"grey", height:300, width: 300, marginTop:100, borderRadius:10}}
                                trigger={<button className='bg-red-500'>CANCEL</button>}
                                position="left"
                            >
                                <div>
                                    <h4>Cancel</h4>
                                </div>
                            </Popup>
                            
                            <Popup 
                                contentStyle={{background:"grey", height:300, width: 300, marginTop:100, borderRadius:10}}
                                trigger={<button className='bg-[#47bb92]'>RESCHEDULE</button>}
                                position="left"
                            >
                                <h4>Reschedule</h4>
                            </Popup>
                            
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
                                        <select value={this.state.test} className='p-2 border-[1px] rounded-md text-black' onChange={(e) => this.setState({test:e.target.value})}>
                                            <option value={null}>Select a test to perform</option>
                                            {tests.map((test) => 
                                                <option key={test.id} value={test.id}>{test.name}</option>
                                            )}
                                            
                                        </select>
                                    </form>
                                    <button className='bg-[#47bb92] ml-3' onClick={this.createTest}>ADD TEST</button>
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
                                                        {/* <th
                                                            scope="col"
                                                            className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                                                        >
                                                            Date
                                                        </th> */}
                                                        
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

                                                    {appointment_tests.length == 0 ? <p className='text-red-500'>No tests yet</p> :
                                                    appointment_tests.map((test) => 
                                                    <tr key={test.id}>
                                                        
                                                        <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap">
                                                            {test.test.name}
                                                        </td>
                                                        {/* <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                                                            13 May 2023
                                                        </td> */}
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
                                    <Popup 
                                        contentStyle={{background:"lightgrey", height:350, width: 320, marginTop:100, borderRadius:10}}
                                        trigger={<button className='bg-[#47bb92] ml-3'>ADD DIAGNOSIS</button>}
                                        position="left"
                                    >
                                        <div className='p-5'>
                                            <div className='border-b-[1px] pb-3 border-black'>
                                                <h4>Add a Diagnosis</h4>
                                            </div>

                                            <div>
                                                <div className='flex flex-col space-y-2'>
                                                    <label>Disease</label>
                                                    <input placeholder='Disease' value={this.state.disease} className='bg-white' onChange={this.handleDiseaseChange}/>
                                                </div>

                                                <div className='flex flex-col space-y-2'>
                                                    <label>Description</label>
                                                    <textarea className='text-black' rows={3} value={this.state.description} onChange={this.handleDescriptionChange}></textarea>
                                                </div>
                                                
                                                <button className='bg-blue-500 mt-5' onClick={this.createDiagnosis}>Add</button>
                                                
                                            </div>
                                        </div>
                                    </Popup>
                                    
                                </div>
        
                                {/* LIST  */}
                                {/* CARDS */}
                                <div className='my-4 flex space-x-4'>
        
                                {/* CARD  */}
                                {diagnosis.map((d) => 
                                    <div className='flex-1 min-h-[200px] bg-[#F4F5FA] bg-opacity-30 shadow-sm p-5'>
                                    {/* TITLE  */}
                                    <div className='pb-3 border-b-[1px] border-[#5C5C5C] flex justify-between'>
                                        <div>
                                            <h4>{d.disease}</h4>
            
                                            <div className='flex space-x-2 items-center mt-2'>
                                                <MdCalendarMonth color='#5C5C5C'/>
                                                <p>{d.date}, {d.time}</p>
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
                                        <p>{d.description}</p>
            
                                    </div>
            
                                   
                                    </div>
                                )}
                                
        
                                
        
                                </div>
        
                            </div>
                        </TabPanel>
        
                        <TabPanel>
                            <div className='bg-[#ffffff] p-5'>
                                <div className='flex justify-end'>
                                    <form>
                                        
                                    </form>

                                    <Popup 
                                        contentStyle={{background:"lightgrey", height:400, width: 300, marginTop:100, borderRadius:10}}
                                        trigger={ <button className='bg-[#47bb92] ml-3'>ADD PRESCRIPTION</button>}
                                        position="left"
                                    >
                                        <div className='p-5'>
                                            <div className='border-b-[1px] pb-3 border-black'>
                                                <h4>Add a Prescription</h4>
                                            </div>
                                            <div className='flex flex-col space-y-2'>
                                                <label>Diagnosis</label>
                                                <select value={this.state.diagnosis_selected} onChange={this.handleDChange}>
                                                    <option>Select diagnosis</option>
                                                    {diagnosis.map((d) => 
                                                        <option value={d.id}>{d.disease}</option>
                                                    )}
                                                </select>
                                            </div>

                                            <div className='flex flex-col space-y-2'>
                                                <label>Medication</label>
                                                <input onChange={this.handleMedChange} className='bg-white' placeholder='medication'/>
                                            </div>

                                            <div className='flex flex-col space-y-2'>
                                                <label>Description</label>
                                                <textarea className='text-black' onChange={this.handlePreDescChange} rows={3}></textarea>
                                            </div>

                                            <button className='bg-blue-500 mt-3' onClick={this.createPrescription}>Add</button>
                                            
                                        </div>
                                    </Popup>
                                   
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

                                                {prescriptions.length == 0 ? <p className='text-red-600'>No prescription</p> : 

                                                prescriptions.map((prescription) =>
                                                    <tr key={prescription.id}>
                                                        
                                                        <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap">
                                                            {prescription.diagnosis.disease}
                                                        </td>
                                                        <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                                                        {prescription.name}
                                                        </td>
                                                        <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                                                        {prescription.description}
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