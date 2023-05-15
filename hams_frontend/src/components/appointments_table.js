import Link from "next/link";
import React from "react";
import {MdCalendarMonth, MdRemoveRedEye, MdEditSquare, MdDelete} from "react-icons/md"
import Popup from "reactjs-popup";

export default function AppointmentsTable() {
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
                            <form className='flex space-x-2'>
                                <input placeholder='Search...' className='border-[1px] px-3 rounded-md border-black'/>
                                <button className='text-black'>Submit</button>
                            </form>
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
                                <tr>
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
                                        Jone Doe
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                                        13 MAY 2023
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                                        
                                        10:00 AM
                                        
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                                        
                                        Pending
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                                        
                                        <div className="flex space-x-2 justify-end">
                                            
                                            <button className="border-0 p-0">
                                                <Link href={"/appointment_detail"}>
                                                <MdRemoveRedEye size={20} color="blue"/>
                                                </Link>
                                            </button>

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
        </div>
    );
}