import React from 'react';
import Image from 'next/image'
import {MdDashboard, MdCalendarMonth, MdPeopleAlt} from "react-icons/md"
import { connect } from "react-redux";
import { withRouter } from 'next/router';
import Link from 'next/link';

import Logo from "../../public/logo.png"
import LoginImage from "../../public/login.png"

import { registerApi } from '@/redux/splices/registerSplice';
import SpinnerComponent from '@/utils/spinner';


const imageLoader = require("../loader");
class  Register extends React.Component {
    state = {
        username: null,
        email: null,
        first_name: null,
        last_name: null,
        phone_no: null,
        license_no: null,
        password: null,
        confirm_password: null
    }

    handleRegister = () => {
        const {username, email, first_name, last_name, phone_no, license_no, password, confirm_password} = this.state
        if(username == null || email == null || first_name == null || last_name == null || phone_no == null || password == null || confirm_password == null){
            this.setState({null_error: true})
        }else{
            const context = {
                username: username,
                email: email,
                first_name: first_name,
                last_name: last_name,
                phone_no: phone_no,
                license_no: license_no,
                password: password,
                confirm_password: confirm_password,
                doctor: "true",
                sms: "true"
            }
            const r = this.props.registerApi(context)
            
        }
        
        
        
    }

    render() {
        let error = undefined
        console.log(this.props.register)
        try {
            error = this.props.user.user.non_field_errors
        }catch(e){
            
        }
        if(this.props.register.register.status == 201){
            this.props.router.push("/verify")
        }
        
        return (
            <div className=" min-h-[600px] w-full flex justify-center items-center bg-[#f7f7f7] ">
                
                <div className='flex'>
                    <div className='flex-1'>
                        <Image loader={imageLoader} src={LoginImage} className="w-auto h-[100%]" alt="about" />
                    </div>
                    <div className='relative flex-1 p-24 flex flex-col space-y-3 '>
                        {this.props.register.isLoading == true ? 
                            <div className='absolute top-0 left-0 flex justify-center items-center h-[400px] w-[550px] bg-black bg-opacity-10 backdrop-blur-sm'>
                                <SpinnerComponent visible={true} />
                            </div>
                        : null}

                        <h4 className='mb-5 text-2xl'>WELCOME. PLEASE FILL THE INFORMATION TO SIGN UP</h4>

                        {error != undefined ? <p className='text-red-600'>Unable to login with provided credentials</p>:null}
                        {this.state.null_error === true ? <p className='text-red-600'>Some fields are empty. PLease fill them</p>:null}
                        <div className='flex space-x-3'>
                            <div className='flex-1'>
                                <input placeholder='username' className='text-black border-2 rounded-md p-2 w-[100%]' onChange={(text) => this.setState({username: text.target.value})}/>
                            </div>
                            <div className='flex-1'>
                                <input placeholder='email' className='text-black border-2 rounded-md p-2 w-[100%]' onChange={(text) => this.setState({email: text.target.value})}/>
                            </div>
                            
                        </div>
                        <div className='flex space-x-3'>
                            <div className='flex-1'>
                                <input placeholder='First name' className='text-black border-2 rounded-md p-2 w-[100%]' onChange={(text) => this.setState({first_name: text.target.value})}/>
                            </div>
                            <div className='flex-1'>
                                <input placeholder='Last name' className='text-black border-2 rounded-md p-2 w-[100%]' onChange={(text) => this.setState({last_name: text.target.value})}/>
                            </div>
                            
                        </div>
                        <div className='flex space-x-3'>
                            <div className='flex-1'>
                                <input placeholder='Phone number' className='text-black border-2 rounded-md p-2 w-[100%]' onChange={(text) => this.setState({phone_no: text.target.value})}/>
                            </div>
                            <div className='flex-1'>
                                <input placeholder='Licence Number' className='text-black border-2 rounded-md p-2 w-[100%]' onChange={(text) => this.setState({license_no: text.target.value})}/>
                            </div>
                            
                        </div>
                        <input placeholder='Password' type='password' className='text-black border-2 rounded-md p-2' onChange={(text) => this.setState({password: text.target.value})}/>
                        <input placeholder='Confirm Password' type='password' className='text-black border-2 rounded-md p-2' onChange={(text) => this.setState({confirm_password: text.target.value})}/>
                        <button className='bg-green-700 text-black p-4'  onClick={this.handleRegister}>Register</button>

                        <div className='flex space-x-2 mt-3 items-center'>
                            <p>I have an account?</p>
                            <Link href={"/login"} className='text-blue-600'>Login</Link>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


const mapStateToProps = (state) => ({
    user: state.user,
    register: state.register
  });
  
  const mapDispatchToProps = { registerApi};
  
  export default withRouter( connect(mapStateToProps, mapDispatchToProps)(Register));