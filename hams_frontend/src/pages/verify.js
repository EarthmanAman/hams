import React from 'react';
import Image from 'next/image'
import {MdDashboard, MdCalendarMonth, MdPeopleAlt} from "react-icons/md"
import { connect } from "react-redux";
import { withRouter } from 'next/router';
import Link from 'next/link';

import Logo from "../../public/logo.png"
import LoginImage from "../../public/login.png"

import { verifyApi } from '@/redux/splices/verifySplice';
import { codeVerifyApi, codeRemoveReducer } from '@/redux/splices/vSplice';
import SpinnerComponent from '@/utils/spinner';


const imageLoader = require("../loader");
class  Verify extends React.Component {
    state = {
        code: null,
    }

    handleVerify = async () => {
        const {code} = this.state

        const context = {
            "uuid": code,
        }
        console.log(context)
        const r = await this.props.codeVerifyApi(context)
        
    }

    codeChane = async(e) => {
        await this.setState({code:e.target.value})
    }
    componentDidMount =() => {
        this.props.codeRemoveReducer()
    }
    render() {
        let error = undefined
        let success = false
        try {
            error = this.props.verify.verify.non_field_errors
        }catch(e){
            
        }
        console.log(this.props.code)
        if(this.props.verify.verify.status != null){
            success = true
        }
        
        return (
            <div className=" min-h-[600px] w-full flex justify-center items-center bg-[#f7f7f7] ">
                
                <div className='flex'>
                    <div className='flex-1'>
                        <Image loader={imageLoader} src={LoginImage} className="w-auto h-[100%]" alt="about" />
                    </div>
                    <div className='relative flex-1 p-24 flex flex-col space-y-3 '>
                        {this.props.verify.isLoading == true ? 
                            <div className='absolute top-0 left-0 flex justify-center items-center h-full w-full bg-black bg-opacity-10 backdrop-blur-sm'>
                                <SpinnerComponent visible={true} />
                            </div>
                        : null}

                        <h4 className='mb-5 text-2xl'>ENTER VERIFICATION CODE</h4>

                        {error != undefined ? <p className='text-red-600'>Invalid code</p>:null}
                        {success == true ? <div className='p-3 bg-green-500'><p>Verified successfully. Please go and login</p></div>:null}
                        <input placeholder='Code' className='text-black border-2 rounded-md p-4' onChange={this.codeChane}/>
                        
                        <button className='bg-green-700 text-black p-4'  onClick={this.handleVerify}>Verify</button>

                        <div className='flex space-x-2 mt-3 items-center'>
                            <p>Back to login</p>
                            <Link href={"/login"} className='text-blue-600'>Login</Link>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


const mapStateToProps = (state) => ({
    verify: state.verify
  });
  
  const mapDispatchToProps = {codeVerifyApi, codeRemoveReducer};
  
  export default withRouter( connect(mapStateToProps, mapDispatchToProps)(Verify));