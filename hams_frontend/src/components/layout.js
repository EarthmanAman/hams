import React from 'react';
import Image from 'next/image'
import {MdDashboard, MdCalendarMonth, MdPeopleAlt} from "react-icons/md"

import Link from 'next/link';

import Logo from "../../public/logo.png"
import Avatar from "../../public/avatar.png"


const imageLoader = require("../loader");
export default class  Layout extends React.Component {

    render() {
        return (
            <main className="mx-3">
            <div className='bg-[#f7f7f7] min-h-[700px] flex space-x-3'>
                <div className='flex-1 bg-[#ffffff] py-4 px-5 my-1'>

                    {/* Logo */}
                    <div className='flex items-center'>
                        <div className='flex-1'>
                            <Image loader={imageLoader} src={Logo} className="w-[100%] h-auto" alt="about" />
                        </div>
                        <div className='flex-[1.5]'>
                            <h5>Health</h5>
                        </div>
                        
                    </div>
                    
                    {/* NAVIGATION */}
                    <div className='mt-7 flex flex-col space-y-3'>
                        <Link href="">
                            <div className='bg-[#eafff8] px-4 py-3 rounded-md flex space-x-2 items-center'>
                                <MdDashboard color='green'/>
                                <h6>Dashboard</h6>
                            </div>
                        </Link>

                        <Link href="">
                            <div className='px-4 py-3 rounded-md flex space-x-2 items-center'>
                                <MdCalendarMonth color='#5C5C5C' />
                                <h6>Appointment</h6>
                            </div>
                        </Link>

                        <Link href="">
                            <div className='px-4 py-3 rounded-md flex space-x-2 items-center'>
                                <MdPeopleAlt color='#5C5C5C' />
                                <h6>My Patient</h6>
                            </div>
                        </Link>
                        
                    </div>
                    
                </div>

                <div className='flex-[5]'>
                    <div className='py-2 bg-[#ffffff] flex justify-end px-20 mt-1'>

                        <div className='flex space-x-2 items-center'>
                            <div className='w-8 h-8'>
                                <Image loader={imageLoader} src={Avatar} className="w-[100%] h-auto" alt="about" />
                            </div>
                            <h6>Dr Hashim</h6>
                        </div>
                        
                    </div>
                    {this.props.children}
                </div>
            </div>
            </main>
        )
    }
}
