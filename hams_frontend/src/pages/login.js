import React from 'react';
import Image from 'next/image'
import {MdDashboard, MdCalendarMonth, MdPeopleAlt} from "react-icons/md"
import { connect } from "react-redux";

import Link from 'next/link';

import Logo from "../../public/logo.png"
import LoginImage from "../../public/login.png"
import { loginAPI } from '@/redux/splices/loginSplice';


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
        console.log(context)
        const r = this.props.loginAPI(context)
        console.log(r)
    }
    render() {
        return (
            <div className=" min-h-[600px] w-full flex justify-center items-center bg-[#f7f7f7] ">
                <div className='flex'>
                    <div className='flex-1'>
                        <Image loader={imageLoader} src={LoginImage} className="w-auto h-[100%]" alt="about" />
                    </div>
                    <div className='flex-1 p-24 flex flex-col space-y-3'>
                        <input placeholder='username' className='text-black' onChange={(text) => this.setState({username: text.target.value})}/>
                        <input placeholder='password' className='text-black' onChange={(text) => this.setState({password: text.target.value})}/>
                        <button className='bg-green text-black'  onClick={this.handleLogin}>Login</button>
                    </div>
                </div>
            </div>
        )
    }
}


const mapStateToProps = (state) => ({
    token: state.token
  });
  
  const mapDispatchToProps = { loginAPI};
  
  export default connect(mapStateToProps, mapDispatchToProps)(Login);