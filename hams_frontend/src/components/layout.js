import React from 'react';
import { withRouter } from 'next/router';
import Image from 'next/image'
import {MdDashboard, MdCalendarMonth, MdPeopleAlt, MdLogout} from "react-icons/md"
import { connect } from "react-redux";
import Link from 'next/link';
import SpinnerComponent from '@/utils/spinner';
import { logOutReducer } from '@/redux/splices/loginSplice';
import { appointmentsAPI } from '@/redux/splices/appointmentsSplice';
import Logo from "../../public/logo.png"
import Avatar from "../../public/avatar.png"


const imageLoader = require("../loader");
class  Layout extends React.Component {

    logOut = async() => {
        await this.props.logOutReducer()
        this.props.router.push("/login")
    }
    componentDidMount = async() => {
        try{
            await this.props.appointmentsAPI(this.props.user.user.id)
            await this.props.testsAPI()
        }catch(e){
            if(this.props.user_appointments.user_appointments == null){
                this.props.router.push("/login")
            }
            
        }
        
    }
    render() {
        // console.log(this.props.user)
        // if(this.props.user.token == null){
        //     this.props.router.push("/login")
        // }
        return (
            <main className="mx-3">
            <div className='bg-[#f7f7f7] min-h-[700px] flex space-x-3'>

                {this.props.user_appointments.isLoading == true ? 
                    <div className='absolute top-0 left-0 flex justify-center items-center h-full w-full bg-black bg-opacity-10 backdrop-blur-sm'>
                        <SpinnerComponent visible={true} />
                    </div>
                : null}


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
                        <Link href="/">
                            <div className='bg-[#eafff8] px-4 py-3 rounded-md flex space-x-2 items-center'>
                                <MdDashboard color='green'/>
                                <h6>Dashboard</h6>
                            </div>
                        </Link>

                        <Link href="/appointments">
                            <div className='px-4 py-3 rounded-md flex space-x-2 items-center'>
                                <MdCalendarMonth color='#5C5C5C' />
                                <h6>Appointment</h6>
                            </div>
                        </Link>

                        <Link href="/account">
                            <div className='px-4 py-3 rounded-md flex space-x-2 items-center'>
                                <MdPeopleAlt color='#5C5C5C' />
                                <h6>Account</h6>
                            </div>
                        </Link>

                       
                        <div className='px-4 py-3 rounded-md flex space-x-2 items-center' onClick={this.logOut}>
                            <MdLogout color='#5C5C5C' />
                            <h6>Log out</h6>
                        </div>
                     
                        
                    </div>
                    
                </div>

                <div className='flex-[5]'>
                    <div className='py-2 bg-[#ffffff] flex justify-end px-20 mt-1'>

                        <div className='flex space-x-2 items-center'>
                            <div className='w-8 h-8'>
                                <Image loader={imageLoader} src={Avatar} className="w-[100%] h-auto" alt="about" />
                            </div>
                            <h6>Dr {this.props.user_appointments.user_appointments.first_name}</h6>
                        </div>
                        
                    </div>
                    {this.props.children}
                </div>
            </div>
            </main>
        )
    }
}

const mapStateToProps = (state) => ({
    user_appointments: state.user_appointments,
    user: state.user.user
  });
  
  const mapDispatchToProps = { appointmentsAPI, logOutReducer};
  
  export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Layout));