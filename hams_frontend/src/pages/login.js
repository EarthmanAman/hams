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
                            <div className='absolute top-0 left-0 flex justify-center items-center h-[400px] w-[550px] bg-black bg-opacity-10 backdrop-blur-sm'>
                                <SpinnerComponent visible={true} />
                            </div>
                        : null}
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
    user: state.user
  });
  
  const mapDispatchToProps = { loginAPI};
  
  export default withRouter( connect(mapStateToProps, mapDispatchToProps)(Login));