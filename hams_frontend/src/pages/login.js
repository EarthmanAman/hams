import React from 'react';
import Image from 'next/image'
import {MdDashboard, MdCalendarMonth, MdPeopleAlt} from "react-icons/md"
import { connect } from "react-redux";
import { withRouter } from 'next/router';
import Link from 'next/link';

import Logo from "../../public/logo.png"
import LoginImage from "../../public/login.png"
import { loginAPI } from '@/redux/splices/loginSplice';
import SpinnerComponent from '@/utils/spinner';


const imageLoader = require("../loader");
class  Login extends React.Component {
    state = {
        username: null,
        password: null
    }

    handleLogin = () => {
        const {username, password} = this.state

        const context = {
            "username": username,
            "password": password,
        }
        
        const r = this.props.loginAPI(context)
        
    }

    render() {
        let error = undefined
        try {
            error = this.props.user.user.non_field_errors
        }catch(e){
            
        }
        if(this.props.user.user.token != null){
            this.props.router.push("/")
        }
        
        return (
            <div className=" min-h-[600px] w-full flex justify-center items-center bg-[#f7f7f7] ">
                
                <div className='flex'>
                    <div className='flex-1'>
                        <Image loader={imageLoader} src={LoginImage} className="w-auto h-[100%]" alt="about" />
                    </div>
                    <div className='relative flex-1 p-24 flex flex-col space-y-3 '>
                        {this.props.user.isLoading == true ? 
                            <div className='absolute top-0 left-0 flex justify-center items-center h-full w-full bg-black bg-opacity-10 backdrop-blur-sm'>
                                <SpinnerComponent visible={true} />
                            </div>
                        : null}

                        <h4 className='mb-5 text-2xl'>LOGIN TO HOSPITAL APPOINTMNET MANAGEMENT SYSTEM</h4>

                        {error != undefined ? <p className='text-red-600'>Unable to login with provided credentials</p>:null}
                        <input placeholder='username' className='text-black border-2 rounded-md p-4' onChange={(text) => this.setState({username: text.target.value})}/>
                        <input placeholder='password' type='password' className='text-black border-2 rounded-md p-4' onChange={(text) => this.setState({password: text.target.value})}/>
                        <button className='bg-green-700 text-black p-4'  onClick={this.handleLogin}>Login</button>

                        <div className='flex space-x-2 mt-3 items-center'>
                            <p>Don't have an account?</p>
                            <Link href={"/register"} className='text-blue-600'>Register</Link>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


const mapStateToProps = (state) => ({
    user: state.user
  });
  
  const mapDispatchToProps = { loginAPI};
  
  export default withRouter( connect(mapStateToProps, mapDispatchToProps)(Login));