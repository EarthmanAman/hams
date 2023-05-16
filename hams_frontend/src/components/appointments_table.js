import Link from "next/link";
import React from "react";
import { connect } from "react-redux";
import {MdCalendarMonth, MdRemoveRedEye, MdEditSquare, MdDelete} from "react-icons/md"
import Popup from "reactjs-popup";
import { addAppointment } from "@/redux/splices/appointmentDetSplice";
class AppointmentsTable extends React.Component {
    handleAppointmentView = (e, appointment) => {
        this.props.addAppointment(appointment);
    }
    render(){
        return (
            <div className="flex flex-col relative">
                <div className="overflow-x-auto">
                    {/* TABLE OPTIONS */}
                    <div className='flex justify-between mb-5'>
                        <div className='flex space-x-2 items-center'>
                            <MdCalendarMonth color="black" size={25}/>
                            <h4>All appointments</h4>
                        </div>
    
                        <div>
                            <div>
                                {/* <form className='flex space-x-2'>
                                    <input placeholder='Search...' className='border-[1px] px-3 rounded-md border-black'/>
                                    <button className='text-black'>Submit</button>
                                </form> */}
                            </div>
                        </div>
                    </div>
    
    
                    <div className="p-1.5 w-full inline-block align-middle">
                        <div className="overflow-hidden border rounded-lg">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th scope="col" className="py-3 pl-4">
                                            <div className="flex items-center h-5">
                                                <input
                                                    id="checkbox-all"
                                                    type="checkbox"
                                                    className="text-blue-600 border-gray-200 rounded focus:ring-blue-500"
                                                />
                                                <label
                                                    htmlFor="checkbox"
                                                    className="sr-only"
                                                >
                                                    Checkbox
                                                </label>
                                            </div>
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                                        >
                                            No
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                                        >
                                            Patient Name
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
                                            Time
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                                        >
                                            Status
                                        </th>
    
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-xs font-bold text-right text-gray-500 uppercase "
                                        >
                                            Action
                                        </th>
                                    </tr>
                                </thead>
    
                                <tbody className="divide-y divide-gray-200">
    
                                    {this.props.appointments.map((appointment)=>
                                        <tr key={appointment.id}>
                                            <td className="py-3 pl-4">
                                                <div className="flex items-center h-5">
                                                    <input
                                                        type="checkbox"
                                                        className="text-blue-600 border-gray-200 rounded focus:ring-blue-500"
                                                    />
                                                    <label
                                                        htmlFor="checkbox"
                                                        className="sr-only"
                                                    >
                                                        Checkbox
                                                    </label>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap">
                                                01
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                                                {appointment.patient.user.first_name} {appointment.patient.user.last_name}
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                                                {appointment.date}
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                                                
                                                {appointment.time}                                                
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                                                
                                                {appointment.completed ? <p>Completed</p>: <p>Not complete</p>}
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                                                
                                                <div className="flex space-x-2 justify-end">
                                                    
                                                    <button className="border-0 p-0">
                                                        <Link href={"/appointment_detail"} onClick={(e)=>this.handleAppointmentView(e, appointment)}>
                                                        <MdRemoveRedEye size={20} color="blue"/>
                                                        </Link>
                                                    </button>
        
                                                    {/* <button className="border-0 p-0">
                                                        <MdEditSquare size={20} color="blue"/>
                                                    </button> */}

                                                    {/* <Popup 
                                                        contentStyle={{background:"grey", height:300, width: 300, marginTop:100, borderRadius:10}}
                                                        trigger={<button className="border-0 p-0"><MdDelete size={20} color="red"/></button>}
                                                        position="left"
                                                    >
                                                        <div>
                                                            <h4>Delete</h4>
                                                        </div>
                                                    </Popup> */}
                                                    
                                                        
                                                        
                                                
                                                    
                                                </div>
                                            </td>
                                        </tr>
                                    )}
                                    
                                    
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    
}


const mapStateToProps = (state) => ({
    user_appointments: state.user_appointments,
    user: state.user.user
  });
  
  const mapDispatchToProps = {addAppointment};
  
  export default connect(mapStateToProps, mapDispatchToProps)(AppointmentsTable);