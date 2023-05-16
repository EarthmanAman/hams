import React from 'react';
import Image from 'next/image'
import {MdDashboard, MdCalendarMonth, MdPeopleAlt} from "react-icons/md"
import { connect } from "react-redux";
import { withRouter } from 'next/router';
import Link from 'next/link';

import Logo from "../../public/logo.png"
import LoginImage from "../../public/login.png"

import { verifyAPI } from '../redux/splices/verifySplice';
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
        const r = await this.props.verifyAPI(context)
        
    }

    codeChane = async(e) => {
        await this.setState({code:e.target.value})
    }
    render() {
        let error = undefined
        try {
            error = this.props.code.code.non_field_errors
        }catch(e){
            
        }
        if(this.props.code.code.status != null){
            this.props.router.push("/")
        }
        
        return (
            <div className=" min-h-[600px] w-full flex justify-center items-center bg-[#f7f7f7] ">
                
                <div className='flex'>
                    <div className='flex-1'>
                        <Image loader={imageLoader} src={LoginImage} className="w-auto h-[100%]" alt="about" />
                    </div>
                    <div className='relative flex-1 p-24 flex flex-col space-y-3 '>
                        {this.props.code.isLoading == true ? 
                            <div className='absolute top-0 left-0 flex justify-center items-center h-[400px] w-[550px] bg-black bg-opacity-10 backdrop-blur-sm'>
                                <SpinnerComponent visible={true} />
                            </div>
                        : null}

                        <h4 className='mb-5 text-2xl'>ENTER VERIFICATION CODE</h4>

                        {error != undefined ? <p className='text-red-600'>Invalid code</p>:null}
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
    code: state.code
  });
  
  const mapDispatchToProps = { verifyAPI };
  
  export default withRouter( connect(mapStateToProps, mapDispatchToProps)(Verify));